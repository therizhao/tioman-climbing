# Deploying

The site is a static Astro build (`npm run build` → `dist/`). It's hosted on
**Cloudflare Pages**, project `tioman-climbing`, live at
<https://tioman-climbing.pages.dev>.

## Auto-deploy — Cloudflare Git integration

Cloudflare watches the GitHub repo: every push to `main` builds and deploys to
production, and every PR gets a preview URL. No secrets or API tokens involved.

Set up once in the dashboard:

1. <https://dash.cloudflare.com> → **Workers & Pages** → **tioman-climbing** → **Settings** → **Builds & deployments** → **Connect to Git**.
2. Authorise the Cloudflare GitHub app and pick `therizhao/tioman-climbing`.
3. Build settings:
   - **Production branch:** `main`
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** *(blank)*
   - Env var `NODE_VERSION` = `22` (matches CI)
4. Save.

`.github/workflows/ci.yml` runs `npm run build` on every push/PR as a check —
it does **not** deploy, so there's no double deploy.

## Manual deploy

```bash
npm run deploy      # = npm run build && wrangler pages deploy dist --project-name tioman-climbing
```

Needs `wrangler` authenticated (`npx wrangler login`).
