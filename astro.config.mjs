// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Indirizzo attuale su Cloudflare: cambiarlo quando arriva il dominio definitivo
  site: 'https://dreamspace-sito.mkbado.workers.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
