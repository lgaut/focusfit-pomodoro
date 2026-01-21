import { create } from 'zustand';
import { db, getTodaySession, createSession, updateSession, addCycleLog } from '../db/database';
import { RotationManager } from '../utils/rotation';
import { soundManager } from '../utils/soundManager';

const TIMER_STATES = {
  IDLE: 'idle',
  FOCUS: 'focus',
  BREAK: 'break',
  PAUSED: 'paused'
};

let timerWorker = null;

const initWorker = () => {
  if (!timerWorker) {
    timerWorker = new Worker(new URL('../utils/timerWorker.js', import.meta.url), { type: 'module' });
  }
  return timerWorker;
};

export const useTimerStore = create((set, get) => ({
  state: TIMER_STATES.IDLE,
  timeRemaining: 0,
  totalTime: 0,
  currentCycle: 0,
  currentActivity: null,
  currentExerciseIndex: 0,
  sessionId: null,
  sessionStats: {
    cycles_completed: 0,
    focus_total_seconds: 0,
    sport_total_seconds: 0,
    breaks_done: 0,
    breaks_skipped: 0,
    abs_breaks_done: 0
  },
  settings: null,
  intervalId: null,

  initialize: async (settings) => {
    set({ settings });
    let session = await getTodaySession();
    
    if (!session) {
      const id = await createSession();
      session = await db.sessions.get(id);
    }
    
    set({
      sessionId: session.id,
      sessionStats: {
        cycles_completed: session.cycles_completed,
        focus_total_seconds: session.focus_total_seconds,
        sport_total_seconds: session.sport_total_seconds,
        breaks_done: session.breaks_done,
        breaks_skipped: session.breaks_skipped,
        abs_breaks_done: session.abs_breaks_done
      }
    });
  },

  startFocus: () => {
    const { settings } = get();
    const totalSeconds = settings.focus_minutes * 60;
    
    const worker = initWorker();
    
    worker.onmessage = (e) => {
      const { type, remaining } = e.data;
      
      if (type === 'TICK') {
        set({ timeRemaining: remaining });
      } else if (type === 'COMPLETE') {
        get().completeFocus();
      }
    };
    
    worker.postMessage({ type: 'START', duration: totalSeconds });

    set({
      state: TIMER_STATES.FOCUS,
      timeRemaining: totalSeconds,
      totalTime: totalSeconds,
      currentCycle: get().currentCycle + 1
    });

    if (settings.sound_enabled) {
      soundManager.playBeep(600, 100);
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Focus démarré', {
        body: `Session de ${settings.focus_minutes} minutes`,
        icon: '/focusfit-pomodoro/pwa-192x192.png'
      });
    }
  },

  completeFocus: async () => {
    const { settings, sessionId, sessionStats, intervalId } = get();
    if (intervalId) clearInterval(intervalId);

    const focusSeconds = settings.focus_minutes * 60;
    const newStats = {
      ...sessionStats,
      focus_total_seconds: sessionStats.focus_total_seconds + focusSeconds
    };

    await updateSession(sessionId, newStats);
    
    const rotationManager = new RotationManager(settings, newStats);
    const activity = rotationManager.getNextActivity();

    set({
      sessionStats: newStats,
      currentActivity: activity,
      currentExerciseIndex: 0,
      state: TIMER_STATES.IDLE
    });

    if ('Notification' in window && Notification.permission === 'granted') {
      const activityName = activity.type === 'block' 
        ? activity.block.name 
        : activity.exercise.name;
      
      new Notification('Pause Sport !', {
        body: `C'est l'heure de : ${activityName}`,
        icon: '/focusfit-pomodoro/pwa-192x192.png',
        tag: 'break-notification',
        requireInteraction: true
      });
    }

    if (settings.sound_enabled) {
      soundManager.playNotificationSound();
    }
    
    if (settings.vibration_enabled) {
      soundManager.vibrate([200, 100, 200]);
    }
  },

  startBreak: () => {
    const { settings, currentActivity } = get();
    
    const totalSeconds = currentActivity.type === 'block' 
      ? currentActivity.exercises[0].duration_seconds
      : settings.break_minutes * 60;
    
    const worker = initWorker();
    
    worker.onmessage = (e) => {
      const { type, remaining } = e.data;
      
      if (type === 'TICK') {
        set({ timeRemaining: remaining });
      } else if (type === 'COMPLETE') {
        get().nextExerciseOrComplete();
      }
    };
    
    worker.postMessage({ type: 'START', duration: totalSeconds });

    set({
      state: TIMER_STATES.BREAK,
      timeRemaining: totalSeconds,
      totalTime: totalSeconds
    });
  },

  nextExerciseOrComplete: () => {
    const { currentActivity, currentExerciseIndex } = get();
    
    if (currentActivity.type === 'block') {
      const nextIndex = currentExerciseIndex + 1;
      
      if (nextIndex < currentActivity.exercises.length) {
        const nextExercise = currentActivity.exercises[nextIndex];
        const totalSeconds = nextExercise.duration_seconds;
        
        const worker = initWorker();
        
        worker.onmessage = (e) => {
          const { type, remaining } = e.data;
          
          if (type === 'TICK') {
            set({ timeRemaining: remaining });
          } else if (type === 'COMPLETE') {
            get().nextExerciseOrComplete();
          }
        };
        
        worker.postMessage({ type: 'START', duration: totalSeconds });

        set({
          currentExerciseIndex: nextIndex,
          timeRemaining: totalSeconds,
          totalTime: totalSeconds
        });
        return;
      }
    }
    
    get().completeBreak();
  },

  completeBreak: async () => {
    const { settings, sessionId, sessionStats, currentActivity } = get();
    
    const worker = initWorker();
    worker.postMessage({ type: 'STOP' });

    const isAbs = currentActivity.category === 'abs';
    const breakSeconds = currentActivity.type === 'block'
      ? currentActivity.block.total_duration_seconds
      : settings.break_minutes * 60;

    console.log('🏋️ Completing break:', {
      currentActivity,
      breakSeconds,
      oldSportSeconds: sessionStats.sport_total_seconds,
      newSportSeconds: sessionStats.sport_total_seconds + breakSeconds
    });

    const newStats = {
      ...sessionStats,
      sport_total_seconds: sessionStats.sport_total_seconds + breakSeconds,
      breaks_done: sessionStats.breaks_done + 1,
      abs_breaks_done: isAbs ? sessionStats.abs_breaks_done + 1 : sessionStats.abs_breaks_done,
      cycles_completed: sessionStats.cycles_completed + 1
    };

    console.log('📊 New stats:', newStats);
    await updateSession(sessionId, newStats);
    await addCycleLog(sessionId, {
      activity_type: currentActivity.type,
      activity_category: currentActivity.category,
      completed: true,
      skipped: false
    });

    set({
      sessionStats: newStats,
      state: TIMER_STATES.IDLE,
      currentActivity: null,
      currentExerciseIndex: 0
    });

    if (settings.sound_enabled) {
      soundManager.playNotificationSound();
    }
    
    if (settings.vibration_enabled) {
      soundManager.vibrate([200, 100, 200, 100, 400]);
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Pause terminée !', {
        body: 'Retour au focus',
        icon: '/focusfit-pomodoro/pwa-192x192.png',
        vibrate: settings.vibration_enabled ? [200, 100, 200, 100, 400] : undefined,
        requireInteraction: true
      });
    }
  },

  skipBreak: async () => {
    const { sessionId, sessionStats, currentActivity } = get();
    
    const worker = initWorker();
    worker.postMessage({ type: 'STOP' });

    const newStats = {
      ...sessionStats,
      breaks_skipped: sessionStats.breaks_skipped + 1
    };

    await updateSession(sessionId, newStats);
    await addCycleLog(sessionId, {
      activity_type: currentActivity.type,
      activity_category: currentActivity.category,
      completed: false,
      skipped: true
    });

    set({
      sessionStats: newStats,
      state: TIMER_STATES.IDLE,
      currentActivity: null,
      currentExerciseIndex: 0
    });
  },

  changeActivity: () => {
    const { settings, sessionStats, currentActivity } = get();
    const rotationManager = new RotationManager(settings, sessionStats);
    const newActivity = rotationManager.changeActivity(currentActivity.category);
    
    set({
      currentActivity: newActivity,
      currentExerciseIndex: 0
    });
  },

  pause: () => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);
    set({ state: TIMER_STATES.PAUSED });
  },

  resume: () => {
    const { state, timeRemaining } = get();
    if (state !== TIMER_STATES.PAUSED) return;
    
    const previousState = timeRemaining > 300 ? TIMER_STATES.FOCUS : TIMER_STATES.BREAK;
    
    const id = setInterval(() => {
      const { timeRemaining, state } = get();
      if (state === TIMER_STATES.PAUSED) return;
      
      if (timeRemaining <= 1) {
        if (state === TIMER_STATES.FOCUS) {
          get().completeFocus();
        } else {
          get().nextExerciseOrComplete();
        }
      } else {
        set({ timeRemaining: timeRemaining - 1 });
      }
    }, 1000);

    set({ state: previousState, intervalId: id });
  },

  reset: () => {
    const { intervalId } = get();
    if (intervalId) clearInterval(intervalId);
    
    set({
      state: TIMER_STATES.IDLE,
      timeRemaining: 0,
      totalTime: 0,
      currentActivity: null,
      currentExerciseIndex: 0,
      intervalId: null
    });
  }
}));
