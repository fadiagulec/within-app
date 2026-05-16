/**
 * Vision tab — manifestation board.
 */
import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
import { getMorningActivationRitual } from '@/data/manifestation';

const CATEGORIES: VisionCategory[] = ['love', 'health', 'wealth', 'purpose'];

export default function VisionTab() {
  const router = useRouter();
  const intentions = useVisionStore((s) => s.intentions);
  const removeIntention = useVisionStore((s) => s.removeIntention);
  const [filter, setFilter] = useState<VisionCategory | 'all'>('all');

  const activation = getMorningActivationRitual();
  const shown = intentions.filter(
    (i) => filter === 'all' || i.category === filter
  );

  function confirmRemove(id: string) {
    Alert.alert('Let it go?', 'This intention will be removed from your board.', [
      { text: 'Keep', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => removeIntention(id),
      },
    ]);
  }

  return (
    <Screen scroll padded={false} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text variant="eyebrow" color={tokens.semantic.accent}>
          VISION · MANIFESTATION
        </Text>
        <Text variant="heading1" style={{ marginTop: 6 }}>
          What is{' '}
          <Text variant="heading1" italic color={tokens.semantic.accent}>
            already true
          </Text>
          {'\n'}that you have not{'\n'}admitted yet?
        </Text>

        {/* Morning activation CTA */}
        {activation ? (
          <Pressable
            onPress={() =>
              Alert.alert(
                activation.title ?? 'Morning Activation',
                activation.instructions
              )
            }
          >
            <View style={styles.activationCard}>
              <LinearGradient
                colors={[tokens.semantic.accentSoft, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.activationDot} />
              <View style={{ flex: 1 }}>
                <Text variant="eyebrow" color={tokens.semantic.accent}>
                  · MORNING ACTIVATION · {activation.duration} MIN
                </Text>
                <Text variant="heading3" style={{ marginTop: 6 }}>
                  {activation.title}
                </Text>
                <Text
                  variant="bodySmall"
                  color={tokens.semantic.textSecondary}
                  style={{ marginTop: 6 }}
                  numberOfLines={2}
                >
                  {activation.bestTime}
                </Text>
              </View>
              <Text variant="heading2" color={tokens.semantic.accent}>
                ▶
              </Text>
            </View>
          </Pressable>
        ) : null}

        {/* Category filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, marginTop: 20 }}
        >
          <FilterChip
            label="ALL"
            active={filter === 'all'}
            onPress={() => setFilter('all')}
          />
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c}
              label={CATEGORY_LABELS[c].toUpperCase()}
              color={CATEGORY_COLORS[c]}
              active={filter === c}
              onPress={() => setFilter(c)}
            />
          ))}
        </ScrollView>

        <View style={styles.addRow}>
          <Text variant="eyebrow">YOUR INTENTIONS</Text>
          <Button size="sm" onPress={() => router.push('/vision/add')}>
            + Add
          </Button>
        </View>

        {shown.length === 0 ? (
          <View style={styles.empty}>
            <Text
              variant="displayItalic"
              color={tokens.semantic.textSecondary}
            >
              A blank board is a full one.
            </Text>
            <Text
              variant="bodySmall"
              color={tokens.semantic.textTertiary}
              style={{ marginTop: 8, maxWidth: 260 }}
              align="center"
            >
              Add an intention above, or open a weekly review.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {shown.map((i) => (
              <Pressable
                key={i.id}
                onLongPress={() => confirmRemove(i.id)}
                style={[
                  styles.cell,
                  {
                    backgroundColor: `${i.color}22`,
                    borderColor: `${i.color}99`,
                  },
                ]}
              >
                <View style={[styles.cellDot, { backgroundColor: i.color }]} />
                <Text
                  variant="eyebrow"
                  color={i.color}
                  style={{ marginTop: 10 }}
                >
                  {CATEGORY_LABELS[i.category].toUpperCase()}
                </Text>
                <Text
                  variant="heading3"
                  style={{ marginTop: 6, fontSize: 18 }}
                >
                  {i.title}
                </Text>
                {i.description ? (
                  <Text
                    variant="bodySmall"
                    color={tokens.semantic.textSecondary}
                    style={{ marginTop: 8 }}
                    numberOfLines={3}
                  >
                    {i.description}
                  </Text>
                ) : null}
                {i.targetDate ? (
                  <Text
                    variant="mono"
                    color={tokens.semantic.textTertiary}
                    style={{ marginTop: 10 }}
                  >
                    BY {i.targetDate}
                  </Text>
                ) : null}
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.reviewBox}>
          <Text variant="eyebrow">· WEEKLY REVIEW</Text>
          <Text
            variant="bodySmall"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 8, lineHeight: 20 }}
          >
            On Sundays, take seven minutes: read each intention out loud. Where
            did your body agree? Where did it flinch?
          </Text>
        </View>
      </View>
    </Screen>
  );
}

function FilterChip({
  label,
  color,
  active,
  onPress,
}: {
  label: string;
  color?: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.filter,
        {
          backgroundColor: active
            ? color
              ? `${color}33`
              : tokens.semantic.accentSoft
            : tokens.semantic.bgElevated,
          borderColor: active
            ? color ?? tokens.semantic.accent
            : tokens.semantic.borderSubtle,
        },
      ]}
    >
      <Text
        variant="mono"
        color={active ? color ?? tokens.semantic.accent : tokens.semantic.textSecondary}
        style={{ fontSize: 11 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  activationCard: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.accentSoft,
    overflow: 'hidden',
  },
  activationDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: tokens.semantic.accent,
  },
  addRow: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  filter: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cell: {
    width: '48%',
    minHeight: 170,
    padding: 16,
    borderRadius: tokens.radii.lg,
    borderWidth: 1,
  },
  cellDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  empty: {
    padding: 24,
    alignItems: 'center',
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
  reviewBox: {
    marginTop: 28,
    padding: 18,
    borderRadius: tokens.radii.lg,
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderSubtle,
  },
});
