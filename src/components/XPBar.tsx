import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface XPBarProps {
  currentXP: number;
  requiredXP: number;
  level: number;
}

export default function XPBar({ currentXP, requiredXP, level }: XPBarProps) {
  // 1. Set up the animation engine
  const animatedWidth = useRef(new Animated.Value(0)).current;

  // 2. Calculate the percentage (protect against dividing by 0)
  const fillPercentage = requiredXP > 0 ? (currentXP / requiredXP) * 100 : 0;
  // Cap it at 100% visually
  const clampedPercentage = Math.min(Math.max(fillPercentage, 0), 100);

  // 3. Trigger the fluid animation whenever currentXP changes
  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: clampedPercentage,
      duration: 800, // 0.8 seconds to slide to the new value
      useNativeDriver: false, // Must be false for width animations
    }).start();
  }, [clampedPercentage]);

  return (
    <View style={styles.container}>
      {/* Header: Level and Stats */}
      <View style={styles.header}>
        <Text style={styles.levelText}>LVL {level}</Text>
        <Text style={styles.xpText}>{Math.floor(currentXP)} / {Math.floor(requiredXP)} XP</Text>
      </View>

      {/* The Actual Progress Bar */}
      <View style={styles.track}>
        <Animated.View 
          style={[
            styles.fill, 
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              })
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: '#09090b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  levelText: {
    color: '#10b981', // Neon Green
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'CyberpunkFont', 
  },
  xpText: {
    color: '#71717a',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  track: {
    height: 12,
    backgroundColor: '#27272a', // Dark grey background track
    borderRadius: 6,
    overflow: 'hidden', // Keeps the glowing bar inside the pill shape
  },
  fill: {
    height: '100%',
    backgroundColor: '#10b981', // Neon Green fill
    borderRadius: 6,
  }
});