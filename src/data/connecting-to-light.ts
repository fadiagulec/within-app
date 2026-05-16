/**
 * SOMA - CONNECTING TO LIGHT
 *
 * The self-care + personal alignment pillar.
 * Teaching: Self-care is not luxury. It is necessity.
 * It is how you generate prana, raise your vibration, and stay aligned.
 *
 * The four non-negotiables:
 *   1. MEDITATION — stillness, awareness, the turning inward
 *   2. MINDFULNESS — presence in everyday moments
 *   3. PHYSICAL EXERCISE — movement, embodied vitality
 *   4. PROPER REST — sleep and deep restoration
 *
 * These four together are the foundation of a high-vibration life.
 * Without them, no amount of healing work holds.
 */

export const PILLAR_OVERVIEW = {
  title: 'Connecting to Light',
  tagline: 'Self-care is not luxury. It is necessity.',
  intro: [
    'Self-care has been sold to you as a spa day. As something earned, as something indulgent, as something you fit in when everything else is done.',
    'That framing is the lie that keeps people depleted.',
    'Real self-care is the foundation — not the reward. It is how you generate the life force needed to do anything else. It is how you stay aligned with who you actually are.',
    'Connecting to Light is the daily practice of returning to the four foundations — meditation, mindfulness, movement, and rest. Each one elevates your frequency. Each one keeps the connection open.',
    'Miss them, and life gets heavy. Honor them, and life flows.',
  ],
  coreTeaching:
    'You are already light. These practices are how you stop dimming yourself.',
};

// ============ FOUR FOUNDATIONS ============

export type FoundationId = 'meditation' | 'mindfulness' | 'movement' | 'rest';

export interface Foundation {
  id: FoundationId;
  title: string;
  essence: string;
  why: string[];
  howItRaisesVibration: string;
  dailyMinimum: string;
  whatToAvoid: string;
  deeperPractices: string[];
  pairsWith: string;  // what it enhances
}

