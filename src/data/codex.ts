// 1. Define the Data Structures
export interface Exercise {
  id: string;
  name: string;
  muscleGroup: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Core';
  imagePath: any; // React Native require() type
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  targetMuscles: string[];
  requiredExercises: string[];
  xpMultiplier: number;
  attributeFocus: 'STR' | 'END'; // NEW: Tells the engine where to funnel the stats
}

// 2. The Exercise Database (Option B)
export const EXERCISES: Exercise[] = [
  {
    id: 'barbell_bench',
    name: 'Barbell Bench Press',
    muscleGroup: 'Chest',
    imagePath: require('../../assets/images/BarbellBenchPress.png')
  },
  {
    id: 'incline_dumbbell',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
    imagePath: require('../../assets/images/InclineDumbbellPress.png')
  },
  {
    id: 'overhead_press',
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    imagePath: require('../../assets/images/OverheadPress.png')
  },
  {
    id: 'lateral_raises',
    name: 'Lateral Raises',
    muscleGroup: 'Shoulders',
    imagePath: require('../../assets/images/LateralRaises.png')
  },
  {
    id: 'skullcrushers',
    name: 'Skullcrushers',
    muscleGroup: 'Triceps',
    imagePath: require('../../assets/images/Skullcrushers.png')
  },
  {
    id: 'tricep_pushdown',
    name: 'Tricep Pushdown',
    muscleGroup: 'Triceps',
    imagePath: require('../../assets/images/TricepPushdown.png')
  }
];

// 3. The Quest System (Option C)
export const QUESTS: Quest[] = [
  {
    id: 'push_day_alpha',
    title: 'Push Day Alpha',
    description: 'Target the anterior chain. Complete these exercises for a 1.5x XP Boost.',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    requiredExercises: [
      'barbell_bench', 
      'incline_dumbbell', 
      'overhead_press', 
      'skullcrushers'
    ],
    xpMultiplier: 1.5,
    attributeFocus: 'STR' // NEW: This quest builds raw Strength
  }
];

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any; // Ionicons name
  color: string;
}

export const BADGES: Badge[] = [
  {
    id: 'one_ton_club',
    name: '1-Ton Club',
    description: 'Move 1,000kg of iron in a single session.',
    icon: 'barbell',
    color: '#fbbf24' // Gold
  },
  {
    id: 'iron_vanguard',
    name: 'Iron Vanguard',
    description: 'Complete 10 Push Day operations.',
    icon: 'shield-checkmark',
    color: '#60a5fa' // Silver/Blue
  },
  {
    id: 'consistency_king',
    name: 'Relentless',
    description: 'Achieve a 7-day streak.',
    icon: 'flame',
    color: '#ef4444' // Red
  }
];