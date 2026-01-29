// Mapping des exercices vers leurs images générées
export const exerciseImageMap = {
  // Échauffement
  'arm_circles': '/exercise-images/arm_circles.png',
  'cercles de bras': '/exercise-images/arm_circles.png',
  
  'pushups_light': '/exercise-images/pushups_light.png',
  'pompes légères': '/exercise-images/pushups_light.png',
  
  'plank_light': '/exercise-images/plank_light.png',
  'gainage léger': '/exercise-images/plank_light.png',
  
  'breathing': '/exercise-images/breathing.png',
  'respiration et mise en place': '/exercise-images/breathing.png',
  'respiration': '/exercise-images/breathing.png',
  
  // Bloc Pectoraux
  'pushups': '/exercise-images/pushups.png',
  'pompes': '/exercise-images/pushups.png',
  'pompes – série 1': '/exercise-images/pushups.png',
  'pompes – série 2': '/exercise-images/pushups.png',
  'pompes – série 3': '/exercise-images/pushups.png',
  
  'dumbbell_press': '/exercise-images/dumbbell_press.png',
  'développé haltères': '/exercise-images/dumbbell_press.png',
  'développé haltères (au sol ou banc)': '/exercise-images/dumbbell_press.png',
  'développé haltères – série 1': '/exercise-images/dumbbell_press.png',
  'développé haltères – série 2': '/exercise-images/dumbbell_press.png',
  'développé haltères – série 3': '/exercise-images/dumbbell_press.png',
  
  'dumbbell_fly': '/exercise-images/dumbbell_fly.png',
  'écartés haltères': '/exercise-images/dumbbell_fly.png',
  'écartés haltères – série 1': '/exercise-images/dumbbell_fly.png',
  'écartés haltères – série 2': '/exercise-images/dumbbell_fly.png',
  
  // Bloc Abdominaux
  'plank': '/exercise-images/plank.png',
  'gainage': '/exercise-images/plank.png',
  'planche': '/exercise-images/plank.png',
  'gainage – série 1': '/exercise-images/plank.png',
  'gainage – série 2': '/exercise-images/plank.png',
  'gainage – série 3': '/exercise-images/plank.png',
  
  'leg_raises': '/exercise-images/leg_raises.png',
  'relevés de jambes': '/exercise-images/leg_raises.png',
  'relevé de jambes': '/exercise-images/leg_raises.png',
  'relevés de jambes – série 1': '/exercise-images/leg_raises.png',
  'relevés de jambes – série 2': '/exercise-images/leg_raises.png',
  'relevés de jambes – série 3': '/exercise-images/leg_raises.png',
  
  'crunch': '/exercise-images/crunch.png',
  'crunch lent': '/exercise-images/crunch.png',
  'crunch lent – série 1': '/exercise-images/crunch.png',
  'crunch lent – série 2': '/exercise-images/crunch.png',
  
  // Retour au calme
  'chest_stretch': '/exercise-images/chest_stretch.png',
  'étirement pectoraux': '/exercise-images/chest_stretch.png',
  
  'breathing_relax': '/exercise-images/breathing_relax.png',
  'respiration profonde': '/exercise-images/breathing_relax.png',
  
  // Repos
  'rest': '/exercise-images/rest.png',
  'repos': '/exercise-images/rest.png',
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
export function getExerciseImageWithFallback(exerciseName, fallbackUrl = '/exercise-images/rest.png') {
  return getExerciseImage(exerciseName) || fallbackUrl;
}
