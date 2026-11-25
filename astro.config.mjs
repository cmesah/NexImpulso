import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import config from './src/content/sitio.json' with { type: 'json' };

export default defineConfig({
  site: config.dominio || undefined,
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
});
