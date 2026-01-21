import { useEffect, useState } from 'react';
import { Timer as TimerIcon, Dumbbell, Bike, Flame } from 'lucide-react';
import { useSyncStore } from '../store/useSyncStore';
import { useTimerStore } from '../store/useTimerStore';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'bike':
      return <Bike className="w-32 h-32" />;
    case 'dumbbell':
      return <Dumbbell className="w-32 h-32" />;
    case 'abs':
      return <Flame className="w-32 h-32" />;
    default:
      return <TimerIcon className="w-32 h-32" />;
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
      return 'from-indigo-500 to-purple-500';
  }
};

export const DisplayMode = () => {
  const { sessionCode, joinDisplaySession } = useSyncStore();
  const [displayState, setDisplayState] = useState(null);
  const [inputCode, setInputCode] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    if (inputCode.length === 6) {
      setIsConnecting(true);
      joinDisplaySession(inputCode, (data) => {
        setDisplayState(data);
        setIsConnecting(false);
      });
    }
  };

  if (!sessionCode || !displayState) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-8">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12 text-center">
          <TimerIcon className="w-32 h-32 mx-auto mb-8 text-indigo-600" />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Mode Écran Distant
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Connecte-toi avec le code de session
          </p>
          
          <div className="mb-8">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="CODE"
              maxLength={6}
              className="w-full text-center text-6xl font-bold tracking-widest px-8 py-6 bg-gray-50 border-4 border-gray-300 rounded-2xl focus:border-indigo-500 focus:outline-none uppercase"
            />
          </div>
          
          <button
            onClick={handleConnect}
            disabled={inputCode.length !== 6 || isConnecting}
            className="w-full px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-2xl rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? 'Connexion...' : 'Connecter'}
          </button>
        </div>
      </div>
    );
  }

  const isFocus = displayState.state === 'focus';
  const isBreak = displayState.state === 'break';
  const isPaused = displayState.state === 'paused';
  const currentExercise = displayState.currentActivity?.type === 'block'
    ? displayState.currentActivity.exercises[displayState.currentExerciseIndex]
    : displayState.currentActivity?.exercise;

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-8 ${
      isFocus 
        ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
        : 'bg-gradient-to-br from-emerald-900 to-teal-900'
    }`}>
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-white/80 text-3xl font-semibold mb-4">
            {isFocus && 'Focus'}
            {isBreak && 'Pause Sport'}
            {isPaused && 'En Pause'}
            {displayState.state === 'idle' && 'En attente'}
          </div>
          
          <div className="text-white text-[12rem] font-bold leading-none mb-8 font-mono">
            {formatTime(displayState.timeRemaining)}
          </div>

          {isBreak && currentExercise && (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-8">
              <div className="text-white mb-8">
                {getCategoryIcon(displayState.currentActivity.category)}
              </div>
              
              <h2 className="text-5xl font-bold text-white mb-6">
                {currentExercise.name}
              </h2>
              
              <p className="text-3xl text-white/90 leading-relaxed">
                {currentExercise.instructions}
              </p>

              {displayState.currentActivity.type === 'block' && (
                <div className="mt-8 text-2xl text-white/80">
                  Exercice {displayState.currentExerciseIndex + 1}/{displayState.currentActivity.exercises.length}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-8">
          <StatCard
            label="Cycle"
            value={displayState.currentCycle}
            color="white"
          />
          <StatCard
            label="Focus total"
            value={`${Math.floor(displayState.sessionStats.focus_total_seconds / 60)}m`}
            color="white"
          />
          <StatCard
            label="Pauses"
            value={`${displayState.sessionStats.breaks_done}`}
            color="white"
          />
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block px-8 py-4 bg-white/20 backdrop-blur-lg rounded-2xl">
            <span className="text-white/60 text-xl mr-4">Code session:</span>
            <span className="text-white text-3xl font-bold tracking-widest">{sessionCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
    <div className={`text-6xl font-bold text-${color} mb-2`}>
      {value}
    </div>
    <div className={`text-xl text-${color}/80`}>
      {label}
    </div>
  </div>
);
