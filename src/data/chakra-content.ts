/**
 * SOMA - Chakra Educational Content
 * Written for beginners with zero prior knowledge of energy healing.
 * All content ORIGINAL. Do not reference Dr. Espen / Quantum Academy.
 */

export type ChakraId = 'root' | 'sacral' | 'solar-plexus' | 'heart' | 'throat' | 'third-eye' | 'crown';

export interface ChakraFullContent {
  id: ChakraId;
  name: string;
  sanskritName: string;
  number: number;
  color: string;
  element: string;
  mantra: string;
  location: string;
  locationDetail: string;

  // Learn — educational
  simpleDefinition: string;     // 1 sentence a total beginner understands
  whatItGoverns: string;         // 3-4 sentences
  scienceNote: string;           // nervous system / physiology link
  sense: string;                 // associated sense

  // The blocking feeling (the shadow)
  shadowFeeling: string;         // "Fear" / "Guilt" etc.
  shadowDescription: string;     // what this feeling feels like in the body

  // Diagnostic
  signsOfBalance: string[];       // 5 bullet points
  signsOfImbalance: string[];     // 5 bullet points

  // Affirmations (7 per chakra)
  affirmations: string[];

  // Healing framing
  healingInvitation: string;     // how we heal this chakra (1 paragraph)
}

