/**
 * Within — Guided Breathwork Scripts.
 *
 * Voice-guided narration that walks the user through each breath pattern,
 * counting them in and out. Plays through the SpeechPlayer (ElevenLabs
 * if /api/tts is configured, browser Web Speech otherwise).
 *
 * Authored to be spoken at a natural cadence (~0.82 rate). The counting
 * "one... two... three... four..." with ellipses creates the right
 * breathing pauses for the listener to follow.
 *
 * Add more patterns as we go. Each entry must match an id in
 * src/data/breathwork.ts so the breathwork detail page can look it up.
 */

export interface GuidedBreathScript {
  /** Matches the breathwork session id (e.g. 'breath-4-7-8'). */
  id: string;
  /** Display title — keeps the kicker on the detail page in sync. */
  title: string;
  /** One-line description of what the guided practice will do. */
  blurb: string;
  /** Total runtime estimate (minutes). */
  durationMin: number;
  /** Number of full rounds the user walks through. */
  rounds: number;
  /** The full narrated body. Preserve newlines + ellipses — they
   *  control the voice cadence. */
  body: string;
}

// ────────────────────────────────────────────────────────────────
// 4-7-8 BREATH — the nervous system reset
// ────────────────────────────────────────────────────────────────

const FOUR_SEVEN_EIGHT: GuidedBreathScript = {
  id: 'breath-4-7-8',
  title: '4-7-8 Breath — Guided',
  blurb:
    'Five rounds, counted out loud. Inhale four. Hold seven. Exhale eight. Just sit and follow.',
  durationMin: 6,
  rounds: 5,
  body: `Welcome.

We are going to do five rounds of four, seven, eight breath. The most reliable nervous system reset there is. Most people feel the shift after the second round.

Sit upright. Or lie down. Eyes closed if you can.

Place the tip of your tongue gently behind your top front teeth. Let it rest there. That is the only position you need.

Before we begin… exhale completely. Through the mouth. Make a soft whoosh sound. Let everything out.

Beautiful.

Now we begin.

Round one. Closing the mouth, breathing in through the nose. Slowly. One… two… three… four.

Hold. One… two… three… four… five… six… seven.

Open the mouth and exhale fully. One… two… three… four… five… six… seven… eight.

One round done.

Round two. Inhale through the nose. One… two… three… four.

Hold. One… two… three… four… five… six… seven.

Exhale. One… two… three… four… five… six… seven… eight.

Two rounds done. You are slowing already.

Round three. Inhale. One… two… three… four.

Hold. One… two… three… four… five… six… seven.

Long exhale. One… two… three… four… five… six… seven… eight.

Halfway. Notice the shoulders dropping. Notice the jaw softening.

Round four. Inhale through the nose. One… two… three… four.

Hold. One… two… three… four… five… six… seven.

Exhale slowly. One… two… three… four… five… six… seven… eight.

One more.

Round five. Final round. Inhale. One… two… three… four.

Hold. One… two… three… four… five… six… seven.

Long, slow exhale. One… two… three… four… five… six… seven… eight.

Done.

Sit for a moment. Notice how different the body feels compared to one minute ago. The chest. The jaw. The base of the skull.

That is the parasympathetic system coming online. You can do this anywhere. Any time. Three rounds is enough for the middle of the day. Five is the sleep dose.

When you are ready, gently open your eyes. And carry this with you.`,
};

// ────────────────────────────────────────────────────────────────
// BOX BREATH — 4-4-4-4, steady ground
// ────────────────────────────────────────────────────────────────

