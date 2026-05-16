/**
 * AudioPlayer — full-screen expo-av audio player.
 *
 * Key behaviors per spec:
 *  - First-listen scrub lock: scrubbing disabled until the session is marked
 *    complete at least once.
 *  - "Mark Complete" surfaces at 80% progress OR on audio end.
 *  - Exit confirm after >30s played.
 *  - Background audio + lockscreen via Audio.setAudioModeAsync.
 *  - Haptic pulse on play/pause, 15s rewind/forward.
 *
 * Graceful fallback: if expo-av fails to load the asset (e.g. in Expo Go web
 * or a missing bundle), the player still runs with a simulated clock so the
 * UI + completion flow can be tested.
 */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as Haptics from '@/lib/haptic';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/Text';
import { BreathOrb } from '@/components/BreathOrb';
import { tokens } from '@/theme/tokens';

export interface AudioPlayerSessionLike {
  id: string;
  title: string;
  subtitle?: string;
  theme: string;
  durationMin: number;
  filePath?: string;
}

interface Props {
  session: AudioPlayerSessionLike;
  accentColor?: string;
  /** Whether session has already been completed at least once — controls scrub lock. */
  scrubUnlocked: boolean;
  /** Optional remote URI override; otherwise we try asset loading. */
  audioUri?: string;
  /** Fired when user taps Mark Complete (or audio finishes). */
  onMarkComplete: (actualMinutes: number) => void;
  /** Fired when user exits (after confirmation if >30s played). */
  onExit: () => void;
}

