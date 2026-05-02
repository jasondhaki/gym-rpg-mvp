import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10b981', // emerald-500
        tabBarInactiveTintColor: '#71717a', // zinc-400
        tabBarStyle: {
          backgroundColor: '#09090b', // zinc-950
          borderTopColor: '#27272a', // zinc-800
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: '#09090b',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#ffffff',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'The Hub',
          tabBarIcon: ({ color }) => <Ionicons name="person-sharp" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color }) => <Ionicons name="barbell-sharp" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Rankings',
          tabBarIcon: ({ color }) => <Ionicons name="trophy-sharp" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}