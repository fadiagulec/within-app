/**
 * Journaling prompts — data loader.
 */
import type { ChakraKey } from '@/types';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const promptsFile = require('@/assets/content/journaling-prompts.json') as JournalingFile;

export type JournalCategory =
  | 'morning'
  | 'evening'
  | 'chakra'
  | 'burnout'
  | 'vision'
  | 'shadow'
  | 'gratitude';

export interface JournalPrompt {
  id: string;
  category: JournalCategory;
  chakra?: ChakraKey;
  prompt: string;
  followUp?: string;
  suggestedDuration?: number;
}

interface JournalingFile {
  library: {
    title: string;
    description: string;
    totalPrompts: number;
    categories: Record<string, string>;
  };
  prompts: JournalPrompt[];
}

export const journalPrompts: JournalPrompt[] = promptsFile.prompts;
export const journalCategoryDescriptions: Record<string, string> = promptsFile.library.categories;

export const JOURNAL_CATEGORIES: JournalCategory[] = [
  'morning',
  'evening',
  'chakra',
  'burnout',
  'vision',
  'shadow',
  'gratitude',
];

/** Returns all prompts in a given category. */
export function getPromptByCategory(cat: JournalCategory): JournalPrompt[] {
  return journalPrompts.filter((p) => p.category === cat);
}

/** Returns all chakra-linked prompts for the given chakra. */
export function getChakraPrompt(chakra: ChakraKey): JournalPrompt[] {
  return journalPrompts.filter((p) => p.chakra === chakra);
}

/**
 * Returns a deterministic daily prompt (rotates through morning+evening pool).
 * Same date -> same prompt, so the UI is stable through the day.
 */
export function getDailyPrompt(date: Date = new Date()): JournalPrompt {
  const pool = journalPrompts.filter(
    (p) => p.category === 'morning' || p.category === 'evening'
  );
  const seed =
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const idx = seed % pool.length;
  return pool[idx] as JournalPrompt;
}

/** Picks a single prompt at random from a category. */
export function getRandomPrompt(cat: JournalCategory): JournalPrompt | undefined {
  const pool = getPromptByCategory(cat);
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Picks a prompt for a specific journey day (by deterministic index). */
export function getPromptForJourneyDay(day: number, chakra?: ChakraKey): JournalPrompt {
  if (chakra) {
    const pool = getChakraPrompt(chakra);
    if (pool.length > 0) {
      return pool[(day - 1) % pool.length] as JournalPrompt;
    }
  }
  const pool = journalPrompts.filter((p) => p.category === 'burnout');
  if (pool.length > 0) return pool[(day - 1) % pool.length] as JournalPrompt;
  return journalPrompts[0] as JournalPrompt;
}
