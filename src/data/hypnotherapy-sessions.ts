/**
 * Within — standalone hypnotherapy sessions.
 *
 * Five bespoke single-session hypnotherapies for specific moments:
 * confidence boost, sleep reset, anxiety release, decision clarity,
 * inner-critic mute. Each is a complete ~10-15 minute session — not
 * part of a multi-day arc.
 *
 * Architecture matches the NRM stack:
 *   - Mouth-exhale breath induction
 *   - Sleep-trigger countdown
 *   - Cloud-thought drift (or extended for sleep / anxiety)
 *   - Bespoke per-session core mechanic
 *   - Completed-tense identity install
 *   - Exit style matched to session goal
 *
 * For ElevenLabs TTS — voice id kHL7MFWSwpF69uhr0qwj, model
 * eleven_turbo_v2_5, stability 0.7, similarity 0.85, style 0.15.
 */

import type { ChakraKey } from '@/types';

export type HypnoMood = 'urgent' | 'calming' | 'restorative' | 'clarifying' | 'empowering';

export interface HypnoSession {
  id: string;
  title: string;
  subtitle: string;
  durationMin: number;
  mood: HypnoMood;
  /** Short description for the card view. */
  blurb: string;
  /** Pre-session intent — what to bring. */
  intent: string;
  /** Post-session journal prompt. */
  journalPrompt: string;
  /** Hex color for the card accent. */
  color: string;
  /** Optional chakra resonance. */
  chakra?: ChakraKey;
  /** Full hypnotherapy script — ready for ElevenLabs. */
  script: string;
  /** When in the day this session is best suited (UI hint only). */
  bestTime?: 'morning' | 'midday' | 'evening' | 'before-bed' | 'anytime';
}

// ─────────── SHARED SCRIPT BLOCKS ───────────

const arrivalBreath = `Welcome back. Find your seat.

Take one deep breath in through your nose… and all the way out through your mouth. Letting go.

One more time. Deep breath in… and all the way out.

And my voice. And my voice. And my voice.

Let the eyelids close. Let the jaw soften. The shoulders drop. The body becomes heavier with every breath that you take.`;

const sleepTrigger = `In a moment I'm going to say the word — sleep. And when I say it, it will take you a thousand times deeper into this state of relaxation.

Three… two… one… sleep.

All the way down. Every word from here is going to take you deeper. And deeper. And deeper.`;

const cloudDrift = `Any thoughts, any fears, any worries — they float out of your mind like clouds into the sky. So that you can fully focus on the words that you hear.`;

// ─────────── THE FIVE STANDALONE SESSIONS ───────────

