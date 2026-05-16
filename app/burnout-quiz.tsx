/**
 * Burnout Assessment — 20-question swipeable quiz.
 */
import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import {
  burnoutQuestions,
  burnoutScaleLabels,
  burnoutAssessment,
  scoreBurnout,
} from '@/data/burnout';
import { useProgressStore } from '@/store/useProgressStore';

export default function BurnoutQuiz() {
  const router = useRouter();
  const setBurnoutResult = useProgressStore((s) => s.setBurnoutResult);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const q = burnoutQuestions[idx];
  const totalQs = burnoutQuestions.length;
  const progress = (idx + 1) / totalQs;

  if (!q) {
    return (
      <Screen>
        <Text variant="heading2">No questions found.</Text>
      </Screen>
    );
  }

  function pick(value: number) {
    Haptics.selectionAsync().catch(() => {});
    const updated = { ...answers, [q!.id]: value };
    setAnswers(updated);
    if (idx + 1 >= totalQs) {
      finish(updated);
    } else {
      setIdx(idx + 1);
    }
  }

  function back() {
    if (idx === 0) {
      router.back();
    } else {
      setIdx(idx - 1);
    }
  }

  function finish(all: Record<string, number>) {
    const result = scoreBurnout(all);
    setBurnoutResult(result.score, result.tier, all);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
    router.replace('/burnout-result');
  }

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={back} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          {idx + 1} / {totalQs}
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress * 100}%` },
          ]}
        />
      </View>

      <View style={styles.body}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          {burnoutAssessment.title.toUpperCase()}
        </Text>
        <Text variant="heading1" style={{ marginTop: 24 }}>
          {q.text}
        </Text>
        <Text
          variant="bodySmall"
          color={tokens.semantic.textTertiary}
          style={{ marginTop: 18 }}
        >
          Answer from the body, not the mind. The first answer is usually the
          truest.
        </Text>

        <View style={styles.choices}>
          {[0, 1, 2, 3, 4].map((v) => {
            const selected = answers[q.id] === v;
            return (
              <Pressable
                key={v}
                onPress={() => pick(v)}
                style={[
                  styles.choice,
                  selected && {
                    borderColor: tokens.semantic.accent,
                    backgroundColor: tokens.semantic.accentSoft,
                  },
                ]}
              >
                <Text
                  variant="heading3"
                  color={selected ? tokens.semantic.accent : tokens.semantic.textPrimary}
                >
                  {burnoutScaleLabels[String(v)] ?? String(v)}
                </Text>
                <Text
                  variant="mono"
                  color={tokens.semantic.textTertiary}
                >
                  {v}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        {answers[q.id] !== undefined ? (
          <Button
            block
            size="lg"
            onPress={() => {
              if (idx + 1 >= totalQs) finish(answers);
              else setIdx(idx + 1);
            }}
          >
            {idx + 1 >= totalQs ? 'See my result' : 'Next →'}
          </Button>
        ) : (
          <Text
            variant="bodySmall"
            align="center"
            color={tokens.semantic.textTertiary}
          >
            Tap the answer that feels truest.
          </Text>
        )}
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
  progressTrack: {
    height: 3,
    backgroundColor: tokens.semantic.borderSubtle,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: tokens.semantic.accent,
  },
  body: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
  },
  choices: {
    marginTop: 36,
    gap: 10,
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
  },
});
