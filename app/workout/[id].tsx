import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

import { QUESTS, EXERCISES, Exercise } from '../../src/data/codex';
import { loadGame, PlayerData } from '../../src/utils/storage';

export default function ActionChamberScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const quest = QUESTS.find((q) => q.id === id);
  const [activeExercises, setActiveExercises] = useState<Exercise[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [syncedIds, setSyncedIds] = useState<string[]>([]);
  const GOAL = 5; 

  // --- 1. SESSION SYNC ENGINE (LOCAL TIME ADJUSTED) ---
  useFocusEffect(
    useCallback(() => {
      const syncSession = async () => {
        const player = await loadGame();
        
        // FIXED: Using Local Time format to match storage.ts reset logic
        const today = new Date().toLocaleDateString('en-CA'); 
        const currentQuestId = Array.isArray(id) ? id[0] : id;
        
        if (!currentQuestId) return;

        // Ensure we are looking at today's specific logs
        const questMap = player.lastWorkoutDate === today ? (player.completedToday || {}) : {};
        const thisQuestCompleted = questMap[currentQuestId] || [];

        setCompletedCount(thisQuestCompleted.length);
        setSyncedIds(thisQuestCompleted);
      };

      syncSession();
    }, [id])
  );

  // --- 2. INITIAL RANDOMIZER & DYNAMIC FILTERING ---
  useEffect(() => {
    if (quest && activeExercises.length === 0) {
      const pool = EXERCISES.filter(ex => quest.targetMuscles.includes(ex.muscleGroup as any));
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      setActiveExercises(shuffled.slice(0, 10));
    }
  }, [id, quest]);

  // Derived state: Filter out exercises that are already synced for today
  const availableOps = activeExercises.filter(ex => !syncedIds.includes(ex.id));

  const rerollExercise = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const pool = EXERCISES.filter(ex => 
      quest?.targetMuscles.includes(ex.muscleGroup as any) && 
      !activeExercises.find(active => active.id === ex.id) &&
      !syncedIds.includes(ex.id)
    );
    if (pool.length > 0) {
      const newExercise = pool[Math.floor(Math.random() * pool.length)];
      const updatedList = [...activeExercises];
      updatedList[index] = newExercise;
      setActiveExercises(updatedList);
    }
  };

  if (!quest) return null;

  const progressWidth = Math.min((completedCount / GOAL) * 100, 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* NAV BAR */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <View style={[styles.xpBadge, { borderColor: quest.color, backgroundColor: quest.color + '20' }]}>
            <Text style={[styles.xpText, { color: quest.color }]}>{quest.xpMultiplier}x XP BOOST</Text>
          </View>
        </View>

        {/* HERO IMAGE */}
        <View style={styles.heroContainer}>
          <View style={[styles.imageContainer, { borderColor: '#27272a' }]}>
            <Image source={quest.imagePath} style={styles.exerciseImage} resizeMode="cover" />
          </View>
        </View>

        {/* QUEST DATA & PROGRESS */}
        <View style={styles.dataContainer}>
          <Text style={styles.questTitle}>{quest.title}</Text>
          
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>CATEGORY OBJECTIVE</Text>
            <Text style={styles.progressValue}>{Math.min(completedCount, GOAL)} / {GOAL}</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressWidth}%`, backgroundColor: quest.color }]} />
          </View>

          {completedCount >= GOAL && (
            <View style={[styles.successBadge, { borderColor: quest.color }]}>
              <Ionicons name="checkmark-done" size={16} color={quest.color} />
              <Text style={[styles.successText, { color: quest.color }]}>QUEST OBJECTIVE COMPLETE</Text>
            </View>
          )}

          <View style={[styles.objectiveBox, { borderLeftColor: quest.color, marginTop: 15 }]}>
            <Text style={styles.objectiveLabel}>CURRENT MISSION</Text>
            <Text style={styles.objectiveValue}>{quest.description}</Text>
          </View>

          <Text style={styles.listHeader}>AVAILABLE OPERATIONS</Text>
          
          {availableOps.length > 0 ? (
            availableOps.map((ex, index) => (
              <View key={`${ex.id}-${index}`} style={styles.exerciseRow}>
                <TouchableOpacity 
                  style={styles.exerciseInfo} 
                  onPress={() => router.push({ 
                    pathname: "/exercise/[id]", 
                    params: { id: ex.id, questId: quest.id } 
                  })}
                  activeOpacity={0.6}
                >
                  <Text style={styles.exerciseNumber}>{index + 1}</Text>
                  <View>
                    <Text style={styles.exerciseName}>{ex.name}</Text>
                    <Text style={[styles.exerciseTag, { color: quest.color }]}>{ex.muscleGroup.toUpperCase()}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => rerollExercise(index)} style={styles.rerollButton}>
                  <Ionicons name="refresh" size={20} color="#71717a" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="flash" size={50} color="#3f3f46" />
              <Text style={styles.emptyStateText}>ALL CODEX ENTRIES EXHAUSTED</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#18181b', alignItems: 'center', justifyContent: 'center' },
  xpBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  xpText: { fontWeight: 'bold', fontSize: 14, fontFamily: 'monospace' },
  heroContainer: { padding: 20, marginTop: 10 },
  imageContainer: { width: '100%', aspectRatio: 1, backgroundColor: '#18181b', borderRadius: 32, borderWidth: 1, overflow: 'hidden' },
  exerciseImage: { width: '100%', height: '100%' },
  dataContainer: { paddingHorizontal: 20 },
  questTitle: { color: 'white', fontSize: 36, fontWeight: 'bold', marginBottom: 20, fontFamily: 'CyberpunkFont' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
  progressLabel: { color: '#71717a', fontSize: 10, letterSpacing: 2, fontFamily: 'monospace' },
  progressValue: { color: 'white', fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace' },
  progressBarBg: { height: 6, backgroundColor: '#18181b', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },
  successBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111113', padding: 12, borderRadius: 12, borderWidth: 1, marginTop: 15, gap: 8 },
  successText: { fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: 1 },
  objectiveBox: { backgroundColor: '#18181b', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderWidth: 1, borderColor: '#27272a', marginBottom: 30 },
  objectiveLabel: { color: '#71717a', fontSize: 12, letterSpacing: 2, marginBottom: 8, fontFamily: 'monospace' },
  objectiveValue: { color: 'white', fontSize: 16, fontWeight: '600', lineHeight: 24 },
  listHeader: { color: '#3f3f46', fontSize: 12, letterSpacing: 3, marginBottom: 15, fontWeight: 'bold', fontFamily: 'monospace' },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#111113', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#18181b' },
  exerciseInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  exerciseNumber: { color: '#3f3f46', fontSize: 18, fontWeight: 'bold', marginRight: 15, width: 25 },
  exerciseName: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  exerciseTag: { fontSize: 10, fontWeight: 'bold', marginTop: 2, fontFamily: 'monospace' },
  rerollButton: { padding: 8, backgroundColor: '#18181b', borderRadius: 8, marginLeft: 10 },
  emptyState: { alignItems: 'center', marginTop: 40, paddingBottom: 40 },
  emptyStateText: { color: '#71717a', marginTop: 15, fontFamily: 'monospace', letterSpacing: 2, fontSize: 10 }
});