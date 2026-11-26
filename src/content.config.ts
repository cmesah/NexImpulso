import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const pair = z.tuple([z.string(), z.string()]);
const seo = z.object({ title: z.string(), description: z.string() });
const page = seo.extend({ hero: z.string() });

export const collections = {
  servicios: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/servicios' }),
    schema: seo.extend({
      hero: z.string(), step: z.string(), phase: z.string(), icon: z.string(),
      name: z.string(), intro: z.string(), cta: z.string(),
      summary: z.array(z.string()), symptoms: z.array(z.string()), work: z.array(pair), uses: z.array(z.string()),
      results: z.array(z.string()), tech: z.array(z.string()), faq: z.array(pair),
    }),
  }),
  paginas: defineCollection({
    loader: glob({ pattern: '{como-trabajamos,quienes-somos}.md', base: './src/content' }),
    schema: page.extend({
      intro: z.string(), mision: z.string().optional(), steps: z.array(pair).optional(),
    }),
  }),
  casos: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/casos' }),
    schema: seo.extend({
      metric: z.string(), metricLabel: z.string(), quote: z.string(), attribution: z.string(),
    }),
  }),
  blog: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog' }), schema: seo }),
  legal: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/legal' }), schema: page }),
};
