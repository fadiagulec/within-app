/**
 * About / Sales page — Within.
 *
 * Public landing page for sharing externally. Uses the same earth palette
 * + brand voice as the app proper. Has a primary CTA into the app and a
 * waitlist capture for retreats.
 *
 * URL: /about
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { useWaitlistStore } from '@/store/useWaitlistStore';

export default function AboutPage() {
  const router = useRouter();
  const add = useWaitlistStore((s) => s.add);

  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function joinWaitlist() {
    if (!validEmail) return;
    setSubmitting(true);
    try {
      await add({
        itemId: 'general-launch',
        itemTitle: 'Within — General Launch',
        email: email.trim(),
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

        {/* ─── Hero ──────────────────────────────────────────── */}
        <View style={styles.hero}>
          <Text variant="mono" color={tokens.semantic.accent} style={styles.eyebrow}>
            WITHIN
          </Text>
          <Text variant="hero" style={styles.h1}>
            Stop using{'\n'}
            <Text variant="hero" italic color={tokens.semantic.accent}>
              five wellness apps.
            </Text>
            {'\n'}This is one.
          </Text>
          <Text variant="body" style={styles.lead}>
            Tell Within how you feel. It reads your chakra map, your real birth chart,
            your Energy Blueprint, and your daily practice — and gives you exactly one
            15-minute protocol for today. Three steps. Done.
          </Text>

          <View style={styles.ctaRow}>
            <Pressable
              onPress={() => router.push('/(tabs)' as never)}
              accessibilityRole="button"
              accessibilityLabel="Open the app"
              style={[styles.btnPrimary, { backgroundColor: tokens.semantic.accent }]}
            >
              <Text variant="body" color={tokens.semantic.textOnGold} style={{ fontSize: 15 }}>
                Open the app →
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/retreats' as never)}
              accessibilityRole="button"
              accessibilityLabel="See retreats"
              style={[styles.btnGhost, { borderColor: tokens.semantic.borderStrong }]}
            >
              <Text variant="body" color={tokens.semantic.textPrimary} style={{ fontSize: 15 }}>
                See retreats
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ─── Section 1 — The problem ──────────────────────── */}
        <View style={styles.section}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
            THE PROBLEM
          </Text>
          <Text variant="heading1" style={styles.sectionH}>
            Most wellness apps do one thing.{'\n'}You need the whole map.
          </Text>
          <Text variant="body" style={styles.sectionBody}>
            One app for breathwork. Another for meditation. A third for astrology that
            tells you your sun sign and stops there. A fourth for journaling. They do
            not talk to each other. None of them know what you actually need today.
          </Text>
          <Text variant="body" style={styles.sectionBody}>
            Within is the opposite. Every practice — breath, meditation, frequency
            tone, unblocking script, journal prompt, 21-day plan, chart, blueprint —
            sits on one spine. They know where you scored low this week. They know
            what you completed yesterday. They route you to what you actually need.
          </Text>
        </View>

        {/* ─── Section 2 — What's inside ───────────────────── */}
        <View style={styles.section}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
            WHAT IS INSIDE
          </Text>
          <Text variant="heading1" style={styles.sectionH}>
            Everything in one place.
          </Text>

          <View style={styles.featGrid}>
            {FEATURES.map((f) => (
              <View
                key={f.title}
                style={[styles.featCard, { borderColor: `${f.accent}55`, backgroundColor: `${f.accent}10` }]}
              >
                <Text variant="mono" color={f.accent} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                  {f.kicker}
                </Text>
                <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ marginTop: 6, fontSize: 18 }}>
                  {f.title}
                </Text>
                <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 6, fontSize: 13, lineHeight: 19 }}>
                  {f.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ─── Section 3 — 21-Day Plans ───────────────────── */}
        <View style={styles.section}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
            THE 21-DAY ARCS
          </Text>
          <Text variant="heading1" style={styles.sectionH}>
            Three weeks. One arc.
          </Text>
          <Text variant="body" style={styles.sectionBody}>
            Pick a plan. 15 minutes a day. Three weeks structured into Open → Release →
            Integrate. You finish. You do not just "do it forever."
          </Text>

          {PLANS_PREVIEW.map((p) => (
            <View
              key={p.id}
              style={[styles.planRow, { borderColor: `${p.accent}55`, backgroundColor: `${p.accent}14` }]}
            >
              <View style={{ flex: 1 }}>
                <Text variant="heading3" color={tokens.semantic.textPrimary} style={{ fontSize: 19 }}>
                  {p.title}
                </Text>
                <Text variant="displayItalic" color={tokens.semantic.textSecondary} style={{ marginTop: 4, fontSize: 16 }}>
                  {p.tagline}
                </Text>
              </View>
              <View style={[styles.planTag, { backgroundColor: `${p.accent}33`, borderColor: p.accent }]}>
                <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                  21 DAYS
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ─── Section 4 — Brand voice quote ────────────────── */}
        <View style={[styles.quoteSection, { borderColor: `${tokens.semantic.accent}66`, backgroundColor: `${tokens.semantic.accent}1A` }]}>
          <Text variant="mono" color={tokens.semantic.accent} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            HOW WE TALK TO YOU
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textPrimary}
            style={styles.quote}
          >
            No "embark on your sacred journey."{'\n'}
            No astrology word salad.{'\n'}
            We tell you what to do.{'\n'}
            We save your time.
          </Text>
        </View>

        {/* ─── Section 5 — Becoming arc ─────────────────────── */}
        <View style={styles.section}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
            THE LONGER ARC
          </Text>
          <Text variant="heading1" style={styles.sectionH}>
            Three months in: you walk lighter.{'\n'}
            <Text variant="heading1" italic color={tokens.semantic.accent}>
              A year in: you've become the kind of person life starts arriving at.
            </Text>
          </Text>
        </View>

        {/* ─── Section 6 — Final CTA + waitlist ────────────── */}
        <View
          style={[
            styles.finalCta,
            { borderColor: `${tokens.semantic.accent}66`, backgroundColor: `${tokens.semantic.accent}1F` },
          ]}
        >
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            START NOW
          </Text>
          <Text variant="heading1" style={{ marginTop: 6, fontSize: 32 }}>
            Open the app.
          </Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 12, fontSize: 15, lineHeight: 23 }}>
            Free preview. Every paid section is unlocked while we finish payments.
            Take the Wheel of Life, get your daily protocol, listen to your first
            chakra frequency — in five minutes you will know if this is for you.
          </Text>

          <Pressable
            onPress={() => router.push('/(tabs)' as never)}
            accessibilityRole="button"
            accessibilityLabel="Open the app"
            style={[styles.btnPrimaryLarge, { backgroundColor: tokens.semantic.accent }]}
          >
            <Text variant="body" color={tokens.semantic.textOnGold} style={{ fontSize: 16 }}>
              Open Within →
            </Text>
          </Pressable>

          <View style={styles.waitlistBlock}>
            <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.8, marginBottom: 8 }}>
              OR · JOIN THE LAUNCH LIST
            </Text>
            {done ? (
              <Text variant="body" color={tokens.semantic.successSage} style={{ fontSize: 15 }}>
                ✓ You are on the list. We will write before we open.
              </Text>
            ) : (
              <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor={tokens.semantic.textTertiary}
                  style={styles.emailInput}
                  accessibilityLabel="Your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Pressable
                  onPress={joinWaitlist}
                  disabled={!validEmail || submitting}
                  accessibilityRole="button"
                  accessibilityLabel="Join the launch list"
                  style={[
                    styles.emailBtn,
                    {
                      backgroundColor: validEmail
                        ? tokens.semantic.accent
                        : tokens.semantic.bgRaised,
                      opacity: validEmail ? 1 : 0.6,
                    },
                  ]}
                >
                  <Text variant="body" color={validEmail ? tokens.semantic.textOnGold : tokens.semantic.textTertiary} style={{ fontSize: 14 }}>
                    Join
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
            WITHIN · {Platform.OS === 'web' ? 'WEB PREVIEW' : 'BETA'}
          </Text>
          <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ marginTop: 8, fontSize: 12, lineHeight: 19, textAlign: 'center' }}>
            Built for people who are done waiting to feel like themselves.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

