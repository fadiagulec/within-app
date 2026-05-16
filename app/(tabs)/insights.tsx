/**
 * Insights tab — patterns the app sees in YOUR data.
 *
 * v1: surfaces Wheel of Life delta, lowest-scoring area, completed sessions
 * count, streak. Computed from existing stores.
 *
 * v2: chart-aware insights ("Mercury retrograde in your 3rd house — communications
 * are extra-charged this week"), 21-day plan progress, journal sentiment.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { useWheelStore } from '@/store/useWheelStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useGratitudeStore } from '@/store/useGratitudeStore';
import { CHAKRA_SPINE_ORDERED, getChakraByLifeArea } from '@/data/chakra-spine';
import { LIFE_AREAS } from '@/data/wheel-of-life';

export default function InsightsTab() {
  const latestWheel = useWheelStore((s) => s.getLatest());
  const wheelTrend = useWheelStore((s) => s.getTrend());
  const completed = useProgressStore((s) => s.progress.completedSessionIds);
  const streak = useProgressStore((s) => s.progress.currentStreak);
  const gratitudeStreak = useGratitudeStore((s) => s.getStreak());

  const lowestAreaDef = latestWheel
    ? LIFE_AREAS.find((a) => a.id === latestWheel.lowestArea)
    : undefined;

  return (
    <InsideBackground>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>INSIGHTS</Text>
          <Text style={styles.h1}>What the app sees{'\n'}about you.</Text>
        </View>

        {latestWheel ? (
          <View style={styles.card}>
            <Text style={styles.kicker}>WHEEL OF LIFE · LATEST</Text>
            <Text style={styles.bigNumber}>{latestWheel.average.toFixed(1)}<Text style={styles.bigNumberSuffix}> / 10</Text></Text>
            <Text style={styles.bigSub}>average across 8 life areas</Text>
            {lowestAreaDef ? (
              <View style={styles.subStat}>
                <Text style={styles.subStatLabel}>Lowest:</Text>
                <Text style={styles.subStatValue}>
                  {lowestAreaDef.name} · {latestWheel.scores[lowestAreaDef.id]}/10
                </Text>
              </View>
            ) : null}
            {wheelTrend ? (
              <View style={styles.subStat}>
                <Text style={styles.subStatLabel}>Change since first wheel:</Text>
                <Text style={[styles.subStatValue, { color: wheelTrend.averageDelta >= 0 ? tokens.semantic.successSage : tokens.semantic.errorRust }]}>
                  {wheelTrend.averageDelta >= 0 ? '+' : ''}{wheelTrend.averageDelta.toFixed(1)}
                </Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.kicker}>WHEEL OF LIFE</Text>
            <Text style={styles.body}>
              You have not taken the Wheel yet. The app starts personalizing once you do.
            </Text>
          </View>
        )}

        {/* Practice streak */}
        <View style={styles.row}>
          <View style={[styles.cardSmall, { flex: 1 }]}>
            <Text style={styles.kickerSmall}>PRACTICE STREAK</Text>
            <Text style={styles.bigNumberSmall}>{streak}</Text>
            <Text style={styles.bigSubSmall}>days in a row</Text>
          </View>
          <View style={[styles.cardSmall, { flex: 1 }]}>
            <Text style={styles.kickerSmall}>GRATITUDE STREAK</Text>
            <Text style={styles.bigNumberSmall}>{gratitudeStreak}</Text>
            <Text style={styles.bigSubSmall}>days</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.cardSmall, { flex: 1 }]}>
            <Text style={styles.kickerSmall}>SESSIONS DONE</Text>
            <Text style={styles.bigNumberSmall}>{completed.length}</Text>
            <Text style={styles.bigSubSmall}>completed</Text>
          </View>
          <View style={[styles.cardSmall, { flex: 1 }]}>
            <Text style={styles.kickerSmall}>CHAKRAS</Text>
            <Text style={styles.bigNumberSmall}>{CHAKRA_SPINE_ORDERED.length}</Text>
            <Text style={styles.bigSubSmall}>energy centres</Text>
          </View>
        </View>

        {/* Active focus */}
        {lowestAreaDef ? (
          <View style={styles.card}>
            <Text style={styles.kicker}>YOUR CURRENT FOCUS</Text>
            <Text style={styles.body}>
              Your lowest Wheel area is <Text style={styles.bodyBold}>{lowestAreaDef.name}</Text>.
              The app is routing you to{' '}
              <Text style={styles.bodyBold}>
                {getChakraByLifeArea(lowestAreaDef.id === 'health' ? 'Physical Health' : lowestAreaDef.name as never).name}
              </Text>
              {' '}centre practices until that score rises.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </InsideBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  eyebrow: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 3,
    color: tokens.semantic.accent,
    marginBottom: 12,
  },
  h1: {
    fontFamily: tokens.fonts.display,
    fontSize: 30,
    lineHeight: 38,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 22,
    padding: 22,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  cardSmall: {
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  kicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    color: tokens.semantic.accent,
    marginBottom: 12,
  },
  kickerSmall: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    color: tokens.semantic.accent,
    marginBottom: 8,
  },
  bigNumber: {
    fontFamily: tokens.fonts.display,
    fontSize: 56,
    lineHeight: 60,
    color: tokens.semantic.textPrimary,
  },
  bigNumberSuffix: {
    fontFamily: tokens.fonts.display,
    fontSize: 22,
    color: tokens.semantic.textTertiary,
  },
  bigNumberSmall: {
    fontFamily: tokens.fonts.display,
    fontSize: 36,
    color: tokens.semantic.textPrimary,
    lineHeight: 40,
  },
  bigSub: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    color: tokens.semantic.textSecondary,
    marginTop: 4,
  },
  bigSubSmall: {
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    color: tokens.semantic.textSecondary,
    marginTop: 4,
  },
  subStat: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  subStatLabel: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    color: tokens.semantic.textSecondary,
  },
  subStatValue: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    color: tokens.semantic.textPrimary,
  },
  body: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
  },
  bodyBold: {
    fontFamily: tokens.fonts.bodyMedium,
    color: tokens.semantic.accent,
  },
});
