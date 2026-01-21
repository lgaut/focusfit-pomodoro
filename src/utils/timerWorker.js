// Web Worker pour gérer le timer en arrière-plan
let timerId = null;
let endTime = null;

self.onmessage = function(e) {
  const { type, duration } = e.data;

  if (type === 'START') {
    endTime = Date.now() + (duration * 1000);
    
    if (timerId) clearInterval(timerId);
    
    timerId = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      
      self.postMessage({ 
        type: 'TICK', 
        remaining 
      });

      if (remaining <= 0) {
        clearInterval(timerId);
        self.postMessage({ type: 'COMPLETE' });
      }
    }, 1000);
  } else if (type === 'STOP') {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  } else if (type === 'PAUSE') {
    if (timerId) {
      clearInterval(timerId);
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      self.postMessage({ type: 'PAUSED', remaining });
    }
  } else if (type === 'RESUME') {
    if (duration) {
      endTime = Date.now() + (duration * 1000);
      
      timerId = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        
        self.postMessage({ 
          type: 'TICK', 
          remaining 
        });

        if (remaining <= 0) {
          clearInterval(timerId);
          self.postMessage({ type: 'COMPLETE' });
        }
      }, 1000);
    }
  }
};
