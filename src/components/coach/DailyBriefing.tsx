/**
 * DailyBriefing — the Today-tab card that surfaces the Coach Engine output.
 *
 * Pure UI. Reads useWheelStore + useProgressStore, calls buildDailyBriefing(),
 * renders the briefing + 3-step protocol + affirmation.
 *
 * Voice rule: sharp, lead with the verb, no "embark on your sacred journey".
 */
import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { useWheelStore } from '@/store/useWheelStore';
import { useProgressStore } from '@/store/useProgressStore';
import { buildDailyBriefing } from '@/coach';

export function DailyBriefing() {
  const router = useRouter();
  const latestWheel = useWheelStore((s) => s.getLatest());
  const completedSessionIds = useProgressStore(
    (s) => s.progress.completedSessionIds
  );

  const out = useMemo(
    () =>
      buildDailyBriefing({
        latestWheel,
        completedSessionIds,
      }),
    [latestWheel, completedSessionIds]
  );

  const accent = out.primaryChakra.color;

  function startBreath() {
    router.push({
      pathname: '/session/[id]',
      params: { id: out.protocol.breathwork.id },
    });
  }

  function startMeditation() {
    if (!out.protocol.meditation) return;
    router.push({
      pathname: '/session/[id]',
      params: { id: out.protocol.meditation.id },
    });
  }

  return (
    <View style={[styles.card, { borderColor: `${accent}55`, backgroundColor: `${accent}14` }]}>
      {/* Header — chakra chip + total minutes */}
      <View style={styles.headerRow}>
        <View style={[styles.chakraChip, { backgroundColor: `${accent}33`, borderColor: accent }]}>
          <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
            {out.primaryChakra.name.toUpperCase()} · {out.primaryChakra.frequencyHz ?? '—'}Hz
          </Text>
        </View>
        <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 12 }}>
          {out.protocol.totalMinutes} MIN
        </Text>
      </View>

      {/* Headline + detail */}
      <Text
        variant="heading2"
        color={tokens.semantic.textPrimary}
        style={{ marginTop: 14, fontSize: 24, lineHeight: 32 }}
      >
        {out.briefingHeadline}
      </Text>
      <Text
        variant="body"
        color={tokens.semantic.textSecondary}
        style={{ marginTop: 8, fontSize: 15, lineHeight: 22 }}
      >
        {out.briefingDetail}
      </Text>

      {/* The 3-step protocol */}
      <View style={styles.steps}>
        {/* Step 1 — breathwork */}
        <Pressable
          onPress={startBreath}
          style={[styles.step, { borderColor: `${accent}55` }]}
          accessibilityRole="button"
          accessibilityLabel={`Begin ${out.protocol.breathwork.title}, ${out.protocol.breathwork.durationMin} minutes`}
        >
          <Text variant="mono" color={accent} style={{ fontSize: 10, letterSpacing: 1.5 }}>
            STEP 1 · BREATH
          </Text>
          <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ marginTop: 4, fontSize: 17 }}>
            {out.protocol.breathwork.title}
          </Text>
          <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 4, fontSize: 13 }}>
            {out.protocol.breathwork.durationMin} min · {out.protocol.breathwork.science}
          </Text>
        </Pressable>

        {/* Step 2 — meditation (if any) */}
        {out.protocol.meditation ? (
          <Pressable
            onPress={startMeditation}
            style={[styles.step, { borderColor: `${accent}55` }]}
            accessibilityRole="button"
            accessibilityLabel={`Begin ${out.protocol.meditation.title}, ${out.protocol.meditation.durationMin} minutes`}
          >
            <Text variant="mono" color={accent} style={{ fontSize: 10, letterSpacing: 1.5 }}>
              STEP 2 · PRACTICE
            </Text>
            <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ marginTop: 4, fontSize: 17 }}>
              {out.protocol.meditation.title}
            </Text>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 4, fontSize: 13 }}>
              {out.protocol.meditation.durationMin} min · {out.protocol.meditation.theme}
            </Text>
          </Pressable>
        ) : null}

        {/* Step 3 — journal prompt */}
        <View style={[styles.step, { borderColor: `${accent}55` }]}>
          <Text variant="mono" color={accent} style={{ fontSize: 10, letterSpacing: 1.5 }}>
            STEP 3 · JOURNAL
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textPrimary}
            style={{ marginTop: 6, fontSize: 18, lineHeight: 26 }}
          >
            {out.protocol.journalPrompt}
          </Text>
        </View>
      </View>

      {/* Today's affirmation */}
      <View style={[styles.affirmCard, { borderColor: `${accent}66`, backgroundColor: `${accent}1F` }]}>
        <Text variant="mono" color={accent} style={{ fontSize: 10, letterSpacing: 1.8, marginBottom: 6 }}>
          TODAY'S AFFIRMATION
        </Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textPrimary}
          style={{ fontSize: 19, lineHeight: 28 }}
        >
          {out.affirmation}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chakraChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  steps: {
    marginTop: 22,
    gap: 12,
  },
  step: {
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
  },
  affirmCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
});
