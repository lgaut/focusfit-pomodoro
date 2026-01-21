export const exercises = [
  {
    id: "bike_easy",
    category: "bike",
    name: "Vélo (cool)",
    instructions: "Pédale tranquillement, respiration stable, pas d'essoufflement.",
    duration_seconds_default: 300,
    level: "easy"
  },
  {
    id: "bike_medium",
    category: "bike",
    name: "Vélo (rythme moyen)",
    instructions: "Pédale à rythme régulier, tu transpires un peu mais tu tiens.",
    duration_seconds_default: 300,
    level: "normal"
  },
  {
    id: "dumbbell_curl",
    category: "dumbbell",
    name: "Haltères : Curls biceps",
    instructions: "Debout, dos droit. Monte et descends lentement. Ne balance pas.",
    duration_seconds_default: 300,
    level: "normal"
  },
  {
    id: "dumbbell_triceps",
    category: "dumbbell",
    name: "Haltères : Triceps (au-dessus de la tête)",
    instructions: "Un haltère tenu à deux mains, descends derrière la tête puis remonte.",
    duration_seconds_default: 300,
    level: "normal"
  },
  {
    id: "dumbbell_shoulder_press",
    category: "dumbbell",
    name: "Haltères : Épaules (développé)",
    instructions: "Assis ou debout. Monte les haltères au-dessus de la tête et redescends contrôlé.",
    duration_seconds_default: 300,
    level: "normal"
  },
  {
    id: "abs_plank",
    category: "abs",
    name: "Planche",
    instructions: "Sur les avant-bras, corps droit. Ventre serré. Ne creuse pas le dos.",
    duration_seconds_default: 60,
    level: "normal"
  },
  {
    id: "abs_crunch",
    category: "abs",
    name: "Crunch",
    instructions: "Allongé, remonte légèrement les épaules. Mouvement court et contrôlé.",
    duration_seconds_default: 60,
    level: "normal"
  },
  {
    id: "abs_reverse_crunch",
    category: "abs",
    name: "Relevé de bassin",
    instructions: "Allongé, genoux vers la poitrine. Décolle légèrement les fesses.",
    duration_seconds_default: 60,
    level: "normal"
  },
  {
    id: "abs_knee_drive",
    category: "abs",
    name: "Montées de genoux rapides",
    instructions: "Position pompe. Ramène les genoux vite vers la poitrine. Reste gainé.",
    duration_seconds_default: 60,
    level: "normal"
  },
  {
    id: "abs_hollow_hold",
    category: "abs",
    name: "Gainage sur le dos",
    instructions: "Allongé sur le dos. Ventre serré. Jambes légèrement levées, tiens.",
    duration_seconds_default: 60,
    level: "normal"
  },
  {
    id: "abs_side_plank_left",
    category: "abs",
    name: "Planche côté gauche",
    instructions: "Sur le côté gauche, appui avant-bras. Corps bien droit.",
    duration_seconds_default: 30,
    level: "easy"
  },
  {
    id: "abs_side_plank_right",
    category: "abs",
    name: "Planche côté droite",
    instructions: "Sur le côté droit, appui avant-bras. Corps bien droit.",
    duration_seconds_default: 30,
    level: "easy"
  },
  {
    id: "abs_bicycle",
    category: "abs",
    name: "Vélo au sol",
    instructions: "Allongé, pédale dans le vide et touche coude/genou si possible.",
    duration_seconds_default: 60,
    level: "normal"
  }
];

export const getExerciseById = (id) => exercises.find(ex => ex.id === id);
export const getExercisesByCategory = (category) => exercises.filter(ex => ex.category === category);
