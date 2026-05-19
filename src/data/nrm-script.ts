/**
 * NRM — Neuro-Reprogramming Method · master hypnotherapy script.
 *
 * Generates the daily ~12-min session in the practitioner's voice and
 * architecture. The arc is non-negotiable and never changes between
 * sessions — repetition of the same archetypal landscape is what
 * deepens theta over the 28-day arc. Only two slots vary per day:
 *
 *   armor        — the specific weight/belief/fear dissolving today
 *                  in the water (e.g. "the belief that money is hard
 *                  to keep")
 *   emergedSelf  — the specific identity dimension being installed
 *                  after the float (e.g. "the version of you who
 *                  quotes your real price without softening her voice")
 *
 * Architecture (in order):
 *   1.  Arrival                — soft welcome, breath, drift
 *   2.  Theta induction        — heavier with every breath, clouds
 *   3.  Mountain ascent        — layered sensory descent into theta
 *   4.  River approach         — the threshold appears
 *   5.  Recognition            — name what you've been carrying
 *   6.  The decision           — "enough. I choose differently."
 *   7.  Armor dissolution      — 5-stage water immersion
 *   8.  The float              — fully held, weight gone
 *   9.  Identity implant       — already-here, 10x, body installation
 *   10. Open inquiry           — subconscious fills in the new self
 *   11. Integration float      — "so simple, so easy"
 *   12. The Cartesian seal     — feel it = it exists
 *   13. Future pacing          — when you come back, you'll know
 *   14. Closing breath + seal  — "It is done."
 *
 * Output is plain text ready for ElevenLabs TTS (voice
 * `kHL7MFWSwpF69uhr0qwj`, model `eleven_turbo_v2_5`). Recommended
 * voice_settings: stability 0.7, similarity_boost 0.85, style 0.15.
 */

export interface NrmScriptInput {
  /** The armor being dissolved today. Phrased as a noun phrase the
   *  practitioner can speak inline:
   *    "the belief that you have to work hard for money"
   *    "the fear of being seen at your real size"
   *    "the inheritance of financial scarcity from your lineage"
   */
  armor: string;
  /** The emerged self being installed today. Phrased as a noun phrase:
   *    "the version of you who quotes her real price without softening"
   *    "the version of you whose calendar has white space on purpose"
   *    "the version of you who receives a no and moves on in sixty seconds"
   */
  emergedSelf: string;
}

