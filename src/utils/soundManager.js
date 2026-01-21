// Générateur de sons de notification
class SoundManager {
  constructor() {
    this.audioContext = null;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playBeep(frequency = 800, duration = 200) {
    this.init();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  playNotificationSound() {
    // Triple beep pour notification
    this.playBeep(800, 150);
    setTimeout(() => this.playBeep(800, 150), 200);
    setTimeout(() => this.playBeep(1000, 300), 400);
  }

  vibrate(pattern = [200, 100, 200]) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  playNotificationWithVibration() {
    this.playNotificationSound();
    this.vibrate([200, 100, 200, 100, 400]);
  }
}

export const soundManager = new SoundManager();
