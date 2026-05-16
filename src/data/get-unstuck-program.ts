/**
 * SOMA — GET UNSTUCK
 *
 * The signature 14-day flagship program.
 * Takes someone from "stuck" → "regulated + clear" in the fastest,
 * most tangible way. Built on the SHIFT Method arc.
 *
 * Promise: By the end, you feel calmer, clearer, and back in control.
 */

export interface UnstuckDay {
  day: number;
  phase: 'stabilise' | 'release' | 'clarity' | 'rebuild';
  phaseLabel: string;
  title: string;
  theme: string;
  keyMessage: string;
  durationMin: number;
  session: {
    arrival: string;
    breathwork: {
      reference: string;       // maps to breathwork library ID
      durationMin: number;
      intent: string;
    };
    guidedPrompt: string;
    journalPrompt: string;
    closingAnchor: string;
  };
  outcome: string;
}

export const GET_UNSTUCK_PROGRAM = {
  name: 'Get Unstuck',
  subtitle: 'A 14-day SOMA reset',
  positioning:
    'A 14-day guided reset to regulate your body, release internal pressure, and regain clarity.',
  coreTeaching: 'You are not broken. You are dysregulated.',
  corePromise: [
    'Feel calmer — not overwhelmed',
    'Reduce emotional noise',
    'Regain clarity on what you want',
    'Feel back in control',
  ],
  duration: '14 days',
  dailyTime: '10-20 minutes',
  framework: 'SHIFT Method · arc through Stabilise → Heal → Identify → Form',
  priceUSD: 47,   // entry tier — accessible price point for flagship hook
};

// ============ THE 14 DAYS ============

