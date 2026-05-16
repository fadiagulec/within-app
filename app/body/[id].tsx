/**
 * Within — Body Wisdom detail screen.
 *
 * For one specific symptom (e.g. lower-back-pain), shows:
 *   - The symptom name and the body region
 *   - The depth psychological reading (in Within voice)
 *   - The affirmation to install
 *   - The chakra it maps to (with frequency + tap-through)
 *   - The recommended breath (if any) with tap-through
 *   - A single sharp journal prompt
 *   - LISTEN button (TTS) for accessibility + people who learn by ear
 *
 * Background uses ChakraBackground tinted by the symptom's mapped chakra,
 * so e.g. "lower back pain" renders with a Root-red gradient.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { ChakraBackground } from '@/components/ChakraBackground';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import {
  getBodyEntry,
  getRegionMeta,
  type BodyWisdomEntry,
} from '@/data/body-wisdom';
import { CHAKRA_SPINE, type SpineChakraId } from '@/data/chakra-spine';
import { findBreathworkById } from '@/data/breathwork';

export default function BodyDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const entry = id ? getBodyEntry(id) : undefined;

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/body' as never);
  }

  if (!entry) {
    return (
      <ChakraBackground chakraId="root">
        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Entry not found.</Text>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Back to body wisdom"
            style={styles.notFoundBtn}
          >
            <Text style={styles.notFoundBtnText}>Back to Body Wisdom</Text>
          </Pressable>
        </View>
      </ChakraBackground>
    );
  }

  const chakra = CHAKRA_SPINE[entry.chakraId];
  const region = getRegionMeta(entry.bodyRegion);
  const breath = entry.recommendedBreathId
    ? findBreathworkById(entry.recommendedBreathId)
    : undefined;

  return (
    <ChakraBackground chakraId={entry.chakraId as SpineChakraId}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Back to body wisdom"
          hitSlop={10}
          style={styles.back}
        >
          <Text style={styles.backText}>← Body Wisdom</Text>
        </Pressable>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.kicker}>
            {region?.label.toUpperCase() ?? 'BODY'} · {chakra.name.toUpperCase()}
          </Text>
          <Text style={styles.title}>{entry.symptom}</Text>
        </View>

        {/* The Reading */}
        <View style={styles.readingCard}>
          <View style={styles.readingHead}>
            <Text style={styles.readingKicker}>THE READING</Text>
            <SpeechPlayer
              text={`${entry.symptom}. ${entry.reading} The affirmation: ${entry.affirmation}. Journal: ${entry.journalPrompt}`}
              accent={chakra.color}
              label="LISTEN"
              size="sm"
            />
          </View>
          <Text style={styles.readingBody}>{entry.reading}</Text>
        </View>

        {/* Affirmation */}
        <View style={[styles.affirmationCard, { borderColor: `${chakra.color}66`, backgroundColor: `${chakra.color}22` }]}>
          <Text style={[styles.affirmationKicker, { color: chakra.color }]}>
            THE AFFIRMATION
          </Text>
          <Text style={styles.affirmationBody}>"{entry.affirmation}"</Text>
        </View>

        {/* Chakra link */}
        <Pressable
          onPress={() =>
            router.push({ pathname: '/chakra/[id]', params: { id: entry.chakraId } } as never)
          }
          accessibilityRole="button"
          accessibilityLabel={`Open ${chakra.name} chakra`}
          style={({ pressed }) => [
            styles.linkCard,
            { borderLeftColor: chakra.color },
            pressed && { opacity: 0.9 },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.linkKicker}>MAPPED CHAKRA</Text>
            <Text style={styles.linkTitle}>
              {chakra.name} · {chakra.syllable} {chakra.frequencyHz ? `${chakra.frequencyHz}Hz` : ''}
            </Text>
            <Text style={styles.linkSub}>Open the full chakra page →</Text>
          </View>
        </Pressable>

        {/* Recommended breath */}
        {breath ? (
          <Pressable
            onPress={() =>
              router.push({ pathname: '/breathwork/[id]', params: { id: breath.id } } as never)
            }
            accessibilityRole="button"
            accessibilityLabel={`Open ${breath.title}`}
            style={({ pressed }) => [
              styles.linkCard,
              { borderLeftColor: chakra.color },
              pressed && { opacity: 0.9 },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.linkKicker}>RECOMMENDED BREATH</Text>
              <Text style={styles.linkTitle}>
                {breath.title} · {breath.durationMin} min
              </Text>
              <Text style={styles.linkSub}>{breath.science}</Text>
            </View>
          </Pressable>
        ) : null}

        {/* Journal prompt */}
        <View style={styles.promptCard}>
          <Text style={styles.promptKicker}>ONE QUESTION</Text>
          <Text style={styles.promptBody}>{entry.journalPrompt}</Text>
        </View>

        {/* Go Deeper — Body Inquiry */}
        <Pressable
          onPress={() => router.push('/body-inquiry' as never)}
          accessibilityRole="button"
          accessibilityLabel="Start Body Inquiry practice"
          style={({ pressed }) => [
            styles.linkCard,
            { borderLeftColor: chakra.color, backgroundColor: 'rgba(255, 252, 250, 0.92)' },
            pressed && { opacity: 0.9 },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.linkKicker}>GO DEEPER</Text>
            <Text style={styles.linkTitle}>Body Inquiry — the 7-step practice</Text>
            <Text style={styles.linkSub}>
              When the reading lands but the symptom keeps returning. ~22 min,
              guided. Sit with this one. Let it actually move. →
            </Text>
          </View>
        </Pressable>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            For emotional exploration only. See a doctor for any physical symptom — this is not diagnosis.
          </Text>
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
    paddingVertical: 18,
    marginBottom: 22,
  },
  kicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.5,
    color: 'rgba(255, 255, 255, 0.92)',
    marginBottom: 12,
  },
  title: {
    fontFamily: tokens.fonts.display,
    fontSize: 36,
    lineHeight: 44,
    color: '#FFFFFF',
  },

  readingCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.94)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  },
  readingHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  readingKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    color: tokens.semantic.accent,
  },
  readingBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 25,
    color: tokens.semantic.textPrimary,
  },

  affirmationCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    marginBottom: 14,
  },
  affirmationKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    marginBottom: 10,
  },
  affirmationBody: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 24,
    lineHeight: 32,
    color: '#FFFFFF',
  },

  linkCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 16,
    borderLeftWidth: 4,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  linkKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    color: tokens.semantic.textTertiary,
    marginBottom: 6,
  },
  linkTitle: {
    fontFamily: tokens.fonts.bodySemiBold,
    fontSize: 17,
    color: tokens.semantic.textPrimary,
  },
  linkSub: {
    marginTop: 4,
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
  },

  promptCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.85)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    marginTop: 2,
  },
  promptKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
    marginBottom: 10,
  },
  promptBody: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 19,
    lineHeight: 28,
    color: tokens.semantic.textPrimary,
  },

  disclaimer: {
    marginTop: 10,
    paddingHorizontal: 8,
  },
  disclaimerText: {
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.88)',
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
