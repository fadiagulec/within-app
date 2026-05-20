/**
 * Tarot store — daily pull state + reading history.
 *
 * Stores:
 *   - The current daily pull (one per day, deterministic per seed)
 *   - A history of all completed readings (daily + spreads)
 *
 * Daily pull is keyed by date string (YYYY-MM-DD local). If a new day
 * has rolled over since the last pull, the next access generates a
 * fresh pull. The same card never re-draws within the same day.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';
import type { DrawnCard, SpreadId } from '@/data/tarot/spreads';
import { drawDailyCard, drawCards, SPREADS } from '@/data/tarot/spreads';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export interface ReadingEntry {
  id: string;
  spreadId: SpreadId;
  date: string;       // YYYY-MM-DD
  timestamp: number;  // ms epoch
  /** The cards drawn, in position order. */
  cards: Array<{
    cardId: string;
    position: number;
    reversed: boolean;
  }>;
  /** Optional question the user asked before drawing. */
  question?: string;
  /** User's own reflection after sitting with the reading. */
  reflection?: string;
}

interface TarotState {
  /** The daily pull keyed by YYYY-MM-DD. */
  dailyPullDate: string | null;
  dailyPullCardId: string | null;
  dailyPullReversed: boolean;
  /** All past readings, most recent first. */
  history: ReadingEntry[];

  /** Returns today's pull, generating one if needed. */
  getOrCreateDailyPull: (userId?: string) => DrawnCard;
  /** Save a completed spread to history. */
  recordReading: (spreadId: SpreadId, cards: DrawnCard[], question?: string) => string;
  /** Attach the user's reflection to an existing reading. */
  setReflection: (readingId: string, reflection: string) => void;
  /** Clear all stored history (sign-out / reset). */
  reset: () => void;
}

export const useTarotStore = create<TarotState>()(
  persist(
    (set, get) => ({
      dailyPullDate: null,
      dailyPullCardId: null,
      dailyPullReversed: false,
      history: [],

      getOrCreateDailyPull: (userId) => {
        const today = todayStr();
        const state = get();
        // If we already have today's pull stored, return it
        if (state.dailyPullDate === today && state.dailyPullCardId) {
          // Reconstruct DrawnCard from stored ids
          const { TAROT_DECK } = require('@/data/tarot/deck');
          const card = TAROT_DECK.find((c: { id: string }) => c.id === state.dailyPullCardId);
          if (card) {
            return { card, position: 1, reversed: state.dailyPullReversed };
          }
        }
        // Otherwise draw a fresh card for today and persist it
        const drawn = drawDailyCard(userId);
        set({
          dailyPullDate: today,
          dailyPullCardId: drawn.card.id,
          dailyPullReversed: drawn.reversed,
        });
        return drawn;
      },

      recordReading: (spreadId, cards, question) => {
        const id = `tarot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const entry: ReadingEntry = {
          id,
          spreadId,
          date: todayStr(),
          timestamp: Date.now(),
          cards: cards.map((c) => ({
            cardId: c.card.id,
            position: c.position,
            reversed: c.reversed,
          })),
          question: question?.trim() || undefined,
        };
        set((state) => ({
          history: [entry, ...state.history].slice(0, 200), // cap at 200
        }));
        return id;
      },

      setReflection: (readingId, reflection) => {
        set((state) => ({
          history: state.history.map((r) =>
            r.id === readingId ? { ...r, reflection: reflection.trim() } : r
          ),
        }));
      },

      reset: () =>
        set({
          dailyPullDate: null,
          dailyPullCardId: null,
          dailyPullReversed: false,
          history: [],
        }),
    }),
    {
      name: 'within:tarot',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as TarotState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<TarotState>;
        return {
          ...current,
          ...p,
          history: Array.isArray(p.history) ? p.history : current.history,
        };
      },
    }
  )
);

// Re-export for convenience
export { SPREADS, drawCards };
