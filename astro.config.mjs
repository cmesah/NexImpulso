import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import config from './src/content/sitio.json' with { type: 'json' };

const production = !process.env.CONTEXT || process.env.CONTEXT === 'production';
const domain = process.env.SITE_URL || config.dominio || (production ? process.env.URL : undefined);

export default defineConfig({
  site: domain || undefined,
  redirects: { '/sobre-mi': '/quienes-somos', '/como-trabajo': '/como-trabajamos' },
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
});