const CONFIDENCE_BOOST: HypnoSession = {
  id: 'confidence-boost',
  title: 'Confidence Before',
  subtitle: 'A 10-minute install before a moment that matters.',
  durationMin: 10,
  mood: 'empowering',
  blurb: 'Before the pitch, the interview, the difficult conversation. Drop in, install the body of confidence, walk in as her.',
  intent: 'Bring a specific moment — the one you want to feel ready for.',
  journalPrompt: 'The version of me who walks into this moment ready. What does she carry that I have not been carrying?',
  color: '#D4AF6E',
  chakra: 'solar',
  bestTime: 'morning',
  script: [
    arrivalBreath,
    '',
    sleepTrigger,
    '',
    cloudDrift,
    '',
    `In this state, I want you to bring forward the moment you are preparing for. The meeting. The conversation. The pitch. The room you are about to walk into.`,
    ``,
    `See yourself standing just outside that room. The door is closed. You can see it.`,
    ``,
    `Now I want you to feel — in your body — what has been there when you have imagined this moment. Notice the tightness. The stomach. The shoulders. The breath that goes shallow when you think about it.`,
    ``,
    `That body is not the body that walks into this room. That body has been preparing for danger. There is no danger in this room. The danger is a story your nervous system has been telling you.`,
    ``,
    `So now we install a different body.`,
    ``,
    `Imagine the version of you who has done this a thousand times. Who is calm because she has earned the calm. Look at her standing beside you.`,
    ``,
    `Look at her shoulders. They are down. Drop yours to match.`,
    ``,
    `Look at her jaw. It is soft. The teeth are not touching. Soften yours to match.`,
    ``,
    `Look at her breath. It is reaching the bottom of her belly without effort. Three seconds in. Four seconds out. Match it.`,
    ``,
    `Look at her hands. They are not gripping. They are open or held loosely. Open yours.`,
    ``,
    `Look at her eyes. They are looking forward, not down. The gaze is steady, not searching for approval.`,
    ``,
    `Now — step into her body. Not next to her. Into her.`,
    ``,
    `Feel her shoulders as your shoulders. Her breath as your breath. Her steadiness as your steadiness. Her certainty as your certainty.`,
    ``,
    `This is the body that walks into the room. Not the bracing body. This one.`,
    ``,
    `And know — what you are about to do, you have already done a hundred times. The conversation has already happened. The pitch has already landed. The outcome has already been received. Everything in your life that was once a goal is now here. It is done.`,
    ``,
    `If you can feel this body — if you can feel this calm — then this calm already exists in you. It is not something you have to manufacture. It is here.`,
    ``,
    `In a moment, you will open your eyes. You will be in the room. The body you bring is this body. The breath you bring is this breath. The voice you bring is this voice.`,
    ``,
    `Take one last deep breath in… and as you exhale, you walk through the door.`,
    ``,
    `Eyes open. Ready. The shift has happened.`,
  ].join('\n'),
};

const SLEEP_RESET: HypnoSession = {
  id: 'sleep-reset',
  title: 'Drift to Sleep',
  subtitle: 'A 15-minute descent into deep, restorative sleep.',
  durationMin: 15,
  mood: 'restorative',
  blurb: 'For the racing mind at midnight. A long, slow induction designed to carry you into actual sleep — not just relaxation.',
  intent: 'Play this lying down, in bed, with the lights off. Let it carry you under.',
  journalPrompt: '(In the morning) What I let go of last night. What I woke up without.',
  color: '#5C5C8A',
  chakra: 'crown',
  bestTime: 'before-bed',
  script: [
    `Welcome to your descent.`,
    ``,
    `You are already in bed. The lights are already low. There is nothing more for you to do today. Everything that needed to be carried — has been carried. Everything that needed to be said — has been said. Everything that did not get done — that is for tomorrow.`,
    ``,
    `Take one deep breath in through your nose… and all the way out through your mouth.`,
    ``,
    `And another. Slow. Slower. Even slower.`,
    ``,
    `Let the eyelids close. Let the body become heavy in the bed. The mattress is holding you completely. You do not need to hold yourself up.`,
    ``,
    `In a moment I will say the word sleep. And when I say it, your body will sink another layer deeper. Three… two… one… sleep.`,
    ``,
    `Heavier with every breath. Slower with every breath. Quieter with every breath.`,
    ``,
    `Now take your attention to your mind. All of the overthinking. All of the repetitive thoughts. Ninety-five percent of them were the same thoughts you had yesterday. They do not need you tonight.`,
    ``,
    `There is a glass elevator in the back of your head. And all of those thoughts file into it. One after another. The day's worries. The unfinished tasks. The replays of conversations. The plans for tomorrow.`,
    ``,
    `Let them in. The elevator can hold them all.`,
    ``,
    `Now the elevator goes down. Down the back of your spine. Down into the bed. Down into the floor. Down into the earth beneath the house. Down. Down. And it disappears.`,
    ``,
    `Everything goes blank.`,
    ``,
    `And now we move through the body. Each part lets go in turn.`,
    ``,
    `The forehead. Smooth. Heavier. Letting go.`,
    ``,
    `The space between the eyebrows. Soft. Heavier. Letting go.`,
    ``,
    `The eyes. Resting deep in their sockets. Letting go.`,
    ``,
    `The jaw. The tongue. The throat. Letting go.`,
    ``,
    `The shoulders. Falling further into the bed. Letting go.`,
    ``,
    `The arms. The hands. The fingers. Letting go.`,
    ``,
    `The chest. The breath getting slower. Slower. Letting go.`,
    ``,
    `The stomach. The lower back. The hips. Letting go.`,
    ``,
    `The thighs. Heavy. Letting go.`,
    ``,
    `The knees. The calves. Letting go.`,
    ``,
    `The ankles. The feet. The toes. Letting go.`,
    ``,
    `The whole body is heavy now. Soft. Held by the bed. Held by the night. There is nothing you need to do.`,
    ``,
    `And in the quiet now — the only thing left is the breath. Slow. Easy. Each breath taking you one layer deeper.`,
    ``,
    `Sleep is coming up to meet you. You do not have to chase it. You do not have to find it. It is finding you.`,
    ``,
    `Drift now. There is no end to this session. There is only sleep on the other side of these words. And the next time you are aware of anything — it will be morning.`,
    ``,
    `Drift. Drift. Drift.`,
    ``,
    `Goodnight.`,
  ].join('\n'),
};

