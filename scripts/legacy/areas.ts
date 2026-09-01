/**
 * The guidebook's structured model of areas and routes.
 *
 * Source of record is the human-readable Markdown in `guidebook/` (transcribed from
 * `dragonhorns-climb-log.pdf`). This file is the typed model the site renders from;
 * keep the two in sync when either changes.
 *
 * Grades are reproduced in whatever system the source used (French sport, UK trad,
 * YDS + aid). Nothing is converted. Uncertain data is flagged with `status` / `warn`.
 */

export type Pitch = {
  n: string;
  grade: string;
  length: string;
  note?: string;
  crux?: boolean;
};

export type Route = {
  slug: string;
  name: string;
  grade: string;
  length: string;
  pitches: number | null;
  firstAscent: string;
  year: string | number;
  stars: number | null;
  /** short lead paragraph */
  summary: string;
  approach?: string;
  descent?: string;
  gear?: string;
  /** hazard / uncertainty callout, may contain inline HTML */
  warn?: string;
  extra?: { title: string; body: string };
  pitchList?: Pitch[];
  /** slugs of native logbook entries (see src/content/logbook) */
  logbook?: string[];
  /** short badge shown when the route is not a normal established climb */
  status?: string;
  /** set for the North Tower via ferrata so it renders in its own group */
  kind?: "climb" | "via-ferrata";
  /** guidebook topo image for this route */
  topoImage?: string;
  topoCaption?: string;
};

export type Area = {
  slug: string;
  /** master-map key (A–J) */
  key: string;
  name: string;
  aka: string;
  short: string;
  desc: string;
  lede: string;
  meta: [string, string][];
  order: number;
  /** guidebook topo/overview image shown on the area page */
  topoImage?: string;
  topoCaption?: string;
  routes: Route[];
  undeveloped?: boolean;
  emptyNote?: string;
};

