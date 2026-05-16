/**
 * Within — Body Wisdom index screen.
 *
 * The body holds messages. Every physical symptom is also a psychological /
 * relational signal. This screen lets the user browse symptoms by body
 * region, then tap into any entry for the full reading.
 *
 * Synthesizes the depth of Lincoln + the affirmation mechanic of Hay,
 * rewritten in Within voice. All content original.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { InsideBackground } from '@/components/InsideBackground';
import { BodyMap } from '@/components/BodyMap';
import {
  BODY_REGIONS,
  BODY_WISDOM,
  type BodyRegion,
  type BodyRegionMeta,
} from '@/data/body-wisdom';

export default function BodyIndexScreen() {
  const router = useRouter();
  const [openRegion, setOpenRegion] = useState<BodyRegion | null>('head');

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  function toggleRegion(r: BodyRegion) {
    setOpenRegion((cur) => (cur === r ? null : r));
  }

  return (
    <InsideBackground>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          style={styles.back}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>BODY WISDOM</Text>
          <Text style={styles.h1}>
            What your body{'\n'}is trying to say.
          </Text>
          <Text style={styles.lead}>
            Every symptom carries a message. Find yours below — by body region.
            Each entry gives the psychological reading, the chakra it points to,
            and a single line to install.
          </Text>
        </View>

        {/* Body diagram — tap a region to open it below */}
        <View style={styles.bodyMapWrap}>
          <Text style={styles.bodyMapKicker}>TAP WHERE IT HURTS</Text>
          <BodyMap
            activeRegion={openRegion}
            onRegionPress={(regionId) => {
              setOpenRegion(regionId);
            }}
            onChakraPress={(chakraId) => {
              router.push({ pathname: '/chakra/[id]', params: { id: chakraId } } as never);
            }}
          />
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerKicker}>NOTE</Text>
          <Text style={styles.disclaimerBody}>
            For emotional exploration only. See a doctor for any physical symptom —
            this is not diagnosis.
          </Text>
        </View>

        {/* Regions */}
        <View style={styles.regions}>
          {BODY_REGIONS.map((region) => (
            <RegionBlock
              key={region.id}
              region={region}
              open={openRegion === region.id}
              onToggle={() => toggleRegion(region.id)}
              onSymptomPress={(symptomId) =>
                router.push({ pathname: '/body/[id]', params: { id: symptomId } } as never)
              }
            />
          ))}
        </View>
      </ScrollView>
    </InsideBackground>
  );
}

interface RegionBlockProps {
  region: BodyRegionMeta;
  open: boolean;
  onToggle: () => void;
  onSymptomPress: (id: string) => void;
}

function RegionBlock({ region, open, onToggle, onSymptomPress }: RegionBlockProps) {
  const entries = BODY_WISDOM.filter((e) => e.bodyRegion === region.id);
  if (entries.length === 0) return null;

  return (
    <View style={[styles.regionCard, { borderLeftColor: region.color }]}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={`${region.label} — ${entries.length} symptoms`}
        accessibilityState={{ expanded: open }}
        style={styles.regionHead}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.regionLabel, { color: region.color }]}>
            {region.label.toUpperCase()}
          </Text>
          <Text style={styles.regionCount}>
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </Text>
        </View>
        <Text style={[styles.toggle, { color: region.color }]}>{open ? '−' : '+'}</Text>
      </Pressable>

      {open ? (
        <View style={styles.entryList}>
          {entries.map((e) => (
            <Pressable
              key={e.id}
              onPress={() => onSymptomPress(e.id)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${e.symptom}`}
              style={({ pressed }) => [
                styles.entryRow,
                pressed && { opacity: 0.85 },
              ]}
            >
              <View style={[styles.entryDot, { backgroundColor: region.color }]} />
              <Text style={styles.entryText}>{e.symptom}</Text>
              <Text style={[styles.entryArrow, { color: region.color }]}>→</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 60,
  },
  back: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backText: {
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
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
    lineHeight: 22,
    color: tokens.semantic.textSecondary,
    textAlign: 'center',
    maxWidth: 380,
  },

  bodyMapWrap: {
    marginTop: 4,
    marginBottom: 22,
    alignItems: 'center',
  },
  bodyMapKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
    marginBottom: 12,
  },
  disclaimer: {
    marginBottom: 20,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(45, 41, 53, 0.14)',
    backgroundColor: 'rgba(255, 250, 245, 0.8)',
  },
  disclaimerKicker: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.8,
    color: tokens.semantic.textTertiary,
    marginBottom: 6,
  },
  disclaimerBody: {
    fontFamily: tokens.fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: tokens.semantic.textSecondary,
  },

  regions: {
    gap: 10,
  },
  regionCard: {
    backgroundColor: 'rgba(255, 250, 245, 0.88)',
    borderRadius: 16,
    borderLeftWidth: 5,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  regionHead: {
    paddingVertical: 16,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  regionLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 13,
    letterSpacing: 1.4,
  },
  regionCount: {
    marginTop: 4,
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    color: tokens.semantic.textTertiary,
  },
  toggle: {
    fontFamily: tokens.fonts.displayBold,
    fontSize: 28,
    lineHeight: 28,
    paddingHorizontal: 8,
  },
  entryList: {
    paddingBottom: 10,
    gap: 2,
  },
  entryRow: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(45, 41, 53, 0.06)',
  },
  entryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  entryText: {
    flex: 1,
    fontFamily: tokens.fonts.body,
    fontSize: 15,
    color: tokens.semantic.textPrimary,
  },
  entryArrow: {
    fontFamily: tokens.fonts.body,
    fontSize: 18,
  },
});
