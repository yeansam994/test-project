// ============================================
// PWA SUPPORT
// Service worker registration and PWA features
// ============================================

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    // Register service worker
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
                console.log('✅ Service Worker registered:', registration);

                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New version available
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });

        // Handle service worker updates
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    });
}

// Show update notification
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideUp 0.3s ease-out;
    `;

    notification.innerHTML = `
        <span>New version available!</span>
        <button id="update-btn" style="
            background: white;
            color: var(--accent-primary);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
        ">Update</button>
        <button id="dismiss-btn" style="
            background: transparent;
            color: white;
            border: 1px solid white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
        ">Later</button>
    `;

    document.body.appendChild(notification);

    document.getElementById('update-btn').addEventListener('click', () => {
        window.location.reload();
    });

    document.getElementById('dismiss-btn').addEventListener('click', () => {
        notification.remove();
    });
}

// Install prompt handling
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    showInstallPrompt();
});

// Show install prompt
function showInstallPrompt() {
    // Check if already shown or dismissed
    if (localStorage.getItem('install-prompt-dismissed')) {
        return;
    }

    const installBanner = document.createElement('div');
    installBanner.id = 'install-banner';
    installBanner.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-tertiary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        max-width: 90%;
        animation: slideDown 0.3s ease-out;
    `;

    installBanner.innerHTML = `
        <span>📲 Install Dice Roller for quick access!</span>
        <button id="install-btn" style="
            background: var(--accent-primary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
        ">Install</button>
        <button id="dismiss-install-btn" style="
            background: transparent;
            color: var(--text-secondary);
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            font-size: 1.5rem;
        ">×</button>
    `;

    document.body.appendChild(installBanner);

    document.getElementById('install-btn').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            
            console.log(`User ${outcome} the install prompt`);
            deferredPrompt = null;
            installBanner.remove();
        }
    });

    document.getElementById('dismiss-install-btn').addEventListener('click', () => {
        localStorage.setItem('install-prompt-dismissed', 'true');
        installBanner.remove();
    });
}

// Handle successful installation
window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed successfully');
    deferredPrompt = null;
    
    // Remove install banner if present
    const banner = document.getElementById('install-banner');
    if (banner) {
        banner.remove();
    }
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%);
            opacity: 1;
        }
    }

    @keyframes slideDown {
        from {
            transform: translate(-50%, -100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Offline status indicator
window.addEventListener('online', () => {
    console.log('✅ Back online');
    hideOfflineIndicator();
});

window.addEventListener('offline', () => {
    console.log('📡 Offline mode');
    showOfflineIndicator();
});

function showOfflineIndicator() {
    let indicator = document.getElementById('offline-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'offline-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f39c12;
            color: white;
            text-align: center;
            padding: 0.5rem;
            font-size: 0.875rem;
            z-index: 9999;
        `;
        indicator.textContent = '📡 You are offline - Some features may be limited';
        document.body.appendChild(indicator);
    }
}

function hideOfflineIndicator() {
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Check initial online status
if (!navigator.onLine) {
    showOfflineIndicator();
}
