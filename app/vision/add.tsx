/**
 * Add a Vision Board intention.
 *
 * Note: Image picking is OPTIONAL. If expo-image-picker is not installed
 * (it's not in package.json by default) we fall back gracefully.
 */
import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import {
  useVisionStore,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type VisionCategory,
} from '@/store/useVisionStore';
import { getRandomVisionSuggestion } from '@/data/manifestation';

const CATEGORIES: VisionCategory[] = ['love', 'health', 'wealth', 'purpose'];

export default function AddIntention() {
  const router = useRouter();
  const addIntention = useVisionStore((s) => s.addIntention);

  const [category, setCategory] = useState<VisionCategory>('purpose');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const suggestion = useMemo(() => getRandomVisionSuggestion(), []);

  function save() {
    if (!title.trim()) {
      Alert.alert('Give it a title.', 'Even a whisper of one.');
      return;
    }
    addIntention({
      category,
      title: title.trim(),
      description: description.trim() || undefined,
      targetDate: targetDate.trim() || undefined,
      color: CATEGORY_COLORS[category],
    });
    router.back();
  }

  return (
    <Screen padded={false} avoidKeyboard>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Cancel
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          ADD
        </Text>
        <Pressable onPress={save} hitSlop={10}>
          <Text variant="body" color={tokens.semantic.accent}>
            Save
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 140 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text variant="eyebrow">CATEGORY</Text>
        <View style={styles.catRow}>
          {CATEGORIES.map((c) => {
            const on = category === c;
            const col = CATEGORY_COLORS[c];
            return (
              <Pressable
                key={c}
                onPress={() => setCategory(c)}
                style={[
                  styles.catChip,
                  {
                    backgroundColor: on ? `${col}33` : tokens.semantic.bgElevated,
                    borderColor: on ? col : tokens.semantic.borderSubtle,
                  },
                ]}
              >
                <View style={[styles.catDot, { backgroundColor: col }]} />
                <Text
                  variant="body"
                  color={on ? col : tokens.semantic.textPrimary}
                >
                  {CATEGORY_LABELS[c]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text variant="eyebrow" style={{ marginTop: 24 }}>
          TITLE · ONE WHOLE SENTENCE
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Live in a body I feel safe inside."
          placeholderTextColor={tokens.semantic.textTertiary}
          style={styles.input}
        />

        <Text variant="eyebrow" style={{ marginTop: 24 }}>
          DESCRIPTION · OPTIONAL
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Say more, if more wants to come."
          placeholderTextColor={tokens.semantic.textTertiary}
          multiline
          style={[styles.input, styles.multi]}
        />

        {suggestion ? (
          <View style={styles.suggestion}>
            <Text variant="eyebrow" color={tokens.semantic.accent}>
              A PROMPT, IF YOU'RE STUCK
            </Text>
            <Text
              variant="displayItalic"
              style={{ marginTop: 8, fontSize: 17 }}
            >
              {suggestion.prompt}
            </Text>
          </View>
        ) : null}

        <Text variant="eyebrow" style={{ marginTop: 24 }}>
          TARGET DATE · OPTIONAL
        </Text>
        <TextInput
          value={targetDate}
          onChangeText={setTargetDate}
          placeholder="2026-12-31"
          placeholderTextColor={tokens.semantic.textTertiary}
          style={styles.input}
          autoCapitalize="none"
        />

        <Text
          variant="bodySmall"
          color={tokens.semantic.textTertiary}
          style={{ marginTop: 20, lineHeight: 20 }}
        >
          To attach an image, install expo-image-picker and wire it in here —
          left out of MVP to keep install minimal.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" onPress={save}>
          Add to my board
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
  catRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  catDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  input: {
    marginTop: 10,
    padding: 14,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
    backgroundColor: tokens.semantic.bgElevated,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
    fontSize: 16,
  },
  multi: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  suggestion: {
    marginTop: 22,
    padding: 16,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.3)',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
