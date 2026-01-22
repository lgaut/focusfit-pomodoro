import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Enregistrer le Service Worker pour les notifications en arrière-plan
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/focusfit-pomodoro/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker enregistré:', registration.scope);
      })
      .catch((error) => {
        console.warn('❌ Erreur Service Worker:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
