// Mapping des exercices vers leurs images générées
// Utilise import.meta.env.BASE_URL pour le chemin de base correct
const BASE_URL = import.meta.env.BASE_URL || '/';
const getImagePath = (filename) => `${BASE_URL}exercise-images/${filename}`;

export const exerciseImageMap = {
  // Échauffement
  'arm_circles': getImagePath('arm_circles.png'),
  'cercles de bras': getImagePath('arm_circles.png'),
  
  'pushups_light': getImagePath('pushups_light.png'),
  'pompes légères': getImagePath('pushups_light.png'),
  
  'plank_light': getImagePath('plank_light.png'),
  'gainage léger': getImagePath('plank_light.png'),
  
  'breathing': getImagePath('breathing.png'),
  'respiration et mise en place': getImagePath('breathing.png'),
  'respiration': getImagePath('breathing.png'),
  
  // Bloc Pectoraux
  'pushups': getImagePath('pushups.png'),
  'pompes': getImagePath('pushups.png'),
  'pompes – série 1': getImagePath('pushups.png'),
  'pompes – série 2': getImagePath('pushups.png'),
  'pompes – série 3': getImagePath('pushups.png'),
  
  'dumbbell_press': getImagePath('dumbbell_press.png'),
  'développé haltères': getImagePath('dumbbell_press.png'),
  'développé haltères (au sol ou banc)': getImagePath('dumbbell_press.png'),
  'développé haltères – série 1': getImagePath('dumbbell_press.png'),
  'développé haltères – série 2': getImagePath('dumbbell_press.png'),
  'développé haltères – série 3': getImagePath('dumbbell_press.png'),
  
  'dumbbell_fly': getImagePath('dumbbell_fly.png'),
  'écartés haltères': getImagePath('dumbbell_fly.png'),
  'écartés haltères – série 1': getImagePath('dumbbell_fly.png'),
  'écartés haltères – série 2': getImagePath('dumbbell_fly.png'),
  
  // Bloc Abdominaux
  'plank': getImagePath('plank.png'),
  'gainage': getImagePath('plank.png'),
  'planche': getImagePath('plank.png'),
  'gainage – série 1': getImagePath('plank.png'),
  'gainage – série 2': getImagePath('plank.png'),
  'gainage – série 3': getImagePath('plank.png'),
  
  'leg_raises': getImagePath('leg_raises.png'),
  'relevés de jambes': getImagePath('leg_raises.png'),
  'relevé de jambes': getImagePath('leg_raises.png'),
  'relevés de jambes – série 1': getImagePath('leg_raises.png'),
  'relevés de jambes – série 2': getImagePath('leg_raises.png'),
  'relevés de jambes – série 3': getImagePath('leg_raises.png'),
  
  'crunch': getImagePath('crunch.png'),
  'crunch lent': getImagePath('crunch.png'),
  'crunch lent – série 1': getImagePath('crunch.png'),
  'crunch lent – série 2': getImagePath('crunch.png'),
  
  // Retour au calme
  'chest_stretch': getImagePath('chest_stretch.png'),
  'étirement pectoraux': getImagePath('chest_stretch.png'),
  
  'breathing_relax': getImagePath('breathing_relax.png'),
  'respiration profonde': getImagePath('breathing_relax.png'),
  
  // Repos
  'rest': getImagePath('rest.png'),
  'repos': getImagePath('rest.png'),
  
  // Abdominaux supplémentaires
  'planche latérale gauche': getImagePath('side_plank_left.png'),
  'planche latérale droite': getImagePath('side_plank_right.png'),
  'relevé de bassin': getImagePath('pelvic_tilt.png'),
  'vélo au sol': getImagePath('bicycle_crunches.png'),
  'montées de genoux rapides': getImagePath('mountain_climbers.png'),
  'gainage sur le dos': getImagePath('hollow_hold.png'),
  'crunch + rotation': getImagePath('oblique_crunches.png'),
  'planche (finisher)': getImagePath('plank.png'),
  
  // Bras et épaules
  'curl biceps': getImagePath('bicep_curls.png'),
  'curl biceps (lent)': getImagePath('bicep_curls.png'),
  'triceps au-dessus de la tête': getImagePath('overhead_triceps.png'),
  'triceps (petites reps propres)': getImagePath('overhead_triceps.png'),
  'développé épaules': getImagePath('shoulder_press.png'),
  'rowing haltère': getImagePath('dumbbell_rows.png'),
  'rowing haltère (dos)': getImagePath('dumbbell_rows.png'),
  'curl marteau': getImagePath('hammer_curls.png'),
  'élévations latérales': getImagePath('lateral_raises.png'),
  
  // Cardio
  'vélo (échauffement)': getImagePath('cycling.png'),
  'vélo (rythme moyen)': getImagePath('cycling.png'),
  'vélo (récup)': getImagePath('cycling.png'),
  'vélo (soutenu)': getImagePath('cycling.png'),
  'vélo (retour au calme)': getImagePath('cycling.png'),
  
  // Jambes et full body
  'squats': getImagePath('squats.png'),
  'fentes alternées': getImagePath('lunges.png'),
  'pont fessier': getImagePath('glute_bridge.png'),
  'jumping jacks': getImagePath('jumping_jacks.png'),
  'marche rapide sur place': getImagePath('high_knees.png'),
  
  // Dos et posture
  'superman': getImagePath('superman.png'),
  'oiseau-chien (bird dog)': getImagePath('bird_dog.png'),
  
  // Étirements et cooldown
  'étirements dos/hanches': getImagePath('back_stretch.png'),
  'retour au calme': getImagePath('cooldown.png'),
};

/**
 * Récupère l'image d'un exercice par son nom
 * @param {string} exerciseName - Nom de l'exercice
 * @returns {string|null} - URL de l'image ou null si non trouvée
 */
export function getExerciseImage(exerciseName) {
  if (!exerciseName) return null;
  
  const normalizedName = exerciseName.toLowerCase().trim();
  return exerciseImageMap[normalizedName] || null;
}

/**
 * Vérifie si une image existe pour un exercice
 * @param {string} exerciseName - Nom de l'exercice
 * @returns {boolean}
 */
export function hasExerciseImage(exerciseName) {
  return getExerciseImage(exerciseName) !== null;
}

/**
 * Récupère l'image avec fallback
 * @param {string} exerciseName - Nom de l'exercice
 * @param {string} fallbackUrl - URL de fallback si l'image n'existe pas
 * @returns {string}
 */
export function getExerciseImageWithFallback(exerciseName, fallbackUrl = getImagePath('rest.png')) {
  return getExerciseImage(exerciseName) || fallbackUrl;
}
