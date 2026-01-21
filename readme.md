# Cahier des charges (PRD) — PWA “FocusFit Pomodoro”

> **Objectif** : Créer une application **PWA** (web installable) qui combine **Pomodoro (focus)** + **pauses sportives intelligentes** (1 activité par pause) avec un programme “**Tablettes**” et une **rotation automatique** (vélo / haltères / abdos).

---

## 1) Vision produit

### 1.1 Problème
- Difficile de rester concentré longtemps
- Fatigue mentale sur une grosse journée (8h → 17h30)
- Sport “dur à caser” en une seule séance
- Objectif esthétique : **bras** + **abdos visibles**

### 1.2 Solution
Un timer Pomodoro qui alterne :
- **Focus : 30 minutes**
- **Pause sport : 5 minutes**

Pendant la pause :
- l’utilisateur fait **1 activité unique** (au choix ou proposée automatiquement)
- l’app propose une **rotation** qui évite le surentraînement

Bonus :
- 2 pauses abdos / jour (programme “Tablettes”)
- statistiques + motivation (streaks, XP)

---

## 2) Objectifs & KPIs

### 2.1 Objectifs utilisateur
- Travailler en sessions “propres” sans distraction
- Bouger régulièrement sans “grosse séance”
- Tenir une routine durable
- Progresser vers un ventre plus ferme et des abdos visibles

### 2.2 Indicateurs (KPIs)
- Cycles complétés / jour
- Minutes de focus / jour
- Minutes de sport / jour
- % pauses réalisées vs skippées
- Streak (jours consécutifs)

---

## 3) Périmètre fonctionnel

### 3.1 MVP (Version 1)
✅ Timer Pomodoro configurable (durées + plage horaire)
✅ Pause sport (5 minutes) avec 1 activité proposée
✅ Programme “Tablettes” (2 pauses/jour)
✅ Rotation automatique vélo/haltères/abdos
✅ Stats simples + historique du jour
✅ Notifications locales
✅ Offline-first (service worker)
✅ Installation PWA (Add to Home Screen)

### 3.2 Version 2 (évolution)
- Profils utilisateur + sauvegarde cloud (optionnel)
- Export calendrier (.ics)
- Bibliothèque d’exercices enrichie
- Mode “fatigue” (adapter la rotation)
- Mode “coach” (progression sur 4 semaines)

---

## 4) Parcours utilisateur

### 4.1 Onboarding
1. Choix du mode : **Pomodoro + Sport**
2. Choix des horaires : défaut **08:00 → 17:30**
3. Durées : défaut **30 min focus / 5 min pause**
4. Matériel disponible :
   - Vélo d’appartement ✅/❌
   - Haltères ✅/❌
5. Objectif :
   - Tablettes (abdos visibles)
   - Tonus bras
   - Cardio léger

### 4.2 Utilisation quotidienne
- L’utilisateur appuie sur **Démarrer**
- Timer focus se lance
- À la fin : notification + écran “Pause Sport”
- L’utilisateur réalise l’activité puis valide
- Reprise focus

### 4.3 Fin de journée
- Résumé :
  - Focus total
  - Pauses sport réalisées
  - Abdos réalisés (2/2)
  - Streak

---

## 5) Fonctionnalités détaillées

### 5.1 Timer Pomodoro

#### Comportement
- Démarrer / Pause / Stop
- Passage automatique focus → pause → focus (option)

#### Paramètres
- Durée focus (min) — défaut 30
- Durée pause (min) — défaut 5
- Plage horaire de travail (défaut 8h → 17h30)
- Pause repas (option)
- Son / vibration / notifications
- Mode “ne pas déranger”

---

### 5.2 Pause Sport (cœur du concept)

#### Principe
- Une pause = **1 activité unique**
- L’application propose automatiquement une activité via **rotation**

#### Actions
- ✅ “Terminé”
- ❌ “Skip”
- 🔁 “Changer d’activité” (si autorisé)
- 🧩 “Simplifier” (si trop dur)

---

### 5.3 Catégories de sport

#### A) Vélo d’appartement
Objectif : cardio léger + récupération
- Vélo cool (zone facile)
- Vélo rythme moyen

#### B) Haltères
Objectif : bras/épaules/haut du corps
Exemples :
- Curls biceps
- Triceps au-dessus de la tête
- Développé épaules
- Rowing (dos)

#### C) Abdos / gainage
Objectif : ventre ferme + tablettes
Exemples :
- Planche
- Crunch
- Relevé de bassin
- Vélo au sol
- Planche côté

---

## 6) Programme “Tablettes” (2 pauses par jour)

> **Règle** : programme “Tablettes” = **2 pauses abdos/jour** (pas 8).

