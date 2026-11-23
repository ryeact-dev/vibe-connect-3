// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Set PUBLIC_SITE_URL (e.g. https://www.example.com) in your host's build
// environment. It drives canonical URLs, JSON-LD, the sitemap and llms.txt.
const site = process.env.PUBLIC_SITE_URL || "https://application.vibeconnectvs.com";

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
      filter: (page) => !page.endsWith("/404"),
      serialize(item) {
        // Pages whose content changes with pay updates carry the last-updated date.
        item.lastmod = process.env.SITEMAP_LASTMOD || "2026-11-23";
        const path = new URL(item.url).pathname;
        item.priority = path === "/" ? 1.0 : path === "/privacy-policy" || path === "/terms" ? 0.3 : 0.8;
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
