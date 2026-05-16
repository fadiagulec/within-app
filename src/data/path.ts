/**
 * Within — The Path.
 *
 * The 7-stage transformational journey. This is the spine of the app.
 * Every feature lives inside one of these stages. The user always knows
 * where they are and what comes next.
 *
 * Order is psychological, not arbitrary:
 *   Arrival → Ground → Listen → Release → Rewire → Expand → Embody.
 *
 * This is the trauma-informed sequence: regulation before exploration,
 * body before mind, safety before depth.
 */

export type PathStageId =
  | 'arrival'
  | 'ground'
  | 'listen'
  | 'release'
  | 'rewire'
  | 'expand'
  | 'embody';

export type PracticeKind =
  | 'breath'
  | 'meditation'
  | 'letter'
  | 'journal'
  | 'inquiry'
  | 'check-in'
  | 'reflection'
  | 'reading'
  | 'plan'
  | 'chart'
  | 'ritual';

export interface PathPractice {
  /** Stable id used for completion tracking. */
  id: string;
  /** Short label. */
  title: string;
  /** What kind of practice — drives the icon and copy. */
  kind: PracticeKind;
  /** Where it routes. */
  route: string;
  /** Approximate duration. */
  durationMin: number;
  /** One-line "what it is" subtitle. */
  blurb: string;
  /** Optional — mark the cornerstone practice of the stage. */
  cornerstone?: boolean;
}

export interface PathStage {
  id: PathStageId;
  /** 1..7 */
  order: number;
  /** Short name. */
  name: string;
  /** The emotional kicker — "what you'll feel when you walk this stage." */
  kicker: string;
  /** One-paragraph stage description. Original voice. */
  description: string;
  /** Pacing label users see. */
  durationLabel: string;
  /** Accent color. */
  color: string;
  /** Practices inside this stage. */
  practices: PathPractice[];
  /** The depth marker earned when the stage is complete (quiet certification). */
  depthMarker: string;
  /** A short hint shown when ready to move to the next stage. */
  nextHint?: string;
}

// ============================================================
// THE PATH — 7 stages
// ============================================================

