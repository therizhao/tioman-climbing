# Tioman Climbing Guidebook — digitized source

This folder is a clean, structured transcription of the **"Tioman Climbing Route Book"**
(the PDF at [`../dragonhorns-climb-log.pdf`](../dragonhorns-climb-log.pdf)) — the single most
complete collection of route information that exists for rock climbing on Pulau Tioman,
Malaysia. It is the raw content layer for the online guidebook this project is building
(see [`../WEBSITE-PLAN.md`](../WEBSITE-PLAN.md)).

> **Sources & takedown.** This guidebook is compiled from many sources — see
> [`../ATTRIBUTION.md`](../ATTRIBUTION.md). If you hold copyright in anything reproduced
> here and want it credited differently or removed, contact **rizhaow@gmail.com**.

## What the source is

The PDF (76 pages, generated from `Tioman Climbing Route Book.docx`, first exported July 2023)
is itself a compilation. It mixes three kinds of material:

1. **Typed topo pages** — clean route photos with digital route lines, pitch grades and
   first-ascent captions. Compiled by **Tam Haja** (Tam Khairudin Haja), the Mukut local who
   coordinates access and is on many of the first-ascent teams. (The cover of the scan also
   carries a scribbled-out "collated by Mike Söldner" line from an earlier draft.)
2. **Photographed pages from the physical climbers' logbook** kept at Mukut. Hand-drawn
   topos and handwritten trip reports from many different parties, roughly 2010–2019
   (Kaszlikowski/Kubarska, Guillon/Gay, the Iranian "Mountains for Peace" team, Malaysian
   teams, visiting climbers, etc.).
3. **Published route data** — e.g. the Cedar Wright / *Alpinist* first-ascent notes for
   Batu Naga and Tanoshi Buttress, and David Kaszlikowski's topo photos.

## How this transcription is organized

| File | Contents |
|---|---|
| [`00-overview.md`](00-overview.md) | The island, the areas (A–J on the master map), getting there, when to go, ethics |
| [`areas/puncak-nipah.md`](areas/puncak-nipah.md) | Puncak Nipah — single-pitch sport crag + the Green Line multipitch |
| [`areas/mumbar-cliff.md`](areas/mumbar-cliff.md) | Mumbar Cliff (Kota Sirau) — Fever Dreams, Yoga Boy, Project Grand Central |
| [`areas/batu-sirau.md`](areas/batu-sirau.md) | Batu Sirau / "Mystery Pinnacle" — Blood Sweat and Fear |
| [`areas/bagus-tower.md`](areas/bagus-tower.md) | Bagus Tower — All Along the Watchtower, Hippies Tonic |
| [`areas/dragons-horns.md`](areas/dragons-horns.md) | The Dragon's Horns (Nenek Semukut) — South & North Towers, the main event |
| [`areas/puncak-anak.md`](areas/puncak-anak.md) | Puncak Anak ("Baby Dragon") — Wind of Change |
| [`areas/juara-beach.md`](areas/juara-beach.md) | Juara Beach — sea-cliff / bouldering sketch (undeveloped) |

Page images referenced from the area files live in [`figures/`](figures/) as `page-NN.jpg`
(200 dpi renders of each PDF page). Each figure caption cites the source page.

## Transcription conventions

- **Verbatim typed text** is quoted or reproduced faithfully.
- **Handwritten logbook text** is transcribed as closely as possible. Illegible words are
  marked `[unclear]`; uncertain readings are marked `[?]`.
- Route **name / grade / length / first ascent / year** in the summary tables are taken from
  the *typed* route lists (source pages 31 and 38) wherever possible — these are the most
  reliable. Where only a hand-drawn topo gives a number, it is marked *(topo)* and treated
  as approximate.
- Grades are reproduced in whatever system the source used — **French sport** (6a, 7b+),
  **UK trad** (HVS 5a, E1), or **YDS / aid** (5.10 A3, 5.12R). No conversions have been
  invented.
- Known **inconsistencies in the source** are called out in `> [!NOTE]` blocks rather than
  silently resolved.

## Known open questions (carry into the website)

- **Blood Sweat and Fear vs. "Blood Sweat and Tears"** — the overview map labels it "Tears",
  the route page and contents say "Fear". Needs a first-hand check.
- **Batu Sirau vs. Batu Naga** — the source uses "Batu Sirau" / "Batu Naga" / "Kota Sirau" /
  "Mumbar" for overlapping things. See notes in the area files.
- **Damai Sentosa pitch-by-pitch grades** — only legible from a hand-drawn topo; treat as
  approximate.
- Several first-ascent parties are recorded only by first name or with `[unclear]` surnames.
- The **Puncak Nipah** single-pitch route list is hand-lettered on a weathered painted board;
  many names and a few grades are best-effort readings.
