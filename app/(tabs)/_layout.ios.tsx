
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  console.log('TabLayout: Rendering tab navigation (iOS)');
  
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'explore',
      route: '/(tabs)/explore',
      icon: 'explore',
      label: 'Explore',
    },
    {
      name: 'map',
      route: '/(tabs)/map',
      icon: 'map',
      label: 'Map',
    },
    {
      name: 'community',
      route: '/(tabs)/community',
      icon: 'group',
      label: 'Community',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person',
      label: 'Profile',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="map" />
        <Stack.Screen name="community" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={360} />
    </>
  );
}
