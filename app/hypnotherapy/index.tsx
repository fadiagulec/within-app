/**
 * Hypnotherapy hub — the dedicated section.
 *
 * Lists the NRM 28-day flagship program + 5 standalone single-session
 * hypnotherapies. Designed as a destination: come here when you need
 * subconscious work, whether deep (28-day arc) or single-session
 * (specific moment).
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { HYPNOTHERAPY_SESSIONS, MOOD_META } from '@/data/hypnotherapy-sessions';
import { useHypnotherapyStore } from '@/store/useHypnotherapyStore';
import { usePlanStore } from '@/store/usePlanStore';
import { getPlan } from '@/data/plans';

export default function HypnotherapyHub() {
  const router = useRouter();
  const history = useHypnotherapyStore((s) => s.history);
  const lastFor = useHypnotherapyStore((s) => s.lastFor);
  const isEnrolled = usePlanStore((s) => s.isEnrolled);
  const getCurrentDay = usePlanStore((s) => s.getCurrentDay);
  const nrmPlan = getPlan('nrm-28-day');
  const nrmEnrolled = isEnrolled('nrm-28-day');
  const nrmCurrentDay = nrmEnrolled ? getCurrentDay('nrm-28-day') : 1;

  function openSession(id: string) {
    router.push({ pathname: '/hypnotherapy/session/[id]', params: { id } } as never);
  }

  function openNrm() {
    router.push({ pathname: '/plan/[id]', params: { id: 'nrm-28-day' } } as never);
  }

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          HYPNOTHERAPY
        </Text>
      </View>

      <View style={styles.intro}>
        <Text variant="eyebrow" color="#5645A6" style={{ fontSize: 13, letterSpacing: 2.2 }}>
          THE SUBCONSCIOUS
        </Text>
        <Text variant="heading1" style={{ marginTop: 8, fontSize: 38, lineHeight: 46 }}>
          Rewire what{'\n'}you cannot reach{'\n'}with thinking.
        </Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 14, fontSize: 17, lineHeight: 26 }}
        >
          Hypnotherapy works at the layer beneath thought. Where money beliefs, worth imprints, and the body&apos;s old fear-responses actually live.
        </Text>
      </View>

      {/* Flagship NRM 28-day */}
      {nrmPlan ? (
        <Pressable
          onPress={openNrm}
          style={[styles.nrmHero, { borderColor: `${nrmPlan.coverColor}aa` }]}
          accessibilityRole="button"
          accessibilityLabel={`Open NRM 28-day program${nrmEnrolled ? `, currently on day ${nrmCurrentDay}` : ''}`}
        >
          <LinearGradient
            colors={[`${nrmPlan.coverColor}33`, 'transparent']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text variant="mono" color={nrmPlan.coverColor} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            FLAGSHIP · 28 DAYS · ~12 MIN/DAY
          </Text>
          <Text variant="heading1" style={{ marginTop: 10, fontSize: 30, lineHeight: 38 }}>
            {nrmPlan.title}
          </Text>
          <Text variant="displayItalic" color={tokens.semantic.textSecondary} style={{ marginTop: 8, fontSize: 17, lineHeight: 26 }}>
            {nrmPlan.tagline}
          </Text>
          <Text variant="body" color={tokens.semantic.textPrimary} style={{ marginTop: 14, fontSize: 14, lineHeight: 22 }} numberOfLines={4}>
            {nrmPlan.description}
          </Text>
          <View style={styles.nrmFooter}>
            <View style={[styles.nrmCta, { backgroundColor: nrmPlan.coverColor }]}>
              <Text variant="body" color="#FFFFFF" style={{ fontSize: 14 }}>
                {nrmEnrolled ? `Continue · Day ${nrmCurrentDay}` : 'Start the 28 days'} →
              </Text>
            </View>
          </View>
        </Pressable>
      ) : null}

      {/* Standalone sessions */}
      <View style={styles.section}>
        <Text variant="eyebrow" color={tokens.semantic.textTertiary} style={{ fontSize: 12, letterSpacing: 1.8 }}>
          SINGLE SESSIONS
        </Text>
        <Text variant="heading2" style={{ marginTop: 6, fontSize: 22 }}>
          For specific moments
        </Text>
        <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 8, fontSize: 14, lineHeight: 21 }}>
          One-off hypnotherapies. Use as needed — before the big moment, in the racing-mind midnight, when the inner critic is loud.
        </Text>

        <View style={{ marginTop: 18, gap: 12 }}>
          {HYPNOTHERAPY_SESSIONS.map((s) => {
            const completedCount = history.filter((h) => h.sessionId === s.id).length;
            const last = lastFor(s.id);
            const moodMeta = MOOD_META[s.mood];
            return (
              <Pressable
                key={s.id}
                onPress={() => openSession(s.id)}
                style={[styles.sessionCard, { borderColor: `${s.color}55` }]}
                accessibilityRole="button"
                accessibilityLabel={`Open ${s.title} session, ${s.durationMin} minutes`}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text variant="mono" color={s.color} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                    {moodMeta.label.toUpperCase()} · {s.durationMin} MIN
                  </Text>
                  {completedCount > 0 ? (
                    <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 10, letterSpacing: 1 }}>
                      ✓ {completedCount}×
                    </Text>
                  ) : null}
                </View>
                <Text variant="heading3" style={{ marginTop: 8, fontSize: 19 }}>
                  {s.title}
                </Text>
                <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 6, lineHeight: 20 }}>
                  {s.blurb}
                </Text>
                <Text variant="body" color={s.color} style={{ marginTop: 12, fontSize: 13 }}>
                  Begin →
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* History link */}
      {history.length > 0 ? (
        <View style={styles.section}>
          <Text variant="eyebrow" color={tokens.semantic.textTertiary} style={{ fontSize: 12, letterSpacing: 1.8 }}>
            YOUR PRACTICE
          </Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 10, fontSize: 14, lineHeight: 21 }}>
            You have completed{' '}
            <Text variant="body" color="#5645A6" style={{ fontSize: 14 }}>
              {history.length}
            </Text>{' '}
            session{history.length === 1 ? '' : 's'} so far. The work compounds.
          </Text>
        </View>
      ) : null}

      <View style={{ height: 60 }} />
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
  intro: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  nrmHero: {
    margin: 20,
    padding: 22,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
    overflow: 'hidden',
  },
  nrmFooter: {
    marginTop: 20,
    flexDirection: 'row',
  },
  nrmCta: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: tokens.radii.pill,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  sessionCard: {
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
  },
});
