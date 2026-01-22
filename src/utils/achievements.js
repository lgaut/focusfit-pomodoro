// Système de badges et objectifs

export const BADGES = {
  // Badges de streak
  STREAK_3: {
    id: 'streak_3',
    name: 'Débutant motivé',
    description: '3 jours consécutifs',
    icon: 'Flame',
    color: 'from-orange-400 to-red-500',
    requirement: (stats) => calculateStreak(stats) >= 3
  },
  STREAK_7: {
    id: 'streak_7',
    name: 'Une semaine !',
    description: '7 jours consécutifs',
    icon: 'Rocket',
    color: 'from-blue-400 to-indigo-500',
    requirement: (stats) => calculateStreak(stats) >= 7
  },
  STREAK_30: {
    id: 'streak_30',
    name: 'Champion du mois',
    description: '30 jours consécutifs',
    icon: 'Crown',
    color: 'from-yellow-400 to-amber-500',
    requirement: (stats) => calculateStreak(stats) >= 30
  },

  // Badges de focus
  FOCUS_10H: {
    id: 'focus_10h',
    name: 'Concentré',
    description: '10h de focus total',
    icon: 'Target',
    color: 'from-indigo-400 to-purple-500',
    requirement: (stats) => {
      const totalMinutes = stats.reduce((sum, s) => sum + Math.floor(s.focus_total_seconds / 60), 0);
      return totalMinutes >= 600;
    }
  },
  FOCUS_50H: {
    id: 'focus_50h',
    name: 'Maître du focus',
    description: '50h de focus total',
    icon: 'Brain',
    color: 'from-purple-400 to-pink-500',
    requirement: (stats) => {
      const totalMinutes = stats.reduce((sum, s) => sum + Math.floor(s.focus_total_seconds / 60), 0);
      return totalMinutes >= 3000;
    }
  },
  FOCUS_100H: {
    id: 'focus_100h',
    name: 'Légende du focus',
    description: '100h de focus total',
    icon: 'Zap',
    color: 'from-yellow-400 to-orange-500',
    requirement: (stats) => {
      const totalMinutes = stats.reduce((sum, s) => sum + Math.floor(s.focus_total_seconds / 60), 0);
      return totalMinutes >= 6000;
    }
  },

  // Badges de sport
  SPORT_50: {
    id: 'sport_50',
    name: 'Sportif actif',
    description: '50 pauses sport',
    icon: 'Dumbbell',
    color: 'from-green-400 to-emerald-500',
    requirement: (stats) => {
      const totalBreaks = stats.reduce((sum, s) => sum + s.breaks_done, 0);
      return totalBreaks >= 50;
    }
  },
  SPORT_200: {
    id: 'sport_200',
    name: 'Athlète confirmé',
    description: '200 pauses sport',
    icon: 'Award',
    color: 'from-emerald-400 to-teal-500',
    requirement: (stats) => {
      const totalBreaks = stats.reduce((sum, s) => sum + s.breaks_done, 0);
      return totalBreaks >= 200;
    }
  },
  SPORT_500: {
    id: 'sport_500',
    name: 'Machine de guerre',
    description: '500 pauses sport',
    icon: 'Trophy',
    color: 'from-teal-400 to-cyan-500',
    requirement: (stats) => {
      const totalBreaks = stats.reduce((sum, s) => sum + s.breaks_done, 0);
      return totalBreaks >= 500;
    }
  },

  // Badges de cycles
  CYCLES_100: {
    id: 'cycles_100',
    name: 'Centurion',
    description: '100 cycles complétés',
    icon: 'CircleDot',
    color: 'from-pink-400 to-rose-500',
    requirement: (stats) => {
      const totalCycles = stats.reduce((sum, s) => sum + s.cycles_completed, 0);
      return totalCycles >= 100;
    }
  },
  CYCLES_500: {
    id: 'cycles_500',
    name: 'Marathonien',
    description: '500 cycles complétés',
    icon: 'Activity',
    color: 'from-rose-400 to-red-500',
    requirement: (stats) => {
      const totalCycles = stats.reduce((sum, s) => sum + s.cycles_completed, 0);
      return totalCycles >= 500;
    }
  },

  // Badges spéciaux
  PERFECT_DAY: {
    id: 'perfect_day',
    name: 'Journée parfaite',
    description: '5+ cycles en un jour',
    icon: 'Star',
    color: 'from-yellow-400 to-amber-500',
    requirement: (stats) => {
      return stats.some(s => s.cycles_completed >= 5);
    }
  },
  EARLY_BIRD: {
    id: 'early_bird',
    name: 'Lève-tôt',
    description: 'Session avant 7h',
    icon: 'Sunrise',
    color: 'from-orange-400 to-yellow-500',
    requirement: () => {
      const now = new Date();
      return now.getHours() < 7;
    }
  },
  NIGHT_OWL: {
    id: 'night_owl',
    name: 'Oiseau de nuit',
    description: 'Session après 22h',
    icon: 'Moon',
    color: 'from-indigo-400 to-purple-500',
    requirement: () => {
      const now = new Date();
      return now.getHours() >= 22;
    }
  }
};

