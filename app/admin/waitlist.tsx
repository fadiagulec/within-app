/**
 * Admin — Waitlist export.
 *
 * Not advertised in the nav. Reachable by typing the URL: /admin/waitlist
 * Shows every waitlist signup captured on this device + lets the founder
 * download a CSV of them.
 *
 * v1: local-only. Until a real backend is wired (Formspree / your Vercel
 * function), this is the only way to get the emails out of the user's
 * device. Use it on YOUR phone after retreat bookings to grab the list.
 *
 * v2: when ENDPOINT in src/store/useWaitlistStore.ts is set, all entries
 * also POST to your server in real-time and this screen becomes a backup
 * view rather than the only channel.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';
import { useWaitlistStore } from '@/store/useWaitlistStore';

export default function AdminWaitlist() {
  const router = useRouter();
  const entries = useWaitlistStore((s) => s.entries);
  const exportCSV = useWaitlistStore((s) => s.exportCSV);
  const clear = useWaitlistStore((s) => s.clear);

  function goBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/you' as never);
  }

  function downloadCSV() {
    const csv = exportCSV();
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof document !== 'undefined') {
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `soma-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // On native, copy to clipboard would need expo-clipboard import.
      // For v1 this is web-only (the founder uses /admin/waitlist on web).
      // Native fallback: just log to console; user can sync via remote backend later.
      // eslint-disable-next-line no-console
      console.log('soma-waitlist CSV:\n' + csv);
    }
  }

  function confirmClear() {
    if (typeof window !== 'undefined' && window.confirm) {
      const ok = window.confirm(
        `Clear all ${entries.length} waitlist entries from this device? This cannot be undone.`
      );
      if (ok) clear();
    } else {
      clear();
    }
  }

  // Group entries by item for the summary
  const byItem: Record<string, { title: string; count: number }> = {};
  for (const e of entries) {
    const key = e.itemId;
    const existing = byItem[key];
    if (existing) {
      existing.count += 1;
    } else {
      byItem[key] = { title: e.itemTitle, count: 1 };
    }
  }
  const itemSummary = Object.entries(byItem).sort(
    (a, b) => b[1].count - a[1].count
  );

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
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
          <Text variant="mono" color={tokens.semantic.accent} style={{ fontSize: 11, letterSpacing: 1.8 }}>
            ADMIN
          </Text>
        </View>

        <View style={styles.intro}>
          <Text variant="eyebrow" color={tokens.semantic.accent}>
            WAITLIST
          </Text>
          <Text variant="heading1" style={{ marginTop: 6, fontSize: 32 }}>
            {entries.length} {entries.length === 1 ? 'signup' : 'signups'} on this device.
          </Text>
          <Text
            variant="body"
            color={tokens.semantic.textSecondary}
            style={{ marginTop: 12, fontSize: 15, lineHeight: 22 }}
          >
            These are stored locally in this browser. To collect across devices,
            wire ENDPOINT in <Text variant="body" color={tokens.semantic.textPrimary} italic>src/store/useWaitlistStore.ts</Text> to a Formspree URL or your own Vercel function.
          </Text>
        </View>

        {/* Summary by item */}
        {itemSummary.length > 0 ? (
          <View style={styles.section}>
            <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
              BY ITEM
            </Text>
            {itemSummary.map(([id, s]) => (
              <View key={id} style={styles.summaryRow}>
                <View style={{ flex: 1 }}>
                  <Text variant="body" color={tokens.semantic.textPrimary} style={{ fontSize: 15 }}>
                    {s.title}
                  </Text>
                  <Text variant="bodySmall" color={tokens.semantic.textTertiary} style={{ marginTop: 2, fontSize: 12 }}>
                    {id}
                  </Text>
                </View>
                <Text variant="mono" color={tokens.semantic.accent} style={{ fontSize: 18 }}>
                  {s.count}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* All entries */}
        {entries.length > 0 ? (
          <View style={styles.section}>
            <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.sectionLabel}>
              ALL ENTRIES
            </Text>
            {entries
              .slice()
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((e, i) => (
                <View key={i} style={styles.entryRow}>
                  <View style={{ flex: 1 }}>
                    <Text variant="body" color={tokens.semantic.textPrimary} style={{ fontSize: 14 }}>
                      {e.email}
                      {e.name ? ` · ${e.name}` : ''}
                    </Text>
                    <Text variant="bodySmall" color={tokens.semantic.textSecondary} style={{ marginTop: 2, fontSize: 12 }}>
                      {e.itemTitle} · {new Date(e.timestamp).toLocaleString()}
                    </Text>
                  </View>
                  <Text
                    variant="mono"
                    color={e.syncedToServer ? tokens.semantic.successSage : tokens.semantic.textTertiary}
                    style={{ fontSize: 10 }}
                  >
                    {e.syncedToServer ? 'SYNCED' : 'LOCAL'}
                  </Text>
                </View>
              ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text variant="body" color={tokens.semantic.textSecondary} style={{ fontSize: 15, lineHeight: 23, textAlign: 'center', paddingHorizontal: 20 }}>
              No signups on this device yet.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer actions */}
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Button
              variant="ghost"
              size="lg"
              onPress={confirmClear}
              disabled={entries.length === 0}
              accessibilityLabel="Clear all entries"
            >
              Clear
            </Button>
          </View>
          <View style={{ flex: 2 }}>
            <Button
              block
              size="lg"
              onPress={downloadCSV}
              disabled={entries.length === 0}
              accessibilityLabel="Download CSV"
            >
              {Platform.OS === 'web' ? 'Download CSV' : 'Export CSV (web only for now)'}
            </Button>
          </View>
        </View>
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
  intro: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1.8,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderSubtle,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: tokens.semantic.borderSubtle,
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
