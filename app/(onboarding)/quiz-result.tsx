import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { ChakraWheel } from '@/components/ChakraWheel';
import { tokens } from '@/theme/tokens';
import { getChakra } from '@/data/chakras';
import { chakraKeyToId } from '@/data/chakra-id-mapping';
import { useUserStore } from '@/store/useUserStore';
import { useProgressStore } from '@/store/useProgressStore';

export default function QuizResult() {
  const router = useRouter();
  const primaryKey = useUserStore((s) => s.user.primaryChakra) ?? 'root';
  const primary = getChakra(primaryKey);
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const unlockLevel = useProgressStore((s) => s.unlockLevel);

  function goBurnout() {
    // Don't mark onboarding complete yet — burnout-result will deep-link back.
    unlockLevel(0);
    router.push('/burnout-quiz');
  }

  function goHome() {
    completeOnboarding();
    unlockLevel(0);
    router.replace('/(tabs)');
  }

  function startFirstSession() {
    completeOnboarding();
    unlockLevel(0);
    const first = primary.sessions[0];
    if (first) {
      router.replace({ pathname: '/session/[id]', params: { id: first.id } });
    } else {
      router.replace('/(tabs)');
    }
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ paddingTop: 32, paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="eyebrow" color={tokens.semantic.accent} align="center">
          YOUR FIELD
        </Text>
        <Text variant="heading1" align="center" style={{ marginTop: 8 }}>
          This is where{'\n'}we begin.
        </Text>

        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <ChakraWheel size="medium" selectedChakra={chakraKeyToId(primary.key)} />
        </View>

        <View style={styles.primary}>
          <Text variant="eyebrow" color={tokens.semantic.textSecondary}>
            FIRST LAYER
          </Text>
          <Text
            variant="heading2"
            style={{ marginTop: 6 }}
            color={primary.color}
          >
            The {primary.name}
          </Text>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 10 }}
          >
            {primary.theme}
          </Text>
          <Text
            variant="bodySmall"
            color={tokens.semantic.textTertiary}
            style={{ marginTop: 14, lineHeight: 20 }}
          >
            You didn't get here by being broken. You got here by surviving. Now
            we meet the part of you that's been waiting.
          </Text>
        </View>

        {/* Burnout quiz offer */}
        <Pressable onPress={goBurnout} style={styles.burnoutCard}>
          <View>
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              · WANT A BURNOUT CHECK TOO?
            </Text>
            <Text variant="heading3" style={{ marginTop: 6 }}>
              3 minutes. 20 questions.
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 6 }}
            >
              Where are you actually, today? We'll match you to the right path.
            </Text>
          </View>
          <Text variant="heading2" color={tokens.semantic.accent}>
            →
          </Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" onPress={startFirstSession}>
          Begin your first session
        </Button>
        <Button block variant="ghost" onPress={goHome}>
          Explore instead
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  primary: {
    marginTop: 32,
    padding: 24,
    borderRadius: tokens.radii.xl,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  burnoutCard: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.accentSoft,
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
    gap: 4,
  },
});
