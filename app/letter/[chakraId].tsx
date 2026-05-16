/**
 * Within — Chakra Letter runner screen.
 *
 * Displays one chakra's complete Letter protocol — intent, 6 steps,
 * journaling prompts, closing. Tinted with the chakra's color via
 * ChakraBackground.
 *
 * Each step has a LISTEN button (TTS) for the people who learn by ear,
 * plus a closing LISTEN that reads the installation phrase aloud.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { ChakraBackground } from '@/components/ChakraBackground';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { getLetter } from '@/data/chakra-letters';
import { CHAKRA_SPINE, type SpineChakraId } from '@/data/chakra-spine';

export default function LetterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ chakraId: string | string[] }>();
  const chakraId = (Array.isArray(params.chakraId) ? params.chakraId[0] : params.chakraId) as SpineChakraId | undefined;
  const letter = chakraId ? getLetter(chakraId) : undefined;

  const [openStep, setOpenStep] = useState<number | null>(1);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/methods' as never);
  }

  function toggleStep(n: number) {
    setOpenStep((cur) => (cur === n ? null : n));
  }

  if (!letter || !chakraId) {
    return (
      <ChakraBackground chakraId="root">
        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Letter not found.</Text>
          <Pressable onPress={goBack} style={styles.notFoundBtn}>
            <Text style={styles.notFoundBtnText}>Back</Text>
          </Pressable>
        </View>
      </ChakraBackground>
    );
  }

  const chakra = CHAKRA_SPINE[chakraId];

  return (
    <ChakraBackground chakraId={chakraId}>
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
          <Text style={styles.kicker}>{letter.pairing}</Text>
          <Text style={styles.letterName}>{letter.name}</Text>
          <Text style={styles.chakraLine}>
            {chakra.name} · {chakra.syllable} {chakra.frequencyHz ? `${chakra.frequencyHz}Hz` : ''}
          </Text>
        </View>

        {/* Intent + LISTEN */}
        <View style={styles.intentCard}>
          <View style={styles.intentHead}>
            <Text style={styles.intentKicker}>THE INTENT</Text>
            <SpeechPlayer
              text={`${letter.name}. ${letter.intent}. ${letter.steps.map(s => `Step ${s.number}: ${s.title}. ${s.instruction}`).join(' ')}. Closing: ${letter.closing}`}
              accent={chakra.color}
              label="LISTEN TO FULL LETTER"
              size="sm"
            />
          </View>
          <Text style={styles.intentBody}>{letter.intent}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>~{letter.durationMin} min practice</Text>
            <Text style={styles.metaText}>6 steps · 4 prompts</Text>
          </View>
        </View>

        {/* The 6 steps */}
        <Text style={styles.sectionLabel}>THE 6 STEPS</Text>
        <View style={styles.stepsCol}>
          {letter.steps.map((step) => {
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
                  pressed && { opacity: 0.92 },
                ]}
              >
                <View style={styles.stepHead}>
                  <View style={[styles.stepNumberCircle, { backgroundColor: chakra.color }]}>
                    <Text style={styles.stepNumberText}>{step.number}</Text>
                  </View>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={[styles.stepToggle, { color: chakra.color }]}>
                    {open ? '−' : '+'}
                  </Text>
                </View>
                {open ? (
                  <View style={styles.stepBody}>
                    <Text style={styles.stepInstruction}>{step.instruction}</Text>
                    <View style={styles.stepListenRow}>
                      <SpeechPlayer
                        text={`Step ${step.number}: ${step.title}. ${step.instruction}`}
                        accent={chakra.color}
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

        {/* Journal prompts */}
        <Text style={styles.sectionLabel}>EXTRA JOURNALING PROMPTS</Text>
        <View style={[styles.promptsCard, { borderColor: `${chakra.color}55` }]}>
          {letter.journalPrompts.map((p, i) => (
            <View key={i} style={styles.promptRow}>
              <View style={[styles.promptDot, { backgroundColor: chakra.color }]} />
              <Text style={styles.promptText}>{p}</Text>
            </View>
          ))}
        </View>

        {/* Closing — dark inverted card */}
        <View style={styles.closingCard}>
          <Text style={[styles.closingKicker, { color: chakra.color }]}>CLOSING STATEMENT</Text>
          <Text style={styles.closingBody}>"{letter.closing}"</Text>
          <View style={{ alignSelf: 'center', marginTop: 14 }}>
            <SpeechPlayer
              text={letter.closing}
              accent="#F5E8DC"
              label="LISTEN"
              size="sm"
            />
          </View>
        </View>
      </ScrollView>
    </ChakraBackground>
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
    color: '#F5E8DC',
  },

  hero: {
    paddingVertical: 22,
    paddingHorizontal: 6,
    marginBottom: 18,
  },
  kicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.4,
    color: 'rgba(255,255,255,0.92)',
    marginBottom: 14,
  },
  letterName: {
    fontFamily: tokens.fonts.display,
    fontSize: 32,
    lineHeight: 40,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  chakraLine: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 16,
    color: 'rgba(255,255,255,0.92)',
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
    color: 'rgba(255,255,255,0.92)',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  stepsCol: {
    gap: 10,
    marginBottom: 24,
  },
  stepCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.92)',
    borderRadius: 16,
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
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(45, 41, 53, 0.08)',
  },
  stepInstruction: {
    fontFamily: tokens.fonts.body,
    fontSize: 14,
    lineHeight: 22,
    color: tokens.semantic.textPrimary,
  },
  stepListenRow: {
    marginTop: 12,
  },

  promptsCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
  },
  promptRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 6,
  },
  promptDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 9,
  },
  promptText: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 24,
    color: tokens.semantic.textPrimary,
  },

  closingCard: {
    backgroundColor: 'rgba(45, 41, 53, 0.94)',
    borderRadius: 18,
    padding: 22,
  },
  closingKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    textAlign: 'center',
    marginBottom: 14,
  },
  closingBody: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 22,
    lineHeight: 32,
    color: '#F5E8DC',
    textAlign: 'center',
  },

  notFoundWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  notFoundTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 26,
    color: '#FFFFFF',
    marginBottom: 22,
  },
  notFoundBtn: {
    backgroundColor: 'rgba(255, 250, 245, 0.94)',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 26,
  },
  notFoundBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    color: tokens.semantic.textPrimary,
    fontSize: 14,
  },
});
