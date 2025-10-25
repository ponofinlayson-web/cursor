# 🏠 Custom Homepage - Dark Blue Theme

A beautiful, modern homepage for Chromium-based browsers featuring a dark blue gradient background, Google search integration, and organized link cards.

## ✨ Features

### 🎨 **Modern Design**
- **Dark Blue Gradient**: Sophisticated slate gradient background
- **Glassmorphism Effects**: Transparent cards with backdrop blur
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Floating cards, hover effects, and transitions

### 🔍 **Google Search Integration**
- **Built-in Search**: Google search bar that opens results in new tabs
- **Minimal Interface**: Clean, transparent design that doesn't distract
- **Auto-focus**: Search bar ready to type immediately

### 📋 **Smart Card Management**
- **4x3 Grid Layout**: Organized cards with alphabetical sorting
- **Quick Link Addition**: Click anywhere on a card to add links
- **Dual Click Options**: 
  - Click main link area to navigate normally
  - Ctrl + click tooltip
- **Drag & Drop**: Reorder links within cards
- **Bulk Import**: Add multiple links at once
- **Real-time Validation**: URL validation and favicon detection

### 🛠 **Advanced Features**
- **Local Storage**: All data saved locally in your browser
- **Editable Titles**: Click card titles to rename groups
- **Delete Protection**: Confirmation dialogs for safe deletion
- **Mobile Optimized**: Touch-friendly interface for mobile devices

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
├── README.md           # This documentation
└── manifest.json       # Browser extension manifest (optional)
```

## 🎯 Usage

### **Adding Links**
- **Quick Add**: Click anywhere on a card → Enter name and URL
- **Bulk Import**: Use the "Add Card" button → Bulk Import section
- **Edit Mode**: Click the edit button on any card

### **Navigation**
- **Normal Click**: Click link text/icon to navigate
- **Background Tab**: Ctrl + click to open link - stay on page
- **Google Search**: Type in search bar and press Enter

### **Organization**
- **Alphabetical**: Cards automatically sort A-Z
- **Drag & Drop**: Reorder links within cards
- **Rename**: Click card titles to edit
- **Delete**: Use delete buttons with confirmation

## 🎨 Customization

### **Colors**
The homepage uses a sophisticated dark blue theme:
- **Background**: Slate gradient (`#0f172a → #1e293b → #334155 → #475569`)
- **Cards**: Blue-green gradients for contrast
- **Text**: White text with subtle shadows

### **Layout**
- **Grid**: 4 columns on desktop, responsive on mobile
- **Cards**: Minimum 200px height, expandable
- **Links**: Compact design with hover effects

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

## 📝 License

This project is open source and free to use, modify, and distribute.

## 🔐 Security & Signature Verification

This package is code-signed for authenticity. Always verify the signature before installation.

### **Simplest Verification Method (All OS)**

#### **For GitHub Releases:**
1. **Download from GitHub**: Go to the [Releases page](https://github.com/ponofinlayson-web/cursor/releases)
2. **Check "Verified" badge**: Look for the green "Verified" badge next to the release
3. **Download directly**: Click the download button - GitHub automatically verifies signatures

#### **For Manual Verification:**
1. **Download the package** and signature files:
   - `custom-homepage-dark-blue-v1.1.0.zip`
   - `custom-homepage-dark-blue-v1.1.0.zip.asc` (signature)
   - `custom-homepage-dark-blue-v1.1.0.zip.sha256` (checksum)

2. **Verify checksum** (works on all OS):
   ```bash
   # Windows (PowerShell)
   Get-FileHash custom-homepage-dark-blue-v1.1.0.zip -Algorithm SHA256
   
   # Mac/Linux
   shasum -a 256 custom-homepage-dark-blue-v1.1.0.zip
   
   # Compare with the .sha256 file content
   ```

3. **Verify signature** (if you have GPG):
   ```bash
   # Import GitHub's public key
   gpg --keyserver keyserver.ubuntu.com --recv-keys [KEY_ID]
   
   # Verify signature
   gpg --verify custom-homepage-dark-blue-v1.1.0.zip.asc
   ```

#### **What to Look For:**
- ✅ **GitHub "Verified" badge** - Automatic verification
- ✅ **Checksum matches** - File integrity confirmed
- ✅ **GPG signature valid** - Authenticity confirmed
- ❌ **No "Verified" badge** - Download from official source only
- ❌ **Checksum mismatch** - File may be corrupted or tampered with

#### **Trust Indicators:**
- **Green "Verified" badge** on GitHub releases
- **Matching checksums** when manually verified
- **Valid GPG signature** (if using GPG)
- **Download from official GitHub repository only**

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve the homepage!

---

**Enjoy your beautiful, functional homepage! 🎉**

---

**Author**: Pono Finlayson  
**License**: MIT  
**Version**: 1.1.0
