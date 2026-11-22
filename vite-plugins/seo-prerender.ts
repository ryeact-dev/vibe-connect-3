import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { FAQ_DATA } from "../src/lib/faq-data";
import { ROLES_DATA } from "../src/lib/roles-data";
import { parseInline } from "../src/lib/inline";
import { LEGAL_PAGES, type LegalPageData } from "../src/lib/legal-pages";
import {
  ARISE_DEFINITION,
  HUB_PAGE,
  LAST_UPDATED_LINE,
  SEO_PAGES,
  bannerUrl,
  buildPageSchema,
  type Block,
  type SeoPageData,
} from "../src/lib/seo-pages";
import {
  ABOUT_PARAGRAPH,
  FINAL_CTA_BODY,
  HOME_H1,
  HOME_INTRO,
  HUB_LINK_TEXT,
  ROLES_INTRO,
  VALUE_PROPS,
} from "../src/lib/home-copy";
import {
  APPLY_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
  HUB_URL,
  PAY_SOURCE,
} from "../src/lib/site-config";
import {
  HOME_DESCRIPTION,
  HOME_OG_IMAGE,
  HOME_SCHEMA_GRAPH,
  HOME_TITLE,
  SITE_DOMAIN,
  SITE_NAME,
} from "../src/lib/seo-schema";

/**
 * Build-time "prerender" for the homepage.
 *
 * The app is a client-rendered SPA, so the raw HTML shipped to crawlers is
 * just <div id="root"></div>. This plugin injects crawlable static HTML
 * (headings, copy, roles, FAQ) into #root, plus canonical, robots, OG and
 * JSON-LD into <head>. When the bundle loads, React's createRoot() replaces
 * the static markup, and <SEOHead> upserts/replaces the tags marked with
 * data-vibe-seo, so nothing is duplicated.
 *
 * The static copy mirrors the visible page (Hero, ValueProps, About, Roles,
 * FAQ). Keep it in sync with those components to avoid cloaking issues.
 */
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const fullTitle = `${HOME_TITLE} | ${SITE_NAME}`;

function staticBody(): string {
  const roles = ROLES_DATA.map(
    (r) => `<li><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p></li>`,
  ).join("");
  const faqs = FAQ_DATA.map(
    (f) => `<div><h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p></div>`,
  ).join("");

  const vp = VALUE_PROPS.map(
    (v) => `<li><h3>${esc(v.title)}</h3><p>${esc(v.body)}</p></li>`,
  ).join("");

  return `<div id="root" data-prerendered>${siteHeader()}<main>
<section id="home"><h1>${esc(HOME_H1)}</h1><p>${esc(HOME_INTRO)}</p><p><a href="${APPLY_URL}">Apply Now!</a></p></section>
<section><h2>Why work with Vibe Connect Virtual?</h2><ul>${vp}</ul></section>
<section id="about"><h2>We Are The Best Remote Career Service For Your People</h2><p>${esc(ABOUT_PARAGRAPH)}</p><h2>We're Built Around the Agent, Not Just the Client</h2><p>Most staffing companies optimize for the business paying the bill. We optimize for the person doing the work because agents who feel supported stay longer, perform better, and actually enjoy the job.</p></section>
<section id="roles"><h2>Find the Role That Fits You</h2><p>${esc(ROLES_INTRO)}</p><p><a href="${HUB_URL}">${esc(HUB_LINK_TEXT)}</a></p><ul>${roles}</ul></section>
<section id="faq"><h2>Frequently Asked Questions</h2>${faqs}</section>
<section><h2>Ready to Trade the Commute for a Headset and a Kitchen Table?</h2><p>${esc(FINAL_CTA_BODY)}</p><p><a href="${APPLY_URL}">Apply Now</a></p></section>
</main>${siteFooter()}</div>`;
}

function siteHeader(): string {
  return `<header><nav aria-label="Primary"><a href="/">${esc(SITE_NAME)}</a> <a href="/#about">About Us</a> <a href="${HUB_URL}">Remote Jobs</a> <a href="/#faq">FAQ</a> <a href="${APPLY_URL}">Apply Now</a></nav></header>`;
}

