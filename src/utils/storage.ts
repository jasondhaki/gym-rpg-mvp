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
}

const DEFAULT_STATS: PlayerData = {
  level: 1,
  totalXp: 0,
  lifetimeVolume: 0,
  currentStreak: 0,
  lastWorkoutDate: null,
  str: 10,
  end: 10,
  unlockedBadges: [], // Starts empty
  pushQuestsCompleted: 0,
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
      // BACKWARD COMPATIBILITY PATCH: 
      // Merges the default stats with the loaded stats.
      // If the old save file is missing 'currentStreak', it safely defaults to 0.
      return { ...DEFAULT_STATS, ...parsedData };
    }
    
    return DEFAULT_STATS;
  } catch (e) {
    console.error("CRITICAL: Failed to load save file. Booting default stats.", e);
    return DEFAULT_STATS;
  }
};