export const areas: Area[] = [
  {
    slug: "south-tower",
    key: "H",
    name: "Dragon's Horns — South Tower",
    aka: "Gunung Nenek Semukut",
    short: "South Tower",
    order: 1,
    topoImage: "/topos/south-tower-routes.jpg",
    topoCaption:
      "South Tower routes A–E, with the Polish Princess pitch topo at right. From the route book (David Kaszlikowski photo).",
    desc: "The main event. Big-wall aid, hard free, and jungle pitches to a summit block called The Wart.",
    lede: "The higher, left-hand fang above Kampung Mukut, and the most climbed piece of rock on the island. Ten routes span thirty years of first ascents — a 2000 aid line, Czech and Polish free climbing, an Iranian big wall, and Malaysian bolted multipitch.",
    meta: [
      ["Approach", "CP5 or CP7 from Mukut, 1–2 h"],
      ["Aspect", "South and south-west"],
      ["Height", "up to 400 m"],
      ["Best", "Mar–Apr, Aug — before 1 pm"],
    ],
    routes: [
      {
        slug: "polish-princess",
        topoImage: "/route-topos/polish-princess.jpg",
        topoCaption:
          "Polish Princess and the neighbouring South Tower lines. David Kaszlikowski photo with the pitch topo at right (route book source page 36).",
        name: "Polish Princess",
        grade: "7b+",
        length: "270 m",
        pitches: 8,
        firstAscent: "Eliza Kubarska & David Kaszlikowski",
        year: 2011,
        stars: 5,
        summary:
          "The first fully prepared free line to the South Tower summit. Uses Sam Sam as its approach and shares belay R3 with the 2010 Czech route — crossed by accident during the first ascent.",
        approach: "Tanjung Inn → CP7, then left — 10 min",
        descent: "Abseil the line, 1 × 70 m",
        gear: "Full rack of cams to BD #4 plus medium nuts. A 60 m rope climbs it; 70 m makes the abseils cleaner.",
        warn: "<strong>Loose rock.</strong> On one descent a rope dislodged a block that hit a party member — hospital trip. Anchors are still partly one bolt plus old tat. Helmets, careful rope management, vigilance.",
        extra: {
          title: "Bolt status · updated",
          body: '<span class="mono">P1</span> 2× thaitanium &nbsp; <span class="mono">P2</span> 1× SS 316 + 2× thaitanium &nbsp; <span class="mono">P3</span> 1× SS 316 + 1× thaitanium + 1 drilled hole',
        },
        pitchList: [
          { n: "P8", grade: "IV", length: "25 m", note: "Jungle climbing to the top, nice boulder" },
          { n: "P7", grade: "6c", length: "25 m", note: "Great pillar, easy to protect" },
          { n: "P6", grade: "6a+", length: "35 m" },
          { n: "P5", grade: "6a", length: "25 m" },
          { n: "P4", grade: "7a", length: "40 m", note: "Great pillar — climb the right side of the edge" },
          { n: "P3", grade: "6b", length: "35 m", note: "Run-out slab, easy. Extra pro 2 m above the second bolt" },
          { n: "P2", grade: "6c", length: "30 m", note: "Big separated boulder 4 m above the belay" },
          { n: "P1", grade: "7b", length: "45 m", note: "Overhanging. Worth splitting in two — watch rope drag", crux: true },
        ],
        logbook: ["polish-princess-knippe"],
      },
      {
        slug: "damai-sentosa",
        topoImage: "/route-topos/damai-sentosa.jpg",
        topoCaption:
          "The hand-drawn Damai Sentosa topo, photographed from the Mukut logbook (source page 46).",
        name: "Damai Sentosa",
        grade: "6c+",
        length: "280 m",
        pitches: 7,
        firstAscent: "Stéphanie Bodet, David Kaszlikowski, Dan Liu Yong, Arnaud Petit, Tam Khairudin Haja",
        year: 2013,
        stars: 5,
        summary:
          "A great steep climb on compact rock, almost all bolted, up the south-west pillar. Seven pitches to a tough summit scramble. The most repeated hard route on the tower and the one that has seen the most anchor upgrading.",
        approach: "Tanjung → Simukut hill trail → CP5, then left — 1–2 h",
        descent: "Abseil the line — about 2 h",
        gear: "60 m ropes (50 m should be OK). Max 10 bolts per pitch. Small cams 0.2–2; nothing needed above P3 until the last pitch.",
        pitchList: [
          { n: "top", grade: "scramble", length: "—", note: "Tough scramble to the summit — no grade" },
          { n: "P7", grade: "6b", length: "—", note: "Harder than the 6b+ pitch below — the sketchy one" },
          { n: "P6", grade: "6b+", length: "—" },
          { n: "P5", grade: "6c+", length: "—", note: "Crux well bolted", crux: true },
          { n: "P4", grade: "6c", length: "—", note: "Mental crux — big runouts, easy climbing" },
          { n: "P3", grade: "6c+", length: "—", note: "Crux well bolted; the 8a variation branches here", crux: true },
          { n: "P2", grade: "6b+", length: "—" },
          { n: "P1", grade: "6a+", length: "—", note: "Tree-climb start; the right start is harder" },
        ],
        logbook: ["damai-sentosa-soldner", "damai-sentosa-neale-sabo"],
      },
      {
        slug: "naga",
        topoImage: "/route-topos/naga.jpg",
        topoCaption:
          "Naga — photo topo, the purple line with belay stations (route book source page 69).",
        name: "Naga",
        grade: "6b+",
        length: "270 m",
        pitches: 8,
        firstAscent: "Fizi Ishak, Aril Hasril, Dorge @ Apek Langit Biru, Da Liu (Liu Yong)",
        year: 2017,
        stars: 4,
        summary:
          "“The Dragon”. Possibly the first locally bolted multipitch on the island with a Chinese climber on the team. A straight line, mostly bolted face climbing with cracks and trees left natural. Visible from CP9.",
        approach: "Hillview Lodge → CP7, then left and up. Start at a tree marked “BC”",
        descent: "Walk the summit trail / abseil the line",
        gear: "1 set of cams, 10 alpine draws, 1 × 70 m or 2 × 50 m ropes, 2 L water each.",
        warn: "<strong>Loose rock on pitches 3 and 4.</strong> Flagged by both the first and second ascent parties.",
        pitchList: [
          { n: "P8", grade: "5b–5c", length: "—", note: "Technical scramble into the upper jungle, then the trail" },
          { n: "P7", grade: "6a", length: "—" },
          { n: "P6", grade: "6b+", length: "—", note: "Crux — committing mantle, long runout to the anchor", crux: true },
          { n: "P5", grade: "6a+", length: "—", note: "Bushy ground with a big tree" },
          { n: "P4", grade: "6a", length: "—", note: "Loose rock" },
          { n: "P3", grade: "6a+", length: "—", note: "Bolt line right of a dirty crack; loose rock" },
          { n: "P2", grade: "5c", length: "—", note: "Easy climbing rightwards, then straight up" },
          { n: "P1", grade: "6a", length: "—", note: "Small crack; first bolt 5 m up, then the overhang" },
        ],
        logbook: ["naga-first-ascent"],
      },
      {
        slug: "sam-sam",
        topoImage: "/route-topos/sam-sam.jpg",
        topoCaption:
          "The hand-drawn Sam Sam topo from the logbook (source page 57).",
        name: "Sam Sam",
        grade: "7b",
        length: "300 m",
        pitches: 8,
        firstAscent: "Eliza Kubarska & David Kaszlikowski",
        year: 2010,
        stars: 4,
        summary:
          "For a time the fastest free line to the top of the South Tower. Later adopted as the approach for Polish Princess. Climbed over two days with a bivouac on the summit.",
        approach: "CP7, then left — shares the Polish Princess start",
        descent: "Abseil; Czech rap anchors on the line",
        gear: "Rack of cams and nuts, 60 m ropes.",
        warn: "<strong>Jungle finish.</strong> The upper jungle section has no anchors installed — climb as high as possible before belaying.",
        pitchList: [
          { n: "P8", grade: "III", length: "—", note: "Jungle to the top" },
          { n: "P7", grade: "III", length: "—" },
          { n: "P6", grade: "VI", length: "—" },
          { n: "P5", grade: "V", length: "60 m" },
          { n: "P4", grade: "VI", length: "55 m", note: "Past the black roof" },
          { n: "P3", grade: "VI+", length: "55 m" },
          { n: "P2", grade: "6b+", length: "—" },
          { n: "P1", grade: "6c", length: "—", note: "Overhang, loose stone low down", crux: true },
        ],
      },
      {
        slug: "batu-naga",
        topoImage: "/route-topos/batu-naga.jpg",
        topoCaption:
          "Batu Naga (“Stone Dragon”). David Kaszlikowski photo, route book source page 44.",
        name: "Batu Naga",
        grade: "5.12a",
        length: "300 m",
        pitches: 8,
        firstAscent: "Cedar Wright & Lucho Rivera",
        year: 2011,
        stars: 4,
        summary:
          "“Stone Dragon”, up the south-facing white buttress. Serious: given 5.12R, with long runouts on easier ground.",
        approach:
          "CP5, take the left trail to the wall, then left along the base past an old basecamp with a water jug and lantern",
        descent: "Scramble left then right up a gully to the summit ridge trail",
        gear: "Single set of cams to #3 Camalot, extra thin, 10+ slings, stoppers, 6 quickdraws, 2 ropes.",
        warn: "<strong>Be prepared for long runouts</strong> on easier ground, on bullet knobs and flakes.",
        pitchList: [
          { n: "P8", grade: "—", length: "—", note: "To the summit ridge" },
          { n: "P7", grade: "—", length: "—" },
          { n: "P6", grade: "—", length: "—" },
          { n: "P5", grade: "5.11−", length: "—" },
          { n: "P4", grade: "5.12", length: "—", note: "Dynamic crux", crux: true },
          { n: "P3", grade: "5.11+", length: "—", note: "Technical crimps" },
          { n: "P2", grade: "5.11−", length: "—" },
          { n: "P1", grade: "5.11", length: "—" },
        ],
      },
      {
        slug: "ironin-3",
        topoImage: "/route-topos/ironin-3.jpg",
        topoCaption:
          "The Iranian route — clean photo topo, “mountains for peace, April 2015” (route book source page 55).",
        name: "Ironin 3",
        grade: "5.13b",
        length: "485 m",
        pitches: 12,
        firstAscent: "Mahmoud Ghavidel, Ali Rostami, Hossan Ateffi, Nima Parsa, Nassrolah Taheri",
        year: 2015,
        stars: 3,
        summary:
          "“The Name of God” — the Iranian route, climbed under the banner Mountains for Peace. The longest line on the massif, free to 5.13b with A2 aid sections.",
        approach: "From the South Tower base, right of the Waking Dream line",
        descent: "Abseil the line",
        gear: "Big-wall rack: aid gear, hooks, double set of cams, 12 belays.",
        pitchList: [
          { n: "R12", grade: "5.7", length: "50 m", note: "To the summit" },
          { n: "R11", grade: "5.10a", length: "25 m" },
          { n: "R10", grade: "5.11a", length: "45 m" },
          { n: "R9", grade: "5.12b A2", length: "—" },
          { n: "R8", grade: "5.13b A2", length: "70 m", note: "The hardest pitch on the island", crux: true },
          { n: "R7", grade: "5.11b", length: "—" },
          { n: "R6", grade: "5.11c A2", length: "50 m" },
          { n: "R5", grade: "5.11b A2", length: "20 m" },
          { n: "R4", grade: "—", length: "50 m", note: "Traverse" },
          { n: "R3", grade: "5.12d", length: "40 m" },
          { n: "R2", grade: "5.10b", length: "25 m" },
          { n: "R1", grade: "5.12 A2", length: "—" },
        ],
      },
      {
        slug: "waking-dream",
        topoImage: "/route-topos/waking-dream.jpg",
        topoCaption:
          "Waking Dream — the original hand topo (The Alcove, Great Roof, Skywalk) beside a photo of the line (route book source page 50).",
        name: "Waking Dream",
        grade: "7c+",
        length: "305 m",
        pitches: 10,
        firstAscent: "Nick Tomlin & Scotty Nelson",
        year: 2000,
        stars: 4,
        summary:
          "The route that opened the tower. Originally V 5.9 A2 over five days; later freed at 7c+ by Dave Sharratt and Hank Jones. Big-wall character throughout — The Alcove, The Great Roof, The Skywalk, Garden Terrace.",
        approach: "From the South Tower base",
        descent: "Abseil, including a 60 m free rappel below pitch 8",
        gear: "Original rack: knifeblades, 2 sets nuts, 2 sets Aliens/TCUs, Camalots, Lost Arrows, hooks, rivet hangers, 60 m ropes.",
        extra: {
          title: "Re-equipped",
          body: "Later parties added titanium and stainless glue-ins at most stances; pitches 9 and 10 belay off trees to the summit.",
        },
      },
      {
        slug: "freebird",
        topoImage: "/route-topos/freebird.jpg",
        topoCaption:
          "Freebird — photo topo with belays R1–R6 (route book source page 73).",
        name: "Freebird",
        grade: "6a",
        length: "230 m",
        pitches: 7,
        firstAscent: "Timothée Guillon, Nicolas Gay, Apull Shaiful Amin, Tam Khairudin Haja",
        year: 2015,
        stars: 4,
        summary:
          "A slab and crack adventure route with runouts in beautiful rock — the friendliest serious line on the massif, and the most repeated by Malaysian teams. A direct variation was added in 2016.",
        approach: "CP7, then up — shares the approach with Puncak Anak",
        descent: "Abseil left onto Polish Princess",
        gear: "2 racks of cams, set of nuts, 2 × 50 m ropes, lots of slings. Nothing in place.",
        pitchList: [
          { n: "P7", grade: "IV", length: "—", note: "Tree/jungle traverse to the top" },
          { n: "P6", grade: "6a", length: "20 m", note: "Direct up the line above R5" },
          { n: "P5", grade: "6a", length: "40 m", note: "Direct into the dyno crack — harder but better pro" },
          { n: "P4", grade: "5c", length: "—", note: "Traverse exactly on the loose slab, head right" },
          { n: "P3", grade: "5", length: "—", note: "Pockets, slabby runs, flaring crack — creative placements" },
          { n: "P2", grade: "5c", length: "—", note: "Use long slings; better belay stance on the lower left" },
          { n: "P1", grade: "6a", length: "—", note: "Nice slab, 50–50 protection. Sketchy move 8 m up", crux: true },
        ],
        logbook: ["freebird-direct"],
      },
      {
        slug: "muka",
        name: "Muka",
        grade: "7a+",
        length: "360 m",
        pitches: null,
        firstAscent: "Martinek, Beneš, Sobotka",
        year: 2010,
        stars: null,
        status: "No topo on record",
        summary:
          "A Czech line up the right side of the tower. Polish Princess crosses it at pitch 4, and a “Muka variation” of that route exists.",
        warn: "<strong>This route needs documenting.</strong> It appears in every route list and as a labelled line on the overview photos, but no topo or pitch description survives anywhere in the source. If you have climbed it, please get in touch.",
      },
      {
        slug: "beckwith-traver",
        topoImage: "/route-topos/beckwith-traver.jpg",
        topoCaption:
          "Beckwith – Traver, the red line up the left side of the South Tower (route book source page 43).",
        name: "Beckwith – Traver",
        grade: "5.10 A3",
        length: "400 m",
        pitches: null,
        firstAscent: "Steve Beckwith & Matt Traver",
        year: "2009 / 2011",
        stars: 3,
        status: "Date disputed",
        summary:
          "The original big-wall line up the left side of the South Tower, and the longest route on the formation at 400 m.",
        warn: "<strong>Conflicting record.</strong> The source dates this route 2009 in one route list and 2011 in another. Only a photo topo survives — no pitch description.",
      },
    ],
  },

  {
    slug: "north-tower",
    key: "H",
    name: "Dragon's Horns — North Tower",
    aka: "Gunung Nenek Semukut",
    short: "North Tower",
    order: 2,
    topoImage: "/topos/north-tower-tanoshi.jpg",
    topoCaption:
      "The North Tower with Tanoshi Buttress (line H). From the route book, source page 75.",
    desc: "The right-hand fang. One hard route to the summit — and a via ferrata for everyone else.",
    lede: "The lower, right-hand tower — a clean skyline buttress seen from Mukut. It stayed unclimbed for eleven years after the South Tower fell, and a single climbing route reaches its summit today. A via ferrata now lets non-climbers reach a viewpoint on the tower.",
    meta: [
      ["Approach", "From Mukut, via the South Tower trails"],
      ["Aspect", "South-west"],
      ["Height", "~270 m of climbing"],
      ["Routes", "1 climb + 1 via ferrata"],
    ],
    routes: [
      {
        slug: "via-ferrata",
        name: "North Tower Via Ferrata",
        grade: "Via ferrata",
        length: "—",
        pitches: null,
        firstAscent: "—",
        year: "—",
        stars: null,
        kind: "via-ferrata",
        status: "For non-climbers",
        summary:
          "A fixed-protection route — steel cable, rungs and ladders bolted to the rock — that lets visitors who don’t rock climb reach a viewpoint on the North Tower for the sight out over Mukut, the reef and the South Tower. You clip a via-ferrata lanyard to the cable and move on your feet; no rope skills needed, but it is still exposed and physical, and a head for heights helps.",
        approach: "From Mukut on the Nenek Semukut trail",
        descent: "Reverse the via ferrata / walk off",
        gear: "Via-ferrata lanyard kit, harness, helmet. Go with a local guide.",
        warn: "<strong>Details wanted.</strong> Length, grade, guiding arrangements and current condition of the cable are not yet documented here — if you know them, please contribute.",
      },
      {
        slug: "tanoshi-buttress",
        topoImage: "/route-topos/tanoshi-buttress.jpg",
        topoCaption:
          "Tanoshi Buttress (line H) on the North Tower (route book source page 75).",
        name: "Tanoshi Buttress",
        grade: "5.10 R/X",
        length: "270 m",
        pitches: 7,
        firstAscent: "Cedar Wright & Lucho Rivera",
        year: 2011,
        stars: 4,
        kind: "climb",
        summary:
          "“Happy Buttress” — the first ascent of the unclimbed North Dragon’s Horn, following the longest swathe of good rock on the formation. It essentially follows the buttress just left of the right skyline as seen from Mukut.",
        approach: "From Mukut, following the path of least resistance up the nicest-looking rock",
        descent: "Rappel the line",
        gear: "Double set of cams, one #3 and one #4 Camalot, set of stoppers, lots of runners, hand drill.",
        warn: "<strong>R/X protection.</strong> All belays are natural — only a few bolts were placed on rappel. Falls on this route have serious consequences.",
        extra: {
          title: "From the first ascensionists",
          body: "“The summit is somewhat unremarkable unless you climb a tree.”",
        },
      },
    ],
  },

  {
    slug: "mumbar-cliff",
    key: "E",
    name: "Mumbar Cliff",
    aka: "Kota Sirau",
    short: "Mumbar Cliff",
    order: 3,
    topoImage: "/topos/mumbar-face.jpg",
    topoCaption:
      "Mumbar Cliff — the four established/attempted lines. From the route book, source page 6.",
    desc: "Steep white granite split by an arête. Slabs left, the steepest wall in the massif right.",
    lede: "A big face on the flank of Batu Mumbar, inland from the Nipah–Tunamaya coast. An arête divides it: lower-angle black and brown slabs on the left, and on the right a white stripe of steep granite that holds one of the steepest routes anywhere on the island.",
    meta: [
      ["Approach", "2 h 20 from Nipah, or boat + 1 h 20"],
      ["Aspect", "South and east"],
      ["Height", "up to 400 m"],
      ["Opened", "2016 — the first route on the cliff"],
    ],
    routes: [
      {
        slug: "fever-dreams",
        topoImage: "/route-topos/fever-dreams.jpg",
        topoCaption:
          "Fever Dreams — clean photo topo with pitch grades (route book source page 23).",
        name: "Fever Dreams",
        grade: "7c",
        length: "250 m",
        pitches: 9,
        firstAscent: "Jonas Wallin & David Kaszlikowski",
        year: 2016,
        stars: 5,
        summary:
          "The first climb opened on Mumbar. Three approach pitches lead to a steep pillar of clean granite; the top six pitches are fully bolted. Named for what the walk-in did to the team.",
        approach: "Riverbed and cairns from the coast path, then a cut jungle trail — 30–40 min from the riverbed",
        descent: "Abseil the line. From pitch 5 up, a single 60 m rope does it — back-clip or finish hanging in space.",
        gear: "Single rack to BD #3 and 16 quickdraws. After pitch 3 no cams are needed — all bolted.",
        warn: "<strong>Needs two dry days.</strong> Pitch 1 is around 6c when dry and unclimbable when wet.",
        pitchList: [
          { n: "P9", grade: "6a", length: "30 m" },
          { n: "P8", grade: "7a/+", length: "20 m" },
          { n: "P7", grade: "6c", length: "20 m" },
          { n: "P6", grade: "7b", length: "30 m" },
          { n: "P5", grade: "6c", length: "25 m" },
          { n: "P4", grade: "7c", length: "40 m", note: "The crux. A 7b+/c variation exists — take long draws", crux: true },
          { n: "P3", grade: "6b", length: "28 m", note: "Last pitch needing cams" },
          { n: "P2", grade: "6a/+", length: "25 m" },
          { n: "P1", grade: "6c", length: "18 m", note: "Only when dry" },
        ],
        logbook: ["fever-dreams-expedition"],
      },
      {
        slug: "yoga-boy",
        topoImage: "/route-topos/yoga-boy.jpg",
        topoCaption:
          "Yoga Boy — photo topo, belays R1–R5 (route book source page 14).",
        name: "Yoga Boy",
        grade: "HVS 5a",
        length: "220 m",
        pitches: 5,
        firstAscent: "Michael Söldner, Tam Khairudin Haja, Stuart",
        year: 2019,
        stars: 3,
        summary:
          "The first climb on the Mumbar south face, up the left-hand lower-angle slab sector. The most approachable line on the cliff.",
        approach: "As for Fever Dreams",
        descent: "Abseil the line",
        gear: "Trad rack; the route is unbolted.",
        pitchList: [
          { n: "R5", grade: "4c", length: "—" },
          { n: "R4", grade: "4c", length: "—" },
          { n: "R3", grade: "4c", length: "—" },
          { n: "R2", grade: "4c", length: "—" },
          { n: "R1", grade: "5a", length: "—", note: "The hardest climbing, low down", crux: true },
        ],
      },
      {
        slug: "project-grand-central",
        topoImage: "/route-topos/project-grand-central.jpg",
        topoCaption:
          "Project Grand Central — photo topo, R1–R8; the upper pitches (dashed) are unclimbed (route book source page 16).",
        name: "Project Grand Central",
        grade: "E1 5a",
        length: "400 m",
        pitches: 8,
        firstAscent: "Michael Söldner & Kai Voges",
        year: 2019,
        stars: null,
        status: "Unfinished — 4 of 8 pitches",
        summary:
          "An intended full-height line up the face. Four pitches are established at around 5a; the remaining four are drawn as a dashed line to an eighth belay and have never been climbed.",
        approach: "As for Fever Dreams",
        descent: "Abseil from the high point",
        gear: "Trad rack, 2 ropes.",
        warn: "<strong>This is an open project.</strong> The upper half is unclimbed. Talk to the first ascensionists before working on it.",
      },
    ],
  },

  {
    slug: "batu-sirau",
    key: "G",
    name: "Batu Sirau",
    aka: "“Mystery Pinnacle”",
    short: "Batu Sirau",
    order: 4,
    topoImage: "/topos/blood-sweat-and-fear.jpg",
    topoCaption:
      "Batu Sirau with Blood Sweat and Fear (red) and a second line (green). Vertical Vision / David Kaszlikowski photo, route book source page 25.",
    desc: "A compact pinnacle behind Nenek Semukut. One route, seven pitches, hardest 7b+.",
    lede: "A steep granite pinnacle on the back side of Gunung Nenek Semukut, photographed from a drone and climbed once. The overview map calls it the Mystery Wall; the route page calls it something else again — the naming here has never been settled.",
    meta: [
      ["Approach", "Summit access path established"],
      ["Aspect", "North-west"],
      ["Height", "~150 m of climbing"],
      ["Note", "A second approach from the river landslide is unexplored"],
    ],
    routes: [
      {
        slug: "blood-sweat-and-fear",
        topoImage: "/route-topos/blood-sweat-and-fear.jpg",
        topoCaption:
          "Blood Sweat and Fear (red) with pitch grades, plus a second line in green. Vertical Vision / David Kaszlikowski photo (route book source page 25).",
        name: "Blood Sweat and Fear",
        grade: "7b+",
        length: "155 m",
        pitches: 7,
        firstAscent: "David Kaszlikowski & Jonas Wallin",
        year: 2019,
        stars: 4,
        summary:
          "The only route on the pinnacle — seven sustained pitches on steep, compact granite, with nothing below 6c.",
        approach: "Established path to the summit area",
        descent: "Abseil the line",
        gear: "Sport rack plus a light trad selection.",
        warn: "<strong>Name unresolved.</strong> The overview map records this route as “Blood Sweat and Tears”. The route page and contents both say “Fear”.",
        pitchList: [
          { n: "P7", grade: "6c", length: "22 m" },
          { n: "P6", grade: "7a/+", length: "25 m" },
          { n: "P5", grade: "6c+", length: "25 m" },
          { n: "P4", grade: "7b+", length: "20 m", note: "The crux", crux: true },
          { n: "P3", grade: "7a/+", length: "25 m" },
          { n: "P2", grade: "6c", length: "18 m" },
          { n: "P1", grade: "6c+", length: "20 m" },
        ],
      },
    ],
  },

  {
    slug: "bagus-tower",
    key: "F",
    name: "Bagus Tower",
    aka: "above Bagus Place",
    short: "Bagus Tower",
    order: 5,
    topoImage: "/topos/bagus-watchtower.jpg",
    topoCaption:
      "The hand-drawn All Along the Watchtower topo, photographed from the Mukut logbook (source page 26).",
    desc: "Two trad lines from 2015. Approach path overgrown — bring a machete.",
    lede: "An obvious tower above the end of the Bagus Place road. Both its routes and both its topos come from a single French–Malaysian party in October 2015, and survive only as photographs of a logbook page.",
    meta: [
      ["Approach", "End of the Bagus Place road, then ~1 h"],
      ["Aspect", "South"],
      ["Height", "300 m"],
      ["Condition", "Trail cut in 2015 — expect regrowth"],
    ],
    routes: [
      {
        slug: "all-along-the-watchtower",
        topoImage: "/route-topos/all-along-the-watchtower.jpg",
        topoCaption:
          "All Along the Watchtower — hand-drawn topo from the logbook (source page 26).",
        name: "All Along the Watchtower",
        grade: "6a+",
        length: "300 m",
        pitches: 10,
        firstAscent: "Timothée Guillon, Shaiful Amin, Nicolas Gay",
        year: 2015,
        stars: 3,
        summary:
          "The first route on the tower. Not direct, but with some pleasant pitches and a lot of jungle research and scrambling. Graded TD−.",
        approach: "Follow the road to Bagus Place to its end, then up into the jungle",
        descent: "Complicated abseil",
        gear: "2 sets of Friends, 1 set of nuts, 2 × 60 m ropes (50 m works).",
        warn: "<strong>Loose flake</strong> noted on the topo mid-route, and the abseil is described as complicated. The approach path is overgrown.",
      },
      {
        slug: "hippies-tonic",
        topoImage: "/route-topos/hippies-tonic.jpg",
        topoCaption:
          "Hippies Tonic variation start — hand-drawn topo (route book source page 27).",
        name: "Hippies Tonic",
        grade: "5a/b",
        length: "90 m",
        pitches: 3,
        firstAscent: "Timothée Guillon & Nicolas Gay",
        year: 2015,
        stars: 2,
        summary:
          "A variation start to the tower up an obvious crack, joining the main routes higher. Includes a section the topo marks simply “spicy runout”.",
        approach: "As for All Along the Watchtower",
        descent: "Continue up or abseil",
        gear: "Friends C#3 and C#4, slings.",
      },
    ],
  },

  {
    slug: "puncak-nipah",
    key: "A/B",
    name: "Puncak Nipah",
    aka: "Nipah beach & slabs",
    short: "Puncak Nipah",
    order: 6,
    topoImage: "/topos/nipah-green-line.jpg",
    topoCaption:
      "The Green Line Route topo, hand-drawn (route book source page 5).",
    desc: "A bolted single-pitch crag recorded only on a painted board, plus a 200 m adventure line.",
    lede: "Two very different things share one hillside above Nipah: around twenty-five bolted single pitches, and a 200 m multipitch up the summit tower that its first ascensionists described as “very dangerous but easy”.",
    meta: [
      ["Approach", "From Nipah beach"],
      ["Aspect", "Varied"],
      ["Height", "20–26 m single pitch; 200 m tower"],
      ["Recorded", "A painted board, signed 2010"],
    ],
    routes: [
      {
        slug: "green-line-route",
        topoImage: "/route-topos/green-line-route.jpg",
        topoCaption:
          "The Green Line Route — hand-drawn topo (route book source page 5).",
        name: "Green Line Route",
        grade: "6a",
        length: "200 m",
        pitches: 4,
        firstAscent: "Nico, Tim, Appol, Tom",
        year: 2015,
        stars: 3,
        summary:
          "Up the summit tower of Puncak Nipah from the jungle on its south side. One 80 m pitch, big runouts, tree belays, and a hornet nest marked on the topo.",
        approach: "From the jungle below the south side",
        descent: "Down-climb or walk off",
        gear: "Natural protection throughout.",
        warn: "<strong>No fixed gear and no abseil line.</strong> The first ascensionists wrote “very dangerous but easy — should be better to bolt route.” The difficulty is runouts and looseness, not hard moves.",
        extra: {
          title: "Potential",
          body: "The topo has two separate arrows pointing at unclimbed rock, both labelled “big potential for new routes”.",
        },
      },
      {
        slug: "nipah-sport-crag",
        topoImage: "/route-topos/nipah-sport-crag.jpg",
        topoCaption:
          "The painted “Route Map Nipah” board — the only record of the single-pitch crag (route book source page 4).",
        name: "The sport crag",
        grade: "5b–6b",
        length: "20–26 m",
        pitches: 1,
        firstAscent: "Recorded by “Soyot”",
        year: 2010,
        stars: 3,
        status: "~25 pitches",
        summary:
          "Around twenty-five bolted single pitches along a wall reached by a levelled path — Fadil, Stone Bonsai, Helang Putih, Coral Putih, White Sand, Lorong Air and the rest. Mostly 6a and 6b, 20 to 26 metres.",
        approach: "Levelled path along the base",
        descent: "Lower off",
        gear: "Quickdraws and a 50 m rope.",
        warn: "<strong>Transcribed from a weathered painted board.</strong> Names and a few grades are best-effort readings. This crag badly needs re-surveying on the ground.",
      },
    ],
  },

  {
    slug: "puncak-anak",
    key: "—",
    name: "Puncak Anak",
    aka: "“Baby Dragon”",
    short: "Puncak Anak",
    order: 7,
    topoImage: "/topos/puncak-anak.jpg",
    topoCaption:
      "Wind of Change on Puncak Anak, hand-drawn topo (route book source page 74).",
    desc: "A small tower off the CP7 trail. One easy, obvious line up the south side.",
    lede: "The little brother on the Nenek Semukut ridge, sharing the CP7 approach with Freebird and Polish Princess. One recorded route, and an easy day out by the standards of this island.",
    meta: [
      ["Approach", "CP7 from Mukut"],
      ["Aspect", "South"],
      ["Height", "100 m"],
      ["Base camp", "Shared with the CP7 routes"],
    ],
    routes: [
      {
        slug: "wind-of-change",
        topoImage: "/route-topos/wind-of-change.jpg",
        topoCaption:
          "Wind of Change on Puncak Anak — hand-drawn topo (route book source page 74).",
        name: "Wind of Change",
        grade: "6a",
        length: "100 m",
        pitches: 5,
        firstAscent: "Nicolas Gay, Timothée Guillon, Tam Khairudin Haja, Apull Shaiful Amin",
        year: 2015,
        stars: 3,
        summary: "A nice, obvious and easy line up the south side of the tower, finishing with a jungle scramble.",
        approach: "CP7, base camp at the foot",
        descent: "Scramble and abseil",
        gear: "2 × 50 m ropes, 2 racks of cams, nuts, slings.",
        pitchList: [
          { n: "R5", grade: "—", length: "30 m", note: "Jungle scramble to finish" },
          { n: "R4", grade: "6a", length: "20 m", note: "Loose rock nearby" },
          { n: "R3", grade: "6a", length: "30 m", note: "Short gully" },
          { n: "R2", grade: "5c", length: "25 m", note: "Short steep wall and a small overhang" },
          { n: "R1", grade: "5b/c", length: "25 m", note: "Beautiful slab" },
        ],
      },
    ],
  },

  {
    slug: "unclimbed-buttress",
    key: "D",
    name: "Unclimbed Buttress",
    aka: "no access path",
    short: "Unclimbed Buttress",
    order: 8,
    topoImage: "/topos/overview-map.jpg",
    topoCaption:
      "The master map — feature D is the Unclimbed Buttress (route book source page 3).",
    desc: "Marked on the master map as potential for new trad and sport. Nobody has been up it.",
    lede: "Feature D on the master map, between the Nipah slabs and Mumbar. The map’s own caption reads: potential for new trad and sport routes, needs new access path. That is the entire record.",
    meta: [
      ["Approach", "None — needs cutting"],
      ["Aspect", "Unknown"],
      ["Height", "Unknown"],
      ["Status", "Unclimbed"],
    ],
    routes: [],
    undeveloped: true,
    emptyNote:
      "No established routes. The map marks it as promising for both trad and sport, but no access path exists and nobody has reported climbing here. If you go, the logbook wants to hear about it.",
  },

  {
    slug: "juara-beach",
    key: "—",
    name: "Juara Beach",
    aka: "east coast",
    short: "Juara Beach",
    order: 9,
    topoImage: "/topos/juara-sketch.jpg",
    topoCaption:
      "The entire record of Juara: a field sketch of ~20 lines (route book source page 76).",
    desc: "Sea cliffs and boulders sketched in a notebook. No names, no grades, no one back since.",
    lede: "The quiet side of the island, and the only area in this guidebook that isn’t on the south coast. The record amounts to one rough field sketch showing about twenty lines — with no names, no grades and no description.",
    meta: [
      ["Approach", "Cross-island road from Tekek, or by boat"],
      ["Aspect", "East, seaward"],
      ["Height", "Short"],
      ["Status", "Undocumented"],
    ],
    routes: [],
    undeveloped: true,
    emptyNote:
      "A single notebook sketch shows roughly twenty numbered lines on a sea cliff and beach boulders. It is a “there is rock here” note, not a topo. Bouldering and possibly deep-water soloing — depth and tides unrecorded. Treat this page as an invitation to survey the area properly.",
  },
];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function getRoute(areaSlug: string, routeSlug: string): { area: Area; route: Route } | undefined {
  const area = getArea(areaSlug);
  const route = area?.routes.find((r) => r.slug === routeSlug);
  if (area && route) return { area, route };
  return undefined;
}

