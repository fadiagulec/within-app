/**
 * Within — Energy Hygiene screen.
 *
 * Daily practice (different in purpose from the Quantum Unblocking — that
 * heals the past, this cleans the present every day). Same anchor frame:
 * rooted at Earth, lifted at Crown, held at Heart.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import {
  ENERGY_HYGIENE_OVERVIEW,
  ENERGY_HYGIENE_STEPS,
  ENERGY_HYGIENE_ANCHOR,
  ENERGY_HYGIENE_DAILY_REMINDER,
  ENERGY_HYGIENE_KEY_REMINDERS,
  ENERGY_HYGIENE_CLOSING,
  ENERGY_HYGIENE_FOOTER,
  getHygieneDurationMin,
} from '@/data/energy-hygiene';

export default function EnergyHygieneScreen() {
  const router = useRouter();
  const [openStep, setOpenStep] = useState<number | null>(1);
  const totalMin = getHygieneDurationMin();

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/methods' as never);
  }

  function toggleStep(n: number) {
    setOpenStep((cur) => (cur === n ? null : n));
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

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{ENERGY_HYGIENE_OVERVIEW.tagline.toUpperCase()}</Text>
          <Text style={styles.h1}>{ENERGY_HYGIENE_OVERVIEW.title}</Text>
          <Text style={styles.subtitle}>
            A daily practice for the field that holds the rest of you.
          </Text>
        </View>

        {/* Intent + listen */}
        <View style={styles.intentCard}>
          <View style={styles.intentHead}>
            <Text style={styles.intentKicker}>WHY HYGIENE</Text>
            <SpeechPlayer
              text={`${ENERGY_HYGIENE_OVERVIEW.title}. ${ENERGY_HYGIENE_OVERVIEW.intent} The seven steps: ${ENERGY_HYGIENE_STEPS.map((s) => `Step ${s.number}: ${s.title}. ${s.actions.join('. ')}. ${s.purpose}`).join(' ')}. ${ENERGY_HYGIENE_DAILY_REMINDER}`}
              accent={tokens.semantic.accent}
              label="LISTEN TO FULL PRACTICE"
              size="sm"
            />
          </View>
          <Text style={styles.intentBody}>{ENERGY_HYGIENE_OVERVIEW.intent}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>~{totalMin} min full practice</Text>
            <Text style={styles.metaText}>7 steps · daily</Text>
          </View>
        </View>

        {/* The 7 steps */}
        <Text style={styles.sectionLabel}>THE 7-STEP PRACTICE</Text>
        <View style={styles.stepsCol}>
          {ENERGY_HYGIENE_STEPS.map((step) => {
            const open = openStep === step.number;
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
                  <Text style={styles.stepTitle}>{step.title}</Text>
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
                    <View
                      style={[
                        styles.purposeBox,
                        { backgroundColor: `${step.accent}1A`, borderColor: `${step.accent}40` },
                      ]}
                    >
                      <Text style={[styles.purposeKicker, { color: step.accent }]}>PURPOSE</Text>
                      <Text style={styles.purposeBody}>{step.purpose}</Text>
                    </View>
                    <View style={{ marginTop: 12 }}>
                      <SpeechPlayer
                        text={`Step ${step.number}: ${step.title}. ${step.actions.join('. ')}. ${step.purpose}`}
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

        {/* Energetic anchor */}
        <Text style={styles.sectionLabel}>ENERGETIC ANCHOR</Text>
        <View style={styles.anchorCard}>
          {ENERGY_HYGIENE_ANCHOR.map((a, i) => (
            <View key={i} style={styles.anchorRow}>
              <Text style={[styles.anchorBullet, { color: a.accent }]}>♥</Text>
              <Text style={styles.anchorText}>{a.label}</Text>
            </View>
          ))}
        </View>

        {/* Daily reminder */}
        <View style={styles.reminderCard}>
          <Text style={styles.reminderKicker}>DAILY REMINDER</Text>
          <Text style={styles.reminderBody}>{ENERGY_HYGIENE_DAILY_REMINDER}</Text>
        </View>

        {/* Key reminders */}
        <Text style={styles.sectionLabel}>KEY REMINDERS</Text>
        <View style={styles.remindersCol}>
          {ENERGY_HYGIENE_KEY_REMINDERS.map((r, i) => (
            <View key={i} style={styles.reminderRow}>
              <Text style={styles.reminderStar}>★</Text>
              <Text style={styles.reminderItem}>{r}</Text>
            </View>
          ))}
        </View>

        {/* Closing declaration — dark inverted */}
        <View style={styles.closingCard}>
          <Text style={styles.closingKicker}>CLOSING DECLARATION</Text>
          <View style={{ marginTop: 14 }}>
            {ENERGY_HYGIENE_CLOSING.map((line, i) => (
              <Text key={i} style={styles.closingLine}>
                {line}
              </Text>
            ))}
          </View>
          <View style={{ alignSelf: 'center', marginTop: 18 }}>
            <SpeechPlayer
              text={ENERGY_HYGIENE_CLOSING.join(' ')}
              accent="#F5E8DC"
              label="LISTEN"
              size="sm"
            />
          </View>
        </View>

        {/* Footer tagline */}
        <Text style={styles.footerTagline}>{ENERGY_HYGIENE_FOOTER}</Text>
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

  hero: {
    alignItems: 'center',
    marginBottom: 22,
  },
  eyebrow: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.4,
    color: tokens.semantic.accent,
    marginBottom: 14,
    textAlign: 'center',
  },
  h1: {
    fontFamily: tokens.fonts.display,
    fontSize: 38,
    lineHeight: 46,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 24,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    maxWidth: 360,
  },

  intentCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.94)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 22,
  },
  intentHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  intentKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    color: tokens.semantic.accent,
  },
  intentBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: tokens.semantic.textPrimary,
  },
  metaRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.2,
    color: tokens.semantic.textTertiary,
  },

  sectionLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.2,
    color: tokens.semantic.textTertiary,
    marginBottom: 12,
    marginTop: 6,
    paddingHorizontal: 4,
  },

  stepsCol: {
    gap: 10,
    marginBottom: 24,
  },
  stepCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.92)',
    borderRadius: 16,
    borderLeftWidth: 5,
    padding: 16,
  },
  stepHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontFamily: tokens.fonts.displayBold,
    fontSize: 16,
  },
  stepTitle: {
    flex: 1,
    fontFamily: tokens.fonts.bodySemiBold,
    fontSize: 16,
    color: tokens.semantic.textPrimary,
  },
  stepToggle: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 26,
    lineHeight: 26,
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
    marginTop: 8,
  },
  actionText: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
  },
  purposeBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  purposeKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
  },
  purposeBody: {
    marginTop: 6,
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textPrimary,
  },

  anchorCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },
  anchorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  anchorBullet: {
    fontSize: 18,
    width: 22,
  },
  anchorText: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textPrimary,
    lineHeight: 22,
  },

  reminderCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.92)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    alignItems: 'center',
  },
  reminderKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    color: tokens.semantic.accent,
    marginBottom: 12,
  },
  reminderBody: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 17,
    lineHeight: 26,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
  },

  remindersCol: {
    backgroundColor: 'rgba(255, 250, 245, 0.85)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 8,
  },
  reminderStar: {
    fontSize: 16,
    color: tokens.semantic.accent,
    width: 20,
    textAlign: 'center',
  },
  reminderItem: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
  },

  closingCard: {
    backgroundColor: 'rgba(45, 41, 53, 0.94)',
    borderRadius: 18,
    padding: 22,
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
    fontSize: 19,
    lineHeight: 30,
    color: '#F5E8DC',
    textAlign: 'center',
  },

  footerTagline: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 15,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
});
