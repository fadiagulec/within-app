/**
 * Within — Today.
 *
 * The home screen. One greeting, one next step, one check-in,
 * three anchors, one path preview. Nothing else.
 *
 * Governed by ONE rule: the user should always see ONE clear next action
 * above the fold. This screen is the answer to "what do I do right now."
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path as SvgPath, Circle as SvgCircle } from 'react-native-svg';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { SkyBackground } from '@/components/SkyBackground';
import { useUserStore } from '@/store/useUserStore';
import { usePathStore } from '@/store/usePathStore';
import { PATH_STAGES, getStage, getPractice } from '@/data/path';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Resting hours';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Late hours';
}

export default function TodayTab() {
  const router = useRouter();
  const name = useUserStore((s) => s.user.name);
  const currentStageId = usePathStore((s) => s.currentStageId);
  const suggestNextPractice = usePathStore((s) => s.suggestNextPractice);
  const markPracticeOpened = usePathStore((s) => s.markPracticeOpened);
  const stageProgress = usePathStore((s) => s.stageProgress);
  const stageCompletedAt = usePathStore((s) => s.stageCompletedAt);

  const greeting = getGreeting();
  const firstName = name?.trim().split(' ')[0] ?? '';
  const stage = getStage(currentStageId)!;
  const next = suggestNextPractice();
  const nextPractice = next ? getPractice(next.stage.id, next.practiceId) : null;
  const nextStage = next?.stage;
  const dayNum = computeDayNum(usePathStore.getState().stageEnteredAt[stage.id]);
  const progress = stageProgress(stage.id);

  function openNext() {
    if (!nextPractice) return;
    markPracticeOpened(nextPractice.id);
    router.push(nextPractice.route as never);
  }

  function companionLine(): string {
    if (!nextPractice) return 'You have walked the full path. Keep returning.';
    if (progress.done === 0 && stage.order === 1) {
      return 'Welcome. The first step is small. Trust the order.';
    }
    if (progress.pct >= 0.6) {
      return `You are close to walking ${stage.name}. One more piece, then we move.`;
    }
    if (progress.done > 0) {
      return `You are walking ${stage.name}. Today: one breath at a time.`;
    }
    return `Stage ${stage.order} — ${stage.name}. Begin where you are.`;
  }

  return (
    <SkyBackground>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top: brand mark + settings */}
        <View style={styles.topBar}>
          <Text style={styles.brandMark}>WITHIN</Text>
          <Pressable
            onPress={() => router.push('/(tabs)/profile' as never)}
            accessibilityRole="button"
            accessibilityLabel="Settings"
            hitSlop={10}
            style={styles.iconBtn}
          >
            <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
              <SvgCircle cx={12} cy={12} r={3} stroke={tokens.semantic.textSecondary} strokeWidth={1.5} />
              <SvgPath
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                stroke={tokens.semantic.textSecondary}
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
        </View>

        {/* Greeting */}
        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>
            {greeting}{firstName ? `, ${firstName}.` : '.'}
          </Text>
          <Text style={styles.locator}>
            Stage {stage.order} · {stage.name}
            {dayNum > 0 ? ` · Day ${dayNum}` : ''}
          </Text>
        </View>

        {/* Companion line */}
        <Text style={styles.companion}>"{companionLine()}"</Text>

        {/* THE ONE THING — today's next practice */}
        {nextPractice && nextStage ? (
          <Pressable
            onPress={openNext}
            accessibilityRole="button"
            accessibilityLabel={`Begin ${nextPractice.title}`}
            style={({ pressed }) => [
              styles.heroCard,
              { borderColor: `${nextStage.color}55` },
              pressed && { opacity: 0.92, transform: [{ scale: 0.995 }] },
            ]}
          >
            <Text style={[styles.heroKicker, { color: nextStage.color }]}>
              TODAY'S PRACTICE
            </Text>
            <Text style={styles.heroTitle}>{nextPractice.title}</Text>
            <Text style={styles.heroBlurb}>{nextPractice.blurb}</Text>
            <View style={styles.heroFoot}>
              <Text style={styles.heroMeta}>
                {nextPractice.durationMin} min
              </Text>
              <View style={[styles.beginBtn, { backgroundColor: nextStage.color }]}>
                <Text style={styles.beginBtnText}>▶  Begin</Text>
              </View>
            </View>
          </Pressable>
        ) : (
          <View style={styles.heroCard}>
            <Text style={styles.heroKicker}>FULL PATH WALKED</Text>
            <Text style={styles.heroTitle}>You have come the full way.</Text>
            <Text style={styles.heroBlurb}>
              The path is finished. Now the path becomes the life. Return any
              time, to any stage, for the practice that calls.
            </Text>
          </View>
        )}

        {/* Mood check-in */}
        <View style={styles.checkInBlock}>
          <Text style={styles.checkInLabel}>How are you, really?</Text>
          <View style={styles.moodRow}>
            {MOODS.map((m) => (
              <Pressable
                key={m.key}
                onPress={() => router.push('/check-in' as never)}
                accessibilityRole="button"
                accessibilityLabel={m.label}
                style={({ pressed }) => [
                  styles.moodBtn,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={styles.moodEmoji}>{m.emoji}</Text>
                <Text style={styles.moodLabel}>{m.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Three anchors */}
        <View style={styles.anchorsBlock}>
          <Text style={styles.anchorsLabel}>ANCHORS</Text>
          <View style={styles.anchorsRow}>
            <AnchorChip
              label="Gratitude"
              onPress={() => router.push('/gratitude' as never)}
            />
            <AnchorChip
              label="Journal"
              onPress={() => router.push('/(tabs)/journal' as never)}
            />
            <AnchorChip
              label="SOS Breath"
              onPress={() => router.push('/breathwork/breath-4-7-8' as never)}
            />
          </View>
        </View>

        {/* The path — tiny preview */}
        <Pressable
          onPress={() => router.push('/(tabs)/path' as never)}
          accessibilityRole="button"
          accessibilityLabel="Open the full path"
          style={({ pressed }) => [
            styles.pathPreview,
            pressed && { opacity: 0.88 },
          ]}
        >
          <Text style={styles.pathPreviewLabel}>WHERE YOU ARE ON THE PATH  →</Text>
          <View style={styles.pathDots}>
            {PATH_STAGES.map((s, idx) => {
              const isComplete = !!stageCompletedAt[s.id];
              const isCurrent = s.id === currentStageId;
              const isLast = idx === PATH_STAGES.length - 1;
              return (
                <React.Fragment key={s.id}>
                  <View
                    style={[
                      styles.pathDot,
                      {
                        backgroundColor: isComplete
                          ? s.color
                          : isCurrent
                            ? s.color
                            : 'rgba(45,41,53,0.18)',
                        borderColor: isCurrent ? s.color : 'transparent',
                      },
                      isCurrent && styles.pathDotCurrent,
                    ]}
                  />
                  {!isLast ? <View style={styles.pathLine} /> : null}
                </React.Fragment>
              );
            })}
          </View>
          <View style={styles.pathLabelsRow}>
            {PATH_STAGES.map((s) => (
              <Text
                key={`label-${s.id}`}
                style={[
                  styles.pathStageLabel,
                  s.id === currentStageId && { color: s.color, fontFamily: tokens.fonts.bodyMedium },
                ]}
              >
                {s.name.charAt(0)}
              </Text>
            ))}
          </View>
        </Pressable>
      </ScrollView>
    </SkyBackground>
  );
}

// ──────────── Local helpers ────────────

function computeDayNum(enteredAt?: number): number {
  if (!enteredAt) return 0;
  const days = Math.floor((Date.now() - enteredAt) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, days);
}

const MOODS = [
  { key: 'heavy', emoji: '🌫', label: 'Heavy' },
  { key: 'tender', emoji: '🌊', label: 'Tender' },
  { key: 'steady', emoji: '◯', label: 'Steady' },
  { key: 'open', emoji: '☀️', label: 'Open' },
  { key: 'wired', emoji: '⚡', label: 'Wired' },
] as const;

function AnchorChip({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.anchorChip,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={styles.anchorChipText}>{label}</Text>
    </Pressable>
  );
}

// ──────────── Styles ────────────

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  brandMark: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 3,
    color: tokens.semantic.textSecondary,
  },
  iconBtn: {
    padding: 4,
  },

  greetingBlock: {
    marginBottom: 16,
  },
  greeting: {
    fontFamily: tokens.fonts.display,
    fontSize: 32,
    lineHeight: 38,
    color: tokens.semantic.textPrimary,
  },
  locator: {
    marginTop: 8,
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
  },

  companion: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 25,
    color: tokens.semantic.textSecondary,
    marginBottom: 28,
  },

  heroCard: {
    backgroundColor: 'rgba(255, 252, 250, 0.94)',
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 26,
    marginBottom: 28,
    shadowColor: '#3A3540',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 2,
  },
  heroKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 14,
  },
  heroTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 30,
    lineHeight: 36,
    color: tokens.semantic.textPrimary,
  },
  heroBlurb: {
    marginTop: 8,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textSecondary,
  },
  heroFoot: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroMeta: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 1.2,
    color: tokens.semantic.textTertiary,
  },
  beginBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
  },
  beginBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    letterSpacing: 0.8,
    color: '#FFFFFF',
  },

  checkInBlock: {
    marginBottom: 28,
  },
  checkInLabel: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 17,
    color: tokens.semantic.textPrimary,
    marginBottom: 14,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  moodBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(255, 252, 250, 0.7)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.06)',
  },
  moodEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  moodLabel: {
    fontFamily: tokens.fonts.body,
    fontSize: 11,
    color: tokens.semantic.textSecondary,
  },

  anchorsBlock: {
    marginBottom: 28,
  },
  anchorsLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 2,
    color: tokens.semantic.textTertiary,
    marginBottom: 10,
  },
  anchorsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  anchorChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 252, 250, 0.85)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.08)',
  },
  anchorChipText: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    color: tokens.semantic.textPrimary,
  },

  pathPreview: {
    padding: 18,
    backgroundColor: 'rgba(255, 252, 250, 0.7)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.08)',
  },
  pathPreviewLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
    marginBottom: 14,
  },
  pathDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pathDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pathDotCurrent: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  pathLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(45,41,53,0.12)',
    marginHorizontal: 2,
  },
  pathLabelsRow: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pathStageLabel: {
    fontFamily: tokens.fonts.body,
    fontSize: 10,
    color: tokens.semantic.textTertiary,
    width: 14,
    textAlign: 'center',
  },
});
