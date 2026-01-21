import { Check, X, RefreshCw, Clock } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';

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

  if (!currentActivity) return null;

  const isBlock = currentActivity.type === 'block';
  const currentExercise = isBlock 
    ? currentActivity.exercises[currentExerciseIndex]
    : currentActivity.exercise;

  const isBreakActive = state === 'break';
  const categoryColor = getCategoryColor(currentActivity.category);
  const categoryIcon = getCategoryIcon(currentActivity.category);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${categoryColor} flex items-center justify-center text-4xl shadow-lg`}>
          {categoryIcon}
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Pause Sport !
        </h2>

        {isBlock && (
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              {currentActivity.block.name}
            </span>
            <div className="mt-2 text-sm text-gray-600">
              Exercice {currentExerciseIndex + 1}/{currentActivity.exercises.length}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {currentExercise.name}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {currentExercise.instructions}
          </p>
          
          {isBreakActive && (
            <div className="mt-4 flex items-center justify-center gap-2 text-2xl font-bold text-emerald-600">
              <Clock className="w-6 h-6" />
              {formatTime(timeRemaining)}
            </div>
          )}
        </div>

        {!isBreakActive ? (
          <div className="space-y-3">
            <button
              onClick={startBreak}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
            >
              <Check className="w-5 h-5" />
              C'est parti !
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={changeActivity}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Changer
              </button>
              
              <button
                onClick={skipBreak}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors"
              >
                <X className="w-4 h-4" />
                Skip
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={completeBreak}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
            >
              <Check className="w-5 h-5" />
              Terminé
            </button>
            
            <button
              onClick={skipBreak}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors"
            >
              <X className="w-4 h-4" />
              Abandonner
            </button>
          </div>
        )}

        {isBlock && currentActivity.exercises.length > 1 && (
          <div className="mt-6 flex gap-1 justify-center">
            {currentActivity.exercises.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-colors ${
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
    </div>
  );
};
