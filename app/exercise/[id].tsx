import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { QUESTS, EXERCISES } from '../../src/data/codex';
import { loadGame, saveGame } from '../../src/utils/storage';

export default function ExerciseDetailScreen() {
  const { id, questId } = useLocalSearchParams();
  const router = useRouter();

  const exerciseId = Array.isArray(id) ? id[0] : id;
  const exercise = EXERCISES.find(ex => ex.id === exerciseId);
  const quest = QUESTS.find(q => q.id === questId);
  const GOAL = 5; 

  const handleSyncProgress = async () => {
    // 1. Tactical Haptic Confirmation
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (!quest) {
      router.back();
      return;
    }

    const player = await loadGame();
    const today = new Date().toISOString().split('T')[0];
    const currentQuestId = Array.isArray(questId) ? questId[0] : (questId || "unknown_quest");

    // --- 2. THE REWARD GATE: CHECK ELIGIBILITY FIRST ---
    // We check the CLEAN player object from storage to see the count before this sync
    const previousCount = (player.lastWorkoutDate === today && player.completedToday?.[currentQuestId])
      ? player.completedToday[currentQuestId].length
      : 0;

    const isEligibleForRewards = previousCount < GOAL;

    // --- 3. UPDATE SESSION TRACKING (Always happens) ---
    // Create a shallow copy to prevent pass-by-reference logic bugs
    let questMap = player.lastWorkoutDate === today ? { ...player.completedToday } : {};
    
    if (!questMap[currentQuestId]) {
      questMap[currentQuestId] = [];
    }
    
    if (!questMap[currentQuestId].includes(exerciseId)) {
      questMap[currentQuestId].push(exerciseId);
    }

    // Initialize state with current values
    let newLevel = player.level || 1;
    let newTotalXp = player.totalXp || 0;
    let newStr = player.str || 10;
    let newEnd = player.end || 10;
    let newStreak = player.currentStreak || 0;

    // --- 4. CONDITIONAL REWARD LOGIC ---
    if (isEligibleForRewards) {
      // MICRO-BOUNTY MATH (10% of total quest bounty)
      const baseUnitXp = (1000 * quest.xpMultiplier) / 10;
      
      // Streak Calculation
      if (player.lastWorkoutDate !== today) {
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterdayString = yesterdayDate.toISOString().split('T')[0];
        
        // Increment streak if yesterday was worked, otherwise reset to 1
        newStreak = (player.lastWorkoutDate === yesterdayString) ? (player.currentStreak || 0) + 1 : 1;
      }

      const streakBonus = newStreak >= 3 ? 1.2 : 1.0;
      const finalXpEarned = Math.floor(baseUnitXp * streakBonus);
      
      // XP & LEVEL ENGINE
      newTotalXp += finalXpEarned;
      const getRequiredXp = (lvl: number) => Math.floor(500 * Math.pow(lvl, 1.5));

      while (newTotalXp >= getRequiredXp(newLevel)) {
        newTotalXp -= getRequiredXp(newLevel);
        newLevel++;
      }

      // ATTRIBUTE GROWTH
      if (quest.attributeFocus === 'STR') {
        newStr += 0.5; 
      } else if (quest.attributeFocus === 'END') {
        newEnd += 0.5; 
      }
    }

    // --- 5. PERSIST TO STORAGE ---
    await saveGame({
      ...player,
      level: newLevel,
      totalXp: newTotalXp,
      currentStreak: newStreak,
      lastWorkoutDate: today,
      completedToday: questMap, // Always save the updated map
      str: Number(newStr.toFixed(1)), 
      end: Number(newEnd.toFixed(1)),
    });
    
    router.back();
  };

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>INTEL CORRUPTED: Exercise Not Found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="chevron-down" size={32} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>EXERCISE INTEL</Text>
          <Text style={styles.headerSubtitle}>PARENT_QUEST: {quest?.title.toUpperCase() || 'UNKNOWN'}</Text>
        </View>
        <View style={{ width: 44 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageBox}>
          <Image source={exercise.imagePath} style={styles.image} resizeMode="contain" />
          <View style={[styles.cornerTopLeft, { borderColor: quest?.color || '#10b981' }]} />
          <View style={[styles.cornerBottomRight, { borderColor: quest?.color || '#10b981' }]} />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.title}>{exercise.name}</Text>
          
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{exercise.muscleGroup.toUpperCase()}</Text>
            </View>
            <View style={[styles.tag, { borderColor: quest?.color || '#10b981' }]}>
              <Text style={[styles.tagText, { color: quest?.color || '#10b981' }]}>
                {exercise.subTarget?.toUpperCase() || 'GENERAL'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionHeaderRow}>
            <Ionicons name="construct-outline" size={18} color={quest?.color || '#10b981'} />
            <Text style={[styles.sectionLabel, { color: quest?.color || '#10b981' }]}>EXECUTION PROTOCOL</Text>
          </View>

          {exercise.instructions && exercise.instructions.length > 0 ? (
            exercise.instructions.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={[styles.stepNumberCircle, { backgroundColor: (quest?.color || '#10b981') + '40' }]}>
                  <Text style={[styles.stepNumber, { color: quest?.color || '#10b981' }]}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.missingInfoText}>No instructions found in Codex.</Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.doneButton, { backgroundColor: quest?.color === '#ffffff' ? '#ffffff' : (quest?.color || '#10b981') }]} 
        onPress={handleSyncProgress}
        activeOpacity={0.8}
      >
        <Text style={styles.doneButtonText}>SYNC & DISMISS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10 },
  headerTitle: { color: '#71717a', fontSize: 10, letterSpacing: 4, fontFamily: 'SpaceMono', textAlign: 'center' },
  headerSubtitle: { color: '#3f3f46', fontSize: 8, letterSpacing: 1, fontFamily: 'SpaceMono', textAlign: 'center' },
  closeButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingBottom: 120 },
  imageBox: { width: '90%', aspectRatio: 1, alignSelf: 'center', backgroundColor: '#111113', borderRadius: 24, padding: 30, marginVertical: 20, borderWidth: 1, borderColor: '#18181b', position: 'relative' },
  image: { width: '100%', height: '100%' },
  cornerTopLeft: { position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 24 },
  cornerBottomRight: { position: 'absolute', bottom: -1, right: -1, width: 20, height: 20, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 24 },
  infoSection: { paddingHorizontal: 25 },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold', fontFamily: 'CyberpunkFont', marginBottom: 15 },
  tagRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#27272a', backgroundColor: '#18181b' },
  tagText: { color: '#a1a1aa', fontSize: 10, fontWeight: 'bold', fontFamily: 'SpaceMono' },
  divider: { height: 1, backgroundColor: '#18181b', marginBottom: 25 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 8 },
  sectionLabel: { fontSize: 12, letterSpacing: 2, fontWeight: 'bold', fontFamily: 'SpaceMono' },
  stepRow: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-start' },
  stepNumberCircle: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 15, marginTop: 2 },
  stepNumber: { fontSize: 12, fontWeight: 'bold', fontFamily: 'SpaceMono' },
  stepText: { color: '#a1a1aa', fontSize: 15, lineHeight: 22, flex: 1 },
  missingInfoText: { color: '#3f3f46', fontStyle: 'italic', fontFamily: 'SpaceMono' },
  doneButton: { position: 'absolute', bottom: 30, left: 25, right: 25, paddingVertical: 20, borderRadius: 16, alignItems: 'center', elevation: 5 },
  doneButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold', letterSpacing: 2, fontFamily: 'CyberpunkFont' }
});