/**
 * Within — Welcome flow layout.
 *
 * A 4-screen onboarding stack that sits BEFORE the (tabs) group.
 * Tells the story of what Within is, what you'll do here, and asks
 * for one small action (the Wheel of Life) before dropping the user
 * into Today.
 *
 * Always shown on first launch. Skippable from any screen.
 * Once seen (skipped or completed), the user is routed straight to
 * (tabs)/ from the root layout.
 */

import React from 'react';
import { Stack } from 'expo-router';

export default function WelcomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Use a fade so the gradient backgrounds blend rather than slide,
        // which fits the "story" feel of the flow better than a hard push.
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="what-this-is" />
      <Stack.Screen name="what-youll-do" />
      <Stack.Screen name="first-step" />
    </Stack>
  );
}
