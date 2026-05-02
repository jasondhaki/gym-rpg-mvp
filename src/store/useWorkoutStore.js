import { create } from 'zustand';
import { dummyActiveWorkout } from '../utils/dummyData';

const XP_PER_SET = 50;

export const useWorkoutStore = create((set) => ({
  user: {
    username: "Jason",
    level: 5,
    currentXP: 1850, // Bumped up so you can test the level-up!
    xpToNextLevel: 2000,
    rank: "Iron Novice"
  },

  activeWorkout: dummyActiveWorkout,

  toggleSetComplete: (exerciseIndex, setIndex) => set((state) => {
    let isCompleting = false;

    // 1. Update the Workout Data
    const newExercises = state.activeWorkout.exercises.map((ex, eIdx) => {
      if (eIdx !== exerciseIndex) return ex; 
      
      const newSets = ex.sets.map((s, sIdx) => {
        if (sIdx !== setIndex) return s; 
        
        // Check if we are turning it ON or OFF
        isCompleting = !s.completed;
        return { ...s, completed: !s.completed }; 
      });

      return { ...ex, sets: newSets };
    });

    // 2. The RPG Math
    let updatedUser = { ...state.user };
    
    if (isCompleting) {
      updatedUser.currentXP += XP_PER_SET;
      
      // Level Up Logic
      if (updatedUser.currentXP >= updatedUser.xpToNextLevel) {
        updatedUser.level += 1; // Level up!
        updatedUser.currentXP -= updatedUser.xpToNextLevel; // Carry over remainder XP
        updatedUser.xpToNextLevel = Math.floor(updatedUser.xpToNextLevel * 1.2); // Next level is 20% harder
      }
    } else {
      // Penalty for un-checking a set (prevent cheating)
      updatedUser.currentXP -= XP_PER_SET;
      if (updatedUser.currentXP < 0) updatedUser.currentXP = 0;
    }

    // 3. Save the new state
    return { 
      activeWorkout: { ...state.activeWorkout, exercises: newExercises },
      user: updatedUser
    };
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