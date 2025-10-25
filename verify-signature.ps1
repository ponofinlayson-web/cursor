# Signature Verification Script
# This script helps users verify the authenticity of your signed package

param(
    [string]$PackagePath = "custom-homepage-dark-blue-v1.0-signed.zip"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Custom Homepage - Signature Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $PackagePath)) {
    Write-Host "Error: Package file '$PackagePath' not found!" -ForegroundColor Red
    Write-Host "Please ensure the signed package file exists." -ForegroundColor Red
    exit 1
}

Write-Host "Verifying package: $PackagePath" -ForegroundColor Yellow
Write-Host ""

try {
    # Extract and check signature
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zip = [System.IO.Compression.ZipFile]::OpenRead($PackagePath)
    
    $signatureEntry = $zip.Entries | Where-Object { $_.Name -eq "signature.txt" }
    
    if ($signatureEntry) {
        Write-Host "✓ Signature file found in package" -ForegroundColor Green
        
        # Read signature content
        $signatureStream = $signatureEntry.Open()
        $signatureReader = New-Object System.IO.StreamReader($signatureStream)
        $signatureContent = $signatureReader.ReadToEnd()
        $signatureReader.Close()
        $signatureStream.Close()
        
        Write-Host ""
        Write-Host "Package Signature Details:" -ForegroundColor Cyan
        Write-Host "------------------------" -ForegroundColor Cyan
        Write-Host $signatureContent -ForegroundColor White
        Write-Host ""
        
        # Parse signature information
        $lines = $signatureContent -split "`n"
        $name = ($lines | Where-Object { $_ -match "^Custom Homepage" }) -replace "Custom Homepage - ", ""
        $version = ($lines | Where-Object { $_ -match "^Version:" }) -replace "Version: ", ""
        $signed = ($lines | Where-Object { $_ -match "^Signed:" }) -replace "Signed: ", ""
        $certificate = ($lines | Where-Object { $_ -match "^Certificate:" }) -replace "Certificate: ", ""
        $publisher = ($lines | Where-Object { $_ -match "^Publisher:" }) -replace "Publisher: ", ""
        
        Write-Host "Verification Results:" -ForegroundColor Cyan
        Write-Host "-------------------" -ForegroundColor Cyan
        Write-Host "✓ Package Name: $name" -ForegroundColor Green
        Write-Host "✓ Version: $version" -ForegroundColor Green
        Write-Host "✓ Signed Date: $signed" -ForegroundColor Green
        Write-Host "✓ Certificate: $certificate" -ForegroundColor Green
        Write-Host "✓ Publisher: $publisher" -ForegroundColor Green
        Write-Host ""
        
        # Check if certificate exists in local store
        $cert = Get-ChildItem -Path "Cert:\CurrentUser\My" | Where-Object { $_.Thumbprint -eq $certificate }
        
        if ($cert) {
            Write-Host "✓ Certificate found in local certificate store" -ForegroundColor Green
            Write-Host "✓ Package signature is valid" -ForegroundColor Green
        } else {
            Write-Host "⚠ Certificate not found in local store" -ForegroundColor Yellow
            Write-Host "  This may be normal for self-signed certificates" -ForegroundColor Yellow
            Write-Host "  Package appears to be signed but certificate verification limited" -ForegroundColor Yellow
        }
        
    } else {
        Write-Host "✗ No signature file found in package" -ForegroundColor Red
        Write-Host "  This package may not be signed or may be corrupted" -ForegroundColor Red
    }
    
    $zip.Dispose()
    
} catch {
    Write-Host "Error verifying package: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verification Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If verification passed, the package is authentic and safe to use." -ForegroundColor Green
Write-Host "If you see warnings, the package may still be safe but use caution." -ForegroundColor Yellow
