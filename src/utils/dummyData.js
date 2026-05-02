// src/utils/dummyData.js

export const dummyUser = {
  id: "user_123",
  username: "Jason_D",
  level: 4,
  currentXP: 850,
  xpToNextLevel: 1000,
  bodyweight: 75, // kg
};

export const exerciseLibrary = [
  { id: "ex_1", name: "Barbell Bench Press", primaryMuscle: "Chest", type: "Compound", baseXP: 50 },
  { id: "ex_2", name: "Incline Dumbbell Press", primaryMuscle: "Chest", type: "Compound", baseXP: 40 },
  { id: "ex_3", name: "Tricep Pushdown", primaryMuscle: "Triceps", type: "Isolation", baseXP: 20 },
  { id: "ex_4", name: "Lateral Raise", primaryMuscle: "Shoulders", type: "Isolation", baseXP: 20 },
  { id: "ex_5", name: "Squat", primaryMuscle: "Legs", type: "Compound", baseXP: 60 },
];

export const dummyActiveWorkout = {
  id: "workout_001",
  name: "Push Day Alpha",
  date: new Date().toISOString(),
  exercises: [
    {
      exerciseId: "ex_1",
      name: "Barbell Bench Press",
      sets: [
        { setId: "s_1", reps: 8, weight: 60, completed: false },
        { setId: "s_2", reps: 8, weight: 60, completed: false },
        { setId: "s_3", reps: 6, weight: 65, completed: false },
      ]
    },
    {
      exerciseId: "ex_3",
      name: "Tricep Pushdown",
      sets: [
        { setId: "s_4", reps: 12, weight: 20, completed: false },
        { setId: "s_5", reps: 12, weight: 20, completed: false },
      ]
    }
  ]
};