const BOX_BREATH: GuidedBreathScript = {
  id: 'breath-box',
  title: 'Box Breath — Guided',
  blurb:
    'Equal sides. Four in, four hold, four out, four hold. Steady ground for any moment.',
  durationMin: 7,
  rounds: 6,
  body: `Welcome.

We are going to do six rounds of box breath. Equal on every side. Four counts in. Four counts hold. Four counts out. Four counts hold.

This is the breath the special forces use before high-pressure tasks. Steady. Predictable. It tells the nervous system: I am in control.

Sit upright. Shoulders back. Eyes closed if you can.

Take one normal breath in… and out.

Now we begin.

Round one. Inhale through the nose. One… two… three… four.

Hold. One… two… three… four.

Exhale through the nose. One… two… three… four.

Hold empty. One… two… three… four.

One round done.

Round two. Inhale. One… two… three… four.

Hold. One… two… three… four.

Exhale. One… two… three… four.

Hold. One… two… three… four.

Two rounds done.

Round three. Inhale. One… two… three… four.

Hold. One… two… three… four.

Exhale. One… two… three… four.

Hold. One… two… three… four.

Halfway.

Round four. Inhale. One… two… three… four.

Hold. One… two… three… four.

Exhale. One… two… three… four.

Hold. One… two… three… four.

Round five. Inhale. One… two… three… four.

Hold. One… two… three… four.

Exhale. One… two… three… four.

Hold. One… two… three… four.

One more.

Round six. Inhale. One… two… three… four.

Hold. One… two… three… four.

Exhale. One… two… three… four.

Hold. One… two… three… four.

Done.

Sit for a moment in the steadiness. This is what your nervous system feels like when it is not chasing anything. Remember it.

When you are ready, gently open your eyes.`,
};

// ────────────────────────────────────────────────────────────────
// GROUNDING BREATH — exhale-led, settling
// ────────────────────────────────────────────────────────────────

const GROUNDING_BREATH: GuidedBreathScript = {
  id: 'breath-grounding',
  title: 'Grounding Breath — Guided',
  blurb:
    'Slow nasal in. Long, audible exhale out. Brings you back when the day pulled you too far out.',
  durationMin: 7,
  rounds: 8,
  body: `Welcome.

When the day pulls you too far out — too many people, too much input, too much pace — this is the breath that brings you back down. Slow in through the nose. Long, audible out through the mouth. The exhale is the medicine.

Sit upright. Feet flat on the floor if you can. Hands resting in your lap.

Notice your feet. Notice the floor. Notice the seat under you. The earth is holding you. You do not have to hold yourself up.

Now we begin.

Round one. Inhale through the nose. One… two… three… four.

Long exhale through the mouth. One… two… three… four… five… six… seven… eight.

Round two. Inhale through the nose. One… two… three… four.

Long exhale. One… two… three… four… five… six… seven… eight.

Round three. Slow in. One… two… three… four.

Long out. One… two… three… four… five… six… seven… eight.

Round four. In. One… two… three… four.

Out. One… two… three… four… five… six… seven… eight.

Halfway. Notice how the body is heavier on the seat now. That is the parasympathetic system. That is the come-down.

Round five. In. One… two… three… four.

Out. One… two… three… four… five… six… seven… eight.

Round six. Inhale. One… two… three… four.

Long exhale. One… two… three… four… five… six… seven… eight.

Round seven. In. One… two… three… four.

Out. One… two… three… four… five… six… seven… eight.

One more.

Round eight. Inhale slowly. One… two… three… four.

Final long exhale. One… two… three… four… five… six… seven… eight.

Done.

Sit for a moment. The day is still happening. But you are not running ahead of it anymore. You are here.

When you are ready, gently open your eyes.`,
};

// ────────────────────────────────────────────────────────────────
// FIRE BREATH — Kapalabhati, wake up the power centre
// ────────────────────────────────────────────────────────────────

