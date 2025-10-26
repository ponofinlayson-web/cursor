# Release Notes - Version 1.2.0

## 🎉 Major Features

### ✨ Dynamic Favicon Support
- **Real Website Favicons**: Automatically fetches and displays actual favicons from websites using Google's favicon service
- **Transparent Background**: Favicons display with transparent backgrounds for a clean look
- **Fallback Icons**: Falls back to Font Awesome icons if favicon fails to load
- **Smart Detection**: Automatically detects domain and fetches appropriate favicon

### 🎨 Theme Selector
- **6 Beautiful Themes**: Choose from Default, Minimal Light, Ocean Blue, Sunset, Forest Green, and Modern Dark
- **Persistent Selection**: Your theme choice is saved and persists across sessions
- **Easy Access**: Subtle theme toggle button in the top-right corner
- **Theme-Specific Colors**: Each theme has carefully crafted color schemes

### 🔧 Enhanced Edit Experience
- **Vertical Ellipsis Button**: Subtle edit button (⋮) positioned in top-right of each link
- **Space Efficient**: Takes minimal space, leaving more room for link names and favicons
- **Edit Modal**: Comprehensive edit form with name, URL, and group selection
- **Delete Protection**: Confirmation required before deleting links

### 🎯 Improved Link Management
- **Group Switching**: Move links between groups via dropdown in edit modal
- **Real-time Validation**: URL validation with helpful error messages
- **Keyboard Navigation**: Full keyboard support (Enter, Escape, Tab)
- **Form-based Adding**: Consistent modal experience for adding and editing links

## 🎨 UI/UX Improvements

- **Centered Google Search**: Search bar centered for better visual balance
- **Subtle Add Card Button**: Icon-only button that's less intrusive
- **Optimized Layout**: Perfect 80/20 split for link content vs edit button
- **Transparent Favicons**: Clean, professional appearance

## 🐛 Bug Fixes

- Fixed favicon loading for new links
- Improved edit button visibility and positioning
- Better event handling for dynamically created elements
- Enhanced modal escape key behavior

## 📦 Technical Changes

- Updated to version 1.2.0
- Added dynamic favicon fetching using `getFaviconUrl()` method
- Implemented theme system with localStorage persistence
- Refactored link item layout for better space utilization
- Improved CSS organization and theme support

## 🚀 Installation & Usage

See [README.md](README.md) for full installation instructions.

## 💡 Tips

1. **Theme Customization**: Click the ⋮ button in the top-right to change themes
2. **Edit Links**: Click the ⋮ on any link to edit or move it between groups
3. **Transparent Favicons**: Favicons now display cleanly without white backgrounds
4. **Keyboard Shortcuts**: Use Enter to save, Escape to cancel in all modals

---

**Version**: 1.2.0  
**Release Date**: January 26, 2025  
**Author**: Pono Finlayson
