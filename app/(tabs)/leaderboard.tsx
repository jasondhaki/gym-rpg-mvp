import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';
import { Ionicons } from '@expo/vector-icons';

export default function RankingsScreen() {
  // 1. Pull your live data from the Zustand/AsyncStorage brain
  const user = useWorkoutStore((state) => state.user);

  if (!user) return null;

  // 2. Generate the server rivals
  const rivals = [
    { username: "Titan", level: 8, currentXP: 3200 },
    { username: "Valkyrie", level: 6, currentXP: 2100 },
    { username: "IronGrip", level: 4, currentXP: 1200 },
    { username: "Shadow", level: 2, currentXP: 450 }
  ];

  // 3. Combine you with the rivals, then sort by Level (descending), then XP (descending)
  const leaderboard = [...rivals, user].sort((a, b) => {
    if (b.level !== a.level) return b.level - a.level;
    return b.currentXP - a.currentXP;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>SERVER LEADERBOARD</Text>
        <Text style={styles.title}>Global Ranks</Text>
      </View>

      <View style={styles.boardCard}>
        {leaderboard.map((player, index) => {
          // Check if this row is YOU
          const isMe = player.username === user.username;
          
          return (
            <View key={index} style={[styles.playerRow, isMe && styles.myPlayerRow]}>
              <Text style={[styles.rankNumber, isMe && styles.myTextBlack]}>#{index + 1}</Text>
              
              <View style={[styles.avatar, isMe && styles.myAvatar]}>
                <Ionicons name="person" size={20} color={isMe ? "#09090b" : "#10b981"} />
              </View>
              
              <View style={styles.playerInfo}>
                <Text style={[styles.playerName, isMe && styles.myTextBlack]}>{player.username}</Text>
                <Text style={[styles.playerLevel, isMe && styles.myLevelDark]}>Level {player.level}</Text>
              </View>
              
              <Text style={[styles.playerXp, isMe && styles.myTextBlack]}>{player.currentXP} XP</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b', padding: 16 },
  header: { marginBottom: 24, marginTop: 16 },
  subtitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 },
  title: { color: 'white', fontSize: 30, fontWeight: 'bold' },
  
  boardCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#27272a' },
  playerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  
  // Highlighting the current user
  myPlayerRow: { backgroundColor: '#10b981', borderRadius: 8, paddingHorizontal: 8, borderBottomWidth: 0, marginVertical: 4 },
  myTextBlack: { color: '#09090b' },
  myLevelDark: { color: '#064e3b' },
  myAvatar: { backgroundColor: 'white' },
  
  rankNumber: { color: '#71717a', fontSize: 16, fontWeight: 'bold', width: 35 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#27272a', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  playerInfo: { flex: 1 },
  playerName: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  playerLevel: { color: '#10b981', fontSize: 12, fontWeight: '600', marginTop: 2 },
  playerXp: { color: '#a1a1aa', fontSize: 14, fontWeight: '500' }
});