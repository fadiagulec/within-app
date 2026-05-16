/**
 * Within — Stage Detail screen.
 *
 * The deep view of one stage. Shows:
 *   - Stage description + emotional pitch
 *   - All practices in the stage (cornerstone, then the rest)
 *   - Per-practice completion state
 *   - Mark complete button per practice
 *   - "Walked this stage" CTA when ready to move on
 *   - Next-stage hint
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import {
  getStage,
  PATH_STAGES,
  type PathStageId,
  type PracticeKind,
  type PathPractice,
} from '@/data/path';
import { usePathStore } from '@/store/usePathStore';

function kindIcon(kind: PracticeKind): string {
  switch (kind) {
    case 'breath': return '◯';
    case 'meditation': return '✧';
    case 'letter': return '✉';
    case 'journal': return '✎';
    case 'inquiry': return '◐';
    case 'check-in': return '◉';
    case 'reflection': return '◇';
    case 'reading': return '☰';
    case 'plan': return '▤';
    case 'chart': return '✦';
    case 'ritual': return '⌘';
    default: return '·';
  }
}

function kindLabel(kind: PracticeKind): string {
  switch (kind) {
    case 'breath': return 'BREATH';
    case 'meditation': return 'MEDITATION';
    case 'letter': return 'LETTER';
    case 'journal': return 'JOURNAL';
    case 'inquiry': return 'INQUIRY';
    case 'check-in': return 'CHECK-IN';
    case 'reflection': return 'REFLECTION';
    case 'reading': return 'READING';
    case 'plan': return 'PLAN';
    case 'chart': return 'CHART';
    case 'ritual': return 'RITUAL';
    default: return '';
  }
}

export default function StageDetail() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const stageId = String(params.id ?? '') as PathStageId;
  const stage = getStage(stageId);

  const isPracticeComplete = usePathStore((s) => s.isPracticeComplete);
  const isStageComplete = usePathStore((s) => s.isStageComplete);
  const stageProgress = usePathStore((s) => s.stageProgress);
  const currentStageId = usePathStore((s) => s.currentStageId);
  const markPracticeOpened = usePathStore((s) => s.markPracticeOpened);
  const markPracticeComplete = usePathStore((s) => s.markPracticeComplete);
  const completeStage = usePathStore((s) => s.completeStage);
  const setCurrentStage = usePathStore((s) => s.setCurrentStage);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/path' as never);
  }

  if (!stage) {
    return (
      <InsideBackground>
        <View style={styles.notFound}>
          <Text style={styles.h1}>Stage not found.</Text>
          <Pressable onPress={goBack} style={styles.btn}>
            <Text style={styles.btnText}>← Back to the Path</Text>
          </Pressable>
        </View>
      </InsideBackground>
    );
  }

  // Re-bind after the null guard so TS narrowing is preserved inside closures.
  const stg = stage;
  const progress = stageProgress(stg.id);
  const complete = isStageComplete(stg.id);
  const isCurrent = stg.id === currentStageId;
  const nextStage = PATH_STAGES.find((s) => s.order === stg.order + 1);

  function openPractice(p: PathPractice) {
    markPracticeOpened(p.id);
    router.push(p.route as never);
  }

  function toggleComplete(p: PathPractice) {
    if (isPracticeComplete(p.id)) {
      // For now, we don't have an "uncomplete" — keep markings stable.
      return;
    }
    markPracticeComplete(p.id);
  }

  function walkedThisStage() {
    completeStage(stg.id);
    if (nextStage) {
      router.replace({ pathname: '/path/[id]', params: { id: nextStage.id } } as never);
    } else {
      router.replace('/(tabs)/path' as never);
    }
  }

  function setActive() {
    setCurrentStage(stg.id);
  }

  const cornerstone = stage.practices.find((p) => p.cornerstone);
  const others = stage.practices.filter((p) => !p.cornerstone);

  const canMarkWalked = progress.pct >= 0.6 && !complete; // Need 60% done.

  return (
    <InsideBackground>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <Pressable onPress={goBack} hitSlop={10} style={styles.back}>
          <Text style={styles.backText}>← The Path</Text>
        </Pressable>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={[styles.kicker, { color: stage.color }]}>
            STAGE {stage.order} · {stage.durationLabel.toUpperCase()}
          </Text>
          <Text style={styles.h1}>{stage.name}</Text>
          <Text style={styles.subtitle}>"{stage.kicker}"</Text>
        </View>

        {/* Status pill */}
        <View style={styles.statusRow}>
          {complete ? (
            <View style={[styles.statusPill, { backgroundColor: `${stage.color}1A`, borderColor: stage.color }]}>
              <Text style={[styles.statusPillText, { color: stage.color }]}>
                ✦ {stage.depthMarker.toUpperCase()}
              </Text>
            </View>
          ) : isCurrent ? (
            <View style={[styles.statusPill, { backgroundColor: `${stage.color}1A`, borderColor: stage.color }]}>
              <Text style={[styles.statusPillText, { color: stage.color }]}>
                YOU ARE HERE
              </Text>
            </View>
          ) : (
            <Pressable
              onPress={setActive}
              accessibilityRole="button"
              accessibilityLabel="Make this my current stage"
              style={({ pressed }) => [
                styles.statusPill,
                { borderColor: stage.color, backgroundColor: 'rgba(255,252,250,0.85)' },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={[styles.statusPillText, { color: stage.color }]}>
                · MAKE THIS MY STAGE
              </Text>
            </Pressable>
          )}
        </View>

        {/* Description + LISTEN */}
        <View style={[styles.descCard, { borderLeftColor: stage.color }]}>
          <View style={styles.descHead}>
            <Text style={styles.descKicker}>WHAT THIS STAGE IS</Text>
            <SpeechPlayer
              text={`Stage ${stage.order}: ${stage.name}. ${stage.kicker} ${stage.description}`}
              accent={stage.color}
              label="LISTEN"
              size="sm"
            />
          </View>
          <Text style={styles.descBody}>{stage.description}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{progress.done} of {progress.total} practices</Text>
            <Text style={styles.metaText}>~{stage.durationLabel}</Text>
          </View>
        </View>

        {/* CORNERSTONE */}
        {cornerstone ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>START HERE — THE CORNERSTONE</Text>
            <PracticeCard
              practice={cornerstone}
              stageColor={stage.color}
              complete={isPracticeComplete(cornerstone.id)}
              onOpen={() => openPractice(cornerstone)}
              onMarkDone={() => toggleComplete(cornerstone)}
              isCornerstone
            />
          </View>
        ) : null}

        {/* OTHER PRACTICES */}
        {others.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>THE REST OF THE STAGE</Text>
            <View style={{ gap: 10 }}>
              {others.map((p) => (
                <PracticeCard
                  key={p.id}
                  practice={p}
                  stageColor={stage.color}
                  complete={isPracticeComplete(p.id)}
                  onOpen={() => openPractice(p)}
                  onMarkDone={() => toggleComplete(p)}
                />
              ))}
            </View>
          </View>
        ) : null}

        {/* Walked this stage CTA */}
        {!complete ? (
          <Pressable
            onPress={canMarkWalked ? walkedThisStage : undefined}
            accessibilityRole="button"
            accessibilityLabel="Mark this stage walked"
            disabled={!canMarkWalked}
            style={({ pressed }) => [
              styles.walkedBtn,
              {
                backgroundColor: canMarkWalked ? stage.color : 'rgba(45,41,53,0.12)',
              },
              pressed && canMarkWalked && { opacity: 0.88 },
            ]}
          >
            <Text style={[styles.walkedBtnText, { color: canMarkWalked ? '#FFFFFF' : tokens.semantic.textTertiary }]}>
              {canMarkWalked
                ? `✦  I have walked ${stage.name}`
                : `Walk at least 60% of practices to mark this stage`}
            </Text>
          </Pressable>
        ) : null}

        {/* Next-stage hint */}
        {stage.nextHint && !complete ? (
          <Text style={styles.nextHint}>{stage.nextHint}</Text>
        ) : null}

        {/* Browse the full library — nothing is hidden */}
        <View style={styles.libraryCard}>
          <Text style={styles.libraryKicker}>EVERYTHING ELSE</Text>
          <Text style={styles.libraryLead}>
            The Path is a recommended order. The full library contains every
            practice the app has — over 50 — and is always available.
          </Text>
          <View style={styles.libraryButtons}>
            <Pressable
              onPress={() => router.push('/methods' as never)}
              accessibilityRole="button"
              accessibilityLabel="Browse the full healing library"
              style={({ pressed }) => [
                styles.libraryBtn,
                { borderColor: stg.color, backgroundColor: `${stg.color}12` },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={[styles.libraryBtnText, { color: stg.color }]}>
                Browse The Library →
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/(tabs)/you' as never)}
              accessibilityRole="button"
              accessibilityLabel="Open the full menu"
              style={({ pressed }) => [
                styles.libraryBtn,
                { borderColor: 'rgba(45,41,53,0.18)' },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={styles.libraryBtnTextDim}>
                All practices in You →
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </InsideBackground>
  );
}

// ──────────── Practice card ────────────

interface PracticeCardProps {
  practice: PathPractice;
  stageColor: string;
  complete: boolean;
  onOpen: () => void;
  onMarkDone: () => void;
  isCornerstone?: boolean;
}

function PracticeCard({
  practice,
  stageColor,
  complete,
  onOpen,
  onMarkDone,
  isCornerstone,
}: PracticeCardProps) {
  return (
    <View
      style={[
        styles.practice,
        isCornerstone && { borderColor: stageColor, backgroundColor: `${stageColor}10` },
        complete && { opacity: 0.7 },
      ]}
    >
      <Pressable
        onPress={onOpen}
        accessibilityRole="button"
        accessibilityLabel={`Open ${practice.title}`}
        style={styles.practiceMain}
      >
        <View style={[styles.practiceIcon, { backgroundColor: `${stageColor}1A` }]}>
          <Text style={[styles.practiceIconText, { color: stageColor }]}>
            {kindIcon(practice.kind)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.practiceMeta}>
            {kindLabel(practice.kind)} · {practice.durationMin} min
          </Text>
          <Text style={styles.practiceTitle}>{practice.title}</Text>
          <Text style={styles.practiceBlurb}>{practice.blurb}</Text>
        </View>
        <Text style={[styles.practiceArrow, { color: stageColor }]}>→</Text>
      </Pressable>

      <Pressable
        onPress={onMarkDone}
        accessibilityRole="button"
        accessibilityLabel={complete ? `${practice.title} completed` : `Mark ${practice.title} done`}
        accessibilityState={{ checked: complete }}
        style={styles.doneBtn}
      >
        <View
          style={[
            styles.doneCheckbox,
            complete && { backgroundColor: stageColor, borderColor: stageColor },
          ]}
        >
          {complete ? <Text style={styles.doneCheck}>✓</Text> : null}
        </View>
        <Text style={[styles.doneText, complete && { color: stageColor }]}>
          {complete ? 'Done' : 'Mark done'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
  },
  back: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backText: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textSecondary,
  },

  hero: {
    marginBottom: 14,
  },
  kicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.4,
    marginBottom: 10,
  },
  h1: {
    fontFamily: tokens.fonts.display,
    fontSize: 44,
    lineHeight: 50,
    color: tokens.semantic.textPrimary,
  },
  subtitle: {
    marginTop: 10,
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 18,
    lineHeight: 26,
    color: tokens.semantic.textSecondary,
  },

  statusRow: {
    marginBottom: 18,
  },
  statusPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusPillText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.6,
  },

  descCard: {
    backgroundColor: 'rgba(255, 252, 250, 0.92)',
    borderRadius: 18,
    borderLeftWidth: 5,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 22,
  },
  descHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
    flexWrap: 'wrap',
  },
  descKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
  },
  descBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: tokens.semantic.textPrimary,
  },
  metaRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.2,
    color: tokens.semantic.textTertiary,
  },

  section: {
    marginBottom: 22,
  },
  sectionLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.semantic.textTertiary,
    marginBottom: 10,
  },

  practice: {
    backgroundColor: 'rgba(255, 252, 250, 0.92)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.08)',
  },
  practiceMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  practiceIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceIconText: {
    fontFamily: tokens.fonts.display,
    fontSize: 22,
  },
  practiceMeta: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.4,
    color: tokens.semantic.textTertiary,
    marginBottom: 3,
  },
  practiceTitle: {
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
  },
  practiceBlurb: {
    marginTop: 3,
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
  },
  practiceArrow: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 20,
  },

  doneBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(45, 41, 53, 0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  doneCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(45,41,53,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneCheck: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    color: '#FFFFFF',
  },
  doneText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 12,
    letterSpacing: 0.4,
    color: tokens.semantic.textSecondary,
  },

  walkedBtn: {
    marginTop: 6,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  walkedBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    letterSpacing: 1.4,
  },
  nextHint: {
    marginTop: 12,
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 21,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
  },

  libraryCard: {
    marginTop: 28,
    padding: 18,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 252, 250, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.08)',
  },
  libraryKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 2,
    color: tokens.semantic.textTertiary,
    marginBottom: 8,
  },
  libraryLead: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
    marginBottom: 14,
  },
  libraryButtons: {
    gap: 8,
  },
  libraryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
  },
  libraryBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 13,
    letterSpacing: 0.6,
  },
  libraryBtnTextDim: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    color: tokens.semantic.textSecondary,
  },

  // Not found state
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  btn: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: tokens.semantic.accent,
  },
  btnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },
});
