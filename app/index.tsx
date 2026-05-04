import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

export default function TitleScreen() {
  const router = useRouter();

  const handleEnter = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* TOP SECTION: Clustered for that "Console Game" look */}
        <View style={styles.topSection}>
          <Text style={styles.appName}>GYM LEVELLING</Text>
          <Text style={styles.devCredit}>Developed By: Jason Dhaki</Text>
        </View>

        {/* CENTER SECTION: The Hero Asset */}
        <View style={styles.centerSection}>
          <Image 
            source={require('../assets/images/hero-splash.png')} 
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* BOTTOM SECTION: The Trigger */}
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={styles.enterButton} 
            activeOpacity={0.8} 
            onPress={handleEnter}
          >
            <Ionicons name="power" size={24} color="#09090b" style={styles.buttonIcon} />
            <Text style={styles.enterButtonText}>BOOT SYSTEM</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#09090b',
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 10, // Very tight gap to the dumbbell
  },
  appName: {
    color: '#10b981',
    fontSize: 41, // Large display size
    fontFamily: 'CyberpunkFont',
    textAlign: 'center',
    textShadowColor: 'rgba(16, 185, 129, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  devCredit: {
    color: '#71717a',
    fontSize: 12,
    fontFamily: 'SpaceMono', // This matches the name we gave it in _layout.tsx
    marginTop: 4,
    letterSpacing: 1,
    },
  centerSection: {
    width: '100%',
    height: 300, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '85%',
    height: '85%',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  bottomSection: {
    width: '100%',
    marginTop: 10, // Pull the button up close to the bottom of the dumbbell
  },
  enterButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    height: 65,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10, 
  },
  buttonIcon: {
    marginRight: 12,
  },
  enterButtonText: {
    color: '#09090b',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'CyberpunkFont', // Keep consistent branding on the button
    letterSpacing: 1,
  },
});