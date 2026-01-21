# 🚀 Configuration Supabase pour la synchronisation

Supabase permet de sauvegarder tes stats et sessions dans le cloud. Tu pourras ainsi utiliser l'app sur plusieurs appareils (PC, téléphone, tablette) et retrouver tes données partout !

## 📋 Étapes de configuration (5 minutes)

### 1. Créer un compte Supabase

1. Va sur https://supabase.com/
2. Clique sur **"Start your project"**
3. Connecte-toi avec GitHub, Google ou email
4. C'est gratuit, pas de carte bancaire nécessaire ! 🎉

### 2. Créer un projet

1. Clique sur **"New project"**
2. Choisis ton organisation (ou crée-en une)
3. Remplis les infos :
   - **Name** : `FocusFit` ou `PomodoroApp`
   - **Database Password** : Génère un mot de passe fort (garde-le !)
   - **Region** : `Europe (Frankfurt)` ou le plus proche
   - **Pricing Plan** : **Free** (gratuit)
4. Clique sur **"Create new project"**
5. Attends 1-2 minutes que le projet se crée ☕

### 3. Créer la table de sessions (méthode simple)

1. Dans le menu gauche, clique sur **"SQL Editor"**
2. Clique sur **"New query"**
3. **Copie-colle ce code SQL** :

```sql
-- Créer la table pour sauvegarder tes sessions quotidiennes
CREATE TABLE user_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  cycles_completed INTEGER DEFAULT 0,
  focus_total_seconds INTEGER DEFAULT 0,
  sport_total_seconds INTEGER DEFAULT 0,
  breaks_done INTEGER DEFAULT 0,
  breaks_skipped INTEGER DEFAULT 0,
  abs_breaks_done INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Désactiver RLS pour simplifier (usage personnel)
ALTER TABLE user_sessions DISABLE ROW LEVEL SECURITY;

-- Index pour rechercher rapidement par utilisateur et date
CREATE INDEX idx_user_sessions_user_date ON user_sessions(user_id, date DESC);
```

4. Clique sur **"Run"** (ou appuie sur Ctrl+Enter)
5. Tu devrais voir "Success. No rows returned"

### 4. Récupérer les clés API

1. Dans le menu gauche, clique sur **"Settings"** (icône ⚙️)
2. Clique sur **"API"**
3. Tu verras deux informations importantes :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon public** key : Une longue clé qui commence par `eyJ...`
4. Copie ces deux valeurs

### 5. Configurer l'application

Ouvre le fichier `src/services/supabase.js` et remplace :

```javascript
const supabaseUrl = 'https://xxxxx.supabase.co'; // Colle ton URL ici
const supabaseKey = 'eyJhbGc...'; // Colle ta clé anon ici
```

## ✅ C'est tout !

Contrairement à Firebase, **pas besoin de règles de sécurité compliquées** pour commencer. Supabase est prêt à l'emploi !

## 🚀 Utilisation multi-appareils

### Premier appareil (ex: PC)

1. Lance l'app : `npm run dev`
2. Ouvre `http://localhost:5173`
3. Va dans **Réglages**
4. Note ton **ID utilisateur** (ex: `user_abc123xyz`)
5. Utilise l'app normalement - tes stats sont sauvegardées automatiquement !

### Deuxième appareil (ex: téléphone)

1. Ouvre l'app sur ton téléphone
2. Va dans **Réglages**
3. Clique sur **"Importer un ID"**
4. Colle l'ID de ton premier appareil
5. Confirme l'import
6. Tes stats sont synchronisées ! 🎉

### Synchronisation automatique

- Chaque fois que tu complètes un cycle, tes stats sont sauvegardées dans Supabase
- Quand tu ouvres l'app sur un autre appareil, elle charge automatiquement tes dernières stats
- Pas besoin de compte, juste ton ID utilisateur !

## 🎯 Avantages de Supabase vs Firebase

✅ **Plus simple** - Pas de configuration complexe  
✅ **Plus généreux** - Limites gratuites plus élevées  
✅ **Temps réel natif** - Synchronisation instantanée  
✅ **Pas de limite de projets** - Crée autant que tu veux  
✅ **Interface moderne** - Plus facile à utiliser  
✅ **PostgreSQL** - Base de données relationnelle puissante  

## 💰 Limites gratuites (largement suffisant)

- **500 MB** de stockage base de données
- **1 GB** de transfert de données/mois
- **2 GB** de bande passante
- **50,000** requêtes API/mois
- **Connexions temps réel illimitées**

Pour une utilisation personnelle, tu ne dépasseras **jamais** ces limites ! 🚀

## 🔒 Sécurité (optionnel)

Pour l'instant, la table est publique (lecture/écriture pour tous). C'est OK pour un usage personnel sur ton réseau local.

Si tu veux sécuriser plus tard :

1. Active **Row Level Security (RLS)**
2. Ajoute des policies pour limiter l'accès
3. Ajoute une authentification

Mais pour commencer, ce n'est pas nécessaire !

## 🐛 Dépannage

### Le Nest Hub ne se connecte pas
- Vérifie que tu es sur le même réseau WiFi
- Vérifie que le code est correct (6 caractères)
- Regarde la console Supabase pour voir si les données arrivent

### Erreur "Invalid API key"
- Vérifie que tu as bien copié la clé **anon public**
- Vérifie qu'il n'y a pas d'espaces avant/après
- Recopie l'URL et la clé depuis Supabase

### La table n'existe pas
- Va dans "Table Editor" et vérifie que la table `sessions` existe
- Vérifie que RLS est désactivé (pour commencer)

## 📱 Alternative sans Supabase

Si tu ne veux pas utiliser Supabase non plus :
1. Utilise le **Cast** de Chrome (mais pas d'écran tactile)
2. Ouvre l'app directement sur le Nest Hub (pas de sync)

Mais Supabase est **vraiment** la solution la plus simple ! 🎉

## 🆚 Comparaison rapide

| Feature | Firebase | Supabase |
|---------|----------|----------|
| Configuration | Complexe | Simple |
| Limite projets | 10 max | Illimité |
| Temps réel | Oui | Oui (meilleur) |
| Gratuit | Oui | Oui (plus généreux) |
| Interface | Ancienne | Moderne |

**Verdict** : Supabase est plus simple et plus adapté pour ce projet ! 💪
