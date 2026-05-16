/**
 * SOMA — Chakra States Cheat Sheet
 *
 * The three-state diagnostic per energy centre:
 *   • BALANCED — what it looks/feels like when this centre is open
 *   • UNDERACTIVE — collapsed, depleted, blocked-inward expression
 *   • OVERACTIVE — over-compensated, defended, blocked-outward expression
 *
 * Plus the CORE EMOTION — the signature shadow feeling each chakra
 * is asking you to meet.
 *
 * This is a diagnostic teaching tool used in the Chakra Hub Learn tab
 * and in the Wheel of Life result interpretation.
 */

import type { ChakraId } from './chakra-content';

export interface ChakraStates {
  id: ChakraId;
  name: string;
  domain: string;       // "Safety / Survival" / "Power / Identity" etc.
  location: string;     // body location
  coreEmotion: string;  // single word — the signature shadow

  balanced: string[];
  underactive: string[];
  overactive: string[];

  // Diagnostic helper — short prompt for self-check
  diagnosticPrompt: string;
}

export const CHAKRA_STATES: Record<ChakraId, ChakraStates> = {
  root: {
    id: 'root',
    name: 'Root',
    domain: 'Safety / Survival',
    location: 'Base of the spine',
    coreEmotion: 'Fear',
    balanced: ['Safe', 'Grounded', 'Secure', 'Stable'],
    underactive: ['Fear', 'Anxiety', 'Insecurity', 'Survival stress'],
    overactive: ['Control', 'Rigidity', 'Greed', 'Fear of loss'],
    diagnosticPrompt:
      'Notice your hips and lower belly. Tight and bracing? Underactive. Gripping outcomes and resources? Overactive. Settled, weight in your seat? Balanced.',
  },
  sacral: {
    id: 'sacral',
    name: 'Sacral',
    domain: 'Emotions / Pleasure',
    location: 'Lower abdomen',
    coreEmotion: 'Guilt',
    balanced: ['Flowing', 'Creative', 'Emotionally open', 'Connected'],
    underactive: [
      'Numbness',
      'Lack of desire',
      'Disconnection',
      'Low creativity',
    ],
    overactive: [
      'Emotional overwhelm',
      'Dependency',
      'Overindulgence',
      'Drama',
    ],
    diagnosticPrompt:
      'Check your lower belly and pleasure. Numb or shut down? Underactive. Emotionally flooding, addicted to intensity? Overactive. Fluid, alive, can hold feeling without drowning? Balanced.',
  },
  'solar-plexus': {
    id: 'solar-plexus',
    name: 'Solar Plexus',
    domain: 'Power / Identity',
    location: 'Upper abdomen',
    coreEmotion: 'Shame',
    balanced: ['Confident', 'Empowered', 'Decisive'],
    underactive: ['Low self-worth', 'Shame', 'Powerlessness'],
    overactive: ['Ego', 'Dominance', 'Aggression'],
    diagnosticPrompt:
      'Notice the space below your ribs. Collapsed, apologetic, doubting? Underactive. Pushing, dominating, having to be right? Overactive. Quiet authority that does not need to prove anything? Balanced.',
  },
  heart: {
    id: 'heart',
    name: 'Heart',
    domain: 'Love / Connection',
    location: 'Centre of the chest',
    coreEmotion: 'Grief',
    balanced: ['Love', 'Compassion', 'Peace', 'Forgiveness'],
    underactive: ['Closed off', 'Cold', 'Fear of intimacy'],
    overactive: ['Over-giving', 'Lack of boundaries'],
    diagnosticPrompt:
      'Place a hand on your chest. Walls up, breath shallow? Underactive. Pouring out for everyone but yourself? Overactive. Open, with boundaries, can love and be loved? Balanced.',
  },
  throat: {
    id: 'throat',
    name: 'Throat',
    domain: 'Expression / Truth',
    location: 'Throat',
    coreEmotion: 'Suppressed truth',
    balanced: ['Honest', 'Expressive', 'Clear communication'],
    underactive: ['Suppressed voice', 'Fear of speaking'],
    overactive: ['Talking too much', 'Not listening'],
    diagnosticPrompt:
      'Tune in to your throat and jaw. Tight, silenced, swallowing what you mean? Underactive. Talking over others, not listening? Overactive. Saying what is true, with care, and pausing for theirs? Balanced.',
  },
  'third-eye': {
    id: 'third-eye',
    name: 'Third Eye',
    domain: 'Intuition / Awareness',
    location: 'Between the eyebrows',
    coreEmotion: 'Doubt',
    balanced: ['Clear', 'Intuitive', 'Insightful'],
    underactive: ['Confusion', 'Lack of direction'],
    overactive: ['Overthinking', 'Illusion'],
    diagnosticPrompt:
      'Notice the space behind your eyes. Foggy, scattered, no signal? Underactive. Spinning loops, lost in fantasy or analysis? Overactive. Quiet mind, clear knowing, signal beneath the noise? Balanced.',
  },
  crown: {
    id: 'crown',
    name: 'Crown',
    domain: 'Connection / Purpose',
    location: 'Top of the head',
    coreEmotion: 'Separation',
    balanced: ['Connected', 'Peaceful', 'Trust in life'],
    underactive: ['Disconnection', 'Meaninglessness'],
    overactive: ['Spiritual bypassing', 'Disassociation'],
    diagnosticPrompt:
      'Sense the top of your head and your overall state. Cut off, lost, life feels random? Underactive. Floating, escaping the body, "all love and light" while life burns? Overactive. Held by something larger, present, trusting? Balanced.',
  },
};

// ============ AT-A-GLANCE TABLE ============

export const CHAKRA_CORE_EMOTIONS: { id: ChakraId; chakra: string; coreEmotion: string }[] = [
  { id: 'root', chakra: 'Root', coreEmotion: 'Fear' },
  { id: 'sacral', chakra: 'Sacral', coreEmotion: 'Guilt' },
  { id: 'solar-plexus', chakra: 'Solar Plexus', coreEmotion: 'Shame' },
  { id: 'heart', chakra: 'Heart', coreEmotion: 'Grief' },
  { id: 'throat', chakra: 'Throat', coreEmotion: 'Suppressed truth' },
  { id: 'third-eye', chakra: 'Third Eye', coreEmotion: 'Doubt' },
  { id: 'crown', chakra: 'Crown', coreEmotion: 'Separation' },
];

// ============ HELPER ============

export function getStates(id: ChakraId): ChakraStates {
  return CHAKRA_STATES[id];
}

/** Returns the label for a chakra's current state given a 1-10 wheel score. */
export function inferStateFromScore(score: number): 'underactive' | 'balanced' | 'overactive' | 'unknown' {
  // Note: Wheel of Life can only detect underactive (low score) vs balanced (high).
  // Overactive needs a separate signal (e.g. self-rating on the diagnostic prompt).
  if (score >= 7) return 'balanced';
  if (score <= 4) return 'underactive';
  return 'unknown';
}
