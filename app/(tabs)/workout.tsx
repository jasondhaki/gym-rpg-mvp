import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// 1. Import the expanded Master Codex and the Quest interface
import { QUESTS, Quest } from '../../src/data/codex';
import { loadGame } from '../../src/utils/storage';

export default function QuestBoardScreen() {
  const router = useRouter();
  const [completedToday, setCompletedToday] = useState<string[]>([]);

  // 2. The Symmetry Engine: Typing the array as a Union of Quest or Ghost object
  const displayCards: (Quest | { isGhost: boolean; id: string })[] = [...QUESTS];
  
  if (displayCards.length % 2 !== 0) {
    displayCards.push({ isGhost: true, id: 'filler-ghost' });
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

        {/* 3. The Quest Grid */}
        <View style={styles.grid}>
          {displayCards.map((item) => {
            
            // TYPE GUARD: Check if the current item is a Ghost Card
            if ('isGhost' in item) {
              return (
                <View key={item.id} style={[styles.card, styles.ghostCard]}>
                  <Ionicons name="lock-closed" size={32} color="#27272a" />
                  <Text style={styles.ghostText}>LOCKED</Text>
                </View>
              );
            }

            // Because of the guard above, TypeScript now knows 'item' IS a Quest
            const quest = item;
            const isCleared = completedToday.includes(quest.id);

            return (
              <TouchableOpacity 
                key={quest.id} 
                style={[styles.card, isCleared && styles.ghostCard]}
                activeOpacity={0.7}
                onPress={() => router.push(`/workout/${quest.id}`)}
                disabled={isCleared}
              >
                {isCleared ? (
                  <View style={styles.clearedContent}>
                    <Ionicons name="checkmark-done" size={32} color="#3f3f46" />
                    <Text style={styles.ghostText}>CLEARED</Text>
                  </View>
                ) : (
                  <>
                    <View style={[
                      styles.iconContainer, 
                      { 
                        backgroundColor: (quest.color || '#10b981') + '15', 
                        borderColor: quest.color || '#10b981' 
                      }
                    ]}>
                      <Ionicons name={quest.icon as any} size={26} color={quest.color || '#10b981'} />
                    </View>
                    
                    <Text style={styles.questName} numberOfLines={2}>
                      {quest.title}
                    </Text>
                    
                    <View style={[
                      styles.rewardPill, 
                      { 
                        backgroundColor: (quest.color || '#10b981') + '20', 
                        borderColor: quest.color || '#10b981' 
                      }
                    ]}>
                      <Text style={[styles.rewardText, { color: quest.color || '#10b981' }]}>
                        {quest.xpMultiplier}x XP BOOST
                      </Text>
                    </View>
                  </>
                )}
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
  
  header: { marginBottom: 30 },
  subtitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 3, fontFamily: 'SpaceMono' },
  title: { color: 'white', fontSize: 34, fontWeight: 'bold', fontFamily: 'CyberpunkFont', marginTop: 4 },
  
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  
  card: { 
    width: '48%', 
    backgroundColor: '#18181b', 
    borderRadius: 24, 
    padding: 18, 
    borderWidth: 1, 
    borderColor: '#27272a',
    aspectRatio: 0.88, 
    justifyContent: 'space-between',
    marginBottom: 16
  },

  iconContainer: { 
    width: 52, 
    height: 52, 
    borderRadius: 14, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1 
  },

  questName: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    lineHeight: 24,
    fontFamily: 'CyberpunkFont',
    marginTop: 8
  },

  rewardPill: { 
    alignSelf: 'flex-start', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 12, 
    borderWidth: 1 
  },

  rewardText: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    fontFamily: 'SpaceMono' 
  },

  ghostCard: { 
    backgroundColor: 'transparent', 
    borderColor: '#18181b', 
    borderStyle: 'dashed', 
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  clearedContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  ghostText: { 
    color: '#3f3f46', 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginTop: 8, 
    letterSpacing: 2, 
    fontFamily: 'SpaceMono' 
  }
});