/**
 * Within — The 7-Step Quantum Unblocking Process.
 *
 * "Rooted Through 1, Pulled Through 7" — the founder's signature timeline
 * healing protocol. Universal method underneath every chakra-specific
 * unblocking in the app.
 *
 * Layout matches the sunset palette + reference card structure.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { HeroImage } from '@/components/HeroImage';
import { HERO_IMAGERY } from '@/data/imagery';
import {
  UNBLOCKING_OVERVIEW,
  UNBLOCKING_STEPS,
  UNBLOCKING_REMINDERS,
  UNBLOCKING_CLOSING,
  UNBLOCKING_ANCHORS,
  UNBLOCKING_TAGLINE,
  getProcessDurationMin,
} from '@/data/unblocking-process';

export default function UnblockingProcessScreen() {
  const router = useRouter();
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)' as never);
  }

  function toggleStep(n: number) {
    setExpandedStep((current) => (current === n ? null : n));
  }

  const totalMin = getProcessDurationMin();

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

        {/* HERO with image background */}
        <HeroImage
          uri={HERO_IMAGERY.dawnMountains}
          tint="#2D2935"
          overlayStrength={0.62}
          style={styles.heroImage}
        >
          <View style={styles.heroOnImageInner}>
            <Text style={[styles.titleLine, { color: '#FFFFFF' }]}>
              ROOTED THROUGH <Text style={{ color: '#E8C9C2', fontFamily: tokens.fonts.displayBold }}>1</Text>
            </Text>
            <Text style={[styles.titleLine, { color: '#FFFFFF' }]}>
              PULLED THROUGH <Text style={{ color: '#C9B7E5', fontFamily: tokens.fonts.displayBold }}>7</Text>
            </Text>
            <Text style={[styles.subtitle, { color: '#F5E8DC', opacity: 0.95 }]}>
              {UNBLOCKING_OVERVIEW.subtitle}
            </Text>
          </View>
        </HeroImage>

        {/* Intro card + listen */}
        <View style={styles.hero}>
          <Text style={styles.heroIntro}>{UNBLOCKING_OVERVIEW.intro}</Text>

          <View style={styles.listenRow}>
            <SpeechPlayer
              text={`${UNBLOCKING_OVERVIEW.title}. ${UNBLOCKING_OVERVIEW.subtitle}. ${UNBLOCKING_OVERVIEW.intro} ${UNBLOCKING_OVERVIEW.purpose}`}
              accent={tokens.semantic.accent}
              label="LISTEN TO INTRO"
            />
            <View style={styles.durChip}>
              <Text style={styles.durChipText}>~{totalMin} MIN</Text>
            </View>
          </View>
        </View>

        {/* PURPOSE + TIMELINE */}
        <View style={styles.twoCol}>
          <View style={[styles.dualCard, { borderLeftColor: '#9B5BA1' }]}>
            <Text style={styles.dualKicker}>THE PURPOSE</Text>
            <Text style={styles.dualBody}>{UNBLOCKING_OVERVIEW.purpose}</Text>
          </View>
          <View style={[styles.dualCard, { borderLeftColor: '#B33B3B' }]}>
            <Text style={styles.dualKicker}>THE TIMELINE</Text>
            <Text style={styles.dualBody}>{UNBLOCKING_OVERVIEW.timeline}</Text>
          </View>
        </View>

        {/* THE 7 STEPS */}
        <Text style={styles.sectionHeader}>The 7-step process</Text>
        <View style={styles.stepsCol}>
          {UNBLOCKING_STEPS.map((step) => {
            const open = expandedStep === step.number;
            return (
              <Pressable
                key={step.number}
                onPress={() => toggleStep(step.number)}
                accessibilityRole="button"
                accessibilityLabel={`Step ${step.number}: ${step.title}`}
                accessibilityState={{ expanded: open }}
                style={({ pressed }) => [
                  styles.stepCard,
                  { borderLeftColor: step.accent },
                  pressed && { opacity: 0.92 },
                ]}
              >
                <View style={styles.stepHead}>
                  <View style={[styles.stepNumberCircle, { backgroundColor: step.accent }]}>
                    <Text style={styles.stepNumberText}>{step.number}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepEssence}>{step.essence}</Text>
                  </View>
                  <Text style={[styles.stepToggle, { color: step.accent }]}>
                    {open ? '−' : '+'}
                  </Text>
                </View>

                {open ? (
                  <View style={styles.stepBody}>
                    {step.actions.map((a, i) => (
                      <View key={i} style={styles.actionRow}>
                        <View style={[styles.actionDot, { backgroundColor: step.accent }]} />
                        <Text style={styles.actionText}>{a}</Text>
                      </View>
                    ))}
                    <View style={[styles.whyBox, { backgroundColor: `${step.accent}1A`, borderColor: `${step.accent}40` }]}>
                      <Text style={[styles.whyKicker, { color: step.accent }]}>WHY IT WORKS</Text>
                      <Text style={styles.whyBody}>{step.why}</Text>
                    </View>
                    <View style={styles.stepFooter}>
                      <Text style={styles.stepDuration}>~{step.durationMin} min</Text>
                      <SpeechPlayer
                        text={`Step ${step.number}: ${step.title}. ${step.essence}. ${step.actions.join('. ')}. ${step.why}`}
                        accent={step.accent}
                        label="LISTEN"
                        size="sm"
                      />
                    </View>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {/* ENERGETIC ANCHOR */}
        <View style={styles.anchorCard}>
          <Text style={styles.anchorKicker}>ENERGETIC ANCHOR</Text>
          <View style={styles.anchorRow}>
            <Text style={[styles.anchorBullet, { color: '#B33B3B' }]}>♥</Text>
            <Text style={styles.anchorText}>{UNBLOCKING_ANCHORS.groundedAt.label} ({UNBLOCKING_ANCHORS.groundedAt.number})</Text>
          </View>
          <View style={styles.anchorRow}>
            <Text style={[styles.anchorBullet, { color: '#9B5BA1' }]}>♥</Text>
            <Text style={styles.anchorText}>{UNBLOCKING_ANCHORS.pulledFrom.label} ({UNBLOCKING_ANCHORS.pulledFrom.number})</Text>
          </View>
          <View style={styles.anchorRow}>
            <Text style={[styles.anchorBullet, { color: '#3F8A5F' }]}>♥</Text>
            <Text style={styles.anchorText}>{UNBLOCKING_ANCHORS.heldIn.label} ({UNBLOCKING_ANCHORS.heldIn.number})</Text>
          </View>
        </View>

        {/* KEY REMINDERS */}
        <View style={styles.anchorCard}>
          <Text style={styles.anchorKicker}>KEY REMINDERS</Text>
          {UNBLOCKING_REMINDERS.map((r, i) => (
            <View key={i} style={styles.anchorRow}>
              <Text style={[styles.anchorBullet, { color: tokens.semantic.accent }]}>★</Text>
              <Text style={styles.anchorText}>{r}</Text>
            </View>
          ))}
        </View>

        {/* CLOSING STATEMENT */}
        <View style={[styles.closingCard, { backgroundColor: 'rgba(45, 41, 53, 0.92)' }]}>
          <Text style={styles.closingKicker}>CLOSING STATEMENT</Text>
          <View style={{ marginTop: 12 }}>
            {UNBLOCKING_CLOSING.map((line, i) => (
              <Text key={i} style={styles.closingLine}>{line}</Text>
            ))}
          </View>
          <View style={{ marginTop: 16, alignSelf: 'center' }}>
            <SpeechPlayer
              text={UNBLOCKING_CLOSING.join(' ')}
              accent="#F5E8DC"
              label="LISTEN"
              size="sm"
            />
          </View>
        </View>

        {/* TAGLINE */}
        <Text style={styles.tagline}>{UNBLOCKING_TAGLINE}</Text>
      </ScrollView>
    </InsideBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 80,
  },
  back: {
    paddingVertical: 8,
    marginBottom: 12,
  },
  backText: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textSecondary,
  },

  heroImage: {
    height: 280,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  heroOnImageInner: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
  },
  hero: {
    backgroundColor: 'rgba(255, 250, 245, 0.92)',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  titleLine: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 26,
    color: tokens.semantic.textPrimary,
    letterSpacing: 1.5,
    textAlign: 'center',
    lineHeight: 32,
  },
  titleAccent: {
    fontFamily: tokens.fonts.displayBold,
  },
  subtitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 16,
    fontStyle: 'italic',
    color: tokens.semantic.accent,
    textAlign: 'center',
    marginTop: 8,
  },
  heroIntro: {
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
    marginTop: 16,
  },
  listenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    flexWrap: 'wrap',
    gap: 8,
  },
  durChip: {
    backgroundColor: tokens.semantic.accent,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  durChipText: {
    color: '#FFFFFF',
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.2,
  },

  twoCol: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },
  dualCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 16,
    padding: 14,
    borderLeftWidth: 4,
  },
  dualKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    color: tokens.semantic.textTertiary,
    marginBottom: 8,
  },
  dualBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: tokens.semantic.textPrimary,
  },

  sectionHeader: {
    fontFamily: tokens.fonts.display,
    fontSize: 26,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },

  stepsCol: {
    gap: 10,
    marginBottom: 22,
  },
  stepCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.92)',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  stepHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontFamily: tokens.fonts.displayBold,
    fontSize: 18,
  },
  stepTitle: {
    fontFamily: tokens.fonts.bodySemiBold,
    fontSize: 16,
    color: tokens.semantic.textPrimary,
  },
  stepEssence: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    color: tokens.semantic.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  stepToggle: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 28,
    lineHeight: 28,
    marginLeft: 4,
  },
  stepBody: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(45, 41, 53, 0.08)',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  actionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
  },
  actionText: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: tokens.semantic.textPrimary,
  },
  whyBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  whyKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
  },
  whyBody: {
    marginTop: 6,
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textPrimary,
  },
  stepFooter: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepDuration: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1,
    color: tokens.semantic.textTertiary,
  },

  anchorCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.85)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },
  anchorKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    color: tokens.semantic.accent,
    marginBottom: 12,
    textAlign: 'center',
  },
  anchorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  anchorBullet: {
    fontSize: 16,
    width: 18,
  },
  anchorText: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    color: tokens.semantic.textPrimary,
    lineHeight: 22,
  },

  closingCard: {
    borderRadius: 18,
    padding: 22,
    marginTop: 6,
    marginBottom: 18,
  },
  closingKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    color: tokens.semantic.accent,
    textAlign: 'center',
  },
  closingLine: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 18,
    lineHeight: 28,
    color: '#F5E8DC',
    textAlign: 'center',
  },

  tagline: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 14,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});
