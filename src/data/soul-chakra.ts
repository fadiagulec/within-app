/**
 * SOMA - The Soul (8th Energy Center)
 *
 * Governs time, presence, soul connection, and the dissolution of
 * linear identity. Sits above the crown — the bridge between
 * embodied self and the eternal.
 *
 * Traditional attributes (widely taught across traditions, not proprietary):
 *   - Known as the Soul Star, Transpersonal Chakra, or simply "The Soul"
 *   - Location: 6-12 inches above the crown of the head
 *   - Color: White / iridescent / clear light
 *   - Element: Pure light · Akasha · beyond the five
 *   - Sound: AUM / silent resonance
 *   - Governs: Soul purpose, timelessness, presence, karmic thread
 *
 * All written content below is original to SOMA.
 */

export interface SoulChakraContent {
  id: 'soul';
  name: string;
  number: number;
  color: string;
  colorName: string;
  mantra: string;
  element: string;
  location: string;
  locationDetail: string;
  lifeArea: string;
  sense: string;
  shadowFeeling: string;

  simpleDefinition: string;
  whatItGoverns: string;
  scienceNote: string;
  shadowDescription: string;

  signsOfBalance: string[];
  signsOfImbalance: string[];

  affirmations: string[];

  physicalBlockages: string[];
  understandingTheShadow: string[];
  unblockingSteps: string[];
  alignedDescription: string;
  alignedSigns: string[];

  healingInvitation: string;
}

export const SOUL_CHAKRA: SoulChakraContent = {
  id: 'soul',
  name: 'The Soul',
  number: 8,
  color: '#F4F0E6',      // iridescent / near-white with warm undertone
  colorName: 'Iridescent White · Clear Light',
  mantra: 'AUM (or silent resonance)',
  element: 'Pure Light · Beyond the five',
  location: 'Above the crown',
  locationDetail: 'Approximately 6-12 inches above the top of the head',
  lifeArea: 'Soul Purpose · Time · Presence · Eternal Self',
  sense: 'Pure knowing · beyond sensing',
  shadowFeeling: 'Separation from Soul (living outside of time)',

  simpleDefinition:
    'The Soul is the part of you that was never born and will never die — the eternal witness underneath every passing thought, feeling, and moment.',

  whatItGoverns:
    'Your Soul chakra governs the relationship between your embodied self and the eternal self that animates you. It is the seat of soul purpose — not what you do for a living, but the deeper "why" you came here. It is where linear time dissolves into pure presence. When this center is open, you feel held by your own larger consciousness. When it is closed, you feel trapped in the story of who you think you are, racing against time, disconnected from the deeper thread of your life.',

  scienceNote:
    'Experientially, moments of "soul awareness" correspond to states modern neuroscience calls "non-dual" or "ego-dissolution" — temporary quieting of the default mode network that generates the sense of a separate, time-bound self. These states have been linked to accelerated healing, deep insight, and lasting shifts in wellbeing.',

  shadowDescription:
    'When disconnected from the Soul, you live almost entirely in time. Racing toward future outcomes. Dragging past regret. Measuring your life in productivity. You feel like a self that must prove itself, earn itself, defend itself. The exhaustion is not from doing too much — it is from having forgotten that you are held by something that does not need to do anything.',

  signsOfBalance: [
    'Moments of timeless presence come easily',
    'You feel connected to a larger thread or purpose',
    'You trust the unfolding — even without knowing the outcome',
    'Decisions arise from a deeper place than the calculating mind',
    'You can rest in being, not only doing',
  ],

  signsOfImbalance: [
    'Chronic feeling of running out of time',
    'Life feels like a performance you are always behind on',
    'Difficulty being still — rest feels like failure',
    'Disconnected from any sense of why you are here',
    'A deep, hard-to-name loneliness that nothing external fills',
  ],

  affirmations: [
    'I am not only my body. I am not only my mind. I am what watches both.',
    'I was never born. I will never die. I am simply passing through this form.',
    'There is nowhere I need to be. I am already where I belong.',
    'My soul chose this life. I am exactly where I am meant to be.',
    'Time is not my master. Presence is my home.',
    'I am held by a larger consciousness that cannot be earned or lost.',
    'I remember — I am the eternal, having a temporary moment as this self.',
  ],

  physicalBlockages: [
    'Chronic time anxiety — hurrying even when nothing requires it',
    'Insomnia rooted in overthinking the past or future',
    'Exhaustion despite no clear cause',
    'Nervous-system dysregulation that no single practice seems to settle',
    'Feeling physically "off-center" without a clear origin',
  ],

  understandingTheShadow: [
    'The shadow of the Soul is not a single emotion — it is a state. A state of being trapped inside the character you are playing, without remembering you are also the actor.',
    'Most modern suffering lives here. Not from big trauma alone, but from the slow accumulation of forgetting that you are something larger than this day, this week, this problem.',
    'The soul does not need healing — it is already whole. The work is not to fix the soul. The work is to clear what obscures your access to it.',
  ],

  unblockingSteps: [
    'Slow the breath until the sense of urgency dissolves. There is no hurry here.',
    'Place attention above the crown. Feel the space there — not as a thing, but as awareness.',
    'Ask: "What would I feel right now if I had no place to be and no outcome to earn?"',
    'Let the identities drop — "mother," "worker," "patient," "partner." What remains?',
    'Breathe into the remaining presence. Let it expand. Do not try to describe it.',
    'Install the remembering: "I am not only this. I am what was here before this."',
    'Tone AUM slowly — or rest in pure silence, listening to the quiet beneath the mantra.',
  ],

  alignedDescription:
    'When the Soul center is open, life stops feeling like a race. You move through days with a quiet knowing that you are not only your circumstances. Decisions align with a deeper thread. Presence becomes your default state, not an achievement. Mortality stops being terrifying — because you have felt, directly, that something in you is untouched by it.',

  alignedSigns: [
    'You can be fully in a moment, without commenting on it',
    'Time slows — not in stress, but in presence',
    'Purpose becomes clear without forcing',
    'You feel companioned by your own larger self',
    'Fear of death loosens its grip',
  ],

  healingInvitation:
    'We do not heal the Soul. We remember it. The practice is not to do more — it is to let the doing soften enough for the deeper presence to be felt again. This center opens not through effort, but through stillness long enough to let what was always here reveal itself.',
};

// ============ SOUL POSITION ON BODY SILHOUETTE ============

export const SOUL_BODY_POSITION = { x: 50, y: -2 };  // above the head on SVG
