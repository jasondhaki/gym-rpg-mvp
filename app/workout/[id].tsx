import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

import { QUESTS, EXERCISES } from '../../src/data/codex';
import { loadGame, saveGame } from '../../src/utils/storage';

export default function ActionChamberScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const quest = QUESTS.find((q) => q.id === id);
  if (!quest) return null;

  // Prioritize the high-fidelity Quest image, fallback to first exercise image
  const heroImage = quest.imagePath || EXERCISES.find(ex => ex.id === quest.requiredExercises[0])?.imagePath;

  const handleDonePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    const player = await loadGame();
    
    // --- THE CONSISTENCY MATH ---
    const todayDate = new Date();
    const offset = todayDate.getTimezoneOffset();
    const today = new Date(todayDate.getTime() - (offset*60*1000)).toISOString().split('T')[0];
    
    let newStreak = player.currentStreak || 0;

    if (player.lastWorkoutDate !== today) {
      const yesterdayDate = new Date(todayDate.getTime() - (offset*60*1000));
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayString = yesterdayDate.toISOString().split('T')[0];

      if (player.lastWorkoutDate === yesterdayString) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }

    const streakBonus = newStreak >= 3 ? 1.2 : 1.0;
    const baseQuestXp = 1000 * quest.xpMultiplier;
    const finalXpEarned = Math.floor(baseQuestXp * streakBonus);
    
    // --- LEVEL-UP ENGINE ---
    const getRequiredXp = (lvl: number) => Math.floor(500 * Math.pow(lvl, 1.5));
    
    let newLevel = player.level || 1;
    let newTotalXp = (player.totalXp || 0) + finalXpEarned;

    while (newTotalXp >= getRequiredXp(newLevel)) {
      newTotalXp -= getRequiredXp(newLevel);
      newLevel++;
    }

    // --- ATTRIBUTE PARSING ---
    let newStr = player.str || 10;
    let newEnd = player.end || 10;
    let newPushQuests = player.pushQuestsCompleted || 0;
    
    if (quest.attributeFocus === 'STR') {
      newStr += 5; 
      if (quest.id.includes('push')) newPushQuests += 1; 
    } else if (quest.attributeFocus === 'END') {
      newEnd += 5; 
    }

    const sessionVolume = 1200; 
    const newVolume = (player.lifetimeVolume || 0) + sessionVolume; 

    // --- ACHIEVEMENT ENGINE ---
    let newBadges = [...(player.unlockedBadges || [])];

    if (sessionVolume >= 1000 && !newBadges.includes('one_ton_club')) {
      newBadges.push('one_ton_club');
    }
    if (newPushQuests >= 10 && !newBadges.includes('iron_vanguard')) {
      newBadges.push('iron_vanguard');
    }
    if (newStreak >= 7 && !newBadges.includes('consistency_king')) {
      newBadges.push('consistency_king');
    }

    await saveGame({
      ...player,
      level: newLevel,
      totalXp: newTotalXp,
      currentStreak: newStreak,
      lastWorkoutDate: today,
      str: newStr,
      end: newEnd,
      lifetimeVolume: newVolume,
      pushQuestsCompleted: newPushQuests, 
      unlockedBadges: newBadges,          
    });
    
    setTimeout(() => {
      router.back();
    }, 300); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        
        {/* TOP NAV: Custom Xp Multiplier Badge */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <View style={[styles.xpBadge, { borderColor: quest.color, backgroundColor: quest.color + '20' }]}>
            <Text style={[styles.xpText, { color: quest.color }]}>{quest.xpMultiplier}x XP BOOST</Text>
          </View>
        </View>

        {/* HERO AREA: Edge-to-edge image masking */}
        <View style={styles.heroContainer}>
          <View style={[styles.imageContainer, { borderColor: '#27272a' }]}>
            {heroImage ? (
              <Image source={heroImage} style={styles.exerciseImage} resizeMode="cover" />
            ) : (
              <View style={styles.missingAsset}>
                <Ionicons name="barbell" size={80} color="#3f3f46" />
                <Text style={styles.missingAssetText}>ASSET MISSING</Text>
              </View>
            )}
          </View>
        </View>

        {/* DATA AREA: Quest Specs */}
        <View style={styles.dataContainer}>
          <Text style={styles.questTitle}>{quest.title}</Text>
          
          <View style={styles.targetMap}>
            <Ionicons name="body" size={20} color={quest.color} />
            <Text style={styles.targetMuscleText}>Target: {quest.targetMuscles.join(', ')}</Text>
          </View>

          <View style={[styles.objectiveBox, { borderLeftColor: quest.color }]}>
            <Text style={styles.objectiveLabel}>CURRENT OBJECTIVE</Text>
            <Text style={styles.objectiveValue}>{quest.description}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.doneButton, { backgroundColor: quest.color === '#ffffff' ? '#10b981' : quest.color }]} 
          activeOpacity={0.8} 
          onPress={handleDonePress}
        >
          <Text style={styles.doneButtonText}>CLAIM BOUNTY</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  navBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 20,
    zIndex: 10 
  },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#18181b', alignItems: 'center', justifyContent: 'center' },
  xpBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  xpText: { fontWeight: 'bold', fontSize: 14, fontFamily: 'SpaceMono' },
  
  heroContainer: { padding: 20, marginTop: 10 },
  // FIX: Removed padding: 20 here to allow image to touch edges of the gray box
  imageContainer: { 
    width: '100%', 
    aspectRatio: 1, 
    backgroundColor: '#18181b', 
    borderRadius: 32, 
    borderWidth: 1, 
    overflow: 'hidden' // CRITICAL: This masks the image to the rounded corners
  },
  exerciseImage: { 
    width: '100%', 
    height: '100%',
  },
  missingAsset: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  missingAssetText: { color: '#3f3f46', marginTop: 12, fontWeight: 'bold', letterSpacing: 1 },

  dataContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  questTitle: { color: 'white', fontSize: 36, fontWeight: 'bold', marginBottom: 12, fontFamily: 'CyberpunkFont' },
  targetMap: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  targetMuscleText: { color: '#a1a1aa', fontSize: 16, marginLeft: 8, fontWeight: 'bold' },
  objectiveBox: { backgroundColor: '#18181b', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderWidth: 1, borderColor: '#27272a' },
  objectiveLabel: { color: '#71717a', fontSize: 12, letterSpacing: 2, marginBottom: 8, fontFamily: 'SpaceMono' },
  objectiveValue: { color: 'white', fontSize: 16, fontWeight: '600', lineHeight: 24 },
  
  doneButton: { 
    marginHorizontal: 20, 
    marginBottom: 40, 
    paddingVertical: 20, 
    borderRadius: 16, 
    alignItems: 'center', 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 5 
  },
  doneButtonText: { color: '#09090b', fontSize: 20, fontWeight: 'bold', letterSpacing: 1, fontFamily: 'CyberpunkFont' },
});