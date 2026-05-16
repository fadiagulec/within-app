/**
 * Within — Stripe Payment Link integration
 *
 * Handles purchases NOT routed through RevenueCat:
 *   - 1:1 Coaching ($997, $1,497) — Apple's 30% fee makes these prohibitive
 *   - Retreats ($1,500 - $25,000+) — application-based, external checkout
 *
 * MVP approach: pre-configured Stripe Payment Links per product.
 * No backend needed. User taps → in-app browser opens Stripe checkout →
 * on success, Stripe redirects to deep link that unlocks in the app.
 *
 * For scale later: replace Payment Links with Checkout Sessions via a backend.
 */

import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';

export type StripeProductKey =
  | 'coaching_breathwork_997'
  | 'coaching_theta_1497'
  | 'retreat_pulse'
  | 'retreat_reset'
  | 'retreat_private';

/** Pull payment links from env. Configure in .env / expo config. */
function getPaymentLink(product: StripeProductKey): string | null {
  const map: Record<StripeProductKey, string | undefined> = {
    coaching_breathwork_997: process.env.EXPO_PUBLIC_STRIPE_LINK_COACHING_BREATHWORK,
    coaching_theta_1497: process.env.EXPO_PUBLIC_STRIPE_LINK_COACHING_THETA,
    retreat_pulse: process.env.EXPO_PUBLIC_STRIPE_LINK_RETREAT_PULSE,
    retreat_reset: process.env.EXPO_PUBLIC_STRIPE_LINK_RETREAT_RESET,
    retreat_private: process.env.EXPO_PUBLIC_STRIPE_LINK_RETREAT_PRIVATE,
  };
  return map[product] ?? null;
}

/**
 * Build checkout URL with client_reference_id for attribution + metadata.
 * Stripe Payment Links accept query params: ?client_reference_id=USER_ID&prefilled_email=EMAIL
 */
export function buildCheckoutUrl(
  product: StripeProductKey,
  userId: string,
  userEmail?: string
): string | null {
  const base = getPaymentLink(product);
  if (!base) return null;

  const params = new URLSearchParams();
  params.set('client_reference_id', userId);
  if (userEmail) params.set('prefilled_email', userEmail);

  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}${params.toString()}`;
}

export interface StripeCheckoutResult {
  ok: boolean;
  dismissed?: boolean;
  error?: string;
}

/**
 * Opens the Stripe checkout in an in-app browser.
 * The browser closes when the user completes OR dismisses.
 * Actual entitlement unlock happens via a deep link (soma://purchase/success)
 * that Stripe is configured to redirect to on success — handled by
 * src/app/purchase/success.tsx.
 */
export async function openStripeCheckout(
  product: StripeProductKey,
  userId: string,
  userEmail?: string
): Promise<StripeCheckoutResult> {
  const url = buildCheckoutUrl(product, userId, userEmail);
  if (!url) {
    return {
      ok: false,
      error:
        'Stripe checkout is not configured. Contact support to complete this purchase.',
    };
  }

  try {
    const result = await WebBrowser.openBrowserAsync(url, {
      dismissButtonStyle: 'close',
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });

    if (result.type === 'cancel' || result.type === 'dismiss') {
      return { ok: true, dismissed: true };
    }
    return { ok: true };
  } catch (err: any) {
    // Fallback: try system browser
    try {
      await Linking.openURL(url);
      return { ok: true, dismissed: true };
    } catch {
      return { ok: false, error: err?.message ?? 'Could not open checkout.' };
    }
  }
}

/**
 * Product metadata for UI rendering — shown on the application / purchase screen.
 * Real prices live in Stripe; these are for display.
 */
export interface StripeProductInfo {
  key: StripeProductKey;
  title: string;
  subtitle: string;
  priceString: string;
  description: string;
  applicationRequired: boolean;
}

export const STRIPE_PRODUCTS: Record<StripeProductKey, StripeProductInfo> = {
  coaching_breathwork_997: {
    key: 'coaching_breathwork_997',
    title: '1:1 Breathwork Coaching',
    subtitle: 'Six private sessions with a Within practitioner',
    priceString: '$997',
    description: 'Custom protocols. Between-session support. Recordings to revisit.',
    applicationRequired: false,
  },
  coaching_theta_1497: {
    key: 'coaching_theta_1497',
    title: '1:1 Theta Healing',
    subtitle: 'Six 75-min sessions of subconscious rewiring',
    priceString: '$1,497',
    description: 'Belief work at the deepest level. For patterns that self-work cannot reach.',
    applicationRequired: false,
  },
  retreat_pulse: {
    key: 'retreat_pulse',
    title: 'Within Pulse',
    subtitle: '3-day intensive · Dubai, London, NYC',
    priceString: '$1,500 – $2,500',
    description: 'A compressed reset for the time-constrained. Max 8 participants.',
    applicationRequired: true,
  },
  retreat_reset: {
    key: 'retreat_reset',
    title: 'Within Reset',
    subtitle: '7-day retreat · Bali, Ibiza, Portugal',
    priceString: '$3,500 – $5,000',
    description: 'The flagship. Full identity reset. Max 12 participants.',
    applicationRequired: true,
  },
  retreat_private: {
    key: 'retreat_private',
    title: 'Within Private',
    subtitle: 'Custom 1-to-2 retreat · your chosen location',
    priceString: '$10,000+',
    description: 'Bespoke. Fully designed around you. Complete privacy.',
    applicationRequired: true,
  },
};

/** Map a pricing tier level ID to either RevenueCat product or Stripe product */
export function getCheckoutRouteForLevel(
  levelId: number
): { type: 'revenuecat'; productId: string } | { type: 'stripe'; productKey: StripeProductKey } | null {
  switch (levelId) {
    case 1:
      return { type: 'revenuecat', productId: 'soma_get_unstuck_47' };
    case 2:
      return { type: 'revenuecat', productId: 'soma_burnout_97' };
    case 3:
      return { type: 'revenuecat', productId: 'soma_chakra_deep_19' };
    case 4:
      return { type: 'revenuecat', productId: 'soma_chakra_bundle_97' };
    case 5:
      return { type: 'revenuecat', productId: 'soma_elevation_297' };
    case 6:
      return { type: 'stripe', productKey: 'coaching_breathwork_997' };
    case 7:
      return { type: 'stripe', productKey: 'coaching_theta_1497' };
    default:
      return null;
  }
}
