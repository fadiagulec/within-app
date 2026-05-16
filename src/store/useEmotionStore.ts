import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';
import type { EmotionEntry } from '@/types';

interface EmotionState {
  entries: EmotionEntry[];
  addEntry: (entry: Omit<EmotionEntry, 'id' | 'timestamp'> & { timestamp?: number }) => void;
  removeEntry: (id: string) => void;
  reset: () => void;
}

export const useEmotionStore = create<EmotionState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            {
              id: `emo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              timestamp: entry.timestamp ?? Date.now(),
              colorKey: entry.colorKey,
              note: entry.note,
              chakra: entry.chakra,
              vibration: entry.vibration,
            },
            ...state.entries,
          ],
        })),
      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),
      reset: () => set({ entries: [] }),
    }),
    {
      name: 'soma:emotions',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<EmotionState>;
        return {
          ...current,
          ...p,
          entries: Array.isArray(p.entries) ? p.entries : current.entries,
        };
      },
    }
  )
);
