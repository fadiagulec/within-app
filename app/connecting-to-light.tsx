import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import {
  PILLAR_OVERVIEW,
  FOUNDATIONS,
  KEY_PRINCIPLES,
  MEDITATION_BENEFITS,
  SACRAL_PRACTICE,
  GROUNDING_PRACTICE,
  NOURISHMENT_PRACTICE,
  HYDRATION_PRACTICE,
  CLOSING,
  DAILY_FOUNDATION_CHECK,
  FoundationId,
} from '@/data/connecting-to-light';

type Tab = 'overview' | 'practices' | 'daily-check';

/**
 * CONNECTING TO LIGHT
 * The self-care + personal alignment pillar.
 * "Self-care is not luxury. It is necessity."
 */

export default function ConnectingToLight() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('overview');
  const [expandedPractice, setExpandedPractice] = useState<string | null>(null);

  const pickTab = (t: Tab) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTab(t);
  };

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>← Back</Text>
        </Pressable>

        {/* Hero */}
        <LinearGradient
          colors={[`${tokens.semantic.accent}30`, 'transparent']}
          style={styles.hero}
        >
          <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
            Pillar · Self-Care & Alignment
          </Text>
          <Text variant="heading1" style={styles.heroTitle}>
            {PILLAR_OVERVIEW.title}
          </Text>
          <Text variant="body" style={styles.heroTagline}>
            {PILLAR_OVERVIEW.tagline}
          </Text>
        </LinearGradient>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(
            [
              { id: 'overview' as Tab, label: 'Why' },
              { id: 'practices' as Tab, label: 'Practices' },
              { id: 'daily-check' as Tab, label: 'Daily Check' },
            ]
          ).map((t) => (
            <Pressable
              key={t.id}
              onPress={() => pickTab(t.id)}
              style={[
                styles.tab,
                tab === t.id && { borderBottomColor: tokens.semantic.accent, borderBottomWidth: 2 },
              ]}
            >
              <Text
                variant="label"
                style={{
                  color: tab === t.id ? tokens.semantic.textPrimary : tokens.semantic.textSecondary,
                  textTransform: 'uppercase',
                }}
              >
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <View style={styles.content}>
            <View style={styles.introBlock}>
              {PILLAR_OVERVIEW.intro.map((para, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>
                  {para}
                </Text>
              ))}
              <Text variant="displayItalic" style={styles.coreTeaching}>
                {PILLAR_OVERVIEW.coreTeaching}
              </Text>
            </View>

            <Section title="Key Principles">
              {KEY_PRINCIPLES.map((kp, i) => (
                <View key={i} style={styles.principleCard}>
                  <Text variant="heading3" style={{ color: tokens.semantic.accent }}>
                    {kp.title}
                  </Text>
                  <Text variant="body" style={{ marginTop: tokens.spacing.s2, lineHeight: 22 }}>
                    {kp.body}
                  </Text>
                </View>
              ))}
            </Section>

            <Section title="Meditation — Why It Matters">
              <Text variant="body" style={{ marginBottom: tokens.spacing.s3, color: tokens.semantic.textSecondary }}>
                {MEDITATION_BENEFITS.subtitle}
              </Text>
              {MEDITATION_BENEFITS.categories.map((cat, i) => (
                <View key={i} style={styles.benefitCategory}>
                  <Text variant="label" style={{ color: tokens.semantic.accent, letterSpacing: 1.5 }}>
                    {cat.area.toUpperCase()}
                  </Text>
                  {cat.effects.map((e, j) => (
                    <View key={j} style={styles.bulletRow}>
                      <View style={styles.bulletDot} />
                      <Text variant="body" style={{ flex: 1 }}>{e}</Text>
                    </View>
                  ))}
                </View>
              ))}
              <Text variant="body" style={styles.closingItalic}>
                {MEDITATION_BENEFITS.closing}
              </Text>
            </Section>

            <View style={styles.closingCard}>
              <Text variant="heading3">{CLOSING.title}</Text>
              {CLOSING.body.map((p, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>
                  {p}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* PRACTICES TAB */}
        {tab === 'practices' && (
          <View style={styles.content}>
            {/* The 4 core foundations */}
            <SectionLabel>The Four Foundations</SectionLabel>
            {FOUNDATIONS.map((f) => (
              <ExpandableCard
                key={f.id}
                id={f.id}
                title={f.title}
                subtitle={f.essence}
                isOpen={expandedPractice === f.id}
                onToggle={() =>
                  setExpandedPractice(expandedPractice === f.id ? null : f.id)
                }
              >
                <InfoSection label="HOW IT RAISES VIBRATION">
                  {f.howItRaisesVibration}
                </InfoSection>
                <InfoSection label="DAILY MINIMUM">{f.dailyMinimum}</InfoSection>
                <InfoSection label="AVOID">{f.whatToAvoid}</InfoSection>
                <Text variant="label" style={styles.infoLabel}>DEEPER PRACTICES</Text>
                {f.deeperPractices.map((p, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text variant="body" style={{ flex: 1 }}>{p}</Text>
                  </View>
                ))}
              </ExpandableCard>
            ))}

            {/* Body basics */}
            <SectionLabel>Body Basics</SectionLabel>
            <ExpandableCard
              id="grounding"
              title="Grounding / Earthing"
              subtitle={GROUNDING_PRACTICE.essence}
              isOpen={expandedPractice === 'grounding'}
              onToggle={() =>
                setExpandedPractice(expandedPractice === 'grounding' ? null : 'grounding')
              }
            >
              {GROUNDING_PRACTICE.why.map((p, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>{p}</Text>
              ))}
              <Text variant="label" style={styles.infoLabel}>PRACTICES</Text>
              {GROUNDING_PRACTICE.practices.map((pr, i) => (
                <View key={i} style={styles.subPractice}>
                  <Text variant="heading3">{pr.name}</Text>
                  <Text variant="label" style={{ color: tokens.semantic.accent }}>
                    {pr.duration.toUpperCase()}
                  </Text>
                  <Text variant="body" style={{ marginTop: 4 }}>{pr.how}</Text>
                </View>
              ))}
              <Text variant="body" style={[styles.paragraph, styles.closingItalic]}>
                {GROUNDING_PRACTICE.quickReset}
              </Text>
            </ExpandableCard>

            <ExpandableCard
              id="hydration"
              title="Hydration"
              subtitle={HYDRATION_PRACTICE.essence}
              isOpen={expandedPractice === 'hydration'}
              onToggle={() =>
                setExpandedPractice(expandedPractice === 'hydration' ? null : 'hydration')
              }
            >
              {HYDRATION_PRACTICE.why.map((p, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>{p}</Text>
              ))}
              <Text variant="label" style={styles.infoLabel}>DAILY PRACTICE</Text>
              {HYDRATION_PRACTICE.dailyPractice.map((p, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text variant="body" style={{ flex: 1 }}>{p}</Text>
                </View>
              ))}
              <View style={styles.sacredPracticeCard}>
                <Text variant="heading3" style={{ color: tokens.semantic.accent }}>
                  {HYDRATION_PRACTICE.sacredPractice.title}
                </Text>
                <Text variant="body" style={{ marginTop: tokens.spacing.s2, fontStyle: 'italic' }}>
                  {HYDRATION_PRACTICE.sacredPractice.guidance}
                </Text>
              </View>
              <Text variant="label" style={styles.infoLabel}>SIGNS OF DEHYDRATION</Text>
              {HYDRATION_PRACTICE.signsOfDehydration.map((s, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={[styles.bulletDot, { backgroundColor: tokens.semantic.textSecondary }]} />
                  <Text variant="body" style={{ flex: 1 }}>{s}</Text>
                </View>
              ))}
            </ExpandableCard>

            <ExpandableCard
              id="nourishment"
              title="Nourishing Food"
              subtitle={NOURISHMENT_PRACTICE.essence}
              isOpen={expandedPractice === 'nourishment'}
              onToggle={() =>
                setExpandedPractice(expandedPractice === 'nourishment' ? null : 'nourishment')
              }
            >
              {NOURISHMENT_PRACTICE.why.map((p, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>{p}</Text>
              ))}
              <Text variant="label" style={styles.infoLabel}>PRINCIPLES</Text>
              {NOURISHMENT_PRACTICE.principles.map((pr, i) => (
                <View key={i} style={styles.subPractice}>
                  <Text variant="heading3" style={{ color: tokens.semantic.accent }}>
                    {pr.title}
                  </Text>
                  <Text variant="body" style={{ marginTop: 4 }}>{pr.body}</Text>
                </View>
              ))}
              <Text variant="label" style={styles.infoLabel}>DAILY BASICS</Text>
              {NOURISHMENT_PRACTICE.dailyBasics.map((d, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text variant="body" style={{ flex: 1 }}>{d}</Text>
                </View>
              ))}
              <Text variant="label" style={[styles.closingItalic, { marginTop: tokens.spacing.s3 }]}>
                {NOURISHMENT_PRACTICE.note}
              </Text>
            </ExpandableCard>

            {/* Energy practices */}
            <SectionLabel>Energy Practices</SectionLabel>
            <ExpandableCard
              id="sacral"
              title="Daily Sacral Practice"
              subtitle={SACRAL_PRACTICE.essence}
              isOpen={expandedPractice === 'sacral'}
              onToggle={() =>
                setExpandedPractice(expandedPractice === 'sacral' ? null : 'sacral')
              }
            >
              {SACRAL_PRACTICE.why.map((p, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>{p}</Text>
              ))}
              <Text variant="label" style={styles.infoLabel}>5-MINUTE DAILY</Text>
              {SACRAL_PRACTICE.dailyFiveMinute.map((d, i) => (
                <View key={i} style={styles.bulletRow}>
                  <Text variant="body" style={[styles.bulletNumber, { color: tokens.semantic.accent }]}>
                    {i + 1}.
                  </Text>
                  <Text variant="body" style={{ flex: 1 }}>{d}</Text>
                </View>
              ))}
              <Text variant="label" style={styles.infoLabel}>WEEKLY DEEPER</Text>
              {SACRAL_PRACTICE.weeklyDeeper.map((d, i) => (
                <View key={i} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text variant="body" style={{ flex: 1 }}>{d}</Text>
                </View>
              ))}
              <View style={styles.sacredPracticeCard}>
                <Text variant="label" style={{ color: tokens.semantic.accent }}>SHADOW TO WATCH</Text>
                <Text variant="body" style={{ marginTop: tokens.spacing.s2 }}>
                  {SACRAL_PRACTICE.shadowToWatch}
                </Text>
                <Text variant="displayItalic" style={{ marginTop: tokens.spacing.s3, color: tokens.semantic.accent }}>
                  "{SACRAL_PRACTICE.mantraPhrase}"
                </Text>
              </View>
            </ExpandableCard>
          </View>
        )}

        {/* DAILY CHECK TAB */}
        {tab === 'daily-check' && (
          <View style={styles.content}>
            <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
              End-of-day alignment check
            </Text>
            <Text variant="heading2" style={{ marginTop: tokens.spacing.s2 }}>
              The Four Foundations Today
            </Text>
            <Text variant="body" style={{ marginTop: tokens.spacing.s3, color: tokens.semantic.textSecondary }}>
              A gentle check-in. No judgment. Just seeing where you are.
            </Text>

            <View style={{ marginTop: tokens.spacing.s8, gap: tokens.spacing.s5 }}>
              {DAILY_FOUNDATION_CHECK.map((item, i) => (
                <View key={item.foundation} style={styles.checkCard}>
                  <Text variant="label" style={{ color: tokens.semantic.accent }}>
                    {i + 1} · {item.foundation.toUpperCase()}
                  </Text>
                  <Text variant="heading3" style={{ marginTop: tokens.spacing.s1 }}>
                    {item.question}
                  </Text>
                  <Text variant="body" style={{ marginTop: tokens.spacing.s2, color: tokens.semantic.textSecondary, fontStyle: 'italic' }}>
                    {item.minimumAction}
                  </Text>
                </View>
              ))}
            </View>

            <View style={{ marginTop: tokens.spacing.s8 }}>
              <Button
                variant="primary"
                onPress={() => router.push('/journal/write')}
              >
                Log in Journal
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

// ========== REUSABLE ==========

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: tokens.spacing.s8 }}>
      <Text variant="heading2" style={{ marginBottom: tokens.spacing.s3 }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text variant="eyebrow" style={{ color: tokens.semantic.accent, marginTop: tokens.spacing.s5, marginBottom: tokens.spacing.s2 }}>
      {children}
    </Text>
  );
}

function InfoSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: tokens.spacing.s3 }}>
      <Text variant="label" style={styles.infoLabel}>{label}</Text>
      <Text variant="body" style={{ lineHeight: 22 }}>{children}</Text>
    </View>
  );
}

