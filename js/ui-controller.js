// ============================================
// UI CONTROLLER
// Manages UI updates and user interactions
// ============================================

class UIController {
    constructor() {
        this.elements = {};
        this.initialized = false;
    }

    // Initialize UI controller
    init() {
        if (this.initialized) return;

        // Cache DOM elements
        this.cacheElements();

        // Setup event listeners
        this.setupEventListeners();

        // Render initial UI
        this.renderDiceGrid();
        this.updateRollButton();

        // Subscribe to state changes
        stateManager.subscribe((event, data, state) => {
            this.handleStateChange(event, data, state);
        });

        this.initialized = true;
    }

    // Cache frequently accessed DOM elements
    cacheElements() {
        this.elements = {
            diceGrid: document.getElementById('diceGrid'),
            rollButton: document.getElementById('rollButton'),
            resetButton: document.getElementById('resetButton'),
            historyButton: document.getElementById('historyButton'),
            resultsContainer: document.getElementById('resultsContainer'),
            emptyState: document.getElementById('emptyState'),
            historyModal: document.getElementById('historyModal'),
            historyBody: document.getElementById('historyBody'),
            closeHistoryButton: document.getElementById('closeHistoryButton'),
            clearHistoryButton: document.getElementById('clearHistoryButton')
        };
    }

    // Setup event listeners
    setupEventListeners() {
        // Roll button
        this.elements.rollButton.addEventListener('click', () => {
            this.handleRollClick();
        });

        // Reset button
        this.elements.resetButton.addEventListener('click', () => {
            this.handleResetClick();
        });

        // History button
        this.elements.historyButton.addEventListener('click', () => {
            this.openHistoryModal();
        });

        // Close history button
        this.elements.closeHistoryButton.addEventListener('click', () => {
            this.closeHistoryModal();
        });

        // Clear history button
        this.elements.clearHistoryButton.addEventListener('click', () => {
            this.handleClearHistory();
        });

        // Close modal on background click
        this.elements.historyModal.addEventListener('click', (e) => {
            if (e.target === this.elements.historyModal) {
                this.closeHistoryModal();
            }
        });

        // Responsive updates
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // Render dice selection grid
    renderDiceGrid() {
        this.elements.diceGrid.innerHTML = '';

        CONFIG.diceTypes.forEach(diceType => {
            const card = this.createDiceCard(diceType);
            this.elements.diceGrid.appendChild(card);
        });
    }

    // Create individual dice card
    createDiceCard(diceType) {
        const count = stateManager.getDiceConfig()[diceType.id];
        
        const card = document.createElement('div');
        card.className = 'dice-card';
        card.setAttribute('data-dice', diceType.id);
        
        if (count > 0) {
            card.classList.add('active');
        }

        card.innerHTML = `
            <div class="dice-icon">${DiceIcons.getSVG(diceType.id)}</div>
            <div class="dice-label">${diceType.label}</div>
            <div class="dice-counter">
                <button class="counter-btn decrement" data-dice="${diceType.id}" aria-label="Decrease ${diceType.label}">−</button>
                <div class="counter-display" data-dice="${diceType.id}">${count}</div>
                <button class="counter-btn increment" data-dice="${diceType.id}" aria-label="Increase ${diceType.label}">+</button>
            </div>
        `;

        // Add event listeners to counter buttons
        const decrementBtn = card.querySelector('.counter-btn.decrement');
        const incrementBtn = card.querySelector('.counter-btn.increment');

        decrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            stateManager.decrementDice(diceType.id);
        });

        incrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            stateManager.incrementDice(diceType.id);
        });

        return card;
    }

    // Update dice card display
    updateDiceCard(diceType) {
        const card = document.querySelector(`.dice-card[data-dice="${diceType}"]`);
        if (!card) return;

        const count = stateManager.getDiceConfig()[diceType];
        const display = card.querySelector('.counter-display');
        
        if (display) {
            display.textContent = count;
        }

        // Update active state
        if (count > 0) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }

        // Update button states
        const decrementBtn = card.querySelector('.counter-btn.decrement');
        const incrementBtn = card.querySelector('.counter-btn.increment');

        if (decrementBtn) {
            decrementBtn.disabled = count <= CONFIG.counter.min;
        }
        if (incrementBtn) {
            incrementBtn.disabled = count >= CONFIG.counter.max;
        }
    }

    // Handle roll button click
    async handleRollClick() {
        if (stateManager.state.isRolling) {
            return;
        }

        const diceConfig = stateManager.getDiceConfig();
        
        // Validate configuration
        const validation = diceEngine.validateConfig(diceConfig);
        if (!validation.isValid) {
            this.showError('Please select at least one die to roll!');
            return;
        }

        // Disable roll button
        stateManager.setRolling(true);
        this.updateRollButton();

        // Roll dice
        const results = diceEngine.rollDiceConfig(diceConfig);
        
        // Play animation
        await animationEngine.playRollAnimation(results);

        // Store results
        stateManager.setResults(results);

        // Display results
        this.displayResults(results);

        // Re-enable roll button
        stateManager.setRolling(false);
        this.updateRollButton();
    }

    // Handle reset button click
    handleResetClick() {
        if (confirm('Reset all dice counts?')) {
            stateManager.resetDiceConfig();
            this.clearResults();
        }
    }

    // Display roll results
    displayResults(results) {
        this.elements.resultsContainer.innerHTML = '';

        // Hide empty state
        if (this.elements.emptyState) {
            this.elements.emptyState.style.display = 'none';
        }

        // Display total
        const totalDiv = document.createElement('div');
        totalDiv.className = 'total-result';
        totalDiv.innerHTML = `
            <div class="total-label">Total</div>
            <div class="total-value">${results.total}</div>
        `;
        this.elements.resultsContainer.appendChild(totalDiv);

        // Display individual dice results with dropdowns
        Object.entries(results.rolls).forEach(([diceId, data]) => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'dice-results-group';
            groupDiv.setAttribute('data-dice', diceId);

            const header = document.createElement('div');
            header.className = 'dice-results-header';
            header.innerHTML = `
                <span class="dropdown-arrow">▶</span>
                <span>${data.count} × ${data.label} = ${data.subtotal}</span>
            `;
            groupDiv.appendChild(header);

            const resultsDiv = document.createElement('div');
            resultsDiv.className = 'individual-results collapsed';

            data.rolls.forEach((roll, index) => {
                const dieDiv = document.createElement('div');
                dieDiv.className = 'die-result';
                dieDiv.setAttribute('data-dice', diceId);
                dieDiv.setAttribute('data-value', roll);
                dieDiv.textContent = roll;
                dieDiv.style.animationDelay = `${index * 0.05}s`;
                resultsDiv.appendChild(dieDiv);
            });

            groupDiv.appendChild(resultsDiv);

            // Add click handler for dropdown toggle
            header.addEventListener('click', () => {
                const arrow = header.querySelector('.dropdown-arrow');
                if (resultsDiv.classList.contains('collapsed')) {
                    resultsDiv.classList.remove('collapsed');
                    arrow.textContent = '▼';
                } else {
                    resultsDiv.classList.add('collapsed');
                    arrow.textContent = '▶';
                }
            });

            this.elements.resultsContainer.appendChild(groupDiv);
        });
    }

    // Clear results display
    clearResults() {
        this.elements.resultsContainer.innerHTML = '';
        
        // Show empty state
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.id = 'emptyState';
        emptyState.innerHTML = '<p>🎲 Select dice below and press ROLL to get started!</p>';
        this.elements.resultsContainer.appendChild(emptyState);
        this.elements.emptyState = emptyState;
    }

    // Update roll button state
    updateRollButton() {
        const hasDice = stateManager.hasDiceSelected();
        const isRolling = stateManager.state.isRolling;

        this.elements.rollButton.disabled = !hasDice || isRolling;

        if (isRolling) {
            this.elements.rollButton.querySelector('.roll-text').textContent = 'ROLLING...';
        } else {
            this.elements.rollButton.querySelector('.roll-text').textContent = 'ROLL';
        }
    }

    // Show error message
    showError(message) {
        // Simple alert for now - could be enhanced with custom modal
        alert(message);
    }

    // Handle state changes
    handleStateChange(event, data, state) {
        switch (event) {
            case 'diceConfigChange':
                this.updateDiceCard(data.diceType);
                this.updateRollButton();
                break;

            case 'diceConfigReset':
                this.renderDiceGrid();
                this.updateRollButton();
                break;

            case 'rollingStateChange':
                this.updateRollButton();
                break;

            case 'resultsChange':
                // Results display is handled in handleRollClick
                break;

            case 'fullReset':
                this.renderDiceGrid();
                this.clearResults();
                this.updateRollButton();
                break;
        }
    }

    // Handle window resize
    handleResize() {
        // Update any responsive elements if needed
        animationEngine.updatePerformanceMode();
    }

    // Open history modal
    openHistoryModal() {
        this.renderHistory();
        this.elements.historyModal.classList.add('active');
    }

    // Close history modal
    closeHistoryModal() {
        this.elements.historyModal.classList.remove('active');
    }

    // Render history items
    renderHistory() {
        const history = stateManager.getRollHistory();
        this.elements.historyBody.innerHTML = '';

        if (history.length === 0) {
            this.elements.historyBody.innerHTML = '<div class="history-empty">No rolls yet. Start rolling to see your history!</div>';
            return;
        }

        // Reverse to show newest first
        history.reverse().forEach((entry, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';

            const timestamp = new Date(entry.timestamp);
            const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Build config string with proper spacing
            const configParts = [];
            Object.entries(entry.config).forEach(([diceId, count]) => {
                if (count > 0) {
                    const diceType = CONFIG.diceTypes.find(d => d.id === diceId);
                    configParts.push(`${count} ${diceType.label}`);
                }
            });

            item.textContent = `Total: ${entry.results.total} | ${configParts.join(', ')} | ${timeString}`;

            this.elements.historyBody.appendChild(item);
        });
    }

    // Handle clear history
    handleClearHistory() {
        if (confirm('Clear all roll history?')) {
            stateManager.state.rollHistory = [];
            this.renderHistory();
        }
    }

    // Get current UI state
    getUIState() {
        return {
            screenSize: DEVICE_CAPABILITIES.getScreenSize(),
            isTouch: DEVICE_CAPABILITIES.isTouchDevice(),
            isLowEnd: DEVICE_CAPABILITIES.isLowEnd()
        };
    }
}

// Create global UI controller instance
const uiController = new UIController();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIController;
}
