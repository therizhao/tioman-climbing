/**
 * External trip reports, articles and films about Tioman climbing.
 *
 * These are NOT hosted here — they link out to the authors' own sites and channels.
 * The native, transcribed logbook entries live in `src/content/logbook/`.
 *
 * `route` is the route slug (see src/data/areas.ts) this piece is primarily about,
 * or null for area-wide / general pieces.
 */

export type ExternalLog = {
  type: "article" | "video";
  title: string;
  source: string;
  author?: string;
  year?: string;
  url: string;
  route: string | null;
  area: string | null;
  note?: string;
};

export const externalLogs: ExternalLog[] = [
  // --- NUS Mountaineering (nus-mir.com) ---
  {
    type: "article",
    title: "Naga — Scaling the Dragon’s Horns",
    source: "NUS Mountaineering (nus-mir.com)",
    year: "2026",
    url: "https://nus-mir.com/index.php/2026/02/09/naga-scaling-the-dragons-horns/",
    route: "naga",
    area: "south-tower",
  },
  {
    type: "article",
    title: "Tioman trip report",
    source: "NUS Mountaineering (nus-mir.com)",
    year: "2026",
    url: "https://nus-mir.com/index.php/2026/04/14/tioman-trip-report/",
    route: null,
    area: null,
    note: "General Dragon’s Horns trip report.",
  },

  // --- Headlamps, Clusterfucks and Other Vertical Adventures ---
  {
    type: "article",
    title: "Trip report: Polish Princess (270 m, 7b)",
    source: "Headlamps, Clusterfucks and Other Vertical Adventures",
    year: "2015",
    url: "http://www.headlampsclusterfucksandotherverticaladventures.com/2015/07/the-dragons-horns-on-tioman-island-malaysia-part9-trip-report-polish-princess-270m-7b/",
    route: "polish-princess",
    area: "south-tower",
  },
  {
    type: "article",
    title: "Trip report: Damai Sentosa (280 m, 6c)",
    source: "Headlamps, Clusterfucks and Other Vertical Adventures",
    year: "2014",
    url: "http://www.headlampsclusterfucksandotherverticaladventures.com/2014/07/the-dragons-horns-on-tioman-island-malaysia-part6-trip-report-damai-sentosa-280m-6c/",
    route: "damai-sentosa",
    area: "south-tower",
  },
  {
    type: "article",
    title: "New route: In the Name of God / Ironin 3 (April 2015)",
    source: "Headlamps, Clusterfucks and Other Vertical Adventures",
    year: "2015",
    url: "http://www.headlampsclusterfucksandotherverticaladventures.com/2015/07/the-dragons-horns-on-tioman-island-malaysia-part7-new-route-addition-in-the-name-of-god-ironin-3-april-2015/",
    route: "ironin-3",
    area: "south-tower",
  },
  {
    type: "article",
    title: "Trip report: Waking Dream (V 5.9 A2)",
    source: "Headlamps, Clusterfucks and Other Vertical Adventures",
    year: "2013",
    url: "http://www.headlampsclusterfucksandotherverticaladventures.com/2013/09/trip-report-the-dragons-horns-waking-dream-v-5-9-a2-tioman-island-malaysia/",
    route: "waking-dream",
    area: "south-tower",
  },

  // --- UKClimbing feature ---
  {
    type: "article",
    title: "Steve McClure — Trials & Tribulations on Tioman Island",
    source: "UKClimbing",
    author: "Steve McClure",
    url: "https://www.ukclimbing.com/articles/features/steve_mcclure_-_trials+tribulations_on_tioman_island-11268",
    route: "waking-dream",
    area: "south-tower",
    note: "Feature on an attempt to free the Dragon’s Horns. Route association is our best guess — correct us if it’s off.",
  },

  // --- Films ---
  {
    type: "video",
    title: "Naga (6b/+) — Dragon’s Horns, Tioman",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=0Ihcsn74jms",
    route: "naga",
    area: "south-tower",
  },
  {
    type: "video",
    title: "Polish Princess (7b+) — Dragon’s Horns, Tioman",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=x6pg_SJhIfo",
    route: "polish-princess",
    area: "south-tower",
  },
  {
    type: "video",
    title: "Naga — Tioman Island: “Scaling Dragons”",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=XxuZRrAhgZI",
    route: "naga",
    area: "south-tower",
    note: "Featuring Dani Boy & support team. Linked from the route book (source page 64).",
  },
];

export function externalForRoute(routeSlug: string): ExternalLog[] {
  return externalLogs.filter((l) => l.route === routeSlug);
}
