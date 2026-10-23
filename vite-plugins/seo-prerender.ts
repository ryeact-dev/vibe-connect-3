import type { Plugin } from "vite";
import { FAQ_DATA } from "../src/lib/faq-data";
import { ROLES_DATA } from "../src/lib/roles-data";
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

  return `<div id="root"><header><nav aria-label="Primary"><a href="/">${esc(SITE_NAME)}</a> <a href="#about">About Us</a> <a href="#roles">Available Roles</a> <a href="#faq">FAQ</a> <a href="/application-page">Apply Now</a></nav></header><main>
<section id="home"><h1>Work From Home. Get Paid Semi-Monthly. No Cubicle Required.</h1><p>VibeConnect connects motivated people across the U.S. with real, remote customer service roles. No commute, no rigid 9-to-5, no experience required to start.</p><p><a href="/application-page">Apply Now!</a></p></section>
<section><h2>Why work with Vibe Connect Virtual?</h2><ul><li><h3>Paid twice a month, on time</h3><p>No waiting a month for your first paycheck. You're paid every 15th and 30th, like clockwork.</p></li><li><h3>No Experience? No Problem</h3><p>We train you. If you're dependable and articulate, we'll teach you the rest for your first live calls.</p></li><li><h3>Truly Remote</h3><p>No office, no commute. Work from eligible states across the U.S., matching shifts 24/7 to fit the rest of your life.</p></li></ul></section>
<section id="about"><h2>We Are The Best Remote Career Service For Your People</h2><p>VibeConnect Virtual Services was built for one reason: the traditional call center job doesn't work for how people actually want to work anymore. We match reliable, motivated people across 21 states with legitimate work-from-home roles, backed by real training and real support.</p><h2>We're Built Around the Agent, Not Just the Client</h2><p>Most staffing companies optimize for the business paying the bill. We optimize for the person doing the work because agents who feel supported stay longer, perform better, and actually enjoy the job.</p></section>
<section id="roles"><h2>Find the Role That Fits You</h2><p>Whether you prefer voice calls, live messaging, or back-office processing, we connect you with client contracts that match your skill level.</p><ul>${roles}</ul></section>
<section id="faq"><h2>Frequently Asked Questions</h2>${faqs}</section>
</main><footer id="contact"><h2>Contact Us &amp; More Details</h2><p><a href="tel:+19038477904">+1.903.847.7904</a> · <a href="mailto:hello@mail.vibeconnectvs.com">hello@mail.vibeconnectvs.com</a></p><p>&copy; Vibe Connect Virtual LLC. All rights reserved.</p></footer></div>`;
}

function headTags(): string {
  const m = (attr: string, key: string, content: string) =>
    `<meta ${attr}="${key}" content="${esc(content)}" data-vibe-seo />`;
  return [
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
  return {
    name: "vibe-seo-prerender",
    apply: "build",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(fullTitle)}</title>`)
          .replace(
            /<meta\s+name="description"[\s\S]*?\/>/,
            `<meta name="description" content="${esc(HOME_DESCRIPTION)}" />`,
          )
          .replace(
            /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
            `$1${esc(fullTitle)}$2`,
          )
          .replace(
            /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
            `$1${esc(HOME_DESCRIPTION)}$2`,
          )
          .replace(
            /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
            `$1${HOME_OG_IMAGE}$2`,
          )
          .replace(
            /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
            `$1${esc(fullTitle)}$2`,
          )
          .replace(
            /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
            `$1${esc(HOME_DESCRIPTION)}$2`,
          )
          .replace(
            /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
            `$1${HOME_OG_IMAGE}$2`,
          )
          .replace("</head>", `    ${headTags()}\n  </head>`)
          .replace('<div id="root"></div>', staticBody());
      },
    },
  };
}
