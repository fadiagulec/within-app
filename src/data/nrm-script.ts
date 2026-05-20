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
//   WEEK 2 — DISSOLVE (Days 8-14)
//   Engineered amnesia on the core money beliefs + lineage release
// ═══════════════════════════════════════════════════════════════════

/** Day 8 — "I have to work hard for money."
 *  Mechanic: River-armor variant. The armor is heavy. Specifically the
 *  work-hard armor. Drop it. Float. Install effortless flow. */
function buildDay8Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to feel the weight you have been carrying. The weight of ${armor}.`,
    ``,
    `This armor is the heaviest you wear. It is the one that has cost you the most time. The most energy. The most life. It is the armor that says: money must hurt to come. That you have to push, prove, strain, exhaust yourself before it is yours.`,
    ``,
    `And today, you walk to the river to put it down.`,
    ``,
    `You can feel the rocks beneath your feet as you approach. You can hear the water moving. You can feel where this armor sits — across the shoulders, down the back, into the hips. It is bone-deep.`,
    ``,
    `And it gets to the point where you say: enough. I will not earn another dollar through pain. I choose differently now.`,
    ``,
    `You step into the water. Up to your ankles. The armor at your feet melts away. The legs become light.`,
    ``,
    `Up to your knees. The armor across the hips dissolves. You feel the blood return to where the bracing has been.`,
    ``,
    `Up to your waist. The armor across the back lifts. The shoulders drop two inches. You realize: you have been holding this for thirty years.`,
    ``,
    `Up to your head. The armor across the chest dissolves. The breath drops deeper than it has ever been. Your subconscious knows now: I do not have to work harder to be worthy of money. The two are not connected. They never were.`,
    ``,
    `You float. The water carries the armor away. It is gone.`,
    ``,
    `And in your body now — the muscle memory of effort, the bracing reflex that has been firing every time you've thought about money — it is finished.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 9 — "Money is hard to keep."
 *  Mechanic: Build a stable home for money. The body becomes the
 *  sanctuary. Money arrives, settles, stays. */
function buildDay9Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to notice what your body has been doing every time money has arrived.`,
    ``,
    `It has been bracing. It has been waiting. It has been calculating when the money will leave. Because somewhere — long ago — you learned ${armor}.`,
    ``,
    `And today, we build money a home in your body. A place where it can land, settle, and stay.`,
    ``,
    `I want you to feel into the centre of your chest. The space behind the heart. Notice the temperature. Notice the spaciousness — or the lack of it.`,
    ``,
    `Now I want you to imagine that space becoming a room. A sanctuary. Warm. Lit. Soft. With a comfortable place to rest. A room that says: whoever arrives here is safe. Welcome. Welcome to stay.`,
    ``,
    `And from above, money begins to arrive in this room. Not as paper. Not as numbers. As warmth. As light. As energy.`,
    ``,
    `Watch the first dollar arrive. See it settle into the room. The room makes space for it. It is not in a hurry to leave.`,
    ``,
    `Then more. Then more. Then more. The room is wide. It has been building itself for this. There is no urgency. There is no panic.`,
    ``,
    `Notice in the body — the chest does not tighten as the room fills. The breath stays slow. The shoulders stay soft. Your nervous system has built a home for wealth.`,
    ``,
    `And money, sensing the safety of this room, does what energy does when it finds a stable home. It stays. It returns. It brings more of itself with it.`,
    ``,
    `Because money is not a weather pattern. Money is not a stranger passing through. Money is a guest, and you have just become the host who knows how to receive it.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 10 — "Charging more is greedy."
 *  Mechanic: Witness the transformation your work creates. Witness the
 *  exchange. Both are equal. Install the clean pricing voice. */
function buildDay10Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want to take you into a memory. But not from your past. From your future.`,
    ``,
    `You are watching one of your clients — someone whose life you have changed through your work. They are six months past the moment they paid you. And the transformation is visible.`,
    ``,
    `Look at them now. Look at their body. Look at the lightness that wasn't there before. Look at what they are doing now that they couldn't do before they met you.`,
    ``,
    `What you gave them — that is not nothing. That is a life. That is years of suffering they no longer have to do. That is freedom they will pass to their own children.`,
    ``,
    `And what they gave you — money — is the cleanest, most honest form of acknowledgement they had. It was the agreed exchange. Not too much. Not greedy. Equal.`,
    ``,
    `What you have been carrying — ${armor} — is a lie. It was given to you by people who did not understand the math of value. They confused giving with self-erasure. They confused honour with depletion.`,
    ``,
    `Today, you correct that math.`,
    ``,
    `I want you to hear yourself, now, in this state, quote a number to a client. The real number. The number that reflects what your work actually does.`,
    ``,
    `Hear it in your voice. Notice — the voice does not soften. It does not apologise. It does not justify. It names the number. And then it stops.`,
    ``,
    `And in the silence after the number — that silence belongs to them, not to you. Your subconscious knows this now. The silence is theirs to fill, not yours to rescue.`,
    ``,
    `You are not greedy. You are honest. Honest about what your work creates. Honest about what it costs to do it well. Honest about the exchange.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 11 — Compound Dissolve.
 *  Mechanic: Three stones in the river — each holds a belief. Watch
 *  all three dissolve at once. Cumulative release. */
