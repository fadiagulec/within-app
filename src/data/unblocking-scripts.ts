/**
 * SOMA — Per-chakra unblocking scripts.
 *
 * Original Soma content. Written for read-aloud use (the user reads it to
 * themselves slowly, OR — when audio recordings are uploaded — listens to
 * the narrated version. The text version always works.)
 *
 * Structure for every script (the universal Soma "unblock" arc):
 *   1. ARRIVE       — settle the body, set the chamber
 *   2. NAME         — identify the blocking emotion + where it lives
 *   3. BREATHE      — chakra-specific breath rhythm
 *   4. WITNESS      — feel without fixing
 *   5. RELEASE      — visualization to move the energy
 *   6. ACTIVATE     — chakra affirmation + colour fill
 *   7. SEAL         — integration
 *
 * All copy is original. Framework draws on public-domain practice (chakras,
 * breath work, somatic release, mantra) — none of it is proprietary to any
 * specific lineage.
 */

import type { SpineChakraId } from './chakra-spine';

export interface ScriptStep {
  kind: 'arrive' | 'name' | 'breathe' | 'witness' | 'release' | 'activate' | 'seal';
  label: string;
  /** Approximate read-aloud time in seconds. */
  durationSec: number;
  /** Body of the step — read slowly, with pauses where indicated by line breaks. */
  body: string;
}

export interface UnblockingScript {
  id: string; // matches `unblockingScriptId` in chakra-spine.ts
  chakraId: SpineChakraId;
  title: string;
  /** One-line tagline for the card. */
  tagline: string;
  /** What block this script is for ("Fear", "Guilt", etc). */
  blockingEmotion: string;
  /** Total runtime in minutes (sum of step durations rounded up). */
  totalMinutes: number;
  steps: ScriptStep[];
}

// ============ THE 8 SCRIPTS ============

