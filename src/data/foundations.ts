/**
 * Within — Foundations.
 *
 * The educational layer that wraps around the practical features. Two parts:
 *   A. Healing Modalities — what the 12 practices in the app actually are
 *   B. Aligned Living — the 12 lifestyle pillars that hold the work up
 *
 * Each brief: ~250 words, 3 "do today" actions, link to a related practice.
 * All content original. Voice: the brand voice, with a touch more warmth
 * because these are teaching pieces.
 */

export type FoundationGroup = 'modality' | 'lifestyle';

export interface FoundationBrief {
  id: string;
  group: FoundationGroup;
  /** Short title, e.g. "The 8 Chakras" */
  title: string;
  /** Category label shown above the title in caps, e.g. "ENERGY ANATOMY" */
  kicker: string;
  /** One-sentence summary used in list views. */
  summary: string;
  /** ~200-300 word brief. Plain English. Sharp. */
  content: string;
  /** 3 "do this today" practical actions. */
  actions: string[];
  /** Internal app route to the related practice. */
  relatedRoute: string;
  /** Human label for the related-practice link. */
  relatedLabel: string;
  /** Hex color accent. */
  accent: string;
}

// ============================================================
// PART A — THE 12 HEALING MODALITIES
// ============================================================

const MODALITIES: FoundationBrief[] = [
  {
    id: 'energy-healing',
    group: 'modality',
    title: 'What energy healing actually is',
    kicker: 'THE FOUNDATION',
    summary: 'The body as a field of information. Why this is biology + intuition, not magic.',
    content:
      'Every cell in your body is electrical. Your heart sends a measurable electromagnetic field two metres beyond your skin. Your nervous system is constantly reading signals from inside you and outside you, mostly below conscious awareness. That field is what we mean by your energy.\n\nEnergy healing is the practice of paying attention to that field, on purpose. You learn to notice when you are tight, when you are leaking, when you are absorbing someone else\'s state. You learn to tend it the same way you tend a garden — clear what is heavy, water what is alive, give it light.\n\nIt is not magic. It is biology meeting intuition. The vagus nerve is real. So is co-regulation. So is the well-documented effect of breath, sound, gratitude, and gentle attention on the autonomic nervous system. The framework Within uses — chakras, frequencies, body-symptom mapping — is a language for talking about this field in a way that lets you actually do something with it.\n\nThe practical question is never "is this real." The practical question is: when you feel heavy, what tools do you have to lighten? When you feel scattered, what tools do you have to land? Energy healing is the answer.',
    actions: [
      'Sit still for 60 seconds. Notice what is loud in your body.',
      'Place a hand on your chest. Breathe slowly into it for 5 breaths.',
      'Step outside. Look at one tree. Notice if anything in you settles.',
    ],
    relatedRoute: '/methods',
    relatedLabel: 'See all healing methods →',
    accent: '#5645A6',
  },
  {
    id: 'chakras',
    group: 'modality',
    title: 'The 8 chakras — your energy spine',
    kicker: 'ENERGY ANATOMY',
    summary: 'The 8 centres that govern survival, emotion, power, love, voice, vision, spirit, and presence.',
    content:
      'The chakra system is an ancient map of the body that overlays seven (sometimes eight) energy centres along the spine. Each centre governs a category of life experience. Each one can be balanced, underactive, or overactive — and each shows up in your body and behaviour in specific ways.\n\nWithin uses eight: Root (survival, grounding), Sacral (emotion, creativity), Solar Plexus (power, will), Heart (love, relationships), Throat (truth, expression), Third Eye (intuition, vision), Crown (spirit, connection), Soul Star (presence, transcendence). Each has its own colour, its own sound (mantra), its own healing frequency in Hz, and its own typical "blocked" feeling.\n\nWhen something hurts in your life — physically or emotionally — the chakra map gives you a place to look. Lower back pain that won\'t leave is rarely just a back. It\'s often the Root chakra carrying fear of being unsupported. Throat tightness is rarely just a throat. It\'s the Throat chakra holding swallowed truth. The map is not a diagnosis; it is a doorway.\n\nYou do not have to believe in chakras to use them. You just have to notice that the map keeps producing useful answers. That, eventually, is the same thing as belief.',
    actions: [
      'Open the Chakra Map and notice which centre your eye lands on first.',
      'Read your "asking chakra" — your lowest Wheel of Life score.',
      'Spend 5 minutes with the LISTEN button on that chakra\'s page.',
    ],
    relatedRoute: '/chakra/heart',
    relatedLabel: 'Open the chakra map →',
    accent: '#9B5BA1',
  },
  {
    id: 'breathwork',
    group: 'modality',
    title: 'Breathwork — the bridge between body and mind',
    kicker: 'NERVOUS SYSTEM TOOL',
    summary: 'The fastest way to change your state. Sympathetic activates. Parasympathetic calms. Both balance.',
    content:
      'Breath is the only function of your nervous system that is both automatic and voluntary. You breathe whether you think about it or not. But you can also consciously change how you breathe — and when you do, your nervous system changes with it.\n\nThis is the entire mechanism. Long, slow, low-belly breathing tones the vagus nerve. Vagal tone tells the body the threat is over. Heart rate slows. Muscles release. The mind quiets. That is the parasympathetic side — calm, restore, digest.\n\nFast, forceful breathing does the opposite. It activates the sympathetic side — alert, energise, prepare. Done with intention, this is fuel. Done unconsciously, this is anxiety.\n\nThe Within breathwork library gives you both. Use Diaphragmatic, Box, Alternate Nostril, 4-7-8 when you need to come down. Use Breath of Fire, Alkaline, Soofi when you need to come up. Use Pranayama and Buteyko to balance. Each takes 3-15 minutes. Each works the first time.\n\nThis is the most reliable tool in the entire app. If you only ever use one practice from Within, make it a daily breath.',
    actions: [
      'Right now: inhale for 4, hold for 7, exhale for 8. Three times.',
      'Notice the difference. Name it.',
      'Pick one breath from the library to use as a daily anchor.',
    ],
    relatedRoute: '/breathwork-library',
    relatedLabel: 'Open the breathwork library →',
    accent: '#3F8A5F',
  },
  {
    id: 'sound-healing',
    group: 'modality',
    title: 'Sound healing & frequency',
    kicker: 'VIBRATION',
    summary: 'Why specific Hz tones shift your nervous system. The 8 chakra frequencies, what they do.',
    content:
      'Everything that exists vibrates. Your body is mostly water, and water carries vibration efficiently. When sound travels through water — through you — it can shift how your tissues hold tension and how your nervous system organises itself.\n\nThis is not new. Tibetan singing bowls, Vedic mantras, Sufi qawwali, gospel choirs, drum circles — every culture has used sound to change states. Modern research confirms what they knew: certain frequencies measurably reduce stress hormones, lower blood pressure, and shift brain wave patterns toward rest or focus.\n\nWithin uses eight specific tones, one for each chakra: LAM at 396Hz (root), VAM at 417Hz (sacral), RAM at 528Hz (solar plexus), YAM at 639Hz (heart), HAM at 741Hz (throat), OM at 852Hz (third eye), AUM at 963Hz (crown), AH at 1110Hz (soul star). Each can be played in the app — real audible tones, no audio file needed.\n\nUse them while you breathe. While you journal. While you fall asleep. The tone does not need your attention to do its work. It just needs to be in the room.',
    actions: [
      'Play the frequency for your asking chakra for 5 minutes today.',
      'Listen with headphones once. Notice if the tone feels good in your body.',
      'Pair the tone with a daily activity (working, cooking, lying down).',
    ],
    relatedRoute: '/chakra/heart',
    relatedLabel: 'Hear the frequencies →',
    accent: '#E8B83E',
  },
  {
    id: 'body-wisdom',
    group: 'modality',
    title: 'Body wisdom — what symptoms are saying',
    kicker: 'SOMATIC MAP',
    summary: 'Why physical symptoms hold psychological information. How to read your body without medicalising it.',
    content:
      'Your body remembers what your mind has forgotten. Tension stored in the shoulders is rarely just shoulders. The body holds emotional pattern, relational history, and unfinished psychological business in specific places — and the places repeat across people in ways that are too consistent to be coincidence.\n\nWithin draws on two well-known frameworks for reading this: a popular American one focused on quick mental patterns + affirmations, and a deeper psychologist-authored reference that maps each body symptom to specific childhood and relational archetypes. We synthesised both into our own original 50-symptom catalogue, written in our voice.\n\nFor each symptom you can browse, you get: a 2-3 sentence reading of what that body region tends to hold, the chakra it maps to, an affirmation to install, and a recommended protocol from the rest of the app.\n\nImportant: this is not medical diagnosis. If something hurts, see a doctor first. The body wisdom layer is for emotional exploration on top of, not instead of, medical care. But once you start reading your body this way, you stop asking only "what is wrong" and start asking "what is asking to be heard."',
    actions: [
      'Open Body Wisdom. Find the symptom you have lived with longest.',
      'Read the entry. Notice what lands and what does not.',
      'Do the recommended protocol once. See if anything shifts.',
    ],
    relatedRoute: '/body',
    relatedLabel: 'Read body wisdom →',
    accent: '#B33B3B',
  },
  {
    id: 'astrology',
    group: 'modality',
    title: 'Astrology — your cosmic blueprint',
    kicker: 'WHO YOU ARE',
    summary: 'Sun is identity. Moon is inner life. Rising is how you arrive. Transits are what the sky is doing to you.',
    content:
      'Astrology, at its useful level, is a personality framework — not a fortune-telling system. The position of the planets at the moment of your birth describes a pattern, the same way the position of the genes you inherited describes a pattern. You are not determined by either, but both shape your starting point.\n\nThe three most useful pieces of your chart are: your Sun (your core identity, what you are here to express), your Moon (your inner emotional landscape, what soothes you, what triggers you), and your Rising / Ascendant (how you first present in a room, the persona the world meets).\n\nBeyond those three, your full chart includes all the planets in their signs and houses, plus the aspects between them. Each planet rules a domain — Mercury for thought and communication, Venus for love and beauty, Mars for drive and conflict, etc. Their interplay describes your specific way of being human.\n\nThen there are transits — what the sky is doing right now, in relation to your birth chart. A Saturn transit asks for discipline. A Pluto transit asks for transformation. A Mercury retrograde asks for review. The app surfaces these as they arrive.\n\nUsed lightly, astrology is a language for self-understanding. Used heavily, it becomes superstition. Stay light.',
    actions: [
      'Enter your birth data once. Read your three big signs.',
      'Notice if your Sun description matches what you know about yourself.',
      'Watch the cosmic note on the home screen for transits this week.',
    ],
    relatedRoute: '/you/chart',
    relatedLabel: 'See your chart →',
    accent: '#5645A6',
  },
  {
    id: 'energy-blueprint',
    group: 'modality',
    title: 'Your Energy Blueprint',
    kicker: 'HOW YOU ARE WIRED',
    summary: 'Your Type, Strategy, Authority — the operating instructions for how to make decisions.',
    content:
      'Your Energy Blueprint is Within\'s name for what is widely called the Human Design system. It is a synthesis of astrology, the I-Ching, the Kabbalah Tree of Life, and the chakra system, distilled into a single chart that describes how your specific energy is wired.\n\nFor practical purposes, two pieces matter most: your Type and your Authority. Your Type tells you how your energy works at the most basic level — whether you are designed to wait and respond (Generator), to wait for invitation (Projector), to inform and act (Manifestor), to lunar-cycle (Reflector), or some combination. Your Authority tells you HOW to make a decision you will not regret — through your gut response, through emotional clarity over time, through speaking it out, or through your ego will.\n\nUsed simply, this blueprint stops you from making decisions in the wrong way for your wiring. A Projector who tries to push like a Manifestor burns out. A Generator who waits like a Projector misses the response. The relief of operating in alignment with your design is immediate and noticeable.\n\nThe app calculates your Blueprint from your birth data. Read your Type, internalise your Strategy, practice your Authority. The rest is iteration.',
    actions: [
      'Open your Energy Blueprint. Read your Type out loud.',
      'Read your Authority and notice the next decision you can apply it to.',
      'For one week, make decisions only the way your Authority recommends. Watch what happens.',
    ],
    relatedRoute: '/you/blueprint',
    relatedLabel: 'See your Blueprint →',
    accent: '#9B5BA1',
  },
  {
    id: 'meditation',
    group: 'modality',
    title: 'Meditation — the doorway home',
    kicker: 'STILLNESS',
    summary: 'Why a few minutes of stillness daily changes everything. The forms that work.',
    content:
      'Meditation is the practice of being with whatever is, without trying to change it. That is the whole instruction. Everything else — the mantras, the postures, the music, the apps — is scaffolding around that one move.\n\nThe research on what meditation does is now overwhelming. It thickens parts of the brain associated with emotional regulation. It shrinks the amygdala, the threat-detector. It lowers stress hormones, blood pressure, inflammation. People who meditate consistently are simply harder to throw off centre.\n\nThere are many forms. **Mantra meditation** uses repetition of a sound or phrase to give the mind an anchor. **Breath meditation** uses the in-and-out as the focus point. **Body scan** moves attention through the body slowly. **Open awareness** lets thoughts come and go without grabbing them. **Visualisation** uses imagery to install a state. **Walking meditation** uses motion as the anchor.\n\nThe form does not matter as much as the consistency. Five minutes daily beats one hour weekly. Twenty minutes daily begins to rewire the nervous system in three weeks.\n\nIn Within, every meditation is curated to land in 5-22 minutes. Pick one. Use it tomorrow morning. Then the next morning. Then the next.',
    actions: [
      'Choose one meditation from the library that sounds appealing right now.',
      'Set a five-minute timer. Sit. Breathe. That is the practice.',
      'Tomorrow, do it again. Same time, same place if you can.',
    ],
    relatedRoute: '/(tabs)/library',
    relatedLabel: 'Open the meditation library →',
    accent: '#3D9DC4',
  },
  {
    id: 'journaling',
    group: 'modality',
    title: 'Journaling — the writing cure',
    kicker: 'WRITTEN PRACTICE',
    summary: 'Why writing what you do not say changes neural pathways. The forms of journaling that work.',
    content:
      'Writing is metabolism for the mind. Things that are spinning in your head — fears, conflicts, half-formed insights — slow down enough to actually be looked at when you put them on paper. The act of choosing words to describe an inner state already begins to change the state.\n\nResearchers call this "expressive writing" and the data is consistent: people who journal about emotional experiences for 15-20 minutes a few times a week show measurable improvements in mood, immune function, and decision-making.\n\nDifferent forms serve different needs. **Stream-of-consciousness journaling** gets noise out — write whatever appears, no editing. **Prompted journaling** gives structure when you do not know where to start (Within\'s journal prompts do this). **Gratitude journaling** rewires the brain to notice what is working. **Letter writing** — the 8 Chakra Letters in this app — moves through structured release.\n\nYou do not need a beautiful notebook. You do not need to write every day. You just need to put thoughts down often enough that they do not pile up unread.\n\nWriting is the cheapest, most accessible, most evidence-backed therapeutic tool that exists. Use it.',
    actions: [
      'Right now, write three sentences about how you actually feel. No editing.',
      'Open today\'s journal prompt and answer it in two minutes.',
      'Tonight, write one thing you noticed today that you have not told anyone.',
    ],
    relatedRoute: '/(tabs)/journal',
    relatedLabel: 'Open journal →',
    accent: '#5C7559',
  },
  {
    id: 'gratitude',
    group: 'modality',
    title: 'Gratitude — the rewire',
    kicker: 'DAILY PRACTICE',
    summary: 'The neuroscience of looking for what is working. Why three things twice a day changes your baseline.',
    content:
      'Your brain is a pattern-recognition machine. Whatever you train it to look for, it will find more of. This is not philosophy; it is a basic property of the reticular activating system, the part of the brain that filters what reaches conscious awareness.\n\nGratitude is the practice of consciously training the brain to look for what is working, instead of defaulting to what is wrong. Done daily, even briefly, it measurably shifts mood, sleep quality, immune function, and the quality of your relationships. The effect is not subtle. It is large enough that it shows up in randomised controlled trials.\n\nThe form that works best is specific and frequent. Vague ("I\'m grateful for my family") fades. Specific ("I\'m grateful that my partner made coffee without me asking") wires in.\n\nWithin gives you a morning slot and an evening slot. Three things, twice a day. The morning version primes the day. The evening version closes it. The streak builds the habit. The habit changes the baseline.\n\nThis is the single highest-leverage practice in the entire app for the time required. Five minutes. Real change in three weeks.',
    actions: [
      'Open the Gratitude tab. Write three specific things from the last 24 hours.',
      'Tonight, do the evening version. Three things from today.',
      'Tomorrow morning, do it again. Just keep showing up.',
    ],
    relatedRoute: '/gratitude',
    relatedLabel: 'Open gratitude →',
    accent: '#3F8A5F',
  },
  {
    id: 'manifestation',
    group: 'modality',
    title: 'Manifestation — conscious creation',
    kicker: 'INTENTION',
    summary: 'What it actually is. What it is not. Why it works when it works, and why it fails when it fails.',
    content:
      'Manifestation is not magic. At its useful level, it is a practice of (1) getting clear about what you want, (2) becoming the kind of person to whom that thing belongs, and (3) taking the action available to you. The "law of attraction" framing is misleading because it suggests passivity. Real manifestation is highly active.\n\nWhat it actually does: clarity changes attention. Attention changes what you notice. Noticing changes what action becomes possible. Over time, your behaviour aligns with what you have committed to, and the world responds to your behaviour. This is mostly mundane and entirely real.\n\nWhat it does not do: it does not bypass action. It does not promise specific outcomes. It does not let you skip the work of becoming someone capable of holding what you say you want. People who treat manifestation as a substitute for effort are usually disappointed; people who treat it as direction-setting for effort tend to get results.\n\nThe practice: write what you want clearly, in present tense. Read it daily. Notice the small shifts in behaviour and opportunity that follow. Adjust. Repeat. The Vision Board in this app is a tool for this. The 21-day plans are tools for becoming the person who holds what you want.',
    actions: [
      'Write one specific thing you want — small or large — in present tense.',
      'Read it tomorrow morning.',
      'Take one small action toward it today.',
    ],
    relatedRoute: '/(tabs)/vision',
    relatedLabel: 'Open vision board →',
    accent: '#CFB57E',
  },
  {
    id: 'soul-star',
    group: 'modality',
    title: 'The 8th centre — Soul Star',
    kicker: 'BEYOND THE 7',
    summary: 'The eighth chakra, why it matters, and what it differentiates from the traditional seven.',
    content:
      'The classical chakra system has seven centres, from Root at the base of the spine to Crown at the top of the head. Within uses eight, adding the Soul Star — sometimes called the eighth chakra or the transpersonal centre — which sits roughly 20-30 cm above the crown.\n\nThe Soul Star is not about your day-to-day life. The other seven centres handle that. The Soul Star handles your relationship to time itself, to presence, to the part of you that existed before you were born and will continue after this body ends. Its blocking pattern is the illusion of being limited by time and space — the rushing, the "running out of time" feeling, the inability to rest in the present.\n\nIts opposite is expansion: the felt sense that you are not only your body, not only your role, not only your story. You are the awareness inside which all of those appear.\n\nIts sound is AH at 1110Hz — the highest of the eight tones. Its location is just above your head — close your eyes, place attention there, and you will likely feel it.\n\nWhy include it. Because for many users, the work of the lower seven only makes sense when the eighth is at least felt. The Soul Star is what gives the rest meaning.',
    actions: [
      'Close your eyes. Place attention 20cm above your head. Just notice.',
      'Play the AH 1110Hz tone for 5 minutes.',
      'Open the Soul Star chakra page and read its full description.',
    ],
    relatedRoute: '/chakra/soul-star',
    relatedLabel: 'Open Soul Star →',
    accent: '#C9B7E5',
  },
];

