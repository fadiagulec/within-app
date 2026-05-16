/**
 * Tips tab — daily wisdom + how-to-use guides surfaced from existing data.
 *
 * v1: pulls "I AM" mantras + "How to use" snippets from chakra-spine + the
 * sound-healings reference. Curated, scrollable, sharp.
 *
 * v2: scheduled drip, AI-curated based on user's recent chakra weakness.
 */

import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { CHAKRA_SPINE_ORDERED } from '@/data/chakra-spine';

export default function TipsTab() {
  const router = useRouter();

  return (
    <InsideBackground>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DAILY TIPS</Text>
          <Text style={styles.h1}>Eight short practices.{'\n'}One per centre.</Text>
          <Text style={styles.lead}>
            Each chakra has one short mantra and one practical instruction. Read
            one each morning, or scroll the whole list.
          </Text>
        </View>

        {CHAKRA_SPINE_ORDERED.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => router.push({ pathname: '/chakra/[id]', params: { id: c.id } } as never)}
            accessibilityRole="button"
            accessibilityLabel={`Open ${c.name} chakra`}
            style={({ pressed }) => [
              styles.card,
              { borderLeftColor: c.color },
              pressed && { opacity: 0.88 },
            ]}
          >
            <View style={styles.cardHead}>
              <Text style={[styles.cardNumber, { color: c.color }]}>
                {String(c.number).padStart(2, '0')}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardChakra, { color: c.color }]}>
                  {c.name.toUpperCase()} · {c.syllable} {c.frequencyHz ?? ''}{c.frequencyHz ? 'Hz' : ''}
                </Text>
                <Text style={styles.cardMantras}>
                  {c.iAmMantras.map((m) => `${m}.`).join(' ')}
                </Text>
              </View>
            </View>
            <Text style={styles.cardArea}>
              For: {c.lifeArea.toLowerCase()}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </InsideBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  eyebrow: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 3,
    color: tokens.semantic.accent,
    marginBottom: 12,
  },
  h1: {
    fontFamily: tokens.fonts.display,
    fontSize: 30,
    lineHeight: 38,
    color: tokens.semantic.textPrimary,
    textAlign: 'center',
  },
  lead: {
    marginTop: 14,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    lineHeight: 23,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    maxWidth: 380,
  },
  card: {
    backgroundColor: 'rgba(255, 250, 245, 0.85)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  cardNumber: {
    fontFamily: tokens.fonts.display,
    fontSize: 26,
    lineHeight: 30,
  },
  cardChakra: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  cardMantras: {
    fontFamily: tokens.fonts.display,
    fontSize: 18,
    lineHeight: 26,
    color: tokens.semantic.textPrimary,
  },
  cardArea: {
    marginTop: 10,
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    color: tokens.semantic.textTertiary,
  },
});
