import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVE_SLOT = '@player_save_data';

export interface PlayerData {
  level: number;
  totalXp: number;
  lifetimeVolume: number;
  currentStreak: number;
  lastWorkoutDate: string | null;
  str: number;
  end: number;
  unlockedBadges: string[];
  pushQuestsCompleted: number;
  
  // --- NEW: ISOLATED SESSION TRACKING ---
  // A dictionary where Keys = questId, Values = array of exerciseIds
  // Example: { "push_day_alpha": ["ch_1", "sh_2"], "leg_day_reckoning": ["lg_5"] }
  completedToday: Record<string, string[]>; 

  // --- BIOMETRIC & IDENTITY DATA ---
  hasCompletedOnboarding: boolean;
  playerName: string;
  weight: number; // in kg
  height: number; // in cm
  age: number;
  targetArchetype: 'Aesthetic' | 'Juggernaut' | 'Athlete' | null;
}

const DEFAULT_STATS: PlayerData = {
  level: 1,
  totalXp: 0,
  lifetimeVolume: 0,
  currentStreak: 0,
  lastWorkoutDate: null,
  str: 10,
  end: 10,
  unlockedBadges: [], 
  pushQuestsCompleted: 0,
  completedToday: {}, // Initialize as an empty object (dictionary)

  // Defaults for a brand new save
  hasCompletedOnboarding: false,
  playerName: 'Jason Dhaki', 
  weight: 70,
  height: 175,
  age: 20,
  targetArchetype: null,
};

export const saveGame = async (data: PlayerData) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(SAVE_SLOT, jsonValue);
  } catch (e) {
    console.error("CRITICAL: Failed to overwrite save file.", e);
  }
};

export const loadGame = async (): Promise<PlayerData> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SAVE_SLOT);
    
    if (jsonValue != null) {
      const parsedData = JSON.parse(jsonValue);
      
      // --- DATA MIGRATION PATCH ---
      // If the user's save file still has the old flat array (from the previous version),
      // we must wipe it and convert it to an object so the app doesn't crash on quest filtering.
      if (Array.isArray(parsedData.completedToday)) {
        parsedData.completedToday = {};
      }

      // Merge defaults to catch any completely missing fields
      return { ...DEFAULT_STATS, ...parsedData };
    }
    
    return DEFAULT_STATS;
  } catch (e) {
    console.error("CRITICAL: Failed to load save file. Booting default stats.", e);
    return DEFAULT_STATS;
  }
};