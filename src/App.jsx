import { useState, useEffect } from 'react';
import { Timer as TimerIcon, BarChart3, Settings as SettingsIcon, Dumbbell } from 'lucide-react';
import { Timer } from './components/Timer';
import { BreakScreen } from './components/BreakScreen';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { Workouts } from './components/Workouts';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { useTimerStore } from './store/useTimerStore';
import { initializeSettings } from './db/database';
import { notificationManager } from './utils/notificationManager';
import { requestWakeLock, releaseWakeLock } from './utils/wakeLock';

function App() {
  const [currentView, setCurrentView] = useState('timer');
  const [activeWorkout, setActiveWorkout] = useState(null);
  const { currentActivity, initialize } = useTimerStore();

  useEffect(() => {
    const init = async () => {
      try {
        const settings = await initializeSettings();
        await initialize(settings);
      } catch (error) {
        console.warn('Database initialization failed:', error);
        // Continue without database if it fails
      }
    };
    
    init();
  }, [initialize]);

  useEffect(() => {
    // Activer le Wake Lock pour garder l'écran allumé
    requestWakeLock();

    // Gérer les notifications persistantes quand l'app passe en arrière-plan
    const handleVisibilityChange = () => {
      notificationManager.handleVisibilityChange(() => useTimerStore.getState());
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseWakeLock();
    };
  }, []);

  const handleSettingsSave = async (newSettings) => {
    await initialize(newSettings);
    setCurrentView('timer');
  };

  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout);
  };

  const handleExitWorkout = () => {
    setActiveWorkout(null);
  };

  return (
    <div className="min-h-screen">
      {activeWorkout ? (
        <WorkoutPlayer workout={activeWorkout} onExit={handleExitWorkout} />
      ) : currentActivity && currentView === 'timer' ? (
        <BreakScreen />
      ) : (
        <>
          {currentView === 'timer' && <Timer />}
          {currentView === 'stats' && <Stats />}
          {currentView === 'workouts' && <Workouts onStartWorkout={handleStartWorkout} />}
          {currentView === 'settings' && <Settings onSave={handleSettingsSave} />}
        </>
      )}

      {!activeWorkout && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-md mx-auto flex justify-around items-center h-16">
            <NavButton
              icon={<TimerIcon className="w-5 h-5" />}
              label="Timer"
              active={currentView === 'timer'}
              onClick={() => setCurrentView('timer')}
            />
            <NavButton
              icon={<BarChart3 className="w-5 h-5" />}
              label="Stats"
              active={currentView === 'stats'}
              onClick={() => setCurrentView('stats')}
            />
            <NavButton
              icon={<Dumbbell className="w-5 h-5" />}
              label="Workouts"
              active={currentView === 'workouts'}
              onClick={() => setCurrentView('workouts')}
            />
            <NavButton
              icon={<SettingsIcon className="w-5 h-5" />}
              label="Réglages"
              active={currentView === 'settings'}
              onClick={() => setCurrentView('settings')}
            />
          </div>
        </nav>
      )}
    </div>
  );
}

const NavButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 px-4 py-2 transition-all active:scale-95 ${
      active
        ? 'text-indigo-600'
        : 'text-gray-400 active:text-gray-600'
    }`}
  >
    <div className={`transition-transform ${active ? 'scale-110' : ''}`}>
      {icon}
    </div>
    <span className="text-xs font-semibold">{label}</span>
  </button>
);

export default App;
