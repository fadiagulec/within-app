import { Level } from '@/types';

/**
 * SOMA pricing ladder.
 * App purpose: self-healing + high vibration (NOT certification).
 * Certification removed. 1:1 Coaching (Breathwork + Theta Healing) added at the top.
 */
export const levels: Level[] = [
  {
    id: 0,
    name: 'Foundation',
    title: 'Begin where you are',
    chakra: 'foundation',
    priceUSD: 'free',
    blurb: 'A home base. Daily breath. One free meditation. A gentle door in.',
    included: [
      'Welcome & orientation',
      '4-7-8, Box, Grounding breath',
      'Morning Practice meditation',
      'Emotion journal (unlimited)',
      'Chakra quiz + Burnout assessment',
    ],
    unlocks: ['The feel of a real practice, without paying a cent'],
  },
  {
    id: 1,
    name: 'First Unblock',
    title: 'Release the fear in the body',
    chakra: 'root',
    priceUSD: 9,
    blurb: 'The entry point. One chakra. One feeling. Proof that this works for you.',
    included: [
      'Root Awaken session (15 min)',
      'Root Release session (22 min)',
      'Root Activate session (15 min)',
      'LAM mantra practice',
    ],
    unlocks: ['A felt sense that healing is possible'],
  },
  {
    id: 2,
    name: '21-Day Burnout Recovery',
    title: 'The flagship journey',
    chakra: 'journey' as any,
    priceUSD: 97,
    blurb: 'Three weeks. Twenty-one days. A full nervous-system reset from the ground up.',
    included: [
      'Week 1 — GROUND: 7 days nervous-system reset',
      'Week 2 — RELEASE: 7 days emotional unblock',
      'Week 3 — RISE: 7 days clarity + rebuild',
      'Daily morning practice + evening session',
      '21 guided journaling prompts',
      'Progress tracking + integration actions',
    ],
    unlocks: ['The full chakra map + deeper programs'],
  },
  {
    id: 3,
    name: 'Chakra Deep Dive',
    title: 'One chakra at a time, three sessions each',
    chakra: 'chakra-deep' as any,
    priceUSD: 19,
    blurb: 'Any single chakra. Awaken, Release, Activate. Go deep on what is calling.',
    included: [
      '3 sessions per chakra (Awaken / Release / Activate)',
      'Affirmation practice',
      'Journaling prompts specific to this chakra',
      'Integration rituals',
    ],
    unlocks: ['Mastery of one energy center'],
  },
  {
    id: 4,
    name: 'The Full Chakra Library',
    title: 'All 7 chakras, fully unlocked',
    chakra: 'chakra-all' as any,
    priceUSD: 97,
    blurb: 'Every chakra program. Every unblock session. Save over buying individually.',
    included: [
      'All 21 chakra sessions (7 chakras × 3 each)',
      'All 49 chakra-specific journaling prompts',
      'Full affirmation library',
      'Unified 7-chakra integration session',
    ],
    unlocks: ['Self-guided healing of the full energy body'],
  },
  {
    id: 5,
    name: '90-Day Elevation Program',
    title: 'The complete transformation container',
    chakra: 'elevation' as any,
    priceUSD: 297,
    blurb: 'Everything in one structured 90-day program. For those ready to commit fully.',
    included: [
      'Full 21-Day Burnout Journey',
      'Full Chakra Library',
      'All breathwork + meditation libraries',
      '12 weeks of weekly themes and integrations',
      'Vision Board + Manifestation rituals',
      'Weekly insights + progress reflection',
    ],
    unlocks: ['Deep, sustained change'],
  },
  {
    id: 6,
    name: '1:1 Breathwork Coaching',
    title: 'Work with me directly',
    chakra: 'coaching-breathwork' as any,
    priceUSD: 997,
    blurb: 'Six private sessions of guided breathwork. Deep nervous-system work, just for you.',
    included: [
      '6 × 60-min live sessions (Zoom)',
      'Custom breathwork protocols for your body',
      'Between-session support',
      'Recordings of your sessions',
    ],
    unlocks: ['Personal guidance. Deeper release than self-led practice.'],
  },
  {
    id: 7,
    name: '1:1 Theta Healing',
    title: 'Subconscious rewiring, held space',
    chakra: 'coaching-theta' as any,
    priceUSD: 1497,
    blurb: 'Theta healing sessions. For the deepest limiting-belief work, held one-on-one.',
    included: [
      '6 × 75-min live Theta Healing sessions',
      'Identify + clear inherited beliefs',
      'Installation of new core beliefs',
      'Integration support between sessions',
    ],
    unlocks: ['Shift patterns that self-work alone cannot reach'],
  },
];

/** Subscription — the recurring layer beneath everything */
export const subscriptions = [
  {
    id: 'inner-circle',
    name: 'Inner Circle',
    priceUSDMonth: 19,
    blurb: 'Unlimited access to daily practices + new content monthly.',
    included: [
      'Unlimited breathwork + meditation library',
      'New content added monthly',
      'Journal insights + tracking',
      'Community access',
    ],
  },
  {
    id: 'full-library',
    name: 'Full Library Pass',
    priceUSDMonth: 29,
    blurb: 'Everything. All current content + all future releases.',
    included: [
      'Everything in Inner Circle',
      'All chakra deep-dive programs',
      'All past and future programs',
      'Early access to new features',
    ],
  },
];

export function getLevel(id: number): Level | undefined {
  return levels.find((l) => l.id === id);
}
