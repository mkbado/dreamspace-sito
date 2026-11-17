// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Cambiare con il dominio definitivo quando sarà scelto
  site: 'https://dreamspace.example',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
