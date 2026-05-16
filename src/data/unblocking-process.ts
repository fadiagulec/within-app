/**
 * Within — The Rooted-Through-1, Pulled-Through-7 Process
 *
 * The founder's signature Quantum Unblocking Timeline Process.
 *
 * "We go to the root cause (1) to release, then pull the energy from the
 * highest source (7) to heal, align, and elevate."
 *
 * Seven steps. Anchored at Root (Earth) and Crown (Source), held in the
 * Heart. Goes back through the timeline to the original emotional imprint,
 * releases what was suppressed, reframes the memory, and anchors a new
 * empowered state in the present.
 *
 * This is the universal method underneath every chakra-specific unblocking
 * in the app. Same shape, applied to any centre / any blocked emotion.
 */

// ============ OVERVIEW ============

export const UNBLOCKING_OVERVIEW = {
  title: 'Rooted Through 1, Pulled Through 7',
  subtitle: 'A Quantum Unblocking Timeline Process',
  intro:
    'We go to the root cause (Centre 1) to release the original interference, then pull high-frequency energy from the highest source (Centre 7) to heal, align, and elevate. Anchored at the heart.',
  purpose:
    'To release old emotional interference at the root, and receive high-frequency energy, love, and wisdom from the highest source to transform and realign the energy centres.',
  timeline:
    'We gently travel back through time to the origin of the interference — sometimes to the day before, the moment before the pain, or the very first time the feeling was experienced.',
};

// ============ ANCHORS ============

export const UNBLOCKING_ANCHORS = {
  groundedAt: { centre: 'Root', number: 1, label: 'Rooted through the Earth' },
  pulledFrom: { centre: 'Crown', number: 7, label: 'Pulled through the Crown' },
  heldIn: { centre: 'Heart', number: 4, label: 'Anchored in the Heart' },
};

// ============ THE 7 STEPS ============

export interface UnblockingStep {
  number: number;
  title: string;
  /** Verb-led one-liner — the essence of this step. */
  essence: string;
  /** 3–4 short imperative actions the user does during this step. */
  actions: string[];
  /** What this step achieves — for display alongside the actions. */
  why: string;
  /** Hex color hint for visual styling (maps to chakra associations). */
  accent: string;
  /** Approximate minutes for this step in a guided flow. */
  durationMin: number;
}

export const UNBLOCKING_STEPS: UnblockingStep[] = [
  {
    number: 1,
    title: 'Ground into the Root',
    essence: 'Connect to the Earth. Slow the breath. Feel safe enough to begin.',
    actions: [
      'Connect to the Earth',
      'Slow the breath',
      'Feel safety in the body',
      'Visualise red roots extending deep into the ground',
    ],
    why: 'Creates a strong foundation of safety, stability, and nervous-system regulation.',
    accent: '#6B1F1F',
    durationMin: 3,
  },
  {
    number: 2,
    title: 'Open to the Crown',
    essence: 'Connect upward to divine intelligence. Receive support before you go in.',
    actions: [
      'Connect upward to divine intelligence',
      'Invite love, light, and guidance',
      'Visualise white or violet light above the head',
    ],
    why: 'Brings in high-frequency energy, wisdom, and support from the Quantum Field.',
    accent: '#9B5BA1',
    durationMin: 3,
  },
  {
    number: 3,
    title: 'Permission',
    essence: 'Conscious + subconscious mind agree to the journey.',
    actions: [
      'Conscious mind permission',
      'Subconscious mind permission',
      'Permission for the practice to guide the process',
    ],
    why: 'Ensures you are in full agreement and ready for a safe and powerful journey.',
    accent: '#E8B83E',
    durationMin: 2,
  },
  {
    number: 4,
    title: 'Travel back through the timeline',
    essence: 'Find the moment the feeling was first imprinted.',
    actions: [
      'Go back to the memory',
      'Observe the emotions',
      'Return to the day before if needed',
      'Find the original emotional imprint',
    ],
    why: 'We discover the true root cause of the emotional interference.',
    accent: '#5645A6',
    durationMin: 4,
  },
  {
    number: 5,
    title: 'Release what was held',
    essence: 'Feel it safely. Move it through. Say what was never said.',
    actions: [
      'Feel safely',
      'Release suppressed emotion',
      'Speak what was never spoken',
    ],
    why: 'Releases trapped emotions stored in the body and nervous system.',
    accent: '#3F8A5F',
    durationMin: 5,
  },
  {
    number: 6,
    title: 'Reframe & comfort the younger self',
    essence: 'Meet the younger you with what they actually needed.',
    actions: [
      'Comfort the younger self',
      'Reframe the experience',
      'Shift perception from fear to love',
    ],
    why: 'Transforms the meaning of the experience and creates emotional freedom.',
    accent: '#3D9DC4',
    durationMin: 4,
  },
  {
    number: 7,
    title: 'Anchor the new state',
    essence: 'Return to the present. Lock in the new belief.',
    actions: [
      'Anchor new beliefs',
      'Return safely to the present moment',
      'Integrate with breath and grounding',
    ],
    why: 'Rewires the nervous system and integrates the new empowered state.',
    accent: '#CFB57E',
    durationMin: 4,
  },
];

// ============ KEY REMINDERS ============

export const UNBLOCKING_REMINDERS: string[] = [
  'Stay in the present moment.',
  'Breathe. Feel. Release.',
  'You are safe, supported, loved.',
  'Trust the process.',
];

// ============ CLOSING STATEMENT ============

export const UNBLOCKING_CLOSING = [
  'I am safe to feel.',
  'I am safe to release.',
  'I am grounded through One.',
  'I am guided through Seven.',
  'I return to love.',
];

// ============ TAGLINE ============

export const UNBLOCKING_TAGLINE =
  'Grounded in 1. Pulled from 7. Aligned in love. Living in freedom.';

/**
 * Total guided practice length in minutes — sum of step durations.
 * Use this in UI to set expectation ("25-minute practice").
 */
export function getProcessDurationMin(): number {
  return UNBLOCKING_STEPS.reduce((sum, s) => sum + s.durationMin, 0);
}
