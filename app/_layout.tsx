/**
 * Within — Root layout.
 *
 * Decides on every app launch whether the user lands in the welcome
 * flow or straight in (tabs). Reads from useOnboardingStore which is
 * persisted to AsyncStorage.
 *
 * Logic:
 *   first ever launch  → (welcome)
 *   skipped welcome    → (tabs)
 *   completed welcome  → (tabs)
 *
 * The "see welcome again" option from the You tab calls
 * useOnboardingStore.resetOnboarding() then router.replace('/(welcome)') —
 * it doesn't need a route, it's a store reset.
 *
 * Beyond the gate, this layout owns the providers, fonts, splash control,
 * and the full Stack of registered screens.
 */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Stack,
  SplashScreen,
  Slot,
  useRouter,
  useSegments,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  useFonts as useCormorantFonts,
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
} from '@expo-google-fonts/jetbrains-mono';

import { ThemeProvider } from '@/theme/ThemeProvider';
import { tokens } from '@/theme/tokens';
import { LoadingView } from '@/components/LoadingView';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { useMorningAffirmationStore } from '@/store/useMorningAffirmationStore';
import { MorningAffirmationSheet } from '@/components/MorningAffirmationSheet';
import { installGlobalErrorReporter } from '@/lib/reportError';

SplashScreen.preventAutoHideAsync().catch(() => {});

// Install one-shot global error handlers on web — catches uncaught
// errors + unhandled promise rejections that React's ErrorBoundary
// can't intercept (async failures, event handler throws, etc.) and
// POSTs them to /api/log-error.
installGlobalErrorReporter();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const [loaded] = useCormorantFonts({
    CormorantGaramond_400Regular,
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
  });

  // Brief safety timeout — if fonts haven't loaded in 1.5s, show the app
  // anyway with the system fallback rather than wait forever (which is
  // exactly what was happening on the deployed build when font assets 404'd).
  // Real fonts swap in seamlessly when they finish loading later.
  const [fontTimeoutPassed, setFontTimeoutPassed] = React.useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFontTimeoutPassed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Wait one tick for zustand's persisted onboarding state to hydrate
  // from AsyncStorage. Otherwise we'd briefly read hasSeenWelcome=false
  // and bounce returning users through the welcome flow.
  const [storeHydrated, setStoreHydrated] = useState(false);
  useEffect(() => {
    const unsub = useOnboardingStore.persist.onFinishHydration(() => {
      setStoreHydrated(true);
    });
    // Also handle the case where hydration already finished before we
    // subscribed (warm starts).
    if (useOnboardingStore.persist.hasHydrated()) {
      setStoreHydrated(true);
    }
    return unsub;
  }, []);

  useEffect(() => {
    if (loaded || fontTimeoutPassed) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, fontTimeoutPassed]);

  // Render the app once fonts load OR after the 1.5s safety timeout —
  // whichever comes first. Hold for store hydration so the welcome-gate
  // doesn't flicker.
  const fontsReady = loaded || fontTimeoutPassed;
  if (!fontsReady || !storeHydrated) {
    return (
      <View style={{ flex: 1, backgroundColor: tokens.semantic.bgBase }}>
        <LoadingView />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: tokens.semantic.bgBase }}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <StatusBar style="dark" />
              <GatedStack />
              <MorningAffirmationGate />
            </ThemeProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

/**
 * MorningAffirmationGate — checks once on app open whether today's
 * affirmation has been shown yet, and pops the sheet if not. Lives
 * outside the GatedStack so it appears regardless of which tab/route
 * the user is on. Will not interrupt the welcome flow — only fires
 * after the user has crossed onboarding.
 */
function MorningAffirmationGate() {
  const segments = useSegments();
  const hasSeenWelcome = useOnboardingStore((s) => s.hasSeenWelcome);
  const shouldShowToday = useMorningAffirmationStore((s) => s.shouldShowToday);
  const [visible, setVisible] = React.useState(false);
  const checkedRef = React.useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    if (!hasSeenWelcome) return;
    // Don't pop the sheet inside the welcome / onboarding groups
    const firstSegment = String(segments?.[0] ?? '');
    if (firstSegment === '(welcome)' || firstSegment === '(onboarding)') return;
    checkedRef.current = true;
    if (shouldShowToday()) {
      // Tiny delay so the app's first paint settles first
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, [hasSeenWelcome, segments, shouldShowToday]);

  return (
    <MorningAffirmationSheet
      visible={visible}
      onClose={() => setVisible(false)}
    />
  );
}

/**
 * Inner component — runs AFTER fonts and onboarding store are hydrated,
 * so it can safely read segments + welcome state to decide whether to
 * redirect a first-time visitor to (welcome). The Stack itself is
 * unchanged from before — only the (welcome) group is added.
 */
function GatedStack() {
  const router = useRouter();
  const segments = useSegments();
  const hasSeenWelcome = useOnboardingStore((s) => s.hasSeenWelcome);

  useEffect(() => {
    if (!segments) return;
    // String-cast because typed-routes hasn't picked up (welcome) yet —
    // it's a new group and only exists in this same compile pass.
    const firstSegment = String(segments[0] ?? '');
    const inWelcomeGroup = firstSegment === '(welcome)';

    // First-time user, but not already in (welcome) → send them there.
    if (!hasSeenWelcome && !inWelcomeGroup) {
      router.replace('/(welcome)' as never);
      return;
    }

    // They've seen welcome but somehow landed inside (welcome) — let them
    // stay (e.g. they tapped "see welcome again" from You).
    // No redirect needed.
  }, [hasSeenWelcome, segments, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: tokens.semantic.bgBase },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="(welcome)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="session/[id]"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="level/[id]" />
      <Stack.Screen name="chakra-wheel" />
      <Stack.Screen name="chakra/[id]" />
      <Stack.Screen name="meditation/[id]" />
      <Stack.Screen name="breathwork/[id]" />
      <Stack.Screen name="full-healing/[id]" />
      <Stack.Screen name="journey/day/[n]" />
      <Stack.Screen name="journey/overview" />
      <Stack.Screen
        name="journal/write"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="journal/entry/[id]" />
      <Stack.Screen name="journal/insights" />
      <Stack.Screen
        name="vision/add"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="burnout-quiz"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="burnout-result"
        options={{ animation: 'fade' }}
      />

      {/* Modal-style screens — slide up, swipe down to dismiss */}
      <Stack.Screen
        name="paywall-get-unstuck"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="subscribe"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="mirror"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="check-in"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />

      {/* Standard push screens */}
      <Stack.Screen name="gratitude" />
      <Stack.Screen name="connecting-to-light" />
      <Stack.Screen name="protecting-your-light" />
      <Stack.Screen name="unblocking-process" />
      <Stack.Screen name="coaching" />
      <Stack.Screen name="learn" />
      <Stack.Screen name="breathwork-library" />
      <Stack.Screen name="tarot/index" />
      <Stack.Screen name="tarot/spread" />
      <Stack.Screen name="tarot/history" />
      <Stack.Screen name="tarot/card/[id]" />
      <Stack.Screen name="hypnotherapy/index" />
      <Stack.Screen name="hypnotherapy/session/[id]" />
      <Stack.Screen name="companion/index" />
      <Stack.Screen name="unblock-session/index" />
      <Stack.Screen name="unblock-session/[chakra]" />

      {/* Purchase flow — back gesture disabled */}
      <Stack.Screen
        name="purchase/success"
        options={{
          gestureEnabled: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="purchase/cancel"
        options={{
          gestureEnabled: false,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
