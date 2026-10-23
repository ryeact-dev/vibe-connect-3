import { useLayoutEffect } from "react";
import type { FC } from "react";

/**
 * Site-wide defaults used as fallbacks by every page.
 * Centralised here so a rebrand only touches one file.
 */
export const SITE_NAME = "Vibe Connect Virtual";
export const SITE_DOMAIN = "https://application.vibeconnectvs.com";
export const DEFAULT_OG_IMAGE =
  "https://vibe.filesafe.space/meta/1785542809220106141/og_image.png";

export interface SEOHeadProps {
  /** <title> tag content (will be appended with site name) */
  title: string;
  /** Meta description, 160 chars max */
  description: string;
  /** Canonical URL path, e.g. "/" or "/application-page" */
  canonical?: string;
  /** Open Graph / Twitter share image URL */
  ogImage?: string;
  /** When true, adds noindex,nofollow robots directive */
  noIndex?: boolean;
  /** Optional JSON-LD structured data object rendered as a script tag */
  schemaJson?: Record<string, unknown>;
}

/**
 * Marks every tag this component manages so we can clean up stale
 * ones (e.g. robots / JSON-LD) without touching tags owned by index.html.
 */
const MARK = "data-vibe-seo";

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute(MARK, "");
    document.head.appendChild(el);
  } else if (!el.hasAttribute(MARK)) {
    el.setAttribute(MARK, "");
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(MARK, "");
    document.head.appendChild(el);
  } else if (!el.hasAttribute(MARK)) {
    el.setAttribute(MARK, "");
  }
  el.setAttribute("href", href);
}

function clearManaged(selector: string): void {
  document.head
    .querySelectorAll(`${selector}[${MARK}]`)
    .forEach((el) => el.parentElement?.removeChild(el));
}

/**
 * Centralised SEO meta manager.
 *
 * Uses native DOM APIs (no react-helmet-async) to inject <title>, meta
 * description, canonical, Open Graph, Twitter, robots, and JSON-LD per
 * page. This avoids a CJS/ESM interop crash that react-helmet-async was
 * triggering in the Vite dep graph.
 */
export const SEOHead: FC<SEOHeadProps> = ({
  title,
  description,
  canonical = "/",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  schemaJson,
}) => {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical.startsWith("http")
    ? canonical
    : `${SITE_DOMAIN}${canonical}`;

  useLayoutEffect(() => {
    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertLink("canonical", canonicalUrl);

    // Reset managed robots, then set only when noIndex.
    clearManaged('meta[name="robots"]');
    if (noIndex) {
      const el = document.createElement("meta");
      el.setAttribute("name", "robots");
      el.setAttribute("content", "noindex, nofollow");
      el.setAttribute(MARK, "");
      document.head.appendChild(el);
    }

    // Open Graph
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", ogImage);

    // Twitter
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", ogImage);

    // JSON-LD — reset managed scripts, then add current.
    clearManaged('script[type="application/ld+json"]');
    if (schemaJson) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute(MARK, "");
      s.textContent = JSON.stringify(schemaJson);
      document.head.appendChild(s);
    }
  }, [fullTitle, description, canonicalUrl, ogImage, noIndex, schemaJson]);

  return null;
};

export default SEOHead;
