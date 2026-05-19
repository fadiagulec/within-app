/**
 * Plan day runner — Day N of plan X.
 *
 * Renders today's affirmation + 3-step protocol (breath / practice / journal).
 * Tapping a step opens the right session screen.
 * "Mark day complete" advances the plan.
 *
 * Routes:
 *   /plan/letting-go-of-the-past/day/1
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { tokens } from '@/theme/tokens';
import { getPlan } from '@/data/plans';
import { CHAKRA_SPINE } from '@/data/chakra-spine';
import { breathwork } from '@/data/breathwork';
import { meditations } from '@/data/meditations';
import { usePlanStore } from '@/store/usePlanStore';
import { getNrmScriptForDay, NRM_SCRIPT_DURATION_MIN } from '@/data/nrm-script';

export default function PlanDayRunner() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string | string[];
    n: string | string[];
  }>();
  const planId = Array.isArray(params.id) ? params.id[0] : params.id;
  const dayN = Number(Array.isArray(params.n) ? params.n[0] : params.n);

  const plan = planId ? getPlan(planId) : undefined;
  const day = plan?.days.find((d) => d.day === dayN);

  const completeDay = usePlanStore((s) => s.completeDay);
  const isDayCompleted = usePlanStore((s) => s.isDayCompleted);

  function goBack() {
    if (router.canGoBack()) router.back();
    else if (planId) router.replace({ pathname: '/plan/[id]', params: { id: planId } } as never);
    else router.replace('/(tabs)/plans' as never);
  }

  if (!plan || !day) {
    return (
      <Screen>
        <Text variant="heading2">Day not found.</Text>
        <Button onPress={goBack} style={{ marginTop: 16 }} accessibilityLabel="Go back">
          Back
        </Button>
      </Screen>
    );
  }

  // Narrow refs for closures (TS won't carry the !plan/!day narrowing into them)
  const planRef = plan;
  const dayRef = day;

  const chakra = CHAKRA_SPINE[dayRef.chakraId];
  const accent = chakra.color;
  const breath = breathwork.find((b) => b.id === dayRef.breathworkId);
  const completed = isDayCompleted(planRef.id, dayRef.day);

  // Compute practice display strings (cleaner than inline ternaries)
  let practiceTitle: string;
  let practiceSubtitle: string;
  if (dayRef.practice.kind === 'meditation') {
    const med = meditations.find((m) => m.id === (dayRef.practice as { kind: 'meditation'; id: string }).id);
    practiceTitle = med?.title ?? 'Meditation';
    practiceSubtitle = 'Guided meditation';
  } else if (dayRef.practice.kind === 'unblocking') {
    practiceTitle = `Unblocking — ${chakra.name}`;
    practiceSubtitle = 'Per-chakra unblocking script';
  } else if (dayRef.practice.kind === 'frequency') {
    practiceTitle = `${chakra.name} frequency · ${dayRef.practice.minutes} min`;
    practiceSubtitle = `${chakra.syllable} tone · ${chakra.frequencyHz ?? 'silence'}Hz`;
  } else {
    // hypnotherapy — rendered inline below, not via navigation
    practiceTitle = `NRM Session · ${NRM_SCRIPT_DURATION_MIN} min`;
    practiceSubtitle = 'Mountain · river · armor dissolution · identity install';
  }

  // Pre-build the hypnotherapy script once per render so SpeechPlayer
  // can hand it directly to ElevenLabs without recomputing on every tap.
  // Per-day bespoke scripts dispatch through getNrmScriptForDay; days
  // without a bespoke script fall back to the master template.
  const hypnotherapyScript =
    dayRef.practice.kind === 'hypnotherapy'
      ? getNrmScriptForDay(dayRef.day, {
          armor: dayRef.practice.armor,
          emergedSelf: dayRef.practice.emergedSelf,
        })
      : null;

  function startBreath() {
    if (!breath) return;
    router.push({ pathname: '/session/[id]', params: { id: breath.id } } as never);
  }

  function startPractice() {
    if (dayRef.practice.kind === 'meditation') {
      router.push({ pathname: '/session/[id]', params: { id: dayRef.practice.id } } as never);
    } else if (dayRef.practice.kind === 'unblocking') {
      // Route to the per-chakra unblock script for this day
      router.push({
        pathname: '/unblock/[id]',
        params: { id: dayRef.practice.chakraId },
      } as never);
    } else if (dayRef.practice.kind === 'frequency') {
      // v2: dedicated frequency player. For now route to chakra detail
      // (which is where we'll wire the per-chakra tone in the next task).
      router.push({
        pathname: '/chakra/[id]',
        params: { id: dayRef.practice.chakraId },
      } as never);
    }
    // hypnotherapy: handled inline by SpeechPlayer; no navigation.
  }

  function markDone() {
    completeDay(planRef.id, dayRef.day);
    const nextDay = dayRef.day + 1;
    if (nextDay <= planRef.durationDays) {
      router.replace({
        pathname: '/plan/[id]/day/[n]',
        params: { id: planRef.id, n: String(nextDay) },
      } as never);
    } else {
      router.replace({ pathname: '/plan/[id]', params: { id: planRef.id } } as never);
    }
  }

  const phaseLabel = day.phase.toUpperCase();

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Back to plan"
            hitSlop={10}
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Plan
            </Text>
          </Pressable>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 12 }}>
            DAY {day.day} OF {plan.durationDays}
          </Text>
        </View>

        {/* Hero */}
        <View
          style={[
            styles.hero,
            { borderColor: `${accent}66`, backgroundColor: `${accent}1A` },
          ]}
        >
          <View style={styles.heroChips}>
            <View style={[styles.chip, { backgroundColor: `${accent}33`, borderColor: accent }]}>
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                {phaseLabel}
              </Text>
            </View>
            <View style={[styles.chip, { backgroundColor: `${accent}22`, borderColor: `${accent}88` }]}>
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                {chakra.name.toUpperCase()}
                {chakra.frequencyHz ? ` · ${chakra.frequencyHz}Hz` : ''}
              </Text>
            </View>
          </View>

          <Text variant="heading1" style={{ marginTop: 14, fontSize: 30 }}>
            {day.title}
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 10, fontSize: 16, lineHeight: 24 }}
          >
            {day.intent}
          </Text>
          <View style={{ marginTop: 14 }}>
            <SpeechPlayer
              text={`${day.title}. ${day.intent}. Today's affirmation: ${day.affirmation}. Today's prompt: ${day.journalPrompt}`}
              accent={accent}
              label="LISTEN TO TODAY"
            />
          </View>
        </View>

        {/* Today's affirmation */}
        <View
          style={[
            styles.affirmCard,
            { borderColor: `${accent}66`, backgroundColor: `${accent}1F` },
          ]}
        >
          <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.8, marginBottom: 8 }}>
            TODAY'S AFFIRMATION
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textPrimary}
            style={{ fontSize: 22, lineHeight: 30 }}
          >
            {day.affirmation}
          </Text>
        </View>

        {/* 3-step protocol */}
        <View style={styles.steps}>
          {breath ? (
            <Pressable
              onPress={startBreath}
              style={[styles.step, { borderColor: `${accent}55` }]}
              accessibilityRole="button"
              accessibilityLabel={`Begin breathwork ${breath.title}`}
            >
              <Text variant="mono" color={accent} style={{ fontSize: 10, letterSpacing: 1.5 }}>
                STEP 1 · BREATH
              </Text>
              <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ marginTop: 4, fontSize: 18 }}>
                {breath.title}
              </Text>
              <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 4, fontSize: 13 }}>
                {breath.durationMin} min · {breath.science}
              </Text>
            </Pressable>
          ) : null}

          {hypnotherapyScript ? (
            // Inline hypnotherapy player — NRM sessions don't navigate
            // away; the 11-minute guided script plays right here so the
            // user can stay in the theta state without screen-switching.
            <View style={[styles.step, { borderColor: `${accent}55` }]}>
              <Text variant="mono" color={accent} style={{ fontSize: 10, letterSpacing: 1.5 }}>
                STEP 2 · NRM SESSION
              </Text>
              <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ marginTop: 4, fontSize: 18 }}>
                {practiceTitle}
              </Text>
              <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 4, fontSize: 13 }}>
                {practiceSubtitle}
              </Text>
              <View style={{ marginTop: 14 }}>
                <SpeechPlayer
                  text={hypnotherapyScript}
                  accent={accent}
                  label="BEGIN THE SESSION"
                />
              </View>
            </View>
          ) : (
            <Pressable
              onPress={startPractice}
              style={[styles.step, { borderColor: `${accent}55` }]}
              accessibilityRole="button"
              accessibilityLabel="Begin practice"
            >
              <Text variant="mono" color={accent} style={{ fontSize: 10, letterSpacing: 1.5 }}>
                STEP 2 · PRACTICE
              </Text>
              <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ marginTop: 4, fontSize: 18 }}>
                {practiceTitle}
              </Text>
              <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 4, fontSize: 13 }}>
                {practiceSubtitle}
              </Text>
            </Pressable>
          )}

          <View style={[styles.step, { borderColor: `${accent}55` }]}>
            <Text variant="mono" color={accent} style={{ fontSize: 10, letterSpacing: 1.5 }}>
              STEP 3 · JOURNAL
            </Text>
            <Text
              variant="displayItalic"
              color={tokens.semantic.textPrimary}
              style={{ marginTop: 8, fontSize: 19, lineHeight: 28 }}
            >
              {day.journalPrompt}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" onPress={markDone} accessibilityLabel={completed ? 'Day already complete' : 'Mark day complete'}>
          {completed ? 'Day complete · go to next' : 'Mark day complete'}
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
    padding: 22,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  heroChips: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  affirmCard: {
    margin: 20,
    padding: 18,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
  steps: {
    paddingHorizontal: 20,
    gap: 12,
  },
  step: {
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
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
