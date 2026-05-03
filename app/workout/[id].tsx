import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
// import LottieView from 'lottie-react-native';

export default function ActionChamberScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // 1. Pull BOTH the deck and the action trigger from the V2 Brain
  const activeDeck = useWorkoutStore((state: any) => state.activeDeck);
  const completeQuest = useWorkoutStore((state: any) => state.completeQuest);
  
  const quest = activeDeck.find((q: any) => q.id === id);

  if (!quest) return null;

  const handleDonePress = async () => {
    // 1. Fire the haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    // 2. Trigger the V2 Engine (Awards XP, Kills Card, Draws New Card)
    completeQuest(id as string);
    
    // 3. Brief timeout for "game feel" before snapping back
    setTimeout(() => {
      router.back();
    }, 300); 
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

      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <View style={styles.imageContainer}>
          {quest.image ? (
            /* If the image exists in dummyData, render it */
            <Image 
              source={quest.image} 
              style={styles.exerciseImage}
              resizeMode="cover"
            />
          ) : (
            /* If there is no image, render a fallback UI */
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name={quest.icon || 'barbell'} size={80} color="#3f3f46" />
              <Text style={{ color: '#3f3f46', marginTop: 12, fontWeight: 'bold', letterSpacing: 1 }}>ASSET MISSING</Text>
            </View>
          )}
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
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#18181b', alignItems: 'center', justifyContent: 'center' },
  xpBadge: { backgroundColor: '#064e3b', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  xpText: { color: '#10b981', fontWeight: 'bold', fontSize: 16 },
  heroContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  animationPlaceholder: { width: '100%', aspectRatio: 1, backgroundColor: '#18181b', borderRadius: 24, borderWidth: 1, borderColor: '#27272a', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' },
  placeholderText: { color: '#3f3f46', marginTop: 16, letterSpacing: 2, fontWeight: 'bold' },
  dataContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  questTitle: { color: 'white', fontSize: 36, fontWeight: 'bold', marginBottom: 12 },
  targetMap: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  targetMuscleText: { color: '#a1a1aa', fontSize: 18, marginLeft: 8 },
  objectiveBox: { backgroundColor: '#18181b', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#10b981' },
  objectiveLabel: { color: '#71717a', fontSize: 12, letterSpacing: 2, marginBottom: 8 },
  objectiveValue: { color: 'white', fontSize: 20, fontWeight: '600' },
  doneButton: { backgroundColor: '#10b981', marginHorizontal: 20, marginBottom: 40, paddingVertical: 20, borderRadius: 16, alignItems: 'center', shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  doneButtonText: { color: '#09090b', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 },
  imageContainer: { width: '100%', aspectRatio: 1, backgroundColor: '#18181b', borderRadius: 24, borderWidth: 1, borderColor: '#27272a', overflow: 'hidden' },
  exerciseImage: { width: '100%', height: '100%',opacity: 0.85 },
});