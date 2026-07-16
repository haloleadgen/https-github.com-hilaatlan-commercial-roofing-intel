import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { sourcesSchema } from './data/sources';

/**
 * Content model. Adding a page = dropping a Markdown file in the right
 * folder. This is what makes the site scalable to 10,000+ pages.
 */

const related = z
  .array(
    z.object({
      title: z.string(),
      href: z.string(),
      type: z.string().optional(),
      description: z.string().optional(),
    })
  )
  .default([]);

const base = {
  title: z.string(),
  description: z.string(),
  updated: z.string().optional(),
  reviewed: z.string().default('Hila Atlan, Founder & Editor-in-Chief'),
  /** The editorial publication-status framework — see src/data/status.ts.
   *  Governs indexing, search, promotion, and which trust claims may render.
   *  'template' replaces the former 'sample'. */
  status: z
    .enum(['template', 'draft', 'technical-review', 'preliminary', 'published'])
    .default('template'),
  /** Structured citations. The displayed count is derived from this array and the
   *  visible list is rendered from it, so the two cannot drift apart. Previously a
   *  hand-typed integer that was wrong on every page that used it. */
  sources: sourcesSchema,
  takeaways: z.array(z.string()).default([]),
  related,
};

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledge' }),
  schema: z.object({
    ...base,
    /** Template variant within the Knowledge pillar */
    type: z.enum(['article', 'guide', 'comparison']).default('article'),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({
    ...base,
    term: z.string(),
    alsoKnownAs: z.array(z.string()).default([]),
  }),
});

const situations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/situations' }),
  schema: z.object({
    ...base,
    urgency: z.enum(['emergency', 'time-sensitive', 'planning']).default('planning'),
  }),
});

const roles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/roles' }),
  schema: z.object({
    ...base,
    audience: z.string(),
  }),
});

const datasets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/datasets' }),
  schema: z.object({
    ...base,
    methodologyHref: z.string().default('/about/methodology/'),
    coverage: z.string().optional(),
    sampleSize: z.string().optional(),
  }),
});

export const collections = { knowledge, glossary, situations, roles, datasets };