export const PATH_STAGES: PathStage[] = [
  // ──────── 1. ARRIVAL ────────
  {
    id: 'arrival',
    order: 1,
    name: 'Arrival',
    kicker: 'Someone is finally asking the right questions.',
    description:
      "You can't heal what you haven't named. Arrival is where you stop running long enough to look. We map the terrain — what your life looks like right now, what your body has been carrying, what brought you here. Nothing to fix yet. Just honest seeing.",
    durationLabel: '1–3 days',
    color: '#C5A88A',
    practices: [
      {
        id: 'arrival-wheel',
        title: 'Wheel of Life',
        kind: 'check-in',
        route: '/(onboarding)/wheel-of-life',
        durationMin: 4,
        blurb: 'Score 8 areas. The app reads from this.',
        cornerstone: true,
      },
      {
        id: 'arrival-foundations-energy-healing',
        title: 'What energy healing actually is',
        kind: 'reading',
        route: '/foundations/energy-healing',
        durationMin: 3,
        blurb: 'The framework underneath everything.',
      },
      {
        id: 'arrival-foundations-chakras',
        title: 'The 8 chakras',
        kind: 'reading',
        route: '/foundations/chakras',
        durationMin: 3,
        blurb: 'Your energy spine in plain English.',
      },
      {
        id: 'arrival-birth-data',
        title: 'Your birth coordinates',
        kind: 'check-in',
        route: '/you/birth-data',
        durationMin: 2,
        blurb: 'For your chart + Energy Blueprint.',
      },
      {
        id: 'arrival-body-anchor',
        title: 'Where your body is loudest',
        kind: 'check-in',
        route: '/body',
        durationMin: 3,
        blurb: 'Tap where it lives. Notice. Name it.',
      },
    ],
    depthMarker: 'Named the terrain.',
    nextHint: 'Next: Ground. Learning to land in the body before going anywhere deeper.',
  },

  // ──────── 2. GROUND ────────
  {
    id: 'ground',
    order: 2,
    name: 'Ground',
    kicker: 'I can land in my body. I am safe to be here.',
    description:
      'Healing does not happen in a body that does not feel safe. Before anything else, the nervous system has to learn that the present moment is not the past. This stage teaches you the breath patterns, the daily hygiene, and the somatic anchors that come BEFORE the deeper work. Most people skip this. Do not skip this.',
    durationLabel: 'Weeks 1–4',
    color: '#3F8A5F',
    practices: [
      {
        id: 'ground-energy-hygiene',
        title: 'Energy Hygiene — the daily practice',
        kind: 'ritual',
        route: '/energy-hygiene',
        durationMin: 18,
        blurb: '7-step daily ritual. Clean the field every day.',
        cornerstone: true,
      },
      {
        id: 'ground-burnout-journey',
        title: '21-Day Burnout Recovery Journey',
        kind: 'plan',
        route: '/(tabs)/journey',
        durationMin: 30,
        blurb: 'Three weeks of structured practice if the nervous system is fried. Morning + evening, every day.',
      },
      {
        id: 'ground-burnout-quiz',
        title: 'Burnout Assessment',
        kind: 'check-in',
        route: '/burnout-quiz',
        durationMin: 3,
        blurb: 'Honest 8-question read. Tells you whether the Journey is what you need right now.',
      },
      {
        id: 'ground-4-7-8',
        title: '4-7-8 Breath',
        kind: 'breath',
        route: '/breathwork/breath-4-7-8',
        durationMin: 6,
        blurb: 'The fastest nervous-system reset.',
      },
      {
        id: 'ground-box-breath',
        title: 'Box Breath',
        kind: 'breath',
        route: '/breathwork/breath-box',
        durationMin: 8,
        blurb: 'Steady ground for any moment.',
      },
      {
        id: 'ground-grounding-breath',
        title: 'Grounding Breath',
        kind: 'breath',
        route: '/breathwork/breath-grounding',
        durationMin: 7,
        blurb: 'Come back down when the day pulled you out.',
      },
      {
        id: 'ground-buteyko',
        title: 'Buteyko Breathwork',
        kind: 'breath',
        route: '/breathwork/breath-buteyko',
        durationMin: 12,
        blurb: 'Calm anxiety by quieting the breath.',
      },
      {
        id: 'ground-check-in',
        title: 'Daily Check-In',
        kind: 'check-in',
        route: '/check-in',
        durationMin: 1,
        blurb: 'One minute. Where is your chakra spine today?',
      },
      {
        id: 'ground-connecting-light',
        title: 'Connecting to Light',
        kind: 'ritual',
        route: '/connecting-to-light',
        durationMin: 10,
        blurb: 'Sleep, hydration, nourishment, grounding.',
      },
      {
        id: 'ground-protecting-light',
        title: 'Protecting Your Light',
        kind: 'ritual',
        route: '/protecting-your-light',
        durationMin: 10,
        blurb: 'For the empath who comes home heavier than they left.',
      },
      {
        id: 'ground-foundations-breathwork',
        title: 'Why breath is the master tool',
        kind: 'reading',
        route: '/foundations/breathwork',
        durationMin: 3,
        blurb: 'The science of state-change.',
      },
      {
        id: 'ground-foundations-sleep',
        title: 'Sleep as non-negotiable',
        kind: 'reading',
        route: '/foundations/sleep',
        durationMin: 3,
        blurb: 'Without this, nothing else holds.',
      },
    ],
    depthMarker: 'Landed in the body.',
    nextHint: 'Next: Listen. Once safe, you can hear what the body has been trying to say.',
  },

  // ──────── 3. LISTEN ────────
  {
    id: 'listen',
    order: 3,
    name: 'Listen',
    kicker: 'I am finally hearing what my body has been saying.',
    description:
      'The body has been speaking for years. This is the stage where you learn its language. You stop dismissing the headache, the gut, the shoulder. You stop medicalising what is psychological. Every chakra has a voice. Every symptom carries a message. Listen, and the path forward starts to write itself.',
    durationLabel: 'Weeks 4–12',
    color: '#3D9DC4',
    practices: [
      {
        id: 'listen-body-inquiry',
        title: 'Body Inquiry — the 7-step practice',
        kind: 'inquiry',
        route: '/body-inquiry',
        durationMin: 22,
        blurb: 'Hear what one specific symptom is carrying.',
        cornerstone: true,
      },
      {
        id: 'listen-chakra-map',
        title: 'The 8-Chakra Map',
        kind: 'reading',
        route: '/chakra-wheel',
        durationMin: 5,
        blurb: 'See all your centres. Find where the energy is stuck.',
      },
      {
        id: 'listen-body-wisdom',
        title: 'Body Wisdom — 50-symptom directory',
        kind: 'reading',
        route: '/body',
        durationMin: 10,
        blurb: 'Look up the symptom. Read the message.',
      },
      {
        id: 'listen-journal',
        title: 'Journal',
        kind: 'journal',
        route: '/(tabs)/journal',
        durationMin: 10,
        blurb: 'Write what you are not saying out loud.',
      },
      {
        id: 'listen-foundations-body',
        title: 'Body wisdom — what symptoms are saying',
        kind: 'reading',
        route: '/foundations/body-wisdom',
        durationMin: 3,
        blurb: 'How to read your body without medicalising it.',
      },
      {
        id: 'listen-foundations-journaling',
        title: 'Why writing changes the brain',
        kind: 'reading',
        route: '/foundations/journaling',
        durationMin: 3,
        blurb: 'The writing cure, by mechanism.',
      },
      {
        id: 'listen-alternate-nostril',
        title: 'Alternate Nostril Breath',
        kind: 'breath',
        route: '/breathwork/breath-alternate-nostril',
        durationMin: 11,
        blurb: 'Reset when scattered. Hemispheric balance.',
      },
    ],
    depthMarker: 'Heard the body.',
    nextHint: 'Next: Release. You have the map. Now you can let down what was never yours.',
  },

  // ──────── 4. RELEASE ────────
  {
    id: 'release',
    order: 4,
    name: 'Release',
    kicker: 'I am letting go of what was never mine to carry.',
    description:
      'This is the deepest stage. The 7-step Quantum Unblocking Timeline Process — the signature practice — lives here. So do the 8 Chakra Letters and the 21-day Letting Go arc. You meet the inner child. You grieve what was not given. You put down ancestral, relational, and trauma residue that has been running you for decades. Do not enter this stage without Ground first.',
    durationLabel: 'Months 3–6',
    color: '#9B5BA1',
    practices: [
      {
        id: 'release-unblocking',
        title: 'Rooted Through 1, Pulled Through 7',
        kind: 'inquiry',
        route: '/unblocking-process',
        durationMin: 25,
        blurb: 'The flagship 7-step Quantum Timeline Process.',
        cornerstone: true,
      },
      {
        id: 'release-heart-letter',
        title: 'The Heart Letter',
        kind: 'letter',
        route: '/letter/heart',
        durationMin: 18,
        blurb: 'Six-step structured release through the heart.',
      },
      {
        id: 'release-root-letter',
        title: 'The Root Letter',
        kind: 'letter',
        route: '/letter/root',
        durationMin: 18,
        blurb: 'Safety, survival, the fear underneath everything.',
      },
      {
        id: 'release-sacral-letter',
        title: 'The Sacral Letter',
        kind: 'letter',
        route: '/letter/sacral',
        durationMin: 18,
        blurb: 'Emotion, creativity, and what was shamed in you.',
      },
      {
        id: 'release-plan-letting-go',
        title: 'Letting Go of the Past — 21 days',
        kind: 'plan',
        route: '/plan/letting-go',
        durationMin: 15,
        blurb: '15 minutes a day. Open → Release → Integrate.',
      },
      {
        id: 'release-mirror',
        title: 'Mirror Mode',
        kind: 'inquiry',
        route: '/mirror',
        durationMin: 10,
        blurb: 'What you see in them is asking to be seen in you.',
      },
      {
        id: 'release-activation-breath',
        title: 'Activation Breath',
        kind: 'breath',
        route: '/breathwork/breath-activation',
        durationMin: 22,
        blurb: 'Two-part circular breath. Big release work.',
      },
      {
        id: 'release-foundations-lineage',
        title: 'Lineage & ancestors',
        kind: 'reading',
        route: '/foundations/lineage',
        durationMin: 3,
        blurb: 'What you carry that is not yours.',
      },
    ],
    depthMarker: 'Released the past.',
    nextHint: 'Next: Rewire. With the old put down, you can install what is yours to become.',
  },

  // ──────── 5. REWIRE ────────
  {
    id: 'rewire',
    order: 5,
    name: 'Rewire',
    kicker: 'I am becoming someone new from the inside.',
    description:
      'The old patterns are off. Now you build the new ones. This stage rewires self-worth, confidence, and inner authority. Solar Plexus work. Daily affirmation. Gratitude as a brain-training tool. The 21-day Build Abundance and Magnetic Self plans live here. The work is repetitive on purpose — neural pathways take weeks to form.',
    durationLabel: 'Months 6–9',
    color: '#E8B83E',
    practices: [
      {
        id: 'rewire-solar-letter',
        title: 'The Solar Plexus Letter',
        kind: 'letter',
        route: '/letter/solar-plexus',
        durationMin: 18,
        blurb: 'Power, will, and the right to take up space.',
        cornerstone: true,
      },
      {
        id: 'rewire-gratitude',
        title: 'Daily Gratitude',
        kind: 'ritual',
        route: '/gratitude',
        durationMin: 4,
        blurb: 'Three things, twice a day. Trains the brain.',
      },
      {
        id: 'rewire-plan-abundance',
        title: 'Build Abundance — 21 days',
        kind: 'plan',
        route: '/plan/build-abundance',
        durationMin: 15,
        blurb: 'Money beliefs rewired through Solar Plexus work.',
      },
      {
        id: 'rewire-plan-magnetic',
        title: 'Magnetic Self — 21 days',
        kind: 'plan',
        route: '/plan/magnetic-self',
        durationMin: 15,
        blurb: 'Self-worth, presence, confidence rebuilt.',
      },
      {
        id: 'rewire-fire-breath',
        title: 'Fire Breath',
        kind: 'breath',
        route: '/breathwork/breath-fire',
        durationMin: 12,
        blurb: 'Wake up the power centre.',
      },
      {
        id: 'rewire-foundations-money',
        title: 'Money & abundance mindset',
        kind: 'reading',
        route: '/foundations/money',
        durationMin: 3,
        blurb: 'The inherited story you can update.',
      },
      {
        id: 'rewire-foundations-manifestation',
        title: 'Manifestation — conscious creation',
        kind: 'reading',
        route: '/foundations/manifestation',
        durationMin: 3,
        blurb: 'What it actually is. What it is not.',
      },
    ],
    depthMarker: 'Rewired the inside.',
    nextHint: 'Next: Expand. With the new wiring in, you can step into who you came here to be.',
  },

  // ──────── 6. EXPAND ────────
  {
    id: 'expand',
    order: 6,
    name: 'Expand',
    kicker: 'I am building the life that matches who I have become.',
    description:
      'The body is grounded. The past is put down. The new wiring is in. Now you expand. This stage is about purpose, identity, and alignment. You read your astrology and Energy Blueprint not as identity but as instructions for how to operate. You build the vision. You start moving toward it with the right energy — yours, finally.',
    durationLabel: 'Months 9–12',
    color: '#5645A6',
    practices: [
      {
        id: 'expand-chart',
        title: 'Your Astrology Chart',
        kind: 'chart',
        route: '/you/chart',
        durationMin: 12,
        blurb: 'Sun, moon, rising, full chart, current transits.',
        cornerstone: true,
      },
      {
        id: 'expand-blueprint',
        title: 'Your Energy Blueprint',
        kind: 'chart',
        route: '/you/blueprint',
        durationMin: 12,
        blurb: 'Type, strategy, authority — how to decide.',
      },
      {
        id: 'expand-third-eye-letter',
        title: 'The Third Eye Letter',
        kind: 'letter',
        route: '/letter/third-eye',
        durationMin: 18,
        blurb: 'Clarity, intuition, seeing what is true.',
      },
      {
        id: 'expand-crown-letter',
        title: 'The Crown Letter',
        kind: 'letter',
        route: '/letter/crown',
        durationMin: 18,
        blurb: 'Connection to source, expansion, surrender.',
      },
      {
        id: 'expand-vision',
        title: 'Vision Board',
        kind: 'ritual',
        route: '/(tabs)/vision',
        durationMin: 15,
        blurb: 'What you are calling in, in your own words.',
      },
      {
        id: 'expand-throat-letter',
        title: 'The Throat Letter',
        kind: 'letter',
        route: '/letter/throat',
        durationMin: 18,
        blurb: 'Voice, truth, what is asking to be said.',
      },
      {
        id: 'expand-foundations-astrology',
        title: 'Astrology — your cosmic blueprint',
        kind: 'reading',
        route: '/foundations/astrology',
        durationMin: 3,
        blurb: 'Personality framework, not fortune-telling.',
      },
      {
        id: 'expand-foundations-blueprint',
        title: 'Your Energy Blueprint',
        kind: 'reading',
        route: '/foundations/energy-blueprint',
        durationMin: 3,
        blurb: 'The operating instructions for your wiring.',
      },
    ],
    depthMarker: 'Stepped into who you are.',
    nextHint: 'Next: Embody. The work becomes the life.',
  },

  // ──────── 7. EMBODY ────────
  {
    id: 'embody',
    order: 7,
    name: 'Embody',
    kicker: 'This is who I am now. The path becomes my life.',
    description:
      'Healing is not a project that ends. It becomes the shape of your days. This stage is maintenance, rhythm, and depth. The Soul Star opens. You hold relationships from a regulated place. You contribute. You retreat. You return. The path no longer feels like work — it feels like home.',
    durationLabel: 'Year 2 and beyond',
    color: '#9DBFB2',
    practices: [
      {
        id: 'embody-soul-star-letter',
        title: 'The Soul Star Letter',
        kind: 'letter',
        route: '/letter/soul-star',
        durationMin: 18,
        blurb: 'Presence beyond the body. The 8th gate.',
        cornerstone: true,
      },
      {
        id: 'embody-aham-prakasha',
        title: 'Aham Prakasha — I Am Light',
        kind: 'breath',
        route: '/breathwork/breath-aham-prakasha',
        durationMin: 15,
        blurb: 'Conscious connected breath with intention.',
      },
      {
        id: 'embody-relationships',
        title: 'Relationships hub',
        kind: 'ritual',
        route: '/relationships',
        durationMin: 10,
        blurb: 'Hold others from a regulated place.',
      },
      {
        id: 'embody-retreats',
        title: 'Retreats',
        kind: 'ritual',
        route: '/retreats',
        durationMin: 5,
        blurb: 'In-person experiences. The apex of the path.',
      },
      {
        id: 'embody-foundations-service',
        title: 'Service & contribution',
        kind: 'reading',
        route: '/foundations/service',
        durationMin: 3,
        blurb: 'The fastest way out of self-loop.',
      },
      {
        id: 'embody-foundations-death',
        title: 'Death awareness',
        kind: 'reading',
        route: '/foundations/death-awareness',
        durationMin: 3,
        blurb: 'How knowing this ends makes it matter.',
      },
      {
        id: 'embody-foundations-soul-star',
        title: 'The 8th centre — Soul Star',
        kind: 'reading',
        route: '/foundations/soul-star',
        durationMin: 3,
        blurb: 'Presence as the home you return to.',
      },
    ],
    depthMarker: 'The path became home.',
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getStage(id: PathStageId): PathStage | undefined {
  return PATH_STAGES.find((s) => s.id === id);
}

export function getStageByOrder(order: number): PathStage | undefined {
  return PATH_STAGES.find((s) => s.order === order);
}

export function getPractice(stageId: PathStageId, practiceId: string): PathPractice | undefined {
  const stage = getStage(stageId);
  return stage?.practices.find((p) => p.id === practiceId);
}

/** Find which stage a practice belongs to. */
export function findStageForPractice(practiceId: string): PathStage | undefined {
  return PATH_STAGES.find((s) => s.practices.some((p) => p.id === practiceId));
}

/** The cornerstone practice for a stage. */
export function getCornerstone(stageId: PathStageId): PathPractice | undefined {
  const stage = getStage(stageId);
  return stage?.practices.find((p) => p.cornerstone) ?? stage?.practices[0];
}
