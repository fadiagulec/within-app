/**
 * Within — Chakra affirmations.
 *
 * The 8 energy centres mapped to:
 *   - the Wheel of Life area they govern
 *   - the emotional shift (block → freedom)
 *   - the affirmations to install
 *
 * Voice rules: short, present tense, "I am…". One belief per line.
 * Read slowly. The body installs what the voice repeats.
 */

import type { SpineChakraId } from './chakra-spine';

export interface ChakraAffirmationSet {
  id: SpineChakraId;
  /** Display name. */
  name: string;
  /** Number in the spine (1 = Root … 8 = Soul Star). */
  number: number;
  /** Wheel-of-Life area the centre governs. */
  lifeArea: string;
  /** Short emotional pitch — block → opening. */
  shiftLabel: string;
  /** Colour family in plain English. */
  colour: string;
  /** Hex used for accents in the UI. */
  colorHex: string;
  /** The affirmations, in install order. */
  affirmations: string[];
}

export const CHAKRA_AFFIRMATIONS: Record<SpineChakraId, ChakraAffirmationSet> = {
  root: {
    id: 'root',
    name: 'Root',
    number: 1,
    lifeArea: 'Physical Health',
    shiftLabel: 'Fear → Freedom',
    colour: 'Red',
    colorHex: '#6B1F1F',
    affirmations: [
      'I am vital, healthy, and strong.',
      'I am grounded and secure in my life by design.',
      'I am connected to my body, family, and community.',
      'I release all fear now because life supports me in every way.',
      'I am grateful for my body and all the amazing things it allows me to do.',
      'I am consistent and disciplined in caring for my physical vessel.',
      'I am worthy of being here on this planet, and I belong everywhere I go.',
      'I am safe. I am secure. I am always deeply grounded.',
    ],
  },

  sacral: {
    id: 'sacral',
    name: 'Sacral',
    number: 2,
    lifeArea: 'Mind & Emotional State',
    shiftLabel: 'Guilt → Gratitude',
    colour: 'Orange',
    colorHex: '#E07A2C',
    affirmations: [
      'I allow my emotions to flow freely and I am expressing them in a healthy way.',
      'I am trusting my feelings and honouring them as valuable guides in my life.',
      'I am a creative person, full of passion and joy.',
      'I am nurturing my body, desires, and boundaries.',
      'I am calm, centred, and emotionally balanced in all situations.',
      'I am at peace with my past and allow myself to move forward with grace.',
      'I am embracing my passions and allowing them to bring joy and purpose into my life.',
    ],
  },

  'solar-plexus': {
    id: 'solar-plexus',
    name: 'Solar Plexus',
    number: 3,
    lifeArea: 'Financial Wellbeing',
    shiftLabel: 'Shame → Self-Worth',
    colour: 'Yellow / Gold',
    colorHex: '#E8B83E',
    affirmations: [
      'I am confident, strong-willed, and proud of who I am.',
      'I am motivated, focused, and capable of achieving my goals.',
      'I honor my boundaries and assert myself with love and respect.',
      'I am financially secure. I get rich doing what I love.',
      'Money is my friend, and I welcome all of its friends.',
      'I am truly grateful for all the money I have now.',
      'I am a generous giver and an excellent receiver.',
      'I play the money game to win — my intention is to create wealth and abundance.',
    ],
  },

  heart: {
    id: 'heart',
    name: 'Heart',
    number: 4,
    lifeArea: 'Relationships',
    shiftLabel: 'Grief → Grace',
    colour: 'Green',
    colorHex: '#3F8A5F',
    affirmations: [
      'I am giving and receiving love with an open and trusting heart.',
      'I am communicating my feelings with honesty, kindness, and respect.',
      'I am forgiving myself and others with compassion.',
      'I am expressing love, kindness, and patience in all my relationships.',
      'I am worthy of love, connection, and support.',
      'I am attracting relationships that are healthy, supportive, and fulfilling.',
      'I am surrounding myself with positive and supportive people.',
      'I am setting healthy boundaries with love — I am lovingly assertive.',
      'I am responding with love in every situation now.',
    ],
  },

  throat: {
    id: 'throat',
    name: 'Throat',
    number: 5,
    lifeArea: 'Personal Development / Truth',
    shiftLabel: 'Lies → Truth',
    colour: 'Blue',
    colorHex: '#3D9DC4',
    affirmations: [
      'I am proud of who I am and how far I have come.',
      'Every day, in every way, I am getting better and better.',
      'I am cherishing the present moment and making time for what truly matters to me.',
      'I am speaking my truth with love, knowing my voice deserves to be heard.',
      'I know that my voice matters, and I use it to make a positive difference.',
      'I am standing up for myself while respecting others.',
      'I am at peace knowing that I am living a life true to me.',
      'I trust that living my truth inspires others to do the same.',
    ],
  },

  'third-eye': {
    id: 'third-eye',
    name: 'Third Eye',
    number: 6,
    lifeArea: 'Career / Business',
    shiftLabel: 'Illusion → Clarity',
    colour: 'Indigo',
    colorHex: '#5645A6',
    affirmations: [
      'I trust my intuition and inner wisdom completely.',
      'I see clearly and make aligned decisions with confidence.',
      'I am connected to my higher vision and purpose.',
      'I release confusion and welcome clarity into my life.',
      'I am open to divine guidance and inspired ideas.',
      'I trust that everything is unfolding for my highest good.',
      'I see opportunities everywhere and act on them with certainty.',
      'My mind is clear, focused, and aligned with my soul mission.',
    ],
  },

  crown: {
    id: 'crown',
    name: 'Crown',
    number: 7,
    lifeArea: 'Spiritual Fulfilment',
    shiftLabel: 'Disconnection → Connection',
    colour: 'Violet / White',
    colorHex: '#9B5BA1',
    affirmations: [
      'I am deeply connected to the universe and divine intelligence.',
      'I trust the flow of life and surrender with ease.',
      'I am guided, protected, and supported at all times.',
      'I release attachment and embrace divine alignment.',
      'I am spiritually awake, conscious, and aware.',
      'I trust my soul’s journey and higher calling.',
      'I am one with infinite love, peace, and wisdom.',
      'I radiate light, purpose, and divine connection.',
    ],
  },

  'soul-star': {
    id: 'soul-star',
    name: 'Soul Star',
    number: 8,
    lifeArea: 'Time & Expansion',
    shiftLabel: 'Limitation → Expansion',
    colour: 'Gold / White Light',
    colorHex: '#C9B7E5',
    affirmations: [
      'I transcend the illusion of time and limitation.',
      'I am aligned with infinite possibilities and divine timing.',
      'I trust the unfolding of my soul journey completely.',
      'I am expanding beyond fear into limitless potential.',
      'I am connected to higher consciousness and universal wisdom.',
      'I release all limitations that no longer serve me.',
      'I move through life with trust, ease, and flow.',
      'I am an infinite being experiencing limitless expansion.',
    ],
  },
};

/**
 * Look up the affirmation set for a chakra by either spine id (e.g. "solar-plexus")
 * or the older legacy key (e.g. "solar"). Returns undefined if not found.
 */
export function getChakraAffirmations(id: string): ChakraAffirmationSet | undefined {
  // Normalise legacy keys to spine ids.
  const normalised = (id === 'solar' ? 'solar-plexus'
    : id === 'thirdEye' || id === 'third_eye' ? 'third-eye'
    : id === 'soulStar' || id === 'soul_star' ? 'soul-star'
    : id) as SpineChakraId;
  return CHAKRA_AFFIRMATIONS[normalised];
}

export const CHAKRA_AFFIRMATIONS_ORDERED: ChakraAffirmationSet[] = [
  CHAKRA_AFFIRMATIONS.root,
  CHAKRA_AFFIRMATIONS.sacral,
  CHAKRA_AFFIRMATIONS['solar-plexus'],
  CHAKRA_AFFIRMATIONS.heart,
  CHAKRA_AFFIRMATIONS.throat,
  CHAKRA_AFFIRMATIONS['third-eye'],
  CHAKRA_AFFIRMATIONS.crown,
  CHAKRA_AFFIRMATIONS['soul-star'],
];
