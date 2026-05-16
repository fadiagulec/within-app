/**
 * Within — Body Inquiry screen.
 *
 * The 7-step Lincoln-inspired healing practice for hearing what the body
 * is saying. Designed to be done in one sitting (~22 min), eyes closed,
 * with the page open as reference. Each step expands to show instructions,
 * prompts, why-it-matters, and a LISTEN button.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { BodyMap } from '@/components/BodyMap';
import type { BodyRegion } from '@/data/body-wisdom';
import {
  BODY_INQUIRY_OVERVIEW,
  BODY_INQUIRY_STEPS,
  BODY_INQUIRY_AFTER,
  BODY_INQUIRY_REMINDERS,
  BODY_INQUIRY_CLOSING,
  getInquiryDurationMin,
} from '@/data/body-inquiry';

export default function BodyInquiryScreen() {
  const router = useRouter();
  const [openStep, setOpenStep] = useState<number | null>(1);
  const [chosenRegion, setChosenRegion] = useState<BodyRegion | null>(null);
  const totalMin = getInquiryDurationMin();

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
          <Text style={styles.eyebrow}>BODY INQUIRY · A 7-STEP PRACTICE</Text>
          <Text style={styles.h1}>{BODY_INQUIRY_OVERVIEW.title}</Text>
          <Text style={styles.subtitle}>{BODY_INQUIRY_OVERVIEW.tagline}</Text>
        </View>

        {/* Intent + LISTEN */}
        <View style={styles.intentCard}>
          <View style={styles.intentHead}>
            <Text style={styles.intentKicker}>WHY THIS PRACTICE</Text>
            <SpeechPlayer
              text={`${BODY_INQUIRY_OVERVIEW.title}. ${BODY_INQUIRY_OVERVIEW.intent} The seven steps: ${BODY_INQUIRY_STEPS.map((s) => `Step ${s.number}: ${s.title}. ${s.intent} ${s.instructions.join(' ')}. ${s.why}`).join(' ')} ${BODY_INQUIRY_CLOSING}`}
              accent={tokens.semantic.accent}
              label="LISTEN TO FULL PRACTICE"
              size="sm"
            />
          </View>
          <Text style={styles.intentBody}>{BODY_INQUIRY_OVERVIEW.intent}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>~{totalMin} min · 7 steps</Text>
            <Text style={styles.metaText}>Seated or lying down</Text>
          </View>
        </View>

        {/* When to use + what you need */}
        <View style={[styles.subCard, { borderLeftColor: '#5645A6' }]}>
          <Text style={[styles.subCardKicker, { color: '#5645A6' }]}>WHEN TO USE THIS</Text>
          <Text style={styles.subCardBody}>{BODY_INQUIRY_OVERVIEW.whenToUse}</Text>
        </View>
        <View style={[styles.subCard, { borderLeftColor: '#3F8A5F', marginBottom: 22 }]}>
          <Text style={[styles.subCardKicker, { color: '#3F8A5F' }]}>WHAT YOU NEED</Text>
          <Text style={styles.subCardBody}>{BODY_INQUIRY_OVERVIEW.whatYouNeed}</Text>
        </View>

        {/* Body picker — choose the spot before you start */}
        <Text style={styles.sectionLabel}>WHERE IS YOUR BODY ASKING?</Text>
        <View style={styles.bodyPickerCard}>
          <Text style={styles.bodyPickerLead}>
            Tap the area you want to bring into this inquiry. There is no wrong
            choice — pick the place that feels loudest right now.
          </Text>
          <BodyMap
            activeRegion={chosenRegion}
            onRegionPress={setChosenRegion}
            onChakraPress={(chakraId) => {
              router.push({ pathname: '/chakra/[id]', params: { id: chakraId } } as never);
            }}
          />
          {chosenRegion ? (
            <View style={styles.chosenBanner}>
              <Text style={styles.chosenKicker}>BRINGING INTO THE INQUIRY</Text>
              <Text style={styles.chosenLabel}>
                {chosenRegion.replace(/-/g, ' ')}
              </Text>
              <Text style={styles.chosenHint}>
                Keep this place in your awareness as you walk through the seven
                steps below.
              </Text>
            </View>
          ) : null}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerKicker}>BEFORE YOU BEGIN</Text>
          <Text style={styles.disclaimerBody}>
            This is emotional work, not medical. If a physical symptom is severe
            or new, see a doctor first. This practice is for working with the
            body as a messenger — not as a substitute for medical care.
          </Text>
        </View>

        {/* THE 7 STEPS */}
        <Text style={styles.sectionLabel}>THE 7-STEP INQUIRY</Text>
        <View style={styles.stepsCol}>
          {BODY_INQUIRY_STEPS.map((step) => {
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
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepMeta}>~{step.durationMin} min</Text>
                  </View>
                  <Text style={[styles.stepToggle, { color: step.accent }]}>
                    {open ? '−' : '+'}
                  </Text>
                </View>

                {open ? (
                  <View style={styles.stepBody}>
                    {/* Intent line */}
                    <Text style={[styles.stepIntent, { color: step.accent }]}>
                      {step.intent}
                    </Text>

                    {/* Instructions */}
                    {step.instructions.map((line, i) => (
                      <View key={i} style={styles.actionRow}>
                        <View style={[styles.actionDot, { backgroundColor: step.accent }]} />
                        <Text style={styles.actionText}>{line}</Text>
                      </View>
                    ))}

                    {/* Prompts (if any) */}
                    {step.prompts && step.prompts.length > 0 ? (
                      <View
                        style={[
                          styles.promptsBox,
                          { backgroundColor: `${step.accent}12`, borderColor: `${step.accent}30` },
                        ]}
                      >
                        <Text style={[styles.promptsKicker, { color: step.accent }]}>
                          ASK YOURSELF
                        </Text>
                        {step.prompts.map((p, i) => (
                          <Text key={i} style={styles.promptLine}>
                            "{p}"
                          </Text>
                        ))}
                      </View>
                    ) : null}

                    {/* Why */}
                    <View
                      style={[
                        styles.purposeBox,
                        { backgroundColor: `${step.accent}1A`, borderColor: `${step.accent}40` },
                      ]}
                    >
                      <Text style={[styles.purposeKicker, { color: step.accent }]}>WHY</Text>
                      <Text style={styles.purposeBody}>{step.why}</Text>
                    </View>

                    {/* Listen this step */}
                    <View style={{ marginTop: 12 }}>
                      <SpeechPlayer
                        text={`Step ${step.number}: ${step.title}. ${step.intent} ${step.instructions.join(' ')} ${step.prompts ? `Ask yourself: ${step.prompts.join(' ')}` : ''} ${step.why}`}
                        accent={step.accent}
                        label="LISTEN TO STEP"
                        size="sm"
                      />
                    </View>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {/* After the practice */}
        <Text style={styles.sectionLabel}>AFTER THE PRACTICE</Text>
        <View style={styles.remindersCol}>
          {BODY_INQUIRY_AFTER.map((line, i) => (
            <View key={i} style={styles.reminderRow}>
              <Text style={[styles.reminderStar, { color: '#3F8A5F' }]}>·</Text>
              <Text style={styles.reminderItem}>{line}</Text>
            </View>
          ))}
        </View>

        {/* Key reminders */}
        <Text style={styles.sectionLabel}>KEY REMINDERS</Text>
        <View style={styles.remindersCol}>
          {BODY_INQUIRY_REMINDERS.map((line, i) => (
            <View key={i} style={styles.reminderRow}>
              <Text style={styles.reminderStar}>★</Text>
              <Text style={styles.reminderItem}>{line}</Text>
            </View>
          ))}
        </View>

        {/* Closing */}
        <View style={styles.closingCard}>
          <Text style={styles.closingKicker}>CLOSING</Text>
          <Text style={styles.closingLine}>{BODY_INQUIRY_CLOSING}</Text>
          <View style={{ alignSelf: 'center', marginTop: 18 }}>
            <SpeechPlayer
              text={BODY_INQUIRY_CLOSING}
              accent="#F5E8DC"
              label="LISTEN"
              size="sm"
            />
          </View>
        </View>

        {/* Cross-link to Body Wisdom */}
        <Pressable
          onPress={() => router.push('/body' as never)}
          accessibilityRole="button"
          accessibilityLabel="Open Body Wisdom"
          style={({ pressed }) => [
            styles.crossLink,
            pressed && { opacity: 0.92 },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.crossLinkKicker}>RELATED</Text>
            <Text style={styles.crossLinkTitle}>Body Wisdom — symptom directory</Text>
            <Text style={styles.crossLinkBody}>
              If you want a faster reading on a specific symptom first, browse
              the 50-symptom directory. Then return here when you are ready to
              go deeper.
            </Text>
          </View>
          <Text style={styles.crossLinkArrow}>→</Text>
        </Pressable>
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
    backgroundColor: 'rgba(255, 252, 250, 0.94)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
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

  subCard: {
    backgroundColor: 'rgba(255, 252, 250, 0.85)',
    borderRadius: 14,
    borderLeftWidth: 4,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  subCardKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    marginBottom: 6,
  },
  subCardBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: tokens.semantic.textPrimary,
  },

  disclaimer: {
    marginBottom: 22,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.14)',
    backgroundColor: 'rgba(255, 252, 250, 0.78)',
  },
  disclaimerKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
    marginBottom: 6,
  },
  disclaimerBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
  },

  sectionLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2,
    color: tokens.semantic.textTertiary,
    marginTop: 18,
    marginBottom: 12,
  },

  bodyPickerCard: {
    backgroundColor: 'rgba(255, 252, 250, 0.85)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 18,
    marginBottom: 18,
  },
  bodyPickerLead: {
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  chosenBanner: {
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(157, 191, 178, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(157, 191, 178, 0.45)',
  },
  chosenKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: '#7BA293',
    marginBottom: 4,
    textAlign: 'center',
  },
  chosenLabel: {
    fontFamily: tokens.fonts.display,
    fontSize: 20,
    lineHeight: 26,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  chosenHint: {
    marginTop: 6,
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
  },

  stepsCol: {
    gap: 10,
  },
  stepCard: {
    backgroundColor: 'rgba(255, 252, 250, 0.92)',
    borderRadius: 16,
    borderLeftWidth: 5,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  stepHead: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },
  stepTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 20,
    lineHeight: 26,
    color: tokens.semantic.textPrimary,
  },
  stepMeta: {
    marginTop: 2,
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    color: tokens.semantic.textTertiary,
  },
  stepToggle: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 26,
    lineHeight: 26,
    paddingHorizontal: 4,
  },
  stepBody: {
    paddingBottom: 14,
    paddingHorizontal: 4,
  },
  stepIntent: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 14,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 6,
  },
  actionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 9,
  },
  actionText: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
  },

  promptsBox: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  promptsKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  promptLine: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 15,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
    marginVertical: 2,
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
    letterSpacing: 1.8,
    marginBottom: 4,
  },
  purposeBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textPrimary,
  },

  remindersCol: {
    gap: 8,
    marginBottom: 18,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  reminderStar: {
    fontFamily: tokens.fonts.display,
    fontSize: 16,
    color: tokens.semantic.accent,
    marginTop: 1,
  },
  reminderItem: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: tokens.semantic.textPrimary,
  },

  closingCard: {
    marginTop: 8,
    marginBottom: 18,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#3A3540',
  },
  closingKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2,
    color: '#C5A88A',
    textAlign: 'center',
  },
  closingLine: {
    marginTop: 16,
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 18,
    lineHeight: 26,
    color: '#F5E8DC',
    textAlign: 'center',
  },

  crossLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 252, 250, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.1)',
  },
  crossLinkKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
    marginBottom: 4,
  },
  crossLinkTitle: {
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
  },
  crossLinkBody: {
    marginTop: 4,
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
  },
  crossLinkArrow: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 22,
    color: tokens.semantic.accent,
  },
});
