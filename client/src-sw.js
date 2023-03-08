const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { StaleWhileRevalidate } = require('workbox-strategies');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
    cacheName: 'page-cache',
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200],
        }),
        new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
    ],
});

warmStrategyCache({
    urls: ['/index.html', '/'],
    strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

/* ------------------------------ IMPLEMENT ASSET CACHING ----------------------------- */
registerRoute(
    // This is a callback function that filters the requests we want to cache. Here we
    // want to cache js and css files
    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    new StaleWhileRevalidate({
        // names the cache storage
        cacheName: 'asset-cache',
        plugins: [
            // This plugin will cache responses with the headers ( statuses of 0, 200)
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            // cache expires after 30 days
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, 
            }),
        ],
    })
);
