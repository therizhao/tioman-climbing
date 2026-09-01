# Tioman Climbing Guidebook

An open, community-maintained rock climbing guidebook for **Pulau Tioman**, Malaysia — the
Dragon's Horns (Gunung Nenek Semukut) and the other granite of the south coast.

- **Live site:** https://tioman-climbing.pages.dev
- **Contribute:** open a PR, or email **rizhaow@gmail.com** (see [`/contribute`](https://tioman-climbing.pages.dev/contribute))

> Compiled from many sources — the Mukut climbers' logbook, the Tioman Climbing Route Book
> compiled by Tam Haja, expedition reports, and photos by the first-ascent teams. Parts
> were transcribed with the help of AI, so **errors are possible** — corrections welcome.
> See [`ATTRIBUTION.md`](ATTRIBUTION.md).

## Repository layout

| Path | What |
|---|---|
| `src/` | The Astro website |
| `src/data/areas.ts` | Areas + routes (typed model the site renders from) |
| `src/data/external-logs.ts` | External trip reports and films |
| `src/content/logbook/` | Native, transcribed logbook entries (one page each) |
| `guidebook/` | Human-readable transcription of the route book + page scans |
| `dragonhorns-climb-log.pdf` | The source route book (compiled by Tam Haja; stored in Git LFS) |
| `media/` | Original photos and videos |
| `WEBSITE-PLAN.md` | Design and roadmap notes |

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
```

## Deploy

Static output in `dist/`, hosted on Cloudflare Pages at
<https://tioman-climbing.pages.dev>. See [`DEPLOY.md`](DEPLOY.md) — either connect
the repo in the Cloudflare dashboard (no secrets), or add a `CLOUDFLARE_API_TOKEN`
secret for the GitHub Action. Manual: `npm run deploy`.

The `dragonhorns-climb-log.pdf` source scan is stored in **Git LFS**.
