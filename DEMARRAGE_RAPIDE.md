# 🚀 Démarrage Rapide - FocusFit Pomodoro

## ⚡ Installation en 3 étapes

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer Supabase (pour le mode écran distant)
Suis le guide détaillé dans `SUPABASE_SETUP.md`

**En résumé :**
- Crée un compte gratuit sur https://supabase.com/
- Crée un projet et une table `sessions`
- Copie l'URL et la clé dans `src/services/supabase.js`

⚠️ **Tu peux utiliser l'app sans Supabase**, mais tu n'auras pas le mode écran distant.

### 3. Lancer l'application
```bash
npm run dev
```

Ouvre http://localhost:5173

## 🎯 Utilisation de base

### Mode normal (sur ton PC)

1. **Démarrer un cycle**
   - Clique sur "Démarrer"
   - Timer de 30 min démarre
   - Travaille en focus

2. **Pause sport**
   - À la fin du focus, une pause sport est proposée
   - Fais l'exercice affiché
   - Clique sur "Terminé" ou "Skip"

3. **Répéter**
   - Retour automatique au focus
   - Continue toute la journée !

### Mode écran distant (Nest Hub)

1. **Sur ton PC**
   - Clique sur "Activer écran distant"
   - Note le code à 6 lettres (ex: ABC123)

2. **Sur ton Nest Hub**
   - Ouvre `/display` dans le navigateur
   - Entre le code
   - Clique sur "Connecter"

3. **Profiter**
   - Le timer s'affiche en GRAND sur le Nest Hub
   - Contrôle depuis ton PC
   - Synchronisation automatique

## 📱 Installer comme PWA

### Sur mobile
- **iOS** : Safari → Partager → Sur l'écran d'accueil
- **Android** : Chrome → Menu → Installer l'application

### Sur desktop
- Chrome → Icône d'installation dans la barre d'adresse
- Ou Menu → Installer FocusFit Pomodoro

## ⚙️ Configuration

Va dans l'onglet **Réglages** pour personnaliser :

- **Durées** : Focus (défaut 30 min) / Pause (défaut 5 min)
- **Horaires** : Plage de travail (défaut 8h-17h30)
- **Matériel** : Vélo / Haltères disponibles
- **Notifications** : Activer/désactiver les alertes

## 🏋️ Programme "Tablettes"

Par défaut, l'app propose **2 pauses abdos par jour** :

**Pause Abdos #1** (5 min)
- Planche - 1:00
- Crunch - 1:00
- Relevé de bassin - 1:00
- Montées de genoux - 1:00
- Gainage sur le dos - 1:00

**Pause Abdos #2** (5 min)
- Planche côté gauche - 0:30
- Planche côté droite - 0:30
- Vélo au sol - 1:00
- Crunch - 1:00
- Planche - 2:00

Les autres pauses alternent entre **vélo** et **haltères**.

## 🔄 Rotation intelligente

Pattern par défaut : **VÉLO → HALTÈRES → VÉLO → ABDOS**

L'app adapte automatiquement selon :
- Le matériel disponible
- Le quota d'abdos (max 2/jour)
- L'historique de la journée

## 📊 Statistiques

L'onglet **Stats** affiche :
- Minutes de focus par jour
- Pauses sport réalisées
- Pauses abdos (progression vers 2/2)
- Streak (jours consécutifs)
- Historique des sessions

## 🔔 Notifications

L'app demande la permission pour les notifications :
- **Fin du focus** → "Pause sport (5 min)"
- **Fin de pause** → "Retour focus"

Active-les pour ne rien manquer !

## 🎨 Icônes PWA

Les icônes sont déjà en place dans `/public` :
- ✅ `pwa-192x192.png`
- ✅ `pwa-512x512.png`
- ✅ `apple-touch-icon.png`
- ✅ `favicon.ico`

## 🚀 Déploiement

Pour déployer en production :

```bash
npm run build
```

Le dossier `dist/` contient l'app prête à déployer sur :
- **Netlify** : Drag & drop du dossier `dist`
- **Vercel** : Connecte ton repo GitHub
- **GitHub Pages** : Configure dans les settings

## 🐛 Problèmes courants

### L'app ne démarre pas
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Les notifications ne marchent pas
- Vérifie les permissions du navigateur
- Active les notifications dans les Réglages de l'app

### Le mode Display ne se connecte pas
- Configure Firebase (voir `FIREBASE_SETUP.md`)
- Vérifie que le code est correct (6 caractères)
- Assure-toi d'être sur le même réseau WiFi

### Les stats ne s'affichent pas
- Les données sont stockées localement (IndexedDB)
- Vérifie que le navigateur autorise le stockage local
- Ne pas utiliser le mode navigation privée

## 💡 Astuces

### Optimiser pour une journée complète

**8h → 17h30 = 9h30 de travail**

Avec 30 min focus + 5 min pause = 35 min par cycle :
- **16 cycles possibles** dans la journée
- **8 heures de focus** effectif
- **1h20 de sport** réparti
- **2 pauses abdos** garanties

### Adapter les durées

Pour des sessions plus courtes :
- Focus 25 min / Pause 5 min (Pomodoro classique)
- Focus 45 min / Pause 10 min (sessions longues)

### Utiliser avec un écran secondaire

Place le Nest Hub à côté de ton écran principal :
- Timer toujours visible
- Pas besoin de changer de fenêtre
- Motivation constante

## 📝 Notes importantes

- **Données locales** : Tout est stocké dans le navigateur (pas de compte)
- **Offline-first** : Fonctionne sans internet après la première visite
- **Vie privée** : Aucune donnée n'est envoyée à un serveur (sauf Firebase pour la sync)
- **Gratuit** : Firebase est gratuit pour un usage personnel

## 🎯 Objectifs recommandés

**Semaine 1** : S'habituer au rythme
- 4-6 cycles par jour
- Valider toutes les pauses

**Semaine 2** : Augmenter progressivement
- 8-10 cycles par jour
- Tenir le programme Tablettes

**Semaine 3+** : Routine établie
- 12-16 cycles par jour
- Streak de 7 jours minimum

## 🏆 Bon courage !

N'oublie pas :
- **Régularité > Intensité**
- Les pauses sont aussi importantes que le focus
- Écoute ton corps (utilise "Skip" si besoin)
- Célèbre tes streaks ! 🔥

Bon focus et bon sport ! 💪🔥
