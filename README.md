# Dreamspace Ltd — sito web

Sito statico in [Astro](https://astro.build), in italiano e inglese.

- `src/data/catalog.ts`: tutti i giochi e le avventure, con i testi nelle due lingue
- `src/i18n/ui.ts`: le scritte dell'interfaccia (menu, pulsanti, piè di pagina)
- `public/img/`: le immagini

Comandi: `npm install`, poi `npm run dev` per provarlo in locale e `npm run build` per compilarlo in `dist/`.

Pubblicazione: Cloudflare Workers. Finché il sito è in anteprima privata, `worker/index.js` fa entrare solo chi apre il link con `?invito=CODICE` (segreto `INVITE_CODE` su Cloudflare). Comando di build `npm run build`, comando di deploy `npx wrangler deploy`; la configurazione è in `wrangler.jsonc`.
