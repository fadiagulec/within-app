/**
 * Within — Guided Energy Centre Unblocking Sessions.
 *
 * Faithful implementation of Dr Espen Wold-Jensen's Quantum Coach
 * Certification 8-centre unblocking method, adapted into a guided,
 * voice-led, interactive session the user moves through step by step.
 *
 * The universal 11-step arc (per the method):
 *   1  Rapport / arrival
 *   2  Session focus + energy centre explanation
 *   2.1 Emotion check (1-10) — the BEFORE score
 *   3  The 3 Permissions (free will)
 *   4  Grounding — Grounded Through 1, Lifted Through 7
 *   5  Discovery — timeline regression (centres 1-4 = PAST),
 *      present-truth (Throat), future-vision (Third Eye),
 *      timeless-attachment (Crown), above-time (Soul Star)
 *   6  Reflection & journalling
 *   7  Drawbacks (3) & Benefits (20+) — Law of Polarity
 *   8  The Gratitude Letter (soul to soul)
 *   9  Integrating the new truth — embodied declaration
 *   10 Sound activation — bija mantra
 *   11 Testing & close — emotion check AFTER + the contrast
 *
 * Voiced by the facilitator voice (COACH_VOICE_ID). The narration is
 * adapted from Dr Espen's verbatim demo language. Each `discovery`
 * format matches the centre's dimension (past/present/future/etc.).
 */

import type { SpineChakraId } from '@/data/chakra-spine';

export type UnblockStepKind =
  | 'arrival'        // rapport + focus, narration + begin
  | 'emotion-before' // 1-10 slider, the before score
  | 'permissions'    // 3 yes toggles
  | 'grounding'      // narration + breath
  | 'discovery'      // the guided journey (varies by dimension)
  | 'reflection'     // text: "My biggest [emotion] is..."
  | 'polarity'       // drawbacks (3) + benefits (20+)
  | 'letter'         // gratitude letter text
  | 'declaration'    // used-to-be / now-I-know + read aloud
  | 'sound'          // bija activation
  | 'close';         // emotion after + contrast + learnings

export interface UnblockStep {
  kind: UnblockStepKind;
  title: string;
  /** Spoken by the facilitator voice. */
  narration: string;
  /** Short on-screen instruction beneath the narration. */
  instruction?: string;
}

export type DiscoveryDimension =
  | 'past'      // timeline regression, 2-metre lift
  | 'present'   // truth / authentic expression
  | 'future'    // vision / purpose
  | 'timeless'  // attachment / addiction
  | 'above';    // time / presence

export interface UnblockSession {
  chakraId: SpineChakraId;
  name: string;
  sanskrit: string;
  color: string;
  emotion: string;       // e.g. "Fear"
  transformation: string; // e.g. "Fuel & Freedom"
  bija: string;          // LAM
  bijaPron: string;      // "lum"
  frequencyHz: number;
  governs: string;
  dimension: DiscoveryDimension;
  steps: UnblockStep[];
}

// ─── SHARED STEP BUILDERS — the universal arc ──────────────────────

const THREE_PERMISSIONS = (emotion: string, transformation: string): UnblockStep => ({
  kind: 'permissions',
  title: 'The Three Permissions',
  narration: `Before we begin, I want to honour your free will. This work only happens with your full permission — on every level. I'll ask you three things. Say yes to each, out loud or in your heart, only if it's true for you.

One. Do you give your conscious mind permission to fully trust and engage in this experience today?

Two. Do you give your subconscious mind — all the cells in your body — permission to fully trust and engage in this experience today?

And three. Do I have your permission to guide you, to hold space for you, and to guide you safely back into the now — so you can turn this ${emotion.toLowerCase()} into ${transformation.toLowerCase()}?`,
  instruction: 'Grant each permission to continue. Free will is honoured here.',
});

