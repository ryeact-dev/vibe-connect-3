import type { APIRoute } from "astro";
import { SITE_DOMAIN } from "../config/site";

/** Generated at build time so the Sitemap URL always follows PUBLIC_SITE_URL. */
const BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
];

export const GET: APIRoute = () => {
  const body = [
    "# Search engines and AI crawlers are welcome on all public pages.",
    "# /api/ is the form endpoint (POST only) and has nothing to index.",
    "",
    "User-agent: *",
    ...BOTS.map((b) => `User-agent: ${b}`),
    "Allow: /",
    "Disallow: /api/",
    "",
    `Sitemap: ${SITE_DOMAIN}/sitemap-index.xml`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
