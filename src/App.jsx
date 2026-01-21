import { useState, useEffect } from 'react';
import { Timer as TimerIcon, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { Timer } from './components/Timer';
import { BreakScreen } from './components/BreakScreen';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { useTimerStore } from './store/useTimerStore';
import { initializeSettings } from './db/database';

function App() {
  const [currentView, setCurrentView] = useState('timer');
  const { currentActivity, initialize } = useTimerStore();

  useEffect(() => {
    const init = async () => {
      const settings = await initializeSettings();
      await initialize(settings);
      
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    };
    
    init();
  }, [initialize]);

  const handleSettingsSave = async (newSettings) => {
    await initialize(newSettings);
    setCurrentView('timer');
  };

  return (
    <div className="min-h-screen pb-16">
      {currentActivity && currentView === 'timer' ? (
        <BreakScreen />
      ) : (
        <>
          {currentView === 'timer' && <Timer />}
          {currentView === 'stats' && <Stats />}
          {currentView === 'settings' && <Settings onSave={handleSettingsSave} />}
        </>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-md mx-auto flex justify-around items-center h-16">
          <NavButton
            icon={<TimerIcon className="w-6 h-6" />}
            label="Timer"
            active={currentView === 'timer'}
            onClick={() => setCurrentView('timer')}
          />
          <NavButton
            icon={<BarChart3 className="w-6 h-6" />}
            label="Stats"
            active={currentView === 'stats'}
            onClick={() => setCurrentView('stats')}
          />
          <NavButton
            icon={<SettingsIcon className="w-6 h-6" />}
            label="Réglages"
            active={currentView === 'settings'}
            onClick={() => setCurrentView('settings')}
          />
        </div>
      </nav>
    </div>
  );
}

const NavButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
      active
        ? 'text-indigo-600'
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export default App;