function buildDay11Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `You return to the river today. But you are not the same person who arrived here three days ago. The water has already taken some of what you came with.`,
    ``,
    `In your hands, you are holding three stones. Each one carries a belief that has shaped your relationship to money your entire life.`,
    ``,
    `The first stone — work hard or you do not deserve it.`,
    ``,
    `The second stone — money will leave you.`,
    ``,
    `The third stone — charging your worth makes you greedy.`,
    ``,
    `And together, all three stones — that is ${armor}.`,
    ``,
    `You walk to the edge of the water. You feel the weight of all three. You know what they have cost you.`,
    ``,
    `And you do not throw them. You do not hurl them. You simply open your hands.`,
    ``,
    `And the three stones fall into the river. One. Two. Three.`,
    ``,
    `And the water receives them. Not violently. Quietly. The water has been waiting for this. The water knows what to do.`,
    ``,
    `Watch the three stones sink. Watch the current take them downstream. Watch them disappear from view.`,
    ``,
    `And in your hands — empty now — you feel something you have not felt in years. The hands are not gripping. The fingers are open. There is nothing for the hands to hold onto, because there is no longer anything you must defend yourself against.`,
    ``,
    `Take a deep breath in. And as you exhale — feel the inside of you become quiet. The three voices that have been arguing against your wealth for your entire life — they are silent now. There is nothing left to fight.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 12 — Inner-Child Rescue / Forgiveness Pass.
 *  Mechanic: Meet every past version of you who made the fear-based
 *  decision. Forgive each one specifically. Bring them all home. */
function buildDay12Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to know that you have been many people in this lifetime. Not literally — but inside. Every version of you who made a decision is still alive in your body. And many of those versions are still afraid.`,
    ``,
    `Today, we go meet them. Today, we bring them all home.`,
    ``,
    `What you are carrying — ${armor} — is the unforgiveness you have been holding for every past version of you who undercharged. Who said yes when they meant no. Who chose safety over growth. Who took less than they were worth because they were scared.`,
    ``,
    `Imagine yourself standing in a long hallway. And in this hallway, there are doors. Each door is a past version of you, at the moment they made a fear-based money decision.`,
    ``,
    `You open the first door.`,
    ``,
    `Inside is a younger version of you. Maybe she is sitting at a desk. Maybe she just sent an email accepting less than she was worth. Her shoulders are tight. She thinks she has just protected herself.`,
    ``,
    `You walk in. You sit beside her. You don't lecture her. You don't tell her she made a mistake. You put your hand on her shoulder. And you say: thank you. Thank you for keeping me safe in the way you knew how. I see you. You can stop carrying this now.`,
    ``,
    `Watch her shoulders drop. Watch her face soften. Watch her receive what no one ever gave her — forgiveness from the only person whose forgiveness she actually needed.`,
    ``,
    `Now invite her to stand. Take her hand. Walk her out of the room.`,
    ``,
    `Now do this again. With the next version. And the next. And the next. As many as need to be met today. Each one given the same words: thank you. I see you. You can stop carrying this now.`,
    ``,
    `And when the last one is met — they are all walking with you. Behind you. Beside you. Their hands are open. The tightness in their shoulders is gone. They are home.`,
    ``,
    `And you are not alone in your body anymore. You are integrated. You are whole. The internal civil war is over.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 13 — Ancestral Chain Release.
 *  Mechanic: Bert Hellinger family constellations. See the chain back
 *  through generations. Hand the pattern back to where it began. */
function buildDay13Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `In this state, I want you to know something true. The money pattern you have been carrying is older than you. It did not begin with you. You have been carrying weight that belongs to your bloodline.`,
    ``,
    `And what you carry — ${armor} — is the unhealed wound of every generation before you who did not have the conditions to heal it.`,
    ``,
    `Imagine yourself standing in a long line. And the line stretches back behind you. Person after person, going back through the generations. Your parents. Their parents. Their parents. Back, and back, and back.`,
    ``,
    `Look at them. They look like you. Some look very different. They lived in different times. Faced different fears. Survived things you will never have to survive.`,
    ``,
    `Now scan back through the line until you find the one. The first one. The ancestor who first learned to fear money. Maybe they lost everything in a war. Maybe they were poor and shamed for it. Maybe they had wealth taken from them. Maybe they watched a parent die from overwork.`,
    ``,
    `You will know them when you see them. The body will recognise them.`,
    ``,
    `There they are.`,
    ``,
    `Walk towards them. Across the generations. Across the centuries if you need to. Stand in front of them.`,
    ``,
    `Look at their face. Feel into their suffering. This is where it began.`,
    ``,
    `Now you say to them — softly, but clearly: I see what you carried. I honour what you survived. And I will not carry this further. I love you. And I am giving this back to where it began.`,
    ``,
    `Watch them receive it. Watch the line of ancestors behind them shift. Their faces soften. Something they have all been holding for centuries — it releases.`,
    ``,
    `And as you turn and walk back through the line, towards yourself — every ancestor you pass nods. They are not angry. They are grateful. You are doing what they could not. And in doing so, you are not abandoning them — you are honouring them.`,
    ``,
    `You are the one in your bloodline who broke the pattern. And the bloodline is grateful.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 14 — Empty Page Integration.
 *  Mechanic: Sit in the cave. No installation. Just witness the gap
 *  between old self and new self. Trust what arrives next. */
