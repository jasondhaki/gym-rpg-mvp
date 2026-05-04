import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function CustomSplash() {
  return (
    <View style={styles.container}>
      {/* Your transparent dumbbell image goes here */}
      <Image 
        source={require('../../assets/images/hero-splash.png')} 
        style={styles.heroImage}
        resizeMode="contain"
      />
      
      {/* Natively rendered text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Gym Levelling</Text>
        <Text style={styles.credits}>Developed By: Jason Dhaki</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b', // This forces a flawless blend with your UI
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '60%',
    height: '40%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 80, 
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#10b981', 
    fontSize: 32,
    fontFamily: 'CyberpunkFont', 
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
    textShadowColor: 'rgba(16, 185, 129, 0.4)', 
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  credits: {
    color: '#71717a', // Subtle grey
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'monospace', // Built-in coding font
  }
});