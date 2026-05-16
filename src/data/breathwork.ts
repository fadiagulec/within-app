import { BreathworkSession } from '@/types';

export const breathwork: BreathworkSession[] = [
  {
    id: 'breath-fire',
    category: 'breathwork',
    title: 'Fire Breath',
    subtitle: 'Wake up your power center',
    durationMin: 12,
    theme: 'Move stagnant energy. Return to aliveness.',
    levelRequired: 3,
    technique: 'Kapalabhati-style rapid belly breathing',
    safetyWarning:
      'Not recommended during pregnancy, menstruation, or with high blood pressure, cardiovascular conditions, epilepsy, hernia, or recent abdominal surgery.',
    chips: ['Activate', 'Energy', 'Sluggish day'],
    science:
      'Wakes you up fast. Use when you\'re foggy, sluggish, or stuck. Skip if you\'re already wired.',
    filePath: 'content/breathwork/01-fire-breath.txt',
  },
  {
    id: 'breath-alternate-nostril',
    category: 'breathwork',
    title: 'Alternate Nostril',
    subtitle: 'Balance the two halves of you',
    durationMin: 11,
    theme: 'Quiet the noise. Come back to center.',
    levelRequired: 2,
    technique: 'Nadi Shodhana',
    chips: ['Balance', 'Nerve system', 'Mid-day'],
    science:
      'Resets you when you\'re scattered. Five minutes and your head clears.',
    filePath: 'content/breathwork/02-alternate-nostril.txt',
  },
  {
    id: 'breath-diaphragm',
    category: 'breathwork',
    title: 'Diaphragm Release',
    subtitle: 'Let the belly soften',
    durationMin: 10,
    theme: 'Undo the armor in your core.',
    levelRequired: 1,
    technique: 'Deep diaphragmatic breathing',
    chips: ['Core', 'Release', 'Morning'],
    science:
      'Softens the body. Best when you\'ve been holding tension all day.',
    filePath: 'content/breathwork/03-diaphragm-release.txt',
  },
  {
    id: 'breath-4-7-8',
    category: 'breathwork',
    title: '4-7-8 Breath',
    subtitle: 'The nervous system reset',
    durationMin: 6,
    theme: 'From activation to ease, in under six minutes.',
    levelRequired: 0,
    technique: 'Inhale 4 · Hold 7 · Exhale 8',
    chips: ['Sleep', 'Calm spikes', 'Before sleep'],
    science:
      'Slows you down fast. Best when your chest is tight or your mind won\'t stop.',
    filePath: 'content/breathwork/04-four-seven-eight.txt',
  },
  {
    id: 'breath-box',
    category: 'breathwork',
    title: 'Box Breath',
    subtitle: 'Steady ground for any moment',
    durationMin: 8,
    theme: 'Equal sides. Equal you.',
    levelRequired: 0,
    technique: 'Inhale 4 · Hold 4 · Exhale 4 · Hold 4',
    chips: ['Center', 'Focus', 'Before hard task'],
    science:
      'Steadies you under pressure. Use before something hard.',
    filePath: 'content/breathwork/05-box-breath.txt',
  },
  {
    id: 'breath-activation',
    category: 'breathwork',
    title: 'Activation Breath',
    subtitle: 'Move energy through the whole body',
    durationMin: 22,
    theme: 'A full somatic release. Use with care.',
    levelRequired: 4,
    technique: 'Two-part circular breathing',
    safetyWarning:
      'Intense practice. Not for first-time users. Avoid if pregnant or with heart conditions.',
    chips: ['Release', 'Deep work', 'Weekend'],
    science:
      'Big practice. Surfaces emotion. Do when you have time and space — not before a meeting.',
    filePath: 'content/breathwork/06-activation-breath.txt',
  },
  {
    id: 'breath-grounding',
    category: 'breathwork',
    title: 'Grounding Breath',
    subtitle: 'Come back down. Come back in.',
    durationMin: 7,
    theme: 'For when the day has pulled you too far out.',
    levelRequired: 0,
    technique: 'Slow nasal breathing with exhale emphasis',
    chips: ['Ground', 'Settle', 'After overstimulation'],
    science:
      'Brings you back when the day pulled you too far out. Settles, doesn\'t sedate.',
    filePath: 'content/breathwork/07-grounding-breath.txt',
  },
  {
    id: 'breath-alkaline',
    category: 'breathwork',
    title: 'Alkaline Breathwork',
    subtitle: 'Energise the body, oxygenate the system',
    durationMin: 8,
    theme: 'Continuous rhythmic breathing that floods the system with oxygen.',
    levelRequired: 0,
    technique: 'Rapid breathing pattern through the nose, continuous rhythm',
    chips: ['Energise', 'Fatigue', 'Pre-performance'],
    science:
      'Picks you up when you are flat. Use for fatigue, mental clarity, or right before something hard.',
    filePath: 'content/breathwork/08-alkaline-breath.txt',
  },
  {
    id: 'breath-buteyko',
    category: 'breathwork',
    title: 'Buteyko Breathwork',
    subtitle: 'Less breath, more oxygen',
    durationMin: 12,
    theme: 'Counter-intuitive: gentler, slower breathing increases your CO₂ tolerance and your real oxygen delivery.',
    levelRequired: 0,
    technique: 'Nasal breathing with reduced volume and breath retention',
    chips: ['Anxiety', 'Sleep', 'Respiratory'],
    science:
      'Calms anxiety by quieting the breath, not deepening it. Good for sleep, panic, and breathlessness.',
    filePath: 'content/breathwork/09-buteyko-breath.txt',
  },
  {
    id: 'breath-aham-prakasha',
    category: 'breathwork',
    title: 'Aham Prakasha — I Am Light',
    subtitle: 'Conscious connected breath with spiritual intention',
    durationMin: 15,
    theme: 'Connected breathing held with the intention "I am light." Expands awareness beyond the body.',
    levelRequired: 0,
    technique: 'Conscious connected breathing with mantric intention',
    chips: ['Connection', 'Expansion', 'Spiritual'],
    science:
      'Big practice. Opens the heart and raises vibration. Best when you want to drop deeper than the body for a moment.',
    filePath: 'content/breathwork/10-aham-prakasha-breath.txt',
  },
];

export function findBreathworkById(id: string): BreathworkSession | undefined {
  return breathwork.find((b) => b.id === id);
}
