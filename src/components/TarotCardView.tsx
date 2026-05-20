/**
 * TarotCardView — visual rendering of a single tarot card.
 *
 * Two modes:
 *   - 'face-down'  : back of the card, tap to reveal
 *   - 'face-up'    : the card content (name, glyph, suit)
 *
 * Optionally rotates 180° when `reversed` is true.
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import type { TarotCard } from '@/data/tarot/deck';

interface Props {
  card: TarotCard;
  reversed?: boolean;
  size?: 'sm' | 'md' | 'lg';
  faceDown?: boolean;
  onPress?: () => void;
  positionLabel?: string;
}

export function TarotCardView({
  card,
  reversed = false,
  size = 'md',
  faceDown = false,
  onPress,
  positionLabel,
}: Props) {
  const dims = SIZES[size];

  if (faceDown) {
    return (
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole="button"
        accessibilityLabel="Reveal the card"
      >
        {positionLabel ? (
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.posLabel}>
            {positionLabel}
          </Text>
        ) : null}
        <View style={[styles.cardBase, dims, styles.cardBack]}>
          <LinearGradient
            colors={['#5645A6', '#3A3540']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.backInner}>
            <Text style={[styles.backGlyph, { fontSize: dims.width * 0.3 }]}>✦</Text>
            <Text variant="mono" color="#D4AF6E" style={[styles.backLabel, { fontSize: dims.width * 0.06 }]}>
              WITHIN
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      {positionLabel ? (
        <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.posLabel}>
          {positionLabel}
        </Text>
      ) : null}
      <View
        style={[
          styles.cardBase,
          dims,
          { borderColor: `${card.color}aa`, backgroundColor: `${card.color}18` },
          reversed && styles.reversed,
        ]}
      >
        <LinearGradient
          colors={[`${card.color}30`, 'transparent']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Suit corner */}
        <View style={styles.cornerTop}>
          <Text variant="mono" color={card.color} style={{ fontSize: dims.width * 0.06, letterSpacing: 1.5 }}>
            {card.suit === 'major' ? `${card.rank}` : card.suit.toUpperCase()}
          </Text>
        </View>

        {/* Central glyph */}
        <View style={styles.center}>
          <Text style={[styles.glyph, { fontSize: dims.width * 0.45, color: card.color }]}>
            {card.glyph}
          </Text>
        </View>

        {/* Card name + reversed indicator */}
        <View style={styles.nameBlock}>
          <Text
            variant="displayItalic"
            color={tokens.semantic.textPrimary}
            style={{ fontSize: dims.width * 0.1, textAlign: 'center', lineHeight: dims.width * 0.13 }}
          >
            {card.name}
          </Text>
          {reversed ? (
            <Text variant="mono" color={card.color} style={[styles.reversedLabel, { fontSize: dims.width * 0.06 }]}>
              REVERSED
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const SIZES = {
  sm: { width: 110, height: 180 },
  md: { width: 200, height: 320 },
  lg: { width: 260, height: 416 },
};

const styles = StyleSheet.create({
  posLabel: {
    fontSize: 11,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardBase: {
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
    backgroundColor: tokens.semantic.bgElevated,
    padding: 14,
    justifyContent: 'space-between',
  },
  cardBack: {
    borderColor: '#5645A6',
    backgroundColor: '#3A3540',
  },
  backInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  backGlyph: {
    color: '#D4AF6E',
    opacity: 0.7,
  },
  backLabel: {
    letterSpacing: 4,
  },
  reversed: {
    transform: [{ rotate: '180deg' }],
  },
  cornerTop: {
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontWeight: '300',
  },
  nameBlock: {
    alignItems: 'center',
    gap: 4,
  },
  reversedLabel: {
    letterSpacing: 2,
    marginTop: 4,
  },
});
