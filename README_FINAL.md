# 🎯 FocusFit Pomodoro - Application Complète

Application PWA combinant **Pomodoro** + **pauses sportives intelligentes** avec programme "Tablettes" et **mode écran distant pour Nest Hub**.

## ✨ Fonctionnalités

### 🎯 Timer Pomodoro
- Focus 30 min / Pause 5 min (configurable)
- Timer circulaire animé
- Notifications de fin de session
- Pause/Resume/Reset

### 🏋️ Pauses sportives intelligentes
- **Rotation automatique** : Vélo → Haltères → Vélo → Abdos
- **13 exercices** : vélo, haltères, abdos
- **Programme "Tablettes"** : 2 pauses abdos/jour (5 min chacune)
- Instructions détaillées pour chaque exercice

### 📺 Mode écran distant (Nest Hub)
- **Synchronisation temps réel** avec Supabase
- **Timer géant** optimisé pour écran distant
- **Code de session** à 6 caractères
- Contrôle depuis PC, affichage sur Nest Hub
- Écran tactile fonctionnel

### 📊 Statistiques & Suivi
- Minutes de focus par jour
- Pauses sport réalisées/skippées
- Progression abdos (2/2)
- Streak (jours consécutifs)
- Historique des sessions

### 📱 PWA (Progressive Web App)
- Installable sur mobile et desktop
- Fonctionne offline
- Notifications natives
- Stockage local (IndexedDB)

## 🚀 Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement
npm run dev

# 3. Build pour production
npm run build
```

## 📖 Guides disponibles

- **`DEMARRAGE_RAPIDE.md`** - Guide d'utilisation complet
- **`SUPABASE_SETUP.md`** - Configuration du mode écran distant
- **`ICONES.md`** - Génération des icônes PWA
- **`README_INSTALLATION.md`** - Installation détaillée

## 🎮 Utilisation rapide

### Mode normal
1. Lance l'app : `npm run dev`
2. Clique sur "Démarrer"
3. Travaille 30 min en focus
4. Fais l'exercice proposé (5 min)
5. Répète !

### Mode écran distant (Nest Hub)
1. Configure Supabase (voir `SUPABASE_SETUP.md`)
2. Clique sur "Activer écran distant"
3. Note le code à 6 lettres
4. Sur le Nest Hub : ouvre `/display` et entre le code
5. Profite du timer géant !

## 🛠️ Technologies

- **React 18** - Framework UI
- **Vite** - Build tool ultra-rapide
- **TailwindCSS** - Styling moderne
- **Zustand** - State management
- **Dexie.js** - IndexedDB (stockage offline)
- **Supabase** - Synchronisation temps réel
- **Lucide React** - Icônes
- **Workbox** - Service Worker PWA

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── Timer.jsx       # Timer principal
│   ├── BreakScreen.jsx # Écran pause sport
│   ├── DisplayMode.jsx # Mode écran distant
│   ├── SyncControls.jsx# Contrôles de sync
│   ├── Stats.jsx       # Statistiques
│   └── Settings.jsx    # Paramètres
├── data/               # Données statiques
│   ├── exercises.js    # 13 exercices
│   └── programs.js     # Programme Tablettes
├── db/                 # Base de données locale
│   └── database.js     # IndexedDB (Dexie)
├── services/           # Services externes
│   └── supabase.js     # Synchronisation Supabase
├── store/              # State management
│   ├── useTimerStore.js # Store du timer
│   └── useSyncStore.js  # Store de sync
├── utils/              # Utilitaires
│   └── rotation.js     # Logique de rotation
├── App.jsx             # Composant principal
└── main.jsx            # Point d'entrée
```

## ⚙️ Configuration

### Paramètres disponibles
- **Durées** : Focus / Pause
- **Horaires** : Plage de travail (8h-17h30)
- **Matériel** : Vélo / Haltères
- **Notifications** : Son / Vibration

### Mode écran distant
- Configure Supabase (gratuit)
- Génère un code de session
- Connecte ton Nest Hub
- Synchronisation automatique

## 🏋️ Exercices inclus

### Vélo (2 exercices)
- Vélo cool (récupération)
- Vélo rythme moyen

### Haltères (3 exercices)
- Curls biceps
- Triceps au-dessus de la tête
- Développé épaules

### Abdos (8 exercices)
- Planche (classique et latérale)
- Crunch
- Relevé de bassin
- Montées de genoux rapides
- Gainage sur le dos
- Vélo au sol

## 🔄 Rotation intelligente

Pattern par défaut : **VÉLO → HALTÈRES → VÉLO → ABDOS**

L'app adapte automatiquement selon :
- Le matériel disponible
- Le quota d'abdos (max 2/jour)
- L'historique de la journée

## 📱 Installation PWA

### Mobile
- **iOS** : Safari → Partager → Sur l'écran d'accueil
- **Android** : Chrome → Menu → Installer l'application

### Desktop
- Chrome → Icône d'installation dans la barre d'adresse

## 🚀 Déploiement

```bash
npm run build
```

Déploie le dossier `dist/` sur :
- **Netlify** - Drag & drop
- **Vercel** - Connecte GitHub
- **GitHub Pages** - Configure dans settings

## 💡 Astuces

### Journée complète (8h → 17h30)
- **16 cycles** possibles
- **8h de focus** effectif
- **1h20 de sport** réparti
- **2 pauses abdos** garanties

### Optimisation
- Place le Nest Hub à côté de ton écran
- Active les notifications
- Utilise le mode "ne pas déranger"
- Célèbre tes streaks !

## 🐛 Dépannage

### L'app ne démarre pas
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Les notifications ne marchent pas
- Vérifie les permissions du navigateur
- Active dans les Réglages de l'app

### Le mode Display ne se connecte pas
- Configure Supabase (voir guide)
- Vérifie le code (6 caractères)
- Même réseau WiFi

## 📝 Notes importantes

- **Données locales** : Stockage navigateur (pas de compte)
- **Offline-first** : Fonctionne sans internet
- **Vie privée** : Aucune donnée externe (sauf Supabase pour sync)
- **Gratuit** : Supabase gratuit pour usage personnel

## 🎯 Objectifs recommandés

**Semaine 1** : 4-6 cycles/jour  
**Semaine 2** : 8-10 cycles/jour  
**Semaine 3+** : 12-16 cycles/jour + streak 7 jours

## 🏆 Résultat attendu

Avec une utilisation régulière :
- ✅ Meilleure concentration
- ✅ Moins de fatigue mentale
- ✅ Sport intégré naturellement
- ✅ Progression vers abdos visibles
- ✅ Routine durable

## 📄 Licence

Projet personnel - Utilise comme tu veux ! 🎉

---

**Bon focus et bon sport !** 💪🔥
