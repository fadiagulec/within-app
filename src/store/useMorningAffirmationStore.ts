/**
 * Morning Affirmation — show-once-per-day state.
 *
 * Tracks the local date the affirmation sheet was last shown so it
 * appears once per day on first app open. Optional snooze if the
 * user dismisses but wants to be reminded later.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface MorningAffirmationState {
  /** YYYY-MM-DD of last day the sheet was shown. */
  lastShownDate: string | null;
  /** User can disable the daily pop-up entirely from Profile. */
  enabled: boolean;
  shouldShowToday: () => boolean;
  markShownToday: () => void;
  setEnabled: (on: boolean) => void;
  reset: () => void;
}

export const useMorningAffirmationStore = create<MorningAffirmationState>()(
  persist(
    (set, get) => ({
      lastShownDate: null,
      enabled: true,

      shouldShowToday: () => {
        if (!get().enabled) return false;
        return get().lastShownDate !== todayStr();
      },

      markShownToday: () => set({ lastShownDate: todayStr() }),

      setEnabled: (on) => set({ enabled: on }),

      reset: () => set({ lastShownDate: null, enabled: true }),
    }),
    {
      name: 'within:morning-affirmation',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as MorningAffirmationState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        return { ...current, ...(persisted as object) };
      },
    }
  )
);
