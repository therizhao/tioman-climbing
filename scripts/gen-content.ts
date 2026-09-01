/**
 * One-shot generator: turns the legacy typed data in src/data/areas.ts into
 * Markdown + frontmatter content collections (src/content/areas, src/content/routes).
 * Run once with `node scripts/gen-content.ts`, then delete src/data/areas.ts.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { areas } from "./legacy/areas.ts";

const F = (n: number) => `/figures/page-${String(n).padStart(2, "0")}.jpg`;

/** Extra guidebook figures per route slug (primary image is added from topoImage). */
const ROUTE_EXTRAS: Record<string, { n: number; caption: string }[]> = {
  "polish-princess": [
    { n: 59, caption: "The original Polish Princess topo, hand-drawn (route book source page 59)." },
    { n: 58, caption: '"Updated bolt status on Polish Princess" (route book source page 58).' },
    { n: 60, caption: "Pitch 4 variation and the Muka variation (route book source page 60)." },
  ],
  "damai-sentosa": [
    { n: 47, caption: "The Damai Sentosa topo in colour (route book source page 47)." },
    { n: 48, caption: "Neale & Sabo trip report, July 2015 (route book source page 48)." },
    { n: 49, caption: "Söldner trip report, April 2018 (route book source page 49)." },
  ],
  naga: [
    { n: 65, caption: "Naga — logbook topo, 8 pitches (route book source page 65)." },
    { n: 66, caption: "Naga — colour topo with per-pitch bolt counts (route book source page 66)." },
  ],
  "batu-naga": [
    { n: 45, caption: "Batu Naga & Tanoshi Buttress — logbook descriptions (route book source page 45)." },
  ],
  "ironin-3": [
    { n: 54, caption: "Ironin 3 — logbook page, team list and YDS pitch topo (route book source page 54)." },
    { n: 56, caption: "Ironin 3 — clean line topo with symbol legend (route book source page 56)." },
  ],
  "waking-dream": [
    { n: 51, caption: "Waking Dream — re-bolted anchor topo, pitch by pitch (route book source page 51)." },
    { n: 52, caption: "Waking Dream — anchor topo, alternate photo (route book source page 52)." },
  ],
  freebird: [
    { n: 72, caption: 'Freebird — FA topo, "Puncak Nenek Simukut, TD 6a IV 230 m" (route book source page 72).' },
    { n: 71, caption: "Freebird Direct — Izzu / Ridzuan / Raouf, June 2016 (route book source page 71)." },
  ],
  "fever-dreams": [
    { n: 21, caption: "Fever Dreams — the red line up the prominent pillar (route book source page 21)." },
    { n: 22, caption: "Fever Dreams — handwritten topo and route notes (route book source page 22)." },
  ],
  "yoga-boy": [{ n: 15, caption: "Yoga Boy — face photo showing the line (route book source page 15)." }],
  "project-grand-central": [
    { n: 17, caption: "Grand Central / Mumbar face photos (route book source page 17)." },
  ],
  "blood-sweat-and-fear": [
    { n: 24, caption: "Back view of Gunung Nenek Semukut and the pinnacle (route book source page 24)." },
  ],
  "tanoshi-buttress": [
    { n: 35, caption: "Cedar Wright photo — Batu Naga and Tanoshi Buttress (route book source page 35)." },
  ],
};

const AREA_EXTRAS: Record<string, { n: number; caption: string }[]> = {
  "south-tower": [
    { n: 28, caption: "The two towers from the air (route book source page 28)." },
    { n: 31, caption: "Typed route list and the 'both towers' photo with routes A–F (route book source page 31)." },
    { n: 38, caption: "Expanded route list with first-ascent names (route book source page 38)." },
    { n: 41, caption: "South Tower with three route lines and belay dots (route book source page 41)." },
  ],
  "north-tower": [
    { n: 35, caption: "Batu Naga (S Tower) and Tanoshi Buttress (N Tower), Cedar Wright photo (route book source page 35)." },
  ],
  "mumbar-cliff": [
    { n: 7, caption: "Annotated approach photos — red = approach trails (route book source page 7)." },
    { n: 10, caption: "Face photo with the approach line to the summit (route book source page 10)." },
  ],
  "batu-sirau": [{ n: 24, caption: "Back view of Gunung Nenek Semukut Mountain (route book source page 24)." }],
  "bagus-tower": [{ n: 27, caption: "Bagus Tower / Hippies Tonic — logbook topo (route book source page 27)." }],
  "puncak-nipah": [
    { n: 3, caption: "The island overview map, keyed A–J (route book source page 3)." },
    { n: 4, caption: 'The painted "Route Map Nipah" board (route book source page 4).' },
  ],
  "unclimbed-buttress": [{ n: 3, caption: "The master map — feature D is the Unclimbed Buttress (route book source page 3)." }],
  "juara-beach": [{ n: 76, caption: 'Field sketch — "nr Juara", ~20 numbered lines (route book source page 76).' }],
};

