/**
 * SOMA — RevenueCat integration layer
 *
 * Handles in-app purchases for iOS + Android (required by Apple/Google).
 * Covers: Get Unstuck $47, Burnout $97, Chakra programs $19/$97, Elevation $297,
 * Inner Circle $19/mo, Full Library $29/mo.
 *
 * High-ticket ($500+) and retreats are NOT in RevenueCat — Apple's fee makes
 * those prohibitive. Those go through Stripe Payment Links (see stripe.ts).
 *
 * MVP mode: if REVENUECAT_API_KEY is not set, falls back to local stub so
 * dev environment stays functional without RevenueCat configured.
 */

import { Platform } from 'react-native';

// Guard against import-time failure in environments without the native module
// (e.g. Expo web preview, unit tests).
let Purchases: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  Purchases = require('react-native-purchases').default;
} catch {
  // RevenueCat not installed — MVP stub mode is the fallback
}

export type ProductId =
  | 'soma_get_unstuck_47'
  | 'soma_burnout_97'
  | 'soma_chakra_deep_19'
  | 'soma_chakra_bundle_97'
  | 'soma_elevation_297'
  | 'soma_inner_circle_monthly'
  | 'soma_full_library_monthly';

export type EntitlementKey =
  | 'get_unstuck'
  | 'burnout_recovery'
  | 'chakra_deep'
  | 'chakra_bundle'
  | 'elevation_90day'
  | 'inner_circle'
  | 'full_library';

/** Maps Apple/Google product IDs to entitlement keys the app checks against */
export const PRODUCT_TO_ENTITLEMENT: Record<ProductId, EntitlementKey> = {
  soma_get_unstuck_47: 'get_unstuck',
  soma_burnout_97: 'burnout_recovery',
  soma_chakra_deep_19: 'chakra_deep',
  soma_chakra_bundle_97: 'chakra_bundle',
  soma_elevation_297: 'elevation_90day',
  soma_inner_circle_monthly: 'inner_circle',
  soma_full_library_monthly: 'full_library',
};

export interface PurchaseResult {
  ok: boolean;
  entitlement?: EntitlementKey;
  productId?: ProductId;
  error?: string;
  cancelled?: boolean;
}

export interface OfferingInfo {
  productId: ProductId;
  title: string;
  description: string;
  priceString: string;
  isSubscription: boolean;
  periodIso?: string; // e.g. P1M for monthly
}

// ============ INIT ============

let initialized = false;

export function isRevenueCatAvailable(): boolean {
  if (!Purchases) return false;
  const key =
    Platform.OS === 'ios'
      ? process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS
      : process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID;
  return !!key;
}

export async function initRevenueCat(userId?: string): Promise<boolean> {
  if (initialized) return true;
  if (!isRevenueCatAvailable()) {
    if (__DEV__) console.log('[RC] not configured — stub mode');
    return false;
  }

  const key =
    Platform.OS === 'ios'
      ? process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS!
      : process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID!;

  try {
    Purchases.configure({ apiKey: key, appUserID: userId ?? null });
    initialized = true;
    if (__DEV__) console.log('[RC] initialized');
    return true;
  } catch (err) {
    if (__DEV__) console.warn('[RC] init failed:', err);
    return false;
  }
}

export async function identifyUser(userId: string): Promise<void> {
  if (!initialized || !Purchases) return;
  try {
    await Purchases.logIn(userId);
  } catch (err) {
    if (__DEV__) console.warn('[RC] identifyUser failed:', err);
  }
}

// ============ OFFERINGS ============

export async function getOfferings(): Promise<OfferingInfo[]> {
  if (!isRevenueCatAvailable()) return getStubOfferings();

  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings?.current;
    if (!current) return [];

    return (current.availablePackages ?? []).map((pkg: any) => ({
      productId: pkg.product.identifier as ProductId,
      title: pkg.product.title ?? pkg.product.identifier,
      description: pkg.product.description ?? '',
      priceString: pkg.product.priceString ?? `$${pkg.product.price}`,
      isSubscription: pkg.packageType !== 'LIFETIME' && pkg.packageType !== 'CUSTOM',
      periodIso: pkg.product.subscriptionPeriod,
    }));
  } catch (err) {
    if (__DEV__) console.warn('[RC] getOfferings failed:', err);
    return getStubOfferings();
  }
}