export function allRoutePairs(): { area: Area; route: Route }[] {
  return areas.flatMap((area) => area.routes.map((route) => ({ area, route })));
}

/** Rough cross-system difficulty band, for filtering. */
export type GradeBand = "Introductory" | "Moderate" | "Hard" | "Very hard" | "Elite" | "Big-wall aid" | "Via ferrata";

export function gradeBand(grade: string): GradeBand {
  const g = grade.toLowerCase();
  if (g.includes("via ferrata")) return "Via ferrata";
  if (/\ba[0-3]\b/.test(g) && /5\.\d/.test(g)) return "Big-wall aid";

  // French sport
  const fr = g.match(/(?:^|\s)([4-9][abc]?\+?)(?:\s|$|\/)/);
  if (fr && !g.includes("5.")) {
    const v = fr[1];
    if (/^[45]/.test(v)) return "Introductory";
    if (/^6[ab]/.test(v)) return "Moderate";
    if (/^6c/.test(v) || /^7a/.test(v)) return "Hard";
    if (/^7[bc]/.test(v)) return "Very hard";
    return "Elite"; // 8a+
  }

  // YDS
  const yds = g.match(/5\.(\d+)([a-d])?/);
  if (yds) {
    const n = Number(yds[1]);
    if (n <= 9) return "Moderate";
    if (n === 10) return "Moderate";
    if (n === 11) return "Hard";
    if (n === 12) return "Very hard";
    return "Elite";
  }

  // UK trad
  if (/\bhvs\b|\be1\b|\be2\b/.test(g)) return "Hard";
  if (/\bvs\b|\bhs\b|\bs\b/.test(g)) return "Moderate";

  return "Moderate";
}

/** Leading number of metres in a length string, or null. */
export function lengthMeters(length: string): number | null {
  const m = length.match(/(\d+)\s*m/);
  return m ? Number(m[1]) : null;
}

export type LengthBucket = "under-150" | "150-280" | "280-360" | "over-360" | "single-pitch";
export function lengthBucket(route: Route): LengthBucket | null {
  if (route.pitches === 1) return "single-pitch";
  const m = lengthMeters(route.length);
  if (m === null) return null;
  if (m < 150) return "under-150";
  if (m < 280) return "150-280";
  if (m <= 360) return "280-360";
  return "over-360";
}

export const lengthBucketLabels: Record<LengthBucket, string> = {
  "single-pitch": "Single pitch",
  "under-150": "Under 150 m",
  "150-280": "150–280 m",
  "280-360": "280–360 m",
  "over-360": "Over 360 m",
};
