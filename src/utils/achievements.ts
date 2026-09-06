// src/utils/achievements.ts
import { BADGES } from '../data/codex';
import { PlayerData } from './storage';

export const checkForNewBadges = (player: PlayerData): string[] => {
  const newlyUnlocked: string[] = [];
  const currentUnlocked = player.unlockedBadges || [];

  BADGES.forEach((badge) => {
    // If they don't have it yet, check if they meet the requirement
    if (!currentUnlocked.includes(badge.id)) {
      const playerValue = badge.requirement.field === 'restDaysUsed' 
        ? (player.restDaysUsed?.length || 0) 
        : (player[badge.requirement.field] as number);

      if (playerValue >= badge.requirement.value) {
        newlyUnlocked.push(badge.id);
      }
    }
  });

  return newlyUnlocked;
};