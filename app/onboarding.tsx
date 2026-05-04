import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

import { loadGame, saveGame } from '../src/utils/storage';

const ARCHETYPES = [
  {
    id: 'Aesthetic',
    title: 'AESTHETIC',
    desc: 'Hypertrophy & Symmetry. Build a physique like a Greek god.',
    icon: 'body',
  },
  {
    id: 'Juggernaut',
    title: 'JUGGERNAUT',
    desc: 'Raw Power & Mass. Move mountains of iron.',
    icon: 'barbell',
  },
  {
    id: 'Athlete',
    title: 'ATHLETE',
    desc: 'Endurance & Agility. Function dictates form.',
    icon: 'flash',
  }
];

export default function OnboardingScreen() {
  const router = useRouter();

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);

  // Validation: Button is only active if everything is filled out
  const isFormValid = name.trim() !== '' && age !== '' && weight !== '' && height !== '' && selectedArchetype !== null;

  const handleInitialize = async () => {
    if (!isFormValid) return;
    
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    const player = await loadGame();
    
    // Write the new character data and FLIP THE KILLSWITCH
    await saveGame({
      ...player,
      playerName: name.trim(),
      age: parseInt(age) || 20,
      weight: parseFloat(weight) || 70,
      height: parseFloat(height) || 175,
      targetArchetype: selectedArchetype as any,
      hasCompletedOnboarding: true, // This tells the Hub to let them in!
    });

    // Boot them into the Command Center
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Ionicons name="finger-print" size={50} color="#10b981" />
            <Text style={styles.title}>LINK BIOMETRICS</Text>
            <Text style={styles.subtitle}>Initialize your local save file to access the Command Center.</Text>
          </View>

          {/* IDENTITY DATA */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>IDENTITY</Text>
            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>CALLSIGN (NAME)</Text>
              <TextInput 
                style={styles.textInput}
                placeholder="Enter Callsign..."
                placeholderTextColor="#52525b"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>
          </View>

          {/* PHYSICAL METRICS */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>RAW METRICS</Text>
            <View style={styles.row}>
              <View style={[styles.inputCard, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>AGE</Text>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Years"
                  placeholderTextColor="#52525b"
                  keyboardType="number-pad"
                  value={age}
                  onChangeText={setAge}
                />
              </View>
              <View style={[styles.inputCard, { flex: 1, marginLeft: 4, marginRight: 4 }]}>
                <Text style={styles.inputLabel}>WEIGHT</Text>
                <TextInput 
                  style={styles.textInput}
                  placeholder="KG"
                  placeholderTextColor="#52525b"
                  keyboardType="decimal-pad"
                  value={weight}
                  onChangeText={setWeight}
                />
              </View>
              <View style={[styles.inputCard, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>HEIGHT</Text>
                <TextInput 
                  style={styles.textInput}
                  placeholder="CM"
                  placeholderTextColor="#52525b"
                  keyboardType="decimal-pad"
                  value={height}
                  onChangeText={setHeight}
                />
              </View>
            </View>
          </View>

          {/* ARCHETYPE SELECTION */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>TARGET ARCHETYPE</Text>
            {ARCHETYPES.map((arch) => {
              const isActive = selectedArchetype === arch.id;
              return (
                <TouchableOpacity 
                  key={arch.id}
                  style={[styles.archetypeCard, isActive && styles.archetypeCardActive]}
                  activeOpacity={0.7}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedArchetype(arch.id);
                  }}
                >
                  <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
                    <Ionicons name={arch.icon as any} size={28} color={isActive ? '#09090b' : '#a1a1aa'} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.archTitle, isActive && styles.archTitleActive]}>{arch.title}</Text>
                    <Text style={[styles.archDesc, isActive && styles.archDescActive]}>{arch.desc}</Text>
                  </View>
                  <View style={styles.radioCircle}>
                    {isActive && <View style={styles.radioFill} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ height: 40 }} />

        </ScrollView>

        {/* SUBMIT BUTTON - Sticky at the bottom */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.submitButton, !isFormValid && styles.submitButtonDisabled]}
            activeOpacity={0.8}
            disabled={!isFormValid}
            onPress={handleInitialize}
          >
            <Ionicons name="power" size={20} color={isFormValid ? '#09090b' : '#52525b'} style={{ marginRight: 8 }} />
            <Text style={[styles.submitButtonText, !isFormValid && styles.submitButtonTextDisabled]}>
              INITIALIZE SYSTEM
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  scrollContent: { padding: 20, paddingTop: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { color: 'white', fontSize: 28, fontWeight: 'bold', fontFamily: 'CyberpunkFont', marginTop: 16, letterSpacing: 2 },
  subtitle: { color: '#a1a1aa', fontSize: 14, textAlign: 'center', marginTop: 8, paddingHorizontal: 20 },
  
  section: { marginBottom: 30 },
  sectionLabel: { color: '#71717a', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: 2, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  
  inputCard: { backgroundColor: '#18181b', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#27272a', marginBottom: 12 },
  inputLabel: { color: '#10b981', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: 1, marginBottom: 8 },
  textInput: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  archetypeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181b', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#27272a' },
  archetypeCardActive: { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981' },
  iconBox: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#27272a', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  iconBoxActive: { backgroundColor: '#10b981' },
  archTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', fontFamily: 'CyberpunkFont', letterSpacing: 1, marginBottom: 4 },
  archTitleActive: { color: '#10b981' },
  archDesc: { color: '#a1a1aa', fontSize: 12, lineHeight: 18 },
  archDescActive: { color: 'white' },
  
  radioCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#3f3f46', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  radioFill: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#10b981' },

  footer: { padding: 20, paddingBottom: 30, backgroundColor: '#09090b', borderTopWidth: 1, borderTopColor: '#27272a' },
  submitButton: { backgroundColor: '#10b981', flexDirection: 'row', height: 60, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#10b981', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 },
  submitButtonDisabled: { backgroundColor: '#18181b', shadowOpacity: 0, elevation: 0 },
  submitButtonText: { color: '#09090b', fontSize: 16, fontWeight: 'bold', fontFamily: 'CyberpunkFont', letterSpacing: 1 },
  submitButtonTextDisabled: { color: '#52525b' },
});