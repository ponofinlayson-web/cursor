# GitHub Setup Script for Custom Homepage
# This script helps you set up GitHub distribution

param(
    [string]$RepositoryName = "custom-homepage",
    [string]$Description = "A beautiful, modern homepage with Google search integration and organized link cards",
    [string]$GitHubUsername = ""
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Distribution Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ([string]::IsNullOrEmpty($GitHubUsername)) {
    $GitHubUsername = Read-Host "Enter your GitHub username"
}

Write-Host "Setting up repository: $RepositoryName" -ForegroundColor Yellow
Write-Host "GitHub username: $GitHubUsername" -ForegroundColor Yellow
Write-Host ""

# Initialize git repository
Write-Host "Initializing git repository..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial release: Custom Homepage v1.0

Features:
- Dark blue gradient theme
- Google search integration
- Click-to-add links
- Background tab opening
- Drag & drop organization
- Mobile responsive design
- Local storage persistence"

# Create .gitignore
Write-Host "Creating .gitignore..." -ForegroundColor Yellow
@"
# Distribution files
dist/
*.zip
signature.txt

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8

git add .gitignore
git commit -m "Add .gitignore"

# Create GitHub repository URL
$RepositoryUrl = "https://github.com/$GitHubUsername/$RepositoryName"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Setup Instructions" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to GitHub.com and create a new repository:" -ForegroundColor Yellow
Write-Host "   Repository name: $RepositoryName" -ForegroundColor White
Write-Host "   Description: $Description" -ForegroundColor White
Write-Host "   Visibility: Public (recommended)" -ForegroundColor White
Write-Host ""
Write-Host "2. After creating the repository, run these commands:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/$GitHubUsername/$RepositoryName.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "3. Create a release:" -ForegroundColor Yellow
Write-Host "   - Go to your repository on GitHub" -ForegroundColor White
Write-Host "   - Click 'Releases' → 'Create a new release'" -ForegroundColor White
Write-Host "   - Tag version: v1.0.0" -ForegroundColor White
Write-Host "   - Release title: Custom Homepage v1.0" -ForegroundColor White
Write-Host "   - Upload: custom-homepage-dark-blue-v1.0-signed.zip" -ForegroundColor White
Write-Host ""
Write-Host "4. Add repository topics:" -ForegroundColor Yellow
Write-Host "   - homepage, browser, newtab, productivity, links, chrome, edge, firefox" -ForegroundColor White
Write-Host ""
Write-Host "5. Create a README section for installation:" -ForegroundColor Yellow
Write-Host "   - Add installation instructions" -ForegroundColor White
Write-Host "   - Include screenshots" -ForegroundColor White
Write-Host "   - Add usage examples" -ForegroundColor White
Write-Host ""

# Create release notes template
Write-Host "Creating release notes template..." -ForegroundColor Yellow
$ReleaseNotes = @"
# Custom Homepage v1.0.0

A beautiful, modern homepage for Chromium-based browsers featuring a dark blue gradient background, Google search integration, and organized link cards.

## ✨ Features

- **Dark Blue Theme**: Sophisticated slate gradient background
- **Google Search**: Built-in search bar that opens results in new tabs
- **Smart Cards**: 4x3 grid layout with alphabetical sorting
- **Quick Link Addition**: Click anywhere on a card to add links
- **Dual Click Options**: Navigate normally or open in background tabs
- **Drag & Drop**: Reorder links within cards
- **Mobile Responsive**: Works perfectly on all devices
- **Local Storage**: All data saved locally in your browser

## 🚀 Installation

### Quick Start:
1. Download `custom-homepage-dark-blue-v1.0-signed.zip`
2. Extract to any folder
3. Double-click `index.html` to open
4. Set as homepage in your browser settings

### Verification:
Run `verify-signature.ps1` to verify package authenticity.

## 🎯 Usage

- **Add Links**: Click on empty card space
- **Search**: Type in the Google search bar
- **Navigate**: Click links normally or use background tab option
- **Organize**: Drag and drop links within cards

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Edge 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Mobile browsers

## 🔐 Security

This package is code-signed for authenticity. Always verify the signature before installation.

## 📄 License

MIT License - Free to use, modify, and distribute.

## 🤝 Contributing

Issues and pull requests welcome!

---
**Enjoy your beautiful, functional homepage! 🎉**
"@

$ReleaseNotes | Out-File -FilePath "RELEASE_NOTES.md" -Encoding UTF8

Write-Host "Release notes created: RELEASE_NOTES.md" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Follow the GitHub setup instructions above" -ForegroundColor White
Write-Host "2. Upload your signed package to the release" -ForegroundColor White
Write-Host "3. Share your repository with others" -ForegroundColor White
Write-Host "4. Monitor downloads and user feedback" -ForegroundColor White
Write-Host ""
Write-Host "Your homepage is ready for GitHub distribution! 🚀" -ForegroundColor Green