const FIRE_BREATH: GuidedBreathScript = {
  id: 'breath-fire',
  title: 'Fire Breath — Guided',
  blurb:
    'Three rounds of rapid belly pumping. Wakes you up fast. Move stagnant energy.',
  durationMin: 12,
  rounds: 3,
  body: `Welcome.

We are going to do three rounds of fire breath. Kapalabhati. The fastest way to wake the body up. To move stagnant energy. To return to aliveness.

A safety note before we begin. Skip this practice if you are pregnant. If you are menstruating. If you have high blood pressure, heart conditions, epilepsy, hernia, or recent abdominal surgery. If any of those apply, just sit and breathe normally with me today.

For everyone else — sit upright. Cross-legged on the floor or in a chair with both feet flat. Spine tall. Hands resting on the knees.

Take one long inhale through the nose. And one long exhale through the mouth.

The technique is short, sharp exhales through the nose. The belly pumps inward on each exhale. The inhale is passive — the belly relaxes and air comes in on its own. You are only powering the out-breath.

Let me demonstrate the rhythm. Short out. Short out. Short out. Short out. About two pumps per second.

Now we begin.

Round one. Thirty breaths. Begin. Short. Short. Short. Short. Short. Short. Short. Short. Short. Short. Keep going on your own. I will count us back together at the end.

Twenty more.

Ten more.

And… stop. Take one long slow inhale through the nose. Hold for a moment. And exhale fully through the mouth.

Rest. Just sit. Notice the buzz. The aliveness in the body. That is the prana moving. One round done.

Round two. Same rhythm. Thirty breaths. Begin. Short. Short. Short. Short. Keep going.

Twenty more.

Ten more.

And… stop. Long slow inhale. Hold. And release through the mouth.

Rest. Notice. Two rounds done.

Round three. Final round. Forty breaths this time. Begin. Short. Short. Short. Short. Keep going.

Thirty more.

Twenty more.

Ten more.

And… stop. One long, deep inhale. Hold at the top. Exhale slowly through the mouth.

Sit. Eyes closed. Just be in the body now. Notice how different it feels compared to five minutes ago. The chest. The hands. The crown of the head. That is the system online and oxygenated.

Done. Carry this aliveness with you.

When you are ready, gently open your eyes.`,
};

// ────────────────────────────────────────────────────────────────
// ALTERNATE NOSTRIL — Nadi Shodhana, balance the two halves
// ────────────────────────────────────────────────────────────────

const ALTERNATE_NOSTRIL: GuidedBreathScript = {
  id: 'breath-alternate-nostril',
  title: 'Alternate Nostril — Guided',
  blurb:
    'Eight cycles of switching nostrils. Balance the nervous system. Come back to centre.',
  durationMin: 11,
  rounds: 8,
  body: `Welcome.

Today we are doing eight rounds of alternate nostril breathing. Nadi Shodhana. The breath that resets you when you are scattered. When the head is loud. When you have been pulled in too many directions.

This breath balances the two halves of the brain by alternating which nostril you breathe through. Modern science backs it. Five minutes of this and the mind clears.

Sit upright. Spine tall. Left hand resting on your left knee, palm up.

Bring your right hand to your face. We will use the thumb to close the right nostril, and the ring finger to close the left. The index and middle finger can rest gently between the eyebrows, or curl into the palm.

Take one normal breath through both nostrils to settle.

Now we begin.

Round one. Close the right nostril with the thumb. Exhale fully through the left. Inhale through the left. One… two… three… four.

Now close the left nostril with the ring finger. Release the thumb. Exhale through the right. One… two… three… four… five… six.

Inhale through the right. One… two… three… four.

Close the right. Release the left. Exhale through the left. One… two… three… four… five… six.

One round done.

Round two. Inhale left. One… two… three… four. Switch. Exhale right. Long, slow. Inhale right. Switch. Exhale left.

Two rounds.

Round three. Inhale left. Switch. Exhale right. Inhale right. Switch. Exhale left. Notice the rhythm settling.

Three.

Round four. Continue the pattern. Inhale left. Switch. Exhale right. Inhale right. Switch. Exhale left.

Halfway. Notice the head clearing.

Round five. Inhale left. Switch. Exhale right. Inhale right. Switch. Exhale left.

Round six. Same pattern. Smooth now. The rhythm is its own thing.

Round seven. Inhale left. Switch. Exhale right. Inhale right. Switch. Exhale left.

One more.

Round eight. Final round. Inhale left. Switch. Exhale right. Inhale right. Switch. Final long exhale through the left nostril.

Lower the hand. Sit with both nostrils breathing freely. Notice how steady the head feels. That is the centred mind. The clear one.

When you are ready, gently open your eyes.`,
};

// ────────────────────────────────────────────────────────────────
// DIAPHRAGM RELEASE — soften the armour in the core
// ────────────────────────────────────────────────────────────────

