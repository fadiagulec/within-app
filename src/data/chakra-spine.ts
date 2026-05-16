/**
 * SOMA — Chakra Spine
 *
 * The single canonical entry per chakra. The Coach Engine, Today briefing,
 * 21-day plans, frequency player, and all chakra-tagged content read FROM HERE.
 *
 * This file does NOT replace existing chakra data files (chakras.ts,
 * chakra-content.ts, soul-chakra.ts, chakra-states.ts). It composes them and
 * adds the missing fields that turn the chakra system into a routing spine:
 *
 *   - frequencyHz / syllable          (the audible tone — see Section 8 of APP_ARCHITECTURE.md)
 *   - lifeArea                        (Wheel of Life mapping — drives symptom routing)
 *   - blockedBy + weight              (the dominant blocking emotion, per Dr Espen's framing)
 *   - attributes[]                    (the chakra reference card)
 *   - balanced[] / unbalanced[]       (the diagnostic checklists)
 *   - breathworkIds[] / meditationIds[]   (cross-references into existing libraries)
 *   - unblockingScriptId              (placeholder until per-chakra script PDFs are loaded)
 *   - frequencyAudio                  (placeholder until audio assets are uploaded)
 *
 * Voice rule applied to every new string (per APP_ARCHITECTURE.md section 10):
 * sharp, plain English, lead with the verb.
 */

import { ChakraId } from './chakra-content';

// ============ TYPES ============

/** All eight energy centres, including the 8th (Soul Star). */
export type SpineChakraId = ChakraId | 'soul-star';

/** Wheel of Life area names — match exactly the colored chart you supplied. */
export type WheelLifeArea =
  | 'Physical Health'
  | 'Mental and Emotional State'
  | 'Financial'
  | 'Relationships'
  | 'Personal Development'
  | 'Business / Career / Vocation'
  | 'Spiritual Fulfillment / Purpose'
  | 'Time and Presence';

export interface BlockingEmotion {
  /** Human label — e.g. "Fear". */
  name: string;
  /**
   * Density / intensity weight from the source material.
   * Higher = denser block, harder to clear. Used by the coach engine
   * to bias daily-protocol selection (denser blocks → longer practices).
   */
  weight: number | null;
}

export interface ChakraSpineEntry {
  /** Canonical id — preferred everywhere new code is written. */
  id: SpineChakraId;
  /** 1-based ordering, base → crown → soul-star. */
  number: number;
  /** Display name — keep short. */
  name: string;
  /** Sanskrit name — kept verbatim. */
  sanskrit: string;
  /** Brand color token (hex). */
  color: string;

  // ---- Sound (per founder master reference) ----
  /** Bija mantra syllable — LAM, VAM, RAM, YAM, HAM, OM, AUM, AH. */
  syllable: string;
  /** Healing tone in Hz. All 8 chakras have an audible frequency. */
  frequencyHz: number | null;
  /**
   * Path to the looped audio file for this chakra's frequency.
   * Placeholder until you upload the asset bundle.
   */
  frequencyAudio: string | null;
  /** Short "I AM ..." mantras the user can read aloud or chant. */
  iAmMantras: string[];

  // ---- Body ----
  /** Where on the body this centre sits. */
  bodyLocation: string;

  // ---- Wheel of Life mapping (drives symptom routing) ----
  lifeArea: WheelLifeArea;

  // ---- The dominant blocking emotion ----
  blockedBy: BlockingEmotion;

  // ---- Attributes (the keywords on the chakra reference card) ----
  attributes: string[];

  // ---- Diagnostic checklists ----
  balanced: string[];
  unbalanced: string[];

  // ---- Cross-references into existing content libraries ----
  /** Breathwork session ids — see src/data/breathwork.ts. */
  breathworkIds: string[];
  /** Meditation ids — see src/data/meditations.ts. */
  meditationIds: string[];
  /**
   * Per-chakra unblocking script id.
   * Placeholder until the PDF scripts are converted to in-app content.
   */
  unblockingScriptId: string | null;
}