const ANXIETY_RELEASE: HypnoSession = {
  id: 'anxiety-release',
  title: 'Anxiety Release',
  subtitle: 'A 12-minute paradoxical descent to dissolve activation.',
  durationMin: 12,
  mood: 'calming',
  blurb: 'For the moments the body is racing and the mind cannot catch up. Uses the Ericksonian paradox: the more you focus on the anxiety, the more relaxed you become.',
  intent: 'Notice the anxiety in your body before you begin. Do not push it away.',
  journalPrompt: 'The anxiety I was carrying — when I look at it now, what was it actually about?',
  color: '#7AA8C7',
  chakra: 'heart',
  bestTime: 'anytime',
  script: [
    arrivalBreath,
    ``,
    sleepTrigger,
    ``,
    `Now I want you to do something that may sound counterintuitive.`,
    ``,
    `Do not try to push the anxiety away. Do not try to relax. Do not try to make this feeling go.`,
    ``,
    `Instead — go towards it.`,
    ``,
    `Locate it in the body. Where is it living? The chest? The throat? The solar plexus? The stomach? Find the place.`,
    ``,
    `And here is the strange thing. The more you focus on it — the more relaxed you feel. The more you observe it — the more it softens. The more you let it be — the more it dissolves on its own.`,
    ``,
    `That is the law of this work. Resistance creates the persistence. Observation creates the release.`,
    ``,
    `So look at it. What shape does it want to take? Is it a knot? A weight? A buzzing? A heat?`,
    ``,
    `Let it have its shape. Do not fight it.`,
    ``,
    `And notice — already, just by observing it — it has loosened a little. The grip is less. The intensity is lower.`,
    ``,
    `Now I want you to know something true. The thing that the anxiety is responding to — it is not actually happening right now. The body is in danger-mode for a future that has not arrived, or a past that already ended.`,
    ``,
    `In this present moment — right here, right now — there is no danger. There is only the bed or the chair beneath you. The breath in your body. The voice in your ears. The room around you.`,
    ``,
    `Your nervous system is responding to a story. Today, we end the story.`,
    ``,
    `As you continue to observe the place in the body where the anxiety lives — imagine it being held in a soft, warm hand. Not crushed. Not removed. Just held.`,
    ``,
    `The hand is yours. The wisest, most compassionate version of you. The one who has survived everything you have ever survived. She is holding this part of you.`,
    ``,
    `And the part begins to soften. To uncurl. To breathe again.`,
    ``,
    `Notice the body now. The chest is lower. The breath is deeper. The buzzing has quieted. Where the anxiety used to live — there is space.`,
    ``,
    `Everything in your life that you were afraid of — has either already happened, or has not happened yet. Neither one is happening in this moment. This moment is okay. This breath is okay. You are okay.`,
    ``,
    `If you can feel this softness — then this softness already exists in you. It is not something you have to earn. It is here.`,
    ``,
    `In a moment, when you come back, you will carry this softness into the day. Into the next conversation. Into the next decision. The thing you were afraid of is smaller than the version of you who can meet it.`,
    ``,
    `Take one last deep breath in… and as you exhale, you bring this softness with you.`,
    ``,
    `Eyes open when you are ready. The release has happened.`,
  ].join('\n'),
};

