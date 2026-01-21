# 🚀 Déploiement avec GitHub Pages (100% gratuit)

Pas besoin de Netlify ! GitHub Pages est intégré, gratuit, et encore plus simple.

## ✅ Avantages de GitHub Pages

✅ **Gratuit** - Aucun compte externe  
✅ **Intégré** - Directement dans GitHub  
✅ **Automatique** - Push → Déploiement  
✅ **HTTPS** - Certificat SSL gratuit  
✅ **Pas de secrets** - Aucune configuration externe  
✅ **CDN global** - Rapide partout dans le monde  

## ⚡ Configuration (1 minute)

### 1. Active GitHub Pages

Va sur ton repo : https://github.com/lgaut/focusfit-pomodoro/settings/pages

Ou manuellement :
1. Va sur https://github.com/lgaut/focusfit-pomodoro
2. **Settings** → **Pages** (menu de gauche)
3. **Source** : Sélectionne **"GitHub Actions"**
4. C'est tout ! 🎉

### 2. Push les changements

```bash
git add .
git commit -m "Migration vers GitHub Pages"
git push
```

Le workflow GitHub Actions va automatiquement :
1. Builder l'app
2. La déployer sur GitHub Pages
3. Te donner l'URL

## 🌐 Ton URL

Ton app sera accessible sur :

**https://lgaut.github.io/focusfit-pomodoro/**

## 🔄 Workflow automatique

Maintenant, à chaque push sur `main` :

```bash
# Modifie ton code
git add .
git commit -m "Nouvelle fonctionnalité"
git push

# GitHub Actions fait automatiquement :
# ✅ Build
# ✅ Déploiement sur GitHub Pages
# ✅ Notification
```

## 📱 Installation PWA

Une fois déployé, tu peux installer l'app :

**Sur mobile :**
- iOS : Safari → Partager → Sur l'écran d'accueil
- Android : Chrome → Menu → Installer l'application

**Sur desktop :**
- Chrome → Icône d'installation dans la barre d'adresse

## 🎯 Comparaison

| Feature | Netlify | GitHub Pages |
|---------|---------|--------------|
| Prix | Gratuit (limites) | **100% gratuit** |
| Configuration | Secrets requis | **Aucun secret** |
| Compte externe | Oui | **Non** |
| Déploiement | Automatique | **Automatique** |
| HTTPS | Oui | **Oui** |
| CDN | Oui | **Oui** |

**Verdict :** GitHub Pages est plus simple et tout aussi performant ! 🚀

## 🔍 Voir les déploiements

1. Va sur https://github.com/lgaut/focusfit-pomodoro/actions
2. Tu vois tous les workflows
3. Clique sur un workflow pour voir les détails

## 🐛 En cas de problème

### L'app ne charge pas
- Vérifie que GitHub Pages est activé (Settings → Pages)
- Vérifie que la source est "GitHub Actions"
- Attends 1-2 minutes après le premier déploiement

### Les assets ne chargent pas
- C'est déjà corrigé avec `base: '/focusfit-pomodoro/'` dans `vite.config.js`

### Le service worker ne fonctionne pas
- GitHub Pages utilise HTTPS automatiquement, donc ça marche !

## 💡 Domaine personnalisé (optionnel)

Si tu veux un domaine custom (ex: `focusfit.com`) :

1. Achète un domaine
2. GitHub Pages → Custom domain
3. Configure les DNS
4. HTTPS automatique après quelques minutes

## 🎉 C'est tout !

Plus simple que Netlify :
- ❌ Pas de compte externe
- ❌ Pas de secrets à configurer
- ❌ Pas de limite de build
- ✅ Juste push et c'est déployé !

Ton app sera en ligne sur :
**https://lgaut.github.io/focusfit-pomodoro/**

Active GitHub Pages maintenant et push ! 🚀