function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function AudioPlayer({
  session,
  accentColor,
  scrubUnlocked,
  audioUri,
  onMarkComplete,
  onExit,
}: Props) {
  const accent = accentColor ?? tokens.semantic.accent;
  const totalMs = session.durationMin * 60 * 1000;

  const soundRef = useRef<Audio.Sound | null>(null);
  const simTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef<number>(0);
  // Prevents onMarkComplete from firing more than once per session
  // (audio didJustFinish + sim-timer end + manual button can otherwise stack).
  const completedRef = useRef(false);

  const fireCompleteOnce = useCallback(
    (minutes: number) => {
      if (completedRef.current) return;
      completedRef.current = true;
      onMarkComplete(minutes);
    },
    [onMarkComplete]
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(totalMs);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [markedCompleteOnce, setMarkedCompleteOnce] = useState(false);

  // Total seconds actually played (for exit-confirm logic).
  const playedSecondsRef = useRef(0);
  const lastTickRef = useRef<number>(0);

  const progress = durationMs > 0 ? positionMs / durationMs : 0;
  const canMarkComplete = progress >= 0.8 || markedCompleteOnce;

  // ---- Audio setup ----
  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch {
        // ignore — not available on web
      }

      if (!audioUri) {
        // No real audio asset — run in simulated mode.
        setLoading(false);
        return;
      }

      try {
        const { sound, status } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: false }
        );
        if (cancelled) {
          await sound.unloadAsync();
          return;
        }
        soundRef.current = sound;
        if (status.isLoaded && status.durationMillis) {
          setDurationMs(status.durationMillis);
        }
        sound.setOnPlaybackStatusUpdate((st) => {
          if (!st.isLoaded) {
            if (st.error) setLoadError(st.error);
            return;
          }
          setPositionMs(st.positionMillis ?? 0);
          if (st.durationMillis) setDurationMs(st.durationMillis);
          setIsPlaying(st.isPlaying);
          if (st.didJustFinish) {
            setIsPlaying(false);
            fireCompleteOnce(session.durationMin);
          }
        });
        setLoading(false);
      } catch (e) {
        setLoadError(e instanceof Error ? e.message : 'Audio load failed');
        setLoading(false);
      }
    }
    void init();

    return () => {
      cancelled = true;
      if (simTimer.current) {
        clearInterval(simTimer.current);
        simTimer.current = null;
      }
      const s = soundRef.current;
      if (s) {
        // Detach the status listener BEFORE unloading so it can't fire
        // after unmount and trigger setState on a torn-down component.
        s.setOnPlaybackStatusUpdate(null);
        s.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUri]);

  // ---- Simulated timer for dev / missing asset ----
  const tickSim = useCallback(() => {
    setPositionMs((prev) => {
      const next = Math.min(totalMs, prev + 1000);
      if (next >= totalMs) {
        if (simTimer.current) {
          clearInterval(simTimer.current);
          simTimer.current = null;
        }
        setIsPlaying(false);
        fireCompleteOnce(session.durationMin);
      }
      return next;
    });
    const now = Date.now();
    if (lastTickRef.current > 0) {
      playedSecondsRef.current += (now - lastTickRef.current) / 1000;
    }
    lastTickRef.current = now;
  }, [totalMs, fireCompleteOnce, session.durationMin]);

  // ---- Play / pause ----
  const handlePlayPause = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    if (soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        if (startedAtRef.current === 0) startedAtRef.current = Date.now();
        await soundRef.current.playAsync();
      }
      return;
    }
    // Simulated mode
    if (isPlaying) {
      if (simTimer.current) clearInterval(simTimer.current);
      simTimer.current = null;
      lastTickRef.current = 0;
      setIsPlaying(false);
    } else {
      if (startedAtRef.current === 0) startedAtRef.current = Date.now();
      simTimer.current = setInterval(tickSim, 1000);
      lastTickRef.current = Date.now();
      setIsPlaying(true);
    }
  }, [isPlaying, tickSim]);

  const seek = useCallback(
    async (deltaMs: number) => {
      Haptics.selectionAsync().catch(() => {});
      const next = Math.min(durationMs, Math.max(0, positionMs + deltaMs));
      setPositionMs(next);
      if (soundRef.current) {
        await soundRef.current.setPositionAsync(next);
      }
    },
    [positionMs, durationMs]
  );

  const handleRewind = useCallback(() => {
    if (!scrubUnlocked && !markedCompleteOnce) {
      // First listen: rewind still allowed (scrub back) but not forward.
      void seek(-15_000);
      return;
    }
    void seek(-15_000);
  }, [scrubUnlocked, markedCompleteOnce, seek]);

  const handleForward = useCallback(() => {
    if (!scrubUnlocked && !markedCompleteOnce) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(
        () => {}
      );
      return;
    }
    void seek(15_000);
  }, [scrubUnlocked, markedCompleteOnce, seek]);

  const handleExit = useCallback(() => {
    const playedSec =
      startedAtRef.current > 0
        ? (Date.now() - startedAtRef.current) / 1000
        : 0;
    if (playedSec > 30) {
      Alert.alert(
        'Leave now?',
        "You've started the session. Your progress won't be saved.",
        [
          { text: 'Keep going', style: 'cancel' },
          {
            text: 'Leave',
            style: 'destructive',
            onPress: () => {
              if (soundRef.current) void soundRef.current.pauseAsync();
              if (simTimer.current) clearInterval(simTimer.current);
              onExit();
            },
          },
        ]
      );
      return;
    }
    if (soundRef.current) void soundRef.current.pauseAsync();
    if (simTimer.current) clearInterval(simTimer.current);
    onExit();
  }, [onExit]);

  const handleMarkComplete = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
    setMarkedCompleteOnce(true);
    fireCompleteOnce(session.durationMin);
  }, [fireCompleteOnce, session.durationMin]);

  const phaseLabel = useMemo(() => {
    if (loading) return 'Loading…';
    if (!isPlaying && positionMs === 0) return 'Begin';
    if (!isPlaying) return 'Pause';
    const cycle = Math.floor(positionMs / 4000) % 2;
    return cycle === 0 ? 'Inhale' : 'Exhale';
  }, [loading, isPlaying, positionMs]);

  // True when we tried to load real audio and the asset is genuinely missing
  // (e.g. 404 / unbundled). In that case we show a premium "in preparation"
  // empty state instead of player controls — the voice is curated and we
  // would rather defer than substitute.
  const audioUnavailable = !!loadError;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[`${accent}33`, 'transparent']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <Pressable
          onPress={handleExit}
          hitSlop={14}
          accessibilityRole="button"
          accessibilityLabel="Close session"
        >
          <Text variant="body" color={tokens.semantic.textSecondary}>
            ← Close
          </Text>
        </Pressable>
        <Text variant="mono" color={tokens.semantic.textTertiary}>
          {session.durationMin} MIN
        </Text>
      </View>

      <View style={styles.body}>
        <Text variant="eyebrow" color={accent} align="center">
          {session.subtitle ?? 'SESSION'}
        </Text>
        <Text variant="heading1" align="center" style={{ maxWidth: 320, marginTop: 10 }}>
          {session.title}
        </Text>
        <Text
          variant="displayItalic"
          align="center"
          color={tokens.semantic.textSecondary}
          style={{ marginTop: 10, maxWidth: 300 }}
        >
          {session.theme}
        </Text>

        <View style={{ marginTop: 36, marginBottom: 24 }}>
          <BreathOrb size={200} phaseLabel={audioUnavailable ? 'Soon' : phaseLabel} />
        </View>

        {audioUnavailable ? (
          <View style={styles.unavailable}>
            <Text
              variant="displayItalic"
              align="center"
              color={tokens.semantic.textPrimary}
              style={{ fontSize: 22, lineHeight: 30 }}
            >
              This session is being prepared.
            </Text>
            <Text
              variant="body"
              align="center"
              color={tokens.semantic.textSecondary}
              style={{ marginTop: 16, maxWidth: 320, lineHeight: 22 }}
            >
              The audio recordings come from a single voice — and that voice is being cared for. Check back soon, or explore the journaling prompt below while you wait.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.progressBlock}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: accent,
                      width: `${Math.min(100, progress * 100)}%`,
                    },
                  ]}
                />
              </View>
              <View style={styles.timeRow}>
                <Text variant="mono" color={tokens.semantic.textSecondary}>
                  {formatTime(positionMs)}
                </Text>
                <Text variant="mono" color={tokens.semantic.textSecondary}>
                  {formatTime(durationMs)}
                </Text>
              </View>
              {!scrubUnlocked && !markedCompleteOnce ? (
                <Text
                  variant="bodySmall"
                  align="center"
                  color={tokens.semantic.textTertiary}
                  style={{ marginTop: 6 }}
                >
                  First listen · pace is kept intentional.
                </Text>
              ) : null}
            </View>

            <View style={styles.controls}>
              <Pressable
                onPress={handleRewind}
                style={styles.skip}
                hitSlop={10}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Rewind 15 seconds"
              >
                <Text variant="heading3" color={tokens.semantic.textSecondary}>
                  ⏪ 15
                </Text>
              </Pressable>
              <Pressable
                onPress={handlePlayPause}
                style={[styles.play, { backgroundColor: accent }]}
                hitSlop={12}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
                accessibilityState={{ busy: loading }}
              >
                {loading ? (
                  <ActivityIndicator color={tokens.semantic.textOnGold} />
                ) : (
                  <Text variant="heading1" color={tokens.semantic.textOnGold}>
                    {isPlaying ? '❚❚' : '▶'}
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={handleForward}
                style={[
                  styles.skip,
                  (!scrubUnlocked && !markedCompleteOnce) && { opacity: 0.35 },
                ]}
                hitSlop={10}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Forward 15 seconds"
                accessibilityState={{ disabled: !scrubUnlocked && !markedCompleteOnce }}
              >
                <Text variant="heading3" color={tokens.semantic.textSecondary}>
                  15 ⏩
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>

      <View style={styles.footer}>
        {audioUnavailable ? (
          <Pressable
            onPress={handleExit}
            style={[styles.completeBtn, { backgroundColor: tokens.semantic.bgRaised }]}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Text variant="body" color={tokens.semantic.textSecondary}>
              Close
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleMarkComplete}
            disabled={!canMarkComplete}
            style={[
              styles.completeBtn,
              { backgroundColor: canMarkComplete ? accent : tokens.semantic.bgRaised },
            ]}
            accessibilityRole="button"
            accessibilityLabel={canMarkComplete ? 'Mark session complete' : 'Mark complete (available at 80% progress)'}
            accessibilityState={{ disabled: !canMarkComplete }}
          >
            <Text
              variant="body"
              color={canMarkComplete ? tokens.semantic.textOnGold : tokens.semantic.textTertiary}
            >
              {canMarkComplete ? 'Mark complete →' : 'Mark complete (at 80%)'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: tokens.semantic.bgBase,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  progressBlock: {
    width: '100%',
    maxWidth: 340,
  },
  progressTrack: {
    height: 4,
    backgroundColor: tokens.semantic.borderSubtle,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controls: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  skip: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  play: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: tokens.semantic.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: tokens.semantic.borderSubtle,
  },
  completeBtn: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radii.pill,
  },
  unavailable: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 8,
  },
});