/** Stub offerings — used in dev mode when RC not configured */
function getStubOfferings(): OfferingInfo[] {
  return [
    {
      productId: 'soma_get_unstuck_47',
      title: 'Get Unstuck',
      description: '14-day SOMA reset',
      priceString: '$47',
      isSubscription: false,
    },
    {
      productId: 'soma_burnout_97',
      title: '21-Day Burnout Recovery',
      description: 'Deep nervous-system reset',
      priceString: '$97',
      isSubscription: false,
    },
    {
      productId: 'soma_chakra_bundle_97',
      title: 'Full Chakra Library',
      description: 'All 8 energy centres',
      priceString: '$97',
      isSubscription: false,
    },
    {
      productId: 'soma_elevation_297',
      title: '90-Day Elevation',
      description: 'Complete transformation program',
      priceString: '$297',
      isSubscription: false,
    },
    {
      productId: 'soma_inner_circle_monthly',
      title: 'Inner Circle',
      description: 'Unlimited access + monthly content',
      priceString: '$19/mo',
      isSubscription: true,
      periodIso: 'P1M',
    },
    {
      productId: 'soma_full_library_monthly',
      title: 'Full Library Pass',
      description: 'Everything — all programs + future releases',
      priceString: '$29/mo',
      isSubscription: true,
      periodIso: 'P1M',
    },
  ];
}

// ============ PURCHASE ============

export async function purchaseProduct(productId: ProductId): Promise<PurchaseResult> {
  // Stub mode (dev, no RC configured)
  if (!isRevenueCatAvailable()) {
    if (__DEV__) console.log(`[RC-stub] would purchase ${productId}`);
    return {
      ok: true,
      entitlement: PRODUCT_TO_ENTITLEMENT[productId],
      productId,
    };
  }

  try {
    const offerings = await Purchases.getOfferings();
    const pkg = offerings?.current?.availablePackages?.find(
      (p: any) => p.product.identifier === productId
    );
    if (!pkg) {
      return { ok: false, error: `Product ${productId} not found in offerings` };
    }

    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const entitlement = PRODUCT_TO_ENTITLEMENT[productId];
    const active = customerInfo.entitlements.active[entitlement];

    if (active) {
      return { ok: true, entitlement, productId };
    }
    return {
      ok: false,
      error: 'Purchase completed but entitlement not active yet.',
    };
  } catch (err: any) {
    if (err?.userCancelled) {
      return { ok: false, cancelled: true };
    }
    return { ok: false, error: err?.message ?? 'Purchase failed' };
  }
}

// ============ ENTITLEMENTS ============

export async function getActiveEntitlements(): Promise<EntitlementKey[]> {
  if (!isRevenueCatAvailable()) return [];
  try {
    const info = await Purchases.getCustomerInfo();
    return Object.keys(info.entitlements.active) as EntitlementKey[];
  } catch (err) {
    if (__DEV__) console.warn('[RC] getActiveEntitlements failed:', err);
    return [];
  }
}

export async function restorePurchases(): Promise<PurchaseResult> {
  if (!isRevenueCatAvailable()) {
    return { ok: true }; // no-op in stub mode
  }

  try {
    const info = await Purchases.restorePurchases();
    const activeCount = Object.keys(info.entitlements.active).length;
    return {
      ok: true,
      error: activeCount === 0 ? 'No previous purchases found to restore.' : undefined,
    };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? 'Restore failed' };
  }
}

// ============ LISTENER ============

type Listener = (entitlements: EntitlementKey[]) => void;

export function onEntitlementsChanged(cb: Listener): () => void {
  if (!isRevenueCatAvailable()) return () => {};
  try {
    Purchases.addCustomerInfoUpdateListener((info: any) => {
      cb(Object.keys(info.entitlements.active) as EntitlementKey[]);
    });
  } catch (err) {
    if (__DEV__) console.warn('[RC] listener attach failed:', err);
  }
  return () => {
    // RC does not expose a clean remove API across versions — no-op on unmount
  };
}
