/**
 * NRM — Neuro-Reprogramming Method · 28-day arc.
 *
 * One master hypnotherapy session (src/data/nrm-script.ts) reused every
 * day. Only two slots vary per day:
 *
 *   armor       — the specific weight/belief/fear dissolving in the
 *                 river today, phrased as a noun phrase that reads
 *                 naturally inline ("the inherited belief that money
 *                 is hard to keep")
 *   emergedSelf — the specific identity dimension being installed
 *                 after the float, phrased as a noun phrase ("the
 *                 version of you who quotes her real price without
 *                 softening her voice")
 *
 * Repetition of the same archetypal landscape (mountain → river →
 * armor dissolution → float → 10x emergence) is what deepens theta
 * across the 28-day arc. Only the per-day armor + emergedSelf change.
 *
 * Architecture (non-negotiable order):
 *   Week 1 — EXCAVATE (Days 1-7)   surface every story you inherited
 *   Week 2 — DISSOLVE (Days 8-14)  engineered amnesia on the core 3
 *   Week 3 — INSTALL (Days 15-21)  the new identity, written into body
 *   Week 4 — ACTIVATE (Days 22-28) visible action from the new self
 *
 * Chakra mapping per phase:
 *   Excavate → Root         (survival, money fears, foundational beliefs)
 *   Dissolve → Sacral       (emotional release, forgiveness, lineage)
 *   Install  → Solar Plexus (worth, will, identity)
 *   Activate → Third Eye    (decision, action, vision)
 */

import type { Plan } from './types';

