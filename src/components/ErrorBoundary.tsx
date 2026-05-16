/**
 * ErrorBoundary — catches render-time crashes anywhere below it and shows
 * a visible error message instead of a blank page.
 *
 * Mounted at the very root in app/_layout.tsx so a crash in any screen
 * doesn't leave the user staring at white.
 *
 * v1: shows error + stack + reload button. v2: report to Sentry / log
 * server.
 */

import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';

interface State {
  error: Error | null;
}

interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reload = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.reload();
    } else {
      this.setState({ error: null });
    }
  };

  render() {
    if (!this.state.error) return this.props.children;
    const err = this.state.error;
    return (
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.eyebrow}>
            SOMETHING BROKE
          </Text>
          <Text variant="heading1" style={styles.headline}>
            The screen could not render.
          </Text>
          <Text variant="body" color={tokens.semantic.textSecondary} style={styles.body}>
            This is on us, not you. The full error is below — tap reload to try again,
            or screenshot this and send it over.
          </Text>

          <View style={styles.errCard}>
            <Text variant="mono" color={tokens.semantic.textTertiary} style={{ fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
              ERROR · {err.name ?? 'Error'}
            </Text>
            <Text variant="body" color={tokens.semantic.textPrimary} style={{ fontSize: 14, lineHeight: 21 }}>
              {err.message ?? 'Unknown error'}
            </Text>
            {err.stack ? (
              <Text variant="mono" color={tokens.semantic.textTertiary} style={styles.stack}>
                {err.stack.split('\n').slice(0, 12).join('\n')}
              </Text>
            ) : null}
          </View>

          <Pressable
            onPress={this.reload}
            accessibilityRole="button"
            accessibilityLabel="Reload"
            style={styles.btn}
          >
            <Text variant="body" color={tokens.semantic.textOnGold} style={{ fontSize: 15 }}>
              Reload
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: tokens.semantic.bgBase,
  },
  content: {
    padding: 24,
    paddingTop: 80,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
  },
  headline: {
    marginTop: 8,
    fontSize: 28,
  },
  body: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 23,
  },
  errCard: {
    marginTop: 24,
    padding: 16,
    backgroundColor: tokens.semantic.bgElevated,
    borderRadius: tokens.radii.md,
    borderWidth: 1,
    borderColor: tokens.semantic.borderDefault,
  },
  stack: {
    marginTop: 14,
    fontSize: 11,
    lineHeight: 17,
  },
  btn: {
    marginTop: 28,
    backgroundColor: tokens.semantic.accent,
    paddingVertical: 16,
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
  },
});
