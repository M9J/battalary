// Files to cache
const cacheName = 'battalary-v1';
const appShellFiles = [
  '/battalary/index.html',
  '/battalary/app.js',
  '/battalary/style.css',
  '/battalary/favicon.png',
  '/battalary/icons/icon-32.png',
  '/battalary/icons/icon-64.png',
  '/battalary/icons/icon-96.png',
  '/battalary/icons/icon-128.png',
  '/battalary/icons/icon-168.png',
  '/battalary/icons/icon-192.png',
  '/battalary/icons/icon-256.png',
  '/battalary/icons/icon-512.png',
];
const contentToCache = appShellFiles;

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
