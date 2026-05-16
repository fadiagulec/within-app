/**
 * Within — Foundations index.
 *
 * The educational layer that wraps the practical features. Two parts:
 *   A. Healing Modalities — the 12 modalities the app contains
 *   B. Aligned Living — the 12 lifestyle pillars that hold the work up
 *
 * Each entry tappable to /foundations/[id] for the full ~250-word brief.
 * Designed for a quick orientation pass and a deeper read on whatever
 * the user is drawn to today.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import {
  getModalities,
  getLifestyle,
  type FoundationBrief,
} from '@/data/foundations';

type GroupKey = 'modality' | 'lifestyle';

export default function FoundationsIndex() {
  const router = useRouter();
  const [openGroup, setOpenGroup] = useState<GroupKey | null>('modality');

  const modalities = getModalities();
  const lifestyle = getLifestyle();

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  function toggleGroup(g: GroupKey) {
    setOpenGroup((cur) => (cur === g ? null : g));
  }

  function openBrief(id: string) {
    router.push({ pathname: '/foundations/[id]', params: { id } } as never);
  }

  return (
    <InsideBackground>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          style={styles.back}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>FOUNDATIONS</Text>
          <Text style={styles.h1}>
            What this is.{'\n'}Why it works.
          </Text>
          <Text style={styles.lead}>
            Twenty-four short briefs — one for every healing modality the app
            contains, and one for every lifestyle pillar that holds the work
            up. Read them in order. Or read the one you are drawn to today.
          </Text>
        </View>

        {/* PART A — Modalities */}
        <GroupBlock
          title="Part A · The 12 Healing Modalities"
          subtitle="What the practices in this app actually are."
          accent={tokens.semantic.accent}
          briefs={modalities}
          open={openGroup === 'modality'}
          onToggle={() => toggleGroup('modality')}
          onPressBrief={openBrief}
        />

        {/* PART B — Lifestyle */}
        <GroupBlock
          title="Part B · The 12 Aligned Living Pillars"
          subtitle="The everyday inputs that hold the inner work."
          accent="#3F8A5F"
          briefs={lifestyle}
          open={openGroup === 'lifestyle'}
          onToggle={() => toggleGroup('lifestyle')}
          onPressBrief={openBrief}
        />

        {/* Footer note */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Read like reference. Return like a map. Nothing in this app needs
            to be done all at once.
          </Text>
        </View>
      </ScrollView>
    </InsideBackground>
  );
}

interface GroupBlockProps {
  title: string;
  subtitle: string;
  accent: string;
  briefs: FoundationBrief[];
  open: boolean;
  onToggle: () => void;
  onPressBrief: (id: string) => void;
}

function GroupBlock({
  title,
  subtitle,
  accent,
  briefs,
  open,
  onToggle,
  onPressBrief,
}: GroupBlockProps) {
  return (
    <View style={[styles.groupCard, { borderLeftColor: accent }]}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={`${title} — ${briefs.length} briefs`}
        accessibilityState={{ expanded: open }}
        style={styles.groupHead}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.groupTitle, { color: accent }]}>{title}</Text>
          <Text style={styles.groupSubtitle}>{subtitle}</Text>
          <Text style={styles.groupCount}>
            {briefs.length} briefs · ~{Math.round(briefs.length * 1.5)} min total
          </Text>
        </View>
        <Text style={[styles.toggle, { color: accent }]}>{open ? '−' : '+'}</Text>
      </Pressable>

      {open ? (
        <View style={styles.briefList}>
          {briefs.map((b) => (
            <Pressable
              key={b.id}
              onPress={() => onPressBrief(b.id)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${b.title}`}
              style={({ pressed }) => [
                styles.briefRow,
                pressed && { opacity: 0.85 },
              ]}
            >
              <View style={[styles.briefDot, { backgroundColor: b.accent }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.briefKicker}>{b.kicker}</Text>
                <Text style={styles.briefTitle}>{b.title}</Text>
                <Text style={styles.briefSummary} numberOfLines={2}>
                  {b.summary}
                </Text>
              </View>
              <Text style={[styles.briefArrow, { color: b.accent }]}>→</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
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
  header: {
    alignItems: 'center',
    marginBottom: 22,
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
    fontSize: 32,
    lineHeight: 40,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
  },
  lead: {
    marginTop: 16,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    maxWidth: 380,
  },

  groupCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 16,
    borderLeftWidth: 5,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
  },
  groupHead: {
    paddingVertical: 18,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupTitle: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    letterSpacing: 1.2,
  },
  groupSubtitle: {
    marginTop: 6,
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: tokens.semantic.textPrimary,
  },
  groupCount: {
    marginTop: 6,
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    color: tokens.semantic.textTertiary,
  },
  toggle: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 28,
    lineHeight: 28,
    paddingHorizontal: 8,
  },

  briefList: {
    paddingBottom: 10,
    gap: 2,
  },
  briefRow: {
    paddingVertical: 14,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(45, 41, 53, 0.06)',
  },
  briefDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  briefKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    color: tokens.semantic.textTertiary,
    marginBottom: 4,
  },
  briefTitle: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 20,
    color: tokens.semantic.textPrimary,
  },
  briefSummary: {
    marginTop: 4,
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: tokens.semantic.textSecondary,
  },
  briefArrow: {
    fontFamily: tokens.fonts.body,
    fontSize: 18,
    paddingTop: 4,
  },

  footerNote: {
    marginTop: 24,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 250, 245, 0.7)',
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
});
