/**
 * Companion conversation store.
 *
 * Persists the conversation history and exposes a sendMessage action
 * that hits /api/companion and threads the assistant reply into state.
 *
 * Context is injected by the caller — the store doesn't know about
 * journal / tarot / journey state itself; the UI gathers that and
 * passes it in.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

export interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface CompanionUserContext {
  recentJournal?: string[];
  lastTarot?: string;
  currentJourneyDay?: number;
  currentNrmDay?: number;
  mood?: string;
}

interface CompanionState {
  messages: CompanionMessage[];
  sending: boolean;
  error: string | null;
  /** Send a user message, await assistant reply, append both to history. */
  sendMessage: (content: string, userContext?: CompanionUserContext) => Promise<void>;
  /** Wipe conversation (start fresh). */
  clear: () => void;
  /** Sign-out reset. */
  reset: () => void;
}

const ENDPOINT = '/api/companion';

function mkId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useCompanionStore = create<CompanionState>()(
  persist(
    (set, get) => ({
      messages: [],
      sending: false,
      error: null,

      sendMessage: async (content, userContext) => {
        const trimmed = content.trim().slice(0, 4000);
        if (!trimmed) return;

        const userMsg: CompanionMessage = {
          id: mkId('u'),
          role: 'user',
          content: trimmed,
          timestamp: Date.now(),
        };

        set((state) => ({
          messages: [...state.messages, userMsg],
          sending: true,
          error: null,
        }));

        // Take the trailing window of the conversation for the API call.
        // The endpoint also caps at 20 — this is belt-and-suspenders.
        const window = get().messages.slice(-20).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        try {
          const resp = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: window, userContext }),
          });

          if (!resp.ok) {
            const errBody = await resp.json().catch(() => ({}));
            const errMsg =
              errBody?.error ||
              (resp.status === 503
                ? 'The companion is being set up. Try back soon.'
                : resp.status === 429
                  ? 'You\'re sending messages quickly. Pause for a breath.'
                  : 'Something interrupted the connection.');
            set((state) => ({
              sending: false,
              error: errMsg,
              messages: [
                ...state.messages,
                {
                  id: mkId('a'),
                  role: 'assistant',
                  content: `· ${errMsg}`,
                  timestamp: Date.now(),
                },
              ],
            }));
            return;
          }

          const data = await resp.json();
          const reply = String(data?.reply ?? '').trim();

          const assistantMsg: CompanionMessage = {
            id: mkId('a'),
            role: 'assistant',
            content: reply || '· I\'m here. What did you mean to say?',
            timestamp: Date.now(),
          };

          set((state) => ({
            messages: [...state.messages, assistantMsg],
            sending: false,
            error: null,
          }));
        } catch (err: any) {
          const msg = err?.message ?? 'Network interrupted.';
          set((state) => ({
            sending: false,
            error: msg,
            messages: [
              ...state.messages,
              {
                id: mkId('a'),
                role: 'assistant',
                content: `· ${msg}`,
                timestamp: Date.now(),
              },
            ],
          }));
        }
      },

      clear: () => set({ messages: [], error: null }),
      reset: () => set({ messages: [], sending: false, error: null }),
    }),
    {
      name: 'within:companion',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as CompanionState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<CompanionState>;
        return {
          ...current,
          ...p,
          messages: Array.isArray(p.messages) ? p.messages : current.messages,
          sending: false, // never restore a "sending" flag
          error: null,
        };
      },
    }
  )
);
