# 🏠 Grouped Links - Modern Homepage Organizer

A beautiful, modern homepage for Chromium-based browsers featuring a dark blue gradient background, Google search integration, theme customization, and organized link groups.

## ✨ Features

### 🎨 **Modern Design**
- **Dark Blue Gradient**: Sophisticated slate gradient background
- **Theme Customization**: Switch between multiple built-in themes (Dark Blue, Ocean Blue, Sunset, Forest Green, Minimal Light, Modern Dark)
- **Glassmorphism Effects**: Transparent cards with backdrop blur
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Floating cards, hover effects, and transitions

### 🔍 **Google Search Integration**
- **Built-in Search**: Google search bar that opens results in new tabs
- **Minimal Interface**: Clean, transparent design that doesn't distract
- **Auto-focus**: Search bar ready to type immediately

### 📋 **Smart Card Management**
- **4x3 Grid Layout**: Organized cards with alphabetical sorting
- **Easy Link Addition**: Click the "+" button in any card's title bar to add links
- **Form-Based Editing**: Clean modal forms for adding and editing links
- **Group Management**: Change a link's group via dropdown in the edit form
- **New Group Creation**: Add new card groups with the "+ Add Card" button
- **Dual Navigation Options**: 
  - **Click**: Navigate to link normally
  - **Ctrl + Click**: Open link in new tab and stay on homepage (tooltip shows "Ctrl + click to open - stay")
- **Bulk Import**: Add multiple links at once
- **Real-time Validation**: URL validation and dynamic favicon detection

### 🛠 **Advanced Features**
- **Local Storage**: All data saved locally in your browser
- **Editable Titles**: Click card titles to rename groups
- **Delete Protection**: Confirmation dialogs for safe deletion
- **Mobile Optimized**: Touch-friendly interface for mobile devices
- **Theme Switcher**: Button in top-right corner to change themes

## 🚀 Installation

### Method 1: Direct File Setup (Recommended)

1. **Download Files**: Save all files to a folder (e.g., `custom-homepage/`)
2. **Open `index.html`**: Double-click to open in your browser
3. **Set as Homepage**: 
   - **Chrome**: Settings → On startup → Open a specific page → Add page → Enter file path
   - **Edge**: Settings → Start, home, and new tabs → New tab page → Custom → Enter file path
   - **Firefox**: Settings → Home → Homepage → Enter file path

### Method 2: Local Web Server

1. **Install Python** (if not already installed)
2. **Navigate to folder**: `cd /path/to/custom-homepage/`
3. **Start server**: 
   - Python 3: `python -m http.server 8000`
   - Python 2: `python -m SimpleHTTPServer 8000`
4. **Open browser**: Go to `http://localhost:8000`
5. **Set as homepage**: Use `http://localhost:8000` as your homepage URL

### Method 3: Browser Extension (Advanced)

1. **Enable Developer Mode**: Chrome/Edge → Extensions → Developer mode
2. **Load Unpacked**: Select the folder containing the files
3. **Pin Extension**: Pin the extension to your toolbar
4. **Set Homepage**: Use the extension's popup as your homepage

## 📁 File Structure

```
custom-homepage/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
├── manifest.json       # Browser extension manifest (optional)
├── themes/             # Theme CSS files
│   ├── default.css
│   ├── minimal-light.css
│   ├── ocean-blue.css
│   ├── sunset.css
│   ├── forest-green.css
│   └── modern-dark.css
└── README.md           # This documentation
```

## 🎯 Usage

### **Adding New Groups (Cards)**
1. Click the "+" button next to the search bar
2. Enter a group name (e.g., "Work", "Personal", "Development")
3. Add links using the form fields
4. Click "Save Card"

### **Adding Links**
- **To Existing Group**: Click the "+" button in the card's title bar
- **Form-Based**: Enter link name and URL in the modal form
- **Favicon Auto-Detection**: Favicons appear automatically based on the URL
- **Bulk Import**: Use the "Bulk Import" button in the "Add Card" modal

