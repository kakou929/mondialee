import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const modules = [
  { id: 1, titre: 'Code de la Route', icon: 'book', color: '#1d4ed8', screen: 'Quiz', desc: '40 séries de quiz' },
  { id: 2, titre: 'Panneaux', icon: 'warning', color: '#ea580c', screen: 'Panneaux', desc: '93+ panneaux' },
  { id: 3, titre: 'Réservation', icon: 'calendar', color: '#7c3aed', screen: 'Reservation', desc: 'Leçons de conduite' },
  { id: 4, titre: 'Résultats', icon: 'stats-chart', color: '#059669', screen: 'Profil', desc: 'Mes scores' },
];

export default function DashboardScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [eleveData, setEleveData] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem('eleveData');
        const premium = await AsyncStorage.getItem('isPremium');
        if (data) setEleveData(JSON.parse(data));
        if (premium === 'true') setIsPremium(true);
      } catch (e) {}
    };
    load();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1d4ed8" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerGreeting}>
            Bonjour, {eleveData ? eleveData.prenom : 'Élève'} 👋
          </Text>
          <Text style={styles.headerSub}>Mondiale Auto-École</Text>
        </View>
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={14} color="#facc15" />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* Statut */}
        {eleveData ? (
          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Ionicons name="person" size={32} color="#1d4ed8" />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusName}>{eleveData.prenom} {eleveData.nom}</Text>
              <Text style={styles.statusFormule}>
                {eleveData.formule === 'toutes-categories' ? 'Toutes Catégories' : 'Catégorie A (Moto)'}
              </Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Inscrit ✓</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.noAccountCard}>
            <Ionicons name="person-circle-outline" size={48} color="#9ca3af" />
            <Text style={styles.noAccountTitle}>Pas encore inscrit ?</Text>
            <Text style={styles.noAccountSub}>Inscrivez-vous pour accéder à tous les cours</Text>
            <TouchableOpacity
              style={styles.inscriptionBtn}
              onPress={() => navigation.navigate('Inscription')}
            >
              <Text style={styles.inscriptionBtnText}>S'inscrire maintenant</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Progression */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ma Progression</Text>
          {[
            { label: 'Code de la route', progress: 0.35, color: '#1d4ed8' },
            { label: 'Panneaux', progress: 0.60, color: '#ea580c' },
            { label: 'Conduite pratique', progress: 0.20, color: '#7c3aed' },
          ].map((p, i) => (
            <View key={i} style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>{p.label}</Text>
                <Text style={[styles.progressPercent, { color: p.color }]}>{Math.round(p.progress * 100)}%</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${p.progress * 100}%`, backgroundColor: p.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Modules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes Modules</Text>
          <View style={styles.modulesGrid}>
            {modules.map(m => (
              <TouchableOpacity
                key={m.id}
                style={styles.moduleCard}
                onPress={() => navigation.navigate(m.screen)}
              >
                <View style={[styles.moduleIcon, { backgroundColor: m.color + '15' }]}>
                  <Ionicons name={m.icon} size={28} color={m.color} />
                </View>
                <Text style={styles.moduleTitre}>{m.titre}</Text>
                <Text style={styles.moduleDesc}>{m.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Prochains cours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prochains Cours</Text>
          {[
            { jour: 'Lundi', heure: '09h00', type: 'Code de la route', moniteur: 'M. Koffi' },
            { jour: 'Mercredi', heure: '14h00', type: 'Conduite pratique', moniteur: 'Mme. Coulibaly' },
          ].map((c, i) => (
            <View key={i} style={styles.coursCard}>
              <View style={styles.coursDate}>
                <Text style={styles.coursJour}>{c.jour}</Text>
                <Text style={styles.coursHeure}>{c.heure}</Text>
              </View>
              <View style={styles.coursInfo}>
                <Text style={styles.coursType}>{c.type}</Text>
                <Text style={styles.coursMoniteur}>{c.moniteur}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: {
    backgroundColor: '#1d4ed8', paddingHorizontal: 20, paddingVertical: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerGreeting: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 13, color: '#bfdbfe', marginTop: 2 },
  premiumBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#1e3a8a', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  premiumText: { color: '#facc15', fontWeight: 'bold', fontSize: 13 },
  scroll: { flex: 1, padding: 16 },
  statusCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  statusIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center',
  },
  statusInfo: { flex: 1 },
  statusName: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 2 },
  statusFormule: { fontSize: 13, color: '#6b7280', marginBottom: 6 },
  statusBadge: {
    alignSelf: 'flex-start', backgroundColor: '#dcfce7',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  statusBadgeText: { color: '#166534', fontWeight: '600', fontSize: 12 },
  noAccountCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 24,
    alignItems: 'center', marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 3,
  },
  noAccountTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginTop: 12 },
  noAccountSub: { fontSize: 13, color: '#6b7280', textAlign: 'center', marginTop: 4, marginBottom: 16 },
  inscriptionBtn: {
    backgroundColor: '#1d4ed8', paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 10,
  },
  inscriptionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  section: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  progressItem: { marginBottom: 14 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 14, color: '#374151', fontWeight: '500' },
  progressPercent: { fontSize: 14, fontWeight: 'bold' },
  progressTrack: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  modulesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  moduleCard: {
    width: '47%', backgroundColor: '#f9fafb', borderRadius: 12,
    padding: 16, alignItems: 'center',
  },
  moduleIcon: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  moduleTitre: { fontSize: 14, fontWeight: 'bold', color: '#1f2937', textAlign: 'center', marginBottom: 2 },
  moduleDesc: { fontSize: 11, color: '#6b7280', textAlign: 'center' },
  coursCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6',
  },
  coursDate: {
    backgroundColor: '#eff6ff', borderRadius: 10, padding: 10,
    alignItems: 'center', minWidth: 70,
  },
  coursJour: { fontSize: 13, fontWeight: 'bold', color: '#1d4ed8' },
  coursHeure: { fontSize: 12, color: '#3b82f6', marginTop: 2 },
  coursInfo: { flex: 1 },
  coursType: { fontSize: 15, fontWeight: '600', color: '#1f2937' },
  coursMoniteur: { fontSize: 13, color: '#6b7280', marginTop: 2 },
});
