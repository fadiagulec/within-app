/**
 * Within — Body Wisdom.
 *
 * Each physical symptom holds a psychological / relational message.
 * This file synthesizes the depth of Michael J. Lincoln's "Messages from
 * the Body" (the deeper psychological + childhood-relational reading)
 * with the practical mechanic of Louise Hay's "Heal Your Body" (a single
 * grounding affirmation), rewritten in the Within voice.
 *
 * All content is original. Both source books remain copyrighted and
 * untouched — we are inspired by the frameworks, not reproducing them.
 *
 * IMPORTANT — Medical safety: the readings here are for emotional
 * exploration only. See a doctor for any physical symptom. This is not
 * diagnosis. The disclaimer is rendered on every Body Wisdom screen.
 *
 * Voice rule: sharp, plain English. Lead with the verb. No "sacred journey."
 */

import type { SpineChakraId } from './chakra-spine';

export type BodyRegion =
  | 'head'
  | 'eyes'
  | 'ears'
  | 'mouth-jaw'
  | 'throat'
  | 'neck-shoulders'
  | 'chest-heart'
  | 'lungs'
  | 'stomach-digestive'
  | 'lower-back'
  | 'upper-back'
  | 'hips-pelvis'
  | 'knees-legs-feet'
  | 'skin'
  | 'general';

export interface BodyRegionMeta {
  id: BodyRegion;
  label: string;
  /** Visual order — head down to feet. */
  order: number;
  /** Hex accent color used in cards. */
  color: string;
}

export const BODY_REGIONS: BodyRegionMeta[] = [
  { id: 'head', label: 'Head & Mind', order: 1, color: '#9B5BA1' },
  { id: 'eyes', label: 'Eyes', order: 2, color: '#5645A6' },
  { id: 'ears', label: 'Ears', order: 3, color: '#5645A6' },
  { id: 'mouth-jaw', label: 'Mouth & Jaw', order: 4, color: '#3D9DC4' },
  { id: 'throat', label: 'Throat & Voice', order: 5, color: '#3D9DC4' },
  { id: 'neck-shoulders', label: 'Neck & Shoulders', order: 6, color: '#3D9DC4' },
  { id: 'chest-heart', label: 'Chest & Heart', order: 7, color: '#3F8A5F' },
  { id: 'lungs', label: 'Lungs & Breath', order: 8, color: '#3F8A5F' },
  { id: 'stomach-digestive', label: 'Stomach & Digestion', order: 9, color: '#E8B83E' },
  { id: 'upper-back', label: 'Upper Back', order: 10, color: '#3F8A5F' },
  { id: 'lower-back', label: 'Lower Back', order: 11, color: '#6B1F1F' },
  { id: 'hips-pelvis', label: 'Hips & Pelvis', order: 12, color: '#E07A2C' },
  { id: 'knees-legs-feet', label: 'Knees, Legs & Feet', order: 13, color: '#6B1F1F' },
  { id: 'skin', label: 'Skin', order: 14, color: '#E07A2C' },
  { id: 'general', label: 'Whole Body', order: 15, color: '#C9A07A' },
];

export interface BodyWisdomEntry {
  id: string;
  symptom: string;
  bodyRegion: BodyRegion;
  /** 2-3 sentence Lincoln-depth psychological reading in Within voice. */
  reading: string;
  /** Hay-mechanic affirmation — short, "I" or "I am". */
  affirmation: string;
  /** Primary chakra the symptom maps to. */
  chakraId: SpineChakraId;
  /** Optional recommended breathwork id (from src/data/breathwork.ts). */
  recommendedBreathId?: string;
  /** A single sharp journal prompt — 1 line. */
  journalPrompt: string;
}

// =============================================================
// THE 50 ENTRIES
// =============================================================

