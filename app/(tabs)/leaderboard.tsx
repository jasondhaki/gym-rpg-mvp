import { View, Text } from 'react-native';

export default function LeaderboardScreen() {
  return (
    <View className="flex-1 bg-zinc-950 items-center justify-center">
      <Text className="text-white text-2xl font-bold">Global Rankings</Text>
      <Text className="text-zinc-500">Top 1% of lifters</Text>
    </View>
  );
}