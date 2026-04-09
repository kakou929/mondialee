import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const quizSeries = [
  { id: 1, titre: 'Série 1 - Règles de base', questions: 20, difficulte: 'Facile', color: '#22c55e' },
  { id: 2, titre: 'Série 2 - Priorités', questions: 20, difficulte: 'Moyen', color: '#f59e0b' },
  { id: 3, titre: 'Série 3 - Signalisation', questions: 20, difficulte: 'Moyen', color: '#f59e0b' },
  { id: 4, titre: 'Série 4 - Vitesses', questions: 20, difficulte: 'Difficile', color: '#ef4444' },
  { id: 5, titre: 'Série 5 - Distances', questions: 20, difficulte: 'Difficile', color: '#ef4444' },
  { id: 6, titre: 'Série 6 - Alcool & Drogues', questions: 20, difficulte: 'Moyen', color: '#f59e0b' },
  { id: 7, titre: 'Série 7 - Intersections', questions: 20, difficulte: 'Difficile', color: '#ef4444' },
  { id: 8, titre: 'Série 8 - Stationnement', questions: 20, difficulte: 'Facile', color: '#22c55e' },
];

const questionsExemple = [
  {
    id: 1,
    question: "Quelle est la vitesse maximale autorisée en agglomération ?",
    options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    correct: 1,
    explication: "En agglomération, la vitesse est limitée à 50 km/h sauf indication contraire."
  },
  {
    id: 2,
    question: "Que signifie un feu orange fixe ?",
    options: ["Accélérer", "S'arrêter si possible", "Passer à toute vitesse", "Klaxonner"],
    correct: 1,
    explication: "Le feu orange signifie que vous devez vous arrêter si vous pouvez le faire en sécurité."
  },
  {
    id: 3,
    question: "Quelle distance de sécurité respecter à 90 km/h ?",
    options: ["30 mètres", "50 mètres", "90 mètres", "120 mètres"],
    correct: 2,
    explication: "À 90 km/h, la distance minimale de sécurité est de 90 mètres (1 mètre par km/h)."
  },
];

