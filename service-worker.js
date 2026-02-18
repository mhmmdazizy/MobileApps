const CACHE_NAME = 'pro-app-v2'; // Ganti versi
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './icon.png',
    'https://unpkg.com/feather-icons' // Cache library ikon
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => res || fetch(e.request))
    );
});
