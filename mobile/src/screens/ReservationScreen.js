import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Alert, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const creneaux = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
const moniteurs = [
  { id: 1, nom: 'M. Koffi Jean', specialite: 'Catégorie B & C', note: 4.9 },
  { id: 2, nom: 'Mme. Coulibaly', specialite: 'Catégorie A & B', note: 4.8 },
  { id: 3, nom: 'M. Diabaté', specialite: 'Toutes catégories', note: 4.7 },
];

export default function ReservationScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [selectedJour, setSelectedJour] = useState(null);
  const [selectedCreneau, setSelectedCreneau] = useState(null);
  const [selectedMoniteur, setSelectedMoniteur] = useState(null);
  const [step, setStep] = useState(1);

  const handleConfirm = () => {
    Alert.alert(
      'Réservation confirmée !',
      `Votre leçon est réservée le ${jours[selectedJour]} à ${selectedCreneau} avec ${moniteurs[selectedMoniteur].nom}.\n\nUn SMS de confirmation vous sera envoyé.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#7c3aed" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Réservation de Conduite</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* Étape 1 : Jour */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choisissez un jour</Text>
          <View style={styles.joursGrid}>
            {jours.map((j, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.jourBtn, selectedJour === i && styles.jourBtnActive]}
                onPress={() => setSelectedJour(i)}
              >
                <Text style={[styles.jourText, selectedJour === i && styles.jourTextActive]}>{j}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Étape 2 : Créneau */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choisissez un créneau</Text>
          <View style={styles.creneauxGrid}>
            {creneaux.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.creneauBtn, selectedCreneau === c && styles.creneauBtnActive]}
                onPress={() => setSelectedCreneau(c)}
              >
                <Text style={[styles.creneauText, selectedCreneau === c && styles.creneauTextActive]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Étape 3 : Moniteur */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choisissez un moniteur</Text>
          {moniteurs.map((m, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.moniteurCard, selectedMoniteur === i && styles.moniteurCardActive]}
              onPress={() => setSelectedMoniteur(i)}
            >
              <View style={styles.moniteurAvatar}>
                <Text style={styles.moniteurAvatarText}>{m.nom.split(' ').map(w => w[0]).join('')}</Text>
              </View>
              <View style={styles.moniteurInfo}>
                <Text style={styles.moniteurNom}>{m.nom}</Text>
                <Text style={styles.moniteurSpec}>{m.specialite}</Text>
                <View style={styles.moniteurNote}>
                  <Ionicons name="star" size={12} color="#f59e0b" />
                  <Text style={styles.moniteurNoteText}>{m.note}</Text>
                </View>
              </View>
              {selectedMoniteur === i && <Ionicons name="checkmark-circle" size={24} color="#7c3aed" />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Récapitulatif & confirmation */}
        {selectedJour !== null && selectedCreneau && selectedMoniteur !== null && (
          <View style={styles.recapCard}>
            <Text style={styles.recapTitle}>Récapitulatif</Text>
            <View style={styles.recapRow}>
              <Ionicons name="calendar" size={16} color="#6b7280" />
              <Text style={styles.recapText}>Jour : <Text style={styles.recapBold}>{jours[selectedJour]}</Text></Text>
            </View>
            <View style={styles.recapRow}>
              <Ionicons name="time" size={16} color="#6b7280" />
              <Text style={styles.recapText}>Heure : <Text style={styles.recapBold}>{selectedCreneau}</Text></Text>
            </View>
            <View style={styles.recapRow}>
              <Ionicons name="person" size={16} color="#6b7280" />
              <Text style={styles.recapText}>Moniteur : <Text style={styles.recapBold}>{moniteurs[selectedMoniteur].nom}</Text></Text>
            </View>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.confirmBtnText}>Confirmer la réservation</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Contact direct */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Besoin d'aide ?</Text>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => Linking.openURL('tel:0788005332')}
          >
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.callBtnText}>Appeler le 0788005332</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: {
    backgroundColor: '#7c3aed', flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  scroll: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#1f2937', marginBottom: 14 },
  joursGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  jourBtn: {
    width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#e5e7eb',
  },
  jourBtnActive: { borderColor: '#7c3aed', backgroundColor: '#7c3aed' },
  jourText: { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  jourTextActive: { color: '#fff' },
  creneauxGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  creneauBtn: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10,
    borderWidth: 2, borderColor: '#e5e7eb',
  },
  creneauBtnActive: { borderColor: '#7c3aed', backgroundColor: '#f5f3ff' },
  creneauText: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  creneauTextActive: { color: '#7c3aed' },
  moniteurCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12, padding: 14, marginBottom: 10,
  },
  moniteurCardActive: { borderColor: '#7c3aed', backgroundColor: '#f5f3ff' },
  moniteurAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center',
  },
  moniteurAvatarText: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  moniteurInfo: { flex: 1 },
  moniteurNom: { fontSize: 15, fontWeight: 'bold', color: '#1f2937', marginBottom: 2 },
  moniteurSpec: { fontSize: 13, color: '#6b7280', marginBottom: 4 },
  moniteurNote: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  moniteurNoteText: { fontSize: 13, color: '#f59e0b', fontWeight: '600' },
  recapCard: {
    backgroundColor: '#f5f3ff', borderRadius: 16, borderWidth: 2,
    borderColor: '#7c3aed', padding: 20, marginBottom: 14,
  },
  recapTitle: { fontSize: 17, fontWeight: 'bold', color: '#6d28d9', marginBottom: 14 },
  recapRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  recapText: { fontSize: 15, color: '#374151' },
  recapBold: { fontWeight: 'bold', color: '#1f2937' },
  confirmBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#7c3aed', paddingVertical: 16, borderRadius: 12, marginTop: 8,
  },
  confirmBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  contactCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  contactTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  callBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#1d4ed8', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12,
  },
  callBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
