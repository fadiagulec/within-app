/**
 * SOMA — The SHIFT Method
 *
 * The 5-step signature methodology.
 * Each step maps to existing app content so users walk a clear arc
 * from stuck → regulated → healed → clear → embodied → transformed.
 *
 * Tagline: Learn it. Feel it. Heal it.
 * Outcome promise: Reset your body. Rebuild your life.
 */

export const BRAND = {
  name: 'SOMA',
  method: 'The SHIFT Method',
  tagline: 'Learn it. Feel it. Heal it.',
  outcomePromise: 'Reset your body. Rebuild your life.',
  onelineDefinition:
    'A system to move you from feeling stuck to becoming clear, aligned, and in control — through the body.',
  corePositioning:
    'You do not need more information. You need a reset.',
  marketingAngles: [
    'You are not lazy. You are dysregulated.',
    'Clarity does not come from thinking more.',
    'Your body holds what your mind cannot solve.',
    'You do not need more information. You need a reset.',
  ],
};

// ============ THE 5 STEPS OF SHIFT ============

export type ShiftStep = 'stabilise' | 'heal' | 'identify' | 'form' | 'transform';

export interface ShiftPhase {
  letter: string;
  id: ShiftStep;
  name: string;
  shortDefinition: string;
  whatItDoes: string;
  outcome: string;
  durationGuidance: string;
  existingContent: {
    category: string;
    items: string[];
  }[];
  entrySignal: string;    // how user knows they are at this step
}

export const SHIFT_STEPS: ShiftPhase[] = [
  {
    letter: 'S',
    id: 'stabilise',
    name: 'Stabilise',
    shortDefinition: 'Regulate the nervous system. Get safe in the body.',
    whatItDoes:
      'Before anything else, the body must feel safe. No amount of inner work holds if the system is stuck in fight-or-flight. Stabilise is the foundation — breath, grounding, nervous-system regulation.',
    outcome: 'Anxiety drops. Control returns. You can breathe again.',
    durationGuidance: 'Days 1-7 · 10-15 min per day',
    existingContent: [
      {
        category: 'Breathwork (Parasympathetic)',
        items: [
          '4-7-8 Breath',
          'Box Breathing',
          'Alternate Nostril (Nadi Shodhana)',
          'Bee Breath (Bhramari)',
          'Ujjayi Grounding',
          'Coherent Breathing (5-5)',
        ],
      },
      {
        category: 'Grounding',
        items: [
          'Earthing practice',
          'Body Scan',
          'Cold Water Reset',
          'Root chakra work (Level 1)',
        ],
      },
    ],
    entrySignal:
      'You feel anxious, overwhelmed, scattered, or activated. Your body is tight. Your thoughts race.',
  },
  {
    letter: 'H',
    id: 'heal',
    name: 'Heal',
    shortDefinition: 'Release the emotional blocks stored in the body.',
    whatItDoes:
      'Once stable, the body can release what it has been holding. Stored fear, guilt, shame, grief, suppression — moved through breath, sound, and witnessing. This is the deep work.',
    outcome: 'Emotional weight lifts. Old patterns loosen. You feel lighter.',
    durationGuidance: 'Weeks 2-4 · 20-30 min sessions',
    existingContent: [
      {
        category: 'Chakra Release Journeys',
        items: [
          'Root → Fear',
          'Sacral → Guilt',
          'Solar Plexus → Shame',
          'Heart → Grief',
          'Throat → Suppression',
          'Third Eye → Doubt',
          'Crown → Separation',
          'Soul → Separation from Soul',
        ],
      },
      {
        category: 'Healing Practices',
        items: [
          'Diaphragm Release with Root Lock',
          'Mirror Mode (perception inquiry)',
          'Untethering Meditation',
          'Inner Child Healing',
          'Forgiveness Ritual',
          'Timeline / 2-Meters-Above work',
        ],
      },
    ],
    entrySignal:
      'You can breathe but something inside still aches. Old patterns keep repeating. You know there is something underneath.',
  },
  {
    letter: 'I',
    id: 'identify',
    name: 'Identify',
    shortDefinition: 'See clearly who you are and where you are going.',
    whatItDoes:
      'With the body regulated and the old emotion moved, clarity emerges. You can finally see what is yours, what you actually want, and who you are becoming. Not more thinking — clearer seeing.',
    outcome: 'Clarity returns. Decisions come easier. Direction forms.',
    durationGuidance: 'Weeks 4-6 · Reflection-driven practices',
    existingContent: [
      {
        category: 'Clarity Tools',
        items: [
          'Wheel of Life (entry assessment)',
          'Values Audit',
          'Vision Board Builder',
          'Third Eye work',
          'Mirror Mode (pattern recognition)',
        ],
      },
      {
        category: 'Self-Knowledge Assessments',
        items: [
          'Limiting Beliefs Inventory',
          'Trigger Map',
          'Money Story Audit',
          'Purpose Clarification',
        ],
      },
    ],
    entrySignal:
      'You are no longer in pain — but not yet sure what comes next. You need direction, not healing.',
  },
  {
    letter: 'F',
    id: 'form',
    name: 'Form',
    shortDefinition: 'Build the daily habits that create a new identity.',
    whatItDoes:
      'Clarity without embodiment fades. Form is where the insight becomes daily life — small, consistent habits that reshape who you are, not through willpower but through practice.',
    outcome: 'Consistency builds. Self-trust compounds. New identity forms.',
    durationGuidance: 'Weeks 6-12 · Daily practices + habit tracking',
    existingContent: [
      {
        category: 'Daily Structure',
        items: [
          'Morning Alignment (daily check-in)',
          'Evening Integration',
          'Gratitude Journal (morning + evening)',
          'Connecting to Light (4 foundations)',
          'Protecting Your Light (daily rituals)',
        ],
      },
      {
        category: 'Habit System',
        items: [
          'Daily breath practice',
          'Weekly pattern review',
          'Streak tracking',
          'Monthly chakra scan',
        ],
      },
    ],
    entrySignal:
      'You know what you want but it is not yet who you are daily. You need structure, not more insight.',
  },
  {
    letter: 'T',
    id: 'transform',
    name: 'Transform',
    shortDefinition: 'Express the new self in the real world.',
    whatItDoes:
      'The final step is the expression. Decisions. Conversations. Actions. The inner work becomes visible — not as performance, but as congruence. You move through the world as the version of yourself you have been becoming.',
    outcome: 'You take action. You show up powerfully. Life reorganizes around the new you.',
    durationGuidance: 'Month 3+ · Ongoing embodiment + real-world expression',
    existingContent: [
      {
        category: 'Expression Tools',
        items: [
          'Alignment Check-in',
          'Boundary Setting practices',
          'Confidence Activation meditation',
          'Throat chakra work (truth-speaking)',
          'SOMA Experiences (retreats for integration)',
        ],
      },
      {
        category: 'Real-World Tracking',
        items: [
          'Weekly reflection (what did I do different)',
          'Monthly progress visualization',
          'Vision board updates',
          'Action challenges',
        ],
      },
    ],
    entrySignal:
      'You feel different inside. Now the world needs to catch up. You are ready to live it, not just practice it.',
  },
];

