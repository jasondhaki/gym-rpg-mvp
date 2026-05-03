import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ActionChamberScreen() {
  // This hook grabs the specific Quest ID from the URL/Route
  const { id } = useLocalSearchParams(); 
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACTION CHAMBER</Text>
      <Text style={styles.questId}>Engaging Quest: {id}</Text>

      <TouchableOpacity style={styles.retreatButton} onPress={() => router.back()}>
        <Text style={styles.retreatText}>RETREAT TO BOARD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', letterSpacing: 2 },
  questId: { color: '#10b981', fontSize: 16, marginTop: 12, fontFamily: 'monospace' },
  retreatButton: { marginTop: 40, backgroundColor: '#27272a', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, borderWidth: 1, borderColor: '#3f3f46' },
  retreatText: { color: 'white', fontWeight: 'bold', letterSpacing: 1 }
});