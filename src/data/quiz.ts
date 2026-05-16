import { QuizQuestion } from '@/types';

/**
 * 21 quiz questions — 3 per chakra.
 * Slider answers: 0 (disagree) to 100 (agree).
 * Low scores flag the chakra as in need of work.
 */
export const quizQuestions: QuizQuestion[] = [
  // Root
  { id: 'q1', chakra: 'root', prompt: 'I feel safe in my body.', lowLabel: 'Rarely', highLabel: 'Mostly' },
  { id: 'q2', chakra: 'root', prompt: 'I trust there is enough for me.', lowLabel: 'No', highLabel: 'Yes' },
  { id: 'q3', chakra: 'root', prompt: 'I can sit still without fidgeting or bracing.', lowLabel: 'Hard', highLabel: 'Easy' },
  // Sacral
  { id: 'q4', chakra: 'sacral', prompt: 'I let myself want what I want.', lowLabel: 'Rarely', highLabel: 'Often' },
  { id: 'q5', chakra: 'sacral', prompt: 'I feel my emotions as they rise.', lowLabel: 'Numb', highLabel: 'Fluid' },
  { id: 'q6', chakra: 'sacral', prompt: 'Creativity comes easily to me.', lowLabel: 'Blocked', highLabel: 'Flowing' },
  // Solar
  { id: 'q7', chakra: 'solar', prompt: 'I can say no without guilt.', lowLabel: 'No', highLabel: 'Yes' },
  { id: 'q8', chakra: 'solar', prompt: 'I follow through on my own commitments.', lowLabel: 'Rarely', highLabel: 'Always' },
  { id: 'q9', chakra: 'solar', prompt: 'I know what I want and move toward it.', lowLabel: 'Unclear', highLabel: 'Clear' },
  // Heart
  { id: 'q10', chakra: 'heart', prompt: 'I let myself be seen.', lowLabel: 'Guarded', highLabel: 'Open' },
  { id: 'q11', chakra: 'heart', prompt: 'I can feel grief without shutting down.', lowLabel: 'Hard', highLabel: 'Yes' },
  { id: 'q12', chakra: 'heart', prompt: 'I receive love as easily as I give it.', lowLabel: 'No', highLabel: 'Yes' },
  // Throat
  { id: 'q13', chakra: 'throat', prompt: 'I say what I actually mean.', lowLabel: 'Rarely', highLabel: 'Always' },
  { id: 'q14', chakra: 'throat', prompt: 'My voice sounds like me.', lowLabel: 'Performed', highLabel: 'Real' },
  { id: 'q15', chakra: 'throat', prompt: 'I ask for what I need.', lowLabel: 'No', highLabel: 'Yes' },
  // Third Eye
  { id: 'q16', chakra: 'thirdEye', prompt: 'I trust my gut, even when it is inconvenient.', lowLabel: 'Doubt', highLabel: 'Trust' },
  { id: 'q17', chakra: 'thirdEye', prompt: 'I can see situations clearly, not just as I wish they were.', lowLabel: 'Fuzzy', highLabel: 'Clear' },
  { id: 'q18', chakra: 'thirdEye', prompt: 'I am not ruled by my thoughts.', lowLabel: 'Ruled', highLabel: 'Free' },
  // Crown
  { id: 'q19', chakra: 'crown', prompt: 'I sense I am part of something larger.', lowLabel: 'Rarely', highLabel: 'Often' },
  { id: 'q20', chakra: 'crown', prompt: 'I can rest in not-knowing.', lowLabel: 'Hard', highLabel: 'Easy' },
  { id: 'q21', chakra: 'crown', prompt: 'I feel connected to my life, not just running it.', lowLabel: 'Running', highLabel: 'Connected' },
];
