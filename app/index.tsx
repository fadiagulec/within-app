import React from 'react';
import { Redirect } from 'expo-router';
import { useOnboardingStore } from '@/store/useOnboardingStore';

/**
 * Entry routing — single source of truth for the welcome gate.
 *
 * Reads `hasSeenWelcome` from `useOnboardingStore` — the SAME flag that
 * `GatedStack` in app/_layout.tsx watches. Both layers agree, so we don't
 * get the double-redirect flicker that happened when this checked
 * `useUserStore.onboardingComplete` instead.
 *
 * First-ever visit:  hasSeenWelcome=false  → /(welcome)
 * Returning visit:   hasSeenWelcome=true   → /(tabs)
 *
 * The /(welcome) flow itself ends by calling completeWelcome() which sets
 * the flag, so the user never gets bounced back into welcome on the next
 * launch.
 */
export default function Index() {
  const hasSeenWelcome = useOnboardingStore((s) => s.hasSeenWelcome);

  if (!hasSeenWelcome) {
    // Cast — typed-routes hasn't picked up the (welcome) group in its
    // generated route map. The route exists; this is a TS-side gap.
    return <Redirect href={'/(welcome)' as never} />;
  }
  return <Redirect href="/(tabs)" />;
}
