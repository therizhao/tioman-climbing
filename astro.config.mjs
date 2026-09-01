// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static output — deploys to Cloudflare Pages (or any static host) with no runtime.
export default defineConfig({
  site: "https://tioman-climbing.pages.dev",
  trailingSlash: "ignore",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
