// Service Worker pour les notifications en arrière-plan
const CACHE_NAME = 'focusfit-v1';

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(self.clients.claim());
});

// Écouter les messages depuis l'app principale
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TIMER_UPDATE') {
    const { state, timeRemaining, totalTime, settings } = event.data;
    
    // Afficher une notification persistante
    if (state === 'focus' || state === 'break') {
      showTimerNotification(state, timeRemaining, totalTime, settings);
    }
  }
  
  if (event.data && event.data.type === 'CYCLE_COMPLETE') {
    const { title, body, settings } = event.data;
    showCycleNotification(title, body, settings);
  }
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showTimerNotification(state, timeRemaining, totalTime, settings) {
  const isFocus = state === 'focus';
  const title = isFocus ? '🎯 Focus en cours' : '🏋️ Pause Sport';
  const progress = totalTime > 0 ? Math.round(((totalTime - timeRemaining) / totalTime) * 100) : 0;
  const progressBar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
  
  const body = `${formatTime(timeRemaining)} restant\n${progressBar} ${progress}%`;

  self.registration.showNotification(title, {
    body,
    icon: '/focusfit-pomodoro/pwa-192x192.png',
    badge: '/focusfit-pomodoro/pwa-192x192.png',
    tag: 'timer-notification',
    requireInteraction: false,
    silent: true,
    renotify: true,
    data: { type: 'timer' }
  });
}

function showCycleNotification(title, body, settings) {
  const vibrate = settings?.vibration_enabled ? [200, 100, 200, 100, 200] : undefined;
  const silent = !settings?.sound_enabled;

  self.registration.showNotification(title, {
    body,
    icon: '/focusfit-pomodoro/pwa-192x192.png',
    badge: '/focusfit-pomodoro/pwa-192x192.png',
    tag: 'cycle-notification',
    requireInteraction: true,
    vibrate,
    silent,
    data: { type: 'cycle' }
  });
}

// Gérer le clic sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Ouvrir ou focus l'app
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si l'app est déjà ouverte, la mettre au premier plan
      for (const client of clientList) {
        if (client.url.includes('/focusfit-pomodoro') && 'focus' in client) {
          return client.focus();
        }
      }
      // Sinon, ouvrir une nouvelle fenêtre
      if (self.clients.openWindow) {
        return self.clients.openWindow('/focusfit-pomodoro/');
      }
    })
  );
});
