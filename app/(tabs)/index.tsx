import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import our custom offline storage engine
import { saveGame, loadGame, PlayerData } from '../../src/utils/storage';
import ExerciseLogger from '../../src/components/ExerciseLogger';

export default function HubScreen() {
  // 1. The Offline State Engine (Replaces useWorkoutStore)
  const [player, setPlayer] = useState<PlayerData>({ level: 1, totalXp: 0, lifetimeVolume: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. Load the save file on boot
  useEffect(() => {
    const bootSaveFile = async () => {
      const savedData = await loadGame();
      setPlayer(savedData);
      setIsLoaded(true);
    };
    bootSaveFile();
  }, []);

  // 3. Save the game whenever stats change
  useEffect(() => {
    if (isLoaded) {
      saveGame(player);
    }
  }, [player, isLoaded]);

  // 4. The Leveling Math
  // Exponential curve: Base 500 XP * (Level ^ 1.5)
  const requiredXP = Math.floor(500 * Math.pow(player.level, 1.5));
  const xpPercentage = Math.min((player.totalXp / requiredXP) * 100, 100);

  // Show nothing while the hard drive is loading
  if (!isLoaded) return <View style={styles.loadingContainer} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* 1. Avatar & Identity Section */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color="#10b981" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.username}>Jason Dhaki</Text>
            {/* Dynamic Rank based on Level */}
            <Text style={styles.rank}>
              {player.level < 10 ? 'ROOKIE LIFTER' : 'IRON WARRIOR'}
            </Text>
          </View>
        </View>

        {/* 2. The Progression Engine */}
        <View style={styles.statsCard}>
          <View style={styles.levelRow}>
            <Text style={styles.levelText}>Level {player.level}</Text>
            <Text style={styles.xpText}>{player.totalXp} / {requiredXP} XP</Text>
          </View>
          
          {/* Dynamic XP Bar */}
          <View style={styles.xpBarBackground}>
            <View style={[styles.xpBarFill, { width: `${xpPercentage}%` }]} />
          </View>
        </View>

        {/* 3. Current Objective */}
        <View style={styles.missionCard}>
            <Text style={styles.missionTitle}>Current Objective</Text>
            <Text style={styles.missionName}>Push Day Alpha</Text>
            <Text style={styles.missionStatus}>In Progress — Head to the Active Chamber</Text>
        </View>

        {/* 4. The Active Workout Zone */}
        <View style={styles.loggerSection}>
            <ExerciseLogger />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#09090b' },
  loadingContainer: { flex: 1, backgroundColor: '#09090b' },
  container: { flex: 1, padding: 20, paddingTop: 40 },
  
  // Header Styles
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#18181b', borderWidth: 2, borderColor: '#10b981', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  headerText: { flex: 1 },
  username: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  rank: { color: '#10b981', fontSize: 16, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
  
  // Progression Styles
  statsCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: '#27272a' },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  levelText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  xpText: { color: '#a1a1aa', fontSize: 14, fontWeight: '500', fontFamily: 'monospace' },
  xpBarBackground: { height: 12, backgroundColor: '#27272a', borderRadius: 6, overflow: 'hidden' },
  xpBarFill: { height: '100%', backgroundColor: '#10b981', borderRadius: 6 }, 
  
  // Mission Styles
  missionCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 20, marginBottom: 30, borderWidth: 1, borderColor: '#27272a', borderLeftWidth: 4, borderLeftColor: '#10b981' },
  missionTitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  missionName: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  missionStatus: { color: '#a1a1aa', fontSize: 14 },

  // Logger Styles
  loggerSection: { marginBottom: 60 } // Adds padding at the bottom so you can scroll past the logger
});