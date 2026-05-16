/**
 * Within — The 8 Chakra Letters.
 *
 * Per the founder's master protocol card: each chakra has a structured
 * "Letter" — a 6-step written / spoken practice that releases the
 * blocking emotion of that centre and installs its opposite.
 *
 *   1. Root — Letter of Gratitude & Transformation       (Fear → Freedom)
 *   2. Sacral — Letter of Forgiveness & Accountability    (Guilt → Gratitude)
 *   3. Solar Plexus — Letter of Self-Worth & Empowerment  (Shame → Self-Worth)
 *   4. Heart — Letter of Unconditional Love               (Grief → Grace)
 *   5. Throat — Letter of Truth & Expression              (Lies → Truth)
 *   6. Third Eye — Letter of Clarity & Vision             (Illusion → Clarity)
 *   7. Crown — Letter of Release & Reconnection           (Addiction → Connection)
 *   8. Soul Star — Letter of Expansion & Presence         (Limitation → Expansion)
 *
 * Each Letter has a 6-step structure (Open Heart → Acknowledge → Share
 * Story → Express/Claim/Reframe → Release → Close) plus 4 extra journaling
 * prompts. All original content in the Within voice.
 */

import type { SpineChakraId } from './chakra-spine';

export interface LetterStep {
  number: number;
  /** Short verb-led title — "Open Your Heart" etc. */
  title: string;
  /** 1-line instruction the user does at this step. */
  instruction: string;
}

export interface ChakraLetter {
  chakraId: SpineChakraId;
  /** "Letter of Gratitude & Transformation" etc. */
  name: string;
  /** Headline pairing — "FEAR — PHYSICAL HEALTH" etc. */
  pairing: string;
  /** 2-line description of what this letter is for and what it does. */
  intent: string;
  /** The 6 steps of the Letter. */
  steps: LetterStep[];
  /** 4 short journal prompts the user can write into after the Letter. */
  journalPrompts: string[];
  /** One-line installation phrase to close with — said aloud or written. */
  closing: string;
  /** Approximate practice duration in minutes for the full 6-step write. */
  durationMin: number;
}