const DIAPHRAGM_RELEASE: GuidedBreathScript = {
  id: 'breath-diaphragm',
  title: 'Diaphragm Release — Guided',
  blurb:
    'Twelve slow belly breaths. Softens the armour in the core. Best when you have been holding tension all day.',
  durationMin: 10,
  rounds: 12,
  body: `Welcome.

Today is a breath for the body. For the belly. For the place that most of us have been holding tight without knowing.

The diaphragm is the muscle just under the lungs that should expand the belly outward on every inhale. But under chronic stress, most of us breathe in the chest instead — shallow, fast, never reaching the belly. The body interprets that as constant low-grade alarm.

Today we soften that.

Sit upright or lie on your back. Whichever lets you fully relax.

Place one hand on your chest. Place the other hand on your belly, just below the navel.

Take one normal breath. Notice which hand moved more. If it was the chest, that is the pattern we are about to change.

Now we begin. Twelve slow breaths. Belly only.

Breath one. Inhale slowly through the nose. Send the air all the way down. Feel the belly push your hand outward. One… two… three… four. Exhale slowly through the mouth. Feel the belly soften. One… two… three… four… five… six.

Breath two. Inhale. Belly rises. One… two… three… four. Exhale. Belly falls. One… two… three… four… five… six.

Breath three. Inhale long and low. Feel the lower back press into the floor if you are lying down. Exhale completely.

Breath four. Inhale. The chest hand should barely move. All the movement is in the belly. Exhale.

Breath five. Inhale into the lowest part of the body. Exhale longer than the inhale.

Breath six. Halfway. Notice the body softening already. The shoulders dropping. The jaw loosening.

Breath seven. Inhale. Long. Slow. Exhale even longer.

Breath eight. Inhale. Exhale.

Breath nine. The diaphragm remembers. The body remembers. You always had this.

Breath ten. Inhale fully. Exhale fully.

Breath eleven. Inhale. Slow. Exhale longer.

Final breath. Twelve. Inhale into the deepest part of the belly. Hold for a moment. Exhale completely.

Done.

Stay where you are for a minute. Let the body keep breathing this way on its own. This is the breath your nervous system has been asking for.

When you are ready, gently open your eyes.`,
};

// ────────────────────────────────────────────────────────────────
// BUTEYKO — less breath, more oxygen
// ────────────────────────────────────────────────────────────────

const BUTEYKO_BREATH: GuidedBreathScript = {
  id: 'breath-buteyko',
  title: 'Buteyko — Guided',
  blurb:
    'Gentle, reduced breathing through the nose. Quiets anxiety by raising CO2 tolerance.',
  durationMin: 12,
  rounds: 10,
  body: `Welcome.

This is Buteyko breathwork. The counter-intuitive practice. Most people think more air equals more calm. The opposite is true. When you breathe less, your body tolerates more carbon dioxide — and that is what tells the nervous system you are safe.

If you are panicking, anxious, breathless, or trying to fall asleep, this is the breath.

Sit upright. Or lie down. Eyes closed if you can.

Close your mouth. We will only breathe through the nose for this entire practice. No mouth breathing at all.

Take three normal breaths through the nose. Just to settle.

Now we begin.

The technique is simple. You inhale slightly less than you would naturally. And you exhale slightly less than you would naturally. The goal is to create a very mild sense of air hunger. Not panic. Just a faint feeling that you would like a tiny bit more breath than you are taking.

Breath one. Inhale through the nose. Smaller than usual. Two seconds. Exhale through the nose. Smaller than usual. Three seconds. Then a slight pause where you are not breathing at all. One second.

Breath two. Small in. Small out. Pause.

Breath three. Small in. Small out. Pause. Notice the urge to take a bigger breath. Resist it gently. Just stay with the small.

Breath four. Small in. Small out. Pause.

Breath five. Halfway. By now you should feel a very mild sense of needing air. That is the CO2 rising. That is the medicine.

Breath six. Small in. Small out. Pause.

Breath seven. Continue the rhythm. The body learns this fast.

Breath eight. Small. Small. Pause.

Breath nine. One more after this.

Breath ten. Final. Small in. Small out. Long pause.

Now take three normal breaths through the nose. Notice how slow your breathing has become on its own. The body has reset its baseline.

This is what calm actually looks like at the nervous system level. Quiet breath. Available CO2. Steady heart.

You can return to this any time you feel breathless or anxious. Just breathe less.

When you are ready, gently open your eyes.`,
};

