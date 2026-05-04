import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVE_SLOT = '@player_save_data';

// The shape of our save file
export interface PlayerData {
  level: number;
  totalXp: number;
  lifetimeVolume: number;
}

// Default stats for a brand new player
const DEFAULT_STATS: PlayerData = {
  level: 1,
  totalXp: 0,
  lifetimeVolume: 0,
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
    return jsonValue != null ? JSON.parse(jsonValue) : DEFAULT_STATS;
  } catch (e) {
    console.error("CRITICAL: Failed to load save file. Booting default stats.", e);
    return DEFAULT_STATS;
  }
};