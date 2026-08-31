# AGENTS.md

## Project

An online guidebook for rock climbing on Pulau Tioman, Malaysia (primarily the Dragonhorns / Nenek Semukut area). Goal: turn route and crag information into a clean, browsable web guidebook.

## Source material

- `dragonhorns-climb-log.pdf` — the "Tioman Climbing Route Book" (compiled by Mike Söldner); primary reference for routes, grades, and topos.
- `guidebook/` — the digitized, structured transcription of that PDF. Start at `guidebook/README.md`. Page-image renders live in `guidebook/figures/`.
- `WEBSITE-PLAN.md` — the plan for turning `guidebook/` into the public website.

## Conventions

- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, etc.).
- Keep content accurate to the source material; flag uncertain grades or names with `[unclear]` / `[?]` / `> [!NOTE]` rather than guessing.
- Grades are reproduced in the source's own system (French / UK trad / YDS+aid); do not invent conversions.
