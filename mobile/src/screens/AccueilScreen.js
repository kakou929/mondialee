import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const avantages = [
  { icon: 'checkmark-circle', titre: 'Taux de réussite 85%', description: 'Nos élèves réussissent du premier coup' },
  { icon: 'people', titre: 'Moniteurs diplômés', description: 'Plus de 10 ans d\'expérience' },
  { icon: 'medal', titre: 'Formation complète', description: 'Code + Conduite + Examen' },
  { icon: 'time', titre: 'Horaires flexibles', description: '7 jours sur 7, de 8h à 18h' },
];

const formules = [
  {
    nom: 'Toutes Catégories',
    prix: '150 000',
    badge: 'Le plus complet',
    color: '#1d4ed8',
    avantages: [
      'Code de la route complet',
      '40 séries de quiz en ligne',
      '93+ panneaux de signalisation',
      'Toutes catégories de permis',
      'Support moniteur 24/7',
      'Accès à vie à la plateforme',
    ],
  },
  {
    nom: 'Catégorie A (Moto)',
    prix: '120 000',
    badge: 'Spécial Moto',
    color: '#ea580c',
    avantages: [
      'Code de la route moto',
      '30 séries de quiz moto',
      'Panneaux spécifiques',
      'Formation catégorie A',
      'Support moniteur 24/7',
      'Accès 6 mois',
    ],
  },
];

const temoignages = [
  { nom: 'Konan Marie', note: 5, texte: 'Excellente école ! J\'ai eu mon permis en 2 mois.' },
  { nom: 'Yao Patrick', note: 5, texte: 'Formation complète et pédagogie moderne.' },
  { nom: 'Diallo Aminata', note: 5, texte: 'Je recommande à 100% ! Prix abordable.' },
];

