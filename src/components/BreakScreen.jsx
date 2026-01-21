import { useState, useEffect } from 'react';
import { Check, X, RefreshCw, Clock } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';
import { getExerciseGif } from '../services/giphyService';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'bike':
      return '🚴';
    case 'dumbbell':
      return '💪';
    case 'abs':
      return '🔥';
    default:
      return '⚡';
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'bike':
      return 'from-blue-500 to-cyan-500';
    case 'dumbbell':
      return 'from-orange-500 to-red-500';
    case 'abs':
      return 'from-purple-500 to-pink-500';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

export const BreakScreen = () => {
  const {
    currentActivity,
    currentExerciseIndex,
    timeRemaining,
    startBreak,
    completeBreak,
    skipBreak,
    changeActivity,
    state
  } = useTimerStore();

  const [gifUrl, setGifUrl] = useState(null);
  const [gifLoading, setGifLoading] = useState(true);

  if (!currentActivity) return null;

  const isBlock = currentActivity.type === 'block';
  const currentExercise = isBlock 
    ? currentActivity.exercises[currentExerciseIndex]
    : currentActivity.exercise;

  const isBreakActive = state === 'break';
  const categoryColor = getCategoryColor(currentActivity.category);
  const categoryIcon = getCategoryIcon(currentActivity.category);

  // Charger le GIF pour l'exercice actuel
  useEffect(() => {
    const loadGif = async () => {
      setGifLoading(true);
      const url = await getExerciseGif(currentExercise.id);
      setGifUrl(url);
      setGifLoading(false);
    };

    loadGif();
  }, [currentExercise.id]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        {/* GIF ou emoji de catégorie */}
        {gifUrl ? (
          <div className="w-full max-w-sm mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg bg-white">
            <img 
              src={gifUrl} 
              alt={currentExercise.name}
              className="w-full h-48 object-cover"
            />
          </div>
        ) : (
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${categoryColor} flex items-center justify-center text-3xl shadow-lg ${gifLoading ? 'animate-pulse' : ''}`}>
            {gifLoading ? '⏳' : categoryIcon}
          </div>
        )}

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
          Pause Sport !
        </h2>

        {isBlock && (
          <div className="text-center mb-3">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
              {currentActivity.block.name}
            </span>
            <div className="mt-1 text-xs text-gray-500">
              Exercice {currentExerciseIndex + 1}/{currentActivity.exercises.length}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 mb-4 shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {currentExercise.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {currentExercise.instructions}
          </p>
          
          {isBreakActive && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xl font-bold text-emerald-600">
              <Clock className="w-5 h-5" />
              {formatTime(timeRemaining)}
            </div>
          )}
        </div>

        {isBlock && currentActivity.exercises.length > 1 && (
          <div className="mt-4 flex gap-1 justify-center">
            {currentActivity.exercises.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  idx < currentExerciseIndex
                    ? 'bg-emerald-500'
                    : idx === currentExerciseIndex
                    ? 'bg-emerald-400'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Boutons alignés en bas */}
      <div className="p-4 pb-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        {!isBreakActive ? (
          <div className="space-y-2">
            <button
              onClick={startBreak}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 active:scale-95 transition-all shadow-lg"
            >
              <Check className="w-5 h-5" />
              C'est parti !
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={changeActivity}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 active:scale-95 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Changer
              </button>
              
              <button
                onClick={skipBreak}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
                Skip
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={completeBreak}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 active:scale-95 transition-all shadow-lg"
            >
              <Check className="w-5 h-5" />
              Terminé
            </button>
            
            <button
              onClick={skipBreak}
              className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 active:scale-95 transition-all"
            >
              <X className="w-4 h-4" />
              Abandonner
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
