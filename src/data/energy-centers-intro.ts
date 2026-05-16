/**
 * SOMA - Energy Centers Introduction
 *
 * The educational gateway to the chakra system.
 * Intro for total beginners — what energy centers are, how they block,
 * how to recognize blockage, and an at-a-glance map of all 7.
 */

// ============ INTRODUCTION ============

export const INTRO = {
  title: 'Energy Centers',
  subtitle: 'A map of where feeling lives in the body.',
  opening: [
    'Long before modern psychology, people noticed something: emotions cluster in specific parts of the body. Fear sits low. Grief sits in the chest. Anxiety rises into the throat.',
    'The energy-center system (developed over thousands of years in India, refined across many cultures) names seven of these zones — from the base of the spine to the crown of the head.',
    'Each one governs a specific area of life. Each one has a color, a sound, a body location, and a signature emotion that shows up when it is blocked.',
    'You do not have to believe in anything to benefit from this map. You are simply learning to pay attention to zones of your body that you have probably been ignoring your whole life.',
  ],
};

// ============ HOW ENERGY CENTERS BECOME BLOCKED ============

export const HOW_BLOCKS_FORM = {
  title: 'How Energy Centers Become Blocked',
  subtitle: 'Understanding the mechanism is the beginning of the unblocking.',
  mechanisms: [
    {
      title: 'Unfelt Emotion',
      body: 'Every emotion is energy moving through you. If allowed to move, it passes in minutes. If suppressed — "I shouldn\'t feel this" — the energy stays. It accumulates in the body zone that corresponds to that emotion.',
    },
    {
      title: 'Early Wounds',
      body: 'What happened to you as a child — especially what was not safe to express — becomes stored in the body. A child who learned that anger was dangerous stores anger in the belly. A child whose love was conditional stores grief in the heart.',
    },
    {
      title: 'Repeated Suppression',
      body: 'Every time you smile when you wanted to cry. Every time you said yes when you meant no. Every time you swallowed what you needed to say. Each small suppression leaves a small deposit.',
    },
    {
      title: 'Inherited Patterns',
      body: 'Some of what you carry was not yours to begin with. Ancestral patterns, cultural conditioning, family beliefs. These live in the body too — often in the energy centers that correspond to them.',
    },
    {
      title: 'Unprocessed Trauma',
      body: 'When the nervous system cannot integrate an experience — because it was too much, too fast, or happened when you were too young — the energy of that event gets stored. Often in multiple centers at once.',
    },
    {
      title: 'Chronic Disconnection',
      body: 'Simply not feeling the body — running on coffee, screens, and forward momentum for years — leads to a gradual dimming of all seven centers. They need attention to stay open.',
    },
  ],
  closing:
    'Blockage is not a flaw. It is the body doing its job — storing what it could not yet process. Unblocking is simply letting the body finish what it started.',
};

// ============ UNIVERSAL SYMPTOMS OF BLOCKAGE ============

export const BLOCKAGE_SYMPTOMS = {
  title: 'How You Know an Energy Center Is Blocked',
  subtitle: 'Signals the body sends when a center needs attention.',
  categories: [
    {
      name: 'Physical Signals',
      items: [
        'Chronic tension in a specific body zone (hips, jaw, chest, shoulders)',
        'Unexplained pain that medical tests cannot name',
        'Low energy no matter how much you sleep',
        'Digestive issues that come and go with stress',
        'Feeling physically heavy or weighted down',
        'Breath that never quite reaches deep',
      ],
    },
    {
      name: 'Emotional Signals',
      items: [
        'One feeling that dominates — chronic fear, chronic guilt, chronic grief',
        'Emotional numbness or flatness',
        'Disproportionate reactions to small events',
        'Patterns that repeat across relationships',
        'Difficulty expressing a specific emotion (anger, sadness, joy)',
        'Feeling "stuck" without being able to explain why',
      ],
    },
    {
      name: 'Life-Pattern Signals',
      items: [
        'Same situation showing up with different people',
        'One area of life that never seems to flow (money, love, purpose)',
        'Recurring dreams or preoccupations',
        'Difficulty making decisions in a specific domain',
        'A sense that something is "off" but you cannot name it',
        'Creativity, pleasure, or meaning feel unavailable',
      ],
    },
    {
      name: 'Subtle Signals',
      items: [
        'Feeling unseen, unheard, or unsafe in subtle ways',
        'Triggered by certain people or situations consistently',
        'Inability to receive — compliments, help, love',
        'Doing too much and still feeling inadequate',
        'Disconnected from your own knowing',
      ],
    },
  ],
  closing:
    'You do not need to have all of these. One or two in a category often points to which center needs care.',
};

// ============ ALL 7 AT A GLANCE ============

export type ChakraIntro = {
  id: string;
  number: number;
  name: string;
  sanskritName: string;
  color: string;
  colorName: string;
  mantra: string;
  element: string;
  location: string;
  lifeArea: string;
  shadowFeeling: string;
  openStateShort: string;
  blockedStateShort: string;
};

