// 1. Define the Data Structures
export interface Exercise {
  id: string;
  name: string;
  // Updated to include your custom categories and specific muscle groups
  muscleGroup: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Abs' | 'Full Body' | 'Push' | 'Pull';
  imagePath: any; // React Native require() type
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  targetMuscles: string[];
  requiredExercises: string[]; // These now map to the 10 IDs below
  xpMultiplier: number;
  attributeFocus: 'STR' | 'END'; 
  icon: any;   
  color: string; 
  imagePath: any; 
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any; 
  color: string;
}

// 2. The Final 10-Exercise Database (One-to-One Asset Mapping)
export const EXERCISES: Exercise[] = [
  { id: 'push_day', name: 'Push Day', muscleGroup: 'Push', imagePath: require('../../assets/images/push-day.png') },
  { id: 'pull_day', name: 'Pull Day', muscleGroup: 'Pull', imagePath: require('../../assets/images/pull-day.png') },
  { id: 'full_body', name: 'Full Body', muscleGroup: 'Full Body', imagePath: require('../../assets/images/full-body.png') },
  { id: 'chest_day', name: 'Chest Day', muscleGroup: 'Chest', imagePath: require('../../assets/images/chest-day.png') },
  { id: 'back_day', name: 'Back Day', muscleGroup: 'Back', imagePath: require('../../assets/images/back-day.png') },
  { id: 'shoulders_day', name: 'Shoulder Day', muscleGroup: 'Shoulders', imagePath: require('../../assets/images/shoulders-day.png') },
  { id: 'biceps_day', name: 'Bicep Day', muscleGroup: 'Biceps', imagePath: require('../../assets/images/biceps-day.png') },
  { id: 'triceps_day', name: 'Tricep Day', muscleGroup: 'Triceps', imagePath: require('../../assets/images/triceps-day.png') },
  { id: 'legs_day', name: 'Leg Day', muscleGroup: 'Legs', imagePath: require('../../assets/images/leg-day.png') },
  { id: 'abs_day', name: 'Abs Day', muscleGroup: 'Abs', imagePath: require('../../assets/images/abs-day.png') },
];

// 3. The Full Quest Board
export const QUESTS: Quest[] = [
  {
    id: 'full_body_omega',
    title: 'Full Body Omega',
    description: 'Total system recalibration. Heavy compound movements for maximum efficiency.',
    targetMuscles: ['Chest', 'Back', 'Legs', 'Shoulders'],
    requiredExercises: ['full_body'],
    xpMultiplier: 2.0,
    attributeFocus: 'STR',
    icon: 'body',
    color: '#ffffff',
    imagePath: require('../../assets/images/full-body.png')
  },
  {
    id: 'push_day_alpha',
    title: 'Push Day Alpha',
    description: 'Target the anterior chain. Chest, Shoulders, and Triceps focus.',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    requiredExercises: ['push_day'],
    xpMultiplier: 1.5,
    attributeFocus: 'STR',
    icon: 'flame',
    color: '#10b981',
    imagePath: require('../../assets/images/push-day.png')
  },
  {
    id: 'pull_day_beta',
    title: 'Pull Day Beta',
    description: 'Master the posterior chain. Back and Bicep engagement.',
    targetMuscles: ['Back', 'Biceps'],
    requiredExercises: ['pull_day'],
    xpMultiplier: 1.5,
    attributeFocus: 'STR',
    icon: 'thunderstorm',
    color: '#3b82f6',
    imagePath: require('../../assets/images/pull-day.png')
  },
  {
    id: 'leg_day_reckoning',
    title: 'Leg Day Reckoning',
    description: 'Extreme heavy lifting. The foundation of power.',
    targetMuscles: ['Legs'],
    requiredExercises: ['legs_day'],
    xpMultiplier: 1.8,
    attributeFocus: 'STR',
    icon: 'barbell',
    color: '#ef4444',
    imagePath: require('../../assets/images/leg-day.png')
  },
  {
    id: 'chest_vanguard',
    title: 'Chest Vanguard',
    description: 'Isolated pectoral destruction protocol.',
    targetMuscles: ['Chest'],
    requiredExercises: ['chest_day'],
    xpMultiplier: 1.3,
    attributeFocus: 'STR',
    icon: 'shield',
    color: '#34d399',
    imagePath: require('../../assets/images/chest-day.png')
  },
  {
    id: 'back_protocol',
    title: 'Back Protocol',
    description: 'Build width and thickness in the lats.',
    targetMuscles: ['Back'],
    requiredExercises: ['back_day'],
    xpMultiplier: 1.4,
    attributeFocus: 'STR',
    icon: 'layers',
    color: '#6366f1',
    imagePath: require('../../assets/images/back-day.png')
  },
  {
    id: 'shoulder_garrison',
    title: 'Shoulder Garrison',
    description: 'Sculpt the deltoids for width and stability.',
    targetMuscles: ['Shoulders'],
    requiredExercises: ['shoulders_day'],
    xpMultiplier: 1.3,
    attributeFocus: 'STR',
    icon: 'triangle',
    color: '#a855f7',
    imagePath: require('../../assets/images/shoulders-day.png')
  },
  {
    id: 'bicep_initiative',
    title: 'Bicep Initiative',
    description: 'High rep volume for maximum arm hypertrophy.',
    targetMuscles: ['Biceps'],
    requiredExercises: ['biceps_day'],
    xpMultiplier: 1.2,
    attributeFocus: 'END',
    icon: 'fitness',
    color: '#fbbf24',
    imagePath: require('../../assets/images/biceps-day.png')
  },
  {
    id: 'tricep_overdrive',
    title: 'Tricep Overdrive',
    description: 'Lock out the elbows. Heavy tricep extension focus.',
    targetMuscles: ['Triceps'],
    requiredExercises: ['triceps_day'],
    xpMultiplier: 1.2,
    attributeFocus: 'END',
    icon: 'construct',
    color: '#f97316',
    imagePath: require('../../assets/images/triceps-day.png')
  },
  {
    id: 'core_stability',
    title: 'Core Stability',
    description: 'Midline stabilization and abdominal conditioning.',
    targetMuscles: ['Core'],
    requiredExercises: ['abs_day'],
    xpMultiplier: 1.3,
    attributeFocus: 'END',
    icon: 'scan',
    color: '#06b6d4',
    imagePath: require('../../assets/images/abs-day.png')
  }
];

// 4. Achievement System
export const BADGES: Badge[] = [
  { id: 'one_ton_club', name: '1-Ton Club', description: 'Move 1,000kg of iron in a single session.', icon: 'barbell', color: '#fbbf24' },
  { id: 'iron_vanguard', name: 'Iron Vanguard', description: 'Complete 10 Push Day operations.', icon: 'shield-checkmark', color: '#60a5fa' },
  { id: 'consistency_king', name: 'Relentless', description: 'Achieve a 7-day streak.', icon: 'flame', color: '#ef4444' }
];