/**
 * SOMA - Core Teachings
 *
 * The philosophical backbone of the app.
 * These teachings appear throughout — on home, in onboarding, after sessions.
 * Tagline: "A daily practice of coming home to yourself."
 *
 * Core principles:
 *   1. Perception — we encounter ourselves in everything
 *   2. Alignment — inner world shapes outer experience
 *   3. Prana — life force is generated, not found
 *   4. Gratitude — attention increases what it touches
 *   5. Continuous practice — healing is a return, not a finish line
 */

export interface Teaching {
  id: string;
  pillar: 'perception' | 'alignment' | 'prana' | 'gratitude' | 'practice';
  title: string;
  essence: string;           // 1-line essence
  body: string[];            // paragraphs
  practiceIntegration: string; // how this shows up in daily practice
  quoteWorthy?: string;      // short phrase to display in the app as a visual
}

export const TEACHINGS: Teaching[] = [
  // ============ PILLAR 1: PERCEPTION ============
  {
    id: 'perception-core',
    pillar: 'perception',
    title: 'The World is Your Mirror',
    essence: 'What we encounter outside is largely what we project from inside.',
    body: [
      'You are not experiencing the world directly. You are experiencing your nervous system\'s interpretation of it.',
      'When your inner world is calm, the traffic jam is just a traffic jam. When your inner world is tense, the traffic jam is proof that life is hard, people are rude, and nothing works out.',
      'Same event. Different reality. The difference is you.',
      'This is not blame. It is the deepest empowerment there is. Because if your perception creates your experience, then changing your inner state changes your life — without needing anything outside to change first.',
    ],
    practiceIntegration:
      'When something triggers you, Mirror Mode asks: what is this showing you about you? Not as blame — as invitation.',
    quoteWorthy: 'You see yourself in everything you look at.',
  },
  {
    id: 'perception-trigger',
    pillar: 'perception',
    title: 'Triggers are Teachers',
    essence: 'The people who activate you the most are holding up a mirror you have been avoiding.',
    body: [
      'Anything that sends you into disproportionate reaction is not about the thing in front of you. It is an old wound, activated.',
      'The rude stranger, the criticizing coworker, the partner who withdrew — they are rarely the cause. They are the key turning in a lock you forgot was there.',
      'This is good news. It means the healing is available now. The pattern is on the table. You can finally see it.',
    ],
    practiceIntegration:
      'Next time you are triggered, pause. Breathe. Ask: how old is this feeling? What does it actually need?',
  },

  // ============ PILLAR 2: ALIGNMENT ============
  {
    id: 'alignment-core',
    pillar: 'alignment',
    title: 'Living in Alignment',
    essence: 'Your inner world and your outer world are one continuous field.',
    body: [
      'When what you think, what you feel, what you say, and what you do are all moving in the same direction — that is alignment. Energy flows. Life becomes easier.',
      'When any of these split from the others — when you say yes but mean no, when you feel rage but smile, when you think wealth but act in scarcity — there is leakage. Your life force scatters.',
      'Alignment is not perfection. It is congruence. The daily practice is not to become flawless. It is to notice where you are out of alignment — and to gently return.',
      'The outer world will meet you exactly where you stand inside. Not as punishment. As a feedback system.',
    ],
    practiceIntegration:
      'Check-ins ask: Are my thoughts, feelings, words, and actions pointing the same direction? If not — which one is out?',
    quoteWorthy: 'The outer world meets you where you stand inside.',
  },
  {
    id: 'alignment-integrity',
    pillar: 'alignment',
    title: 'Small Alignments, Big Effects',
    essence: 'You do not need a grand life change. You need small daily acts of integrity.',
    body: [
      'Alignment is not achieved by overhauling your life. It is earned by small daily congruences.',
      'Saying no to the thing that drains you. Drinking water when thirsty. Sleeping when tired. Speaking the thing you have been holding. Choosing the harder right over the easier wrong.',
      'Each small act of alignment adds prana — life force — to your system. Each small act of misalignment drains it.',
      'The cumulative effect over weeks and months is transformational. Not because you willed it, but because you stopped leaking.',
    ],
    practiceIntegration:
      'The journal asks daily: What was one aligned choice today? What was one out-of-alignment moment — and what did it cost you?',
  },

  // ============ PILLAR 3: PRANA (LIFE FORCE) ============
  {
    id: 'prana-core',
    pillar: 'prana',
    title: 'Prana — You Generate It',
    essence: 'Life force is not a finite resource given to you. It is generated by how you live.',
    body: [
      'Prana is the word ancient traditions used for the animating energy of life. Modern language calls it vitality, life force, qi, chi, ruach, élan vital.',
      'Many people treat prana as something they receive — from food, sleep, the world. This is only half true.',
      'Prana is also generated. By the breath you take consciously. By the alignment you live in. By the emotions you let move through you. By the quality of your attention.',
      'Suppressed emotion drains prana. Avoidance drains prana. Unfulfilled commitments drain prana. Fear, unaddressed, drains prana slowly every day.',
      'Conscious breath, honest expression, meaningful contact, deep rest, nature, gratitude — these generate prana.',
      'You are not low on energy because life is draining you. You are low on energy because you are leaking it faster than you are generating it. The practice is to plug the leaks and turn on the generators.',
    ],
    practiceIntegration:
      'Every breath practice is a prana generator. Every moment of alignment is a prana generator. Every honest expression is a prana generator.',
    quoteWorthy: 'You do not run out of life force. You leak it, or you generate it.',
  },
  {
    id: 'prana-generators',
    pillar: 'prana',
    title: 'The Prana Generators',
    essence: 'Specific practices reliably increase life force.',
    body: [
      'Conscious breath — especially full, deep, sustained breath. Every complete breath is prana flowing in.',
      'Sunlight on skin, especially in the first two hours after waking. The body responds to light with pranic cascades.',
      'Cold exposure — briefly, at your edge. Cold creates a surge of vitality when done consciously.',
      'Movement you enjoy — not punishment. Dance, walking in nature, yoga, stretching. Movement unblocks prana.',
      'Deep rest — not passive scrolling. Actual rest. Eyes closed. Nothing required of you.',
      'Honest expression — speaking the truth, crying the tears, writing the words, making the art. Emotion is prana in motion.',
      'Touch — your own hand on your heart, safe contact with others, animals, the earth.',
      'Gratitude — attention directed at what is already good. It increases what it touches.',
    ],
    practiceIntegration:
      'The home screen tracks your daily prana generators. Small acts accumulate into transformation.',
  },

  // ============ PILLAR 4: GRATITUDE ============
  {
    id: 'gratitude-core',
    pillar: 'gratitude',
    title: 'Gratitude — Attention Increases What It Touches',
    essence: 'When you are grateful for what you have, no matter how small, those things begin to increase.',
    body: [
      'This is not magical thinking. It is attention.',
      'Your brain filters millions of bits of information into a few you actually perceive. What makes it through the filter is what you have trained your attention to notice.',
      'Focus on scarcity, and your brain will find more scarcity. Focus on what is already abundant — breath, warmth, the cup of tea, a friend\'s text, the fact that your body is working — and your brain begins finding more of those things too.',
      'The things do not literally multiply. But your experience of them does. And as your experience shifts, your state shifts. As your state shifts, your choices shift. As your choices shift, your life shifts.',
      'Gratitude is not a moral virtue. It is a training in attention. And attention is the one thing that shapes everything else.',
    ],
    practiceIntegration:
      'The evening practice includes 3 things — no matter how small. The morning practice anchors the day in what is already true.',
    quoteWorthy: 'Gratitude is not magic. It is where you aim your attention.',
  },
  {
    id: 'gratitude-small',
    pillar: 'gratitude',
    title: 'Start with the Smallest Thing',
    essence: 'The smaller the gratitude, the more powerful the rewiring.',
    body: [
      'Big gratitude (my family, my health, my home) is important — but the brain can perform it.',
      'Small gratitude is where the rewiring happens. The warmth of the mug. The first sip of water. The way the light hit the window. The fact that your knees bend.',
      'These are the things you stop noticing. They are also the bedrock of your actual life.',
      'Training the attention on the overlooked is what shifts the baseline. Your set point rises. The same life begins to feel different — not because the life changed, but because you finally saw it.',
    ],
    practiceIntegration:
      'Three small things. Each day. Different every time. Build the muscle.',
  },

  // ============ PILLAR 5: CONTINUOUS PRACTICE ============
  {
    id: 'practice-core',
    pillar: 'practice',
    title: 'Healing is a Practice, Not a Destination',
    essence: 'You are never done. That is the good news.',
    body: [
      'The goal of this work is not to arrive at a state where you no longer need it.',
      'The goal is to build a relationship with yourself so steady, so honest, so daily, that you can meet whatever life brings — without being thrown off for long.',
      'Most days the practice will feel ordinary. Occasionally it will feel extraordinary. Both are correct.',
      'The people with the deepest inner lives did not have one enlightenment moment. They returned to their practice, day after day, year after year, through everything life put in front of them.',
      'You will forget. You will drift. You will think you are past needing it. Then life will knock you, and you will come back.',
      'Each return is the practice. The work is showing up again, even after missing a day, a week, a year. The practice does not require perfection. It only requires you.',
    ],
    practiceIntegration:
      'The app is designed for a lifetime of return. Content keeps growing. New seasons, new themes, new depths. You are not racing to a finish line.',
    quoteWorthy: 'The work is not finishing. It is returning.',
  },
];