const DECISION_CLARITY: HypnoSession = {
  id: 'decision-clarity',
  title: 'Decision Clarity',
  subtitle: 'A 10-minute glimpse of both paths — the body knows.',
  durationMin: 10,
  mood: 'clarifying',
  blurb: 'For the moments you are stuck between options. Walk down each pathway briefly. The body, not the mind, will tell you which one is yours.',
  intent: 'Bring a specific decision — the one that has been on your mind. State it clearly to yourself before you begin.',
  journalPrompt: 'The answer my body gave me. What I noticed about each path. Which one I am choosing.',
  color: '#5C7AA8',
  chakra: 'thirdEye',
  bestTime: 'midday',
  script: [
    arrivalBreath,
    ``,
    sleepTrigger,
    ``,
    cloudDrift,
    ``,
    `In this state, I want you to bring forward the decision that has been on your mind.`,
    ``,
    `Say it clearly to yourself. Option A or option B. Stay or go. Yes or no. The specific decision.`,
    ``,
    `Good.`,
    ``,
    `Now imagine yourself standing at a crossroads. Two pathways. One to your left. One to your right.`,
    ``,
    `Each path represents one of the two options.`,
    ``,
    `We are going to walk down each, briefly, and notice what the body does. The mind has been arguing. The body has the answer. We have been ignoring her.`,
    ``,
    `Walk down the LEFT path first.`,
    ``,
    `You are now living the choice that is on the left. A week into it. Notice the body. The shoulders. The breath. The stomach.`,
    ``,
    `Walk a month into it. Notice the body again. What is the chest doing? Is it open or tight? Is there energy or heaviness?`,
    ``,
    `A year into it. Look at the version of you who is living this choice. Look at her face. Listen to her tone of voice. Notice what she does when she walks into a room.`,
    ``,
    `Now come back to the crossroads. Take a breath. Let that pathway settle.`,
    ``,
    `Now walk down the RIGHT path.`,
    ``,
    `A week into the other choice. Notice the body. What is different from the left path?`,
    ``,
    `A month in. The body again. Open or tight? Energized or drained?`,
    ``,
    `A year into it. Look at this version of you. Look at her face. Listen to her tone of voice.`,
    ``,
    `Now come back to the crossroads. Stand between the two paths.`,
    ``,
    `And here is what I want you to know. The mind will give you reasons. The body has already chosen.`,
    ``,
    `Which path made the body open? Which one made the breath deepen? Which one made the stomach soften? Which one made the version of you a year out look more like the woman you actually want to be?`,
    ``,
    `Do not think the answer. Feel it.`,
    ``,
    `The answer is already in you. It has been there the whole time. The mind has been arguing against it because the chosen path is harder, or scarier, or requires you to disappoint someone. But the body knows.`,
    ``,
    `Trust her.`,
    ``,
    `In a moment, when you come back, you will know what to do. You may not have all the steps. But you will know which path is yours.`,
    ``,
    `Once you fully understand which path the body chose… you can open your eyes.`,
  ].join('\n'),
};