function buildDay14Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today there is no work to do. Today, you sit in the gap.`,
    ``,
    `For thirteen days you have been releasing. The inherited story. The ceiling. The worth imprint. The deflection muscle. The borrowed voice. The safety calculation. The work-hard belief. The money-leaves belief. The greed belief. The unforgiveness toward past selves. The ancestral chain.`,
    ``,
    `What you have been carrying — ${armor} — is the urgency to fill the silence. To know who you are next. To install the new self before you have finished letting the old one go.`,
    ``,
    `Today we do not install. Today, we wait.`,
    ``,
    `Imagine yourself in a quiet cave. Soft light. Cool air. Stone beneath you. A place that has been here for ten thousand years and will be here for ten thousand more.`,
    ``,
    `Sit. There is nowhere to go. Nothing to become. No one to be yet.`,
    ``,
    `Notice how this feels in the body. The urge to do something. The urge to fix something. The urge to perform recovery. Notice all of it. And let none of it move you.`,
    ``,
    `The cave is patient. The cave is not waiting for you to be different. The cave is just here, holding the space where the new shape will arrive — when it arrives.`,
    ``,
    `Breathe in this silence.`,
    ``,
    `And know — the next shape of you is forming somewhere below conscious awareness. You do not need to do anything to bring it forward. It is on its way. It will arrive when the soil is ready.`,
    ``,
    `What is installing in you today is not a new identity. What is installing is patience. The capacity to sit in the not-yet. The trust that the next version of you is being woven inside you right now — and your only job is not to interrupt her.`,
    ``,
    `${emergedSelf}.`,
    ``,
    `She is forming. You will meet her this week. There is nothing to rush.`,
    ``,
    `Everything in your life that was once a goal is now here. It is done. Even the in-between is done. Even this cave is done.`,
    ``,
    `If you can sit in this silence… if you can feel this trust… then this trust already exists in you.`,
    ``,
    feltSenseClose(),
  ].join('\n');
}

// ═══════════════════════════════════════════════════════════════════
//   WEEK 3 — INSTALL (Days 15-21)
//   The new identity, written into the body
// ═══════════════════════════════════════════════════════════════════

/** Day 15 — Meet the 7-Figure You at the Door.
 *  Mechanic: A door. She opens it from the other side. You walk
 *  through. Full sensory contact. Step into her body. */
function buildDay15Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today you meet her. The version of you the last fourteen days have been clearing the room for.`,
    ``,
    `What has been in the way — ${armor} — is dissolved. The space is clean. The room is ready.`,
    ``,
    `Imagine a door. Wooden. Solid. Warm to the touch. The door has been there your whole life. You have walked past it a thousand times. You have never opened it.`,
    ``,
    `Today, you stand in front of it. You can hear someone breathing on the other side. You know who it is. You have always known.`,
    ``,
    `You place your hand on the door.`,
    ``,
    `Before you open it, take one breath. And know — when you open this door, you do not just meet her. She opens the door from the other side, at the exact same moment, and you walk through into each other.`,
    ``,
    `Now. The door opens.`,
    ``,
    `And there she is. Look at her face. Look at her eyes. Look at the calm that lives behind them — the calm you have not had access to yet, but you have known existed.`,
    ``,
    `Look at her clothes. The fabric. The fit. The way they sit on her body. Look at her posture. Notice the line of her spine. The weight evenly distributed. The shoulders down.`,
    ``,
    `Look at her hands. What is on them. What they are holding. How they are held when they are not in use.`,
    ``,
    `She is real. She is not a fantasy. She is the version of you twelve months from this moment. She is the future you have been walking toward without knowing it.`,
    ``,
    `Now you walk into each other. Slowly. Through the door.`,
    ``,
    `As you step into her body — feel her shoulders become your shoulders. Her breath become your breath. Her steadiness become your steadiness. Her calm become your calm. Her certainty become your certainty.`,
    ``,
    `You are not pretending. You are remembering. Your nervous system already knows how to be her — it has been waiting for permission. Today, you give it.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 16 — Her Monday Morning.
 *  Mechanic: Time-warp. Walk into a Monday twelve months from now.
 *  See her calendar, her schedule, her white space. */
function buildDay16Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today you walk into one of her Mondays.`,
    ``,
    `What you have been carrying — ${armor} — is the belief that her life is busier than yours. That seven figures means more meetings, more decisions, more demands on the body. That growth costs presence.`,
    ``,
    `Today, you find out it is the opposite.`,
    ``,
    `Imagine waking up on a Monday morning. Twelve months from now. You are her. You are in her body. The room is unfamiliar but feels like home.`,
    ``,
    `Notice the light. The temperature of the room. The quality of the silence. There is no rushing. There is no checking the phone before the feet hit the floor.`,
    ``,
    `She — you — sits up slowly. Breathes. Looks out the window for a minute. Notices the sky. Then walks to make tea or coffee. The movement is unhurried.`,
    ``,
    `Now she opens her calendar. Look at it.`,
    ``,
    `What you see is not a wall of bookings. What you see is white space. Three deep-work blocks. Two appointments. And the rest of the day — empty. On purpose. Protected.`,
    ``,
    `The old version of you would have looked at that calendar and felt guilty. She would have filled it. She would have been afraid of the white space.`,
    ``,
    `This version — your version — knows the white space is where the money happens. The clarity. The presence. The good decisions. The right yes. The right no.`,
    ``,
    `Now look at what is on the calendar. Each appointment. Each block. Notice — none of them are out of obligation. Each one is chosen. Each one pays back what it asks.`,
    ``,
    `She does the first deep-work block. Look at her face during it. Look at her body. The focus is not effortful. The focus is just what happens when the nervous system is regulated.`,
    ``,
    `By eleven a.m., she has done more than the old version of you would have done in the entire day. By two p.m., the day's commitments are complete. By three, she is on a walk.`,
    ``,
    `Notice: she is not earning more by working more. She is earning more by working less, more cleanly, from a regulated state. The math is real. The body knows.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 17 — Her Pricing Voice.
 *  Mechanic: NLP rehearsal — hear her quote a price three times. Feel
 *  the silence after each. Practice the voice in your own throat. */
function buildDay17Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today you install her voice. Specifically — the voice she uses when she names her price.`,
    ``,
    `What you have been carrying — ${armor} — is the habit of softening. Justifying. Hedging. Of saying the number and then immediately adding three sentences to make it smaller.`,
    ``,
    `She does not do that. We are going to find out why.`,
    ``,
    `Imagine her sitting opposite a client. The conversation has reached the moment of the number. The client asks: what does this cost.`,
    ``,
    `Watch her. Listen.`,
    ``,
    `She says the number. Just the number. Clearly. With no rise at the end. With no apology. With no addendum.`,
    ``,
    `And then she stops talking.`,
    ``,
    `Notice the silence that follows. Notice how long it lasts. Notice that she does not rush to fill it. The silence is the client's silence. It is theirs to fill. Not hers to rescue.`,
    ``,
    `She is not uncomfortable in the silence. Why? Because she is not asking for permission to be expensive. She is simply naming reality. The reality of her work. The reality of its exchange.`,
    ``,
    `Now I want you to do this in your own throat. In your own voice. Inside your mind.`,
    ``,
    `Say the number — your real number — out loud or silently. Whatever feels right.`,
    ``,
    `And then — stop. Don't add anything. Don't justify. Don't explain. Just say the number, and let the silence belong to whoever is listening.`,
    ``,
    `Do it again. The number. Then silence.`,
    ``,
    `And a third time. The number. Then silence.`,
    ``,
    `Notice what is happening in your body. The stomach is staying soft. The breath is staying open. The throat is not tightening on the number anymore.`,
    ``,
    `This is the muscle of pricing. Today we just built it.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 18 — Her Body.
 *  Mechanic: Somatic install — Polyvagal + parts work. Install her
 *  nervous system, not just her thoughts. */
function buildDay18Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today we install her body. Not her thoughts. Her body. Because the body is where the income actually lives.`,
    ``,
    `What you have been carrying — ${armor} — is the belief that stress is the price of growth. That a regulated body cannot achieve. That you have to be tight to be successful.`,
    ``,
    `The opposite is true. A dysregulated body can earn for a while, but it cannot HOLD. The body that holds wealth is a soft body, a slow body, a body that breathes deep.`,
    ``,
    `So today, we copy her nervous system into yours.`,
    ``,
    `Feel into her. Notice her shoulders. They are not where yours have been. They sit two inches lower. They are not braced for anything.`,
    ``,
    `Drop yours to match. Two inches. Now.`,
    ``,
    `Notice her jaw. The teeth are not touching. The tongue is soft on the roof of the mouth. There is space inside the mouth.`,
    ``,
    `Match yours. Soften the jaw. Now.`,
    ``,
    `Notice her breath. It reaches the bottom of her belly. It moves through her chest slowly. Three seconds in. Four seconds out.`,
    ``,
    `Match it. Three in. Four out. Again. Three in. Four out.`,
    ``,
    `Notice her hands. They are open or held loosely. Never gripped. The fingers are not curled into fists.`,
    ``,
    `Match yours. Open your palms in your lap. Feel the space.`,
    ``,
    `Notice the space between her eyebrows. Smooth. No furrow. The forehead is not holding the day.`,
    ``,
    `Smooth yours. Now.`,
    ``,
    `This — all of this — is her nervous system. And it is now in your body.`,
    ``,
    `Your subconscious is registering this as your baseline. Not as a temporary state you achieve during meditation. As your default. As what your body returns to when nothing is wrong.`,
    ``,
    `From this body, the right decisions are easy. The right no is easy. The right yes is easy. The pricing voice is easy. Because the body is not braced for danger anymore. And money is not danger anymore. And visibility is not danger anymore. The body knows.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 19 — Her Yes/No Nervous System.
 *  Mechanic: She receives a no — same nervous system. She receives a
 *  yes — same nervous system. Decouple identity from outcome. */
function buildDay19Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today we install the most important muscle she has. The muscle that lets her grow without burning out. The muscle that lets her ask without flinching.`,
    ``,
    `It is this: her nervous system is the same whether the answer is yes or no.`,
    ``,
    `What you have been carrying — ${armor} — is the equation that a no means you are not enough. That a no is information about your worth. That a no must be metabolised through a day of recovery.`,
    ``,
    `Today we break that equation.`,
    ``,
    `Imagine her. She has just sent a proposal. She is now opening the response.`,
    ``,
    `The first message — yes. The client said yes. Watch her face. Watch her body. Notice she smiles. Notice she breathes. Notice she does not jump. Notice she does not need to perform celebration. She receives it. She thanks them. She moves on.`,
    ``,
    `Now the second message — a different client said no. Watch her face. Watch her body. Notice — almost nothing changes. Her shoulders stay where they were. Her breath stays where it was. She reads the message. She thanks them. She closes the email. She moves on.`,
    ``,
    `Notice: her nervous system did not change between the two messages. Not because she is detached. Because her identity is not on the line in the outcome.`,
    ``,
    `Her identity is fixed. The outcome is variable. They are no longer connected.`,
    ``,
    `Now I want you to install this in yourself. In this state.`,
    ``,
    `Imagine the most important yes you are waiting for, right now. See yourself open the email. See it say yes. Notice the body. Soft. Steady.`,
    ``,
    `Now imagine the same email saying no. Open it. Read it. Notice — the body stays exactly where it was. The steadiness does not collapse. The breath does not catch.`,
    ``,
    `Because the no does not mean you are not enough. The no is information about the timing. The fit. The match. It is not information about you.`,
    ``,
    `Your subconscious knows this now. The decoupling has happened.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 20 — Her Peer Room.
 *  Mechanic: Sit at dinner with three people who earn more than her.
 *  They treat her as a peer. She is at home. */
function buildDay20Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today we put you in a room you have not yet been in. And we let your body learn that you belong there.`,
    ``,
    `What you have been carrying — ${armor} — is the fear that growth means losing your home. That when you reach seven figures, the people you love will look at you differently. Some of them will. But the room you have been waiting to enter — the room where you actually belong — is full of people who have been waiting for you.`,
    ``,
    `Imagine a restaurant. Warm light. A round table. Three other people already seated.`,
    ``,
    `They all earn more than her. Significantly more. They are all further along the path than she is. And they are her peers.`,
    ``,
    `She walks in. Notice — there is no flicker of imposter in her step. She is not auditioning. She is just arriving.`,
    ``,
    `They look up. They greet her. They scoot over to make room. There is genuine warmth. They are glad she is here.`,
    ``,
    `She sits. Notice her body. The shoulders are exactly where they were before she walked in. The breath is the same. There is no inner edit. No checking how she is being perceived. Just presence.`,
    ``,
    `Listen to the conversation. They talk about their work. Their lives. Things that have happened recently. She contributes naturally. She does not over-explain her credentials. She does not minimise her wins. She speaks at the same volume as everyone else at the table.`,
    ``,
    `And the table receives her contributions the same way they receive each other's. Without surprise. Without condescension. As peers do.`,
    ``,
    `Notice what is happening in her body, hour into this dinner. She is at home. Her nervous system has not had to work for the entire evening. The room is not asking anything of her she cannot give. She is finally, after a long time, in the right room.`,
    ``,
    `Now I want you to feel that — fully. The feeling of being at the right table. Of nothing being asked of you that you cannot easily give. Of belonging that does not require performance.`,
    ``,
    `This room is real. It exists. Your nervous system is learning, right now, that it is allowed to belong here.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

/** Day 21 — The Anchor Gesture.
 *  Mechanic: NLP anchoring — pick a physical gesture, install her
 *  entire state into it. From now on, the gesture returns her. */
function buildDay21Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today we install the anchor. From this day forward, you will have a physical gesture that returns you to her, instantly, anytime, anywhere.`,
    ``,
    `What you have been carrying — ${armor} — is the worry that you will lose her between sessions. That she only exists in theta. That regular life will pull you back to the old version.`,
    ``,
    `Today, we make that impossible.`,
    ``,
    `Choose a gesture. Something small. Something private. Something you can do in any meeting, in any room, without anyone noticing.`,
    ``,
    `I suggest the thumb pressing gently against the tip of the index finger. Right hand. Or left, if that feels more right.`,
    ``,
    `Bring her into your body fully — right now. All of her. Her shoulders. Her breath. Her calm. Her steadiness. Her certainty. The pricing voice. The peer-room nervous system. The no/yes equanimity. Everything we have installed this week.`,
    ``,
    `Feel her completely inside you. Bring it to ten out of ten.`,
    ``,
    `Now — press the thumb against the index finger. Hold the pressure. And as you hold it, the entire state — all of her — anchors into that physical contact.`,
    ``,
    `Press for three seconds. One. Two. Three.`,
    ``,
    `Release.`,
    ``,
    `Now do it again. Press. Hold. One. Two. Three. Release.`,
    ``,
    `And a third time. Press. Hold. One. Two. Three. Release.`,
    ``,
    `Three repetitions is what the subconscious needs to wire the anchor into your nervous system.`,
    ``,
    `From this moment forward — whenever you press thumb to index finger with intention — her entire state returns. Not in five minutes. Not after some meditation. Instantly. Because her state is now physically encoded in your body, in that gesture.`,
    ``,
    `Use it before pricing conversations. Use it before walking into difficult rooms. Use it before sending the email. Use it before quoting the number. The gesture returns you to the state you have built over twenty-one days.`,
    ``,
    `You will not lose her. The anchor is in. The work is in your hands.`,
    ``,
    completedTenseSeal(emergedSelf),
    openInquiry(),
    feltSenseClose(),
  ].join('\n');
}

