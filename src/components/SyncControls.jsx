import { useState } from 'react';
import { Monitor, MonitorOff, Copy, Check } from 'lucide-react';
import { useSyncStore } from '../store/useSyncStore';
import { useTimerStore } from '../store/useTimerStore';

export const SyncControls = () => {
  const { 
    isHost, 
    isConnected, 
    sessionCode, 
    createHostSession, 
    disconnect 
  } = useSyncStore();
  
  const timerState = useTimerStore();
  const [copied, setCopied] = useState(false);

  const handleStartSync = async () => {
    const code = await createHostSession({
      state: timerState.state,
      timeRemaining: timerState.timeRemaining,
      totalTime: timerState.totalTime,
      currentCycle: timerState.currentCycle,
      currentActivity: timerState.currentActivity,
      currentExerciseIndex: timerState.currentExerciseIndex,
      sessionStats: timerState.sessionStats
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleStartSync}
        className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-colors"
      >
        <Monitor className="w-5 h-5" />
        Activer écran distant
      </button>
    );
  }

  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-purple-900">Écran distant actif</span>
        </div>
        <button
          onClick={disconnect}
          className="p-2 hover:bg-purple-200 rounded-lg transition-colors"
        >
          <MonitorOff className="w-5 h-5 text-purple-600" />
        </button>
      </div>
      
      <div className="flex items-center gap-2 bg-white rounded-xl p-3">
        <div className="flex-1">
          <div className="text-xs text-gray-600 mb-1">Code de session</div>
          <div className="text-2xl font-bold text-purple-600 tracking-widest">
            {sessionCode}
          </div>
        </div>
        <button
          onClick={handleCopyCode}
          className="p-3 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-600" />
          ) : (
            <Copy className="w-5 h-5 text-purple-600" />
          )}
        </button>
      </div>
      
      <div className="mt-3 text-sm text-purple-700">
        Ouvre <span className="font-mono bg-purple-100 px-2 py-1 rounded">
          /display
        </span> sur ton Nest Hub et entre ce code
      </div>
    </div>
  );
};
