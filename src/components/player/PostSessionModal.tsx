/**
 * PostSessionModal — shown after the user marks a session complete.
 * - Displays the relevant journaling prompt (chakra-aware if session has chakra).
 * - Quick emotion picker.
 * - Saves to useJournalStore + useEmotionStore.
 */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import * as Haptics from '@/lib/haptic';

import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { emotionColors } from '@/data/feelings';
import { getChakraPrompt, getDailyPrompt } from '@/data/journaling';
import { useJournalStore } from '@/store/useJournalStore';
import { useEmotionStore } from '@/store/useEmotionStore';
import type { ChakraKey } from '@/types';

interface Props {
  visible: boolean;
  sessionId: string;
  sessionTitle: string;
  chakra?: ChakraKey;
  journeyDay?: number;
  /** Optional explicit prompt — overrides the chakra-picked default. */
  promptOverride?: { id?: string; prompt: string };
  onClose: () => void;
  onSaved?: () => void;
}

export function PostSessionModal({
  visible,
  sessionId,
  sessionTitle,
  chakra,
  journeyDay,
  promptOverride,
  onClose,
  onSaved,
}: Props) {
  const addJournalEntry = useJournalStore((s) => s.addEntry);
  const addEmotion = useEmotionStore((s) => s.addEntry);

  // Pick a prompt once per modal-open.
  // Defensive: getDailyPrompt() can return undefined if the prompt pool is
  // ever empty for this date — fall back to a generic prompt rather than crash.
  const [prompt] = useState(() => {
    const FALLBACK = { id: 'fallback', prompt: 'How are you feeling right now?' };
    if (promptOverride) return promptOverride;
    if (chakra) {
      const pool = getChakraPrompt(chakra);
      if (pool.length > 0) {
        const p = pool[Math.floor(Math.random() * pool.length)];
        if (p) return { id: p.id, prompt: p.prompt };
      }
    }
    const daily = getDailyPrompt();
    if (daily && daily.id && daily.prompt) {
      return { id: daily.id, prompt: daily.prompt };
    }
    return FALLBACK;
  });

  const [body, setBody] = useState('');
  const [emotionKey, setEmotionKey] = useState<string | null>(null);

  function save() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
    if (body.trim().length > 0 || emotionKey) {
      addJournalEntry({
        promptId: prompt.id,
        promptText: prompt.prompt,
        body: body.trim(),
        emotionKey: emotionKey ?? undefined,
        chakra,
        journeyDay,
        sessionId,
      });
    }
    if (emotionKey) {
      addEmotion({ colorKey: emotionKey, note: body.trim() || undefined, chakra });
    }
    onSaved?.();
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <View style={styles.header}>
          <Pressable
            onPress={onClose}
            hitSlop={14}
            accessibilityRole="button"
            accessibilityLabel="Skip and close"
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              Skip
            </Text>
          </Pressable>
          <Text variant="eyebrow">AFTER · {sessionTitle.toUpperCase().slice(0, 22)}</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
        >
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            TODAY'S PROMPT
          </Text>
          <Text variant="heading2" style={{ marginTop: 8 }}>
            {prompt.prompt}
          </Text>

          <Text
            variant="eyebrow"
            style={{ marginTop: 28, marginBottom: 10 }}
          >
            HOW DO YOU FEEL NOW?
          </Text>
          <View style={styles.emotionRow}>
            {emotionColors.map((c) => {
              const active = emotionKey === c.key;
              return (
                <Pressable
                  key={c.key}
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => {});
                    setEmotionKey(c.key);
                  }}
                  style={[
                    styles.emoCell,
                    {
                      backgroundColor: c.hex,
                      borderColor: active
                        ? tokens.semantic.accent
                        : 'transparent',
                    },
                  ]}
                  accessibilityLabel={c.label}
                >
                  {active ? (
                    <View style={styles.ring}>
                      <View style={styles.ringInner} />
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
          {emotionKey ? (
            <Text
              variant="bodySmall"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 8 }}
            >
              {emotionColors.find((c) => c.key === emotionKey)?.label}
            </Text>
          ) : null}

          <Text variant="eyebrow" style={{ marginTop: 28, marginBottom: 10 }}>
            A FEW WORDS, IF ANY COME
          </Text>
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="The pen moves before the mind catches up."
            placeholderTextColor={tokens.semantic.textTertiary}
            multiline
            style={styles.input}
            accessibilityLabel="Journal entry — write a few words about how you feel"
          />
        </ScrollView>

        <View style={styles.footer}>
          <Button block size="lg" onPress={save}>
            Save &amp; continue
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: tokens.semantic.bgBase,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderSubtle,
  },
  body: {
    padding: 24,
    paddingBottom: 120,
  },
  emotionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emoCell: {
    width: 48,
    height: 48,
    borderRadius: tokens.radii.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: tokens.semantic.bone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: tokens.semantic.bone,
  },
  input: {
    minHeight: 140,
    padding: 14,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgElevated,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    textAlignVertical: 'top',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
