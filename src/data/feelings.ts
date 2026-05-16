import { Feeling, EmotionColor } from '@/types';

/**
 * SOMA — The 7 chakra core emotions.
 * Each onboarding feeling maps directly to a chakra → its release work.
 * User multi-selects what feels true. The most-selected chakra becomes
 * their primary blocked centre.
 */
export const feelings: Feeling[] = [
  {
    key: 'anxiety',
    label: 'Anxiety',
    description: 'Wired. Mind racing. Body cannot settle.',
    color: '#6B1F1F', // Root — same as Fear (surface vs depth, same chakra)
    recommendedChakra: 'root',
  },
  {
    key: 'fear',
    label: 'Fear',
    description: 'Bracing. Old. Quieter than anxiety, but underneath.',
    color: '#6B1F1F',
    recommendedChakra: 'root',
  },
  {
    key: 'guilt',
    label: 'Guilt',
    description: 'Apologising for existing. Carrying what is not yours.',
    color: '#C2712C',
    recommendedChakra: 'sacral',
  },
  {
    key: 'shame',
    label: 'Shame',
    description: 'Not enough. Small. Quiet voice that asks who you think you are.',
    color: '#D9B24C',
    recommendedChakra: 'solar',
  },
  {
    key: 'grief',
    label: 'Grief',
    description: 'A loss. A leaving. Love with nowhere to go.',
    color: '#6B8F71',
    recommendedChakra: 'heart',
  },
  {
    key: 'suppressed',
    label: 'Suppressed',
    description: 'Words that stay stuck in the throat. Truth you swallowed.',
    color: '#3E6A8C',
    recommendedChakra: 'throat',
  },
  {
    key: 'doubt',
    label: 'Doubt',
    description: 'Foggy. Spinning. Outsourcing your knowing.',
    color: '#3B3564',
    recommendedChakra: 'thirdEye',
  },
  {
    key: 'separation',
    label: 'Separation',
    description: 'Lonely even in a crowd. Cut off from something larger.',
    color: '#8A7AA8',
    recommendedChakra: 'crown',
  },
];

/**
 * 12-color emotion palette for the journal.
 * Charge = energetic register, not good/bad.
 */
export const emotionColors: EmotionColor[] = [
  { key: 'rust', label: 'Anger', hex: '#A05A3E', charge: 'high' },
  { key: 'ember', label: 'Frustrated', hex: '#C2712C', charge: 'high' },
  { key: 'amber', label: 'Restless', hex: '#D9B24C', charge: 'mid' },
  { key: 'gold', label: 'Open', hex: '#C9A96E', charge: 'high' },
  { key: 'sage', label: 'Calm', hex: '#6B8F71', charge: 'mid' },
  { key: 'moss', label: 'Grounded', hex: '#4A6A4F', charge: 'mid' },
  { key: 'ocean', label: 'Sad', hex: '#3E6A8C', charge: 'low' },
  { key: 'dusk', label: 'Heavy', hex: '#3B3564', charge: 'low' },
  { key: 'violet', label: 'Expansive', hex: '#8A7AA8', charge: 'high' },
  { key: 'bone', label: 'Numb', hex: '#EAE4D6', charge: 'low' },
  { key: 'ash', label: 'Tired', hex: '#8A8A8F', charge: 'low' },
  { key: 'obsidian', label: 'Shut', hex: '#1F1F22', charge: 'low' },
];
