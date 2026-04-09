import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const categories = [
  {
    id: 'danger',
    nom: 'Danger',
    color: '#ef4444',
    icon: 'warning',
    panneaux: [
      { emoji: '⚠️', nom: 'Danger', desc: 'Signal un danger sur la route à venir.' },
      { emoji: '🔺', nom: 'Virage à droite', desc: 'Virage dangereux à droite.' },
      { emoji: '🔻', nom: 'Virage à gauche', desc: 'Virage dangereux à gauche.' },
      { emoji: '⛰️', nom: 'Descente dangereuse', desc: 'Forte descente à venir.' },
      { emoji: '🌉', nom: 'Pont étroit', desc: 'Pont à chaussée rétrécie.' },
      { emoji: '🚧', nom: 'Travaux', desc: 'Zone de travaux sur la route.' },
    ],
  },
  {
    id: 'interdiction',
    nom: 'Interdiction',
    color: '#dc2626',
    icon: 'ban',
    panneaux: [
      { emoji: '🚫', nom: 'Sens interdit', desc: 'Accès interdit à tout véhicule.' },
      { emoji: '🛑', nom: 'Stop', desc: 'Arrêt obligatoire et priorité aux autres.' },
      { emoji: '⛔', nom: 'Circulation interdite', desc: 'Interdit dans les deux sens.' },
      { emoji: '🚗', nom: 'Interdit aux autos', desc: 'Accès interdit aux automobiles.' },
      { emoji: '🚚', nom: 'Interdit poids lourds', desc: 'Interdit aux véhicules lourds.' },
      { emoji: '📵', nom: 'Klaxon interdit', desc: 'Interdit d\'utiliser le klaxon.' },
    ],
  },
  {
    id: 'obligation',
    nom: 'Obligation',
    color: '#1d4ed8',
    icon: 'arrow-forward-circle',
    panneaux: [
      { emoji: '⬆️', nom: 'Tout droit', desc: 'Obligation d\'aller tout droit.' },
      { emoji: '↩️', nom: 'Tourner à gauche', desc: 'Obligation de tourner à gauche.' },
      { emoji: '↪️', nom: 'Tourner à droite', desc: 'Obligation de tourner à droite.' },
      { emoji: '🔄', nom: 'Giratoire', desc: 'Sens giratoire obligatoire.' },
      { emoji: '🛣️', nom: 'Voie obligatoire', desc: 'Voie réservée aux véhicules.' },
      { emoji: '💡', nom: 'Feux obligatoires', desc: 'Allumez vos feux de croisement.' },
    ],
  },
  {
    id: 'information',
    nom: 'Information',
    color: '#059669',
    icon: 'information-circle',
    panneaux: [
      { emoji: '🅿️', nom: 'Parking', desc: 'Zone de stationnement autorisé.' },
      { emoji: '🏥', nom: 'Hôpital', desc: 'Établissement de soins à proximité.' },
      { emoji: '⛽', nom: 'Station-service', desc: 'Station d\'essence à proximité.' },
      { emoji: '🍽️', nom: 'Restaurant', desc: 'Restaurant à proximité.' },
      { emoji: '🏨', nom: 'Hôtel', desc: 'Hôtel à proximité.' },
      { emoji: '📞', nom: 'Téléphone', desc: 'Borne d\'appel d\'urgence.' },
    ],
  },
];

export default function PanneauxScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCat, setSelectedCat] = useState('danger');
  const [selectedPanneau, setSelectedPanneau] = useState(null);

  const currentCat = categories.find(c => c.id === selectedCat);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1d4ed8" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Panneaux de Signalisation</Text>
        <Text style={styles.headerSub}>93+ panneaux à apprendre</Text>
      </View>

      {/* Catégories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catsScroll}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.catChip, selectedCat === cat.id && { backgroundColor: cat.color }]}
            onPress={() => setSelectedCat(cat.id)}
          >
            <Ionicons name={cat.icon} size={16} color={selectedCat === cat.id ? '#fff' : cat.color} />
            <Text style={[styles.catChipText, selectedCat === cat.id && { color: '#fff' }]}>{cat.nom}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Panneaux grid */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {currentCat?.panneaux.map((p, i) => (
            <TouchableOpacity key={i} style={styles.panneauCard} onPress={() => setSelectedPanneau(p)}>
              <Text style={styles.panneauEmoji}>{p.emoji}</Text>
              <Text style={styles.panneauNom} numberOfLines={2}>{p.nom}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal détail */}
      <Modal visible={!!selectedPanneau} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSelectedPanneau(null)}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>{selectedPanneau?.emoji}</Text>
            <Text style={styles.modalNom}>{selectedPanneau?.nom}</Text>
            <Text style={styles.modalDesc}>{selectedPanneau?.desc}</Text>
            <TouchableOpacity style={[styles.modalBtn, { backgroundColor: currentCat?.color }]} onPress={() => setSelectedPanneau(null)}>
              <Text style={styles.modalBtnText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#1d4ed8', padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 13, color: '#bfdbfe', marginTop: 2 },
  catsScroll: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 12, maxHeight: 60 },
  catChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    borderWidth: 1.5, borderColor: '#e5e7eb', marginRight: 8,
    backgroundColor: '#fff',
  },
  catChipText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  scroll: { flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 10 },
  panneauCard: {
    width: '30%', backgroundColor: '#fff', borderRadius: 14,
    padding: 14, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  panneauEmoji: { fontSize: 36, marginBottom: 8 },
  panneauNom: { fontSize: 12, fontWeight: '600', color: '#374151', textAlign: 'center' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center', padding: 32,
  },
  modalCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 32,
    alignItems: 'center', width: '100%',
  },
  modalEmoji: { fontSize: 72, marginBottom: 16 },
  modalNom: { fontSize: 22, fontWeight: 'bold', color: '#1f2937', marginBottom: 10, textAlign: 'center' },
  modalDesc: { fontSize: 15, color: '#6b7280', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  modalBtn: { paddingHorizontal: 32, paddingVertical: 12, borderRadius: 10 },
  modalBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