export const FOUNDATIONS: Foundation[] = [
  {
    id: 'meditation',
    title: 'Meditation',
    essence: 'The practice of watching your mind without becoming it.',
    why: [
      'Your thoughts run you until you learn to observe them.',
      'Meditation is not about emptying the mind. It is about not being owned by it.',
      'Sitting quietly, even for five minutes a day, creates a space between stimulus and response. In that space is your freedom.',
      'Research confirms: daily meditation reshapes the brain, reduces default-mode-network activity (the self-referential loop), and measurably raises baseline wellbeing within weeks.',
    ],
    howItRaisesVibration:
      'By quieting mental static, you stop generating the low-frequency emotions (fear, worry, shame) that your racing mind produces on autopilot. What remains underneath is already calm, already clear, already light.',
    dailyMinimum:
      '5-10 minutes, seated, eyes closed. Same time each day if possible. Consistency over duration.',
    whatToAvoid:
      'Forcing a quiet mind. The mind is supposed to wander. Noticing it wandered and gently returning — that IS the practice.',
    deeperPractices: [
      'Guided chakra meditations (in-app)',
      'Silent sitting — 20 minute timer',
      'Body scan meditation',
      'Loving-kindness (metta) practice',
      'Yoga nidra (deep rest meditation)',
    ],
    pairsWith: 'Mindfulness in daily life — meditation trains, mindfulness applies.',
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    essence: 'Presence in the moment you are actually in.',
    why: [
      'Most suffering is not from the current moment. It is from rehearsing the past or dreading the future.',
      'Mindfulness is the practice of bringing attention back — to this breath, this step, this bite of food, this conversation.',
      'It is not a retreat from life. It is finally being IN it.',
      'The benefit is immediate: you stop missing your own life. You start noticing what is actually good, what actually needs attention, what actually matters.',
    ],
    howItRaisesVibration:
      'Presence is high frequency. Distraction is low frequency. Every moment you choose to be here instead of somewhere else in your mind is a vote for a higher state.',
    dailyMinimum:
      'Three mindful moments daily. While drinking coffee. While walking to the car. While brushing teeth. One minute each, fully present.',
    whatToAvoid:
      'Thinking mindfulness is only for meditation cushions. The dishes, the commute, the conversation — these are where mindfulness lives.',
    deeperPractices: [
      'Eating meditation — one meal a week fully present',
      'Walking meditation — no phone, feel each step',
      'Listening practice — listen to understand, not to reply',
      'Sensory check-ins — name 5 things you see, 4 you hear, 3 you feel',
      'Red-light practice — every stop light becomes a breath',
    ],
    pairsWith: 'Alignment — you cannot align with what you are not present to.',
  },
  {
    id: 'movement',
    title: 'Physical Exercise',
    essence: 'The body is a vessel for life force. Movement keeps it clear.',
    why: [
      'Emotion is energy in motion. If the body does not move, the emotion does not move either. It stores.',
      'Movement is not optional for mental health — it is foundational. It regulates the nervous system more reliably than most interventions.',
      'Research: 30 minutes of moderate movement matches the effect of many antidepressants for mild-to-moderate symptoms.',
      'This is not about achieving a body. It is about inhabiting the one you have. Every form of movement counts — walking, yoga, dance, swimming, weights, gardening.',
    ],
    howItRaisesVibration:
      'Movement generates prana. It oxygenates cells, unblocks stuck emotion, clears the lymphatic system, and releases endorphins. A body that moves daily runs at a higher frequency.',
    dailyMinimum:
      '20-30 minutes of movement you enjoy. If you do not enjoy it, you will not continue. Find what your body says yes to.',
    whatToAvoid:
      'Punishing exercise. Exercise as self-punishment is low-vibration movement — it drains prana rather than generating it.',
    deeperPractices: [
      'Morning walk in sunlight (double benefit — movement + light)',
      'Yoga 3x per week',
      'Strength training 2-3x per week',
      'Dance — even 10 minutes in your living room',
      'Conscious stretching at transitions during the day',
      'Cold water exposure (briefly, with practice)',
    ],
    pairsWith: 'Breathwork — every movement practice is improved by conscious breath.',
  },
  {
    id: 'rest',
    title: 'Proper Rest',
    essence: 'Sleep is not a reward for finishing. It is a pillar.',
    why: [
      'You cannot heal what you do not rest. You cannot integrate what you do not sleep through.',
      'Chronic under-sleep is the single most corrosive force on the nervous system. It destroys mood, immunity, decision-making, and emotional regulation.',
      'Proper rest is also not just sleep. It is waking rest — moments of true pause, without input, without producing.',
      'In a culture that glorifies depletion, rest is a radical act of self-care.',
    ],
    howItRaisesVibration:
      'Rest is when the body heals, when the mind integrates, when the nervous system repairs. A well-rested body runs at a higher frequency by default. You do not have to earn it.',
    dailyMinimum:
      '7-9 hours of sleep. Fixed bedtime where possible. Dark, cool, quiet room. No screens the hour before bed.',
    whatToAvoid:
      'Using scrolling as "rest." It is stimulation, not rest. True rest has no input — just space.',
    deeperPractices: [
      'Fixed wake-up and sleep time (anchors circadian rhythm)',
      'Yoga nidra 1-2x per week (deep rest meditation)',
      'One day per week with no agenda',
      'Afternoon rest — even 20 minutes, eyes closed',
      '4-7-8 breath before sleep',
      'No caffeine after 1pm',
    ],
    pairsWith: 'Everything. Without rest, nothing else holds.',
  },
];

// ============ DAILY ALIGNMENT CHECK (4 FOUNDATIONS) ============

export interface AlignmentCheckItem {
  foundation: FoundationId;
  question: string;
  minimumAction: string;
}

