import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Bell } from 'lucide-react';
import { getSettings, updateSettings } from '../db/database';
import { UserIdDisplay } from './UserIdDisplay';

export const Settings = ({ onSave }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await getSettings();
    setSettings(data);
  };

  const handleSave = async () => {
    await updateSettings(settings);
    if (onSave) onSave(settings);
    
    if (settings.notifications_enabled && 'Notification' in window) {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          new Notification('FocusFit Pomodoro', {
            body: 'Notifications activées ! Tu seras averti à la fin de chaque session.',
            icon: '/focusfit-pomodoro/pwa-192x192.png'
          });
        }
      }
    }
  };

  if (!settings) return null;

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden">
      <div className="h-full p-4 pb-32 space-y-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-2">
          <SettingsIcon className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-800">Paramètres</h1>
        </div>

        <UserIdDisplay />

        <div className="space-y-4">
            <Section title="⏱️ Durées">
              <InputField
                label="Focus (minutes)"
                type="number"
                value={settings.focus_minutes}
                onChange={(v) => setSettings({ ...settings, focus_minutes: parseInt(v) })}
                min={1}
                max={60}
              />
              <InputField
                label="Pause (minutes)"
                type="number"
                value={settings.break_minutes}
                onChange={(v) => setSettings({ ...settings, break_minutes: parseInt(v) })}
                min={1}
                max={15}
              />
            </Section>

            <Section title="🕐 Horaires de travail">
              <InputField
                label="Début"
                type="time"
                value={settings.work_start}
                onChange={(v) => setSettings({ ...settings, work_start: v })}
              />
              <InputField
                label="Fin"
                type="time"
                value={settings.work_end}
                onChange={(v) => setSettings({ ...settings, work_end: v })}
              />
            </Section>

            <Section title="🏋️ Matériel disponible">
              <CheckboxField
                label="Vélo d'appartement"
                checked={settings.equipment.bike}
                onChange={(checked) => setSettings({
                  ...settings,
                  equipment: { ...settings.equipment, bike: checked }
                })}
              />
              <CheckboxField
                label="Haltères"
                checked={settings.equipment.dumbbell}
                onChange={(checked) => setSettings({
                  ...settings,
                  equipment: { ...settings.equipment, dumbbell: checked }
                })}
              />
            </Section>

            <Section title="🔔 Notifications">
              <CheckboxField
                label="Activer les notifications"
                checked={settings.notifications_enabled}
                onChange={(checked) => setSettings({ ...settings, notifications_enabled: checked })}
              />
              <CheckboxField
                label="Son"
                checked={settings.sound_enabled}
                onChange={(checked) => setSettings({ ...settings, sound_enabled: checked })}
              />
              <CheckboxField
                label="Vibration"
                checked={settings.vibration_enabled}
                onChange={(checked) => setSettings({ ...settings, vibration_enabled: checked })}
              />
            </Section>
          </div>

        <button
          onClick={handleSave}
          className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all shadow-lg"
        >
          <Save className="w-5 h-5" />
          Enregistrer
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-4 shadow-md">
    <h2 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">{title}</h2>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const InputField = ({ label, type, value, onChange, min, max }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      max={max}
      className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-base"
    />
  </div>
);

const CheckboxField = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer group py-1">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={`w-5 h-5 rounded-md border-2 transition-all ${
        checked
          ? 'bg-indigo-600 border-indigo-600'
          : 'bg-white border-gray-300 group-hover:border-indigo-400'
      }`}>
        {checked && (
          <svg className="w-full h-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
    <span className="text-gray-700 font-medium text-sm">{label}</span>
  </label>
);
