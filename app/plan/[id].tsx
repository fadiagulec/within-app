/**
 * Plan detail — overview of a single 21-day plan + day-by-day grid.
 *
 * Routes:
 *   /plan/letting-go-of-the-past
 *
 * From here the user can: enroll, see all 21 days, tap any unlocked day to
 * open the per-day runner.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { getPlan } from '@/data/plans';
import { usePlanStore } from '@/store/usePlanStore';
import { CHAKRA_SPINE } from '@/data/chakra-spine';

export default function PlanDetail() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const plan = id ? getPlan(id) : undefined;
  const enroll = usePlanStore((s) => s.enroll);
  const isEnrolled = usePlanStore((s) => s.isEnrolled);
  const getCurrentDay = usePlanStore((s) => s.getCurrentDay);
  const isDayCompleted = usePlanStore((s) => s.isDayCompleted);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/plans' as never);
  }

  if (!plan) {
    return (
      <Screen>
        <Text variant="heading2">Plan not found.</Text>
        <Button onPress={goBack} style={{ marginTop: 16 }} accessibilityLabel="Back to plans">
          Back to plans
        </Button>
      </Screen>
    );
  }

  const planRef = plan; // narrow for closures
  const enrolled = isEnrolled(planRef.id);
  const currentDay = enrolled ? getCurrentDay(planRef.id) : 1;

  function startOrResume() {
    if (!enrolled) enroll(planRef.id);
    router.push({
      pathname: '/plan/[id]/day/[n]',
      params: { id: planRef.id, n: String(Math.min(currentDay, planRef.durationDays)) },
    } as never);
  }

  // Group days by phase for the grid header
  const phases = [
    { key: 'open', label: 'WEEK 1 · OPEN', days: plan.days.filter((d) => d.phase === 'open') },
    { key: 'release', label: 'WEEK 2 · RELEASE', days: plan.days.filter((d) => d.phase === 'release') },
    { key: 'integrate', label: 'WEEK 3 · INTEGRATE', days: plan.days.filter((d) => d.phase === 'integrate') },
  ];

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.header}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={10}
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Back
            </Text>
          </Pressable>
          {enrolled ? (
            <Text variant="mono" color={plan.coverColor} style={{ fontSize: 12 }}>
              DAY {Math.min(currentDay, plan.durationDays)} OF {plan.durationDays}
            </Text>
          ) : null}
        </View>

        {/* Hero */}
        <View
          style={[
            styles.hero,
            { borderColor: `${plan.coverColor}66`, backgroundColor: `${plan.coverColor}1A` },
          ]}
        >
          <Text variant="mono" color={plan.coverColor} style={{ fontSize: 11, letterSpacing: 2 }}>
            {plan.durationDays}-DAY PLAN
          </Text>
          <Text variant="heading1" style={{ marginTop: 8, fontSize: 32 }}>
            {plan.title}
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 10, fontSize: 20 }}
          >
            {plan.tagline}
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textPrimary}
            style={{ marginTop: 16, fontSize: 15, lineHeight: 23 }}
          >
            {plan.description}
          </Text>
        </View>

        {/* Day grid by phase */}
        {phases.map((phase) => (
          <View key={phase.key} style={styles.phaseBlock}>
            <Text
              variant="mono"
              color={tokens.semantic.textTertiary}
              style={{ fontSize: 11, letterSpacing: 2, marginBottom: 12 }}
            >
              {phase.label}
            </Text>
            <View style={styles.dayGrid}>
              {phase.days.map((d) => {
                const completed = isDayCompleted(plan.id, d.day);
                const isCurrent = enrolled && d.day === Math.min(currentDay, plan.durationDays);
                const accent = CHAKRA_SPINE[d.chakraId].color;
                return (
                  <Pressable
                    key={d.day}
                    onPress={() =>
                      router.push({
                        pathname: '/plan/[id]/day/[n]',
                        params: { id: planRef.id, n: String(d.day) },
                      } as never)
                    }
                    style={[
                      styles.dayCell,
                      {
                        borderColor: isCurrent ? accent : `${accent}55`,
                        backgroundColor: completed
                          ? `${accent}40`
                          : isCurrent
                          ? `${accent}22`
                          : `${accent}10`,
                        borderWidth: isCurrent ? 2 : 1,
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Day ${d.day}, ${d.title}${completed ? ', completed' : ''}`}
                  >
                    <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 14 }}>
                      {String(d.day).padStart(2, '0')}
                    </Text>
                    {completed ? (
                      <Text variant="mono" color={accent} style={{ fontSize: 10, marginTop: 2 }}>
                        ✓
                      </Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" onPress={startOrResume}>
          {enrolled
            ? currentDay > plan.durationDays
              ? 'Plan complete · review days'
              : `Continue · Day ${currentDay}`
            : `Start the ${plan.durationDays} days`}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  hero: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  phaseBlock: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  dayCell: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: tokens.semantic.bgBase,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