export const UNSTUCK_DAYS: UnstuckDay[] = [
  // PHASE 1 — STABILISE (Days 1-3)
  {
    day: 1,
    phase: 'stabilise',
    phaseLabel: 'STABILISE',
    title: 'Arrive',
    theme: 'Stop the internal chaos',
    keyMessage: 'You are not broken. You are dysregulated.',
    durationMin: 12,
    session: {
      arrival: 'Close your eyes. Notice you are here. Nothing to fix.',
      breathwork: {
        reference: 'box-breathing',
        durationMin: 7,
        intent: 'Settle the nervous system. Equal, steady, unhurried.',
      },
      guidedPrompt: 'What am I feeling right now — in the body, not the mind?',
      journalPrompt: 'Where in my body do I feel stuck? What does "stuck" actually feel like?',
      closingAnchor: 'The body is safe in this moment.',
    },
    outcome: 'Awareness returns. The first exhale lands.',
  },
  {
    day: 2,
    phase: 'stabilise',
    phaseLabel: 'STABILISE',
    title: 'Slow Down',
    theme: 'Regulation before everything else',
    keyMessage: 'You cannot think your way out of a dysregulated body.',
    durationMin: 12,
    session: {
      arrival: 'Notice your shoulders. Let them drop.',
      breathwork: {
        reference: 'four-seven-eight',
        durationMin: 8,
        intent: 'Lengthen the exhale. Signal safety.',
      },
      guidedPrompt: 'What have I been trying to solve with my mind that only breath can reach?',
      journalPrompt: 'Three places in my body that feel tight today.',
      closingAnchor: 'Regulation is a skill. I am learning it.',
    },
    outcome: 'Heart rate drops. Internal noise quiets.',
  },
  {
    day: 3,
    phase: 'stabilise',
    phaseLabel: 'STABILISE',
    title: 'Ground',
    theme: 'Find the floor of you',
    keyMessage: 'The ground has always been there. You just forgot to stand on it.',
    durationMin: 13,
    session: {
      arrival: 'Feet on the floor. Weight into the chair.',
      breathwork: {
        reference: 'alternate-nostril',
        durationMin: 8,
        intent: 'Balance the two sides of the nervous system.',
      },
      guidedPrompt: 'What does "safe" feel like in the body? Where do you feel it first?',
      journalPrompt: 'What am I willing to stop carrying, even for today?',
      closingAnchor: 'I am held by something steadier than my thoughts.',
    },
    outcome: 'Grounding established. Base regulation complete.',
  },

  // PHASE 2 — RELEASE (Days 4-7)
  {
    day: 4,
    phase: 'release',
    phaseLabel: 'RELEASE',
    title: 'Overwhelm',
    theme: 'Meet what is asking for attention',
    keyMessage: 'Overwhelm is not weakness. It is full input with no space to process.',
    durationMin: 15,
    session: {
      arrival: 'Name, silently, three things on your mental list right now.',
      breathwork: {
        reference: 'bee-breath',
        durationMin: 10,
        intent: 'Humming drops the mental volume.',
      },
      guidedPrompt: 'If I could put down one thing right now — what would it be?',
      journalPrompt: 'What does my body do when I am overwhelmed? How do I know?',
      closingAnchor: 'I am allowed to not carry everything at once.',
    },
    outcome: 'Mental load visibly lighter. The first real release.',
  },
  {
    day: 5,
    phase: 'release',
    phaseLabel: 'RELEASE',
    title: 'Fear',
    theme: 'Turn toward what you have been avoiding',
    keyMessage: 'Fear shrinks when it is witnessed, not when it is fought.',
    durationMin: 17,
    session: {
      arrival: 'Notice: what are you afraid of that you have not named today?',
      breathwork: {
        reference: 'coherent-breathing',
        durationMin: 10,
        intent: 'Resonant breathing to safely stay with difficult feeling.',
      },
      guidedPrompt: 'If this fear could speak, what would it say it is protecting?',
      journalPrompt: 'One fear I am tired of carrying. What would life look like without it?',
      closingAnchor: 'Fear is information, not instruction.',
    },
    outcome: 'Root-level release. Fear loosens its grip.',
  },
  {
    day: 6,
    phase: 'release',
    phaseLabel: 'RELEASE',
    title: 'Control',
    theme: 'What you are gripping is gripping you back',
    keyMessage: 'The tighter the grip, the more energy you leak.',
    durationMin: 15,
    session: {
      arrival: 'Open your hands. Notice what you are holding in them.',
      breathwork: {
        reference: 'diaphragm-release-root-lock',
        durationMin: 12,
        intent: 'Connected breath to move what has been held.',
      },
      guidedPrompt: 'What outcome am I gripping that I could trust more?',
      journalPrompt: 'Where am I trying to control what is not mine to control?',
      closingAnchor: 'I can hold my life without strangling it.',
    },
    outcome: 'Control pattern softens. Space opens.',
  },
  {
    day: 7,
    phase: 'release',
    phaseLabel: 'RELEASE',
    title: 'Integration',
    theme: 'Let the first week land',
    keyMessage: 'The body integrates what the mind cannot keep track of.',
    durationMin: 20,
    session: {
      arrival: 'Seven days in. What is different? Even slightly.',
      breathwork: {
        reference: 'ujjayi-grounding',
        durationMin: 12,
        intent: 'Ocean breath. Presence. Settling.',
      },
      guidedPrompt: 'What emotion has moved this week that was stuck before?',
      journalPrompt: 'The shift I have felt most clearly. Name it specifically.',
      closingAnchor: 'The release is real, even if I cannot prove it yet.',
    },
    outcome: 'First major integration moment. Halfway seen.',
  },

  // PHASE 3 — CLARITY (Days 8-11)
  {
    day: 8,
    phase: 'clarity',
    phaseLabel: 'CLARITY',
    title: 'The Noise Beneath',
    theme: 'Strip away what is not yours',
    keyMessage: 'Most of what you think you want came from somewhere else.',
    durationMin: 15,
    session: {
      arrival: 'Close your eyes. Whose voice do you hear first?',
      breathwork: {
        reference: 'alternate-nostril',
        durationMin: 8,
        intent: 'Clear the channel. Let the signal emerge.',
      },
      guidedPrompt: 'Which of my current "wants" are mine, and which were inherited?',
      journalPrompt: 'One belief that has been running me without my permission.',
      closingAnchor: 'I can tell the difference between my voice and theirs.',
    },
    outcome: 'Mental noise separates from signal.',
  },
  {
    day: 9,
    phase: 'clarity',
    phaseLabel: 'CLARITY',
    title: 'What is Draining You',
    theme: 'Name the leaks',
    keyMessage: 'Energy does not go missing. It goes somewhere. Follow it.',
    durationMin: 16,
    session: {
      arrival: 'Scan the week. Where did you feel most drained?',
      breathwork: {
        reference: 'box-breathing',
        durationMin: 8,
        intent: 'Focus. See clearly. No judgment.',
      },
      guidedPrompt: 'If I had to stop doing one thing this month, what would free the most energy?',
      journalPrompt: 'Three things I am doing that are no longer mine to do.',
      closingAnchor: 'My energy is mine to direct.',
    },
    outcome: 'Energy leaks identified. Boundaries begin forming.',
  },
  {
    day: 10,
    phase: 'clarity',
    phaseLabel: 'CLARITY',
    title: 'What Matters Now',
    theme: 'Not the full vision — just the next true thing',
    keyMessage: 'You do not need the 5-year plan. You need the next honest step.',
    durationMin: 18,
    session: {
      arrival: 'Not what you should want. What do you actually want, today?',
      breathwork: {
        reference: 'three-part-breath',
        durationMin: 10,
        intent: 'Full-body breath. Whole-person presence.',
      },
      guidedPrompt: 'What would I do if I knew I could not fail — and it did not have to be big?',
      journalPrompt: 'One thing that keeps quietly showing up when I stop distracting myself.',
      closingAnchor: 'Clarity comes in the smallest true answer.',
    },
    outcome: 'Direction forms. Not certainty — honesty.',
  },
  {
    day: 11,
    phase: 'clarity',
    phaseLabel: 'CLARITY',
    title: 'Vision Seed',
    theme: 'Plant the first image of the next version of you',
    keyMessage: 'Do not manifest. Remember.',
    durationMin: 20,
    session: {
      arrival: 'Close your eyes. Who is the version of you that is not stuck?',
      breathwork: {
        reference: 'aham-prakasha',
        durationMin: 12,
        intent: 'I am light. Anchor the frequency.',
      },
      guidedPrompt: 'Describe the version of you who solved this — in present tense.',
      journalPrompt: 'One sentence: "The version of me who is no longer stuck is..."',
      closingAnchor: 'This version of me is not a fantasy. It is memory.',
    },
    outcome: 'Vision anchors in the body, not just the mind.',
  },

  // PHASE 4 — REBUILD (Days 12-14)
  {
    day: 12,
    phase: 'rebuild',
    phaseLabel: 'REBUILD',
    title: 'Who Am I Becoming',
    theme: 'Identity shift in the body',
    keyMessage: 'You do not reach the new self. You embody them.',
    durationMin: 18,
    session: {
      arrival: 'Stand up for 30 seconds. Breathe like the new version of you.',
      breathwork: {
        reference: 'activation-breath',
        durationMin: 10,
        intent: 'Activate the body for the person you are becoming.',
      },
      guidedPrompt: 'What is one thing the new version of me does daily that I do not yet?',
      journalPrompt: 'Three qualities of the me who is no longer stuck — and how they show up in action.',
      closingAnchor: 'I am already becoming. The proof is in the practice.',
    },
    outcome: 'Identity shift begins embodying.',
  },
  {
    day: 13,
    phase: 'rebuild',
    phaseLabel: 'REBUILD',
    title: 'One True Action',
    theme: 'Not a hundred changes. One real one.',
    keyMessage: 'Identity compounds through repeated small honest action.',
    durationMin: 15,
    session: {
      arrival: 'What would the new version of you do today — that you could actually do?',
      breathwork: {
        reference: 'box-breathing',
        durationMin: 7,
        intent: 'Focus. Commitment. Clean action.',
      },
      guidedPrompt: 'What is the ONE thing I will do today that the stuck version would not?',
      journalPrompt: 'The action I will commit to daily for the next 30 days. Small. Specific.',
      closingAnchor: 'Small and consistent beats ambitious and abandoned.',
    },
    outcome: 'A single daily commitment locks in.',
  },
  {
    day: 14,
    phase: 'rebuild',
    phaseLabel: 'REBUILD',
    title: 'Integration & Forward',
    theme: 'You are not stuck. You are moving.',
    keyMessage: 'You do not go back. You move forward.',
    durationMin: 22,
    session: {
      arrival: 'Fourteen days. Notice yourself. What has shifted?',
      breathwork: {
        reference: 'coherent-breathing',
        durationMin: 12,
        intent: 'Final integration. Settled. Ready.',
      },
      guidedPrompt: 'What is the clearest way you are not the person who started this program?',
      journalPrompt:
        'Write a letter to yourself from 14 days ago. What do they need to hear from the version of you who did the work?',
      closingAnchor: 'I am clear. I am regulated. I am ready for what comes next.',
    },
    outcome:
      'Program complete. Invitation into next layer: Deep Emotional Reset · Clarity & Direction · SOMA Experiences (retreats).',
  },
];

