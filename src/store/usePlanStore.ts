/**
 * SOMA — Plan progress store.
 *
 * Tracks which plans the user has enrolled in and which days of each
 * plan they've completed. Persists via AsyncStorage like the other stores.
 *
 * Read from screens via useStore selectors. Write via the actions.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

export interface PlanProgress {
  planId: string;
  startedAt: number;
  /** Sorted ascending. Day numbers are 1-based. */
  completedDays: number[];
}

interface PlanState {
  progress: Record<string, PlanProgress>;

  enroll: (planId: string) => void;
  unenroll: (planId: string) => void;
  completeDay: (planId: string, dayN: number) => void;

  isEnrolled: (planId: string) => boolean;
  getProgress: (planId: string) => PlanProgress | undefined;
  /** 1-based day the user is currently working on (= last completed + 1). */
  getCurrentDay: (planId: string) => number;
  isDayCompleted: (planId: string, dayN: number) => boolean;

  reset: () => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      progress: {},

      enroll: (planId) =>
        set((state) => {
          if (state.progress[planId]) return state; // already enrolled
          return {
            progress: {
              ...state.progress,
              [planId]: {
                planId,
                startedAt: Date.now(),
                completedDays: [],
              },
            },
          };
        }),

      unenroll: (planId) =>
        set((state) => {
          const next = { ...state.progress };
          delete next[planId];
          return { progress: next };
        }),

      completeDay: (planId, dayN) =>
        set((state) => {
          const existing = state.progress[planId];
          if (!existing) {
            // auto-enroll on first completion (defensive)
            return {
              progress: {
                ...state.progress,
                [planId]: {
                  planId,
                  startedAt: Date.now(),
                  completedDays: [dayN],
                },
              },
            };
          }
          if (existing.completedDays.includes(dayN)) return state;
          return {
            progress: {
              ...state.progress,
              [planId]: {
                ...existing,
                completedDays: [...existing.completedDays, dayN].sort(
                  (a, b) => a - b
                ),
              },
            },
          };
        }),

      isEnrolled: (planId) => Boolean(get().progress[planId]),
      getProgress: (planId) => get().progress[planId],
      getCurrentDay: (planId) => {
        const p = get().progress[planId];
        if (!p) return 1;
        if (p.completedDays.length === 0) return 1;
        return Math.min(21, p.completedDays[p.completedDays.length - 1]! + 1);
      },
      isDayCompleted: (planId, dayN) => {
        const p = get().progress[planId];
        return p ? p.completedDays.includes(dayN) : false;
      },

      reset: () => set({ progress: {} }),
    }),
    {
      name: 'soma:plans',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<PlanState>;
        return {
          ...current,
          ...p,
          progress:
            p.progress && typeof p.progress === 'object'
              ? p.progress
              : current.progress,
        };
      },
    }
  )
);