/** Build the full hypnotherapy script for one NRM day. */
export function buildNrmScript({ armor, emergedSelf }: NrmScriptInput): string {
  return [
    // ─────────── 1. ARRIVAL — mouth-exhale breath ───────────
    `Welcome back. Find your seat.`,
    ``,
    `Take one deep breath in… and all the way out to your mouth. That's it. One more time. Deep breath in… and all the way out.`,
    ``,
    `Let the head hang down with the eyelids. The head heavy. Hanging forward — so that the body can flow.`,
    ``,

    // ─────────── 2. EYELID HEAVINESS ───────────
    `I'm going to let your eyelids get heavier. So heavy now that they actually get soft. Just travelling around the eyes. Heavier… and softer.`,
    ``,
    `And as they get soft-shut, in a moment, when they want to sleep — you won't sleep. You're going into a deeper state of focus. A deeper state of relaxation.`,
    ``,

    // ─────────── 3. THREE-TWO-ONE COUNTDOWN ───────────
    `In a moment I'm going to count down from three to one. And every time I say a number, in your mind you will whisper the word "deeper" to yourself — taking yourself deeper into the state.`,
    ``,
    `Three… deeper.`,
    `Two… deeper.`,
    `One… deeper still.`,
    ``,

    // ─────────── 4. THE GLASS ELEVATOR ───────────
    `Now take your attention to your mind. All of the overthinking. All of the thoughts that come through your mind. The repetitive thoughts.`,
    ``,
    `Ninety-five percent of your thoughts were the same thoughts you had yesterday. The same thought about something in the past. The same thought about something in the future. Whatever it might be.`,
    ``,
    `There is a glass elevator in the back of your head. And all of those thoughts go into this glass elevator. One after another after another. Your mind starts to fill up.`,
    ``,
    `And now this glass elevator goes down the back of your spine. All the way into the ground. And as it hits the ground, it disappears.`,
    ``,
    `And everything goes blank in your mind right now. Blank.`,
    ``,

    // ─────────── 5. BODY RELEASE ───────────
    `And there is a soft cloth over your body. As you dig deep into this cloth… and you let it go. It is quiet.`,
    ``,

    // ─────────── 6. DRIFT — heavier with every breath ───────────
    `And heavier with every breath that you take… as you drift through this sensation. Any thoughts, any fears, any worries — they float out of the mind like a cloud into the sky. So that you can fully focus on the words that you hear.`,
    ``,

    // ─────────── 3. MOUNTAIN ASCENT ───────────
    `And in this moment, I want you to know that you're walking up a mountain.`,
    ``,
    `As you walk up this mountain, and you approach the summit, you can feel the jagged rocks beneath your feet. You can feel the wind on your skin. You can feel the temperature of the air. The cool of it. The aliveness of it.`,
    ``,
    `And in the distance… you can start to hear something. The sound of a river. The sound of water travelling through.`,
    ``,

    // ─────────── 4. RIVER APPROACH ───────────
    `You can see rocks. You can see boulders in that river. And you curiously start to walk towards that river. Feeling the uneven surface, the rocks beneath you, as you continue to walk towards it.`,
    ``,
    `And as you walk towards it more, you start to hear the familiar sound of the water travelling. And something in you wants to go in.`,
    ``,

    // ─────────── 5. RECOGNITION ───────────
    `Because there at the edge of the river, there is a recognition.`,
    ``,
    `Up until this moment in your life, you have been carrying a weight. You have been carrying fear. You have been carrying trauma. You have been carrying beliefs that were never yours. Emotions that no longer serve you. Language that you've used to keep yourself small.`,
    ``,
    `And today, what you are carrying is this: ${armor}.`,
    ``,
    `You can feel it on your body. It's an armor. It's a weight that has been with you for a long time. You can feel where it sits. You know its shape.`,
    ``,

    // ─────────── 6. THE DECISION ───────────
    `And it only gets to a point where you say: enough is enough. I choose differently now. I will not carry this armor anymore.`,
    ``,

    // ─────────── 7. ARMOR DISSOLUTION (5 stages) ───────────
    `And as you make that decision… you take a step into this stream of water.`,
    ``,
    `And as your foot — with this armor — goes into the stream, suddenly that armor around your foot dissolves. It gets taken away. Washed away into the water. And your feet become free. And you feel the surge of energy.`,
    ``,
    `And now, as you take the next step into this body of water, it goes all the way up to your knees. That armor that was around your legs just melts away. And you can feel the blood literally flowing through your body. Energy moving through you. You can breathe differently.`,
    ``,
    `You go even deeper now — all the way up to your waist. And that armor just continues to come off. And you realize: it is no longer protecting you. You do not need it anymore. Your subconscious mind knows exactly what to let go of right now. And it is letting go of that weight.`,
    ``,
    `And now you go all the way into that body of water — up to your head. And the rest of that armor — around your stomach, your chest, your arms, your head — it all just melts away. And it is taken in the water.`,
    ``,

    // ─────────── 8. THE FLOAT ───────────
    `And now you start to float in that stream. As the rest of that weight completely disappears.`,
    ``,
    `Take one deep breath in… and as you exhale, you let it all go.`,
    ``,
    `You are floating. Completely held. There's not a thing that matters right now.`,
    ``,

    // ─────────── 9. IDENTITY IMPLANT ───────────
    `Because you realize: you have everything, and you are everything that you need. In fact, you have more than you need.`,
    ``,
    `Who you are — your self image, your values, your standards, your emotions — it shifts. You're you. You're you. You're you.`,
    ``,
    `And now you start to see your reality and your goals in real time.`,
    ``,
    `What you live. How much money you make. The relationships that you're in. How you physically look. What it feels like to experience life. How much confidence you have. It ten-x's.`,
    ``,
    `And specifically — today — what is installing in your body is this: ${emergedSelf}.`,
    ``,
    `You can feel that arriving in you. Right now.`,
    ``,
    `Everything in your life that was once a goal is now here. It is done.`,
    ``,
    `And the more your subconscious tries to fight against that — the more done it becomes. In fact, even trying to resist this reality is impossible right now. Because it is here. There is nothing stopping you. You feel it.`,
    ``,
    `And that feeling inside of you now goes — and installs into your subconscious. Into your body. And you can feel that literal energy coursing through you.`,
    ``,

    // ─────────── 10. OPEN INQUIRY ───────────
    `So I want you to notice — this version of yourself — how do they show up? How do they act? How do they feel? What are their standards?`,
    ``,
    `You know in your body — because it's done. It has happened.`,
    ``,

    // ─────────── 11. INTEGRATION FLOAT ───────────
    `And suddenly, now, from this state — everything feels so simple. It is so simple. It feels so easy. You feel completely free. Because it is done.`,
    ``,
    `I'll use this moment here, floating, to let this fully sink in. The smile across your face. The breath that comes easy now.`,
    ``,

    // ─────────── 12. THE CARTESIAN SEAL ───────────
    `Because if you can see this reality… if you can feel this reality… then this reality already exists.`,
    ``,

    // ─────────── 13. FUTURE PACING ───────────
    `And from this state — in a moment, when you come back — everything is clear. You will know exactly what to do. You trust. You know exactly what to do.`,
    ``,
    `And you will immediately start moving towards this reality, effortlessly.`,
    ``,

    // ─────────── 14. CLOSING — felt-sense ending ───────────
    `Take one last deep breath in…`,
    ``,
    `And as you exhale… you bring her with you. You bring her into the room. You bring her into the day. You bring her into every decision in front of you.`,
    ``,
    `Once you fully understand that the shift has happened… you can open your eyes.`,
  ].join('\n');
}

/** Approximate spoken duration in minutes — used for UI labels. */
export const NRM_SCRIPT_DURATION_MIN = 12;