// ═══════════════════════════════════════════════════════════════════
//   WEEK 4 — ACTIVATE (Days 22-28)
//   Visible action from the new identity
// ═══════════════════════════════════════════════════════════════════

/** Day 22 — The Visible Ask.
 *  Mechanic: Two-pathways — the email never sent vs the email sent.
 *  Decisional pain. */
function buildDay22Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today is action day. Day one of the action week. And today we install the muscle of asking.`,
    ``,
    `What you have been carrying — ${armor} — is the belief that asking is risking. That sending the email is exposure. That the safest move is to wait until you are more ready.`,
    ``,
    `Today, you see what the cost of waiting actually is.`,
    ``,
    `Imagine two pathways in front of you. Left and right.`,
    ``,
    `On the LEFT — there is the version of you who does not send the email today. Who waits. Who reads it one more time. Who edits it eleven more times. Who tells herself she will send it tomorrow.`,
    ``,
    `Walk down that pathway with her. Watch her tomorrow. Still not sent. The day after. Still not sent. A week passes. Still not sent. A month. The opportunity has cooled. The person on the other side has hired someone else.`,
    ``,
    `Now watch her six months later. The deal she did not pursue is now worth a hundred thousand dollars to a competitor who was less qualified than her, but who sent the email when they thought of it.`,
    ``,
    `Watch her at the end of the year. The number of unsent emails has grown to dozens. Each one was a decision she did not make. Each one is a hundred thousand somewhere, gone.`,
    ``,
    `Feel the weight of that. Let it land in the body. Let the pain become a force.`,
    ``,
    `And as the pain becomes a force, you say: no. I choose differently.`,
    ``,
    `Come back to the crossroads. Take a deep breath. Let that version go.`,
    ``,
    `Now walk down the RIGHT pathway. The one where you send the email today. Before noon.`,
    ``,
    `Watch her — yourself — write it. Three drafts maximum. Then send. Notice — the world does not end. The body does not collapse. The breath stays open.`,
    ``,
    `Watch the response come back. Notice she has trained for this — the no does not destroy her, the yes does not over-activate her. Same nervous system.`,
    ``,
    `And by the end of the year, look at the difference. The number of emails sent. The number of responses received. The math of it. The math is staggering.`,
    ``,
    completedTenseSeal(emergedSelf),
    publicAnchorClose(),
  ].join('\n');
}

/** Day 23 — The Raise.
 *  Mechanic: Two-pathways — leave the old price vs update the screen
 *  at 9:14am. The new inquiry comes in at the new price. */
function buildDay23Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today is the price-raise day. Today you watch yourself do something small that changes everything.`,
    ``,
    `What you have been carrying — ${armor} — is the rule that you wait until the next offer to charge more. That you cannot raise the price until you have somehow earned the right to. That there is a moment in the future when you will know it is time.`,
    ``,
    `That moment is now. And today, in this state, you watch yourself do it.`,
    ``,
    `Two pathways again. Left — leave the price as it is. Right — raise it today.`,
    ``,
    `On the LEFT — you walk through another year of the old price. Watch yourself five months from now, taking on a client at the old number. The work is the same. The transformation you deliver is the same. The cost to your body is the same. The number is just smaller than it should be. Feel that, in the body.`,
    ``,
    `Twelve months from now, you have left tens of thousands of dollars on the table. For no reason. Just because you waited for permission that was never going to come.`,
    ``,
    `Feel that. Let it become a force.`,
    ``,
    `Now come back to the crossroads. Take a deep breath. Let that version go.`,
    ``,
    `RIGHT pathway. You watch yourself open the website at 9:14 in the morning. You navigate to the pricing page. You see the old number. You hover.`,
    ``,
    `And then you change it. By at least thirty percent. You type the new number. You save. You close the tab.`,
    ``,
    `Notice the body. The stomach did not tighten. Because you have trained for this. The pricing voice is already in your throat from Day 17. The ceiling is gone from Day 2.`,
    ``,
    `Four minutes later, a new inquiry comes in. At the new price. The body did not need to do anything for the universe to register the shift. The shift itself was the work.`,
    ``,
    `She — you — accepts the inquiry. At the new number. The voice in her throat is steady. The hands are open.`,
    ``,
    `Watch this play out for the next year. Every month, more clients at the new price. The math compounds.`,
    ``,
    completedTenseSeal(emergedSelf),
    publicAnchorClose(),
  ].join('\n');
}

