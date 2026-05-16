/**
 * SOMA — Coach Engine (v1, rule-based)
 *
 * Pure functions. No UI, no React, no side effects.
 * Reads chakra-spine + breathwork + meditations + chakra-content + journaling
 * and returns a daily protocol the Today tab can render directly.
 *
 * Inputs the engine accepts:
 *   - latest Wheel of Life result (for chakra selection)
 *   - recent completed session ids (so we don't suggest the same thing twice)
 *   - optional explicit "I feel ___" mood signal
 *   - optional time-of-day (morning/midday/evening) for tone bias
 *
 * Outputs (the shape Today tab consumes):
 *   - primaryChakra            — the chakra today's protocol is built around
 *   - briefingHeadline         — sharp one-liner ("Sacral 3/10. Settle the body.")
 *   - briefingDetail           — 1–2 sentence context
 *   - protocol                 — { breathwork, meditation, journalPrompt, totalMinutes }
 *   - affirmation              — today's adaptive affirmation
 *
 * v2 (future): wrap this output in an LLM synthesis layer for personalized
 * narrative + handle free-text "I feel ___" inputs that don't match a chip.
 */

import {
  CHAKRA_SPINE,
  CHAKRA_SPINE_ORDERED,
  ChakraSpineEntry,
  SpineChakraId,
} from '@/data/chakra-spine';
import { breathwork } from '@/data/breathwork';
import { meditations } from '@/data/meditations';
import { CHAKRA_CONTENT, ChakraId } from '@/data/chakra-content';
import { journalPrompts } from '@/data/journaling';
import { LifeAreaId, LIFE_AREAS, WheelResult } from '@/data/wheel-of-life';
import type { BreathworkSession, Meditation } from '@/types';

// ============ TYPES ============

export type TimeOfDay = 'morning' | 'midday' | 'evening';

/** Free-form mood signal — matches the "I feel ___" chips on breathwork-library. */
export type MoodSignal =
  | 'anxious'
  | 'tired'
  | 'angry'
  | 'scattered'
  | 'stuck'
  | 'sleep'
  | 'sad'
  | 'foggy';

export interface CoachInput {
  latestWheel: WheelResult | undefined;
  completedSessionIds: string[];
  mood?: MoodSignal;
  timeOfDay?: TimeOfDay;
  /** Override the auto-selected chakra (e.g. user explicitly tapped one). */
  explicitChakra?: SpineChakraId;
}

export interface DailyProtocol {
  breathwork: BreathworkSession;
  meditation: Meditation | undefined;
  journalPrompt: string;
  totalMinutes: number;
}

export interface CoachOutput {
  primaryChakra: ChakraSpineEntry;
  briefingHeadline: string;
  briefingDetail: string;
  protocol: DailyProtocol;
  affirmation: string;
}

// ============ MOOD → CHAKRA HEURISTIC ============
// When the user gives an explicit mood signal (not a Wheel score), map it
// to the chakra most likely to need attention. Sourced from the same
// nervous-system framing as breathwork-nervous-system.ts.

const MOOD_TO_CHAKRA: Record<MoodSignal, SpineChakraId> = {
  anxious: 'root',          // fear lives here
  tired: 'solar-plexus',    // depleted will / fire
  angry: 'solar-plexus',    // unmetabolized power
  scattered: 'third-eye',   // can't see clearly
  stuck: 'sacral',          // emotional / creative block
  sleep: 'crown',           // can't shift to rest mode
  sad: 'heart',             // grief
  foggy: 'third-eye',       // cognition cloud
};

// ============ LIFE-AREA → CHAKRA MAPPING ============
// Wheel of Life areas map directly to chakras via the LIFE_AREAS data —
// each area already declares its primary chakra. We just normalize the
// id form so it matches our spine keys.

function lifeAreaToSpineChakra(area: LifeAreaId): SpineChakraId {
  const def = LIFE_AREAS.find((a) => a.id === area);
  if (!def) return 'root'; // safe default
  // LifeArea.chakra is ChakraId; the spine accepts ChakraId | 'soul-star'
  return def.chakra as SpineChakraId;
}

// ============ CHAKRA SELECTION ============

function selectPrimaryChakra(input: CoachInput): ChakraSpineEntry {
  // 1. Explicit override wins.
  if (input.explicitChakra) {
    return CHAKRA_SPINE[input.explicitChakra];
  }
  // 2. Mood signal beats Wheel scores (it's "now" data).
  if (input.mood) {
    return CHAKRA_SPINE[MOOD_TO_CHAKRA[input.mood]];
  }
  // 3. Lowest Wheel score → its chakra.
  if (input.latestWheel) {
    const id = lifeAreaToSpineChakra(input.latestWheel.lowestArea);
    return CHAKRA_SPINE[id];
  }
  // 4. No data → default to Root (the foundation).
  return CHAKRA_SPINE.root;
}

// ============ PROTOCOL ASSEMBLY ============

/** Pick a session by id from a list, falling back to first available. */
function pickFirstAvailable<T extends { id: string }>(
  ids: string[],
  pool: T[],
  exclude: string[]
): T | undefined {
  for (const id of ids) {
    if (exclude.includes(id)) continue;
    const found = pool.find((p) => p.id === id);
    if (found) return found;
  }
  // Fallback: any in the list, even if recently completed
  for (const id of ids) {
    const found = pool.find((p) => p.id === id);
    if (found) return found;
  }
  return undefined;
}

