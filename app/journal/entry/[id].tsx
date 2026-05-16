/**
 * Journal entry detail (read-only + delete).
 */
import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens, chakraColors } from '@/theme/tokens';
import { useJournalStore } from '@/store/useJournalStore';
import { emotionColors } from '@/data/feelings';

export default function EntryDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = useJournalStore((s) => s.entries.find((e) => e.id === id));
  const remove = useJournalStore((s) => s.removeEntry);

  if (!entry) {
    return (
      <Screen>
        <Text variant="heading2">Entry not found.</Text>
        <Button variant="ghost" onPress={() => router.back()}>
          Back
        </Button>
      </Screen>
    );
  }

  const emo = entry.emotionKey
    ? emotionColors.find((c) => c.key === entry.emotionKey)
    : undefined;

  function confirmDelete() {
    Alert.alert(
      'Delete entry?',
      'This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            remove(entry!.id);
            router.back();
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <Screen padded={false}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Back
          </Text>
        </Pressable>
        <Pressable onPress={confirmDelete} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.errorRust}>
            Delete
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 80 }}>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          {new Date(entry.timestamp).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </Text>

        {entry.promptText ? (
          <View style={styles.promptBox}>
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              PROMPT
            </Text>
            <Text variant="heading3" style={{ marginTop: 6 }}>
              {entry.promptText}
            </Text>
          </View>
        ) : null}

        {emo ? (
          <View style={[styles.emoTag, { borderColor: emo.hex }]}>
            <View style={[styles.emoDot, { backgroundColor: emo.hex }]} />
            <Text variant="body">{emo.label}</Text>
          </View>
        ) : null}

        {entry.chakra ? (
          <View
            style={[
              styles.chakraTag,
              {
                borderColor: chakraColors[entry.chakra],
                backgroundColor: `${chakraColors[entry.chakra]}22`,
              },
            ]}
          >
            <Text variant="mono" color={chakraColors[entry.chakra]}>
              {entry.chakra.toUpperCase()} ·{' '}
              {entry.journeyDay ? `DAY ${entry.journeyDay}` : 'TAGGED'}
            </Text>
          </View>
        ) : null}

        <Text
          variant="bodyLarge"
          style={{ marginTop: 24, lineHeight: 26 }}
        >
          {entry.body || '(no body written)'}
        </Text>

        {entry.voiceNoteUri ? (
          <View style={styles.voiceTag}>
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              · VOICE NOTE {entry.voiceNoteDurationSec
                ? `· ${entry.voiceNoteDurationSec}s`
                : ''}
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 4 }}
            >
              {entry.voiceNoteUri}
            </Text>
          </View>
        ) : null}
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
  promptBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  emoTag: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  emoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  chakraTag: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  voiceTag: {
    marginTop: 24,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
});
