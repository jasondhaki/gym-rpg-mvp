// src/utils/xpBoost.ts
//
// Dynamic, recovery-aware XP boost engine. Rather than a fixed multiplier
// per quest, the boost shown/awarded each day shifts based on what the
// player actually trained recently, nudging them through a Push -> Pull ->
// Legs rotation (an established, science-backed split structure) while
// respecting the ~48h minimum recovery window per muscle group.
import { MuscleGroup, Quest } from '../data/codex';

type RotationGroup = 'Push' | 'Pull' | 'Legs';

// Abs are intentionally excluded from the rotation - core work is commonly
// trained far more frequently than other muscle groups and doesn't fit neatly
// into a push/pull/legs cycle.
const ROTATION_GROUP: Partial<Record<MuscleGroup, RotationGroup>> = {
  Chest: 'Push',
  Shoulders: 'Push',
  Triceps: 'Push',
  Back: 'Pull',
  Biceps: 'Pull',
  Legs: 'Legs',
};

const NEXT_IN_ROTATION: Record<RotationGroup, RotationGroup> = {
  Push: 'Pull',
  Pull: 'Legs',
  Legs: 'Push',
};

// How many days it takes for the rotation nudge to fully fade back to
// neutral once training stops - stale history shouldn't discourage a
// muscle group forever just because it was technically "last trained".
const ROTATION_DECAY_DAYS = 5;
// Discourage (but don't fully block) re-training the same specific muscle
// again the same day, so a full day's progress spreads across categories.
const SAME_DAY_GUARD = 0.7;

const MIN_MULTIPLIER = 0.4;
const MAX_MULTIPLIER = 1.6;

export type MuscleHistory = Partial<Record<MuscleGroup, string>>; // muscle -> last-trained date (YYYY-MM-DD)

function daysBetween(earlier: string, later: string): number {
  const a = new Date(earlier + 'T00:00:00');
  const b = new Date(later + 'T00:00:00');
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// Which rotation group (if any) was most recently trained, and how many
// days ago - used to fade the nudge out over time.
function getLastTrainedRotation(history: MuscleHistory, today: string): { group: RotationGroup; daysAgo: number } | null {
  let best: { group: RotationGroup; daysAgo: number } | null = null;
  for (const [muscle, date] of Object.entries(history) as [MuscleGroup, string][]) {
    const group = ROTATION_GROUP[muscle];
    if (!group || !date) continue;
    const daysAgo = daysBetween(date, today);
    if (!best || daysAgo < best.daysAgo) best = { group, daysAgo };
  }
  return best;
}

// A 0.4x-1.6x freshness multiplier for a single muscle group: discouraged
// if it (or its rotation group) was just trained, encouraged if it's the
// natural next step in the Push/Pull/Legs cycle.
export function getMuscleFreshness(muscle: MuscleGroup, history: MuscleHistory | undefined, today: string): number {
  const safeHistory = history || {};
  const rotationGroup = ROTATION_GROUP[muscle];
  const lastTrained = getLastTrainedRotation(safeHistory, today);

  let rotationMultiplier = 1.0;
  if (rotationGroup && lastTrained) {
    const raw =
      rotationGroup === lastTrained.group ? 0.5 :
      rotationGroup === NEXT_IN_ROTATION[lastTrained.group] ? 1.5 :
      0.75;
    const decay = clamp(1 - lastTrained.daysAgo / ROTATION_DECAY_DAYS, 0, 1);
    rotationMultiplier = 1.0 + (raw - 1.0) * decay;
  }

  const trainedToday = safeHistory[muscle] === today;
  const sameDayGuard = trainedToday ? SAME_DAY_GUARD : 1.0;

  return clamp(rotationMultiplier * sameDayGuard, MIN_MULTIPLIER, MAX_MULTIPLIER);
}

// A quest's dynamic multiplier is the average freshness across its target
// muscles, so multi-muscle quests (Push/Pull/Full Body) reward genuine variety.
export function getQuestFreshnessMultiplier(quest: Quest, history: MuscleHistory | undefined, today: string): number {
  const scores = quest.targetMuscles.map((m) => getMuscleFreshness(m, history, today));
  const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  return Math.round(avg * 100) / 100;
}

// The final XP multiplier actually shown/awarded for a quest today.
export function getDynamicQuestXp(quest: Quest, history: MuscleHistory | undefined, today: string): number {
  return Math.round(quest.xpMultiplier * getQuestFreshnessMultiplier(quest, history, today) * 100) / 100;
}
