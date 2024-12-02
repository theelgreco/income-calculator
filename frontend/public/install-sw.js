let CACHE_NAME = "my-cache-v0.0.1";
let urlsToCache = ["/manifest.json"];

self.addEventListener("install", function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
