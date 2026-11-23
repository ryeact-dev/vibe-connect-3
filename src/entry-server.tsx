import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes, AppShell } from "./App";
import { headCollector, type ResolvedHead } from "./components/SEOHead";
import { SEO_PAGES } from "./lib/seo-pages";
import { LEGAL_PAGES } from "./lib/legal-pages";
import { APPLY_URL } from "./lib/site-config";

/** Every route that gets its own prerendered HTML file. */
export const ROUTES: string[] = [
  "/",
  APPLY_URL,
  ...SEO_PAGES.map((p) => p.path),
  ...LEGAL_PAGES.map((p) => p.path),
];

/** Render one route to HTML and capture the head tags its <SEOHead> asked for. */
export function render(url: string): { html: string; head: ResolvedHead } {
  const collected: ResolvedHead[] = [];
  headCollector.current = collected;
  try {
    const html = renderToString(
      <AppShell>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppShell>,
    );
    return { html, head: collected[collected.length - 1] };
  } finally {
    headCollector.current = null;
  }
}
