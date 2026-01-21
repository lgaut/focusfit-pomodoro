# 🔥 Configuration Firebase pour la synchronisation

Pour activer le mode écran distant avec ton Nest Hub, tu dois configurer Firebase.

## 📋 Étapes de configuration

### 1. Créer un projet Firebase

1. Va sur https://console.firebase.google.com/
2. Clique sur "Ajouter un projet"
3. Nom du projet : **FocusFit Pomodoro** (ou ce que tu veux)
4. Désactive Google Analytics (pas nécessaire)
5. Clique sur "Créer le projet"

### 2. Activer Realtime Database

1. Dans la console Firebase, va dans **Build** → **Realtime Database**
2. Clique sur "Créer une base de données"
3. Choisis l'emplacement : **Europe (europe-west1)** (le plus proche)
4. Mode de sécurité : **Mode test** (pour commencer)
5. Clique sur "Activer"

### 3. Configurer les règles de sécurité

Dans l'onglet **Règles**, remplace par :

```json
{
  "rules": {
    "sessions": {
      "$sessionCode": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

⚠️ **Note** : Ces règles permettent à tout le monde de lire/écrire. C'est OK pour un usage personnel, mais pour la production, il faudrait ajouter de l'authentification.

### 4. Récupérer la configuration

1. Dans la console Firebase, clique sur l'icône **⚙️** → **Paramètres du projet**
2. Descends jusqu'à "Vos applications"
3. Clique sur l'icône **</>** (Web)
4. Nom de l'app : **FocusFit Web**
5. **Ne coche pas** Firebase Hosting
6. Clique sur "Enregistrer l'application"
7. Copie l'objet `firebaseConfig`

### 5. Configurer l'application

Ouvre le fichier `src/services/firebase.js` et remplace les valeurs :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Colle ta clé ici
  authDomain: "focusfit-xxxxx.firebaseapp.com",
  databaseURL: "https://focusfit-xxxxx-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "focusfit-xxxxx",
  storageBucket: "focusfit-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## 🚀 Utilisation

### Sur ton PC (Contrôleur)

1. Lance l'app normalement : `npm run dev`
2. Ouvre `http://localhost:5173`
3. Dans l'écran Timer, clique sur **"Activer écran distant"**
4. Un code à 6 lettres s'affiche (ex: **ABC123**)
5. Copie ce code

### Sur ton Nest Hub (Display)

**Option A : Via Google Assistant**
1. Dis : "Ok Google, ouvre Chrome"
2. Va sur l'URL de ton app déployée + `/display`
   - Exemple : `https://focusfit.netlify.app/display`
3. Entre le code à 6 lettres
4. Clique sur "Connecter"

**Option B : En développement local (même réseau WiFi)**
1. Trouve ton IP locale : `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
2. Sur le Nest Hub, ouvre : `http://[TON_IP]:5173/display`
   - Exemple : `http://192.168.1.100:5173/display`
3. Entre le code et connecte

## 🎯 Fonctionnement

Une fois connecté :
- ✅ Le Nest Hub affiche le timer en **TRÈS GRAND**
- ✅ Les exercices s'affichent automatiquement pendant les pauses
- ✅ Synchronisation en temps réel (< 1 seconde)
- ✅ Tu peux contrôler depuis ton PC
- ✅ Le Nest Hub reste à jour automatiquement

## 🔒 Sécurité (optionnel)

Pour un usage plus sécurisé, tu peux :

1. **Ajouter une expiration aux sessions** (dans les règles Firebase)
2. **Limiter le nombre de connexions** par IP
3. **Ajouter un mot de passe** au code de session

Exemple de règles plus sécurisées :

```json
{
  "rules": {
    "sessions": {
      "$sessionCode": {
        ".read": "data.child('createdAt').val() > (now - 86400000)",
        ".write": "!data.exists() || data.child('createdAt').val() > (now - 86400000)",
        ".validate": "newData.hasChildren(['state', 'timeRemaining', 'createdAt'])"
      }
    }
  }
}
```

Cela limite les sessions à 24h et valide la structure des données.

## 🐛 Dépannage

### Le Nest Hub ne se connecte pas
- Vérifie que tu es sur le même réseau WiFi
- Vérifie que le code est correct (6 caractères)
- Regarde la console Firebase pour voir si les données arrivent

### La synchronisation est lente
- Vérifie ta connexion internet
- Choisis une région Firebase plus proche
- Réduis la fréquence de sync (actuellement chaque seconde)

### Erreur "Permission denied"
- Vérifie les règles de sécurité dans Firebase
- Assure-toi que le mode test est activé

## 💰 Coûts

Firebase Realtime Database est **gratuit** jusqu'à :
- 1 GB de stockage
- 10 GB/mois de bande passante
- 100 connexions simultanées

Pour une utilisation personnelle, tu ne dépasseras **jamais** ces limites ! 🎉

## 📱 Alternative sans Firebase

Si tu ne veux pas utiliser Firebase, tu peux :
1. Utiliser le **Cast** de Chrome (mais pas d'écran tactile)
2. Déployer l'app et l'ouvrir directement sur le Nest Hub (pas de sync)
3. Utiliser **WebSocket** avec un serveur Node.js local

Mais Firebase est la solution la plus simple et gratuite ! 🚀
