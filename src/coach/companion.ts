/**
 * Within — Companion.
 *
 * The single voice that holds the user across every screen. Today's
 * version is a rule-based mapping from {mood, stage, time of day, last
 * practice, days on path} → a short message + an optional practice
 * override that beats the default "next thing in stage".
 *
 * Voice rules (apply to every string in here):
 *   - warm, brief, body-aware
 *   - never clinical, never evangelical, never bossy
 *   - second person ("you")
 *   - end with a return to the user's agency where possible
 *   - one or two sentences max
 *
 * No React, no stores, no side effects — pure functions only so this is
 * trivial to test and trivial to evolve into a real LLM call later.
 */

import type { Mood } from '@/store/useCheckInStore';
import type { PathStage, PathPractice } from '@/data/path';
import { PATH_STAGES, getStage } from '@/data/path';

// ──────────────────────────────────────────────────────────────
// PUBLIC API
// ──────────────────────────────────────────────────────────────

export interface CompanionInput {
  /** First name only, if known. Empty string if unknown. */
  firstName: string;
  /** Today's recorded mood, if any. */
  mood?: Mood;
  /** Has the user already checked in today? */
  hasCheckedInToday: boolean;
  /** Stage the user is currently walking. */
  currentStage: PathStage;
  /** Day count since they entered the current stage. */
  daysInStage: number;
  /** Practices completed in current stage. */
  practicesDone: number;
  practicesTotal: number;
  /** The default next practice (what the path store wants to suggest). */
  defaultNext: PathPractice | null;
  /** Current local hour, 0-23. */
  hour: number;
}

export interface CompanionMessage {
  /** Short single-line greeting placed under the locator. */
  line: string;
  /** Optional override — a different practice better suited to today's mood. */
  practiceOverride?: PathPractice | null;
  /** Why this override was chosen — surfaced to the user as a soft note. */
  overrideReason?: string;
}

/**
 * Single entry point. Reads state, returns what the Today screen renders.
 */
export function getCompanionMessage(input: CompanionInput): CompanionMessage {
  const line = pickLine(input);
  const override = pickPracticeOverride(input);

  return {
    line,
    practiceOverride: override?.practice,
    overrideReason: override?.reason,
  };
}

// ──────────────────────────────────────────────────────────────
// LINE PICKER
// ──────────────────────────────────────────────────────────────

function pickLine(input: CompanionInput): string {
  const { firstName, mood, hasCheckedInToday, currentStage, daysInStage, practicesDone, practicesTotal, hour } = input;
  const name = firstName ? `, ${firstName}` : '';
  const pct = practicesTotal > 0 ? practicesDone / practicesTotal : 0;

  // ── Mood-aware lines take precedence. ──
  if (mood) {
    switch (mood) {
      case 'heavy':
        return pick([
          'Heavy is information, not a verdict. Move slowly today.',
          `If today is heavy${name}, the work is to be held — not to push.`,
          'Heavy days are when the body asks for less, not more. Honour that.',
        ], dayHash());
      case 'tender':
        return pick([
          'Tender is sacred. Stay with it — do not numb it.',
          'Tender means something underneath is asking to be heard.',
          'Soften the day to meet what is tender. Nothing needs solving.',
        ], dayHash());
      case 'steady':
        return pick([
          'Steady is a gift. Today is a good day to go a little deeper.',
          'Use steady wisely — this is when real work lands.',
          'You are landed. Pick one thing and walk it through.',
        ], dayHash());
      case 'open':
        return pick([
          'Open is when the body says yes. Move toward what calls.',
          'Stay in the open — this is the state new patterns wire in.',
          'When you are open, the answer that arrives is usually true.',
        ], dayHash());
      case 'wired':
        return pick([
          'Wired is the nervous system asking for the exhale, not more input.',
          'Bring the wire down before you do anything else today.',
          'When you are wired, breath beats thinking. Always.',
        ], dayHash());
    }
  }

  // ── No mood yet — invite the check-in. ──
  if (!hasCheckedInToday) {
    if (hour < 11) return `Good morning${name}. Tell me how you actually are — one tap.`;
    if (hour < 17) return 'A mid-day check-in often shifts the rest of the day.';
    if (hour < 21) return 'Before you wind down — where is your body, honestly?';
    return 'A small check-in before sleep. The body listens harder at night.';
  }

  // ── Stage-aware lines (no mood signal but they checked in earlier). ──
  if (practicesTotal > 0 && pct >= 0.6) {
    return `You are close to walking ${currentStage.name}. One more piece, then we move.`;
  }
  if (practicesDone === 0) {
    if (currentStage.order === 1) {
      return 'Welcome. The first step is small. Trust the order.';
    }
    return `Stage ${currentStage.order} — ${currentStage.name}. Begin where you are.`;
  }
  if (daysInStage >= 14) {
    return `${daysInStage} days in ${currentStage.name}. Notice what has already shifted.`;
  }
  return `You are walking ${currentStage.name}. Today: one breath at a time.`;
}

