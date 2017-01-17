var cacheName = 'weatherPWA-v1';
var filesToCache = [
  '/progressive_web_app',
  '/progressive_web_app/index.html',
  '/progressive_web_app/scripts/app.js',
  '/progressive_web_app/scripts/localforage-1.4.0.js',
  '/progressive_web_app/styles/ud811.css',
  '/progressive_web_app/images/clear.png',
  '/progressive_web_app/images/cloudy-scattered-showers.png',
  '/progressive_web_app/images/cloudy.png',
  '/progressive_web_app/images/fog.png',
  '/progressive_web_app/images/ic_add_white_24px.svg',
  '/progressive_web_app/images/ic_refresh_white_24px.svg',
  '/progressive_web_app/images/partly-cloudy.png',
  '/progressive_web_app/images/rain.png',
  '/progressive_web_app/images/scattered-showers.png',
  '/progressive_web_app/images/sleet.png',
  '/progressive_web_app/images/snow.png',
  '/progressive_web_app/images/thunderstorm.png',
  '/progressive_web_app/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keylist) {
      return Promise.all(keyList.map(function(key) {
        if (key == cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);

        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
