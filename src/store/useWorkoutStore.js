// src/store/useWorkoutStore.js
import { create } from 'zustand';
import { dummyActiveWorkout } from '../utils/dummyData';

export const useWorkoutStore = create((set) => ({
  // Load the dummy workout into the active state
  activeWorkout: dummyActiveWorkout,

  // Action: Toggle a set's completion status
  toggleSetComplete: (exerciseIndex, setIndex) => set((state) => {
    // Create a deep copy of the active workout so we don't mutate state directly
    const updatedWorkout = { ...state.activeWorkout };
    const currentSet = updatedWorkout.exercises[exerciseIndex].sets[setIndex];
    
    // Flip the boolean
    currentSet.completed = !currentSet.completed;
    
    return { activeWorkout: updatedWorkout };
  }),

  // Action: Update the weight of a specific set (for PRs)
  updateSetWeight: (exerciseIndex, setIndex, newWeight) => set((state) => {
    const updatedWorkout = { ...state.activeWorkout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].weight = newWeight;
    return { activeWorkout: updatedWorkout };
  }),
}));