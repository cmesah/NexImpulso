import { isPreview } from '../lib/indexing';
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => new Response(
  'User-agent: *\nAllow: /\n' +
    (site && !isPreview ? 'Sitemap: ' + new URL('/sitemap.xml', site).href + '\n' : ''),
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
