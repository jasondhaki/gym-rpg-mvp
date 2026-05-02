import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dummyActiveWorkout } from '../utils/dummyData';

const XP_PER_SET = 50;

export const useWorkoutStore = create(
  persist(
    (set) => ({
      user: {
        username: "Jason",
        level: 5,
        currentXP: 1850,
        xpToNextLevel: 2000,
        rank: "Iron Novice"
      },

      activeWorkout: dummyActiveWorkout,

      toggleSetComplete: (exerciseIndex, setIndex) => set((state) => {
        let isCompleting = false;

        const newExercises = state.activeWorkout.exercises.map((ex, eIdx) => {
          if (eIdx !== exerciseIndex) return ex; 
          const newSets = ex.sets.map((s, sIdx) => {
            if (sIdx !== setIndex) return s; 
            isCompleting = !s.completed;
            return { ...s, completed: !s.completed }; 
          });
          return { ...ex, sets: newSets };
        });

        let updatedUser = { ...state.user };
        
        if (isCompleting) {
          updatedUser.currentXP += XP_PER_SET;
          if (updatedUser.currentXP >= updatedUser.xpToNextLevel) {
            updatedUser.level += 1;
            updatedUser.currentXP -= updatedUser.xpToNextLevel;
            updatedUser.xpToNextLevel = Math.floor(updatedUser.xpToNextLevel * 1.2);
          }
        } else {
          updatedUser.currentXP -= XP_PER_SET;
          if (updatedUser.currentXP < 0) updatedUser.currentXP = 0;
        }

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
    }),
    {
      name: 'gym-rpg-storage', // The secret key used in your phone's local storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);