export function getByPillar(pillar: Teaching['pillar']): Teaching[] {
  return TEACHINGS.filter((t) => t.pillar === pillar);
}

export function getTeachingById(id: string): Teaching | undefined {
  return TEACHINGS.find((t) => t.id === id);
}

/** Returns a different teaching each day of the year (deterministic) */
export function getDailyTeaching(date = new Date()): Teaching {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % TEACHINGS.length;
  return TEACHINGS[index] ?? TEACHINGS[0]!;
}

// ============ GRATITUDE PRACTICES ============

export interface GratitudePractice {
  id: string;
  title: string;
  duration: number;  // minutes
  when: 'morning' | 'evening' | 'anytime';
  prompt: string;
  guidance: string;
}

export const GRATITUDE_PRACTICES: GratitudePractice[] = [
  {
    id: 'three-things-small',
    title: 'Three Small Things',
    duration: 3,
    when: 'evening',
    prompt: 'Name three small things you noticed today.',
    guidance:
      'Not big achievements. Small moments — the warmth of tea, a stranger\'s smile, the sound of rain. The smaller the better. Write them down or say them aloud.',
  },
  {
    id: 'body-gratitude',
    title: 'Gratitude to the Body',
    duration: 5,
    when: 'morning',
    prompt: 'Thank one body part for carrying you yesterday.',
    guidance:
      'Your feet walked. Your hands held. Your heart kept beating while you slept. Choose one part. Thank it specifically.',
  },
  {
    id: 'future-gratitude',
    title: 'Gratitude for What Is Coming',
    duration: 5,
    when: 'morning',
    prompt: 'What are you grateful for that has not happened yet?',
    guidance:
      'Pick something you are calling in — and feel gratitude for it as if it has arrived. The nervous system does not distinguish. It anchors the vision.',
  },
  {
    id: 'person-gratitude',
    title: 'One Person, Fully',
    duration: 5,
    when: 'anytime',
    prompt: 'Bring to mind one person and name 5 specific things about them.',
    guidance:
      'Not platitudes. Specifics. The way they laugh at their own jokes. The exact meal they make you. The thing they said once that you never forgot.',
  },
  {
    id: 'alive-gratitude',
    title: 'Simply — Alive',
    duration: 3,
    when: 'anytime',
    prompt: 'Notice that you are breathing, and that you did not have to make that happen.',
    guidance:
      'Your body is breathing you. Your heart is beating without you. Trillions of cells are cooperating to produce this moment. That is the gratitude.',
  },
];

// ============ ALIGNMENT DAILY CHECK-IN ============

export const ALIGNMENT_CHECKIN = {
  title: 'Alignment Check',
  subtitle: 'Where are you, right now, in your own life?',
  questions: [
    {
      id: 'think',
      label: 'What are you thinking?',
      prompt: 'Not what you should think — what is actually on loop in your mind?',
    },
    {
      id: 'feel',
      label: 'What are you feeling?',
      prompt: 'In the body, not the story. Where does it live? What texture is it?',
    },
    {
      id: 'say',
      label: 'What are you saying to others?',
      prompt: 'Is it true? Does it match what you actually feel?',
    },
    {
      id: 'do',
      label: 'What are you doing?',
      prompt: 'Does it move you toward what you want? Or against?',
    },
    {
      id: 'gap',
      label: 'Where is the gap?',
      prompt:
        'Alignment is when these four point the same direction. Where is the split today?',
    },
  ],
};
