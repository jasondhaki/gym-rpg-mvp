import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useState, useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
// Make sure this path points to where you created the new component!
import CustomSplash from '../src/components/CustomSplash'; 

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  // 1. Set up the State for the Splash Screen
  const [appReady, setAppReady] = useState(false);

  // 2. The Timer Intercept
  useEffect(() => {
    // Holds the splash screen for 2.5 seconds (2500ms).
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // 3. The Hijack: If timer isn't done, return the Splash Component
  if (!appReady) {
    return <CustomSplash />;
  }

  // 4. Once timer hits 0, return your actual app UI
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}