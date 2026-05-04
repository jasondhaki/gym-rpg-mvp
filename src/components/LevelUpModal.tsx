import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LevelUpModalProps {
  isVisible: boolean;
  newLevel: number;
  onClose: () => void;
}

export default function LevelUpModal({ isVisible, newLevel, onClose }: LevelUpModalProps) {
  // 1. Animation Controllers
  const fadeAnim = useRef(new Animated.Value(0)).current; // For the text
  const scaleAnim = useRef(new Animated.Value(0.3)).current; // For the text (pop effect)
  const bgFadeAnim = useRef(new Animated.Value(0)).current; // For the dim background

  useEffect(() => {
    if (isVisible) {
      // Trigger the complex animation sequence when the modal opens
      Animated.parallel([
        Animated.timing(bgFadeAnim, {
          toValue: 0.9, // Almost pure black backdrop
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.sequence([
          // Slight delay to let the backdrop lock in
          Animated.delay(100), 
          // Parallel fade and scale (THE POP EFFECT)
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              easing: Easing.out(Easing.back(1.5)), // Gives it a slight spring bounce at the end
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start();
    } else {
      // Reset animations when closed
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.3);
      bgFadeAnim.setValue(0);
    }
  }, [isVisible, fadeAnim, scaleAnim, bgFadeAnim]);

  return (
    <Modal animationType="none" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        
        {/* Animated semi-transparent dark background */}
        <Animated.View style={[styles.modalBackdrop, { opacity: bgFadeAnim }]} />

        {/* Animated Celebration Content */}
        <Animated.View style={[
          styles.modalView,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}>
          
          <Ionicons name="flash" size={60} color="#10b981" style={styles.iconGlow} />
          
          <Text style={styles.levelUpTitle}>LEVEL UP!</Text>
          
          <Text style={styles.description}>You have breached the next threshold.</Text>
          
          <View style={styles.levelContainer}>
            <Text style={styles.newLevelText}>Level {newLevel}</Text>
          </View>

          <Text style={styles.statusEffect}>Permanent Stat Boost Applied: +1 STR</Text>

          {/* Accept Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>CONTINUE QUEST</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#09090b', // Base dark background
  },
  modalView: {
    margin: 20,
    backgroundColor: '#18181b', // Dark container
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981', // Neon green border
    // Android Shadow (optional, looks better with border glow)
    elevation: 20,
  },
  iconGlow: {
    marginBottom: 15,
    textShadowColor: 'rgba(16, 185, 129, 0.8)', // Extra neon neon glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  levelUpTitle: {
    color: '#10b981',
    fontFamily: 'CyberpunkFont', // Requires the Google Font loaded in previous steps
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(16, 185, 129, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  description: {
    color: '#a1a1aa',
    fontSize: 16,
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 20,
  },
  levelContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10b981',
    marginBottom: 15,
  },
  newLevelText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  statusEffect: {
    color: '#71717a',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 30,
  },
  button: {
    borderColor: '#10b981',
    borderWidth: 1,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#10b981',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});