Site: https://yeansam994.github.io/test-project/
# 🎲 Tabletop Gaming Companion

A mobile-first web application featuring multiple gaming utilities including dice rolling, coin tossing, and card games with beautiful animations.

## Features

### 🎲 Dice Roller
- ✅ **Multiple Dice Types**: Support for D4, D6, D8, D10, D12, D20, and D100
- ✅ **Configurable Dice Counts**: Select 0-20 dice of each type
- ✅ **Pseudo-3D Animations**: Smooth, performant dice rolling animations
- ✅ **Instant Results**: Immediate calculation and display of results
- ✅ **Results Breakdown**: View individual die results grouped by type
- ✅ **Performance Optimization**: Automatic simplified animations for 10+ dice

### 🪙 Coin Tosser
- ✅ **Professional SVG Coins**: High-quality gold (heads) and silver (tails) coin designs
- ✅ **Smooth Flip Animation**: Realistic coin flipping effect
- ✅ **Instant Results**: Clear display of heads or tails outcome
- ✅ **Touch-Optimized**: Easy one-tap coin tossing

### 🃏 Card Game (Higher or Lower)
- ✅ **Full 54-Card Deck**: Complete poker deck with 52 cards + 2 Jokers
- ✅ **Professional Card Designs**: Beautiful SVG playing cards with all suits (♥♦♣♠)
- ✅ **Joker Cards**: Special wild cards that grant automatic wins
- ✅ **Smooth Animations**: Card flip and shake effects
- ✅ **Score Tracking**: Keep track of your winning streak
- ✅ **Strategic Gameplay**: Guess if the mystery card is higher or lower
- ✅ **Continuous Play**: Correct guesses continue the game with the revealed card

### 📱 General Features
- ✅ **Multi-Feature Navigation**: Easy burger menu to switch between features
- ✅ **Mobile-First Design**: Optimized for touch interfaces
- ✅ **Progressive Web App**: Install on your device for offline use
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

### 🎲 Dice Roller
1. **Select Dice**: Use the + and - buttons to choose how many of each die type you want to roll
2. **Roll**: Press the large "ROLL" button
3. **View Results**: Watch the animated dice roll and see your results
4. **Reset**: Press "Reset" to clear all dice selections

**Keyboard Shortcuts:**
- `R` - Roll dice
- `Space/Enter` - Roll dice (when Roll button is focused)
- `Escape` - Reset

### 🪙 Coin Tosser
1. **Toss Coin**: Tap the "TOSS COIN" button
2. **View Result**: Watch the coin flip animation
3. **Result Display**: See if you got Heads (gold) or Tails (silver)

### 🃏 Card Game
1. **Understand the Game**: One card is visible, one is face-down (mystery card)
2. **Make Your Guess**: Press "▲ HIGHER" or "▼ LOWER" to guess if the mystery card has a higher or lower value
3. **Watch the Reveal**: The mystery card flips over to reveal the result
4. **Score Points**: Correct guesses earn points and let you continue playing
5. **Joker Bonus**: If you reveal a Joker (★), you automatically win that round!
6. **Continue or Restart**: Keep playing to build your streak, or press "🔄 New Game" to start fresh

**Card Values:**
- Ace = 1, 2-10 = face value, Jack = 11, Queen = 12, King = 13
- Jokers = automatic win (bypass higher/lower rules)

### 🍔 Navigation
- Tap the burger menu icon (☰) in the top-left corner
- Select your desired feature from the menu
- Press the × to close the menu

## Project Structure

```
tabletop-companion/
├── index.html              # Main HTML file with all features
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── css/
│   ├── styles.css          # Main styles and all feature styling
│   ├── dice-icons.css      # Dice-specific styling
│   └── animations.css      # Animation effects
├── js/
│   ├── config.js           # Configuration
│   ├── state-manager.js    # State management
│   ├── dice-engine.js      # Dice rolling logic
│   ├── animation-engine.js # Animation controller
│   ├── ui-controller.js    # UI updates
│   ├── app.js              # Main application
│   ├── pwa.js              # PWA support
│   ├── navigation.js       # Navigation controller & feature logic
│   ├── coin-svg.js         # Coin SVG designs
│   └── card-svg.js         # Playing card SVG designs
├── icons/                  # PWA icons
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

## Future Enhancements

### Potential Features
- 📊 **Statistics Dashboard**: Track your dice rolls, coin tosses, and card game wins
- 🏆 **Achievements**: Unlock badges for milestones
- 🎨 **Themes**: Customizable color schemes and card designs
- 💾 **Save History**: View past rolls and game results
- 👥 **Multiplayer Mode**: Share games with friends
- 🎮 **More Games**: Blackjack, poker hand evaluator, etc.

## Development

### File Organization

The codebase follows a modular architecture:

1. **config.js**: Central configuration
2. **state-manager.js**: Application state (dice counts, results)
3. **dice-engine.js**: Pure logic for rolling dice
4. **animation-engine.js**: Visual animation system
5. **ui-controller.js**: DOM manipulation and events
6. **app.js**: Application lifecycle and dice roller initialization
7. **navigation.js**: Multi-feature navigation and coin tosser/card game logic
8. **coin-svg.js**: SVG designs for heads and tails coins
9. **card-svg.js**: SVG designs for all 54 playing cards
10. **pwa.js**: Progressive Web App features

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

**Happy Gaming! 🎲🪙🃏**
