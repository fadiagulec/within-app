import React from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  View,
  ActivityIndicator,
  TextStyle,
} from 'react-native';
import * as Haptics from '@/lib/haptic';
import { tokens } from '@/theme/tokens';
import { Text } from './Text';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  variant?: Variant;
  size?: Size;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  haptic?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  onPress,
  disabled,
  loading,
  block,
  haptic = true,
  style,
  children,
  accessibilityLabel,
  accessibilityHint,
}: Props) {
  const handle = () => {
    if (disabled || loading) return;
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress?.();
  };

  const base = styles.base;
  const sizeStyle = sizeStyles[size];
  const variantStyle = variantStyles[variant];
  const labelStyle: TextStyle = {
    ...labelStyles.base,
    ...labelVariant[variant],
    ...labelSize[size],
  };

  return (
    <Pressable
      onPress={handle}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading || false, busy: loading || false }}
      style={({ pressed }) => [
        base,
        sizeStyle,
        variantStyle,
        block && { alignSelf: 'stretch' },
        disabled && { opacity: 0.45 },
        pressed && { opacity: 0.8 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? tokens.semantic.textOnGold : tokens.semantic.accent} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={labelStyle}>{children}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: tokens.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  // sm bumped 36 → 44 to meet iOS 44pt minimum touch target
  sm: { paddingVertical: 12, paddingHorizontal: 18, minHeight: 44 },
  md: { paddingVertical: 14, paddingHorizontal: 24, minHeight: 48 },
  lg: { paddingVertical: 18, paddingHorizontal: 32, minHeight: 56 },
};

const variantStyles: Record<Variant, ViewStyle> = {
  primary: {
    backgroundColor: tokens.semantic.accent,
    ...tokens.shadows.gold,
  },
  secondary: {
    backgroundColor: tokens.semantic.bgElevated,
    borderWidth: 1,
    borderColor: tokens.semantic.borderStrong,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
};

const labelStyles = StyleSheet.create({
  base: {
    fontFamily: tokens.fonts.bodyMedium,
    letterSpacing: 0.4,
  },
});

const labelVariant: Record<Variant, TextStyle> = {
  primary: { color: tokens.semantic.textOnGold },
  secondary: { color: tokens.semantic.textPrimary },
  ghost: { color: tokens.semantic.accent },
};

const labelSize: Record<Size, TextStyle> = {
  sm: { fontSize: 13 },
  md: { fontSize: 15 },
  lg: { fontSize: 16 },
};
