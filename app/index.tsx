import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useUserStore } from '@/store/useUserStore';

/**
 * Entry routing — decide between onboarding and tabs.
 */
export default function Index() {
  const onboardingComplete = useUserStore((s) => s.user.onboardingComplete);

  // We can't run side-effects here; routing via <Redirect>.
  useEffect(() => {}, []);

  if (!onboardingComplete) {
    return <Redirect href="/(onboarding)/welcome" />;
  }
  return <Redirect href="/(tabs)" />;
}