export const CHAKRAS_AT_A_GLANCE: ChakraIntro[] = [
  {
    id: 'root',
    number: 1,
    name: 'Root',
    sanskritName: 'Muladhara',
    color: '#6B1F1F',
    colorName: 'Crimson / Deep Red',
    mantra: 'LAM',
    element: 'Earth',
    location: 'Base of the spine · pelvic floor',
    lifeArea: 'Safety · Belonging · Survival · Money · Home',
    shadowFeeling: 'Fear',
    openStateShort: 'Grounded. Trusting. At home in the body.',
    blockedStateShort: 'Anxious. Scarcity-minded. Can\'t settle.',
  },
  {
    id: 'sacral',
    number: 2,
    name: 'Sacral',
    sanskritName: 'Svadhisthana',
    color: '#C2712C',
    colorName: 'Amber / Orange',
    mantra: 'VAM',
    element: 'Water',
    location: 'Lower belly · two inches below navel',
    lifeArea: 'Pleasure · Creativity · Emotion · Sensuality · Flow',
    shadowFeeling: 'Guilt',
    openStateShort: 'Alive. Creative. Emotionally fluid.',
    blockedStateShort: 'Numb. Guilty. Creatively dry.',
  },
  {
    id: 'solar-plexus',
    number: 3,
    name: 'Solar Plexus',
    sanskritName: 'Manipura',
    color: '#D9B24C',
    colorName: 'Gold / Bright Yellow',
    mantra: 'RAM',
    element: 'Fire',
    location: 'Upper belly · just below the ribs',
    lifeArea: 'Worth · Power · Confidence · Self-Esteem · Money Mindset',
    shadowFeeling: 'Shame',
    openStateShort: 'Confident. Decisive. Quiet authority.',
    blockedStateShort: 'Self-doubting. Over-giving. Imposter feeling.',
  },
  {
    id: 'heart',
    number: 4,
    name: 'Heart',
    sanskritName: 'Anahata',
    color: '#6B8F71',
    colorName: 'Sage / Green',
    mantra: 'YAM',
    element: 'Air',
    location: 'Center of the chest · sternum',
    lifeArea: 'Love · Compassion · Connection · Forgiveness · Relationships',
    shadowFeeling: 'Grief',
    openStateShort: 'Open-hearted. Able to love and receive love.',
    blockedStateShort: 'Closed. Guarded. Grieving quietly.',
  },
  {
    id: 'throat',
    number: 5,
    name: 'Throat',
    sanskritName: 'Vishuddha',
    color: '#3E6A8C',
    colorName: 'Dusk Blue',
    mantra: 'HAM',
    element: 'Ether / Space',
    location: 'Hollow of the throat · collarbone',
    lifeArea: 'Truth · Voice · Expression · Boundaries · Communication',
    shadowFeeling: 'Suppression',
    openStateShort: 'Clear-voiced. Honest. Heard.',
    blockedStateShort: 'Silenced. People-pleasing. Unheard.',
  },
  {
    id: 'third-eye',
    number: 6,
    name: 'Third Eye',
    sanskritName: 'Ajna',
    color: '#3B3564',
    colorName: 'Indigo',
    mantra: 'OM',
    element: 'Light',
    location: 'Between the eyebrows · above the nose',
    lifeArea: 'Clarity · Intuition · Insight · Decision-Making · Vision',
    shadowFeeling: 'Doubt',
    openStateShort: 'Clear-seeing. Trusting inner knowing.',
    blockedStateShort: 'Scattered. Overthinking. Second-guessing.',
  },
  {
    id: 'crown',
    number: 7,
    name: 'Crown',
    sanskritName: 'Sahasrara',
    color: '#8A7AA8',
    colorName: 'Violet / Pale Purple',
    mantra: 'OM',
    element: 'Thought · Consciousness',
    location: 'Top of the head · crown',
    lifeArea: 'Purpose · Connection · Meaning · Spiritual Connection',
    shadowFeeling: 'Separation',
    openStateShort: 'Connected. Purposeful. Held by something larger.',
    blockedStateShort: 'Lonely. Meaningless. Cut off.',
  },
];

// ============ HOW TO USE THIS MAP ============

export const HOW_TO_USE = {
  title: 'How to Use This Map',
  steps: [
    {
      title: 'Notice Where Your Attention Goes',
      body: 'Read through the shadow feelings and blocked-state descriptions. One or two will stand out. Your body already knows.',
    },
    {
      title: 'Start With the Loudest',
      body: 'You do not need to work all seven at once. The center that is most activated is the one asking for attention first.',
    },
    {
      title: 'Open the Chakra Hub',
      body: 'Each chakra has a three-phase practice: Learn (understand it) → Affirm (rewire your relationship) → Heal (release the stored feeling through guided sessions).',
    },
    {
      title: 'Return Often',
      body: 'Blockage is rarely cleared in one session. Return to the same chakra over weeks. Each layer heals what the previous layer revealed.',
    },
    {
      title: 'Notice the Ripples',
      body: 'When you unblock one center, the others often shift on their own. The body is a system — moving stuck energy in one place frees the whole.',
    },
  ],
};
