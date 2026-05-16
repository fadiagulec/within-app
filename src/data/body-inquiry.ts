/**
 * Within — Body Inquiry.
 *
 * A 7-step healing practice for hearing what the body is saying. Inspired
 * by the depth psychology framework Michael J. Lincoln developed (the body
 * as carrier of unfinished emotional and relational material), but written
 * entirely in the Within voice. Original content.
 *
 * Different from Body Wisdom:
 *   - Body Wisdom = the LOOKUP layer. 50 symptoms → psychological reading,
 *     chakra, affirmation. Use when you want a quick interpretation.
 *   - Body Inquiry = the PRACTICE layer. 7 sequential steps that take you
 *     into the symptom and out the other side. Use when one symptom keeps
 *     repeating and you want to actually work with it.
 *
 * Total practice: ~22 minutes. Designed to be done seated or lying down,
 * eyes closed, ideally somewhere private.
 */

export interface InquiryStep {
  number: number;
  title: string;
  durationMin: number;
  /** One-line intent for this step. */
  intent: string;
  /** The script the user follows. Plain prose, ~2-4 sentences per. */
  instructions: string[];
  /** Optional prompts to ask yourself / the body. */
  prompts?: string[];
  /** Why this step matters. Sharp, no fluff. */
  why: string;
  /** Accent color (loosely chakra-aligned by step). */
  accent: string;
}

export const BODY_INQUIRY_OVERVIEW = {
  title: 'Body Inquiry',
  tagline: 'Hear what your body is saying. Heal what it has been carrying.',
  intent:
    'Your body holds what your mind has been too busy, too polite, or too afraid to feel. A symptom that keeps returning is not a malfunction — it is a message that has not yet been received. This practice teaches you to receive it.',
  durationMin: 22,
  whenToUse:
    'Use when one body symptom keeps repeating — same headache, same shoulder, same gut, same insomnia — and you want to stop just managing it and start listening. Set aside 25 minutes. Somewhere private.',
  whatYouNeed:
    'A quiet space. Optional: a journal, a hand to rest on the symptom, soft music or silence.',
};