// ────────────────────────────────────────────────────────────────
// ALKALINE — energise the body, oxygenate the system
// ────────────────────────────────────────────────────────────────

const ALKALINE_BREATH: GuidedBreathScript = {
  id: 'breath-alkaline',
  title: 'Alkaline Breath — Guided',
  blurb:
    'Continuous rapid nasal breathing. Picks you up when you are flat. Three rounds of forty.',
  durationMin: 8,
  rounds: 3,
  body: `Welcome.

This is alkaline breathwork. Continuous, rhythmic, energising. Use this when you are flat. When your head is foggy. When you need to come up, not down. Three rounds of forty connected breaths.

A safety note. Skip this practice if you are pregnant or have high blood pressure or a heart condition. If you feel lightheaded at any point, just stop and breathe normally.

Sit upright. Spine tall. Hands on knees.

The technique is rapid, connected breathing through the nose. No pause between breaths. The inhale flows directly into the exhale, and the exhale flows directly into the next inhale. About one breath per second.

Take three normal breaths to begin.

Now we begin.

Round one. Forty connected breaths. In and out. In and out. In and out. Faster than normal but smooth. No pause between breaths. Begin.

One… two… three… four… five… six… seven… eight… nine… ten. Keep the rhythm going on your own. I will count us out at the end.

Twenty…

Thirty…

Forty. Stop.

One long, slow inhale through the nose. Hold at the top. Exhale slowly. Rest for a moment. Notice the buzz in the hands. The aliveness in the chest. That is the oxygen flooding the system.

One round done.

Round two. Forty breaths again. Connected. Smooth. Begin.

Keep going. The rhythm is its own thing. Just stay with the in and out.

Forty.

One long inhale. Hold. Slow exhale. Rest.

Two rounds done. You should feel the body lifting already.

Round three. Final round. Forty more. Begin.

Halfway through this round. Twenty more.

Ten more.

Forty.

One final long inhale. Hold at the top. Slow exhale.

Done.

Sit for a moment. Notice the lightness. The system is oxygenated and alkaline now — more usable energy than you had ten minutes ago. Take this into the next thing on your day.

When you are ready, gently open your eyes.`,
};

// ────────────────────────────────────────────────────────────────
// ACTIVATION BREATH — two-part circular, big release
// ────────────────────────────────────────────────────────────────

const ACTIVATION_BREATH: GuidedBreathScript = {
  id: 'breath-activation',
  title: 'Activation Breath — Guided',
  blurb:
    'Two-part circular breathing. Big release work. Use with care — emotion may surface.',
  durationMin: 22,
  rounds: 1,
  body: `Welcome.

This is activation breathwork. The deepest practice in our library. Two-part connected breathing for fifteen to twenty minutes. It moves what has been stuck. Emotion. Memory. Stored tension.

A serious safety note. Skip this practice if you are pregnant, have a heart condition, high blood pressure, epilepsy, or have experienced trauma you are not ready to revisit. This is not a daily practice. This is a weekend practice. Do it when you have time and space afterwards. Not before a meeting.

The technique. Lie on your back. Knees can be bent or straight. Eyes closed. Mouth slightly open.

Two parts to each breath. Inhale first into the belly — feel the belly rise. Then inhale into the chest — feel the chest rise. Then one long, soft exhale through the mouth, releasing everything. Belly. Chest. Out.

There is no pause between breaths. The exhale flows straight into the next belly inhale. Continuous. Rhythmic. Like a wave.

Start gentle. We will go for about fifteen minutes.

Now we begin.

Inhale into the belly… inhale into the chest… exhale.

Inhale belly… inhale chest… exhale.

Belly. Chest. Out.

Belly. Chest. Out.

Keep the rhythm going. Stay connected. No pause.

If hands start tingling, that is normal. The body is over-oxygenating slightly. It will pass. Keep breathing.

If emotion comes up, let it. Tears, sighs, sounds, shaking. The body is releasing what it has held. Do not stop the breath. The breath is what is doing the work.

Continue. Belly. Chest. Out.

Continue. Belly. Chest. Out.

Five minutes in. Notice how the body feels different already.

Continue. Belly. Chest. Out.

Stay with the breath. Whatever comes up, keep breathing.

Ten minutes in. Notice if any memory or image has surfaced. Just let it pass through. You do not have to fix it. Breathing is enough.

Continue.

Fifteen minutes. Begin to slow the rhythm. The exhales lengthen. The breath softens.

Slow.

Even slower.

Now stop breathing the active pattern. Let the breath return to its natural rhythm.

Stay where you are. Eyes closed. Body resting. Whatever moved, let it land.

Rest in this for as long as you need. The integration happens in the silence after, not the breath itself.

When you are ready, gently turn to your side. Stay there for a moment. Then slowly come back to seated.

Drink water. Do not make decisions for the rest of the day. Let your body rest.

You have done something important. Treat yourself gently.`,
};

