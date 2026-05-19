/**
 * NRM — Neuro-Reprogramming Method · hypnotherapy script library.
 *
 * Per-day bespoke sessions, each composed from shared building blocks
 * (inductions, drift, seals, closes) + a unique day-specific mechanic.
 *
 * Architecture follows the practitioner's confirmed toolkit:
 *   - Mouth-exhale breath, eyelid wave, sleep-trigger countdown
 *   - Cloud-drift, glass elevator, voice anchor
 *   - Mountain/river/armor dissolution (long-form release)
 *   - Two-pathways negative future pacing (decisional)
 *   - Observation + paradox + gold-light worthiness (imposter dissolve)
 *   - Completed-tense identity install, paradoxical resistance injunction
 *   - Felt-sense exit OR public-anchor exit
 *
 * Each day script takes the day's `armor` (what dissolves) and
 * `emergedSelf` (what installs) and weaves them into the bespoke
 * narrative for that day.
 *
 * Output: plain text for ElevenLabs TTS (voice `kHL7MFWSwpF69uhr0qwj`,
 * model `eleven_turbo_v2_5`, stability 0.7, similarity 0.85, style 0.15).
 */

export interface NrmScriptInput {
  armor: string;
  emergedSelf: string;
}

// ═══════════════════════════════════════════════════════════════════
//   SHARED BUILDING BLOCKS — reusable across days
// ═══════════════════════════════════════════════════════════════════

/** Mouth-exhale breath × 2 + eyelid heaviness + voice anchor. ~45 sec spoken. */
function arrivalBreath(): string {
  return [
    `Welcome back.`,
    ``,
    `Take one deep breath in through your nose… and all the way out through your mouth. Letting go.`,
    ``,
    `One more time. Deep breath in… and all the way out.`,
    ``,
    `And my voice. And my voice. And my voice.`,
    ``,
    `Let the eyelids close. Let the jaw get heavy. Let the head hang forward, so the body can flow.`,
    ``,
    `The relaxation moves through your eyelids in a wave. Through your jaw. Through your shoulders. The body becomes so soft, so heavy.`,
    ``,
  ].join('\n');
}

/** Sleep-trigger countdown — "a thousand times deeper." ~30 sec spoken. */
function sleepTrigger(): string {
  return [
    `In a moment I'm going to say the word — sleep. And when I say it, it will take you a thousand times deeper into this state of relaxation.`,
    ``,
    `Three… two… one… sleep.`,
    ``,
    `All the way down. Every single word I say from here is going to take you deeper. And deeper. And deeper.`,
    ``,
  ].join('\n');
}

/** Cloud-thought drift — clears the mental noise. ~25 sec spoken. */
function cloudDrift(): string {
  return [
    `Any thoughts, any fears, any worries — they just float out of your mind like clouds into the sky. So that you can fully focus on the words that you hear.`,
    ``,
  ].join('\n');
}

/** Completed-tense identity seal with paradoxical resistance injunction.
 *  This is the practitioner's signature install pattern. ~80 sec spoken. */
function completedTenseSeal(emergedSelf: string): string {
  return [
    `And what is installing in your body right now is this: ${emergedSelf}.`,
    ``,
    `You can feel that arriving in you. Right now.`,
    ``,
    `Everything in your life that was once a goal is now here. It is done.`,
    ``,
    `And the more your subconscious tries to fight against that — the more done it becomes. Even trying to resist this reality is impossible right now. Because it is here. There is nothing stopping you. You feel it.`,
    ``,
    `That feeling inside of you goes now — and installs into your subconscious. Into your body. You can feel that literal energy coursing through you.`,
    ``,
    `If you can see this reality… if you can feel this reality… then this reality already exists.`,
    ``,
  ].join('\n');
}

/** Open-inquiry — lets subconscious supply the specifics. ~25 sec spoken. */
function openInquiry(): string {
  return [
    `So I want you to notice — this version of yourself — how do they show up? How do they act? How do they feel? What are their standards?`,
    ``,
    `You know in your body, because it is done. It has happened.`,
    ``,
  ].join('\n');
}

