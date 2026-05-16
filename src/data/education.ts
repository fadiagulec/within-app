/**
 * SOMA - Beginner Education Content
 * For users with ZERO prior knowledge of healing, chakras, breathwork, or meditation.
 * Tone: warm, clear, no jargon. Assume they're curious but skeptical.
 */

export interface EducationCard {
  id: string;
  category: 'basics' | 'chakras' | 'breathwork' | 'meditation' | 'burnout' | 'journaling' | 'manifestation';
  title: string;
  subtitle: string;
  content: string[];  // array of paragraphs
  tryNext?: string;   // action label
  readingTimeMin: number;
}

export const EDUCATION: EducationCard[] = [
  // ===== BASICS =====
  {
    id: 'what-is-healing',
    category: 'basics',
    title: 'What is healing, really?',
    subtitle: 'A grounded definition',
    readingTimeMin: 2,
    content: [
      "Healing is not a product you buy once. It is a practice you return to.",
      "When we say 'healing,' we don't mean becoming a perfect, stress-free person. We mean developing the capacity to meet life — its stresses, its losses, its beauty — without being thrown off course.",
      "The body is the primary site of healing. Thoughts happen in the mind, but they live in the body — as tension, as tightness, as energy stuck somewhere. Healing means learning to feel what's stuck and letting it move.",
      "Nothing in this app replaces medical care. What it does is give you tools — breath, movement, awareness, reflection — that complement any other work you're doing.",
    ],
    tryNext: 'Start Day 1 of your journey',
  },
  {
    id: 'high-vibration',
    category: 'basics',
    title: 'What does "high vibration" mean?',
    subtitle: 'Beyond the buzzword',
    readingTimeMin: 2,
    content: [
      "You've heard the phrase 'good vibes.' There's actually something to it — though it sounds mystical, it maps onto real biology.",
      "Your nervous system has two main modes: activated (stress, fear, fight-flight) and regulated (calm, curious, connected). When you spend most of your time regulated, you feel clear, creative, and kind. This is what people mean by 'high vibration.'",
      "When you're stressed, cynical, or shut down, your system is 'low vibration' — not because you're bad, but because survival has taken priority over everything else.",
      "The goal of this app is not to make you happy all the time. It's to widen your range — so that when life knocks you down, you have ways to come back.",
    ],
  },
  {
    id: 'feel-to-heal',
    category: 'basics',
    title: 'Why "feel it to heal it"?',
    subtitle: 'The core of every practice here',
    readingTimeMin: 2,
    content: [
      "Most of us were taught to push through — suppress emotion, keep going, stay strong. The cost is that what we don't feel, we store.",
      "Stored emotion doesn't disappear. It becomes tight shoulders. Racing thoughts. Waking up at 3am. Chronic fatigue. This is the body saying: I'm still holding something.",
      "The work in this app is the opposite of suppression. It's inviting what you've been carrying to move — gently, at your own pace, with tools that make it safe.",
      "You don't have to feel everything at once. You just have to stop fighting the feeling when it comes.",
    ],
  },

  // ===== CHAKRAS =====
  {
    id: 'what-are-chakras',
    category: 'chakras',
    title: 'What are chakras? (For total beginners)',
    subtitle: 'A simple explanation',
    readingTimeMin: 3,
    content: [
      "Chakras are not a religion. They're a map.",
      "For thousands of years — long before modern psychology — humans noticed that emotions and physical sensations cluster in specific parts of the body. Fear sits low. Grief sits in the chest. Anxiety rises up the throat.",
      "The chakra system (originating in ancient India) names seven of these clusters, from the base of the spine to the crown of the head. Each one corresponds to a type of experience: safety, pleasure, power, love, truth, clarity, connection.",
      "You don't have to 'believe' in chakras for the practices to work. You're just learning to pay attention to different zones of your body and what they're holding.",
      "Modern science recognizes much of this too — the gut has its own nervous system, the heart has 40,000 neurons, and the vagus nerve (which runs from throat to belly) shapes how calm or activated you feel.",
    ],
    tryNext: 'Take the chakra quiz',
  },
  {
    id: 'chakra-blocked',
    category: 'chakras',
    title: 'What does a "blocked chakra" mean?',
    subtitle: 'Without the woo-woo',
    readingTimeMin: 2,
    content: [
      "A 'blocked chakra' is a poetic way of saying: this area of your body holds an emotion that isn't flowing.",
      "Example: You had a childhood where money was scarce. Fear got stored in your Root (base of spine). Years later, you're an adult, financially fine — but your body still braces around money. That's a blocked Root.",
      "Unblocking isn't about chanting or crystals. It's about:\n• Noticing the tension\n• Breathing into it\n• Letting the emotion move\n• Installing a new experience",
      "The seven chakras each have a signature 'blocking feeling' that shows up when they're stuck:\n• Root — Fear\n• Sacral — Guilt\n• Solar Plexus — Shame\n• Heart — Grief\n• Throat — Suppression\n• Third Eye — Doubt\n• Crown — Separation",
    ],
  },

  // ===== BREATHWORK =====
  {
    id: 'why-breathwork',
    category: 'breathwork',
    title: 'Why breathwork works (the science)',
    subtitle: 'Not mystical — biological',
    readingTimeMin: 3,
    content: [
      "Your breath is the only part of your autonomic nervous system you can control consciously. That makes it a direct line to your state.",
      "When you slow the breath — especially lengthening the exhale — you stimulate the vagus nerve. This nerve sends a signal to your brain: the environment is safe. Your heart rate slows. Your muscles release. Your thoughts quiet.",
      "Different breath patterns produce different states:\n• Slow + long exhale = calm (parasympathetic)\n• Rapid rhythmic = energy (sympathetic, clear activation)\n• Held retention = clarity, intensity\n• Equal inhale-exhale = focus",
      "This is why breathwork isn't 'just breathing.' It's nervous-system regulation with your own nervous system.",
      "Science confirms: a 4-7-8 breath cycle (inhale 4, hold 7, exhale 8) reliably drops heart rate and cortisol within minutes. Humming (like in bee breath) increases nitric oxide in sinuses, which improves circulation.",
    ],
    tryNext: 'Try the Breath Orb',
  },
  {
    id: 'breath-which-when',
    category: 'breathwork',
    title: 'Which breath for which moment?',
    subtitle: 'A quick lookup guide',
    readingTimeMin: 2,
    content: [
      "**Anxious or racing mind** → 4-7-8 or Alternate Nostril (calm the system)",
      "**Can't sleep** → 4-7-8 or Bee Breath (drop into rest)",
      "**Tired or foggy** → Fire Breath or Activation Breath (wake up naturally)",
      "**Pre-meeting / pre-performance** → Box Breath (center + focus)",
      "**Emotional flood, stuck feeling** → Diaphragm Release (let it move)",
      "**Angry / overheated** → Cooling Breath (Sitali)",
      "**General presence** → Coherent Breathing (5 in, 5 out) or Ujjayi",
      "**Jaw / tension release** → Lion's Breath",
      "Start where you are. The right breath is the one you'll actually do.",
    ],
  },

  // ===== MEDITATION =====
  {
    id: 'meditation-vs-breathwork',
    category: 'meditation',
    title: 'What\'s the difference between meditation and breathwork?',
    subtitle: 'Often confused — here\'s the distinction',
    readingTimeMin: 2,
    content: [
      "Breathwork is an active practice. You're doing something with your breath — changing its pattern, its speed, its depth — to create a specific state.",
      "Meditation is more receptive. You're letting your awareness settle so you can observe what's already there — thoughts, sensations, emotions — without grabbing on to any of it.",
      "Both use the breath. Both calm the nervous system. But breathwork is a tool for change; meditation is a tool for awareness.",
      "You don't need to choose. Most of our healing sessions use both — breathwork at the start to settle the body, meditation to guide the deeper work.",
    ],
  },

  // ===== BURNOUT =====
  {
    id: 'what-is-burnout',
    category: 'burnout',
    title: 'What is burnout, actually?',
    subtitle: 'A specific thing, not just tiredness',
    readingTimeMin: 3,
    content: [
      "Burnout is not the same as being tired or stressed. It's a specific syndrome — now recognized by the World Health Organization — with three dimensions:",
      "1. **Emotional exhaustion** — feeling drained no matter how much you sleep\n2. **Cynicism / depersonalization** — feeling detached, going through the motions, not caring the way you used to\n3. **Reduced accomplishment** — feeling like nothing you do matters or is enough",
      "Burnout isn't fixed by a vacation. You come back and it's still there in a week. Because the problem isn't the workload — it's that your nervous system has been stuck in 'on' for too long and has stopped responding.",
      "Recovery requires re-teaching your system how to downshift. This is exactly what our 21-Day Burnout Recovery Journey is designed to do — nervous system first (Week 1), emotional release second (Week 2), rebuilding energy third (Week 3).",
    ],
    tryNext: 'Take the Burnout Assessment',
  },

  // ===== JOURNALING =====
  {
    id: 'why-journal',
    category: 'journaling',
    title: 'Why journaling matters here',
    subtitle: 'It\'s not a diary',
    readingTimeMin: 2,
    content: [
      "Journaling is not about writing well. It's about externalizing what\'s circling in your mind so you can see it.",
      "Thoughts you don't write down stay on loop. Thoughts you write down lose 50% of their grip within minutes.",
      "In this app, we don't ask you to write an essay. We give you one question at a time — chosen for where you are in your healing. Sometimes you write two sentences. Sometimes a page pours out.",
      "Both are useful. The point is the pause — the moment where you turn inward and listen.",
    ],
  },

  // ===== MANIFESTATION =====
  {
    id: 'manifestation-real',
    category: 'manifestation',
    title: 'Manifestation — what it is (and isn\'t)',
    subtitle: 'No magical thinking',
    readingTimeMin: 3,
    content: [
      "Manifestation doesn't mean wishing and a thing appears. That's not how the world works.",
      "What it means is: what you focus on, you perceive more of. What you embody, you move toward. What you expect, you create conditions for.",
      "When you write down a clear intention and return to it daily, three things happen:\n• Your brain starts noticing opportunities you'd otherwise miss (reticular activating system)\n• Your decisions subtly align with the intention (compound effect)\n• Your nervous system anchors the vision, so you act from it rather than toward it",
      "This is why vision boarding works — not magic, but neuroscience. When you see the vision daily, your brain treats it as already familiar. You move toward it without forcing.",
      "In this app, the vision board is not decoration. It's a daily practice.",
    ],
  },
];

export function getEducationByCategory(category: EducationCard['category']): EducationCard[] {
  return EDUCATION.filter(e => e.category === category);
}

export function getEducationById(id: string): EducationCard | undefined {
  return EDUCATION.find(e => e.id === id);
}
