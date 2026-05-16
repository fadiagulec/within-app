import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { MIRROR_FLOW, MIRROR_CLOSING, suggestPractice, MirrorPractice } from '@/data/mirror-mode';
import { useJournalStore } from '@/store/useJournalStore';

/**
 * MIRROR MODE — The signature perception-inquiry tool.
 *
 * Philosophy: "A daily practice of coming home to yourself."
 * The outer world reflects the inner state. This tool helps users see that.
 */

export default function Mirror() {
  const router = useRouter();
  const addEntry = useJournalStore((s) => s.addEntry);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(MIRROR_FLOW.length).fill(''));
  const [finished, setFinished] = useState(false);
  const [savedPractice, setSavedPractice] = useState<MirrorPractice | null>(null);

  const currentStep = MIRROR_FLOW[stepIndex];
  const currentAnswer = answers[stepIndex] ?? '';
  const canAdvance =
    currentStep && currentAnswer.trim().length >= (currentStep.minChars ?? 10);

  if (!currentStep) return null;

  const handleNext = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (stepIndex < MIRROR_FLOW.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      // Final — compute suggested practice + mark finished
      const practice = suggestPractice(answers[1] ?? '', answers[2] ?? '');
      setSavedPractice(practice);
      setFinished(true);
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleBack = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    else router.back();
  };

  const handleSave = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const body =
      MIRROR_FLOW.map(
        (step, i) => `${step.title.toUpperCase()}\n${answers[i] ?? ''}\n`
      ).join('\n');
    addEntry({
      body,
      emotionKey: 'insight',
      promptText: 'Mirror Mode reflection',
    });
    router.push('/(tabs)/journal');
  };

  const handleUpdate = (value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[stepIndex] = value;
      return next;
    });
  };

  if (finished) {
    return (
      <Screen backgroundColor={tokens.semantic.bgBase}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <LinearGradient
            colors={[`${tokens.semantic.accent}30`, 'transparent']}
            style={styles.finishedHero}
          >
            <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
              Mirror Mode · Complete
            </Text>
            <Text variant="heading1" style={styles.finishedTitle}>
              {MIRROR_CLOSING.title}
            </Text>
            <Text variant="body" style={styles.finishedBody}>
              {MIRROR_CLOSING.body}
            </Text>
          </LinearGradient>

          {/* Review */}
          <View style={styles.reviewSection}>
            <Text variant="eyebrow" style={{ color: tokens.semantic.accent, marginBottom: tokens.spacing.s3 }}>
              What You Saw
            </Text>
            {MIRROR_FLOW.map((step, i) => (
              <View key={i} style={styles.reviewItem}>
                <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>
                  {step.title.toUpperCase()}
                </Text>
                <Text variant="body" style={styles.reviewAnswer}>
                  {answers[i]}
                </Text>
              </View>
            ))}
          </View>

          {/* Suggested practice */}
          {savedPractice && (
            <View style={styles.practiceCard}>
              <Text variant="label" style={{ color: tokens.semantic.accent }}>
                SUGGESTED PRACTICE
              </Text>
              <Text variant="heading3" style={{ marginTop: tokens.spacing.s1 }}>
                This sounds like {savedPractice.chakra.replace('-', ' ')} work.
              </Text>
              <Text variant="body" style={{ color: tokens.semantic.textSecondary, marginTop: tokens.spacing.s2 }}>
                Based on what surfaced, the next step is to move this through the body — not just understand it.
              </Text>
              <View style={{ marginTop: tokens.spacing.s3, gap: tokens.spacing.s2 }}>
                {savedPractice.breathId && (
                  <Button
                    variant="secondary"
                    onPress={() => router.push({
                      pathname: '/breathwork/[id]',
                      params: { id: savedPractice.breathId ?? '' },
                    })}
                  >
                    Breathwork first
                  </Button>
                )}
                <Button
                  variant="primary"
                  onPress={() => router.push({
                    pathname: '/chakra/[id]',
                    params: { id: savedPractice.chakra },
                  })}
                >
                  Open healing session
                </Button>
              </View>
            </View>
          )}

          <View style={{ padding: tokens.spacing.s5 }}>
            <Button variant="primary" onPress={handleSave}>{MIRROR_CLOSING.cta}</Button>
            <View style={{ height: tokens.spacing.s2 }} />
            <Button variant="ghost" onPress={() => router.back()}>Close without saving</Button>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  // --- Active reflection mode ---
  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Pressable onPress={handleBack} style={styles.backBtn}>
            <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>
              ← {stepIndex === 0 ? 'Close' : 'Back'}
            </Text>
          </Pressable>

          {/* Progress bar */}
          <View style={styles.progressBar}>
            {MIRROR_FLOW.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressDot,
                  {
                    backgroundColor:
                      i <= stepIndex ? tokens.semantic.accent : tokens.semantic.borderDefault,
                    flex: 1,
                  },
                ]}
              />
            ))}
          </View>

          <View style={styles.content}>
            <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
              Mirror Mode · Step {stepIndex + 1} of {MIRROR_FLOW.length}
            </Text>
            <Text variant="heading2" style={styles.stepTitle}>
              {currentStep.title}
            </Text>
            <Text variant="body" style={styles.prompt}>
              {currentStep.prompt}
            </Text>
            {currentStep.subPrompt && (
              <Text variant="body" style={styles.subPrompt}>
                {currentStep.subPrompt}
              </Text>
            )}

            <TextInput
              value={currentAnswer}
              onChangeText={handleUpdate}
              placeholder={currentStep.placeholder}
              placeholderTextColor={tokens.semantic.textSecondary}
              multiline
              numberOfLines={6}
              style={styles.input}
              textAlignVertical="top"
              autoFocus
            />

            <Text variant="label" style={styles.charCount}>
              {currentAnswer.trim().length} / {currentStep.minChars ?? 10} min
            </Text>
          </View>

          <View style={styles.footer}>
            <Button
              variant="primary"
              onPress={handleNext}
              disabled={!canAdvance}
            >
              {stepIndex === MIRROR_FLOW.length - 1 ? 'Complete Reflection' : 'Next'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: tokens.spacing.s12,
  },
  backBtn: {
    padding: tokens.spacing.s3,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: tokens.spacing.s5,
    marginBottom: tokens.spacing.s5,
  },
  progressDot: {
    height: 3,
    borderRadius: 2,
  },
  content: {
    padding: tokens.spacing.s5,
  },
  stepTitle: {
    marginTop: tokens.spacing.s2,
  },
  prompt: {
    marginTop: tokens.spacing.s3,
    fontSize: 18,
    lineHeight: 26,
  },
  subPrompt: {
    marginTop: tokens.spacing.s2,
    color: tokens.semantic.textSecondary,
    fontStyle: 'italic',
  },
  input: {
    marginTop: tokens.spacing.s5,
    padding: tokens.spacing.s3,
    minHeight: 160,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    color: tokens.semantic.textPrimary,
    fontSize: 16,
    lineHeight: 24,
  },
  charCount: {
    marginTop: tokens.spacing.s2,
    color: tokens.semantic.textSecondary,
    textAlign: 'right',
  },
  footer: {
    padding: tokens.spacing.s5,
  },
  // Finished screen
  finishedHero: {
    padding: tokens.spacing.s5,
    paddingTop: tokens.spacing.s8,
    paddingBottom: tokens.spacing.s8,
  },
  finishedTitle: {
    marginTop: tokens.spacing.s2,
  },
  finishedBody: {
    marginTop: tokens.spacing.s3,
    color: tokens.semantic.textSecondary,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  reviewSection: {
    padding: tokens.spacing.s5,
  },
  reviewItem: {
    marginBottom: tokens.spacing.s5,
  },
  reviewAnswer: {
    marginTop: tokens.spacing.s2,
    lineHeight: 24,
  },
  practiceCard: {
    margin: tokens.spacing.s5,
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
    borderColor: tokens.semantic.accent,
  },
});
