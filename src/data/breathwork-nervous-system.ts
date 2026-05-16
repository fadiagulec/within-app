/**
 * SOMA - Complete Breathwork Library
 *
 * Classified by nervous system effect:
 *   SYMPATHETIC (Fight or Flight) — activating, energizing
 *   PARASYMPATHETIC (Rest & Digest) — calming, grounding
 *   BALANCING — varies between both, pranayama-style regulation
 *
 * Each practice includes benefits, when to use, cautions, and pre-practice check.
 * Philosophy: breath is the only part of the autonomic nervous system
 * you can consciously control. Through it, you influence the whole system.
 */

export type NervousSystemEffect = 'parasympathetic' | 'sympathetic' | 'balancing';

export interface BreathworkNervousSystemInfo {
  id: string;
  title: string;
  altNames?: string[];
  effect: NervousSystemEffect;
  effectLabel: string;
  shortBenefit: string;
  whenToUse: string[];
  whenToAvoid: string[];
  sciencePlain: string;
  quickGuide: string;
  duration: number;
  difficulty: 'beginner' | 'moderate' | 'advanced';
  cautionLevel: 'low' | 'moderate' | 'high';
}

export const BREATHWORK_NS_LIBRARY: BreathworkNervousSystemInfo[] = [
  // ============ SYMPATHETIC (FIGHT OR FLIGHT — ACTIVATING) ============
  {
    id: 'breath-of-fire',
    title: 'Breath of Fire',
    altNames: ['Kapalabhati', 'Skull Shining Breath'],
    effect: 'sympathetic',
    effectLabel: 'Activates + Energizes',
    shortBenefit: 'Wakes the body. Clears mental fog. Ignites internal fire.',
    whenToUse: [
      'Low energy or afternoon slump',
      'Morning activation',
      'Before workout or creative work',
      'Lifting heaviness or mental fog',
      'Solar plexus + personal power work',
    ],
    whenToAvoid: [
      'Pregnancy (all trimesters)',
      'Menstruation (first 2 days)',
      'High blood pressure',
      'Heart conditions',
      'Recent abdominal surgery',
      'Epilepsy',
      'Severe anxiety / panic disorder',
      'Evening (activates, disturbs sleep)',
    ],
    sciencePlain:
      'Rapid forceful exhales from the belly oxygenate the blood, activate the sympathetic nervous system cleanly, and increase cerebral blood flow. Associated with increased alertness and mental clarity.',
    quickGuide: 'Sharp rhythmic exhales through nose · Passive inhales · 30-60 sec · Rest · Repeat',
    duration: 12,
    difficulty: 'moderate',
    cautionLevel: 'high',
  },
  {
    id: 'alkaline-breathing',
    title: 'Alkaline Breathing',
    altNames: ['Hyperoxygenation', 'Wim Hof-inspired'],
    effect: 'sympathetic',
    effectLabel: 'Deep Activation + Reset',
    shortBenefit: 'Deep oxygenation + retention to reset the nervous system and alkalize blood chemistry.',
    whenToUse: [
      'Morning ritual',
      'Chronic fatigue',
      'Building stress resilience',
      'Before cold exposure',
      'Creative breakthroughs',
    ],
    whenToAvoid: [
      'Pregnancy',
      'Epilepsy',
      'Heart conditions',
      'High blood pressure',
      'Panic disorder',
      'Never in water (bath, pool, ocean)',
      'Never while driving',
      'Empty stomach for 2+ hours recommended',
    ],
    sciencePlain:
      '30 deep rhythmic breaths temporarily shift blood pH toward alkaline, followed by empty-lung retention that trains the nervous system to tolerate CO2 buildup. Builds stress tolerance over time.',
    quickGuide: '30 full breaths · Empty-lung hold · Recovery hold · 3 rounds',
    duration: 15,
    difficulty: 'advanced',
    cautionLevel: 'high',
  },
  {
    id: 'lion-breath',
    title: 'Lion\'s Breath',
    altNames: ['Simhasana'],
    effect: 'sympathetic',
    effectLabel: 'Releases + Energizes',
    shortBenefit: 'Releases jaw tension, stage fright, stuck anger. Looks silly, works fast.',
    whenToUse: [
      'Jaw clenching',
      'Stuck anger',
      'Stage fright',
      'Vocal warm-up',
      'Face / neck tension',
    ],
    whenToAvoid: ['Neck injury', 'TMJ disorder (gentle version only)'],
    sciencePlain:
      'Deliberate tongue extension with loud "HAA" exhale releases facial muscles and stimulates the vagus nerve through the jaw and throat.',
    quickGuide: 'Inhale through nose · Open mouth · Tongue out · Loud "HAA" exhale · 5 rounds',
    duration: 7,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },

  // ============ PARASYMPATHETIC (REST & DIGEST — CALMING) ============
  {
    id: 'diaphragm-release-root-lock',
    title: 'Diaphragm Release with Root Lock',
    altNames: ['Mula Bandha Breath', 'Connected Breath with Base Seal'],
    effect: 'parasympathetic',
    effectLabel: 'Deep Release + Ground',
    shortBenefit: 'Connected circular breath with gentle pelvic floor engagement to move stuck emotion and ground the release.',
    whenToUse: [
      'Stuck emotion you can sense but cannot name',
      'Numbness or dissociation',
      'After a difficult period',
      'Preparing for deep journaling',
      'Sacral / root chakra work',
    ],
    whenToAvoid: [
      'Pregnancy (root lock contraindicated)',
      'Pelvic floor dysfunction',
      'Serious cardiovascular conditions',
      'Recent abdominal or pelvic surgery',
      'Active trauma without professional support',
      'Untreated hernia',
    ],
    sciencePlain:
      'Connected breathing (no pauses) temporarily elevates CO2, briefly activating sympathetic arousal before a deep parasympathetic drop. The root lock (gentle pelvic floor contraction on inhale) anchors the release through the root chakra — preventing emotional energy from scattering and guiding integration.',
    quickGuide: 'Inhale belly + gently lift pelvic floor · Exhale release floor · Continuous flow · 10 min',
    duration: 18,
    difficulty: 'moderate',
    cautionLevel: 'high',
  },
  {
    id: 'alternate-nostril',
    title: 'Alternate Nostril Breathing',
    altNames: ['Nadi Shodhana', 'Channel Cleansing Breath'],
    effect: 'parasympathetic',
    effectLabel: 'Calms + Balances Hemispheres',
    shortBenefit: 'Clears mental fog, balances left/right brain, drops heart rate.',
    whenToUse: [
      'Mental scatter',
      'Emotional overwhelm',
      'Before creative work',
      'Transitioning between tasks',
      'Pre-meditation',
      'Third eye clarity work',
    ],
    whenToAvoid: ['Severe nasal congestion', 'Recent nasal / sinus surgery'],
    sciencePlain:
      'Alternating nostrils activates left and right hemispheres in sequence, balancing sympathetic/parasympathetic input. Measurably improves heart rate variability within minutes.',
    quickGuide: 'Close right nostril · Inhale left · Switch · Exhale right · Inhale right · Switch · Exhale left · Repeat',
    duration: 14,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    altNames: ['Square Breathing', 'Sama Vritti'],
    effect: 'parasympathetic',
    effectLabel: 'Calm Focus',
    shortBenefit: 'Used by Navy SEALs for alert-calm under pressure.',
    whenToUse: [
      'Before a meeting or presentation',
      'Decision-making under pressure',
      'Managing acute stress',
      'Pre-performance centering',
      'Focused work sessions',
    ],
    whenToAvoid: ['No major contraindications'],
    sciencePlain:
      'Equal 4-4-4-4 rhythm signals safety to the brain stem. Lengthens the respiratory cycle, improves HRV, and creates parasympathetic calm without drowsiness.',
    quickGuide: 'Inhale 4 · Hold 4 · Exhale 4 · Hold 4',
    duration: 10,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },
  {
    id: 'four-seven-eight',
    title: '4-7-8 Breath',
    altNames: ['Relaxing Breath'],
    effect: 'parasympathetic',
    effectLabel: 'Deeply Calms',
    shortBenefit: 'Drops anxiety and heart rate within minutes.',
    whenToUse: [
      'Before sleep',
      'Anxiety or panic',
      'After an argument',
      'Racing thoughts',
    ],
    whenToAvoid: ['Right before driving (induces drowsiness)', 'Severe asthma flare-up'],
    sciencePlain:
      'Long exhale directly stimulates the vagus nerve, shifting from fight-or-flight to rest-and-digest. Heart rate drops within 2-3 cycles.',
    quickGuide: 'Inhale 4 · Hold 7 · Exhale 8 · Repeat 4-8 times',
    duration: 10,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },
  {
    id: 'bee-breath',
    title: 'Bee Breath',
    altNames: ['Bhramari'],
    effect: 'parasympathetic',
    effectLabel: 'Calms + Clears Mind',
    shortBenefit: 'Humming vibration quiets racing thoughts and melts anxiety.',
    whenToUse: [
      'Insomnia',
      'Overthinking',
      'Social anxiety',
      'Tension headaches',
      'Throat chakra work',
    ],
    whenToAvoid: ['Severe ear infection', 'Pregnancy late stages (consult practitioner)'],
    sciencePlain:
      'Humming increases nitric oxide 15x in the sinuses, relaxes facial muscles, and directly stimulates the vagus nerve through the larynx.',
    quickGuide: 'Inhale · Exhale humming "mmm" softly · 6-10 rounds',
    duration: 10,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },
  {
    id: 'cooling-breath',
    title: 'Cooling Breath',
    altNames: ['Sitali'],
    effect: 'parasympathetic',
    effectLabel: 'Cools + Settles',
    shortBenefit: 'Literally cools the body. For anger, heat, hot flashes.',
    whenToUse: [
      'Rage or intense anger',
      'Hot flashes',
      'Argument heating up',
      'Summer overwhelm',
    ],
    whenToAvoid: ['Cold weather', 'Low blood pressure', 'Chest congestion'],
    sciencePlain:
      'Air passes over a curled tongue, cooling before entering the body. Cooling signals trigger a parasympathetic shift via hypothalamus.',
    quickGuide: 'Curl tongue · Inhale through tongue · Exhale through nose · 8 rounds',
    duration: 8,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },
  {
    id: 'ujjayi-grounding',
    title: 'Ujjayi Grounding Breath',
    altNames: ['Ocean Breath', 'Victorious Breath'],
    effect: 'parasympathetic',
    effectLabel: 'Centers + Anchors',
    shortBenefit: 'Ocean-sound breath for instant presence.',
    whenToUse: [
      'Feeling scattered',
      'Before meditation',
      'Preparing for a difficult conversation',
      'During yoga practice',
    ],
    whenToAvoid: ['Sore throat', 'Asthma flare-up'],
    sciencePlain:
      'Slight throat constriction creates a whisper sound. The auditory feedback anchors attention, extends the exhale naturally, and activates the vagus nerve.',
    quickGuide: 'Slightly constrict throat · Breathe in and out through nose · Hear the whisper',
    duration: 12,
    difficulty: 'moderate',
    cautionLevel: 'low',
  },

  // ============ BALANCING (VARIES BETWEEN BOTH — PRANAYAMA) ============
  {
    id: 'pranayama-foundation',
    title: 'Pranayama — Foundation Practice',
    altNames: ['Classical Breath Control', 'Yogic Breath'],
    effect: 'balancing',
    effectLabel: 'Foundational Balancing',
    shortBenefit: 'The ancient art of directing life-force through conscious breath ratios.',
    whenToUse: [
      'Daily balancing practice',
      'Building pranic capacity',
      'Preparing for deeper meditation',
      'Seasonal transitions',
      'Energy level regulation',
    ],
    whenToAvoid: [
      'Start with basic practice only, build gradually',
      'Pregnancy (breath retention contraindicated)',
      'High blood pressure (retention contraindicated)',
    ],
    sciencePlain:
      'Pranayama uses precise ratios of inhale, hold, and exhale to direct the autonomic nervous system. Different ratios produce different states — longer exhales calm, longer inhales activate, held breath integrates.',
    quickGuide: 'Start with 1:1 (inhale : exhale) · Progress to 1:2 · Advanced: 1:4:2 with retention',
    duration: 15,
    difficulty: 'moderate',
    cautionLevel: 'moderate',
  },
  {
    id: 'buteyko',
    title: 'Buteyko Method',
    altNames: ['Reduced Breathing'],
    effect: 'balancing',
    effectLabel: 'Reduces + Regulates',
    shortBenefit: 'Counterintuitive: breathe LESS to restore tolerance and calm.',
    whenToUse: [
      'Asthma management (complementary to medical care)',
      'Chronic anxiety with hyperventilation',
      'Chronic mouth-breathing habits',
      'Sleep apnea support',
      'Building CO2 tolerance',
    ],
    whenToAvoid: [
      'Never replace prescribed asthma medication',
      'Pregnancy (avoid advanced practices)',
      'Serious cardiovascular conditions (medical supervision)',
      'Type 1 diabetes (consult practitioner)',
    ],
    sciencePlain:
      'Developed by Dr. Konstantin Buteyko in the 1950s. Trains the body to tolerate higher CO2, which improves oxygen delivery to cells (Bohr effect). Slower, smaller breathing calms the nervous system and supports respiratory health.',
    quickGuide: 'Close mouth · Breathe lightly through nose · Slight "air hunger" tolerated · Pause after exhale',
    duration: 15,
    difficulty: 'moderate',
    cautionLevel: 'moderate',
  },
  {
    id: 'aham-prakasha',
    title: 'Aham Prakasha — I Am Light',
    altNames: ['Luminous Breath', 'Mantra Breath'],
    effect: 'balancing',
    effectLabel: 'Elevates + Embodies',
    shortBenefit: 'Breath paired with the inner remembering: I am light. Raises vibration and embodies the mantra.',
    whenToUse: [
      'Morning intention practice',
      'After emotional release work (integration)',
      'When needing to reconnect with inner truth',
      'Evening before sleep',
      'Crown and heart chakra work',
    ],
    whenToAvoid: ['No physical contraindications — may not resonate if in acute activation'],
    sciencePlain:
      'Pairing a mantra with the breath creates sustained attention, coherent brain rhythms, and embodied belief installation. The phrase "I am light" acts as both an anchor for the mind and an elevated self-reference that the nervous system gradually aligns with.',
    quickGuide: 'Inhale: silently "AHAM" · Exhale: silently "PRAKASHA" · Feel the words in the body',
    duration: 15,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },
  {
    id: 'three-part-breath',
    title: 'Three-Part Breath',
    altNames: ['Dirga Pranayama'],
    effect: 'balancing',
    effectLabel: 'Deep Baseline',
    shortBenefit: 'Foundational full-lung breath — the prerequisite for every other practice.',
    whenToUse: [
      'Learning to breathe deeply',
      'Before any other breathwork',
      'Morning wake-up',
      'Re-centering during the day',
    ],
    whenToAvoid: ['No contraindications'],
    sciencePlain:
      'Fills lower belly, lower ribs, and upper chest sequentially. Engages full lung capacity, improves oxygen exchange, and teaches nervous system awareness.',
    quickGuide: 'Inhale: belly · ribs · chest · Exhale reverse',
    duration: 8,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },
  {
    id: 'coherent-breathing',
    title: 'Coherent Breathing',
    altNames: ['Resonance Breathing', '5-5 Breathing'],
    effect: 'balancing',
    effectLabel: 'Heart Coherence',
    shortBenefit: '5-in, 5-out. Research-backed rhythm for long-term nervous system health.',
    whenToUse: [
      'Daily baseline (10-20 min/day)',
      'Chronic stress',
      'High blood pressure management',
      'Building long-term resilience',
    ],
    whenToAvoid: ['No contraindications'],
    sciencePlain:
      'At 6 breaths per minute, heart rate, blood pressure, and brain rhythms synchronize. Studied extensively for depression, PTSD, and anxiety. Safe for daily practice.',
    quickGuide: 'Inhale 5 seconds · Exhale 5 seconds · That\'s it.',
    duration: 12,
    difficulty: 'beginner',
    cautionLevel: 'low',
  },
];

export function getByEffect(effect: NervousSystemEffect): BreathworkNervousSystemInfo[] {
  return BREATHWORK_NS_LIBRARY.filter((b) => b.effect === effect);
}

export function getQuickRecommendation(
  state: 'anxious' | 'tired' | 'angry' | 'scattered' | 'stuck' | 'sleep' | 'grounded' | 'elevated',
): BreathworkNervousSystemInfo | undefined {
  const map: Record<typeof state, string> = {
    anxious: 'four-seven-eight',
    tired: 'breath-of-fire',
    angry: 'cooling-breath',
    scattered: 'alternate-nostril',
    stuck: 'diaphragm-release-root-lock',
    sleep: 'bee-breath',
    grounded: 'coherent-breathing',
    elevated: 'aham-prakasha',
  };
  const id = map[state];
  return BREATHWORK_NS_LIBRARY.find((b) => b.id === id);
}
