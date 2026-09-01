import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Native logbook entries — full transcriptions of the handwritten pages
 * photographed for the route book. Each renders as its own page.
 * External blog posts and films are in `src/data/external-logs.ts`.
 */
const logbook = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/logbook" }),
  schema: z.object({
    title: z.string(),
    party: z.string(),
    date: z.string(),
    /** route slug this entry belongs to (see src/data/areas.ts) */
    route: z.string(),
    routeName: z.string(),
    area: z.string(),
    /** page number in dragonhorns-climb-log.pdf */
    sourcePage: z.number(),
    /** scan filename in /public/logbook-scans/ */
    scan: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { logbook };
