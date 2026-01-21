# 🔑 Configuration des secrets GitHub pour le CI/CD

Pour que le déploiement automatique fonctionne, tu dois ajouter 2 secrets dans GitHub.

## 📋 Étapes

### 1. Va dans les settings du repo

https://github.com/lgaut/focusfit-pomodoro/settings/secrets/actions

Ou manuellement :
1. Va sur https://github.com/lgaut/focusfit-pomodoro
2. Clique sur **Settings** (en haut)
3. Dans le menu de gauche : **Secrets and variables** → **Actions**
4. Clique sur **New repository secret**

### 2. Ajoute NETLIFY_AUTH_TOKEN

**Nom du secret :** `NETLIFY_AUTH_TOKEN`

**Comment obtenir le token :**
1. Va sur https://app.netlify.com/user/applications#personal-access-tokens
2. Clique sur **"New access token"**
3. Nomme-le : `GitHub Actions`
4. Clique sur **"Generate token"**
5. **Copie le token** (tu ne pourras plus le voir après !)
6. Colle-le dans GitHub comme secret

### 3. Ajoute NETLIFY_SITE_ID

**Nom du secret :** `NETLIFY_SITE_ID`

**Comment obtenir le Site ID :**
1. Va sur ton site Netlify (https://app.netlify.com/)
2. Clique sur ton site
3. **Site settings** → **General**
4. Descends jusqu'à **"Site information"**
5. Copie le **"Site ID"** (format : `abc123-456def-789ghi`)
6. Colle-le dans GitHub comme secret

## ✅ Vérification

Une fois les 2 secrets ajoutés :

1. Va sur https://github.com/lgaut/focusfit-pomodoro/actions
2. Tu devrais voir le workflow "Build and Deploy to Netlify"
3. Il devrait se déclencher automatiquement

Si ce n'est pas le cas, fais un petit changement et push :

```bash
git commit --allow-empty -m "Test CI/CD"
git push
```

## 🎉 Résultat

Maintenant, **chaque fois que tu push sur main** :
1. GitHub Actions build automatiquement
2. Déploie sur Netlify
3. T'envoie une notification par email

Plus besoin de drag & drop ! 🚀

## 🐛 En cas de problème

Si le workflow échoue :
1. Va dans Actions → Clique sur le workflow échoué
2. Regarde les logs
3. Vérifie que les secrets sont bien configurés
4. Vérifie que le Site ID est correct

## 📝 Liens rapides

- **Repo GitHub :** https://github.com/lgaut/focusfit-pomodoro
- **Actions :** https://github.com/lgaut/focusfit-pomodoro/actions
- **Secrets :** https://github.com/lgaut/focusfit-pomodoro/settings/secrets/actions
- **Netlify Tokens :** https://app.netlify.com/user/applications#personal-access-tokens
