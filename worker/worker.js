// Super Liguilla 2.0 · Cloudflare Worker (quiniela.protectsoft.com.mx)
// Sirve la página (App.html / App2.html desde Apps Script), las imágenes de /img y reenvía /api al motor en Google.
export default {
  async fetch(q, e, c) {
    const u = new URL(q.url);
    const X = 'https://script.google.com/macros/s/AKfycbzeebx1LC0Odx8Md2EMG6GuXQy34wS6WUBhGrCkm6jSYOlHK-62VNHmOgBrExXaDefM/exec';
    if (u.pathname === '/api') {
      if (q.method !== 'POST') return new Response('', { status: 405 });
      const r = await fetch(X, { method: 'POST', body: await q.text(), headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
      return new Response(await r.text(), { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
    }
    const m = {
      '/': ['app', 'text/html; charset=utf-8'],
      '/beta': ['app2', 'text/html; charset=utf-8'],
      '/icon.svg': ['icon', 'image/svg+xml'],
      '/manifest.webmanifest': ['manifest', 'application/manifest+json']
    }[u.pathname];
    if (!m) return Response.redirect(u.origin + '/', 302);
    const k = new Request(u.origin + '/__' + m[0]);
    let s = u.searchParams.has('fresh') ? null : await caches.default.match(k);
    if (!s) {
      const r = await fetch(X + '?raw=' + m[0]);
      const t = await r.text();
      if (!r.ok || (m[0].indexOf('app') === 0 && t.indexOf('vLogin') < 0)) return new Response('No se pudo cargar la quiniela. Intenta de nuevo.', { status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      s = new Response(t, { headers: { 'Content-Type': m[1], 'Cache-Control': 'public, max-age=' + (m[0] === 'app2' ? '30' : '300') } });
      c.waitUntil(caches.default.put(k, s.clone()));
    }
    return s;
  }
};
