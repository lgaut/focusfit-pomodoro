import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Check, X, Flame, Dumbbell, Bike, Zap, User } from 'lucide-react';
import exercisesData from '../../exercices_only.json';

const categoryIcons = {
  abs: Flame,
  arms: Dumbbell,
  bike: Bike,
  fullbody: Zap,
  back: User
};

const categoryNames = {
  abs: 'Abdos',
  arms: 'Bras & Épaules',
  bike: 'Vélo',
  fullbody: 'Full Body',
  back: 'Dos & Posture'
};

const categoryColors = {
  abs: 'from-orange-400 to-red-500',
  arms: 'from-blue-400 to-indigo-500',
  bike: 'from-green-400 to-emerald-500',
  fullbody: 'from-purple-400 to-pink-500',
  back: 'from-cyan-400 to-blue-500'
};

export const ExerciseCustomization = ({ preferences, onChange }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Extraire et grouper les exercices par catégorie depuis les workouts
  const exercisesByCategory = {};
  
  // Mapper les workouts aux catégories
  const workoutCategories = {
    'w20_abs_express': 'abs',
    'w20_abs_cardio': 'abs',
    'w20_arms_dumbbells': 'arms',
    'w20_bike_cardio': 'bike',
    'w20_fullbody': 'fullbody',
    'w20_back_posture': 'back'
  };

  exercisesData.workouts_20min.forEach(workout => {
    const category = workoutCategories[workout.id] || 'other';
    if (!exercisesByCategory[category]) {
      exercisesByCategory[category] = [];
    }
    workout.exercises.forEach((exercise, index) => {
      exercisesByCategory[category].push({
        ...exercise,
        id: `${workout.id}_${index}`,
        category
      });
    });
  });

  const toggleCategory = (category) => {
    const newCategories = {
      ...preferences.categories,
      [category]: !preferences.categories[category]
    };
    onChange({
      ...preferences,
      categories: newCategories
    });
  };

  const toggleExercise = (exerciseId) => {
    const isDisabled = preferences.disabled_exercises.includes(exerciseId);
    const newDisabled = isDisabled
      ? preferences.disabled_exercises.filter(id => id !== exerciseId)
      : [...preferences.disabled_exercises, exerciseId];
    
    onChange({
      ...preferences,
      disabled_exercises: newDisabled
    });
  };

  const isExerciseDisabled = (exerciseId) => {
    return preferences.disabled_exercises.includes(exerciseId);
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 mb-4">
        Personnalise tes exercices en activant/désactivant des catégories ou des exercices spécifiques.
      </div>

      {Object.keys(categoryNames).map((category) => {
        const Icon = categoryIcons[category];
        const isActive = preferences.categories[category];
        const exercises = exercisesByCategory[category] || [];
        const isExpanded = expandedCategory === category;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            {/* Category Header */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{categoryNames[category]}</div>
                    <div className="text-xs text-gray-500">{exercises.length} exercices</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Toggle Category */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      isActive ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ x: isActive ? 26 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>

                  {/* Expand Button */}
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Exercise List */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-100"
                >
                  <div className="p-4 space-y-2 bg-gray-50">
                    {exercises.map((exercise) => {
                      const disabled = isExerciseDisabled(exercise.id);
                      const categoryDisabled = !isActive;

                      return (
                        <motion.button
                          key={exercise.id}
                          onClick={() => !categoryDisabled && toggleExercise(exercise.id)}
                          disabled={categoryDisabled}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                            categoryDisabled
                              ? 'bg-gray-200 opacity-50 cursor-not-allowed'
                              : disabled
                              ? 'bg-white border-2 border-gray-200'
                              : 'bg-white border-2 border-indigo-200'
                          }`}
                          whileTap={!categoryDisabled ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center gap-3 flex-1 text-left">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              disabled || categoryDisabled
                                ? 'bg-gray-200'
                                : 'bg-indigo-100'
                            }`}>
                              {disabled || categoryDisabled ? (
                                <X className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Check className="w-4 h-4 text-indigo-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-medium truncate ${
                                disabled || categoryDisabled ? 'text-gray-500' : 'text-gray-800'
                              }`}>
                                {exercise.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {exercise.duration_seconds}s
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Summary */}
      <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200">
        <div className="text-sm text-indigo-900 font-medium mb-2">📊 Résumé</div>
        <div className="text-xs text-indigo-700 space-y-1">
          <div>
            • {Object.values(preferences.categories).filter(Boolean).length} / {Object.keys(categoryNames).length} catégories actives
          </div>
          <div>
            • {preferences.disabled_exercises.length} exercice(s) désactivé(s)
          </div>
        </div>
      </div>
    </div>
  );
};
