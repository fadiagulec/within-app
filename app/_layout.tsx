import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, SplashScreen } from 'expo-router';
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

SplashScreen.preventAutoHideAsync().catch(() => {});

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

  useEffect(() => {
    if (loaded || fontTimeoutPassed) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, fontTimeoutPassed]);

  // TODO [real-payment]: initialize RevenueCat here:
  //   import Purchases from 'react-native-purchases';
  //   Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_RC_KEY! });

  // Render the app once fonts load OR after the 1.5s safety timeout —
  // whichever comes first. No more infinite spinner if font assets 404.
  if (!loaded && !fontTimeoutPassed) {
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
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: tokens.semantic.bgBase },
                animation: 'fade',
              }}
            >
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
            </ThemeProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
