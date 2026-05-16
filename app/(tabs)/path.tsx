/**
 * Within — Path tab.
 *
 * The visual journey map. Vertical arc of 7 stages, current stage glowing,
 * future stages dimmed but visible. Tap a stage → opens its detail screen.
 *
 * This is the user's spatial answer to "where am I, and what comes next."
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { PATH_STAGES } from '@/data/path';
import { usePathStore } from '@/store/usePathStore';

export default function PathTab() {
  const router = useRouter();
  const currentStageId = usePathStore((s) => s.currentStageId);
  const isStageComplete = usePathStore((s) => s.isStageComplete);
  const stageProgress = usePathStore((s) => s.stageProgress);

  return (
    <InsideBackground>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>THE PATH</Text>
          <Text style={styles.h1}>
            How to put{'\n'}your life together.
          </Text>
          <Text style={styles.lead}>
            Seven stages, walked in order. You are always somewhere. The next
            step is always one tap away. There is no rush, and there is no
            wrong day to start.
          </Text>
        </View>

        {/* The arc */}
        <View style={styles.arc}>
          {PATH_STAGES.map((stage, idx) => {
            const isCurrent = stage.id === currentStageId;
            const isComplete = isStageComplete(stage.id);
            const progress = stageProgress(stage.id);
            // Guard the lookup — if currentStageId is stale (older
            // persisted store, schema drift), fall back to stage 1 rather
            // than throwing on `.find(...)!`.
            const currentStageOrder =
              (PATH_STAGES.find((s) => s.id === currentStageId) ?? PATH_STAGES[0])?.order ?? 0;
            const isFuture =
              !isComplete && !isCurrent && currentStageOrder < stage.order;
            const isLast = idx === PATH_STAGES.length - 1;

            return (
              <View key={stage.id} style={styles.stageRow}>
                {/* Left rail with dot + connector line */}
                <View style={styles.rail}>
                  <View
                    style={[
                      styles.dot,
                      {
                        borderColor: stage.color,
                        backgroundColor: isComplete
                          ? stage.color
                          : isCurrent
                            ? `${stage.color}40`
                            : '#FFFFFF',
                      },
                      isCurrent && styles.dotCurrent,
                    ]}
                  >
                    {isComplete ? (
                      <Text style={styles.dotCheck}>✓</Text>
                    ) : (
                      <Text style={[styles.dotNumber, { color: isFuture ? '#B7AEB5' : stage.color }]}>
                        {stage.order}
                      </Text>
                    )}
                  </View>
                  {!isLast ? (
                    <View
                      style={[
                        styles.connector,
                        { backgroundColor: isComplete ? stage.color : 'rgba(45, 41, 53, 0.12)' },
                      ]}
                    />
                  ) : null}
                </View>

                {/* Stage card */}
                <Pressable
                  onPress={() =>
                    router.push({ pathname: '/path/[id]', params: { id: stage.id } } as never)
                  }
                  accessibilityRole="button"
                  accessibilityLabel={`Open stage ${stage.order}: ${stage.name}`}
                  style={({ pressed }) => [
                    styles.stageCard,
                    {
                      borderColor: isCurrent
                        ? stage.color
                        : 'rgba(45, 41, 53, 0.08)',
                      opacity: isFuture ? 0.55 : 1,
                    },
                    isCurrent && {
                      backgroundColor: `${stage.color}10`,
                    },
                    pressed && { opacity: isFuture ? 0.5 : 0.88 },
                  ]}
                >
                  <View style={styles.stageHead}>
                    <Text style={[styles.stageKicker, { color: stage.color }]}>
                      STAGE {stage.order} · {stage.durationLabel.toUpperCase()}
                    </Text>
                    {isCurrent ? (
                      <View style={[styles.youAreHere, { borderColor: stage.color }]}>
                        <Text style={[styles.youAreHereText, { color: stage.color }]}>
                          YOU ARE HERE
                        </Text>
                      </View>
                    ) : isComplete ? (
                      <View style={[styles.depthBadge, { borderColor: stage.color, backgroundColor: `${stage.color}18` }]}>
                        <Text style={[styles.depthBadgeText, { color: stage.color }]}>
                          ✦ WALKED
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.stageName}>{stage.name}</Text>
                  <Text style={styles.stageKickerLine}>{stage.kicker}</Text>

                  {/* Progress bar */}
                  {progress.total > 0 ? (
                    <View style={styles.progressWrap}>
                      <View style={styles.progressTrack}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${Math.max(progress.pct * 100, 4)}%`,
                              backgroundColor: stage.color,
                              opacity: progress.done === 0 ? 0 : 1,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {progress.done} of {progress.total} practices
                      </Text>
                    </View>
                  ) : null}
                </Pressable>
              </View>
            );
          })}
        </View>

        {/* Footer note */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            The path is suggested, not required. You can walk it in any order.
            But it lands deeper when followed in sequence.
          </Text>
        </View>

        {/* Browse everything — nothing is hidden */}
        <Pressable
          onPress={() => router.push('/methods' as never)}
          accessibilityRole="button"
          accessibilityLabel="Browse the full healing library"
          style={({ pressed }) => [
            styles.browseAllBtn,
            pressed && { opacity: 0.88 },
          ]}
        >
          <Text style={styles.browseAllKicker}>OR BROWSE EVERYTHING</Text>
          <Text style={styles.browseAllTitle}>The Library →</Text>
          <Text style={styles.browseAllSub}>
            Every practice the app contains. Letters, breath, body, frequencies,
            plans, chart, meditations.
          </Text>
        </Pressable>
      </ScrollView>
    </InsideBackground>
  );
}

const DOT_SIZE = 38;
const CARD_OFFSET = 14;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 24,
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
    fontSize: 34,
    lineHeight: 42,
    color: tokens.semantic.textPrimary,
  },
  lead: {
    marginTop: 14,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textSecondary,
    maxWidth: 420,
  },

  arc: {
    marginTop: 8,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: CARD_OFFSET,
  },
  rail: {
    width: DOT_SIZE,
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dotCurrent: {
    shadowColor: '#3A3540',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
  dotNumber: {
    fontFamily: tokens.fonts.display,
    fontSize: 17,
    lineHeight: 20,
  },
  dotCheck: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 18,
    color: '#FFFFFF',
  },
  connector: {
    flex: 1,
    width: 2,
    marginVertical: 4,
    minHeight: 36,
  },

  stageCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 252, 250, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  stageHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    gap: 8,
    flexWrap: 'wrap',
  },
  stageKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.6,
  },
  youAreHere: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  youAreHereText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 9,
    letterSpacing: 1.4,
  },
  depthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  depthBadgeText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 9,
    letterSpacing: 1.4,
  },
  stageName: {
    fontFamily: tokens.fonts.display,
    fontSize: 24,
    lineHeight: 30,
    color: tokens.semantic.textPrimary,
    marginBottom: 4,
  },
  stageKickerLine: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 20,
    color: tokens.semantic.textSecondary,
  },

  progressWrap: {
    marginTop: 12,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(45, 41, 53, 0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    marginTop: 6,
    fontFamily: tokens.fonts.body,
    fontSize: 11,
    letterSpacing: 0.6,
    color: tokens.semantic.textTertiary,
  },

  footerNote: {
    marginTop: 18,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 252, 250, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.08)',
  },
  footerText: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  browseAllBtn: {
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 252, 250, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.1)',
  },
  browseAllKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 2,
    color: tokens.semantic.textTertiary,
    marginBottom: 8,
  },
  browseAllTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 26,
    lineHeight: 32,
    color: tokens.semantic.textPrimary,
  },
  browseAllSub: {
    marginTop: 6,
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
  },
});
