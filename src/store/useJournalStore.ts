/**
 * Journal Entries Store
 * Distinct from `useEmotionStore` (quick color check-ins) — this holds
 * long-form written entries tied to prompts.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';
import type { ChakraKey } from '@/types';

export interface JournalEntry {
  id: string;
  timestamp: number;
  promptId?: string;
  promptText?: string;
  body: string;
  emotionKey?: string;
  chakra?: ChakraKey;
  journeyDay?: number;
  sessionId?: string;
  voiceNoteUri?: string;
  voiceNoteDurationSec?: number;
}

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'> & { timestamp?: number }) => string;
  updateEntry: (id: string, patch: Partial<JournalEntry>) => void;
  removeEntry: (id: string) => void;
  reset: () => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) => {
        const id = `jrl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        set((state) => ({
          entries: [
            {
              id,
              timestamp: entry.timestamp ?? Date.now(),
              promptId: entry.promptId,
              promptText: entry.promptText,
              body: entry.body,
              emotionKey: entry.emotionKey,
              chakra: entry.chakra,
              journeyDay: entry.journeyDay,
              sessionId: entry.sessionId,
              voiceNoteUri: entry.voiceNoteUri,
              voiceNoteDurationSec: entry.voiceNoteDurationSec,
            },
            ...state.entries,
          ],
        }));
        return id;
      },
      updateEntry: (id, patch) =>
        set((state) => ({
          entries: state.entries.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),
      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),
      reset: () => set({ entries: [] }),
    }),
    {
      name: 'soma:journal-entries',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as JournalState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<JournalState>;
        return {
          ...current,
          ...p,
          // Guarantee entries is always an array — otherwise .filter / .map crash.
          entries: Array.isArray(p.entries) ? p.entries : current.entries,
        };
      },
    }
  )
);
