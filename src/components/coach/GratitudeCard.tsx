/**
 * GratitudeCard — Today-tab card that surfaces today's gratitude practice.
 *
 * Shows whether the user has captured gratitude today (morning/evening) +
 * the current streak. Tapping the card jumps to the full /gratitude screen
 * for capture.
 *
 * Design rationale: gratitude works because it's a daily ritual, not a
 * one-off. Surfacing it on Today next to the briefing turns it from a
 * destination into a habit.
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { useGratitudeStore } from '@/store/useGratitudeStore';

const ACCENT = '#3F8A5F'; // heart green — gratitude lives at the heart

export function GratitudeCard() {
  const router = useRouter();
  const todayComplete = useGratitudeStore((s) => s.getTodayComplete());
  const streak = useGratitudeStore((s) => s.getStreak());

  const morningDone = todayComplete.morning;
  const eveningDone = todayComplete.evening;
  const fullyDone = morningDone && eveningDone;

  const headline = fullyDone
    ? "Today's gratitude — captured."
    : morningDone
    ? 'Evening reflection awaiting.'
    : eveningDone
    ? 'Morning gratitude awaiting.'
    : 'What are you grateful for today?';

  const sub = fullyDone
    ? streak > 1
      ? `${streak}-day streak. Keep it.`
      : 'Come back this evening for the close.'
    : streak > 0
    ? `${streak}-day streak — do not break it.`
    : 'Three things. One minute. Trains the brain to look for what is working.';

  return (
    <Pressable
      onPress={() => router.push('/gratitude' as never)}
      accessibilityRole="button"
      accessibilityLabel="Open gratitude practice"
      style={[
        styles.card,
        {
          borderColor: `${ACCENT}66`,
          backgroundColor: `${ACCENT}14`,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text variant="mono" color={ACCENT} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            GRATITUDE {streak > 0 ? `· ${streak} DAYS` : ''}
          </Text>
          <Text
            variant="heading3"
            color={tokens.semantic.textPrimary}
            style={{ marginTop: 6, fontSize: 18, lineHeight: 24 }}
          >
            {headline}
          </Text>
          <Text
            variant="bodySmall"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 6, fontSize: 13, lineHeight: 19 }}
          >
            {sub}
          </Text>
        </View>
        <View style={styles.indicator}>
          <View style={styles.dotPair}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: morningDone ? ACCENT : `${ACCENT}33`,
                  borderColor: ACCENT,
                },
              ]}
            />
            <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 9 }}>
              AM
            </Text>
          </View>
          <View style={styles.dotPair}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: eveningDone ? ACCENT : `${ACCENT}33`,
                  borderColor: ACCENT,
                },
              ]}
            />
            <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 9 }}>
              PM
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  indicator: {
    flexDirection: 'row',
    gap: 10,
  },
  dotPair: {
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
  },
});
