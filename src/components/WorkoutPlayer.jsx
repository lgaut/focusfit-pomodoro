import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, X, Clock, CheckCircle } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getCategoryIcon = (id) => {
  if (id.includes('abs')) return '🔥';
  if (id.includes('arms') || id.includes('dumbbells')) return '💪';
  if (id.includes('bike')) return '🚴';
  if (id.includes('fullbody')) return '⚡';
  if (id.includes('back')) return '🧘';
  return '🏃';
};

const getCategoryColor = (id) => {
  if (id.includes('abs')) return 'from-purple-500 to-pink-500';
  if (id.includes('arms') || id.includes('dumbbells')) return 'from-orange-500 to-red-500';
  if (id.includes('bike')) return 'from-blue-500 to-cyan-500';
  if (id.includes('fullbody')) return 'from-green-500 to-emerald-500';
  if (id.includes('back')) return 'from-indigo-500 to-purple-500';
  return 'from-gray-500 to-gray-600';
};

export const WorkoutPlayer = ({ workout, onExit }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(workout.exercises[0].duration_seconds);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalExercises = workout.exercises.length;
  const progress = ((currentExerciseIndex) / totalExercises) * 100;

  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleExerciseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, timeRemaining]);

  const handleExerciseComplete = () => {
    soundManager.playBeep(800, 200);
    
    if (currentExerciseIndex < totalExercises - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setTimeRemaining(workout.exercises[nextIndex].duration_seconds);
      setIsPlaying(false);
    } else {
      setIsPlaying(false);
      setIsCompleted(true);
      
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Entraînement terminé ! 🎉', {
          body: `Bravo ! Tu as complété ${workout.title}`,
          icon: '/focusfit-pomodoro/pwa-192x192.png'
        });
      }
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      soundManager.playBeep(600, 100);
    }
  };

  const handleSkip = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setTimeRemaining(workout.exercises[nextIndex].duration_seconds);
      setIsPlaying(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg animate-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Bravo ! 🎉
          </h2>

          <p className="text-lg text-center text-gray-600 mb-8">
            Tu as terminé <span className="font-bold">{workout.title}</span>
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  {workout.total_duration_minutes}
                </div>
                <div className="text-sm text-gray-500 font-medium">minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {totalExercises}
                </div>
                <div className="text-sm text-gray-500 font-medium">exercices</div>
              </div>
            </div>
          </div>

          <button
            onClick={onExit}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
          >
            Retour aux entraînements
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
      <div className="flex-1 flex flex-col p-4 overflow-y-auto pb-32">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onExit}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
            {currentExerciseIndex + 1}/{totalExercises}
          </div>
        </div>

        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getCategoryColor(workout.id)} flex items-center justify-center text-3xl`}>
            {getCategoryIcon(workout.id)}
          </div>
        </div>

        <h2 className="text-lg font-bold text-center text-gray-800 mb-1">
          {workout.title}
        </h2>

        <div className="relative w-full max-w-xs mx-auto mb-6" style={{ aspectRatio: '1/1' }}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#10b981"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - (currentExercise.duration_seconds - timeRemaining) / currentExercise.duration_seconds)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-gray-800 mb-1">
              {formatTime(timeRemaining)}
            </div>
            <div className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
              {isPlaying ? 'En cours' : 'En pause'}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
            {currentExercise.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            {currentExercise.description}
          </p>
        </div>

        <div className="flex gap-1 mb-4">
          {workout.exercises.map((_, idx) => (
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

        <div className="space-y-2 max-h-32 overflow-y-auto">
          {workout.exercises.map((exercise, idx) => (
            <div
              key={idx}
              className={`text-xs px-3 py-2 rounded-lg transition-all ${
                idx === currentExerciseIndex
                  ? 'bg-emerald-100 text-emerald-800 font-semibold'
                  : idx < currentExerciseIndex
                  ? 'bg-gray-100 text-gray-400 line-through'
                  : 'bg-white text-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{idx + 1}. {exercise.name}</span>
                <span className="text-xs opacity-75">
                  {Math.floor(exercise.duration_seconds / 60)}:{(exercise.duration_seconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-emerald-50 via-emerald-50 to-transparent">
        <div className="flex gap-2 max-w-md mx-auto">
          <button
            onClick={handlePlayPause}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold active:scale-95 transition-all shadow-lg ${
              isPlaying
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Démarrer
              </>
            )}
          </button>

          {currentExerciseIndex < totalExercises - 1 && (
            <button
              onClick={handleSkip}
              className="flex items-center justify-center w-14 h-14 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-100 active:scale-95 transition-all shadow-lg"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