function ExpandableCard({
  id,
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable onPress={onToggle} style={styles.expandableCard}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text variant="heading3">{title}</Text>
          <Text variant="body" style={{ color: tokens.semantic.textSecondary, marginTop: 4, fontStyle: 'italic' }}>
            {subtitle}
          </Text>
        </View>
        <Text variant="heading3" style={{ color: tokens.semantic.accent, marginLeft: tokens.spacing.s3 }}>
          {isOpen ? '−' : '+'}
        </Text>
      </View>
      {isOpen && <View style={styles.cardBody}>{children}</View>}
    </Pressable>
  );
}

// ========== STYLES ==========

const styles = StyleSheet.create({
  scroll: { paddingBottom: tokens.spacing.s12 },
  backBtn: { padding: tokens.spacing.s3 },
  hero: {
    padding: tokens.spacing.s5,
    paddingTop: tokens.spacing.s5,
    paddingBottom: tokens.spacing.s8,
  },
  heroTitle: { marginTop: tokens.spacing.s2 },
  heroTagline: {
    marginTop: tokens.spacing.s3,
    fontStyle: 'italic',
    color: tokens.semantic.textSecondary,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderDefault,
    marginHorizontal: tokens.spacing.s5,
  },
  tab: {
    flex: 1,
    paddingVertical: tokens.spacing.s3,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  content: { padding: tokens.spacing.s5 },
  introBlock: { gap: tokens.spacing.s3 },
  paragraph: { lineHeight: 24, marginBottom: tokens.spacing.s2 },
  coreTeaching: {
    marginTop: tokens.spacing.s5,
    color: tokens.semantic.accent,
    textAlign: 'center',
  },
  principleCard: {
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderLeftWidth: 3,
    borderLeftColor: tokens.semantic.accent,
    marginBottom: tokens.spacing.s3,
  },
  benefitCategory: {
    marginBottom: tokens.spacing.s5,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    gap: tokens.spacing.s2,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 9,
    backgroundColor: tokens.semantic.accent,
  },
  bulletNumber: { width: 24 },
  closingItalic: {
    marginTop: tokens.spacing.s3,
    color: tokens.semantic.textSecondary,
    fontStyle: 'italic',
  },
  closingCard: {
    marginTop: tokens.spacing.s8,
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    borderColor: tokens.semantic.accent,
    gap: tokens.spacing.s2,
  },
  expandableCard: {
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    marginBottom: tokens.spacing.s3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBody: {
    marginTop: tokens.spacing.s3,
    paddingTop: tokens.spacing.s3,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderDefault,
    gap: tokens.spacing.s2,
  },
  infoLabel: {
    color: tokens.semantic.accent,
    letterSpacing: 1.5,
    marginTop: tokens.spacing.s3,
    marginBottom: tokens.spacing.s1,
  },
  subPractice: {
    paddingVertical: tokens.spacing.s2,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderDefault,
  },
  sacredPracticeCard: {
    marginTop: tokens.spacing.s3,
    padding: tokens.spacing.s3,
    backgroundColor: tokens.semantic.bgBase,
    borderRadius: tokens.radii.sm,
    borderLeftWidth: 2,
    borderLeftColor: tokens.semantic.accent,
  },
  checkCard: {
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderLeftWidth: 3,
    borderLeftColor: tokens.semantic.accent,
  },
});
