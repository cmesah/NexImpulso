import { isPreview } from '../lib/indexing';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const [services, articles, legal] = await Promise.all([
    getCollection('servicios'), getCollection('blog'), getCollection('legal'),
  ]);
  const paths = [
    '/', '/como-trabajamos', '/casos', '/quienes-somos', '/blog', '/contacto', '/test-madurez',
    ...services.map(item => '/servicios/' + item.id),
    ...articles.map(item => '/blog/' + item.id),
    ...legal.map(item => '/' + item.id),
  ];
  const entries = site && !isPreview ? paths.map(path => {
    const url = new URL(path, site).href.replace(/&/g, '&amp;');
    return '<url><loc>' + url + '</loc></url>';
  }).join('') : '';
  return new Response('<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entries + '</urlset>', {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
