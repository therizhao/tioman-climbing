import { getCollection, type CollectionEntry } from "astro:content";

export type AreaEntry = CollectionEntry<"areas">;
export type RouteEntry = CollectionEntry<"routes">;

/** Areas in display order. */
export async function getAreas(): Promise<AreaEntry[]> {
  const areas = await getCollection("areas");
  return areas.sort((a, b) => a.data.order - b.data.order);
}

/** Routes for one area, in display order. */
export async function getRoutes(areaSlug: string): Promise<RouteEntry[]> {
  const routes = await getCollection("routes");
  return routes
    .filter((r) => r.data.area === areaSlug)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getArea(slug: string): Promise<AreaEntry | undefined> {
  return (await getCollection("areas")).find((a) => a.id === slug);
}

export async function getRoute(slug: string): Promise<RouteEntry | undefined> {
  return (await getCollection("routes")).find((r) => r.id === slug);
}

/** Every (area, route) pair for static paths / the route finder. */
export async function allRoutePairs(): Promise<{ area: AreaEntry; route: RouteEntry }[]> {
  const [areas, routes] = [await getAreas(), await getCollection("routes")];
  const byId = new Map(areas.map((a) => [a.id, a]));
  return routes
    .map((route) => ({ area: byId.get(route.data.area)!, route }))
    .filter((p) => p.area)
    .sort((a, b) => {
      if (a.area.data.order !== b.area.data.order) return a.area.data.order - b.area.data.order;
      return a.route.data.order - b.route.data.order;
    });
}

export function stars(n: number | null): string {
  return n ? "★".repeat(n) : "";
}

/* ---------- filtering helpers for the route finder ---------- */

export type GradeBand =
  | "Introductory"
  | "Moderate"
  | "Hard"
  | "Very hard"
  | "Elite"
  | "Big-wall aid"
  | "Via ferrata";

export function gradeBand(grade: string): GradeBand {
  const g = grade.toLowerCase();
  if (g.includes("via ferrata")) return "Via ferrata";
  if (/\ba[0-3]\b/.test(g) && /5\.\d/.test(g)) return "Big-wall aid";

  const fr = g.match(/(?:^|\s)([4-9][abc]?\+?)(?:\s|$|\/)/);
  if (fr && !g.includes("5.")) {
    const v = fr[1];
    if (/^[45]/.test(v)) return "Introductory";
    if (/^6[ab]/.test(v)) return "Moderate";
    if (/^6c/.test(v) || /^7a/.test(v)) return "Hard";
    if (/^7[bc]/.test(v)) return "Very hard";
    return "Elite";
  }

  const yds = g.match(/5\.(\d+)/);
  if (yds) {
    const n = Number(yds[1]);
    if (n <= 10) return "Moderate";
    if (n === 11) return "Hard";
    if (n === 12) return "Very hard";
    return "Elite";
  }

  if (/\bhvs\b|\be1\b|\be2\b/.test(g)) return "Hard";
  if (/\bvs\b|\bhs\b|\bs\b/.test(g)) return "Moderate";
  return "Moderate";
}

export type LengthBucket = "single-pitch" | "under-150" | "150-280" | "280-360" | "over-360";

export function lengthBucket(r: RouteEntry["data"]): LengthBucket | null {
  if (r.pitches === 1) return "single-pitch";
  const m = r.length.match(/(\d+)\s*m/);
  if (!m) return null;
  const n = Number(m[1]);
  if (n < 150) return "under-150";
  if (n < 280) return "150-280";
  if (n <= 360) return "280-360";
  return "over-360";
}

export const lengthBucketLabels: Record<LengthBucket, string> = {
  "single-pitch": "Single pitch",
  "under-150": "Under 150 m",
  "150-280": "150–280 m",
  "280-360": "280–360 m",
  "over-360": "Over 360 m",
};

/* ---------- logbook + trip-report index ---------- */

export type LogRow = {
  kind: "logbook" | "article" | "film";
  external: boolean;
  title: string;
  href: string;
  people: string; // party or author
  when: string; // date or year, as recorded
  routeIds: string[];
  routeName: string; // the routes this report covers, joined for display
  areaId: string | null;
  areaShort: string;
  excerpt: string;
};

const stripMd = (s: string) =>
  s.replace(/[#*_>`\-]/g, "").replace(/\s+/g, " ").trim();

/** Every trip report — transcribed Mukut pages and external links — as one list. */
export async function getLogRows(): Promise<LogRow[]> {
  const areas = await getAreas();
  const shortOf = new Map(areas.map((a) => [a.id, a.data.short]));
  const routes = await getCollection("routes");
  const routeNameOf = new Map(routes.map((r) => [r.id, r.data.name]));

  const entries = await getCollection("logbook");
  return [...entries]
    .sort((a, b) => a.data.order - b.data.order)
    .map((e): LogRow => {
      const d = e.data;
      const routeIds = d.route ? [d.route] : [];
      const routeName =
        d.routeName || routeIds.map((id) => routeNameOf.get(id) ?? id).join(", ");
      const shared = {
        title: d.title,
        routeIds,
        routeName,
        areaId: d.area || null,
        areaShort: d.area ? (shortOf.get(d.area) ?? "") : "",
        excerpt: stripMd(e.body ?? "").slice(0, 160),
      };
      return d.link
        ? {
            ...shared,
            kind: d.linkType === "video" ? "film" : "article",
            external: true,
            href: d.link,
            people: [d.author, d.source].filter(Boolean).join(" · "),
            when: d.date,
          }
        : {
            ...shared,
            kind: "logbook",
            external: false,
            href: `/logbook/${e.id}`,
            people: d.party,
            when: d.date,
          };
    });
}

/** External trip reports (hosted elsewhere) that mention a route slug. */
export async function externalLogsForRoute(routeSlug: string): Promise<LogRow[]> {
  return (await getLogRows()).filter((r) => r.external && r.routeIds.includes(routeSlug));
}

/** External trip reports tagged to a whole area, with no single route. */
export async function externalLogsForArea(areaSlug: string): Promise<LogRow[]> {
  return (await getLogRows()).filter(
    (r) => r.external && r.routeIds.length === 0 && r.areaId === areaSlug,
  );
}

/** routeId → number of trip reports (transcribed + external) that mention it. */
export async function getLogCounts(): Promise<Map<string, { native: number; external: number }>> {
  const rows = await getLogRows();
  const m = new Map<string, { native: number; external: number }>();
  for (const row of rows) {
    for (const id of row.routeIds) {
      const cur = m.get(id) ?? { native: 0, external: 0 };
      if (row.external) cur.external++;
      else cur.native++;
      m.set(id, cur);
    }
  }
  return m;
}

/* ---------- GitHub edit links ---------- */
export const REPO = "https://github.com/therizhao/tioman-climbing";

export function editHelpUrl(path: string, label: string): string {
  return `/edit-help/?path=${encodeURIComponent(path)}&label=${encodeURIComponent(label)}`;
}

/** Link to the helper that walks a contributor through adding a new logbook entry. */
export function addLogUrl(routeSlug: string, routeName: string, areaSlug: string): string {
  const p = new URLSearchParams({
    new: "logbook",
    route: routeSlug,
    routeName,
    area: areaSlug,
    label: routeName,
  });
  return `/edit-help/?${p.toString()}`;
}