const GROUNDING_STEP: UnblockStep = {
  kind: 'grounding',
  title: 'Grounded Through One, Lifted Through Seven',
  narration: `Feel the chair beneath you. Feel your feet on the ground. Through my presence, I am with you the whole way.

Now imagine roots growing down from the base of your spine — down through the floor, down into the earth, all the way to the core. You are anchored. You are safe.

And at the same time, imagine the crown of your head, like a magnet, being gently pulled up toward the sky. Anchored below. Expanded above. Held in both directions at once.

This is the state of the masterful meditator. Grounded through one. Lifted through seven. Take one slow breath here, and settle.`,
  instruction: 'Roots down. Crown lifted. One slow breath.',
};

function arrivalStep(name: string): UnblockStep {
  return {
    kind: 'arrival',
    title: 'Arrival',
    narration: `Hello, and welcome. I'm so glad you're here.

Before we start — if you could just breathe with me. Just three breaths. Roll your shoulders back. Relax your mind, relax your body. Feel that breath coming into the belly… knowing you are exactly where you need to be. That you are safe. That all is well.

When you're ready, a big breath in through the nose — shoulders back, heart open — and out through the mouth, nice and slow. Beautiful. One more time, in… and out.

Today, together, we're going to gently work with your ${name}. There's nowhere to be but here. Stop me at any time if you need a breath, a pause, or anything at all.`,
    instruction: 'Three breaths. Arrive. When you\'re ready, begin.',
  };
}

function soundStep(name: string, bija: string, bijaPron: string): UnblockStep {
  return {
    kind: 'sound',
    title: `Sound Activation — ${bija}`,
    narration: `Now, together, we'll make a sound to activate and seal this work in your ${name}.

The sound is ${bija} — said like "${bijaPron}".

Stand if you can. Feet apart, grounding down. Imagine your roots going to the core of the earth, and your crown being pulled up like a magnet. Open your heart.

On the count of three, take a big breath all the way in, and chant the sound — long, full, feeling the vibration in the centre. Three… two… one… ${bija}.`,
    instruction: `Chant ${bija} ("${bijaPron}") on a long exhale. Feel the vibration.`,
  };
}

const CLOSE_STEP: UnblockStep = {
  kind: 'close',
  title: 'Testing & Close',
  narration: `Beautiful. You've done the work.

Now — how are you feeling, compared to when we began? Take a moment to notice the shift in your body.

We're going to return to the number you gave me at the start. That contrast — that is the evidence. That is the proof your body just changed something real.

What have you learned about yourself today? And notice — how many other areas of your life might this touch?

Thank you for trusting yourself, and for letting me hold space for you. Until next time.`,
  instruction: 'Re-rate the emotion. See how far you\'ve come.',
};

// ─── DISCOVERY STEPS — vary by dimension ───────────────────────────

function timelineDiscovery(emotion: string): UnblockStep {
  const e = emotion.toLowerCase();
  return {
    kind: 'discovery',
    title: 'Quantum Timeline Discovery',
    narration: `With your eyes closed, we're going to become conscious of your earliest or strongest memory related to ${e}.

Take a big breath into your belly. Exhale, and relax.

Now imagine floating your awareness up, out through the top of your head. One metre above. You're looking down, observing yourself, feeling safe. Now lift to two metres above the top of your head. Another big breath in, exhale, relax. You are safe up here. You are the observer.

Staying two metres above, start going back in time. See yourself yesterday. Last week. Last month. Drift back through the years — your twenties, your teenage years, childhood — all the way back. Go to that strongest or earliest memory related to ${e}. Go there now.

When you find it, stay two metres above. Notice where you are, how old you are, who is involved. Remember to breathe. You are safe.

Now — the feeling is the healing. Let yourself feel what you felt back then. Expand it. Make it so big you never have to feel it again. Stay two metres above your younger self — and send love to that younger version of you.

When you're ready, say goodbye for now. Breathe deep, and start coming forward across the timeline — back to this moment, here and now. Back in your body in three… two… one. When you're ready, open your eyes.`,
    instruction: 'Stay two metres above. Observe AND feel. Tap continue when you\'ve returned.',
  };
}

