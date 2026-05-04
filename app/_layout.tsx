import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useState, useEffect } from 'react';

// 1. Import the Font Loader
import { useFonts } from 'expo-font';
import { BlackOpsOne_400Regular } from '@expo-google-fonts/black-ops-one';

import { useColorScheme } from '@/hooks/use-color-scheme';
import CustomSplash from '../src/components/CustomSplash'; 

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);

  // 2. Load the font
  const [fontsLoaded] = useFonts({
    'CyberpunkFont': BlackOpsOne_400Regular, 
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // 3. Wait for BOTH the font to load AND the timer to finish
  if (!fontsLoaded || !appReady) {
    return <CustomSplash />;
  }

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