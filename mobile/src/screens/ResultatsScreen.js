import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultatsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [eleveData, setEleveData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem('eleveData');
        if (data) setEleveData(JSON.parse(data));
      } catch (e) {}
    };
    load();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Déconnexion', 'Voulez-vous vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnecter',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          setEleveData(null);
        },
      },
    ]);
  };

  const stats = [
    { label: 'Quiz complétés', val: '12', icon: 'checkmark-circle', color: '#1d4ed8' },
    { label: 'Meilleur score', val: '95%', icon: 'trophy', color: '#f59e0b' },
    { label: 'Heures de cours', val: '8h', icon: 'time', color: '#7c3aed' },
    { label: 'Panneaux appris', val: '47', icon: 'warning', color: '#ea580c' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1d4ed8" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Espace</Text>
        {eleveData && (
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {eleveData ? (
          <>
            {/* Profil */}
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {eleveData.prenom?.[0]}{eleveData.nom?.[0]}
                </Text>
              </View>
              <Text style={styles.profileName}>{eleveData.prenom} {eleveData.nom}</Text>
              <Text style={styles.profilePhone}>{eleveData.telephone}</Text>
              <View style={styles.formuleTag}>
                <Text style={styles.formuleTagText}>
                  {eleveData.formule === 'toutes-categories' ? 'Toutes Catégories' : 'Catégorie A (Moto)'}
                </Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsGrid}>
              {stats.map((s, i) => (
                <View key={i} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: s.color + '20' }]}>
                    <Ionicons name={s.icon} size={22} color={s.color} />
                  </View>
                  <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Historique */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Historique des Quiz</Text>
              {[
                { serie: 'Série 1 - Règles de base', score: 18, total: 20, date: '08/04/2025' },
                { serie: 'Série 2 - Priorités', score: 15, total: 20, date: '07/04/2025' },
                { serie: 'Série 3 - Signalisation', score: 19, total: 20, date: '06/04/2025' },
              ].map((h, i) => (
                <View key={i} style={styles.histItem}>
                  <View style={styles.histInfo}>
                    <Text style={styles.histSerie}>{h.serie}</Text>
                    <Text style={styles.histDate}>{h.date}</Text>
                  </View>
                  <View style={[styles.histScore, {
                    backgroundColor: (h.score / h.total) >= 0.7 ? '#dcfce7' : '#fef2f2'
                  }]}>
                    <Text style={[styles.histScoreText, {
                      color: (h.score / h.total) >= 0.7 ? '#166534' : '#991b1b'
                    }]}>{h.score}/{h.total}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Informations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mes Informations</Text>
              {[
                { label: 'Commune', val: eleveData.commune || 'Non renseigné' },
                { label: 'Paiement', val: eleveData.paiement === 'trois-fois' ? 'En 3 fois' : 'En une fois' },
                { label: 'Date d\'inscription', val: eleveData.dateInscription ? new Date(eleveData.dateInscription).toLocaleDateString('fr-FR') : '-' },
              ].map((info, i) => (
                <View key={i} style={styles.infoRow}>
                  <Text style={styles.infoLabel}>{info.label}</Text>
                  <Text style={styles.infoVal}>{info.val}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="person-circle-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyTitle}>Non connecté</Text>
            <Text style={styles.emptySub}>Inscrivez-vous pour suivre votre progression</Text>
            <TouchableOpacity
              style={styles.inscriptionBtn}
              onPress={() => navigation.navigate('Inscription')}
            >
              <Text style={styles.inscriptionBtnText}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: {
    backgroundColor: '#1d4ed8', padding: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  logoutBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: { flex: 1, padding: 16 },
  profileCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 24,
    alignItems: 'center', marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#1d4ed8',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  profileName: { fontSize: 22, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 },
  profilePhone: { fontSize: 15, color: '#6b7280', marginBottom: 10 },
  formuleTag: {
    backgroundColor: '#eff6ff', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20,
  },
  formuleTagText: { color: '#1d4ed8', fontWeight: '600', fontSize: 13 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  statCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 14, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  statIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  statVal: { fontSize: 24, fontWeight: 'bold', marginBottom: 2 },
  statLabel: { fontSize: 12, color: '#6b7280', textAlign: 'center' },
  section: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#1f2937', marginBottom: 14 },
  histItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6',
  },
  histInfo: { flex: 1 },
  histSerie: { fontSize: 14, fontWeight: '600', color: '#1f2937' },
  histDate: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  histScore: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  histScoreText: { fontSize: 14, fontWeight: 'bold' },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6',
  },
  infoLabel: { fontSize: 14, color: '#6b7280' },
  infoVal: { fontSize: 14, fontWeight: '600', color: '#1f2937' },
  emptyCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 40, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937', marginTop: 14 },
  emptySub: { fontSize: 14, color: '#6b7280', textAlign: 'center', marginTop: 6, marginBottom: 20 },
  inscriptionBtn: {
    backgroundColor: '#1d4ed8', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12,
  },
  inscriptionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
