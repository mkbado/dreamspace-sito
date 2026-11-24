# Dreamspace Ltd — sito web

Sito statico in [Astro](https://astro.build), in italiano e inglese.

- `src/data/catalog.ts`: tutti i giochi e le avventure, con i testi nelle due lingue
- `src/i18n/ui.ts`: le scritte dell'interfaccia (menu, pulsanti, piè di pagina)
- `public/img/`: le immagini

Comandi: `npm install`, poi `npm run dev` per provarlo in locale e `npm run build` per compilarlo in `dist/`.

Pubblicazione: Cloudflare Workers. `worker/index.js` gestisce le iscrizioni e, finché `NOINDEX` è `true`, tiene il sito fuori dai motori di ricerca. Comando di build `npm run build`, comando di deploy `npx wrangler deploy`; la configurazione è in `wrangler.jsonc`.
