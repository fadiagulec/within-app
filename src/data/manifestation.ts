/**
 * Manifestation & vision prompts — data loader.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const visionFile = require('@/assets/content/vision-prompts.json') as VisionFile;

export interface VisionPrompt {
  id: string;
  category: string;
  prompt?: string;
  reflection?: string;
  framing?: string;
  oldBelief?: string;
  newBelief?: string;
  integration?: string;
  title?: string;
  duration?: number;
  instructions?: string;
  bestTime?: string;
}

interface VisionFile {
  library: {
    title: string;
    description: string;
    totalPrompts: number;
    philosophy: string;
  };
  visionSetting: VisionPrompt[];
  limitingBeliefRewrites: VisionPrompt[];
  gratitudeActivations: VisionPrompt[];
  dailyIntentionRituals: VisionPrompt[];
  moonRituals?: VisionPrompt[];
  weeklyReview?: VisionPrompt[];
}

export const manifestationLibrary = visionFile.library;
export const visionSettingPrompts: VisionPrompt[] = visionFile.visionSetting;
export const limitingBeliefRewrites: VisionPrompt[] = visionFile.limitingBeliefRewrites;
export const gratitudeActivations: VisionPrompt[] = visionFile.gratitudeActivations;
export const dailyIntentionRituals: VisionPrompt[] = visionFile.dailyIntentionRituals;
export const moonRituals: VisionPrompt[] = visionFile.moonRituals ?? [];
export const weeklyReview: VisionPrompt[] = visionFile.weeklyReview ?? [];

export type VisionCategoryKey =
  | 'visionSetting'
  | 'limitingBeliefRewrites'
  | 'gratitudeActivations'
  | 'dailyIntentionRituals'
  | 'moonRituals'
  | 'weeklyReview';

export function getVisionPrompts(cat: VisionCategoryKey): VisionPrompt[] {
  switch (cat) {
    case 'visionSetting':
      return visionSettingPrompts;
    case 'limitingBeliefRewrites':
      return limitingBeliefRewrites;
    case 'gratitudeActivations':
      return gratitudeActivations;
    case 'dailyIntentionRituals':
      return dailyIntentionRituals;
    case 'moonRituals':
      return moonRituals;
    case 'weeklyReview':
      return weeklyReview;
  }
}

/** Returns a random vision-setting prompt (used when suggesting intentions). */
export function getRandomVisionSuggestion(): VisionPrompt | undefined {
  if (visionSettingPrompts.length === 0) return undefined;
  return visionSettingPrompts[
    Math.floor(Math.random() * visionSettingPrompts.length)
  ];
}

/** The morning activation ritual — the very first daily ritual. */
export function getMorningActivationRitual(): VisionPrompt | undefined {
  return dailyIntentionRituals[0];
}