const SCRIPTS: UnblockingScript[] = [
  // ─── 1. ROOT — Removing Fear ───────────────────────────────
  {
    id: 'unblock-root',
    chakraId: 'root',
    title: 'Unblock the Root',
    tagline: 'Release the fear sitting at the base of the spine.',
    blockingEmotion: 'Fear',
    totalMinutes: 14,
    steps: [
      {
        kind: 'arrive',
        label: 'Arrive',
        durationSec: 90,
        body:
          "Sit upright with your feet flat on the ground. Spine long. Hands resting palms down on your thighs.\n\nNotice the floor under your feet. Notice the seat under you. Let your weight be held by what is underneath you.\n\nYou do not have to hold yourself up. The earth is doing it.",
      },
      {
        kind: 'name',
        label: 'Name what is here',
        durationSec: 90,
        body:
          "The Root holds your sense of safety. When it is tight, the body lives in low-grade fear — even when there is no real threat in front of you.\n\nBring your attention to the base of your spine, between the seat bones. What is the sensation here?\n\nTight? Heavy? Numb? Warm?\n\nYou are not changing anything. Just naming.",
      },
      {
        kind: 'breathe',
        label: 'Breathe to ground',
        durationSec: 240,
        body:
          "We breathe long and slow into the lowest part of the body.\n\nInhale through the nose for four counts. Feel the air go all the way down — past the chest, past the belly, into the pelvic bowl.\n\nHold gently for two.\n\nExhale through the mouth for six counts. Slow. Long. Audible.\n\nDo this for two minutes. Each exhale is the body settling lower into the floor.",
      },
      {
        kind: 'witness',
        label: 'Witness the fear',
        durationSec: 180,
        body:
          "Now ask the body: where in my life am I afraid right now?\n\nMoney. Safety. Belonging. Survival. The body knows. Let one answer rise.\n\nDo not solve it. Do not justify it. Do not fix it. Just let yourself feel it for thirty seconds.\n\nFear is not your enemy. It is the body telling you it has been holding something alone for too long.",
      },
      {
        kind: 'release',
        label: 'Move it down',
        durationSec: 120,
        body:
          "Visualize the fear as a dense colour gathered at the base of your spine. Brown. Grey. The colour of stone.\n\nWith each exhale, watch it move down through your legs, into your feet, out into the earth beneath you.\n\nThe earth has been composting heavier things than this for billions of years. It can hold it.\n\nKeep exhaling until the colour is gone.",
      },
      {
        kind: 'activate',
        label: 'Fill with red',
        durationSec: 90,
        body:
          "Now let a clear, vital red rise from the earth — through your feet, your legs, into the base of your spine.\n\nThis is not aggression. This is your right to be here.\n\nWhisper or think: I am here. I belong on this earth. I am safe in my own body.\n\nLet the red settle and pulse.",
      },
      {
        kind: 'seal',
        label: 'Seal',
        durationSec: 60,
        body:
          "Take one slow breath in.\n\nOne slow breath out.\n\nFeel your weight on the seat again. Feel the floor again.\n\nWhen you open your eyes, the work continues — but the chamber is closed.",
      },
    ],
  },

  // ─── 2. SACRAL — Removing Guilt ───────────────────────────
  {
    id: 'unblock-sacral',
    chakraId: 'sacral',
    title: 'Unblock the Sacral',
    tagline: 'Release guilt and reclaim the right to feel pleasure.',
    blockingEmotion: 'Guilt',
    totalMinutes: 13,
    steps: [
      {
        kind: 'arrive',
        label: 'Arrive',
        durationSec: 90,
        body:
          "Lie down or sit comfortably. Place one hand softly below your navel, on your lower belly.\n\nLet the hand be heavy. Feel the warmth of it through your skin.\n\nThis is the home of your Sacral — your creative, sensual, emotional centre. The first place you ever felt joy. The first place you ever felt shame.",
      },
      {
        kind: 'name',
        label: 'Name what is here',
        durationSec: 120,
        body:
          "The Sacral runs guilt — that quiet voice that says you do not deserve pleasure, that wanting is dangerous, that joy must be paid for.\n\nNotice the belly under your hand. Soft? Tight? Numb? Aching?\n\nBring to mind one thing in your life right now that you feel quietly guilty about. Not a big confession. The small one. The one that has been living in your belly.",
      },
      {
        kind: 'breathe',
        label: 'Breathe into the belly',
        durationSec: 180,
        body:
          "Breathe so the belly rises and falls under your hand. Not the chest. The belly.\n\nInhale slow through the nose — feel the belly push out into your hand.\n\nExhale through the mouth — feel the belly soften, release.\n\nDo this for ninety seconds. Each breath is permission for the body to take up the room it actually takes up.",
      },
      {
        kind: 'witness',
        label: 'Witness the guilt',
        durationSec: 150,
        body:
          "Now bring that guilty thing back to mind. Hold it gently in your awareness.\n\nAsk: where did I learn that this was wrong?\n\nMost guilt is inherited — borrowed from a parent, a culture, a religion, a partner. It was never yours to carry.\n\nLet the question sit. Do not answer too fast. The body knows.",
      },
      {
        kind: 'release',
        label: 'Let it move',
        durationSec: 120,
        body:
          "Imagine a warm orange water filling your lower belly.\n\nIt moves slowly — like honey, like sunset — washing through every place that has been gripping. Hips. Lower back. Pelvic floor.\n\nThe water carries the borrowed guilt out through the soles of your feet. Watch it leave.\n\nWhat stays is yours. What was never yours, the water takes.",
      },
      {
        kind: 'activate',
        label: 'Activate desire',
        durationSec: 90,
        body:
          "Bring to mind one thing you actually want. Not should-want. Actually want.\n\nA pleasure. A creative project. A person. A flavor. A morning.\n\nLet your belly feel it. Notice the warmth there.\n\nWhisper or think: I am allowed to want. I am allowed to receive. My pleasure is not a debt.",
      },
      {
        kind: 'seal',
        label: 'Seal',
        durationSec: 60,
        body:
          "Take one breath into the belly. Hold for two.\n\nExhale, and let the hand stay there for ten more seconds — just feeling.\n\nThe Sacral is closed for today. The wanting is yours to keep.",
      },
    ],
  },

  // ─── 3. SOLAR PLEXUS — Removing Shame ─────────────────────
  {
    id: 'unblock-solar-plexus',
    chakraId: 'solar-plexus',
    title: 'Unblock the Solar Plexus',
    tagline: 'Burn off the shame underneath your sense of self.',
    blockingEmotion: 'Shame',
    totalMinutes: 14,
    steps: [
      {
        kind: 'arrive',
        label: 'Arrive',
        durationSec: 90,
        body:
          "Sit tall. Hands resting open on your thighs, palms up.\n\nClose your eyes if it feels safe. If not, soften your gaze toward the floor a few feet ahead.\n\nNotice the fire in your belly. Even when you feel small, it is there.",
      },
      {
        kind: 'name',
        label: 'Name what is here',
        durationSec: 120,
        body:
          "The Solar Plexus runs your sense of self. When it is blocked, the dominant feeling is shame — the quiet certainty that you are, at some core level, not enough or too much.\n\nBring your attention to the area between your navel and your sternum. The belt of fire.\n\nWhat is the sensation? Bright? Sluggish? Held? Gripped?",
      },
      {
        kind: 'breathe',
        label: 'Stoke the fire',
        durationSec: 180,
        body:
          "We breathe with effort here, to wake the centre.\n\nInhale sharply through the nose for two counts — like you are smelling something.\n\nExhale forcefully through the nose for two counts — like a small, controlled puff.\n\nKeep the rhythm short and active. Two minutes. The belly will warm.\n\n(If you feel light-headed, slow down. This is activating, not depleting.)",
      },
      {
        kind: 'witness',
        label: 'Meet the shame',
        durationSec: 150,
        body:
          "Now slow the breath. Let it return to normal.\n\nAsk yourself: what is the sentence I tell myself when no one is watching?\n\nI am too much. I am not enough. I should be further along. I am secretly a fraud.\n\nLet the sentence rise. Do not argue with it. Just see it written across the wall in front of you.",
      },
      {
        kind: 'release',
        label: 'Burn it off',
        durationSec: 120,
        body:
          "Imagine the sentence is written on paper. Take that paper and put it into the bright yellow fire in your solar plexus.\n\nWatch it curl. Watch it blacken. Watch it turn to ash.\n\nThe fire is older than the shame. The fire was here first.\n\nLet the ash drift down and out.",
      },
      {
        kind: 'activate',
        label: 'Reclaim the centre',
        durationSec: 90,
        body:
          "Now let a clear, golden yellow expand from your solar plexus outward — to your ribs, your back, your shoulders, your throat.\n\nWhisper or think: I am the source of my own worth. My yes is mine. My no is mine. I do not require permission to be who I am.\n\nLet the gold fill the room around you.",
      },
      {
        kind: 'seal',
        label: 'Seal',
        durationSec: 60,
        body:
          "One slow breath in.\n\nOne slow breath out.\n\nPlace your hand briefly over your solar plexus and press gently. Feel the warmth.\n\nThe centre is closed. The fire stays.",
      },
    ],
  },

  // ─── 4. HEART — Removing Grief ─────────────────────────────
  {
    id: 'unblock-heart',
    chakraId: 'heart',
    title: 'Unblock the Heart',
    tagline: 'Make room for grief that has been quietly held.',
    blockingEmotion: 'Grief',
    totalMinutes: 15,
    steps: [
      {
        kind: 'arrive',
        label: 'Arrive',
        durationSec: 90,
        body:
          "Sit or lie down. Place both hands over your heart, one on top of the other.\n\nFeel the rise and fall under your palms.\n\nThis is one of the most loyal places in your body. It has been beating for you, without asking, your entire life.",
      },
      {
        kind: 'name',
        label: 'Name what is here',
        durationSec: 120,
        body:
          "The Heart holds grief — sometimes from a single loss you can name, sometimes from many small losses no one ever acknowledged.\n\nNotice the chest under your hands. Open? Tight? Aching? Numb?\n\nAsk the body: who or what am I still grieving?\n\nLet a name rise. It might be a person, a relationship, a version of yourself, a possibility that did not happen.",
      },
      {
        kind: 'breathe',
        label: 'Open the chest',
        durationSec: 180,
        body:
          "We breathe wide here, to make room.\n\nInhale through the nose for four counts — feel the chest lift, the ribs widen.\n\nExhale through the nose for six counts — feel the heart settle, the shoulders drop.\n\nThree minutes. Each inhale makes more room. Each exhale puts down what does not need to be carried right now.",
      },
      {
        kind: 'witness',
        label: 'Let the wave come',
        durationSec: 180,
        body:
          "Bring to mind the person, situation, or version of yourself you are grieving.\n\nIf tears come, let them. If they do not come, that is also okay. Grief does not always look like crying.\n\nThe body has its own timing. We are giving it three minutes of permission.\n\nYou do not have to fix this. You do not have to be done with it. You are just letting it be felt.",
      },
      {
        kind: 'release',
        label: 'Send it the love',
        durationSec: 120,
        body:
          "Imagine the person or thing you are grieving in front of you. Whether they are alive, gone, or never were.\n\nSay to them, in your mind: I loved you. I love you. I am still here.\n\nSee a soft green light moving from your chest to them. The thread does not break. It just changes shape.\n\nWhat you loved is not lost. It became part of how you love.",
      },
      {
        kind: 'activate',
        label: 'Fill the chest',
        durationSec: 90,
        body:
          "Let the soft green expand inside your own chest now. Filling every place that was sealed off.\n\nWhisper or think: My heart can hold this. My heart can hold more than this. I am still soft. I am still open.",
      },
      {
        kind: 'seal',
        label: 'Seal',
        durationSec: 60,
        body:
          "Press your hands gently into your chest.\n\nOne breath in. One breath out.\n\nThe heart is closed for today. It will open again tomorrow if it needs to.",
      },
    ],
  },

  // ─── 5. THROAT — Removing Lies ─────────────────────────────
  {
    id: 'unblock-throat',
    chakraId: 'throat',
    title: 'Unblock the Throat',
    tagline: 'Move out the truths you have been swallowing.',
    blockingEmotion: 'Lies (told and untold)',
    totalMinutes: 13,
    steps: [
      {
        kind: 'arrive',
        label: 'Arrive',
        durationSec: 90,
        body:
          "Sit upright with the chin slightly lifted — not pushed forward, just unstuck.\n\nPlace one hand softly across the front of your throat. Light contact.\n\nSwallow once, slowly. Notice how it feels. The throat has been doing a lot of holding.",
      },
      {
        kind: 'name',
        label: 'Name what is here',
        durationSec: 120,
        body:
          "The Throat blocks when truths have been swallowed instead of spoken — yours that you did not say, and others' that you accepted as true when they were not.\n\nBring your attention to the front of your neck. Tight? Sore? Held?\n\nAsk: what truth have I been carrying that I have not let out?",
      },
      {
        kind: 'breathe',
        label: 'Open the channel',
        durationSec: 150,
        body:
          "We breathe in a way that wakes the throat.\n\nInhale through the nose for three counts.\n\nExhale through the mouth — but make a soft 'haa' sound. Audible. Like fogging a mirror.\n\nDo this for two and a half minutes. The throat warms, opens, remembers it has a voice.",
      },
      {
        kind: 'witness',
        label: 'Find the unsaid',
        durationSec: 150,
        body:
          "Now sit quietly and ask: what is the truth I most need to say — and to whom?\n\nIt might be 'I am not okay'. It might be 'I do not love you anymore'. It might be 'I want more'. It might be 'I am sorry'. It might be 'no'.\n\nLet the sentence rise. You do not have to say it out loud. Just let it stop being hidden from yourself.",
      },
      {
        kind: 'release',
        label: 'Say it (somewhere)',
        durationSec: 90,
        body:
          "Now actually use your voice.\n\nWhisper, hum, or say the truth out loud — to the empty room, to the air, to no one.\n\nThe body needs to hear the sound of it leaving you. That is the medicine. Whether the other person ever hears it is a separate question.",
      },
      {
        kind: 'activate',
        label: 'Fill with blue',
        durationSec: 90,
        body:
          "Imagine a clear, bright blue light at the front of your throat.\n\nIt expands, soothing every place that was held.\n\nWhisper or think: My voice is mine. My truth does not need permission. I will not lie to myself anymore.",
      },
      {
        kind: 'seal',
        label: 'Seal',
        durationSec: 60,
        body:
          "One slow breath in. One slow breath out.\n\nLet the hand fall from your throat.\n\nThe channel is open. What needs to be said next, you will say when the moment arrives.",
      },
    ],
  },

  // ─── 6. THIRD EYE — Removing Illusion ──────────────────────
  {
    id: 'unblock-third-eye',
    chakraId: 'third-eye',
    title: 'Unblock the Third Eye',
    tagline: 'Clear the illusions that have been mistaken for truth.',
    blockingEmotion: 'Illusion (of separation)',
    totalMinutes: 13,
    steps: [
      {
        kind: 'arrive',
        label: 'Arrive',
        durationSec: 90,
        body:
          "Sit upright. Eyes closed. Bring your attention to the space between and just above your eyebrows.\n\nDo not strain. Just rest your awareness there, like resting a finger on a soft surface.\n\nThis is the centre that sees clearly when the rest of the noise gets quiet.",
      },
      {
        kind: 'name',
        label: 'Name the illusion',
        durationSec: 150,
        body:
          "The Third Eye is blocked when you have mistaken a story for the truth.\n\n'I am alone in this.'\n'No one is coming to help.'\n'I have to figure it all out by myself.'\n'Other people have it more together than I do.'\n\nWhich of those — or one like it — has been running in the background of your week?\n\nLet it surface. Without judgment.",
      },
      {
        kind: 'breathe',
        label: 'Quiet the noise',
        durationSec: 180,
        body:
          "We breathe to slow the inner narrator.\n\nInhale through the LEFT nostril for four counts (close the right with your thumb).\n\nExhale through the RIGHT nostril for four counts (close the left with your ring finger).\n\nInhale right. Exhale left. Continue.\n\nThree minutes. The two halves of the brain begin to settle.",
      },
      {
        kind: 'witness',
        label: 'Look at the story',
        durationSec: 150,
        body:
          "Bring the illusion you named back to mind.\n\nAsk: how do I know this is true?\n\nMost of the time, it is not. It is a thought that has been told to itself so many times it feels like fact.\n\nLook at the story like you are looking at a sentence on a page. Not at it from inside it. At it from outside.",
      },
      {
        kind: 'release',
        label: 'Let it dissolve',
        durationSec: 120,
        body:
          "Imagine the illusion as a thin veil of smoke between you and reality.\n\nWith each exhale, watch the smoke clear.\n\nWhat is actually here, behind the smoke, when you see it directly?\n\nProbably: more support than you knew. More resource than you remembered. More options than the story allowed.",
      },
      {
        kind: 'activate',
        label: 'Open the eye',
        durationSec: 90,
        body:
          "Imagine an indigo light expanding from the centre of your forehead outward.\n\nWhisper or think: I see what is actually here. I trust what I see. I do not have to know everything to take the next step.",
      },
      {
        kind: 'seal',
        label: 'Seal',
        durationSec: 60,
        body:
          "One breath in. One breath out.\n\nGently open your eyes. Look around the room.\n\nNotice — slowly — what is actually in front of you. Not the story about it. Just what is there.",
      },
    ],
  },

  // ─── 7. CROWN — Removing Earthly Addictions ────────────────
  {
    id: 'unblock-crown',
    chakraId: 'crown',
    title: 'Unblock the Crown',
    tagline: 'Loosen the grip of the small life so the larger one can come through.',
    blockingEmotion: 'Earthly addictions / 3D world',
    totalMinutes: 12,
    steps: [
      {
        kind: 'arrive',
        label: 'Arrive',
        durationSec: 90,
        body:
          "Sit comfortably. Spine long. Bring your attention to the very top of your head.\n\nImagine the crown is slightly opening — like a flower at the start of bloom.\n\nThis is the place where you stop being only your own small story.",
      },
      {
        kind: 'name',
        label: 'Name the grip',
        durationSec: 120,
        body:
          "The Crown is blocked when life has become too small — when daily survival or addictive patterns crowd out the larger sense of meaning.\n\nAsk: what have I been gripping so tightly that there is no room for anything bigger to enter?\n\nA goal. A relationship outcome. A role. A substance. A story about myself.",
      },
      {
        kind: 'breathe',
        label: 'Lengthen the breath',
        durationSec: 180,
        body:
          "Inhale slowly through the nose for four counts.\n\nHold gently for seven counts.\n\nExhale through the mouth for eight counts. Long. Audible.\n\nThree minutes. The longer exhale tells the body it is safe to surrender.",
      },
      {
        kind: 'witness',
        label: 'Loosen the grip',
        durationSec: 120,
        body:
          "Bring back the thing you named — the thing you have been gripping.\n\nAsk: what would it feel like to want this without needing it?\n\nNot to give it up. Not to pretend you do not care. Just to hold it more loosely.\n\nNotice — does the body soften when you imagine that?",
      },
      {
        kind: 'release',
        label: 'Surrender the timeline',
        durationSec: 90,
        body:
          "Whisper or think: I do not have to control the timing of this.\n\nI release the deadline. I release the version of how it has to look. I release the need to make it happen by force.\n\nWhat is meant to come, will come.",
      },
      {
        kind: 'activate',
        label: 'Open the crown',
        durationSec: 90,
        body:
          "Imagine a soft violet-white light pouring in through the top of your head.\n\nIt fills the skull, the brain, every cell that was tense from gripping.\n\nWhisper or think: I am held by something larger than my own effort. I do not have to do this alone.",
      },
      {
        kind: 'seal',
        label: 'Seal',
        durationSec: 60,
        body:
          "One slow breath in.\n\nOne slow breath out.\n\nFeel the top of your head. Not opening, not closing. Just here.\n\nThe Crown is closed for today. The connection stays.",
      },
    ],
  },

  // ─── 8. SOUL STAR — Removing Time-Bound Identity ───────────
  {
    id: 'unblock-soul-star',
    chakraId: 'soul-star',
    title: 'Unblock the Soul Star',
    tagline: 'Step out of time long enough to remember who is underneath.',
    blockingEmotion: 'Illusion of space and time',
    totalMinutes: 12,
    steps: [
      {
        kind: 'arrive',
        label: 'Arrive',
        durationSec: 90,
        body:
          "Sit or lie down. Bring your attention to the space about a hand's width above the top of your head.\n\nNot at the body. Just above it.\n\nThis is the centre that exists outside of clock time. The part of you that was here before the day, and will be here after it.",
      },
      {
        kind: 'name',
        label: 'Name the urgency',
        durationSec: 120,
        body:
          "The Soul Star tightens when you have been living entirely in time — racing toward the future, dragging the past, measuring your life in productivity.\n\nAsk: where am I living in a hurry that the situation does not actually require?\n\nNotice the hum of urgency. Just notice.",
      },
      {
        kind: 'breathe',
        label: 'Stretch the time between breaths',
        durationSec: 180,
        body:
          "Inhale through the nose for five counts.\n\nHold at the top for five counts. Empty hold.\n\nExhale through the nose for five counts.\n\nHold at the bottom for five counts. Empty hold.\n\nThis is box breathing — slowed. Three minutes. Each holding teaches the body that there is no rush.",
      },
      {
        kind: 'witness',
        label: 'Drop the role',
        durationSec: 90,
        body:
          "Drop, one at a time, the identities you carry.\n\nI am not only my work.\nI am not only my body.\nI am not only my relationships.\nI am not only my history.\nI am not only my plans for the future.\n\nWhat is left, when those drop away for thirty seconds?",
      },
      {
        kind: 'release',
        label: 'Step outside time',
        durationSec: 90,
        body:
          "Imagine yourself looking back at this moment from one year in the future.\n\nNow ten years.\n\nNow at the end of your life.\n\nFrom there, look at this version of you — sitting here, doing this practice. What does the older you most want this version to know?\n\nLet that message land.",
      },
      {
        kind: 'activate',
        label: 'Anchor in presence',
        durationSec: 90,
        body:
          "Let an iridescent white light gather above your crown.\n\nWhisper or think: I am not only this day. I am not only this struggle. I am the witness underneath all of it.\n\nThe witness was here before this. The witness will be here after this.",
      },
      {
        kind: 'seal',
        label: 'Seal',
        durationSec: 60,
        body:
          "One breath in.\n\nOne breath out.\n\nFeel your weight in the chair, the bed, or the floor again.\n\nYou returned. You always do. The work was the leaving and the coming back.",
      },
    ],
  },
];

// ============ HELPERS ============

export function getUnblockingScript(id: string): UnblockingScript | undefined {
  return SCRIPTS.find((s) => s.id === id);
}

export function getScriptByChakra(
  chakraId: SpineChakraId
): UnblockingScript | undefined {
  return SCRIPTS.find((s) => s.chakraId === chakraId);
}

export const ALL_UNBLOCKING_SCRIPTS = SCRIPTS;