function pickJournalPrompt(chakraId: ChakraId, exclude: string[]): string {
  const pool = journalPrompts.filter((p) => p.chakra === chakraId);
  const fresh = pool.find((p) => !exclude.includes(p.id));
  if (fresh) return fresh.prompt;
  if (pool.length > 0 && pool[0]) return pool[0].prompt;
  // Final fallback — content-agnostic prompt that always works
  return 'What is one true thing you noticed today?';
}

function pickAffirmation(chakraId: ChakraId, dateSeed: number): string {
  const content = CHAKRA_CONTENT[chakraId];
  if (!content || content.affirmations.length === 0) {
    return 'I am exactly where I am meant to be.';
  }
  // Deterministic per-day rotation so the affirmation is stable across
  // refreshes within a single day, but rotates daily.
  const idx = dateSeed % content.affirmations.length;
  return content.affirmations[idx] ?? content.affirmations[0]!;
}

function buildProtocol(
  chakra: ChakraSpineEntry,
  exclude: string[]
): DailyProtocol {
  const breath = pickFirstAvailable(chakra.breathworkIds, breathwork, exclude);
  const med = pickFirstAvailable(chakra.meditationIds, meditations, exclude);

  // Breathwork is mandatory — every chakra has one in the spine.
  // The non-null assertion is safe per the spine population (all 8 have ≥1 id).
  const breathOrFallback = breath ?? breathwork[0]!;

  // Soul Star uses a non-ChakraId — its journal prompts live elsewhere.
  // For v1 we route Soul Star to crown's prompts (closest semantically).
  const promptChakra: ChakraId =
    chakra.id === 'soul-star' ? 'crown' : (chakra.id as ChakraId);
  const prompt = pickJournalPrompt(promptChakra, exclude);

  const totalMinutes = breathOrFallback.durationMin + (med?.durationMin ?? 0);

  return {
    breathwork: breathOrFallback,
    meditation: med,
    journalPrompt: prompt,
    totalMinutes,
  };
}

// ============ BRIEFING COPY ============
// Sharp, plain English. No "embark on your sacred journey" language.

function buildBriefing(
  chakra: ChakraSpineEntry,
  input: CoachInput
): { headline: string; detail: string } {
  const score = input.latestWheel?.scores[scoreKeyForChakra(chakra)];

  if (input.mood) {
    const moodLabel = input.mood.charAt(0).toUpperCase() + input.mood.slice(1);
    return {
      headline: `${moodLabel}? Start with the ${chakra.name}.`,
      detail: `${chakra.name} runs your ${chakra.lifeArea.toLowerCase()}. Settle it first, then everything else gets easier.`,
    };
  }

  if (score !== undefined) {
    return {
      headline: `${chakra.name} ${score}/10. Today: tend to it.`,
      detail: `Your lowest area is ${chakra.lifeArea.toLowerCase()}. The ${chakra.name.toLowerCase()} chakra is what governs it. Today's protocol opens that channel.`,
    };
  }

  return {
    headline: `Start at the ${chakra.name}.`,
    detail: `The ${chakra.name.toLowerCase()} is the foundation for ${chakra.lifeArea.toLowerCase()}. Begin here.`,
  };
}

/** Map a chakra back to the Wheel area key so we can pull its score. */
function scoreKeyForChakra(chakra: ChakraSpineEntry): LifeAreaId {
  // Find the LifeArea whose chakra matches this spine entry.
  // For Soul Star (no LifeArea direct match) fall back to 'fun' (lifeArea = Time and Presence is not in legacy LifeAreaId set).
  const match = LIFE_AREAS.find(
    (a) => a.chakra === (chakra.id as ChakraId)
  );
  return match ? match.id : 'health';
}

// ============ DATE SEED ============

function todayDateSeed(d: Date = new Date()): number {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// ============ PUBLIC API ============

/**
 * The single entry point used by the Today tab and any other coach surface.
 * Pure function — call it whenever, no side effects.
 */
export function buildDailyBriefing(input: CoachInput): CoachOutput {
  const chakra = selectPrimaryChakra(input);
  const protocol = buildProtocol(chakra, input.completedSessionIds);
  const briefing = buildBriefing(chakra, input);
  const promptChakra: ChakraId =
    chakra.id === 'soul-star' ? 'crown' : (chakra.id as ChakraId);
  const affirmation = pickAffirmation(promptChakra, todayDateSeed());

  return {
    primaryChakra: chakra,
    briefingHeadline: briefing.headline,
    briefingDetail: briefing.detail,
    protocol,
    affirmation,
  };
}

/** Convenience selector — for screens that just want the chakra. */
export function selectChakraForToday(input: CoachInput): ChakraSpineEntry {
  return selectPrimaryChakra(input);
}

/** Convenience selector — for the floating "I feel ___" wizard. */
export function buildBriefingForMood(
  mood: MoodSignal,
  completedSessionIds: string[] = []
): CoachOutput {
  return buildDailyBriefing({
    latestWheel: undefined,
    completedSessionIds,
    mood,
  });
}

/** All 8 chakras as ordered list — for when you need to render the spine. */
export const ALL_CHAKRAS = CHAKRA_SPINE_ORDERED;
