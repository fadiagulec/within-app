/**
 * SOMA — Profile tab
 *
 * Personal home base. The user comes here to remember who they are
 * inside the app — their practice, their journey, their state, their
 * wheel, their settings.
 *
 * Read-only views over the existing stores. No new stores introduced.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Polyline } from 'react-native-svg';
import Constants from 'expo-constants';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens, chakraColors } from '@/theme/tokens';
import { useUserStore } from '@/store/useUserStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useEmotionStore } from '@/store/useEmotionStore';
import { useWheelStore } from '@/store/useWheelStore';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { useJournalStore } from '@/store/useJournalStore';
import { useGratitudeStore } from '@/store/useGratitudeStore';
import { useVisionStore } from '@/store/useVisionStore';
import { usePlanStore } from '@/store/usePlanStore';
import { useCompanionStore } from '@/store/useCompanionStore';
import { useTarotStore } from '@/store/useTarotStore';
import { useHypnotherapyStore } from '@/store/useHypnotherapyStore';
import { LIFE_AREAS } from '@/data/wheel-of-life';
import { GET_UNSTUCK_PROGRAM } from '@/data/get-unstuck-program';
import {
  journeyProgram,
  journeyDays as JOURNEY_DAYS_FULL,
} from '@/data/journey';
import { usePurchaseStore } from '@/features/payments/PurchaseStore';

// ============ HELPERS ============

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isoNDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function initialsOf(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return (parts[0]?.[0] ?? '?').toUpperCase();
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

function memberSince(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

// Hawkins-style score derived from streak + recent emotion entries.
// Range 0–1000; anchored at 350 (acceptance baseline).
function deriveHawkinsScore(args: {
  streak: number;
  recentEmotionVibration?: number;
}): number {
  const base = 350;
  const streakLift = Math.min(args.streak, 30) * 6; // up to +180
  const emoLift =
    args.recentEmotionVibration !== undefined
      ? Math.round((args.recentEmotionVibration - 5) * 18) // 1..10 → -72..+90
      : 0;
  return Math.max(150, Math.min(1000, base + streakLift + emoLift));
}

function hawkinsLabel(score: number): string {
  if (score >= 700) return 'Enlightenment';
  if (score >= 540) return 'Joy';
  if (score >= 500) return 'Love';
  if (score >= 350) return 'Acceptance';
  if (score >= 250) return 'Neutrality';
  if (score >= 200) return 'Courage';
  return 'Working through';
}

// ============ COMPONENT ============

export default function Profile() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const progress = useProgressStore((s) => s.progress);
  const emotionEntries = useEmotionStore((s) => s.entries);
  const wheelLatest = useWheelStore((s) => s.getLatest());
  const hasGetUnstuck = usePurchaseStore((s) => s.hasGetUnstuck());

  const resetUser = useUserStore((s) => s.reset);
  const resetProgress = useProgressStore((s) => s.reset);
  const resetEmotion = useEmotionStore((s) => s.reset);
  const resetWheel = useWheelStore((s) => s.reset);
  const resetOnboarding = useOnboardingStore((s) => s.resetOnboarding);
  const resetJournal = useJournalStore((s) => s.reset);
  const resetGratitude = useGratitudeStore((s) => s.reset);
  const resetVision = useVisionStore((s) => s.reset);
  const resetPlans = usePlanStore((s) => s.reset);
  const resetCompanion = useCompanionStore((s) => s.reset);
  const resetTarot = useTarotStore((s) => s.reset);
  const resetHypno = useHypnotherapyStore((s) => s.reset);

  // ============ Derived state ============

  const initials = initialsOf(user.name);

  const recentEmotionVibration = useMemo<number | undefined>(() => {
    const first = emotionEntries[0];
    return first?.vibration;
  }, [emotionEntries]);

  const hawkinsScore = useMemo(
    () =>
      deriveHawkinsScore({
        streak: progress.currentStreak,
        ...(recentEmotionVibration !== undefined && { recentEmotionVibration }),
      }),
    [progress.currentStreak, recentEmotionVibration]
  );

  // 7-day mini-sparkline data — one bar per day, height = practices done
  const sparkline7 = useMemo(() => {
    const out: { iso: string; count: number; isToday: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const iso = isoNDaysAgo(i);
      const c = progress.checkIns.find((x) => x.date === iso);
      out.push({
        iso,
        count: c?.completedPracticeIds.length ?? 0,
        isToday: i === 0,
      });
    }
    return out;
  }, [progress.checkIns]);

  // Get Unstuck progress
  const unstuckCompleted = progress.journeyDaysCompleted.filter(
    (n) => n >= 1 && n <= 14
  ).length;
  const unstuckStarted = progress.currentJourneyDay > 0 || unstuckCompleted > 0;
  const unstuckTotal = 14;

  // 21-day burnout journey progress
  const burnoutCompleted = progress.journeyDaysCompleted.length;
  const burnoutTotal = JOURNEY_DAYS_FULL.length;

  const lowestArea = useMemo(() => {
    if (!wheelLatest) return undefined;
    return LIFE_AREAS.find((a) => a.id === wheelLatest.lowestArea);
  }, [wheelLatest]);

  // Sparkline path for chakra-tinted line
  const SPARK_W = 220;
  const SPARK_H = 36;
  const sparkMax = Math.max(...sparkline7.map((d) => d.count), 1);
  const sparkPoints = sparkline7
    .map((d, i) => {
      const x = (i / (sparkline7.length - 1)) * SPARK_W;
      const y = SPARK_H - (d.count / sparkMax) * SPARK_H;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  // ============ Handlers ============

  const tap = (fn: () => void) => () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    fn();
  };

  const onSignOut = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Alert.alert(
      'Sign out?',
      'Your local progress will be cleared on this device. Cloud progress (when enabled) is unaffected.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out',
          style: 'destructive',
          onPress: () => {
            resetUser();
            resetProgress();
            resetEmotion();
            resetWheel();
            // Full content reset on sign-out — private content (journal,
            // gratitude, vision board, plan progress) shouldn't follow
            // the previous user if a device is shared.
            resetJournal();
            resetGratitude();
            resetVision();
            resetPlans();
            resetCompanion();
            resetTarot();
            resetHypno();
            // Also reset the welcome-seen flag so the signed-out user
            // gets the same fresh-arrival experience a brand-new user
            // would. Without this they'd skip the welcome flow entirely.
            resetOnboarding();
            router.replace('/(welcome)' as never);
          },
        },
      ]
    );
  };

  const todoStub = (label: string) => () => {
    Haptics.selectionAsync().catch(() => {});
    Alert.alert(label, 'Coming soon. We are keeping the surface clean while we get the depth right.');
  };

  // ============ Render ============

  const friendlyName = user.name && user.name.trim().length > 0 ? user.name : 'friend';
  const memberSinceLabel = memberSince(user.joinedAt);
  const longestMin = Math.round(progress.totalMinutes);

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}>
        {/* Header */}
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          YOU
        </Text>

        {/* Avatar + name + member-since */}
        <View style={styles.identityRow}>
          <View style={styles.avatar}>
            <Text variant="heading2" color={tokens.semantic.textOnGold}>
              {initials}
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text variant="heading1" style={{ marginTop: 2 }}>
              {friendlyName}
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 4 }}
            >
              Member since {memberSinceLabel}
            </Text>
          </View>
        </View>

        {/* Your Practice */}
        <Section label="YOUR PRACTICE">
          <View style={styles.statsGrid}>
            <Stat number={progress.completedSessionIds.length} label="SESSIONS" />
            <Stat number={progress.longestStreak} label="LONGEST" suffix="d" />
            <Stat number={progress.currentStreak} label="CURRENT" suffix="d" />
            <Stat number={longestMin} label="MINUTES" />
          </View>
        </Section>

        {/* Your Journey — programs */}
        <Section label="YOUR JOURNEY">
          <View style={{ gap: 12 }}>
            <ProgramRow
              title={GET_UNSTUCK_PROGRAM.name}
              subtitle={GET_UNSTUCK_PROGRAM.subtitle}
              completed={unstuckCompleted}
              total={unstuckTotal}
              status={
                hasGetUnstuck
                  ? unstuckCompleted === unstuckTotal
                    ? 'COMPLETE'
                    : unstuckStarted
                      ? 'IN PROGRESS'
                      : 'OWNED'
                  : 'NOT STARTED'
              }
              accent={tokens.semantic.accent}
              onPress={tap(() => {
                if (hasGetUnstuck) {
                  router.push('/(tabs)/journey' as never);
                } else {
                  router.push('/paywall-get-unstuck' as never);
                }
              })}
            />
            <ProgramRow
              title={journeyProgram.title}
              subtitle={journeyProgram.subtitle}
              completed={burnoutCompleted}
              total={burnoutTotal}
              status={
                burnoutCompleted === 0
                  ? 'NOT STARTED'
                  : burnoutCompleted >= burnoutTotal
                    ? 'COMPLETE'
                    : 'IN PROGRESS'
              }
              accent={tokens.chakraColors.heart}
              onPress={tap(() => router.push('/journey/overview' as never))}
            />
          </View>
        </Section>

        {/* Your State — Hawkins + sparkline */}
        <Section label="YOUR STATE">
          <Pressable
            onPress={tap(() =>
              Alert.alert(
                'Your State',
                'A daily read of where your field sits today on the Hawkins scale of consciousness. Built from your streak, recent emotion entries, and check-ins. This is a mirror, not a verdict.'
              )
            )}
            style={styles.stateCard}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text variant="mono" color={tokens.semantic.accent} style={{ fontSize: 28 }}>
                  {hawkinsScore}
                </Text>
                <Text
                  variant="bodySmall"
                  color={tokens.semantic.textSecondary}
                  style={{ marginTop: 2 }}
                >
                  {hawkinsLabel(hawkinsScore)}
                </Text>
              </View>
              <View style={styles.sparkWrap}>
                <Svg width={SPARK_W} height={SPARK_H + 6}>
                  <Polyline
                    points={sparkPoints}
                    fill="none"
                    stroke={chakraColors.heart}
                    strokeWidth={1.5}
                    strokeLinejoin="round"
                  />
                </Svg>
                <View style={styles.spark7Bars}>
                  {sparkline7.map((d, i) => {
                    const tint =
                      sparkline7.length > 0
                        ? CHAKRA_TINTS[i % CHAKRA_TINTS.length]
                        : tokens.semantic.textTertiary;
                    const h = Math.max(2, (d.count / sparkMax) * 22);
                    return (
                      <View key={d.iso} style={styles.spark7Col}>
                        <View
                          style={[
                            styles.spark7Bar,
                            {
                              height: h,
                              backgroundColor: d.count === 0 ? tokens.semantic.borderSubtle : tint,
                              opacity: d.count === 0 ? 0.6 : d.isToday ? 1 : 0.7,
                            },
                          ]}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </Pressable>
        </Section>

        {/* Your Wheel */}
        <Section label="YOUR WHEEL">
          {wheelLatest ? (
            <Pressable
              onPress={tap(() => router.push('/(onboarding)/wheel-of-life' as never))}
              style={styles.card}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.wheelMini}>
                  {LIFE_AREAS.map((area, i) => {
                    const score = wheelLatest.scores[area.id] ?? 0;
                    const angle = (i / LIFE_AREAS.length) * Math.PI * 2 - Math.PI / 2;
                    const r = 28 * (score / 10);
                    const x = 36 + Math.cos(angle) * r;
                    const y = 36 + Math.sin(angle) * r;
                    return (
                      <View
                        key={area.id}
                        style={[
                          styles.wheelDot,
                          {
                            left: x - 3,
                            top: y - 3,
                            backgroundColor: area.color,
                          },
                        ]}
                      />
                    );
                  })}
                  <View style={styles.wheelCenter} />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text variant="bodySmall" color={tokens.semantic.textSecondary}>
                    Avg {wheelLatest.average.toFixed(1)} / 10
                  </Text>
                  <Text variant="heading3" style={{ marginTop: 4 }}>
                    {lowestArea?.name ?? 'Balance'} is your edge
                  </Text>
                  <Text
                    variant="bodySmall"
                    color={tokens.semantic.textTertiary}
                    style={{ marginTop: 2 }}
                  >
                    Tap to retake
                  </Text>
                </View>
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={tap(() => router.push('/(onboarding)/wheel-of-life' as never))}
              style={styles.card}
            >
              <Text variant="bodyLarge">Take your first Wheel</Text>
              <Text
                variant="bodySmall"
                color={tokens.semantic.textTertiary}
                style={{ marginTop: 4 }}
              >
                Eight life areas, one honest snapshot.
              </Text>
            </Pressable>
          )}
        </Section>

        {/* 1:1 Work */}
        <Section label="1:1 WORK">
          <Pressable
            onPress={tap(() => router.push('/coaching' as never))}
            style={[styles.card, { borderColor: `${tokens.semantic.accent}55` }]}
          >
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              WORK WITH ME DIRECTLY
            </Text>
            <Text variant="heading3" style={{ marginTop: 6 }}>
              Breathwork · Theta Healing
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 6, lineHeight: 18 }}
            >
              Some healing happens in solitude. Some needs a skilled witness.
            </Text>
            <Text
              variant="body"
              color={tokens.semantic.accent}
              style={{ marginTop: 10 }}
            >
              See offerings →
            </Text>
          </Pressable>
        </Section>

        {/* Settings */}
        <Section label="SETTINGS">
          <View style={styles.settingsList}>
            <SettingsRow label="Edit profile" onPress={todoStub('Edit profile')} />
            <SettingsRow label="Reminders" onPress={todoStub('Reminders')} />
            <SettingsRow
              label="Health check"
              onPress={tap(() => router.push('/burnout-quiz' as never))}
            />
            <SettingsRow
              label="Subscription"
              onPress={tap(() => router.push('/subscribe' as never))}
            />
            <SettingsRow label="Help" onPress={todoStub('Help')} />
            <SettingsRow
              label="Sign out"
              onPress={onSignOut}
              danger
            />
          </View>
        </Section>

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11 }}>
            WITHIN · v{(Constants.expoConfig?.version ?? '0.0.0')}
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textTertiary}
            style={{ marginTop: 6, fontSize: 14 }}
          >
            Made with care.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