/** Felt-sense exit — for deeper, longer sessions. ~40 sec spoken. */
function feltSenseClose(): string {
  return [
    `From this state — in a moment, when you come back — everything is clear. You will know exactly what to do. You trust. You move effortlessly.`,
    ``,
    `Take one last deep breath in… and as you exhale, you bring her with you. Into the room. Into the day. Into every decision in front of you.`,
    ``,
    `Once you fully understand that the shift has happened… you can open your eyes.`,
  ].join('\n');
}

/** Public-anchor exit — for shorter, decisional sessions. ~30 sec spoken. */
function publicAnchorClose(): string {
  return [
    `You feel ten out of ten — the best you have ever felt. A weight has been lifted off of your shoulders. You are creating this new version of you, right now.`,
    ``,
    `In the journal, write exactly how you feel in this moment — to anchor this new version of you in right away.`,
    ``,
    `Eyes open. Wide awake. The shift has happened.`,
  ].join('\n');
}

// ═══════════════════════════════════════════════════════════════════
//   WEEK 1 — EXCAVATE (Days 1-7)
//   Surface every money story you inherited
// ═══════════════════════════════════════════════════════════════════

/** Day 1 — The Money Inheritance.
 *  Mechanic: Glass elevator (mind-clear) → childhood-kitchen regression →
 *  see the face that spoke the inherited story → return it. */
function buildDay1Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Now take your attention to your mind. All of the overthinking. All of the repetitive thoughts. Ninety-five percent of your thoughts were the same thoughts you had yesterday. The same thought about something in the past. The same thought about something in the future.`,
    ``,
    `There is a glass elevator in the back of your head. And all of those thoughts go into this glass elevator. One after another after another. Your mind starts to fill up.`,
    ``,
    `And now this glass elevator goes down the back of your spine. All the way into the ground. And as it hits the ground, it disappears. Everything goes blank in your mind right now. Blank.`,
    ``,
    `And in this blank space, I want you to drift back. Back through the years. Back to a kitchen you knew as a child.`,
    ``,
    `It might be your kitchen. It might be your grandmother's kitchen. It might be a kitchen you only half-remember. But you are there. You are small. And someone is talking about money.`,
    ``,
    `Listen. Don't change what they are saying. Just listen. Hear the words. Hear the tone of voice. Notice the body language. The tightness in the jaw. The look in the eye.`,
    ``,
    `Because what you are hearing — that is ${armor}.`,
    ``,
    `That was given to you. You did not generate it. You were too young to refuse delivery. And today, we hand it back.`,
    ``,
    `See the face of the person speaking. The one whose story this actually is. Walk towards them. Gently.`,
    ``,
    `And as you reach them, you say — softly, but clearly: thank you for keeping this for me. I have it from here. You can have this back now.`,
    ``,
    `Watch them receive it. Watch them turn. The story goes with them. You are not chasing it.`,
    ``,
    `And in the space where the inherited story used to live — nothing rushes in to replace it. The space is yours. For the first time in your life.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 2 — The Earning Ceiling.
 *  Mechanic: Visualize the dollar number above which your body tightens →
 *  walk above it → the ceiling dissolves → body stays soft at the new altitude. */
function buildDay2Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to bring forward a number. A dollar number.`,
    ``,
    `It is the number above which your body tightens. The number you have not yet crossed. The number that makes your stomach pull in slightly when you imagine charging it.`,
    ``,
    `Don't think about it. Let the number arrive on its own. Whatever the body knows.`,
    ``,
    `There it is. You can see it now.`,
    ``,
    `That number is the ceiling. And what you are carrying today — ${armor} — has been holding that ceiling in place.`,
    ``,
    `Now I want you to imagine this ceiling as a thin pane of glass — directly above your head. You can see through it. You can see the air on the other side. Brighter. Lighter. Warmer.`,
    ``,
    `And on the other side of the glass — twice the number is there. Three times the number is there. Ten times the number is there.`,
    ``,
    `You reach up. And you place your palm on the glass.`,
    ``,
    `And as you do — the glass softens. It is no longer a barrier. It melts away from your palm outward. The ceiling dissolves into mist. And the air above is now your air.`,
    ``,
    `You rise. Through where the glass was. And the body stays soft. The stomach stays open. The breath stays slow. The nervous system has no argument with this new altitude.`,
    ``,
    `Because you realize — the ceiling was never the number. The ceiling was the bracing. And the bracing is gone.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 3 — The Worth Imprint.
 *  Mechanic: Session C — observation + paradoxical relaxation → sovereignty
 *  frame ("no one is coming") → "I am worthy" declaration → gold light. */
function buildDay3Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to notice the part of you that has been holding ${armor}.`,
    ``,
    `Don't push it away. Don't argue with it. Don't try to make it go.`,
    ``,
    `Just observe it. Where does it live in the body? What shape does it want to take? What does it feel like?`,
    ``,
    `As you observe that part of yourself, it comes up. Maybe it's a fear. Maybe it's a limiting belief. Maybe it's a memory. Whatever it is — you can sense it. You can see it.`,
    ``,
    `And here is what is interesting. The more you try to focus on it — the more relaxed you feel. The more relaxed you become — the more it naturally lets go. The more it lets go — the more clearly you see: it was never true. It was an illusion.`,
    ``,
    `You finally realize: no one is coming.`,
    ``,
    `No one is coming to tell you that you're enough. No one is coming to tell you that you're worthy. No one is coming to give you permission to receive what you have already earned.`,
    ``,
    `You decide.`,
    ``,
    `And in this moment — right now — if you choose to, you can make the decision to finally say: I am worthy. Right now. I am worthy.`,
    ``,
    `Say it again, inside you: I am worthy.`,
    ``,
    `And as you say it, imagine an expansion in your body — like a ball of gold light. Right in the centre of your chest. And it is exploding outward. Through your shoulders. Down your arms. Up your throat. Out through the crown of your head. Down through your legs. Out through your feet.`,
    ``,
    `Your entire body is gold light right now. Energized. Lit from inside. Worthy of every room you walk into. Worthy of every number you charge. Worthy of every yes that comes.`,
    ``,
    completedTenseSeal(emergedSelf),
    publicAnchorClose(),
  ].join('\n');
}

