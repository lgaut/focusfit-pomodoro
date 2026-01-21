# 🎨 Génération des icônes PWA

Pour que l'application soit installable, tu dois créer les icônes PWA.

## Option 1 : Utiliser un générateur en ligne (recommandé)

### RealFaviconGenerator
1. Va sur https://realfavicongenerator.net/
2. Upload une image carrée (minimum 512x512px)
3. Configure les options
4. Télécharge le package
5. Place les fichiers dans le dossier `public/`

### PWA Asset Generator (ligne de commande)
```bash
npx pwa-asset-generator logo.svg public/ --background "#6366f1" --padding "10%"
```

## Option 2 : Créer manuellement avec un éditeur d'image

Tu as besoin de ces fichiers dans `public/` :

- `pwa-192x192.png` (192x192px)
- `pwa-512x512.png` (512x512px)
- `apple-touch-icon.png` (180x180px)
- `favicon.ico` (32x32px)

## Design suggéré

Couleur de fond : `#6366f1` (indigo)
Icône : Timer/Horloge + Haltère ou symbole fitness
Style : Moderne, minimaliste, flat design

## Exemple avec Canva

1. Crée un design 512x512px
2. Fond dégradé indigo → violet
3. Ajoute une icône de timer/chronomètre (blanc)
4. Ajoute un petit symbole fitness (haltère, biceps)
5. Exporte en PNG
6. Redimensionne pour les autres tailles

## Placeholder temporaire

En attendant, tu peux utiliser un placeholder :
- https://via.placeholder.com/192x192/6366f1/ffffff?text=FF
- https://via.placeholder.com/512x512/6366f1/ffffff?text=FocusFit

Télécharge ces images et renomme-les correctement.

## Vérification

Une fois les icônes en place, vérifie :
1. Lance `npm run dev`
2. Ouvre les DevTools → Application → Manifest
3. Vérifie que toutes les icônes sont chargées
4. Teste l'installation PWA
