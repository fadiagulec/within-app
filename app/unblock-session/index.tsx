/**
 * Guided Unblocking — session picker hub.
 *
 * Lists all 8 energy centres as guided unblocking sessions (Dr Espen
 * method). Each opens the full voice-guided 11-step session.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { UNBLOCK_SESSION_LIST } from '@/data/espen-unblocking';
import { useUnblockSessionStore } from '@/store/useUnblockSessionStore';

export default function UnblockHub() {
  const router = useRouter();
  const lastFor = useUnblockSessionStore((s) => s.lastFor);

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          GUIDED UNBLOCKING
        </Text>
      </View>

      <View style={styles.intro}>
        <Text variant="eyebrow" color={tokens.semantic.accent} style={{ fontSize: 13, letterSpacing: 2.2 }}>
          A REAL SESSION · I&apos;LL GUIDE YOU
        </Text>
        <Text variant="heading1" style={{ marginTop: 10, fontSize: 36, lineHeight: 44 }}>
          Let me walk you{'\n'}through it, live.
        </Text>
        <Text
          variant="displayItalic"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 14, fontSize: 17, lineHeight: 26 }}
        >
          Each centre, a complete guided session — rapport, permission, the timeline, the release, the new truth, the sound. I&apos;ll hold space the whole way. Choose where your work is asking to begin.
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60, gap: 12 }}>
        {UNBLOCK_SESSION_LIST.map((s) => {
          const last = lastFor(s.chakraId);
          return (
            <Pressable
              key={s.chakraId}
              onPress={() =>
                router.push({ pathname: '/unblock-session/[chakra]', params: { chakra: s.chakraId } } as never)
              }
              style={[styles.card, { borderColor: `${s.color}66` }]}
              accessibilityRole="button"
              accessibilityLabel={`Begin guided ${s.name} session`}
            >
              <View style={[styles.dot, { backgroundColor: s.color }]} />
              <View style={{ flex: 1 }}>
                <Text variant="mono" color={s.color} style={{ fontSize: 11, letterSpacing: 1.4 }}>
                  {s.emotion.toUpperCase()} → {s.transformation.toUpperCase()}
                </Text>
                <Text variant="heading3" style={{ marginTop: 4, fontSize: 18 }}>
                  {s.name}
                </Text>
                <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ marginTop: 4, fontSize: 12 }}>
                  {s.bija} · {s.frequencyHz}Hz · {s.sanskrit}
                  {last ? `  ·  last: ${last.beforeScore}→${last.afterScore}` : ''}
                </Text>
              </View>
              <Text variant="body" color={s.color} style={{ fontSize: 20 }}>
                →
              </Text>
            </Pressable>
          );
        })}
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
  intro: { paddingHorizontal: 20, paddingTop: 4 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
  },
  dot: { width: 14, height: 14, borderRadius: 7 },
});