/** Day 4 — The Receiver Audit.
 *  Mechanic: Open palms — the deflection muscle relaxes → the gift lands →
 *  full-body receiving install. */
function buildDay4Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to notice your hands. Notice how they have been holding.`,
    ``,
    `For most of your life, when something good has come towards you, the hands have done one of two things. They have pushed it back gently — deflecting. Or they have grabbed for it quickly — earning it before it landed. Either way, they have not just… received.`,
    ``,
    `And what is in the way is ${armor}.`,
    ``,
    `Now I want you to imagine your palms turning up. Resting open. Empty. Waiting.`,
    ``,
    `And the muscle in your hands — the one that has been clenching for a lifetime — softens. The fingers loosen. The thumb releases from the index finger. The palms become soft, warm, receptive.`,
    ``,
    `Notice in the body — the chest follows the hands. The shoulders drop. The breath deepens. The receiver is open now.`,
    ``,
    `And from in front of you, imagine someone walking towards you. Someone who is bringing you something. A gift. A compliment. An opportunity. A cheque. A yes.`,
    ``,
    `Watch them approach. Watch them place it into your open palms.`,
    ``,
    `And notice — your hands do not push it back. Your hands do not grab. Your hands stay open and receive.`,
    ``,
    `And in your mouth, just two words: thank you. Full stop. No qualifier. No "I'll give it back tomorrow." No "I didn't really earn this." No "you shouldn't have."`,
    ``,
    `Thank you. And the gift lands.`,
    ``,
    `Your subconscious knows now: I am safe to receive. I am safe to receive. I am safe to receive.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 5 — The Borrowed Voice.
 *  Mechanic: Sovereignty frame — see the face the inner critic actually
 *  belongs to → return the voice → your own voice rises. */
