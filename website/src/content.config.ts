import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
  /** 'sample' shows the template-review banner; 'published' removes it */
  status: z.enum(['sample', 'draft', 'published']).default('sample'),
  sources: z.number().optional(),
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
