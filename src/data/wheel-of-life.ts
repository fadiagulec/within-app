/**
 * SOMA - The Wheel of Life
 *
 * The app's entry point and ongoing check-in.
 * Users rate 8 life areas 1-10 → visual wheel reveals their current state
 *   → app maps each low area to the chakra + healing work that addresses it.
 *
 * Core teaching: your life has a shape. Healing gives it symmetry.
 */

import { ChakraId } from './chakra-content';

export type LifeAreaId =
  | 'health'
  | 'career'
  | 'money'
  | 'relationships'
  | 'romance'
  | 'growth'
  | 'environment'
  | 'fun';

export interface LifeArea {
  id: LifeAreaId;
  name: string;
  icon: string;           // emoji or symbol
  color: string;          // hex
  chakra: ChakraId;       // primary chakra mapping
  secondaryChakra?: ChakraId;
  question: string;       // rating question
  subPrompt: string;      // clarifying hint
  whyItMatters: string;   // teaching paragraph
  scoreMeaning: {
    low: string;          // 1-3
    medium: string;       // 4-6
    high: string;         // 7-10
  };
  healingPath: {
    chakra: ChakraId;
    invitation: string;
    startingPractice: string;
  };
}

export const LIFE_AREAS: LifeArea[] = [
  {
    id: 'health',
    name: 'Health & Vitality',
    icon: '🌿',
    color: '#6B8F71',
    chakra: 'root',
    secondaryChakra: 'sacral',
    question: 'How is your body right now?',
    subPrompt: 'Energy, sleep, physical comfort, breath.',
    whyItMatters:
      'The body is the foundation. Without health, every other life area strains to hold itself up. Your vitality is the bedrock of everything else.',
    scoreMeaning: {
      low: 'Your body is running on depletion. This is where to begin.',
      medium: 'There is strength here, but also static. Something wants tending.',
      high: 'You are inhabiting your body. Continue returning here daily.',
    },
    healingPath: {
      chakra: 'root',
      invitation:
        'Vitality lives in the Root — your body\'s sense of safety in being alive. Begin here.',
      startingPractice: 'Connecting to Light → Physical Movement + Grounding practice',
    },
  },
  {
    id: 'career',
    name: 'Work & Purpose',
    icon: '✴',
    color: '#D9B24C',
    chakra: 'solar-plexus',
    secondaryChakra: 'crown',
    question: 'Does your work feel aligned with who you are?',
    subPrompt: 'Not whether it pays well — whether it is yours.',
    whyItMatters:
      'You spend more hours working than doing almost anything else. When work is misaligned with your values, every hour leaks prana. When it is aligned, even hard work restores you.',
    scoreMeaning: {
      low: 'You are performing a role that is not yours. Not yet a crisis — but it will become one.',
      medium: 'Some of this is you. Some of it is what was expected. The question is which is which.',
      high: 'Your work is an expression of you, not an escape from you. Rare. Beautiful.',
    },
    healingPath: {
      chakra: 'solar-plexus',
      invitation:
        'Work alignment lives in the Solar Plexus — your sense of worth and direction. Reclaim the fire.',
      startingPractice: 'Solar Plexus Release session → then Vision Board work',
    },
  },
  {
    id: 'money',
    name: 'Money & Abundance',
    icon: '◉',
    color: '#C9A96E',
    chakra: 'solar-plexus',
    secondaryChakra: 'root',
    question: 'How safe do you feel around money?',
    subPrompt: 'Not just how much you have — how you relate to it.',
    whyItMatters:
      'Money is frozen energy. Your relationship with it reflects your relationship with worth, safety, and receiving. Most money wounds are inherited — not yours, but being paid by you.',
    scoreMeaning: {
      low: 'Money is a source of chronic fear. The wound is old. It is time.',
      medium: 'You are functional with money but not free. There is a belief running.',
      high: 'Money flows without carrying weight. You receive without guilt.',
    },
    healingPath: {
      chakra: 'solar-plexus',
      invitation:
        'Money lives at the intersection of Solar Plexus (worth) and Root (safety). Start with the deeper wound.',
      startingPractice: 'Money Clearing meditation → Solar Plexus Release',
    },
  },
  {
    id: 'relationships',
    name: 'Family & Friendships',
    icon: '◐',
    color: '#6B8F71',
    chakra: 'heart',
    secondaryChakra: 'throat',
    question: 'Who can you actually be yourself with?',
    subPrompt: 'Quality, not quantity. Intimacy, not performance.',
    whyItMatters:
      'Humans are wired for belonging. Without it, no success feels satisfying. With it, even hard seasons become bearable. Your relationships are your nervous system\'s community.',
    scoreMeaning: {
      low: 'You are held by few. The loneliness is real. This is tender work.',
      medium: 'You have your people, but something in you still holds back.',
      high: 'You are known and knowing. Relationships are a source of life force.',
    },
    healingPath: {
      chakra: 'heart',
      invitation:
        'Connection lives in the Heart — your capacity to give and receive without losing yourself.',
      startingPractice: 'Heart Release session → Boundary Setting meditation',
    },
  },
  {
    id: 'romance',
    name: 'Romantic Love',
    icon: '◊',
    color: '#8A7AA8',
    chakra: 'heart',
    secondaryChakra: 'sacral',
    question: 'How do you feel in your intimate life?',
    subPrompt: 'Partnership or singlehood — are you in full relationship with love?',
    whyItMatters:
      'Romantic love is where your deepest patterns play out — attachment wounds, worthiness, capacity to receive. Whether partnered or not, your relationship to romance mirrors your inner relationship to self.',
    scoreMeaning: {
      low: 'Something is closed here. Whether from heartbreak or long absence, the door needs tending.',
      medium: 'Love is present but there is friction. An old wound is getting activated.',
      high: 'Love moves freely. You are not clinging. You are not performing. You are with.',
    },
    healingPath: {
      chakra: 'heart',
      invitation:
        'Intimate love lives at the Heart + Sacral — love plus aliveness. Open both.',
      startingPractice: 'Relationship Magic meditation → Heart Release → Sacral Awaken',
    },
  },
  {
    id: 'growth',
    name: 'Personal Growth',
    icon: '△',
    color: '#3B3564',
    chakra: 'third-eye',
    secondaryChakra: 'crown',
    question: 'Are you becoming the person you want to be?',
    subPrompt: 'Not metrics. Movement.',
    whyItMatters:
      'Stagnation kills more than difficulty does. A person who is growing — even slowly, even imperfectly — is alive in a way a person who is only maintaining cannot be.',
    scoreMeaning: {
      low: 'You have paused. This is not a failure — it is a signal. Growth wants to return.',
      medium: 'You are in motion, but the direction feels uncertain. Clarity is needed.',
      high: 'You are in the becoming. Daily small evolutions. The path is yours.',
    },
    healingPath: {
      chakra: 'third-eye',
      invitation:
        'Growth lives in the Third Eye — your inner clarity about where you are going.',
      startingPractice: 'Third Eye Release → Vision Board Builder',
    },
  },
  {
    id: 'environment',
    name: 'Home & Environment',
    icon: '□',
    color: '#6B1F1F',
    chakra: 'root',
    secondaryChakra: 'heart',
    question: 'Does your space restore you or drain you?',
    subPrompt: 'Your home, your work environment, your digital surroundings.',
    whyItMatters:
      'Your environment is a constant frequency broadcast. Clutter, chaos, and stagnation register in the nervous system as unfinished loops. Order, beauty, and intention broadcast back: you are safe, you are held, you are home.',
    scoreMeaning: {
      low: 'Your environment is working against you. Even small changes will shift your state quickly.',
      medium: 'Your space is livable but not nourishing. There is room to elevate.',
      high: 'Your environment is a collaborator in your healing.',
    },
    healingPath: {
      chakra: 'root',
      invitation:
        'Environment affects the Root — your sense of being held by a place. Tend the space.',
      startingPractice: 'Protecting Your Light → Environment tools + Space clearing',
    },
  },
  {
    id: 'fun',
    name: 'Joy & Play',
    icon: '✶',
    color: '#C2712C',
    chakra: 'sacral',
    secondaryChakra: 'heart',
    question: 'When did you last have pure, uncomplicated fun?',
    subPrompt: 'Play for no reason. Laughter that surprises you.',
    whyItMatters:
      'Joy is not a reward — it is a frequency. Adults who have lost their capacity for play have lost access to their own life force. Reclaiming joy is one of the most radical healing acts there is.',
    scoreMeaning: {
      low: 'You have forgotten how. Not forever — just for now. It comes back quickly.',
      medium: 'You have moments, but joy feels earned, not free. Let it be free.',
      high: 'Play is woven into your days. You remember you are here to enjoy this.',
    },
    healingPath: {
      chakra: 'sacral',
      invitation:
        'Joy lives in the Sacral — your capacity for pleasure without apology. Reclaim it.',
      startingPractice: 'Sacral Awaken session → daily Sacral practice (hip movement + humming)',
    },
  },
];

