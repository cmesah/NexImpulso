import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import config from './src/content/sitio.json' with { type: 'json' };

export default defineConfig(({ command, mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const preview = command === 'dev' || Boolean(env.CONTEXT && env.CONTEXT !== 'production');
  const domain = env.SITE_URL || config.dominio || (!preview ? env.URL : undefined);
  return {
    site: domain || undefined,
    redirects: { '/sobre-mi': '/quienes-somos', '/como-trabajo': '/como-trabajamos' },
    trailingSlash: 'ignore',
    vite: { plugins: [tailwindcss()] },
  };
});