function yamlValue(v: unknown): string {
  return JSON.stringify(v);
}

function frontmatter(obj: Record<string, unknown>): string {
  const lines: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    lines.push(`${k}: ${yamlValue(v)}`);
  }
  return `---\n${lines.join("\n")}\n---\n`;
}

mkdirSync("src/content/areas", { recursive: true });
mkdirSync("src/content/routes", { recursive: true });

let order = 0;
for (const area of [...areas].sort((a, b) => a.order - b.order)) {
  order += 1;
  const images: { src: string; caption: string }[] = [];
  if (area.topoImage) images.push({ src: F(figNumFromLegacy(area.topoImage)), caption: area.topoCaption ?? "" });
  for (const e of AREA_EXTRAS[area.slug] ?? []) images.push({ src: F(e.n), caption: e.caption });

  const fm = frontmatter({
    key: area.key,
    name: area.name,
    aka: area.aka,
    short: area.short,
    order,
    desc: area.desc,
    meta: area.meta,
    images: images.length ? images : undefined,
    undeveloped: area.undeveloped || undefined,
    emptyNote: area.emptyNote,
  });
  writeFileSync(`src/content/areas/${area.slug}.md`, `${fm}\n${area.lede}\n`);

  let rOrder = 0;
  for (const r of area.routes) {
    rOrder += 1;
    const rImages: { src: string; caption: string }[] = [];
    if (r.topoImage) rImages.push({ src: F(figNumFromLegacy(r.topoImage)), caption: r.topoCaption ?? "" });
    for (const e of ROUTE_EXTRAS[r.slug] ?? []) rImages.push({ src: F(e.n), caption: e.caption });

    const rfm = frontmatter({
      area: area.slug,
      name: r.name,
      order: rOrder,
      grade: r.grade,
      length: r.length,
      pitches: r.pitches,
      firstAscent: r.firstAscent,
      year: r.year,
      stars: r.stars,
      status: r.status,
      kind: r.kind,
      approach: r.approach,
      descent: r.descent,
      gear: r.gear,
      warn: r.warn,
      extra: r.extra,
      pitchList: r.pitchList,
      logbook: r.logbook,
      images: rImages.length ? rImages : undefined,
    });
    writeFileSync(`src/content/routes/${r.slug}.md`, `${rfm}\n${r.summary}\n`);
  }
}

/** map a legacy /topos/foo.jpg or /route-topos/foo.jpg path back to a figure page number */
function figNumFromLegacy(path: string): number {
  const map: Record<string, number> = {
    "/route-topos/polish-princess.jpg": 36,
    "/route-topos/damai-sentosa.jpg": 46,
    "/route-topos/naga.jpg": 69,
    "/route-topos/sam-sam.jpg": 57,
    "/route-topos/batu-naga.jpg": 44,
    "/route-topos/ironin-3.jpg": 55,
    "/route-topos/waking-dream.jpg": 50,
    "/route-topos/freebird.jpg": 73,
    "/route-topos/beckwith-traver.jpg": 43,
    "/route-topos/tanoshi-buttress.jpg": 75,
    "/route-topos/fever-dreams.jpg": 23,
    "/route-topos/yoga-boy.jpg": 14,
    "/route-topos/project-grand-central.jpg": 16,
    "/route-topos/blood-sweat-and-fear.jpg": 25,
    "/route-topos/all-along-the-watchtower.jpg": 26,
    "/route-topos/hippies-tonic.jpg": 27,
    "/route-topos/green-line-route.jpg": 5,
    "/route-topos/nipah-sport-crag.jpg": 4,
    "/route-topos/wind-of-change.jpg": 74,
    "/topos/south-tower-routes.jpg": 36,
    "/topos/north-tower-tanoshi.jpg": 75,
    "/topos/mumbar-face.jpg": 6,
    "/topos/blood-sweat-and-fear.jpg": 25,
    "/topos/bagus-watchtower.jpg": 26,
    "/topos/nipah-green-line.jpg": 5,
    "/topos/puncak-anak.jpg": 74,
    "/topos/overview-map.jpg": 3,
    "/topos/juara-sketch.jpg": 76,
  };
  return map[path] ?? 3;
}

console.log("generated", areas.length, "areas and", areas.flatMap((a) => a.routes).length, "routes");
