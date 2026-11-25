import site from '../content/sitio.json';
export const GET = () => new Response(
  'User-agent: *\nAllow: /\n' + (site.dominio ? 'Sitemap: ' + new URL('/sitemap.xml', site.dominio).href + '\n' : ''),
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
