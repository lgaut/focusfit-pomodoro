// Wake Lock API pour empêcher l'écran de se mettre en veille
let wakeLock = null;
let shouldKeepAwake = false;

const reacquireWakeLock = async () => {
  if (!shouldKeepAwake || !('wakeLock' in navigator)) {
    return;
  }

  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('✅ Wake Lock activé - écran restera allumé');

    // Réactiver automatiquement le wake lock s'il est relâché (appel, etc.)
    wakeLock.addEventListener('release', () => {
      console.log('⚠️ Wake Lock relâché - tentative de réactivation...');
      wakeLock = null;
      
      // Réactiver après un court délai si on est toujours visible
      if (document.visibilityState === 'visible' && shouldKeepAwake) {
        setTimeout(() => reacquireWakeLock(), 100);
      }
    });

    return true;
  } catch (err) {
    console.error('❌ Erreur Wake Lock:', err);
    return false;
  }
};

export const requestWakeLock = async () => {
  shouldKeepAwake = true;
  return await reacquireWakeLock();
};

export const releaseWakeLock = async () => {
  shouldKeepAwake = false;
  
  if (wakeLock !== null) {
    try {
      await wakeLock.release();
      wakeLock = null;
      console.log('🔓 Wake Lock désactivé');
    } catch (err) {
      console.error('❌ Erreur release Wake Lock:', err);
    }
  }
};

// Réactiver automatiquement le wake lock quand la page redevient visible
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && shouldKeepAwake) {
    console.log('👁️ Page visible - réactivation du Wake Lock');
    await reacquireWakeLock();
  }
});