// ─── Static content ─────────────────────────────────────────

const FEATURES = [
  {
    kicker: 'CHAKRAS',
    title: '8-centre map',
    desc: 'Root through Soul Star. Each with unblocking scripts, healing frequencies, characteristics, and journal prompts.',
    accent: '#9B5BA1',
  },
  {
    kicker: 'BREATH',
    title: 'Breathwork library',
    desc: 'Seven breath patterns — fire, alternate nostril, 4-7-8, box, grounding. Sharp descriptions, not jargon.',
    accent: '#3F8A5F',
  },
  {
    kicker: 'CHART',
    title: 'Real natal chart',
    desc: 'Sun, Moon, Rising, all planets, all aspects. Computed in your browser. No subscription, no API key.',
    accent: '#5645A6',
  },
  {
    kicker: 'BLUEPRINT',
    title: 'Energy Blueprint',
    desc: 'Your Type, Strategy, Authority, Profile — the operating instructions for how you make decisions.',
    accent: '#9B5BA1',
  },
  {
    kicker: 'FREQUENCY',
    title: 'Healing tones',
    desc: 'LAM 396Hz, VAM 417, RAM 528, YAM 528, HAM 741, UMM 852, OMM 963 — real audible tones, not files.',
    accent: '#E8B83E',
  },
  {
    kicker: 'PLANS',
    title: '21-Day Arcs',
    desc: 'Letting Go of the Past · Build Abundance · Magnetic Self. 15 minutes a day. Open · Release · Integrate.',
    accent: '#3F8A5F',
  },
  {
    kicker: 'COSMIC',
    title: 'Lunar awareness',
    desc: 'Moon-phase + Mercury retrograde alerts. Plan from the sky, not against it.',
    accent: '#A09784',
  },
  {
    kicker: 'PRACTICE',
    title: 'Daily briefing',
    desc: 'Open the app. Get one 15-minute protocol — breath, practice, journal. Today only. Done.',
    accent: '#CFB57E',
  },
];