export const CHAKRA_CONTENT: Record<ChakraId, ChakraFullContent> = {
  root: {
    id: 'root',
    name: 'Root',
    sanskritName: 'Muladhara',
    number: 1,
    color: '#6B1F1F',
    element: 'Earth',
    mantra: 'LAM',
    location: 'Base of the spine',
    locationDetail: 'Between the pelvic floor and the tailbone',

    simpleDefinition:
      'The Root is your foundation — the part of you that says "I am safe, I belong here, I have a right to exist."',
    whatItGoverns:
      'Your Root governs your sense of safety, belonging, and basic trust in life. It\'s your body\'s "home base" — responsible for your survival instinct, your nervous system\'s baseline, and your relationship with money, shelter, and the physical world. When your Root is settled, you move through life with a quiet certainty that you are held.',
    scienceNote:
      'The Root corresponds to the sympathetic/parasympathetic nervous system balance. When fear dominates, your vagus nerve tone drops and your body stays in low-grade fight-or-flight. Regulating the breath lifts vagal tone and signals safety to the entire system.',
    sense: 'Smell',

    shadowFeeling: 'Fear',
    shadowDescription:
      'Fear in the Root feels like tightness in the hips, a held breath, legs that never quite relax, a mind scanning for threat. It often comes from childhood experiences of instability — financial stress, unsafe environments, or caregivers who couldn\'t be present.',

    signsOfBalance: [
      'You sleep deeply and feel rested',
      'Your body feels grounded, heavy in a good way',
      'You trust that you have what you need',
      'You handle stress without spiraling',
      'You feel present in your body',
    ],
    signsOfImbalance: [
      'Chronic anxiety, racing mind, can\'t settle',
      'Financial stress feels existential',
      'Tight hips, lower back pain, digestive issues',
      'Trouble trusting others or the universe',
      'Feeling unwelcome in your own life',
    ],

    affirmations: [
      'I am safe in this body, in this moment, in this life.',
      'The ground beneath me has never left.',
      'I belong here. I have always belonged here.',
      'I have what I need. More is on its way.',
      'My body is my home, and my home is safe.',
      'I release the fear I inherited. It was never mine.',
      'I am rooted, and I am rising.',
    ],

    healingInvitation:
      'We heal the Root through slowing down the breath, feeling the body, and letting the earth hold what we cannot. Fear releases when we stop fighting it and instead welcome it like a tired child — listening, breathing, and reminding the body that the moment is actually safe.',
  },

  sacral: {
    id: 'sacral',
    name: 'Sacral',
    sanskritName: 'Svadhisthana',
    number: 2,
    color: '#C2712C',
    element: 'Water',
    mantra: 'VAM',
    location: 'Lower belly',
    locationDetail: 'Two inches below the navel',

    simpleDefinition:
      'The Sacral is your flow — the part of you that allows pleasure, creativity, and emotion to move through you freely.',
    whatItGoverns:
      'Your Sacral governs emotion, creativity, sensuality, and your capacity for joy. It\'s where you feel desire, make things, connect intimately, and experience pleasure. When this chakra flows, life feels juicy and inspired. When it\'s blocked, you feel numb, joyless, or guilty for wanting what you want.',
    scienceNote:
      'The Sacral area houses the enteric nervous system — the "gut brain" — which produces the majority of your serotonin. Emotional suppression here creates physical tension in the hips and digestive system. Releasing this area is linked to emotional catharsis.',
    sense: 'Taste',

    shadowFeeling: 'Guilt',
    shadowDescription:
      'Guilt in the Sacral feels like low-grade heaviness in the hips and belly, a flinch when someone offers you something nice, an apology that lives on your lips. It often comes from being taught that wanting is selfish, or from carrying blame that was never yours to carry.',

    signsOfBalance: [
      'You feel creative, inspired, alive',
      'You can enjoy pleasure without guilt',
      'Emotions move through you — they don\'t stick',
      'Your hips feel fluid, not locked',
      'You ask for what you want',
    ],
    signsOfImbalance: [
      'Chronic guilt, apologizing for existing',
      'Numbness, disconnection from desire',
      'Hip tightness, lower back pain, reproductive issues',
      'Difficulty feeling or expressing emotion',
      'Creative block, feeling uninspired',
    ],

    affirmations: [
      'I am allowed to feel all of this.',
      'My desires are sacred. My pleasure is medicine.',
      'I release what was never mine to carry.',
      'I create from a place of joy, not obligation.',
      'I am fluid. Life moves through me.',
      'I deserve goodness. I receive it now.',
      'My emotions are not a burden. They are a language.',
    ],

    healingInvitation:
      'We heal the Sacral through movement, breath, and permission. Guilt dissolves when it is witnessed without judgment and given somewhere to go. The invitation is to feel what you have been holding — the body knows what to do when we stop gripping.',
  },

  'solar-plexus': {
    id: 'solar-plexus',
    name: 'Solar Plexus',
    sanskritName: 'Manipura',
    number: 3,
    color: '#D9B24C',
    element: 'Fire',
    mantra: 'RAM',
    location: 'Upper belly',
    locationDetail: 'Just below the ribs, in the center',

    simpleDefinition:
      'The Solar Plexus is your fire — the part of you that knows "I am worthy. I have the right to take up space."',
    whatItGoverns:
      'Your Solar Plexus governs personal power, self-worth, confidence, and your relationship with money and success. It\'s where you make decisions, set boundaries, and claim your place in the world. When this chakra is strong, you walk through life grounded in your own value. When it\'s wounded, you shrink, over-give, or chase external validation.',
    scienceNote:
      'The Solar Plexus sits at the location of the adrenal glands and the vagus nerve branch that controls digestion. Chronic shame and self-criticism correlate with adrenal fatigue and low-grade inflammation. Restoring this area is key to reversing burnout.',
    sense: 'Sight',

    shadowFeeling: 'Shame',
    shadowDescription:
      'Shame in the Solar Plexus feels like a knot just below the ribs, a collapse in the chest, a quiet voice saying "who do you think you are?" It often comes from being made to feel small — by a parent, a partner, a culture, or a wound around money and worth.',

    signsOfBalance: [
      'You feel confident without needing to prove it',
      'You can say no without explanation',
      'You trust your decisions',
      'Money feels neutral — not loaded with shame',
      'You can receive praise without deflecting',
    ],
    signsOfImbalance: [
      'Chronic self-doubt, imposter feelings',
      'Over-apologizing, over-explaining, over-giving',
      'Digestive issues, low energy, adrenal fatigue',
      'Money wounds: hoarding, self-sabotage, shame',
      'Perfectionism as a way to earn worth',
    ],

    affirmations: [
      'My worth was never up for debate.',
      'I am not what they said I was.',
      'I take up the space I was born to take.',
      'I am allowed to want. I am allowed to have.',
      'My power is quiet, and it is real.',
      'Money flows to me because I flow with it.',
      'I am the fire that cannot be put out.',
    ],

    healingInvitation:
      'We heal the Solar Plexus by burning through shame with breath and truth. The fire we rekindle is not aggressive — it\'s clean. The work is recognizing that shame was put on you by people who couldn\'t see you, and returning it gently to where it belongs: not with you.',
  },

  heart: {
    id: 'heart',
    name: 'Heart',
    sanskritName: 'Anahata',
    number: 4,
    color: '#6B8F71',
    element: 'Air',
    mantra: 'YAM',
    location: 'Center of the chest',
    locationDetail: 'At the sternum, between the breasts',

    simpleDefinition:
      'The Heart is your bridge — the part of you that can hold both grief and love, and know they are made of the same thing.',
    whatItGoverns:
      'Your Heart governs love, compassion, connection, and your capacity to be both open and boundaried. It\'s the chakra that holds grief as gracefully as joy. When your Heart is clear, you love without losing yourself. When it\'s armored, you protect yourself from connection that might hurt again.',
    scienceNote:
      'The Heart chakra corresponds to the thymus gland (immune function) and the cardiac ganglia — often called the "heart brain." It has 40,000+ neurons of its own. Heart rate variability (HRV) improves dramatically with compassion practices, supporting immunity and emotional resilience.',
    sense: 'Touch',

    shadowFeeling: 'Grief',
    shadowDescription:
      'Grief in the Heart feels like weight on the chest, a held breath that never quite releases, an ache that comes in waves. It\'s the cost of having loved. Unmet grief hardens the heart — we close to protect what\'s already been wounded.',

    signsOfBalance: [
      'You can love deeply without losing yourself',
      'You feel connected to others and yourself',
      'Your chest feels open, breath flows easily',
      'You forgive without forgetting',
      'You can receive love as easily as give it',
    ],
    signsOfImbalance: [
      'Chest tightness, shallow breath, heaviness',
      'Holding grudges, unable to forgive',
      'Fear of intimacy, walls up',
      'Over-giving, caretaking, no boundaries',
      'Feeling unloved even when you are',
    ],

    affirmations: [
      'My heart did not break. It opened.',
      'I am allowed to grieve. Grief is love with nowhere to go.',
      'I give love without losing myself.',
      'I receive love as easily as I give it.',
      'I forgive, not for them, but for my own freedom.',
      'I loved. I lost. I am still here.',
      'My heart is soft and strong at the same time.',
    ],

    healingInvitation:
      'We heal the Heart not by fixing it, but by letting it feel what it has been holding. Grief wants to move. When we stop bracing and let the tears (or the silence) come, the heart remembers what it is made for: loving, even now.',
  },

  throat: {
    id: 'throat',
    name: 'Throat',
    sanskritName: 'Vishuddha',
    number: 5,
    color: '#3E6A8C',
    element: 'Ether',
    mantra: 'HAM',
    location: 'Throat',
    locationDetail: 'Hollow of the throat, at the collarbone',

    simpleDefinition:
      'The Throat is your voice — the part of you that speaks your truth even when it shakes.',
    whatItGoverns:
      'Your Throat governs self-expression, truth-telling, and authentic communication. It\'s where what you feel in the heart becomes what you say in the world. When open, you speak your truth with clarity. When blocked, you swallow words, people-please, or go silent when it matters most.',
    scienceNote:
      'The throat sits at the vagus nerve\'s passage point — the single most important nerve for nervous system regulation. Singing, humming, and vocal toning directly stimulate the vagus nerve, lifting parasympathetic tone and restoring calm.',
    sense: 'Hearing',

    shadowFeeling: 'Suppression',
    shadowDescription:
      'Suppression in the Throat feels like a lump you can\'t swallow, a tight jaw, words that stay stuck in the chest. It comes from being told — directly or indirectly — that your voice was too much, too loud, too different, or that speaking up was dangerous.',

    signsOfBalance: [
      'You speak your truth, even when it\'s hard',
      'You listen as well as you speak',
      'Your jaw and throat feel relaxed',
      'You set boundaries with kindness and clarity',
      'You don\'t over-explain or apologize',
    ],
    signsOfImbalance: [
      'Lump in the throat, chronic jaw tension',
      'People-pleasing, fawning, fear of speaking up',
      'Voice goes quiet under pressure',
      'Thyroid or throat issues',
      'Journaling feels easier than speaking',
    ],

    affirmations: [
      'My voice is not too much. It was always enough.',
      'I speak what is true, even when it shakes.',
      'My silence was survival. My voice is freedom.',
      'I am heard. I was always worth hearing.',
      'I say yes to what nourishes me. I say no to what depletes me.',
      'My throat is open. My truth moves through.',
      'I express. I release. I am free.',
    ],

    healingInvitation:
      'We heal the Throat through voice — humming, singing, toning, or finally saying out loud what we\'ve been holding. The vagus nerve responds to vibration. When you make sound, your nervous system knows: the silencing is over.',
  },

  'third-eye': {
    id: 'third-eye',
    name: 'Third Eye',
    sanskritName: 'Ajna',
    number: 6,
    color: '#3B3564',
    element: 'Light',
    mantra: 'OM',
    location: 'Between the eyebrows',
    locationDetail: 'The space just above and between your eyes',

    simpleDefinition:
      'The Third Eye is your inner vision — the part of you that knows before you can explain how.',
    whatItGoverns:
      'Your Third Eye governs intuition, clarity, perception, and the ability to see truth beyond what\'s in front of you. It\'s not mystical — it\'s the part of you that pattern-matches, reads between the lines, and knows what\'s really going on. When open, you trust your inner knowing. When blocked, you spiral in overthinking.',
    scienceNote:
      'The Third Eye corresponds to the pineal gland — a tiny gland that produces melatonin and regulates sleep-wake cycles. It\'s also linked to the prefrontal cortex, responsible for clear thinking and decision-making. Calm breath restores access to both.',
    sense: 'Intuition',

    shadowFeeling: 'Doubt',
    shadowDescription:
      'Doubt in the Third Eye feels like mental fog, rumination, second-guessing every decision, outsourcing your knowing to everyone but yourself. It comes from being taught not to trust what you saw, felt, or knew — especially as a child.',

    signsOfBalance: [
      'You trust your gut, even when it\'s inconvenient',
      'You can focus and think clearly',
      'Your dreams feel vivid and meaningful',
      'You see patterns others miss',
      'You make decisions without spinning',
    ],
    signsOfImbalance: [
      'Overthinking, constant mental chatter',
      'Headaches, pressure between the eyes',
      'Trouble making decisions',
      'Insomnia, disrupted sleep',
      'Seeking answers outside instead of within',
    ],

    affirmations: [
      'I trust what I know, even when I cannot explain it.',
      'Clarity is not more thinking. Clarity is less.',
      'I release the need to know everything right now.',
      'My intuition is not crazy. It is precise.',
      'I see clearly. I see truly.',
      'The noise was never the truth.',
      'I am the seer. I am the seen.',
    ],

    healingInvitation:
      'We heal the Third Eye by quieting the overthinking mind so the deeper knowing can surface. The practice is not to force clarity — it\'s to let the mud settle so the water becomes clear on its own.',
  },

  crown: {
    id: 'crown',
    name: 'Crown',
    sanskritName: 'Sahasrara',
    number: 7,
    color: '#8A7AA8',
    element: 'Thought / Consciousness',
    mantra: 'OM',
    location: 'Top of the head',
    locationDetail: 'The crown, the softest spot of the skull',

    simpleDefinition:
      'The Crown is your connection — the part of you that knows you were never separate from the whole.',
    whatItGoverns:
      'Your Crown governs your sense of connection — to something larger than yourself, whether you call it God, Universe, Source, nature, or simply the field. It\'s also where purpose lives — the quiet knowing of why you\'re here. When open, life feels meaningful. When blocked, you feel alone and adrift.',
    scienceNote:
      'The Crown corresponds to the cerebral cortex and the brain\'s default mode network — the system responsible for self-referential thinking. Meditation practices reduce DMN activity, producing the felt sense of unity and lowered self-concern that spiritual traditions describe.',
    sense: 'Knowing',

    shadowFeeling: 'Separation',
    shadowDescription:
      'Separation in the Crown feels like loneliness even in a crowd, meaninglessness, questioning whether life has a point, a disconnect between you and everything else. It comes from religious harm, cultural disconnection, or the simple modern condition of living in a separating world.',

    signsOfBalance: [
      'You feel connected to something larger',
      'Life feels meaningful, even in hard moments',
      'You trust your path, even when unclear',
      'You experience moments of wonder',
      'You know you are not doing this alone',
    ],
    signsOfImbalance: [
      'Chronic loneliness, even around people',
      'Meaninglessness, existential heaviness',
      'Disconnection from purpose or direction',
      'Rigidity around belief (for or against)',
      'Feeling cut off from yourself',
    ],

    affirmations: [
      'I was never separate. I only forgot.',
      'Purpose is not found. It is remembered.',
      'I am held by something larger than me.',
      'I am connected to every breath, every being, every moment.',
      'My life has meaning, even when I cannot see it.',
      'I am guided. I am not alone.',
      'I am home in this body, and in this moment, and in this life.',
    ],

    healingInvitation:
      'We heal the Crown by softening the armor of separation. This chakra doesn\'t need anything to be fixed — it needs the other six to quiet down so its natural state can be felt. What you\'re looking for was already here.',
  },
};

export function getChakraContent(id: ChakraId): ChakraFullContent {
  return CHAKRA_CONTENT[id];
}

export function getAllChakraContent(): ChakraFullContent[] {
  return (['root', 'sacral', 'solar-plexus', 'heart', 'throat', 'third-eye', 'crown'] as ChakraId[])
    .map(id => CHAKRA_CONTENT[id]);
}
