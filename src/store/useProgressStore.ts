import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';
import type { Progress, DailyCheckIn } from '@/types';
import type { BurnoutTierKey } from '@/data/burnout';

interface JourneyProgress {
  currentJourneyDay: number; // 0 = not started, 1..21 = in progress
  journeyDaysCompleted: number[]; // 1-based day numbers
  journeyStartedAt?: number;
}

interface BurnoutProgress {
  burnoutScore?: number;
  burnoutTier?: BurnoutTierKey;
  burnoutAnsweredAt?: number;
  burnoutAnswers?: Record<string, number>;
}

interface ExtendedProgress extends Progress, JourneyProgress, BurnoutProgress {}

interface ProgressState {
  progress: ExtendedProgress;
  markSessionComplete: (sessionId: string, minutes: number) => void;
  checkIn: (date: string, practiceId: string, vibration?: number) => void;
  unlockLevel: (level: number) => void;
  startJourney: () => void;
  completeDayN: (n: number) => void;
  setBurnoutResult: (
    score: number,
    tier: BurnoutTierKey,
    answers: Record<string, number>
  ) => void;
  reset: () => void;
}

// ⚠️ DEV PREVIEW: temporarily unlock every level so the user can see all
// paid material while paywall strategy is being decided. Revert by changing
// `unlockedLevels` back to `[0]`.
const DEV_UNLOCK_ALL_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7];

const defaultProgress: ExtendedProgress = {
  completedSessionIds: [],
  currentStreak: 0,
  longestStreak: 0,
  lastCheckInDate: undefined,
  unlockedLevels: DEV_UNLOCK_ALL_LEVELS,
  checkIns: [],
  totalMinutes: 0,
  currentJourneyDay: 0,
  journeyDaysCompleted: [],
  journeyStartedAt: undefined,
  burnoutScore: undefined,
  burnoutTier: undefined,
  burnoutAnsweredAt: undefined,
  burnoutAnswers: undefined,
};

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Days between two YYYY-MM-DD strings.
 *
 * IMPORTANT: parse each string as a LOCAL midnight (not via
 * `new Date('2026-05-17')` which parses as UTC midnight). Mixing the
 * UTC-parsed result with `todayStr`'s local-date string produced
 * off-by-one bugs at timezone boundaries — e.g. a user in UTC+8
 * checking in at 11pm would see their streak reset because
 * "tomorrow's UTC" minus "today's local" rounded to 0 not 1.
 *
 * Parsing as local midnight keeps `todayStr` and `daysBetween` in the
 * same time domain, so streaks behave consistently regardless of
 * timezone or DST.
 */
function daysBetween(a: string, b: string): number {
  const parseLocal = (s: string): number => {
    const [y, m, d] = s.split('-').map((n) => parseInt(n, 10));
    return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1).getTime();
  };
  return Math.round((parseLocal(b) - parseLocal(a)) / (1000 * 60 * 60 * 24));
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: defaultProgress,
      markSessionComplete: (sessionId, minutes) =>
        set((state) => {
          if (state.progress.completedSessionIds.includes(sessionId)) {
            return state;
          }
          return {
            progress: {
              ...state.progress,
              completedSessionIds: [
                ...state.progress.completedSessionIds,
                sessionId,
              ],
              totalMinutes: state.progress.totalMinutes + minutes,
            },
          };
        }),
      checkIn: (date, practiceId, vibration) =>
        set((state) => {
          const existing = state.progress.checkIns.find((c) => c.date === date);
          let newCheckIns: DailyCheckIn[];
          if (existing) {
            if (existing.completedPracticeIds.includes(practiceId)) {
              return state;
            }
            newCheckIns = state.progress.checkIns.map((c) =>
              c.date === date
                ? {
                    ...c,
                    completedPracticeIds: [
                      ...c.completedPracticeIds,
                      practiceId,
                    ],
                    vibration: vibration ?? c.vibration,
                  }
                : c
            );
          } else {
            newCheckIns = [
              ...state.progress.checkIns,
              { date, completedPracticeIds: [practiceId], vibration },
            ];
          }

          const last = state.progress.lastCheckInDate;
          const today = todayStr();
          let streak = state.progress.currentStreak;
          if (date === today) {
            if (!last) {
              streak = 1;
            } else if (last === today) {
              // same day, no change
            } else if (daysBetween(last, today) === 1) {
              streak = state.progress.currentStreak + 1;
            } else {
              streak = 1;
            }
          }
          const longest = Math.max(state.progress.longestStreak, streak);

          return {
            progress: {
              ...state.progress,
              checkIns: newCheckIns,
              lastCheckInDate: date,
              currentStreak: streak,
              longestStreak: longest,
            },
          };
        }),
      unlockLevel: (level) =>
        set((state) => ({
          progress: {
            ...state.progress,
            unlockedLevels: state.progress.unlockedLevels.includes(level)
              ? state.progress.unlockedLevels
              : [...state.progress.unlockedLevels, level].sort((a, b) => a - b),
          },
        })),
      startJourney: () =>
        set((state) => {
          if (state.progress.currentJourneyDay > 0) return state;
          return {
            progress: {
              ...state.progress,
              currentJourneyDay: 1,
              journeyStartedAt: Date.now(),
            },
          };
        }),
      completeDayN: (n) =>
        set((state) => {
          if (state.progress.journeyDaysCompleted.includes(n)) {
            return state;
          }
          const completed = [...state.progress.journeyDaysCompleted, n].sort(
            (a, b) => a - b
          );
          const nextDay = Math.min(21, Math.max(state.progress.currentJourneyDay, n) + 1);
          return {
            progress: {
              ...state.progress,
              journeyDaysCompleted: completed,
              currentJourneyDay:
                state.progress.currentJourneyDay === 0 ? nextDay : nextDay,
            },
          };
        }),
      setBurnoutResult: (score, tier, answers) =>
        set((state) => ({
          progress: {
            ...state.progress,
            burnoutScore: score,
            burnoutTier: tier,
            burnoutAnsweredAt: Date.now(),
            burnoutAnswers: answers,
          },
        })),
      reset: () => set({ progress: defaultProgress }),
    }),
    {
      name: 'soma:progress',
      storage: createJSONStorage(() => zustandAsyncStorage),
      // ⚠️ DEV PREVIEW migration: force-unlocks all levels for any existing
      // persisted state so returning users immediately see paid material.
      // Bump this version + remove the override when re-introducing real gating.
      version: 2,
      migrate: (persisted: unknown) => {
        const state = (persisted ?? {}) as { progress?: Partial<ExtendedProgress> };
        return {
          ...state,
          progress: {
            ...defaultProgress,
            ...(state.progress ?? {}),
            unlockedLevels: DEV_UNLOCK_ALL_LEVELS,
          },
        } as { progress: ExtendedProgress };
      },
    }
  )
);