export const BODY_INQUIRY_STEPS: InquiryStep[] = [
  {
    number: 1,
    title: 'Land in the body',
    durationMin: 2,
    intent: 'Arrive. Become the body, not the head about the body.',
    instructions: [
      'Sit or lie down where you will not be interrupted. Close your eyes.',
      'Take three slow breaths. Each exhale longer than the inhale.',
      'Scan slowly from feet to crown. Notice where the body is loudest — pain, tension, tightness, numbness, heaviness, an ache you have stopped naming.',
      'Choose one place. Not necessarily the most dramatic — the one that feels alive with curiosity right now.',
    ],
    why: 'The mind cannot heal what the mind is hovering above. You have to actually arrive in the tissue.',
    accent: '#6B1F1F',
  },
  {
    number: 2,
    title: 'Get specific',
    durationMin: 3,
    intent: 'Detail is the door. The body speaks in detail.',
    instructions: [
      'Bring full attention to the place you chose. Describe it to yourself as if you had to draw it.',
      'Left or right? Surface or deep? Joint or muscle or organ?',
      'Quality: sharp, dull, hot, cold, heavy, hollow, electric, pressing, throbbing.',
      'Duration: a moment, a day, a week, a year, longer than you can remember.',
      'Notice if a position, posture, or movement changes it.',
    ],
    prompts: [
      'Where exactly?',
      'What does it feel like?',
      'How long has it been here?',
      'When is it loudest?',
    ],
    why: 'Vague attention gets vague answers. Specific attention gets specific answers. The body has been waiting for someone to actually look.',
    accent: '#C2712C',
  },
  {
    number: 3,
    title: 'Open the conversation',
    durationMin: 4,
    intent: 'Address the body part directly. Wait for what arrives.',
    instructions: [
      'If you can reach it, place a hand on the spot. If not, send breath there.',
      'Ask, in your own words: What are you carrying for me?',
      'Wait. Do not answer for it. Do not narrate. Just listen.',
      'What arrives may be an image, a feeling, a word, a memory, a younger version of yourself, a scene. It may be very faint. Stay with what comes.',
      'If nothing arrives, ask again, softer: What do you want me to know?',
    ],
    prompts: [
      'What are you carrying for me?',
      'What do you want me to know?',
      'Whose grief are you holding?',
    ],
    why: 'The body has been speaking the whole time. This is the moment you stop talking over it.',
    accent: '#D9B24C',
  },
  {
    number: 4,
    title: 'Trace it to its origin',
    durationMin: 5,
    intent: 'Find the room where this started.',
    instructions: [
      'With the spot still in your awareness, ask: When did you first start carrying this?',
      'Trust the age that comes — even if it surprises you. Even if you do not remember the scene clearly. The body remembers.',
      'Picture the younger you. Where are they? Who is around them? What is happening, or has just happened?',
      'What did that younger you need in that moment that they did not get? What were they not allowed to say, do, or feel?',
      'This is not analysis. It is recognition. Just see what is there.',
    ],
    prompts: [
      'How old were you?',
      'Who was in the room?',
      'What did you need that you did not get?',
      'What were you not allowed to feel?',
    ],
    why: 'Symptoms have origin stories. The body is not random. The pattern got installed somewhere, by someone, in some moment. Finding it is half the healing.',
    accent: '#3F8A5F',
  },
  {
    number: 5,
    title: 'Grieve what was not given',
    durationMin: 4,
    intent: 'Let the original feeling finally move.',
    instructions: [
      'Stay with the younger you. Do not rush past them.',
      'The body is not asking for analysis. It is asking for witness. So witness.',
      'Let what wants to move, move. Tears, anger, exhaustion, shaking, a sigh from somewhere very deep. Whatever it is, do not stop it.',
      'Say to the younger you, out loud or inside: I see what you needed. I see what you did not get. I am here now.',
      'This step alone can shift the symptom. Many people feel the body soften right here.',
    ],
    prompts: [
      'What is asking to be felt that was never allowed?',
      'What does the younger you need to hear right now?',
    ],
    why: 'Grief that was not allowed to move when it was happening lives in the body until it does. Letting it move now is what releases the holding pattern.',
    accent: '#3E6A8C',
  },
  {
    number: 6,
    title: 'Offer the missing thing',
    durationMin: 3,
    intent: 'Self-parent the wound.',
    instructions: [
      'Ask the younger you: What would have helped, then?',
      'Then offer it from the adult you, now. Words, touch, permission, protection, a promise. Whatever they answer.',
      'Speak it out loud if you can. Whisper if you cannot. The voice matters — the body recognises it.',
      'Examples, only as a primer — let yours arrive: You are safe with me. You do not have to carry this alone. It was never yours to fix. You are allowed to need what you need. I will not leave you.',
      'Stay until the younger you is settled.',
    ],
    prompts: [
      'What would have helped, then?',
      'What do they need to hear from you, now?',
    ],
    why: 'The original adult did not give it. You can. The brain does not distinguish between the original soothing and the soothing you offer to your own inner child decades later. The repair is real.',
    accent: '#3B3564',
  },
  {
    number: 7,
    title: 'Install + close',
    durationMin: 1,
    intent: 'Mark the shift. Thank the body. Promise to keep listening.',
    instructions: [
      'Take three slow breaths into the original body spot. Notice if anything has changed — softer, warmer, quieter, different.',
      'Choose one short sentence to install, in present tense, as a fact. Either pick from the primer below or let yours arrive.',
      'Speak it out loud, three times. Let it land.',
      'Place both hands gently on the spot. Thank the body for the message. Make one specific promise to keep listening — daily check-in, no more dismissing, no more numbing it away. Mean it.',
    ],
    prompts: [
      'My body is on my side.',
      'I am safe to feel.',
      'I trust what my body knows.',
      'I am no longer carrying what was not mine.',
      'I am here for myself, now.',
    ],
    why: 'The body needs the new line installed in the present, as a fact, in your own voice. Without this step, the inquiry stays in the past. With it, the new pattern begins to wire in.',
    accent: '#8A7AA8',
  },
];

export const BODY_INQUIRY_AFTER = [
  'The symptom may shift immediately. It may not. Neither is the right answer.',
  'Sometimes the body releases in the inquiry. Sometimes it releases hours later. Sometimes it needs the practice repeated several times before the holding pattern fully lets go.',
  'If the same symptom returns, the body has more to say. Run the inquiry again from Step 1 — it may take you somewhere different.',
  'If a strong feeling came up and is still here, journal what you remember. Or call someone safe. Do not bury it.',
];

export const BODY_INQUIRY_REMINDERS = [
  'You are not breaking anything by asking the body to speak. You are returning to a conversation that has been one-sided for a long time.',
  'Trust whatever arrives. The first impression is almost always the real one.',
  'If nothing arrives, that itself is information. The body sometimes goes quiet because it has been talked over so much it no longer believes you are listening. Show up again tomorrow. It will come.',
  'This is emotional work, not medical. If a physical symptom is severe or new, see a doctor first.',
];

export const BODY_INQUIRY_CLOSING =
  'The body has always been on your side. It just stopped trusting that you were on its. Today you start rebuilding that trust.';

export function getInquiryDurationMin(): number {
  return BODY_INQUIRY_STEPS.reduce((sum, s) => sum + s.durationMin, 0);
}
