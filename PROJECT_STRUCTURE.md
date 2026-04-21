# Project Structure

## Overview
This document describes the complete directory structure of the Dice Roller web application.

## Directory Tree

```
dice-roller/
│
├── index.html                 # Main HTML entry point
├── manifest.json             # PWA manifest configuration
├── service-worker.js         # Service worker for offline support
├── README.md                 # Project documentation
├── PROJECT_STRUCTURE.md      # This file
├── .gitignore               # Git ignore rules
│
├── css/                      # Stylesheets
│   ├── styles.css           # Main application styles
│   ├── dice-icons.css       # Dice-specific styling
│   └── animations.css       # 3D animation effects
│
├── js/                       # JavaScript modules
│   ├── config.js            # Application configuration
│   ├── state-manager.js     # State management system
│   ├── dice-engine.js       # Dice rolling logic
│   ├── animation-engine.js  # Animation controller
│   ├── ui-controller.js     # UI updates and events
│   ├── app.js               # Main application initialization
│   └── pwa.js               # PWA support and installation
│
├── assets/                   # Static assets
│   ├── images/              # Images and graphics
│   └── fonts/               # Custom fonts (optional)
│
└── icons/                    # PWA icons
    ├── icon-72.png          # 72x72 icon
    ├── icon-96.png          # 96x96 icon
    ├── icon-128.png         # 128x128 icon
    ├── icon-144.png         # 144x144 icon
    ├── icon-152.png         # 152x152 icon
    ├── icon-192.png         # 192x192 icon
    ├── icon-384.png         # 384x384 icon
    ├── icon-512.png         # 512x512 icon
    └── README.md            # Icon creation guide
```

## File Descriptions

### Root Files

#### `index.html`
Main HTML entry point. Contains the semantic structure of the application with sections for:
- Header with app title
- Dice selection grid
- Roll button
- Results display
- Animation container

#### `manifest.json`
PWA manifest defining app metadata:
- App name and description
- Theme colors
- Icon references
- Display mode
- Shortcuts

#### `service-worker.js`
Service worker for offline functionality:
- Asset caching
- Offline support
- Update management
- Background sync (for future features)

### CSS Directory (`/css`)

#### `styles.css` (Main Styles)
- CSS variables for theming
- Layout and grid system
- Responsive design rules
- Mobile-first approach
- Button and card styles
- Results display

#### `dice-icons.css` (Dice Styling)
- Individual dice type colors
- Active state effects
- Hover animations
- Dice shape representations
- Critical hit/miss styling (d20)

#### `animations.css` (Animations)
- Pseudo-3D dice roll animations
- CSS transforms and transitions
- Performance-optimized variants
- Glow effects
- Fade animations

### JavaScript Directory (`/js`)

#### `config.js`
- Dice type definitions
- Counter limits
- Animation settings
- Performance thresholds
- Device capability detection

#### `state-manager.js`
- Application state container
- Dice configuration management
- Results storage
- Roll history
- State import/export
- Event subscription system

#### `dice-engine.js`
- Random number generation (crypto API)
- Dice rolling logic
- Results calculation
- Statistics computation
- Configuration validation

#### `animation-engine.js`
- Animation orchestration
- DOM manipulation for dice elements
- Performance mode switching
- Animation timing
- Cleanup management

#### `ui-controller.js`
- DOM element caching
- Event listener setup
- UI rendering
- State change handlers
- User interaction handling
- Results display

#### `app.js`
- Application initialization
- Module coordination
- Accessibility setup
- Performance monitoring
- Error handling
- Debug utilities

#### `pwa.js`
- Service worker registration
- Install prompt handling
- Update notifications
- Offline indicator
- App installation events

### Assets Directory (`/assets`)

Directory for static resources:
- **images/**: Graphics, backgrounds, or textures
- **fonts/**: Custom web fonts (if needed)

### Icons Directory (`/icons`)

PWA icons in multiple sizes for:
- App installation
- Home screen icons
- Splash screens
- Notification badges

## Module Dependencies

```
app.js (Entry Point)
├── config.js
├── state-manager.js
│   └── config.js
├── dice-engine.js
│   └── config.js
├── animation-engine.js
│   ├── config.js
│   └── state-manager.js
├── ui-controller.js
│   ├── config.js
│   ├── state-manager.js
│   ├── dice-engine.js
│   └── animation-engine.js
└── pwa.js
```

## Code Architecture

### Design Patterns
- **Module Pattern**: Each JS file is a self-contained module
- **Observer Pattern**: State management with subscriptions
- **Singleton Pattern**: Global instances (stateManager, diceEngine, etc.)

### Data Flow
1. User interaction → UI Controller
2. UI Controller → State Manager
3. State Manager → Notifies subscribers
4. Dice Engine → Generates results
5. Animation Engine → Displays animations
6. UI Controller → Updates display

## File Size Breakdown

Estimated sizes (uncompressed):
- HTML: ~5KB
- CSS: ~15KB
- JavaScript: ~30KB
- Manifest + Service Worker: ~5KB
- **Total Code**: ~55KB

With icons (PNG):
- Icons (8 files): ~200KB
- **Total App**: ~255KB

## Build and Deployment

### No Build Step Required
This is a vanilla HTML/CSS/JavaScript application with no build process needed.

### Deployment Options
1. **Static Hosting**: GitHub Pages, Netlify, Vercel
2. **CDN**: Cloudflare, AWS CloudFront
3. **Traditional Web Server**: Apache, Nginx
4. **Local Development**: Python http.server, Node http-server

### HTTPS Requirement
PWA features (service worker, installation) require HTTPS in production.
Local development at `localhost` works with HTTP.

## Future Expansions

Potential additions to structure:
- `/tests/` - Unit and integration tests
- `/docs/` - Additional documentation
- `/locales/` - Internationalization files
- `/themes/` - Custom color themes
- `/presets/` - Game-specific dice presets

---

**Last Updated**: April 17, 2026