export const CHAKRA_LETTERS: Record<SpineChakraId, ChakraLetter> = {
  // ─── 1. ROOT ──────────────────────────────────────────────
  root: {
    chakraId: 'root',
    name: 'Letter of Gratitude & Transformation',
    pairing: 'FEAR — PHYSICAL HEALTH',
    intent:
      'This letter releases fear at its root and chooses freedom in its place. You will thank the fear for the lesson it brought, and let your body know it is safe now.',
    steps: [
      {
        number: 1,
        title: 'Open your heart',
        instruction: 'Begin with gratitude and intention. Soften the body. Breathe.',
      },
      {
        number: 2,
        title: 'Acknowledge the fear',
        instruction: 'Name it plainly. Write what you were afraid of. Spare nothing.',
      },
      {
        number: 3,
        title: 'Share your story',
        instruction: 'Tell the story of how this fear showed up — when, where, with whom.',
      },
      {
        number: 4,
        title: 'Express gratitude',
        instruction: 'Thank this fear or situation for the lesson it brought into your life.',
      },
      {
        number: 5,
        title: 'Release and transform',
        instruction: 'Release the fear. Choose freedom, strength, and trust in its place.',
      },
      {
        number: 6,
        title: 'Close with love',
        instruction: 'Close with appreciation, love, and a new choice for how you live now.',
      },
    ],
    journalPrompts: [
      'What did this fear teach me?',
      'How did it help me grow — even quietly?',
      'What strength have I gained because of it?',
      'I choose freedom and safety now.',
    ],
    closing: 'I am safe. I am supported. I am free.',
    durationMin: 15,
  },

  // ─── 2. SACRAL ────────────────────────────────────────────
  sacral: {
    chakraId: 'sacral',
    name: 'Letter of Forgiveness & Accountability',
    pairing: 'GUILT — MIND & EMOTIONS',
    intent:
      'This letter releases guilt — including guilt that was never yours to carry. You will express regret honestly, own your part, ask for forgiveness, and forgive yourself completely.',
    steps: [
      {
        number: 1,
        title: 'Open your heart',
        instruction: 'Begin with love and intention. Drop the armor of self-defense.',
      },
      {
        number: 2,
        title: 'Express your regret',
        instruction: 'Share what you feel guilty about. Be specific. Do not soften it.',
      },
      {
        number: 3,
        title: 'Take accountability',
        instruction: 'Own your part in the situation — the choices, the silences, the actions.',
      },
      {
        number: 4,
        title: 'Ask for forgiveness',
        instruction: 'Ask — for yourself, or for someone you hurt. Say the words.',
      },
      {
        number: 5,
        title: 'Express gratitude',
        instruction: 'Thank yourself and the others for being part of your journey.',
      },
      {
        number: 6,
        title: 'Release and forgive',
        instruction: 'Release the guilt. Forgive yourself completely. Move on with grace.',
      },
    ],
    journalPrompts: [
      'What have I been carrying guilt for?',
      'What would I say to truly apologise?',
      'How can I forgive myself for this?',
      'What lesson did this teach me?',
    ],
    closing: 'I am forgiven. I forgive. I am free to feel joy again.',
    durationMin: 18,
  },

  // ─── 3. SOLAR PLEXUS ──────────────────────────────────────
  'solar-plexus': {
    chakraId: 'solar-plexus',
    name: 'Letter of Self-Worth & Empowerment',
    pairing: 'SHAME — FINANCES & SELF-WORTH',
    intent:
      'This letter releases shame and rebuilds self-worth from the inside. You will see the bigger lesson, reclaim your value, and step into the power and abundance that were always yours.',
    steps: [
      {
        number: 1,
        title: 'Open your heart',
        instruction: 'Begin with self-compassion. Meet yourself without flinching.',
      },
      {
        number: 2,
        title: 'Acknowledge the shame',
        instruction: 'Share what you have felt ashamed of. Write it down to take its weight off.',
      },
      {
        number: 3,
        title: 'Reframe your story',
        instruction: 'See the bigger picture. Find the lesson the shame was hiding.',
      },
      {
        number: 4,
        title: 'Claim your worth',
        instruction: 'Affirm your value, your power, your capability — out loud or in writing.',
      },
      {
        number: 5,
        title: 'Express gratitude',
        instruction: 'Thank yourself for the journey, the growth, the surviving you have done.',
      },
      {
        number: 6,
        title: 'Close empowered',
        instruction: 'Close by stepping fully into your power, your worth, and your light.',
      },
    ],
    journalPrompts: [
      'Where have I felt shame or not-enough?',
      'What strengths have I overlooked in myself?',
      'What do I value most about who I am?',
      'I am worthy, abundant, and powerful.',
    ],
    closing: 'I am worthy. I am powerful. I am enough exactly as I am.',
    durationMin: 18,
  },

  // ─── 4. HEART ─────────────────────────────────────────────
  heart: {
    chakraId: 'heart',
    name: 'Letter of Unconditional Love',
    pairing: 'GRIEF — RELATIONSHIPS',
    intent:
      'This letter expresses deep love and releases grief at its source. You will honor the relationship or situation, send the love that was never fully spoken, and move from pain into grace and peace.',
    steps: [
      {
        number: 1,
        title: 'Open your heart',
        instruction: 'Begin with love and presence. Make room for what you feel.',
      },
      {
        number: 2,
        title: 'Express your love',
        instruction: 'Share what this person — or this loss — has meant to you.',
      },
      {
        number: 3,
        title: 'Share your story',
        instruction: 'Tell the memories, the feelings, the moments that mattered most.',
      },
      {
        number: 4,
        title: 'Express gratitude',
        instruction: 'Thank them — and the experience — for the impact on your life.',
      },
      {
        number: 5,
        title: 'Release with love',
        instruction: 'Release the grief and send love and blessings to where they need to go.',
      },
      {
        number: 6,
        title: 'Close with peace',
        instruction: 'Close with love, acceptance, and peace. The chapter is honored.',
      },
    ],
    journalPrompts: [
      'What do I wish I could have said or done?',
      'What impact has this had on my life?',
      'What am I grateful for in this relationship?',
      'I release this with love and grace.',
    ],
    closing: 'My heart is open. I am loved. I move forward in peace.',
    durationMin: 20,
  },

  // ─── 5. THROAT ────────────────────────────────────────────
  throat: {
    chakraId: 'throat',
    name: 'Letter of Truth & Expression',
    pairing: 'LIES & LACK OF SELF-EXPRESSION — PERSONAL DEVELOPMENT',
    intent:
      'This letter speaks the truth, releases suppression, and expresses what was never said. You will reclaim your voice and your authenticity — the parts of you that have been quiet too long.',
    steps: [
      {
        number: 1,
        title: 'Open your heart',
        instruction: 'Begin with the intention to speak truth — to yourself, and to the page.',
      },
      {
        number: 2,
        title: 'Express what was unsaid',
        instruction: 'Share what you kept inside. The thing you almost said, then swallowed.',
      },
      {
        number: 3,
        title: 'Share your story',
        instruction: 'Tell the full story from your truth — without softening, without spin.',
      },
      {
        number: 4,
        title: 'Express your truth',
        instruction: 'Speak your truth clearly and honestly. Out loud if you can.',
      },
      {
        number: 5,
        title: 'Release and reclaim',
        instruction: 'Release the silence, fear, and holding-back. Reclaim your voice now.',
      },
      {
        number: 6,
        title: 'Close in truth',
        instruction: 'Close by honouring your voice and your authentic self. They matter.',
      },
    ],
    journalPrompts: [
      'What have I not expressed?',
      'What truth do I need to speak?',
      'What would free expression look like for me?',
      'My voice matters. I choose to speak.',
    ],
    closing: 'My voice is mine. My truth is welcome here.',
    durationMin: 18,
  },

  // ─── 6. THIRD EYE ─────────────────────────────────────────
  'third-eye': {
    chakraId: 'third-eye',
    name: 'Letter of Clarity & Vision',
    pairing: 'ILLUSION & CONFUSION — CAREER',
    intent:
      'This letter brings clarity, releases illusion, and realigns you with your true vision and purpose. You will see what was hidden, claim your direction, and trust your inner knowing.',
    steps: [
      {
        number: 1,
        title: 'Open your heart',
        instruction: 'Begin with clarity and intention. Ask to see truthfully.',
      },
      {
        number: 2,
        title: 'Acknowledge confusion',
        instruction: 'Share what feels unclear, foggy, or contradictory in your life.',
      },
      {
        number: 3,
        title: 'Seek understanding',
        instruction: 'Explore what you now see clearly — what the confusion was hiding.',
      },
      {
        number: 4,
        title: 'Claim your vision',
        instruction: 'Affirm your direction, your purpose, your intuition. Name them.',
      },
      {
        number: 5,
        title: 'Express gratitude',
        instruction: 'Thank the experience — even the confusion — for the clarity it brought.',
      },
      {
        number: 6,
        title: 'Close with vision',
        instruction: 'Close aligned with trust and inner guidance. The path is yours.',
      },
    ],
    journalPrompts: [
      'What have I been confused about?',
      'What truth is now revealed to me?',
      'What is my next aligned step?',
      'I trust my intuition and inner vision.',
    ],
    closing: 'I see clearly. I trust what I see. I move with vision.',
    durationMin: 16,
  },

  // ─── 7. CROWN ─────────────────────────────────────────────
  crown: {
    chakraId: 'crown',
    name: 'Letter of Release & Reconnection',
    pairing: 'ADDICTION & DISCONNECTION — SPIRITUAL FULFILLMENT',
    intent:
      'This letter releases addictions and attachments, and reconnects you to your higher self and divine purpose. You will see what your attachments were trying to soothe, and meet that need directly.',
    steps: [
      {
        number: 1,
        title: 'Open your heart',
        instruction: 'Begin with surrender and intention. Soften the grip of control.',
      },
      {
        number: 2,
        title: 'Acknowledge addiction',
        instruction: 'Share what you have been attached to — substance, behavior, person, story.',
      },
      {
        number: 3,
        title: 'Share your story',
        instruction: 'Tell how this attachment affected you — what it gave, what it took.',
      },
      {
        number: 4,
        title: 'Reconnect to purpose',
        instruction: 'Reaffirm your higher purpose and your spiritual connection.',
      },
      {
        number: 5,
        title: 'Release and let go',
        instruction: 'Release the attachment. Choose freedom in its place.',
      },
      {
        number: 6,
        title: 'Close in connection',
        instruction: 'Close reconnected to your higher self and divine purpose.',
      },
    ],
    journalPrompts: [
      'What have I been addicted to — or avoiding through?',
      'What need was this attachment trying to fulfill?',
      'How do I want to feel free?',
      'I choose freedom and divine connection.',
    ],
    closing: 'I am free. I am connected. I trust the larger thread.',
    durationMin: 18,
  },

  // ─── 8. SOUL STAR ─────────────────────────────────────────
  'soul-star': {
    chakraId: 'soul-star',
    name: 'Letter of Expansion & Presence',
    pairing: 'TIME & LIMITATION — EXPANSION',
    intent:
      'This letter releases hurry, pressure, and the limitation of time, and steps you into presence, flow, and expansion. You will let go of "running out of time" and remember you are eternal.',
    steps: [
      {
        number: 1,
        title: 'Open your heart',
        instruction: 'Begin with presence and trust. Let the body settle into now.',
      },
      {
        number: 2,
        title: 'Acknowledge the limitation',
        instruction: 'Share how time pressure has affected you — what it stole, what it cost.',
      },
      {
        number: 3,
        title: 'Share your story',
        instruction: 'Tell how this rush, this pressure, has shown up in your life.',
      },
      {
        number: 4,
        title: 'Choose expansion',
        instruction: 'Affirm presence, flow, and trust in divine timing.',
      },
      {
        number: 5,
        title: 'Release and surrender',
        instruction: 'Release urgency and control. Surrender to the larger rhythm.',
      },
      {
        number: 6,
        title: 'Close in presence',
        instruction: 'Close in peace, flow, and eternal presence. Nowhere to rush to.',
      },
    ],
    journalPrompts: [
      'Where do I feel rushed or limited by time?',
      'How can I trust divine timing more?',
      'What would living in presence feel like?',
      'I am eternal. I choose presence now.',
    ],
    closing: 'I am eternal. I am here. I have all the time I need.',
    durationMin: 16,
  },
};

/** Convenience array for iteration. */
export const CHAKRA_LETTERS_ORDERED: ChakraLetter[] = [
  CHAKRA_LETTERS.root,
  CHAKRA_LETTERS.sacral,
  CHAKRA_LETTERS['solar-plexus'],
  CHAKRA_LETTERS.heart,
  CHAKRA_LETTERS.throat,
  CHAKRA_LETTERS['third-eye'],
  CHAKRA_LETTERS.crown,
  CHAKRA_LETTERS['soul-star'],
];

export function getLetter(chakraId: SpineChakraId): ChakraLetter | undefined {
  return CHAKRA_LETTERS[chakraId];
}
