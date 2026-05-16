import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from '@/lib/haptic';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { EDUCATION, EducationCard } from '@/data/education';

const CATEGORIES: { id: EducationCard['category']; label: string }[] = [
  { id: 'basics', label: 'Basics' },
  { id: 'chakras', label: 'Chakras' },
  { id: 'breathwork', label: 'Breathwork' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'burnout', label: 'Burnout' },
  { id: 'journaling', label: 'Journaling' },
  { id: 'manifestation', label: 'Manifestation' },
];

/**
 * LEARN screen — plain-language education for beginners.
 * Users with no prior knowledge start here.
 */
export default function Learn() {
  const router = useRouter();
  const [category, setCategory] = useState<EducationCard['category']>('basics');
  const [openCard, setOpenCard] = useState<string | null>(null);

  const cards = EDUCATION.filter((c) => c.category === category);

  const selectCategory = (c: EducationCard['category']) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCategory(c);
    setOpenCard(null);
  };

  const toggleCard = (id: string) => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setOpenCard((prev) => (prev === id ? null : id));
  };

  return (
    <Screen backgroundColor={tokens.semantic.bgBase}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text variant="label" style={{ color: tokens.semantic.textSecondary }}>← Back</Text>
        </Pressable>

        <View style={styles.header}>
          <Text variant="eyebrow" style={{ color: tokens.semantic.accent }}>
            Learn
          </Text>
          <Text variant="heading1">Start from zero.</Text>
          <Text variant="body" style={styles.lead}>
            Plain explanations — no jargon, no woo. If you've never heard of chakras, breathwork, or "high vibration," start here.
          </Text>
        </View>

        {/* Category tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={{ paddingHorizontal: tokens.spacing.s5 }}>
          {CATEGORIES.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => selectCategory(c.id)}
              style={[
                styles.tab,
                category === c.id && { backgroundColor: tokens.semantic.accent },
              ]}
            >
              <Text
                variant="label"
                style={{
                  color: category === c.id ? tokens.semantic.bgBase : tokens.semantic.textSecondary,
                }}
              >
                {c.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Article cards */}
        <View style={styles.cardList}>
          {cards.length === 0 && (
            <Text variant="body" style={{ color: tokens.semantic.textSecondary, textAlign: 'center' }}>
              More articles coming soon.
            </Text>
          )}
          {cards.map((card) => (
            <Pressable
              key={card.id}
              onPress={() => toggleCard(card.id)}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text variant="heading3">{card.title}</Text>
                  <Text variant="label" style={styles.cardSubtitle}>
                    {card.subtitle} · {card.readingTimeMin} min read
                  </Text>
                </View>
                <Text variant="heading3" style={{ color: tokens.semantic.accent }}>
                  {openCard === card.id ? '−' : '+'}
                </Text>
              </View>

              {openCard === card.id && (
                <View style={styles.cardBody}>
                  {card.content.map((para, i) => (
                    <Text
                      key={i}
                      variant="body"
                      style={styles.paragraph}
                    >
                      {para}
                    </Text>
                  ))}
                  {card.tryNext && (
                    <Text variant="label" style={styles.tryNext}>
                      → {card.tryNext}
                    </Text>
                  )}
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.footer}>
          <Text variant="body" style={{ textAlign: 'center', color: tokens.semantic.textSecondary, fontStyle: 'italic' }}>
            Healing is a practice you return to. Take your time.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: tokens.spacing.s12,
  },
  backBtn: {
    padding: tokens.spacing.s3,
  },
  header: {
    padding: tokens.spacing.s5,
  },
  lead: {
    marginTop: tokens.spacing.s3,
    color: tokens.semantic.textSecondary,
  },
  tabs: {
    marginTop: tokens.spacing.s3,
    marginBottom: tokens.spacing.s5,
    flexGrow: 0,
  },
  tab: {
    paddingHorizontal: tokens.spacing.s3,
    paddingVertical: tokens.spacing.s2,
    marginRight: tokens.spacing.s2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  cardList: {
    paddingHorizontal: tokens.spacing.s5,
    gap: tokens.spacing.s3,
  },
  card: {
    padding: tokens.spacing.s5,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.s3,
  },
  cardSubtitle: {
    color: tokens.semantic.textSecondary,
    marginTop: 4,
  },
  cardBody: {
    marginTop: tokens.spacing.s3,
    paddingTop: tokens.spacing.s3,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderDefault,
    gap: tokens.spacing.s3,
  },
  paragraph: {
    lineHeight: 22,
  },
  tryNext: {
    marginTop: tokens.spacing.s2,
    color: tokens.semantic.accent,
  },
  footer: {
    padding: tokens.spacing.s8,
  },
});
