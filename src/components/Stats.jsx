import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Award, Calendar, Flame, Target, Clock, Zap, ChevronLeft } from 'lucide-react';
import { getSessionStats } from '../db/database';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BadgesAndObjectives } from './BadgesAndObjectives';

const COLORS = ['#6366f1', '#34c759', '#ff9500', '#ff3b30', '#007aff'];

export const Stats = () => {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState(7);
  const [view, setView] = useState('overview'); // 'overview', 'charts', 'analysis'

  useEffect(() => {
    loadStats();
  }, [period]);

  const loadStats = async () => {
    const data = await getSessionStats(period);
    setStats(data);
  };

  // Calculs de base
  const totalFocusMinutes = stats.reduce((sum, s) => sum + Math.floor(s.focus_total_seconds / 60), 0);
  const totalSportMinutes = stats.reduce((sum, s) => sum + Math.floor(s.sport_total_seconds / 60), 0);
  const totalBreaks = stats.reduce((sum, s) => sum + s.breaks_done, 0);
  const totalAbsBreaks = stats.reduce((sum, s) => sum + s.abs_breaks_done, 0);
  const totalCycles = stats.reduce((sum, s) => sum + s.cycles_completed, 0);
  const avgFocusPerDay = stats.length > 0 ? Math.floor(totalFocusMinutes / stats.length) : 0;
  const avgCyclesPerDay = stats.length > 0 ? (totalCycles / stats.length).toFixed(1) : 0;
  
  const streak = calculateStreak(stats);
  const bestDay = findBestDay(stats);
  const consistency = calculateConsistency(stats);

  // Données pour les graphiques
  const chartData = prepareChartData(stats);
  const weekdayData = prepareWeekdayData(stats);
  const progressData = prepareProgressData(stats);

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      <div className="h-full p-4 pb-20 space-y-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-800">Statistiques</h1>
          </div>
          {view !== 'overview' && (
            <button
              onClick={() => setView('overview')}
              className="p-2 rounded-lg bg-white shadow-sm active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Period selector */}
        <div className="flex gap-2">
          {[7, 14, 30].map((days) => (
            <button
              key={days}
              onClick={() => setPeriod(days)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all active:scale-95 ${
                period === days
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {days}j
            </button>
          ))}
        </div>

        {view === 'overview' && (
          <>
            {/* Main Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={<TrendingUp className="w-6 h-6" />}
                value={totalFocusMinutes}
                label="min focus"
                color="indigo"
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                value={totalBreaks}
                label="pauses sport"
                color="emerald"
              />
              <StatCard
                icon={<Flame className="w-6 h-6" />}
                value={totalAbsBreaks}
                label="pauses abdos"
                color="purple"
              />
              <StatCard
                icon={<Calendar className="w-6 h-6" />}
                value={streak}
                label="jours streak"
                color="amber"
              />
            </div>

            {/* Quick Insights */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Aperçu</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">{avgFocusPerDay}</div>
                  <div className="text-xs text-gray-500">min focus/jour</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">{avgCyclesPerDay}</div>
                  <div className="text-xs text-gray-500">cycles/jour</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{consistency}%</div>
                  <div className="text-xs text-gray-500">régularité</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">{totalCycles}</div>
                  <div className="text-xs text-gray-500">cycles total</div>
                </div>
              </div>
            </div>

            {/* Mini Chart Preview */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Progression</h3>
                <button
                  onClick={() => setView('charts')}
                  className="text-xs text-indigo-600 font-semibold active:scale-95 transition-transform"
                >
                  Voir plus →
                </button>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={chartData}>
                  <Line type="monotone" dataKey="focus" stroke="#6366f1" strokeWidth={2} dot={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Best Performance */}
            {bestDay && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 shadow-md border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-amber-600" />
                  <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wide">Meilleur jour</h3>
                </div>
                <div className="text-lg font-bold text-amber-900">
                  {new Date(bestDay.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
                <div className="text-sm text-amber-700 mt-1">
                  {Math.floor(bestDay.focus_total_seconds / 60)} min focus • {bestDay.cycles_completed} cycles
                </div>
              </div>
            )}

            {/* Badges and Objectives */}
            <BadgesAndObjectives stats={stats} />

            {/* View Analysis Button */}
            <button
              onClick={() => setView('analysis')}
              className="w-full bg-white rounded-2xl p-4 shadow-md active:scale-95 transition-transform"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800">Analyse détaillée</div>
                    <div className="text-xs text-gray-500">Tendances et insights</div>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </div>
            </button>
          </>
        )}

        {view === 'charts' && (
          <>
            {/* Activity Chart */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Activité quotidienne</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="focus" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Cycles Progress */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Évolution des cycles</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cycles" stroke="#34c759" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Weekday Distribution */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Par jour de la semaine</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weekdayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="avgFocus" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {view === 'analysis' && (
          <>
            {/* Consistency Score */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Score de régularité</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-4xl font-bold text-indigo-600">{consistency}%</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {consistency >= 80 ? '🔥 Excellent !' : consistency >= 60 ? '👍 Bien !' : '💪 Continue !'}
                  </div>
                </div>
                <div className="w-24 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { value: consistency },
                          { value: 100 - consistency }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        <Cell fill="#6366f1" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Time Analysis */}
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Temps total</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-600">Focus</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-600">{totalFocusMinutes} min</div>
                    <div className="text-xs text-gray-500">{(totalFocusMinutes / 60).toFixed(1)}h</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-gray-600">Sport</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">{totalSportMinutes} min</div>
                    <div className="text-xs text-gray-500">{(totalSportMinutes / 60).toFixed(1)}h</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Total</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">{totalFocusMinutes + totalSportMinutes} min</div>
                    <div className="text-xs text-gray-500">{((totalFocusMinutes + totalSportMinutes) / 60).toFixed(1)}h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 shadow-md border border-indigo-200">
              <h3 className="text-sm font-bold text-indigo-800 mb-3 uppercase tracking-wide">💡 Insights</h3>
              <div className="space-y-2 text-sm text-indigo-900">
                {streak > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500">🔥</span>
                    <span>Tu es sur une série de {streak} jour{streak > 1 ? 's' : ''} !</span>
                  </div>
                )}
                {avgFocusPerDay >= 60 && (
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✅</span>
                    <span>Excellent ! Tu maintiens +1h de focus par jour</span>
                  </div>
                )}
                {totalBreaks > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500">💪</span>
                    <span>{totalBreaks} pauses sport complétées sur {period} jours</span>
                  </div>
                )}
                {consistency >= 80 && (
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500">⭐</span>
                    <span>Ta régularité est exceptionnelle !</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* History (always visible) */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h2 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Historique</h2>
          <div className="space-y-2">
            {stats.slice(0, 10).reverse().map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 truncate">
                    {new Date(session.date).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {session.cycles_completed} cycles
                  </div>
                </div>
                <div className="flex gap-3 text-xs">
                  <div className="text-right">
                    <div className="font-bold text-indigo-600">
                      {Math.floor(session.focus_total_seconds / 60)}m
                    </div>
                    <div className="text-gray-500">focus</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">
                      {session.breaks_done}
                    </div>
                    <div className="text-gray-500">pauses</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label, color }) => {
  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600'
  };

  return (
    <div className="bg-white rounded-2xl p-3 shadow-md">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-0.5">{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  );
};

// Helper functions
const calculateStreak = (stats) => {
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
};

const findBestDay = (stats) => {
  if (stats.length === 0) return null;
  return stats.reduce((best, current) => 
    current.focus_total_seconds > (best?.focus_total_seconds || 0) ? current : best
  , null);
};

const calculateConsistency = (stats) => {
  if (stats.length === 0) return 0;
  const activeDays = stats.filter(s => s.cycles_completed > 0).length;
  return Math.round((activeDays / stats.length) * 100);
};

const prepareChartData = (stats) => {
  return stats.slice(-14).map(s => ({
    day: new Date(s.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    focus: Math.floor(s.focus_total_seconds / 60),
    cycles: s.cycles_completed
  }));
};

const prepareProgressData = (stats) => {
  return stats.slice(-14).map(s => ({
    day: new Date(s.date).toLocaleDateString('fr-FR', { day: 'numeric' }),
    cycles: s.cycles_completed
  }));
};

const prepareWeekdayData = (stats) => {
  const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const weekdayStats = Array(7).fill(0).map(() => ({ total: 0, count: 0 }));
  
  stats.forEach(s => {
    const day = new Date(s.date).getDay();
    const adjustedDay = day === 0 ? 6 : day - 1; // Adjust so Monday = 0
    weekdayStats[adjustedDay].total += Math.floor(s.focus_total_seconds / 60);
    weekdayStats[adjustedDay].count++;
  });
  
  return weekdays.map((day, i) => ({
    day,
    avgFocus: weekdayStats[i].count > 0 ? Math.round(weekdayStats[i].total / weekdayStats[i].count) : 0
  }));
};
