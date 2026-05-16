/**
 * PurchaseStore
 * -------------
 * Local-state payment store for the MVP.
 * - Tracks which paid levels have been purchased.
 * - Persists via AsyncStorage.
 *
 * ▶ INTEGRATION POINTS for real payments (see README.md):
 *   - Replace `purchaseLevel()` with a RevenueCat / Stripe call.
 *   - On success callback, call the same `unlockLevel(levelId)` we already call.
 *   - `restorePurchases()` should query the provider and re-unlock.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from '@/store/storage';

export interface PurchaseRecord {
  levelId: number;
  productId: string;
  priceUSD: number;
  purchasedAt: number;
  source: 'stub' | 'revenuecat' | 'stripe';
}

interface PurchaseState {
  purchases: PurchaseRecord[];
  /**
   * MVP stub: just records the purchase locally. Replace with real provider.
   */
  purchaseLevel: (
    levelId: number,
    opts?: { productId?: string; priceUSD?: number }
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  restorePurchases: () => Promise<{ ok: true; count: number }>;
  isLevelUnlocked: (levelId: number) => boolean;
  /**
   * True if the user owns the flagship Get Unstuck program (Level 1,
   * productId `soma_get_unstuck_47`). Cheap selector — safe to call from
   * UI render paths.
   */
  hasGetUnstuck: () => boolean;
  reset: () => void;
}

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set, get) => ({
      purchases: [],
      purchaseLevel: async (levelId, opts) => {
        try {
          // TODO [real-payment]: call RevenueCat `Purchases.purchaseProduct(productId)`
          // or open a Stripe Payment Link. On success, record it below.
          const record: PurchaseRecord = {
            levelId,
            productId: opts?.productId ?? `level_${levelId}`,
            priceUSD: opts?.priceUSD ?? 0,
            purchasedAt: Date.now(),
            source: 'stub',
          };
          set((state) => ({
            purchases: state.purchases.find((p) => p.levelId === levelId)
              ? state.purchases
              : [...state.purchases, record],
          }));
          return { ok: true as const };
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Unknown error';
          return { ok: false as const, error: msg };
        }
      },
      restorePurchases: async () => {
        // TODO [real-payment]: call `Purchases.restorePurchases()` and merge results.
        return { ok: true as const, count: get().purchases.length };
      },
      // ⚠️ DEV PREVIEW: every level reads as unlocked + GetUnstuck always
      // returns true so the user can browse all paid material. Restore the
      // real `purchases.some(...)` checks before re-enabling the paywall.
      isLevelUnlocked: (_levelId) => true,
      hasGetUnstuck: () => true,
      reset: () => set({ purchases: [] }),
    }),
    {
      name: 'soma:purchases',
      storage: createJSONStorage(() => zustandAsyncStorage),
    }
  )
);
