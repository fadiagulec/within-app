/**
 * SOMA - Chakra Short Guides
 *
 * Condensed 4-part format per chakra:
 *   1. Physical Health Blockages (symptoms stored in this center)
 *   2. Understanding the Shadow Feeling
 *   3. The Unblocking Process (specific to this chakra)
 *   4. The Aligned State (what it looks like when open)
 *
 * ORIGINAL content written for SOMA. Framework is traditional
 * chakra teaching; specific language, examples, and approach are original.
 */

import { ChakraId } from './chakra-content';

export interface ChakraShortGuide {
  id: ChakraId;
  title: string;
  shadowFeeling: string;

  physicalBlockages: {
    intro: string;
    symptoms: string[];
  };

  understanding: {
    title: string;
    body: string[];   // 2-3 short paragraphs
  };

  unblocking: {
    title: string;
    steps: string[];  // 5-7 condensed steps specific to this chakra
  };

  aligned: {
    title: string;
    description: string;
    signs: string[];
  };
}

export const CHAKRA_SHORT_GUIDES: Record<ChakraId, ChakraShortGuide> = {
  // ==================== ROOT ====================
  root: {
    id: 'root',
    title: 'Root — Base of Spine',
    shadowFeeling: 'Fear',

    physicalBlockages: {
      intro:
        'When fear is stored in the Root, the body holds it in specific places. These are the common physical signals of a blocked Root.',
      symptoms: [
        'Tight hips, lower back pain, sciatica',
        'Chronic constipation or digestive slowness',
        'Cold feet, poor circulation to legs',
        'Adrenal fatigue, cortisol dysregulation',
        'Insomnia rooted in hypervigilance',
        'Frequent urination under stress',
        'Weight held around hips and thighs',
      ],
    },

    understanding: {
      title: 'Understanding Fear',
      body: [
        'Fear is the oldest emotion. Before language, the body learned to scan for threat — and it has been scanning ever since.',
        'In the Root, fear is not always loud. Often it is a low-grade, background hum of "something is about to go wrong." It keeps you braced, even when the danger has passed.',
        'Most Root fear is not about today. It is a child\'s fear still running in an adult\'s body — from a moment when safety was uncertain and the body never got the signal that it was over.',
      ],
    },

    unblocking: {
      title: 'Unblocking the Root',
      steps: [
        'Slow the breath. Long, deep exhales — the body needs to hear "it is safe now."',
        'Feel the weight of the body — feet on the ground, seat in the chair. Name what is actually here.',
        'Return to the first moment the fear took root. A child\'s memory of instability, unsafety, or unpredictability.',
        'Let the younger self be seen. Tell them: "You made it. You are safe now. I am here."',
        'Breathe the feeling down — through the legs, into the earth. The earth can hold what you cannot.',
        'Install the new truth: "I am safe. I belong. The ground is holding me."',
        'Tone LAM three times. Feel the vibration in the base of the spine.',
      ],
    },

    aligned: {
      title: 'The Aligned Root',
      description:
        'When the Root is open and aligned, you walk through life with an unshakeable base. Not arrogance — trust. You stop flinching at every small threat. You feel at home in your body and in the world.',
      signs: [
        'Deep, restful sleep',
        'Body feels heavy in a good way',
        'Financial stress does not feel existential',
        'You can be still without panic',
        'You feel welcome in your own life',
      ],
    },
  },

  // ==================== SACRAL ====================
  sacral: {
    id: 'sacral',
    title: 'Sacral — Lower Belly',
    shadowFeeling: 'Guilt',

    physicalBlockages: {
      intro:
        'When guilt is stored in the Sacral, the body reveals it. These are the common physical signals of a blocked Sacral.',
      symptoms: [
        'Hip tightness, rotator pain, knee issues',
        'Menstrual irregularities, painful cycles',
        'Lower back pain (opposite of Root)',
        'Digestive issues — especially IBS-type symptoms',
        'Reproductive system concerns',
        'Urinary tract issues',
        'Sexual dysfunction or numbness',
      ],
    },

    understanding: {
      title: 'Understanding Guilt',
      body: [
        'Guilt is the feeling that something about you is wrong — that you should be sorry for wanting, feeling, or existing as you are.',
        'Most Sacral guilt is inherited. Taught to you as a child — often not directly, but through the small disapproval of parents, teachers, culture. You absorbed the idea that your desires were selfish, your feelings were too much.',
        'The thing about guilt — most of what you carry was never yours. You are still apologizing for things that were never your fault to begin with.',
      ],
    },

    unblocking: {
      title: 'Unblocking the Sacral',
      steps: [
        'Soft, flowing breath into the belly — let it rise and fall like water.',
        'Hip circles, gentle — the Sacral moves through movement.',
        'Return to a moment guilt took root. Who made you feel it was your fault?',
        'Tell your younger self: "This was not yours to carry. You were doing your best."',
        'Exhale with sound — whisper or hum the release. Let the guilt move like a tide going out.',
        'Install the new truth: "I am allowed to want. My pleasure is sacred."',
        'Tone VAM three times. Feel it ripple through the hips.',
      ],
    },

    aligned: {
      title: 'The Aligned Sacral',
      description:
        'When the Sacral is open, pleasure returns. Not indulgence — real aliveness. Creativity flows. Emotions move through you without sticking. You can want what you want without apologizing.',
      signs: [
        'Emotions move — they do not get stuck',
        'Creative ideas come easily',
        'Pleasure without guilt',
        'Hips feel fluid, not locked',
        'You can ask for what you need',
      ],
    },
  },

  // ==================== SOLAR PLEXUS ====================
  'solar-plexus': {
    id: 'solar-plexus',
    title: 'Solar Plexus — Upper Belly',
    shadowFeeling: 'Shame',

    physicalBlockages: {
      intro:
        'When shame is stored in the Solar Plexus, the body carries it. These are the common physical signals of a blocked Solar Plexus.',
      symptoms: [
        'Stomach tension, ulcers, acid reflux',
        'Poor digestion, bloating',
        'Liver and gallbladder issues',
        'Blood sugar irregularities',
        'Chronic fatigue',
        'Pancreatic concerns',
        'Lower back stress from the core',
      ],
    },

    understanding: {
      title: 'Understanding Shame',
      body: [
        'Shame is the feeling that you are fundamentally not enough — that there is something wrong with you, not just what you did.',
        'In the Solar Plexus, shame lives just below the ribs. It collapses the chest inward. It is the voice that says "who do you think you are" every time you reach for more.',
        'Shame often comes from being made small — by a parent who criticized, a culture that demanded perfection, a moment where your real self was rejected. The wound is not about your actions. It is about your existence.',
      ],
    },

    unblocking: {
      title: 'Unblocking the Solar Plexus',
      steps: [
        'Warm up the breath — fire breath if safe for your body, or full belly breaths.',
        'Feel the knot below the ribs. Let heat build there. The fire is clean — it is clarity, not anger.',
        'Find the first moment you were made to feel small. Who was it? What did they say or imply?',
        'From your adult self: speak the truth they needed then. "You are enough. You were always enough."',
        'Release with a strong exhale and a sound — "HAA" from the gut — sending shame out through the breath.',
        'Install the new truth: "My worth was never up for debate."',
        'Tone RAM three times. Loud, from the gut.',
      ],
    },

    aligned: {
      title: 'The Aligned Solar Plexus',
      description:
        'When the Solar Plexus is open, you have quiet power. You do not need to prove yourself — you simply are. Decisions come easier. Money and success feel available, not threatening.',
      signs: [
        'You can say no without justifying',
        'You trust your decisions',
        'Confidence does not need applause',
        'Money feels neutral, not loaded',
        'You can receive praise without deflecting',
      ],
    },
  },

  // ==================== HEART ====================
  heart: {
    id: 'heart',
    title: 'Heart — Center of Chest',
    shadowFeeling: 'Grief',

    physicalBlockages: {
      intro:
        'When grief is stored in the Heart, the body shows it. These are the common physical signals of a blocked Heart.',
      symptoms: [
        'Chest tightness, shallow breathing',
        'Upper back pain, rounded shoulders',
        'Cardiovascular stress (elevated BP, rapid heart)',
        'Immune system weakness (thymus is here)',
        'Lung issues, asthma flare-ups',
        'Rib cage rigidity',
        'Shoulder and arm tension',
      ],
    },

    understanding: {
      title: 'Understanding Grief',
      body: [
        'Grief is love with nowhere to go. The cost of having loved.',
        'In the Heart, grief presses the chest. It makes breath shallow. It is often the emotion most suppressed because our culture has no place for it — especially grief for things that are not deaths: lost versions of ourselves, unspoken words, the life we did not get to live.',
        'Unfelt grief hardens the heart. We close to protect what has already been hurt. The work is not to force openness — it is to let the grief we have been holding finally move.',
      ],
    },

    unblocking: {
      title: 'Unblocking the Heart',
      steps: [
        'Place a hand on the heart. Breathe into the palm.',
        'Return to a loss you have not fully grieved — a person, a version of yourself, a life you did not get to live.',
        'Let the ache come. Do not fight it. Aching is not breaking.',
        'Witness: "I loved. I lost. I am still here."',
        'Let the tears come if they come. Let the sound come if it comes.',
        'Install the new truth: "My heart did not break. It opened."',
        'Tone YAM three times. Soft, long, from the chest.',
      ],
    },

    aligned: {
      title: 'The Aligned Heart',
      description:
        'When the Heart is open, you can love without losing yourself. You can grieve fully and still hold joy. You forgive — not because it excuses, but because you are tired of carrying. Connection becomes effortless.',
      signs: [
        'Deep breath comes easily',
        'You can love and be loved',
        'Grief and joy coexist',
        'You forgive for your own freedom',
        'Walls soften — not disappear',
      ],
    },
  },

  // ==================== THROAT ====================
  throat: {
    id: 'throat',
    title: 'Throat — Hollow of the Neck',
    shadowFeeling: 'Suppression',

    physicalBlockages: {
      intro:
        'When suppression is stored in the Throat, the body traps it. These are the common physical signals of a blocked Throat.',
      symptoms: [
        'Thyroid dysfunction (under or overactive)',
        'Chronic sore throat, swallowing difficulty',
        'Jaw tension, TMJ disorder',
        'Neck stiffness and pain',
        'Voice issues — hoarseness, losing voice under stress',
        'Dental issues, teeth grinding',
        'Ear problems, tinnitus',
      ],
    },

    understanding: {
      title: 'Understanding Suppression',
      body: [
        'Suppression is what we do with what we cannot say. Every swallowed truth becomes a tightness. Every silenced no becomes a knot.',
        'In the Throat, suppression feels like a lump — an eternal on-the-verge-of-speaking that never quite happens. It is often the legacy of being told, directly or indirectly, that your voice was too loud, too much, or dangerous to use.',
        'The Throat holds both what you did not say and what you said that was not true. Speaking someone else\'s words, agreeing when you did not, performing peace when there was rage — all of it accumulates here.',
      ],
    },

    unblocking: {
      title: 'Unblocking the Throat',
      steps: [
        'Breathe through slightly parted lips — audibly, the way you would if you were about to speak.',
        'Feel the tightness in the throat. Name it without trying to fix it.',
        'Return to a moment you were silenced. Told to be quiet. Told your voice was too much.',
        'Let the younger self know: "Your voice was never the problem."',
        'Release sound — a sigh, a hum, an open "AH." Let the throat open from the inside.',
        'Install the new truth: "I speak what is true, even when it shakes."',
        'Tone HAM three times. Clear, resonant, from the throat.',
      ],
    },

    aligned: {
      title: 'The Aligned Throat',
      description:
        'When the Throat is open, you speak with precision and warmth. No over-explaining, no swallowing. You say what is true, even when it is hard — and you do it with care. You listen as generously as you speak.',
      signs: [
        'Jaw and throat feel relaxed',
        'You speak truth without aggression',
        'You can say no without softening the no',
        'Silence feels natural, not suffocating',
        'Your voice carries your real presence',
      ],
    },
  },

  // ==================== THIRD EYE ====================
  'third-eye': {
    id: 'third-eye',
    title: 'Third Eye — Between the Eyebrows',
    shadowFeeling: 'Doubt',

    physicalBlockages: {
      intro:
        'When doubt (confusion, overthinking) is stored in the Third Eye, the body expresses it. These are the common physical signals of a blocked Third Eye.',
      symptoms: [
        'Tension headaches, pressure between the eyes',
        'Eye strain, vision issues',
        'Sinus congestion, pressure in the forehead',
        'Sleep disturbances, vivid or disturbing dreams',
        'Brain fog, difficulty concentrating',
        'Pituitary gland dysfunction',
        'Hormonal imbalances',
      ],
    },

    understanding: {
      title: 'Understanding Doubt',
      body: [
        'Doubt is what happens when the mind takes over from the knowing. When you stop trusting what you see, feel, and sense, and instead spin in stories, second-guessing, and external opinion.',
        'In the Third Eye, doubt feels like static. Fog. The inability to land on a decision. Rumination that loops without resolution. You are outsourcing your inner knowing.',
        'Most doubt traces back to being told, as a child, that what you saw or felt was wrong. You learned not to trust yourself — and a lifetime of that teaches you to look everywhere except inward.',
      ],
    },

    unblocking: {
      title: 'Unblocking the Third Eye',
      steps: [
        'Box breath or alternate nostril — balance the hemispheres before going in.',
        'Close your eyes. Look inward. Feel the space between the eyebrows.',
        'Return to a moment you stopped trusting yourself. When did the noise start?',
        'Tell the younger self: "You were right. You always knew."',
        'Release the need to know everything right now. Say it silently: "I release the need to figure this out."',
        'Install the new truth: "I see clearly. My knowing is enough."',
        'Tone OM three times. Slow. Let the vibration settle behind the forehead.',
      ],
    },

    aligned: {
      title: 'The Aligned Third Eye',
      description:
        'When the Third Eye is open, you trust your knowing. Decisions come from within, not from endless external input. The mind becomes clear. You see patterns you used to miss. You know before you can explain how.',
      signs: [
        'Clear, calm thinking',
        'Decisions arise without spinning',
        'You trust your gut',
        'Dreams become vivid and meaningful',
        'Mental noise quiets',
      ],
    },
  },

  // ==================== CROWN ====================
  crown: {
    id: 'crown',
    title: 'Crown — Top of the Head',
    shadowFeeling: 'Separation',

    physicalBlockages: {
      intro:
        'When separation is stored in the Crown, the body feels it. These are the common physical signals of a blocked Crown.',
      symptoms: [
        'Chronic exhaustion despite rest',
        'Migraines, tension at the top of the head',
        'Nervous system dysregulation',
        'Depression with existential quality',
        'Disconnection from body and self',
        'Hair, scalp issues',
        'Light sensitivity',
      ],
    },

    understanding: {
      title: 'Understanding Separation',
      body: [
        'Separation is the feeling of being alone — even in a crowd, even with people you love. The sense that you are cut off from something larger, or that nothing is connected to anything else.',
        'In the Crown, separation is less about trauma and more about forgetting. Forgetting you belong. Forgetting you are held. Forgetting there is a larger web you are part of.',
        'Many modern people live in Crown blockage without knowing it. Cultural disconnection, religious harm, technology replacing communion — we have created a world that trains the Crown to close. Reopening it is often the deepest work.',
      ],
    },

    unblocking: {
      title: 'Unblocking the Crown',
      steps: [
        'Slow, deep breath. Feel the entire body as one system.',
        'Bring awareness to the top of the head. Notice tingling, warmth, or nothing — all welcome.',
        'Imagine a column of light entering the crown from above, filling the body.',
        'Release the loneliness and the story that you are doing this alone.',
        'Allow yourself to be held by something larger — call it what you will.',
        'Install the new truth: "I was never separate. I only forgot."',
        'Tone OM three times. Let it rise from the base all the way through the crown.',
      ],
    },

    aligned: {
      title: 'The Aligned Crown',
      description:
        'When the Crown is open, life feels connected. Purpose stops being something you have to figure out — it becomes something you remember. You are held by something larger, whether you name it God, Universe, nature, or the field.',
      signs: [
        'A felt sense of connection',
        'Meaning, even in hard moments',
        'You trust the path without needing to see it all',
        'Moments of wonder return',
        'You know you are not alone',
      ],
    },
  },
};

export function getShortGuide(id: ChakraId): ChakraShortGuide {
  return CHAKRA_SHORT_GUIDES[id];
}
