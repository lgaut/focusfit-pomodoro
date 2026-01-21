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
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TimerIcon className="w-5 h-5 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-800">FocusFit</h1>
          </div>
          <div className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
            Cycle {currentCycle}
          </div>
        </div>

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
              stroke={isFocus ? "#6366f1" : "#10b981"}
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl font-bold text-gray-800 mb-1">
              {formatTime(timeRemaining)}
            </div>
            <div className={`text-xs sm:text-sm font-semibold uppercase tracking-wide ${isFocus ? 'text-indigo-600' : 'text-emerald-600'}`}>
              {isFocus && 'Focus'}
              {isBreak && 'Pause Sport'}
              {isPaused && 'En pause'}
              {isIdle && 'Prêt'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-white rounded-2xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-600">
              {Math.floor(sessionStats.focus_total_seconds / 60)}
            </div>
            <div className="text-xs text-gray-500 font-medium">min focus</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-xl font-bold text-emerald-600">
              {sessionStats.breaks_done}
            </div>
            <div className="text-xs text-gray-500 font-medium">pauses</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">
              {sessionStats.abs_breaks_done}/2
            </div>
            <div className="text-xs text-gray-500 font-medium">abdos</div>
          </div>
        </div>
      </div>

      {/* Boutons alignés en bas */}
      <div className="p-4 pb-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="flex gap-2 justify-center">
          {isIdle && (
            <button
              onClick={startFocus}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
            >
              <Play className="w-5 h-5" />
              Démarrer
            </button>
          )}
          
          {(isFocus || isBreak) && (
            <button
              onClick={pause}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 active:scale-95 transition-all shadow-lg"
            >
              <Pause className="w-5 h-5" />
              Pause
            </button>
          )}
          
          {isPaused && (
            <button
              onClick={resume}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 active:scale-95 transition-all shadow-lg"
            >
              <Play className="w-5 h-5" />
              Reprendre
            </button>
          )}
          
          {!isIdle && (
            <button
              onClick={reset}
              className="flex items-center justify-center w-12 h-12 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 active:scale-95 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
