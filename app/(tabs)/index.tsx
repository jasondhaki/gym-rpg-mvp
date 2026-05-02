import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';
import { Ionicons } from '@expo/vector-icons';

export default function HubScreen() {
  // Pull your stats from the global store
  const user = useWorkoutStore((state) => state.user);

  // Safety check in case the store hasn't loaded yet
  if (!user) return null;

  // Calculate the width of the progress bar dynamically
  const xpPercentage = Math.min((user.currentXP / user.xpToNextLevel) * 100, 100);

  return (
    <View style={styles.container}>
      
      {/* 1. Avatar & Identity Section */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={40} color="#10b981" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.rank}>{user.rank}</Text>
        </View>
      </View>

      {/* 2. The Progression Engine */}
      <View style={styles.statsCard}>
        <View style={styles.levelRow}>
          <Text style={styles.levelText}>Level {user.level}</Text>
          <Text style={styles.xpText}>{user.currentXP} / {user.xpToNextLevel} XP</Text>
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b', padding: 20, paddingTop: 60 },
  
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
  xpText: { color: '#a1a1aa', fontSize: 14, fontWeight: '500' },
  xpBarBackground: { height: 12, backgroundColor: '#27272a', borderRadius: 6, overflow: 'hidden' },
  xpBarFill: { height: '100%', backgroundColor: '#10b981', borderRadius: 6 }, // This width gets overwritten by the inline style above
  
  // Mission Styles
  missionCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#27272a', borderLeftWidth: 4, borderLeftColor: '#10b981' },
  missionTitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  missionName: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  missionStatus: { color: '#a1a1aa', fontSize: 14 }
});