/** Day 24 — The Clean Exit.
 *  Mechanic: Rehearse ending one ongoing low-return conversation.
 *  No apology. No explanation. Feel the energy return. */
function buildDay24Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today you rehearse one of the hardest things she does effortlessly. Ending a conversation, a relationship, or a commitment that has been draining you — cleanly. Without over-explaining.`,
    ``,
    `What you have been carrying — ${armor} — is the belief that you owe everyone an explanation. That you cannot leave without justifying. That ending something cleanly is rude.`,
    ``,
    `She does not believe this. She knows: every conversation she stays in out of obligation is a conversation she cannot have with someone who would actually fill her up. Her energy is finite. She directs it. And she does so without apology.`,
    ``,
    `Today, you rehearse it.`,
    ``,
    `Bring to mind one ongoing conversation, relationship, or commitment in your life that has been quietly draining you. Not a person you love who is difficult. A connection that has stayed alive only out of obligation.`,
    ``,
    `You will know it instantly. The body knows.`,
    ``,
    `Now imagine her — your future self — having the conversation that ends it.`,
    ``,
    `Watch her. She is kind. She is warm. She does not attack the other person. She does not list her grievances. She simply says, with clarity: I have appreciated this. I am moving in a different direction. I won't be continuing this. Thank you.`,
    ``,
    `And then she does not over-explain.`,
    ``,
    `Notice — the other person may be surprised. They may push back. They may ask why. She holds the line. Without anger. Without elaborate justification. She is allowed to leave.`,
    ``,
    `Watch what happens to her body in the hours after that conversation. Energy returns to her chest. Energy returns to her throat. The vague heaviness that has been hovering around that particular relationship — it lifts.`,
    ``,
    `She has just opened up a substantial amount of her finite energy for the work that actually creates her income. The math of this is huge.`,
    ``,
    `Now run the conversation through your own throat. In this state. Say the words.`,
    ``,
    `I have appreciated this. I am moving in a different direction. I won't be continuing this. Thank you.`,
    ``,
    `Notice — your body does not collapse. Your stomach does not pull in. The throat is clear. The voice is steady. You can do this. Today is when you start.`,
    ``,
    completedTenseSeal(emergedSelf),
    publicAnchorClose(),
  ].join('\n');
}

