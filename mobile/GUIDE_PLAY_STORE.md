# Guide - Publier sur le Play Store

## 1. Prérequis

- Compte Google Play Developer : https://play.google.com/console (25$ une seule fois)
- Node.js installé
- Expo CLI : `npm install -g expo-cli eas-cli`

## 2. Installation

```bash
cd mobile
npm install
```

## 3. Tester l'app localement

```bash
# Démarrer avec Expo Go (scanner QR code)
npx expo start

# Ou sur émulateur Android
npx expo start --android
```

## 4. Configurer EAS Build

```bash
# Se connecter à Expo
eas login

# Configurer le projet
eas build:configure
```

## 5. Générer un APK de test (preview)

```bash
eas build --platform android --profile preview
```
→ Génère un fichier `.apk` à installer directement sur votre téléphone.

## 6. Générer l'AAB pour le Play Store (production)

```bash
eas build --platform android --profile production
```
→ Génère un fichier `.aab` (Android App Bundle) à uploader sur le Play Store.

## 7. Soumettre sur le Play Store

1. Aller sur https://play.google.com/console
2. Créer une nouvelle application
3. Remplir les infos : nom, description, captures d'écran
4. Uploader le fichier `.aab`
5. Soumettre pour révision (1-3 jours)

## Structure de l'app

```
mobile/
├── App.js                    # Point d'entrée
├── app.json                  # Config Expo (nom, icône, package)
├── eas.json                  # Config build Play Store
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js   # Navigation (tabs + stack)
│   ├── screens/
│   │   ├── AccueilScreen.js  # Page d'accueil
│   │   ├── InscriptionScreen.js  # Inscription 4 étapes
│   │   ├── DashboardScreen.js    # Mes cours
│   │   ├── QuizScreen.js         # Quiz code de la route
│   │   ├── PanneauxScreen.js     # Panneaux de signalisation
│   │   ├── ReservationScreen.js  # Réservation conduite
│   │   ├── ResultatsScreen.js    # Résultats & profil
│   │   └── AdminScreen.js        # Interface admin
│   └── firebase.js           # Configuration Firebase
└── assets/                   # Icônes et splash screen
```

## Assets à préparer

- `assets/icon.png` : 1024x1024px (icône de l'app)
- `assets/splash.png` : 1242x2688px (écran de chargement)
- `assets/adaptive-icon.png` : 1024x1024px (icône adaptative Android)

## Package Android

`com.mondialee.autoecole`
