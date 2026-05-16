import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { ChakraColorDot } from '@/components/ChakraColorDot';
import { tokens } from '@/theme/tokens';
import { quizQuestions } from '@/data/quiz';
import { chakras } from '@/data/chakras';
import { useUserStore } from '@/store/useUserStore';
import { useWheelStore } from '@/store/useWheelStore';
import { chakraIdToKey } from '@/data/chakra-id-mapping';
import { LIFE_AREAS } from '@/data/wheel-of-life';

/**
 * Note: We avoid adding the slider as an extra dep in package.json —
 * we use a simple pressable scale row instead for portability.
 */

const SCALE = [0, 25, 50, 75, 100] as const;

export default function ChakraQuiz() {
  const router = useRouter();
  const setQuizAnswer = useUserStore((s) => s.setQuizAnswer);
  const setPrimaryChakra = useUserStore((s) => s.setPrimaryChakra);

  const latestWheel = useWheelStore((s) => s.getLatest());
  const wheelAvailable = !!latestWheel;

  const [index, setIndex] = useState(0);
  const [localValue, setLocalValue] = useState<number>(50);
  const q = quizQuestions[index]!;
  const chakra = useMemo(() => chakras.find((c) => c.key === q.chakra)!, [q]);

  function skipToWheelResult() {
    if (!latestWheel) return;
    // Derive primary chakra from wheel's lowest area.
    const low = LIFE_AREAS.find((a) => a.id === latestWheel.lowestArea);
    if (low) {
      setPrimaryChakra(chakraIdToKey(low.healingPath.chakra));
    }
    router.push('/(onboarding)/quiz-result');
  }

  function advance() {
    setQuizAnswer(q.id, localValue);
    if (index < quizQuestions.length - 1) {
      setIndex((i) => i + 1);
      setLocalValue(50);
    } else {
      // Finalise: compute weakest chakra (lowest avg) as primary focus.
      const answers = { ...useUserStore.getState().user.quizAnswers, [q.id]: localValue };
      const byChakra: Record<string, number[]> = {};
      for (const question of quizQuestions) {
        const v = answers[question.id];
        if (v === undefined) continue;
        byChakra[question.chakra] = byChakra[question.chakra] ?? [];
        byChakra[question.chakra]!.push(v);
      }
      let lowestKey = 'root' as typeof chakras[number]['key'];
      let lowestAvg = Infinity;
      for (const c of chakras) {
        const arr = byChakra[c.key] ?? [];
        const avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 100;
        if (avg < lowestAvg) {
          lowestAvg = avg;
          lowestKey = c.key;
        }
      }
      setPrimaryChakra(lowestKey);
      router.push('/(onboarding)/quiz-result');
    }
  }

  const progressPct = ((index + 1) / quizQuestions.length) * 100;

  return (
    <Screen>
      <View style={styles.topBar}>
        <View style={styles.topBarRow}>
          <Text variant="eyebrow">
            {index + 1} / {quizQuestions.length}
          </Text>
          {wheelAvailable ? (
            <Pressable onPress={skipToWheelResult} hitSlop={8}>
              <Text variant="bodySmall" color={tokens.semantic.accent}>
                Skip for now →
              </Text>
            </Pressable>
          ) : null}
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
      </View>

      <View style={styles.body}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <ChakraColorDot chakra={chakra.key} size={40} />
          <Text
            variant="eyebrow"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 12 }}
          >
            {chakra.name.toUpperCase()}
          </Text>
        </View>

        <Text variant="heading1" align="center" style={{ maxWidth: 320 }}>
          {q.prompt}
        </Text>

        <View style={styles.scaleRow}>
          {SCALE.map((val) => (
            <Button
              key={val}
              variant={localValue === val ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setLocalValue(val)}
            >
              {val}
            </Button>
          ))}
        </View>

        <View style={styles.labelRow}>
          <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
            {q.lowLabel}
          </Text>
          <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
            {q.highLabel}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button block size="lg" onPress={advance}>
          {index === quizQuestions.length - 1 ? 'See my map' : 'Next'}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingTop: 12,
    paddingBottom: 20,
    gap: 8,
  },
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTrack: {
    height: 2,
    backgroundColor: tokens.semantic.borderSubtle,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: tokens.semantic.accent,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleRow: {
    marginTop: 40,
    flexDirection: 'row',
    gap: 8,
  },
  labelRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 260,
  },
  footer: {
    paddingVertical: 16,
  },
});
