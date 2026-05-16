import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// Use the shared hardened adapter, not raw AsyncStorage. Ensures the
// try/catch wrappers in src/store/storage.ts apply here too.
import { zustandAsyncStorage } from './storage';

export type GratitudeTime = 'morning' | 'evening';

export interface GratitudeEntry {
  id: string;
  time: GratitudeTime;
  date: string;              // ISO date string YYYY-MM-DD
  items: string[];           // the 3+ things
  reflection?: string;       // optional longer reflection
  createdAt: number;         // timestamp
}

interface GratitudeState {
  entries: GratitudeEntry[];
  addEntry: (entry: Omit<GratitudeEntry, 'id' | 'createdAt' | 'date'>) => void;
  deleteEntry: (id: string) => void;
  reset: () => void;
  getEntriesByDate: (date: string) => GratitudeEntry[];
  getStreak: () => number;
  getTodayComplete: () => { morning: boolean; evening: boolean };
}

const todayStr = (d = new Date()): string => {
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const dy = String(d.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${dy}`;
};

export const useGratitudeStore = create<GratitudeState>()(
  persist(
    (set, get) => ({
      entries: [],
      addEntry: (entry) => {
        const newEntry: GratitudeEntry = {
          ...entry,
          id: `grat_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
          date: todayStr(),
          createdAt: Date.now(),
        };
        set((state) => ({ entries: [newEntry, ...state.entries] }));
      },
      deleteEntry: (id) =>
        set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),
      reset: () => set({ entries: [] }),
      getEntriesByDate: (date) =>
        get().entries.filter((e) => e.date === date),
      getStreak: () => {
        const { entries } = get();
        if (entries.length === 0) return 0;

        const uniqueDates = new Set(entries.map((e) => e.date));
        let streak = 0;
        const d = new Date();
        while (uniqueDates.has(todayStr(d))) {
          streak++;
          d.setDate(d.getDate() - 1);
        }
        return streak;
      },
      getTodayComplete: () => {
        const today = todayStr();
        const todays = get().entries.filter((e) => e.date === today);
        return {
          morning: todays.some((e) => e.time === 'morning'),
          evening: todays.some((e) => e.time === 'evening'),
        };
      },
    }),
    {
      name: 'soma:gratitude',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as GratitudeState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<GratitudeState>;
        return {
          ...current,
          ...p,
          entries: Array.isArray(p.entries) ? p.entries : current.entries,
        };
      },
    }
  )
);
