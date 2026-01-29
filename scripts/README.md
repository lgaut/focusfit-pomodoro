# Scripts de génération d'images

## Génération d'images d'exercices avec Gemini AI

Ce script génère automatiquement des illustrations pour tous les exercices de l'application en utilisant l'API Gemini de Google.

### Configuration

1. **Obtenir une clé API Gemini**
   - Va sur https://aistudio.google.com/app/apikey
   - Crée une nouvelle clé API
   - Copie la clé

2. **Configurer les variables d'environnement**
   ```bash
   # Copie le fichier .env.example en .env
   cp .env.example .env
   
   # Édite le fichier .env et ajoute ta clé API
   GEMINI_API_KEY=ta_clé_api_ici
   ```

3. **Installer les dépendances**
   ```bash
   npm install
   ```

### Utilisation

Pour générer toutes les images d'exercices :

```bash
npm run generate:images
```

Le script va :
- ✅ Vérifier si les images existent déjà (pour éviter de régénérer)
- 🎨 Générer les images manquantes avec l'API Gemini
- 💾 Sauvegarder les images dans `public/exercise-images/`
- 📊 Afficher un résumé de la génération

### Exercices illustrés

Le script génère des illustrations pour :
- **Échauffement** : Cercles de bras, pompes légères, gainage léger, respiration
- **Pectoraux** : Pompes, développé haltères, écartés haltères
- **Abdominaux** : Gainage, relevés de jambes, crunch lent
- **Retour au calme** : Étirement pectoraux, respiration profonde
- **Repos** : Illustration de récupération

### Format des images

- Format : PNG
- Style : Illustrations minimalistes et modernes
- Fond : Clair et épuré
- Focus : Démonstration claire de la technique d'exercice

### Notes

- Les images sont sauvegardées localement pour éviter de les régénérer
- Un délai de 2 secondes est appliqué entre chaque génération pour respecter les limites de l'API
- Les images existantes ne sont pas régénérées (cache)

### Dépannage

**Erreur "GEMINI_API_KEY n'est pas définie"**
- Vérifie que tu as créé un fichier `.env` avec ta clé API

**Erreur de génération**
- Vérifie que ta clé API est valide
- Vérifie ta connexion internet
- Vérifie les limites de ton quota API Gemini
