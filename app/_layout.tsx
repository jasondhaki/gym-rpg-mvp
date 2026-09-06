import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; // NEW IMPORT

// 1. Import the Font Loader
import { useFonts } from 'expo-font';
import { BlackOpsOne_400Regular } from '@expo-google-fonts/black-ops-one';
import { SpaceMono_400Regular } from '@expo-google-fonts/space-mono';

import { useColorScheme } from '@/hooks/use-color-scheme';
import CustomSplash from '../src/components/CustomSplash'; 

// Keep the native splash visible while we load initial assets
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'CyberpunkFont': BlackOpsOne_400Regular,
    'SpaceMono': SpaceMono_400Regular,
  });

  // Fonts are "settled" once they've either loaded or definitively failed —
  // without this, a font load failure would leave the splash screen up forever
  const fontsSettled = fontsLoaded || !!fontError;

  useEffect(() => {
    // 1. Kill the native "slide" immediately once fonts are settled
    if (fontsSettled) {
      SplashScreen.hideAsync();
    }

    // 2. Your custom 2.5s cinematic timer
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [fontsSettled]);

  // 3. Show your CustomSplash (Loading Screen) while the timer runs
  if (!fontsSettled || !appReady) {
    return <CustomSplash />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        <Stack.Screen name="workout" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}