export const NRM_PROGRAM: Plan = {
  id: 'nrm-28-day',
  title: 'NRM · Neuro-Reprogramming',
  subtitle: 'A 28-day subconscious rewire to install the 7-figure identity.',
  description:
    'You are not undercharging because you lack a strategy. You are undercharging because your nervous system does not yet experience seven figures as safe. The NRM session — mountain ascent, river crossing, the dissolution of the armor you have been carrying, the emergence of the version of you who already lives the income you are calling in — is the only place that wiring is actually re-written. Twenty-eight days. About twelve minutes each. The doubling happens because you finally do what you already knew to do.',
  tagline: 'Stop pushing harder. Cross the river. Walk out as her.',
  durationDays: 28,
  coverColor: '#5645A6', // indigo — third eye / quantum field
  priceUSD: null,

  days: [
    // ─────────── WEEK 1 — EXCAVATE (Days 1-7) ───────────
    {
      day: 1,
      phase: 'excavate',
      chakraId: 'root',
      title: 'Day 1 · The Money Inheritance',
      intent: 'Surface the first three things you ever heard about money. Word for word.',
      affirmation: 'I am willing to see what was given to me.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the inherited story about money that was never yours to begin with',
        emergedSelf: 'the version of you who knows where her money story came from and is no longer run by it',
      },
      journalPrompt: 'Write the first three things you ever heard about money. Word for word, if possible.',
    },
    {
      day: 2,
      phase: 'excavate',
      chakraId: 'root',
      title: 'Day 2 · The Earning Ceiling',
      intent: 'Locate the dollar number above which your body tightens. Do not change it. Just find it.',
      affirmation: 'My current ceiling is here. It is information, not a verdict.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the invisible ceiling above which your body has been bracing for danger',
        emergedSelf: 'the version of you who names her real price and her stomach stays soft',
      },
      journalPrompt: 'What is the most you have ever charged for one hour of your work? What did your stomach do when you sent the invoice?',
    },
    {
      day: 3,
      phase: 'excavate',
      chakraId: 'root',
      title: 'Day 3 · The Worth Imprint',
      intent: 'Recall the first time you were told you were "too much." Notice the cost.',
      affirmation: 'I was not too much. The room was too small.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the shrinking you learned in order to be loved',
        emergedSelf: 'the version of you who takes up the full size of who she is — without apology, without dimming',
      },
      journalPrompt: 'When did I learn that to be loved I had to be smaller?',
    },
    {
      day: 4,
      phase: 'excavate',
      chakraId: 'root',
      title: 'Day 4 · The Receiver Audit',
      intent: 'Practice receiving in theta — a compliment, a gift, an unearned kindness. Notice the reflex to deflect.',
      affirmation: 'I am safe to receive what is given.',
      breathworkId: 'breath-diaphragm',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the reflex to deflect everything good before it lands',
        emergedSelf: 'the version of you who hears the compliment, the offer, the gift — and says only thank you, with nothing added',
      },
      journalPrompt: 'Three times in the last week I deflected money, praise, or help. What did I do instead?',
    },
    {
      day: 5,
      phase: 'excavate',
      chakraId: 'root',
      title: 'Day 5 · The Borrowed Voice',
      intent: 'Identify the inner critic. Whose voice is it actually? Name them.',
      affirmation: 'That voice belongs to someone else. I am returning it to them.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the borrowed voice of "who do you think you are" that has been deciding for you',
        emergedSelf: 'the version of you who hears the inherited critic and continues moving forward, undisturbed',
      },
      journalPrompt: 'Whose voice rises up when I am about to charge more? Name them.',
    },
    {
      day: 6,
      phase: 'excavate',
      chakraId: 'root',
      title: 'Day 6 · The Safety Calculation',
      intent: 'Find the part of you that believes more money equals more danger.',
      affirmation: 'Money is not the danger. Visibility is. I am safe to be seen.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the calculation that says if you grow, you will lose the people you love',
        emergedSelf: 'the version of you who is wealthy and surrounded by people who celebrate her wealth',
      },
      journalPrompt: 'What would change if I made ten times what I make now — who in my life would feel the difference, and how?',
    },
    {
      day: 7,
      phase: 'excavate',
      chakraId: 'root',
      title: 'Day 7 · The Integration Pause',
      intent: 'No new excavation. Theta plus breath only. Let the surfaced material settle into the body.',
      affirmation: 'I have looked clearly. I am not afraid of what I have seen.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the requirement to keep working to make this worth it',
        emergedSelf: 'the version of you who rests, while the work is still working in her body',
      },
      journalPrompt: 'One sentence: "The story I have been running is _______."',
    },

    // ─────────── WEEK 2 — DISSOLVE (Days 8-14) ───────────
    {
      day: 8,
      phase: 'dissolve',
      chakraId: 'sacral',
      title: 'Day 8 · Belief One — "I have to work hard for money"',
      intent: 'In theta, you watch this belief play out in someone else. It is theirs. You hand it back.',
      affirmation: 'I release the requirement that money cost me my body.',
      breathworkId: 'breath-buteyko',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the requirement that money has to cost you your body, your time, your rest',
        emergedSelf: 'the version of you who earns more in the easiest week of her life than the old you did in a year of struggle',
      },
      journalPrompt: 'What would I do tomorrow morning if I knew I never again had to work harder?',
    },
    {
      day: 9,
      phase: 'dissolve',
      chakraId: 'sacral',
      title: 'Day 9 · Belief Two — "Money is hard to keep"',
      intent: 'Money is not a weather pattern. It does not arrive in storms. It stays.',
      affirmation: 'I am a stable home. Money lives here.',
      breathworkId: 'breath-buteyko',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the inherited belief that money is hard to keep — that it always leaves',
        emergedSelf: 'the version of you whose bank balance grows month over month and does not flicker downward',
      },
      journalPrompt: 'Three places money currently leaves me. What if it did not?',
    },
    {
      day: 10,
      phase: 'dissolve',
      chakraId: 'sacral',
      title: 'Day 10 · Belief Three — "Charging more is greedy"',
      intent: 'Watch your work create a transformation. Watch the receiver pay. Both are equal. Neither is greed.',
      affirmation: 'I receive what my work generates. The exchange is clean.',
      breathworkId: 'breath-buteyko',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the moral story that charging your real worth makes you greedy',
        emergedSelf: 'the version of you who quotes a price ten times what the old you quoted — and her voice does not waver',
      },
      journalPrompt: 'What is the price I would charge if no one I love could see it? Charge that.',
    },
    {
      day: 11,
      phase: 'dissolve',
      chakraId: 'sacral',
      title: 'Day 11 · The Compound Dissolve',
      intent: 'Stack all three beliefs in one image. Watch the water take them all.',
      affirmation: 'I have nothing in me that argues against my wealth.',
      breathworkId: 'breath-buteyko',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the compound armor of every belief that has been arguing against your wealth',
        emergedSelf: 'the version of you who is internally quiet around money — nothing inside her argues back',
      },
      journalPrompt: 'What did dissolving feel like in the body? Pain? Lightness? Both?',
    },
    {
      day: 12,
      phase: 'dissolve',
      chakraId: 'sacral',
      title: 'Day 12 · The Forgiveness Pass',
      intent: 'Forgive every past version of you who made the decision from fear. Each one. By name.',
      affirmation: 'I forgive every version of me who survived this.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the unforgiveness you have been carrying toward every past version of you who undercharged',
        emergedSelf: 'the version of you who thanks every former version — the ones who survived, who got you here',
      },
      journalPrompt: 'List five financial decisions you regret. Forgive each one specifically.',
    },
    {
      day: 13,
      phase: 'dissolve',
      chakraId: 'sacral',
      title: 'Day 13 · The Lineage Release',
      intent: 'The pattern is older than you. Hand it back to the generation it began with. Politely.',
      affirmation: 'I love them and I will not carry this further.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the inherited financial fear of every generation before you',
        emergedSelf: 'the version of you who is the one in her bloodline who breaks the pattern — without resentment toward those who could not',
      },
      journalPrompt: 'Which ancestor first learned to fear money? Picture them. Tell them you have it from here.',
    },
    {
      day: 14,
      phase: 'dissolve',
      chakraId: 'sacral',
      title: 'Day 14 · The Empty Page',
      intent: 'Theta plus silence. The old code is no longer running. Let yourself be in the gap.',
      affirmation: 'I am between identities. I do not fill the silence yet.',
      breathworkId: 'breath-grounding',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the urgency to know who you are next, immediately',
        emergedSelf: 'the version of you who is at peace not knowing yet — the next shape arrives on its own',
      },
      journalPrompt: 'Today, write nothing. Sit with what is not there.',
    },

    // ─────────── WEEK 3 — INSTALL (Days 15-21) ───────────
    {
      day: 15,
      phase: 'install',
      chakraId: 'solar-plexus',
      title: 'Day 15 · Meet the 7-Figure You',
      intent: 'She is not a fantasy. She is twelve months from now. Look at her clothes, posture, calm.',
      affirmation: 'She is real. She is close. I am becoming her.',
      breathworkId: 'breath-aham-prakasha',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the distance you have been imagining between you and her',
        emergedSelf: 'the version of you twelve months from now — calmer, clearer, already lived in',
      },
      journalPrompt: 'Describe her in 15 specifics — what she wears at 6:47am, who she is texting, what her bank balance reads.',
    },
    {
      day: 16,
      phase: 'install',
      chakraId: 'solar-plexus',
      title: 'Day 16 · Her Calendar',
      intent: 'Watch her open Monday. What is on it? What is not on it? Notice the white space.',
      affirmation: 'My calendar already reflects the income I am calling in.',
      breathworkId: 'breath-aham-prakasha',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the belief that you have to keep your calendar full to be valuable',
        emergedSelf: 'the version of you whose Monday has three deep-work blocks, two appointments, and the rest is empty on purpose',
      },
      journalPrompt: 'What is on my current calendar that she would delete in 30 seconds? Delete those.',
    },
    {
      day: 17,
      phase: 'install',
      chakraId: 'solar-plexus',
      title: 'Day 17 · Her Pricing',
      intent: 'Hear her quote the price. Hear the steadiness in her voice. The non-apology.',
      affirmation: 'My price is my price. I do not soften it.',
      breathworkId: 'breath-aham-prakasha',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the habit of justifying your price before they have asked',
        emergedSelf: 'the version of you who names the number, then stops talking, and lets the silence belong to the client',
      },
      journalPrompt: 'Re-write the price of your top three offers in her voice.',
    },
    {
      day: 18,
      phase: 'install',
      chakraId: 'solar-plexus',
      title: 'Day 18 · Her Body',
      intent: 'How does she breathe? How does she sit? Install her nervous system, not just her thoughts.',
      affirmation: 'I carry her regulation in my body now.',
      breathworkId: 'breath-aham-prakasha',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the belief that stress is the price of growth',
        emergedSelf: 'the version of you whose shoulders are low, whose jaw is loose, whose breath reaches the bottom of her belly without effort',
      },
      journalPrompt: 'Three times tomorrow, breathe the way she breathes. Note the difference.',
    },
    {
      day: 19,
      phase: 'install',
      chakraId: 'solar-plexus',
      title: 'Day 19 · Her Decisions',
      intent: 'Watch her receive a no. Watch her receive a yes. Same nervous system either way.',
      affirmation: 'I am no longer dependent on the outcome.',
      breathworkId: 'breath-aham-prakasha',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the equation that a no means you are not enough',
        emergedSelf: 'the version of you who receives a no, thanks them, closes the email, and moves on within sixty seconds — no story attached',
      },
      journalPrompt: 'The next decision in front of me — what would she choose? Choose that.',
    },
    {
      day: 20,
      phase: 'install',
      chakraId: 'solar-plexus',
      title: 'Day 20 · Her Relationships',
      intent: 'She is no longer in rooms that require her to dim. Who is in her circle?',
      affirmation: 'I belong in the room I have been waiting outside of.',
      breathworkId: 'breath-aham-prakasha',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the fear that if you grow, you will be alone',
        emergedSelf: 'the version of you who is at dinner with three people who all earn more than her — and they treat her as a peer, and she is at home',
      },
      journalPrompt: 'Who is in your current circle who would have to leave for her income to land? Be honest.',
    },
    {
      day: 21,
      phase: 'install',
      chakraId: 'solar-plexus',
      title: 'Day 21 · The Anchor',
      intent: 'Pick one physical gesture that becomes her. Anchor it in theta.',
      affirmation: 'This gesture returns me to her instantly.',
      breathworkId: 'breath-aham-prakasha',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the fear that you will lose her between sessions',
        emergedSelf: 'the version of you who presses thumb to forefinger and her entire nervous system shifts in one second — she has rehearsed this thousands of times',
      },
      journalPrompt: 'Practice the anchor 10 times today. Each time, name aloud one specific from her life.',
    },

    // ─────────── WEEK 4 — ACTIVATE (Days 22-28) ───────────
    {
      day: 22,
      phase: 'activate',
      chakraId: 'third-eye',
      title: 'Day 22 · The Visible Ask',
      intent: 'Rehearse making one specific income-generating ask. Feel her steadiness saying it.',
      affirmation: 'I am asking from full.',
      breathworkId: 'breath-activation',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the belief that asking is risking',
        emergedSelf: 'the version of you who sends the email before noon — once, clean, without eleven rounds of editing',
      },
      journalPrompt: 'Send the email, make the call, quote the price. Today. Before noon.',
    },
    {
      day: 23,
      phase: 'activate',
      chakraId: 'third-eye',
      title: 'Day 23 · The Raise',
      intent: 'She does not earn what she did last year. Pick one current price and raise it.',
      affirmation: 'I have raised the floor.',
      breathworkId: 'breath-activation',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the wait — the belief that you should hold the price until the next offer',
        emergedSelf: 'the version of you who updates the price on her website at 9:14am and accepts the next inquiry at the new price four minutes later',
      },
      journalPrompt: "Raise one offer's price by at least 30 percent on the website today.",
    },
    {
      day: 24,
      phase: 'activate',
      chakraId: 'third-eye',
      title: 'Day 24 · The Removal',
      intent: 'She is not in five conversations she does not need. Remove yourself from one.',
      affirmation: 'My energy is finite. I direct it.',
      breathworkId: 'breath-activation',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the belief that you owe everyone an explanation',
        emergedSelf: 'the version of you who ends one ongoing low-return conversation cleanly — without over-explaining, without apologising',
      },
      journalPrompt: 'End one ongoing low-return conversation today. Cleanly. Without explanation.',
    },
    {
      day: 25,
      phase: 'activate',
      chakraId: 'third-eye',
      title: 'Day 25 · The Receive',
      intent: 'Practice receiving one thing today without deflection. Money, praise, help, time.',
      affirmation: 'Thank you. Full stop. No qualifier.',
      breathworkId: 'breath-activation',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the urgency to give back immediately so you are not in debt',
        emergedSelf: 'the version of you who receives something good, says only thank you, lets it land, and does not return it the same day',
      },
      journalPrompt: 'When the thing arrives today, say only those two words. Thank you.',
    },
    {
      day: 26,
      phase: 'activate',
      chakraId: 'third-eye',
      title: 'Day 26 · The Visibility',
      intent: 'She does not hide her offer. She does not bury it in personality.',
      affirmation: 'I am visible because I am needed.',
      breathworkId: 'breath-activation',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the discomfort that makes you hint at what you sell instead of stating it',
        emergedSelf: 'the version of you who posts one piece of content directly stating what she sells, at what price, to whom — and then closes the app',
      },
      journalPrompt: 'Post one piece of content directly stating what you sell, at what price, and to whom.',
    },
    {
      day: 27,
      phase: 'activate',
      chakraId: 'third-eye',
      title: 'Day 27 · The Investment',
      intent: 'She invests in the next level before she has the proof.',
      affirmation: 'I move before the evidence arrives.',
      breathworkId: 'breath-activation',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the rule that you only invest once the money has come in',
        emergedSelf: 'the version of you who makes the investment first — and the money arrives in response, not in advance',
      },
      journalPrompt: 'Make one investment today — coach, tool, room, time — that the old you would have waited on.',
    },
    {
      day: 28,
      phase: 'activate',
      chakraId: 'third-eye',
      title: 'Day 28 · The Threshold',
      intent: 'Full session at full depth. The 28-day arc lands. The new identity is the operating system.',
      affirmation: 'She is here. I am her. The threshold is crossed.',
      breathworkId: 'breath-activation',
      practice: {
        kind: 'hypnotherapy',
        armor: 'the requirement to keep proving this to yourself forever',
        emergedSelf: 'the version of you who has crossed the threshold — the work continues, but the door behind her is closed, and she does not look back at it',
      },
      journalPrompt: 'Write a letter to the version of you who started Day 1. Tell her what changed.',
    },
  ],
};
