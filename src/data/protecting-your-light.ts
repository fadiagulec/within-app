/**
 * SOMA - PROTECTING YOUR LIGHT
 *
 * Energy hygiene, environmental alignment, and protection practices.
 * Teaching: raising your vibration is only half the work.
 * The other half is protecting it — from environmental drains, energetic
 * intrusions, and the daily entanglements of modern life.
 */

// ============ OVERVIEW ============

export const PROTECTING_OVERVIEW = {
  title: 'Protecting Your Light',
  tagline: 'What you cultivate, you also protect.',
  intro: [
    'You can meditate every morning and still feel depleted by 3pm. You can eat clean and still feel foggy. You can hold boundaries with your words and still leak energy through your environment.',
    'Raising your vibration is one discipline. Protecting it is another. Most people do only the first and wonder why the gains do not hold.',
    'Your energy field — the invisible atmosphere you walk around in — is shaped by what you consume, who you spend time with, the spaces you inhabit, the screens you stare at, and the attachments you carry without knowing.',
    'This pillar is the practice of energy hygiene. Simple, consistent, protective. Not fear-based. Discerning.',
  ],
  coreTeaching:
    'Protecting your light is not separating from the world. It is being in the world without being reshaped by it.',
};

// ============ ENERGY DRAINS TO RECOGNIZE ============

export const ENERGY_DRAINS = [
  {
    drain: 'Artificial blue light after sunset',
    cost: 'Disrupts melatonin, dysregulates circadian rhythm, degrades sleep quality',
  },
  {
    drain: 'Constant notifications + social media scrolling',
    cost: 'Fragments attention, elevates cortisol, robs you of presence',
  },
  {
    drain: 'Time with people in chronic complaint or cynicism',
    cost: 'Emotional contagion is real — you pick up their state within minutes',
  },
  {
    drain: 'Clutter in your physical space',
    cost: 'Unfinished environments create unfinished nervous systems',
  },
  {
    drain: 'Bright overhead lighting throughout the day/night',
    cost: 'Keeps the body in sympathetic activation, suppresses melatonin',
  },
  {
    drain: 'News and media consumed without filter',
    cost: 'Trains the threat-detection part of your brain into permanent alert',
  },
  {
    drain: 'Unresolved emotional attachments to people or past events',
    cost: 'Energetic cords drain life force across time and distance',
  },
  {
    drain: 'Saying yes when you mean no',
    cost: 'Each misaligned agreement leaks prana until you fulfill or unwind it',
  },
];

// ============ ENVIRONMENTAL TOOLS ============

export interface EnvironmentalTool {
  id: string;
  name: string;
  category: 'light' | 'air' | 'space' | 'material';
  essence: string;
  howItWorks: string;
  howToUse: string[];
  scienceNote?: string;
  caution?: string;
}

export const ENVIRONMENTAL_TOOLS: EnvironmentalTool[] = [
  {
    id: 'himalayan-salt-lamp',
    name: 'Himalayan Salt Lamps',
    category: 'air',
    essence: 'Warm, amber light that shifts the feel of a room.',
    howItWorks:
      'Himalayan salt lamps emit a warm amber glow (around 1800K — closer to firelight than to screens). Many people experience them as calming and grounding. Some research suggests heated salt releases small amounts of negative ions, which may improve air quality and mood, though effects are modest.',
    howToUse: [
      'Place in your bedroom or workspace',
      'Turn on in the evening as a replacement for overhead lighting',
      'Leave on during meditation or deep rest',
      'Keep on low in the bedroom overnight if preferred (the warm spectrum does not suppress melatonin like blue light does)',
    ],
    scienceNote:
      'The amber wavelength itself is what matters most — any warm, dim light at sunset signals to your nervous system that it is time to wind down.',
    caution: 'Salt is hygroscopic (absorbs moisture). Keep away from humid bathrooms to prevent dripping.',
  },
  {
    id: 'blue-blocking-glasses',
    name: 'Blue-Blocking Glasses',
    category: 'light',
    essence: 'Filter artificial blue light after sunset to protect your sleep.',
    howItWorks:
      'Blue light (from screens, LEDs, fluorescent bulbs) tells your brain it is daytime — even at 11pm. Your body suppresses melatonin in response. Blue-blocking glasses filter out the short wavelengths, allowing melatonin to rise naturally as evening progresses.',
    howToUse: [
      'Put on 1-2 hours before your intended sleep time',
      'Wear while using phones, laptops, TV',
      'Orange/red-tinted lenses block the most blue light',
      'Clear "computer glasses" block less — insufficient for sleep protection',
      'Remove on waking + get real sunlight in the first hour',
    ],
    scienceNote:
      'Multiple studies show wearing amber blue blockers at night improves sleep onset, quality, and next-day mood — especially for people whose evenings require screen use.',
    caution: 'Not a substitute for reducing screen time before bed — but a valuable layer when screen use is unavoidable.',
  },
  {
    id: 'clean-space',
    name: 'Clean, Intentional Space',
    category: 'space',
    essence: 'Your environment is a constant frequency broadcast.',
    howItWorks:
      'The space you live in communicates with your nervous system constantly. Clutter, stagnation, poor lighting, broken objects — these register as incomplete loops your attention can never fully close. A clean, intentional space frees mental bandwidth.',
    howToUse: [
      'Clear one surface completely each day',
      'Remove anything broken or unused (it taxes your attention)',
      'Keep one area as sacred — a corner for meditation, a candle, a single meaningful object',
      'Open windows daily, even briefly — stagnant air holds stagnant energy',
      'Plants: they literally filter air and add life to a space',
    ],
  },
  {
    id: 'natural-materials',
    name: 'Natural Materials',
    category: 'material',
    essence: 'What touches your body all day becomes part of your field.',
    howItWorks:
      'Synthetic fabrics, plastics, and processed materials interact with the body differently than natural ones. Cotton, wool, linen, stone, wood, and leather feel alive to the body because they are closer to their original form.',
    howToUse: [
      'Sleep on natural-fiber sheets when possible',
      'Wear natural fabrics directly on your skin',
      'Hold a stone or crystal during meditation — the weight alone grounds',
      'Avoid plastic water bottles when possible — glass or stainless steel',
    ],
  },
];

