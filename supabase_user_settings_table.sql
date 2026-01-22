-- Table pour synchroniser les paramètres utilisateur
-- À exécuter dans Supabase SQL Editor

CREATE TABLE IF NOT EXISTS user_settings (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  focus_minutes INTEGER NOT NULL DEFAULT 30,
  break_minutes INTEGER NOT NULL DEFAULT 5,
  work_start TEXT NOT NULL DEFAULT '08:00',
  work_end TEXT NOT NULL DEFAULT '17:30',
  equipment JSONB NOT NULL DEFAULT '{"bike": true, "dumbbell": true}'::jsonb,
  program TEXT NOT NULL DEFAULT 'program_abs_tablettes',
  rotation TEXT NOT NULL DEFAULT 'rotation_basic',
  notifications_enabled BOOLEAN NOT NULL DEFAULT true,
  sound_enabled BOOLEAN NOT NULL DEFAULT true,
  vibration_enabled BOOLEAN NOT NULL DEFAULT true,
  exercise_preferences JSONB NOT NULL DEFAULT '{"categories": {"abs": true, "arms": true, "bike": true, "fullbody": true, "back": true}, "disabled_exercises": [], "custom_durations": {}}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour recherche rapide par user_id
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Tout le monde peut lire et écrire (car on utilise l'anon key)
CREATE POLICY "Enable all access for all users" ON user_settings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Commentaires
COMMENT ON TABLE user_settings IS 'Paramètres utilisateur synchronisés entre appareils';
COMMENT ON COLUMN user_settings.user_id IS 'ID unique de l''utilisateur généré côté client';
COMMENT ON COLUMN user_settings.exercise_preferences IS 'Préférences de personnalisation des exercices';
