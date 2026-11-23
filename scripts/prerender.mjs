// Build-time static site generation. Run after `vite build` and
// `vite build --ssr`: renders every route with the real React components and
// writes dist/<route>/index.html with full head tags + server-rendered body.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const { render, ROUTES } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  return re.test(html)
    ? html.replace(re, (_m, a, b) => `${a}${esc(value)}${b}`)
    : html;
};

function build(route) {
  const { html: body, head } = render(route);
  const m = (attr, key, v) => `<meta ${attr}="${key}" content="${esc(v)}" />`;
  let out = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(head.title)}</title>`);
  out = setMeta(out, "name", "description", head.description);
  out = setMeta(out, "property", "og:title", head.title);
  out = setMeta(out, "property", "og:description", head.description);
  out = setMeta(out, "property", "og:image", head.ogImage);
  out = setMeta(out, "name", "twitter:title", head.title);
  out = setMeta(out, "name", "twitter:description", head.description);
  out = setMeta(out, "name", "twitter:image", head.ogImage);
  const tags = [
    `<link rel="canonical" href="${head.canonicalUrl}" />`,
    head.noIndex
      ? `<meta name="robots" content="noindex, nofollow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    m("property", "og:type", "website"),
    m("property", "og:site_name", "Vibe Connect Virtual"),
    m("property", "og:url", head.canonicalUrl),
    m("name", "twitter:card", "summary_large_image"),
    // Without JS the scroll-reveal never runs, so show everything.
    `<noscript><style>.reveal-fade-up{opacity:1!important;transform:none!important}</style></noscript>`,
  ];
  if (head.schemaJson) {
    tags.push(
      `<script type="application/ld+json" data-vibe-seo>${JSON.stringify(head.schemaJson).replace(/</g, "\\u003c")}</script>`,
    );
  }
  out = out.replace("</head>", () => `    ${tags.join("\n    ")}\n  </head>`);
  out = out.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);

  const file =
    route === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  return route;
}

// Render every route against the pristine template before overwriting "/".
const done = ROUTES.map(build);
console.log(`prerendered ${done.length} routes:\n  ${done.join("\n  ")}`);
