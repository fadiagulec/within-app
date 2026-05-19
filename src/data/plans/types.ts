/**
 * SOMA — 21-Day Plan types.
 *
 * A Plan is a structured arc (typically 21 days) that the user enrolls in.
 * Each PlanDay is a single day's protocol, the same shape as a Coach
 * Engine daily briefing — but pre-authored, not derived from Wheel scores.
 *
 * The same plan-runner UI in app/plan/[id].tsx renders any Plan
 * registered in src/data/plans/index.ts.
 */

import type { SpineChakraId } from '@/data/chakra-spine';

export type PlanPhase =
  // Original 21-day plans (open → release → integrate)
  | 'open'
  | 'release'
  | 'integrate'
  // NRM 28-day arc (excavate → dissolve → install → activate)
  | 'excavate'
  | 'dissolve'
  | 'install'
  | 'activate';

export interface PlanDay {
  /** 1-based day number within the plan. */
  day: number;
  phase: PlanPhase;
  /** The chakra this day's work centres on. */
  chakraId: SpineChakraId;
  /** Short, punchy title. "Day 1 · Soften the body." */
  title: string;
  /** One-line context — what today is about. */
  intent: string;
  /** Today's adaptive affirmation. */
  affirmation: string;
  /** Breathwork id from src/data/breathwork.ts */
  breathworkId: string;
  /** Practice — either a meditation id, unblocking script, frequency
   *  session, or hypnotherapy session. Hypnotherapy is rendered inline
   *  via SpeechPlayer using the buildNrmScript() generator.
   *
   *  For 'hypnotherapy' practice:
   *    armor       — the weight/belief/fear dissolving in the river today
   *    emergedSelf — the specific identity dimension installed after float
   */
  practice:
    | { kind: 'meditation'; id: string }
    | { kind: 'unblocking'; chakraId: SpineChakraId }
    | { kind: 'frequency'; chakraId: SpineChakraId; minutes: number }
    | { kind: 'hypnotherapy'; armor: string; emergedSelf: string };
  /** Journal prompt — keep it short. 1–3 lines. */
  journalPrompt: string;
}

export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  /** Marketing description — sold separately or bundled. */
  description: string;
  durationDays: number;
  /** Hex color used as the plan's brand accent. */
  coverColor: string;
  /** USD price (if sold standalone) — null for "included with subscription". */
  priceUSD: number | null;
  /** Sales-page tagline — single sentence. */
  tagline: string;
  days: PlanDay[];
}
