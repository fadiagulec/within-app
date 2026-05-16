/**
 * SOMA - Wheel of Life Store
 *
 * Persisted history of Wheel of Life results. The Wheel is the app's
 * new front door and ongoing check-in — each completion is saved so
 * the user (and the rest of the app) can see trend data over time.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';
import {
  WheelResult,
  LifeAreaId,
  calculateWheelResult,
} from '@/data/wheel-of-life';

interface WheelState {
  history: WheelResult[];
  currentDraft: Partial<Record<LifeAreaId, number>>;

  setDraftScore: (area: LifeAreaId, score: number) => void;
  clearDraft: () => void;

  commitDraft: () => WheelResult | null;
  addResult: (result: WheelResult) => void;

  getLatest: () => WheelResult | undefined;
  getHistory: () => WheelResult[];
  getTrend: () =>
    | {
        first: WheelResult;
        latest: WheelResult;
        averageDelta: number;
        improvedAreas: LifeAreaId[];
        regressedAreas: LifeAreaId[];
      }
    | null;

  reset: () => void;
}

export const useWheelStore = create<WheelState>()(
  persist(
    (set, get) => ({
      history: [],
      currentDraft: {},

      setDraftScore: (area, score) =>
        set((state) => ({
          currentDraft: { ...state.currentDraft, [area]: score },
        })),

      clearDraft: () => set({ currentDraft: {} }),

      commitDraft: () => {
        const draft = get().currentDraft;
        const keys: LifeAreaId[] = [
          'health',
          'career',
          'money',
          'relationships',
          'romance',
          'growth',
          'environment',
          'fun',
        ];
        // Ensure full object — fill any missing with 5 (neutral) as a safety net.
        const scores: Record<LifeAreaId, number> = {} as Record<
          LifeAreaId,
          number
        >;
        for (const k of keys) {
          const v = draft[k];
          if (typeof v !== 'number') return null;
          scores[k] = v;
        }
        const result = calculateWheelResult(scores);
        set((state) => ({
          history: [...state.history, result],
          currentDraft: {},
        }));
        return result;
      },

      addResult: (result) =>
        set((state) => ({
          history: [...state.history, result],
        })),

      getLatest: () => {
        const h = get().history;
        return h.length > 0 ? h[h.length - 1] : undefined;
      },

      getHistory: () => get().history,

      getTrend: () => {
        const h = get().history;
        if (h.length < 2) return null;
        const first = h[0]!;
        const latest = h[h.length - 1]!;
        const keys = Object.keys(first.scores) as LifeAreaId[];
        const improved: LifeAreaId[] = [];
        const regressed: LifeAreaId[] = [];
        for (const k of keys) {
          const delta = latest.scores[k] - first.scores[k];
          if (delta >= 2) improved.push(k);
          if (delta <= -2) regressed.push(k);
        }
        return {
          first,
          latest,
          averageDelta: latest.average - first.average,
          improvedAreas: improved,
          regressedAreas: regressed,
        };
      },

      reset: () => set({ history: [], currentDraft: {} }),
    }),
    {
      name: 'soma:wheel',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      partialize: (state) => ({
        history: state.history,
        // Intentionally omit currentDraft — drafts are session-scoped.
      }),
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<WheelState>;
        return {
          ...current,
          ...p,
          history: Array.isArray(p.history) ? p.history : current.history,
          currentDraft: {}, // never restore stale drafts
        };
      },
    }
  )
);