function siteFooter(): string {
  return `<footer id="contact"><h2>Contact Us &amp; More Details</h2><p><a href="tel:${CONTACT_PHONE_TEL}">+1.903.847.7904</a> · <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p><p><a href="${HUB_URL}">Remote work from home jobs in the US</a> · <a href="/privacy-policy">Privacy Policy</a> · <a href="/terms">Terms of Service</a></p><p>&copy; Vibe Connect Virtual LLC. All rights reserved. Agents are independent contractors (1099), not employees.</p></footer>`;
}

/* ---- Static HTML for the hub, role and legal pages ---- */

const inline = (t: string) =>
  parseInline(t)
    .map((p) => (p.href ? `<a href="${esc(p.href)}">${esc(p.text)}</a>` : esc(p.text)))
    .join("");

function blockHtml(b: Block): string {
  switch (b.type) {
    case "p":
      return `<p>${inline(b.text)}</p>`;
    case "ul":
      return `<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`;
    case "ol":
      return `<ol>${b.items.map((i) => `<li>${inline(i)}</li>`).join("")}</ol>`;
    case "source":
      return `<p>${esc(b.text)}</p>`;
  }
}

function seoPageBody(p: SeoPageData): string {
  const crumbs = p.isHub
    ? `<a href="/">Home</a> / ${esc(HUB_PAGE.crumb)}`
    : `<a href="/">Home</a> / <a href="${HUB_URL}">${esc(HUB_PAGE.crumb)}</a> / ${esc(p.crumb)}`;
  const sections = p.sections
    .map((s) => {
      const cta =
        p.midCta.afterSection === s.h2
          ? `<aside><p><strong>${esc(p.midCta.heading)}</strong></p><p>${esc(p.midCta.subline)}</p><p><a href="${APPLY_URL}">Apply Now</a></p></aside>`
          : "";
      return `<section><h2>${esc(s.h2)}</h2>${s.blocks.map(blockHtml).join("")}</section>${cta}`;
    })
    .join("\n");
  const faq = p.faq
    .map((f) => `<div><h3>${esc(f.q)}</h3><p>${inline(f.a)}</p></div>`)
    .join("");
  const hubLink = p.isHub
    ? ""
    : `<p><a href="${HUB_URL}">See all remote work from home jobs in the US</a></p>`;
  return `<div id="root" data-prerendered>${siteHeader()}<main><nav aria-label="Breadcrumb">${crumbs}</nav><article>
<img src="/images/${p.banner.file}" alt="${esc(p.banner.alt)}" width="1600" height="600" fetchpriority="high" />
<h1>${esc(p.h1)}</h1>
<aside aria-label="Quick answer"><p><strong>Quick answer</strong></p><p>${esc(p.quickAnswer)}</p><p>${esc(ARISE_DEFINITION)}</p><p>${esc(PAY_SOURCE)}</p></aside>
<p>${esc(LAST_UPDATED_LINE)}</p>
${p.intro.map((t) => `<p>${inline(t)}</p>`).join("")}
${sections}
<section><h2>Frequently asked questions</h2>${faq}</section>
${hubLink}
<section><h2>${esc(p.finalCta.heading)}</h2><p>${inline(p.finalCta.text)}</p><p><a href="${APPLY_URL}">Apply Now</a></p></section>
</article></main>${siteFooter()}</div>`;
}

