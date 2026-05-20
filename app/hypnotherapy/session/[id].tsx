/**
 * Standalone hypnotherapy session player.
 *
 * Shows the session intent, the SpeechPlayer with the full script,
 * and after completion: journal prompt + "mark complete" button
 * that records the session into the hypnotherapy history.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { tokens } from '@/theme/tokens';
import { getHypnoSession, MOOD_META } from '@/data/hypnotherapy-sessions';
import { useHypnotherapyStore } from '@/store/useHypnotherapyStore';

export default function HypnoSessionPlayer() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const session = id ? getHypnoSession(String(id)) : undefined;
  const recordCompletion = useHypnotherapyStore((s) => s.recordCompletion);
  const [completed, setCompleted] = useState(false);

  if (!session) {
    return (
      <Screen>
        <Text variant="heading2">Session not found.</Text>
        <Button onPress={() => router.back()} style={{ marginTop: 16 }} accessibilityLabel="Back">
          Back
        </Button>
      </Screen>
    );
  }

  const sessionRef = session;
  const mood = MOOD_META[sessionRef.mood];

  function markDone() {
    recordCompletion(sessionRef.id);
    setCompleted(true);
  }

  function openJournal() {
    router.push({
      pathname: '/journal/write',
      params: {
        prompt: sessionRef.journalPrompt,
        promptId: `hypno-${sessionRef.id}`,
      },
    });
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Back to hypnotherapy"
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Hypnotherapy
            </Text>
          </Pressable>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 12 }}>
            {mood.label.toUpperCase()}
          </Text>
        </View>

        {/* Hero */}
        <View style={[styles.hero, { borderColor: `${sessionRef.color}66` }]}>
          <LinearGradient
            colors={[`${sessionRef.color}33`, 'transparent']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text variant="mono" color={sessionRef.color} style={{ fontSize: 11, letterSpacing: 2 }}>
            {sessionRef.durationMin} MIN · {mood.label.toUpperCase()}
          </Text>
          <Text variant="heading1" style={{ marginTop: 10, fontSize: 30, lineHeight: 38 }}>
            {sessionRef.title}
          </Text>
          <Text variant="displayItalic" color={tokens.semantic.textSecondary} style={{ marginTop: 10, fontSize: 17, lineHeight: 26 }}>
            {sessionRef.subtitle}
          </Text>
        </View>

        {/* Intent — what to bring */}
        <View style={[styles.intentCard, { borderColor: `${sessionRef.color}55` }]}>
          <Text variant="eyebrow" color={sessionRef.color} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            BEFORE YOU BEGIN
          </Text>
          <Text variant="body" style={{ marginTop: 10, fontSize: 15, lineHeight: 23 }}>
            {sessionRef.intent}
          </Text>
        </View>

        {/* Player */}
        <View style={[styles.playerCard, { borderColor: `${sessionRef.color}66`, backgroundColor: `${sessionRef.color}18` }]}>
          <Text variant="eyebrow" color={sessionRef.color} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            THE SESSION
          </Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={{ marginTop: 6, fontSize: 13, lineHeight: 19 }}>
            Find a quiet space. Eyes closed. Headphones if you can. Do not use while driving.
          </Text>
          <View style={{ marginTop: 16 }}>
            <SpeechPlayer text={sessionRef.script} accent={sessionRef.color} label="BEGIN THE SESSION" />
          </View>
        </View>

        {/* Mark complete + journal */}
        <View style={styles.actionsBlock}>
          {!completed ? (
            <Button block size="lg" onPress={markDone} accessibilityLabel="Mark session complete">
              Mark complete
            </Button>
          ) : (
            <View>
              <View style={[styles.completedBanner, { borderColor: `${sessionRef.color}66`, backgroundColor: `${sessionRef.color}15` }]}>
                <Text variant="mono" color={sessionRef.color} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                  ✓ COMPLETE · RECORDED
                </Text>
                <Text variant="body" style={{ marginTop: 6, fontSize: 14, lineHeight: 21 }}>
                  This session has been added to your hypnotherapy history.
                </Text>
              </View>

              <View style={[styles.journalCard, { borderColor: `${sessionRef.color}55` }]}>
                <Text variant="eyebrow" color={sessionRef.color} style={{ fontSize: 11, letterSpacing: 1.8 }}>
                  JOURNAL PROMPT
                </Text>
                <Text variant="body" style={{ marginTop: 12, fontSize: 16, lineHeight: 25 }}>
                  {sessionRef.journalPrompt}
                </Text>
                <Button
                  variant="ghost"
                  onPress={openJournal}
                  style={{ marginTop: 14, alignSelf: 'flex-start' }}
                  accessibilityLabel="Open journal with prompt"
                >
                  Open journal →
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
    backgroundColor: tokens.semantic.bgElevated,
    overflow: 'hidden',
  },
  intentCard: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 18,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
  },
  playerCard: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  actionsBlock: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  completedBanner: {
    padding: 16,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
  },
  journalCard: {
    marginTop: 16,
    padding: 20,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
  },
});
