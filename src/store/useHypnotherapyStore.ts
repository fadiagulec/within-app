/**
 * Hypnotherapy session history.
 *
 * Tracks completed standalone hypnotherapy sessions (not the NRM
 * 28-day program — that lives in usePlanStore). Each entry records
 * which session, when it was completed, optional reflection text.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

export interface HypnoHistoryEntry {
  id: string;
  sessionId: string;
  completedAt: number;     // ms epoch
  date: string;            // YYYY-MM-DD local
  reflection?: string;
}

interface HypnoState {
  history: HypnoHistoryEntry[];
  /** Record a completed session. Returns the entry id. */
  recordCompletion: (sessionId: string) => string;
  /** Attach a reflection to a past entry. */
  setReflection: (entryId: string, reflection: string) => void;
  /** Count how many times a specific session has been completed. */
  countFor: (sessionId: string) => number;
  /** Most recent completion timestamp for a session, or null. */
  lastFor: (sessionId: string) => number | null;
  reset: () => void;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const useHypnotherapyStore = create<HypnoState>()(
  persist(
    (set, get) => ({
      history: [],

      recordCompletion: (sessionId) => {
        const id = `hypno-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const entry: HypnoHistoryEntry = {
          id,
          sessionId,
          completedAt: Date.now(),
          date: todayStr(),
        };
        set((state) => ({
          history: [entry, ...state.history].slice(0, 500),
        }));
        return id;
      },

      setReflection: (entryId, reflection) => {
        set((state) => ({
          history: state.history.map((e) =>
            e.id === entryId ? { ...e, reflection: reflection.trim() } : e
          ),
        }));
      },

      countFor: (sessionId) =>
        get().history.filter((e) => e.sessionId === sessionId).length,

      lastFor: (sessionId) => {
        const found = get().history.find((e) => e.sessionId === sessionId);
        return found ? found.completedAt : null;
      },

      reset: () => set({ history: [] }),
    }),
    {
      name: 'within:hypnotherapy',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as HypnoState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<HypnoState>;
        return {
          ...current,
          ...p,
          history: Array.isArray(p.history) ? p.history : current.history,
        };
      },
    }
  )
);
