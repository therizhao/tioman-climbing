# Tioman Climbing Guidebook — website plan

## Goal

Make **tiomanclimbing.com** (or similar) the **canonical, free, online guidebook** for rock
climbing on Pulau Tioman — so that a climber anywhere in the world can find, in one place:
what's here, how good it is, how to get to it, and what to expect. Success looks like:

1. It's the **first result** for "Tioman climbing", "Dragon's Horns climbing", "Nenek
   Semukut route", etc.
2. Visiting climbers **actually use it to plan and climb** trips (including offline, on the
   trail, with no signal).
3. The local community (Mukut, Malaysian climbers, visiting FA teams) **trusts it and feeds
   it** — it replaces the scattered logbook / blog / forum knowledge, and the physical
   logbook culture continues *through* the site.

## What we're starting from

- [`guidebook/`](guidebook/) — the digitized route book: 1 overview + 7 area files + 76 page
  images. This is the seed content and it is **enough to launch**.
- [`dragonhorns-climb-log.pdf`](dragonhorns-climb-log.pdf) — the source, compiled by Mike
  Söldner from the Mukut logbook, expedition reports and published FA notes.

### Gaps to close before/around launch

| Gap | Action |
|---|---|
| Topo images are 200 dpi PDF renders — fine for reference, not for a hero guidebook | Source **high-res originals** from FA photographers (Kaszlikowski/Vertical Vision, Cedar Wright, Söldner, the Malaysian teams). Where impossible, take new photos or re-draw. |
| Photo **rights** — many topos are watermarked pro photos | Ship a clear compilation notice + takedown contact from day one (see [Attribution & takedown](#attribution--takedown)). In parallel, pursue explicit permission and credit; replace with community/commissioned photos where owners prefer. Track credit + licence per image. |
| **Content licence** unset | Propose **CC BY-SA 4.0** for text + our own topo line-art; credit every contributor and FA team. Get Mike Söldner's blessing as original compiler. |
| Missing routes / data | Muka has no topo; Beckwith–Traver year conflict; Damai Sentosa pitch grades only from a sketch; "Blood Sweat and Fear/Tears" name; Puncak Nipah sport list is a best-effort read. Flag all as "needs verification" on the site and crowdsource fixes. |
| GPS / map data | Collect real coordinates for crags, trailheads, checkpoints (CP4–CP9), base camps. The PDF has GPS-track screenshots but no data. |

## Recommended stack

**Astro + content collections, deployed static to Cloudflare Pages (or Netlify).**

Why:

- **Content-first**: routes/areas live as Markdown/MDX with typed frontmatter (Zod schema).
  Prose stays readable; structured fields drive filters, the map, and a future API.
- **Fast + SEO**: ships zero JS by default, pre-rendered HTML, great Lighthouse/SEO, trivial
  to get structured data (JSON-LD) right.
- **Islands** for the few interactive bits (map, filter panel, topo viewer) without a
  full SPA.
- **Offline**: add a PWA service worker (`@vite-pwa/astro`) so an area + its topos can be
  cached for the trail. This is a real requirement — Mukut has no reliable signal.
- **Free hosting**, Git-based, cheap to run forever.

Images: `astro:assets` / Sharp for responsive `webp`/`avif`; topos served as **zoomable**
(a lightweight pan-zoom island). Long-term, render route lines as **SVG overlays** on clean
base photos — theme-able, crisp at any zoom, and editable without Photoshop.

Search: **Pagefind** (static, no server). Map: **MapLibre GL** + a self-hosted or free
raster/vector basemap; markers for areas, trailheads, checkpoints; GPX download per approach.

## Content model

```
Area        slug, name, aka[], region, latlng, access summary, seasons, hazards, body(md)
Route       slug, area, name, aka[], grade{system,value}, grade_alt[],
            length_m, pitches, style[trad|sport|aid|mixed|multipitch],
            first_ascent{people[], date, notes}, ffa{...},
            gear, descent, quality (stars, sourced), status[established|project|unverified],
            topos[image + credit + licence], pitch_table[], links[], body(md)
TripReport  route, party[], date, source(page/url), body(md)     ← the "logbook" lives on
Person      name, aka[]  (for FA credits, contributor pages)
```

Migrating [`guidebook/`](guidebook/) into this is mostly mechanical — the area files are
already structured this way.

## Site structure

- `/` — what/why, the hero shot, "plan a trip" CTA, area cards, latest updates
- `/areas/` → `/areas/dragons-horns/` → `/areas/dragons-horns/polish-princess/`
- `/routes/` — the **filterable index**: grade, style, length, pitches, quality, status
- `/map/` — interactive overview; every area/trailhead/checkpoint; GPX downloads
- `/plan/` — getting to Tioman, getting to Mukut, when to go, accommodation & guides
  (Uncle Sam / Tam / Simukut Hillview), permits, ethics, safety, gear
- `/logbook/` — trip reports, newest first; "add yours"
- `/contribute/` — how to submit corrections, reports, new routes, photos; the licence
- `/about/` — provenance, credits to Söldner + every FA team + photographers, disclaimer
- `/attribution/` — the compilation notice, per-source credits, and the takedown contact

## Attribution & takedown

The site must state plainly, on every page, that it is a **community compilation from many
sources**, and give a direct route to have material corrected or removed. This is both the
right thing to do by the people whose work this is, and the practical answer to the photo-
rights gap while permissions are still being gathered.

**Standing notice** (site footer, on every page — link "Sources & takedown" → `/attribution/`):

> This guidebook is compiled from many sources, including the Mukut climbers' logbook,
> the Tioman Climbing Route Book compiled by Mike Söldner, expedition reports, and
> photographs by the first-ascent teams. We credit authors and photographers wherever we
> can. **If you hold copyright in anything here and wish to be credited differently or have
> it taken down, contact rizhaow@gmail.com** and we will act promptly.

Implementation notes:

- Footer partial in the base layout → appears on every page, including route pages.
- Full version lives at `/attribution/`, mirroring [`ATTRIBUTION.md`](ATTRIBUTION.md);
  keep the two in sync (ideally the page renders that file directly).
- **Per-image credit**: the `topos[]` field carries `credit` and `licence`; render the
  credit as a visible caption under every topo/photo, not just in metadata.
- **Per-page provenance**: each route page cites its source (logbook page, report, or
  contributor) so a reader can trace any claim.
- `mailto:rizhaow@gmail.com` on `/attribution/` and `/contribute/` so a takedown request
  never depends on someone having a GitHub account.

## Contribution workflow

The logbook is community-maintained; the site must be too.

1. **Low-friction**: a form (`/contribute`) that opens a **pre-filled GitHub issue** (via
   issue template) — no account-juggling, works from a phone. Categories: correction,
   trip report, new route, photo offer.
2. **Structured**: maintainers convert accepted issues into content PRs. Every route page
   has an "improve this page" link straight to its source file.
3. **For the technical**: direct PRs against `guidebook/`-derived content.
4. **Attribution**: contributors listed on `/about` and in route `first_ascent` / report
   `party` fields.
5. **Moderation**: maintainer review before publish; grades/quality always cite a source.

## Roadmap

**Phase 0 — foundations (done / in progress)**
- [x] Digitize the route book into structured Markdown (`guidebook/`)
- [x] Write the compilation notice + takedown contact ([`ATTRIBUTION.md`](ATTRIBUTION.md))
- [ ] Decide licence; contact Mike Söldner and key FA photographers
- [ ] Register domain

**Phase 1 — MVP launch**
- [ ] Astro scaffold, content schema, migrate `guidebook/` → collections
- [ ] Area + route + trip-report pages; route filter index; Pagefind search
- [ ] Overview map with areas + trailheads + CP markers
- [ ] `/plan`, `/contribute` and `/attribution` pages; GitHub issue templates
- [ ] Footer compilation notice + takedown link on every page; per-image credit captions
- [ ] SEO: titles, descriptions, JSON-LD, sitemap, OG images; submit to Search Console
- [ ] Deploy to Cloudflare Pages

**Phase 2 — make it trip-usable**
- [ ] PWA / offline: cache an area + its topos for the trail
- [ ] Zoomable topos; begin SVG route-line overlays for the marquee routes
- [ ] GPX tracks for each approach; downloadable area PDF
- [ ] High-res topo replacement as permissions land

**Phase 3 — grow & entrench**
- [ ] Malay (`ms`) translation of core pages
- [ ] Partner with Mukut lodges / Malaysian climbing community; link from their channels
- [ ] Embed the "Scaling Dragons" film and other media; interviews with FA teams
- [ ] "Conditions & access" notices (monsoon, trail state, closures)
- [ ] Optional read-only JSON API for other apps (e.g. thecrag / Mountain Project imports)

## Risks / open questions

- **Photo rights** are the critical path for a *good-looking* launch — start outreach now.
  The compilation notice + takedown contact is the interim answer, not a substitute for
  permission on the marquee images.
- **Safety liability**: these are serious, runout, loose routes. Prominent disclaimer;
  don't soften the hazard language from the trip reports.
- **Access sensitivity**: confirm with the Mukut community that publishing detailed
  approaches (and the checkpoint system) is welcome — it almost certainly is, but ask.
- **Grade confidence**: be honest. Show grade source and a "verified / unverified" flag
  rather than laundering a sketch into an authoritative number.
- **Name canonicalization**: settle Batu Sirau / Batu Naga / Kota Sirau / Mumbar and
  "Blood Sweat and Fear/Tears" with someone who's been there.
