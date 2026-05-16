/**
 * Within — Energy Hygiene.
 *
 * The founder's daily hygiene framework. Where the 7-step Quantum
 * Unblocking process (Rooted Through 1, Pulled Through 7) HEALS the
 * past, this Energy Hygiene 7-step CLEANS the present — every day.
 *
 * Tagline: "Protect Your Energy · Clear Your Field · Return to Alignment."
 *
 * Anchored to the same three centres as the Quantum Process:
 *   1. Rooted through the Earth (Root)
 *   7. Lifted through the Crown (Crown)
 *   Held in the Heart
 *
 * Plus: Daily Reminder, Key Reminders, Closing Declaration. All original
 * content in the Within voice.
 */

export interface HygieneStep {
  number: number;
  title: string;
  /** Short instructions the user does at this step. */
  actions: string[];
  /** Why this step matters. */
  purpose: string;
  /** Color accent (matches the chakra system roughly). */
  accent: string;
}

export const ENERGY_HYGIENE_OVERVIEW = {
  title: 'Energy Hygiene',
  tagline: 'Protect Your Energy · Clear Your Field · Return to Alignment',
  intent:
    'Your energy field is constantly interacting with people, environments, emotions, technology, and experiences. Energy hygiene is the daily practice of cleansing, grounding, protecting, and restoring your nervous system, mind, body, and energetic state.',
};

export const ENERGY_HYGIENE_STEPS: HygieneStep[] = [
  {
    number: 1,
    title: 'Ground into the Earth',
    actions: [
      'Walk barefoot on natural ground',
      'Slow the breath',
      'Visualise roots extending into the Earth',
      'Return to the present moment',
    ],
    purpose: 'Creates safety, nervous-system regulation, and energetic stability.',
    accent: '#6B1F1F',
  },
  {
    number: 2,
    title: 'Clear emotional residue',
    actions: [
      'Feel emotions without suppression',
      'Journal or release through breathwork',
      'Observe without judgement',
      'Let energy move through the body',
    ],
    purpose: 'Prevents emotional accumulation and energetic heaviness.',
    accent: '#3D9DC4',
  },
  {
    number: 3,
    title: 'Protect your field',
    actions: [
      'Be mindful of environments and conversations',
      'Limit exposure to draining energy',
      'Set loving boundaries',
      'Disconnect from unnecessary noise',
    ],
    purpose: 'Maintains emotional clarity and energetic integrity.',
    accent: '#9B5BA1',
  },
  {
    number: 4,
    title: 'Cleanse your space',
    actions: [
      'Declutter your environment',
      'Open windows for fresh air',
      'Use calming music, nature, or silence',
      'Keep your living space clean and intentional',
    ],
    purpose: 'A clear space supports a clear mind and elevated energy.',
    accent: '#E07A2C',
  },
  {
    number: 5,
    title: 'Nourish your body',
    actions: [
      'Hydrate consistently',
      'Prioritise rest and sleep',
      'Eat nourishing foods',
      'Move your body daily',
    ],
    purpose: 'Supports vitality, emotional balance, and energetic flow.',
    accent: '#3F8A5F',
  },
  {
    number: 6,
    title: 'Return to love',
    actions: [
      'Practice gratitude',
      'Speak kindly to yourself',
      'Choose compassion over judgement',
      'Ask: "How would love respond?"',
    ],
    purpose: 'Shifts your frequency from fear into alignment and coherence.',
    accent: '#E8B83E',
  },
  {
    number: 7,
    title: 'Reset and reconnect',
    actions: [
      'Breathe deeply',
      'Meditate or sit in stillness',
      'Disconnect from overstimulation',
      'Reconnect to your intention and truth',
    ],
    purpose: 'Restores inner peace, clarity, and connection to self.',
    accent: '#5645A6',
  },
];

export const ENERGY_HYGIENE_ANCHOR = [
  { label: 'Rooted through the Earth', accent: '#B33B3B' },
  { label: 'Lifted through the Crown', accent: '#9B5BA1' },
  { label: 'Anchored in the Heart', accent: '#3F8A5F' },
];

export const ENERGY_HYGIENE_DAILY_REMINDER =
  'Your nervous system remembers what you repeatedly practice. Protecting your energy is not avoidance — it is self-responsibility.';

export const ENERGY_HYGIENE_KEY_REMINDERS: string[] = [
  'You are not responsible for other people\'s energy.',
  'Boundaries are acts of self-love.',
  'You can love others deeply and still protect your energy.',
  'Your energy is your greatest asset.',
];

export const ENERGY_HYGIENE_CLOSING: string[] = [
  'I clear what no longer serves me.',
  'I protect my peace and energy.',
  'I am grounded, present, and aligned.',
  'I return to love.',
];

export const ENERGY_HYGIENE_FOOTER =
  'Clear your energy. Protect your peace. Live in alignment.';

/** Total duration of the 7-step practice if done in sequence. */
export function getHygieneDurationMin(): number {
  // ~2-3 min per step done lightly; full practice 18-20 min if done fully
  return 18;
}
