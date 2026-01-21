# 🤖 CI/CD Automatique avec GitHub Actions

Configuration complète pour déployer automatiquement sur Netlify à chaque push.

## 🎯 Ce qui est automatisé

✅ **Build automatique** à chaque push  
✅ **Tests** de compilation  
✅ **Déploiement sur Netlify** automatique  
✅ **Preview deployments** pour les Pull Requests  
✅ **Notifications** de succès/échec  

## ⚡ Installation rapide

### Option 1 : Script automatique (recommandé)

Exécute simplement :

```powershell
.\setup-repo.ps1
```

Le script va :
1. Initialiser Git
2. Créer le premier commit
3. Créer le repo GitHub (si GitHub CLI installé)
4. Te guider pour la configuration des secrets

### Option 2 : Manuel

Si tu préfères faire manuellement :

**1. Initialiser Git et créer le repo**

```bash
git init
git add .
git commit -m "Initial commit - FocusFit Pomodoro"
git branch -M main
```

Puis crée le repo sur GitHub :
- Va sur https://github.com/new
- Nom : `focusfit-pomodoro`
- Public ou Private
- Crée le repo

```bash
git remote add origin https://github.com/TON_USERNAME/focusfit-pomodoro.git
git push -u origin main
```

**2. Configurer les secrets GitHub**

Va sur ton repo → **Settings** → **Secrets and variables** → **Actions**

Ajoute ces 2 secrets :

**NETLIFY_AUTH_TOKEN**
1. Va sur https://app.netlify.com/user/applications#personal-access-tokens
2. Clique sur "New access token"
3. Nomme-le "GitHub Actions"
4. Copie le token
5. Colle-le dans GitHub comme secret

**NETLIFY_SITE_ID**
1. Va sur ton site Netlify
2. Site settings → General
3. Copie le "Site ID" (ex: `abc123-456def-789ghi`)
4. Colle-le dans GitHub comme secret

## 🔄 Workflows configurés

### 1. Deploy (`.github/workflows/deploy.yml`)

**Déclenché sur :**
- Push sur `main`
- Pull Requests vers `main`

**Actions :**
1. Checkout du code
2. Installation de Node.js 18
3. Installation des dépendances (`npm ci`)
4. Build de l'application
5. Déploiement sur Netlify

**Résultat :**
- Production deploy pour `main`
- Preview deploy pour les PRs

### 2. Tests (`.github/workflows/test.yml`)

**Déclenché sur :**
- Push sur `main` ou `develop`
- Pull Requests

**Actions :**
1. Vérification que le build fonctionne
2. Affichage de la taille du bundle

## 🚀 Utilisation quotidienne

### Workflow simple

```bash
# Modifie ton code
# ...

# Commit et push
git add .
git commit -m "Amélioration du timer"
git push

# GitHub Actions s'occupe du reste !
```

### Voir les déploiements

1. Va sur ton repo GitHub
2. Onglet **Actions**
3. Tu vois tous les workflows en cours/terminés
4. Clique sur un workflow pour voir les détails

### En cas d'erreur

Si le build échoue :
1. GitHub t'envoie un email
2. Va dans Actions → Clique sur le workflow échoué
3. Regarde les logs pour voir l'erreur
4. Corrige localement
5. Push à nouveau

## 🌿 Branches et Pull Requests

### Créer une branche de développement

```bash
git checkout -b feature/nouvelle-fonctionnalite
# Fais tes modifications
git add .
git commit -m "Ajout nouvelle fonctionnalité"
git push -u origin feature/nouvelle-fonctionnalite
```

### Créer une Pull Request

1. Va sur GitHub
2. Tu verras "Compare & pull request"
3. Crée la PR
4. GitHub Actions va :
   - Tester le build
   - Créer un preview deployment sur Netlify
   - Commenter la PR avec l'URL du preview

### Merger la PR

Une fois la PR approuvée et mergée :
- GitHub Actions déploie automatiquement en production
- Ton site Netlify est mis à jour

## 📊 Badges (optionnel)

Ajoute ces badges dans ton README :

```markdown
![Build Status](https://github.com/TON_USERNAME/focusfit-pomodoro/workflows/Build%20and%20Deploy%20to%20Netlify/badge.svg)
![Tests](https://github.com/TON_USERNAME/focusfit-pomodoro/workflows/Tests%20and%20Linting/badge.svg)
```

## 🔒 Sécurité

Les secrets sont :
- ✅ Chiffrés par GitHub
- ✅ Jamais affichés dans les logs
- ✅ Accessibles uniquement aux workflows

## 🎯 Avantages du CI/CD

**Avant :**
```
Modifier code → Build local → Drag & drop Netlify → Attendre
```

**Après :**
```
Modifier code → git push → ☕ (tout est automatique)
```

**Bonus :**
- ✅ Historique complet des déploiements
- ✅ Rollback facile (revert un commit)
- ✅ Tests automatiques avant déploiement
- ✅ Preview pour tester avant de merger
- ✅ Notifications automatiques

## 🐛 Troubleshooting

### Le workflow ne se déclenche pas

- Vérifie que les fichiers `.github/workflows/*.yml` sont bien pushés
- Vérifie l'onglet Actions sur GitHub

### Erreur "NETLIFY_AUTH_TOKEN not found"

- Va dans Settings → Secrets → Actions
- Vérifie que `NETLIFY_AUTH_TOKEN` existe
- Recrée-le si nécessaire

### Erreur "NETLIFY_SITE_ID not found"

- Même chose pour `NETLIFY_SITE_ID`
- Vérifie que c'est bien le Site ID (pas l'URL)

### Le build échoue

- Regarde les logs dans Actions
- Teste localement avec `npm run build`
- Vérifie que toutes les dépendances sont dans `package.json`

## 📝 Personnalisation

### Changer la branche de production

Dans `.github/workflows/deploy.yml`, change :
```yaml
on:
  push:
    branches:
      - main  # Change ici
```

### Ajouter des tests

Ajoute dans `package.json` :
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Puis dans `.github/workflows/test.yml` :
```yaml
- name: Run tests
  run: npm test
```

### Déployer sur un autre service

Remplace l'étape Netlify par :
- Vercel : `vercel-action`
- GitHub Pages : `peaceiris/actions-gh-pages`
- AWS S3 : `aws-actions/configure-aws-credentials`

## 🎉 Résultat final

Maintenant ton workflow est :

1. **Développe** sur une branche
2. **Push** ton code
3. **Crée une PR** → Preview automatique
4. **Merge** la PR → Déploiement en production
5. **Profite** ! ☕

Tout est automatisé, testé, et déployé sans intervention manuelle ! 🚀

## 💡 Prochaines étapes

- [ ] Ajouter des tests unitaires
- [ ] Configurer ESLint/Prettier
- [ ] Ajouter des tests E2E avec Playwright
- [ ] Configurer Dependabot pour les mises à jour
- [ ] Ajouter un changelog automatique

Bon développement ! 🎯
