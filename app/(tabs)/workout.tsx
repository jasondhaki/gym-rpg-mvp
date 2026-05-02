import { View, Text } from 'react-native';

export default function WorkoutScreen() {
  return (
    <View className="flex-1 bg-zinc-950 items-center justify-center">
      <Text className="text-white text-2xl font-bold">Active Chamber</Text>
      <Text className="text-emerald-400">Ready to level up?</Text>
    </View>
  );
}