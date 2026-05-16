/**
 * SOMA — Web-safe haptic wrapper.
 *
 * expo-haptics throws on web ("not available on web, are you sure
 * you've linked all the native dependencies properly").
 * This wrapper no-ops on web and swallows errors on native.
 *
 * Usage — drop-in replacement for `import * as Haptics from 'expo-haptics'`:
 *
 *   import * as Haptics from '@/lib/haptic';
 *   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
 */

import { Platform } from 'react-native';

let native: typeof import('expo-haptics') | null = null;
if (Platform.OS !== 'web') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    native = require('expo-haptics');
  } catch {
    native = null;
  }
}

// Re-export the enums so existing call sites keep working
export const ImpactFeedbackStyle = native?.ImpactFeedbackStyle ?? {
  Light: 'light' as const,
  Medium: 'medium' as const,
  Heavy: 'heavy' as const,
  Soft: 'soft' as const,
  Rigid: 'rigid' as const,
};

export const NotificationFeedbackType = native?.NotificationFeedbackType ?? {
  Success: 'success' as const,
  Warning: 'warning' as const,
  Error: 'error' as const,
};

export async function impactAsync(style?: any): Promise<void> {
  if (!native) return;
  try {
    await native.impactAsync(style);
  } catch {
    // swallow — haptics should never crash the app
  }
}

export async function notificationAsync(type?: any): Promise<void> {
  if (!native) return;
  try {
    await native.notificationAsync(type);
  } catch {
    // swallow
  }
}

export async function selectionAsync(): Promise<void> {
  if (!native) return;
  try {
    await native.selectionAsync();
  } catch {
    // swallow
  }
}
