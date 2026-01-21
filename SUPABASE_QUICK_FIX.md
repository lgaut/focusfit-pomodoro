# 🔧 Fix rapide Supabase (2 minutes)

Pour éliminer l'erreur 406 et activer la synchronisation cloud.

## ⚡ Solution rapide

### 1. Va dans Supabase SQL Editor

https://supabase.com/dashboard/project/qgwevhsqxeqzdsehvjmt/sql/new

### 2. Copie-colle ce SQL

```sql
-- Créer la table user_sessions
CREATE TABLE IF NOT EXISTS user_sessions (
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

-- Désactiver RLS (Row Level Security) pour simplifier
ALTER TABLE user_sessions DISABLE ROW LEVEL SECURITY;

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_date 
ON user_sessions(user_id, date DESC);
```

### 3. Clique sur "Run" (ou Ctrl+Enter)

Tu devrais voir : **"Success. No rows returned"**

## ✅ C'est tout !

Maintenant :
- ✅ Plus d'erreur 406
- ✅ Synchronisation cloud activée
- ✅ Multi-appareils fonctionnel

Recharge l'app et l'erreur aura disparu ! 🎉

## 🔍 Vérification

Pour vérifier que la table existe :

1. Va dans **Table Editor** (menu gauche)
2. Tu devrais voir la table **user_sessions**
3. Elle sera vide au début (normal)

## 💡 Utilisation

Une fois la table créée :
- Tes stats sont automatiquement sauvegardées dans le cloud
- Va dans **Réglages** pour voir ton ID utilisateur
- Utilise cet ID sur d'autres appareils pour synchroniser

## 🎯 Résultat

**Avant :** Erreur 406 dans la console  
**Après :** Synchronisation cloud silencieuse et automatique

C'est tout ! 🚀