export default function AccueilScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1d4ed8" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <View>
            <Text style={styles.logoTitle}>Mondiale Auto-École</Text>
            <Text style={styles.logoSubtitle}>Abidjan, Côte d'Ivoire</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.callBtn}
          onPress={() => Linking.openURL('tel:0788005332')}
        >
          <Ionicons name="call" size={20} color="#1d4ed8" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🏆 Taux de réussite 85%</Text>
          </View>
          <Text style={styles.heroTitle}>Passez Votre{'\n'}Permis Chez Nous !</Text>
          <Text style={styles.heroSubtitle}>
            Formation complète au code de la route et à la conduite.
            Méthode moderne, résultats garantis.
          </Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => navigation.navigate('Inscription')}
            >
              <Text style={styles.btnPrimaryText}>S'inscrire maintenant</Text>
              <Ionicons name="arrow-forward" size={18} color="#1d4ed8" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={() => navigation.navigate('MesCours')}
            >
              <Text style={styles.btnSecondaryText}>Se connecter</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsGrid}>
            {[
              { val: '85%', label: 'Taux de réussite' },
              { val: '2000+', label: 'Élèves formés' },
              { val: '15+', label: 'Ans d\'expérience' },
              { val: '24/7', label: 'Support disponible' },
            ].map((stat, i) => (
              <View key={i} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.val}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Avantages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pourquoi Choisir Mondiale ?</Text>
          <Text style={styles.sectionSubtitle}>Les meilleures conditions pour réussir</Text>
          {avantages.map((item, i) => (
            <View key={i} style={styles.avantageCard}>
              <View style={styles.avantageIcon}>
                <Ionicons name={item.icon} size={24} color="#1d4ed8" />
              </View>
              <View style={styles.avantageText}>
                <Text style={styles.avantageTitle}>{item.titre}</Text>
                <Text style={styles.avantageDesc}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Formules */}
        <View style={[styles.section, styles.bgGray]}>
          <Text style={styles.sectionTitle}>Nos Formules</Text>
          <Text style={styles.sectionSubtitle}>Choisissez votre formation</Text>
          {formules.map((formule, i) => (
            <View key={i} style={styles.formuleCard}>
              <View style={[styles.formuleHeader, { backgroundColor: formule.color }]}>
                <View style={styles.formuleHeaderRow}>
                  <Text style={styles.formuleNom}>{formule.nom}</Text>
                  <View style={styles.formuleBadge}>
                    <Text style={styles.formuleBadgeText}>{formule.badge}</Text>
                  </View>
                </View>
                <Text style={styles.formulePrix}>{formule.prix} FCFA</Text>
              </View>
              <View style={styles.formuleBody}>
                {formule.avantages.map((av, j) => (
                  <View key={j} style={styles.formuleAv}>
                    <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
                    <Text style={styles.formuleAvText}>{av}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={[styles.formuleBtn, { backgroundColor: formule.color }]}
                  onPress={() => navigation.navigate('Inscription')}
                >
                  <Text style={styles.formuleBtnText}>Choisir cette formule</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Témoignages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ce Que Disent Nos Élèves</Text>
          <Text style={styles.sectionSubtitle}>Des centaines d'élèves satisfaits</Text>
          {temoignages.map((t, i) => (
            <View key={i} style={styles.temoignageCard}>
              <View style={styles.stars}>
                {[...Array(t.note)].map((_, j) => (
                  <Ionicons key={j} name="star" size={16} color="#facc15" />
                ))}
              </View>
              <Text style={styles.temoignageTexte}>"{t.texte}"</Text>
              <Text style={styles.temoignageNom}>{t.nom}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Prêt à Commencer ?</Text>
          <Text style={styles.ctaSubtitle}>
            Rejoignez les milliers d'élèves qui ont obtenu leur permis avec nous
          </Text>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => navigation.navigate('Inscription')}
          >
            <Text style={styles.ctaBtnText}>S'inscrire maintenant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ctaCallBtn}
            onPress={() => Linking.openURL('tel:0788005332')}
          >
            <Ionicons name="call" size={18} color="#ffffff" />
            <Text style={styles.ctaCallText}>Appelez-nous : 0788005332</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Mondiale Auto-École</Text>
          <Text style={styles.footerSub}>Cocody, Abidjan, Côte d'Ivoire</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  logoTitle: { fontSize: 15, fontWeight: 'bold', color: '#1f2937' },
  logoSubtitle: { fontSize: 11, color: '#6b7280' },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    backgroundColor: '#1d4ed8',
    padding: 24,
    paddingBottom: 32,
  },
  heroBadge: {
    backgroundColor: '#facc15',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  heroBadgeText: { color: '#1e3a8a', fontWeight: 'bold', fontSize: 13 },
  heroTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff', lineHeight: 40, marginBottom: 12 },
  heroSubtitle: { fontSize: 15, color: '#bfdbfe', lineHeight: 22, marginBottom: 24 },
  heroButtons: { gap: 12, marginBottom: 24 },
  btnPrimary: {
    backgroundColor: '#facc15',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  btnPrimaryText: { color: '#1e3a8a', fontWeight: 'bold', fontSize: 16 },
  btnSecondary: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  btnSecondaryText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  statItem: { width: '45%', alignItems: 'center', paddingVertical: 8 },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 11, color: '#bfdbfe', textAlign: 'center' },
  section: { padding: 24 },
  bgGray: { backgroundColor: '#f9fafb' },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', textAlign: 'center', marginBottom: 6 },
  sectionSubtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 20 },
  avantageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  avantageIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avantageText: { flex: 1 },
  avantageTitle: { fontSize: 15, fontWeight: 'bold', color: '#1f2937', marginBottom: 2 },
  avantageDesc: { fontSize: 13, color: '#6b7280' },
  formuleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  formuleHeader: { padding: 20 },
  formuleHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  formuleNom: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  formuleBadge: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  formuleBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  formulePrix: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  formuleBody: { padding: 20 },
  formuleAv: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  formuleAvText: { fontSize: 14, color: '#374151', flex: 1 },
  formuleBtn: { paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  formuleBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  temoignageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  stars: { flexDirection: 'row', gap: 2, marginBottom: 8 },
  temoignageTexte: { fontSize: 14, color: '#374151', fontStyle: 'italic', marginBottom: 8, lineHeight: 20 },
  temoignageNom: { fontSize: 14, fontWeight: 'bold', color: '#1f2937' },
  cta: { backgroundColor: '#1d4ed8', padding: 32, alignItems: 'center' },
  ctaTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },
  ctaSubtitle: { fontSize: 14, color: '#bfdbfe', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  ctaBtn: {
    backgroundColor: '#facc15',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  ctaBtnText: { color: '#1e3a8a', fontWeight: 'bold', fontSize: 16 },
  ctaCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  ctaCallText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  footer: { backgroundColor: '#111827', padding: 20, alignItems: 'center' },
  footerText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  footerSub: { color: '#9ca3af', fontSize: 12, marginTop: 4 },
});