function buildDay5Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to listen to the voice. The voice that rises in your head when you are about to grow. When you are about to charge more. When you are about to be seen.`,
    ``,
    `That voice — that is ${armor}.`,
    ``,
    `And here is the truth your subconscious already knows: that voice is not yours. It never was. It was given to you. You absorbed it before you had any defence against it.`,
    ``,
    `So today, we find the face.`,
    ``,
    `Listen to the voice. The tone of it. The words it uses. The rhythm. The accusation in it.`,
    ``,
    `Now ask yourself, in this state: whose voice is this, actually?`,
    ``,
    `Don't think. Let the answer arrive on its own. A face. A name. A room. A specific person from your past.`,
    ``,
    `There they are.`,
    ``,
    `Now I want you to know something. No one is coming to tell you that voice is wrong. No one is coming to tell you you're good enough. No one is coming to give you permission. You decide.`,
    ``,
    `So in this state, you walk towards the face. And you say to them — softly, but clearly: thank you for keeping this for me. I have it from here. You can take your voice back now.`,
    ``,
    `Watch them receive it. Watch them turn and walk away. The voice goes with them. It is no longer in your head.`,
    ``,
    `And in the silence that follows — for the first time in your life — you hear your own voice.`,
    ``,
    `Listen to it. Notice the tone. The steadiness. The complete absence of accusation. This is what you have sounded like, underneath, all along.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 6 — The Safety Calculation.
 *  Mechanic: Two-pathways (Session B variant) — walk the path where you
 *  stayed small to keep others comfortable → feel the cost → return and
 *  choose the other path → see who is still standing with you. */
function buildDay6Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to see two pathways in front of you.`,
    ``,
    `One on the left. One on the right.`,
    ``,
    `On the LEFT — there is the version of you who kept this calculation: ${armor}.`,
    ``,
    `She stays the size she has always been. She charges what she has always charged. She does not grow — because she is afraid of what growing will cost her in love. In family. In friendships.`,
    ``,
    `Walk down that pathway with her. One year goes by. Then five. Then ten. The people she was afraid of losing — they are still there. But she is smaller now. Quieter now. Less of herself.`,
    ``,
    `And then twenty years pass. Thirty. Forty. And you arrive at the end of her life.`,
    ``,
    `There is just one minute left. And in that minute, she realizes: she protected the relationships by erasing herself. And the people she protected — they never even asked her to. She did it to herself.`,
    ``,
    `Feel the pain of that. Let it land. Because that pain is fuel.`,
    ``,
    `And as the pain becomes a force inside of you, you say: no. I choose differently.`,
    ``,
    `And you come all the way back. Back to the beginning of the two pathways.`,
    ``,
    `Take a deep breath in. And as you exhale, that version goes. It leaves with the air. It is gone.`,
    ``,
    `Now you walk down the RIGHT pathway. The one where you grew anyway. Where you charged what you were worth. Where you took up the full size of who you are.`,
    ``,
    `And look at who is walking beside you. Look carefully. Some of the people you were afraid of losing — they are still right there. Closer than before. Because the real version of you was the version they actually wanted.`,
    ``,
    `And the ones who could not stay — they were never the home you thought they were.`,
    ``,
    completedTenseSeal(emergedSelf),
    publicAnchorClose(),
  ].join('\n');
}

/** Day 7 — The Integration Pause.
 *  Mechanic: No new excavation. Body scan from head to feet. Let the
 *  surfaced material from Days 1-6 settle into the system. */
