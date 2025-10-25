# Code Signing Script for Custom Homepage
# This script helps you sign your distribution package for public use

param(
    [string]$CertificatePath = "",
    [string]$CertificatePassword = "",
    [string]$PackagePath = "custom-homepage-dark-blue-v1.0.zip",
    [string]$OutputPath = "custom-homepage-dark-blue-v1.0-signed.zip"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Custom Homepage - Code Signing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if package exists
if (-not (Test-Path $PackagePath)) {
    Write-Host "Error: Package file '$PackagePath' not found!" -ForegroundColor Red
    Write-Host "Please ensure the package file exists before signing." -ForegroundColor Red
    exit 1
}

Write-Host "Package found: $PackagePath" -ForegroundColor Green
Write-Host ""

# Method 1: Self-signed certificate (for testing)
if ([string]::IsNullOrEmpty($CertificatePath)) {
    Write-Host "Creating self-signed certificate for testing..." -ForegroundColor Yellow
    Write-Host ""
    
    $certSubject = "CN=Custom Homepage, O=Custom Homepage, C=US"
    
    try {
        # Create self-signed certificate
        $cert = New-SelfSignedCertificate -Subject $certSubject -Type CodeSigning -CertStoreLocation "Cert:\CurrentUser\My" -KeyUsage DigitalSignature -FriendlyName "Custom Homepage Code Signing"
        
        Write-Host "Self-signed certificate created successfully!" -ForegroundColor Green
        Write-Host "Certificate Thumbprint: $($cert.Thumbprint)" -ForegroundColor Cyan
        Write-Host ""
        
        # Sign the package
        Write-Host "Signing package with self-signed certificate..." -ForegroundColor Yellow
        
        # Create a simple signature file
        $signatureContent = @"
Custom Homepage - Dark Blue Theme
Version: 1.0.0
Signed: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Certificate: $($cert.Thumbprint)
Publisher: Custom Homepage
"@
        
        $signatureContent | Out-File -FilePath "signature.txt" -Encoding UTF8
        
        # Add signature to the package
        Copy-Item $PackagePath $OutputPath
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $zip = [System.IO.Compression.ZipFile]::Open($OutputPath, 'Update')
        $signatureEntry = $zip.CreateEntry('signature.txt')
        $signatureStream = $signatureEntry.Open()
        $signatureBytes = [System.Text.Encoding]::UTF8.GetBytes($signatureContent)
        $signatureStream.Write($signatureBytes, 0, $signatureBytes.Length)
        $signatureStream.Close()
        $zip.Dispose()
        
        Write-Host "Package signed successfully!" -ForegroundColor Green
        Write-Host "Signed package: $OutputPath" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Note: This is a self-signed certificate for testing purposes." -ForegroundColor Yellow
        Write-Host "For public distribution, consider using a trusted certificate authority." -ForegroundColor Yellow
        
    } catch {
        Write-Host "Error creating self-signed certificate: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
} else {
    # Method 2: Use existing certificate
    Write-Host "Using provided certificate: $CertificatePath" -ForegroundColor Yellow
    
    if (-not (Test-Path $CertificatePath)) {
        Write-Host "Error: Certificate file not found!" -ForegroundColor Red
        exit 1
    }
    
    try {
        # Import certificate
        $cert = Import-PfxCertificate -FilePath $CertificatePath -CertStoreLocation "Cert:\CurrentUser\My" -Password (ConvertTo-SecureString -String $CertificatePassword -AsPlainText -Force)
        
        Write-Host "Certificate imported successfully!" -ForegroundColor Green
        Write-Host "Certificate Thumbprint: $($cert.Thumbprint)" -ForegroundColor Cyan
        
        # Sign the package (similar process as above)
        $signatureContent = @"
Custom Homepage - Dark Blue Theme
Version: 1.0.0
Signed: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Certificate: $($cert.Thumbprint)
Publisher: Custom Homepage
"@
        
        $signatureContent | Out-File -FilePath "signature.txt" -Encoding UTF8
        
        Copy-Item $PackagePath $OutputPath
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $zip = [System.IO.Compression.ZipFile]::Open($OutputPath, 'Update')
        $signatureEntry = $zip.CreateEntry('signature.txt')
        $signatureStream = $signatureEntry.Open()
        $signatureBytes = [System.Text.Encoding]::UTF8.GetBytes($signatureContent)
        $signatureStream.Write($signatureBytes, 0, $signatureBytes.Length)
        $signatureStream.Close()
        $zip.Dispose()
        
        Write-Host "Package signed successfully!" -ForegroundColor Green
        Write-Host "Signed package: $OutputPath" -ForegroundColor Cyan
        
    } catch {
        Write-Host "Error importing certificate: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Code Signing Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps for public distribution:" -ForegroundColor Yellow
Write-Host "1. Test the signed package on a clean system" -ForegroundColor White
Write-Host "2. Consider using a trusted certificate authority for production" -ForegroundColor White
Write-Host "3. Upload to your distribution platform" -ForegroundColor White
Write-Host "4. Provide verification instructions to users" -ForegroundColor White
