const BUILD_ID='9A-20260824-000036';
const CACHE=`arena9-${BUILD_ID}`;
const CORE=[
  `./index.html?build=${BUILD_ID}`,
  `./mobile-demo/index.html?build=${BUILD_ID}`,
  `./manifest.webmanifest?build=${BUILD_ID}`,
  `./mobile-demo/manifest.webmanifest?build=${BUILD_ID}`,
  `./arena-ui.css?build=${BUILD_ID}`,
  `./arena-features.css?build=${BUILD_ID}`,
  `./arena-features.js?build=${BUILD_ID}`,
  `./arena-visual-9A-20260823-192255.css?build=${BUILD_ID}`,
  `./arena-revision-v11.css?build=${BUILD_ID}`,
  `./arena-revision-v11.js?build=${BUILD_ID}`,
  `./app.js?build=${BUILD_ID}`,
  `./mobile-results.js?build=${BUILD_ID}`,
  `./active-question-engine-v2.js?build=${BUILD_ID}`,
  `./data/verified-question-bank-v1.js?build=${BUILD_ID}`,
  `./data/verified-question-bank-v1-five-options.js?build=${BUILD_ID}`,
  `./data/verified-question-bank-v2-extra.js?build=${BUILD_ID}`,
  `./assets/visual-9A-20260823-192255/entry-9A-20260823-192255.png`,
  `./assets/visual-9A-20260823-192255/hero-9A-20260823-192255.png`,
  `./assets/visual-9A-20260823-192255/watermark-9A-20260823-192255.png`,
  `./assets/visual-9A-20260823-192255/icon-9A-20260823-192255-192.png`,
  `./assets/visual-9A-20260823-192255/icon-9A-20260823-192255-512.png`,
  `./assets/visual-9A-20260823-192255/icon-9A-20260823-192255-maskable-512.png`,
  `./assets/visual-9A-20260823-192255/apple-touch-9A-20260823-192255-180.png`
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('arena9-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match(`./mobile-demo/index.html?build=${BUILD_ID}`)||caches.match(`./index.html?build=${BUILD_ID}`))));});
