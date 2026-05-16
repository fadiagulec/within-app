/**
 * Unblock script runner — renders an UnblockingScript step-by-step.
 *
 * URL: /unblock/{chakraId}  — e.g. /unblock/heart, /unblock/solar-plexus
 *
 * Each step shows in turn. User taps "Next" to advance, or "Back" to revisit.
 * The final step has a "Done" CTA that returns to the chakra detail screen.
 *
 * No audio — text scripts work standalone. When per-script audio is uploaded
 * later, this screen gains a play-along audio control with the same step UI.
 */

import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { SpeechPlayer } from '@/components/SpeechPlayer';
import { tokens } from '@/theme/tokens';
import {
  getUnblockingScript,
  getScriptByChakra,
} from '@/data/unblocking-scripts';
import { CHAKRA_SPINE, type SpineChakraId } from '@/data/chakra-spine';

export default function UnblockRunner() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Accept either the script id OR the chakra id directly
  const script = useMemo(() => {
    if (!id) return undefined;
    return getUnblockingScript(id) ?? getScriptByChakra(id as SpineChakraId);
  }, [id]);

  const [stepIdx, setStepIdx] = useState(0);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  if (!script) {
    return (
      <Screen>
        <Text variant="heading2">Script not found.</Text>
        <Button onPress={goBack} style={{ marginTop: 16 }} accessibilityLabel="Go back">
          Back
        </Button>
      </Screen>
    );
  }

  const chakra = CHAKRA_SPINE[script.chakraId];
  const accent = chakra.color;
  const step = script.steps[stepIdx]!;
  const isLast = stepIdx === script.steps.length - 1;
  const isFirst = stepIdx === 0;

  function next() {
    if (isLast) {
      // Done — return to chakra detail
      router.replace({
        pathname: '/chakra/[id]',
        params: { id: chakra.id },
      } as never);
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function prev() {
    if (!isFirst) setStepIdx((i) => i - 1);
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Close script"
            hitSlop={10}
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Close
            </Text>
          </Pressable>
          <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            STEP {stepIdx + 1} OF {script.steps.length}
          </Text>
        </View>

        {/* Progress dots */}
        <View style={styles.progressRow}>
          {script.steps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                {
                  backgroundColor: i <= stepIdx ? accent : `${accent}33`,
                  width: i === stepIdx ? 18 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* Hero — chakra context */}
        <View
          style={[
            styles.hero,
            { borderColor: `${accent}66`, backgroundColor: `${accent}1A` },
          ]}
        >
          <View style={styles.heroChips}>
            <View style={[styles.chip, { backgroundColor: `${accent}33`, borderColor: accent }]}>
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                {chakra.name.toUpperCase()}
              </Text>
            </View>
            <View style={[styles.chip, { backgroundColor: `${accent}22`, borderColor: `${accent}88` }]}>
              <Text variant="mono" color={tokens.semantic.textPrimary} style={{ fontSize: 11, letterSpacing: 1.5 }}>
                BLOCK · {script.blockingEmotion.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text variant="heading1" style={{ marginTop: 12, fontSize: 28 }}>
            {script.title}
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 6, fontSize: 16 }}
          >
            {script.tagline}
          </Text>
        </View>

        {/* Current step */}
        <View
          style={[
            styles.stepCard,
            { borderColor: `${accent}55` },
          ]}
        >
          <View style={styles.stepHead}>
            <Text variant="mono" color={accent} style={{ fontSize: 11, letterSpacing: 1.5 }}>
              {step.kind.toUpperCase()}
            </Text>
            <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11 }}>
              ~{Math.ceil(step.durationSec / 60)} min
            </Text>
          </View>
          <Text variant="heading2" color={tokens.semantic.textPrimary} style={{ marginTop: 6, fontSize: 24 }}>
            {step.label}
          </Text>
          <View style={{ marginTop: 12 }}>
            <SpeechPlayer text={`${step.label}. ${step.body}`} accent={accent} label="LISTEN" />
          </View>
          <Text
            variant="body"
            color={tokens.semantic.textPrimary}
            style={{ marginTop: 16, fontSize: 16, lineHeight: 26 }}
          >
            {step.body}
          </Text>
        </View>
      </ScrollView>

      {/* Footer — back / next */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Button
              variant="ghost"
              size="lg"
              onPress={prev}
              disabled={isFirst}
              accessibilityLabel="Previous step"
            >
              ← Back
            </Button>
          </View>
          <View style={{ flex: 2 }}>
            <Button
              block
              size="lg"
              onPress={next}
              accessibilityLabel={isLast ? 'Finish script' : 'Next step'}
            >
              {isLast ? 'Done · close script' : 'Next step →'}
            </Button>
          </View>
        </View>
      </View>
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
  progressRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 6,
    alignItems: 'center',
    marginBottom: 18,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
  },
  hero: {
    marginHorizontal: 20,
    padding: 18,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
  },
  heroChips: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  stepCard: {
    margin: 20,
    padding: 22,
    borderRadius: tokens.radii.xl,
    borderWidth: 1,
    backgroundColor: tokens.semantic.bgElevated,
  },
  stepHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: tokens.semantic.bgBase,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