// ============ NAVIGATION / MENU STRUCTURE ============

export const SOMA_NAVIGATION = [
  {
    id: 'home',
    label: 'Home',
    description: 'Daily state — where are you today?',
    features: ['Daily check-in', 'Today\'s practice', 'Vibration meter', 'Week overview'],
  },
  {
    id: 'reset',
    label: 'Reset',
    description: 'Breathwork library — your immediate state tool.',
    features: ['Calm / Activate / Balance filters', 'Quick-find by feeling', '15 breath practices', 'Safety check-in'],
  },
  {
    id: 'deep-work',
    label: 'Deep Work',
    description: 'Healing journeys — the emotional release layer.',
    features: [
      'Chakra programs (8 centers)',
      '21-Day Burnout Recovery',
      'Mirror Mode',
      'Untethering Meditation',
      'Inner Child + Shadow work',
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    description: 'See your transformation — emotional, mental, physical.',
    features: [
      'Vibration timeline',
      'Chakra evolution',
      'Journal insights',
      'Habit streaks',
      'Monthly reflection',
    ],
  },
  {
    id: 'live',
    label: 'Live',
    description: 'Weekly group breathwork + release sessions.',
    features: [
      'Weekly live sessions',
      'Monthly community ritual',
      'Replay library',
      'Q&A with practitioners',
    ],
  },
  {
    id: 'experiences',
    label: 'Experiences',
    description: 'SOMA retreats — the reset, in person.',
    features: [
      'Signature SOMA retreat',
      '1:1 Breathwork coaching',
      '1:1 Theta Healing',
      'Apply for upcoming cohorts',
    ],
  },
];

// ============ VISUAL BRAND DIRECTION ============

export const BRAND_VISUAL = {
  palette: {
    obsidian: '#0B0B0D',
    bone: '#F3EFE7',
    sand: '#C4B49E',
    deepGreen: '#3A4A3E',
    mutedGold: '#C9A96E',
  },
  avoid: [
    'Bright chakra rainbow palettes',
    'Crystal / healing-stone aesthetic',
    'Spiritual cliché imagery',
    'Soft pastels / "self-help" look',
  ],
  inspiration: 'Apple × Calm × high-performance brand',
  mood: 'Minimal, grounded, premium, quietly powerful',
  typography: {
    headlines: 'Cormorant Garamond (serif, editorial)',
    body: 'Inter (clean, modern)',
    numbers: 'JetBrains Mono (data, clarity)',
  },
};
