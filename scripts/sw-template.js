const CACHE = 'cncalculator-__VERSION__';
const ASSETS = __ASSETS__;
self.addEventListener('install', event => {
 event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(url => new Request(url, {cache:'reload'})))));
});
// Las actualizaciones esperan al cierre de las pestañas: no se interrumpe una mezcla activa.
self.addEventListener('activate', event => {
 event.waitUntil((async () => {
  for (const key of await caches.keys()) if (key.startsWith('cncalculator-') && key !== CACHE) await caches.delete(key);
  await self.clients.claim();
 })());
});
self.addEventListener('fetch', event => {
 const {request} = event;
 const url = new URL(request.url);
 if (request.method !== 'GET' || url.origin !== self.location.origin) return;
 event.respondWith((async () => {
  const cache = await caches.open(CACHE);
  if (request.mode === 'navigate' && ['/', '/calculator', '/support', '/premium', '/blog'].includes(url.pathname.replace(/\/$/, '') || '/')) return (await cache.match('/index.html')) || fetch(request);
  const cached = await cache.match(url.pathname);
  if (!cached) return fetch(request);
  const range = request.headers.get('range');
  if (range && url.pathname.endsWith('.mp4')) {
   const bytes = await cached.arrayBuffer();
   const match = /^bytes=(\d*)-(\d*)$/.exec(range);
   if (!match || (!match[1] && !match[2])) return new Response(null,{status:416,headers:{'Content-Range':`bytes */${bytes.byteLength}`}});
   const start = match[1] ? Number(match[1]) : Math.max(0, bytes.byteLength - Number(match[2]));
   const end = match[1] && match[2] ? Math.min(Number(match[2]),bytes.byteLength-1) : bytes.byteLength-1;
   if (start > end || start >= bytes.byteLength) return new Response(null,{status:416,headers:{'Content-Range':`bytes */${bytes.byteLength}`}});
   return new Response(bytes.slice(start,end+1),{status:206,headers:{'Content-Type':'video/mp4','Content-Length':String(end-start+1),'Content-Range':`bytes ${start}-${end}/${bytes.byteLength}`,'Accept-Ranges':'bytes'}});
  }
  return cached;
 })());
});
