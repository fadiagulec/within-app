/**
 * Birth-data onboarding — the input screen for both astrology + Energy
 * Blueprint (Human Design).
 *
 * Three inputs:
 *   - Birth date: split into Day / Month / Year (three side-by-side fields,
 *     auto-advancing as the user types — no manual hyphen typing).
 *   - Birth time: split into Hour / Minute (two side-by-side fields), with
 *     "I don't know" escape hatch.
 *   - Birth city.
 *
 * Storage stays as `YYYY-MM-DD` for date and `HH:MM` for time — we just
 * compose/decompose in the UI.
 */

import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { useUserStore } from '@/store/useUserStore';

// Numeric helpers — strip non-digits + pad on commit.
const onlyDigits = (s: string) => s.replace(/\D+/g, '');
const pad2 = (s: string) => (s.length === 1 ? `0${s}` : s);

export default function BirthDataScreen() {
  const router = useRouter();
  const existing = useUserStore((s) => s.user.birthData);
  const setBirthData = useUserStore((s) => s.setBirthData);

  // Parse stored date/time into the split fields.
  const initial = useMemo(() => {
    const date = existing?.date ?? '';
    const time = existing?.time ?? '';
    const [y, m, d] = date.split('-');
    const [h, mm] = time.split(':');
    return {
      day: d ?? '',
      month: m ?? '',
      year: y ?? '',
      hour: h ?? '',
      minute: mm ?? '',
    };
  }, [existing?.date, existing?.time]);

  const [day, setDay] = useState(initial.day);
  const [month, setMonth] = useState(initial.month);
  const [year, setYear] = useState(initial.year);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [city, setCity] = useState(existing?.city ?? '');
  const [timeUnknown, setTimeUnknown] = useState(existing?.timeUnknown ?? false);

  // Refs for auto-advance focus.
  const monthRef = useRef<TextInput | null>(null);
  const yearRef = useRef<TextInput | null>(null);
  const hourRef = useRef<TextInput | null>(null);
  const minuteRef = useRef<TextInput | null>(null);

  function handleDay(v: string) {
    const cleaned = onlyDigits(v).slice(0, 2);
    setDay(cleaned);
    if (cleaned.length === 2) monthRef.current?.focus();
  }

  function handleMonth(v: string) {
    const cleaned = onlyDigits(v).slice(0, 2);
    setMonth(cleaned);
    if (cleaned.length === 2) yearRef.current?.focus();
  }

  function handleYear(v: string) {
    const cleaned = onlyDigits(v).slice(0, 4);
    setYear(cleaned);
    if (cleaned.length === 4) hourRef.current?.focus();
  }

  function handleHour(v: string) {
    const cleaned = onlyDigits(v).slice(0, 2);
    setHour(cleaned);
    if (timeUnknown) setTimeUnknown(false);
    if (cleaned.length === 2) minuteRef.current?.focus();
  }

  function handleMinute(v: string) {
    const cleaned = onlyDigits(v).slice(0, 2);
    setMinute(cleaned);
    if (timeUnknown) setTimeUnknown(false);
  }

  function toggleTimeUnknown() {
    setTimeUnknown((v) => !v);
    if (!timeUnknown) {
      setHour('');
      setMinute('');
    }
  }

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  // Validation
  const dayN = parseInt(day, 10);
  const monthN = parseInt(month, 10);
  const yearN = parseInt(year, 10);
  const hourN = parseInt(hour, 10);
  const minuteN = parseInt(minute, 10);

  const dateValid =
    day.length > 0 &&
    month.length > 0 &&
    year.length === 4 &&
    dayN >= 1 &&
    dayN <= 31 &&
    monthN >= 1 &&
    monthN <= 12 &&
    yearN >= 1900 &&
    yearN <= 2100;

  const timeValid =
    timeUnknown ||
    (hour.length > 0 &&
      minute.length > 0 &&
      hourN >= 0 &&
      hourN <= 23 &&
      minuteN >= 0 &&
      minuteN <= 59);

  const canSave = dateValid && timeValid;

  function save() {
    if (!canSave) return;
    const dateStr = `${year}-${pad2(month)}-${pad2(day)}`;
    const timeStr = timeUnknown ? undefined : `${pad2(hour)}:${pad2(minute)}`;
    setBirthData({
      date: dateStr,
      time: timeStr,
      city: city || undefined,
      timeUnknown,
    });
    router.replace('/you/chart' as never);
  }

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.header}>
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={10}
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              ← Back
            </Text>
          </Pressable>
        </View>

        <View style={styles.intro}>
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            ABOUT YOU
          </Text>
          <Text variant="heading1" style={{ marginTop: 6, fontSize: 32 }}>
            When and where{'\n'}did you arrive?
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 12, fontSize: 16, lineHeight: 24 }}
          >
            Used for your astrology chart and your Energy Blueprint. Saved on this
            device only — never sent anywhere unless you ask.
          </Text>
        </View>

        {/* Birth date — Day / Month / Year */}
        <View style={styles.field}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.label}>
            BIRTH DATE
          </Text>
          <View style={styles.row}>
            <View style={[styles.cell, styles.cellSmall]}>
              <Text style={styles.cellLabel}>DAY</Text>
              <TextInput
                value={day}
                onChangeText={handleDay}
                placeholder="DD"
                placeholderTextColor={tokens.semantic.textTertiary}
                style={styles.input}
                accessibilityLabel="Birth day, 1 to 31"
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={2}
                textAlign="center"
              />
            </View>
            <View style={[styles.cell, styles.cellSmall]}>
              <Text style={styles.cellLabel}>MONTH</Text>
              <TextInput
                ref={monthRef}
                value={month}
                onChangeText={handleMonth}
                placeholder="MM"
                placeholderTextColor={tokens.semantic.textTertiary}
                style={styles.input}
                accessibilityLabel="Birth month, 1 to 12"
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={2}
                textAlign="center"
              />
            </View>
            <View style={[styles.cell, styles.cellLarge]}>
              <Text style={styles.cellLabel}>YEAR</Text>
              <TextInput
                ref={yearRef}
                value={year}
                onChangeText={handleYear}
                placeholder="YYYY"
                placeholderTextColor={tokens.semantic.textTertiary}
                style={styles.input}
                accessibilityLabel="Birth year, four digits"
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={4}
                textAlign="center"
              />
            </View>
          </View>
          {day.length > 0 || month.length > 0 || year.length > 0 ? (
            <Text style={styles.helper}>
              {dateValid
                ? `${dayN} / ${monthN} / ${yearN}`
                : 'Day 1–31, month 1–12, year 1900–2100.'}
            </Text>
          ) : null}
        </View>

        {/* Birth time — Hour / Minute */}
        <View style={styles.field}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.label}>
            BIRTH TIME (24h)
          </Text>
          <View style={styles.row}>
            <View style={[styles.cell, styles.cellSmall]}>
              <Text style={styles.cellLabel}>HOUR</Text>
              <TextInput
                ref={hourRef}
                value={hour}
                onChangeText={handleHour}
                editable={!timeUnknown}
                placeholder="HH"
                placeholderTextColor={tokens.semantic.textTertiary}
                style={[styles.input, timeUnknown && styles.inputDisabled]}
                accessibilityLabel="Birth hour, 0 to 23"
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={2}
                textAlign="center"
              />
            </View>
            <View style={[styles.cell, styles.cellSmall]}>
              <Text style={styles.cellLabel}>MINUTE</Text>
              <TextInput
                ref={minuteRef}
                value={minute}
                onChangeText={handleMinute}
                editable={!timeUnknown}
                placeholder="MM"
                placeholderTextColor={tokens.semantic.textTertiary}
                style={[styles.input, timeUnknown && styles.inputDisabled]}
                accessibilityLabel="Birth minute, 0 to 59"
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={2}
                textAlign="center"
              />
            </View>
            <View style={[styles.cell, styles.cellSpacer]} />
          </View>
          <Pressable
            onPress={toggleTimeUnknown}
            style={styles.unknownToggle}
            accessibilityRole="button"
            accessibilityLabel="I don't know my birth time"
            accessibilityState={{ checked: timeUnknown }}
          >
            <View style={[styles.checkbox, timeUnknown && styles.checkboxOn]}>
              {timeUnknown ? (
                <Text variant="mono" color={tokens.semantic.textOnGold} style={{ fontSize: 12 }}>
                  ✓
                </Text>
              ) : null}
            </View>
            <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ fontSize: 14 }}>
              I don't know my birth time
            </Text>
          </Pressable>
          <Text
            variant="bodySmall"
            color={tokens.semantic.textTertiary}
            style={{ marginTop: 6, fontSize: 12, lineHeight: 18 }}
          >
            Knowing the time matters most for your rising sign and Energy Blueprint
            authority. Without it, the chart is still 80% useful.
          </Text>
        </View>

        {/* City */}
        <View style={styles.field}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.label}>
            BIRTH CITY
          </Text>
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="e.g. Istanbul, Turkey"
            placeholderTextColor={tokens.semantic.textTertiary}
            style={[styles.input, styles.inputWide]}
            accessibilityLabel="Birth city and country"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button block size="lg" onPress={save} disabled={!canSave}>
          {canSave ? 'Save & continue' : 'Enter your birth date to continue'}
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  intro: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  field: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  cell: {
    gap: 6,
  },
  cellSmall: {
    flex: 1,
  },
  cellLarge: {
    flex: 1.6,
  },
  cellSpacer: {
    flex: 1.6,
  },
  cellLabel: {
    fontFamily: tokens.fonts.bodyMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    color: tokens.semantic.textTertiary,
  },
  input: {
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
    borderRadius: tokens.radii.md,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 17,
    color: tokens.semantic.textPrimary,
    fontFamily: tokens.fonts.body,
  },
  inputWide: {
    textAlign: 'left',
  },
  inputDisabled: {
    opacity: 0.4,
  },
  helper: {
    marginTop: 8,
    fontFamily: tokens.fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: tokens.semantic.textTertiary,
  },
  unknownToggle: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: tokens.semantic.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: {
    backgroundColor: tokens.semantic.accent,
    borderColor: tokens.semantic.accent,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: tokens.semantic.bgBase,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
});