// ────────────────────────────────────────────────────────────────
// AHAM PRAKASHA — I am light
// ────────────────────────────────────────────────────────────────

const AHAM_PRAKASHA: GuidedBreathScript = {
  id: 'breath-aham-prakasha',
  title: 'Aham Prakasha — Guided',
  blurb:
    'Conscious connected breath held with the mantra "I am light." Opens the heart, raises vibration.',
  durationMin: 15,
  rounds: 1,
  body: `Welcome.

Aham Prakasha. The Sanskrit phrase means "I am light."

This is the breath that takes you beyond the body. Conscious connected breathing held with the intention of light moving through you on every cycle. Twelve minutes of this and the heart opens. The vibration rises.

Sit upright. Cross-legged on the floor or in a chair with feet flat. Spine tall. Crown lifted. Hands resting in your lap, palms up.

Close your eyes.

Take three slow breaths to settle. Inhale through the nose. Exhale through the nose.

Now bring the phrase into your awareness. Silently. Aham Prakasha. I am light.

On every inhale, picture light flowing into the crown of your head from above.

On every exhale, picture that light filling your entire body — chest, belly, limbs, fingertips.

The breath is continuous. No pause between inhale and exhale. Connected. Smooth.

Now we begin.

Inhale. Light in. Aham. Exhale. Light through. Prakasha.

Inhale. Aham. Exhale. Prakasha.

I am light.

Inhale. Light pouring into the crown.

Exhale. Light filling the body.

Continue. Keep the rhythm. Let the mantra repeat itself on its own.

Inhale. I am.

Exhale. Light.

Three minutes in. Notice the body becoming lighter. Less heavy. Less dense.

Inhale. Aham.

Exhale. Prakasha.

Continue.

Five minutes in. Notice the boundary of your body softening. The skin less of a line, more of a suggestion. You are extending.

Inhale. Light.

Exhale. Light.

Continue.

Eight minutes in. Stay with it. The mantra is doing the work now.

Inhale. Aham.

Exhale. Prakasha.

Eleven minutes.

Inhale. Light.

Exhale. Light.

One more minute.

Twelve.

Let the breath return to its natural rhythm. But hold the awareness of light still moving through you.

You are not separate from the light. You never were. The body is just where the light gets focused for a while.

Sit in this for a moment longer. Let it land.

Aham Prakasha. I am light.

When you are ready, gently open your eyes. And carry this with you.`,
};

// ────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────

const SCRIPTS: GuidedBreathScript[] = [
  FOUR_SEVEN_EIGHT,
  BOX_BREATH,
  GROUNDING_BREATH,
  FIRE_BREATH,
  ALTERNATE_NOSTRIL,
  DIAPHRAGM_RELEASE,
  BUTEYKO_BREATH,
  ALKALINE_BREATH,
  ACTIVATION_BREATH,
  AHAM_PRAKASHA,
];

export const GUIDED_BREATH_SCRIPTS: Record<string, GuidedBreathScript> = SCRIPTS.reduce(
  (acc, s) => {
    acc[s.id] = s;
    return acc;
  },
  {} as Record<string, GuidedBreathScript>
);

export function getGuidedBreathScript(id: string): GuidedBreathScript | undefined {
  return GUIDED_BREATH_SCRIPTS[id];
}
