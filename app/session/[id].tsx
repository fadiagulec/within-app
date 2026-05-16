/**
 * Session player screen — wired to the real expo-av AudioPlayer component.
 */
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { PostSessionModal } from '@/components/player/PostSessionModal';
import { tokens } from '@/theme/tokens';
import { findSessionById, getChakra } from '@/data/chakras';
import { findBreathworkById } from '@/data/breathwork';
import { findMeditationById } from '@/data/meditations';
import { useProgressStore } from '@/store/useProgressStore';
import type { Session } from '@/types';

export default function SessionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string | string[];
    journeyDay?: string | string[];
  }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const journeyDay = Array.isArray(params.journeyDay)
    ? params.journeyDay[0]
    : params.journeyDay;

  function exit() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/breath');
    }
  }

  const session = useMemo<Session | undefined>(() => {
    if (!id) return undefined;
    return findSessionById(id) ?? findBreathworkById(id) ?? findMeditationById(id);
  }, [id]);

  const markComplete = useProgressStore((s) => s.markSessionComplete);
  const completedSessionIds = useProgressStore(
    (s) => s.progress.completedSessionIds
  );
  const scrubUnlocked = session
    ? completedSessionIds.includes(session.id)
    : false;

  const [showPost, setShowPost] = useState(false);

  if (!session) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="heading2">Session not found.</Text>
          <Button
            variant="ghost"
            onPress={exit}
            style={{ marginTop: 16 }}
            accessibilityLabel="Go back"
          >
            Back
          </Button>
        </View>
      </Screen>
    );
  }

  const chakra = session.chakraKey ? getChakra(session.chakraKey) : undefined;
  const accent = chakra?.color ?? tokens.semantic.accent;
  const dayN = journeyDay ? Number(journeyDay) : undefined;

  function handleComplete(actualMinutes: number) {
    markComplete(session!.id, actualMinutes);
    setShowPost(true);
  }

  return (
    <>
      <AudioPlayer
        session={{
          id: session.id,
          title: session.title,
          subtitle: session.subtitle ?? session.category.toUpperCase(),
          theme: session.theme,
          durationMin: session.durationMin,
          filePath: session.filePath,
        }}
        accentColor={accent}
        scrubUnlocked={scrubUnlocked}
        onMarkComplete={handleComplete}
        onExit={exit}
      />
      <PostSessionModal
        visible={showPost}
        sessionId={session.id}
        sessionTitle={session.title}
        chakra={session.chakraKey}
        journeyDay={dayN}
        onClose={() => {
          setShowPost(false);
          exit();
        }}
      />
    </>
  );
}
