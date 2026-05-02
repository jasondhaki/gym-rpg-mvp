import { Text, View, StyleSheet } from 'react-native';
import { useWorkoutStore } from '../../src/store/useWorkoutStore';

export default function TabOneScreen() {
  const activeWorkout = useWorkoutStore((state) => state.activeWorkout);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Engine Online.</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>DATA LINK ESTABLISHED:</Text>
        <Text style={styles.workoutName}>{activeWorkout.name}</Text>
        <Text style={styles.stats}>
          {activeWorkout.exercises.length} Exercises Loaded
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#18181b', // Zinc-900
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#34d399', // Emerald-400
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#27272a', // Zinc-800
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#3f3f46', // Zinc-700
    width: '80%',
    alignItems: 'center',
  },
  label: {
    color: '#a1a1aa', // Zinc-400
    fontSize: 12,
    marginBottom: 4,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  stats: {
    fontSize: 16,
    color: '#34d399',
  },
});