export const DAILY_FOUNDATION_CHECK: AlignmentCheckItem[] = [
  {
    foundation: 'meditation',
    question: 'Did you meditate today? Even 5 minutes counts.',
    minimumAction: 'If no — do a 3-minute breath meditation right now.',
  },
  {
    foundation: 'mindfulness',
    question: 'Were you present at least three times today?',
    minimumAction: 'If no — take 1 minute right now to feel your breath.',
  },
  {
    foundation: 'movement',
    question: 'Did your body move today in a way that felt good?',
    minimumAction: 'If no — stand up and stretch for 2 minutes.',
  },
  {
    foundation: 'rest',
    question: 'Did you sleep well last night? Will you rest well tonight?',
    minimumAction: 'If no — plan a 30-minute earlier bedtime.',
  },
];

// ============ KEY PRINCIPLES ============

export const KEY_PRINCIPLES = [
  {
    title: 'Self-care is not selfish. It is the ground from which everything else grows.',
    body: 'You cannot pour from an empty vessel. Tending to yourself is how you become capable of tending to anyone else.',
  },
  {
    title: 'Consistency beats intensity.',
    body: '5 minutes of meditation every day for a year will change your life more than 5 hours once a month.',
  },
  {
    title: 'The four foundations support each other.',
    body: 'Better sleep makes meditation easier. Meditation makes mindfulness natural. Mindfulness makes you move with awareness. Movement earns deeper sleep. One feeds the next.',
  },
  {
    title: 'Your vibration is a daily maintenance, not a one-time achievement.',
    body: 'You do not meditate once and become enlightened. You care for yourself today, and tomorrow, and again. This is the practice. This is the life.',
  },
  {
    title: 'Missing a day is not failure. Missing for weeks is not failure.',
    body: 'The practice is the return. You have not broken anything. You are simply coming back.',
  },
];

// ============ EXPANDED MEDITATION BENEFITS ============

export const MEDITATION_BENEFITS = {
  title: 'Why Meditation — The Benefits',
  subtitle: 'What changes when you sit quietly every day',
  categories: [
    {
      area: 'Nervous System',
      effects: [
        'Lowers cortisol (stress hormone) measurably within weeks',
        'Increases heart rate variability — the marker of nervous system resilience',
        'Shifts baseline from sympathetic (activated) to parasympathetic (regulated)',
        'Reduces blood pressure and resting heart rate',
      ],
    },
    {
      area: 'Brain & Mind',
      effects: [
        'Thickens the prefrontal cortex (focus, decision-making, empathy)',
        'Shrinks the amygdala (fear, reactivity)',
        'Reduces default-mode-network activity (self-referential rumination)',
        'Improves working memory and attention span',
        'Better emotional regulation — more space between trigger and reaction',
      ],
    },
    {
      area: 'Emotional Life',
      effects: [
        'Less reactivity to old wounds',
        'Greater capacity to sit with discomfort without needing to fix it',
        'Increased self-awareness — you catch patterns earlier',
        'More compassion — for self and others',
        'Reduced anxiety and depression symptoms',
      ],
    },
    {
      area: 'Life Force / Vibration',
      effects: [
        'Higher baseline energy without stimulants',
        'Greater sense of meaning and connection',
        'Intuition strengthens — you hear yourself more clearly',
        'Decisions align more easily with values',
        'You become less drained by environments and people',
      ],
    },
  ],
  closing:
    'None of this happens in one session. All of it happens with consistent practice over time.',
};

// ============ SACRAL ENERGY CENTER PRACTICE ============

