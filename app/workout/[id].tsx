import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
// import LottieView from 'lottie-react-native'; // Uncomment when you have the animations!

export default function ActionChamberScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Pull the active deck to find the specific quest we tapped
  const activeDeck = useWorkoutStore((state) => state.activeDeck);
  
  // Added ': any' to satisfy TypeScript's strict mode
  const quest = activeDeck.find((q: any) => q.id === id);

  // Safety fallback if the quest isn't found
  if (!quest) return null;

  const handleDonePress = async () => {
    // 1. Fire the haptic engine
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    // 2. We will add the actual XP math here in Phase 10.5
    
    // 3. Retreat to board for now
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{quest.xp} XP</Text>
        </View>
      </View>

      {/* Hero Section (Where Lottie will go) */}
      <View style={styles.heroContainer}>
        {/* Placeholder for Lottie Animation */}
        <View style={styles.animationPlaceholder}>
          <Ionicons name={quest.icon || 'barbell'} size={80} color="#3f3f46" />
          <Text style={styles.placeholderText}>ANIMATION RENDER ZONE</Text>
        </View>
      </View>

      {/* Data Section */}
      <View style={styles.dataContainer}>
        <Text style={styles.questTitle}>{quest.name}</Text>
        
        <View style={styles.targetMap}>
          <Ionicons name="body" size={20} color="#10b981" />
          <Text style={styles.targetMuscleText}>Target: {quest.targetMuscle}</Text>
        </View>

        <View style={styles.objectiveBox}>
          <Text style={styles.objectiveLabel}>CURRENT OBJECTIVE</Text>
          <Text style={styles.objectiveValue}>{quest.target}</Text>
        </View>
      </View>

      {/* The Trigger */}
      <TouchableOpacity 
        style={styles.doneButton} 
        activeOpacity={0.8} 
        onPress={handleDonePress}
      >
        <Text style={styles.doneButtonText}>CLAIM BOUNTY</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b', justifyContent: 'space-between' },
  
  // Navigation
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#18181b', alignItems: 'center', justifyContent: 'center' },
  xpBadge: { backgroundColor: '#064e3b', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  xpText: { color: '#10b981', fontWeight: 'bold', fontSize: 16 },

  // Hero / Animation
  heroContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  animationPlaceholder: { width: '100%', aspectRatio: 1, backgroundColor: '#18181b', borderRadius: 24, borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' },
  placeholderText: { color: '#3f3f46', marginTop: 16, letterSpacing: 2, fontWeight: 'bold' },

  // Data
  dataContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  questTitle: { color: 'white', fontSize: 36, fontWeight: 'bold', marginBottom: 12 },
  targetMap: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  targetMuscleText: { color: '#a1a1aa', fontSize: 18, marginLeft: 8 },
  objectiveBox: { backgroundColor: '#18181b', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#10b981' },
  objectiveLabel: { color: '#71717a', fontSize: 12, letterSpacing: 2, marginBottom: 8 },
  objectiveValue: { color: 'white', fontSize: 20, fontWeight: '600' },

  // Trigger
  doneButton: { backgroundColor: '#10b981', marginHorizontal: 20, marginBottom: 40, paddingVertical: 20, borderRadius: 16, alignItems: 'center', shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  doneButtonText: { color: '#09090b', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 }
});