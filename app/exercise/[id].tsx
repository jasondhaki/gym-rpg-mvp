import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Data & Storage Imports
import { QUESTS, EXERCISES, BADGES } from '../../src/data/codex';
import { loadGame, saveGame, PlayerData } from '../../src/utils/storage';

export default function ExerciseDetailScreen() {
  const { id, questId } = useLocalSearchParams();
  const router = useRouter();

  const exerciseId = Array.isArray(id) ? id[0] : id;
  const exercise = EXERCISES.find(ex => ex.id === exerciseId);
  const quest = QUESTS.find(q => q.id === questId);
  
  const MAX_SETS = 3;
  const GOAL = 5; 

  // --- STATE ---
  const [setsCompleted, setSetsCompleted] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); 
  const setProgressBar = useRef(new Animated.Value(0)).current;

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerGlow = useRef(new Animated.Value(0)).current;

  // 1. RECOVERY ENGINE: Load mid-workout progress from AsyncStorage on mount
  useEffect(() => {
    const recoverSession = async () => {
      const player = await loadGame();
      // Access the scratchpad to see if sets were already done for this exercise
      const savedSets = player.activeSession?.[exerciseId as string] || 0;
      
      setSetsCompleted(savedSets);
      setProgressBar.setValue(savedSets / MAX_SETS); // Instant placement on load
      setIsLoaded(true);
    };
    recoverSession();
  }, [exerciseId]);

  // 2. PERSISTENCE OBSERVER: Animate bar and save mid-workout count to disk
  useEffect(() => {
    if (!isLoaded) return;

    Animated.timing(setProgressBar, {
      toValue: setsCompleted / MAX_SETS,
      duration: 400,
      useNativeDriver: false,
    }).start();

    const persistMidWorkout = async () => {
      const player = await loadGame();
      const updatedActiveSession = { 
        ...player.activeSession, 
        [exerciseId as string]: setsCompleted 
      };
      await saveGame({ ...player, activeSession: updatedActiveSession });
    };
    persistMidWorkout();
  }, [setsCompleted, isLoaded]);

  // 3. TIMER ENGINE
  useEffect(() => {
    let interval: any; // Fix for NodeJS.Timeout conflict
    if (isTimerActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => (prev !== null ? prev - 1 : null));
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTimerActive, timeLeft]);

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setIsTimerActive(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(timerGlow, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(timerGlow, { toValue: 0, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  };

  const handleTimerComplete = async () => {
    setIsTimerActive(false);
    setTimeLeft(null);
    timerGlow.setValue(0);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const handleCompleteSet = () => {
    if (setsCompleted < MAX_SETS) {
      const nextSet = setsCompleted + 1;
      setSetsCompleted(nextSet);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (nextSet < MAX_SETS) startTimer(60); 
    }
  };

  const handleSyncProgress = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (!quest) { router.back(); return; }

    const player = await loadGame();
    // Dhaka Local Time Standardization
    const today = new Date().toLocaleDateString('en-CA'); 
    const currentQuestId = Array.isArray(questId) ? questId[0] : questId;

    const previousCount = (player.lastWorkoutDate === today && player.completedToday?.[currentQuestId as string])
      ? player.completedToday[currentQuestId as string].length : 0;
    const isEligibleForRewards = previousCount < GOAL;

    let questMap = { ...player.completedToday };
    if (!questMap[currentQuestId as string]) questMap[currentQuestId as string] = [];
    if (!questMap[currentQuestId as string].includes(exerciseId as string)) {
      questMap[currentQuestId as string].push(exerciseId as string);
    }

    let newLevel = player.level || 1;
    let newTotalXp = player.totalXp || 0;
    let newStr = player.str || 10;
    let newEnd = player.end || 10;
    let newStreak = player.currentStreak || 0;
    let newLifetimeVolume = player.lifetimeVolume || 0;

    if (isEligibleForRewards) {
      const baseUnitXp = (1000 * quest.xpMultiplier) / 10;
      if (player.lastWorkoutDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toLocaleDateString('en-CA');
        newStreak = (player.lastWorkoutDate === yesterdayStr) ? (player.currentStreak || 0) + 1 : 1;
      }
      newTotalXp += Math.floor(baseUnitXp * (newStreak >= 3 ? 1.2 : 1.0));
      const getRequiredXp = (lvl: number) => Math.floor(500 * Math.pow(lvl, 1.5));
      while (newTotalXp >= getRequiredXp(newLevel)) {
        newTotalXp -= getRequiredXp(newLevel);
        newLevel++;
      }
      newLifetimeVolume += 50;
      if (quest.attributeFocus === 'STR') newStr += 0.5; 
      else if (quest.attributeFocus === 'END') newEnd += 0.5; 
    }

    // --- CLEANUP: Purge this exercise from Active Sessions once synced ---
    const updatedActiveSession = { ...player.activeSession };
    delete updatedActiveSession[exerciseId as string];

    const potentialState = {
      ...player,
      level: newLevel,
      totalXp: newTotalXp,
      currentStreak: newStreak,
      lifetimeVolume: newLifetimeVolume,
      str: Number(newStr.toFixed(1)),
      end: Number(newEnd.toFixed(1)),
      activeSession: updatedActiveSession,
    };

    // Corrected Badge comparison logic (Array length vs Numeric)
    const newlyUnlockedBadges: string[] = [];
    const currentUnlocked = player.unlockedBadges || [];
    BADGES.forEach((badge) => {
      if (!currentUnlocked.includes(badge.id)) {
        const val = potentialState[badge.requirement.field as keyof typeof potentialState];
        const compareValue = Array.isArray(val) ? val.length : (val as number);
        if (compareValue >= badge.requirement.value) newlyUnlockedBadges.push(badge.id);
      }
    });

    if (newlyUnlockedBadges.length > 0) await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    await saveGame({
      ...potentialState,
      lastWorkoutDate: today,
      completedToday: questMap,
      unlockedBadges: [...currentUnlocked, ...newlyUnlockedBadges],
    });
    
    router.back();
  };

  if (!exercise || !isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>SYNCHRONIZING...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isFinalStep = setsCompleted === MAX_SETS;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-down" size={32} color="white" /></TouchableOpacity>
        <View><Text style={styles.headerTitle}>EXERCISE INTEL</Text><Text style={styles.headerSubtitle}>{quest?.title.toUpperCase()}</Text></View>
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
          
          <View style={styles.setTrackerContainer}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="layers-outline" size={14} color="#71717a" />
              <Text style={[styles.sectionLabel, { color: '#71717a' }]}>SET PROGRESS</Text>
              <Text style={styles.setCountText}>{setsCompleted} / {MAX_SETS}</Text>
            </View>
            <View style={styles.progressBarTrack}>
              <Animated.View style={[
                styles.progressBarFill, 
                { width: setProgressBar.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }), backgroundColor: quest?.color || '#10b981' }
              ]} />
            </View>
          </View>

          <View style={styles.timerSection}>
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="hourglass-outline" size={16} color="#71717a" />
              <Text style={[styles.sectionLabel, { color: '#71717a' }]}>REST TIMERS</Text>
            </View>
            {timeLeft !== null ? (
              <Animated.View style={[styles.activeTimerBox, { opacity: timerGlow.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }]}>
                <Text style={styles.timerCountdown}>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Text>
                <TouchableOpacity onPress={() => setTimeLeft(null)} style={styles.abortButton}><Text style={styles.abortText}>ABORT</Text></TouchableOpacity>
              </Animated.View>
            ) : (
              <View style={styles.timerOptions}>
                {[60, 90, 120].map((sec) => (
                  <TouchableOpacity key={sec} style={styles.timerBtn} onPress={() => startTimer(sec)}>
                    <Text style={styles.timerBtnText}>{sec}S</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.divider} />
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="construct-outline" size={18} color={quest?.color || '#10b981'} />
            <Text style={[styles.sectionLabel, { color: quest?.color || '#10b981' }]}>EXECUTION PROTOCOL</Text>
          </View>

          {exercise.instructions.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={[styles.stepNumberCircle, { backgroundColor: (quest?.color || '#10b981') + '40' }]}><Text style={[styles.stepNumber, { color: quest?.color || '#10b981' }]}>{index + 1}</Text></View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[
          styles.doneButton, 
          { backgroundColor: isFinalStep ? (quest?.color === '#ffffff' ? '#ffffff' : (quest?.color || '#10b981')) : '#18181b' },
          !isFinalStep && { borderWidth: 1, borderColor: quest?.color || '#10b981' }
        ]} 
        onPress={isFinalStep ? handleSyncProgress : handleCompleteSet}
      >
        <Text style={[styles.doneButtonText, !isFinalStep && { color: quest?.color || '#10b981' }]}>
          {isFinalStep ? 'SYNC & DISMISS' : `COMPLETE SET ${setsCompleted + 1}`}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#71717a', fontSize: 10, letterSpacing: 4, fontFamily: 'monospace' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10 },
  headerTitle: { color: '#71717a', fontSize: 10, letterSpacing: 4, fontFamily: 'monospace', textAlign: 'center' },
  headerSubtitle: { color: '#3f3f46', fontSize: 8, letterSpacing: 1, fontFamily: 'monospace', textAlign: 'center' },
  scrollContent: { paddingBottom: 150 },
  imageBox: { width: '90%', aspectRatio: 1, alignSelf: 'center', backgroundColor: '#111113', borderRadius: 24, padding: 30, marginVertical: 20, borderWidth: 1, borderColor: '#18181b' },
  image: { width: '100%', height: '100%' },
  cornerTopLeft: { position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 24 },
  cornerBottomRight: { position: 'absolute', bottom: -1, right: -1, width: 20, height: 20, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 24 },
  infoSection: { paddingHorizontal: 25 },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold', fontFamily: 'CyberpunkFont', marginBottom: 15 },
  setTrackerContainer: { marginBottom: 25 },
  setCountText: { color: 'white', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace', marginLeft: 'auto' },
  progressBarTrack: { height: 8, backgroundColor: '#18181b', borderRadius: 4, marginTop: 10, borderWidth: 1, borderColor: '#27272a', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  timerSection: { marginBottom: 25, backgroundColor: '#111113', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#18181b' },
  timerOptions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  timerBtn: { flex: 1, paddingVertical: 10, backgroundColor: '#18181b', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#27272a' },
  timerBtnText: { color: '#71717a', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace' },
  activeTimerBox: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 },
  timerCountdown: { color: '#fbbf24', fontSize: 32, fontWeight: 'bold', fontFamily: 'monospace' },
  abortButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, borderWidth: 1, borderColor: '#ef4444' },
  abortText: { color: '#ef4444', fontSize: 10, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#18181b', marginBottom: 25 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 8 },
  sectionLabel: { fontSize: 11, letterSpacing: 2, fontWeight: 'bold', fontFamily: 'monospace' },
  stepRow: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-start' },
  stepNumberCircle: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  stepNumber: { fontSize: 11, fontWeight: 'bold' },
  stepText: { color: '#a1a1aa', fontSize: 14, lineHeight: 20, flex: 1 },
  doneButton: { position: 'absolute', bottom: 30, left: 25, right: 25, paddingVertical: 20, borderRadius: 16, alignItems: 'center', elevation: 5 },
  doneButtonText: { fontSize: 16, fontWeight: 'bold', letterSpacing: 2, fontFamily: 'CyberpunkFont' }
});