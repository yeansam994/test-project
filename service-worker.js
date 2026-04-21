// ============================================
// SERVICE WORKER
// Handles caching and offline functionality
// ============================================

const CACHE_NAME = 'dice-roller-v1.0.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/styles.css',
    './css/dice-icons.css',
    './css/animations.css',
    './js/config.js',
    './js/dice-icons.js',
    './js/coin-svg.js',
    './js/card-svg.js',
    './js/state-manager.js',
    './js/dice-engine.js',
    './js/animation-engine.js',
    './js/ui-controller.js',
    './js/navigation.js',
    './js/app.js',
    './js/pwa.js',
    './manifest.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching app assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache the fetched resource
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // If both cache and network fail, return offline page
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background sync for future features
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);
    
    if (event.tag === 'sync-rolls') {
        // Future: Sync roll history to server
        event.waitUntil(syncRolls());
    }
});

async function syncRolls() {
    // Placeholder for future sync functionality
    console.log('[Service Worker] Syncing rolls...');
}

// Push notifications for future features
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push notification received');
    
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Dice Roller';
    const options = {
        body: data.body || 'You have a new notification',
        icon: './icons/icon-192.png',
        badge: './icons/icon-72.png',
        data: data
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // If app is already open, focus it
                for (const client of clientList) {
                    if (client.url.endsWith('/') && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Otherwise open new window
                if (clients.openWindow) {
                    return clients.openWindow('./');
                }
            })
    );
});