// ============ SUB-COMPONENTS ============

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 28 }}>
      <Text variant="eyebrow" style={{ marginBottom: 12 }}>
        {label}
      </Text>
      {children}
    </View>
  );
}

function Stat({
  number,
  label,
  suffix,
}: {
  number: number;
  label: string;
  suffix?: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text variant="mono" color={tokens.semantic.accent} style={{ fontSize: 22 }}>
        {number}
        {suffix ? (
          <Text
            variant="mono"
            color={tokens.semantic.textTertiary}
            style={{ fontSize: 14 }}
          >
            {suffix}
          </Text>
        ) : null}
      </Text>
      <Text variant="eyebrow" style={{ marginTop: 4, fontSize: 10 }}>
        {label}
      </Text>
    </View>
  );
}

function ProgramRow({
  title,
  subtitle,
  completed,
  total,
  status,
  accent,
  onPress,
}: {
  title: string;
  subtitle: string;
  completed: number;
  total: number;
  status: 'OWNED' | 'IN PROGRESS' | 'COMPLETE' | 'NOT STARTED';
  accent: string;
  onPress: () => void;
}) {
  const pct = total > 0 ? completed / total : 0;
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text variant="bodyLarge">{title}</Text>
          <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
            {subtitle}
          </Text>
        </View>
        <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1 }}>
          {status}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.round(pct * 100)}%`, backgroundColor: accent },
          ]}
        />
      </View>
      <Text
        variant="mono"
        color={tokens.semantic.textTertiary}
        style={{ marginTop: 8, fontSize: 11 }}
      >
        {completed} / {total} days
      </Text>
    </Pressable>
  );
}

function SettingsRow({
  label,
  onPress,
  danger,
}: {
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={styles.settingsRow}>
      <Text
        variant="bodyLarge"
        color={danger ? tokens.semantic.errorRust : tokens.semantic.textPrimary}
      >
        {label}
      </Text>
      <Text variant="body" color={tokens.semantic.textTertiary}>
        ›
      </Text>
    </Pressable>
  );
}

// ============ CONSTANTS / STYLES ============

const CHAKRA_TINTS = [
  chakraColors.root,
  chakraColors.sacral,
  chakraColors.solar,
  chakraColors.heart,
  chakraColors.throat,
  chakraColors.thirdEye,
  chakraColors.crown,
];

const styles = StyleSheet.create({
  identityRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: tokens.semantic.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...tokens.shadows.gold,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    flex: 1,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    alignItems: 'flex-start',
  },
  card: {
    padding: 16,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  stateCard: {
    padding: 16,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  sparkWrap: {
    width: 130,
    alignItems: 'flex-end',
  },
  spark7Bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 4,
    height: 22,
  },
  spark7Col: {
    width: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  spark7Bar: {
    width: 6,
    borderRadius: 3,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: tokens.semantic.borderSubtle,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  settingsList: {
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderSubtle,
  },
  wheelMini: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgRaised,
    position: 'relative',
  },
  wheelDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  wheelCenter: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.semantic.accent,
    left: 33,
    top: 33,
  },
  footer: {
    marginTop: 36,
    alignItems: 'center',
  },
});
