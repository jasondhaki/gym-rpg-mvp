import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { loadGame, saveGame, PlayerData } from '../../src/utils/storage';
import LevelUpModal from '../../src/components/LevelUpModal';
import { BADGES } from '../../src/data/codex';

const getRankDetails = (level: number) => {
  if (level < 10) return { title: 'ROOKIE LIFTER', icon: 'shield-half-outline', color: '#a1a1aa', border: '#3f3f46', glow: 0 };
  if (level < 25) return { title: 'IRON WARRIOR', icon: 'shield', color: '#94a3b8', border: '#64748b', glow: 0.2 };
  if (level < 50) return { title: 'STEEL VANGUARD', icon: 'shield-checkmark', color: '#fbbf24', border: '#b45309', glow: 0.5 };
  return { title: 'APEX TITAN', icon: 'diamond', color: '#10b981', border: '#047857', glow: 0.8 };
};

const StatBar = ({ iconName, current, max, color }: { iconName: any, current: number, max: number, color: string }) => {
  const fillPercentage = Math.min((current / max) * 100, 100);
  return (
    <View style={styles.statRow}>
      <View style={styles.iconWrapper}>
        <Ionicons name={iconName} size={22} color={color} />
      </View>
      <View style={styles.statTrack}>
        <View style={[styles.statFill, { width: `${fillPercentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const DetailedStatBar = ({ label, current, max, color }: { label: string, current: number, max: number, color: string }) => {
  const fillPercentage = Math.min((current / max) * 100, 100);
  return (
    <View style={styles.detailedStatContainer}>
      <View style={styles.detailedStatHeader}>
        <Text style={[styles.detailedStatLabel, { color }]}>{label}</Text>
        <Text style={styles.detailedStatNumbers}>{current} <Text style={{color: '#71717a'}}>/ {max}</Text></Text>
      </View>
      <View style={styles.statTrack}>
        <View style={[styles.statFill, { width: `${fillPercentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

export default function HubScreen() {
  const router = useRouter(); 

  const [player, setPlayer] = useState<PlayerData>({ 
    level: 1, 
    totalXp: 0, 
    lifetimeVolume: 0, 
    currentStreak: 0, 
    lastWorkoutDate: null,
    str: 10, 
    end: 10, 
    unlockedBadges: [], 
    pushQuestsCompleted: 0,
    completedToday: {},
    activeSession: {}, // <--- ADD THIS LINE TO FIX THE ERROR
    restTokens: 3, 
    lastTokenResetDate: null, 
    restDaysUsed: [],
    hasCompletedOnboarding: false, 
    playerName: 'Initiate', 
    weight: 70, 
    height: 175, 
    age: 20, 
    targetArchetype: null
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState(1);
  const [showAttributesModal, setShowAttributesModal] = useState(false);

  const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diffToMonday));
    monday.setHours(0,0,0,0); 
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      week.push(day);
    }
    setWeekDates(week);
  }, []);

  // --- SYSTEM MAINTENANCE ENGINE (ADJUSTED FOR LOCAL TIME) ---
  const performSystemMaintenance = (data: PlayerData) => {
    const today = new Date().toLocaleDateString('en-CA'); 
    let isModified = false;
    let syncedData = { ...data };

    // 1. Weekly Shield Refill Logic (Local Monday Check)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const mondayDate = new Date(now.setDate(diff));
    const currentMondayStr = mondayDate.toLocaleDateString('en-CA');

    if (syncedData.lastTokenResetDate !== currentMondayStr) {
      syncedData.restTokens = 3;
      syncedData.lastTokenResetDate = currentMondayStr;
      isModified = true;
    }

    // 2. Daily Sync Check
    if (syncedData.lastWorkoutDate !== today && Object.keys(syncedData.completedToday || {}).length > 0) {
      syncedData.completedToday = {};
      isModified = true;
    }

    return { isModified, syncedData };
  };

  const useRestShield = async () => {
    if (player.restTokens <= 0) return;
    const todayStr = new Date().toLocaleDateString('en-CA');
    if (player.restDaysUsed.includes(todayStr) || player.lastWorkoutDate === todayStr) return;

    const updatedPlayer = {
      ...player,
      restTokens: player.restTokens - 1,
      restDaysUsed: [...(player.restDaysUsed || []), todayStr]
    };
    setPlayer(updatedPlayer);
    await saveGame(updatedPlayer);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  // --- UPDATED STREAK LOGIC (LOCAL TIME) ---
  const getRealtimeStreak = () => {
    if (!player?.lastWorkoutDate) return 0;
    const todayStr = new Date().toLocaleDateString('en-CA');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString('en-CA');

    const activeToday = player.lastWorkoutDate === todayStr || player.restDaysUsed.includes(todayStr);
    const activeYesterday = player.lastWorkoutDate === yesterdayStr || player.restDaysUsed.includes(yesterdayStr);

    if (activeToday || activeYesterday) return player.currentStreak || 0;
    return 0; 
  };

  const currentRealtimeStreak = getRealtimeStreak();
  const isMultiplierActive = currentRealtimeStreak >= 3;

  const isDayActive = (date: Date) => {
    if (!player?.lastWorkoutDate || currentRealtimeStreak === 0) return false;
    const dStr = date.toLocaleDateString('en-CA');
    // Using string comparison for accuracy across timezones
    const [ly, lm, ld] = player.lastWorkoutDate.split('-');
    const [cy, cm, cd] = dStr.split('-');
    
    const lastWorkoutTime = new Date(Number(ly), Number(lm) - 1, Number(ld)).getTime();
    const currentCheckTime = new Date(Number(cy), Number(cm) - 1, Number(cd)).getTime();
    
    const diffInDays = (lastWorkoutTime - currentCheckTime) / (1000 * 60 * 60 * 24);
    return diffInDays >= 0 && diffInDays < currentRealtimeStreak;
  };

  const isRestDay = (date: Date) => {
    const dStr = date.toLocaleDateString('en-CA');
    return player.restDaysUsed.includes(dStr);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchSave = async () => {
        const savedData = await loadGame();
        
        // Trigger maintenance on boot/focus
        const { isModified, syncedData } = performSystemMaintenance(savedData);
        
        if (isModified) {
          await saveGame(syncedData);
        }
        
        if (isActive) {
          if (!syncedData.hasCompletedOnboarding) {
            router.replace('/onboarding');
            return; 
          }
          if (syncedData.level > player.level && isLoaded) {
             setLeveledUpTo(syncedData.level);
             setShowLevelUp(true);
          }
          setPlayer(syncedData);
          setIsLoaded(true);
        }
      };
      fetchSave();
      return () => { isActive = false; };
    }, [player.level, isLoaded])
  );

  const getRequiredXp = (level: number) => Math.floor(500 * Math.pow(level, 1.5));
  const requiredXP = getRequiredXp(player.level);
  const xpPercentage = Math.min((player.totalXp / requiredXP) * 100, 100);

  if (!isLoaded) return <View style={styles.loadingContainer} />;

  const rankInfo = getRankDetails(player.level);
  const strMax = Math.max(100, Math.ceil((player.str || 10) / 100) * 100);
  const endMax = Math.max(100, Math.ceil((player.end || 10) / 100) * 100);
  const volMax = Math.max(10000, Math.ceil((player.lifetimeVolume || 0) / 10000) * 10000);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={[styles.avatarCircle, { borderColor: rankInfo.border, shadowColor: rankInfo.color, shadowOpacity: rankInfo.glow, elevation: rankInfo.glow > 0 ? 10 : 0 }]}>
            <Ionicons name={rankInfo.icon as any} size={40} color={rankInfo.color} />
          </View>
          <View style={styles.headerText}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.username}>{player.playerName}</Text>
              {isMultiplierActive && (
                <View style={styles.globalMultiplierBadge}>
                  <Ionicons name="flame" size={14} color="#09090b" />
                  <Text style={styles.globalMultiplierText}>1.2x XP</Text>
                </View>
              )}
            </View>
            <Text style={[styles.rank, { color: rankInfo.color }]}>{rankInfo.title}</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.levelRow}>
            <Text style={styles.levelText}>Level {player.level}</Text>
            <Text style={styles.xpText}>{player.totalXp} / {requiredXP} XP</Text>
          </View>
          <View style={styles.xpBarBackground}>
            <View style={[styles.xpBarFill, { width: `${xpPercentage}%` }]} />
          </View>
        </View>

        <View style={styles.restCard}>
          <View style={styles.restHeader}>
            <View>
              <Text style={styles.restTitle}>REST SHIELDS</Text>
              <Text style={styles.restSubtext}>{player.restTokens} CHARGES REMAINING</Text>
            </View>
            <Ionicons name="shield-checkmark" size={32} color={player.restTokens > 0 ? "#3b82f6" : "#3f3f46"} />
          </View>
          <TouchableOpacity 
            style={[styles.useTokenButton, player.restTokens <= 0 && { opacity: 0.5 }]}
            onPress={useRestShield}
            disabled={player.restTokens <= 0}
          >
            <Text style={styles.useTokenText}>ACTIVATE 24H STREAK PROTECTOR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.missionCard}>
            <Text style={styles.missionTitle}>Current Objective</Text>
            <Text style={styles.missionName}>Push Day Alpha</Text>
            <Text style={styles.missionStatus}>In Progress — Head to the Workout Tab</Text>
        </View>

        <View style={styles.trophyCard}>
          <Text style={styles.sectionTitle}>MEDAL CASE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
            {BADGES.map((badge) => {
              const isUnlocked = player.unlockedBadges?.includes(badge.id);
              return (
                <View key={badge.id} style={[styles.badgeContainer, !isUnlocked && styles.badgeLocked]}>
                  <View style={[styles.badgeIconWrapper, isUnlocked ? { backgroundColor: badge.color + '20', borderColor: badge.color } : styles.badgeIconLocked]}>
                    <Ionicons name={badge.icon as any} size={32} color={isUnlocked ? badge.color : '#3f3f46'} />
                  </View>
                  <Text style={[styles.badgeName, !isUnlocked && styles.badgeNameLocked]} numberOfLines={1}>{badge.name}</Text>
                  <Text style={styles.badgeDesc} numberOfLines={2}>{isUnlocked ? badge.description : 'Locked'}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakHeaderRow}>
            <Text style={styles.sectionTitleWithoutMargin}>SYSTEM UPTIME</Text>
            <Text style={[styles.streakCountText, { color: currentRealtimeStreak > 0 ? '#10b981' : '#71717a' }]}>
              {currentRealtimeStreak} DAY STREAK
            </Text>
          </View>
          
          <View style={styles.weekRow}>
            {weekDates.map((date, index) => {
              const active = isDayActive(date);
              const resting = isRestDay(date);
              return (
                <View key={index} style={[
                    styles.dayNode, 
                    active && styles.dayNodeActive,
                    resting && styles.dayNodeResting
                ]}>
                  <Text style={[
                      styles.dayText, 
                      active && styles.dayTextActive,
                      resting && styles.dayTextResting
                  ]}>{WEEK_DAYS[index]}</Text>
                </View>
              );
            })}
          </View>
          
          <Text style={styles.streakSubtext}>
            Global 1.2x XP Multiplier is {isMultiplierActive ? 'ACTIVE' : 'INACTIVE'}. 
            {isMultiplierActive ? ' Do not break the chain.' : ' Hit 3 days to ignite.'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.attributesCard} 
          activeOpacity={0.8}
          onPress={() => setShowAttributesModal(true)}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Text style={styles.sectionTitleWithoutMargin}>COMBAT ATTRIBUTES</Text>
            <Ionicons name="scan-outline" size={20} color="#71717a" />
          </View>
          <StatBar iconName="barbell" current={player.str || 10} max={strMax} color="#ef4444" />
          <StatBar iconName="heart-half" current={player.end || 10} max={endMax} color="#3b82f6" />
          <StatBar iconName="layers" current={player.lifetimeVolume || 0} max={volMax} color="#10b981" />
          <StatBar iconName="flame" current={currentRealtimeStreak} max={30} color="#eab308" />
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={showAttributesModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.detailedModalCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
              <Text style={styles.modalTitleText}>CHARACTER SHEET</Text>
              <Ionicons name="analytics" size={24} color="#10b981" />
            </View>
            <DetailedStatBar label="STRENGTH" current={player.str || 10} max={strMax} color="#ef4444" />
            <DetailedStatBar label="ENDURANCE" current={player.end || 10} max={endMax} color="#3b82f6" />
            <DetailedStatBar label="LIFETIME VOLUME" current={player.lifetimeVolume || 0} max={volMax} color="#10b981" />
            <DetailedStatBar label="CONSISTENCY" current={currentRealtimeStreak} max={30} color="#eab308" />
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowAttributesModal(false)}>
              <Text style={styles.closeModalText}>CLOSE DATABANK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LevelUpModal isVisible={showLevelUp} newLevel={leveledUpTo} onClose={() => setShowLevelUp(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#09090b' },
  loadingContainer: { flex: 1, backgroundColor: '#09090b' },
  container: { flex: 1, padding: 20, paddingTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#18181b', borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 16, shadowOffset: { width: 0, height: 0 }, shadowRadius: 15 },
  headerText: { flex: 1 },
  username: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  rank: { fontSize: 16, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4, fontFamily: 'CyberpunkFont' },
  globalMultiplierBadge: { backgroundColor: '#10b981', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginLeft: 12 },
  globalMultiplierText: { color: '#09090b', fontWeight: 'bold', fontSize: 12, marginLeft: 4, fontFamily: 'monospace' },
  statsCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: '#27272a' },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  levelText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  xpText: { color: '#a1a1aa', fontSize: 14, fontWeight: '500', fontFamily: 'monospace' },
  xpBarBackground: { height: 12, backgroundColor: '#27272a', borderRadius: 6, overflow: 'hidden' },
  xpBarFill: { height: '100%', backgroundColor: '#10b981', borderRadius: 6 }, 
  restCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#27272a' },
  restHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  restTitle: { color: '#71717a', fontSize: 12, letterSpacing: 3, fontWeight: 'bold', fontFamily: 'monospace' },
  restSubtext: { color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  useTokenButton: { backgroundColor: '#1e1b4b', paddingVertical: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#3b82f6' },
  useTokenText: { color: '#3b82f6', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  missionCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 20, marginBottom: 30, borderWidth: 1, borderColor: '#27272a', borderLeftWidth: 4, borderLeftColor: '#10b981' },
  missionTitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  missionName: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  missionStatus: { color: '#a1a1aa', fontSize: 14 },
  trophyCard: { backgroundColor: '#18181b', borderRadius: 16, paddingVertical: 20, paddingLeft: 20, marginBottom: 20, borderWidth: 1, borderColor: '#27272a' },
  badgeContainer: { width: 120, marginRight: 16, alignItems: 'center' },
  badgeLocked: { opacity: 0.5 },
  badgeIconWrapper: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  badgeIconLocked: { backgroundColor: '#09090b', borderColor: '#27272a', borderStyle: 'dashed' },
  badgeName: { color: 'white', fontSize: 14, fontWeight: 'bold', fontFamily: 'CyberpunkFont', textAlign: 'center', marginBottom: 4 },
  badgeNameLocked: { color: '#71717a' },
  badgeDesc: { color: '#a1a1aa', fontSize: 10, textAlign: 'center', lineHeight: 14 },
  streakCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#27272a' },
  streakHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  streakCountText: { fontSize: 16, fontWeight: 'bold', fontFamily: 'CyberpunkFont' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  dayNode: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#111113', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#3f3f46' },
  dayNodeActive: { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981', shadowColor: '#10b981', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 5 },
  dayNodeResting: { backgroundColor: 'rgba(59, 130, 246, 0.15)', borderColor: '#3b82f6', shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 5 },
  dayText: { color: '#71717a', fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace' },
  dayTextActive: { color: '#10b981' },
  dayTextResting: { color: '#3b82f6' },
  streakSubtext: { color: '#a1a1aa', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },
  attributesCard: { backgroundColor: '#18181b', borderRadius: 16, padding: 20, marginBottom: 10, borderWidth: 1, borderColor: '#27272a' },
  sectionTitle: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 20, fontFamily: 'monospace', fontWeight: 'bold' },
  sectionTitleWithoutMargin: { color: '#71717a', fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, fontFamily: 'monospace', fontWeight: 'bold' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconWrapper: { width: 30, alignItems: 'center', justifyContent: 'center' },
  statTrack: { flex: 1, height: 8, backgroundColor: '#27272a', borderRadius: 4, marginHorizontal: 12, overflow: 'hidden' },
  statFill: { height: '100%', borderRadius: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(9, 9, 11, 0.9)', justifyContent: 'flex-end' },
  detailedModalCard: { backgroundColor: '#18181b', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 30, paddingBottom: 50, borderWidth: 1, borderColor: '#27272a', borderBottomWidth: 0 },
  modalTitleText: { color: 'white', fontSize: 24, fontWeight: 'bold', fontFamily: 'CyberpunkFont', letterSpacing: 1 },
  detailedStatContainer: { marginBottom: 24 },
  detailedStatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingHorizontal: 12 },
  detailedStatLabel: { fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: 1 },
  detailedStatNumbers: { color: 'white', fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace' },
  closeModalButton: { marginTop: 20, backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingVertical: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#10b981' },
  closeModalText: { color: '#10b981', fontSize: 14, fontWeight: 'bold', letterSpacing: 2, fontFamily: 'monospace' },
});