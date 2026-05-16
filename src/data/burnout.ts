/**
 * Burnout Assessment — data loader + scoring.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const burnoutFile = require('@/assets/content/burnout-assessment.json') as BurnoutFile;

export type BurnoutCategory =
  | 'emotional_exhaustion'
  | 'cynicism'
  | 'reduced_accomplishment'
  | 'somatic';

export interface BurnoutQuestion {
  id: string;
  category: BurnoutCategory;
  text: string;
  scale: string;
}

export interface BurnoutTier {
  range: string;
  level: string;
  title: string;
  message: string;
  recommendation: {
    primary: string;
    journey: string;
    supporting: string[];
    additional?: string;
    urgency: 'low' | 'medium' | 'high' | 'critical';
    resources?: { label: string; type: string }[];
  };
  redFlag: boolean;
}

interface BurnoutFile {
  assessment: {
    title: string;
    subtitle: string;
    intro: string;
    timeEstimate: string;
    questionCount: number;
    scaleLabels: Record<string, string>;
  };
  categories: Record<
    BurnoutCategory,
    { name: string; description: string; weight: number }
  >;
  questions: BurnoutQuestion[];
  scoring: {
    method: string;
    calculation: string;
    tiers: BurnoutTier[];
  };
  safetyDisclaimer: string;
}

export const burnoutAssessment = burnoutFile.assessment;
export const burnoutQuestions: BurnoutQuestion[] = burnoutFile.questions;
export const burnoutCategories = burnoutFile.categories;
export const burnoutTiers: BurnoutTier[] = burnoutFile.scoring.tiers;
export const burnoutSafetyDisclaimer = burnoutFile.safetyDisclaimer;
export const burnoutScaleLabels = burnoutFile.assessment.scaleLabels;

export type BurnoutTierKey = 'mild' | 'moderate' | 'severe' | 'critical';

export interface BurnoutResult {
  score: number;
  maxScore: number;
  tier: BurnoutTierKey;
  tierInfo: BurnoutTier;
  categoryScores: Record<BurnoutCategory, { raw: number; max: number; pct: number }>;
  recommendation: BurnoutTier['recommendation'];
}

function tierKeyFromIndex(i: number): BurnoutTierKey {
  return (['mild', 'moderate', 'severe', 'critical'] as BurnoutTierKey[])[i] ?? 'mild';
}

/**
 * Scoring:
 * Sum answers (0-4). Weight somatic by 1.2. Max weighted score: 84 (nominally
 * 15 * 4 + 5 * 4 * 1.2 = 60 + 24 = 84).
 */
export function scoreBurnout(answers: Record<string, number>): BurnoutResult {
  const catRaw: Record<BurnoutCategory, number> = {
    emotional_exhaustion: 0,
    cynicism: 0,
    reduced_accomplishment: 0,
    somatic: 0,
  };
  const catCount: Record<BurnoutCategory, number> = {
    emotional_exhaustion: 0,
    cynicism: 0,
    reduced_accomplishment: 0,
    somatic: 0,
  };

  for (const q of burnoutQuestions) {
    const v = Math.max(0, Math.min(4, answers[q.id] ?? 0));
    catRaw[q.category] += v;
    catCount[q.category] += 1;
  }

  const somaticWeight = burnoutCategories.somatic.weight;
  const score =
    catRaw.emotional_exhaustion +
    catRaw.cynicism +
    catRaw.reduced_accomplishment +
    catRaw.somatic * somaticWeight;

  // Maximum possible: 15 regular * 4 + 5 somatic * 4 * 1.2 = 60 + 24 = 84.
  const maxScore = 84;

  const categoryScores: BurnoutResult['categoryScores'] = {
    emotional_exhaustion: buildCatScore(
      catRaw.emotional_exhaustion,
      catCount.emotional_exhaustion,
      1
    ),
    cynicism: buildCatScore(catRaw.cynicism, catCount.cynicism, 1),
    reduced_accomplishment: buildCatScore(
      catRaw.reduced_accomplishment,
      catCount.reduced_accomplishment,
      1
    ),
    somatic: buildCatScore(catRaw.somatic, catCount.somatic, somaticWeight),
  };

  // Tier mapping uses the JSON-declared ranges:
  // 0-20 mild, 21-40 moderate, 41-60 severe, 61-84 critical
  let tierIdx = 0;
  if (score >= 61) tierIdx = 3;
  else if (score >= 41) tierIdx = 2;
  else if (score >= 21) tierIdx = 1;
  else tierIdx = 0;

  const tierInfo = burnoutTiers[tierIdx] as BurnoutTier;

  return {
    score: Math.round(score * 10) / 10,
    maxScore,
    tier: tierKeyFromIndex(tierIdx),
    tierInfo,
    categoryScores,
    recommendation: tierInfo.recommendation,
  };
}

function buildCatScore(raw: number, count: number, weight: number) {
  const weighted = raw * weight;
  const max = count * 4 * weight;
  const pct = max === 0 ? 0 : weighted / max;
  return { raw: Math.round(weighted * 10) / 10, max, pct };
}

/** Convenience: pre-compute a result with all answers = 0 (for UI scaffolding). */
export function emptyBurnoutResult(): BurnoutResult {
  return scoreBurnout({});
}
