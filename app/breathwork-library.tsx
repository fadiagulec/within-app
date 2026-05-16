import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import {
  BREATHWORK_NS_LIBRARY,
  NervousSystemEffect,
  BreathworkNervousSystemInfo,
  getQuickRecommendation,
} from '@/data/breathwork-nervous-system';

type FilterKey = 'all' | NervousSystemEffect;

const FILTERS: { id: FilterKey; label: string; sub: string }[] = [
  { id: 'all', label: 'All', sub: '' },
  { id: 'parasympathetic', label: 'Calming', sub: 'Rest & Digest' },
  { id: 'sympathetic', label: 'Activating', sub: 'Wake Up & Energize' },
  { id: 'balancing', label: 'Balancing', sub: 'Center & Regulate' },
];

const QUICK_STATES: { label: string; state: Parameters<typeof getQuickRecommendation>[0] }[] = [
  { label: 'Anxious', state: 'anxious' },
  { label: 'Tired', state: 'tired' },
  { label: 'Angry', state: 'angry' },
  { label: 'Scattered', state: 'scattered' },
  { label: 'Stuck', state: 'stuck' },
  { label: 'Can\'t sleep', state: 'sleep' },
];

export default function BreathworkLibrary() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterKey>('all');

  const selectFilter = (f: FilterKey) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFilter(f);
  };

  const practices =
    filter === 'all'
      ? BREATHWORK_NS_LIBRARY
      : BREATHWORK_NS_LIBRARY.filter((p) => p.effect === filter);

  const pickQuick = (state: Parameters<typeof getQuickRecommendation>[0]) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const rec = getQuickRecommendation(state);
    if (rec) {
      router.push({
        pathname: '/breathwork/[id]',
        params: { id: rec.id },
      });
    }
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/breath');
    }
  };

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={goBack}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>← Back</Text>
        </Pressable>

        <View style={styles.header}>
          <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
            Breathwork Library
          </Text>
          <Text variant="heading1">Breath is a lever for state.</Text>
          <Text variant="body" style={styles.headerBody}>
            Different patterns shift your nervous system in different directions. Know what you need — then pick the breath.
          </Text>
        </View>

        {/* Quick-find section */}
        <View style={styles.quickSection}>
          <Text variant="label" style={styles.sectionLabel}>
            I AM FEELING...
          </Text>
          <View style={styles.quickGrid}>
            {QUICK_STATES.map((s) => (
              <Pressable
                key={s.state}
                onPress={() => pickQuick(s.state)}
                style={styles.quickChip}
                accessibilityRole="button"
                accessibilityLabel={`Recommend a breath practice for feeling ${s.label}`}
              >
                <Text variant="body" style={{ color: tokens.semantic.textPrimary }}>
                  {s.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Filter tabs */}
        <View style={styles.filterTabs}>
          {FILTERS.map((f) => (
            <Pressable
              key={f.id}
              onPress={() => selectFilter(f.id)}
              accessibilityRole="button"
              accessibilityLabel={`Filter: ${f.label}`}
              accessibilityState={{ selected: filter === f.id }}
              style={[
                styles.filterTab,
                filter === f.id && { backgroundColor: tokens.semantic.accent },
              ]}
            >
              <Text
                variant="label"
                style={{
                  color: filter === f.id ? tokens.semantic.bgBase : tokens.semantic.textPrimary,
                }}
              >
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Education banner for the selected filter */}
        {filter !== 'all' && (
          <FilterEducation effect={filter} />
        )}

        {/* Practice list */}
        <View style={styles.list}>
          {practices.length === 0 ? (
            <Text variant="body" style={{ color: tokens.semantic.textSecondary, textAlign: 'center' }}>
              No practices match this filter. Try another.
            </Text>
          ) : (
            practices.map((p) => (
              <PracticeCard
                key={p.id}
                practice={p}
                onPress={() =>
                  router.push({ pathname: '/breathwork/[id]', params: { id: p.id } })
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

function FilterEducation({ effect }: { effect: NervousSystemEffect }) {
  const content: Record<NervousSystemEffect, { title: string; body: string }> = {
    parasympathetic: {
      title: 'What is the Parasympathetic Nervous System?',
      body: 'Often called "rest and digest." When active, your heart rate slows, your muscles soften, your thoughts quiet. Use these breaths when you need to come DOWN — anxiety, insomnia, anger, post-stress recovery.',
    },
    sympathetic: {
      title: 'What is the Sympathetic Nervous System?',
      body: '"Fight or flight." When active, your heart rate rises, your body prepares to move. These breaths give you the activation — but consciously, not reactively. Use for fatigue, morning wake-up, pre-workout, clearing fog.',
    },
    balancing: {
      title: 'What does "Balancing" mean?',
      body: 'These breaths don\'t pull you to either extreme. They regulate between sympathetic and parasympathetic — teaching your system flexibility. Use daily to build long-term resilience, or when you need alert-calm.',
    },
  };
  const c = content[effect];
  return (
    <View style={styles.eduBanner}>
      <Text variant="heading3" style={{ color: tokens.semantic.accent }}>
        {c.title}
      </Text>
      <Text variant="body" style={{ marginTop: tokens.spacing.s2, lineHeight: 22 }}>
        {c.body}
      </Text>
    </View>
  );
}

function PracticeCard({
  practice,
  onPress,
}: {
  practice: BreathworkNervousSystemInfo;
  onPress: () => void;
}) {
  const effectColor: Record<NervousSystemEffect, string> = {
    parasympathetic: '#3E6A8C',   // dusk blue — calm
    sympathetic: '#C2712C',        // amber — fire
    balancing: '#6B8F71',          // sage — balance
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { borderLeftColor: effectColor[practice.effect] }]}
      accessibilityRole="button"
      accessibilityLabel={`${practice.title}, ${practice.effectLabel}, ${practice.duration} minutes`}
      accessibilityHint={practice.shortBenefit}
    >
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text variant="label" style={{ color: effectColor[practice.effect] }}>
            {practice.effectLabel.toUpperCase()} · {practice.duration} MIN
          </Text>
          <Text variant="heading3" style={{ marginTop: 4 }}>
            {practice.title}
          </Text>
        </View>
        <Text variant="heading3" style={{ color: tokens.semantic.accent }}>→</Text>
      </View>
      <Text variant="body" style={styles.cardBenefit}>
        {practice.shortBenefit}
      </Text>
      <Text variant="label" style={styles.cardQuickGuide}>
        {practice.quickGuide}
      </Text>

      {/* When to use chips */}
      <View style={styles.chipRow}>
        {practice.whenToUse.slice(0, 2).map((use, i) => (
          <View key={i} style={styles.chip}>
            <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>
              {use}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: tokens.spacing.s12,
  },
  backBtn: {
    padding: tokens.spacing.s3,
  },
  header: {
    padding: tokens.spacing.s5,
  },
  headerBody: {
    marginTop: tokens.spacing.s3,
    color: tokens.semantic.textSecondary,
    lineHeight: 22,
  },
  quickSection: {
    paddingHorizontal: tokens.spacing.s5,
    marginTop: tokens.spacing.s3,
  },
  sectionLabel: {
    color: tokens.semantic.accent,
    marginBottom: tokens.spacing.s2,
    letterSpacing: 1.5,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.s2,
  },
  quickChip: {
    paddingHorizontal: tokens.spacing.s3,
    paddingVertical: tokens.spacing.s2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    backgroundColor: tokens.semantic.bgElevated,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: tokens.spacing.s5,
    marginTop: tokens.spacing.s8,
    gap: tokens.spacing.s2,
  },
  filterTab: {
    paddingHorizontal: tokens.spacing.s3,
    paddingVertical: tokens.spacing.s2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  eduBanner: {
    margin: tokens.spacing.s5,
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderLeftWidth: 3,
    borderLeftColor: tokens.semantic.accent,
  },
  list: {
    padding: tokens.spacing.s5,
    gap: tokens.spacing.s3,
  },
  card: {
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderLeftWidth: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacing.s3,
  },
  cardBenefit: {
    marginTop: tokens.spacing.s2,
    lineHeight: 22,
  },
  cardQuickGuide: {
    marginTop: tokens.spacing.s2,
    color: tokens.semantic.accent,
    fontFamily: tokens.fonts.mono,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.s2,
    marginTop: tokens.spacing.s3,
  },
  chip: {
    paddingHorizontal: tokens.spacing.s2,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: tokens.semantic.bgBase,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
});
