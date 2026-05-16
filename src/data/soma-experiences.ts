/**
 * SOMA Experiences — The Retreats
 *
 * The high-ticket flagship offering. In-person identity reset retreats.
 * Not yoga retreat. Not wellness escape. Not spiritual tourism.
 *
 * These are IDENTITY RESET EXPERIENCES — structured, premium, outcome-driven.
 */

export interface SomaExperience {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  priceRange: string;
  location: string;
  intendedFor: string;
  outcomePromise: string;
  structure: {
    phase: string;
    days: string;
    focus: string;
    practices: string[];
  }[];
  inclusions: string[];
  groupSize: string;
  applicationBased: boolean;
  nextCohort: string;        // placeholder — update when real
}

export const SOMA_EXPERIENCES: SomaExperience[] = [
  {
    id: 'soma-reset',
    name: 'SOMA Reset',
    tagline: 'A full reset of your body, mind, and direction.',
    duration: '7 days',
    priceRange: '$3,500 – $5,000 USD',
    location: 'Bali · Ibiza · Dubai Desert (rotating)',
    intendedFor:
      'High-functioning professionals, founders, healers — anyone who feels stuck in their own life despite outward success.',
    outcomePromise:
      'You arrive dysregulated, exhausted, or misaligned. You leave clear, grounded, and reconnected to who you actually are.',
    structure: [
      {
        phase: 'Arrival & Regulation',
        days: 'Days 1-2',
        focus: 'Nervous system reset · detox from stress · arriving fully',
        practices: [
          'Guided arrival ritual',
          'Morning breathwork (coherent + parasympathetic)',
          'Slow meditation intensives',
          'Grounding in nature · barefoot sessions',
          'No screens protocol',
        ],
      },
      {
        phase: 'Deep Emotional Release',
        days: 'Days 3-4',
        focus: 'The inner work · release what has been stored',
        practices: [
          'Extended diaphragm release breathwork',
          'Timeline work (2-meters-above technique)',
          'Chakra deep release (root + sacral + solar plexus)',
          'Private integration sessions',
          'Fire ritual release',
        ],
      },
      {
        phase: 'Clarity & Identity Shift',
        days: 'Days 5-6',
        focus: 'Who are you becoming?',
        practices: [
          'Vision work with witnessing',
          'Heart + throat chakra sessions',
          'Values clarification',
          'Purpose conversations',
          'Silent walking meditations',
        ],
      },
      {
        phase: 'Integration & Forward',
        days: 'Day 7',
        focus: 'Taking the new self home',
        practices: [
          'Morning closing ritual',
          '90-day plan creation',
          'Group witnessing circle',
          'Practitioner 1:1 for personalised integration',
          'Send-off ceremony',
        ],
      },
    ],
    inclusions: [
      'All accommodation (premium villa / resort)',
      'All meals (organic, tailored)',
      'Pre-arrival 1:1 onboarding call',
      'Daily group + individual sessions',
      '2 × private breathwork sessions',
      '90-day post-retreat integration support',
      'Access to SOMA app premium tier for 6 months',
    ],
    groupSize: 'Max 12 participants',
    applicationBased: true,
    nextCohort: 'TBA · apply via SOMA app',
  },
  {
    id: 'soma-pulse',
    name: 'SOMA Pulse',
    tagline: 'A 3-day intensive for the time-constrained.',
    duration: '3 days',
    priceRange: '$1,500 – $2,500 USD',
    location: 'Dubai · London · select cities',
    intendedFor:
      'Executives and founders who cannot take a full week but need a deep reset.',
    outcomePromise:
      'Compressed, intensive. You leave regulated, clear on one big decision, and equipped for 30 days of change.',
    structure: [
      {
        phase: 'Arrival & Reset',
        days: 'Day 1',
        focus: 'Drop in · regulate',
        practices: [
          'Group breathwork (extended)',
          'Body scan + grounding',
          'Dinner in silence',
        ],
      },
      {
        phase: 'Deep Work',
        days: 'Day 2',
        focus: 'Release + clarity',
        practices: [
          'Morning activation breath',
          'Afternoon release session',
          'Evening integration + journaling',
          '1:1 coaching slot',
        ],
      },
      {
        phase: 'Integration',
        days: 'Day 3',
        focus: 'Commitment + plan',
        practices: [
          'Vision + priorities work',
          '90-day plan',
          'Closing ritual',
        ],
      },
    ],
    inclusions: [
      'Venue + all meals',
      '1 × private 1:1 session',
      '30-day post-retreat check-in',
      'App premium tier for 3 months',
    ],
    groupSize: 'Max 8 participants',
    applicationBased: true,
    nextCohort: 'TBA · apply via SOMA app',
  },
  {
    id: 'soma-private',
    name: 'SOMA Private',
    tagline: 'A private retreat — designed for one or a couple.',
    duration: 'Custom (3-7 days)',
    priceRange: '$10,000 – $25,000+ USD',
    location: 'Client-chosen destination',
    intendedFor:
      'Individuals or couples ready for a fully bespoke reset, with complete privacy and personalised design.',
    outcomePromise:
      'Every moment designed around your specific blocks, context, and goals. One-on-one proximity to practitioners throughout.',
    structure: [
      {
        phase: 'Designed For You',
        days: 'All days',
        focus: 'Entirely customised based on pre-retreat intake',
        practices: [
          'Private daily breathwork sessions',
          'Dedicated 1:1 coaching throughout',
          'Custom programming per day',
          'Optional partner integration work',
        ],
      },
    ],
    inclusions: [
      'Fully bespoke — everything custom',
      'Dedicated practitioner for duration',
      'Travel logistics coordinated',
      '12-month post-retreat support',
    ],
    groupSize: 'Max 2 participants',
    applicationBased: true,
    nextCohort: 'Booking by application',
  },
];

export const EXPERIENCES_LANDING = {
  hero: {
    headline: 'SOMA Experiences',
    subheadline: 'The reset, in person.',
    body:
      'Some transformations need more than an app. SOMA Experiences are in-person intensives designed to do in days what self-led practice takes months to achieve. A small group, a held container, and a deliberately designed arc — arrival, release, clarity, integration.',
  },
  differentiators: [
    {
      title: 'Not a wellness retreat',
      body:
        'No yoga flows and juice cleanses. This is structured nervous-system and emotional release work — built for results, not relaxation.',
    },
    {
      title: 'Identity reset, not holiday',
      body:
        'You arrive as one version of yourself. You leave as another. The structure ensures it — not promises.',
    },
    {
      title: 'Small containers, high proximity',
      body:
        'Never more than 12 people. Sometimes 2. The intensity of the work requires closeness — practitioners know every participant by name, body, and story.',
    },
    {
      title: 'Integration built in',
      body:
        'You do not leave and return to the same life. Pre-retreat prep, in-retreat design, and 30-90 days of post-retreat integration ensure the shift holds.',
    },
  ],
  applicationFlow: [
    'Apply through the SOMA app',
    'Complete a pre-retreat intake (30 min)',
    'Optional 20-minute discovery call',
    'Invitation confirmed based on fit',
    'Pre-retreat prep program begins (2 weeks before)',
  ],
};