function legalBody(p: LegalPageData): string {
  const sections = p.sections
    .map(
      (s) =>
        `<section><h2>${esc(s.h2)}</h2>${(s.paragraphs ?? []).map((t) => `<p>${esc(t)}</p>`).join("")}${s.items ? `<ul>${s.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}</section>`,
    )
    .join("");
  return `<div id="root" data-prerendered>${siteHeader()}<main><article><h1>${esc(p.h1)}</h1><p>Last updated: ${esc(p.updated)}</p>${sections}</article></main>${siteFooter()}</div>`;
}

/** Swap the homepage-specific head tags and body in the built index.html. */
function pageHtml(
  base: string,
  o: { title: string; description: string; path: string; image?: string; schema?: unknown; body: string },
): string {
  const url = `${SITE_DOMAIN}${o.path}`;
  const setMeta = (html: string, attr: string, key: string, value: string) =>
    html.replace(
      new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`),
      (_m, a, b) => `${a}${esc(value)}${b}`,
    );
  let html = base.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(o.title)}</title>`);
  html = setMeta(html, "name", "description", o.description);
  html = setMeta(html, "property", "og:title", o.title);
  html = setMeta(html, "property", "og:description", o.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", o.title);
  html = setMeta(html, "name", "twitter:description", o.description);
  if (o.image) {
    html = setMeta(html, "property", "og:image", o.image);
    html = setMeta(html, "name", "twitter:image", o.image);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_m, a, b) => `${a}${url}${b}`);
  html = html.replace(/<script type="application\/ld\+json"[\s\S]*?<\/script>\s*/, "");
  if (o.schema) {
    html = html.replace(
      "</head>",
      () => `    <script type="application/ld+json" data-vibe-seo>${JSON.stringify(o.schema).replace(/</g, "\\u003c")}</script>\n  </head>`,
    );
  }
  return html.replace(/<div id="root"[\s\S]*<\/div>(?=\s*<\/body>)/, () => o.body);
}

function headTags(): string {
  const m = (attr: string, key: string, content: string) =>
    `<meta ${attr}="${key}" content="${esc(content)}" data-vibe-seo />`;
  return [
    // The static markup stays visible so visitors never see a blank page
    // while the JS bundle loads. A little critical CSS keeps it readable
    // until React replaces it.
    `<style>#root[data-prerendered]{font-family:'Open Sans',system-ui,sans-serif;color:#2B2B2B;line-height:1.6;max-width:760px;margin:0 auto;padding:16px}#root[data-prerendered] nav a,#root[data-prerendered] footer a{margin-right:12px}#root[data-prerendered] h1,#root[data-prerendered] h2,#root[data-prerendered] h3{color:#1B2A4A;line-height:1.25}#root[data-prerendered] img{max-width:100%;height:auto}#root[data-prerendered] a{color:#0d627b}#root[data-prerendered] ul{padding-left:1.25rem}#root[data-prerendered] ol{padding-left:1.25rem}</style>`,
    `<link rel="canonical" href="${SITE_DOMAIN}/" data-vibe-seo />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    m("property", "og:type", "website"),
    m("property", "og:site_name", SITE_NAME),
    m("property", "og:url", `${SITE_DOMAIN}/`),
    m("name", "twitter:card", "summary_large_image"),
    `<script type="application/ld+json" data-vibe-seo>${JSON.stringify(HOME_SCHEMA_GRAPH).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export function seoPrerender(): Plugin {
  let outDir = "dist";
  return {
    name: "vibe-seo-prerender",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    // Write /<slug>/index.html for every hub, role and legal page so crawlers
    // get server-rendered HTML (no JavaScript needed) at the canonical URL.
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const base = fs.readFileSync(indexPath, "utf8");
      const write = (slug: string, html: string) => {
        const dir = path.join(outDir, slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), html);
      };
      for (const p of SEO_PAGES) {
        write(
          p.slug,
          pageHtml(base, {
            title: p.title,
            description: p.description,
            path: p.path,
            image: bannerUrl(p),
            schema: buildPageSchema(p),
            body: seoPageBody(p),
          }),
        );
      }
      for (const p of LEGAL_PAGES) {
        write(
          p.slug,
          pageHtml(base, {
            title: p.title,
            description: p.description,
            path: p.path,
            body: legalBody(p),
          }),
        );
      }
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html
          .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(fullTitle)}</title>`)
          .replace(
            /<meta\s+name="description"[\s\S]*?\/>/,
            () => `<meta name="description" content="${esc(HOME_DESCRIPTION)}" />`,
          )
          .replace(
            /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
            (_m, a, b) => `${a}${esc(fullTitle)}${b}`,
          )
          .replace(
            /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
            (_m, a, b) => `${a}${esc(HOME_DESCRIPTION)}${b}`,
          )
          .replace(
            /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
            (_m, a, b) => `${a}${HOME_OG_IMAGE}${b}`,
          )
          .replace(
            /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
            (_m, a, b) => `${a}${esc(fullTitle)}${b}`,
          )
          .replace(
            /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
            (_m, a, b) => `${a}${esc(HOME_DESCRIPTION)}${b}`,
          )
          .replace(
            /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
            (_m, a, b) => `${a}${HOME_OG_IMAGE}${b}`,
          )
          .replace("</head>", () => `    ${headTags()}\n  </head>`)
          .replace('<div id="root"></div>', () => staticBody());
      },
    },
  };
}
