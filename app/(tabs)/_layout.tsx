import React from 'react';
import { Tabs } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { tokens } from '@/theme/tokens';

/**
 * Tab bar — 3 tabs only.
 *
 * Today · Path · You
 *
 * "Today" answers "what do I do right now."
 * "Path" answers "where am I on the journey, and what comes next."
 * "You" holds profile, library, and deep dives.
 *
 * The old Library / Plans / Tips / Insights / Breath / Journey / Vision /
 * Journal screens are still reachable as routes (links from the You menu,
 * Path stages, and direct URLs) — they're just not in the tab bar.
 */

function TabIcon({ name, color }: { name: string; color: string }) {
  const size = 22;
  switch (name) {
    case 'today':
      // Sun / single point of focus
      return (
        <Svg width={size} height={size} viewBox="0 0 22 22">
          <Circle cx={11} cy={11} r={4} stroke={color} strokeWidth={1.5} fill="none" />
          <Path
            d="M11 1v3M11 18v3M1 11h3M18 11h3M3.5 3.5l2 2M16.5 16.5l2 2M16.5 3.5l2-2M3.5 18.5l2-2"
            stroke={color}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'path':
      // Vertical journey arc
      return (
        <Svg width={size} height={size} viewBox="0 0 22 22">
          <Path
            d="M5 3 Q5 8 11 11 Q17 14 17 19"
            stroke={color}
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />
          <Circle cx={5} cy={3} r={1.8} fill={color} />
          <Circle cx={11} cy={11} r={1.8} fill={color} />
          <Circle cx={17} cy={19} r={1.8} fill={color} />
        </Svg>
      );
    case 'you':
      return (
        <Svg width={size} height={size} viewBox="0 0 22 22">
          <Circle cx={11} cy={8} r={4} stroke={color} strokeWidth={1.5} fill="none" />
          <Path d="M3 19c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth={1.5} fill="none" />
        </Svg>
      );
    default:
      return null;
  }
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.semantic.accent,
        tabBarInactiveTintColor: tokens.semantic.textTertiary,
        tabBarStyle: {
          backgroundColor: tokens.semantic.bgElevated,
          borderTopColor: tokens.semantic.borderSubtle,
          height: 72,
          paddingTop: 10,
          paddingBottom: 16,
        },
        tabBarLabelStyle: {
          fontFamily: tokens.fonts.bodyMedium,
          fontSize: 10,
          letterSpacing: 1,
          textTransform: 'uppercase',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => <TabIcon name="today" color={color} />,
        }}
      />
      <Tabs.Screen
        name="path"
        options={{
          title: 'Path',
          tabBarIcon: ({ color }) => <TabIcon name="path" color={color} />,
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => <TabIcon name="you" color={color} />,
        }}
      />

      {/* Hidden from the tab bar but still reachable as routes/links. */}
      <Tabs.Screen name="library" options={{ href: null }} />
      <Tabs.Screen name="plans" options={{ href: null }} />
      <Tabs.Screen name="breath" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="journey" options={{ href: null }} />
      <Tabs.Screen name="journal" options={{ href: null }} />
      <Tabs.Screen name="vision" options={{ href: null }} />
      <Tabs.Screen name="insights" options={{ href: null }} />
      <Tabs.Screen name="tips" options={{ href: null }} />
    </Tabs>
  );
}
