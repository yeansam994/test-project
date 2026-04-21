// ============================================
// MAIN APPLICATION
// Application initialization and lifecycle
// ============================================

class DiceRollerApp {
    constructor() {
        this.initialized = false;
        this.version = '1.0.0';
    }

    // Initialize application
    async init() {
        if (this.initialized) {
            console.warn('App already initialized');
            return;
        }

        console.log(`🎲 Dice Roller v${this.version} - Initializing...`);

        try {
            // Initialize navigation controller
            navigationController.init();

            // Initialize animation engine
            animationEngine.init('diceAnimationContainer');
            animationEngine.updatePerformanceMode();

            // Initialize UI controller
            uiController.init();

            // Setup accessibility features
            this.setupAccessibility();

            // Setup performance monitoring
            this.setupPerformanceMonitoring();

            // Log device capabilities
            this.logDeviceInfo();

            this.initialized = true;
            console.log('✅ Dice Roller initialized successfully');

            // Show welcome message on first visit
            this.checkFirstVisit();

        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showFatalError('Failed to initialize application. Please refresh the page.');
        }
    }

    // Setup accessibility features
    setupAccessibility() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            // Space or Enter to roll
            if ((e.code === 'Space' || e.code === 'Enter') && e.target.id === 'rollButton') {
                e.preventDefault();
                document.getElementById('rollButton').click();
            }

            // R key to roll (when not in input)
            if (e.key === 'r' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                document.getElementById('rollButton').click();
            }

            // Escape to reset
            if (e.key === 'Escape') {
                document.getElementById('resetButton').click();
            }
        });

        // Announce results to screen readers
        stateManager.subscribe((event, data) => {
            if (event === 'resultsChange') {
                this.announceResults(data.results);
            }
        });
    }

    // Announce results to screen readers
    announceResults(results) {
        const announcement = diceEngine.generateRollSummary(results);
        
        // Create or update aria-live region
        let announcer = document.getElementById('aria-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'aria-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.position = 'absolute';
            announcer.style.left = '-10000px';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            document.body.appendChild(announcer);
        }

        announcer.textContent = announcement;
    }

    // Setup performance monitoring
    setupPerformanceMonitoring() {
        // Monitor animation performance
        let frameCount = 0;
        let lastTime = performance.now();

        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // If FPS drops below 30, enable performance mode
                if (fps < 30 && !CONFIG.ui.animationReducedMotion) {
                    console.warn(`Low FPS detected (${fps}), enabling performance mode`);
                    CONFIG.ui.animationReducedMotion = true;
                    animationEngine.updatePerformanceMode();
                }

                frameCount = 0;
                lastTime = currentTime;
            }

            if (animationEngine.isPlaying()) {
                requestAnimationFrame(checkPerformance);
            }
        };

        // Start monitoring when animation begins
        stateManager.subscribe((event) => {
            if (event === 'rollingStateChange') {
                if (stateManager.state.isRolling) {
                    requestAnimationFrame(checkPerformance);
                }
            }
        });
    }

    // Log device information
    logDeviceInfo() {
        const info = {
            userAgent: navigator.userAgent,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            devicePixelRatio: window.devicePixelRatio,
            touchSupport: DEVICE_CAPABILITIES.isTouchDevice(),
            lowEndDevice: DEVICE_CAPABILITIES.isLowEnd(),
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
            deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'unknown',
            connectionType: navigator.connection?.effectiveType || 'unknown'
        };

        console.log('📱 Device Info:', info);
    }

    // Check if this is the first visit
    checkFirstVisit() {
        const hasVisited = localStorage.getItem('dice-roller-visited');
        
        if (!hasVisited) {
            localStorage.setItem('dice-roller-visited', 'true');
            console.log('👋 Welcome to Dice Roller!');
            
            // Could show a welcome tutorial here
            // this.showWelcomeTutorial();
        }
    }

    // Show fatal error
    showFatalError(message) {
        document.body.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                padding: 2rem;
                text-align: center;
                background: var(--bg-primary);
                color: var(--text-primary);
            ">
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">⚠️</h1>
                <h2 style="margin-bottom: 1rem;">Something went wrong</h2>
                <p style="margin-bottom: 2rem; color: var(--text-secondary);">${message}</p>
                <button onclick="location.reload()" style="
                    padding: 1rem 2rem;
                    background: var(--accent-primary);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                ">Reload Page</button>
            </div>
        `;
    }

    // Get app info
    getInfo() {
        return {
            version: this.version,
            initialized: this.initialized,
            state: stateManager.getState(),
            deviceCapabilities: uiController.getUIState()
        };
    }

    // Export app state
    exportState() {
        const state = stateManager.exportState();
        const blob = new Blob([state], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `dice-roller-state-${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // Import app state
    importState(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const success = stateManager.importState(e.target.result);
            if (success) {
                console.log('✅ State imported successfully');
                uiController.renderDiceGrid();
            } else {
                console.error('❌ Failed to import state');
            }
        };
        reader.readAsText(file);
    }
}

// Create global app instance
const app = new DiceRollerApp();

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.init();
    });
} else {
    app.init();
}

// Make app available in console for debugging
window.diceRollerApp = app;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiceRollerApp;
}