export const SACRAL_PRACTICE = {
  title: 'Daily Sacral Practice — Reclaim Your Flow',
  essence:
    'The Sacral is where pleasure, creativity, and emotion live. A daily practice here keeps the life force flowing.',
  why: [
    'The Sacral chakra (lower belly, just below the navel) governs your capacity for pleasure, creativity, sensuality, and emotional flow.',
    'In a culture that trains us to suppress, numb, and push through — the Sacral gets blocked first. The cost is numbness, creative stagnation, and chronic low-grade guilt for wanting what we want.',
    'Daily Sacral practice keeps this center open. It is not complex. It is rhythmic, embodied, and pleasurable by design.',
  ],
  dailyFiveMinute: [
    'Stand with feet hip-width apart, knees softly bent',
    'Place both hands over your lower belly',
    'Begin slow, sensual hip circles — 8 in each direction',
    'Breathe into the space under your hands',
    'Hum softly — any note, any song',
    'End with one minute of stillness, hands still on belly',
    'Ask: What does this part of me want today?',
  ],
  weeklyDeeper: [
    'Dance freely for one song — no choreography, just movement the body wants',
    'Water practice: a bath or slow shower with full presence — water is the Sacral\'s element',
    'Create something small without judging it — a drawing, a meal, a line of writing',
    'Eat something you love, slowly, with full attention',
    'Say one genuine YES to yourself and one genuine NO to something depleting',
  ],
  shadowToWatch:
    'Guilt — the inner voice that says "who am I to want this?" Meet it. Breathe through it. Want anyway.',
  mantraPhrase: 'My desire is sacred. My pleasure is medicine. I am allowed.',
};

// ============ GROUNDING / EARTHING ============

export const GROUNDING_PRACTICE = {
  title: 'Grounding — Returning to the Earth',
  essence:
    'When everything feels unsteady, the earth is still there, holding you. Grounding is the practice of remembering that.',
  why: [
    'Modern life keeps us in our heads, on screens, off the ground. Our nervous systems lose their anchor.',
    'Grounding (also called earthing) is the practice of deliberate contact with the earth — through the body.',
    'Research suggests direct skin contact with the ground reduces inflammation, lowers cortisol, improves sleep, and balances the body\'s electrical charge. Whether or not all the mechanisms are fully understood, the experiential effect is immediate: you feel more here.',
  ],
  practices: [
    {
      name: 'Bare feet on earth',
      duration: '10-20 minutes',
      how: 'Walk barefoot on grass, sand, or soil. Feel every texture. No phone.',
    },
    {
      name: 'Tree lean',
      duration: '5 minutes',
      how: 'Stand with your back against a tree trunk. Close your eyes. Breathe with it.',
    },
    {
      name: 'Sitting with the earth',
      duration: '10 minutes',
      how: 'Sit directly on the ground (not a chair). Hands flat on the earth. Breathe downward.',
    },
    {
      name: 'Body weight on the floor',
      duration: '5 minutes',
      how: 'Lie flat on your back on the floor (not a bed). Let gravity pull every tension down.',
    },
    {
      name: 'Root-lock grounding breath',
      duration: '5 minutes',
      how: 'Seated. Inhale: draw energy up through the spine. Exhale: release down into the earth. Gentle pelvic-floor lift on inhale.',
    },
  ],
  quickReset:
    'When anxious, immediately: feet flat on floor, notice five things you see, four you hear, three you feel, two you smell, one you taste. You are back in your body.',
};

// ============ NOURISHING FOOD ============

