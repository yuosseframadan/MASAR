const CACHE = "masar-shell-v3";
const SHELL = ["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./icon.svg","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",event=>{const req=event.request;if(req.method!=="GET"||new URL(req.url).origin!==location.origin)return;event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res}).catch(()=>caches.match("./index.html"))))});
self.addEventListener("notificationclick",event=>{event.notification.close();event.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(clients=>{for(const client of clients){if("focus"in client)return client.focus()}return self.clients.openWindow("./")}))});
