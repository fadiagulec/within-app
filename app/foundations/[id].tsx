/**
 * Within — Foundation brief detail.
 *
 * One brief per route. Layout:
 *   header (kicker + title) → LISTEN button → summary card → full content
 *   → 3 "do today" actions → link to related practice → next/prev navigation.
 *
 * Designed for slow reading on mobile. Original content in brand voice.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import {
  FOUNDATIONS_BRIEFS,
  getFoundationBrief,
  type FoundationBrief,
} from '@/data/foundations';

export default function FoundationDetail() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const id = String(params.id ?? '');
  const brief = getFoundationBrief(id);

  const { prev, next } = useMemo(() => {
    if (!brief) return { prev: null, next: null };
    const idx = FOUNDATIONS_BRIEFS.findIndex((b) => b.id === brief.id);
    return {
      prev: idx > 0 ? FOUNDATIONS_BRIEFS[idx - 1] : null,
      next: idx < FOUNDATIONS_BRIEFS.length - 1 ? FOUNDATIONS_BRIEFS[idx + 1] : null,
    };
  }, [brief]);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/foundations' as never);
  }

  function goToBrief(b: FoundationBrief) {
    router.replace({ pathname: '/foundations/[id]', params: { id: b.id } } as never);
  }

  if (!brief) {
    return (
      <InsideBackground>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Pressable onPress={goBack} hitSlop={10} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Text style={styles.h1}>Brief not found.</Text>
            <Text style={styles.lead}>
              We could not find that foundation. Try the index again.
            </Text>
            <Pressable
              onPress={() => router.replace('/foundations' as never)}
              style={[styles.cta, { marginTop: 18 }]}
            >
              <Text style={styles.ctaText}>Open Foundations →</Text>
            </Pressable>
          </View>
        </ScrollView>
      </InsideBackground>
    );
  }

  // Render content paragraphs (the briefs use \n\n between paragraphs).
  const paragraphs = brief.content.split('\n\n').map((p) => p.trim()).filter(Boolean);

  // Speech text — read summary + full content + actions.
  const speechText = `${brief.title}. ${brief.summary} ${brief.content} Three things to do today: ${brief.actions.join('. ')}.`;

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
          <Text style={styles.backText}>← Back to Foundations</Text>
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: brief.accent }]}>{brief.kicker}</Text>
          <Text style={styles.h1}>{brief.title}</Text>
        </View>

        {/* Listen + summary */}
        <View style={[styles.summaryCard, { borderLeftColor: brief.accent }]}>
          <View style={styles.summaryHead}>
            <Text style={styles.summaryKicker}>IN ONE LINE</Text>
            <SpeechPlayer
              text={speechText}
              accent={brief.accent}
              label="LISTEN"
              size="sm"
            />
          </View>
          <Text style={styles.summaryText}>{brief.summary}</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {paragraphs.map((p, i) => (
            <Text key={i} style={styles.bodyText}>
              {p}
            </Text>
          ))}
        </View>

        {/* Actions */}
        <View style={[styles.actionsCard, { borderColor: `${brief.accent}55` }]}>
          <Text style={[styles.actionsKicker, { color: brief.accent }]}>
            DO TODAY
          </Text>
          <Text style={styles.actionsLead}>
            Three small moves. Pick one. The brief lands when the body does it,
            not when the mind reads it.
          </Text>
          <View style={styles.actionsList}>
            {brief.actions.map((a, i) => (
              <View key={i} style={styles.actionRow}>
                <View style={[styles.actionNumber, { backgroundColor: brief.accent }]}>
                  <Text style={styles.actionNumberText}>{i + 1}</Text>
                </View>
                <Text style={styles.actionText}>{a}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Related practice */}
        <Pressable
          onPress={() => router.push(brief.relatedRoute as never)}
          accessibilityRole="button"
          accessibilityLabel={brief.relatedLabel}
          style={[styles.relatedCard, { backgroundColor: `${brief.accent}15`, borderColor: `${brief.accent}55` }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.relatedKicker}>NOW PRACTICE IT</Text>
            <Text style={styles.relatedLabel}>{brief.relatedLabel}</Text>
          </View>
          <Text style={[styles.relatedArrow, { color: brief.accent }]}>→</Text>
        </Pressable>

        {/* Prev / Next */}
        <View style={styles.nav}>
          {prev ? (
            <Pressable
              onPress={() => goToBrief(prev)}
              accessibilityRole="button"
              accessibilityLabel={`Previous: ${prev.title}`}
              style={[styles.navCard, { borderColor: 'rgba(45,41,53,0.12)' }]}
            >
              <Text style={styles.navDirection}>← PREVIOUS</Text>
              <Text style={styles.navTitle} numberOfLines={2}>{prev.title}</Text>
            </Pressable>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          {next ? (
            <Pressable
              onPress={() => goToBrief(next)}
              accessibilityRole="button"
              accessibilityLabel={`Next: ${next.title}`}
              style={[styles.navCard, { borderColor: 'rgba(45,41,53,0.12)', alignItems: 'flex-end' }]}
            >
              <Text style={styles.navDirection}>NEXT →</Text>
              <Text style={[styles.navTitle, { textAlign: 'right' }]} numberOfLines={2}>
                {next.title}
              </Text>
            </Pressable>
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>
      </ScrollView>
    </InsideBackground>
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
    marginBottom: 20,
  },
  eyebrow: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 3,
    marginBottom: 12,
  },
  h1: {
    fontFamily: tokens.fonts.display,
    fontSize: 30,
    lineHeight: 38,
    color: tokens.semantic.textPrimary,
  },
  lead: {
    marginTop: 14,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
  },

  summaryCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.92)',
    borderRadius: 16,
    borderLeftWidth: 5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },
  summaryHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 12,
  },
  summaryKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
  },
  summaryText: {
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 23,
    color: tokens.semantic.textPrimary,
    fontStyle: 'italic',
  },

  body: {
    gap: 14,
    marginBottom: 24,
  },
  bodyText: {
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: tokens.semantic.textPrimary,
  },

  actionsCard: {
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 250, 245, 0.85)',
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 16,
  },
  actionsKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 10,
  },
  actionsLead: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
    marginBottom: 14,
  },
  actionsList: {
    gap: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  actionNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  actionNumberText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 12,
    color: '#FFFFFF',
  },
  actionText: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 21,
    color: tokens.semantic.textPrimary,
  },

  relatedCard: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  relatedKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
    marginBottom: 4,
  },
  relatedLabel: {
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
  },
  relatedArrow: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 22,
  },

  nav: {
    flexDirection: 'row',
    gap: 10,
  },
  navCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 250, 245, 0.6)',
  },
  navDirection: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    color: tokens.semantic.textTertiary,
    marginBottom: 6,
  },
  navTitle: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: tokens.semantic.textPrimary,
  },

  cta: {
    backgroundColor: tokens.semantic.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },
  ctaText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