// ============ THE EIGHT ============
// Source: Dr Espen Quantum Wheel of Life chakra reference cards (verbatim
// frequencies, attributes, body locations) + balanced/unbalanced characteristics
// tables. Cross-references resolved against current breathwork.ts / meditations.ts.

export const CHAKRA_SPINE: Record<SpineChakraId, ChakraSpineEntry> = {
  // ─── 1. ROOT ───────────────────────────────────────────────────────────
  root: {
    id: 'root',
    number: 1,
    name: 'Root',
    sanskrit: 'Muladhara',
    color: '#6B1F1F',
    syllable: 'LAM',
    frequencyHz: 396,
    frequencyAudio: null,
    iAmMantras: ['I am grounded', 'I am safe'],
    bodyLocation: 'Base of spine (Perineum)',
    lifeArea: 'Physical Health',
    blockedBy: { name: 'Fear', weight: 100 },
    attributes: [
      'material world',
      'physical',
      'vitality',
      'survival',
      'instincts',
      'security',
      'grounding',
      'stability',
      'action',
      'perseverance',
      'foundation',
    ],
    balanced: [
      'Patient',
      'Organized and motivated',
      'Vital and strong',
      'Sense of belonging',
      'Proud of heritage and family',
      'Secure and stable',
      'Trusting',
      'Mind-body connected',
      'Connected to community',
      'Meets daily survival needs',
      'Prosperous',
      'Manifests goals',
      'Connected to reality',
      'Feels a right to be on earth',
      'Connected to earth and nature',
      'Fit, healthy, strong',
      'Balanced eating habits',
      'Grounded',
    ],
    unbalanced: [
      'Physical organ dysfunction (blood, feet, legs, bowel)',
      'Jealousy',
      'Fear about security and safety',
      'Material focus',
      'Self-indulgence',
      'Eating disorders (over or under)',
      'Mistrusting',
      'Out of place, separate',
      'Insecure or fearful',
      'Greed',
      "Can't let go of the past",
      'Out of touch with reality',
      'Unstable, restless',
      'Addictions',
      'Self-indulgent or denial of basic needs',
      'Limited by family values',
    ],
    breathworkIds: ['breath-grounding', 'breath-diaphragm'],
    meditationIds: ['med-deep-rest', 'med-body-temple'],
    unblockingScriptId: 'unblock-root',
  },

  // ─── 2. SACRAL ─────────────────────────────────────────────────────────
  sacral: {
    id: 'sacral',
    number: 2,
    name: 'Sacral',
    sanskrit: 'Svadhisthana',
    color: '#E07A2C',
    syllable: 'VAM',
    frequencyHz: 417,
    frequencyAudio: null,
    iAmMantras: ['I feel', 'I create', 'I flow'],
    bodyLocation: 'Between pubic bone and navel',
    lifeArea: 'Mental and Emotional State',
    blockedBy: { name: 'Guilt', weight: 30 },
    attributes: [
      'emotions',
      'relationships',
      'control',
      'sensuality',
      'pleasure',
      'desires',
      'sexuality',
      'creativity',
      'healing',
    ],
    balanced: [
      'Receptive',
      'Positive relationship to the body',
      'Accepts change',
      'Shares emotions freely',
      'Nurturing',
      'Expresses feelings and desires',
      'Creative, sees other perspectives',
      'Able to let go',
      'Friendly, calm, kind',
      'Indulges in creative activities',
      'Follows through on creative ideas',
      'Feels joy and passion',
      'Positive about life',
      'Regular menstrual cycle',
      'Abundant',
      'Open',
      'Nurtures appetites and desires',
      'Knows when enough is enough',
      'Emotionally stable',
      'Comfortable expressing sexuality',
      'Honors own sexual boundaries',
      'Allows feeling',
      'Acknowledges emotions',
      'Supportive in relationships',
    ],
    unbalanced: [
      'Compulsive, obsessive, controlling',
      'Addictions',
      'Unwilling to socialise',
      'Guilt',
      'Jealousy',
      'Reproductive problems',
      'Disorders in governed organs (breathing, urinary)',
      'Under or overeating',
      'Repressed emotions',
      'Needs new relationships frequently',
      'Overly rigid or loose sexual boundaries',
      'Trauma',
      "Doesn't deserve pleasure (felt)",
      'Inability to express feelings',
      'Negative thoughts about sexuality',
      "Can't let go of the past",
      'Self-worth tied to what you do or have',
      'Suppressing or over-indulging desires',
      'Overexerting energy',
      'Depression',
      'Uneasy with emotional or sexual issues',
      'Emotionally dependent',
      'Money or desires drive choices',
    ],
    breathworkIds: ['breath-diaphragm', 'breath-grounding'],
    meditationIds: ['med-body-temple', 'med-evening'],
    unblockingScriptId: 'unblock-sacral',
  },

  // ─── 3. SOLAR PLEXUS ───────────────────────────────────────────────────
  'solar-plexus': {
    id: 'solar-plexus',
    number: 3,
    name: 'Solar Plexus',
    sanskrit: 'Manipura',
    color: '#E8B83E',
    syllable: 'RAM',
    frequencyHz: 528,
    frequencyAudio: null,
    iAmMantras: ['I am powerful', 'I am confident'],
    bodyLocation: 'Upper abdomen — Solar Plexus area',
    lifeArea: 'Financial',
    blockedBy: { name: 'Shame', weight: 20 },
    attributes: [
      'intellect',
      'ambition',
      'will',
      'personal power',
      'individuality',
      'self-worth',
      'freedom of choice',
      'inner child',
      'ego',
      'personality',
    ],
    balanced: [
      'Tolerant and accepting',
      'Confident and strong-willed',
      'Assertive without dominating',
      'Strong sense of self',
      'Strong organisational ability',
      'Strong analytical skills',
      'Unique but connected to others',
      'Backs down and admits when wrong',
      'Has goals, direction, purpose',
      'Follows through on responsibilities',
      'Reliable',
      'Self-esteem',
      'Self-respect',
      'Maintains boundaries',
      'Able to say no',
      'Acts on gut instinct',
      'Powerful and in control of life',
      'Aware of freedom to choose',
      'Intellectually stimulated',
      'Quick to learn new things',
      'Balance of material and spiritual',
      'Rational and intellectual',
      'Manifests goals',
      'Motivated',
      'Courageous',
    ],
    unbalanced: [
      'Lack of confidence',
      'Suppressed emotions',
      'Anger',
      'Afraid to be alone',
      'Passive',
      'Sensitive to criticism',
      "Can't make decisions",
      'Weak sense of self',
      'Fear of power',
      'Need to dominate or control',
      'Ego-focused',
      'Stubbornness',
      "Can't trust the natural flow",
      'Digestive problems',
      'Needs others\' approval',
      'Fearful of rejection',
      'Takes on too much',
      'Great need for material security',
      'Feels no choice',
      'Lost direction and drive',
      'Frequent anger and frustration',
      'Self-worth conditional on doing or having',
      'Overwhelmed with responsibility',
      'Constantly active',
    ],
    breathworkIds: ['breath-fire', 'breath-box'],
    meditationIds: ['med-money-clearing', 'med-super-performance', 'med-abundance'],
    unblockingScriptId: 'unblock-solar-plexus',
  },

  // ─── 4. HEART ──────────────────────────────────────────────────────────
  heart: {
    id: 'heart',
    number: 4,
    name: 'Heart',
    sanskrit: 'Anahata',
    color: '#3F8A5F',
    syllable: 'YAM',
    frequencyHz: 639,
    frequencyAudio: null,
    iAmMantras: ['I love', 'I forgive', 'I am love'],
    bodyLocation: 'Centre of chest',
    lifeArea: 'Relationships',
    blockedBy: { name: 'Grief', weight: 75 },
    attributes: [
      'love',
      'compassion',
      'universal consciousness',
      'emotional balance',
      'forgiveness',
      'relationships',
    ],
    balanced: [
      'Balanced',
      'Peaceful',
      'Generous and giving',
      'Healthy intimate relationships',
      'Aware of right to love and be loved',
      'Compassionate',
      'Truly forgives others',
      'Forgives self and moves on',
      'Accepts support',
      'Happy and light',
      'Unconditional love',
      'Pure of heart',
      'Expresses love to self and others',
      'Says no without guilt',
      'Tolerant of life and people',
      'Sympathetic',
      'Patient with self and others',
      'Sense of understanding',
      'Whole and content',
      'Empathetic',
      'Innocent child-like love',
      'Brotherhood and sisterhood',
      'Playful',
      'Maintains long-term relationships',
      'Sense of unity',
    ],
    unbalanced: [
      'Resentful and bitter',
      'Overly sensitive or shy',
      'Cannot accept love',
      'Cannot accept support',
      'Negative toward self and others',
      'Unresolved grief',
      'Depression',
      'Antisocial',
      "Lets others' emotions control choices",
      'Disorders of heart, blood, respiration, immune',
      'Cannot let go of past wrongs',
      'Cannot forgive self',
      'Past wounds shape current relationships',
      'Insincere love',
      'Lack of self-love',
      'Fear of intimacy',
      'Jealousy',
      'Intolerant and critical',
      'Avoids intimate relationships',
      'Codependency',
      'Possessiveness',
    ],
    breathworkIds: ['breath-activation', 'breath-alternate-nostril'],
    meditationIds: ['med-relationship-magic', 'med-abundance'],
    unblockingScriptId: 'unblock-heart',
  },

  // ─── 5. THROAT ─────────────────────────────────────────────────────────
  throat: {
    id: 'throat',
    number: 5,
    name: 'Throat',
    sanskrit: 'Vishuddha',
    color: '#3D9DC4',
    syllable: 'HAM',
    frequencyHz: 741,
    frequencyAudio: null,
    iAmMantras: ['I speak my truth', 'I express'],
    bodyLocation: 'Throat',
    lifeArea: 'Personal Development',
    blockedBy: { name: 'Lies', weight: 125 },
    attributes: [
      'communication',
      'self-expression',
      'creativity',
      'expression of will',
      'divine guidance',
      'inner voice',
      "speaking one's truth",
    ],
    balanced: [
      'Clear, confident speech',
      'Expresses self — cry, laugh, joy',
      'Listens to intuition and inner voice',
      'Sense of integrity',
      'Expresses creativity',
      'Communicates with ease',
      'Expresses will freely',
      'Listens to others',
      'Speaks truth',
      'Honest about feelings',
      'Confident in self-expression',
      'Calm, patient speech',
      'Accepts and acts on inner guidance',
      'Voices opinions freely',
      'Stands up for self',
      'Processes emotions through creative expression',
      'Believes own words are worth listening to',
    ],
    unbalanced: [
      'Stuttering',
      'Fear of speaking',
      'Fear of self-expression',
      'Sore throat, tonsillitis',
      'Cannot express self',
      'Cannot communicate freely',
      'Speaks abruptly or with anger',
      'Gossiping',
      'Needs to be the centre of attention',
      'Chatterbox — constant need to talk',
      'Worried about silences',
      'Lying',
      'Self-betrayal',
      'Ignores own will and inner voice',
      'Fears being judged',
      'Feels unworthy of being heard',
      'Negative self-talk',
      'Quiet, timid, weak voice',
      'Not expressing creatively',
    ],
    breathworkIds: ['breath-alternate-nostril', 'breath-activation'],
    meditationIds: ['med-morning'],
    unblockingScriptId: 'unblock-throat',
  },

  // ─── 6. THIRD EYE ──────────────────────────────────────────────────────
  'third-eye': {
    id: 'third-eye',
    number: 6,
    name: 'Third Eye',
    sanskrit: 'Ajna',
    color: '#5645A6',
    syllable: 'OM',
    frequencyHz: 852,
    frequencyAudio: null,
    iAmMantras: ['I see clearly', 'I trust', 'I know'],
    bodyLocation: 'Between the eyebrows',
    lifeArea: 'Business / Career / Vocation',
    blockedBy: { name: 'Illusion (of separation)', weight: null },
    attributes: [
      'spiritual awareness',
      'seeing',
      'insight',
      'visualisation',
      'intuition',
      'psychic powers',
      'vision',
      'clairvoyance',
      'imagination',
    ],
    balanced: [
      'Independent thought',
      'Aware and accepting of own spirituality',
      'Clear vision',
      'Good memory',
      'Ability to focus',
      'General clarity of thought',
      'Peaceful sleep',
      'Connection to the universe',
      'Wisdom',
      'Uses intuition in everyday life',
      'Acknowledges intuitive thought',
      'Learns from experience',
      'Perceives world without judgment or prejudice',
      'Forgiveness and gratitude',
      'Trusts inner knowing',
      'Self-reflective, introspective',
      'Empathetic and understanding',
      'Good imagination',
      'Sees patterns in life',
      'Recognises spiritual aspects of life',
      'Thinks symbolically',
    ],
    unbalanced: [
      'Prejudice toward people and situations',
      'Focuses only on intellect and science',
      'Sees only surface meaning',
      'Rejects intuition',
      'Unimaginative',
      'Nightmares',
      'Confused, muddled thinking',
      'Delusions and hallucinations',
      'Vision or sinus issues',
      'Frequent confusion',
      'Overly rational',
      'Judgmental',
      'Cannot think for self',
      'Out of touch with reality',
      'Cannot tell illusion from reality',
      'Overly fearful or anxious',
      'Ego-focused',
      'Frequent negative perceptions of others',
      'Rigid thinking patterns',
    ],
    breathworkIds: ['breath-alternate-nostril', 'breath-box'],
    meditationIds: ['med-super-performance', 'med-evening'],
    unblockingScriptId: 'unblock-third-eye',
  },

  // ─── 7. CROWN ──────────────────────────────────────────────────────────
  crown: {
    id: 'crown',
    number: 7,
    name: 'Crown',
    sanskrit: 'Sahasrara',
    color: '#9B5BA1',
    syllable: 'AUM',
    frequencyHz: 963,
    frequencyAudio: null,
    iAmMantras: ['I am connected', 'I am one'],
    bodyLocation: 'Top of the head',
    lifeArea: 'Spiritual Fulfillment / Purpose',
    blockedBy: { name: 'Earthly addictions / 3D world', weight: null },
    attributes: [
      'spirituality',
      'energy',
      'connection with the divine',
      'pure awareness',
      'enlightenment',
      'fulfillment',
      'cosmic consciousness',
      'the absolute',
      'grace',
      'deep inner quest',
      'intelligence',
    ],
    balanced: [
      'Gratitude',
      'Aware of the unity of all life',
      'Blissful',
      'Light',
      'Lives in the present moment',
      'Taps into universal consciousness',
      'Aware of and accepts a higher source',
      'Knowledge, wisdom, clarity',
      'Finds answers within',
      'Self-knowledge',
      'Lives own truth',
      'Sense of own spirituality',
      'Strong spiritual connection',
      'Works with universal consciousness',
      'Recognises own divinity',
      'Aware of the miracle of own unconsciousness',
      'Connected to the greater world',
      'Direction and purpose in life',
      'Sense of meaning',
      'Charismatic',
      'Inquisitive mind',
    ],
    unbalanced: [
      'Headaches',
      'Nervous and mental disorders',
      'Fear of death and the unknown',
      'Insomnia',
      'Belief in self-limitation',
      'Unsatisfied, lost in life',
      'Lives in past or future',
      'Confusion',
      'Anxiety and fear',
      'Depression',
      'Ignorance',
      'Ego-based choices',
      'Selfish',
      'Closed-minded',
      'Overly skeptical',
      'Overly rigid belief system',
      'Isolated and alone',
      'Directionless, searching',
    ],
    breathworkIds: ['breath-4-7-8', 'breath-alternate-nostril'],
    meditationIds: ['med-morning', 'med-evening', 'med-abundance'],
    unblockingScriptId: 'unblock-crown',
  },

  // ─── 8. SOUL STAR ──────────────────────────────────────────────────────
  // The eighth centre. Sits ~20cm above the crown. Sound = silence.
  // Existing rich content lives in src/data/soul-chakra.ts (SOUL_CHAKRA).
  // This entry is the routing-layer surface for it.
  'soul-star': {
    id: 'soul-star',
    number: 8,
    name: 'Soul Star',
    sanskrit: 'Viyapini',
    color: '#F4F0E6',
    syllable: 'AH',
    frequencyHz: 1110,
    frequencyAudio: null,
    iAmMantras: ['I am expansive', 'I am eternal'],
    bodyLocation: 'Above the head (20–30 cm)',
    lifeArea: 'Time and Presence',
    blockedBy: { name: 'Illusion & limitation of space and time', weight: null },
    attributes: [
      'transcendence',
      'soul wisdom',
      'inner wealth',
      'letting go',
      'lower-self to higher-self embodiment',
      'unification of the soul',
      'unconditional love',
    ],
    balanced: [
      'Timeless presence comes easily',
      'Connected to a larger thread or purpose',
      'Trusts the unfolding without knowing the outcome',
      'Decisions arise from deeper than the calculating mind',
      'Can rest in being, not only doing',
    ],
    unbalanced: [
      'Chronic feeling of running out of time',
      'Life feels like a performance you are always behind on',
      'Difficulty being still — rest feels like failure',
      'Disconnected from any sense of why you are here',
      'A deep, hard-to-name loneliness nothing external fills',
    ],
    breathworkIds: ['breath-4-7-8', 'breath-grounding'],
    meditationIds: ['med-deep-rest', 'med-evening'],
    unblockingScriptId: 'unblock-soul-star',
  },
};