// ============ ENERGY CLEARING PRACTICES ============

export interface ClearingPractice {
  id: string;
  name: string;
  duration: string;
  when: string;
  how: string[];
  closing: string;
}

export const CLEARING_PRACTICES: ClearingPractice[] = [
  {
    id: 'salt-cleanse',
    name: 'Salt Cleanse',
    duration: '5-15 min',
    when: 'After a draining day, after illness, after difficult social encounters',
    how: [
      'Run a warm bath — or fill a bowl of warm water if you don\'t have a tub',
      'Add 1-2 cups of natural salt (Himalayan, sea salt, or Epsom salt)',
      'Fully immerse (or wash each part of your body with the salt water)',
      'Set an intention: "What does not belong to me, I release."',
      'Stay in the water for at least 10 minutes',
      'Visualize any heaviness leaving your body and dissolving into the salt',
      'Drain the water and rinse with fresh water',
    ],
    closing: 'Salt has been used for millennia to clear the field. Simple. Ancient. Reliable.',
  },
  {
    id: 'sound-clearing',
    name: 'Sound Clearing',
    duration: '5-10 min',
    when: 'When a space feels heavy, stagnant, or after conflict',
    how: [
      'Use a bell, singing bowl, tuning fork, clapping, or simply your own voice',
      'Move through the room — corners first, they hold the most stuck energy',
      'Sound clears by displacing — the vibration moves the air, and with it, whatever has settled',
      'Open a window while you do this, so what leaves has somewhere to go',
      'Finish in the center of the room with your intention',
    ],
    closing:
      'You do not need expensive instruments. Your voice works. Humming works. Clapping works. The intention carries the sound.',
  },
  {
    id: 'smoke-clearing',
    name: 'Smoke Clearing',
    duration: '5-10 min',
    when: 'Moving into a new space, after someone left, after illness',
    how: [
      'Choose your medium: palo santo, rosemary, sage, or any locally-sourced dried herb',
      'Light the tip, let it smolder (not burn openly)',
      'Walk through the space with the smoke, letting it waft into corners, under furniture, around doorways',
      'Set intention as you move: "I clear what is not mine."',
      'Open a window — the smoke needs somewhere to go',
      'Close with a deep breath and a word of gratitude',
    ],
    closing:
      'Indigenous traditions have used plant smoke for cleansing for thousands of years. Source your plants ethically — avoid over-harvested white sage and buy from indigenous producers when possible.',
  },
  {
    id: 'cord-release',
    name: 'Cord Release Visualization',
    duration: '5 min',
    when: 'After difficult interactions, when someone is "in your head," when you cannot stop thinking of a person',
    how: [
      'Sit or lie comfortably. Close your eyes.',
      'Breathe deeply for a minute',
      'Picture the person whose energy you feel attached to',
      'Notice where in your body you feel connected to them — belly, heart, throat, head',
      'Visualize the cord between you — its thickness, color, texture',
      'Speak (silently or aloud): "I return to you what is yours. I reclaim what is mine."',
      'Visualize the cord dissolving, or being cut with light',
      'Seal the place on your body where it was connected — place your hand there, breathe in',
      'Close with: "I release with love. I am whole."',
    ],
    closing:
      'This is not about the other person. It is about reclaiming your own energy. They are unaffected. You are freed.',
  },
  {
    id: 'cold-water-clearing',
    name: 'Cold Water Clearing',
    duration: '2-5 min',
    when: 'Morning reset, after intense emotions, before important work',
    how: [
      'Cold shower or cold water on face and arms',
      'Allow the shock — do not resist',
      'Breathe through it',
      'Set intention as you enter: "What I pick up today, I release now."',
    ],
    closing:
      'Cold water is the fastest reset tool. It pulls you out of any emotional spiral, resets the nervous system, and clears the energetic field immediately.',
  },
];

