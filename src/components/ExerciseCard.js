import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SetRow from './SetRow';

export default function ExerciseCard({ exercise, exerciseIndex, toggleSet, updateWeight }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{exercise.name}</Text>
      
      {exercise.sets.map((set, setIndex) => (
        <SetRow
          key={set.setId}
          index={setIndex}
          set={set}
          onToggle={() => toggleSet(exerciseIndex, setIndex)}
          onUpdateWeight={(val) => updateWeight(exerciseIndex, setIndex, val)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#18181b', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#27272a' },
  title: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 12 },
});