export const BODY_WISDOM: BodyWisdomEntry[] = [
  // ─── HEAD & MIND ──────────────────────────────────────────
  {
    id: 'headache',
    symptom: 'Headaches (tension type)',
    bodyRegion: 'head',
    reading:
      "Tension headaches hold the weight of self-criticism — the head working overtime to control, manage, and not-be-wrong. Often appear in people who carry the role of \"the responsible one\" since childhood and cannot put the responsibility down.",
    affirmation: 'I am allowed to not have the answer right now.',
    chakraId: 'crown',
    recommendedBreathId: 'breath-4-7-8',
    journalPrompt: 'What am I trying to figure out that does not actually need to be solved today?',
  },
  {
    id: 'migraine',
    symptom: 'Migraines',
    bodyRegion: 'head',
    reading:
      "Migraines often arrive when the system has finally said no to something the person kept agreeing to. Suppressed creative energy, suppressed sexual energy, and suppressed anger all show up here. The pain is a stop-sign the mind would not give.",
    affirmation: 'I let my body lead. I follow its no.',
    chakraId: 'third-eye',
    recommendedBreathId: 'breath-grounding',
    journalPrompt: 'What have I been forcing myself to do that my body is refusing?',
  },
  {
    id: 'brain-fog',
    symptom: 'Brain fog / mental cloudiness',
    bodyRegion: 'head',
    reading:
      'Brain fog protects you from feeling something the mind cannot quite hold yet. It blurs everything so you do not have to see one specific thing clearly. Often shows up after major change, loss, or chronic overgiving.',
    affirmation: 'I do not need to see all of it at once.',
    chakraId: 'third-eye',
    recommendedBreathId: 'breath-alternate-nostril',
    journalPrompt: 'What feeling am I blurring to avoid?',
  },
  {
    id: 'insomnia',
    symptom: 'Insomnia / can\'t sleep',
    bodyRegion: 'head',
    reading:
      "Insomnia is hyper-vigilance — the body refuses to drop guard because somewhere it has decided rest is unsafe. Common in people who learned young that they had to stay alert in their own home.",
    affirmation: 'It is safe for me to fall.',
    chakraId: 'crown',
    recommendedBreathId: 'breath-4-7-8',
    journalPrompt: 'When did I first learn that being asleep was unsafe?',
  },
  {
    id: 'hair-loss',
    symptom: 'Hair loss / thinning',
    bodyRegion: 'head',
    reading:
      'Hair holds vitality and self-image. Loss often follows a period of holding things too tightly — finances, control, identity — until the system gives the grip up at the body level.',
    affirmation: 'I loosen my hold. What is mine will stay.',
    chakraId: 'crown',
    journalPrompt: 'Where am I clenching that I could release?',
  },

  // ─── EYES ────────────────────────────────────────────────
  {
    id: 'vision-issues',
    symptom: 'Vision issues / blurred sight',
    bodyRegion: 'eyes',
    reading:
      "The eyes refuse to see what the mind is not ready to accept. Worsening vision often correlates with a phase of refusing to look directly at something true — about a relationship, a parent, a self-deception.",
    affirmation: 'I am ready to see what I have been avoiding.',
    chakraId: 'third-eye',
    journalPrompt: 'What am I refusing to look at clearly?',
  },
  {
    id: 'eye-strain',
    symptom: 'Eye strain / tired eyes',
    bodyRegion: 'eyes',
    reading:
      "Tired eyes are usually doing the work the heart should be doing — looking, scanning, processing, instead of feeling. Often appears in people who relate to the world primarily through analysis.",
    affirmation: 'I let my heart see for a while.',
    chakraId: 'third-eye',
    journalPrompt: 'Where have I been thinking when I could have been feeling?',
  },
  {
    id: 'floaters',
    symptom: 'Eye floaters',
    bodyRegion: 'eyes',
    reading:
      'Floaters often correspond to thoughts that pass across awareness but cannot quite be caught — recurring intrusive patterns the mind keeps generating but never resolves.',
    affirmation: 'I let my thoughts pass without grabbing them.',
    chakraId: 'third-eye',
    journalPrompt: 'What thought keeps showing up that I have not addressed?',
  },

  // ─── EARS ────────────────────────────────────────────────
  {
    id: 'tinnitus',
    symptom: 'Tinnitus / ringing in ears',
    bodyRegion: 'ears',
    reading:
      "Tinnitus is often the body's way of saying \"I cannot listen to one more thing.\" Common in caretakers, healers, and people whose households were noisy with conflict they had no power to stop.",
    affirmation: 'I am allowed to not listen.',
    chakraId: 'throat',
    recommendedBreathId: 'breath-alternate-nostril',
    journalPrompt: 'Whose voice am I tired of hearing in my head?',
  },
  {
    id: 'ear-pain',
    symptom: 'Ear pain / inflammation',
    bodyRegion: 'ears',
    reading:
      'Ear pain often follows a period of being told things you did not want to hear, or having to listen to fights you could not leave. The inflammation is the body refusing the input.',
    affirmation: 'I choose what I let in.',
    chakraId: 'throat',
    journalPrompt: 'What have I been forced to listen to that I do not consent to?',
  },

  // ─── MOUTH & JAW ─────────────────────────────────────────
  {
    id: 'tmj',
    symptom: 'TMJ / jaw tension',
    bodyRegion: 'mouth-jaw',
    reading:
      'The jaw holds the words you swallowed. TMJ is the muscle of swallowing back, locked. Common in people who were taught early that speaking up brought punishment, mockery, or withdrawal of love.',
    affirmation: 'My voice is welcome here.',
    chakraId: 'throat',
    recommendedBreathId: 'breath-diaphragm',
    journalPrompt: 'What did I want to say in the last week that I bit back?',
  },
  {
    id: 'teeth-grinding',
    symptom: 'Teeth grinding (bruxism)',
    bodyRegion: 'mouth-jaw',
    reading:
      "Grinding at night is the body finishing arguments the daytime mind refused to have. The teeth are doing the chewing the spoken word never got to do.",
    affirmation: 'I have permission to argue out loud, awake.',
    chakraId: 'throat',
    journalPrompt: 'What conversation am I finishing in my sleep?',
  },
  {
    id: 'canker-sores',
    symptom: 'Canker sores / mouth ulcers',
    bodyRegion: 'mouth-jaw',
    reading:
      'Often follow words that were said and regretted — or words that were almost said and held back. The mouth processes the residue.',
    affirmation: 'I can speak with care. I can also forgive what I said.',
    chakraId: 'throat',
    journalPrompt: 'What words am I still chewing over?',
  },

  // ─── THROAT & VOICE ──────────────────────────────────────
  {
    id: 'sore-throat',
    symptom: 'Recurring sore throat',
    bodyRegion: 'throat',
    reading:
      "The throat inflames when you keep swallowing what wants to be said. Often shows up before or after a hard conversation that did not happen — or that happened wrong.",
    affirmation: 'I say the true thing, kindly. I do not have to perform it.',
    chakraId: 'throat',
    recommendedBreathId: 'breath-alternate-nostril',
    journalPrompt: 'Who needs to hear something from me that I have not said?',
  },
  {
    id: 'thyroid',
    symptom: 'Thyroid issues',
    bodyRegion: 'throat',
    reading:
      "The thyroid governs the rate at which you metabolise life. Imbalance often arrives in people who suppressed their voice over a long arc — particularly women who learned that being smaller, quieter, less, was the price of being loved.",
    affirmation: 'My size is mine. My voice is mine.',
    chakraId: 'throat',
    journalPrompt: 'In what room of my life have I made myself smaller than I am?',
  },
  {
    id: 'voice-loss',
    symptom: 'Voice loss / hoarseness',
    bodyRegion: 'throat',
    reading:
      "Sudden voice loss is the body taking the words away when the will to use them cannot. Often follows an argument the person did not feel safe in, or a public moment where they could not say their truth.",
    affirmation: 'My voice belongs to me. It will return.',
    chakraId: 'throat',
    journalPrompt: 'When did I last speak truth in a room and feel safe doing it?',
  },
  {
    id: 'swallowing',
    symptom: 'Difficulty swallowing',
    bodyRegion: 'throat',
    reading:
      'The throat refuses to take in what cannot be metabolised — a situation, a relationship, a piece of news. The mechanism asks the conscious mind to address what it has been forcing down.',
    affirmation: 'I am not obligated to swallow what is not mine.',
    chakraId: 'throat',
    journalPrompt: 'What am I trying to accept that the body is refusing?',
  },

  // ─── NECK & SHOULDERS ────────────────────────────────────
  {
    id: 'neck-stiffness',
    symptom: 'Neck stiffness',
    bodyRegion: 'neck-shoulders',
    reading:
      "The neck is the bridge between head and heart. Stiffness here often means the two are no longer in conversation — usually because the mind has decided to override what the heart already knows.",
    affirmation: 'I let my head and heart speak again.',
    chakraId: 'throat',
    recommendedBreathId: 'breath-grounding',
    journalPrompt: 'Where is my head saying yes while my heart says no?',
  },
  {
    id: 'shoulder-pain',
    symptom: 'Shoulder pain / tension',
    bodyRegion: 'neck-shoulders',
    reading:
      "Shoulders carry responsibility — usually responsibility that is not actually yours. Common in eldest children, caretakers, and partners who took on a role that nobody negotiated for them.",
    affirmation: 'I set down what was never mine to carry.',
    chakraId: 'heart',
    recommendedBreathId: 'breath-diaphragm',
    journalPrompt: 'Whose weight have I been carrying that I never agreed to?',
  },
  {
    id: 'frozen-shoulder',
    symptom: 'Frozen shoulder',
    bodyRegion: 'neck-shoulders',
    reading:
      "A frozen shoulder is grief or rage that cannot move forward. The arm refuses to extend toward what hurts. Common after loss, betrayal, or the end of a chapter the body has not yet metabolized.",
    affirmation: 'I let the movement come back slowly. I do not rush it.',
    chakraId: 'heart',
    journalPrompt: 'What am I refusing to reach for?',
  },
  {
    id: 'carrying-tension',
    symptom: 'Constant upper-body tension',
    bodyRegion: 'neck-shoulders',
    reading:
      "Holding yourself up against gravity all day is exhausting when nobody else is allowed to support you. The musculature gets stuck in vigilant-mode, ready for the next thing to hold up.",
    affirmation: 'I let the chair, the ground, the people hold me.',
    chakraId: 'heart',
    journalPrompt: 'Who in my life am I not letting support me?',
  },

  // ─── CHEST & HEART ───────────────────────────────────────
  {
    id: 'chest-tightness',
    symptom: 'Chest tightness',
    bodyRegion: 'chest-heart',
    reading:
      'A tight chest is grief, fear, or unexpressed love compressed into the smallest possible volume. The heart is asking for more room than the current life is giving it.',
    affirmation: 'I make more room. I can hold more than I think.',
    chakraId: 'heart',
    recommendedBreathId: 'breath-diaphragm',
    journalPrompt: 'What is asking for more space in my life right now?',
  },
  {
    id: 'palpitations',
    symptom: 'Heart palpitations',
    bodyRegion: 'chest-heart',
    reading:
      'Palpitations are often the body anticipating a moment of truth the mind keeps postponing. The heart speeds up because a decision is coming and the system knows it.',
    affirmation: 'I trust the timing of what is arriving.',
    chakraId: 'heart',
    recommendedBreathId: 'breath-4-7-8',
    journalPrompt: 'What decision is my heart already trying to make?',
  },
  {
    id: 'breast-tension',
    symptom: 'Breast tension or tenderness',
    bodyRegion: 'chest-heart',
    reading:
      "The breast tissue is the body's geography of giving. Tension here often arises in people who have been over-giving — to children, partners, work, parents — without equivalent receiving.",
    affirmation: 'I give from overflow. Receiving is the same as giving.',
    chakraId: 'heart',
    journalPrompt: 'Where am I giving more than I am receiving?',
  },
  {
    id: 'asthma',
    symptom: 'Asthma / restricted breathing',
    bodyRegion: 'chest-heart',
    reading:
      "Asthma narrows the air-line when the person feels they do not have the right to take up the room they need. The breath itself becomes the metaphor: am I allowed to inhale fully?",
    affirmation: 'I am allowed to take up the space I need.',
    chakraId: 'heart',
    recommendedBreathId: 'breath-diaphragm',
    journalPrompt: 'When did I learn it was unsafe to take a full breath?',
  },

  // ─── LUNGS & BREATH ──────────────────────────────────────
  {
    id: 'chronic-cough',
    symptom: 'Chronic cough',
    bodyRegion: 'lungs',
    reading:
      "A cough that will not leave is something the body needs to expel that the mind has not yet identified. Often grief that has been stored in the lungs and is asking, gently at first, to come out.",
    affirmation: 'I let it leave my body now.',
    chakraId: 'heart',
    recommendedBreathId: 'breath-fire',
    journalPrompt: 'What loss have I not fully grieved?',
  },
  {
    id: 'bronchitis',
    symptom: 'Recurring bronchitis',
    bodyRegion: 'lungs',
    reading:
      "Recurring bronchitis often arrives in people who feel suffocated by an environment they cannot leave — a job, a marriage, a family role. The lungs ask for fresh air the life is not providing.",
    affirmation: 'I deserve air that does not poison me.',
    chakraId: 'heart',
    journalPrompt: 'What environment am I in that the body is asking me to leave?',
  },

  // ─── STOMACH & DIGESTIVE ─────────────────────────────────
  {
    id: 'indigestion',
    symptom: 'Indigestion / heartburn',
    bodyRegion: 'stomach-digestive',
    reading:
      'Heartburn is something rising that does not want to be digested. Often a situation or person you keep trying to make work in your system that simply does not agree with you.',
    affirmation: 'I do not have to make it agreeable. I can leave it alone.',
    chakraId: 'solar-plexus',
    recommendedBreathId: 'breath-grounding',
    journalPrompt: 'What am I trying to digest that disagrees with me?',
  },
  {
    id: 'stomach-cramping',
    symptom: 'Stomach pain / cramping',
    bodyRegion: 'stomach-digestive',
    reading:
      "The stomach holds your gut sense of what is right. Cramps often appear when you have overridden the gut to please someone else, or to keep the peace.",
    affirmation: 'My gut knows. I listen to it now.',
    chakraId: 'solar-plexus',
    journalPrompt: 'Where did I override my gut feeling this week?',
  },
  {
    id: 'nausea',
    symptom: 'Nausea (without illness)',
    bodyRegion: 'stomach-digestive',
    reading:
      'Nausea without obvious cause is often the body telling you that you have ingested something — an idea, a story, a self-image — that is not nourishing you. The system is preparing to reject it.',
    affirmation: 'I am allowed to reject what does not nourish me.',
    chakraId: 'solar-plexus',
    journalPrompt: 'What story about myself am I no longer willing to swallow?',
  },
  {
    id: 'ibs',
    symptom: 'IBS / irritable bowel',
    bodyRegion: 'stomach-digestive',
    reading:
      "IBS is the gut struggling to know what to keep and what to let go — exactly mirroring the person's inner conflict about boundaries. Often appears in people who learned that saying no was dangerous.",
    affirmation: 'I get to decide what stays and what goes.',
    chakraId: 'solar-plexus',
    journalPrompt: 'Where am I afraid that saying no will cost me love?',
  },
  {
    id: 'constipation',
    symptom: 'Constipation',
    bodyRegion: 'stomach-digestive',
    reading:
      'Holding on. Often money, control, past resentments, or a relationship the person knows is over but cannot release. The body mirrors the holding.',
    affirmation: 'I let go. What is meant to leave can leave now.',
    chakraId: 'root',
    journalPrompt: 'What am I refusing to let leave my life?',
  },
  {
    id: 'diarrhea',
    symptom: 'Diarrhea (chronic / stress-related)',
    bodyRegion: 'stomach-digestive',
    reading:
      "The opposite holding pattern — the system rejecting everything because it cannot tell what is safe to keep. Often appears in people in chaotic environments or in periods of overwhelming change.",
    affirmation: 'I can take my time. Not everything must move at once.',
    chakraId: 'root',
    journalPrompt: 'Where am I trying to process change faster than my body can?',
  },
  {
    id: 'bloating',
    symptom: 'Bloating',
    bodyRegion: 'stomach-digestive',
    reading:
      'Bloating is unprocessed emotion swelling the gut. Frequently shows up in people who eat to soothe rather than to nourish — the digestion is doing emotional labor it was not designed for.',
    affirmation: 'I feel before I feed.',
    chakraId: 'sacral',
    journalPrompt: 'What was I really hungry for the last time I ate to soothe?',
  },

  // ─── LOWER BACK ──────────────────────────────────────────
  {
    id: 'lower-back-pain',
    symptom: 'Lower back pain',
    bodyRegion: 'lower-back',
    reading:
      "The lower back holds the fear of being financially or physically unsupported. Pain here often arrives in people whose childhood households treated money as scarce, dangerous, or unspoken — the body still believes survival is uncertain.",
    affirmation: 'I am supported. I have always had what I needed.',
    chakraId: 'root',
    recommendedBreathId: 'breath-grounding',
    journalPrompt: 'Where do I still believe I am alone in carrying it?',
  },
  {
    id: 'sciatica',
    symptom: 'Sciatica',
    bodyRegion: 'lower-back',
    reading:
      'Sciatica often appears at moments where the person is forced to move in a direction they do not want to move — a job change, a relocation, a relationship pivot that part of them is refusing.',
    affirmation: 'I can move when I am ready. The path will still be there.',
    chakraId: 'root',
    journalPrompt: 'Where am I being pushed in a direction I have not consented to?',
  },
  {
    id: 'tailbone',
    symptom: 'Tailbone pain / discomfort',
    bodyRegion: 'lower-back',
    reading:
      "The tailbone is the base of the spine — the literal seat of belonging. Discomfort here often follows a feeling of not having a place: in a family, a workplace, a community.",
    affirmation: 'I have a place. It is here.',
    chakraId: 'root',
    journalPrompt: 'Where do I feel like I do not quite belong?',
  },

  // ─── UPPER BACK ──────────────────────────────────────────
  {
    id: 'upper-back-pain',
    symptom: 'Upper back pain',
    bodyRegion: 'upper-back',
    reading:
      "The upper back holds the lack of emotional support — the feeling that nobody has your back. Often appears in people who learned early that to be supported you had to earn it.",
    affirmation: 'I let myself be held. I do not have to earn it.',
    chakraId: 'heart',
    recommendedBreathId: 'breath-diaphragm',
    journalPrompt: 'Who do I wish had my back, and what stops me from asking?',
  },
  {
    id: 'between-shoulder-blades',
    symptom: 'Tightness between the shoulder blades',
    bodyRegion: 'upper-back',
    reading:
      'This is the back of the heart. Tightness here is unexpressed love or unexpressed disappointment toward someone close — usually held back to keep the relationship comfortable.',
    affirmation: 'I let what is true be said.',
    chakraId: 'heart',
    journalPrompt: 'Who do I love that I have not told? Who do I resent that I have not addressed?',
  },

  // ─── HIPS & PELVIS ───────────────────────────────────────
  {
    id: 'hip-pain',
    symptom: 'Hip pain / stiffness',
    bodyRegion: 'hips-pelvis',
    reading:
      'The hips hold emotional patterns that the person does not want to look at — particularly around relationships, intimacy, and movement forward. They are the body\'s emotional storage closet.',
    affirmation: 'I am willing to look at what I have been storing.',
    chakraId: 'sacral',
    recommendedBreathId: 'breath-grounding',
    journalPrompt: 'What emotion have I been refusing to feel for years?',
  },
  {
    id: 'pelvic-tension',
    symptom: 'Pelvic tension',
    bodyRegion: 'hips-pelvis',
    reading:
      'The pelvis is the seat of creativity and sexual energy. Tension here often correlates with old sexual or creative shame, suppressed desire, or trauma the body still holds.',
    affirmation: 'My pleasure is mine. My creativity is mine.',
    chakraId: 'sacral',
    journalPrompt: 'Where am I suppressing what I want?',
  },
  {
    id: 'sexual-dysfunction',
    symptom: 'Sexual energy / dysfunction (general)',
    bodyRegion: 'hips-pelvis',
    reading:
      "Sexual energy goes quiet when safety, desire, or trust has been broken — sometimes recently, sometimes in childhood. The body protects itself by withdrawing the current. It comes back when safety does.",
    affirmation: 'I am safe to feel pleasure again.',
    chakraId: 'sacral',
    journalPrompt: 'When did my body decide pleasure was not safe?',
  },

  // ─── KNEES, LEGS & FEET ──────────────────────────────────
  {
    id: 'knee-pain',
    symptom: 'Knee pain',
    bodyRegion: 'knees-legs-feet',
    reading:
      "Knees are about pride, humility, and the willingness to bend. Pain here often shows up in people who refuse to ask for help, or in people forced to kneel before something they do not respect.",
    affirmation: 'I can bend without breaking.',
    chakraId: 'root',
    journalPrompt: 'What am I refusing to bend toward — or away from?',
  },
  {
    id: 'restless-legs',
    symptom: 'Restless legs',
    bodyRegion: 'knees-legs-feet',
    reading:
      "Restlessness in the legs is a body that wants to move in a life that will not let it. Often appears in people who feel stuck in a job, a relationship, or a location they have not given themselves permission to leave.",
    affirmation: 'I am allowed to move. Permission is mine to give.',
    chakraId: 'root',
    journalPrompt: 'Where am I sitting still in a life that wants to move?',
  },
  {
    id: 'cold-feet',
    symptom: 'Chronically cold feet',
    bodyRegion: 'knees-legs-feet',
    reading:
      "Cold feet is often the body's way of saying \"I am not fully in this life.\" Circulation goes quiet at the edges when the person is hovering above their own existence rather than landed in it.",
    affirmation: 'I am here. All the way down.',
    chakraId: 'root',
    recommendedBreathId: 'breath-grounding',
    journalPrompt: 'Where am I living slightly above my own life instead of inside it?',
  },

  // ─── SKIN ────────────────────────────────────────────────
  {
    id: 'acne',
    symptom: 'Acne / breakouts',
    bodyRegion: 'skin',
    reading:
      'The skin is the boundary between you and the world. Breakouts often appear when the boundary is being overwhelmed — too much input, too much exposure, too many people taking from you.',
    affirmation: 'I get to decide what is allowed in.',
    chakraId: 'sacral',
    journalPrompt: 'Whose energy am I letting in that I do not actually want?',
  },
  {
    id: 'eczema',
    symptom: 'Eczema',
    bodyRegion: 'skin',
    reading:
      'Eczema often shows up in people who learned to suppress an entire layer of self — a quieter, softer, more vulnerable layer that did not feel safe to expose. The skin then asks for the exposure it was denied.',
    affirmation: 'My softness is allowed here.',
    chakraId: 'heart',
    journalPrompt: 'What part of me did I learn to hide that wants to come out now?',
  },
  {
    id: 'hives',
    symptom: 'Hives / rashes',
    bodyRegion: 'skin',
    reading:
      "Hives are the body shouting what the mouth cannot. Acute rashes often appear right when the person is in a situation they need to leave or a relationship they need to confront.",
    affirmation: 'I trust my body to tell me what is true.',
    chakraId: 'solar-plexus',
    journalPrompt: 'What situation is my skin reacting to that my mouth has not addressed?',
  },

  // ─── WHOLE BODY ──────────────────────────────────────────
  {
    id: 'chronic-fatigue',
    symptom: 'Chronic fatigue',
    bodyRegion: 'general',
    reading:
      "Fatigue that will not lift is often a long-form depression of the will to live this particular life. Not the person — the life. The body has been asking for a change for a long time and has stopped expecting to be heard.",
    affirmation: 'I get to want a different life. Wanting is not betrayal.',
    chakraId: 'solar-plexus',
    recommendedBreathId: 'breath-fire',
    journalPrompt: 'What life is my body asking for that I have not let myself want?',
  },
  {
    id: 'body-anxiety',
    symptom: 'Anxiety in the body (general)',
    bodyRegion: 'general',
    reading:
      "Body-anxiety is the nervous system stuck in a state of expecting harm. Usually trained by a childhood, relationship, or workplace where harm did regularly arrive — and the system never got the all-clear.",
    affirmation: 'I am safe in this moment. The old danger is no longer here.',
    chakraId: 'root',
    recommendedBreathId: 'breath-4-7-8',
    journalPrompt: 'What past does my body still think it is living in?',
  },
];

// =============================================================
// LOOKUPS
// =============================================================

export function getBodyEntry(id: string): BodyWisdomEntry | undefined {
  return BODY_WISDOM.find((e) => e.id === id);
}

export function getEntriesByRegion(region: BodyRegion): BodyWisdomEntry[] {
  return BODY_WISDOM.filter((e) => e.bodyRegion === region);
}

export function getRegionMeta(region: BodyRegion): BodyRegionMeta | undefined {
  return BODY_REGIONS.find((r) => r.id === region);
}
