// Anteprima privata: entra solo chi apre il sito con il link d'invito (?invito=CODICE).
// Il codice si imposta su Cloudflare come segreto INVITE_CODE (Settings → Variables and Secrets).
// Per aprire il sito a tutti: togliere "main" e "run_worker_first" da wrangler.jsonc.

const COOKIE = 'ds_invito';
const DAYS = 60;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
