# AGENTS.md

## Project

An online guidebook for rock climbing on Pulau Tioman, Malaysia (the Dragon's Horns /
Nenek Semukut and the granite of the south coast). Goal: the canonical, free reference for
the area. Live at <https://tioman-climbing.pages.dev>.

## Content model — this is the source of truth

Every area, route and logbook entry is **one Markdown file with YAML frontmatter**:

| Collection | Path | Frontmatter carries | Body is |
|---|---|---|---|
| `areas` | `src/content/areas/<slug>.md` | key, name, aka, short, order, desc, meta pairs, images[] | the area lede |
| `routes` | `src/content/routes/<slug>.md` | area, grade, length, pitches, firstAscent, year, stars, status, kind, approach, descent, gear, warn, extra, pitchList[], logbook[], images[] | the "Character" text |
| `logbook` | `src/content/logbook/<slug>.md` | title, party, date, route, routeName, area, sourcePage, scan/scans[] | the full transcription |

Schemas: `src/content.config.ts`. Helpers (joins, grade band, length bucket): `src/lib/guidebook.ts`.
Complex frontmatter values are written as JSON-flow YAML (valid YAML) — e.g.
`pitchList: [{"n":"P1","grade":"7b",...}]`.

- `grade` keeps the route's own system (French / UK trad / YDS + aid). **Never convert.**
- Flag uncertainty inline (`[?]`, a `warn`, a `> [!NOTE]`), don't resolve it silently.
- External blog posts / films: `src/data/external-logs.ts` (just links).
- Page images: `public/figures/page-NN.jpg` (renders of the route book), `public/gallery/`
  (landing-page media), `public/logbook-scans/`.
- `guidebook/` holds the archival transcription narrative, provenance notes and the full-res
  `figures/`. The area/route detail now lives in `src/content/` — edit there.
- Legacy: `scripts/legacy/areas.ts` + `scripts/gen-content.ts` generated the collections once;
  kept for reference, not used by the build.

## The website (Astro)

- `npm run dev` (port 4321), `npm run build` → `dist/`. Static, no runtime.
- Pages in `src/pages/`; design system in `src/styles/global.css` (single light "sunlit
  paper" theme, ballpoint-blue accent, oxide-red = route lines + hazards only).
- Every route / area / log page has an **"Edit this page"** link → `/edit-help` → the GitHub
  web editor for that Markdown file.
- Deploy: Cloudflare Pages (`wrangler.toml`, `DEPLOY.md`). `npm run deploy` for manual.

## Conventions

- Conventional Commits (`feat:`, `fix:`, `docs:`, …). End commit messages with the
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` trailer.
- The PDF `dragonhorns-climb-log.pdf` (compiled by Tam Haja) is in **Git LFS**.
