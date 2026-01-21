# Configuration du secret Giphy API

Pour que les GIFs fonctionnent en production, ajoute le secret suivant :

1. Va sur https://github.com/lgaut/focusfit-pomodoro/settings/secrets/actions
2. Clique sur "New repository secret"
3. Ajoute :
   - Name: `VITE_GIPHY_API_KEY`
   - Value: `pgyicr2rMOyTJ2MIn6wst45rcaDcy0XS`
4. Clique sur "Add secret"

Une fois fait, le prochain déploiement utilisera automatiquement cette clé !
