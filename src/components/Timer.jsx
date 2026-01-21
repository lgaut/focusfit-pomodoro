import { useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const Timer = () => {
  const {
    state,
    timeRemaining,
    totalTime,
    currentCycle,
    sessionStats,
    startFocus,
    pause,
    resume,
    reset
  } = useTimerStore();

  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;
  const isFocus = state === 'focus';
  const isBreak = state === 'break';
  const isPaused = state === 'paused';
  const isIdle = state === 'idle';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <TimerIcon className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">FocusFit</h1>
          </div>
          <div className="text-sm text-gray-600">
            Cycle {currentCycle}
          </div>
        </div>

        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke={isFocus ? "#6366f1" : "#10b981"}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {formatTime(timeRemaining)}
            </div>
            <div className={`text-sm font-medium ${isFocus ? 'text-indigo-600' : 'text-emerald-600'}`}>
              {isFocus && 'Focus'}
              {isBreak && 'Pause Sport'}
              {isPaused && 'En pause'}
              {isIdle && 'Prêt'}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center mb-6">
          {isIdle && (
            <button
              onClick={startFocus}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              <Play className="w-5 h-5" />
              Démarrer
            </button>
          )}
          
          {(isFocus || isBreak) && (
            <button
              onClick={pause}
              className="flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-lg"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          )}
          
          {isPaused && (
            <button
              onClick={resume}
              className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-lg"
            >
              <Play className="w-5 h-5" />
              Reprendre
            </button>
          )}
          
          {!isIdle && (
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {Math.floor(sessionStats.focus_total_seconds / 60)}
            </div>
            <div className="text-xs text-gray-600">min focus</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {sessionStats.breaks_done}
            </div>
            <div className="text-xs text-gray-600">pauses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {sessionStats.abs_breaks_done}/2
            </div>
            <div className="text-xs text-gray-600">abdos</div>
          </div>
        </div>
      </div>
    </div>
  );
};
