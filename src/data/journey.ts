/**
 * 21-Day Burnout Recovery Journey — data loader.
 * Loads journey-map.json and exposes helpers for the UI.
 */
import type { ChakraKey } from '@/types';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const journeyMap = require('@/assets/content/journey-map.json') as JourneyMapFile;

export type JourneyReferenceType = 'breathwork' | 'meditation' | 'chakra';

export interface JourneyPractice {
  type: JourneyReferenceType;
  reference: string;
  duration: number;
  title: string;
}

export interface JourneyDay {
  day: number;
  week: 1 | 2 | 3;
  weekTheme: 'GROUND' | 'RELEASE' | 'RISE';
  dayTitle: string;
  chakra: ChakraKey;
  hook: string;
  morningPractice: JourneyPractice;
  eveningSession: JourneyPractice;
  journalingPrompt: string;
  integrationAction: string;
  reflectionQuestion: string;
  mantra: string;
  scienceNote: string;
}

export interface JourneyWeek {
  week: 1 | 2 | 3;
  theme: 'GROUND' | 'RELEASE' | 'RISE';
  focus: string;
  color: string;
  days: string;
}

export interface JourneyProgram {
  title: string;
  subtitle: string;
  description: string;
  totalDays: number;
  dailyTimeCommitment: string;
  weeks: JourneyWeek[];
}

interface JourneyMapFile {
  program: JourneyProgram;
  days: JourneyDay[];
}

export const journeyProgram: JourneyProgram = journeyMap.program;
export const journeyDays: JourneyDay[] = journeyMap.days;
export const journeyWeeks: JourneyWeek[] = journeyMap.program.weeks;

/** Returns the day entry for the given 1-based day number (1..21). */
export function getDay(n: number): JourneyDay | undefined {
  return journeyDays.find((d) => d.day === n);
}

/** Returns all 7 days in the given week (1..3). */
export function getWeek(n: 1 | 2 | 3): JourneyDay[] {
  return journeyDays.filter((d) => d.week === n);
}

/** Returns the week meta for the given 1..3. */
export function getWeekMeta(n: 1 | 2 | 3): JourneyWeek | undefined {
  return journeyWeeks.find((w) => w.week === n);
}

export interface JourneyUserLike {
  currentJourneyDay?: number;
}

/**
 * Returns the user's current day (1..21) or 1 if not started.
 * Pass the progress store's currentJourneyDay value.
 */
export function getCurrentDay(user: JourneyUserLike): JourneyDay {
  const n = Math.max(1, Math.min(21, user.currentJourneyDay ?? 1));
  const day = getDay(n);
  if (!day) {
    // Fallback to day 1 if data is somehow corrupted.
    return journeyDays[0] as JourneyDay;
  }
  return day;
}

/** Maps a journey practice reference to an in-app session id. */
export function referenceToSessionId(ref: JourneyPractice): string {
  // e.g. "breathwork/05-box-breath.txt" -> attempt known mappings.
  const filename = ref.reference.split('/').pop() ?? '';
  const base = filename.replace(/\.txt$/, '');
  // Map breathwork filenames to our existing ids.
  if (ref.type === 'breathwork') {
    if (base.includes('box-breath')) return 'breath-box';
    if (base.includes('four-seven-eight') || base.includes('4-7-8')) return 'breath-4-7-8';
    if (base.includes('alternate-nostril')) return 'breath-alternate-nostril';
    if (base.includes('diaphragm')) return 'breath-diaphragm';
    if (base.includes('fire-breath')) return 'breath-fire';
    return `breath-${base}`;
  }
  if (ref.type === 'meditation') {
    if (base.includes('morning-practice')) return 'med-morning-practice';
    if (base.includes('deep-rest')) return 'med-deep-rest';
    if (base.includes('body-temple')) return 'med-body-temple';
    if (base.includes('super-performance')) return 'med-super-performance';
    if (base.includes('abundance')) return 'med-abundance';
    return `med-${base}`;
  }
  if (ref.type === 'chakra') {
    // chakras/01-root-01-awaken.txt -> chakra-root-awaken
    const m = base.match(/\d+-([a-zA-Z]+)-\d+-(awaken|release|activate)/);
    if (m && m[1] && m[2]) {
      const key = m[1] === 'thirdeye' ? 'thirdEye' : m[1];
      return `chakra-${key}-${m[2]}`;
    }
    return `chakra-${base}`;
  }
  return base;
}
