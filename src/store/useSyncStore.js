import { create } from 'zustand';
import { generateSessionCode, createSession, joinSession, syncTimerState } from '../services/supabase';

export const useSyncStore = create((set, get) => ({
  isHost: false,
  isDisplay: false,
  sessionCode: null,
  isConnected: false,
  unsubscribe: null,

  createHostSession: async (timerState) => {
    const code = generateSessionCode();
    await createSession(code, {
      state: timerState.state,
      timeRemaining: timerState.timeRemaining,
      totalTime: timerState.totalTime,
      currentCycle: timerState.currentCycle,
      currentActivity: timerState.currentActivity,
      currentExerciseIndex: timerState.currentExerciseIndex,
      sessionStats: timerState.sessionStats
    });
    
    set({
      isHost: true,
      isDisplay: false,
      sessionCode: code,
      isConnected: true
    });
    
    localStorage.setItem('syncSessionCode', code);
    localStorage.setItem('syncIsHost', 'true');
    
    return code;
  },

  joinDisplaySession: (code, onUpdate) => {
    const unsubscribe = joinSession(code, (data) => {
      if (onUpdate) {
        onUpdate(data);
      }
    });
    
    set({
      isHost: false,
      isDisplay: true,
      sessionCode: code,
      isConnected: true,
      unsubscribe
    });
    
    localStorage.setItem('syncSessionCode', code);
    localStorage.setItem('syncIsHost', 'false');
  },

  syncState: async (timerState) => {
    const { sessionCode, isHost } = get();
    if (sessionCode && isHost) {
      await syncTimerState(sessionCode, timerState);
    }
  },

  disconnect: () => {
    const { unsubscribe } = get();
    if (unsubscribe) {
      unsubscribe();
    }
    
    set({
      isHost: false,
      isDisplay: false,
      sessionCode: null,
      isConnected: false,
      unsubscribe: null
    });
    
    localStorage.removeItem('syncSessionCode');
    localStorage.removeItem('syncIsHost');
  },

  restoreSession: () => {
    const code = localStorage.getItem('syncSessionCode');
    const isHost = localStorage.getItem('syncIsHost') === 'true';
    
    if (code) {
      set({
        sessionCode: code,
        isHost,
        isDisplay: !isHost
      });
      return { code, isHost };
    }
    return null;
  }
}));
