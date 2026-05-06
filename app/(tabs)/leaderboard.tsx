import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

import { loadGame, PlayerData } from '../../src/utils/storage';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DIVISIONS = [
  { name: 'INITIATE', min: 0, max: 5000, color: '#a1a1aa' },
  { name: 'IRON GUARD', min: 5001, max: 15000, color: '#3b82f6' },
  { name: 'STEEL VANGUARD', min: 15001, max: 50000, color: '#fbbf24' },
  { name: 'APEX TITAN', min: 50001, max: Infinity, color: '#10b981' },
];

interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
  totalPower: number;
  str: number;
  end: number;
  isPlayer: boolean;
}

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const calcTotalPower = (level: number, currentXp: number) => {
    let total = currentXp;
    for (let i = 1; i < level; i++) {
      total += Math.floor(500 * Math.pow(i, 1.5));
    }
    return total;
  };

  const getDivisionDetails = (power: number) => {
    const current = DIVISIONS.find(d => power <= d.max) || DIVISIONS[DIVISIONS.length - 1];
    const next = DIVISIONS[DIVISIONS.indexOf(current) + 1] || null;
    const progress = next ? Math.min(((power - current.min) / (current.max - current.min)) * 100, 100) : 100;
    return { current, next, progress };
  };

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const getInsight = (rival: LeaderboardEntry) => {
    if (!player) return "";
    if (rival.isPlayer) return "YOU ARE THE CURRENT BENCHMARK.";
    const strDiff = player.str - rival.str;
    const endDiff = player.end - rival.end;
    if (strDiff < -10) return "WARNING: RIVAL RAW STRENGTH EXCEEDS YOUR OUTPUT.";
    if (endDiff < -10) return "INTEL: RIVAL HAS SUPERIOR STAMINA CONDITIONING.";
    if (strDiff > 15) return "ADVANTAGE: YOUR CRUSHING POWER IS UNMATCHED HERE.";
    return "ANALYSIS: TARGET IS WITHIN STRIKING DISTANCE. GRIND ON.";
  };

  useFocusEffect(
    useCallback(() => {
      const fetchAndSync = async () => {
        const savedData = await loadGame();
        setPlayer(savedData);
        const playerPower = calcTotalPower(savedData.level, savedData.totalXp);

        const ghosts: LeaderboardEntry[] = [
          { id: 'bot_1', name: 'VALKYRIE_UNIT', level: savedData.level + 1, totalPower: playerPower + 850, str: savedData.str - 5, end: savedData.end + 20, isPlayer: false },
          { id: 'bot_2', name: 'TITAN_PRIME', level: savedData.level, totalPower: playerPower + 300, str: savedData.str + 10, end: savedData.end - 10, isPlayer: false },
          { id: 'bot_3', name: 'IRON_GRIP', level: savedData.level, totalPower: playerPower - 400, str: savedData.str + 5, end: savedData.end - 5, isPlayer: false },
          { id: 'bot_4', name: 'SHADOW_OPS', level: Math.max(1, savedData.level - 1), totalPower: playerPower - 900, str: savedData.str - 15, end: savedData.end + 5, isPlayer: false },
        ];

        const currentUser: LeaderboardEntry = {
          id: 'player_main',
          name: savedData.playerName.toUpperCase(),
          level: savedData.level,
          totalPower: playerPower,
          str: savedData.str,
          end: savedData.end,
          isPlayer: true
        };

        const sorted = [...ghosts, currentUser].sort((a, b) => b.totalPower - a.totalPower);
        setLeaderboard(sorted);
      };
      fetchAndSync();
    }, [])
  );

  const playerPower = calcTotalPower(player?.level || 1, player?.totalXp || 0);
  const divInfo = getDivisionDetails(playerPower);
  
  // FEATURE 3: Target Acquisition Logic
  const playerIndex = leaderboard.findIndex(e => e.isPlayer);
  const nextRival = playerIndex > 0 ? leaderboard[playerIndex - 1] : null;
  const powerGap = nextRival ? nextRival.totalPower - playerPower : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* PROMOTION & TARGET TRACKER */}
        <View style={styles.topSection}>
          <View style={styles.promoHeader}>
            <View style={styles.promoTextRow}>
              <Text style={styles.promoTitle}>PROMOTION TRACKER</Text>
              <Text style={[styles.divisionBadge, { backgroundColor: divInfo.current.color + '20', color: divInfo.current.color, borderColor: divInfo.current.color }]}>
                {divInfo.current.name}
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${divInfo.progress}%`, backgroundColor: divInfo.current.color }]} />
            </View>
          </View>

          {/* FEATURE 3: TARGET RADAR UI */}
          <View style={styles.targetCard}>
            <View style={styles.targetIconBox}>
              <Ionicons name="scan-circle" size={24} color={nextRival ? "#ef4444" : "#10b981"} />
            </View>
            <View style={styles.targetInfo}>
              <Text style={styles.targetLabel}>TARGET ACQUISITION</Text>
              {nextRival ? (
                <Text style={styles.targetMainText}>
                  NEUTRALIZE <Text style={{ color: 'white' }}>{nextRival.name}</Text> [ -{powerGap} PWR ]
                </Text>
              ) : (
                <Text style={styles.targetMainText}>APEX POSITION SECURED</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeaderTitle}>SERVER INTEL</Text>
          <Text style={styles.listHeaderSub}>LIVE FEED SYNCED</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          {leaderboard.map((entry, index) => {
            const isExpanded = expandedId === entry.id;
            const rankColor = index === 0 ? '#fbbf24' : index === 1 ? '#a1a1aa' : index === 2 ? '#b45309' : '#3f3f46';

            return (
              <TouchableOpacity 
                activeOpacity={0.9}
                key={entry.id} 
                onPress={() => toggleExpand(entry.id)}
                style={[styles.rankCard, entry.isPlayer && styles.playerCard, isExpanded && styles.expandedCard]}
              >
                <View style={styles.mainRow}>
                  <View style={styles.rankBadge}>
                    <Text style={[styles.rankNumber, { color: rankColor }]}>{index + 1}</Text>
                  </View>
                  <View style={styles.avatarBox}>
                    <Ionicons name={entry.isPlayer ? "person" : "hardware-chip"} size={18} color={entry.isPlayer ? "#10b981" : "#71717a"} />
                  </View>
                  <View style={styles.infoBox}>
                    <Text style={[styles.entryName, entry.isPlayer && { color: '#10b981' }]}>{entry.name}</Text>
                    <Text style={styles.entryLevel}>LVL {entry.level}</Text>
                  </View>
                  <View style={styles.powerBox}>
                    <Text style={styles.powerText}>{entry.totalPower.toLocaleString()}</Text>
                    <Text style={styles.powerSub}>PWR</Text>
                  </View>
                </View>

                {isExpanded && (
                  <View style={styles.breakdownContainer}>
                    <View style={styles.breakdownDivider} />
                    <View style={styles.statsGrid}>
                      <View style={styles.statMiniBox}><Text style={styles.statMiniLabel}>STRENGTH</Text><Text style={[styles.statMiniValue, { color: '#ef4444' }]}>{entry.str}</Text></View>
                      <View style={styles.statMiniBox}><Text style={styles.statMiniLabel}>ENDURANCE</Text><Text style={[styles.statMiniValue, { color: '#3b82f6' }]}>{entry.end}</Text></View>
                    </View>
                    <View style={styles.insightBox}>
                      <Ionicons name="analytics-outline" size={14} color="#10b981" style={{ marginRight: 8 }} />
                      <Text style={styles.insightText}>{getInsight(entry)}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#09090b' },
  container: { flex: 1, padding: 20 },
  topSection: { marginBottom: 30 },
  promoHeader: { backgroundColor: '#111113', padding: 18, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomWidth: 1, borderColor: '#18181b' },
  promoTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  promoTitle: { color: '#71717a', fontSize: 9, letterSpacing: 2, fontFamily: 'monospace', fontWeight: 'bold' },
  divisionBadge: { fontSize: 8, fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, overflow: 'hidden' },
  progressBarBg: { height: 4, backgroundColor: '#27272a', borderRadius: 2, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 2 },
  
  // FEATURE 3 STYLES
  targetCard: { backgroundColor: '#18181b', padding: 15, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0, borderWidth: 1, borderColor: '#18181b' },
  targetIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#09090b', alignItems: 'center', justifyContent: 'center', marginRight: 15, borderWidth: 1, borderColor: '#27272a' },
  targetInfo: { flex: 1 },
  targetLabel: { color: '#71717a', fontSize: 8, letterSpacing: 1, fontWeight: 'bold' },
  targetMainText: { color: '#ef4444', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace', marginTop: 2 },

  listHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15, paddingHorizontal: 5 },
  listHeaderTitle: { color: 'white', fontSize: 14, fontWeight: 'bold', fontFamily: 'CyberpunkFont' },
  listHeaderSub: { color: '#3f3f46', fontSize: 8, fontWeight: 'bold', fontFamily: 'monospace' },

  listContent: { paddingBottom: 50 },
  rankCard: { backgroundColor: '#111113', borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#18181b' },
  playerCard: { borderColor: '#10b98130', backgroundColor: '#10b98103' },
  expandedCard: { borderColor: '#10b98150' },
  mainRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  rankBadge: { width: 25, alignItems: 'center' },
  rankNumber: { fontSize: 16, fontWeight: '900', fontFamily: 'monospace' },
  avatarBox: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#09090b', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, borderWidth: 1, borderColor: '#27272a' },
  infoBox: { flex: 1 },
  entryName: { color: '#e4e4e7', fontSize: 12, fontWeight: 'bold' },
  entryLevel: { color: '#71717a', fontSize: 8, marginTop: 1, fontWeight: 'bold' },
  powerBox: { alignItems: 'flex-end' },
  powerText: { color: 'white', fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace' },
  powerSub: { color: '#3f3f46', fontSize: 7, fontWeight: 'bold' },

  breakdownContainer: { paddingHorizontal: 14, paddingBottom: 14 },
  breakdownDivider: { height: 1, backgroundColor: '#18181b', marginBottom: 12 },
  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statMiniBox: { flex: 1, backgroundColor: '#09090b', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#18181b' },
  statMiniLabel: { color: '#71717a', fontSize: 7, fontWeight: 'bold', marginBottom: 2 },
  statMiniValue: { fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace' },
  insightBox: { backgroundColor: '#10b98105', padding: 10, borderRadius: 6, flexDirection: 'row', alignItems: 'center' },
  insightText: { color: '#10b981', fontSize: 9, fontWeight: 'bold', flex: 1, fontFamily: 'monospace' }
});