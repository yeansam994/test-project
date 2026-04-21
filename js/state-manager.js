// ============================================
// STATE MANAGEMENT
// Manages dice configuration and results state
// ============================================

class StateManager {
    constructor() {
        this.state = {
            diceConfig: this.initializeDiceConfig(),
            lastResults: null,
            isRolling: false,
            rollHistory: []
        };
        
        this.listeners = [];
    }

    // Initialize dice configuration with default values
    initializeDiceConfig() {
        const config = {};
        CONFIG.diceTypes.forEach(dice => {
            // Start with 1 d6 (6-sided die), 0 for others
            config[dice.id] = dice.id === 'd6' ? 1 : 0;
        });
        return config;
    }

    // Get current state
    getState() {
        return { ...this.state };
    }

    // Get dice configuration
    getDiceConfig() {
        return { ...this.state.diceConfig };
    }

    // Update dice count for a specific type
    updateDiceCount(diceType, count) {
        const newCount = Math.max(
            CONFIG.counter.min,
            Math.min(CONFIG.counter.max, count)
        );
        
        this.state.diceConfig[diceType] = newCount;
        this.notifyListeners('diceConfigChange', {
            diceType,
            count: newCount
        });
    }

    // Increment dice count
    incrementDice(diceType) {
        const currentCount = this.state.diceConfig[diceType];
        if (currentCount < CONFIG.counter.max) {
            this.updateDiceCount(diceType, currentCount + 1);
        }
    }

    // Decrement dice count
    decrementDice(diceType) {
        const currentCount = this.state.diceConfig[diceType];
        if (currentCount > CONFIG.counter.min) {
            this.updateDiceCount(diceType, currentCount - 1);
        }
    }

    // Get total number of dice selected
    getTotalDiceCount() {
        return Object.values(this.state.diceConfig).reduce((sum, count) => sum + count, 0);
    }

    // Check if any dice are selected
    hasDiceSelected() {
        return this.getTotalDiceCount() > 0;
    }

    // Set rolling state
    setRolling(isRolling) {
        this.state.isRolling = isRolling;
        this.notifyListeners('rollingStateChange', { isRolling });
    }

    // Store roll results
    setResults(results) {
        this.state.lastResults = results;
        
        // Add to history
        this.state.rollHistory.push({
            timestamp: Date.now(),
            config: { ...this.state.diceConfig },
            results: results
        });

        // Keep only last 50 rolls in history
        if (this.state.rollHistory.length > 50) {
            this.state.rollHistory.shift();
        }

        this.notifyListeners('resultsChange', { results });
    }

    // Get last results
    getLastResults() {
        return this.state.lastResults;
    }

    // Get roll history
    getRollHistory() {
        return [...this.state.rollHistory];
    }

    // Reset all dice counts
    resetDiceConfig() {
        this.state.diceConfig = this.initializeDiceConfig();
        this.notifyListeners('diceConfigReset');
    }

    // Reset everything
    resetAll() {
        this.state = {
            diceConfig: this.initializeDiceConfig(),
            lastResults: null,
            isRolling: false,
            rollHistory: []
        };
        this.notifyListeners('fullReset');
    }

    // Subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Notify all listeners of state changes
    notifyListeners(event, data) {
        this.listeners.forEach(listener => {
            try {
                listener(event, data, this.getState());
            } catch (error) {
                console.error('Error in state listener:', error);
            }
        });
    }

    // Export state as JSON
    exportState() {
        return JSON.stringify({
            diceConfig: this.state.diceConfig,
            lastResults: this.state.lastResults,
            rollHistory: this.state.rollHistory
        }, null, 2);
    }

    // Import state from JSON
    importState(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            if (imported.diceConfig) {
                this.state.diceConfig = imported.diceConfig;
            }
            if (imported.lastResults) {
                this.state.lastResults = imported.lastResults;
            }
            if (imported.rollHistory) {
                this.state.rollHistory = imported.rollHistory;
            }
            this.notifyListeners('stateImported');
            return true;
        } catch (error) {
            console.error('Failed to import state:', error);
            return false;
        }
    }
}

// Create global state manager instance
const stateManager = new StateManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StateManager;
}
