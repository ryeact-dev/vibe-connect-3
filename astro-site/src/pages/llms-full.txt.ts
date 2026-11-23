import type { APIRoute } from "astro";
import { SEO_PAGES, ARISE_DEFINITION, type Block } from "../data/seo-pages";
import { FAQ_DATA } from "../data/faq-data";
import { SITE_DOMAIN, SITE_LEGAL_NAME, LAST_UPDATED_DISPLAY, PAY_SOURCE } from "../config/site";

/** Full text of the main pages as Markdown, for AI assistants (companion to llms.txt). */
const abs = (s: string) => s.replace(/\]\((\/[^)]*)\)/g, (_m, p) => `](${SITE_DOMAIN}${p})`);

const block = (b: Block): string =>
  b.type === "p" ? abs(b.text)
  : b.type === "ul" ? b.items.map((i) => `- ${abs(i)}`).join("\n")
  : b.type === "ol" ? b.items.map((i, n) => `${n + 1}. ${abs(i)}`).join("\n")
  : b.text;

export const GET: APIRoute = () => {
  const out: string[] = [
    `# ${SITE_LEGAL_NAME}: full page text`,
    "",
    `> ${ARISE_DEFINITION} Last updated: ${LAST_UPDATED_DISPLAY}. ${PAY_SOURCE}`,
    "",
    `Index of pages: ${SITE_DOMAIN}/llms.txt`,
    "",
    "## Frequently asked questions (homepage)",
    "",
    ...FAQ_DATA.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
  ];
  for (const p of SEO_PAGES) {
    out.push(`## ${p.h1}`, "", `URL: ${SITE_DOMAIN}${p.path}`, "", `Quick answer: ${p.quickAnswer}`, "");
    p.intro.forEach((t) => out.push(abs(t), ""));
    for (const s of p.sections) {
      out.push(`### ${s.h2}`, "");
      s.blocks.forEach((b) => out.push(block(b), ""));
    }
    out.push("### Frequently asked questions", "");
    p.faq.forEach((f) => out.push(`**${f.q}** ${abs(f.a)}`, ""));
    out.push(`**${p.finalCta.heading}** ${abs(p.finalCta.text)}`, "", "---", "");
  }
  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