const INNER_CRITIC_MUTE: HypnoSession = {
  id: 'inner-critic-mute',
  title: 'Mute the Inner Critic',
  subtitle: 'A 12-minute return-the-voice sovereignty install.',
  durationMin: 12,
  mood: 'empowering',
  blurb: 'For when the voice in your head has been louder than your own. Find the face it actually belongs to. Hand the voice back. Hear your own.',
  intent: 'Notice the critic\'s voice today. The exact phrasing. The exact tone.',
  journalPrompt: 'My own voice — the one underneath the critic. What does she actually want me to know?',
  color: '#A04B3C',
  chakra: 'throat',
  bestTime: 'morning',
  script: [
    arrivalBreath,
    ``,
    sleepTrigger,
    ``,
    cloudDrift,
    ``,
    `In this state, I want you to listen to the voice.`,
    ``,
    `The voice that has been criticizing you. The voice that says you are not enough. The voice that says you are too much. The voice that says you should be further along, or doing it differently, or smarter, or thinner, or more.`,
    ``,
    `Listen to its tone.`,
    ``,
    `Listen to its rhythm.`,
    ``,
    `Listen to the specific phrases it likes to use.`,
    ``,
    `And here is the truth your subconscious already knows. That voice is not yours. It never was. It was given to you. You absorbed it before you had any defence against it.`,
    ``,
    `Now I want you to find the face.`,
    ``,
    `Whose voice is this, actually? Don't think. Let the answer arrive on its own. A face. A name. A specific room from your past.`,
    ``,
    `There they are.`,
    ``,
    `It may be a parent. A teacher. A coach. A partner from a long time ago. Someone who once told you, with their words or their face or their silence, that you were not enough.`,
    ``,
    `Look at them now.`,
    ``,
    `And know — no one is coming to override what they said. No one is coming to tell you you are enough. No one is coming to give you permission. You decide.`,
    ``,
    `So in this state, you walk towards the face. You stand in front of them. And you say to them, softly, but clearly: thank you for keeping this for me. I have it from here. You can take your voice back now.`,
    ``,
    `Watch them receive it. Watch them turn and walk away. The voice is going with them. It is no longer in your head.`,
    ``,
    `And in the silence that follows — for the first time in a long time — you hear your own voice.`,
    ``,
    `Listen.`,
    ``,
    `Notice the tone. The steadiness. The complete absence of accusation. This is what you have sounded like, underneath, all along. The borrowed voice was just louder.`,
    ``,
    `Your own voice says: I am worthy. Right now. As I am. Without changing a single thing.`,
    ``,
    `Say it again, in your mind: I am worthy.`,
    ``,
    `And as you say it, imagine a ball of warm gold light expanding from the centre of your chest. Out through the shoulders. Up through the throat. Down through the hips. Through the whole body.`,
    ``,
    `Your subconscious is registering this now. The critic's voice is no longer the default. Your own voice — the worthy one — is.`,
    ``,
    `From now on — whenever the critic tries to return — you remember. That voice belongs to someone else. You have already handed it back. It does not get to live in your head anymore.`,
    ``,
    `You feel ten out of ten. The best you have felt in a long time. A weight has been lifted off of your shoulders.`,
    ``,
    `In your journal, write exactly how you feel right now — to anchor this in.`,
    ``,
    `Eyes open. Wide awake. The shift has happened.`,
  ].join('\n'),
};

