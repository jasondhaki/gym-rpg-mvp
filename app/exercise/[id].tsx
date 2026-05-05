import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { EXERCISES } from '../../src/data/codex';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Defensive ID Check: Ensures we handle string vs. string[] correctly
  const exerciseId = Array.isArray(id) ? id[0] : id;
  const exercise = EXERCISES.find(ex => ex.id === exerciseId);

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>INTEL CORRUPTED: Exercise Not Found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER: High-tech Schematic Feel */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="chevron-down" size={32} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>EXERCISE INTEL</Text>
          <Text style={styles.headerSubtitle}>ID: {exercise.id.toUpperCase()}</Text>
        </View>
        <View style={{ width: 44 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* VISUAL SCHEMATIC: The Blueprint Box */}
        <View style={styles.imageBox}>
          <Image 
            source={exercise.imagePath} 
            style={styles.image} 
            resizeMode="contain" 
          />
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerBottomRight} />
        </View>

        {/* INFO SECTION */}
        <View style={styles.infoSection}>
          <Text style={styles.title}>{exercise.name}</Text>
          
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{exercise.muscleGroup.toUpperCase()}</Text>
            </View>
            <View style={[styles.tag, { borderColor: '#10b981' }]}>
              <Text style={[styles.tagText, { color: '#10b981' }]}>
                {exercise.subTarget?.toUpperCase() || 'GENERAL'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* INSTRUCTIONS: The "Mission Steps" */}
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="construct-outline" size={18} color="#10b981" />
            <Text style={styles.sectionLabel}>EXECUTION PROTOCOL</Text>
          </View>

          {exercise.instructions && exercise.instructions.length > 0 ? (
            exercise.instructions.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepNumberCircle}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.missingInfoText}>No instructions found in Codex.</Text>
          )}
        </View>
      </ScrollView>

      {/* FOOTER ACTION */}
      <TouchableOpacity 
        style={styles.doneButton} 
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Text style={styles.doneButtonText}>SYNC & DISMISS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  headerTitle: { color: '#71717a', fontSize: 10, letterSpacing: 4, fontFamily: 'SpaceMono', textAlign: 'center' },
  headerSubtitle: { color: '#3f3f46', fontSize: 8, letterSpacing: 2, fontFamily: 'SpaceMono', textAlign: 'center' },
  closeButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  
  scrollContent: { paddingBottom: 120 },
  
  // IMAGE BOX: "Schematic" decoration
  imageBox: { 
    width: '90%', 
    aspectRatio: 1, 
    alignSelf: 'center', 
    backgroundColor: '#111113', 
    borderRadius: 24, 
    padding: 30, 
    marginVertical: 20, 
    borderWidth: 1, 
    borderColor: '#18181b',
    position: 'relative'
  },
  image: { width: '100%', height: '100%' },
  cornerTopLeft: { position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTopWidth: 3, borderLeftWidth: 3, borderColor: '#10b981', borderTopLeftRadius: 24 },
  cornerBottomRight: { position: 'absolute', bottom: -1, right: -1, width: 20, height: 20, borderBottomWidth: 3, borderRightWidth: 3, borderColor: '#10b981', borderBottomRightRadius: 24 },

  infoSection: { paddingHorizontal: 25 },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold', fontFamily: 'CyberpunkFont', marginBottom: 15 },
  tagRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#27272a', backgroundColor: '#18181b' },
  tagText: { color: '#a1a1aa', fontSize: 10, fontWeight: 'bold', fontFamily: 'SpaceMono' },
  
  divider: { height: 1, backgroundColor: '#18181b', marginBottom: 25 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 8 },
  sectionLabel: { color: '#10b981', fontSize: 12, letterSpacing: 2, fontWeight: 'bold', fontFamily: 'SpaceMono' },
  
  // INSTRUCTION ROWS
  stepRow: { flexDirection: 'row', marginBottom: 20, alignItems: 'flex-start' },
  stepNumberCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#064e3b', alignItems: 'center', justifyContent: 'center', marginRight: 15, marginTop: 2 },
  stepNumber: { color: '#10b981', fontSize: 12, fontWeight: 'bold', fontFamily: 'SpaceMono' },
  stepText: { color: '#a1a1aa', fontSize: 15, lineHeight: 22, flex: 1 },
  missingInfoText: { color: '#3f3f46', fontStyle: 'italic', fontFamily: 'SpaceMono' },

  // BUTTON
  doneButton: { 
    position: 'absolute', 
    bottom: 30, 
    left: 25, 
    right: 25, 
    backgroundColor: 'white', 
    paddingVertical: 20, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  doneButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold', letterSpacing: 2, fontFamily: 'CyberpunkFont' }
});