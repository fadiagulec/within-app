/**
 * Core type definitions for SOMA.
 */

export type ChakraKey =
  | 'root'
  | 'sacral'
  | 'solar'
  | 'heart'
  | 'throat'
  | 'thirdEye'
  | 'crown';

export type SessionKind = 'awaken' | 'release' | 'activate';

export interface Chakra {
  key: ChakraKey;
  index: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  name: string;
  sanskrit: string;
  mantra: string;
  color: string;
  glow: string;
  theme: string;
  element: string;
  bodyLocation: string;
  shadow: string;
  sessions: Session[];
}

export interface Session {
  id: string;
  chakraKey?: ChakraKey;
  kind?: SessionKind;
  category: 'chakra' | 'breathwork' | 'meditation';
  title: string;
  subtitle?: string;
  durationMin: number;
  mantra?: string;
  theme: string;
  levelRequired: number;
  filePath?: string;
}

export interface Meditation extends Session {
  category: 'meditation';
  bestTimeToUse?: string;
}

export interface BreathworkSession extends Session {
  category: 'breathwork';
  technique: string;
  safetyWarning?: string;
  science: string;
  chips: string[];
}

export interface Level {
  id: number;
  name: string;
  title: string;
  chakra: ChakraKey | 'foundation' | 'integration' | 'certification';
  priceUSD: number | 'free';
  included: string[];
  unlocks: string[];
  blurb: string;
}

/**
 * The 8 onboarding feeling keys — each maps to a chakra core emotion.
 * (Anxiety + Fear both map to Root — anxiety is the surface, fear the depth.)
 */
export type FeelingKey =
  | 'anxiety'
  | 'fear'
  | 'guilt'
  | 'shame'
  | 'grief'
  | 'suppressed'
  | 'doubt'
  | 'separation';

export interface Feeling {
  key: FeelingKey;
  label: string;
  description: string;
  color: string;
  recommendedChakra: ChakraKey;
}

export interface EmotionColor {
  key: string;
  label: string;
  hex: string;
  charge: 'low' | 'mid' | 'high';
}

export interface EmotionEntry {
  id: string;
  timestamp: number;
  colorKey: string;
  note?: string;
  chakra?: ChakraKey;
  vibration?: number;
}

export interface DailyCheckIn {
  date: string; // yyyy-mm-dd
  completedPracticeIds: string[];
  vibration?: number;
}

export interface BirthData {
  /** ISO date string YYYY-MM-DD */
  date: string;
  /** "HH:MM" 24-hour, or undefined if user doesn't know */
  time?: string;
  /** Free-text city — geocoded later when astro layer ships */
  city?: string;
  /** True if user explicitly indicated they don't know their birth time */
  timeUnknown?: boolean;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  onboardingComplete: boolean;
  primaryChakra?: ChakraKey;
  feelings: FeelingKey[];
  quizAnswers: Record<string, number>;
  joinedAt: number;
  /**
   * Birth data — collected once, used by both astrology and Energy Blueprint
   * (Human Design) computations. Optional until user provides it.
   */
  birthData?: BirthData;
}

export interface Progress {
  completedSessionIds: string[];
  currentStreak: number;
  longestStreak: number;
  lastCheckInDate?: string;
  unlockedLevels: number[];
  checkIns: DailyCheckIn[];
  totalMinutes: number;
}

export interface QuizQuestion {
  id: string;
  chakra: ChakraKey;
  prompt: string;
  lowLabel: string;
  highLabel: string;
}
