/**
 * Within — Onboarding store.
 *
 * Tracks whether the user has seen the welcome flow. Persisted to local
 * storage so we only show it on first launch (unless they reset, or
 * explicitly choose to see it again from the You tab).
 *
 * Intentionally tiny — the welcome flow is *story*, not data. We just
 * need to know whether to render it.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

interface OnboardingState {
  /** True once the user has completed OR skipped the welcome flow. */
  hasSeenWelcome: boolean;
  /** True once the user has taken the Wheel of Life from the welcome flow. */
  hasTakenWheel: boolean;

  markWelcomeSeen: () => void;
  markWheelTaken: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasSeenWelcome: false,
      hasTakenWheel: false,

      markWelcomeSeen: () => set({ hasSeenWelcome: true }),
      markWheelTaken: () => set({ hasTakenWheel: true, hasSeenWelcome: true }),
      resetOnboarding: () =>
        set({ hasSeenWelcome: false, hasTakenWheel: false }),
    }),
    {
      name: 'within-me-onboarding',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
    }
  )
);
