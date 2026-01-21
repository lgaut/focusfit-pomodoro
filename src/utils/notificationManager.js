// Gestionnaire de notifications persistantes avec timer
class NotificationManager {
  constructor() {
    this.currentNotification = null;
    this.notificationInterval = null;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  async showTimerNotification(state, timeRemaining, totalTime) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    // Fermer la notification précédente
    if (this.currentNotification) {
      this.currentNotification.close();
    }

    const isFocus = state === 'focus';
    const title = isFocus ? '🎯 Focus en cours' : '🏋️ Pause Sport';
    const progress = totalTime > 0 ? Math.round(((totalTime - timeRemaining) / totalTime) * 100) : 0;
    const progressBar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
    
    const body = `${this.formatTime(timeRemaining)} restant\n${progressBar} ${progress}%`;

    try {
      this.currentNotification = new Notification(title, {
        body,
        icon: '/focusfit-pomodoro/pwa-192x192.png',
        tag: 'timer-notification',
        requireInteraction: false,
        silent: true,
        renotify: true
      });

      // Gérer le clic sur la notification pour revenir à l'app
      this.currentNotification.onclick = () => {
        window.focus();
        this.currentNotification.close();
      };
    } catch (error) {
      console.warn('Erreur lors de la création de la notification:', error);
    }
  }

  startTimerNotifications(getState) {
    // Nettoyer l'intervalle précédent
    this.stopTimerNotifications();

    // Mettre à jour la notification toutes les 5 secondes pour économiser la batterie
    this.notificationInterval = setInterval(() => {
      const { state, timeRemaining, totalTime } = getState();
      
      // Afficher la notification seulement si l'app est en arrière-plan
      if (document.hidden && (state === 'focus' || state === 'break')) {
        this.showTimerNotification(state, timeRemaining, totalTime);
      }
    }, 5000);

    // Afficher immédiatement si l'app est en arrière-plan
    const { state, timeRemaining, totalTime } = getState();
    if (document.hidden && (state === 'focus' || state === 'break')) {
      this.showTimerNotification(state, timeRemaining, totalTime);
    }
  }

  stopTimerNotifications() {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
      this.notificationInterval = null;
    }

    if (this.currentNotification) {
      this.currentNotification.close();
      this.currentNotification = null;
    }
  }

  handleVisibilityChange(getState) {
    if (document.hidden) {
      // L'app passe en arrière-plan, démarrer les notifications
      this.startTimerNotifications(getState);
    } else {
      // L'app revient au premier plan, arrêter les notifications
      this.stopTimerNotifications();
    }
  }
}

export const notificationManager = new NotificationManager();
