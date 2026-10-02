const cacheName = "RUG-Nanocar Explainer-1.1";
const contentToCache = [
    "Build/64620ab52f409a8ae302942e753a7d70.loader.js",
    "Build/533b6ffaa5603f307ef1468222751b1d.framework.js",
    "Build/e95a2ce860056e47aa031eacf4e4c9bc.data",
    "Build/603ef837984ebcf5016324a23767b93e.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
