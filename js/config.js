// ============================================
// APPLICATION CONFIGURATION
// ============================================

const CONFIG = {
    // Dice types configuration
    diceTypes: [
        { id: 'd4', sides: 4, label: '4 Face', icon: '▲', color: '#ff6b6b' },
        { id: 'd6', sides: 6, label: '6 Face', icon: '⬛', color: '#4ecdc4' },
        { id: 'd8', sides: 8, label: '8 Face', icon: '◆', color: '#45b7d1' },
        { id: 'd10', sides: 10, label: '10 Face', icon: '⬟', color: '#96ceb4' },
        { id: 'd12', sides: 12, label: '12 Face', icon: '⬢', color: '#4ecdc4' },
        { id: 'd20', sides: 20, label: '20 Face', icon: '🎲', color: '#a29bfe' },
        { id: 'd100', sides: 100, label: '100 Face', icon: '💯', color: '#fd79a8' }
    ],

    // Counter limits
    counter: {
        min: 0,
        max: 20,
        default: 1
    },

    // Animation settings
    animation: {
        duration: 1500, // milliseconds
        simplifiedThreshold: 10, // Switch to simple animation when more than 10 dice
        staggerDelay: 50 // milliseconds between each die animation
    },

    // Performance settings
    performance: {
        lowEndDeviceThreshold: 4, // Cores or performance score
        enablePerformanceMode: true
    },

    // UI settings
    ui: {
        touchTargetMinSize: 44, // pixels (iOS/Android recommended minimum)
        animationReducedMotion: false
    }
};

// Device capability detection
const DEVICE_CAPABILITIES = {
    isLowEnd: () => {
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return true;
        }
        
        // Check hardware concurrency (CPU cores)
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= CONFIG.performance.lowEndDeviceThreshold) {
            return true;
        }
        
        // Check device memory (if available)
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            return true;
        }
        
        return false;
    },

    isTouchDevice: () => {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    },

    getScreenSize: () => {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, DEVICE_CAPABILITIES };
}
