# 🎯 FocusFit Pomodoro - Installation

Application PWA combinant **Pomodoro** + **pauses sportives intelligentes** avec programme "Tablettes".

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### 3. Build pour production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

### 4. Prévisualiser le build

```bash
npm run preview
```

## 📱 Installation PWA

### Sur mobile (iOS/Android)

1. Ouvrir l'application dans le navigateur
2. **iOS** : Appuyer sur le bouton "Partager" puis "Sur l'écran d'accueil"
3. **Android** : Menu → "Installer l'application" ou "Ajouter à l'écran d'accueil"

### Sur desktop (Chrome/Edge)

1. Cliquer sur l'icône d'installation dans la barre d'adresse
2. Ou Menu → "Installer FocusFit Pomodoro"

## 🎨 Icônes PWA

Pour générer les icônes PWA, tu peux utiliser un outil comme [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) ou créer manuellement :

- `public/pwa-192x192.png` (192x192px)
- `public/pwa-512x512.png` (512x512px)
- `public/apple-touch-icon.png` (180x180px)
- `public/favicon.ico`

Ou utilise ce site : https://realfavicongenerator.net/

## ✨ Fonctionnalités

### Timer Pomodoro
- Focus : 30 minutes (configurable)
- Pause sport : 5 minutes (configurable)
- Passage automatique focus → pause

### Rotation intelligente
Pattern par défaut : **VÉLO → HALTÈRES → VÉLO → ABDOS** (répété)

### Programme "Tablettes"
- 2 pauses abdos par jour (5 minutes chacune)
- Exercices variés : planche, crunch, gainage, etc.

### Stats & Suivi
- Minutes de focus par jour
- Pauses sport réalisées
- Streak (jours consécutifs)
- Historique des sessions

### Offline-first
- Fonctionne sans connexion internet
- Données stockées localement (IndexedDB)
- Service Worker pour le cache

## 🔧 Configuration

Accède aux paramètres via l'onglet "Réglages" :

- Durées (focus/pause)
- Horaires de travail
- Matériel disponible (vélo, haltères)
- Notifications

## 📊 Structure du projet

```
src/
├── components/          # Composants React
│   ├── Timer.jsx       # Timer principal
│   ├── BreakScreen.jsx # Écran pause sport
│   ├── Stats.jsx       # Statistiques
│   └── Settings.jsx    # Paramètres
├── data/               # Données statiques
│   ├── exercises.js    # Liste des exercices
│   └── programs.js     # Programmes (Tablettes)
├── db/                 # Base de données
│   └── database.js     # IndexedDB (Dexie)
├── store/              # State management
│   └── useTimerStore.js # Store Zustand
├── utils/              # Utilitaires
│   └── rotation.js     # Logique de rotation
├── App.jsx             # Composant principal
└── main.jsx            # Point d'entrée
```

## 🎯 Utilisation

1. **Démarrer** : Lance un cycle de focus (30 min)
2. **Pause sport** : À la fin du focus, l'app propose une activité
3. **Réaliser** : Fais l'exercice proposé (5 min)
4. **Valider** : Clique sur "Terminé" ou "Skip"
5. **Répéter** : Retour au focus automatiquement

### Actions disponibles pendant la pause

- ✅ **Terminé** : Valide la pause et passe au prochain focus
- ❌ **Skip** : Saute la pause (comptabilisé dans les stats)
- 🔁 **Changer** : Propose une autre activité
- ⏸️ **Pause** : Met le timer en pause

## 🔔 Notifications

L'application demande la permission pour les notifications :
- Fin du focus → "Pause sport (5 min)"
- Fin de pause → "Retour focus"

Active-les dans les paramètres pour ne rien manquer !

## 🏋️ Exercices disponibles

### Vélo
- Vélo cool (récupération)
- Vélo rythme moyen

### Haltères
- Curls biceps
- Triceps au-dessus de la tête
- Développé épaules

### Abdos
- Planche (classique et latérale)
- Crunch
- Relevé de bassin
- Montées de genoux
- Gainage sur le dos
- Vélo au sol

## 🎨 Technologies

- **React 18** - Framework UI
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Zustand** - State management
- **Dexie.js** - IndexedDB wrapper
- **Lucide React** - Icônes
- **Workbox** - Service Worker

## 📝 Notes

- Les données sont stockées localement (pas de compte requis)
- L'application fonctionne 100% offline après la première visite
- Les stats sont conservées dans le navigateur
- Supprimer les données du navigateur = perte des stats

## 🚀 Déploiement

Tu peux déployer sur :
- **Netlify** : `npm run build` puis drag & drop du dossier `dist`
- **Vercel** : Connecte ton repo GitHub
- **GitHub Pages** : Configure dans les settings du repo

Bon focus et bon sport ! 💪🔥