function buildDay7Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today there is no new work. Today, we let the body settle what the last six days surfaced.`,
    ``,
    `What you are not carrying today is ${armor}. Notice the space where it used to sit.`,
    ``,
    `I want you to scan slowly through the body. Top down. Just observing. Nothing to fix. Nothing to release. Just noticing.`,
    ``,
    `Start at the crown of the head. Soft. Heavier than it was. The mind has done its work this week.`,
    ``,
    `The space between the eyebrows. Smooth. Released. No furrow.`,
    ``,
    `The jaw. Loose. The teeth are not touching. The tongue is soft on the roof of the mouth.`,
    ``,
    `The throat. Open. Words can pass through without bracing.`,
    ``,
    `The shoulders. Dropped. An inch lower than they were on Day 1. Maybe two.`,
    ``,
    `The chest. The breath reaches deeper into it now. The space behind the heart has more room.`,
    ``,
    `The stomach. Soft. The bracing reflex is quieter. Numbers that used to tighten it — they pass through with less grip.`,
    ``,
    `The hips. Open. The weight you have been carrying in the pelvis has lightened.`,
    ``,
    `The legs. Heavy. Grounded. Rooted into where you are.`,
    ``,
    `The feet. Warm. Solid. The earth is meeting you.`,
    ``,
    `This body is the body that has done six days of inner work. It is not the body that walked in.`,
    ``,
    `Today you do nothing. You just notice that you are not the same.`,
    ``,
    completedTenseSeal(emergedSelf),
    feltSenseClose(),
  ].join('\n');
}

// ═══════════════════════════════════════════════════════════════════
//   FALLBACK — Master mountain/river template
//   Used for Days 8-28 until those bespoke scripts ship
// ═══════════════════════════════════════════════════════════════════

/** The original master template — mountain ascent → river → armor
 *  dissolution → float → identity install. Used as fallback for any
 *  day that doesn't yet have a bespoke script. */
export function buildNrmScript({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `I want you to know that you are walking up a mountain.`,
    ``,
    `As you walk up this mountain, you can feel the jagged rocks beneath your feet. You can feel the wind on your skin. You can feel the temperature of the air. The cool of it. The aliveness of it.`,
    ``,
    `And in the distance, you can start to hear the sound of a river.`,
    ``,
    `You walk towards it. You can see rocks. You can see boulders in the water. You can feel the uneven ground beneath your feet as you approach.`,
    ``,
    `There at the edge of the river, there is a recognition.`,
    ``,
    `Up until this moment in your life, you have been carrying a weight. You have been carrying fear. You have been carrying trauma. You have been carrying beliefs that were never yours. Emotions that no longer serve you. Language that you've used to keep yourself small.`,
    ``,
    `And today, what you are carrying is this: ${armor}.`,
    ``,
    `You can feel it on your body. It's an armor. You know its shape.`,
    ``,
    `And it only gets to a point where you say: enough is enough. I choose differently now. I will not carry this armor anymore.`,
    ``,
    `You take a step into the stream of water. And as your foot — with this armor — goes into the stream, suddenly that armor around your foot dissolves. It gets taken away. Washed away into the water. And your feet become free.`,
    ``,
    `You take the next step. Up to your knees. That armor melts away. You can feel the blood literally flowing through your body. Energy moving through you. You can breathe differently.`,
    ``,
    `You go even deeper. Up to your waist. The armor continues to come off. You realize: it is no longer protecting you. You do not need it anymore. Your subconscious mind knows exactly what to let go of right now.`,
    ``,
    `And now you go all the way in. Up to your head. And the rest of that armor — around your stomach, your chest, your arms, your head — it all just melts away. Taken in the water.`,
    ``,
    `And now you float. Completely held. There is not a thing that matters right now.`,
    ``,
    `Because you realize: you have everything, and you are everything that you need. In fact, you have more than you need.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

// ═══════════════════════════════════════════════════════════════════
//   DISPATCHER — returns the right script for the given day
// ═══════════════════════════════════════════════════════════════════

/** Map of day number → bespoke script builder. Days not in the map
 *  fall back to the master mountain/river template. As bespoke scripts
 *  for Weeks 2-4 are written, add them here. */
const DAY_SCRIPTS: Record<number, (slots: NrmScriptInput) => string> = {
  1: buildDay1Script,
  2: buildDay2Script,
  3: buildDay3Script,
  4: buildDay4Script,
  5: buildDay5Script,
  6: buildDay6Script,
  7: buildDay7Script,
  // Days 8-28: fall through to buildNrmScript (master mountain/river)
};

/** Return the hypnotherapy script for NRM day N. Uses the bespoke
 *  per-day script if one exists, otherwise the master template. */
export function getNrmScriptForDay(day: number, slots: NrmScriptInput): string {
  const builder = DAY_SCRIPTS[day];
  return builder ? builder(slots) : buildNrmScript(slots);
}

/** Approximate spoken duration in minutes — used for UI labels. */
export const NRM_SCRIPT_DURATION_MIN = 12;