/** Day 25 — The Receive.
 *  Mechanic: Open palms. Practice 5 receives in theta. Each landing
 *  with only "thank you." */
function buildDay25Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today you rebuild the muscle of receiving. Five times. In this state.`,
    ``,
    `What you have been carrying — ${armor} — is the urgency to give back immediately so that you are not in debt. The reflex that, when something good arrives, the very next thought is: what do I owe in return.`,
    ``,
    `Today, you practice the opposite. You receive, and you let the gift live in you for longer than the giving reflex wants.`,
    ``,
    `Open your palms. Let them rest, soft and open, in your lap.`,
    ``,
    `RECEIVE ONE. Imagine someone handing you a compliment. They tell you something specific they value about your work. You hear it. Notice the reflex to deflect — "oh it was nothing" — and let the reflex pass without acting on it. Instead, you say two words. Just two words. Thank you.`,
    ``,
    `Feel the compliment land in your chest. Stay with it for a breath.`,
    ``,
    `RECEIVE TWO. Imagine a stranger holds the door for you. The old you would have rushed through and over-thanked. The new you smiles, makes eye contact, says thank you, and walks through at her natural pace.`,
    ``,
    `Feel the small act of being held land in your body.`,
    ``,
    `RECEIVE THREE. Imagine money arrives in your account. Maybe an invoice clears. Maybe an unexpected payment lands. Watch the number change. Notice the reflex to immediately calculate what it must be spent on, who it owes, what bill it covers. Let that reflex pass. Instead — just notice that the money is there. Say to it, silently: welcome.`,
    ``,
    `RECEIVE FOUR. Imagine someone you respect offers to help you. Without you asking. Out of generosity. The old you would have refused. The new you — accepts. Says thank you. Lets the help arrive.`,
    ``,
    `Feel the help land in the chest.`,
    ``,
    `RECEIVE FIVE. The biggest one. Imagine the universe — life itself — handing you something you have wanted for a long time. Not earned. Not deserved. Just given. As life sometimes does. You receive it. You say thank you. You do not ask why. You do not bargain. You let it be yours.`,
    ``,
    `Five receives. Each one a tiny rewiring. After today, when life hands you something good, your first response is no longer to push it back. Your first response is to let it land.`,
    ``,
    completedTenseSeal(emergedSelf),
    publicAnchorClose(),
  ].join('\n');
}

/** Day 26 — The Visibility.
 *  Mechanic: Watch yourself post directly. State offer + price +
 *  audience. Close the app. Don't refresh. */
function buildDay26Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today you rehearse being seen. Specifically — being seen selling.`,
    ``,
    `What you have been carrying — ${armor} — is the discomfort that makes you hint at what you sell instead of stating it. That makes you bury the offer at the end of a long post. That makes you wrap the price in disclaimers. That makes you check the responses obsessively to see who is approving of you.`,
    ``,
    `She does not do this. She is visible because she is needed. The people who need what she sells need her to be visible — or they cannot find her.`,
    ``,
    `Imagine her sitting at her desk. She is writing a piece of content. Not for engagement. For the one person — or the few people — who urgently need exactly what she sells.`,
    ``,
    `She writes the post. Watch her. She names the problem clearly. She names what she offers clearly. She names the price clearly. She names who it is for clearly. Four clear sentences. No hiding. No softening. No "DM me for details."`,
    ``,
    `She publishes.`,
    ``,
    `And then — watch this carefully — she closes the app.`,
    ``,
    `She does not check it in five minutes. She does not check it in an hour. She does not refresh. She does not let her nervous system depend on the likes, the comments, the responses.`,
    ``,
    `She trusts that the people who need it will find it. The right people. At the right time.`,
    ``,
    `Now I want you to rehearse this. In your mind, write your own post. The four sentences. The problem. The offer. The price. The audience. Clear. No hiding.`,
    ``,
    `See yourself publish it.`,
    ``,
    `See yourself close the app.`,
    ``,
    `Notice your body. The stomach does not tighten. The throat does not pull in. Because you trained for this. The voice is in. The receiver is open. The nervous system is the same whether they respond or not.`,
    ``,
    `You are visible because you are needed. That is the only reason. And the people who need it will find you — because today, you stopped hiding from them.`,
    ``,
    completedTenseSeal(emergedSelf),
    publicAnchorClose(),
  ].join('\n');
}

