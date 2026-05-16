/**
 * SOMA — Smart Prompt Engine
 * --------------------------
 * Deterministic, rule-based selector for the home dashboard nudge.
 * Not AI. Not personalised in the LLM sense — it just reads the
 * user's current state and picks the highest-priority, most-honest
 * next action.
 *
 * Priority is top-down — the first matching rule wins. The default
 * is `null` (don't nag) — silence is a feature.
 *
 * Wire from `app/(tabs)/index.tsx` via `getSmartPrompt(...)`.
 */

import type { ChakraId } from '@/data/chakra-content';
import type { LifeAreaId } from '@/data/wheel-of-life';

export interface SmartPrompt {
  id: string;
  text: string; // the nudge text
  cta: string; // button label
  route: string; // where it goes
  routeParams?: Record<string, string>;
  priority: 'high' | 'mid' | 'low';
}

export interface SmartPromptContext {
  /** Days since the user last completed any session. 0 = today. */
  daysSinceLastSession: number;
  currentStreak: number;
  hasGetUnstuck: boolean;
  /** 0 = not started, 1..14 = mid-program. */
  currentJourneyDay: number;
  primaryChakra?: ChakraId;
  lowestWheelArea?: LifeAreaId;
  todayCheckIn?: {
    state: 'balanced' | 'underactive' | 'overactive';
    chakra: ChakraId;
  } | null;
  mostRecentEmotion?: string;
  /** Total sessions completed across the user's lifetime. Used to decide
   *  whether the user is "warm" enough for a paid nudge. */
  totalSessionsCompleted?: number;
}

/**
 * Picks the single best prompt for the current state, or null.
 *
 * Rule order (top match wins):
 *   1. Streak in danger (3+ days off, 7+ day streak built up)
 *   2. Today's check-in shows underactive chakra → release session
 *   3. Today's check-in shows overactive chakra → ground first
 *   4. Warm but unconverted (3+ sessions, no journey, no purchase) → paywall
 *   5. Wheel done with weak area + no journey → chakra invitation
 *   6. Cold start (no streak) → tiny re-entry
 *   7. Otherwise — null
 */
export function getSmartPrompt(
  context: SmartPromptContext
): SmartPrompt | null {
  const {
    daysSinceLastSession,
    currentStreak,
    hasGetUnstuck,
    currentJourneyDay,
    lowestWheelArea,
    todayCheckIn,
    totalSessionsCompleted = 0,
  } = context;

  // 1. Streak in danger — protect a real habit before anything else.
  if (daysSinceLastSession >= 3 && currentStreak >= 7) {
    return {
      id: 'streak-rescue',
      text: "You've been doing the work. Don't lose your streak — 4 minutes is enough.",
      cta: 'Open 4-7-8 →',
      route: '/breathwork/[id]',
      routeParams: { id: 'breath-4-7-8' },
      priority: 'high',
    };
  }

  // 2. Underactive — meet it through release.
  if (todayCheckIn?.state === 'underactive') {
    return {
      id: 'underactive-release',
      text: 'Your body is asking for release. Meet it where it is.',
      cta: 'Begin release →',
      route: '/chakra/[id]',
      routeParams: { id: todayCheckIn.chakra },
      priority: 'high',
    };
  }

  // 3. Overactive — regulate before opening.
  if (todayCheckIn?.state === 'overactive') {
    return {
      id: 'overactive-ground',
      text: 'Over-activation. Regulate first — the rest can wait.',
      cta: 'Box breath →',
      route: '/breathwork/[id]',
      routeParams: { id: 'breath-box' },
      priority: 'high',
    };
  }

  // 4. Warm but unconverted — the right moment for the flagship.
  if (
    !hasGetUnstuck &&
    currentJourneyDay === 0 &&
    totalSessionsCompleted >= 3
  ) {
    return {
      id: 'ready-for-flagship',
      text: "You're ready for the full reset.",
      cta: 'Begin Get Unstuck →',
      route: '/paywall-get-unstuck',
      priority: 'mid',
    };
  }

  // 5. Wheel snapshot exists, weak area surfaced, no journey yet.
  if (lowestWheelArea && currentJourneyDay === 0) {
    const chakraId = lifeAreaToChakraId(lowestWheelArea);
    return {
      id: 'wheel-weak-area',
      text: 'There is one area asking for attention. Begin there.',
      cta: 'Open the practice →',
      route: '/chakra/[id]',
      routeParams: { id: chakraId },
      priority: 'mid',
    };
  }

  // 6. Cold start — gentle re-entry, no judgment.
  if (currentStreak === 0) {
    return {
      id: 'cold-start',
      text: 'Begin again. One breath.',
      cta: 'Open 4-7-8 →',
      route: '/breathwork/[id]',
      routeParams: { id: 'breath-4-7-8' },
      priority: 'low',
    };
  }

  // 7. Default — silence.
  return null;
}

// ============ HELPERS ============

/**
 * Maps a wheel-of-life area to its primary chakra. Mirrors the
 * `LIFE_AREAS[].healingPath.chakra` mapping from `wheel-of-life.ts`
 * but is kept here as a small lookup so this module stays standalone.
 */
function lifeAreaToChakraId(area: LifeAreaId): ChakraId {
  switch (area) {
    case 'health':
      return 'root';
    case 'career':
      return 'solar-plexus';
    case 'money':
      return 'solar-plexus';
    case 'relationships':
      return 'heart';
    case 'romance':
      return 'heart';
    case 'growth':
      return 'third-eye';
    case 'environment':
      return 'root';
    case 'fun':
      return 'sacral';
  }
}
