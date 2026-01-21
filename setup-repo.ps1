# Script PowerShell pour initialiser le repo GitHub et configurer Netlify

Write-Host "🚀 Configuration automatique du repo GitHub et CI/CD" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Git est installé
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé. Télécharge-le sur https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Vérifier si GitHub CLI est installé
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  GitHub CLI n'est pas installé." -ForegroundColor Yellow
    Write-Host "Tu peux l'installer avec: winget install GitHub.cli" -ForegroundColor Yellow
    Write-Host "Ou télécharger sur: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host ""
    $useManual = Read-Host "Veux-tu continuer avec la configuration manuelle ? (o/n)"
    if ($useManual -ne "o") {
        exit 0
    }
    $manualMode = $true
} else {
    $manualMode = $false
}

Write-Host "📦 Initialisation du repo Git..." -ForegroundColor Green

# Initialiser Git si pas déjà fait
if (-not (Test-Path .git)) {
    git init
    Write-Host "✅ Git initialisé" -ForegroundColor Green
} else {
    Write-Host "✅ Git déjà initialisé" -ForegroundColor Green
}

# Ajouter tous les fichiers
git add .

# Premier commit
$commitMessage = Read-Host "Message du commit initial (ou appuie sur Entrée pour 'Initial commit')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit - FocusFit Pomodoro"
}

git commit -m "$commitMessage"
Write-Host "✅ Commit créé" -ForegroundColor Green

# Renommer la branche en main
git branch -M main

if (-not $manualMode) {
    Write-Host ""
    Write-Host "🌐 Création du repo GitHub..." -ForegroundColor Green
    
    $repoName = Read-Host "Nom du repo (ou appuie sur Entrée pour 'focusfit-pomodoro')"
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "focusfit-pomodoro"
    }
    
    $visibility = Read-Host "Repo public ou prive ? (public/private, defaut: public)"
    if ([string]::IsNullOrWhiteSpace($visibility)) {
        $visibility = "public"
    }
    
    # Créer le repo sur GitHub
    gh repo create $repoName --$visibility --source=. --remote=origin --push
    
    Write-Host "✅ Repo GitHub créé et code pushé !" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "📝 Configuration manuelle requise:" -ForegroundColor Yellow
    Write-Host "1. Va sur https://github.com/new" -ForegroundColor White
    Write-Host "2. Crée un repo nommé 'focusfit-pomodoro'" -ForegroundColor White
    Write-Host "3. Puis exécute ces commandes:" -ForegroundColor White
    Write-Host ""
    Write-Host "   git remote add origin https://github.com/TON_USERNAME/focusfit-pomodoro.git" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Appuie sur Entrée quand c'est fait"
}

Write-Host ""
Write-Host "🔑 Configuration des secrets GitHub..." -ForegroundColor Green
Write-Host ""
Write-Host "Pour que le CI/CD fonctionne, tu dois ajouter ces secrets dans GitHub:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Va sur ton repo GitHub → Settings → Secrets and variables → Actions" -ForegroundColor White
Write-Host "2. Clique sur 'New repository secret'" -ForegroundColor White
Write-Host ""
Write-Host "Secrets à ajouter:" -ForegroundColor Cyan
Write-Host "  - NETLIFY_AUTH_TOKEN" -ForegroundColor White
Write-Host "    → Va sur https://app.netlify.com/user/applications#personal-access-tokens" -ForegroundColor Gray
Write-Host "    → Crée un nouveau token" -ForegroundColor Gray
Write-Host ""
Write-Host "  - NETLIFY_SITE_ID" -ForegroundColor White
Write-Host "    → Va sur ton site Netlify → Site settings → General" -ForegroundColor Gray
Write-Host "    → Copie le 'Site ID'" -ForegroundColor Gray
Write-Host ""

Write-Host "✅ Configuration terminée !" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Ajoute les secrets GitHub (voir ci-dessus)" -ForegroundColor White
Write-Host "2. Chaque push sur 'main' déclenchera un déploiement automatique" -ForegroundColor White
Write-Host "3. Les Pull Requests auront des previews automatiques" -ForegroundColor White
Write-Host ""
Write-Host "Pour tester:" -ForegroundColor Yellow
Write-Host "  git add ." -ForegroundColor Cyan
Write-Host "  git commit -m 'Test CI/CD'" -ForegroundColor Cyan
Write-Host "  git push" -ForegroundColor Cyan
Write-Host ""
Write-Host "Bon developpement !" -ForegroundColor Green
