/**
 * Within — Morning Affirmations.
 *
 * A curated 60-affirmation library shown one-per-day on first app open.
 * Selection is deterministic — same date = same affirmation across all
 * users — which creates a felt sense of collective resonance.
 *
 * The library cycles. After 60 days, day 61 returns to affirmation 1.
 * 60 is enough to feel fresh without becoming maintenance-heavy.
 *
 * Affirmations are intentionally short (under 18 words) so they:
 *   - Read fast on a sheet
 *   - Speak well in TTS
 *   - Stay in the body all day
 *
 * Categories rotate so the user encounters a different theme each day
 * — worthiness Monday, love Tuesday, abundance Wednesday, etc.
 */

export interface MorningAffirmation {
  id: number;
  text: string;
  category:
    | 'worthiness'
    | 'love'
    | 'abundance'
    | 'body'
    | 'sovereignty'
    | 'presence';
}

export const MORNING_AFFIRMATIONS: MorningAffirmation[] = [
  // ─── WORTHINESS / ENOUGH-NESS ────────────────────
  { id: 1, text: 'I am enough exactly as I am today.', category: 'worthiness' },
  { id: 2, text: 'I do not earn my worth. I remember it.', category: 'worthiness' },
  { id: 3, text: 'I belong in every room I walk into.', category: 'worthiness' },
  { id: 4, text: 'I am allowed to take up the full size of who I am.', category: 'worthiness' },
  { id: 5, text: 'My existence is the proof of my worth.', category: 'worthiness' },
  { id: 6, text: 'I am worthy of being chosen, deeply and gently.', category: 'worthiness' },
  { id: 7, text: 'Nothing about me needs to be fixed before I am loved.', category: 'worthiness' },
  { id: 8, text: 'I am enough. I have always been enough.', category: 'worthiness' },
  { id: 9, text: 'I am proud of how far I have come — and still becoming.', category: 'worthiness' },
  { id: 10, text: 'I am the safest place I have ever lived.', category: 'worthiness' },

  // ─── LOVE / BEING KNOWN ─────────────────────────
  { id: 11, text: 'I am safe to be deeply known.', category: 'love' },
  { id: 12, text: 'The right love is moving towards me. I am ready.', category: 'love' },
  { id: 13, text: 'I attract what I am, not what I want.', category: 'love' },
  { id: 14, text: 'I am loved at the full size of who I am.', category: 'love' },
  { id: 15, text: 'My open heart is my magnetism.', category: 'love' },
  { id: 16, text: 'I forgive what I have been holding. The love arrives.', category: 'love' },
  { id: 17, text: 'I am ready for love that stays.', category: 'love' },
  { id: 18, text: 'I do not chase love. I become it.', category: 'love' },
  { id: 19, text: 'I am seen by the people who are mine.', category: 'love' },
  { id: 20, text: 'I receive love today without deflection.', category: 'love' },

  // ─── ABUNDANCE / RECEIVING ──────────────────────
  { id: 21, text: 'Money lives here. Money stays.', category: 'abundance' },
  { id: 22, text: 'I receive what my work generates without softening.', category: 'abundance' },
  { id: 23, text: 'Abundance is my natural state. I am returning to it.', category: 'abundance' },
  { id: 24, text: 'I am safe to be wealthy.', category: 'abundance' },
  { id: 25, text: 'I do not earn through pain. Money flows easily.', category: 'abundance' },
  { id: 26, text: 'I deserve more than I have been charging.', category: 'abundance' },
  { id: 27, text: 'Today, I receive everything that is mine.', category: 'abundance' },
  { id: 28, text: 'My value is not negotiated. It is named.', category: 'abundance' },
  { id: 29, text: 'I move before the evidence arrives.', category: 'abundance' },
  { id: 30, text: 'I am a stable home for wealth.', category: 'abundance' },

  // ─── BODY / REST / EMBODIMENT ───────────────────
  { id: 31, text: 'My body is the only home I will ever have. I tend her well.', category: 'body' },
  { id: 32, text: 'I trust my body\'s signals over my mind\'s arguments.', category: 'body' },
  { id: 33, text: 'I am allowed to rest before I have earned it.', category: 'body' },
  { id: 34, text: 'My nervous system can hold abundance, love, and rest.', category: 'body' },
  { id: 35, text: 'I breathe deep. I am safe in this body today.', category: 'body' },
  { id: 36, text: 'My body holds wisdom my mind has not yet learned.', category: 'body' },
  { id: 37, text: 'I do my best work from a regulated body.', category: 'body' },
  { id: 38, text: 'I am at home in this body, exactly as she is.', category: 'body' },
  { id: 39, text: 'The body cannot lie. I am listening today.', category: 'body' },
  { id: 40, text: 'Softness in the body is strength, not weakness.', category: 'body' },

  // ─── SOVEREIGNTY / BOUNDARIES ───────────────────
  { id: 41, text: 'I can say no without explanation.', category: 'sovereignty' },
  { id: 42, text: 'No one is coming. I decide. I am enough to decide.', category: 'sovereignty' },
  { id: 43, text: 'My energy is finite. I direct it where it matters.', category: 'sovereignty' },
  { id: 44, text: 'I do not need permission to grow.', category: 'sovereignty' },
  { id: 45, text: 'I am allowed to disappoint people who needed me to be smaller.', category: 'sovereignty' },
  { id: 46, text: 'My yes is mine to give. My no is mine to keep.', category: 'sovereignty' },
  { id: 47, text: 'I am the author of my own becoming.', category: 'sovereignty' },
  { id: 48, text: 'I am responsible only for what I choose to carry.', category: 'sovereignty' },
  { id: 49, text: 'I am sovereign in my own life today.', category: 'sovereignty' },
  { id: 50, text: 'I am no longer in conversations that ask me to dim.', category: 'sovereignty' },

  // ─── PRESENCE / TRUST ────────────────────────────
  { id: 51, text: 'Everything I need is in this breath.', category: 'presence' },
  { id: 52, text: 'I trust the unfolding. Even what I cannot yet see.', category: 'presence' },
  { id: 53, text: 'I am exactly where I am supposed to be right now.', category: 'presence' },
  { id: 54, text: 'What is meant for me will not pass me by.', category: 'presence' },
  { id: 55, text: 'I do not have to know everything to begin.', category: 'presence' },
  { id: 56, text: 'I am present today. The future is forming on its own.', category: 'presence' },
  { id: 57, text: 'I release what is no longer mine to carry.', category: 'presence' },
  { id: 58, text: 'I am held by something larger than my mind.', category: 'presence' },
  { id: 59, text: 'Today, I will move slower than my fear wants.', category: 'presence' },
  { id: 60, text: 'I am becoming her. I do not have to rush.', category: 'presence' },
];

/**
 * Returns today's affirmation, deterministic per date.
 * Same calendar date → same affirmation for everyone using the app.
 */
export function getDailyAffirmation(date: Date = new Date()): MorningAffirmation {
  // Day-of-epoch (UTC) modulo library length keeps everyone in sync
  // regardless of timezone shift mid-day.
  const dayIndex = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  const i = ((dayIndex % MORNING_AFFIRMATIONS.length) + MORNING_AFFIRMATIONS.length) % MORNING_AFFIRMATIONS.length;
  // Safe because i is always in range; non-null assertion satisfies strict TS.
  return MORNING_AFFIRMATIONS[i]!;
}

export const CATEGORY_META: Record<MorningAffirmation['category'], { label: string; color: string }> = {
  worthiness: { label: 'Worthiness', color: '#D4AF6E' },
  love: { label: 'Love', color: '#C77B6E' },
  abundance: { label: 'Abundance', color: '#5645A6' },
  body: { label: 'Body', color: '#7AA88E' },
  sovereignty: { label: 'Sovereignty', color: '#A04B3C' },
  presence: { label: 'Presence', color: '#7AA8C7' },
};
