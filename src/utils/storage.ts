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
  completedToday: Record<string, string[]>; 

  // --- NEW: REST SHIELD SYSTEM ---
  restTokens: number; // Current available shields (0-3)
  lastTokenResetDate: string | null; // Tracks the last Monday refill
  restDaysUsed: string[]; // History of dates where a shield was consumed

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
  completedToday: {}, 

  // Rest System Defaults
  restTokens: 3,
  lastTokenResetDate: null,
  restDaysUsed: [],

  // User Identity
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
      // 1. Convert old array-based session tracking to object-based
      if (Array.isArray(parsedData.completedToday)) {
        parsedData.completedToday = {};
      }

      // 2. Initialize Rest Shield fields for existing players
      if (parsedData.restTokens === undefined) {
        parsedData.restTokens = 3;
        parsedData.restDaysUsed = [];
        parsedData.lastTokenResetDate = null;
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