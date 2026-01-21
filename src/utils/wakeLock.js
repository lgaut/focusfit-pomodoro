// Wake Lock API pour empêcher l'écran de se mettre en veille
let wakeLock = null;

export const requestWakeLock = async () => {
  if (!('wakeLock' in navigator)) {
    console.log('Wake Lock API non supportée');
    return false;
  }

  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock activé - écran restera allumé');

    // Réactiver le wake lock si l'écran est déverrouillé
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock relâché');
    });

    return true;
  } catch (err) {
    console.error('Erreur Wake Lock:', err);
    return false;
  }
};

export const releaseWakeLock = async () => {
  if (wakeLock !== null) {
    try {
      await wakeLock.release();
      wakeLock = null;
      console.log('Wake Lock désactivé');
    } catch (err) {
      console.error('Erreur release Wake Lock:', err);
    }
  }
};

// Réactiver automatiquement le wake lock quand la page redevient visible
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && wakeLock === null) {
    await requestWakeLock();
  }
});
