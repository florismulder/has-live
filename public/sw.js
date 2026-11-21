// HAS Live: de app opent ook zonder internet. De pagina komt uit het geheugen van de iPad
// en wordt op de achtergrond ververst. De gegevens (/api/...) komen nooit uit dit geheugen.
const V = "has-live-v1";
const SHELL = ["/", "/index.html", "/icon.png", "/manifest.webmanifest"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== location.origin || u.pathname.startsWith("/api/")) return;
  e.respondWith(caches.open(V).then(async (c) => {
    const hit = (await c.match(r, { ignoreSearch: true })) || (r.mode === "navigate" ? await c.match("/index.html") : null);
    const net = fetch(r).then((res) => { if (res && res.ok) c.put(r, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    return (await net) || new Response("Geen verbinding", { status: 503 });
  }));
});
