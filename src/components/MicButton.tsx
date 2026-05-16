/**
 * Within — MicButton.
 *
 * Tap to dictate into any text field. Wraps src/lib/dictation.ts.
 *
 * Usage:
 *   <MicButton
 *     value={text}
 *     onChange={setText}
 *     accent={tokens.semantic.accent}
 *   />
 *
 * Behaviour:
 *   - Renders nothing if the browser doesn't support speech recognition
 *     (Firefox, older Safari). The text field still works as a normal
 *     keyboard input.
 *   - Tap once → opens mic, button pulses red, transcript streams into
 *     the field as the user speaks.
 *   - Tap again → stops the mic, finalises whatever was captured.
 *   - The button appends to existing text (doesn't wipe what's already
 *     there). So users can mix typing and speaking.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View, StyleSheet, Animated, Easing } from 'react-native';

import { Text } from '@/components/Text';
import { tokens } from '@/theme/tokens';
import { isDictationSupported, startDictation, type DictationHandle } from '@/lib/dictation';

interface Props {
  /** Current value of the input we're dictating into. */
  value: string;
  /** Called when the transcript updates (interim or final). */
  onChange: (text: string) => void;
  /** Hex color used for the button accent. */
  accent?: string;
  /** Visual size. */
  size?: 'sm' | 'md';
  /** Optional label override. */
  label?: string;
}

export function MicButton({
  value,
  onChange,
  accent,
  size = 'sm',
  label,
}: Props) {
  const a = accent ?? tokens.semantic.accent;
  const handleRef = useRef<DictationHandle | null>(null);
  const baseTextRef = useRef('');
  const [listening, setListening] = useState(false);
  const [supported] = useState(() => isDictationSupported());
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Pulse animation while listening.
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!listening) {
      pulse.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [listening, pulse]);

  // Clean up if the component unmounts mid-listen.
  useEffect(() => {
    return () => {
      handleRef.current?.abort();
      handleRef.current = null;
    };
  }, []);

  if (!supported) return null;

  function toggle() {
    if (listening) {
      handleRef.current?.stop();
      handleRef.current = null;
      setListening(false);
      return;
    }

    // Capture the text already in the input — we APPEND dictation to it,
    // so users can mix typing and speaking.
    baseTextRef.current = value;
    setErrorMsg(null);

    const handle = startDictation({
      onInterim: (transcript) => {
        const sep = baseTextRef.current && !baseTextRef.current.endsWith(' ') ? ' ' : '';
        onChange(`${baseTextRef.current}${sep}${transcript}`);
      },
      onFinal: (transcript) => {
        const sep = baseTextRef.current && !baseTextRef.current.endsWith(' ') ? ' ' : '';
        onChange(transcript ? `${baseTextRef.current}${sep}${transcript}` : baseTextRef.current);
        setListening(false);
        handleRef.current = null;
      },
      onError: (err) => {
        if (err === 'not-allowed' || err === 'permission-denied') {
          setErrorMsg('Mic blocked. Allow microphone in your browser settings.');
        } else if (err === 'no-speech') {
          // silent — user just didn't speak
        } else {
          setErrorMsg('Mic error — try again');
        }
        setListening(false);
        handleRef.current = null;
      },
    });

    if (!handle) {
      setErrorMsg('Dictation not available in this browser.');
      return;
    }
    handleRef.current = handle;
    setListening(true);
  }

  const dims = size === 'sm'
    ? { padHoriz: 10, padVert: 6, fontSize: 11, iconSize: 12 }
    : { padHoriz: 14, padVert: 8, fontSize: 13, iconSize: 14 };

  const pulseColor = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [`${a}22`, `${a}55`],
  });

  return (
    <View>
      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel={listening ? 'Stop dictation' : 'Start voice dictation'}
        accessibilityState={{ busy: listening }}
      >
        <Animated.View
          style={[
            styles.btn,
            {
              paddingHorizontal: dims.padHoriz,
              paddingVertical: dims.padVert,
              borderColor: a,
              backgroundColor: listening ? pulseColor : `${a}14`,
            },
          ]}
        >
          <View style={styles.row}>
            <Text style={{ fontSize: dims.iconSize, color: a }}>
              {listening ? '●' : '🎙'}
            </Text>
            <Text style={{ fontSize: dims.fontSize, color: a, letterSpacing: 1.2, fontFamily: tokens.fonts.mono }}>
              {listening ? 'LISTENING — TAP TO STOP' : (label ?? 'SPEAK INSTEAD')}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
      {errorMsg ? (
        <Text style={{ marginTop: 6, fontSize: 12, color: tokens.semantic.textTertiary }}>
          {errorMsg}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-start',
    borderRadius: tokens.radii.pill,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
