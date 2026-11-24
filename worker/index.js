// Sito aperto a tutti, ma ancora fuori dai motori di ricerca (robots.txt e X-Robots-Tag).
// Quando sarà il momento di farsi trovare su Google: cambiare NOINDEX in false.

const NOINDEX = true;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Iscrizioni alla lista d'attesa
    if (url.pathname === '/api/iscrizione') return iscrizione(request, env);
    if (url.pathname === '/api/conteggio') return conteggio(env);
    if (url.pathname === '/admin/iscritti.csv') return esporta(url, env);
    if (url.pathname === '/robots.txt' && NOINDEX) {
      return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain' } });
    }

    const asset = await env.ASSETS.fetch(request);
    if (!NOINDEX) return asset;
    const res = new Response(asset.body, asset);
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  },
};

// ---------- Lista d'attesa (database D1 "DB") ----------

const SCHEMA = `CREATE TABLE IF NOT EXISTS iscritti (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  interesse TEXT NOT NULL,
  lingua TEXT,
  creato TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (email, interesse)
)`;

const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra } });

async function leggiModulo(request) {
  const type = request.headers.get('Content-Type') || '';
  if (type.includes('application/json')) {
    const b = await request.json();
    return { email: b.email, giochi: [].concat(b.giochi || []), lingua: b.lingua, privacy: b.privacy, sito: b.sito };
  }
  const f = await request.formData();
  return { email: f.get('email'), giochi: f.getAll('giochi'), lingua: f.get('lingua'), privacy: f.get('privacy'), sito: f.get('sito') };
}

async function iscrizione(request, env) {
  if (request.method !== 'POST') return json({ ok: false, errore: 'metodo' }, 405);
  if (!env.DB) return json({ ok: false, errore: 'database' }, 503);
  const vuoleJson = (request.headers.get('Accept') || '').includes('application/json');
  let d;
  try { d = await leggiModulo(request); } catch { return json({ ok: false, errore: 'modulo' }, 400); }

  const email = String(d.email || '').trim().toLowerCase();
  const giochi = [...new Set(d.giochi.map(String).filter((x) => /^[a-z0-9-]{1,40}$/.test(x)))].slice(0, 8);
  const lingua = d.lingua === 'en' ? 'en' : 'it';
  if (d.sito) return vuoleJson ? json({ ok: true }) : indietro(request, true); // trappola per i bot
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) return json({ ok: false, errore: 'email' }, 400);
  if (!d.privacy) return json({ ok: false, errore: 'privacy' }, 400);
  if (!giochi.length) giochi.push('generale');

  await env.DB.prepare(SCHEMA).run();
  const ins = env.DB.prepare('INSERT OR IGNORE INTO iscritti (email, interesse, lingua) VALUES (?, ?, ?)');
  await env.DB.batch(giochi.map((g) => ins.bind(email, g, lingua)));
  return vuoleJson ? json({ ok: true }) : indietro(request, true);
}

function indietro(request, ok) {
  // Senza JavaScript: torna alla pagina di partenza con un segnale di conferma
  const ref = request.headers.get('Referer');
  const dest = new URL(ref || '/', request.url);
  dest.searchParams.set('iscritto', ok ? '1' : '0');
  return Response.redirect(dest.toString(), 303);
}

async function conteggio(env) {
  if (!env.DB) return json({}, 200);
  try {
    await env.DB.prepare(SCHEMA).run();
    const { results } = await env.DB.prepare('SELECT interesse, COUNT(*) AS n FROM iscritti GROUP BY interesse').all();
    const out = {};
    for (const r of results) out[r.interesse] = r.n;
    return json(out, 200, { 'Cache-Control': 'public, max-age=60' });
  } catch {
    return json({}, 200);
  }
}

async function esporta(url, env) {
  // Scarica tutte le iscrizioni in CSV: /admin/iscritti.csv?chiave=ADMIN_KEY
  const key = (env.ADMIN_KEY || '').trim();
  if (!key || url.searchParams.get('chiave') !== key) return new Response('Non autorizzato', { status: 401 });
  if (!env.DB) return new Response('Database non collegato', { status: 503 });
  await env.DB.prepare(SCHEMA).run();
  const { results } = await env.DB.prepare('SELECT email, interesse, lingua, creato FROM iscritti ORDER BY creato').all();
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = ['email,interesse,lingua,creato', ...results.map((r) => [r.email, r.interesse, r.lingua, r.creato].map(esc).join(','))].join('\n');
  return new Response('\ufeff' + csv, {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="iscritti-dreamspace.csv"', 'Cache-Control': 'no-store' },
  });
}
