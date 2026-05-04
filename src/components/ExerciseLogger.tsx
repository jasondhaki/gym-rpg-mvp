import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Define the shape of a single set
interface WorkoutSet {
  id: string;
  weight: string;
  reps: string;
}

export default function ExerciseLogger() {
  // Start the user with one empty set
  const [sets, setSets] = useState<WorkoutSet[]>([
    { id: Date.now().toString(), weight: '', reps: '' }
  ]);

  // The Summation Engine
  const calculateTotalVolume = () => {
    return sets.reduce((total, currentSet) => {
      const weight = parseFloat(currentSet.weight) || 0;
      const reps = parseInt(currentSet.reps) || 0;
      return total + (weight * reps);
    }, 0);
  };

  const addSet = () => {
    setSets([...sets, { id: Date.now().toString(), weight: '', reps: '' }]);
  };

  const updateSet = (id: string, field: 'weight' | 'reps', value: string) => {
    setSets(sets.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // The RPG math: Let's say 1 point of volume = 0.5 XP to keep numbers clean
  const totalVolume = calculateTotalVolume();
  const xpEarned = Math.floor(totalVolume * 0.5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dumbbell Curls</Text>
      
      {/* Table Headers */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>SET</Text>
        <Text style={styles.headerText}>KG</Text>
        <Text style={styles.headerText}>REPS</Text>
      </View>

      {/* Dynamic Set Rows */}
      <ScrollView style={styles.setList}>
        {sets.map((set, index) => (
          <View key={set.id} style={styles.row}>
            <View style={styles.setNumberBox}>
              <Text style={styles.setNumber}>{index + 1}</Text>
            </View>
            
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0.0"
              placeholderTextColor="#52525b"
              value={set.weight}
              onChangeText={(val) => updateSet(set.id, 'weight', val)}
            />
            
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#52525b"
              value={set.reps}
              onChangeText={(val) => updateSet(set.id, 'reps', val)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Add Set Button */}
      <TouchableOpacity style={styles.addButton} onPress={addSet}>
        <Text style={styles.addButtonText}>+ ADD SET</Text>
      </TouchableOpacity>

      {/* Live XP Calculator */}
      <View style={styles.xpContainer}>
        <Text style={styles.xpLabel}>TOTAL VOLUME: {totalVolume} kg</Text>
        <Text style={styles.xpReward}>+{xpEarned} XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    padding: 20,
  },
  title: {
    color: '#10b981',
    fontFamily: 'CyberpunkFont',
    fontSize: 24,
    marginBottom: 20,
    textShadowColor: 'rgba(16, 185, 129, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#71717a',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  setList: {
    maxHeight: 300, // Keeps it from taking over the whole screen
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  setNumberBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setNumber: {
    color: '#e4e4e7',
    fontSize: 18,
    fontFamily: 'monospace',
  },
  input: {
    flex: 1,
    backgroundColor: '#27272a',
    color: '#10b981',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: '#10b981',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#10b981',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  xpContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#18181b',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  xpLabel: {
    color: '#a1a1aa',
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  xpReward: {
    color: '#10b981',
    fontFamily: 'CyberpunkFont',
    fontSize: 32,
  }
});