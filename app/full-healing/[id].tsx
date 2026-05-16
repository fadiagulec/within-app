/**
 * Within — Full Guided Healing Session reader.
 *
 * One long-form ~20-minute session per chakra. Designed for use eyes-closed
 * with the LISTEN button (ElevenLabs voice via /api/tts) — or with eyes
 * open, reading the script slowly and pausing between sections.
 *
 * Layout:
 *   - Hero with the chakra accent, title, shift (Fear → Freedom etc.)
 *   - LISTEN TO FULL SESSION button (the big move — Companion-voiced)
 *   - "Things you'll need" tiny card (a quiet space, optional journal)
 *   - The full script, rendered as paragraphs with extra breathing room
 *   - Sticky bottom CTA — "Mark session complete" advances the Path
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { ChakraBackground } from '@/components/ChakraBackground';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import {
  getFullHealingScript,
  type FullHealingScript,
} from '@/data/full-healing-scripts';
import { getChakraAffirmations } from '@/data/chakra-affirmations';
import type { SpineChakraId } from '@/data/chakra-spine';
import { usePathStore } from '@/store/usePathStore';

export default function FullHealingReader() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = String(rawId ?? '');
  const script = getFullHealingScript(id);
  const affirmations = getChakraAffirmations(id);

  const markPracticeComplete = usePathStore((s) => s.markPracticeComplete);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace({ pathname: '/chakra/[id]', params: { id } } as never);
  }

  function markComplete() {
    if (!script) return;
    markPracticeComplete(`full-healing-${script.id}`);
    router.replace({ pathname: '/chakra/[id]', params: { id: script.id } } as never);
  }

  // Split body into paragraphs — every double newline becomes a new <Text> for
  // breathing room. Lines that are just dashes / pause markers get a soft
  // italic style so the eye can find them on a scroll-back.
  const paragraphs = useMemo(() => {
    if (!script) return [];
    return script.body.split(/\n{2,}/g).map((p) => p.trim()).filter(Boolean);
  }, [script]);

  if (!script) {
    return (
      <ChakraBackground chakraId="root">
        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Session not found.</Text>
          <Pressable onPress={goBack} style={styles.notFoundBtn}>
            <Text style={styles.notFoundBtnText}>← Back</Text>
          </Pressable>
        </View>
      </ChakraBackground>
    );
  }

  return (
    <ChakraBackground chakraId={script.id as SpineChakraId} colorOverride={script.color}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <Pressable onPress={goBack} hitSlop={10} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.kicker}>
            FULL GUIDED HEALING · {script.durationMin} MIN · {script.bijaSound}
          </Text>
          <Text style={styles.title}>{script.title}</Text>
          <Text style={styles.subtitle}>{script.subtitle}</Text>
        </View>

        {/* The LISTEN card — primary action */}
        <View style={styles.listenCard}>
          <Text style={styles.listenKicker}>LISTEN — GUIDED VOICE</Text>
          <Text style={styles.listenBody}>
            Sit or lie down somewhere private. Eyes closed if you can.
            Tap LISTEN below and let the voice carry you through.
          </Text>
          <View style={{ marginTop: 14, alignSelf: 'flex-start' }}>
            <SpeechPlayer
              text={script.body}
              accent={script.color}
              label="LISTEN TO FULL SESSION"
            />
          </View>
        </View>

        {/* What you'll need */}
        <View style={styles.needCard}>
          <Text style={styles.needKicker}>WHAT YOU WILL NEED</Text>
          <Text style={styles.needBody}>
            · A quiet space, ~{script.durationMin} minutes{'\n'}
            · A journal + pen (sections include writing prompts){'\n'}
            · Permission to feel whatever arises
          </Text>
        </View>

        {/* The script body */}
        <Text style={styles.bodyKicker}>THE FULL SCRIPT</Text>
        <View style={styles.bodyWrap}>
          {paragraphs.map((p, i) => (
            <Text key={i} style={isPauseLine(p) ? styles.bodyPause : styles.bodyPara}>
              {p}
            </Text>
          ))}
        </View>

        {/* The new truth affirmations to install after */}
        {affirmations ? (
          <View style={[styles.affCard, { borderColor: `${script.color}55`, backgroundColor: `${script.color}10` }]}>
            <Text style={[styles.affKicker, { color: script.color }]}>
              AFFIRMATIONS TO INSTALL · {affirmations.shiftLabel.toUpperCase()}
            </Text>
            <Text style={styles.affLead}>
              After the session, read these slowly. Out loud if you can.
            </Text>
            <View style={{ marginTop: 12, gap: 10 }}>
              {affirmations.affirmations.map((a, i) => (
                <Text key={i} style={styles.affLine}>
                  · {a}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        {/* Mark complete */}
        <Pressable
          onPress={markComplete}
          accessibilityRole="button"
          accessibilityLabel="Mark this session complete"
          style={({ pressed }) => [
            styles.completeBtn,
            { backgroundColor: script.color },
            pressed && { opacity: 0.9 },
          ]}
        >
          <Text style={styles.completeBtnText}>✓  I have walked this</Text>
        </Pressable>
      </ScrollView>
    </ChakraBackground>
  );
}

/** Lines like "Pause." get rendered as soft italic markers. */
function isPauseLine(p: string): boolean {
  const t = p.trim().toLowerCase();
  return t === 'pause.' || t === 'pause' || t === '…and slowly exhale.' || t.length < 6;
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 80,
  },
  back: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backText: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: '#FFFFFF',
  },

  hero: {
    paddingVertical: 18,
    marginBottom: 22,
  },
  kicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 2.4,
    color: 'rgba(255,255,255,0.92)',
    marginBottom: 12,
  },
  title: {
    fontFamily: tokens.fonts.display,
    fontSize: 36,
    lineHeight: 44,
    color: '#FFFFFF',
  },
  subtitle: {
    marginTop: 10,
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 18,
    lineHeight: 26,
    color: 'rgba(255,255,255,0.92)',
  },

  listenCard: {
    backgroundColor: 'rgba(255, 252, 250, 0.96)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  listenKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    color: tokens.semantic.accent,
    marginBottom: 10,
  },
  listenBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: tokens.semantic.textPrimary,
  },

  needCard: {
    backgroundColor: 'rgba(255, 252, 250, 0.85)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  needKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
    marginBottom: 6,
  },
  needBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 21,
    color: tokens.semantic.textSecondary,
  },

  bodyKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    marginBottom: 12,
  },
  bodyWrap: {
    backgroundColor: 'rgba(255, 252, 250, 0.94)',
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    gap: 14,
  },
  bodyPara: {
    fontFamily: tokens.fonts.body,
    fontSize: 16,
    lineHeight: 26,
    color: tokens.semantic.textPrimary,
  },
  bodyPause: {
    fontFamily: tokens.fonts.display,
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 22,
    color: tokens.semantic.textTertiary,
    textAlign: 'center',
  },

  affCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    marginBottom: 22,
  },
  affKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.8,
    marginBottom: 10,
  },
  affLead: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
  },
  affLine: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: tokens.semantic.textPrimary,
  },

  completeBtn: {
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 8,
  },
  completeBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    letterSpacing: 1.2,
    color: '#FFFFFF',
  },

  notFoundWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFoundTitle: {
    fontFamily: tokens.fonts.display,
    fontSize: 24,
    color: '#FFFFFF',
  },
  notFoundBtn: {
    marginTop: 18,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  notFoundBtnText: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 14,
    color: '#FFFFFF',
  },
});