### **Editing Links**
1. Click the edit button (⋮) on any link
2. Edit the name or URL
3. **Change Group**: Use the "Change Group" dropdown to move the link to a different card
4. Click "Save" to apply changes
5. **Delete**: Click "Delete Link" button in the edit form

### **Navigation**
- **Normal Click**: Click link text/icon to navigate
- **Ctrl + Click**: Open link in background tab and stay on homepage (tooltip will show "Ctrl + click to open - stay")
- **Google Search**: Type in search bar and press Enter

### **Changing Themes**
1. Click the theme button (⋮) in the top-right corner
2. Select a theme from the modal
3. Theme is saved and persists across sessions

### **Organization**
- **Alphabetical**: Cards automatically sort A-Z
- **Rename**: Click card titles to edit
- **Delete**: Use delete buttons with confirmation
- **Move Links**: Change a link's group via the edit form dropdown

## 🎨 Themes

The homepage comes with six built-in themes:

1. **Default** - Original dark blue gradient (recommended)
2. **Ocean Blue** - Bright blue tones
3. **Sunset** - Warm orange and pink tones
4. **Forest Green** - Natural green tones
5. **Minimal Light** - Clean light theme
6. **Modern Dark** - Modern dark theme

## 🔧 Technical Details

### **Dependencies**
- **Font Awesome**: Icons for links and buttons
- **Animate.css**: Smooth animations
- **AOS**: Animate On Scroll effects
- **Hover.css**: Interactive hover effects
- **Particles.js**: Background particle effects

### **Browser Support**
- ✅ Chrome 80+
- ✅ Edge 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Mobile browsers

### **Storage**
- **Local Storage**: All data stored in browser's localStorage
- **No Server**: Completely client-side, no data sent anywhere
- **Privacy**: All data stays on your device
- **Theme Persistence**: Selected theme is saved to localStorage

## 🐛 Troubleshooting

### **Links Not Working**
- Ensure URLs include `https://` or `http://`
- Check that the URL is valid and accessible

### **Styling Issues**
- Clear browser cache and reload
- Check that all CSS files are in the same folder

### **Search Not Working**
- Ensure you have internet connection
- Check that popup blockers aren't blocking new tabs

### **Theme Not Loading**
- Check that the `themes/` folder is in the same directory as `index.html`
- Clear browser cache and reload

## 📝 License

This project is open source and free to use, modify, and distribute.

## 🔐 Security & Signature Verification

This package is code-signed for authenticity. Always verify the signature before installation.

### **Simplest Verification Method (All OS)**

#### **For GitHub Releases:**
1. **Download from GitHub**: Go to the [Releases page](https://github.com/ponofinlayson/grouped-links/releases)
2. **Check "Verified" badge**: Look for the green "Verified" badge next to the release
3. **Download directly**: Click the download button - GitHub automatically verifies signatures

#### **For Manual Verification:**
1. **Download the package** and signature files:
   - `grouped-links-v1.2.x.zip`
   - `grouped-links-v1.2.x.zip.sha256` (checksum)

2. **Verify checksum** (works on all OS):
   ```bash
   # Windows (PowerShell)
   Get-FileHash grouped-links-v1.2.x.zip -Algorithm SHA256
   
   # Mac/Linux
   shasum -a 256 grouped-links-v1.2.x.zip
   
   # Compare with the .sha256 file content
   ```

#### **What to Look For:**
- ✅ **GitHub "Verified" badge** - Automatic verification
- ✅ **Checksum matches** - File integrity confirmed
- ❌ **No "Verified" badge** - Download from official source only
- ❌ **Checksum mismatch** - File may be corrupted or tampered with

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the homepage!

---

**Enjoy your beautiful, functional homepage! 🎉**

---

**Author**: Pono Finlayson  
**License**: MIT  
**Version**: 1.2.12
