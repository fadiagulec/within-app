/**
 * Journey tab — the 21-Day Burnout Recovery flagship.
 */
import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens, chakraColors } from '@/theme/tokens';
import {
  getCurrentDay,
  getDay,
  getWeekMeta,
  journeyProgram,
  referenceToSessionId,
  type JourneyDay,
} from '@/data/journey';
import { useProgressStore } from '@/store/useProgressStore';
import type { ChakraKey } from '@/types';

function chakraColor(key: ChakraKey): string {
  return chakraColors[key];
}

export default function JourneyTab() {
  const router = useRouter();
  const progress = useProgressStore((s) => s.progress);
  const startJourney = useProgressStore((s) => s.startJourney);

  const currentDayNum = progress.currentJourneyDay || 1;
  const day = useMemo(() => getCurrentDay({ currentJourneyDay: currentDayNum }), [currentDayNum]);
  const weekMeta = getWeekMeta(day.week);
  const dayColor = chakraColor(day.chakra);

  function openDay(n: number) {
    router.push({ pathname: '/journey/day/[n]', params: { n: String(n) } });
  }

  function startDay() {
    if (progress.currentJourneyDay === 0) startJourney();
    openDay(day.day);
  }

  function openSession(ref: typeof day.morningPractice) {
    const sid = referenceToSessionId(ref);
    router.push({
      pathname: '/session/[id]',
      params: { id: sid, journeyDay: String(day.day) },
    });
  }

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={styles.top}>
        <Text variant="eyebrow" color={tokens.semantic.accent} style={{ fontSize: 13, letterSpacing: 2.2 }}>
          YOUR 21-DAY BURNOUT RECOVERY
        </Text>
        <Text variant="heading1" style={{ marginTop: 8, fontSize: 42, lineHeight: 50 }}>
          Come back{'\n'}to yourself.
        </Text>
        {weekMeta ? (
          <View
            style={[styles.weekBadge, { borderColor: `${weekMeta.color}88` }]}
          >
            <View
              style={[styles.weekDot, { backgroundColor: weekMeta.color }]}
            />
            <Text variant="eyebrow" color={tokens.semantic.textPrimary} style={{ fontSize: 12, letterSpacing: 1.6 }}>
              WEEK {weekMeta.week} · {weekMeta.theme} · {weekMeta.focus}
            </Text>
          </View>
        ) : null}

        {/* Hero card */}
        <Pressable onPress={startDay}>
          <View style={[styles.heroCard, { borderColor: `${dayColor}aa` }]}>
            <LinearGradient
              colors={[`${dayColor}44`, 'transparent']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Text
              variant="mono"
              color={tokens.semantic.textSecondary}
              style={{ letterSpacing: 2, fontSize: 13 }}
            >
              DAY {day.day} OF 21 · {day.mantra}
            </Text>
            <Text variant="heading2" style={{ marginTop: 10, maxWidth: 320, fontSize: 28, lineHeight: 36 }}>
              {day.dayTitle}
            </Text>
            <Text
              variant="displayItalic"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 14, maxWidth: 340, fontSize: 17, lineHeight: 26 }}
            >
              {day.hook}
            </Text>
            <View style={styles.heroFooter}>
              <View
                style={[styles.chakraDot, { backgroundColor: dayColor }]}
              />
              <Text
                variant="eyebrow"
                color={tokens.semantic.textSecondary}
              >
                {day.chakra.toUpperCase()} FOCUS
              </Text>
              <View style={{ flex: 1 }} />
              <View style={[styles.heroCta, { backgroundColor: tokens.semantic.accent }]}>
                <Text variant="body" color={tokens.semantic.textOnGold}>
                  Start Day {day.day} →
                </Text>
              </View>
            </View>
          </View>
        </Pressable>

        {/* Two sessions */}
        <View style={styles.sessionPair}>
          <SessionTile
            label="MORNING"
            title={day.morningPractice.title}
            duration={day.morningPractice.duration}
            onPress={() => openSession(day.morningPractice)}
            accent={dayColor}
          />
          <SessionTile
            label="EVENING"
            title={day.eveningSession.title}
            duration={day.eveningSession.duration}
            onPress={() => openSession(day.eveningSession)}
            accent={dayColor}
          />
        </View>

        {/* Journaling */}
        <View style={styles.block}>
          <Text variant="eyebrow">JOURNALING</Text>
          <Text
            variant="displayItalic"
            style={{ marginTop: 6, fontSize: 18 }}
            color={tokens.semantic.textPrimary}
          >
            {day.journalingPrompt}
          </Text>
          <Pressable onPress={() => router.push('/journal/write')}>
            <Text
              variant="body"
              color={tokens.semantic.accent}
              style={{ marginTop: 12 }}
            >
              Write →
            </Text>
          </Pressable>
        </View>

        {/* Integration */}
        <View style={styles.block}>
          <Text variant="eyebrow">INTEGRATION · TODAY</Text>
          <Text variant="body" style={{ marginTop: 8, lineHeight: 22 }}>
            {day.integrationAction}
          </Text>
        </View>

        {/* Mini-map */}
        <View style={{ marginTop: 28, marginBottom: 12 }}>
          <View style={styles.mapHeaderRow}>
            <Text variant="eyebrow">THE 21 DAYS</Text>
            <Pressable onPress={() => router.push('/journey/overview')}>
              <Text variant="mono" color={tokens.semantic.accent}>
                See map →
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 8, gap: 10 }}
      >
        {Array.from({ length: 21 }, (_, i) => i + 1).map((n) => {
          const d = getDay(n);
          if (!d) return null;
          const done = progress.journeyDaysCompleted.includes(n);
          const isCurrent = n === day.day;
          // Days ahead of the current cursor are visually softer but
          // fully tappable — every day in the 21-day program is open.
          const future = !done && !isCurrent && n > day.day;
          return (
            <Pressable
              key={n}
              onPress={() => openDay(n)}
              accessibilityRole="button"
              accessibilityLabel={`Open Day ${n}: ${d.dayTitle}`}
              style={[
                styles.mapCard,
                {
                  borderColor: isCurrent
                    ? tokens.semantic.accent
                    : `${chakraColor(d.chakra)}66`,
                  opacity: future ? 0.75 : 1,
                },
                isCurrent && { shadowColor: tokens.semantic.accent, shadowOpacity: 0.4, shadowRadius: 14 },
              ]}
            >
              <View
                style={[
                  styles.mapDot,
                  { backgroundColor: chakraColor(d.chakra) },
                ]}
              />
              <Text variant="mono" color={tokens.semantic.textSecondary} style={{ fontSize: 12, letterSpacing: 1.2 }}>
                DAY {n}
              </Text>
              <Text
                variant="body"
                style={{ marginTop: 6, fontSize: 15, lineHeight: 21 }}
                numberOfLines={2}
              >
                {d.dayTitle}
              </Text>
              {done ? (
                <Text variant="body" color={tokens.semantic.accent} style={{ marginTop: 8, fontSize: 13 }}>
                  ✓ complete
                </Text>
              ) : isCurrent ? (
                <Text variant="body" color={tokens.semantic.accent} style={{ marginTop: 8, fontSize: 13 }}>
                  · current
                </Text>
              ) : (
                <Text variant="body" color={tokens.semantic.textTertiary} style={{ marginTop: 8, fontSize: 13 }}>
                  preview →
                </Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8 }}>
        <Button block size="lg" onPress={startDay}>
          Start Day {day.day} · {day.dayTitle.slice(0, 22)}
        </Button>
        <Text
          variant="bodySmall"
          align="center"
          color={tokens.semantic.textTertiary}
          style={{ marginTop: 10 }}
        >
          {journeyProgram.dailyTimeCommitment}
        </Text>
      </View>
    </Screen>
  );
}

function SessionTile({
  label,
  title,
  duration,
  onPress,
  accent,
}: {
  label: string;
  title: string;
  duration: number;
  onPress: () => void;
  accent: string;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.sessionTile, { borderColor: `${accent}55` }]}>
      <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
        {label} · {duration} MIN
      </Text>
      <Text variant="heading3" style={{ marginTop: 10 }} numberOfLines={3}>
        {title}
      </Text>
      <Text
        variant="body"
        color={accent}
        style={{ marginTop: 12 }}
      >
        Begin →
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  top: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  weekBadge: {
    marginTop: 16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
  },
  weekDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  heroCard: {
    marginTop: 20,
    padding: 24,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
    overflow: 'hidden',
    minHeight: 220,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 22,
  },
  chakraDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  heroCta: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: tokens.radii.pill,
  },
  sessionPair: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  sessionTile: {
    flex: 1,
    padding: 16,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    minHeight: 140,
  },
  block: {
    marginTop: 24,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  mapHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapCard: {
    width: 180,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    minHeight: 140,
  },
  mapDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
});
