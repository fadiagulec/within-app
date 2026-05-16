/**
 * SOMA - Breathwork Safety System
 *
 * Pre-practice health check, special precautions, and general warnings.
 * Users cannot begin advanced practices without acknowledging these.
 */

// ============ GENERAL SAFETY WARNINGS ============

export const GENERAL_SAFETY_WARNINGS = [
  {
    id: 'not-medical',
    title: 'Not a Medical Treatment',
    body:
      'Breathwork is a wellness practice, not medical care. It complements — but never replaces — care from your doctor, psychiatrist, or mental-health professional. If you have a diagnosed condition, consult your practitioner before beginning.',
  },
  {
    id: 'never-water',
    title: 'Never in Water',
    body:
      'Never practice breath retention or any advanced breathwork while in a bathtub, pool, ocean, or any body of water. Retention can cause loss of consciousness. Drowning is the most common breathwork-related death.',
  },
  {
    id: 'never-driving',
    title: 'Never While Driving',
    body:
      'Never practice breathwork while operating a vehicle or machinery. Several techniques alter blood chemistry and consciousness.',
  },
  {
    id: 'work-capacity',
    title: 'Work Within Your Capacity',
    body:
      'If you feel lightheaded, dizzy, tingling, or unwell — stop. Return to natural breathing. Breathwork should challenge you, not harm you. Progress slowly.',
  },
  {
    id: 'emotional-surfacing',
    title: 'Emotion May Surface',
    body:
      'Connected-breath practices (diaphragm release, alkaline breathing) can bring suppressed emotion to the surface — tears, anger, grief, shaking. This is the work. Allow it. Have a safe space and time. If you have unprocessed trauma, consider working with a practitioner.',
  },
  {
    id: 'empty-stomach',
    title: 'Empty Stomach Recommended',
    body:
      'Most breathwork is best practiced on an empty or light stomach (2+ hours after a meal). A full stomach restricts the diaphragm.',
  },
  {
    id: 'trust-body',
    title: 'Trust Your Body',
    body:
      'Your body knows. If a practice doesn\'t feel right — stop. Not every breath is for every person. Honor what arises.',
  },
];

// ============ SPECIAL PRECAUTIONS PER POPULATION ============

export const SPECIAL_PRECAUTIONS = [
  {
    population: 'Pregnancy',
    avoid: [
      'Breath of Fire (Kapalabhati)',
      'Alkaline / Wim Hof breathing',
      'Any breath retention (kumbhaka)',
      'Diaphragm Release with Root Lock (mula bandha)',
      'Intense abdominal pumping',
    ],
    safe: [
      'Three-part breath (gentle)',
      'Alternate nostril (no retention)',
      'Coherent breathing (5-5)',
      'Ujjayi (very gentle)',
      'Aham Prakasha (mantra breath)',
    ],
    note: 'Always consult your OB/midwife. Second and third trimesters require extra gentleness. The pelvic floor is working hard already — do not add root lock.',
  },
  {
    population: 'High Blood Pressure',
    avoid: [
      'All breath retention practices',
      'Breath of Fire',
      'Alkaline breathing',
      'Aggressive inhales or fast pacing',
    ],
    safe: [
      'Coherent breathing (5-5)',
      '4-7-8 (gentle version)',
      'Bee breath',
      'Three-part breath',
      'Cooling breath',
    ],
    note: 'Focus on extended exhales and slow rhythms. These reduce blood pressure. Advanced pranayama requires practitioner supervision.',
  },
  {
    population: 'Heart Conditions',
    avoid: [
      'Breath of Fire',
      'Alkaline breathing',
      'Any retention beyond 10 seconds',
      'Rapid hyperventilation',
    ],
    safe: [
      'Coherent breathing (most studied for cardiac health)',
      'Box breathing (gentle)',
      'Bee breath',
      '4-7-8',
    ],
    note: 'Always clear with your cardiologist before starting any breathwork practice.',
  },
  {
    population: 'Epilepsy or Seizure Disorder',
    avoid: [
      'Breath of Fire',
      'Alkaline breathing',
      'Rapid rhythmic breathing',
      'Prolonged retentions',
    ],
    safe: ['Coherent breathing', 'Box breathing', 'Three-part breath', 'Ujjayi'],
    note: 'Altered blood chemistry from rapid breathing can lower seizure threshold. Slow, steady practices only.',
  },
  {
    population: 'Severe Anxiety / Panic Disorder',
    avoid: [
      'Alkaline breathing (can trigger panic)',
      'Breath of Fire',
      'Long retentions initially',
    ],
    safe: [
      '4-7-8 (start with 4 cycles only)',
      'Box breathing',
      'Bee breath',
      'Coherent breathing',
      'Aham Prakasha',
    ],
    note: 'Start with parasympathetic (calming) practices only. Build tolerance gradually. If a breath triggers panic, stop and return to natural breathing.',
  },
  {
    population: 'Recent Surgery',
    avoid: ['All intense practices until surgeon clears'],
    safe: ['Natural breath awareness', 'Very gentle three-part breath once cleared'],
    note: 'Abdominal or thoracic surgery requires significant healing time before breathwork resumes.',
  },
  {
    population: 'Eating Disorder / Body Dysmorphia',
    avoid: ['Breath practices that emphasize body sensing without therapeutic support'],
    safe: ['Grounding-focused breathwork only'],
    note: 'Body-based practices can re-trigger without professional support. Work with a therapist.',
  },
  {
    population: 'Active Trauma / PTSD',
    avoid: ['Deep connected breathwork alone'],
    safe: ['Short grounding practices (box, coherent, 4-7-8)'],
    note: 'Trauma can be stored in the body and surface rapidly with connected breath. Work with a trauma-informed practitioner for deep release work.',
  },
];

