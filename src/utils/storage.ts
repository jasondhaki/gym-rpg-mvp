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
  
  // --- SESSION TRACKING ---
  // Key = questId, Value = array of exerciseIds completed
  completedToday: Record<string, string[]>; 

  // --- REST SHIELD SYSTEM ---
  restTokens: number; 
  lastTokenResetDate: string | null; 
  restDaysUsed: string[]; 

  // --- BIOMETRIC & IDENTITY DATA ---
  hasCompletedOnboarding: boolean;
  playerName: string;
  weight: number; 
  height: number; 
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
  completedToday: {}, 

  restTokens: 3,
  lastTokenResetDate: null,
  restDaysUsed: [],

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
    
    // FIXED: Use local date (en-CA forces YYYY-MM-DD format) 
    // to ensure the refresh happens at local midnight.
    const today = new Date().toLocaleDateString('en-CA'); 
    
    if (jsonValue != null) {
      let parsedData = JSON.parse(jsonValue);
      
      // --- 1. DATA MIGRATION PATCHES ---
      if (Array.isArray(parsedData.completedToday)) {
        parsedData.completedToday = {};
      }

      if (parsedData.restTokens === undefined) {
        parsedData.restTokens = 3;
        parsedData.restDaysUsed = [];
        parsedData.lastTokenResetDate = null;
      }

      // --- 2. THE DAILY REFRESH ENGINE ---
      // If the last activity was not today (local time), wipe the counters.
      if (parsedData.lastWorkoutDate !== today) {
        parsedData.completedToday = {};
      }

      // Merge defaults to ensure no property is ever undefined
      return { ...DEFAULT_STATS, ...parsedData };
    }
    
    return DEFAULT_STATS;
  } catch (e) {
    console.error("CRITICAL: Failed to load save file. Booting default stats.", e);
    return DEFAULT_STATS;
  }
};