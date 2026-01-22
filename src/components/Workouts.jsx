import { useState, useEffect } from 'react';
import { Dumbbell, Clock, Play, ChevronRight, CheckCircle2, Flame, Bike, Zap, User } from 'lucide-react';
import workoutsData from '../../exercices_only.json';
import { getTodayCompletedWorkouts } from '../services/cloudSync';

const getCategoryIcon = (id) => {
  if (id.includes('abs')) return Flame;
  if (id.includes('arms') || id.includes('dumbbells')) return Dumbbell;
  if (id.includes('bike')) return Bike;
  if (id.includes('fullbody')) return Zap;
  if (id.includes('back')) return User;
  return User;
};

const getCategoryColor = (id) => {
  if (id.includes('abs')) return 'from-purple-500 to-pink-500';
  if (id.includes('arms') || id.includes('dumbbells')) return 'from-orange-500 to-red-500';
  if (id.includes('bike')) return 'from-blue-500 to-cyan-500';
  if (id.includes('fullbody')) return 'from-green-500 to-emerald-500';
  if (id.includes('back')) return 'from-indigo-500 to-purple-500';
  return 'from-gray-500 to-gray-600';
};

export const Workouts = ({ onStartWorkout }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const workouts = workoutsData.workouts_20min;

  useEffect(() => {
    const loadCompletedWorkouts = async () => {
      const completed = await getTodayCompletedWorkouts();
      setCompletedWorkouts(completed);
    };
    loadCompletedWorkouts();
  }, []);

  if (selectedWorkout) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
        <div className="flex-1 flex flex-col p-4 overflow-y-auto pb-28">
          <button
            onClick={() => setSelectedWorkout(null)}
            className="mb-4 text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            ← Retour
          </button>

          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getCategoryColor(selectedWorkout.id)} flex items-center justify-center`}>
              {(() => {
                const Icon = getCategoryIcon(selectedWorkout.id);
                return <Icon className="w-8 h-8 text-white" />;
              })()}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {selectedWorkout.title}
          </h2>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">
              {selectedWorkout.total_duration_minutes} minutes
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600 font-medium">
              {selectedWorkout.exercises.length} exercices
            </span>
          </div>

          <div className="space-y-3">
            {selectedWorkout.exercises.map((exercise, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 shadow-md"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-600 font-bold text-sm mt-0.5">
                      {idx + 1}.
                    </span>
                    <h3 className="font-bold text-gray-800">{exercise.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 font-semibold text-sm">
                    <Clock className="w-4 h-4" />
                    {Math.floor(exercise.duration_seconds / 60)}:{(exercise.duration_seconds % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed ml-6">
                  {exercise.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <button
            onClick={() => onStartWorkout(selectedWorkout)}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
          >
            <Play className="w-5 h-5" />
            Démarrer l'entraînement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      <div className="flex-1 flex flex-col p-4 overflow-y-auto pb-28">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-800">Entraînements</h1>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Séquences d'exercices de 20 minutes pour rester en forme
        </p>

        <div className="space-y-3">
          {workouts.map((workout) => {
            const isCompleted = completedWorkouts.includes(workout.id);
            return (
              <button
                key={workout.id}
                onClick={() => setSelectedWorkout(workout)}
                className={`w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg active:scale-98 transition-all text-left ${
                  isCompleted ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 relative">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCategoryColor(workout.id)} flex items-center justify-center`}>
                      {(() => {
                        const Icon = getCategoryIcon(workout.id);
                        return <Icon className="w-6 h-6 text-white" />;
                      })()}
                    </div>
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">
                        {workout.title}
                      </h3>
                      {isCompleted && (
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Fait aujourd'hui
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {workout.total_duration_minutes} min
                      </span>
                      <span>•</span>
                      <span>{workout.exercises.length} exercices</span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
