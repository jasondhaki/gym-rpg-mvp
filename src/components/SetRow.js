import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
// 1. Import the haptics engine
import * as Haptics from 'expo-haptics';

export default function SetRow({ set, onToggle, onUpdateWeight, index }) {
  
  // 2. Create a custom function to handle the tap
  // Add 'async' here
  const handleTap = async () => {
    // Add 'await' to ensure the motor fires
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onToggle();
  };

  return (
    <View style={styles.row}>
      <Text style={styles.indexText}>#{index + 1}</Text>
      
      <View style={styles.middleSection}>
        <View style={styles.weightContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            defaultValue={set.weight.toString()}
            onChangeText={(val) => onUpdateWeight(parseFloat(val) || 0)}
          />
          <Text style={styles.unitText}>kg</Text>
        </View>
        <Text style={styles.repsText}>{set.reps} reps</Text>
      </View>

      {/* 3. Point the onPress to our new handleTap function */}
      <TouchableOpacity
        onPress={handleTap}
        style={[styles.checkButton, set.completed ? styles.checkButtonActive : styles.checkButtonInactive]}
      >
        <Text style={styles.checkText}>{set.completed ? '✓' : ''}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  indexText: { color: '#a1a1aa', fontWeight: 'bold', width: 30 },
  middleSection: { flexDirection: 'row', flex: 1, alignItems: 'center' },
  weightContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#27272a', borderRadius: 4, paddingHorizontal: 8, marginRight: 16 },
  input: { color: 'white', fontWeight: 'bold', padding: 4, width: 40, textAlign: 'center' },
  unitText: { color: '#71717a', fontSize: 12, marginLeft: 4 },
  repsText: { color: 'white', fontWeight: '500' },
  checkButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  checkButtonActive: { backgroundColor: '#10b981' },
  checkButtonInactive: { backgroundColor: '#3f3f46' },
  checkText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});