// ============================================================
// PART B — THE 12 ALIGNED LIVING PILLARS
// ============================================================

const LIFESTYLE: FoundationBrief[] = [
  {
    id: 'sleep',
    group: 'lifestyle',
    title: 'Sleep & circadian rhythm',
    kicker: 'NON-NEGOTIABLE',
    summary: 'Real reset is not optional. Why screens before bed undo a day of work.',
    content:
      'Sleep is when the body does its actual maintenance. Tissue repair, hormone reset, memory consolidation, the lymphatic clearing of metabolic waste from the brain — all of it happens during deep sleep. Without it, no other practice in the app holds.\n\nThe single most important thing for sleep is consistency. Going to bed and waking at the same time every day, including weekends, lets your circadian rhythm stabilise. Your hormones — cortisol, melatonin, growth hormone — run on a daily clock that gets confused by erratic schedules.\n\nThe second most important thing is light. Bright light in the morning anchors the day clock. Dim light in the evening tells your body it is night. Screens disrupt this powerfully. The blue spectrum coming from phones and laptops mimics noon sunlight to your retina; your brain stops producing melatonin when it sees it. An hour of phone before sleep can cost you 30-60 minutes of deep sleep.\n\nThe third is temperature. Your body temperature naturally drops as you fall asleep. A cool bedroom (16-19°C / 60-67°F) helps the drop happen. A warm bedroom interferes.\n\nProtect your sleep first, every night. Everything else gets easier.',
    actions: [
      'Set a consistent bedtime — within 30 minutes — for the next seven nights.',
      'Turn off screens 60 minutes before bed. Read a book, write, or talk instead.',
      'Get 5 minutes of morning sunlight on your face within an hour of waking.',
    ],
    relatedRoute: '/breathwork/breath-4-7-8',
    relatedLabel: 'Try the sleep breath →',
    accent: '#5645A6',
  },
  {
    id: 'nourishment',
    group: 'lifestyle',
    title: 'Nourishment — food as information',
    kicker: 'WHAT YOU EAT',
    summary: 'Not fuel. Information. Basics without dogma.',
    content:
      'Food is more than calories. Every bite is information your body uses to build cells, regulate mood, make hormones, and modulate inflammation. The same body eating the same number of calories from different sources will look, feel, and function very differently.\n\nThere is no single right diet for every body. There are, however, almost-universal principles. Eat mostly whole foods, recognisable as having come from a plant or an animal. Minimise the highly processed end of the spectrum — the stuff with a long ingredient list, designed to be irresistible. Drink water throughout the day. Eat enough protein at each meal to actually feel satisfied (most people eat too little). Include plenty of fibre for the gut microbiome. Pay attention to which foods leave you energised and which leave you sluggish.\n\nBeyond that, you have to experiment for your own body. Some people thrive on a high-carb plant-based pattern. Some need more animal protein. Some are sensitive to gluten or dairy. The only way to know is to try, observe, and adjust.\n\nDo not turn food into a religion. The relationship to food matters as much as the food itself. A meal eaten in calm, with attention, with people you love, nourishes you in ways no superfood can replace.',
    actions: [
      'Drink a glass of water right now.',
      'For one meal today, eat slowly enough to actually taste it.',
      'Notice which food you ate this week left you feeling best in the body.',
    ],
    relatedRoute: '/methods',
    relatedLabel: 'See healing methods →',
    accent: '#3F8A5F',
  },
  {
    id: 'movement',
    group: 'lifestyle',
    title: 'Movement — daily, varied, joyful',
    kicker: 'BODY IN MOTION',
    summary: 'What kind, how often, why daily.',
    content:
      'Your body was designed to move. Sedentary life is a recent invention that your physiology has not adapted to. The single best predictor of long-term health, across virtually every study, is the amount and variety of movement someone gets across decades.\n\nWhat counts: walking, stretching, yoga, dancing, gardening, lifting weights, swimming, climbing stairs, playing with children, having sex. All of it. The label matters less than the consistency.\n\nThe basic pattern that works for almost everyone: move every day, even briefly, and make at least some of that movement vigorous enough to raise your heart rate. Add resistance training (weights, bodyweight, resistance bands) twice a week to maintain muscle and bone — both of which decline measurably with age unless actively maintained. Add some form of mobility work (yoga, stretching, tai chi) to keep joints and tissues supple.\n\nFor an aligned soul journey specifically, choose forms of movement that you actually enjoy. The wellness industry sells suffering disguised as discipline. The best movement practice is one you would do even if no one was watching.\n\nNotice the difference between exhaustion and energising fatigue. Real movement gives you back more energy than it takes.',
    actions: [
      'Walk for 10 minutes today. Outside if possible.',
      'Stretch for 5 minutes before bed.',
      'This week, try one form of movement you have not done in years.',
    ],
    relatedRoute: '/breathwork/breath-grounding',
    relatedLabel: 'Try grounding breath →',
    accent: '#3F8A5F',
  },
  {
    id: 'nature',
    group: 'lifestyle',
    title: 'Nature & grounding',
    kicker: 'EARTH CONTACT',
    summary: 'Why barefoot earth time changes inflammation, mood, and sleep.',
    content:
      'Direct contact with the earth — barefoot grass, sand, soil, stone — has measurable physiological effects. Studies show reductions in inflammation markers, improvements in heart-rate variability, better sleep quality, and faster wound healing in people who spend time grounded.\n\nThe proposed mechanism: the earth\'s surface carries a slight negative charge. Your body, especially in the modern environment of synthetic materials and electronic devices, accumulates positive charge. Direct contact equalises the two, behaving like a low-grade antioxidant. The science is still emerging, but the practical experience is consistent: people who spend more time outside, in contact with natural surfaces, feel better.\n\nBeyond grounding specifically, time in nature does things that nothing else does. The Japanese practice of shinrin-yoku — forest bathing — has documented effects on stress hormones, immune function, and mood. Living near green space lowers depression rates. Even looking at images of natural environments lowers blood pressure.\n\nThe modern world keeps us indoors and on screens for hours every day. The body interprets this as a kind of constant low-grade emergency. Time in nature is not a luxury. It is a basic input the body needs to function correctly.',
    actions: [
      'Go outside today. Bare feet on grass or earth for 10 minutes.',
      'Eat one meal outside this week.',
      'Walk in a park, forest, or near water without your phone.',
    ],
    relatedRoute: '/energy-hygiene',
    relatedLabel: 'Energy hygiene practice →',
    accent: '#3F8A5F',
  },
  {
    id: 'sacred-space',
    group: 'lifestyle',
    title: 'Sacred home & space',
    kicker: 'YOUR ENVIRONMENT',
    summary: 'Your home is a daily prayer. How to clear it.',
    content:
      'You become the rooms you spend time in. Your nervous system is constantly absorbing the state of the spaces around you — the clutter, the light, the smells, the sounds, the energy of the people who have been there.\n\nA disorganised, cluttered, badly-lit space puts the nervous system into low-grade vigilance. A clean, intentional, well-lit space lets the nervous system settle. You do not have to live in a magazine. You do have to take responsibility for the energy of where you live.\n\nThe basics: every day, clear surfaces. Make the bed. Open a window. Once a week, do a deeper clean. Once a month, walk through every room and remove things you do not love or use. Add things that bring you joy — plants, candles, art, scent, music. Pay attention to lighting; warm lamps in the evening, bright natural light in the morning.\n\nFor energetic clarity beyond the physical: many traditions recommend periodic "clearing" practices — burning sage or palo santo, ringing bells, opening windows after a heavy conversation, playing high-frequency music. The mechanism is partly literal (smoke and sound do alter the air) and partly ritual (the act of doing them resets the space in your own perception).\n\nClear daily. Clean weekly. Curate monthly. Live in a space that holds you.',
    actions: [
      'Clear one surface in your home right now.',
      'Open every window in your home for 5 minutes today.',
      'This week, remove one item you keep but do not love or use.',
    ],
    relatedRoute: '/energy-hygiene',
    relatedLabel: 'Energy hygiene practice →',
    accent: '#E07A2C',
  },
  {
    id: 'relationships',
    group: 'lifestyle',
    title: 'Relationships & boundaries',
    kicker: 'WHO YOU ARE WITH',
    summary: 'Who you spend time with becomes you. Energetic hygiene with humans.',
    content:
      'You are the average of the five people you spend the most time with. This is roughly true at the level of habits, language, mood, ambitions, and even nervous system regulation. We are deeply social animals; co-regulation is constant whether we notice it or not.\n\nAligned living means being intentional about who you are around. Not in a transactional way — but in an honest assessment of which relationships leave you more yourself, and which leave you smaller, more anxious, more performative. This is not about cutting people off; it is about being awake to the effect different people have on your state.\n\nBoundaries are the practical expression of this. A boundary is not a wall against someone; it is a clear statement of what you will and will not do. "I cannot talk about this right now." "I am not available for this conversation." "I love you and I am going to bed." Said cleanly, without apology, boundaries protect your energy without damaging the relationship.\n\nFor the empath or highly sensitive person specifically: you are absorbing more than other people are absorbing. Daily energy hygiene is not optional for you. Time alone after high-stimulation days is not selfish; it is maintenance.\n\nLove deeply. Choose carefully. Protect your energy on purpose.',
    actions: [
      'Name the three people whose presence reliably leaves you more yourself.',
      'Name one boundary you have been avoiding. Hold it this week.',
      'Schedule alone time this week the way you schedule meetings.',
    ],
    relatedRoute: '/relationships',
    relatedLabel: 'Open relationships hub →',
    accent: '#3F8A5F',
  },
  {
    id: 'digital-hygiene',
    group: 'lifestyle',
    title: 'Digital hygiene & dopamine',
    kicker: 'YOUR DEVICES',
    summary: 'Your phone is rewiring your nervous system. What to do about it.',
    content:
      'The apps on your phone are designed by some of the smartest engineers and behavioural scientists in the world to maximise the time you spend on them. They do this by exploiting the dopamine system — the reward pathway that learned, across millions of years, to seek food, mates, and safety. Variable-reward feeds, infinite scroll, push notifications, like counts: all of it is calibrated to keep you tapping.\n\nThis matters for your soul journey because constant low-grade dopamine hits raise your baseline arousal, lower your tolerance for stillness, and erode your ability to sit with uncomfortable feelings — which is the entire foundation of healing work. You cannot meditate easily, journal honestly, or be present in your relationships if your nervous system is calibrated to expect a hit every 20 seconds.\n\nThe interventions that actually work are environmental, not willpower-based. Move social apps off your home screen. Turn off all non-human notifications. Charge your phone outside the bedroom. Set specific times to check email rather than checking continuously. Use greyscale mode. Delete the apps you cannot moderate.\n\nThe goal is not asceticism. The goal is reclaiming your attention as something you choose how to spend, not something hijacked by design.',
    actions: [
      'Turn off non-essential notifications on your phone right now.',
      'Move one social app off your home screen.',
      'Tonight, charge your phone outside your bedroom.',
    ],
    relatedRoute: '/energy-hygiene',
    relatedLabel: 'Energy hygiene practice →',
    accent: '#A09784',
  },
  {
    id: 'service',
    group: 'lifestyle',
    title: 'Service & contribution',
    kicker: 'BEYOND YOURSELF',
    summary: 'The fastest way out of self-loop is helping someone else.',
    content:
      'Most modern suffering is some version of being trapped inside your own head. The mind loops on its own problems, its own failures, its own future, its own image. The loop intensifies in proportion to how much attention is on it.\n\nService — actually helping someone else, not just thinking about it — is the most reliable break in the loop. Volunteer. Cook for someone who is grieving. Teach what you know. Listen to someone without trying to fix them. Visit an elder. Write the recommendation letter. Send the encouraging text.\n\nThis is not about being a good person. It is about a basic property of attention. Attention to someone else\'s real situation crowds out attention to your imagined one. The relief is immediate and physiological.\n\nBeyond the immediate effect, sustained service builds something deeper: a sense that your life has a use beyond your own enjoyment. People who feel useful are more resilient, less depressed, longer-lived. The mechanism is partly social and partly meaning-making — but the result is consistent across cultures and centuries.\n\nThe scale does not matter. Tiny acts count. Daily counts more than grand and rare. Aligned living includes being of use.',
    actions: [
      'Do one small kind thing for someone today, anonymously if possible.',
      'This week, volunteer one hour somewhere local.',
      'Send one message of appreciation you have been meaning to send.',
    ],
    relatedRoute: '/methods',
    relatedLabel: 'See methods →',
    accent: '#3F8A5F',
  },
  {
    id: 'money',
    group: 'lifestyle',
    title: 'Money & abundance mindset',
    kicker: 'INHERITED BELIEFS',
    summary: 'Money is energy. The beliefs you have about it are mostly inherited.',
    content:
      'Most of your relationship to money was set before you were ten years old, in your childhood household, in the way money was talked about (or not talked about), in the energy of the adults around it. Whether you grew up in scarcity, in abundance, in shame, in conflict — that energy is still in your body, running your financial choices today, even if you have changed your circumstances entirely.\n\nThis is why people who were raised poor often feel poor even after they are wealthy, and people raised wealthy often feel entitled to wealth they did not personally earn. The bank balance changes faster than the nervous system does.\n\nAligned living with money means doing the work to update your inherited story. The practical version: notice when you flinch around money — when you avoid looking at your accounts, when you over-give, when you under-charge, when you feel guilty for wanting more, when you feel anxious about having less. Each flinch is a clue to a belief that runs underneath.\n\nThe Build Abundance plan in this app is designed for this work specifically. The Solar Plexus chakra is the centre that holds money beliefs — work there. The journaling questions matter more than any financial spreadsheet you will ever build.\n\nMoney is energy. Update what you believe about it. Watch what changes.',
    actions: [
      'Write one money belief you inherited from your family.',
      'Notice one place this week where you flinch around money.',
      'Open the Build Abundance 21-day plan. Read Day 1.',
    ],
    relatedRoute: '/plan/build-abundance',
    relatedLabel: 'Open Build Abundance →',
    accent: '#E8B83E',
  },
  {
    id: 'sexuality',
    group: 'lifestyle',
    title: 'Sexuality & sensuality',
    kicker: 'THE BODY AS PLEASURE',
    summary: 'The body as a place of pleasure, not just performance.',
    content:
      'Sexuality is one of the most charged topics in any culture and one of the most heavily edited parts of most peoples\' lives. Almost everyone carries some version of inherited shame, religious caution, performance anxiety, comparison wounds, or trauma — and almost no one talks about it directly. So the body, which was designed for pleasure, becomes a place of confusion or numbness or performance instead.\n\nAligned living means reclaiming the body as a source of joy. This is broader than sex specifically. Sensuality includes everything you do that brings the body pleasure — the way you eat, the way you move, the way you touch your own skin, the way you let yourself be touched, the way you dance when no one is watching, the way you stand in the sun.\n\nIf sex specifically has been hard for you — through trauma, religion, body shame, mismatched libido in a relationship — that is not a personal failing. It is information. The Sacral chakra holds this and the work to clear it is the same work as any other chakra: gentle, consistent, with safety.\n\nFor most people, the simplest first step is sensuality without sex: notice the body as a pleasure-receiving organ. The deeper work follows.',
    actions: [
      'Take a slow shower today. Notice the water without rushing.',
      'Eat one bite of food today with full sensory attention.',
      'Move your body for one song the way it wants to move.',
    ],
    relatedRoute: '/chakra/sacral',
    relatedLabel: 'Open Sacral chakra →',
    accent: '#E07A2C',
  },
  {
    id: 'death-awareness',
    group: 'lifestyle',
    title: 'Death awareness',
    kicker: 'MEMENTO MORI',
    summary: 'How knowing this ends makes the work matter.',
    content:
      'The philosophical practice of remembering that you will die — known by the Latin phrase memento mori — is one of the oldest and most practically useful contemplative tools in human history. Every wisdom tradition has some version of it. The reason it shows up everywhere is that it works.\n\nAvoidance of death is the dominant cultural mode in most modern societies. We hide the dying in hospitals, talk about loss in euphemism, fill our days with distractions that work partly because they let us not think about how brief this all is. The result is a strange, low-grade unreality — a sense that life is rehearsal, that the real thing starts later.\n\nDeath awareness reverses this. When you actually know — not just intellectually, but in the body — that this is finite, the small things sharpen. You stop postponing. You forgive faster. You say what you mean. You pay attention. You get clear about what you actually want to do with the years you have.\n\nThe practice is simple: occasionally, on purpose, contemplate the fact of your death. Not morbidly. Just truly. Notice what becomes important when nothing is permanent. Notice what becomes unimportant.\n\nThis is not depressing. Done right, it is the opposite. It is what makes everything matter.',
    actions: [
      'Today, do one thing you have been postponing because you assumed you had time.',
      'Tell one person something you have not said clearly enough.',
      'Spend five minutes imagining your own funeral. Notice what you wish you had done.',
    ],
    relatedRoute: '/chakra/soul-star',
    relatedLabel: 'Open Soul Star →',
    accent: '#A09784',
  },
  {
    id: 'lineage',
    group: 'lifestyle',
    title: 'Lineage & ancestors',
    kicker: 'WHAT YOU CARRY',
    summary: 'What you carry that is not yours. What you carry that is.',
    content:
      'You did not arrive here from nowhere. Behind you are two parents, four grandparents, eight great-grandparents — and on, exponentially. By ten generations back, you have over a thousand direct ancestors who survived long enough to have children. Their patterns, traumas, gifts, and unhealed wounds are partly in you, in your DNA, in your nervous system, in the family stories you absorbed before you had words.\n\nEpigenetics — the study of how environmental and emotional experiences alter gene expression and pass to descendants — has confirmed what every wisdom tradition already knew. Trauma travels generations. So do gifts. So do beliefs about what is possible.\n\nAligned living includes some awareness of this lineage. What patterns do you carry that did not start with you? What family wounds do you keep enacting? What family gifts do you forget to claim? Whose story are you carrying that you could set down?\n\nThis is not blame work. Most of your ancestors did the best they could with what they had. It is honesty work — seeing clearly what is yours and what is inherited, so you can choose what to keep and what to release. Many people experience profound shifts when they grieve, thank, or symbolically release a specific ancestor.\n\nWhat ends with you, ends. What you heal, heals backward and forward.',
    actions: [
      'Name one pattern in your family that you do not want to pass down.',
      'Write a short letter to an ancestor you never met. Do not send it.',
      'Identify one inherited gift you have not yet fully claimed.',
    ],
    relatedRoute: '/letter/heart',
    relatedLabel: 'Open the chakra Letters →',
    accent: '#5645A6',
  },
];

// ============================================================
// EXPORT
// ============================================================

export const FOUNDATIONS_BRIEFS: FoundationBrief[] = [...MODALITIES, ...LIFESTYLE];

export function getFoundationBrief(id: string): FoundationBrief | undefined {
  return FOUNDATIONS_BRIEFS.find((b) => b.id === id);
}

export function getModalities(): FoundationBrief[] {
  return MODALITIES;
}

export function getLifestyle(): FoundationBrief[] {
  return LIFESTYLE;
}