function presentTruthDiscovery(): UnblockStep {
  return {
    kind: 'discovery',
    title: 'Connecting to Truth',
    narration: `This centre lives in the present — in the truth of who you are, right now.

With your eyes closed, breathe into the base of your throat. And let yourself be honest, just with yourself, for a moment.

Where in your life have you been lying to yourself? Where have you been lying to others — even small lies, to keep the peace? Where have you been minimising yourself, shrinking, holding back the full truth of who you are?

Don't judge what comes up. Just notice it. Each place you've suppressed your truth is a place your voice has been waiting to return.

Now imagine the most authentic version of you — the one with nothing to hide, nothing to perform. See how she stands. Hear how she speaks. Feel the freedom of being completely, unapologetically yourself. Breathe her in. When you're ready, open your eyes.`,
    instruction: 'Notice where you\'ve suppressed your truth. Then meet your authentic self.',
  };
}

function futureVisionDiscovery(): UnblockStep {
  return {
    kind: 'discovery',
    title: 'Vision & Purpose Discovery',
    narration: `This centre opens toward the future — your vision, your purpose, your inner sight.

With your eyes closed, breathe into the space between your eyebrows.

Notice first: where have you been living in the illusion of separation — feeling disconnected from your purpose, from others, from something larger than you?

Now let your awareness lift toward what is possible. What are the one or two things that light you up — that you'd do even if no one paid you? Feel how they make you feel. Picture a version of you fully living that purpose, one year from now. See her clearly.

There is no ceiling here that you did not inherit. Like the runner who broke the four-minute mile and made it possible for everyone after — you are allowed to be the one who proves it can be done. Breathe that in. When you're ready, open your eyes.`,
    instruction: 'Move from separation toward your vision. See the version of you living it.',
  };
}

function timelessAttachmentDiscovery(): UnblockStep {
  return {
    kind: 'discovery',
    title: 'Releasing Attachment',
    narration: `This centre is timeless — it's where we loosen our grip on what we've been clinging to, and reconnect to something larger.

With your eyes closed, breathe into the crown of your head.

What are you attached to — a substance, a habit, a person, an outcome, a way of numbing? What are the things you reach for when you don't want to feel? And underneath them — what is the emotion you've been trying not to feel?

Now picture two futures. One, ten years from now, where the attachment kept its grip. And another, where you gently set it down and reconnected to your purpose. Feel the difference in your body between the two.

Now imagine a golden bubble of light forming around you — warm, complete, needing nothing from outside. You are already whole. Breathe that in. When you're ready, open your eyes.`,
    instruction: 'Name the attachment, feel beneath it, choose the freer future.',
  };
}

function aboveTimeDiscovery(): UnblockStep {
  return {
    kind: 'discovery',
    title: 'Healing Time',
    narration: `This centre sits above the body — about fifteen centimetres above your crown. It is your connection to the soul, and to timelessness itself.

With your eyes closed, breathe, and let your awareness rise to that point of pure white light above your head.

Notice: where is the interference? Where has time scarcity — the feeling of never enough hours, always rushing, always behind — been running your life? What activities, what habits, pull you out of presence and into the race?

Now let all of it soften. Imagine a cord of white light connecting the top of your head to the source of all things — steady, unhurried, infinite. In this light, there is no rushing. There is only now. There is always enough. Breathe in the timelessness. When you're ready, open your eyes.`,
    instruction: 'Find the time-scarcity interference. Reconnect to the timeless.',
  };
}

function discoveryFor(dimension: DiscoveryDimension, emotion: string): UnblockStep {
  switch (dimension) {
    case 'past':
      return timelineDiscovery(emotion);
    case 'present':
      return presentTruthDiscovery();
    case 'future':
      return futureVisionDiscovery();
    case 'timeless':
      return timelessAttachmentDiscovery();
    case 'above':
      return aboveTimeDiscovery();
  }
}

