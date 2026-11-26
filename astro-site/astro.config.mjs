// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// The site URL drives canonical URLs, JSON-LD, the sitemap, robots.txt and llms.txt.
// It defaults to the Cloudflare Pages address. When the custom domain is approved, set
// PUBLIC_SITE_URL (e.g. https://application.vibeconnectvs.com) in the host's build
// environment and redeploy; no code change is needed.
const site = process.env.PUBLIC_SITE_URL || "https://vibe-connect-3.pages.dev";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "auto" },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/\/(404|thank-you|orientation)$/.test(page),
      serialize(item) {
        // Pages whose content changes with pay updates carry the last-updated date.
        item.lastmod = process.env.SITEMAP_LASTMOD || "2026-11-26";
        const path = new URL(item.url).pathname;
        item.priority = path === "/" ? 1.0 : path === "/privacy-policy" || path === "/terms" ? 0.3 : 0.8;
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
