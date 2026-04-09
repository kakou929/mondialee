import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ADMIN_PASSWORD = 'admin2025';

export default function AdminScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('eleves');

  const eleves = [
    { nom: 'Konan Marie', telephone: '0701234567', formule: 'Toutes Cat.', statut: 'Actif', date: '01/04/2025' },
    { nom: 'Yao Patrick', telephone: '0709876543', formule: 'Cat. A', statut: 'Actif', date: '28/03/2025' },
    { nom: 'Diallo Aminata', telephone: '0712345678', formule: 'Toutes Cat.', statut: 'Examen', date: '15/03/2025' },
    { nom: 'Bamba Issiaka', telephone: '0798765432', formule: 'Toutes Cat.', statut: 'Actif', date: '10/04/2025' },
  ];

  const stats = [
    { label: 'Total élèves', val: '248', icon: 'people', color: '#1d4ed8' },
    { label: 'Actifs ce mois', val: '42', icon: 'person-add', color: '#059669' },
    { label: 'Taux réussite', val: '85%', icon: 'trophy', color: '#f59e0b' },
    { label: 'Revenus (FCFA)', val: '3.2M', icon: 'wallet', color: '#7c3aed' },
  ];

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      Alert.alert('Erreur', 'Mot de passe incorrect.');
      setPassword('');
    }
  };

  if (!authenticated) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Interface Admin</Text>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.loginIcon}>
            <Ionicons name="shield-checkmark" size={48} color="#1d4ed8" />
          </View>
          <Text style={styles.loginTitle}>Accès Administrateur</Text>
          <Text style={styles.loginSub}>Entrez le mot de passe admin</Text>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            onSubmitEditing={handleLogin}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      <View style={[styles.header, { backgroundColor: '#1f2937' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Interface Admin</Text>
        <TouchableOpacity onPress={() => setAuthenticated(false)}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['eleves', 'stats'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'eleves' ? 'Élèves' : 'Statistiques'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {activeTab === 'stats' && (
          <>
            <View style={styles.statsGrid}>
              {stats.map((s, i) => (
                <View key={i} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: s.color + '20' }]}>
                    <Ionicons name={s.icon} size={24} color={s.color} />
                  </View>
                  <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Résumé du mois</Text>
              {[
                { label: 'Nouvelles inscriptions', val: '42' },
                { label: 'Examens réussis', val: '36' },
                { label: 'Leçons de conduite', val: '128' },
                { label: 'Quiz complétés', val: '847' },
              ].map((r, i) => (
                <View key={i} style={styles.recapRow}>
                  <Text style={styles.recapLabel}>{r.label}</Text>
                  <Text style={styles.recapVal}>{r.val}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {activeTab === 'eleves' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Liste des Élèves ({eleves.length})</Text>
            {eleves.map((e, i) => (
              <View key={i} style={styles.eleveItem}>
                <View style={styles.eleveAvatar}>
                  <Text style={styles.eleveAvatarText}>{e.nom.split(' ').map(w => w[0]).join('')}</Text>
                </View>
                <View style={styles.eleveInfo}>
                  <Text style={styles.eleveNom}>{e.nom}</Text>
                  <Text style={styles.eleveTel}>{e.telephone} · {e.formule}</Text>
                  <Text style={styles.eleveDate}>{e.date}</Text>
                </View>
                <View style={[styles.eleveStatut, {
                  backgroundColor: e.statut === 'Actif' ? '#dcfce7' : '#fef3c7'
                }]}>
                  <Text style={[styles.eleveStatutText, {
                    color: e.statut === 'Actif' ? '#166534' : '#92400e'
                  }]}>{e.statut}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: {
    backgroundColor: '#1d4ed8', flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16,
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', flex: 1, textAlign: 'center' },
  loginContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  loginIcon: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: '#eff6ff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  loginTitle: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
  loginSub: { fontSize: 14, color: '#6b7280', marginBottom: 24 },
  passwordInput: {
    width: '100%', borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14, fontSize: 16,
    backgroundColor: '#fff', marginBottom: 16,
  },
  loginBtn: {
    width: '100%', backgroundColor: '#1d4ed8', paddingVertical: 16,
    borderRadius: 12, alignItems: 'center',
  },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  tabs: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#1d4ed8' },
  tabText: { fontSize: 15, fontWeight: '600', color: '#6b7280' },
  tabTextActive: { color: '#1d4ed8' },
  scroll: { flex: 1, padding: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  statCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 14, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  statIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  statVal: { fontSize: 26, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6b7280', textAlign: 'center' },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#1f2937', marginBottom: 14 },
  recapRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6',
  },
  recapLabel: { fontSize: 14, color: '#6b7280' },
  recapVal: { fontSize: 14, fontWeight: 'bold', color: '#1f2937' },
  eleveItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6',
  },
  eleveAvatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#1d4ed8', alignItems: 'center', justifyContent: 'center',
  },
  eleveAvatarText: { fontSize: 13, fontWeight: 'bold', color: '#fff' },
  eleveInfo: { flex: 1 },
  eleveNom: { fontSize: 14, fontWeight: 'bold', color: '#1f2937' },
  eleveTel: { fontSize: 12, color: '#6b7280', marginTop: 1 },
  eleveDate: { fontSize: 11, color: '#9ca3af', marginTop: 1 },
  eleveStatut: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  eleveStatutText: { fontSize: 12, fontWeight: '600' },
});