// ============ WHEEL RESULT SHAPE ============

export interface WheelResult {
  scores: Record<LifeAreaId, number>;     // 1-10 each
  completedAt: number;                     // timestamp
  lowestArea: LifeAreaId;
  highestArea: LifeAreaId;
  average: number;
  imbalanceScore: number;                  // spread between high and low
}

export function calculateWheelResult(
  scores: Record<LifeAreaId, number>
): WheelResult {
  const values = Object.values(scores);
  const average = values.reduce((a, b) => a + b, 0) / values.length;

  let lowest: LifeAreaId = 'health';
  let highest: LifeAreaId = 'health';
  let lowestScore = 11;
  let highestScore = 0;

  for (const [area, score] of Object.entries(scores) as [LifeAreaId, number][]) {
    if (score < lowestScore) {
      lowestScore = score;
      lowest = area;
    }
    if (score > highestScore) {
      highestScore = score;
      highest = area;
    }
  }

  return {
    scores,
    completedAt: Date.now(),
    lowestArea: lowest,
    highestArea: highest,
    average,
    imbalanceScore: highestScore - lowestScore,
  };
}

// ============ INTERPRETATIONS ============

export function interpretAverage(avg: number): { label: string; body: string } {
  if (avg < 4) {
    return {
      label: 'In Struggle',
      body:
        'Your life is asking for attention across many areas. This is not a failure — it is a signal. The work ahead is foundational. Start with the lowest area. One thing at a time.',
    };
  }
  if (avg < 6) {
    return {
      label: 'Functional — Not Flourishing',
      body:
        'You are managing, but not thriving. There is real ground to reclaim here. The good news: small shifts in the right places create large ripples.',
    };
  }
  if (avg < 8) {
    return {
      label: 'Stable with Room to Grow',
      body:
        'Many areas of your life are working. A few need care. This is an excellent place to start going deeper — you have the stability to do real inner work.',
    };
  }
  return {
    label: 'Thriving',
    body:
      'Your life is in strong shape. This is when most people stop doing inner work — and when stagnation begins. Continue to deepen. Elevation has no ceiling.',
  };
}

export function interpretImbalance(spread: number): { label: string; body: string } {
  if (spread < 3) {
    return {
      label: 'Even Wheel',
      body: 'Your life is well-balanced. Even growth is possible from here.',
    };
  }
  if (spread < 5) {
    return {
      label: 'Some Tilt',
      body:
        'A few areas are outpacing others. This creates a slight wobble — fine, but worth correcting.',
    };
  }
  return {
    label: 'Significant Imbalance',
    body:
      'One or two areas are carrying the whole weight while others are collapsed. This is exhausting — even if the strong areas feel good. Tending the weak areas will free up what the strong ones are compensating for.',
  };
}
