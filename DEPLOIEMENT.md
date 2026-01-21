# 🚀 Déploiement de FocusFit Pomodoro

Guide pour déployer ton application en ligne gratuitement.

## 🎯 Option 1 : Netlify (recommandé - le plus simple)

### Méthode A : Drag & Drop (2 minutes)

1. **Build l'application**
```bash
npm run build
```

2. **Va sur Netlify Drop**
   - Ouvre https://app.netlify.com/drop
   - Glisse-dépose le dossier `dist/` sur la page
   - Attends 10 secondes
   - Ton app est en ligne ! 🎉

3. **Note l'URL**
   - Tu obtiens une URL : `https://random-name-123.netlify.app`
   - Tu peux la personnaliser dans les settings Netlify

### Méthode B : Via GitHub (automatique)

1. **Crée un repo GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/focusfit-pomodoro.git
git push -u origin main
```

2. **Connecte Netlify**
   - Va sur https://app.netlify.com/
   - Clique sur "Add new site" → "Import an existing project"
   - Choisis GitHub
   - Sélectionne ton repo
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Clique sur "Deploy"

3. **Déploiement automatique**
   - Chaque fois que tu push sur GitHub, Netlify redéploie automatiquement
   - Pratique pour les mises à jour !

### Configuration Netlify (optionnel)

Crée un fichier `netlify.toml` à la racine :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🎯 Option 2 : Vercel (aussi simple)

1. **Installe Vercel CLI**
```bash
npm install -g vercel
```

2. **Déploie**
```bash
npm run build
vercel --prod
```

3. **Suis les instructions**
   - Connecte-toi avec GitHub/GitLab/Email
   - Confirme les paramètres
   - Ton app est en ligne !

## 🎯 Option 3 : GitHub Pages (gratuit)

1. **Installe gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Ajoute dans package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://TON_USERNAME.github.io/focusfit-pomodoro"
}
```

3. **Déploie**
```bash
npm run deploy
```

4. **Active GitHub Pages**
   - Va dans les settings de ton repo
   - Section "Pages"
   - Source: `gh-pages` branch
   - Ton app est sur `https://TON_USERNAME.github.io/focusfit-pomodoro`

## ⚙️ Configuration pour la production

### 1. Vérifie que Supabase est configuré

Dans `src/services/supabase.js`, assure-toi que l'URL et la clé sont correctes :

```javascript
const supabaseUrl = 'https://ton-projet.supabase.co';
const supabaseKey = 'ta-clé-anon-publique';
```

### 2. Teste en local avant de déployer

```bash
npm run build
npm run preview
```

Ouvre http://localhost:4173 et teste l'app.

### 3. Vérifie les icônes PWA

Assure-toi que ces fichiers existent dans `public/` :
- `pwa-192x192.png`
- `pwa-512x512.png`
- `apple-touch-icon.png`
- `favicon.ico`

## 📱 Après le déploiement

### Installer l'app sur mobile

**iOS (Safari)**
1. Ouvre ton URL déployée
2. Appuie sur le bouton "Partager"
3. "Sur l'écran d'accueil"
4. Confirme

**Android (Chrome)**
1. Ouvre ton URL déployée
2. Menu → "Installer l'application"
3. Confirme

### Installer sur desktop

**Chrome/Edge**
1. Ouvre ton URL
2. Icône d'installation dans la barre d'adresse
3. Ou Menu → "Installer FocusFit Pomodoro"

## 🔧 Personnaliser l'URL (Netlify)

1. Va dans les settings de ton site Netlify
2. "Domain settings"
3. "Add custom domain" ou "Change site name"
4. Choisis un nom : `focusfit-pomodoro.netlify.app`

## 🌐 Domaine personnalisé (optionnel)

Si tu as un domaine (ex: `focusfit.com`) :

**Netlify**
1. Domain settings → Add custom domain
2. Ajoute ton domaine
3. Configure les DNS chez ton registrar
4. Netlify gère le HTTPS automatiquement

**Vercel**
1. Project settings → Domains
2. Ajoute ton domaine
3. Configure les DNS
4. HTTPS automatique aussi

## ✅ Checklist avant déploiement

- [ ] Supabase configuré avec les bonnes clés
- [ ] Table `user_sessions` créée dans Supabase
- [ ] Icônes PWA présentes dans `public/`
- [ ] `npm run build` fonctionne sans erreur
- [ ] `npm run preview` fonctionne correctement
- [ ] Notifications testées (demandent la permission)

## 🐛 Problèmes courants

### L'app ne charge pas
- Vérifie que le dossier `dist/` a bien été déployé
- Regarde la console du navigateur pour les erreurs

### Les icônes PWA ne s'affichent pas
- Vérifie que les fichiers PNG existent dans `public/`
- Vide le cache du navigateur

### Supabase ne fonctionne pas
- Vérifie l'URL et la clé dans `supabase.js`
- Vérifie que la table `user_sessions` existe
- Vérifie que RLS est désactivé

### L'app ne s'installe pas
- Vérifie que le manifest est correct
- Vérifie que le service worker est actif
- Utilise HTTPS (automatique sur Netlify/Vercel)

## 🎉 C'est tout !

Ton app est maintenant accessible partout :
- Sur ton PC
- Sur ton téléphone
- Sur ta tablette
- Partout dans le monde !

Et grâce à Supabase, tes données sont synchronisées entre tous tes appareils. 🚀

## 💡 Astuces

**Partager l'app**
- Envoie l'URL à tes amis
- Ils peuvent l'installer aussi
- Chacun a son propre ID utilisateur

**Mises à jour**
- Modifie le code
- `npm run build`
- Redéploie (drag & drop ou git push)
- Les utilisateurs verront la mise à jour au prochain rechargement

**Monitoring**
- Netlify/Vercel te donnent des stats de visite
- Supabase te montre l'utilisation de la base de données
- Tout est gratuit jusqu'à des limites très élevées

Bon déploiement ! 🚀