### 6.1 Pause Abdos #1 (5 minutes)
1) Planche — 1:00
2) Crunch — 1:00
3) Relevé de bassin — 1:00
4) Montées de genoux rapides — 1:00
5) Gainage sur le dos — 1:00

### 6.2 Pause Abdos #2 (5 minutes)
1) Planche côté gauche — 0:30
2) Planche côté droite — 0:30
3) Vélo au sol — 1:00
4) Crunch — 1:00
5) Planche — 2:00 (ou 1:00 si trop dur)

### 6.3 Progression (option v2)
- Semaine 1 : normal
- Semaine 2 : +10 sec sur certains exos
- Semaine 3 : exécution plus lente
- Semaine 4 : mode plus dur (si OK)

---

## 7) Rotation intelligente (anti-surentraînement)

### 7.1 Objectif de la rotation
- Éviter abdos trop souvent
- Alterner cardio / renfo
- Tenir toute la journée sans cramer

### 7.2 Rotation basique (recommandée)
Pattern (répété) :

**VÉLO → HALTÈRES → VÉLO → ABDOS → VÉLO → HALTÈRES → VÉLO → ABDOS**

### 7.3 Règles
- Vélo = le plus fréquent
- Haltères = 2–4 fois/jour
- Abdos = 2 fois/jour (tablettes)

### 7.4 Règles de remplacement (fallback)
- Si pas de vélo → remplacer par haltères ou abdos
- Si pas d’haltères → remplacer par vélo
- Si quota abdos atteint → remplacer par vélo

---

## 8) Écrans (UI)

### 8.1 Écran principal (Timer)
- Timer focus/pause
- Cycle actuel (ex : 5/14)
- Prochaine pause sport : catégorie + exercice
- Start / Pause / Stop

### 8.2 Écran Pause Sport
- Nom activité + consignes simples
- Timer 05:00
- Boutons : Terminé / Skip / Simplifier

### 8.3 Programmes
- Tablettes
- Cardio doux
- Bras (renfo)
- Custom

### 8.4 Stats
- Focus total (jour/semaine)
- Sport total (jour/semaine)
- Pauses faites vs skippées
- Streak

### 8.5 Paramètres
- Durées
- Horaires
- Matériel
- Intensité
- Notifications

---

## 9) Notifications (PWA)

### 9.1 Types
- Fin du focus → “Pause sport (5 min)”
- Fin de pause → “Retour focus (30 min)”

### 9.2 Modes
- Silence
- Vibration
- Son

---

## 10) Offline-first & PWA

### 10.1 Exigences PWA
- Manifest PWA (nom, icône, theme_color)
- Service Worker
- Cache “app shell”
- Fonctionnement offline

### 10.2 Données locales
- Stockage local (IndexedDB recommandé)
- Persist stats + cycles

---

## 11) Données & structure (modèle simple)

### 11.1 Entités
- **Settings** : focus_minutes, break_minutes, horaires, matériel, programme
- **Exercise** : id, catégorie, nom, instructions, durée, niveau
- **Program** : tablettes + blocs
- **Session** : date, cycles, focus total, sport total, pauses faites/skippées
- **CycleLog** : focus start/end, pause start/end, activité, validée/skippée

---

## 12) JSON Seed (exercices + programme)

