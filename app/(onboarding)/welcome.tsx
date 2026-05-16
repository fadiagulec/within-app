import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';

export default function Welcome() {
  const router = useRouter();

  return (
    <Screen padded={false}>
      <LinearGradient
        colors={[
          'rgba(201,169,110,0.18)',
          'rgba(138,122,168,0.14)',
          'rgba(107,143,113,0.12)',
          'transparent',
        ]}
        locations={[0, 0.35, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View>
          <Text
            variant="eyebrow"
            color={tokens.semantic.accent}
            style={{ letterSpacing: 4, marginBottom: 8 }}
          >
            WITHIN
          </Text>
          <Text variant="hero">
            Healing{'\n'}in{' '}
            <Text variant="hero" italic color={tokens.semantic.accent}>
              layers.
            </Text>
          </Text>
          <Text variant="displayItalic" style={{ marginTop: 20, maxWidth: 280 }}>
            Learn it. Feel it. Heal it.
          </Text>
        </View>

        <Text
          variant="displayItalic"
          style={{
            fontSize: 18,
            maxWidth: 320,
            color: tokens.semantic.textSecondary,
          }}
        >
          You can't think your way out. But you can breathe, feel, and move your way home.
        </Text>

        <View style={styles.ctaWrap}>
          <Button block size="lg" onPress={() => router.push('/(onboarding)/feeling-selector')}>
            Begin
          </Button>
          <Pressable
            onPress={() => router.replace('/(tabs)')}
            style={{ alignItems: 'center', marginTop: 14 }}
          >
            <Text variant="bodySmall" color={tokens.semantic.textTertiary}>
              Already here?{' '}
              <Text variant="bodySmall" color={tokens.semantic.accent}>
                Sign in
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 44,
  },
  ctaWrap: {
    alignSelf: 'stretch',
  },
});