export const OBJECTIVES = {
  DAILY: {
    id: 'daily',
    name: 'Objectif quotidien',
    description: 'Complète 3 cycles aujourd\'hui',
    icon: 'Calendar',
    target: 3,
    type: 'cycles',
    period: 'day',
    color: 'from-blue-400 to-indigo-500'
  },
  WEEKLY_CYCLES: {
    id: 'weekly_cycles',
    name: 'Objectif hebdomadaire',
    description: 'Complète 15 cycles cette semaine',
    icon: 'BarChart3',
    target: 15,
    type: 'cycles',
    period: 'week',
    color: 'from-purple-400 to-pink-500'
  },
  WEEKLY_FOCUS: {
    id: 'weekly_focus',
    name: 'Focus de la semaine',
    description: '5h de focus cette semaine',
    icon: 'Target',
    target: 300, // minutes
    type: 'focus',
    period: 'week',
    color: 'from-indigo-400 to-purple-500'
  },
  WEEKLY_SPORT: {
    id: 'weekly_sport',
    name: 'Sport de la semaine',
    description: '10 pauses sport cette semaine',
    icon: 'Dumbbell',
    target: 10,
    type: 'sport',
    period: 'week',
    color: 'from-green-400 to-emerald-500'
  }
};

// Helper function to calculate streak
function calculateStreak(stats) {
  if (stats.length === 0) return 0;
  
  const sortedStats = [...stats].sort((a, b) => new Date(b.date) - new Date(a.date));
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const session of sortedStats) {
    const sessionDate = new Date(session.date);
    sessionDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((currentDate - sessionDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak && session.cycles_completed > 0) {
      streak++;
    } else if (diffDays > streak) {
      break;
    }
  }
  
  return streak;
}

// Check which badges are unlocked
export function getUnlockedBadges(stats) {
  const unlocked = [];
  
  Object.values(BADGES).forEach(badge => {
    if (badge.requirement(stats)) {
      unlocked.push(badge);
    }
  });
  
  return unlocked;
}

// Get next badges to unlock
export function getNextBadges(stats) {
  const locked = [];
  
  Object.values(BADGES).forEach(badge => {
    if (!badge.requirement(stats)) {
      locked.push(badge);
    }
  });
  
  // Sort by "closeness" to unlock (approximation)
  return locked.slice(0, 3);
}

// Calculate objective progress
export function getObjectiveProgress(objective, stats) {
  const now = new Date();
  let relevantStats = stats;

  // Filter by period
  if (objective.period === 'day') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    relevantStats = stats.filter(s => {
      const sessionDate = new Date(s.date);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === today.getTime();
    });
  } else if (objective.period === 'week') {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    relevantStats = stats.filter(s => new Date(s.date) >= weekStart);
  }

  // Calculate current value
  let current = 0;
  if (objective.type === 'cycles') {
    current = relevantStats.reduce((sum, s) => sum + s.cycles_completed, 0);
  } else if (objective.type === 'focus') {
    current = relevantStats.reduce((sum, s) => sum + Math.floor(s.focus_total_seconds / 60), 0);
  } else if (objective.type === 'sport') {
    current = relevantStats.reduce((sum, s) => sum + s.breaks_done, 0);
  }

  return {
    current,
    target: objective.target,
    percentage: Math.min(100, Math.round((current / objective.target) * 100)),
    completed: current >= objective.target
  };
}

// Get all objectives with progress
export function getAllObjectivesProgress(stats) {
  return Object.values(OBJECTIVES).map(objective => ({
    ...objective,
    progress: getObjectiveProgress(objective, stats)
  }));
}
