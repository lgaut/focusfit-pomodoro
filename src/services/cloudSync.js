const SUPABASE_URL = 'https://qgwevhsqxeqzdsehvjmt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnd2V2aHNxeGVxemRzZWh2am10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODcxMzcsImV4cCI6MjA4NDU2MzEzN30.w209_n32wRB4NK8u_oRoRbW4ATVwWOgE1wHd06G61vY';

const getUserId = () => {
  let userId = localStorage.getItem('focusfit_user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('focusfit_user_id', userId);
  }
  return userId;
};

export const syncSessionToCloud = async (sessionData) => {
  const userId = getUserId();
  const today = new Date().toISOString().split('T')[0];

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/user_sessions`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        user_id: userId,
        date: today,
        cycles_completed: sessionData.cycles_completed,
        focus_total_seconds: sessionData.focus_total_seconds,
        sport_total_seconds: sessionData.sport_total_seconds,
        breaks_done: sessionData.breaks_done,
        breaks_skipped: sessionData.breaks_skipped,
        abs_breaks_done: sessionData.abs_breaks_done,
        updated_at: new Date().toISOString()
      })
    });

    if (!response.ok) {
      console.warn('Supabase sync failed. Data saved locally only.');
    }
  } catch (err) {
    console.warn('Supabase sync disabled. Using local storage only.');
  }
};

export const loadSessionFromCloud = async (date) => {
  const userId = getUserId();
  const dateStr = date || new Date().toISOString().split('T')[0];

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/user_sessions?user_id=eq.${userId}&date=eq.${dateStr}&select=*`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      console.warn('Supabase not configured. Using local storage only.');
      return null;
    }

    const data = await response.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (err) {
    console.warn('Supabase sync disabled. Using local storage only.');
    return null;
  }
};

export const loadRecentSessions = async (days = 30) => {
  const userId = getUserId();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = startDate.toISOString().split('T')[0];

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/user_sessions?user_id=eq.${userId}&date=gte.${startDateStr}&select=*&order=date.desc`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      console.warn('Supabase not configured. Using local storage only.');
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (err) {
    console.warn('Supabase sync disabled. Using local storage only.');
    return [];
  }
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
