import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Award, Calendar } from 'lucide-react';
import { getSessionStats } from '../db/database';

export const Stats = () => {
  const [stats, setStats] = useState([]);
  const [period, setPeriod] = useState(7);

  useEffect(() => {
    loadStats();
  }, [period]);

  const loadStats = async () => {
    const data = await getSessionStats(period);
    setStats(data);
  };

  const totalFocusMinutes = stats.reduce((sum, s) => sum + Math.floor(s.focus_total_seconds / 60), 0);
  const totalSportMinutes = stats.reduce((sum, s) => sum + Math.floor(s.sport_total_seconds / 60), 0);
  const totalBreaks = stats.reduce((sum, s) => sum + s.breaks_done, 0);
  const totalAbsBreaks = stats.reduce((sum, s) => sum + s.abs_breaks_done, 0);
  const avgFocusPerDay = stats.length > 0 ? Math.floor(totalFocusMinutes / stats.length) : 0;
  
  const streak = calculateStreak(stats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Statistiques</h1>
          </div>

          <div className="flex gap-2 mb-6">
            {[7, 14, 30].map((days) => (
              <button
                key={days}
                onClick={() => setPeriod(days)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  period === days
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {days}j
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
              icon={<span className="text-2xl">🔥</span>}
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

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Moyenne par jour</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-indigo-600">{avgFocusPerDay}</div>
                <div className="text-sm text-gray-600">min focus/jour</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">{totalSportMinutes}</div>
                <div className="text-sm text-gray-600">min sport total</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Historique</h2>
          <div className="space-y-3">
            {stats.slice(0, 10).reverse().map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div>
                  <div className="font-semibold text-gray-800">
                    {new Date(session.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {session.cycles_completed} cycles
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="text-right">
                    <div className="font-bold text-indigo-600">
                      {Math.floor(session.focus_total_seconds / 60)}m
                    </div>
                    <div className="text-gray-600">focus</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">
                      {session.breaks_done}
                    </div>
                    <div className="text-gray-600">pauses</div>
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
    <div className="bg-white border-2 border-gray-100 rounded-2xl p-4">
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

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