// ============ PROTECTION PRACTICES ============

export const PROTECTION_PRACTICES = {
  title: 'Protecting Your Energy',
  intro: [
    'Protection is not paranoia. It is simply not leaving your doors open.',
    'You do not walk around with your wallet in your hand. You do not leave your home unlocked. Energy is the same — a basic sense of when to be open and when to close.',
    'These are simple practices. Do one or all. The discipline of protection quickly becomes automatic.',
  ],
  practices: [
    {
      name: 'Morning Field Seal',
      duration: '1-2 min',
      how: 'Before leaving the house: close your eyes. Imagine a sphere of light around you — not rigid, permeable to what is good, not permeable to what is not. State: "I move through today protected. I receive what serves me. I release what does not." Open eyes.',
    },
    {
      name: 'The Shoulder Shake-Off',
      duration: '10 seconds',
      how: 'After any draining encounter, physically shake your body. Start with the hands, then the arms, then the whole body. This is how animals discharge stress. You were taught to suppress it. Reclaim it.',
    },
    {
      name: 'Between-Meeting Reset',
      duration: '2 min',
      how: 'Between calls or meetings: close laptop. Step outside or to a window. Hands on heart. 5 breaths. "What was that meeting\'s, stays with that meeting. I begin fresh."',
    },
    {
      name: 'Threshold Pause',
      duration: '30 seconds',
      how: 'When entering your home, pause at the threshold. Breathe. Consciously leave outside energy outside. "I come home to my own field now."',
    },
    {
      name: 'Evening Field Review',
      duration: '3 min',
      how: 'At day\'s end: "Who is still in my field that I did not invite? What am I carrying that is not mine?" Name what you notice. Release with breath. Call your energy back: "Every part of me that I left somewhere today — I call it home now."',
    },
  ],
};

// ============ UNTETHERING MEDITATION ============

export const UNTETHERING_MEDITATION = {
  title: 'Untethering Meditation',
  essence: 'Releasing the invisible threads that tether you to old pain, old people, old patterns.',
  why: [
    'Most of us are quietly tethered. To the last painful conversation. To a person from years ago. To an old version of ourselves. To the need for a specific outcome.',
    'These tethers are subtle — they feel like normal thinking. But they pull energy from the present moment into the past or future constantly.',
    'Untethering is the practice of noticing these threads and letting them go. Not forcefully. Gently. Like setting down something heavy you forgot you were carrying.',
  ],
  duration: '15-20 minutes',
  fullScript: [
    {
      phase: 'Arrive',
      body: 'Sit or lie comfortably. Close your eyes. Take three slow breaths. Let the body settle.',
    },
    {
      phase: 'Notice the body',
      body: 'Scan from your head to your feet. Where does tension live right now? Simply notice.',
    },
    {
      phase: 'Invite the threads',
      body: 'Ask silently: "What am I still holding? Who am I still carrying? What story am I still looping?" Let images, names, feelings arise. Do not judge them. Simply let them come.',
    },
    {
      phase: 'Feel the tether',
      body: 'Choose one. Notice where in your body the tether connects. A tug in the chest. A weight in the belly. A knot in the throat.',
    },
    {
      phase: 'Witness it fully',
      body: 'Breathe into the place where the tether lives. Do not try to remove it yet. Just let it be seen. Often, being seen is already loosening it.',
    },
    {
      phase: 'Speak to it',
      body: 'Silently say to the tether (whatever it is — a person, a memory, a fear): "I see you. I thank you for what you tried to protect. I no longer need to hold you."',
    },
    {
      phase: 'Untether',
      body: 'Visualize the tether softening, loosening, dissolving. Not violently cut — gently released. Like rope slipping through your hand as you decide to let go.',
    },
    {
      phase: 'Feel the space',
      body: 'Notice what remains where the tether was. Emptiness. Lightness. Relief. Possibly grief. All welcome.',
    },
    {
      phase: 'Fill the space',
      body: 'Breathe into that newly open place. Let your own presence fill it. "This space is mine again."',
    },
    {
      phase: 'Close',
      body: 'Return to the breath. Hand on heart. "I am here. I am whole. I am home."',
    },
  ],
  afterNote:
    'Do not expect every tether to release in one sitting. Some are ancient and need to be untethered repeatedly before they fully dissolve. That is the practice. Return again.',
  pairsWith: 'Mirror Mode — first see what you are tethered to. Then untether.',
};
