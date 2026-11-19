// Anteprima privata: entra solo chi apre il sito con il link d'invito (?invito=CODICE).
// Il codice si imposta su Cloudflare come segreto INVITE_CODE (Settings → Variables and Secrets).
// Per aprire il sito a tutti: togliere "main" e "run_worker_first" da wrangler.jsonc.

const COOKIE = 'ds_invito';
const DAYS = 60;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Iscrizioni alla lista d'attesa (sempre raggiungibili, anche senza invito)
    if (url.pathname === '/api/iscrizione') return iscrizione(request, env);
    if (url.pathname === '/api/conteggio') return conteggio(env);
    if (url.pathname === '/admin/iscritti.csv') return esporta(url, env);
    const code = (env.INVITE_CODE || '').trim();
    const cookies = (request.headers.get('Cookie') || '').split(/;\s*/);
    const invited = Boolean(code) && cookies.includes(`${COOKIE}=${encodeURIComponent(code)}`);
    const given = (url.searchParams.get('invito') || '').trim();
    const viaLink = Boolean(code) && given === code;

    if (url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain' } });
    }

    if (invited || viaLink) {
      // Serve la pagina subito (niente reindirizzamento) e salva il cookie per le pagine successive
      const asset = await env.ASSETS.fetch(request);
      const res = new Response(asset.body, asset);
      res.headers.set('X-Robots-Tag', 'noindex, nofollow');
      if (viaLink) {
        res.headers.append('Set-Cookie', `${COOKIE}=${encodeURIComponent(code)}; Path=/; Max-Age=${DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`);
        res.headers.set('Cache-Control', 'no-store');
      }
      return res;
    }

    // Messaggio di diagnosi, visibile in fondo alla pagina bloccata
    let note = '';
    if (!code) note = 'Stato: codice d’invito non ancora configurato sul server (INVITE_CODE).';
    else if (given) note = 'Stato: questo codice d’invito non è valido.';
    else note = 'Stato: nessun invito su questo browser.';

    return new Response(LOCKED.replace('{{NOTE}}', note), {
      status: 403,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' },
    });
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

const LOCKED = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Dreamspace Ltd · In arrivo</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#12163a;color:#fff4dc;font-family:system-ui,sans-serif;
    background-image:radial-gradient(#fff4dc 1px,transparent 1.5px),radial-gradient(#2ec4b6 1px,transparent 1.5px);background-size:120px 120px,210px 210px;background-position:0 0,60px 90px}
  main{max-width:520px;margin:24px;padding:32px;background:#fff4dc;color:#12163a;border:4px solid #0a0d24;box-shadow:8px 8px 0 #0a0d24}
  .logo{display:inline-block;background:#f26b1d;color:#fff4dc;font:700 22px/1 monospace;letter-spacing:3px;padding:8px 14px;border:3px solid #0a0d24;box-shadow:4px 4px 0 #0a0d24}
  h1{font:700 28px/1.15 monospace;margin:24px 0 12px}
  p{margin:0 0 10px;line-height:1.5}
  small{display:block;margin-top:18px;color:#4a4f7a}
</style>
</head>
<body>
<main>
  <span class="logo">DREAMSPACE <small style="display:inline;margin:0;color:#12163a;font-size:12px">LTD</small></span>
  <h1>Accesso riservato al personale.</h1>
  <p>Il sito della Dreamspace Ltd è in anteprima privata. Se hai ricevuto un link d'invito, aprilo di nuovo da lì.</p>
  <p lang="en">Staff only. The Dreamspace Ltd website is in private preview: open it from your invitation link.</p>
  <small>— ELIT-043, Divisione Risorse Non Umane</small>
  <small style="font-size:12px;opacity:.8">{{NOTE}}</small>
</main>
</body>
</html>`;
