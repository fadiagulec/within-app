/**
 * MIRROR MODE — The signature perception-inquiry feature.
 *
 * Core philosophy: what we encounter outside often reflects what we carry inside.
 * Healing begins with seeing that clearly.
 *
 * The flow walks users through 6 questions, each building on the last,
 * turning a trigger into a teaching.
 */

export interface MirrorStep {
  step: number;
  title: string;
  prompt: string;
  subPrompt?: string;
  placeholder: string;
  minChars?: number;
}

export const MIRROR_FLOW: MirrorStep[] = [
  {
    step: 1,
    title: 'Name the situation',
    prompt: 'What happened? What is bothering you right now?',
    subPrompt: 'Just the facts. Not your story about it yet.',
    placeholder: 'My partner said... / A stranger at work... / I saw on Instagram...',
    minChars: 10,
  },
  {
    step: 2,
    title: 'Name the feeling',
    prompt: 'What does this bring up in your body?',
    subPrompt: 'Tight chest? Hot face? Collapsed shoulders? Where does it live?',
    placeholder: 'My chest is tight. My jaw is clenched. I feel a drop in my belly...',
    minChars: 10,
  },
  {
    step: 3,
    title: 'Name the story',
    prompt: 'What story are you telling about this?',
    subPrompt: 'What does this mean to you? What are you making it mean about you, about them, about life?',
    placeholder: 'I\'m telling myself that... This means I\'m... They must think I\'m...',
    minChars: 20,
  },
  {
    step: 4,
    title: 'Find the echo',
    prompt: 'Where have you felt this exact feeling before?',
    subPrompt: 'Not the same situation. The same feeling. How far back does it go?',
    placeholder: 'This reminds me of when... I felt this in school / as a child / with my...',
    minChars: 20,
  },
  {
    step: 5,
    title: 'Turn the mirror',
    prompt: 'What if this is showing you something about you — not them?',
    subPrompt: 'The hardest question. The one that heals. What part of you is being reflected back? What unmet need or unhealed wound?',
    placeholder: 'Maybe this is showing me that I... What I actually need is... The younger part of me that...',
    minChars: 20,
  },
  {
    step: 6,
    title: 'Choose your response',
    prompt: 'Knowing what you now see — how do you want to respond?',
    subPrompt: 'Not the reaction from the wound. The response from the self who has just seen clearly.',
    placeholder: 'I will... I choose to... I no longer need to...',
    minChars: 15,
  },
];

/** Reflection summary template — shown after all 6 steps completed */
export const MIRROR_CLOSING = {
  title: 'What you saw today',
  body:
    'You just did something most people never do — you paused instead of reacted, and you looked at yourself instead of the other person.\n\nThis reflection is saved. Come back to it in a week. Notice what has shifted.',
  cta: 'Save to Journal',
};

/** Suggested practice to pair with Mirror Mode */
export interface MirrorPractice {
  chakra: string;
  trigger: string[];  // feelings / themes this practice addresses
  sessionId: string;
  breathId?: string;
}

export const MIRROR_PRACTICES: MirrorPractice[] = [
  {
    chakra: 'root',
    trigger: ['fear', 'unsafe', 'abandoned', 'scarcity', 'panic'],
    sessionId: 'root-release',
    breathId: '04-four-seven-eight',
  },
  {
    chakra: 'sacral',
    trigger: ['guilt', 'shame for wanting', 'selfish', 'too much', 'blamed'],
    sessionId: 'sacral-release',
    breathId: '03-diaphragm-release',
  },
  {
    chakra: 'solar-plexus',
    trigger: ['not enough', 'small', 'imposter', 'unworthy', 'rejected'],
    sessionId: 'solar-plexus-release',
    breathId: '01-fire-breath',
  },
  {
    chakra: 'heart',
    trigger: ['grief', 'heartbreak', 'unloved', 'alone in a crowd', 'betrayed'],
    sessionId: 'heart-release',
    breathId: '07-grounding-breath',
  },
  {
    chakra: 'throat',
    trigger: ['silenced', 'unheard', 'suppressed', 'too much', 'afraid to speak'],
    sessionId: 'throat-release',
    breathId: '11-lion-breath',
  },
  {
    chakra: 'third-eye',
    trigger: ['confused', 'scattered', 'spinning', 'overthinking', 'second-guessing'],
    sessionId: 'third-eye-release',
    breathId: '02-alternate-nostril',
  },
  {
    chakra: 'crown',
    trigger: ['lost', 'meaningless', 'alone', 'disconnected', 'purposeless'],
    sessionId: 'crown-release',
    breathId: '12-coherent-breathing',
  },
];

/**
 * Heuristic: given step 2 feeling text + step 4 echo text,
 * suggest which chakra practice might help most.
 * Pure text matching — MVP logic.
 */
export function suggestPractice(feelingText: string, storyText: string): MirrorPractice | null {
  const combined = (feelingText + ' ' + storyText).toLowerCase();
  for (const p of MIRROR_PRACTICES) {
    for (const t of p.trigger) {
      if (combined.includes(t.toLowerCase())) return p;
    }
  }
  return null;
}
