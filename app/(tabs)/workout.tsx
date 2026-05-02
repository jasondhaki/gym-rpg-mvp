import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';
import ExerciseCard from '../../src/components/ExerciseCard';

export default function WorkoutScreen() {
  const activeWorkout = useWorkoutStore((state) => state.activeWorkout);
  const toggleSetComplete = useWorkoutStore((state) => state.toggleSetComplete);
  const updateSetWeight = useWorkoutStore((state) => state.updateSetWeight);

  if (!activeWorkout) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>ACTIVE SESSION</Text>
        <Text style={styles.title}>{activeWorkout.name}</Text>
      </View>

      {activeWorkout.exercises.map((ex: any, idx: number) => (
        <ExerciseCard
          key={ex.exerciseId}
          exercise={ex}
          exerciseIndex={idx}
          toggleSet={toggleSetComplete}
          updateWeight={updateSetWeight}
        />
      ))}
      
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b', padding: 16 },
  header: { marginBottom: 24, marginTop: 16 },
  subtitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2 },
  title: { color: 'white', fontSize: 30, fontWeight: 'bold' },
});