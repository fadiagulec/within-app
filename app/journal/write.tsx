/**
 * Journal entry editor.
 * - Prompt shown at top (refreshable).
 * - Emotion picker.
 * - Text area (auto-save drafts every 10 s).
 * - Voice note via expo-av (optional).
 * - Tagging: chakra / journey day.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import * as Haptics from '@/lib/haptic';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { MicButton } from '@/components/MicButton';
import { tokens, chakraColors } from '@/theme/tokens';
import { emotionColors } from '@/data/feelings';
import {
  getDailyPrompt,
  getRandomPrompt,
  type JournalCategory,
} from '@/data/journaling';
import { useJournalStore } from '@/store/useJournalStore';
import { useEmotionStore } from '@/store/useEmotionStore';
import type { ChakraKey } from '@/types';

const DRAFT_KEY = 'soma:journal-draft';
const CHAKRA_KEYS: ChakraKey[] = [
  'root',
  'sacral',
  'solar',
  'heart',
  'throat',
  'thirdEye',
  'crown',
];

export default function WriteEntry() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    promptId?: string;
    prompt?: string;
    category?: string;
  }>();

  const [prompt, setPrompt] = useState(() => {
    if (params.prompt) return { id: params.promptId, text: params.prompt };
    if (params.category) {
      const p = getRandomPrompt(params.category as JournalCategory);
      if (p) return { id: p.id, text: p.prompt };
    }
    const daily = getDailyPrompt();
    return { id: daily.id, text: daily.prompt };
  });
  const [body, setBody] = useState('');
  const [emotionKey, setEmotionKey] = useState<string | null>(null);
  const [tagChakra, setTagChakra] = useState<ChakraKey | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [voiceUri, setVoiceUri] = useState<string | null>(null);
  const [voiceDurSec, setVoiceDurSec] = useState<number | undefined>(undefined);
  const [isRecording, setIsRecording] = useState(false);

  const addEntry = useJournalStore((s) => s.addEntry);
  const addEmotion = useEmotionStore((s) => s.addEntry);

  // Load draft on mount
  useEffect(() => {
    AsyncStorage.getItem(DRAFT_KEY)
      .then((v) => {
        if (v) {
          try {
            const draft = JSON.parse(v) as {
              body?: string;
              emotionKey?: string;
              tagChakra?: ChakraKey;
            };
            if (draft.body) setBody(draft.body);
            if (draft.emotionKey) setEmotionKey(draft.emotionKey);
            if (draft.tagChakra) setTagChakra(draft.tagChakra);
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {});
  }, []);

  // Auto-save every 10s
  const lastSavedRef = useRef<string>('');
  useEffect(() => {
    const iv = setInterval(() => {
      const data = JSON.stringify({ body, emotionKey, tagChakra });
      if (data !== lastSavedRef.current) {
        AsyncStorage.setItem(DRAFT_KEY, data).catch(() => {});
        lastSavedRef.current = data;
      }
    }, 10_000);
    return () => clearInterval(iv);
  }, [body, emotionKey, tagChakra]);

  const refreshPrompt = useCallback(() => {
    Haptics.selectionAsync().catch(() => {});
    const next = getRandomPrompt('morning') ?? getDailyPrompt();
    setPrompt({ id: next.id, text: next.prompt });
  }, []);

  async function toggleRecord() {
    try {
      if (isRecording) {
        const rec = recording;
        if (!rec) return;
        await rec.stopAndUnloadAsync();
        const uri = rec.getURI();
        const status = await rec.getStatusAsync();
        setVoiceUri(uri ?? null);
        setVoiceDurSec(
          status.durationMillis ? Math.round(status.durationMillis / 1000) : undefined
        );
        setRecording(null);
        setIsRecording(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
          () => {}
        );
      } else {
        const perm = await Audio.requestPermissionsAsync();
        if (!perm.granted) {
          Alert.alert('Microphone access is needed to record a voice note.');
          return;
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const rec = new Audio.Recording();
        await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        await rec.startAsync();
        setRecording(rec);
        setIsRecording(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      }
    } catch (e) {
      Alert.alert(
        'Recording failed',
        e instanceof Error ? e.message : 'Unknown error'
      );
      setIsRecording(false);
      setRecording(null);
    }
  }

  // Submit-debounce: prevent rapid double-tap from creating duplicate entries.
  const savingRef = useRef(false);
  async function save() {
    if (savingRef.current) return;
    if (!body.trim() && !voiceUri && !emotionKey) {
      Alert.alert('Nothing to save yet.', 'Add a few words, a colour, or a voice note.');
      return;
    }
    savingRef.current = true;
    addEntry({
      promptId: prompt.id,
      promptText: prompt.text,
      body: body.trim(),
      emotionKey: emotionKey ?? undefined,
      chakra: tagChakra ?? undefined,
      voiceNoteUri: voiceUri ?? undefined,
      voiceNoteDurationSec: voiceDurSec,
    });
    if (emotionKey) {
      addEmotion({
        colorKey: emotionKey,
        note: body.trim() || undefined,
        chakra: tagChakra ?? undefined,
      });
    }
    await AsyncStorage.removeItem(DRAFT_KEY).catch(() => {});
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
    router.back();
    // Reset the lock after navigation — covers the rare back-and-tap-again case.
    setTimeout(() => { savingRef.current = false; }, 800);
  }

  return (
    <Screen padded={false} avoidKeyboard>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Close
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          WRITE
        </Text>
        <Pressable onPress={save} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.accent}>
            Save
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.promptRow}>
          <View style={{ flex: 1 }}>
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              PROMPT
            </Text>
            <Text variant="heading2" style={{ marginTop: 8 }}>
              {prompt.text}
            </Text>
          </View>
          <Pressable onPress={refreshPrompt} hitSlop={12} style={styles.refresh}>
            <Text variant="heading3" color={tokens.semantic.accent}>
              ↻
            </Text>
          </Pressable>
        </View>

        <Text variant="eyebrow" style={{ marginTop: 22, marginBottom: 10 }}>
          BEFORE YOU BEGIN · A COLOUR
        </Text>
        <View style={styles.emoRow}>
          {emotionColors.map((c) => {
            const on = emotionKey === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() => {
                  Haptics.selectionAsync().catch(() => {});
                  setEmotionKey(c.key);
                }}
                style={[
                  styles.emo,
                  {
                    backgroundColor: c.hex,
                    borderColor: on ? tokens.semantic.accent : 'transparent',
                  },
                ]}
              />
            );
          })}
        </View>
        {emotionKey ? (
          <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 6 }}>
            {emotionColors.find((c) => c.key === emotionKey)?.label}
          </Text>
        ) : null}

        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Let the pen move before the mind catches up. Or tap the mic and speak."
          placeholderTextColor={tokens.semantic.textTertiary}
          multiline
          style={styles.input}
        />
        <View style={{ marginTop: 10 }}>
          <MicButton
            value={body}
            onChange={setBody}
            accent={tokens.semantic.accent}
            size="md"
            label="SPEAK INSTEAD"
          />
        </View>

        <Text variant="eyebrow" style={{ marginTop: 18, marginBottom: 10 }}>
          VOICE NOTE · OPTIONAL
        </Text>
        <Pressable
          onPress={toggleRecord}
          style={[
            styles.voiceBtn,
            isRecording && { borderColor: tokens.semantic.errorRust },
          ]}
        >
          <View
            style={[
              styles.voiceDot,
              {
                backgroundColor: isRecording
                  ? tokens.semantic.errorRust
                  : voiceUri
                    ? tokens.semantic.accent
                    : tokens.semantic.textTertiary,
              },
            ]}
          />
          <Text variant="body">
            {isRecording
              ? 'Stop recording'
              : voiceUri
                ? `Recorded · ${voiceDurSec ?? '?'} s · tap to re-record`
                : 'Start recording'}
          </Text>
        </Pressable>

        <Text variant="eyebrow" style={{ marginTop: 22, marginBottom: 10 }}>
          TAG A CHAKRA · OPTIONAL
        </Text>
        <View style={styles.chakraRow}>
          {CHAKRA_KEYS.map((k) => {
            const on = tagChakra === k;
            const col = chakraColors[k];
            return (
              <Pressable
                key={k}
                onPress={() => setTagChakra(on ? null : k)}
                style={[
                  styles.chakraPill,
                  {
                    backgroundColor: on ? `${col}33` : tokens.semantic.bgElevated,
                    borderColor: on ? col : tokens.semantic.borderSubtle,
                  },
                ]}
              >
                <View style={[styles.chakraDot, { backgroundColor: col }]} />
                <Text
                  variant="mono"
                  color={on ? col : tokens.semantic.textSecondary}
                  style={{ fontSize: 11 }}
                >
                  {k.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" onPress={save}>
          Save entry
        </Button>
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
  promptRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  refresh: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emo: {
    width: 42,
    height: 42,
    borderRadius: tokens.radii.sm,
    borderWidth: 2,
  },
  input: {
    marginTop: 18,
    minHeight: 240,
    padding: 18,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgElevated,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
    fontSize: 19,
    lineHeight: 29,
    textAlignVertical: 'top',
  },
  voiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: tokens.radii.md,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  voiceDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  chakraRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chakraPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  chakraDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
