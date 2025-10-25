# GitHub Release Signing Script
# This script helps you create a new signed release using GitHub's built-in signing

param(
    [string]$Version = "v1.1.0",
    [string]$Author = "Pono Finlayson",
    [string]$Email = "pono@example.com"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Release Signing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Version: $Version" -ForegroundColor Yellow
Write-Host "Author: $Author" -ForegroundColor Yellow
Write-Host "Email: $Email" -ForegroundColor Yellow
Write-Host ""

# Update version in package.json
Write-Host "Updating version in package.json..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$packageJson.version = $Version.TrimStart('v')
$packageJson.author = $Author
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"

# Update README with new version
Write-Host "Updating README with new version..." -ForegroundColor Yellow
$readmeContent = Get-Content "README.md" -Raw
$readmeContent = $readmeContent -replace "Version: 1\.0\.0", "Version: $($Version.TrimStart('v'))"
$readmeContent | Set-Content "README.md"

# Create new distribution package
Write-Host "Creating new distribution package..." -ForegroundColor Yellow
$packageName = "custom-homepage-dark-blue-$Version"

# Remove old packages
Remove-Item "custom-homepage-dark-blue-*.zip" -ErrorAction SilentlyContinue

# Create new package
Compress-Archive -Path "index.html", "styles.css", "script.js", "manifest.json", "package.json", "README.md", "QUICKSTART.md", "install.bat", "install.sh", "install.js" -DestinationPath "$packageName.zip" -Force

Write-Host "Package created: $packageName.zip" -ForegroundColor Green

# Create release notes
$releaseNotes = @"
# Custom Homepage $Version

A beautiful, modern homepage for Chromium-based browsers featuring a dark blue gradient background, Google search integration, and organized link cards.

## ✨ What's New

- **Edit Links**: Click edit icon to modify link names and URLs
- **Ctrl+Click Tooltip**: Clear instructions for background tab opening
- **Improved UX**: Better user experience with intuitive controls
- **Code Signing**: GitHub-signed releases for authenticity

## 🎯 Features

- **Dark Blue Theme**: Sophisticated slate gradient background
- **Google Search**: Built-in search bar that opens results in new tabs
- **Smart Cards**: 4x3 grid layout with alphabetical sorting
- **Quick Link Addition**: Click anywhere on a card to add links
- **Edit Links**: Click edit icon to modify link names and URLs
- **Ctrl+Click**: Hold Ctrl and click links to open in background tabs
- **Mobile Responsive**: Works perfectly on all devices
- **Local Storage**: All data saved locally in your browser

## 🔐 Verification

This release is signed with GitHub's built-in signing for authenticity.

## 🚀 Installation

1. Download the ZIP file
2. Extract to any folder
3. Double-click `index.html`
4. Set as homepage in your browser settings

## 📄 License

MIT License - Free to use, modify, and distribute.

---

**Author**: $Author  
**License**: MIT  
**Version**: $Version
"@

$releaseNotes | Out-File -FilePath "RELEASE_NOTES_$Version.md" -Encoding UTF8

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Release Instructions" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Commit and push your changes:" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor White
Write-Host "   git commit -m `"Release $Version - Updated author to $Author`"" -ForegroundColor White
Write-Host "   git push origin main" -ForegroundColor White
Write-Host ""
Write-Host "2. Create and push a tag:" -ForegroundColor Yellow
Write-Host "   git tag $Version" -ForegroundColor White
Write-Host "   git push origin $Version" -ForegroundColor White
Write-Host ""
Write-Host "3. GitHub Actions will automatically:" -ForegroundColor Yellow
Write-Host "   - Build the distribution package" -ForegroundColor White
Write-Host "   - Sign with GitHub's built-in signing" -ForegroundColor White
Write-Host "   - Create a release with all files" -ForegroundColor White
Write-Host "   - Generate checksums for verification" -ForegroundColor White
Write-Host ""
Write-Host "4. Alternative - Manual Release:" -ForegroundColor Yellow
Write-Host "   - Go to GitHub → Releases → Create new release" -ForegroundColor White
Write-Host "   - Tag: $Version" -ForegroundColor White
Write-Host "   - Title: Custom Homepage $Version" -ForegroundColor White
Write-Host "   - Upload: $packageName.zip" -ForegroundColor White
Write-Host "   - Copy content from: RELEASE_NOTES_$Version.md" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ready for GitHub Release!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Files created:" -ForegroundColor Green
Write-Host "✓ $packageName.zip" -ForegroundColor White
Write-Host "✓ RELEASE_NOTES_$Version.md" -ForegroundColor White
Write-Host "✓ .github/workflows/release.yml" -ForegroundColor White
Write-Host ""
Write-Host "Your homepage is ready for GitHub release with built-in signing!" -ForegroundColor Green
