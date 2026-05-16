import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';
import type { User, FeelingKey, ChakraKey, BirthData } from '@/types';

interface UserState {
  user: User;
  setName: (name: string) => void;
  setFeelings: (feelings: FeelingKey[]) => void;
  setQuizAnswer: (questionId: string, value: number) => void;
  setPrimaryChakra: (chakra: ChakraKey) => void;
  setBirthData: (birthData: BirthData) => void;
  completeOnboarding: () => void;
  reset: () => void;
}

const defaultUser: User = {
  id: 'local-user',
  name: undefined,
  email: undefined,
  onboardingComplete: false,
  primaryChakra: undefined,
  feelings: [],
  quizAnswers: {},
  joinedAt: Date.now(),
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: defaultUser,
      setName: (name) =>
        set((state) => ({ user: { ...state.user, name } })),
      setFeelings: (feelings) =>
        set((state) => ({ user: { ...state.user, feelings } })),
      setQuizAnswer: (questionId, value) =>
        set((state) => ({
          user: {
            ...state.user,
            quizAnswers: { ...state.user.quizAnswers, [questionId]: value },
          },
        })),
      setPrimaryChakra: (primaryChakra) =>
        set((state) => ({ user: { ...state.user, primaryChakra } })),
      setBirthData: (birthData) =>
        set((state) => ({ user: { ...state.user, birthData } })),
      completeOnboarding: () =>
        set((state) => ({
          user: { ...state.user, onboardingComplete: true },
        })),
      reset: () => set({ user: defaultUser }),
    }),
    {
      name: 'soma:user',
      storage: createJSONStorage(() => zustandAsyncStorage),
    }
  )
);
