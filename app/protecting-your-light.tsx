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
  PROTECTING_OVERVIEW,
  ENERGY_DRAINS,
  ENVIRONMENTAL_TOOLS,
  CLEARING_PRACTICES,
  PROTECTION_PRACTICES,
  UNTETHERING_MEDITATION,
} from '@/data/protecting-your-light';

type Tab = 'why' | 'tools' | 'clear' | 'protect' | 'untether';

const TABS: { id: Tab; label: string }[] = [
  { id: 'why', label: 'Why' },
  { id: 'tools', label: 'Environment' },
  { id: 'clear', label: 'Clearing' },
  { id: 'protect', label: 'Protecting' },
  { id: 'untether', label: 'Untether' },
];

export default function ProtectingYourLight() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('why');
  const [expanded, setExpanded] = useState<string | null>(null);

  const pick = (t: Tab) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTab(t);
    setExpanded(null);
  };

  const toggle = (id: string) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>← Back</Text>
        </Pressable>

        <LinearGradient colors={[`${tokens.semantic.accent}30`, 'transparent']} style={styles.hero}>
          <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
            Pillar · Energy Hygiene
          </Text>
          <Text variant="heading1" style={styles.heroTitle}>
            {PROTECTING_OVERVIEW.title}
          </Text>
          <Text variant="body" style={styles.heroTagline}>
            {PROTECTING_OVERVIEW.tagline}
          </Text>
        </LinearGradient>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={{ paddingHorizontal: tokens.spacing.s5, gap: tokens.spacing.s2 }}>
          {TABS.map((t) => (
            <Pressable
              key={t.id}
              onPress={() => pick(t.id)}
              style={[
                styles.tab,
                tab === t.id && { backgroundColor: tokens.semantic.accent },
              ]}
            >
              <Text
                variant="label"
                style={{
                  color: tab === t.id ? tokens.semantic.bgBase : tokens.semantic.textPrimary,
                }}
              >
                {t.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.content}>
          {/* WHY */}
          {tab === 'why' && (
            <View style={{ gap: tokens.spacing.s3 }}>
              {PROTECTING_OVERVIEW.intro.map((p, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>{p}</Text>
              ))}
              <Text variant="displayItalic" style={styles.coreTeaching}>
                {PROTECTING_OVERVIEW.coreTeaching}
              </Text>

              <Text variant="eyebrow" style={[styles.sectionLabel, { marginTop: tokens.spacing.s8 }]}>
                COMMON ENERGY DRAINS
              </Text>
              {ENERGY_DRAINS.map((d, i) => (
                <View key={i} style={styles.drainCard}>
                  <Text variant="heading3" style={{ color: tokens.semantic.textPrimary }}>
                    {d.drain}
                  </Text>
                  <Text variant="body" style={{ color: tokens.semantic.textSecondary, marginTop: 4 }}>
                    {d.cost}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* ENVIRONMENTAL TOOLS */}
          {tab === 'tools' && (
            <View style={{ gap: tokens.spacing.s3 }}>
              <Text variant="body" style={{ color: tokens.semantic.textSecondary, marginBottom: tokens.spacing.s2 }}>
                Your environment is a constant frequency broadcast. These tools help you tune it consciously.
              </Text>
              {ENVIRONMENTAL_TOOLS.map((tool) => (
                <Pressable key={tool.id} onPress={() => toggle(tool.id)} style={styles.expandCard}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text variant="label" style={{ color: tokens.semantic.accent }}>
                        {tool.category.toUpperCase()}
                      </Text>
                      <Text variant="heading3" style={{ marginTop: 4 }}>
                        {tool.name}
                      </Text>
                      <Text variant="body" style={{ color: tokens.semantic.textSecondary, marginTop: 4, fontStyle: 'italic' }}>
                        {tool.essence}
                      </Text>
                    </View>
                    <Text variant="heading3" style={{ color: tokens.semantic.accent, marginLeft: tokens.spacing.s3 }}>
                      {expanded === tool.id ? '−' : '+'}
                    </Text>
                  </View>
                  {expanded === tool.id && (
                    <View style={styles.expandBody}>
                      <Text variant="body" style={styles.paragraph}>{tool.howItWorks}</Text>
                      <Text variant="label" style={styles.infoLabel}>HOW TO USE</Text>
                      {tool.howToUse.map((h, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <View style={styles.bulletDot} />
                          <Text variant="body" style={{ flex: 1 }}>{h}</Text>
                        </View>
                      ))}
                      {tool.scienceNote && (
                        <>
                          <Text variant="label" style={styles.infoLabel}>SCIENCE</Text>
                          <Text variant="body" style={{ color: tokens.semantic.textSecondary, fontStyle: 'italic' }}>
                            {tool.scienceNote}
                          </Text>
                        </>
                      )}
                      {tool.caution && (
                        <View style={styles.cautionBox}>
                          <Text variant="label" style={{ color: tokens.semantic.accent }}>CAUTION</Text>
                          <Text variant="body" style={{ marginTop: 4 }}>{tool.caution}</Text>
                        </View>
                      )}
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          )}

          {/* CLEARING PRACTICES */}
          {tab === 'clear' && (
            <View style={{ gap: tokens.spacing.s3 }}>
              <Text variant="body" style={{ color: tokens.semantic.textSecondary, marginBottom: tokens.spacing.s2 }}>
                What you pick up throughout the day does not always belong to you. These practices help you clear the field — the space, the body, the mind.
              </Text>
              {CLEARING_PRACTICES.map((cp) => (
                <Pressable key={cp.id} onPress={() => toggle(cp.id)} style={styles.expandCard}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text variant="label" style={{ color: tokens.semantic.accent }}>
                        {cp.duration.toUpperCase()}
                      </Text>
                      <Text variant="heading3" style={{ marginTop: 4 }}>
                        {cp.name}
                      </Text>
                      <Text variant="body" style={{ color: tokens.semantic.textSecondary, marginTop: 4, fontStyle: 'italic' }}>
                        {cp.when}
                      </Text>
                    </View>
                    <Text variant="heading3" style={{ color: tokens.semantic.accent, marginLeft: tokens.spacing.s3 }}>
                      {expanded === cp.id ? '−' : '+'}
                    </Text>
                  </View>
                  {expanded === cp.id && (
                    <View style={styles.expandBody}>
                      <Text variant="label" style={styles.infoLabel}>HOW TO PRACTICE</Text>
                      {cp.how.map((step, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text variant="body" style={styles.stepNumber}>{i + 1}.</Text>
                          <Text variant="body" style={{ flex: 1 }}>{step}</Text>
                        </View>
                      ))}
                      <Text variant="body" style={styles.closingItalic}>
                        {cp.closing}
                      </Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          )}

          {/* PROTECTION PRACTICES */}
          {tab === 'protect' && (
            <View style={{ gap: tokens.spacing.s3 }}>
              {PROTECTION_PRACTICES.intro.map((p, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>{p}</Text>
              ))}
              <Text variant="eyebrow" style={[styles.sectionLabel, { marginTop: tokens.spacing.s5 }]}>
                DAILY PROTECTION PRACTICES
              </Text>
              {PROTECTION_PRACTICES.practices.map((p, i) => (
                <View key={i} style={styles.practiceCard}>
                  <Text variant="label" style={{ color: tokens.semantic.accent }}>
                    {p.duration.toUpperCase()}
                  </Text>
                  <Text variant="heading3" style={{ marginTop: tokens.spacing.s1 }}>
                    {p.name}
                  </Text>
                  <Text variant="body" style={{ marginTop: tokens.spacing.s2, lineHeight: 22 }}>
                    {p.how}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* UNTETHERING MEDITATION */}
          {tab === 'untether' && (
            <View style={{ gap: tokens.spacing.s3 }}>
              <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
                {UNTETHERING_MEDITATION.duration.toUpperCase()}
              </Text>
              <Text variant="heading2" style={{ marginTop: tokens.spacing.s1 }}>
                {UNTETHERING_MEDITATION.title}
              </Text>
              <Text variant="displayItalic" style={{ color: tokens.semantic.accent, marginTop: tokens.spacing.s2 }}>
                {UNTETHERING_MEDITATION.essence}
              </Text>

              {UNTETHERING_MEDITATION.why.map((p, i) => (
                <Text key={i} variant="body" style={styles.paragraph}>{p}</Text>
              ))}

              <Text variant="eyebrow" style={[styles.sectionLabel, { marginTop: tokens.spacing.s5 }]}>
                THE PRACTICE
              </Text>
              {UNTETHERING_MEDITATION.fullScript.map((phase, i) => (
                <View key={i} style={styles.phaseCard}>
                  <Text variant="label" style={{ color: tokens.semantic.accent }}>
                    {String(i + 1).padStart(2, '0')} · {phase.phase.toUpperCase()}
                  </Text>
                  <Text variant="body" style={{ marginTop: tokens.spacing.s2, lineHeight: 22 }}>
                    {phase.body}
                  </Text>
                </View>
              ))}

              <View style={styles.afterNoteCard}>
                <Text variant="label" style={{ color: tokens.semantic.accent }}>AFTER THE PRACTICE</Text>
                <Text variant="body" style={{ marginTop: tokens.spacing.s2, fontStyle: 'italic', lineHeight: 22 }}>
                  {UNTETHERING_MEDITATION.afterNote}
                </Text>
                <Text variant="label" style={{ marginTop: tokens.spacing.s3, color: tokens.semantic.textSecondary }}>
                  PAIRS WITH: {UNTETHERING_MEDITATION.pairsWith}
                </Text>
              </View>

              <View style={{ marginTop: tokens.spacing.s3 }}>
                <Button
                  variant="primary"
                  onPress={() => router.push('/mirror')}
                >
                  Open Mirror Mode First
                </Button>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: tokens.spacing.s12 },
  backBtn: { padding: tokens.spacing.s3 },
  hero: {
    padding: tokens.spacing.s5,
    paddingBottom: tokens.spacing.s8,
  },
  heroTitle: { marginTop: tokens.spacing.s2 },
  heroTagline: {
    marginTop: tokens.spacing.s3,
    fontStyle: 'italic',
    color: tokens.semantic.textSecondary,
    lineHeight: 22,
  },
  tabs: {
    marginTop: tokens.spacing.s3,
    marginBottom: tokens.spacing.s5,
    flexGrow: 0,
  },
  tab: {
    paddingHorizontal: tokens.spacing.s3,
    paddingVertical: tokens.spacing.s2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  content: { padding: tokens.spacing.s5 },
  paragraph: { lineHeight: 24, marginBottom: tokens.spacing.s2 },
  coreTeaching: {
    marginTop: tokens.spacing.s3,
    color: tokens.semantic.accent,
    textAlign: 'center',
  },
  sectionLabel: {
    color: tokens.semantic.accent,
    marginBottom: tokens.spacing.s2,
    letterSpacing: 1.5,
  },
  drainCard: {
    padding: tokens.spacing.s3,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.sm,
    borderLeftWidth: 3,
    borderLeftColor: tokens.semantic.accent,
    marginBottom: tokens.spacing.s2,
  },
  expandCard: {
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
  expandBody: {
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
  stepNumber: {
    color: tokens.semantic.accent,
    width: 24,
  },
  cautionBox: {
    marginTop: tokens.spacing.s3,
    padding: tokens.spacing.s3,
    backgroundColor: tokens.semantic.bgBase,
    borderRadius: tokens.radii.sm,
    borderLeftWidth: 2,
    borderLeftColor: tokens.semantic.accent,
  },
  closingItalic: {
    marginTop: tokens.spacing.s3,
    color: tokens.semantic.textSecondary,
    fontStyle: 'italic',
  },
  practiceCard: {
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderLeftWidth: 3,
    borderLeftColor: tokens.semantic.accent,
  },
  phaseCard: {
    padding: tokens.spacing.s3,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.sm,
    borderLeftWidth: 2,
    borderLeftColor: tokens.semantic.accent,
  },
  afterNoteCard: {
    marginTop: tokens.spacing.s5,
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.accent,
  },
});
