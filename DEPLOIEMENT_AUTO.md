# 🚀 Déploiement automatique avec GitHub + Netlify

Avec cette méthode, **chaque fois que tu modifies ton code**, Netlify redéploie automatiquement. Plus besoin de drag & drop !

## ⚡ Configuration (une seule fois)

### 1. Créer un repo GitHub

**Option A : Via GitHub Desktop (le plus simple)**
1. Télécharge GitHub Desktop : https://desktop.github.com/
2. Ouvre GitHub Desktop
3. File → Add Local Repository
4. Choisis le dossier `PomodoroApp`
5. Clique sur "Publish repository"
6. Nomme-le : `focusfit-pomodoro`
7. Décoche "Keep this code private" (ou laisse coché si tu veux)
8. Clique sur "Publish repository"

**Option B : Via ligne de commande**
```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - FocusFit Pomodoro"

# Créer le repo sur GitHub (tu dois avoir le GitHub CLI installé)
gh repo create focusfit-pomodoro --public --source=. --remote=origin --push
```

**Option C : Manuellement**
1. Va sur https://github.com/new
2. Nom du repo : `focusfit-pomodoro`
3. Public ou Private (au choix)
4. Ne coche rien d'autre
5. Clique sur "Create repository"
6. Suis les instructions pour "push an existing repository" :
```bash
git remote add origin https://github.com/TON_USERNAME/focusfit-pomodoro.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 2. Connecter Netlify à GitHub

1. Va sur https://app.netlify.com/
2. Clique sur "Add new site" → "Import an existing project"
3. Choisis "Deploy with GitHub"
4. Autorise Netlify à accéder à GitHub
5. Sélectionne ton repo `focusfit-pomodoro`
6. Configure :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
7. Clique sur "Deploy site"
8. Attends 1-2 minutes → Ton site est en ligne ! 🎉

### 3. Personnaliser l'URL (optionnel)

1. Dans Netlify, va dans "Site settings"
2. "Change site name"
3. Choisis un nom : `focusfit-pomodoro`
4. Ton URL devient : `https://focusfit-pomodoro.netlify.app`

## 🔄 Workflow de développement

Maintenant, à chaque modification :

### Méthode A : GitHub Desktop (recommandé)
1. Modifie ton code
2. Ouvre GitHub Desktop
3. Tu vois tes changements listés
4. Écris un message de commit (ex: "Ajout de nouvelles stats")
5. Clique sur "Commit to main"
6. Clique sur "Push origin"
7. **Netlify redéploie automatiquement** ! 🎉

### Méthode B : Ligne de commande
```bash
# Après avoir modifié ton code
git add .
git commit -m "Description de tes changements"
git push

# Netlify redéploie automatiquement !
```

## ✨ Avantages

✅ **Déploiement automatique** - Push → Déploiement  
✅ **Historique** - Tous tes changements sont sauvegardés  
✅ **Rollback facile** - Retour en arrière si problème  
✅ **Preview deployments** - Netlify crée des previews pour les branches  
✅ **Collaboration** - D'autres peuvent contribuer  

## 📱 Notifications de déploiement

Netlify t'envoie un email à chaque déploiement :
- ✅ Déploiement réussi
- ❌ Déploiement échoué (avec les logs d'erreur)

## 🔍 Voir les déploiements

1. Va sur ton site Netlify
2. Onglet "Deploys"
3. Tu vois l'historique de tous tes déploiements
4. Tu peux rollback à une version précédente en un clic

## 🌿 Branches et previews

Si tu veux tester des changements avant de les déployer :

```bash
# Créer une branche de test
git checkout -b test-nouvelle-feature

# Faire tes modifications
# ...

# Commit et push
git add .
git commit -m "Test nouvelle feature"
git push -u origin test-nouvelle-feature
```

Netlify crée automatiquement un **deploy preview** avec une URL unique pour tester !

## 🎯 Exemple de workflow complet

1. **Développement local**
```bash
npm run dev
# Teste tes changements sur http://localhost:5173
```

2. **Commit et push**
```bash
git add .
git commit -m "Amélioration du timer"
git push
```

3. **Netlify déploie automatiquement**
   - Tu reçois un email
   - Ton site est mis à jour en 1-2 minutes

4. **Teste en production**
   - Ouvre ton URL Netlify
   - Vérifie que tout fonctionne

## 🐛 En cas de problème

Si le déploiement échoue :
1. Va dans Netlify → Deploys
2. Clique sur le déploiement échoué
3. Regarde les logs d'erreur
4. Corrige le problème localement
5. Push à nouveau

## 💡 Astuces

**Ignorer les fichiers inutiles**
Le `.gitignore` est déjà configuré pour ignorer :
- `node_modules/`
- `dist/`
- `.env`

**Variables d'environnement**
Si tu veux cacher tes clés Supabase :
1. Netlify → Site settings → Environment variables
2. Ajoute `VITE_SUPABASE_URL` et `VITE_SUPABASE_KEY`
3. Utilise-les dans ton code avec `import.meta.env.VITE_SUPABASE_URL`

**Domaine personnalisé**
1. Achète un domaine (ex: `focusfit.com`)
2. Netlify → Domain settings → Add custom domain
3. Configure les DNS
4. HTTPS automatique !

## 🎉 Résumé

**Avant** : Modifier code → Build → Drag & drop → Redéployer  
**Après** : Modifier code → Push → **Déploiement automatique** ! 🚀

C'est beaucoup plus simple et professionnel !