// ─── SESSION BUILDER ───────────────────────────────────────────────

interface CentreConfig {
  chakraId: SpineChakraId;
  name: string;
  sanskrit: string;
  color: string;
  emotion: string;
  transformation: string;
  bija: string;
  bijaPron: string;
  frequencyHz: number;
  governs: string;
  dimension: DiscoveryDimension;
  /** Energy-centre explanation (step 2). */
  centreExplanation: string;
  underactive: string;
  overactive: string;
}

function buildSession(c: CentreConfig): UnblockSession {
  const e = c.emotion.toLowerCase();

  const focusStep: UnblockStep = {
    kind: 'arrival',
    title: 'Session Focus',
    narration: `The first step in letting go of what's holding you back is releasing the emotion of ${e}. I have a simple but powerful process that can help with this.

${c.centreExplanation}

When this centre is underactive, it can show up as ${c.underactive}. When it's overactive, it can show up as ${c.overactive}.

This centre is blocked by the emotion of ${e}. That emotion once served a purpose — but it can linger long after it's needed, keeping you stuck and disconnected from your full potential. Today, we gently release the interference. Not the emotion itself — the stuck pattern around it.`,
    instruction: 'Take it in. When you\'re ready, continue.',
  };

  const emotionBefore: UnblockStep = {
    kind: 'emotion-before',
    title: 'Emotion Check',
    narration: `On a scale of one to ten — one being no ${e} at all, ten being completely overwhelmed by ${e} — how would you rate your current experience of ${e} in your life right now?

This is your before. We'll come back to it at the end. The contrast is the proof.`,
    instruction: `Rate your ${e} right now, 1 to 10.`,
  };

  const reflectionStep: UnblockStep = {
    kind: 'reflection',
    title: 'Reflection',
    narration: `Welcome back. Take a moment. You're safe, and you did beautifully.

Now I'd like you to write one sentence, naming it as specifically as you can. Begin with: "My biggest ${e} is…"

There's no rush. I'm here.`,
    instruction: `Write: "My biggest ${e} is…"`,
  };

  const polarityStep: UnblockStep = {
    kind: 'polarity',
    title: 'Drawbacks & Benefits',
    narration: `There's a universal law called the Law of Polarity — everything in the universe has both a drawback and a benefit. Hot and cold. Up and down. One cannot exist without the other.

First, write three drawbacks — three ways this ${e} has negatively affected you. We stop at three on purpose, so we don't recondition the pain.

Then — and this is where the real shift happens — write as many benefits as you can. Aim for twenty. All the ways this experience has served you, shaped you, made you who you are. If you feel stuck, take a long breath and go again. If you are a soul, then this didn't happen to you — it happened for you.`,
    instruction: 'Three drawbacks. Then twenty benefits. Flood the body with the new meaning.',
  };

  const letterStep: UnblockStep = {
    kind: 'letter',
    title: 'The Gratitude Letter',
    narration: `Now, write a letter of gratitude — from your heart, or from your soul, to yourself, to the situation, or to the person involved.

Write it as if there was an agreement between souls, before you ever came into this life — that you would go through this, to become who you are today.

Thank them. For the patience it built in you. The compassion. The resilience. The strength. And then — set them free. And set yourself free.`,
    instruction: 'Write the letter. Soul to soul. Then release it.',
  };

  const declarationStep: UnblockStep = {
    kind: 'declaration',
    title: 'Integrating Your New Truth',
    narration: `You've done so well. Now we anchor the new truth into the body.

Write this, and fill in the blanks:

"My biggest ${e} used to be… (the old story). But now I know… (the truth, the realisations)."

Then stand up. Long breath in and out. Shoulders back, chest up, chin up. And when you're ready, read it out loud — with a powerful posture, full confidence, and level-ten energy.

This isn't just words. Standing tall, declaring it with your whole body — this is where your identity actually shifts.`,
    instruction: 'Write it. Then stand, and declare it out loud at level-10 energy.',
  };

  return {
    chakraId: c.chakraId,
    name: c.name,
    sanskrit: c.sanskrit,
    color: c.color,
    emotion: c.emotion,
    transformation: c.transformation,
    bija: c.bija,
    bijaPron: c.bijaPron,
    frequencyHz: c.frequencyHz,
    governs: c.governs,
    dimension: c.dimension,
    steps: [
      arrivalStep(c.name),
      focusStep,
      emotionBefore,
      THREE_PERMISSIONS(c.emotion, c.transformation),
      GROUNDING_STEP,
      discoveryFor(c.dimension, c.emotion),
      reflectionStep,
      polarityStep,
      letterStep,
      declarationStep,
      soundStep(c.name, c.bija, c.bijaPron),
      CLOSE_STEP,
    ],
  };
}

