import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function QuestBoardScreen() {
  const router = useRouter();
  
  // 1. Pull the active deck from the V2 Brain
  const activeDeck = useWorkoutStore((state) => state.activeDeck);

  // Safety check while state loads
  if (!activeDeck) return null;

  // 2. The Ghost Card Algorithm: Always ensure exactly 6 slots in the grid
  const displayCards = [...activeDeck];
  while (displayCards.length < 6) {
    displayCards.push({ isGhost: true, id: `ghost-${displayCards.length}` });
  }

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      
      <View style={styles.header}>
        <Text style={styles.subtitle}>TARGET LOG</Text>
        <Text style={styles.title}>Daily Quests</Text>
      </View>

      {/* 3. The 2x3 Grid */}
      <View style={styles.grid}>
        {displayCards.map((quest) => {
          
          // Render the "Cleared" state if it's a ghost card
          if (quest.isGhost) {
            return (
              <View key={quest.id} style={[styles.card, styles.ghostCard]}>
                <Ionicons name="checkmark-done" size={32} color="#3f3f46" />
                <Text style={styles.ghostText}>CLEARED</Text>
              </View>
            );
          }

          // Render the Active Quest Card
          return (
            <TouchableOpacity 
              key={quest.id} 
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => router.push(`/workout/${quest.id}`)}
            >
              <View style={styles.iconContainer}>
                {/* Fallback to a barbell if the icon string is weird */}
                <Ionicons name={quest.icon || 'barbell'} size={28} color="white" />
              </View>
              
              <Text style={styles.questName} numberOfLines={2}>
                {quest.name}
              </Text>
              
              <View style={styles.rewardPill}>
                <Text style={styles.rewardText}>+{quest.xp} XP</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b', padding: 16, paddingTop: 60 },
  
  header: { marginBottom: 24 },
  subtitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 },
  title: { color: 'white', fontSize: 30, fontWeight: 'bold' },
  
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: 12 // Space between rows and columns
  },
  
  // Active Card Styles
  card: { 
    width: '48%', // Leaves exactly enough room for 2 columns with a gap
    backgroundColor: '#18181b', 
    borderRadius: 16, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: '#27272a',
    aspectRatio: 0.85, // Makes the cards slightly taller than they are wide
    justifyContent: 'space-between'
  },
  iconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#27272a', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  questName: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  rewardPill: { alignSelf: 'flex-start', backgroundColor: '#064e3b', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 12 },
  rewardText: { color: '#10b981', fontSize: 12, fontWeight: 'bold' },

  // Ghost Card Styles
  ghostCard: { 
    backgroundColor: 'transparent', 
    borderColor: '#27272a', 
    borderStyle: 'dashed', 
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ghostText: { color: '#3f3f46', fontSize: 14, fontWeight: 'bold', marginTop: 8, letterSpacing: 1 }
});