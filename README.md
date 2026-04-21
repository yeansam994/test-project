# 🎲 Dice Roller - Tabletop RPG Companion

A mobile-first web application for rolling tabletop RPG dice with beautiful pseudo-3D animations.

## Features

### Phase 1 (Current Implementation)

- ✅ **Multiple Dice Types**: Support for D4, D6, D8, D10, D12, D20, and D100
- ✅ **Configurable Dice Counts**: Select 0-20 dice of each type
- ✅ **Pseudo-3D Animations**: Smooth, performant dice rolling animations
- ✅ **Instant Results**: Immediate calculation and display of results
- ✅ **Results Breakdown**: View individual die results grouped by type
- ✅ **Mobile-First Design**: Optimized for touch interfaces
- ✅ **Progressive Web App**: Install on your device for offline use
- ✅ **Performance Optimization**: Automatic simplified animations for 10+ dice
- ✅ **Accessibility**: Keyboard navigation and screen reader support

## Quick Start

### Running Locally

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No build step required - it's pure HTML/CSS/JavaScript!

### Using a Local Server (Recommended for PWA features)

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## How to Use

1. **Select Dice**: Use the + and - buttons to choose how many of each die type you want to roll
2. **Roll**: Press the large "ROLL" button
3. **View Results**: Watch the animated dice roll and see your results
4. **Reset**: Press "Reset" to clear all dice selections

### Keyboard Shortcuts

- `R` - Roll dice
- `Space/Enter` - Roll dice (when Roll button is focused)
- `Escape` - Reset

## Project Structure

```
dice-roller/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── css/
│   ├── styles.css          # Main styles
│   ├── dice-icons.css      # Dice-specific styling
│   └── animations.css      # Animation effects
├── js/
│   ├── config.js           # Configuration
│   ├── state-manager.js    # State management
│   ├── dice-engine.js      # Dice rolling logic
│   ├── animation-engine.js # Animation controller
│   ├── ui-controller.js    # UI updates
│   ├── app.js              # Main application
│   └── pwa.js              # PWA support
├── icons/                  # PWA icons (to be created)
└── README.md              # This file
```

## Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid, Flexbox, and 3D transforms
- **Vanilla JavaScript**: No frameworks - pure ES6+
- **PWA**: Service Worker for offline functionality
- **Web Crypto API**: Cryptographically secure random number generation

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- Automatic performance detection
- Simplified animations for low-end devices
- Optimized for 60fps on most devices
- Under 2 seconds animation duration
- < 500KB total app size (without icons)

## Creating App Icons

To complete the PWA setup, create the following icon sizes in the `icons/` folder:

- icon-72.png (72x72)
- icon-96.png (96x96)
- icon-128.png (128x128)
- icon-144.png (144x144)
- icon-152.png (152x152)
- icon-192.png (192x192)
- icon-384.png (384x384)
- icon-512.png (512x512)

You can use any tool to create a simple dice icon. Here's a suggested design:
- Background: Dark blue (#1a1a2e)
- Icon: White dice symbol (🎲) or geometric dice shape
- Style: Flat design with slight shadow

## Future Enhancements (Phase 2 & 3)

### Phase 2 - Local Multiplayer
- Roll history with timestamps
- Multiple player profiles
- Shared device turn-based rolling
- Roll statistics

### Phase 3 - Online Features
- User accounts
- Cloud sync
- Real-time multiplayer
- Custom dice sets
- Game presets

## Development

### File Organization

The codebase follows a modular architecture:

1. **config.js**: Central configuration
2. **state-manager.js**: Application state (dice counts, results)
3. **dice-engine.js**: Pure logic for rolling dice
4. **animation-engine.js**: Visual animation system
5. **ui-controller.js**: DOM manipulation and events
6. **app.js**: Application lifecycle
7. **pwa.js**: Progressive Web App features

### Adding New Dice Types

To add a new dice type:

1. Edit `js/config.js`:
```javascript
diceTypes: [
    // ... existing types
    { id: 'd30', sides: 30, label: 'D30', icon: '🔷', color: '#3498db' }
]
```

2. Add CSS styling in `css/dice-icons.css`:
```css
.dice-card[data-dice="d30"] .dice-icon {
    color: #3498db;
}
```

## License

This project is free to use for personal and commercial purposes.

## Credits

Created as a tool for tabletop RPG enthusiasts.

## Support

For issues or questions:
1. Check the browser console for errors
2. Ensure you're using a modern browser
3. Try clearing cache and reloading

---

**Happy Rolling! 🎲**
