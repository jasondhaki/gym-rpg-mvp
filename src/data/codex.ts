// src/data/codex.ts

// 1. Define the Data Structures
export type Archetype = 'Aesthetic' | 'Juggernaut' | 'Athlete';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Abs';
  subTarget: string;      
  instructions: string[]; 
  imagePath: any;         
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  targetMuscles: ('Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Abs')[];
  xpMultiplier: number;
  attributeFocus: 'STR' | 'END';
  icon: any;
  color: string;
  imagePath: any;
  // Which target archetypes see this quest on their board (Phase: Archetype Integration)
  archetypes: Archetype[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any; 
  color: string;
  // NEW: The Logic Gate for the Achievement Engine
  requirement: {
    field: 'str' | 'end' | 'level' | 'currentStreak' | 'lifetimeVolume' | 'restDaysUsed';
    value: number;
  };
}

// 2. The Complete 140-Exercise Bank
export const EXERCISES: Exercise[] = [
  // --- CHEST (20) ---
  { 
    id: 'ch_1', 
    name: 'Flat Barbell Bench Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Mid-Pectorals', 
    instructions: [
      'Lie flat on the bench and plant your feet firmly on the ground',
      'Grip the bar slightly wider than shoulder-width and unrack it over your chest',
      'Lower the bar slowly to your mid-chest while tucking your elbows slightly',
      'Press the bar back up until your arms are extended, exhaling on the way up'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_2', 
    name: 'Incline Barbell Bench Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Upper Pectorals', 
    instructions: [
      'Position yourself on a bench angled at 30 to 45 degrees',
      'Unrack the bar and hold it directly above your upper chest',
      'Lower the bar to your collarbone area in a controlled motion',
      'Drive the weight upward until your arms are straight'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_3', 
    name: 'Decline Barbell Bench Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Lower Pectorals', 
    instructions: [
      'Secure your feet at the end of the decline bench and lie back',
      'Grip the barbell and unrack it, holding it over your lower chest',
      'Lower the bar toward the bottom of your pectorals',
      'Press the bar back to the starting position while focusing on the lower chest squeeze'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_4', 
    name: 'Close-Grip Bench Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Inner Chest/Triceps', 
    instructions: [
      'Lie on a flat bench and grip the bar with hands shoulder-width apart',
      'Lower the bar to your mid-chest while keeping your elbows tucked close to your ribs',
      'Pause briefly when the bar touches your chest',
      'Forcefully press the bar up using your triceps and inner chest'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_5', 
    name: 'Barbell Floor Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Mid-Chest', 
    instructions: [
      'Lie on the floor with your knees bent and feet flat',
      'Unrack the barbell from a low rack or have a spotter assist you',
      'Lower the bar until your triceps touch the floor and pause for a second',
      'Press the bar back up to full extension'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_6', 
    name: 'Flat Dumbbell Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Mid-Pectorals', 
    instructions: [
      'Sit on a flat bench with dumbbells on your knees, then lie back and kick them up',
      'Position the dumbbells over your chest with palms facing forward',
      'Lower the weights until they are level with your chest',
      'Press them back up toward the center, squeezing your pecs at the top'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_7', 
    name: 'Incline Dumbbell Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Upper Pectorals', 
    instructions: [
      'Lie on an incline bench and hold the dumbbells above your shoulders',
      'Slowly lower the dumbbells toward your upper chest, keeping elbows out',
      'Feel the stretch in your upper pectorals at the bottom of the movement',
      'Press the weights up and together over your face'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_8', 
    name: 'Decline Dumbbell Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Lower Pectorals', 
    instructions: [
      'Secure your legs and lie back on a decline bench with dumbbells',
      'Start with weights at your chest, palms facing toward your feet',
      'Press the dumbbells straight up toward the ceiling',
      'Lower them back down to your chest in a slow, controlled arc'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_9', 
    name: 'Dumbbell Chest Fly', 
    muscleGroup: 'Chest', 
    subTarget: 'Outer Pectorals', 
    instructions: [
      'Lie on a flat bench with dumbbells held together above your chest',
      'Lower the weights out to your sides in a wide arc with a slight bend in your elbows',
      'Stop when you feel a deep stretch across your chest',
      'Reverse the motion to bring the weights back together as if hugging a tree'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_10', 
    name: 'Incline Dumbbell Fly', 
    muscleGroup: 'Chest', 
    subTarget: 'Upper Outer Chest', 
    instructions: [
      'Lie on an incline bench and hold the weights directly above your head',
      'Lower the dumbbells out to the sides while maintaining a fixed elbow angle',
      'Focus on the stretch in your upper chest fibers',
      'Squeeze your chest to pull the weights back to the starting point'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_11', 
    name: 'Dumbbell Pull-Over', 
    muscleGroup: 'Chest', 
    subTarget: 'Lower Chest/Serratus', 
    instructions: [
      'Lie across a bench with only your upper back supported',
      'Hold one dumbbell with both hands directly over your chest',
      'Slowly lower the weight behind your head while keeping your arms nearly straight',
      'Pull the weight back up to chest level using your chest and serratus'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_12', 
    name: 'Standing Cable Cross-over', 
    muscleGroup: 'Chest', 
    subTarget: 'Inner Chest', 
    instructions: [
      'Stand between two pulleys set to the highest notch and grab the handles',
      'Step forward and lean slightly, keeping a small bend in your elbows',
      'Bring your hands together in front of your waist in a sweeping motion',
      'Cross your hands slightly at the bottom and squeeze your inner pecs'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_13', 
    name: 'Low-to-High Cable Fly', 
    muscleGroup: 'Chest', 
    subTarget: 'Upper Chest', 
    instructions: [
      'Set the cable pulleys to the lowest position and grab the handles',
      'Start with your arms at your sides and palms facing forward',
      'Pull the handles upward and together until they are level with your face',
      'Lower back to the start with control to maintain tension on the upper chest'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_14', 
    name: 'High-to-Low Cable Fly', 
    muscleGroup: 'Chest', 
    subTarget: 'Lower Chest', 
    instructions: [
      'Set the pulleys to the highest position and stand slightly in front of the machine',
      'Bring the handles down and inward toward your hips',
      'Focus on squeezing the lower portion of your chest at the bottom',
      'Slowly return to the starting position without letting the weights crash'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_15', 
    name: 'Pec Deck Machine', 
    muscleGroup: 'Chest', 
    subTarget: 'Mid-Chest', 
    instructions: [
      'Sit on the machine with your back flat against the pad',
      'Place your forearms or hands on the pads/handles, keeping elbows at chest height',
      'Contract your chest to bring the handles together in the center',
      'Slowly return to the start until you feel a comfortable stretch'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_16', 
    name: 'Chest Press Machine', 
    muscleGroup: 'Chest', 
    subTarget: 'Mid-Chest', 
    instructions: [
      'Adjust the seat height so the handles are at mid-chest level',
      'Sit back and grab the handles with a firm overhand grip',
      'Press the handles forward until your arms are almost fully extended',
      'Lower the weight back toward your chest without letting it rest'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_17', 
    name: 'Hammer Strength Press', 
    muscleGroup: 'Chest', 
    subTarget: 'Pectorals', 
    instructions: [
      'Adjust the seat and sit with your chest up and shoulders back',
      'Grip the handles and drive them forward explosively',
      'Squeeze your chest hard at the peak of the movement',
      'Slowly lower the handles back until you feel a stretch in the pecs'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_18', 
    name: 'Standard Push-Ups', 
    muscleGroup: 'Chest', 
    subTarget: 'Chest/Shoulders', 
    instructions: [
      'Place your hands on the floor slightly wider than shoulder-width',
      'Keep your body in a straight line from head to heels',
      'Lower your chest until it almost touches the floor',
      'Push yourself back up to the starting position'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_19', 
    name: 'Incline Push-Ups', 
    muscleGroup: 'Chest', 
    subTarget: 'Lower Chest', 
    instructions: [
      'Place your hands on a stable bench or elevated surface',
      'Position your feet on the floor and maintain a straight body line',
      'Lower your chest toward the bench by bending your elbows',
      'Press back up until your arms are straight'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },
  { 
    id: 'ch_20', 
    name: 'Decline Push-Ups', 
    muscleGroup: 'Chest', 
    subTarget: 'Upper Chest', 
    instructions: [
      'Place your feet on a bench or elevated surface and hands on the floor',
      'Keep your core tight and your body straight',
      'Lower your head and chest toward the floor',
      'Push back up, focusing on using your upper chest fibers'
    ], 
    imagePath: require('../../assets/images/chest-day.png') 
  },

  // --- BACK (20) ---
  { 
    id: 'bk_1', 
    name: 'Pull-Ups', 
    muscleGroup: 'Back', 
    subTarget: 'Lats', 
    instructions: [
      'Grip the pull-up bar with hands slightly wider than shoulder-width, palms facing away',
      'Hang with arms fully extended and pull your shoulder blades down and back',
      'Pull your chest toward the bar by driving your elbows down toward your ribs',
      'Lower yourself slowly back to a dead hang to maintain control and tension'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_2', 
    name: 'Wide Lat Pulldown', 
    muscleGroup: 'Back', 
    subTarget: 'Outer Lats', 
    instructions: [
      'Sit at the machine and secure your thighs under the pads',
      'Grip the long bar at the outer bends with an overhand grip',
      'Leaning back slightly, pull the bar down to your upper chest while driving your elbows down',
      'Squeeze your lats at the bottom before slowly returning the bar to the top'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_3', 
    name: 'Close Lat Pulldown', 
    muscleGroup: 'Back', 
    subTarget: 'Inner Back', 
    instructions: [
      'Attach a V-bar handle to the pulldown machine and sit with feet braced',
      'Grasp the handles and lean back slightly to create a clear path for the bar',
      'Pull the handle toward your mid-chest, keeping your elbows tucked close to your body',
      'Squeeze your shoulder blades together and return to the starting position'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_4', 
    name: 'Behind-Neck Pulldown', 
    muscleGroup: 'Back', 
    subTarget: 'Upper Back', 
    instructions: [
      'Sit at the machine and grab the wide bar with an overhand grip',
      'Keep your torso upright and tuck your chin slightly forward',
      'Lower the bar to the base of your neck, focusing on your upper back contraction',
      'Control the weight as it rises back up to the starting position'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_5', 
    name: 'Straight-Arm Pulldown', 
    muscleGroup: 'Back', 
    subTarget: 'Lower Lats', 
    instructions: [
      'Stand facing the cable machine with a straight bar attached at the top',
      'Grip the bar and step back until your arms are extended and your lats are stretched',
      'Keeping your arms straight, pull the bar down to your thighs using only your back',
      'Exhale and squeeze your lats at the bottom before slowly raising the bar back up'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_6', 
    name: 'Single-Arm Pulldown', 
    muscleGroup: 'Back', 
    subTarget: 'Lats Isolation', 
    instructions: [
      'Attach a single handle and sit or kneel next to the machine',
      'Reach up and grab the handle with one hand, palm facing inward',
      'Pull the handle down toward your side, focusing on driving the elbow into your hip',
      'Slowly extend your arm back up to feel a deep stretch in the lat before switching'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_7', 
    name: 'Chin-Ups', 
    muscleGroup: 'Back', 
    subTarget: 'Lats/Biceps', 
    instructions: [
      'Grip the bar with palms facing toward you (underhand grip) at shoulder-width',
      'Start from a full hang and pull your body up until your chin is over the bar',
      'Keep your elbows tucked in front of you rather than flared to the sides',
      'Lower yourself with control until your arms are fully extended'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_8', 
    name: 'Barbell Row', 
    muscleGroup: 'Back', 
    subTarget: 'Back Thickness', 
    instructions: [
      'Hinge at your hips with a slight bend in the knees, keeping your back flat',
      'Grip the barbell with an overhand grip just wider than your knees',
      'Pull the bar toward your lower ribs or navel, driving your elbows back',
      'Squeeze your back at the top and lower the bar under control'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_9', 
    name: 'Single DB Row', 
    muscleGroup: 'Back', 
    subTarget: 'Lats', 
    instructions: [
      'Place one knee and one hand on a bench for support, keeping your back parallel to the floor',
      'Hold a dumbbell in the other hand with your arm hanging straight down',
      'Pull the dumbbell toward your hip, keeping your elbow close to your side',
      'Lower the weight until you feel a stretch in your lat, then repeat'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_10', 
    name: 'Seated Cable Row', 
    muscleGroup: 'Back', 
    subTarget: 'Mid-Back', 
    instructions: [
      'Sit with your feet on the platforms and knees slightly bent',
      'Grasp the handle and sit upright with your shoulders back and core engaged',
      'Pull the handle toward your abdomen while squeezing your shoulder blades together',
      'Return the handle slowly while avoiding leaning too far forward'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_11', 
    name: 'T-Bar Row', 
    muscleGroup: 'Back', 
    subTarget: 'Mid-Back', 
    instructions: [
      'Straddle the T-bar and grip the handles with both hands',
      'Hinge at the hips to lean forward, keeping your spine neutral',
      'Pull the weight toward your chest by retracting your shoulder blades',
      'Lower the weight slowly until your arms are fully extended'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_12', 
    name: 'Meadows Row', 
    muscleGroup: 'Back', 
    subTarget: 'Lower Lats', 
    instructions: [
      'Stand perpendicular to a landmine bar in a staggered stance',
      'Grip the thick end of the bar with one hand using an overhand grip',
      'Row the bar up toward your side, keeping your elbow flared slightly out',
      'Lower the bar to the starting point, focusing on the stretch in the outer lat'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_13', 
    name: 'Seal Row', 
    muscleGroup: 'Back', 
    subTarget: 'Upper Back', 
    instructions: [
      'Lie face down on an elevated flat bench with your body fully supported',
      'Grip the barbell or dumbbells hanging below the bench',
      'Row the weight up toward the bench, keeping your chest glued to the pad',
      'Focus on the contraction in the mid-to-upper back without using momentum'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_14', 
    name: 'Incline DB Row', 
    muscleGroup: 'Back', 
    subTarget: 'Upper Back', 
    instructions: [
      'Set a bench to a 45-degree incline and lie chest-down on it',
      'Hold a dumbbell in each hand and let them hang toward the floor',
      'Pull the dumbbells up toward your ribs, focusing on squeezing your shoulder blades',
      'Lower the weights slowly to ensure maximum tension on the upper back'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_15', 
    name: 'Deadlift', 
    muscleGroup: 'Back', 
    subTarget: 'Full Posterior Chain', 
    instructions: [
      'Stand with feet hip-width apart and the bar over your mid-foot',
      'Hinge at the hips and grip the bar, keeping your back flat and shins touching the bar',
      'Drive through your heels to lift the bar, keeping it close to your shins as you stand tall',
      'Lock out your hips at the top and lower the bar back down by hinging at the hips'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_16', 
    name: 'Rack Pulls', 
    muscleGroup: 'Back', 
    subTarget: 'Upper Back', 
    instructions: [
      'Set the safety pins in a power rack to just above or below knee height',
      'Position yourself as you would for a deadlift, gripping the bar firmly',
      'Pull the bar up by extending your hips and back until you are standing tall',
      'Lower the bar back onto the pins with a controlled descent'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_17', 
    name: 'Good Mornings', 
    muscleGroup: 'Back', 
    subTarget: 'Lower Back/Hamstrings', 
    instructions: [
      'Place a barbell across your upper traps and stand with feet shoulder-width apart',
      'Keeping your back flat, hinge at the hips to lower your torso toward the floor',
      'Go down until you feel a deep stretch in your hamstrings or until your torso is parallel',
      'Drive your hips forward to return to an upright position'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_18', 
    name: 'Hyperextensions', 
    muscleGroup: 'Back', 
    subTarget: 'Erector Spinae', 
    instructions: [
      'Position yourself on the back extension bench with your hips on the pad',
      'Cross your arms over your chest and lower your upper body by hinging at the waist',
      'Lift your torso back up until your body is in a straight line, avoiding overextending',
      'Squeeze your lower back and glutes at the top of the movement'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_19', 
    name: 'Machine Row', 
    muscleGroup: 'Back', 
    subTarget: 'Mid-Back', 
    instructions: [
      'Adjust the seat so your chest is firmly against the pad and you can reach the handles',
      'Grasp the handles and pull them toward you, driving your elbows back',
      'Hold the contraction for a second while squeezing your shoulder blades',
      'Slowly extend your arms back to the starting position without letting the weights touch'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },
  { 
    id: 'bk_20', 
    name: 'Face Pulls', 
    muscleGroup: 'Back', 
    subTarget: 'Rear Delts/Upper Back', 
    instructions: [
      'Set the cable pulley to eye level and attach a rope handle',
      'Grasp the ends of the rope and step back to create tension',
      'Pull the rope toward your forehead, pulling the ends apart as you reach your face',
      'Squeeze your rear delts and upper back before slowly releasing the tension'
    ], 
    imagePath: require('../../assets/images/back-day.png') 
  },

  // --- LEGS (20) ---
  { 
    id: 'lg_1', 
    name: 'Back Squat', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads/Glutes', 
    instructions: [
      'Rest the barbell across your upper traps and stand with feet shoulder-width apart',
      'Brace your core and descend by sitting your hips back and bending your knees',
      'Lower yourself until your thighs are at least parallel to the floor while keeping your chest up',
      'Drive through your heels to return to a standing position, exhaling as you rise'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_2', 
    name: 'Front Squat', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads', 
    instructions: [
      'Rest the bar across the front of your shoulders, keeping your elbows high and parallel to the floor',
      'Set your feet shoulder-width apart and keep your torso as vertical as possible',
      'Squat down deep while ensuring your elbows do not drop toward your knees',
      'Drive upward through the mid-foot, maintaining a proud chest throughout the lift'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_3', 
    name: 'Goblet Squat', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads', 
    instructions: [
      'Hold a dumbbell or kettlebell against your chest with both hands under the top "bell"',
      'Position your feet slightly wider than shoulder-width with toes pointed slightly out',
      'Squat down until your elbows touch the inside of your knees, keeping your back flat',
      'Push through the floor to stand back up, squeezing your glutes at the top'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_4', 
    name: 'Hack Squat', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads', 
    instructions: [
      'Position your back against the sled pads and place your feet shoulder-width on the platform',
      'Disengage the safety handles and slowly lower the sled by bending your knees',
      'Stop when your thighs form a 90-degree angle, ensuring your lower back stays against the pad',
      'Press the weight back up forcefully without locking your knees at the top'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_5', 
    name: 'Leg Press', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads/Glutes', 
    instructions: [
      'Sit on the machine and place your feet hip-width apart in the center of the platform',
      'Lower the platform slowly toward your chest until your knees are at a 90-degree angle',
      'Ensure your lower back remains pressed firmly against the seat at all times',
      'Push the platform away using your entire foot, stopping just before your knees lock'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_6', 
    name: 'Bulgarian Split Squat', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads/Glutes', 
    instructions: [
      'Stand a few feet in front of a bench and place the top of your rear foot on it',
      'Lower your hips until your front thigh is parallel to the floor and your rear knee nearly touches the ground',
      'Keep your torso upright for quad focus or lean slightly forward for more glute engagement',
      'Drive through your front heel to return to the starting position'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_7', 
    name: 'Walking Lunges', 
    muscleGroup: 'Legs', 
    subTarget: 'Glutes/Quads', 
    instructions: [
      'Step forward with one leg and lower your hips until both knees are bent at 90 degrees',
      'Keep your front knee aligned over your ankle and your back knee hovering off the floor',
      'Drive through the front foot to stand up and immediately step forward with the trailing leg',
      'Maintain a tight core and steady balance as you progress forward'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_8', 
    name: 'Reverse Lunges', 
    muscleGroup: 'Legs', 
    subTarget: 'Glutes', 
    instructions: [
      'Stand tall with feet hip-width apart and take a large step backward with one leg',
      'Lower your back knee toward the floor while keeping your front shin vertical',
      'Pause for a second at the bottom to feel the stretch in your hip and glute',
      'Push off your back foot to return to the starting position and switch legs'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_9', 
    name: 'Step-Ups', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads', 
    instructions: [
      'Place one foot entirely on a stable box or bench that is at knee height',
      'Drive through the heel of the elevated foot to lift your body onto the platform',
      'Avoid "cheating" by pushing off the floor with your trailing foot',
      'Lower yourself back down slowly and with control to the starting position'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_10', 
    name: 'Romanian Deadlift', 
    muscleGroup: 'Legs', 
    subTarget: 'Hamstrings', 
    instructions: [
      'Hold a barbell at your hips and stand with feet hip-width apart and knees slightly bent',
      'Hinge at the hips to lower the bar toward your mid-shins, keeping the bar close to your legs',
      'Maintain a flat back and stop when you feel a deep stretch in your hamstrings',
      'Drive your hips forward to return to an upright position and squeeze your glutes'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_11', 
    name: 'Lying Leg Curl', 
    muscleGroup: 'Legs', 
    subTarget: 'Hamstrings', 
    instructions: [
      'Lie face down on the machine with the padded lever resting just above your heels',
      'Grip the handles and curl your legs toward your glutes in a smooth motion',
      'Keep your hips pressed firmly into the pad to avoid using your lower back',
      'Slowly lower the weight back to the starting position, maintaining tension on the hamstrings'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_12', 
    name: 'Seated Leg Curl', 
    muscleGroup: 'Legs', 
    subTarget: 'Hamstrings', 
    instructions: [
      'Sit in the machine and adjust the lap pad so it is snug against your thighs',
      'Place your legs over the padded lever and pull your heels down toward the seat',
      'Squeeze your hamstrings hard at the bottom of the movement',
      'Control the weight as you allow your legs to return to the extended position'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_13', 
    name: 'Glute Ham Raise', 
    muscleGroup: 'Legs', 
    subTarget: 'Hamstrings/Glutes', 
    instructions: [
      'Secure your feet in the machine and start with your knees on the pad and torso upright',
      'Lower your torso forward slowly until your body is parallel to the floor',
      'Pull yourself back up by contracting your hamstrings and glutes',
      'Keep your core tight and avoid breaking at the hips during the ascent'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_14', 
    name: 'Hip Thrust', 
    muscleGroup: 'Legs', 
    subTarget: 'Glutes', 
    instructions: [
      'Sit on the floor with your upper back against a bench and a barbell over your hips',
      'Drive through your heels to lift your hips until they are in line with your knees and shoulders',
      'Tuck your chin and squeeze your glutes hard at the top of the movement',
      'Lower your hips back toward the floor with control and repeat'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_15', 
    name: 'KB Swings', 
    muscleGroup: 'Legs', 
    subTarget: 'Hamstrings', 
    instructions: [
      'Stand with feet wider than shoulder-width and hinge at the hips to grab the kettlebell',
      'Swing the bell between your legs, then snap your hips forward to drive it to chest height',
      'Keep your arms straight and let the momentum come entirely from your posterior chain',
      'Allow the weight to fall back between your legs while hinging at the hips for the next rep'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_16', 
    name: 'Leg Extension', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads Isolation', 
    instructions: [
      'Sit on the machine with the pad resting on your lower shins, just above the ankles',
      'Extend your legs fully until they are straight, focusing on the quad contraction',
      'Pause and squeeze at the top for a second',
      'Lower the weight slowly to the start, ensuring the plates don\'t crash together'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_17', 
    name: 'Sissy Squat', 
    muscleGroup: 'Legs', 
    subTarget: 'Quads', 
    instructions: [
      'Stand with feet hip-width apart and hold onto a rack or wall for balance if needed',
      'Lean your torso back while pushing your knees forward and rising onto your toes',
      'Lower your body until your knees nearly touch the floor, maintaining a straight line from knees to head',
      'Engage your quads to pull yourself back to an upright standing position'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_18', 
    name: 'Standing Calf Raise', 
    muscleGroup: 'Legs', 
    subTarget: 'Gastrocnemius', 
    instructions: [
      'Stand on the edge of a platform with the balls of your feet and your heels hanging off',
      'Lower your heels as far as possible to feel a deep stretch in your calves',
      'Press through the balls of your feet to raise your body as high as you can',
      'Squeeze the calves at the top before slowly lowering for the next rep'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_19', 
    name: 'Seated Calf Raise', 
    muscleGroup: 'Legs', 
    subTarget: 'Soleus', 
    instructions: [
      'Sit on the machine and place the balls of your feet on the platform with the pads on your thighs',
      'Drop your heels below the platform to a full stretch',
      'Push up through your toes to lift the weight as high as possible',
      'Lower back down under control to maximize the time under tension'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },
  { 
    id: 'lg_20', 
    name: 'Donkey Calf Raise', 
    muscleGroup: 'Legs', 
    subTarget: 'Calves', 
    instructions: [
      'Bend forward at the waist and rest your forearms on a stable surface or machine pad',
      'Place the balls of your feet on a block and let your heels hang off',
      'Rise up onto your toes as high as possible, contracting your calves',
      'Lower your heels slowly until you feel a complete stretch in the calf muscles'
    ], 
    imagePath: require('../../assets/images/leg-day.png') 
  },

  // --- SHOULDERS (20) ---
  { 
    id: 'sh_1', 
    name: 'Barbell OHP', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Front Delts', 
    instructions: [
      'Stand with feet shoulder-width apart and grip the bar just outside your shoulders',
      'Rest the bar on your upper chest, brace your core, and squeeze your glutes',
      'Press the bar directly overhead until your arms are fully extended',
      'Lower the bar back to your chest with control, keeping your elbows slightly forward'
    ], 
    imagePath: require('../../assets/images/OverheadPress.png') 
  },
  { 
    id: 'sh_2', 
    name: 'Dumbbell Press', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Front Delts', 
    instructions: [
      'Sit on a bench with back support and hold dumbbells at shoulder height with palms facing forward',
      'Press the weights upward in a slight arc until they nearly touch above your head',
      'Avoid locking your elbows at the top to maintain tension on the deltoids',
      'Slowly lower the dumbbells back to the starting position at ear level'
    ], 
    imagePath: require('../../assets/images/OverheadPress.png') 
  },
  { 
    id: 'sh_3', 
    name: 'Arnold Press', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Front/Side Delts', 
    instructions: [
      'Sit upright and hold dumbbells in front of your chest with palms facing you',
      'As you press the weights up, rotate your wrists so your palms face forward at the top',
      'Reverse the rotation as you lower the weights back to the starting position',
      'Keep the movement fluid and avoid letting the weights drop too quickly'
    ], 
    imagePath: require('../../assets/images/OverheadPress.png') 
  },
  { 
    id: 'sh_4', 
    name: 'Push Press', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Delts/Power', 
    instructions: [
      'Start in a standard overhead press position with the bar on your upper chest',
      'Perform a quick "dip" by bending your knees slightly, keeping your torso upright',
      'Explosively drive through your legs to help propel the bar overhead',
      'Lower the bar slowly to your chest to catch the weight before the next rep'
    ], 
    imagePath: require('../../assets/images/OverheadPress.png') 
  },
  { 
    id: 'sh_5', 
    name: 'Machine Press', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Delts Isolation', 
    instructions: [
      'Adjust the seat so the handles are at shoulder height',
      'Grip the handles and press upward until your arms are extended',
      'Focus on keeping your back flat against the pad throughout the movement',
      'Lower the handles slowly until you feel a stretch in your shoulders'
    ], 
    imagePath: require('../../assets/images/OverheadPress.png') 
  },
  { 
    id: 'sh_6', 
    name: 'Landmine Press', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Front Delts', 
    instructions: [
      'Stand with feet shoulder-width apart, holding the end of the landmine bar at one shoulder',
      'Lean slightly forward and press the bar up and forward at a 45-degree angle',
      'Extend your arm fully and squeeze your shoulder at the peak',
      'Lower the bar back to your shoulder with control'
    ], 
    imagePath: require('../../assets/images/OverheadPress.png') 
  },
  { 
    id: 'sh_7', 
    name: 'DB Lateral Raise', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Side Delts', 
    instructions: [
      'Stand tall with dumbbells at your sides and a slight bend in your elbows',
      'Raise the weights out to your sides until your arms are parallel to the floor',
      'Lead the movement with your elbows and keep your pinkies slightly higher than your thumbs',
      'Lower the weights slowly, stopping just before they touch your thighs'
    ], 
    imagePath: require('../../assets/images/LateralRaises.png') 
  },
  { 
    id: 'sh_8', 
    name: 'Cable Lateral Raise', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Side Delts', 
    instructions: [
      'Set a low pulley and stand sideways to the machine, holding the handle with the far hand',
      'Raise your arm out to the side until it reaches shoulder height',
      'Maintain a slight bend in the elbow to protect the joint',
      'Control the weight as the cable pulls your arm back across your body'
    ], 
    imagePath: require('../../assets/images/LateralRaises.png') 
  },
  { 
    id: 'sh_9', 
    name: 'Leaning Lat Raise', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Side Delts', 
    instructions: [
      'Hold a stable post or rack with one hand and lean your body away at an angle',
      'Hold a dumbbell in the other hand, letting it hang straight down',
      'Raise the dumbbell out to the side until your arm is parallel to the ground',
      'Lower the weight slowly, utilizing the increased range of motion from the lean'
    ], 
    imagePath: require('../../assets/images/LateralRaises.png') 
  },
  { 
    id: 'sh_10', 
    name: 'Machine Lateral Raise', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Side Delts', 
    instructions: [
      'Sit in the machine and place your outer arms against the pads',
      'Push the pads outward and upward using your side delts',
      'Pause at the top for a second to maximize the contraction',
      'Slowly return to the start position without letting the weight stack crash'
    ], 
    imagePath: require('../../assets/images/LateralRaises.png') 
  },
  { 
    id: 'sh_11', 
    name: 'Upright Row', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Side Delts/Traps', 
    instructions: [
      'Hold a barbell or EZ-bar with an overhand grip, hands slightly narrower than shoulder-width',
      'Pull the bar straight up toward your chin, keeping it close to your body',
      'Drive your elbows toward the ceiling, ensuring they stay higher than your wrists',
      'Lower the bar slowly until your arms are fully extended'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_12', 
    name: 'DB Front Raise', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Front Delts', 
    instructions: [
      'Stand with dumbbells resting on the front of your thighs, palms facing you',
      'Raise the weights straight in front of you until they are at eye level',
      'Keep your core tight to prevent your body from swinging for momentum',
      'Lower the weights slowly back to your thighs'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_13', 
    name: 'BB Front Raise', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Front Delts', 
    instructions: [
      'Grip a barbell with an overhand grip and rest it against your thighs',
      'Lift the bar forward and upward until it is slightly above shoulder height',
      'Maintain a slight bend in your knees and a neutral spine',
      'Control the descent to ensure the front delts do all the work'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_14', 
    name: 'Cable Front Raise', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Front Delts', 
    instructions: [
      'Attach a straight bar to a low pulley and stand facing away from the machine',
      'Grip the bar between your legs and raise it forward to eye level',
      'Exhale as you lift and maintain a slight bend in the elbows',
      'Slowly lower the bar back toward the pulley, keeping tension on the shoulders'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_15', 
    name: 'DB Rear Delt Fly', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Rear Delts', 
    instructions: [
      'Hinge at the hips until your torso is nearly parallel to the floor, keeping your back flat',
      'Hold dumbbells with palms facing each other and a slight bend in the elbows',
      'Raise the weights out to the sides by squeezing your rear delts and shoulder blades',
      'Lower the weights slowly, avoiding the urge to use momentum'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_16', 
    name: 'Face Pulls', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Rear Delts', 
    instructions: [
      'Attach a rope to a cable pulley at eye level and grip the ends with palms facing in',
      'Pull the rope toward your face, pulling the ends apart toward your ears',
      'Squeeze your rear delts and rotate your wrists so your thumbs point backward at the end',
      'Slowly return to the start, feeling the stretch in your upper back'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_17', 
    name: 'Reverse Pec Deck', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Rear Delts', 
    instructions: [
      'Sit facing the machine pad and grip the handles with your arms extended',
      'Pull the handles back in a wide arc until your arms are in line with your shoulders',
      'Focus on using the back of your shoulders rather than your mid-back',
      'Return to the start position slowly to keep the rear delts under tension'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_18', 
    name: 'High Cable Rear Pull', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Rear Delts', 
    instructions: [
      'Set two high pulleys and grab the left cable with your right hand and vice-versa',
      'Pull your arms back and down diagonally across your body',
      'Squeeze your rear delts at the bottom of the movement',
      'Allow the cables to pull your arms back to the starting "X" position with control'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_19', 
    name: 'Barbell Shrugs', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Traps', 
    instructions: [
      'Hold a barbell with an overhand grip in front of your thighs',
      'Lift your shoulders straight up toward your ears as high as possible',
      'Hold the squeeze at the top for a second, then lower back down',
      'Avoid rolling your shoulders; the movement should be strictly vertical'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },
  { 
    id: 'sh_20', 
    name: 'Dumbbell Shrugs', 
    muscleGroup: 'Shoulders', 
    subTarget: 'Traps', 
    instructions: [
      'Hold a dumbbell in each hand at your sides with palms facing your body',
      'Shrug your shoulders upward while keeping your arms straight',
      'Squeeze your traps at the peak of the movement',
      'Slowly lower the weights back to the starting position'
    ], 
    imagePath: require('../../assets/images/shoulders-day.png') 
  },

  // --- BICEPS (20) ---
  { 
    id: 'bi_1', 
    name: 'Barbell Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Biceps Brachii', 
    instructions: [
      'Stand with feet shoulder-width apart and grip the barbell with an underhand grip',
      'Keep your elbows pinned to your sides and curl the bar toward your shoulders',
      'Squeeze your biceps hard at the top of the movement',
      'Lower the bar slowly to the starting position, ensuring full arm extension'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_2', 
    name: 'EZ-Bar Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Inner/Outer Head', 
    instructions: [
      'Hold the EZ-bar on the outer angled grips to reduce wrist strain',
      'Curl the weight toward your chest while keeping your upper arms stationary',
      'Focus on the contraction at the peak of the lift',
      'Lower the weight with control, resisting the pull of gravity'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_3', 
    name: 'Preacher Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Lower Biceps', 
    instructions: [
      'Sit at the preacher bench and rest your arms firmly against the slanted pad',
      'Grip the bar and lower it until your arms are nearly fully extended',
      'Curl the bar up toward your chin without lifting your elbows off the pad',
      'Lower the weight slowly to maintain tension on the lower bicep fibers'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_4', 
    name: 'Reverse Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Brachialis', 
    instructions: [
      'Grip the barbell with an overhand (palms down) grip',
      'Curl the bar upward while keeping your wrists straight and elbows tucked',
      'Feel the engagement in your forearms and the brachialis muscle',
      'Lower back down under control to the starting position'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_5', 
    name: 'Spider Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Bicep Peak', 
    instructions: [
      'Lie face down on an incline bench with your chest supported and arms hanging straight down',
      'Curl the bar upward, ensuring your upper arms remain vertical throughout',
      'Squeeze hard at the top where the tension is highest',
      'Slowly lower the bar back to a dead hang'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_6', 
    name: 'Close Grip Curl', 
    muscleGroup: 'Biceps', 
    subTarget: 'Outer Head', 
    instructions: [
      'Grip the barbell with hands closer than shoulder-width apart',
      'Curl the bar toward your chest, keeping your elbows slightly flared if natural',
      'Focus on the outer portion of the bicep during the contraction',
      'Slowly extend your arms back to the bottom'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_7', 
    name: 'Wide Grip Curl', 
    muscleGroup: 'Biceps', 
    subTarget: 'Inner Head', 
    instructions: [
      'Grip the barbell with hands wider than shoulder-width apart',
      'Curl the weight up while keeping your elbows tucked close to your torso',
      'Emphasize the squeeze on the inner head of the bicep at the top',
      'Lower the bar with a controlled tempo'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_8', 
    name: 'Alt DB Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Full Biceps', 
    instructions: [
      'Hold a dumbbell in each hand at your sides with palms facing your body',
      'Curl one arm at a time, rotating your palm upward (supinating) as you lift',
      'Squeeze the bicep at the shoulder and rotate back as you lower the weight',
      'Repeat with the opposite arm, maintaining a stable core'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_9', 
    name: 'Hammer Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Brachioradialis', 
    instructions: [
      'Hold dumbbells with a neutral grip (palms facing each other)',
      'Curl the weights toward your shoulders like you are swinging a hammer',
      'Keep your wrists stiff and avoid any swinging of the torso',
      'Lower the weights slowly to feel the tension in the forearms and outer biceps'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_10', 
    name: 'Incline DB Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Long Head', 
    instructions: [
      'Lie back on an incline bench (45 degrees) with dumbbells hanging straight down',
      'Keeping your elbows locked in place behind your torso, curl the weights up',
      'Feel the intense stretch in the biceps at the bottom of each rep',
      'Lower the weights fully before starting the next contraction'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_11', 
    name: 'Concentration Curl', 
    muscleGroup: 'Biceps', 
    subTarget: 'Bicep Peak', 
    instructions: [
      'Sit on a bench and rest the back of your upper arm against the inside of your thigh',
      'Curl the dumbbell toward your shoulder, focusing on isolating the bicep',
      'Hold the peak contraction for a second to emphasize the "mountain" of the muscle',
      'Lower the weight completely and repeat for the desired reps'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_12', 
    name: 'Zottman Curl', 
    muscleGroup: 'Biceps', 
    subTarget: 'Forearms', 
    instructions: [
      'Perform a standard dumbbell curl with palms facing up as you lift',
      'At the top of the movement, rotate your wrists so your palms face down',
      'Lower the weight with this overhand grip to target the forearms',
      'Rotate your wrists back to the starting position at the bottom'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_13', 
    name: 'Cross Body Hammer', 
    muscleGroup: 'Biceps', 
    subTarget: 'Brachialis', 
    instructions: [
      'Hold a dumbbell with a neutral grip at your side',
      'Curl the weight across your chest toward the opposite shoulder',
      'Keep the dumbbell close to your body throughout the movement',
      'Lower back to the side and switch arms'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_14', 
    name: 'DB Preacher Curl', 
    muscleGroup: 'Biceps', 
    subTarget: 'Lower Biceps', 
    instructions: [
      'Place one arm on a preacher bench and hold a dumbbell with an underhand grip',
      'Lower the weight until your arm is fully extended against the pad',
      'Curl the weight toward your shoulder while keeping your shoulder down',
      'Control the descent to maximize muscle fiber recruitment'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_15', 
    name: 'Cable Curls', 
    muscleGroup: 'Biceps', 
    subTarget: 'Constant Tension', 
    instructions: [
      'Attach a straight or EZ-bar to a low pulley and grip with an underhand grip',
      'Curl the bar toward your chest, keeping your elbows tucked',
      'Benefit from the constant resistance of the cable throughout the range of motion',
      'Slowly return to the start, resisting the pull of the machine'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_16', 
    name: 'High Cable Curl', 
    muscleGroup: 'Biceps', 
    subTarget: 'Short Head', 
    instructions: [
      'Stand between two high pulleys and grab the handles with an underhand grip',
      'Extend your arms out to the sides in a "T" shape, parallel to the floor',
      'Curl your hands toward your ears, squeezing your biceps as if doing a pose',
      'Extend your arms back out slowly to the starting position'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_17', 
    name: 'Rope Hammer Curl', 
    muscleGroup: 'Biceps', 
    subTarget: 'Brachioradialis', 
    instructions: [
      'Attach a rope to a low pulley and hold the ends with a neutral grip',
      'Curl the rope upward, pulling the ends apart at the top of the movement',
      'Focus on the squeeze in the outer bicep and forearm',
      'Lower with control to maintain tension'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_18', 
    name: 'Behind Back Cable', 
    muscleGroup: 'Biceps', 
    subTarget: 'Long Head', 
    instructions: [
      'Attach a handle to a low pulley and stand facing away from the machine',
      'Hold the handle with your arm starting behind your body to stretch the bicep',
      'Curl the handle forward and up while keeping your elbow pinned back',
      'Lower back to the stretched position with a slow tempo'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_19', 
    name: 'Machine Curl', 
    muscleGroup: 'Biceps', 
    subTarget: 'Biceps Isolation', 
    instructions: [
      'Adjust the seat and arm pads so your elbows align with the machine’s pivot point',
      'Grip the handles and curl upward in a smooth arc',
      'Squeeze the biceps at the top and avoid letting the weight stack crash',
      'Focus on the eccentric (lowering) phase for maximum growth'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },
  { 
    id: 'bi_20', 
    name: 'Chin-Ups', 
    muscleGroup: 'Biceps', 
    subTarget: 'Biceps Strength', 
    instructions: [
      'Grip the pull-up bar with an underhand grip at shoulder-width',
      'Pull your body up until your chin is over the bar, focusing on using your arms',
      'Keep your elbows in front of you to emphasize bicep recruitment',
      'Lower yourself slowly back to a full hang'
    ], 
    imagePath: require('../../assets/images/biceps-day.png') 
  },

  // --- TRICEPS (20) ---
  { 
    id: 'tri_1', 
    name: 'Rope Pushdowns', 
    muscleGroup: 'Triceps', 
    subTarget: 'Lateral Head', 
    instructions: [
      'Attach a rope handle to a high pulley and grasp it with a neutral grip',
      'Keep your elbows tucked into your sides and push the handles down toward your thighs',
      'Flare the ends of the rope outward at the bottom to maximize the triceps contraction',
      'Slowly return the rope to chest height, keeping your upper arms stationary'
    ], 
    imagePath: require('../../assets/images/TricepPushdown.png') 
  },
  { 
    id: 'tri_2', 
    name: 'Straight Bar Pushdowns', 
    muscleGroup: 'Triceps', 
    subTarget: 'Long Head', 
    instructions: [
      'Grip a straight bar attached to a high pulley with an overhand grip',
      'Brace your core and push the bar down until your arms are fully locked',
      'Squeeze your triceps hard at the bottom for a full second',
      'Control the ascent, stopping when your forearms are just above parallel to the floor'
    ], 
    imagePath: require('../../assets/images/TricepPushdown.png') 
  },
  { 
    id: 'tri_3', 
    name: 'V-Bar Pushdowns', 
    muscleGroup: 'Triceps', 
    subTarget: 'Triceps General', 
    instructions: [
      'Use the V-bar attachment and stand close to the cable machine',
      'Place your palms on the angled grips and push downward with your elbows pinned',
      'Focus on driving the weight through the palms of your hands',
      'Maintain a slight forward lean to allow for a full range of motion'
    ], 
    imagePath: require('../../assets/images/TricepPushdown.png') 
  },
  { 
    id: 'tri_4', 
    name: 'Single Arm Cable Ext', 
    muscleGroup: 'Triceps', 
    subTarget: 'Isolation', 
    instructions: [
      'Grip a single handle (or the cable itself) with one hand',
      'Position your elbow close to your body and extend your arm fully toward the floor',
      'Focus on the mind-muscle connection as you isolate one tricep at a time',
      'Switch arms and repeat, ensuring equal intensity on both sides'
    ], 
    imagePath: require('../../assets/images/TricepPushdown.png') 
  },
  { 
    id: 'tri_5', 
    name: 'Overhead Rope Ext', 
    muscleGroup: 'Triceps', 
    subTarget: 'Long Head', 
    instructions: [
      'Attach a rope to a high pulley, face away from the machine, and hold the rope behind your head',
      'Lean forward slightly and step out to create tension on the cable',
      'Extend your arms forward and upward until they are straight',
      'Slowly lower the rope back behind your head to feel a deep stretch in the long head'
    ], 
    imagePath: require('../../assets/images/TricepPushdown.png') 
  },
  { 
    id: 'tri_6', 
    name: 'Cable Kickback', 
    muscleGroup: 'Triceps', 
    subTarget: 'Medial Head', 
    instructions: [
      'Set the pulley to hip height and remove any handle to grip the cable directly',
      'Hinge at the hips so your torso is almost parallel to the floor',
      'Keep your upper arm glued to your side and extend the cable straight back behind your hip',
      'Pause and squeeze at the peak before slowly returning to the start'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_7', 
    name: 'Reverse Pushdown', 
    muscleGroup: 'Triceps', 
    subTarget: 'Medial Head', 
    instructions: [
      'Grip a straight bar with an underhand grip (palms facing up)',
      'Push the bar down toward your thighs while keeping your elbows stationary',
      'Focus on the medial head contraction at the bottom of the movement',
      'Return to the top slowly, maintaining tension throughout the arc'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_8', 
    name: 'Skull Crushers', 
    muscleGroup: 'Triceps', 
    subTarget: 'Long Head', 
    instructions: [
      'Lie on a flat bench and hold an EZ-bar or barbell directly over your shoulders',
      'Hinge only at the elbows to lower the bar toward your forehead or slightly behind your head',
      'Keep your elbows tucked in and avoid letting them flare out to the sides',
      'Extend your arms back to the starting position using only your triceps'
    ], 
    imagePath: require('../../assets/images/Skullcrushers.png') 
  },
  { 
    id: 'tri_9', 
    name: 'Diamond Pushups', 
    muscleGroup: 'Triceps', 
    subTarget: 'Internal Strength', 
    instructions: [
      'Get into a plank position and place your hands together so your index fingers and thumbs form a diamond',
      'Lower your chest toward your hands while keeping your elbows tucked close to your ribs',
      'Push back up explosively, focusing on the squeeze in your triceps and inner chest',
      'Maintain a straight line from your head to your heels throughout the set'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_10', 
    name: 'Close Grip Bench', 
    muscleGroup: 'Triceps', 
    subTarget: 'Tricep Mass', 
    instructions: [
      'Lie on a bench and grip the barbell with hands roughly shoulder-width apart',
      'Lower the bar to your lower chest while keeping your elbows tucked into your sides',
      'Press the bar back up forcefully, emphasizing the triceps lock-out',
      'Ensure the bar path remains consistent to protect your wrists and elbows'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_11', 
    name: 'JM Press', 
    muscleGroup: 'Triceps', 
    subTarget: 'Tricep Power', 
    instructions: [
      'Lie on a bench and hold a barbell as you would for a close-grip bench press',
      'Lower the bar toward your neck or chin by hinging at the elbows and letting them flare slightly',
      'Stop when your forearms touch your biceps',
      'Press the bar back up in a straight line, driving through your triceps'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_12', 
    name: 'Barbell Overhead Ext', 
    muscleGroup: 'Triceps', 
    subTarget: 'Long Head', 
    instructions: [
      'Stand or sit and press a barbell directly overhead with a narrow grip',
      'Lower the bar behind your head by bending your elbows, keeping your upper arms vertical',
      'Lower until you feel a deep stretch in your triceps',
      'Extend your arms back to the overhead position, avoiding any arching of the back'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_13', 
    name: 'Seated DB Ext', 
    muscleGroup: 'Triceps', 
    subTarget: 'Mass', 
    instructions: [
      'Sit on a bench with back support and hold one heavy dumbbell with both hands overhead',
      'Lower the dumbbell behind your neck in a controlled arc',
      'Keep your elbows as close to your head as possible during the movement',
      'Press the weight back to the ceiling until your arms are fully extended'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_14', 
    name: 'Single DB Ext', 
    muscleGroup: 'Triceps', 
    subTarget: 'Isolation', 
    instructions: [
      'Hold a dumbbell in one hand and extend it directly above your shoulder',
      'Lower the weight behind your head while using your free hand to stabilize your active elbow',
      'Press the dumbbell back to the start, focusing on the triceps contraction',
      'Complete the reps and switch to the other arm'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_15', 
    name: 'DB Kickback', 
    muscleGroup: 'Triceps', 
    subTarget: 'Lateral Head', 
    instructions: [
      'Place one hand and knee on a bench for support, holding a dumbbell in the other hand',
      'Raise your elbow until your upper arm is parallel to the floor',
      'Extend your arm back until it is straight, squeezing the tricep at the top',
      'Slowly lower the weight back to the starting position without moving your elbow'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_16', 
    name: 'Tate Press', 
    muscleGroup: 'Triceps', 
    subTarget: 'Lateral Head', 
    instructions: [
      'Lie on a flat bench and hold two dumbbells directly over your chest with palms facing your feet',
      'Lower the dumbbells toward your chest by flaring your elbows out to the sides',
      'The dumbbells should touch your chest lightly near your collarbone',
      'Press the weights back up using only your triceps, keeping the elbows out'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_17', 
    name: 'Parallel Bar Dips', 
    muscleGroup: 'Triceps', 
    subTarget: 'Lower Triceps', 
    instructions: [
      'Grip the parallel bars and lift yourself to the starting position with arms extended',
      'Keep your torso as upright as possible to shift the focus from chest to triceps',
      'Lower yourself until your elbows are at a 90-degree angle, keeping them tucked close to your body',
      'Push yourself back up forcefully to the starting position'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_18', 
    name: 'Bench Dips', 
    muscleGroup: 'Triceps', 
    subTarget: 'Medial Head', 
    instructions: [
      'Place your hands on the edge of a bench and extend your legs out in front of you',
      'Lower your hips toward the floor by bending your elbows',
      'Keep your back close to the bench throughout the movement',
      'Press back up until your arms are straight, squeezing the triceps at the top'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_19', 
    name: 'Weighted Machine Dip', 
    muscleGroup: 'Triceps', 
    subTarget: 'Mass', 
    instructions: [
      'Sit in the machine and secure your lap under the pads',
      'Grip the handles and push them straight down toward the floor',
      'Focus on keeping your shoulders down and your triceps doing the work',
      'Slowly allow the handles to return to the starting position'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },
  { 
    id: 'tri_20', 
    name: 'Katana Extensions', 
    muscleGroup: 'Triceps', 
    subTarget: 'Long Head', 
    instructions: [
      'Set a cable pulley to chest height and stand sideways to it, holding the handle with the far hand',
      'Pull the handle behind your head as if drawing a sword (katana)',
      'Extend your arm diagonally upward across your body',
      'Slowly return the handle behind your head, feeling the deep stretch in the long head'
    ], 
    imagePath: require('../../assets/images/triceps-day.png') 
  },

  // --- ABS (20) ---
  { 
    id: 'ab_1', 
    name: 'Crunches', 
    muscleGroup: 'Abs', 
    subTarget: 'Upper Abs', 
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor',
      'Place your hands lightly behind your head or crossed over your chest',
      'Curl your upper body toward your knees, lifting only your shoulder blades off the floor',
      'Exhale and squeeze your abs at the top before slowly lowering back down'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_2', 
    name: 'Hanging Leg Raises', 
    muscleGroup: 'Abs', 
    subTarget: 'Lower Abs', 
    instructions: [
      'Hang from a pull-up bar with an overhand grip and legs straight',
      'Engage your core and lift your legs until they are parallel to the floor',
      'Focus on tilting your pelvis upward rather than just swinging your legs',
      'Lower your legs slowly to the starting position without letting your body swing'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_3', 
    name: 'Reverse Crunches', 
    muscleGroup: 'Abs', 
    subTarget: 'Lower Abs', 
    instructions: [
      'Lie on your back with your hands by your sides and knees bent at 90 degrees',
      'Contract your lower abs to pull your knees toward your chest',
      'Lift your hips slightly off the floor at the peak of the movement',
      'Slowly lower your feet back toward the floor without letting your lower back arch'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_4', 
    name: 'Cable Crunches', 
    muscleGroup: 'Abs', 
    subTarget: 'Upper Abs', 
    instructions: [
      'Kneel below a high pulley with a rope attachment and hold the ends by your ears',
      'Flex at the waist to pull your elbows toward your mid-thighs, rounding your back',
      'Squeeze your abs hard at the bottom and avoid sitting back on your heels',
      'Return to the starting position slowly, feeling the stretch in your abdominal wall'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_5', 
    name: 'Decline Sit-Ups', 
    muscleGroup: 'Abs', 
    subTarget: 'Full Abs', 
    instructions: [
      'Secure your feet in a decline bench and lie back completely',
      'Place your hands behind your head or across your chest',
      'Use your abdominal muscles to lift your torso until your chest reaches your thighs',
      'Lower yourself back down with control to keep constant tension on the core'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_6', 
    name: 'V-Ups', 
    muscleGroup: 'Abs', 
    subTarget: 'Core Midline', 
    instructions: [
      'Lie flat on your back with arms extended overhead and legs straight',
      'Simultaneously lift your torso and legs to form a "V" shape with your body',
      'Reach for your toes at the peak of the movement',
      'Slowly lower both your upper and lower body back to the floor'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_7', 
    name: 'Ab Wheel Rollouts', 
    muscleGroup: 'Abs', 
    subTarget: 'Full Core', 
    instructions: [
      'Kneel on the floor and hold the handles of the ab wheel directly under your shoulders',
      'Slowly roll the wheel forward, extending your body into a straight line',
      'Keep your core tight and avoid letting your lower back sag toward the floor',
      'Pull the wheel back toward your knees by contracting your abdominals'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_8', 
    name: 'Russian Twists', 
    muscleGroup: 'Abs', 
    subTarget: 'Obliques', 
    instructions: [
      'Sit on the floor with knees bent and feet slightly elevated',
      'Lean back at a 45-degree angle and clasp your hands in front of you',
      'Rotate your torso to the right, then to the left, touching the floor beside you',
      'Keep your core engaged and your neck neutral throughout the rotation'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_9', 
    name: 'Bicycle Crunches', 
    muscleGroup: 'Abs', 
    subTarget: 'Obliques/Abs', 
    instructions: [
      'Lie flat with hands behind your head and legs in a tabletop position',
      'Bring your right elbow toward your left knee while extending your right leg',
      'Switch sides, bringing your left elbow toward your right knee',
      'Maintain a "pedaling" motion while keeping your shoulder blades off the floor'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_10', 
    name: 'Woodchoppers', 
    muscleGroup: 'Abs', 
    subTarget: 'Obliques', 
    instructions: [
      'Stand sideways to a cable machine and grab the handle with both hands at shoulder height',
      'Pull the handle diagonally across your body toward your opposite knee',
      'Rotate your torso and pivot your back foot as you move the weight',
      'Slowly return to the starting position and repeat before switching sides'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_11', 
    name: 'Side Plank', 
    muscleGroup: 'Abs', 
    subTarget: 'Obliques Stability', 
    instructions: [
      'Lie on your side with your forearm directly under your shoulder',
      'Stack your feet and lift your hips until your body forms a straight line',
      'Engage your obliques to prevent your hips from dipping toward the floor',
      'Hold the position for the required time and then switch sides'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_12', 
    name: 'DB Side Bends', 
    muscleGroup: 'Abs', 
    subTarget: 'Obliques', 
    instructions: [
      'Stand upright holding a dumbbell in one hand at your side',
      'Slowly lean to the side with the weight, lowering the dumbbell toward your knee',
      'Contract the opposite oblique to pull your torso back to an upright position',
      'Complete the reps for one side before switching the dumbbell to the other hand'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_13', 
    name: 'Hanging Side Knee', 
    muscleGroup: 'Abs', 
    subTarget: 'Obliques', 
    instructions: [
      'Hang from a bar and pull your knees up toward your right armpit',
      'Focus on the crunching sensation in your obliques at the top',
      'Lower your knees back to the center with control',
      'Repeat the movement toward the left armpit'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_14', 
    name: 'Plank', 
    muscleGroup: 'Abs', 
    subTarget: 'Core Stability', 
    instructions: [
      'Rest on your forearms and toes, keeping your body in a perfectly straight line',
      'Squeeze your glutes and brace your core as if someone is about to punch your stomach',
      'Avoid letting your hips rise too high or sag too low',
      'Breathe deeply while maintaining total body tension'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_15', 
    name: 'Hollow Body Hold', 
    muscleGroup: 'Abs', 
    subTarget: 'Internal Core', 
    instructions: [
      'Lie flat on your back and press your lower back firmly into the floor',
      'Lift your arms overhead and your legs a few inches off the ground',
      'Lift your shoulders off the floor, forming a shallow "bowl" or "banana" shape',
      'Hold this position while ensuring your lower back never leaves the floor'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_16', 
    name: 'Dead Bug', 
    muscleGroup: 'Abs', 
    subTarget: 'Stability', 
    instructions: [
      'Lie on your back with arms reaching toward the ceiling and knees in tabletop',
      'Slowly lower your right arm and left leg toward the floor simultaneously',
      'Keep your lower back pressed into the floor to maintain core engagement',
      'Return to the start and repeat with the opposite arm and leg'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_17', 
    name: 'Bird-Dog', 
    muscleGroup: 'Abs', 
    subTarget: 'Balance', 
    instructions: [
      'Start on all fours with your hands under shoulders and knees under hips',
      'Simultaneously extend your right arm forward and left leg backward',
      'Keep your hips square to the floor and your spine in a neutral position',
      'Hold for a second, then return to the starting position and switch sides'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_18', 
    name: 'Pallof Press', 
    muscleGroup: 'Abs', 
    subTarget: 'Anti-Rotation', 
    instructions: [
      'Stand sideways to a cable machine and hold the handle at chest height with both hands',
      'Step away to create tension and press the handle straight out in front of you',
      'Resist the cable’s pull to rotate your torso toward the machine',
      'Hold for a second with arms extended before bringing the handle back to your chest'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_19', 
    name: 'Mountain Climbers', 
    muscleGroup: 'Abs', 
    subTarget: 'Core Cardio', 
    instructions: [
      'Start in a high plank position with your hands directly under your shoulders',
      'Drive one knee toward your chest while keeping your back flat and hips low',
      'Quickly switch legs, bringing the other knee forward',
      'Maintain a fast, rhythmic pace while keeping your core braced'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  },
  { 
    id: 'ab_20', 
    name: 'Dragon Flags', 
    muscleGroup: 'Abs', 
    subTarget: 'Elite Core', 
    instructions: [
      'Lie on a bench and grip the edges behind your head for stability',
      'Lift your entire body up into a vertical line, supporting yourself on your shoulders',
      'Slowly lower your body as a single rigid unit while keeping your back straight',
      'Stop just before your body touches the bench and lift back up to vertical'
    ], 
    imagePath: require('../../assets/images/abs-day.png') 
  }
];

// 3. The Full Quest Board
export const QUESTS: Quest[] = [
  {
    id: 'full_body_omega',
    title: 'Full Body Omega',
    description: 'Total system recalibration. Heavy compound movements for maximum efficiency.',
    targetMuscles: ['Chest', 'Back', 'Legs', 'Shoulders', 'Abs'],
    xpMultiplier: 2.0,
    attributeFocus: 'STR',
    icon: 'body',
    color: '#ffffff',
    imagePath: require('../../assets/images/full-body.png'),
    archetypes: ['Juggernaut', 'Athlete', 'Aesthetic']
  },
  {
    id: 'push_day_alpha',
    title: 'Push Day Alpha',
    description: 'Target the anterior chain. Chest, Shoulders, and Triceps focus.',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    xpMultiplier: 1.5,
    attributeFocus: 'STR',
    icon: 'flame',
    color: '#10b981',
    imagePath: require('../../assets/images/push-day.png'),
    archetypes: ['Juggernaut', 'Athlete']
  },
  {
    id: 'pull_day_beta',
    title: 'Pull Day Beta',
    description: 'Master the posterior chain. Back and Bicep engagement.',
    targetMuscles: ['Back', 'Biceps'],
    xpMultiplier: 1.5,
    attributeFocus: 'STR',
    icon: 'thunderstorm',
    color: '#3b82f6',
    imagePath: require('../../assets/images/pull-day.png'),
    archetypes: ['Juggernaut', 'Athlete']
  },
  {
    id: 'leg_day_reckoning',
    title: 'Leg Day Reckoning',
    description: 'Extreme heavy lifting. The foundation of power.',
    targetMuscles: ['Legs'],
    xpMultiplier: 1.8,
    attributeFocus: 'STR',
    icon: 'barbell',
    color: '#ef4444',
    imagePath: require('../../assets/images/leg-day.png'),
    archetypes: ['Juggernaut', 'Athlete']
  },
  {
    id: 'chest_vanguard',
    title: 'Chest Vanguard',
    description: 'Isolated pectoral destruction protocol.',
    targetMuscles: ['Chest'],
    xpMultiplier: 1.3,
    attributeFocus: 'STR',
    icon: 'shield',
    color: '#34d399',
    imagePath: require('../../assets/images/chest-day.png'),
    archetypes: ['Juggernaut', 'Aesthetic']
  },
  {
    id: 'back_protocol',
    title: 'Back Protocol',
    description: 'Build width and thickness in the lats.',
    targetMuscles: ['Back'],
    xpMultiplier: 1.4,
    attributeFocus: 'STR',
    icon: 'layers',
    color: '#6366f1',
    imagePath: require('../../assets/images/back-day.png'),
    archetypes: ['Juggernaut', 'Aesthetic']
  },
  {
    id: 'shoulder_garrison',
    title: 'Shoulder Garrison',
    description: 'Sculpt the deltoids for width and stability.',
    targetMuscles: ['Shoulders'],
    xpMultiplier: 1.3,
    attributeFocus: 'STR',
    icon: 'triangle',
    color: '#a855f7',
    imagePath: require('../../assets/images/shoulders-day.png'),
    archetypes: ['Juggernaut', 'Aesthetic']
  },
  {
    id: 'bicep_initiative',
    title: 'Bicep Initiative',
    description: 'High rep volume for maximum arm hypertrophy.',
    targetMuscles: ['Biceps'],
    xpMultiplier: 1.2,
    attributeFocus: 'END',
    icon: 'fitness',
    color: '#fbbf24',
    imagePath: require('../../assets/images/biceps-day.png'),
    archetypes: ['Athlete', 'Aesthetic']
  },
  {
    id: 'tricep_overdrive',
    title: 'Tricep Overdrive',
    description: 'Lock out the elbows. Heavy tricep extension focus.',
    targetMuscles: ['Triceps'],
    xpMultiplier: 1.2,
    attributeFocus: 'END',
    icon: 'construct',
    color: '#f97316',
    imagePath: require('../../assets/images/triceps-day.png'),
    archetypes: ['Athlete', 'Aesthetic']
  },
  {
    id: 'core_stability',
    title: 'Core Stability',
    description: 'Midline stabilization and abdominal conditioning.',
    targetMuscles: ['Abs'],
    xpMultiplier: 1.3,
    attributeFocus: 'END',
    icon: 'scan',
    color: '#06b6d4',
    imagePath: require('../../assets/images/abs-day.png'),
    archetypes: ['Athlete', 'Aesthetic']
  }
];

// 4. ACHIEVEMENT ENGINE: Updated with Logic-Gated Requirements
export const BADGES: Badge[] = [
  {
    id: 'first_step',
    name: 'Initial Uptime',
    description: 'Complete your first ever operation.',
    icon: 'power-outline',
    color: '#a1a1aa',
    requirement: { field: 'level', value: 2 }
  },
  {
    id: 'streak_7',
    name: 'Weekly Legend',
    description: 'Maintain a 7-day system uptime.',
    icon: 'calendar-outline',
    color: '#10b981',
    requirement: { field: 'currentStreak', value: 7 }
  },
  {
    id: 'str_50',
    name: 'Heavy Metal',
    description: 'Reach 50 points in the Strength attribute.',
    icon: 'barbell-outline',
    color: '#ef4444',
    requirement: { field: 'str', value: 50 }
  },
  {
    id: 'ton_club',
    name: '1-Ton Club',
    description: 'Move a total of 1,000kg in lifetime volume.',
    icon: 'trophy-outline',
    color: '#fbbf24',
    requirement: { field: 'lifetimeVolume', value: 1000 }
  },
  {
    id: 'stamina_50',
    name: 'Stamina Protocol',
    description: 'Reach 50 points in the Endurance attribute.',
    icon: 'heart-outline',
    color: '#3b82f6',
    requirement: { field: 'end', value: 50 }
  },
  {
    id: 'tactician',
    name: 'Tactical Rest',
    description: 'Deploy 10 Rest Shields to protect your uptime.',
    icon: 'shield-checkmark-outline',
    color: '#60a5fa',
    requirement: { field: 'restDaysUsed', value: 10 }
  }
];