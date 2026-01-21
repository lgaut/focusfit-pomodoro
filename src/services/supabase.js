import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgwevhsqxeqzdsehvjmt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnd2V2aHNxeGVxemRzZWh2am10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODcxMzcsImV4cCI6MjA4NDU2MzEzN30.w209_n32wRB4NK8u_oRoRbW4ATVwWOgE1wHd06G61vY';

let supabase = null;

export const initSupabase = () => {
  if (!supabase && supabaseUrl !== 'VOTRE_SUPABASE_URL') {
    supabase = createClient(supabaseUrl, supabaseKey, {
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    });
  }
  return supabase;
};

export const generateSessionCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const createSession = async (sessionCode, initialState) => {
  const client = initSupabase();
  if (!client) return sessionCode;

  const { error } = await client
    .from('sessions')
    .insert([
      {
        code: sessionCode,
        state: initialState.state,
        time_remaining: initialState.timeRemaining,
        total_time: initialState.totalTime,
        current_cycle: initialState.currentCycle,
        current_activity: initialState.currentActivity,
        current_exercise_index: initialState.currentExerciseIndex,
        session_stats: initialState.sessionStats
      }
    ]);

  if (error) console.error('Error creating session:', error);
  return sessionCode;
};

export const joinSession = (sessionCode, onUpdate) => {
  const client = initSupabase();
  if (!client) return () => {};

  const channel = client
    .channel(`session:${sessionCode}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'sessions',
        filter: `code=eq.${sessionCode}`
      },
      (payload) => {
        if (payload.new && onUpdate) {
          const mappedData = {
            state: payload.new.state,
            timeRemaining: payload.new.time_remaining,
            totalTime: payload.new.total_time,
            currentCycle: payload.new.current_cycle,
            currentActivity: payload.new.current_activity,
            currentExerciseIndex: payload.new.current_exercise_index,
            sessionStats: payload.new.session_stats
          };
          onUpdate(mappedData);
        }
      }
    )
    .subscribe();

  const fetchInitial = async () => {
    const { data } = await client
      .from('sessions')
      .select('*')
      .eq('code', sessionCode)
      .single();
    
    if (data && onUpdate) {
      const mappedData = {
        state: data.state,
        timeRemaining: data.time_remaining,
        totalTime: data.total_time,
        currentCycle: data.current_cycle,
        currentActivity: data.current_activity,
        currentExerciseIndex: data.current_exercise_index,
        sessionStats: data.session_stats
      };
      onUpdate(mappedData);
    }
  };

  fetchInitial();

  return () => {
    client.removeChannel(channel);
  };
};

export const updateSession = async (sessionCode, updates) => {
  const client = initSupabase();
  if (!client) return;

  const { error } = await client
    .from('sessions')
    .update({
      state: updates.state,
      time_remaining: updates.time_remaining,
      total_time: updates.total_time,
      current_cycle: updates.current_cycle,
      current_activity: updates.current_activity,
      current_exercise_index: updates.current_exercise_index,
      session_stats: updates.session_stats,
      last_update: new Date().toISOString()
    })
    .eq('code', sessionCode);

  if (error) console.error('Error updating session:', error);
};

export const syncTimerState = async (sessionCode, timerState) => {
  await updateSession(sessionCode, {
    state: timerState.state,
    time_remaining: timerState.timeRemaining,
    total_time: timerState.totalTime,
    current_cycle: timerState.currentCycle,
    current_activity: timerState.currentActivity,
    current_exercise_index: timerState.currentExerciseIndex,
    session_stats: timerState.sessionStats
  });
};
