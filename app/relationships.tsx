/**
 * Relationships hub — Heart-chakra-anchored destination.
 *
 * Why a standalone hub: "Relationships" is one of the 8 Wheel of Life
 * areas — when a user scores low on it, they need a place to land that
 * is not "go dig through the library". This screen is that place.
 *
 * Pulls heart-chakra content (breath + meditation + plan content + journal
 * prompt) and assembles a "what to do about it" page.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { CHAKRA_SPINE } from '@/data/chakra-spine';
import { breathwork } from '@/data/breathwork';
import { meditations } from '@/data/meditations';
import { useWheelStore } from '@/store/useWheelStore';

const HEART = CHAKRA_SPINE.heart;
const ACCENT = HEART.color;

const RELATIONSHIP_PROMPTS = [
  'Who am I still carrying that I am ready to set down?',
  'Where am I withholding love I could safely give?',
  'What pattern keeps showing up in every relationship — and what is mine in it?',
  'When was the last time I let myself be fully seen by someone?',
  'Who in my life deserves an honest sentence I have been softening?',
];

const FOCUS_AREAS = [
  {
    id: 'when-its-hard',
    title: 'When it is hard',
    body: 'A breath + script for when a relationship is in a tight place.',
    accent: ACCENT,
    href: '/breathwork/breath-alternate-nostril',
    icon: '⚖',
  },
  {
    id: 'forgive',
    title: 'Forgive',
    body: 'For moving the residue from past relationships out of the body.',
    accent: ACCENT,
    href: '/session/med-relationship-magic',
    icon: '✧',
  },
  {
    id: 'receive',
    title: 'Receive love',
    body: 'For when giving comes easy and receiving is the bottleneck.',
    accent: ACCENT,
    href: '/session/med-abundance',
    icon: '◯',
  },
  {
    id: 'be-seen',
    title: 'Be seen',
    body: 'For practicing letting another person see you without performing.',
    accent: ACCENT,
    href: '/breathwork/breath-grounding',
    icon: '◐',
  },
];

export default function RelationshipsHub() {
  const router = useRouter();
  const latestWheel = useWheelStore((s) => s.getLatest());
  const relationshipScore = latestWheel?.scores.relationships;

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  // Pre-resolve content references for confidence
  const breath = breathwork.find((b) => b.id === 'breath-alternate-nostril');
  const meditation = meditations.find((m) => m.id === 'med-relationship-magic');

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.header}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={10}
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Back
            </Text>
          </Pressable>
          <Text variant="mono" color={ACCENT} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            HEART · ANAHATA · 528Hz
          </Text>
        </View>

        {/* Hero */}
        <View
          style={[
            styles.hero,
            { borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}1A` },
          ]}
        >
          <Text variant="eyebrow" color={ACCENT}>
            RELATIONSHIPS
          </Text>
          <Text variant="heading1" style={{ marginTop: 6, fontSize: 32 }}>
            The work is your side of the thread.
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 12, fontSize: 16, lineHeight: 24 }}
          >
            Every relationship pattern lives in the heart chakra. When this area is
            tight — grief, resentment, fear of intimacy — the rest of life pulls in
            with it. Here are the practices for it.
          </Text>

          {relationshipScore !== undefined ? (
            <View
              style={[
                styles.scoreChip,
                { backgroundColor: `${ACCENT}33`, borderColor: ACCENT },
              ]}
            >
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 12, letterSpacing: 1.5 }}>
                YOUR WHEEL · RELATIONSHIPS · {relationshipScore}/10
              </Text>
            </View>
          ) : (
            <Pressable
              onPress={() => router.push('/(onboarding)/wheel-of-life' as never)}
              style={[
                styles.scoreChip,
                { backgroundColor: `${ACCENT}22`, borderColor: `${ACCENT}88` },
              ]}
            >
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                TAKE THE WHEEL OF LIFE TO PERSONALIZE THIS →
              </Text>
            </Pressable>
          )}
        </View>

        {/* Focus areas grid */}
        <View style={styles.focusGrid}>
          {FOCUS_AREAS.map((f) => (
            <Pressable
              key={f.id}
              onPress={() => router.push(f.href as never)}
              accessibilityRole="button"
              accessibilityLabel={`${f.title} — ${f.body}`}
              style={[
                styles.focusCard,
                { borderColor: `${f.accent}55`, backgroundColor: `${f.accent}10` },
              ]}
            >
              <Text variant="heading2" color={f.accent} style={{ fontSize: 24, marginBottom: 6 }}>
                {f.icon}
              </Text>
              <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ fontSize: 17 }}>
                {f.title}
              </Text>
              <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 4, fontSize: 13, lineHeight: 19 }}>
                {f.body}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* The 21-day plan recommendation */}
        <Pressable
          onPress={() => router.push({ pathname: '/plan/[id]', params: { id: 'letting-go-of-the-past' } } as never)}
          accessibilityRole="button"
          accessibilityLabel="Open the Letting Go of the Past 21-day plan"
          style={[
            styles.planCta,
            { borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}1F` },
          ]}
        >
          <Text variant="mono" color={ACCENT} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            21-DAY PLAN FOR THIS
          </Text>
          <Text variant="heading2" color={tokens.semantic.textPrimary} style={{ marginTop: 6, fontSize: 22 }}>
            Letting Go of the Past
          </Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 6, fontSize: 14, lineHeight: 21 }}>
            Three weeks anchored to the heart, sacral, and throat — for releasing the
            relationship residue you have been quietly carrying. 15 min/day.
          </Text>
          <Text variant="body" color={ACCENT} style={{ marginTop: 10, fontSize: 14 }}>
            Begin →
          </Text>
        </Pressable>

        {/* Today's prompt */}
        <View style={styles.promptCard}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            ONE PROMPT FOR TODAY
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textPrimary}
            style={{ marginTop: 10, fontSize: 22, lineHeight: 32 }}
          >
            {RELATIONSHIP_PROMPTS[new Date().getDate() % RELATIONSHIP_PROMPTS.length]}
          </Text>
        </View>

        {/* Quick links — straight into the practice */}
        {breath ? (
          <Pressable
            onPress={() => router.push({ pathname: '/breathwork/[id]', params: { id: breath.id } } as never)}
            style={[styles.quickLink, { borderColor: `${ACCENT}55` }]}
            accessibilityRole="button"
            accessibilityLabel={`Open ${breath.title}`}
          >
            <View style={{ flex: 1 }}>
              <Text variant="mono" color={ACCENT} style={{ fontSize: 10, letterSpacing: 1.5 }}>
                BREATH
              </Text>
              <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ marginTop: 2, fontSize: 16 }}>
                {breath.title}
              </Text>
              <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 2, fontSize: 13 }}>
                {breath.durationMin} min · {breath.science}
              </Text>
            </View>
            <Text variant="heading3" color={ACCENT} style={{ fontSize: 22 }}>→</Text>
          </Pressable>
        ) : null}

        {meditation ? (
          <Pressable
            onPress={() => router.push({ pathname: '/session/[id]', params: { id: meditation.id } } as never)}
            style={[styles.quickLink, { borderColor: `${ACCENT}55` }]}
            accessibilityRole="button"
            accessibilityLabel={`Open ${meditation.title}`}
          >
            <View style={{ flex: 1 }}>
              <Text variant="mono" color={ACCENT} style={{ fontSize: 10, letterSpacing: 1.5 }}>
                MEDITATION
              </Text>
              <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ marginTop: 2, fontSize: 16 }}>
                {meditation.title}
              </Text>
              <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 2, fontSize: 13 }}>
                {meditation.durationMin} min · {meditation.theme}
              </Text>
            </View>
            <Text variant="heading3" color={ACCENT} style={{ fontSize: 22 }}>→</Text>
          </Pressable>
        ) : null}
      </ScrollView>
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
  scoreChip: {
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  focusGrid: {
    marginTop: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  focusCard: {
    width: '48%',
    padding: 16,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    minHeight: 120,
  },
  planCta: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  promptCard: {
    margin: 20,
    padding: 18,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    backgroundColor: tokens.semantic.bgElevated,
  },
  quickLink: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
