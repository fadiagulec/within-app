import React from 'react';
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native';
import { tokens } from '@/theme/tokens';

type Variant =
  | 'hero'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'displayItalic'
  | 'body'
  | 'bodyLarge'
  | 'bodySmall'
  | 'label'
  | 'mono'
  | 'eyebrow';

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export function Text({
  variant = 'body',
  color,
  italic,
  align,
  style,
  children,
  ...rest
}: Props) {
  const composed: TextStyle[] = [styles[variant]];
  if (color) composed.push({ color });
  if (italic) composed.push({ fontStyle: 'italic' });
  if (align) composed.push({ textAlign: align });
  if (style) composed.push(style as TextStyle);
  return (
    <RNText {...rest} style={composed} allowFontScaling>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create<Record<Variant, TextStyle>>({
  hero: {
    fontFamily: tokens.fonts.displayRegular,
    fontSize: tokens.fontSizes.fs64,
    lineHeight: tokens.fontSizes.fs64 * 0.96,
    letterSpacing: -1.2,
    color: tokens.semantic.textPrimary,
  },
  heading1: {
    fontFamily: tokens.fonts.display,
    fontSize: tokens.fontSizes.fs32,
    lineHeight: tokens.fontSizes.fs32 * tokens.lineHeights.tight,
    letterSpacing: -0.5,
    color: tokens.semantic.textPrimary,
  },
  heading2: {
    fontFamily: tokens.fonts.display,
    fontSize: tokens.fontSizes.fs24,
    lineHeight: tokens.fontSizes.fs24 * tokens.lineHeights.tight,
    letterSpacing: -0.3,
    color: tokens.semantic.textPrimary,
  },
  heading3: {
    fontFamily: tokens.fonts.display,
    fontSize: tokens.fontSizes.fs20,
    lineHeight: tokens.fontSizes.fs20 * tokens.lineHeights.snug,
    color: tokens.semantic.textPrimary,
  },
  displayItalic: {
    fontFamily: tokens.fonts.displayRegular,
    fontStyle: 'italic',
    fontSize: 22,
    lineHeight: 22 * tokens.lineHeights.snug,
    color: tokens.semantic.textSecondary,
  },
  body: {
    fontFamily: tokens.fonts.body,
    fontSize: tokens.fontSizes.fs14,
    lineHeight: tokens.fontSizes.fs14 * tokens.lineHeights.normal,
    color: tokens.semantic.textPrimary,
  },
  bodyLarge: {
    fontFamily: tokens.fonts.body,
    fontSize: tokens.fontSizes.fs16,
    lineHeight: tokens.fontSizes.fs16 * tokens.lineHeights.normal,
    color: tokens.semantic.textPrimary,
  },
  bodySmall: {
    fontFamily: tokens.fonts.body,
    fontSize: tokens.fontSizes.fs12,
    lineHeight: tokens.fontSizes.fs12 * tokens.lineHeights.normal,
    color: tokens.semantic.textSecondary,
  },
  label: {
    fontFamily: tokens.fonts.bodySemiBold,
    fontSize: tokens.fontSizes.fs12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: tokens.semantic.textSecondary,
  },
  eyebrow: {
    fontFamily: tokens.fonts.body,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: tokens.semantic.textTertiary,
  },
  mono: {
    fontFamily: tokens.fonts.mono,
    fontSize: tokens.fontSizes.fs12,
    letterSpacing: -0.2,
    color: tokens.semantic.textPrimary,
  },
});