// ============ PRE-PRACTICE HEALTH CHECK ============

export interface HealthCheckQuestion {
  id: string;
  question: string;
  warningIfYes: string;
  blocksPractice?: string[];  // IDs of practices that should block
}

export const HEALTH_CHECK_QUESTIONS: HealthCheckQuestion[] = [
  {
    id: 'pregnant',
    question: 'Are you currently pregnant?',
    warningIfYes:
      'Several practices are contraindicated in pregnancy. We\'ll recommend pregnancy-safe breaths only.',
    blocksPractice: ['breath-of-fire', 'alkaline-breathing', 'diaphragm-release-root-lock'],
  },
  {
    id: 'heart',
    question: 'Do you have any heart condition or use heart medication?',
    warningIfYes:
      'Please consult your cardiologist before starting. We\'ll highlight heart-safe practices.',
    blocksPractice: ['breath-of-fire', 'alkaline-breathing'],
  },
  {
    id: 'bp',
    question: 'Do you have high blood pressure (diagnosed or on medication)?',
    warningIfYes: 'Avoid retention-heavy practices. Focus on calming breaths.',
    blocksPractice: ['breath-of-fire', 'alkaline-breathing'],
  },
  {
    id: 'epilepsy',
    question: 'Do you have epilepsy or a history of seizures?',
    warningIfYes: 'Avoid rapid breathing. Slow, steady practices only.',
    blocksPractice: ['breath-of-fire', 'alkaline-breathing'],
  },
  {
    id: 'anxiety',
    question: 'Do you experience severe anxiety or panic attacks?',
    warningIfYes:
      'Start with parasympathetic (calming) breaths only. Build tolerance before activating practices.',
    blocksPractice: ['alkaline-breathing'],
  },
  {
    id: 'surgery',
    question: 'Have you had surgery in the last 3 months?',
    warningIfYes: 'Please get clearance from your surgeon before intense breathwork.',
    blocksPractice: ['breath-of-fire', 'alkaline-breathing', 'diaphragm-release-root-lock'],
  },
  {
    id: 'trauma',
    question: 'Are you currently in active trauma recovery (or untreated PTSD)?',
    warningIfYes:
      'Connected-breath practices can surface stored emotion. Consider working with a trauma-informed practitioner alongside this app.',
    blocksPractice: ['diaphragm-release-root-lock', 'alkaline-breathing'],
  },
];

// ============ PRE-MEDITATION GENERAL CHECK ============

export const PRE_MEDITATION_CHECK = [
  'Choose a quiet space where you will not be disturbed',
  'Sit or lie comfortably — support your back if needed',
  'Turn your phone to Do Not Disturb',
  'Empty bladder beforehand',
  'Do not practice on a full stomach (wait 2 hours)',
  'Have water nearby',
  'If new to practice, start with shorter sessions (5-10 min)',
  'Honor your body — if something feels wrong, stop',
];

// ============ IMPORTANT BREATHWORK INFORMATION ============

export const IMPORTANT_INFO = {
  title: 'Before You Begin',
  intro:
    'Breathwork is powerful precisely because it works. The same power that can regulate your nervous system can also overwhelm it if approached without respect.',
  principles: [
    {
      title: 'Breath is a Lever',
      body: 'Different patterns move you toward different states. Calming breaths down-regulate. Activating breaths up-regulate. Balancing breaths integrate. Know what you\'re choosing.',
    },
    {
      title: 'Less is More at First',
      body: 'Begin with short, gentle practices. Build over weeks. Your nervous system rewires slowly. Fast breathing practices without preparation can dysregulate rather than regulate.',
    },
    {
      title: 'The Body is the Teacher',
      body: 'Your body will tell you when a practice is too much — lightheadedness, tingling, emotional flooding, dizziness. Listen. Stop. Return to natural breath. Come back another day.',
    },
    {
      title: 'Emotion is Welcome',
      body: 'Connected-breath practices often surface stored emotion. Tears, anger, shaking, laughter — all normal. Do not stop the feeling. Let it move through.',
    },
    {
      title: 'Practice is the Path',
      body: 'One session will not transform you. A daily 10-minute practice over months will. This is not a quick fix — it is a return, every day, to your own breath.',
    },
  ],
};
