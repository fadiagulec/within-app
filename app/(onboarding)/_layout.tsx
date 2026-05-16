import React from 'react';
import { Stack } from 'expo-router';
import { tokens } from '@/theme/tokens';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: tokens.semantic.bgBase },
        animation: 'slide_from_right',
      }}
    />
  );
}