export const NOURISHMENT_PRACTICE = {
  title: 'Nourishing Food — How You Feed the Vessel',
  essence:
    'Every cell of your body is made from what you eat. This is not metaphor. It is biology.',
  why: [
    'Food is information. Each meal tells your cells what to build, what to repair, what to signal.',
    'This is not a diet framework. There is no single way of eating that works for everyone. Bodies vary.',
    'What is universal: whole foods, close to the earth, eaten with awareness, generally serve the body. Ultra-processed foods, eaten mindlessly, generally do not.',
    'And the how matters as much as the what. Food eaten in peace nourishes more than the same food eaten in stress.',
  ],
  principles: [
    {
      title: 'Eat what grew or was grown',
      body: 'If it came from the earth, an animal, or a simple process involving both — it is food. The further from that it has traveled, the less it resembles nourishment.',
    },
    {
      title: 'Eat in peace',
      body: 'Food eaten in stress is digested poorly. Before your meal, take three breaths. Sit down. Put the phone away. Your gut brain is listening.',
    },
    {
      title: 'Listen to the body',
      body: 'Your body will tell you what it needs — if you learn to listen underneath the cravings. The cravings come from blood sugar, from emotion, from habit. The body speaks quieter.',
    },
    {
      title: 'Eat enough',
      body: 'Under-eating is as draining as over-eating. Restriction creates scarcity signals in the body — the opposite of abundance frequency.',
    },
    {
      title: 'Enjoy what you eat',
      body: 'Pleasure is part of nourishment. A meal eaten with delight nourishes more than a "perfect" meal eaten with resentment.',
    },
  ],
  dailyBasics: [
    'A serving of protein at each meal',
    'Something green, every day',
    'Colors on the plate — the more colors, the more nutrients',
    'Chew slowly — digestion begins in the mouth',
    'Stop at about 80% full (Japanese principle: hara hachi bu)',
  ],
  note: 'If you have a diagnosed condition, work with a registered dietitian or doctor. This is general wisdom, not medical advice.',
};

// ============ HYDRATION / WATER ============

export const HYDRATION_PRACTICE = {
  title: 'Water — The Element You Are Made Of',
  essence:
    'Your body is 60% water. A 1% drop in hydration measurably reduces mood, energy, and cognition.',
  why: [
    'Dehydration is the most common and most overlooked cause of fatigue, brain fog, and irritability.',
    'Every cellular process depends on water. Every emotion passes through water. Every thought forms in a water-based brain.',
    'Most people are chronically under-hydrated without knowing it. Thirst is often the last signal — not the first.',
  ],
  dailyPractice: [
    'Drink a large glass of water immediately upon waking (before coffee)',
    'Aim for roughly 2-3 liters per day (adjust for climate, activity, body size)',
    'Add pinch of natural salt to one glass daily — water alone depletes minerals',
    'Herbal teas count. Soups count. Fruit count.',
    'Coffee and alcohol do not count — they are dehydrating',
    'Stop drinking 1-2 hours before sleep to avoid disrupting sleep',
  ],
  sacredPractice: {
    title: 'Drinking as Ceremony',
    guidance:
      'Before your first glass each morning, hold it. Thank the water. Set an intention for the day. Drink slowly — feel it travel through you. This turns a reflex into a practice.',
  },
  signsOfDehydration: [
    'Afternoon fatigue',
    'Brain fog or trouble focusing',
    'Headaches',
    'Dry skin or lips',
    'Dark yellow urine',
    'Irritability without clear cause',
    'Cravings for sweet or salty foods',
  ],
};

// ============ THE EXPANDED FOUNDATION MAP ============

export const ALL_PRACTICES_ORDER: { key: string; title: string; data: any }[] = [
  { key: 'meditation', title: 'Meditation', data: FOUNDATIONS[0] },
  { key: 'mindfulness', title: 'Mindfulness', data: FOUNDATIONS[1] },
  { key: 'movement', title: 'Physical Movement', data: FOUNDATIONS[2] },
  { key: 'rest', title: 'Proper Rest', data: FOUNDATIONS[3] },
  { key: 'grounding', title: 'Grounding / Earthing', data: GROUNDING_PRACTICE },
  { key: 'hydration', title: 'Hydration', data: HYDRATION_PRACTICE },
  { key: 'nourishment', title: 'Nourishing Food', data: NOURISHMENT_PRACTICE },
  { key: 'sacral', title: 'Sacral Energy Practice', data: SACRAL_PRACTICE },
];

// ============ CLOSING INVITATION ============

export const CLOSING = {
  title: 'Begin today.',
  body: [
    'Not with perfection. Not with a new routine that requires three hours a day.',
    'Begin with one foundation. The one calling to you most. Practice it this week.',
    'Next week, add another. Or deepen this one. Or rest. Let it emerge.',
    'This is not a program to complete. It is a life to live.',
    'You are already light. These practices are simply how you stop forgetting.',
  ],
};