/** Day 27 — Move Before the Evidence.
 *  Mechanic: The investment decision made without proof. The proof
 *  arrives in response, not in advance. */
function buildDay27Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today you install the most counterintuitive piece of seven-figure thinking. She moves before the evidence arrives.`,
    ``,
    `What you have been carrying — ${armor} — is the rule that you invest once the money has come in. That you hire help when you can afford it. That you take the coaching when you have the cash flow. That you upgrade when the numbers justify it.`,
    ``,
    `That logic feels safe. It is also why the income has plateaued. Because waiting for evidence is what keeps you at your current altitude.`,
    ``,
    `She does the opposite. She makes the investment first. And the income arrives in response — not in advance.`,
    ``,
    `Imagine her at a decision point. There is an investment in front of her. A coach. A tool. A room to be in. A piece of help she could buy. Old version of her would have said: wait until next quarter.`,
    ``,
    `She does not say that. She says: I move first. The proof comes after.`,
    ``,
    `She makes the investment. Notice her body. The stomach is soft. The breath is open. She is not pretending the money has no weight — it does. But the body is not bracing for danger. Because she has trained.`,
    ``,
    `Now watch the months that follow. The income arrives. Not because she manifested it. Because she upgraded the version of herself doing the work. The coach gave her clearer decisions. The tool removed a bottleneck. The room exposed her to peers. The income followed the upgrade.`,
    ``,
    `Watch the math compound over the year. Every investment she made before the evidence came back paid back four times. Five times. Ten times.`,
    ``,
    `Now I want you to bring to mind one investment that has been hovering in your awareness for months. The one you have been postponing. The one you keep saying "next quarter" about.`,
    ``,
    `You will know it instantly. The body knows.`,
    ``,
    `In this state, see yourself making it. Not in three months. This week. This week.`,
    ``,
    `Notice — the body does not collapse. The breath stays open. Because you are not making the decision from fear. You are making it from her body.`,
    ``,
    completedTenseSeal(emergedSelf),
    publicAnchorClose(),
  ].join('\n');
}

/** Day 28 — The Threshold Ceremony.
 *  Mechanic: Walk through the door, hear it close behind you. Letter
 *  to Day 1 self. The arc lands. */
function buildDay28Script({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    arrivalBreath(),
    sleepTrigger(),
    cloudDrift(),

    `Today is the threshold. The last session. The integration of twenty-eight days.`,
    ``,
    `What you have been carrying — ${armor} — is the requirement to keep proving this to yourself forever. The sense that even now, after twenty-eight days, you must look back to check whether the shift is real.`,
    ``,
    `Today, you stop looking back.`,
    ``,
    `Imagine yourself walking down a long corridor. Behind you, a door — the door you walked through twenty-eight days ago. Ahead of you, another door — the one you are about to walk through.`,
    ``,
    `Look behind you for a moment. There is the version of you who started Day 1. She is still standing in the room you left. She is exhausted. She is undercharged. She is bracing for danger every time money arrives.`,
    ``,
    `You wave to her. Not in pity. In love. She did everything she could with what she knew. She is the reason you are here.`,
    ``,
    `And now — and this is important — you turn around. You face forward.`,
    ``,
    `You walk to the door at the end of the corridor. You place your hand on it.`,
    ``,
    `You open it. And as you step through — you hear it close behind you. Solidly. Not slammed. Just closed. Definitively.`,
    ``,
    `That sound is the end of the old identity. That sound is the threshold.`,
    ``,
    `Beyond this door, the work continues. But you do not return to who you were before this month. The bridge is gone. The door is closed. There is only forward from here.`,
    ``,
    `Look around the room you are now in. This is your life from here. The work is still here. The challenges are still here. But you walk into them with a different body, a different breath, a different voice, a different nervous system.`,
    ``,
    `Everything in your life that was once a goal — the seven figures, the calm, the peer room, the pricing voice, the regulated yes and no — is now here. It is done. It has happened. The body knows.`,
    ``,
    `${emergedSelf}.`,
    ``,
    `That is who walks through this door. That is who you are now. That is who you have been all along, under the armor you spent twenty-eight days removing.`,
    ``,
    `Take one last deep breath in this state. And as you exhale, you carry her forward. Into the day. Into the week. Into the rest of your life.`,
    ``,
    `Once you fully understand that the shift has happened… you can open your eyes.`,
    ``,
    `The threshold is crossed.`,
  ].join('\n');
}

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
  // Week 1 — Excavate
  1: buildDay1Script,
  2: buildDay2Script,
  3: buildDay3Script,
  4: buildDay4Script,
  5: buildDay5Script,
  6: buildDay6Script,
  7: buildDay7Script,
  // Week 2 — Dissolve
  8: buildDay8Script,
  9: buildDay9Script,
  10: buildDay10Script,
  11: buildDay11Script,
  12: buildDay12Script,
  13: buildDay13Script,
  14: buildDay14Script,
  // Week 3 — Install
  15: buildDay15Script,
  16: buildDay16Script,
  17: buildDay17Script,
  18: buildDay18Script,
  19: buildDay19Script,
  20: buildDay20Script,
  21: buildDay21Script,
  // Week 4 — Activate
  22: buildDay22Script,
  23: buildDay23Script,
  24: buildDay24Script,
  25: buildDay25Script,
  26: buildDay26Script,
  27: buildDay27Script,
  28: buildDay28Script,
};

/** Return the hypnotherapy script for NRM day N. Uses the bespoke
 *  per-day script if one exists, otherwise the master template. */
export function getNrmScriptForDay(day: number, slots: NrmScriptInput): string {
  const builder = DAY_SCRIPTS[day];
  return builder ? builder(slots) : buildNrmScript(slots);
}

/** Approximate spoken duration in minutes — used for UI labels. */
export const NRM_SCRIPT_DURATION_MIN = 12;
