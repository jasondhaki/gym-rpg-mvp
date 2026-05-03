import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dailyQuests } from '../utils/dummyData';

export const useWorkoutStore = create(
  persist(
    (set) => ({
      // 1. Core User Stats (Carried over from Phase 9)
      user: {
        username: "Jason",
        level: 6, 
        currentXP: 0,
        xpToNextLevel: 2400,
        rank: "Iron Novice"
      },

      // 2. The Queue System
      activeDeck: dailyQuests.slice(0, 6), // First 6 cards go to the board
      waitingQueue: dailyQuests.slice(6),  // The rest wait in the void
      completedQuests: [],                 // Track what we killed today

      // 3. The Gameplay Loop
      completeQuest: (questId) => set((state) => {
        const questIndex = state.activeDeck.findIndex(q => q.id === questId);
        if (questIndex === -1) return state; // Safety check

        const completedQuest = state.activeDeck[questIndex];
        
        // --- RPG MATH ---
        let updatedUser = { ...state.user };
        updatedUser.currentXP += completedQuest.xp;
        
        if (updatedUser.currentXP >= updatedUser.xpToNextLevel) {
          updatedUser.level += 1;
          updatedUser.currentXP -= updatedUser.xpToNextLevel;
          updatedUser.xpToNextLevel = Math.floor(updatedUser.xpToNextLevel * 1.2);
        }

        // --- DECK MANAGEMENT ---
        const newActiveDeck = [...state.activeDeck];
        newActiveDeck.splice(questIndex, 1); // Remove the completed card

        const newWaitingQueue = [...state.waitingQueue];
        if (newWaitingQueue.length > 0) {
          // Draw the next card and slot it exactly where the old one was
          const nextQuest = newWaitingQueue.shift();
          newActiveDeck.splice(questIndex, 0, nextQuest);
        }

        return {
          user: updatedUser,
          activeDeck: newActiveDeck,
          waitingQueue: newWaitingQueue,
          completedQuests: [...state.completedQuests, completedQuest.id]
        };
      }),

      // 4. Debug/Reset 
      resetDay: () => set(() => ({
        activeDeck: dailyQuests.slice(0, 6),
        waitingQueue: dailyQuests.slice(6),
        completedQuests: []
      }))
    }),
    {
      name: 'gym-rpg-engine-v2', // NEW KEY to prevent crashes from old save data
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);