// ─── THE 8 CENTRES ─────────────────────────────────────────────────

export const UNBLOCK_SESSIONS: Record<string, UnblockSession> = {
  root: buildSession({
    chakraId: 'root',
    name: 'Root Energy Centre',
    sanskrit: 'Muladhara',
    color: '#C0392B',
    emotion: 'Fear',
    transformation: 'Fuel & Freedom',
    bija: 'LAM',
    bijaPron: 'lum',
    frequencyHz: 396,
    governs: 'Safety, security, survival, belonging',
    dimension: 'past',
    centreExplanation:
      'The Root Energy Centre, Muladhara, is the body\'s first centre, at the base of the spine. It governs your sense of safety, security, and stability — the foundation for everything else.',
    underactive: 'insecurity, fear, financial instability, poor grounding, anxiety, disconnection',
    overactive: 'materialism, greed, resistance to change, excessive control, fear of losing security',
  }),

  sacral: buildSession({
    chakraId: 'sacral',
    name: 'Sacral Energy Centre',
    sanskrit: 'Svadhisthana',
    color: '#E67E22',
    emotion: 'Guilt',
    transformation: 'Gratitude',
    bija: 'VAM',
    bijaPron: 'vum',
    frequencyHz: 417,
    governs: 'Emotions, creativity, relationships, pleasure',
    dimension: 'past',
    centreExplanation:
      'The Sacral Energy Centre, Svadhisthana, sits about ten centimetres below the navel. It governs your emotions, your creativity, your relationships, and your capacity for pleasure.',
    underactive: 'emotional numbness, low creativity, guilt, difficulty with intimacy and joy',
    overactive: 'emotional overwhelm, people-pleasing, over-attachment, addictive seeking of pleasure',
  }),

  'solar-plexus': buildSession({
    chakraId: 'solar-plexus',
    name: 'Solar Plexus Energy Centre',
    sanskrit: 'Manipura',
    color: '#F1C40F',
    emotion: 'Shame',
    transformation: 'Self-Worth & Personal Power',
    bija: 'RAM',
    bijaPron: 'rum',
    frequencyHz: 528,
    governs: 'Personal power, confidence, self-worth, abundance',
    dimension: 'past',
    centreExplanation:
      'The Solar Plexus Energy Centre, Manipura, sits just above the navel. It governs your personal power, your confidence, your self-worth, and your relationship with abundance.',
    underactive: 'low self-worth, shame, lack of confidence, indecision, feeling powerless',
    overactive: 'control, domination, ego-driven striving, perfectionism, harsh self-judgement',
  }),

  heart: buildSession({
    chakraId: 'heart',
    name: 'Heart Energy Centre',
    sanskrit: 'Anahata',
    color: '#27AE60',
    emotion: 'Grief',
    transformation: 'Grace & Unconditional Love',
    bija: 'YAM',
    bijaPron: 'yum',
    frequencyHz: 639,
    governs: 'Love, compassion, forgiveness — the bridge between higher and lower self',
    dimension: 'past',
    centreExplanation:
      'The Heart Energy Centre, Anahata, sits at the centre of your chest. It governs love, compassion, and forgiveness — it is the bridge between your higher and lower self.',
    underactive: 'grief, loneliness, difficulty giving or receiving love, holding old wounds',
    overactive: 'over-giving, loss of self in others, poor boundaries, martyrdom',
  }),

  throat: buildSession({
    chakraId: 'throat',
    name: 'Throat Energy Centre',
    sanskrit: 'Vishuddha',
    color: '#2980B9',
    emotion: 'Suppression',
    transformation: 'Authentic Expression & Truth',
    bija: 'HAM',
    bijaPron: 'hum',
    frequencyHz: 741,
    governs: 'Communication, expression, speaking one\'s truth',
    dimension: 'present',
    centreExplanation:
      'The Throat Energy Centre, Vishuddha, sits at the base of the throat. It governs communication, expression, and the courage to speak your truth. Authenticity, they say, is forty times more powerful than seeking approval.',
    underactive: 'suppression, fear of speaking up, lies of omission, shrinking, sore throat and tension',
    overactive: 'over-talking, dominating conversation, harsh speech, not listening',
  }),

  'third-eye': buildSession({
    chakraId: 'third-eye',
    name: 'Third Eye Energy Centre',
    sanskrit: 'Ajna',
    color: '#5B2C9D',
    emotion: 'Illusion of Separation',
    transformation: 'Vision, Intuition & Purpose',
    bija: 'UMM',
    bijaPron: 'uum-mm',
    frequencyHz: 852,
    governs: 'Intuition, inner vision, purpose, spiritual awareness',
    dimension: 'future',
    centreExplanation:
      'The Third Eye Energy Centre, Ajna, sits between the eyebrows. It governs your intuition, your inner vision, and your sense of purpose and direction.',
    underactive: 'confusion, lack of direction, disconnection from purpose, the illusion of separation',
    overactive: 'overthinking, living in the head, spiritual bypassing, disconnection from the body',
  }),

  crown: buildSession({
    chakraId: 'crown',
    name: 'Crown Energy Centre',
    sanskrit: 'Sahasrara',
    color: '#8E44AD',
    emotion: 'Attachment',
    transformation: 'Spiritual Fulfilment & Unity',
    bija: 'OM',
    bijaPron: 'ohm',
    frequencyHz: 963,
    governs: 'Spiritual connection, enlightenment, unity with the universe',
    dimension: 'timeless',
    centreExplanation:
      'The Crown Energy Centre, Sahasrara, sits at the very top of the head. It governs your spiritual connection, your sense of meaning, and your unity with something larger than yourself.',
    underactive: 'disconnection, cynicism, attachment, addiction, emptiness, loss of meaning',
    overactive: 'spiritual obsession, dissociation, neglect of the physical and earthly',
  }),

  'soul-star': buildSession({
    chakraId: 'soul-star',
    name: 'Soul Star Energy Centre',
    sanskrit: 'Soul Star',
    color: '#B0AEC0',
    emotion: 'Time Scarcity',
    transformation: 'Presence, Soul Flow & Timelessness',
    bija: 'White Light',
    bijaPron: 'silent — visualised',
    frequencyHz: 963,
    governs: 'Connection to higher self, soul purpose, divine wisdom, timelessness',
    dimension: 'above',
    centreExplanation:
      'The Soul Star Energy Centre sits about fifteen centimetres above the crown of your head. It governs your connection to your higher self, your soul purpose, and your relationship with time itself.',
    underactive: 'time scarcity, rushing, disconnection from soul, feeling never enough',
    overactive: 'ungroundedness, escapism, disconnection from earthly responsibilities',
  }),
};

export function getUnblockSession(chakraId: string): UnblockSession | undefined {
  return UNBLOCK_SESSIONS[chakraId];
}

export const UNBLOCK_SESSION_LIST: UnblockSession[] = [
  'root',
  'sacral',
  'solar-plexus',
  'heart',
  'throat',
  'third-eye',
  'crown',
  'soul-star',
].map((id) => UNBLOCK_SESSIONS[id]!).filter(Boolean);
