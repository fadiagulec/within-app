/**
 * Vision Board Store — persisted intentions.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from './storage';

export type VisionCategory = 'love' | 'health' | 'wealth' | 'purpose';

export interface VisionIntention {
  id: string;
  category: VisionCategory;
  title: string;
  description?: string;
  imageUri?: string;
  targetDate?: string; // yyyy-mm-dd
  color: string;
  createdAt: number;
  completed?: boolean;
}

interface VisionState {
  intentions: VisionIntention[];
  addIntention: (i: Omit<VisionIntention, 'id' | 'createdAt'>) => string;
  updateIntention: (id: string, patch: Partial<VisionIntention>) => void;
  removeIntention: (id: string) => void;
  reset: () => void;
}

export const CATEGORY_COLORS: Record<VisionCategory, string> = {
  love: '#A05A3E',
  health: '#6B8F71',
  wealth: '#D9B24C',
  purpose: '#8A7AA8',
};

export const CATEGORY_LABELS: Record<VisionCategory, string> = {
  love: 'Love',
  health: 'Health',
  wealth: 'Wealth',
  purpose: 'Purpose',
};

export const useVisionStore = create<VisionState>()(
  persist(
    (set) => ({
      intentions: [],
      addIntention: (i) => {
        const id = `vis-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        set((state) => ({
          intentions: [
            {
              id,
              createdAt: Date.now(),
              ...i,
            },
            ...state.intentions,
          ],
        }));
        return id;
      },
      updateIntention: (id, patch) =>
        set((state) => ({
          intentions: state.intentions.map((v) => (v.id === id ? { ...v, ...patch } : v)),
        })),
      removeIntention: (id) =>
        set((state) => ({
          intentions: state.intentions.filter((v) => v.id !== id),
        })),
      reset: () => set({ intentions: [] }),
    }),
    {
      name: 'soma:vision',
      storage: createJSONStorage(() => zustandAsyncStorage),
      version: 1,
      migrate: (state) => state as VisionState,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== 'object') return current;
        const p = persisted as Partial<VisionState>;
        return {
          ...current,
          ...p,
          intentions: Array.isArray(p.intentions) ? p.intentions : current.intentions,
        };
      },
    }
  )
);
