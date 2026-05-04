import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// 1. Ditch Zustand, import the Master Codex!
import { QUESTS } from '../../src/data/codex';

export default function QuestBoardScreen() {
  const router = useRouter();

  // 2. The Ghost Card Algorithm: Always ensure exactly 6 slots in the grid
  // We use the QUESTS array from our codex instead of activeDeck
  const displayCards: any[] = [...QUESTS];
  while (displayCards.length < 6) {
    displayCards.push({ isGhost: true, id: `ghost-${displayCards.length}` });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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

            // Render the Active Quest Card from the Codex
            return (
              <TouchableOpacity 
                key={quest.id} 
                style={styles.card}
                activeOpacity={0.7}
                // Routes to the dynamic exercise logger screen!
                onPress={() => router.push(`/workout/${quest.id}`)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="flame" size={28} color="#10b981" />
                </View>
                
                {/* Maps to the 'title' property in our Codex interface */}
                <Text style={styles.questName} numberOfLines={2}>
                  {quest.title}
                </Text>
                
                <View style={styles.rewardPill}>
                  {/* Maps to the 'xpMultiplier' property in our Codex */}
                  <Text style={styles.rewardText}>{quest.xpMultiplier}x XP BOOST</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#09090b' },
  container: { flex: 1, padding: 16, paddingTop: 20 },
  
  header: { marginBottom: 24 },
  subtitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, fontFamily: 'monospace' },
  title: { color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily: 'CyberpunkFont', marginTop: 4 },
  
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    gap: 12 
  },
  
  // Active Card Styles
  card: { 
    width: '48%', 
    backgroundColor: '#18181b', 
    borderRadius: 16, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: '#27272a',
    aspectRatio: 0.85, 
    justifyContent: 'space-between'
  },
  iconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#10b981' },
  questName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  rewardPill: { alignSelf: 'flex-start', backgroundColor: '#064e3b', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 12, borderWidth: 1, borderColor: '#10b981' },
  rewardText: { color: '#10b981', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace' },

  // Ghost Card Styles
  ghostCard: { 
    backgroundColor: 'transparent', 
    borderColor: '#27272a', 
    borderStyle: 'dashed', 
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ghostText: { color: '#3f3f46', fontSize: 14, fontWeight: 'bold', marginTop: 8, letterSpacing: 1, fontFamily: 'monospace' }
});