// ============ HELPERS ============

/** Ordered array (Root → Soul Star) for iteration. */
export const CHAKRA_SPINE_ORDERED: ChakraSpineEntry[] = [
  CHAKRA_SPINE.root,
  CHAKRA_SPINE.sacral,
  CHAKRA_SPINE['solar-plexus'],
  CHAKRA_SPINE.heart,
  CHAKRA_SPINE.throat,
  CHAKRA_SPINE['third-eye'],
  CHAKRA_SPINE.crown,
  CHAKRA_SPINE['soul-star'],
];

/**
 * Look up a chakra by canonical id ('root', 'sacral', ..., 'soul-star')
 * OR legacy ChakraKey form ('solar' / 'thirdEye') — same normalization
 * already used by getChakra() in chakras.ts.
 */
export function getChakraSpine(idOrKey: string): ChakraSpineEntry | undefined {
  const normalized = (() => {
    const s = String(idOrKey);
    if (s === 'solar') return 'solar-plexus';
    if (s === 'thirdEye' || s === 'third_eye') return 'third-eye';
    if (s === 'soul' || s === 'soulStar' || s === 'soul_star') return 'soul-star';
    return s;
  })();
  return CHAKRA_SPINE[normalized as SpineChakraId];
}

/**
 * Reverse lookup: given a Wheel of Life area string, return the chakra
 * that governs it. Used by the coach engine to route low Wheel scores
 * directly into chakra-tagged content.
 */
export function getChakraByLifeArea(area: WheelLifeArea): ChakraSpineEntry {
  const found = CHAKRA_SPINE_ORDERED.find((c) => c.lifeArea === area);
  // Type guarantees coverage — every WheelLifeArea is mapped above.
  // The non-null assertion is provably safe here.
  return found as ChakraSpineEntry;
}

/**
 * Returns all chakras whose `blockedBy` weight is at or above a threshold.
 * Used by the coach engine to identify "denser" blocks for longer protocols.
 */
export function getChakrasByBlockWeight(minWeight: number): ChakraSpineEntry[] {
  return CHAKRA_SPINE_ORDERED.filter(
    (c) => c.blockedBy.weight !== null && c.blockedBy.weight >= minWeight
  );
}
