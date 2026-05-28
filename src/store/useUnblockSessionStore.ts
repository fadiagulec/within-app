/**
 * Guided Unblocking Session records.
 *
 * Stores the outcome of each completed energy-centre unblocking session:
 * which centre, the before/after emotion scores (the proof of shift),
 * the declaration written, and the date.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

export interface UnblockRecord {
  id: string;
  chakraId: string;
  beforeScore: number;
  afterScore: number;
  declaration?: string;
  completedAt: number;
  date: string;
}

interface UnblockSessionState {
  records: UnblockRecord[];
  recordSession: (entry: Omit<UnblockRecord, 'id' | 'completedAt' | 'date'>) => string;
  lastFor: (chakraId: string) => UnblockRecord | null;
  countFor: (chakraId: string) => number;
  reset: () => void;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const useUnblockSessionStore = create<UnblockSessionState>()(
  persist(
    (set, get) => ({
      records: [],

      recordSession: (entry) => {
        const id = `unblock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const record: UnblockRecord = {
          ...entry,
          id,
          completedAt: Date.now(),
          date: todayStr(),
        };
        set((state) => ({ records: [record, ...state.records].slice(0, 500) }));
        return id;
      },

      lastFor: (chakraId) =>
        get().records.find((r) => r.chakraId === chakraId) ?? null,

      countFor: (chakraId) =>
        get().records.filter((r) => r.chakraId === chakraId).length,

      reset: () => set({ records: [] }),
    }),
    {
      name: 'within:unblock-sessions',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as UnblockSessionState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<UnblockSessionState>;
        return {
          ...current,
          ...p,
          records: Array.isArray(p.records) ? p.records : current.records,
        };
      },
    }
  )
);
