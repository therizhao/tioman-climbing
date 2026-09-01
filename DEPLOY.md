# Deploying

The site is a static Astro build (`npm run build` → `dist/`). It's hosted on
**Cloudflare Pages**, project `tioman-climbing`, live at
<https://tioman-climbing.pages.dev>.

Pick **one** of the two auto-deploy options below. Right now neither is active —
deploys are manual (`npm run deploy`).

---

## Option A — Cloudflare Git integration (recommended, no secrets)

Cloudflare watches the GitHub repo and builds on every push to `main`.

1. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **tioman-climbing** → **Settings** → **Builds & deployments** → **Connect to Git**.
2. Authorise the Cloudflare GitHub app and pick `therizhao/tioman-climbing`.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Production branch:** `main`
4. Save. The next push to `main` deploys automatically; PRs get preview URLs.

With this option, leave the GitHub Action secrets unset — the workflow in
`.github/workflows/deploy.yml` then just runs `npm run build` as a check.

---

## Option B — GitHub Actions (needs one API token)

The workflow in `.github/workflows/deploy.yml` deploys on push to `main` once
these two repo secrets exist:

| Secret | Value |
|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | `992ca1180f68e4d37df753690b44dc26` — **already set** |
| `CLOUDFLARE_API_TOKEN` | create one (below) |

**Create the token:**

1. <https://dash.cloudflare.com/profile/api-tokens> → **Create Token** → **Create Custom Token**.
2. Permissions: **Account** → **Cloudflare Pages** → **Edit**.
3. Account Resources: your account.
4. Create, copy the token.

**Add it as a secret** (either in the GitHub UI under *Settings → Secrets and
variables → Actions*, or):

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo therizhao/tioman-climbing
```

Then push to `main` — the `Publish to Cloudflare Pages` step runs.

---

## Manual deploy

```bash
npm run deploy      # = npm run build && wrangler pages deploy dist --project-name tioman-climbing
```

Needs `wrangler` authenticated (`npx wrangler login`).
