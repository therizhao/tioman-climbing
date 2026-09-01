# AGENTS.md

## Project

An online guidebook for rock climbing on Pulau Tioman, Malaysia (primarily the Dragonhorns / Nenek Semukut area). Goal: turn route and crag information into a clean, browsable web guidebook.

## Source material

- `dragonhorns-climb-log.pdf` — the "Tioman Climbing Route Book" (compiled by Tam Haja; Git LFS); primary reference for routes, grades, and topos.
- `guidebook/` — the digitized, structured transcription of that PDF. Start at `guidebook/README.md`. Page-image renders in `guidebook/figures/`; logbook scans + full transcriptions in `guidebook/logbook/`.
- `WEBSITE-PLAN.md` — the original plan for the public website.

## The website (Astro)

- Astro static site. `npm run dev` (port 4321), `npm run build` → `dist/`.
- Content model: `src/data/areas.ts` (areas + routes, typed), `src/data/external-logs.ts` (external blog/video links), `src/content/logbook/*.md` (native transcribed logbook entries — each renders as its own page).
- Pages in `src/pages/`; design system in `src/styles/global.css` (single light "sunlit paper" theme, ballpoint-blue accent, oxide-red is semantic only).
- Media in `public/media/` and `public/logbook-scans/`; originals in `media/`.
- Deploys to Cloudflare Pages — see `wrangler.toml` and `.github/workflows/deploy.yml`.
- Keep `src/data/` in sync with `guidebook/` when either changes.

## Conventions

- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, etc.).
- Keep content accurate to the source material; flag uncertain grades or names with `[unclear]` / `[?]` / `> [!NOTE]` rather than guessing.
- Grades are reproduced in the source's own system (French / UK trad / YDS+aid); do not invent conversions.