```json
{
  "rotations": [
    {
      "id": "rotation_basic",
      "name": "Rotation Basique",
      "pattern": ["bike", "dumbbell", "bike", "abs", "bike", "dumbbell", "bike", "abs"]
    }
  ],
  "exercises": [
    {
      "id": "bike_easy",
      "category": "bike",
      "name": "Vélo (cool)",
      "instructions": "Pédale tranquillement, respiration stable, pas d'essoufflement.",
      "duration_seconds_default": 300,
      "level": "easy"
    },
    {
      "id": "bike_medium",
      "category": "bike",
      "name": "Vélo (rythme moyen)",
      "instructions": "Pédale à rythme régulier, tu transpires un peu mais tu tiens.",
      "duration_seconds_default": 300,
      "level": "normal"
    },
    {
      "id": "dumbbell_curl",
      "category": "dumbbell",
      "name": "Haltères : Curls biceps",
      "instructions": "Debout, dos droit. Monte et descends lentement. Ne balance pas.",
      "duration_seconds_default": 300,
      "level": "normal"
    },
    {
      "id": "dumbbell_triceps",
      "category": "dumbbell",
      "name": "Haltères : Triceps (au-dessus de la tête)",
      "instructions": "Un haltère tenu à deux mains, descends derrière la tête puis remonte.",
      "duration_seconds_default": 300,
      "level": "normal"
    },
    {
      "id": "dumbbell_shoulder_press",
      "category": "dumbbell",
      "name": "Haltères : Épaules (développé)",
      "instructions": "Assis ou debout. Monte les haltères au-dessus de la tête et redescends contrôlé.",
      "duration_seconds_default": 300,
      "level": "normal"
    },
    {
      "id": "abs_plank",
      "category": "abs",
      "name": "Planche",
      "instructions": "Sur les avant-bras, corps droit. Ventre serré. Ne creuse pas le dos.",
      "duration_seconds_default": 60,
      "level": "normal"
    },
    {
      "id": "abs_crunch",
      "category": "abs",
      "name": "Crunch",
      "instructions": "Allongé, remonte légèrement les épaules. Mouvement court et contrôlé.",
      "duration_seconds_default": 60,
      "level": "normal"
    },
    {
      "id": "abs_reverse_crunch",
      "category": "abs",
      "name": "Relevé de bassin",
      "instructions": "Allongé, genoux vers la poitrine. Décolle légèrement les fesses.",
      "duration_seconds_default": 60,
      "level": "normal"
    },
    {
      "id": "abs_knee_drive",
      "category": "abs",
      "name": "Montées de genoux rapides",
      "instructions": "Position pompe. Ramène les genoux vite vers la poitrine. Reste gainé.",
      "duration_seconds_default": 60,
      "level": "normal"
    },
    {
      "id": "abs_hollow_hold",
      "category": "abs",
      "name": "Gainage sur le dos",
      "instructions": "Allongé sur le dos. Ventre serré. Jambes légèrement levées, tiens.",
      "duration_seconds_default": 60,
      "level": "normal"
    },
    {
      "id": "abs_side_plank_left",
      "category": "abs",
      "name": "Planche côté gauche",
      "instructions": "Sur le côté gauche, appui avant-bras. Corps bien droit.",
      "duration_seconds_default": 30,
      "level": "easy"
    },
    {
      "id": "abs_side_plank_right",
      "category": "abs",
      "name": "Planche côté droite",
      "instructions": "Sur le côté droit, appui avant-bras. Corps bien droit.",
      "duration_seconds_default": 30,
      "level": "easy"
    },
    {
      "id": "abs_bicycle",
      "category": "abs",
      "name": "Vélo au sol",
      "instructions": "Allongé, pédale dans le vide et touche coude/genou si possible.",
      "duration_seconds_default": 60,
      "level": "normal"
    }
  ],
  "programs": [
    {
      "id": "program_abs_tablettes",
      "name": "Tablettes (2 pauses/jour)",
      "goal": "abs",
      "description": "2 pauses abdos par jour, 5 minutes chacune.",
      "blocks": [
        {
          "id": "abs_block_1",
          "name": "Pause Abdos #1",
          "total_duration_seconds": 300,
          "items": [
            { "exercise_id": "abs_plank", "duration_seconds": 60 },
            { "exercise_id": "abs_crunch", "duration_seconds": 60 },
            { "exercise_id": "abs_reverse_crunch", "duration_seconds": 60 },
            { "exercise_id": "abs_knee_drive", "duration_seconds": 60 },
            { "exercise_id": "abs_hollow_hold", "duration_seconds": 60 }
          ]
        },
        {
          "id": "abs_block_2",
          "name": "Pause Abdos #2",
          "total_duration_seconds": 300,
          "items": [
            { "exercise_id": "abs_side_plank_left", "duration_seconds": 30 },
            { "exercise_id": "abs_side_plank_right", "duration_seconds": 30 },
            { "exercise_id": "abs_bicycle", "duration_seconds": 60 },
            { "exercise_id": "abs_crunch", "duration_seconds": 60 },
            { "exercise_id": "abs_plank", "duration_seconds": 120 }
          ]
        }
      ]
    }
  ]
}
```

---

## 13) Spécifications techniques (PWA)

### 13.1 Architecture recommandée
- **Frontend** : Vite + React (ou Vue)
- **UI** : TailwindCSS
- **Stockage offline** : IndexedDB (via Dexie.js recommandé)
- **Service Worker** : Workbox
- **State** : Zustand / Redux Toolkit / Pinia (selon framework)

### 13.2 Contraintes
- Application utilisable sans compte
- Fonctionnelle offline
- Responsive mobile-first

---

## 14) Roadmap

### Sprint 1 (MVP Core)
- Timer Pomodoro
- Pause sport simple
- Rotation basique

### Sprint 2 (Programme Tablettes)
- 2 pauses abdos / jour
- gestion des exercices + blocs

### Sprint 3 (Stats)
- historique + streak
- écran stats

### Sprint 4 (PWA)
- offline + install
- notifications

---

## 15) Critères d’acceptation (MVP)
✅ L’utilisateur peut faire une journée complète “focus + sport”
✅ L’app propose des pauses sport intelligentes (rotation)
✅ Le programme tablettes met **2 pauses abdos/jour**
✅ Les stats de base sont visibles
✅ L’app est installable et offline

