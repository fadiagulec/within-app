/**
 * Within — Daily Check-In store.
 *
 * Records the user's one-tap morning/mid-day/evening mood from the Today
 * screen. Five-state palette only (Heavy · Tender · Steady · Open · Wired)
 * because more options = more friction = users skip.
 *
 * The Companion reads from here to decide what to say + what practice
 * to suggest. The shape is intentionally tiny — heavier emotional logging
 * lives in useEmotionStore.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

export type Mood = 'heavy' | 'tender' | 'steady' | 'open' | 'wired';

export interface CheckIn {
  /** Stable id (`ci-<timestamp>-<rand>`). */
  id: string;
  /** ISO date (YYYY-MM-DD) for "today" grouping. */
  date: string;
  /** Unix ms. */
  timestamp: number;
  mood: Mood;
}

interface CheckInState {
  history: CheckIn[];

  recordCheckIn: (mood: Mood) => void;
  /** Today's most recent check-in (or undefined if user hasn't checked in yet). */
  todaysCheckIn: () => CheckIn | undefined;
  /** True if user has checked in today already. */
  hasCheckedInToday: () => boolean;
  reset: () => void;
}

function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

export const useCheckInStore = create<CheckInState>()(
  persist(
    (set, get) => ({
      history: [],

      recordCheckIn: (mood) => {
        const now = Date.now();
        const entry: CheckIn = {
          id: `ci-${now}-${Math.random().toString(36).slice(2, 7)}`,
          date: todayKey(),
          timestamp: now,
          mood,
        };
        set((s) => ({ history: [entry, ...s.history].slice(0, 365) }));
      },

      todaysCheckIn: () => {
        const t = todayKey();
        return get().history.find((c) => c.date === t);
      },

      hasCheckedInToday: () => {
        return !!get().todaysCheckIn();
      },

      reset: () => set({ history: [] }),
    }),
    {
      name: 'within-checkins',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
    }
  )
);