// ──────────────────────────────────────────────────────────────
// PRACTICE OVERRIDE PICKER
// ──────────────────────────────────────────────────────────────

/**
 * For certain moods, the path's next-in-line practice is wrong for the
 * user RIGHT NOW. We override with something that meets the body where
 * it is — without leaving the stage entirely.
 *
 *   heavy   → grounding breath or chakra letter (slow, held)
 *   tender  → 4-7-8 (regulate) or gratitude (orient toward what is)
 *   steady  → keep the default — they're ready
 *   open    → keep the default — they're ready
 *   wired   → 4-7-8 or box breath (calm the spike before anything else)
 *
 * The override only fires if the override practice exists in the user's
 * current stage OR is a universal stage-1/2 (Ground) safety practice.
 * Otherwise we silently leave the default in place.
 */
function pickPracticeOverride(input: CompanionInput): { practice: PathPractice; reason: string } | null {
  const { mood, currentStage } = input;
  if (!mood) return null;

  const recommendedIds: Record<Mood, string[]> = {
    heavy: ['ground-grounding-breath', 'ground-4-7-8', 'release-heart-letter'],
    tender: ['ground-4-7-8', 'rewire-gratitude', 'release-heart-letter'],
    steady: [],
    open: [],
    wired: ['ground-4-7-8', 'ground-box-breath', 'ground-grounding-breath'],
  };

  const reasonByMood: Record<Mood, string> = {
    heavy: 'Today reads heavy — starting with something held instead.',
    tender: 'Today reads tender — beginning with regulation, not depth.',
    steady: '',
    open: '',
    wired: 'Today reads wired — the breath comes before anything else.',
  };

  const candidates = recommendedIds[mood];
  if (candidates.length === 0) return null;

  // Prefer a candidate that lives in the user's current stage, then
  // fall back to any candidate (always reachable across the app).
  for (const id of candidates) {
    const here = currentStage.practices.find((p) => p.id === id);
    if (here) return { practice: here, reason: reasonByMood[mood] };
  }
  for (const id of candidates) {
    for (const stage of PATH_STAGES) {
      const p = stage.practices.find((x) => x.id === id);
      if (p) return { practice: p, reason: reasonByMood[mood] };
    }
  }
  return null;
}

// ──────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ──────────────────────────────────────────────────────────────

/**
 * Cheap deterministic per-day hash so the user sees the same line all
 * day (not a different one every render) but a different one tomorrow.
 */
function dayHash(): number {
  const d = new Date();
  return d.getFullYear() * 1000 + d.getMonth() * 32 + d.getDate();
}

function pick<T>(arr: readonly T[], seed: number): T {
  if (arr.length === 0) {
    throw new Error('pick called with empty array');
  }
  return arr[Math.abs(seed) % arr.length]!;
}

/**
 * Optional convenience — surface a stage by id without re-importing.
 */
export function lookupStage(stageId: string) {
  return getStage(stageId as never);
}