// ============ COMPLETION & UPSELL ============

export const COMPLETION_SCREEN = {
  title: 'You are no longer stuck.',
  subtitle: 'You are clear, regulated, and ready.',
  body: [
    'Fourteen days ago, you arrived overwhelmed. You now have regulation, release, clarity, and the first steps of a new identity.',
    'This is not the end. It is the beginning of the practice.',
    'Where would you like to go next?',
  ],
  upsellPaths: [
    {
      id: 'deep-emotional-reset',
      name: 'Deep Emotional Reset',
      subtitle: '30 days — go into what you touched',
      priceUSD: 147,
      description:
        'Now that the surface has cleared, the deeper work begins. Full chakra release journeys across 30 days.',
    },
    {
      id: 'clarity-direction',
      name: 'Clarity & Direction',
      subtitle: '21 days — design the life you now can see',
      priceUSD: 97,
      description:
        'Vision, values, identity. Turn the clarity you found into a life you choose.',
    },
    {
      id: 'soma-experience',
      name: 'SOMA Experience',
      subtitle: '7 days · in person · complete reset',
      priceUSD: 4500,
      description:
        'The flagship. A full-body, full-life reset, in a held container, with practitioners. Apply.',
    },
  ],
};

// ============ DAILY SESSION TEMPLATE (consistent UX) ============

export const DAILY_TEMPLATE = [
  { step: 'Arrival', duration: '30 sec', purpose: 'Close eyes. Check in.' },
  { step: 'Breathwork', duration: '5-12 min', purpose: 'Regulate or release.' },
  { step: 'Guided Prompt', duration: '2-3 min', purpose: 'Inquiry for today.' },
  { step: 'Journal', duration: '2-5 min', purpose: 'Externalize what surfaced.' },
  { step: 'Close', duration: '1 min', purpose: 'Anchor the day.' },
];
