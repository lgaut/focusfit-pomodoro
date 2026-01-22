import Dexie from 'dexie';
import { syncSessionToCloud, loadSessionFromCloud } from '../services/cloudSync';

export const db = new Dexie('FocusFitDB');

db.version(1).stores({
  settings: 'id',
  sessions: '++id, date',
  cycleLogs: '++id, sessionId, date'
});

export const defaultSettings = {
  id: 'main',
  focus_minutes: 30,
  break_minutes: 5,
  work_start: '08:00',
  work_end: '17:30',
  equipment: {
    bike: true,
    dumbbell: true
  },
  program: 'program_abs_tablettes',
  rotation: 'rotation_basic',
  notifications_enabled: true,
  sound_enabled: true,
  vibration_enabled: true
};

export const initializeSettings = async () => {
  try {
    const existing = await db.settings.get('main');
    if (!existing) {
      await db.settings.add(defaultSettings);
    }
    return existing || defaultSettings;
  } catch (error) {
    console.warn('Database error, using default settings:', error);
    return defaultSettings;
  }
};

export const getSettings = async () => {
  return await db.settings.get('main') || defaultSettings;
};

export const updateSettings = async (updates) => {
  await db.settings.update('main', updates);
};

export const getTodaySession = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  const cloudSession = await loadSessionFromCloud(today);
  if (cloudSession) {
    const localSessions = await db.sessions.where('date').equals(today).toArray();
    if (localSessions.length > 0) {
      await db.sessions.update(localSessions[0].id, {
        cycles_completed: cloudSession.cycles_completed,
        focus_total_seconds: cloudSession.focus_total_seconds,
        sport_total_seconds: cloudSession.sport_total_seconds,
        breaks_done: cloudSession.breaks_done,
        breaks_skipped: cloudSession.breaks_skipped,
        abs_breaks_done: cloudSession.abs_breaks_done
      });
      return localSessions[0];
    } else {
      const id = await db.sessions.add({
        date: today,
        cycles_completed: cloudSession.cycles_completed,
        focus_total_seconds: cloudSession.focus_total_seconds,
        sport_total_seconds: cloudSession.sport_total_seconds,
        breaks_done: cloudSession.breaks_done,
        breaks_skipped: cloudSession.breaks_skipped,
        abs_breaks_done: cloudSession.abs_breaks_done
      });
      return await db.sessions.get(id);
    }
  }
  
  const sessions = await db.sessions.where('date').equals(today).toArray();
  return sessions[0] || null;
};

export const createSession = async () => {
  const today = new Date().toISOString().split('T')[0];
  const id = await db.sessions.add({
    date: today,
    cycles_completed: 0,
    focus_total_seconds: 0,
    sport_total_seconds: 0,
    breaks_done: 0,
    breaks_skipped: 0,
    abs_breaks_done: 0
  });
  return id;
};

export const updateSession = async (id, updates) => {
  console.log('💾 Updating session:', id, updates);
  await db.sessions.update(id, updates);
  
  const session = await db.sessions.get(id);
  console.log('📤 Syncing to cloud:', session);
  if (session) {
    await syncSessionToCloud(session);
  }
};

export const addCycleLog = async (sessionId, cycleData) => {
  await db.cycleLogs.add({
    sessionId,
    date: new Date().toISOString(),
    ...cycleData
  });
};

export const getSessionStats = async (days = 7) => {
  const { loadRecentSessions } = await import('../services/cloudSync');
  const cloudSessions = await loadRecentSessions(days);
  
  if (cloudSessions && cloudSessions.length > 0) {
    return cloudSessions.map(s => ({
      id: s.id,
      date: s.date,
      cycles_completed: s.cycles_completed,
      focus_total_seconds: s.focus_total_seconds,
      sport_total_seconds: s.sport_total_seconds,
      breaks_done: s.breaks_done,
      breaks_skipped: s.breaks_skipped,
      abs_breaks_done: s.abs_breaks_done
    }));
  }
  
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = startDate.toISOString().split('T')[0];
  
  return await db.sessions
    .where('date')
    .aboveOrEqual(startDateStr)
    .toArray();
};