const PLANS_PREVIEW = [
  {
    id: 'letting-go',
    title: 'Letting Go of the Past',
    tagline: 'Stop dragging it. Start fresh.',
    accent: '#3F8A5F',
  },
  {
    id: 'build-abundance',
    title: 'Build Abundance',
    tagline: 'Stop earning it. Start receiving it.',
    accent: '#E8B83E',
  },
  {
    id: 'magnetic-self',
    title: 'Magnetic Self',
    tagline: 'Stop chasing it. Become the kind of person it comes to.',
    accent: '#5645A6',
  },
];

// ─── Styles ─────────────────────────────────────────────────

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 4,
    marginBottom: 14,
  },
  h1: {
    fontSize: 44,
    lineHeight: 52,
  },
  lead: {
    marginTop: 22,
    fontSize: 17,
    lineHeight: 27,
    color: tokens.semantic.textPrimary,
    maxWidth: 540,
  },
  ctaRow: {
    marginTop: 32,
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: tokens.radii.pill,
  },
  btnGhost: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  btnPrimaryLarge: {
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 12,
  },
  sectionH: {
    fontSize: 32,
    lineHeight: 40,
    color: tokens.semantic.textPrimary,
  },
  sectionBody: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 25,
    color: tokens.semantic.textPrimary,
    maxWidth: 600,
  },
  featGrid: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featCard: {
    width: '48%',
    flexGrow: 1,
    minWidth: 200,
    padding: 16,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
  },
  planRow: {
    marginTop: 14,
    padding: 18,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  planTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  quoteSection: {
    marginHorizontal: 24,
    marginVertical: 24,
    padding: 28,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  quote: {
    marginTop: 14,
    fontSize: 24,
    lineHeight: 36,
  },
  finalCta: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 28,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  waitlistBlock: {
    marginTop: 28,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
  emailInput: {
    flex: 1,
    minWidth: 200,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    borderRadius: tokens.radii.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
  },
  emailBtn: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: tokens.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 40,
    padding: 32,
    alignItems: 'center',
  },
});