export default function QuizScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState('list'); // 'list' | 'quiz' | 'result'
  const [currentSerie, setCurrentSerie] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const startQuiz = (serie) => {
    setCurrentSerie(serie);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setMode('quiz');
  };

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const isCorrect = index === questionsExemple[currentQ].correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, { q: currentQ, answer: index, correct: isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questionsExemple.length) {
      setMode('result');
    } else {
      setCurrentQ(q => q + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const getAnswerStyle = (index) => {
    if (!showResult) return selectedAnswer === index ? styles.optionSelected : styles.option;
    if (index === questionsExemple[currentQ].correct) return styles.optionCorrect;
    if (index === selectedAnswer) return styles.optionWrong;
    return styles.option;
  };

  if (mode === 'quiz') {
    const q = questionsExemple[currentQ];
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" backgroundColor="#1d4ed8" />
        <View style={styles.quizHeader}>
          <TouchableOpacity onPress={() => setMode('list')}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quizHeaderTitle}>{currentSerie?.titre}</Text>
          <Text style={styles.quizProgress}>{currentQ + 1}/{questionsExemple.length}</Text>
        </View>
        <View style={styles.quizProgressBar}>
          <View style={[styles.quizProgressFill, { width: `${((currentQ + 1) / questionsExemple.length) * 100}%` }]} />
        </View>
        <ScrollView style={styles.quizContent}>
          <Text style={styles.questionText}>{q.question}</Text>
          {q.options.map((opt, i) => (
            <TouchableOpacity key={i} style={getAnswerStyle(i)} onPress={() => handleAnswer(i)}>
              <View style={styles.optionLetter}>
                <Text style={styles.optionLetterText}>{String.fromCharCode(65 + i)}</Text>
              </View>
              <Text style={styles.optionText}>{opt}</Text>
              {showResult && i === q.correct && <Ionicons name="checkmark-circle" size={20} color="#16a34a" />}
              {showResult && i === selectedAnswer && i !== q.correct && <Ionicons name="close-circle" size={20} color="#ef4444" />}
            </TouchableOpacity>
          ))}
          {showResult && (
            <View style={styles.explicationBox}>
              <Ionicons name="information-circle" size={18} color="#1d4ed8" />
              <Text style={styles.explicationText}>{q.explication}</Text>
            </View>
          )}
          {showResult && (
            <TouchableOpacity style={styles.nextBtn} onPress={nextQuestion}>
              <Text style={styles.nextBtnText}>
                {currentQ + 1 >= questionsExemple.length ? 'Voir les résultats' : 'Question suivante'}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }

  if (mode === 'result') {
    const pct = Math.round((score / questionsExemple.length) * 100);
    const passed = pct >= 70;
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" backgroundColor="#1d4ed8" />
        <View style={styles.quizHeader}>
          <TouchableOpacity onPress={() => setMode('list')}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quizHeaderTitle}>Résultats</Text>
          <View />
        </View>
        <ScrollView style={styles.quizContent}>
          <View style={[styles.resultCard, { borderColor: passed ? '#16a34a' : '#ef4444' }]}>
            <Ionicons name={passed ? 'trophy' : 'refresh'} size={56} color={passed ? '#16a34a' : '#ef4444'} />
            <Text style={[styles.resultScore, { color: passed ? '#16a34a' : '#ef4444' }]}>{pct}%</Text>
            <Text style={styles.resultLabel}>{score}/{questionsExemple.length} bonnes réponses</Text>
            <Text style={[styles.resultStatus, { color: passed ? '#16a34a' : '#ef4444' }]}>
              {passed ? '✓ Excellent ! Vous avez réussi !' : 'Continuez à vous entraîner'}
            </Text>
          </View>
          <TouchableOpacity style={styles.retryBtn} onPress={() => startQuiz(currentSerie)}>
            <Ionicons name="refresh" size={18} color="#1d4ed8" />
            <Text style={styles.retryBtnText}>Recommencer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backListBtn} onPress={() => setMode('list')}>
            <Text style={styles.backListBtnText}>Retour aux séries</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1d4ed8" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Entraînement Code</Text>
        <Text style={styles.headerSub}>40 séries disponibles</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {quizSeries.map(serie => (
            <TouchableOpacity key={serie.id} style={styles.serieCard} onPress={() => startQuiz(serie)}>
              <View style={[styles.serieIcon, { backgroundColor: serie.color + '20' }]}>
                <Ionicons name="help-circle" size={24} color={serie.color} />
              </View>
              <View style={styles.serieInfo}>
                <Text style={styles.serieTitre}>{serie.titre}</Text>
                <Text style={styles.serieDesc}>{serie.questions} questions</Text>
              </View>
              <View style={[styles.serieDiff, { backgroundColor: serie.color + '20' }]}>
                <Text style={[styles.serieDiffText, { color: serie.color }]}>{serie.difficulte}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  header: { backgroundColor: '#1d4ed8', padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 14, color: '#bfdbfe', marginTop: 4 },
  scroll: { flex: 1 },
  section: { padding: 16 },
  serieCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  serieIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  serieInfo: { flex: 1 },
  serieTitre: { fontSize: 15, fontWeight: 'bold', color: '#1f2937', marginBottom: 2 },
  serieDesc: { fontSize: 13, color: '#6b7280' },
  serieDiff: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  serieDiffText: { fontSize: 12, fontWeight: '600' },
  quizHeader: {
    backgroundColor: '#1d4ed8', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  quizHeaderTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', flex: 1, textAlign: 'center' },
  quizProgress: { fontSize: 14, color: '#bfdbfe', fontWeight: '600' },
  quizProgressBar: { height: 4, backgroundColor: '#e5e7eb' },
  quizProgressFill: { height: '100%', backgroundColor: '#facc15' },
  quizContent: { flex: 1, padding: 20 },
  questionText: { fontSize: 20, fontWeight: 'bold', color: '#1f2937', lineHeight: 28, marginBottom: 24 },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderWidth: 2, borderColor: '#e5e7eb',
    borderRadius: 12, padding: 16, marginBottom: 12,
  },
  optionSelected: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#eff6ff', borderWidth: 2, borderColor: '#1d4ed8',
    borderRadius: 12, padding: 16, marginBottom: 12,
  },
  optionCorrect: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#f0fdf4', borderWidth: 2, borderColor: '#16a34a',
    borderRadius: 12, padding: 16, marginBottom: 12,
  },
  optionWrong: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fef2f2', borderWidth: 2, borderColor: '#ef4444',
    borderRadius: 12, padding: 16, marginBottom: 12,
  },
  optionLetter: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center',
  },
  optionLetterText: { fontSize: 14, fontWeight: 'bold', color: '#374151' },
  optionText: { flex: 1, fontSize: 15, color: '#1f2937' },
  explicationBox: {
    flexDirection: 'row', gap: 8, alignItems: 'flex-start',
    backgroundColor: '#eff6ff', borderRadius: 10, padding: 14, marginBottom: 16,
  },
  explicationText: { flex: 1, fontSize: 14, color: '#1e40af', lineHeight: 20 },
  nextBtn: {
    backgroundColor: '#1d4ed8', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 12, marginBottom: 20,
  },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: {
    backgroundColor: '#fff', borderRadius: 20, borderWidth: 3,
    padding: 32, alignItems: 'center', marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  resultScore: { fontSize: 56, fontWeight: 'bold', marginTop: 12 },
  resultLabel: { fontSize: 18, color: '#6b7280', marginTop: 8 },
  resultStatus: { fontSize: 16, fontWeight: '600', marginTop: 8, textAlign: 'center' },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderWidth: 2, borderColor: '#1d4ed8', paddingVertical: 14, borderRadius: 12, marginBottom: 12,
  },
  retryBtnText: { color: '#1d4ed8', fontWeight: 'bold', fontSize: 16 },
  backListBtn: {
    backgroundColor: '#1d4ed8', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 20,
  },
  backListBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
