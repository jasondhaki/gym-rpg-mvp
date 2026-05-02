import { create } from 'zustand';
import { dummyActiveWorkout } from '../utils/dummyData';

export const useWorkoutStore = create((set) => ({
  activeWorkout: dummyActiveWorkout,

  toggleSetComplete: (exerciseIndex, setIndex) => set((state) => {
    // 1. Map through exercises to create a fresh array
    const newExercises = state.activeWorkout.exercises.map((ex, eIdx) => {
      // 2. If it's not the exercise we clicked, return it unchanged
      if (eIdx !== exerciseIndex) return ex; 
      
      // 3. Map through the sets of the target exercise
      const newSets = ex.sets.map((s, sIdx) => {
        if (sIdx !== setIndex) return s; 
        // 4. Create a BRAND NEW object with the flipped boolean so React detects it
        return { ...s, completed: !s.completed }; 
      });

      return { ...ex, sets: newSets };
    });

    // 5. Update the main state with the fresh data
    return { activeWorkout: { ...state.activeWorkout, exercises: newExercises } };
  }),

  updateSetWeight: (exerciseIndex, setIndex, newWeight) => set((state) => {
    const newExercises = state.activeWorkout.exercises.map((ex, eIdx) => {
      if (eIdx !== exerciseIndex) return ex;
      
      const newSets = ex.sets.map((s, sIdx) => {
        if (sIdx !== setIndex) return s;
        return { ...s, weight: newWeight };
      });

      return { ...ex, sets: newSets };
    });

    return { activeWorkout: { ...state.activeWorkout, exercises: newExercises } };
  }),
}));