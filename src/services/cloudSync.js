import { initSupabase } from './supabase';

const getUserId = () => {
  let userId = localStorage.getItem('focusfit_user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('focusfit_user_id', userId);
  }
  return userId;
};

export const syncSessionToCloud = async (sessionData) => {
  const client = initSupabase();
  if (!client) return;

  const userId = getUserId();
  const today = new Date().toISOString().split('T')[0];

  const { error } = await client
    .from('user_sessions')
    .upsert({
      user_id: userId,
      date: today,
      cycles_completed: sessionData.cycles_completed,
      focus_total_seconds: sessionData.focus_total_seconds,
      sport_total_seconds: sessionData.sport_total_seconds,
      breaks_done: sessionData.breaks_done,
      breaks_skipped: sessionData.breaks_skipped,
      abs_breaks_done: sessionData.abs_breaks_done,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,date'
    });

  if (error) {
    console.error('Error syncing to cloud:', error);
  }
};

export const loadSessionFromCloud = async (date) => {
  const client = initSupabase();
  if (!client) return null;

  const userId = getUserId();
  const dateStr = date || new Date().toISOString().split('T')[0];

  const { data, error } = await client
    .from('user_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('date', dateStr)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error loading from cloud:', error);
    return null;
  }

  return data;
};

export const loadRecentSessions = async (days = 30) => {
  const client = initSupabase();
  if (!client) return [];

  const userId = getUserId();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = startDate.toISOString().split('T')[0];

  const { data, error } = await client
    .from('user_sessions')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDateStr)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error loading recent sessions:', error);
    return [];
  }

  return data || [];
};

export const getUserIdForSharing = () => {
  return getUserId();
};

export const importUserData = (sharedUserId) => {
  if (sharedUserId && sharedUserId.startsWith('user_')) {
    localStorage.setItem('focusfit_user_id', sharedUserId);
    window.location.reload();
  }
};
