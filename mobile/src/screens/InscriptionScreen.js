import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InscriptionScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    sexe: '',
    telephone: '',
    email: '',
    adresse: '',
    commune: '',
    formule: 'toutes-categories',
    paiement: 'une-fois',
  });
  const [errors, setErrors] = useState({});

  const communes = ['Cocody', 'Plateau', 'Adjamé', 'Yopougon', 'Abobo', 'Marcory', 'Treichville', 'Koumassi', 'Port-Bouët', 'Attécoubé'];

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!formData.nom.trim()) e.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) e.prenom = 'Le prénom est requis';
    if (!formData.dateNaissance.trim()) e.dateNaissance = 'La date de naissance est requise';
    if (!formData.lieuNaissance.trim()) e.lieuNaissance = 'Le lieu de naissance est requis';
    if (!formData.sexe) e.sexe = 'Le sexe est requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!formData.telephone.trim()) e.telephone = 'Le téléphone est requis';
    else if (formData.telephone.replace(/\s/g, '').length < 10) e.telephone = 'Numéro invalide';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Email invalide';
    if (!formData.adresse.trim()) e.adresse = 'L\'adresse est requise';
    if (!formData.commune) e.commune = 'La commune est requise';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3) setStep(4);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const eleveData = {
        ...formData,
        dateInscription: new Date().toISOString(),
        statut: 'inscrit',
        isPremium: true,
      };
      await AsyncStorage.setItem('eleveData', JSON.stringify(eleveData));
      await AsyncStorage.setItem('isPremium', 'true');
      await AsyncStorage.setItem('userPhone', formData.telephone);
      setIsSubmitting(false);
      Alert.alert(
        'Inscription confirmée !',
        'Bienvenue chez Mondiale Auto-École ! Vous avez maintenant accès à toute la plateforme.',
        [{ text: 'Accéder à mes cours', onPress: () => navigation.navigate('MesCours') }]
      );
    } catch (err) {
      setIsSubmitting(false);
      Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const montantTotal = formData.formule === 'toutes-categories' ? 150000 : 120000;
  const montantVersement = formData.paiement === 'trois-fois' ? Math.ceil(montantTotal / 3) : montantTotal;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => step === 1 ? navigation.goBack() : setStep(step - 1)}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Formulaire d'Inscription</Text>
          <Text style={styles.headerStep}>Étape {step} sur 4</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progress}>
        {[1, 2, 3, 4].map(s => (
          <View key={s} style={[styles.progressBar, s <= step ? styles.progressActive : styles.progressInactive]} />
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Étape 1 : Informations personnelles */}
        {step === 1 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informations Personnelles</Text>

            <Field label="Nom *" error={errors.nom}>
              <TextInput style={[styles.input, errors.nom && styles.inputError]}
                value={formData.nom} onChangeText={v => handleChange('nom', v)}
                placeholder="Votre nom" />
            </Field>

            <Field label="Prénom *" error={errors.prenom}>
              <TextInput style={[styles.input, errors.prenom && styles.inputError]}
                value={formData.prenom} onChangeText={v => handleChange('prenom', v)}
                placeholder="Votre prénom" />
            </Field>

            <Field label="Date de naissance * (JJ/MM/AAAA)" error={errors.dateNaissance}>
              <TextInput style={[styles.input, errors.dateNaissance && styles.inputError]}
                value={formData.dateNaissance} onChangeText={v => handleChange('dateNaissance', v)}
                placeholder="ex: 15/03/1995" keyboardType="numeric" />
            </Field>

            <Field label="Lieu de naissance *" error={errors.lieuNaissance}>
              <TextInput style={[styles.input, errors.lieuNaissance && styles.inputError]}
                value={formData.lieuNaissance} onChangeText={v => handleChange('lieuNaissance', v)}
                placeholder="Ville de naissance" />
            </Field>

            <Field label="Sexe *" error={errors.sexe}>
              <View style={styles.radioGroup}>
                {['M', 'F'].map(val => (
                  <TouchableOpacity
                    key={val}
                    style={[styles.radioBtn, formData.sexe === val && styles.radioBtnActive]}
                    onPress={() => handleChange('sexe', val)}
                  >
                    <Text style={[styles.radioText, formData.sexe === val && styles.radioTextActive]}>
                      {val === 'M' ? 'Masculin' : 'Féminin'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Field>

            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>Continuer</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Étape 2 : Coordonnées */}
        {step === 2 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Coordonnées</Text>

            <Field label="Téléphone *" error={errors.telephone}>
              <TextInput style={[styles.input, errors.telephone && styles.inputError]}
                value={formData.telephone} onChangeText={v => handleChange('telephone', v)}
                placeholder="XX XX XX XX XX" keyboardType="phone-pad" />
            </Field>

            <Field label="Email (optionnel)" error={errors.email}>
              <TextInput style={[styles.input, errors.email && styles.inputError]}
                value={formData.email} onChangeText={v => handleChange('email', v)}
                placeholder="votre.email@example.com" keyboardType="email-address" autoCapitalize="none" />
            </Field>

            <Field label="Adresse *" error={errors.adresse}>
              <TextInput style={[styles.input, errors.adresse && styles.inputError]}
                value={formData.adresse} onChangeText={v => handleChange('adresse', v)}
                placeholder="Numéro et rue" />
            </Field>

            <Field label="Commune *" error={errors.commune}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.communeScroll}>
                {communes.map(c => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.communeChip, formData.commune === c && styles.communeChipActive]}
                    onPress={() => handleChange('commune', c)}
                  >
                    <Text style={[styles.communeChipText, formData.commune === c && styles.communeChipTextActive]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Field>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.backBtnSmall} onPress={() => setStep(1)}>
                <Text style={styles.backBtnSmallText}>Retour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextBtnHalf} onPress={handleNext}>
                <Text style={styles.nextBtnText}>Continuer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Étape 3 : Formation */}
        {step === 3 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Choisissez votre Formation</Text>

            {[
              { val: 'toutes-categories', nom: 'Toutes Catégories', prix: '150 000 FCFA', color: '#1d4ed8' },
              { val: 'categorie-a', nom: 'Catégorie A (Moto)', prix: '120 000 FCFA', color: '#ea580c' },
            ].map(f => (
              <TouchableOpacity
                key={f.val}
                style={[styles.formuleOption, formData.formule === f.val && { borderColor: f.color, backgroundColor: f.color + '10' }]}
                onPress={() => handleChange('formule', f.val)}
              >
                <View style={styles.formuleOptionLeft}>
                  <Text style={styles.formuleOptionNom}>{f.nom}</Text>
                  <Text style={[styles.formuleOptionPrix, { color: f.color }]}>{f.prix}</Text>
                </View>
                {formData.formule === f.val && <Ionicons name="checkmark-circle" size={24} color={f.color} />}
              </TouchableOpacity>
            ))}

            <Text style={styles.subTitle}>Mode de paiement</Text>

            {[
              { val: 'une-fois', label: 'Paiement en une fois', sub: 'Accès immédiat complet', montant: montantTotal },
              { val: 'trois-fois', label: 'Paiement en 3 fois', sub: 'Accès immédiat dès le 1er versement', montant: Math.ceil(montantTotal / 3) },
            ].map(p => (
              <TouchableOpacity
                key={p.val}
                style={[styles.paiementOption, formData.paiement === p.val && styles.paiementOptionActive]}
                onPress={() => handleChange('paiement', p.val)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.paiementLabel}>{p.label}</Text>
                  <Text style={styles.paiementSub}>{p.sub}</Text>
                </View>
                <Text style={styles.paiementMontant}>{p.montant.toLocaleString()} F</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.infoBox}>
              <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
              <Text style={styles.infoBoxText}>Accès immédiat dès le premier versement !</Text>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.backBtnSmall} onPress={() => setStep(2)}>
                <Text style={styles.backBtnSmallText}>Retour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextBtnHalf} onPress={handleNext}>
                <Text style={styles.nextBtnText}>Continuer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Étape 4 : Paiement Wave */}
        {step === 4 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Paiement Wave Money</Text>

            {/* Récapitulatif */}
            <View style={styles.recap}>
              <Text style={styles.recapTitle}>Récapitulatif</Text>
              {[
                { label: 'Nom complet', val: `${formData.prenom} ${formData.nom}` },
                { label: 'Téléphone', val: formData.telephone },
                { label: 'Formation', val: formData.formule === 'toutes-categories' ? 'Toutes Catégories' : 'Catégorie A (Moto)' },
                { label: 'Paiement', val: formData.paiement === 'trois-fois' ? 'En 3 fois' : 'En une fois' },
              ].map((r, i) => (
                <View key={i} style={styles.recapRow}>
                  <Text style={styles.recapLabel}>{r.label} :</Text>
                  <Text style={styles.recapVal}>{r.val}</Text>
                </View>
              ))}
              <View style={[styles.recapRow, styles.recapTotal]}>
                <Text style={styles.recapTotalLabel}>À payer maintenant :</Text>
                <Text style={styles.recapTotalVal}>{montantVersement.toLocaleString()} FCFA</Text>
              </View>
            </View>

            {/* Wave */}
            <View style={styles.waveBox}>
              <Text style={styles.waveTitle}>💰 Envoyez votre paiement Wave</Text>
              <View style={styles.waveNumero}>
                <Text style={styles.waveNumeroLabel}>Numéro Wave</Text>
                <Text style={styles.waveNumeroVal}>0788005332</Text>
              </View>
              <Text style={styles.waveMontant}>Montant : {montantVersement.toLocaleString()} FCFA</Text>
              <TouchableOpacity
                style={styles.waveOpenBtn}
                onPress={() => Linking.openURL('https://wave.com/send?phone=0788005332')}
              >
                <Text style={styles.waveOpenBtnText}>Ouvrir Wave</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.alertBox}>
              <Ionicons name="information-circle" size={20} color="#1d4ed8" />
              <Text style={styles.alertText}>
                Après paiement au <Text style={{ fontWeight: 'bold' }}>0788005332</Text>, cliquez sur "Confirmer mon inscription".
              </Text>
            </View>

            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.backBtnSmall} onPress={() => setStep(3)} disabled={isSubmitting}>
                <Text style={styles.backBtnSmallText}>Retour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit} disabled={isSubmitting}>
                {isSubmitting
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.confirmBtnText}>Confirmer mon inscription</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Field({ label, error, children }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={fieldStyles.label}>{label}</Text>
      {children}
      {error ? <Text style={fieldStyles.error}>{error}</Text> : null}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  error: { fontSize: 12, color: '#ef4444', marginTop: 4 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: {
    backgroundColor: '#1d4ed8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  headerStep: { fontSize: 13, color: '#bfdbfe' },
  progress: { flexDirection: 'row', gap: 4, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#1d4ed8' },
  progressBar: { flex: 1, height: 6, borderRadius: 3 },
  progressActive: { backgroundColor: '#fff' },
  progressInactive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  content: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 16,
    padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937', marginBottom: 20 },
  input: {
    borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#1f2937',
  },
  inputError: { borderColor: '#ef4444' },
  radioGroup: { flexDirection: 'row', gap: 12 },
  radioBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 10,
    borderWidth: 2, borderColor: '#e5e7eb', alignItems: 'center',
  },
  radioBtnActive: { borderColor: '#1d4ed8', backgroundColor: '#eff6ff' },
  radioText: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  radioTextActive: { color: '#1d4ed8' },
  nextBtn: {
    backgroundColor: '#1d4ed8', paddingVertical: 16,
    borderRadius: 10, alignItems: 'center', marginTop: 8,
  },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  backBtnSmall: {
    flex: 1, paddingVertical: 16, borderRadius: 10,
    alignItems: 'center', backgroundColor: '#e5e7eb',
  },
  backBtnSmallText: { color: '#374151', fontWeight: 'bold', fontSize: 15 },
  nextBtnHalf: {
    flex: 2, paddingVertical: 16, borderRadius: 10,
    alignItems: 'center', backgroundColor: '#1d4ed8',
  },
  communeScroll: { marginTop: 4 },
  communeChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 2, borderColor: '#e5e7eb', marginRight: 8, marginBottom: 4,
  },
  communeChipActive: { borderColor: '#1d4ed8', backgroundColor: '#eff6ff' },
  communeChipText: { fontSize: 13, color: '#6b7280', fontWeight: '600' },
  communeChipTextActive: { color: '#1d4ed8' },
  formuleOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 12,
    padding: 16, marginBottom: 12,
  },
  formuleOptionLeft: {},
  formuleOptionNom: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 },
  formuleOptionPrix: { fontSize: 22, fontWeight: 'bold' },
  subTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12, marginTop: 8 },
  paiementOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 10, padding: 14, marginBottom: 10,
  },
  paiementOptionActive: { borderColor: '#1d4ed8', backgroundColor: '#eff6ff' },
  paiementLabel: { fontSize: 14, fontWeight: '600', color: '#1f2937' },
  paiementSub: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  paiementMontant: { fontSize: 18, fontWeight: 'bold', color: '#1d4ed8' },
  infoBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#f0fdf4', borderLeftWidth: 4, borderLeftColor: '#16a34a',
    padding: 12, borderRadius: 8, marginTop: 8,
  },
  infoBoxText: { fontSize: 13, color: '#166534', flex: 1 },
  recap: { backgroundColor: '#f9fafb', borderRadius: 12, padding: 16, marginBottom: 16 },
  recapTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  recapRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  recapLabel: { fontSize: 13, color: '#6b7280' },
  recapVal: { fontSize: 13, fontWeight: '600', color: '#1f2937' },
  recapTotal: { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12, marginTop: 4 },
  recapTotalLabel: { fontSize: 15, fontWeight: 'bold', color: '#1f2937' },
  recapTotalVal: { fontSize: 18, fontWeight: 'bold', color: '#1d4ed8' },
  waveBox: {
    backgroundColor: '#f59e0b', borderRadius: 16, padding: 20, marginBottom: 16,
  },
  waveTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  waveNumero: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12 },
  waveNumeroLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  waveNumeroVal: { fontSize: 28, fontWeight: 'bold', color: '#1f2937' },
  waveMontant: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 12 },
  waveOpenBtn: {
    backgroundColor: '#fff', paddingVertical: 12,
    borderRadius: 10, alignItems: 'center',
  },
  waveOpenBtnText: { color: '#d97706', fontWeight: 'bold', fontSize: 16 },
  alertBox: {
    flexDirection: 'row', gap: 10, alignItems: 'flex-start',
    backgroundColor: '#eff6ff', borderLeftWidth: 4, borderLeftColor: '#1d4ed8',
    padding: 12, borderRadius: 8, marginBottom: 16,
  },
  alertText: { fontSize: 13, color: '#1e40af', flex: 1, lineHeight: 18 },
  confirmBtn: {
    flex: 2, paddingVertical: 16, borderRadius: 10,
    alignItems: 'center', backgroundColor: '#16a34a',
  },
  confirmBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
