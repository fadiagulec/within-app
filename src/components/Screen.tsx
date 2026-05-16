import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '@/theme/tokens';

interface Props {
  scroll?: boolean;
  padded?: boolean;
  avoidKeyboard?: boolean;
  backgroundColor?: string;
  contentStyle?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  children: React.ReactNode;
}

export function Screen({
  scroll = false,
  padded = true,
  avoidKeyboard = false,
  backgroundColor = tokens.semantic.bgBase,
  contentStyle,
  edges = ['top', 'bottom', 'left', 'right'],
  children,
}: Props) {
  const insets = useSafeAreaInsets();
  const pad: ViewStyle = padded
    ? { paddingHorizontal: tokens.spacing.s5 }
    : {};

  const content = (
    <View style={[styles.content, pad, contentStyle]}>{children}</View>
  );

  const Body = scroll ? (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + tokens.spacing.s4,
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {content}
    </ScrollView>
  ) : (
    content
  );

  const Wrapped = avoidKeyboard ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {Body}
    </KeyboardAvoidingView>
  ) : (
    Body
  );

  return (
    <SafeAreaView edges={edges} style={[styles.root, { backgroundColor }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor}
      />
      {Wrapped}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
});
