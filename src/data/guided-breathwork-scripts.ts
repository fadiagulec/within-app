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
// EXPORTS
// ────────────────────────────────────────────────────────────────

const SCRIPTS: GuidedBreathScript[] = [
  FOUR_SEVEN_EIGHT,
  BOX_BREATH,
  GROUNDING_BREATH,
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
