@echo off
echo ========================================
echo Custom Homepage - Dark Blue Theme
echo ========================================
echo.
echo This script will help you set up your custom homepage.
echo.

REM Get the current directory
set "HOMEPAGE_DIR=%~dp0"
set "HOMEPAGE_URL=file:///%HOMEPAGE_DIR: =%%index.html"

echo Homepage directory: %HOMEPAGE_DIR%
echo Homepage URL: %HOMEPAGE_URL%
echo.

echo Choose your browser:
echo 1. Google Chrome
echo 2. Microsoft Edge
echo 3. Firefox
echo 4. Manual setup (show instructions)
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto chrome
if "%choice%"=="2" goto edge
if "%choice%"=="3" goto firefox
if "%choice%"=="4" goto manual
goto invalid

:chrome
echo.
echo Setting up for Google Chrome...
echo.
echo 1. Open Chrome and go to: chrome://settings/
echo 2. Scroll down to "On startup"
echo 3. Select "Open a specific page or set of pages"
echo 4. Click "Add a new page"
echo 5. Enter this URL: %HOMEPAGE_URL%
echo 6. Click "Add" and then "Save"
echo.
echo Your homepage is ready!
goto end

:edge
echo.
echo Setting up for Microsoft Edge...
echo.
echo 1. Open Edge and go to: edge://settings/
echo 2. Go to "Start, home, and new tabs"
echo 3. Under "Home page", select "A specific page"
echo 4. Enter this URL: %HOMEPAGE_URL%
echo 5. Click "Save"
echo.
echo Your homepage is ready!
goto end

:firefox
echo.
echo Setting up for Firefox...
echo.
echo 1. Open Firefox and go to: about:preferences#home
echo 2. Under "Homepage and new windows", select "Custom URLs"
echo 3. Enter this URL: %HOMEPAGE_URL%
echo 4. Click "Save"
echo.
echo Your homepage is ready!
goto end

:manual
echo.
echo Manual Setup Instructions:
echo.
echo 1. Open your browser's settings
echo 2. Find the "Homepage" or "Start page" setting
echo 3. Set it to: %HOMEPAGE_URL%
echo 4. Save your settings
echo.
echo Alternative: You can also open the file directly by double-clicking index.html
goto end

:invalid
echo.
echo Invalid choice. Please run the script again and choose 1-4.
goto end

:end
echo.
echo ========================================
echo Setup complete! Enjoy your new homepage.
echo ========================================
pause
