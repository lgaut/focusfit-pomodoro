// Service pour récupérer des GIFs d'exercices via l'API Giphy

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

// Mapping des exercices vers des termes de recherche Giphy optimisés
const exerciseSearchTerms = {
  'bike_easy': 'stationary bike exercise',
  'bike_medium': 'cycling workout indoor',
  'dumbbell_curl': 'bicep curl dumbbell',
  'dumbbell_triceps': 'triceps extension overhead',
  'dumbbell_shoulder_press': 'shoulder press dumbbell',
  'abs_plank': 'plank exercise core',
  'abs_crunch': 'crunch abs exercise',
  'abs_reverse_crunch': 'reverse crunch abs',
  'abs_knee_drive': 'mountain climbers exercise',
  'abs_hollow_hold': 'hollow body hold',
  'abs_side_plank_left': 'side plank exercise',
  'abs_side_plank_right': 'side plank exercise',
  'abs_bicycle': 'bicycle crunch abs'
};

// Cache pour éviter de refaire les mêmes requêtes
const gifCache = new Map();

/**
 * Recherche un GIF pour un exercice spécifique
 * @param {string} exerciseId - L'ID de l'exercice
 * @returns {Promise<string|null>} - L'URL du GIF ou null
 */
export const getExerciseGif = async (exerciseId) => {
  // Vérifier le cache
  if (gifCache.has(exerciseId)) {
    return gifCache.get(exerciseId);
  }

  // Vérifier que la clé API est configurée
  if (!GIPHY_API_KEY) {
    console.warn('Giphy API key not configured');
    return null;
  }

  const searchTerm = exerciseSearchTerms[exerciseId];
  if (!searchTerm) {
    console.warn(`No search term for exercise: ${exerciseId}`);
    return null;
  }

  try {
    const params = new URLSearchParams({
      api_key: GIPHY_API_KEY,
      q: searchTerm,
      limit: 1,
      rating: 'g', // Contenu familial
      lang: 'en'
    });

    const response = await fetch(`${GIPHY_API_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Giphy API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      // Utiliser la version "fixed_height" pour un bon compromis taille/qualité
      const gifUrl = data.data[0].images.fixed_height.url;
      
      // Mettre en cache
      gifCache.set(exerciseId, gifUrl);
      
      return gifUrl;
    }

    return null;
  } catch (error) {
    console.error('Error fetching Giphy GIF:', error);
    return null;
  }
};

/**
 * Précharger les GIFs pour tous les exercices
 * @param {Array<string>} exerciseIds - Liste des IDs d'exercices
 */
export const preloadExerciseGifs = async (exerciseIds) => {
  const promises = exerciseIds.map(id => getExerciseGif(id));
  await Promise.allSettled(promises);
  console.log(`Preloaded ${gifCache.size} exercise GIFs`);
};

/**
 * Vider le cache des GIFs
 */
export const clearGifCache = () => {
  gifCache.clear();
};
