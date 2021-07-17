workbox.core.setCacheNameDetails({
  prefix: "workbox",
  suffix: "v1",
  precache: "precache",
  runtime: "runtime-cache",
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

// JS 请求: 网络优先
workbox.routing.registerRoute(
  new RegExp("index.html"),
  workbox.strategies.networkFirst({
    cacheName: "workbox:html",
  })
);

// JS 请求: 网络优先
workbox.routing.registerRoute(
  new RegExp(".*.js"),
  workbox.strategies.networkFirst({
    cacheName: "workbox:js",
  })
);

// CSS 请求: 缓存优先，同时后台更新后下次打开页面才会被页面使用
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: "workbox:css",
  })
);

// 图片请求: 缓存优先
workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: "workbox:image",
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Automatically cleanup if quota is exceeded.
        purgeOnQuotaError: true,
      }),
    ],
  })
);