const DECODE_YOUR_YES: HypnoSession = {
  id: 'decode-your-yes',
  title: 'Decode Your Yes',
  subtitle: 'A 12-minute self-calibration to hear what the body is telling you.',
  durationMin: 12,
  mood: 'clarifying',
  blurb: 'Drawn from NLP and neuro-linguistic calibration. The body cannot lie — but you have been louder than her. This session teaches you to listen to your own eye movements, your breath, your micro-yes and micro-no, so you stop overriding the wisdom that is already in you.',
  intent: 'Bring a yes/no question — one your mind has been arguing back and forth on.',
  journalPrompt: 'My body\'s answer to the question. What it felt like in the chest, the breath, the gaze. What this changes.',
  color: '#7AA88E',
  chakra: 'thirdEye',
  bestTime: 'midday',
  script: [
    arrivalBreath,
    ``,
    sleepTrigger,
    ``,
    cloudDrift,
    ``,
    `In this state, I want you to know something true. The body cannot lie. The mind can argue, justify, talk itself into anything. But the body — the eyes, the breath, the chest, the stomach — she always tells you the truth. The only question is whether you are listening.`,
    ``,
    `Today, you learn to listen. Specifically — to your own neuro-linguistic signals. The small movements that reveal what is actually happening underneath your thoughts.`,
    ``,
    `Bring forward the question that has been on your mind. The yes-or-no question. The one the mind has been arguing both sides of for a week. Say it clearly to yourself.`,
    ``,
    `Now — eyes still closed — I want you to imagine asking the question out loud, into the room. And notice what happens in the body in the first second after the question lands.`,
    ``,
    `Notice the breath. Did the chest open, or did it tighten?`,
    ``,
    `Notice the stomach. Did it soften, or did it pull in?`,
    ``,
    `Notice the shoulders. Did they drop, or did they rise?`,
    ``,
    `Notice the jaw. Did it loosen, or did it set?`,
    ``,
    `That first-second response — before the mind got involved — is your real answer. The mind will spend the next hour arguing with it. But the body has already spoken.`,
    ``,
    `Now we go deeper. I want you to notice your eyes — even with the lids closed — and what they want to do.`,
    ``,
    `Ask yourself the question imagining the YES outcome. Imagine you have said yes. The thing is in motion. Notice where the eyes want to drift. Up? Down? To the side? Notice the quality of the picture in your mind. Is it bright? Is it close? Is it warm? Is it dim and far away?`,
    ``,
    `The brightness, the closeness, the warmth — those are what neuro-linguistic teachers call submodalities. They are how your subconscious labels what is real and right for you.`,
    ``,
    `Now imagine the NO outcome. You have said no. The thing has not happened. Notice where the eyes drift now. Notice the picture. Brighter or dimmer than the yes? Closer or further? Warmer or colder?`,
    ``,
    `Your body has just shown you the answer. Whichever picture is closer, brighter, warmer — that is the path the body wants. Whichever is dim, distant, cold — the body has already declined.`,
    ``,
    `And here is the second truth. When you recall a memory, your eyes move one way. When you construct a fantasy that has not happened, they move another. So when you imagined the yes path — were you recalling something real, or were you constructing a story? Your subconscious knows. You felt it.`,
    ``,
    `The real choice is not which option is better on paper. The real choice is which one matches the body's micro-yes — the soft chest, the open breath, the eyes that want to look toward it.`,
    ``,
    `Now I want you to install something. From this day forward — when you face any decision, large or small — you will pause for one breath. You will ask the question into the body. You will notice the first second. And you will trust that first second over the next hour of mind-argument.`,
    ``,
    `Press your right thumb against the tip of your right index finger. Hold the pressure for three seconds.`,
    ``,
    `One. Two. Three.`,
    ``,
    `Release.`,
    ``,
    `That gesture is now anchored to this exact state of body-listening. From now on, whenever you need to know what is true for you — press thumb to index finger, ask the question, listen to the first second of the body. The answer will already be there.`,
    ``,
    `You have decoded yourself. The body that has been telling you the truth your entire life — you can hear her now.`,
    ``,
    `Take one last deep breath in… and as you exhale, you carry this listening with you. Into the day. Into the decisions. Into the room you are about to walk into.`,
    ``,
    `Once you fully understand that the shift has happened… you can open your eyes.`,
  ].join('\n'),
};

// ─────────── EXPORT ───────────

export const HYPNOTHERAPY_SESSIONS: HypnoSession[] = [
  CONFIDENCE_BOOST,
  SLEEP_RESET,
  ANXIETY_RELEASE,
  DECISION_CLARITY,
  INNER_CRITIC_MUTE,
  DECODE_YOUR_YES,
];

export function getHypnoSession(id: string): HypnoSession | undefined {
  return HYPNOTHERAPY_SESSIONS.find((s) => s.id === id);
}

export const MOOD_META: Record<HypnoMood, { label: string; color: string }> = {
  urgent: { label: 'In the moment', color: '#A04B3C' },
  calming: { label: 'Calming', color: '#7AA8C7' },
  restorative: { label: 'Restorative', color: '#5C5C8A' },
  clarifying: { label: 'Clarifying', color: '#5C7AA8' },
  empowering: { label: 'Empowering', color: '#D4AF6E' },
};
