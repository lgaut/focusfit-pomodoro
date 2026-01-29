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
  
  // Abdominaux supplémentaires
  'planche latérale gauche': '/exercise-images/side_plank_left.png',
  'planche latérale droite': '/exercise-images/side_plank_right.png',
  'relevé de bassin': '/exercise-images/pelvic_tilt.png',
  'vélo au sol': '/exercise-images/bicycle_crunches.png',
  'montées de genoux rapides': '/exercise-images/mountain_climbers.png',
  'gainage sur le dos': '/exercise-images/hollow_hold.png',
  'crunch + rotation': '/exercise-images/oblique_crunches.png',
  'planche (finisher)': '/exercise-images/plank.png',
  
  // Bras et épaules
  'curl biceps': '/exercise-images/bicep_curls.png',
  'curl biceps (lent)': '/exercise-images/bicep_curls.png',
  'triceps au-dessus de la tête': '/exercise-images/overhead_triceps.png',
  'triceps (petites reps propres)': '/exercise-images/overhead_triceps.png',
  'développé épaules': '/exercise-images/shoulder_press.png',
  'rowing haltère': '/exercise-images/dumbbell_rows.png',
  'rowing haltère (dos)': '/exercise-images/dumbbell_rows.png',
  'curl marteau': '/exercise-images/hammer_curls.png',
  'élévations latérales': '/exercise-images/lateral_raises.png',
  
  // Cardio
  'vélo (échauffement)': '/exercise-images/cycling.png',
  'vélo (rythme moyen)': '/exercise-images/cycling.png',
  'vélo (récup)': '/exercise-images/cycling.png',
  'vélo (soutenu)': '/exercise-images/cycling.png',
  'vélo (retour au calme)': '/exercise-images/cycling.png',
  
  // Jambes et full body
  'squats': '/exercise-images/squats.png',
  'fentes alternées': '/exercise-images/lunges.png',
  'pont fessier': '/exercise-images/glute_bridge.png',
  'jumping jacks': '/exercise-images/jumping_jacks.png',
  'marche rapide sur place': '/exercise-images/high_knees.png',
  
  // Dos et posture
  'superman': '/exercise-images/superman.png',
  'oiseau-chien (bird dog)': '/exercise-images/bird_dog.png',
  
  // Étirements et cooldown
  'étirements dos/hanches': '/exercise-images/back_stretch.png',
  'retour au calme': '/exercise-images/cooldown.png',
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
