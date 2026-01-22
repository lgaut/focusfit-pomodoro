export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // Détection automatique du thème système
  theme: {
    extend: {
      colors: {
        // Couleurs optimisées pour Android Material Design & iOS
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5b8fc',
          400: '#8b95f8',
          500: '#6366f1', // Material Blue / iOS Blue
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Couleurs système natives
        system: {
          background: {
            light: '#f5f5f7', // iOS light background
            dark: '#000000',  // iOS dark background / Android OLED
          },
          surface: {
            light: '#ffffff',
            dark: '#1c1c1e', // iOS dark surface
          },
          border: {
            light: '#e5e5ea', // iOS separator
            dark: '#38383a',
          },
        },
        // Couleurs sémantiques natives
        success: '#34c759', // iOS/Android green
        warning: '#ff9500', // iOS/Android orange
        error: '#ff3b30',   // iOS/Android red
        info: '#007aff',    // iOS blue
      },
      backgroundColor: {
        'ios-light': '#f5f5f7',
        'ios-dark': '#000000',
        'android-light': '#fafafa',
        'android-dark': '#121212',
      },
      borderRadius: {
        'ios': '10px',      // iOS standard radius
        'android': '8px',   // Material Design radius
      },
      boxShadow: {
        'ios': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'android': '0 2px 4px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
