/**
 * Within — Path Progress Store.
 *
 * Tracks where the user is on the 7-stage transformational path.
 * The single source of truth for:
 *   - which stage they are currently walking
 *   - which practices they have completed (by practice id)
 *   - when each stage was completed (for the depth marker ceremony)
 *   - the last practice the user did (so we can suggest the next one)
 *
 * Persisted to local storage. No network calls.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';
import {
  PATH_STAGES,
  type PathStageId,
  type PathStage,
  getStage,
  getCornerstone,
  findStageForPractice,
} from '@/data/path';

interface PathState {
  /** Current stage the user is actively walking. Defaults to 'arrival'. */
  currentStageId: PathStageId;

  /** Set of completed practice ids. */
  completedPracticeIds: string[];

  /** When each stage was marked complete (ms timestamp). */
  stageCompletedAt: Partial<Record<PathStageId, number>>;

  /** When the user first entered each stage (ms timestamp). */
  stageEnteredAt: Partial<Record<PathStageId, number>>;

  /** Last practice id the user opened or completed. */
  lastPracticeId?: string;
  lastPracticeAt?: number;

  // ── Actions ──────────────────────────────────────────
  markPracticeComplete: (practiceId: string) => void;
  markPracticeOpened: (practiceId: string) => void;
  setCurrentStage: (stageId: PathStageId) => void;
  completeStage: (stageId: PathStageId) => void;
  resetPath: () => void;

  // ── Selectors ────────────────────────────────────────
  isPracticeComplete: (practiceId: string) => boolean;
  isStageComplete: (stageId: PathStageId) => boolean;
  stageProgress: (stageId: PathStageId) => { done: number; total: number; pct: number };
  currentStage: () => PathStage;
  /** Suggest the next practice for the user — uncompleted in the current stage. */
  suggestNextPractice: () => { stage: PathStage; practiceId: string } | null;
}

export const usePathStore = create<PathState>()(
  persist(
    (set, get) => ({
      currentStageId: 'arrival',
      completedPracticeIds: [],
      stageCompletedAt: {},
      stageEnteredAt: { arrival: Date.now() },
      lastPracticeId: undefined,
      lastPracticeAt: undefined,

      markPracticeComplete: (practiceId) => {
        const { completedPracticeIds } = get();
        if (completedPracticeIds.includes(practiceId)) return;
        set({
          completedPracticeIds: [...completedPracticeIds, practiceId],
          lastPracticeId: practiceId,
          lastPracticeAt: Date.now(),
        });
        // If user finishes a practice in a stage they have not yet entered,
        // soft-promote them to that stage so the Path UI follows them.
        const stage = findStageForPractice(practiceId);
        const currentStage = getStage(get().currentStageId);
        if (stage && currentStage && stage.order > currentStage.order) {
          const { stageEnteredAt } = get();
          if (!stageEnteredAt[stage.id]) {
            set({
              stageEnteredAt: { ...stageEnteredAt, [stage.id]: Date.now() },
            });
          }
        }
      },

      markPracticeOpened: (practiceId) => {
        set({
          lastPracticeId: practiceId,
          lastPracticeAt: Date.now(),
        });
      },

      setCurrentStage: (stageId) => {
        const { stageEnteredAt } = get();
        set({
          currentStageId: stageId,
          stageEnteredAt: stageEnteredAt[stageId]
            ? stageEnteredAt
            : { ...stageEnteredAt, [stageId]: Date.now() },
        });
      },

      completeStage: (stageId) => {
        const { stageCompletedAt } = get();
        set({
          stageCompletedAt: { ...stageCompletedAt, [stageId]: Date.now() },
        });
        // Auto-advance to next stage if there is one.
        const stage = getStage(stageId);
        if (stage) {
          const next = PATH_STAGES.find((s) => s.order === stage.order + 1);
          if (next) {
            get().setCurrentStage(next.id);
          }
        }
      },

      resetPath: () => {
        set({
          currentStageId: 'arrival',
          completedPracticeIds: [],
          stageCompletedAt: {},
          stageEnteredAt: { arrival: Date.now() },
          lastPracticeId: undefined,
          lastPracticeAt: undefined,
        });
      },

      // ── Selectors ──
      isPracticeComplete: (practiceId) => {
        return get().completedPracticeIds.includes(practiceId);
      },

      isStageComplete: (stageId) => {
        return !!get().stageCompletedAt[stageId];
      },

      stageProgress: (stageId) => {
        const stage = getStage(stageId);
        if (!stage) return { done: 0, total: 0, pct: 0 };
        const done = stage.practices.filter((p) =>
          get().completedPracticeIds.includes(p.id)
        ).length;
        const total = stage.practices.length;
        return { done, total, pct: total === 0 ? 0 : done / total };
      },

      currentStage: (): PathStage => {
        const id = get().currentStageId;
        return getStage(id) ?? PATH_STAGES[0]!;
      },

      suggestNextPractice: () => {
        const stage = get().currentStage();
        // First: try the cornerstone if not done.
        const cornerstone = getCornerstone(stage.id);
        if (cornerstone && !get().completedPracticeIds.includes(cornerstone.id)) {
          return { stage, practiceId: cornerstone.id };
        }
        // Else: first uncompleted practice in current stage.
        const next = stage.practices.find(
          (p) => !get().completedPracticeIds.includes(p.id)
        );
        if (next) return { stage, practiceId: next.id };
        // Stage complete: suggest first practice in next stage.
        const nextStage = PATH_STAGES.find((s) => s.order === stage.order + 1);
        if (nextStage && nextStage.practices[0]) {
          return { stage: nextStage, practiceId: nextStage.practices[0].id };
        }
        // End of path.
        return null;
      },
    }),
    {
      name: 'within-me-path-progress',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
    }
  )
);
