import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const image = z.object({ src: z.string(), caption: z.string().default("") });

/**
 * Areas. Frontmatter carries all the display config; the body is the lede prose.
 * Edit these on GitHub — see /edit-help.
 */
const areas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/areas" }),
  schema: z.object({
    key: z.string(),
    name: z.string(),
    aka: z.string(),
    short: z.string(),
    order: z.number().default(99),
    desc: z.string(),
    meta: z.array(z.tuple([z.string(), z.string()])).default([]),
    images: z.array(image).default([]),
    undeveloped: z.boolean().default(false),
    emptyNote: z.string().optional(),
  }),
});

/**
 * Routes. One file per route; the body is the "Character" prose.
 * `area` is the area slug this route belongs to. `grade` keeps its own system
 * (French / UK / YDS+aid) — no conversions.
 */
const routes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/routes" }),
  schema: z.object({
    area: z.string(),
    name: z.string(),
    order: z.number().default(99),
    grade: z.string(),
    length: z.string(),
    pitches: z.number().nullable().default(null),
    firstAscent: z.string().default("—"),
    year: z.union([z.number(), z.string()]).default("—"),
    stars: z.number().nullable().default(null),
    status: z.string().optional(),
    kind: z.enum(["climb", "via-ferrata"]).default("climb"),
    approach: z.string().optional(),
    descent: z.string().optional(),
    gear: z.string().optional(),
    warn: z.string().optional(),
    extra: z.object({ title: z.string(), body: z.string() }).optional(),
    pitchList: z
      .array(
        z.object({
          n: z.string(),
          grade: z.string(),
          length: z.string().default("—"),
          note: z.string().optional(),
          crux: z.boolean().optional(),
        }),
      )
      .optional(),
    logbook: z.array(z.string()).optional(),
    images: z.array(image).default([]),
  }),
});

/**
 * Logbook entries. Two kinds share one folder and schema:
 *  - transcriptions of handwritten pages — each gets its own page beside the scan;
 *  - external trip reports — a report, article or film on the author's own site.
 *    These carry `link` and just link out; they have no local page.
 */
const logbook = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/logbook" }),
  schema: z.object({
    title: z.string(),
    party: z.string().default(""),
    date: z.string().default(""),
    route: z.string().default(""),
    routeName: z.string().default(""),
    area: z.string().default(""),
    sourcePage: z.number().default(0),
    scan: z.string().default(""),
    scans: z.array(z.object({ src: z.string(), caption: z.string().default("") })).default([]),
    order: z.number().default(5),
    /** External report: presence of a link marks the entry as hosted elsewhere. */
    link: z.string().url().optional(),
    linkType: z.enum(["article", "video"]).default("article"),
    source: z.string().default(""),
    author: z.string().default(""),
  }),
});

export const collections = { areas, routes, logbook };
