/**
 * Tarot spreads — the layouts that frame a reading.
 *
 * v1 ships with:
 *   - daily   : one-card pull (auto-saved per day, no re-draw)
 *   - three   : past · present · future (or situation · obstacle · action)
 *
 * Future spreads (Celtic Cross, Relationship, Career, Year-ahead) can
 * be added here without touching the rest of the system.
 */

import { TAROT_DECK, type TarotCard } from './deck';

export type SpreadId = 'daily' | 'three-card' | 'situation';

export interface SpreadPosition {
  /** 1-indexed position number in the spread. */
  index: number;
  /** Short label shown above the card. */
  label: string;
  /** Longer guidance shown when the user taps the position. */
  guidance: string;
}

export interface SpreadDef {
  id: SpreadId;
  name: string;
  subtitle: string;
  cardCount: number;
  positions: SpreadPosition[];
}

export const SPREADS: Record<SpreadId, SpreadDef> = {
  daily: {
    id: 'daily',
    name: 'Daily Pull',
    subtitle: 'One card. Today\'s contemplation.',
    cardCount: 1,
    positions: [
      {
        index: 1,
        label: 'TODAY',
        guidance: 'The energy moving through your life today. Sit with it. Let it reveal what it wants you to see.',
      },
    ],
  },
  'three-card': {
    id: 'three-card',
    name: 'Past · Present · Future',
    subtitle: 'The arc of a situation across time.',
    cardCount: 3,
    positions: [
      { index: 1, label: 'PAST', guidance: 'What has shaped this moment. The ground you are standing on.' },
      { index: 2, label: 'PRESENT', guidance: 'What is alive right now. The energy you are inside of.' },
      { index: 3, label: 'FUTURE', guidance: 'Where this is moving — if you stay on this path.' },
    ],
  },
  situation: {
    id: 'situation',
    name: 'Situation · Obstacle · Action',
    subtitle: 'For a specific question or decision.',
    cardCount: 3,
    positions: [
      { index: 1, label: 'SITUATION', guidance: 'What is actually happening. The truth of the matter, not the story about it.' },
      { index: 2, label: 'OBSTACLE', guidance: 'What is in the way. The block, the fear, the unseen weight.' },
      { index: 3, label: 'ACTION', guidance: 'The next move. What this moment is asking of you.' },
    ],
  },
};

export interface DrawnCard {
  /** The drawn card. */
  card: TarotCard;
  /** Position in the spread (1-indexed). */
  position: number;
  /** Whether the card came up reversed. */
  reversed: boolean;
}

/**
 * Draw N unique cards from the deck. Each card has a 30% chance of
 * being reversed — the same probability used in most physical decks
 * (reversal happens when shuffling is intentional).
 */
export function drawCards(count: number): DrawnCard[] {
  const indices = new Set<number>();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * TAROT_DECK.length));
  }
  return Array.from(indices).map((idx, position) => ({
    card: TAROT_DECK[idx]!,
    position: position + 1,
    reversed: Math.random() < 0.3,
  }));
}

/**
 * Deterministic daily draw — every user gets a different card but the
 * SAME user gets the SAME card if they re-open the app on the same
 * day. Uses a seeded hash so the draw is reproducible per (user, day).
 *
 * Seed: combination of YYYY-MM-DD + an optional user id. If userId is
 * not provided, falls back to a device-local random.
 */
export function drawDailyCard(userId?: string): DrawnCard {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const seed = userId ? `${userId}::${dateStr}` : dateStr;
  // Simple deterministic hash → index
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }
  const cardIdx = Math.abs(hash) % TAROT_DECK.length;
  // Reversal also deterministic on the same seed (different hash)
  let reversedHash = 0;
  for (let i = seed.length - 1; i >= 0; i--) {
    reversedHash = ((reversedHash << 3) + seed.charCodeAt(i)) | 0;
  }
  return {
    card: TAROT_DECK[cardIdx]!,
    position: 1,
    reversed: Math.abs(reversedHash) % 10 < 3, // 30% chance reversed
  };
}
