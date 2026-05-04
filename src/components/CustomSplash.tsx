import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

export default function CustomSplash() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/hero-splash.png')} 
        style={styles.heroImage}
        resizeMode="contain"
      />
      {/* If your image already has the text baked in, you can delete this Text block. 
          If you want to render crisp, high-res text via code, use this! */}
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
    backgroundColor: '#09090b', // Must exactly match the app background
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '80%',
    height: '60%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  title: {
    color: '#10b981', // Neon Green
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  credits: {
    color: '#71717a',
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'monospace', // Gives it that raw tech/coding vibe
  }
});