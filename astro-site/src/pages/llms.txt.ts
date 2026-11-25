import type { APIRoute } from "astro";
import { HUB_PAGE, ROLE_PAGES } from "../data/seo-pages";
import { LEGAL_PAGES } from "../data/legal-pages";
import {
  CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, ELIGIBLE_STATES, LAST_UPDATED_DISPLAY, PAY_RATE, PAY_SOURCE, SITE_DOMAIN, SITE_LEGAL_NAME,
} from "../config/site";

/**
 * llms.txt (https://llmstxt.org): an H1, a blockquote summary, free-form facts,
 * then H2 sections that are lists of links with notes. Facts only.
 */
export const GET: APIRoute = () => {
  const link = (title: string, path: string, note?: string) =>
    `- [${title}](${SITE_DOMAIN}${path})${note ? `: ${note}` : ""}`;

  const lines = [
    `# ${SITE_LEGAL_NAME}`,
    "",
    `> ${SITE_LEGAL_NAME} helps people get started as independent contractors on Arise, the platform where independent contractors register and find online jobs. Most jobs are phone-based customer service or sales; some bilingual (English/Spanish) programs are omnichannel. Agents are independent contractors (1099), not employees.`,
    "",
    `Last updated: ${LAST_UPDATED_DISPLAY}. Full page text is available in [llms-full.txt](${SITE_DOMAIN}/llms-full.txt).`,
    "",
    "Key facts:",
    "",
    `- Pay: active independent contractors earn ${PAY_RATE}, paid in 30-minute serviced intervals, with performance incentives available (not guaranteed). Payments are issued semi-monthly by direct deposit, on the 15th and the 30th. ${PAY_SOURCE}`,
    `- Eligible states (${ELIGIBLE_STATES.length}): ${ELIGIBLE_STATES.join(", ")}.`,
    "- Process: apply, onboarding with Vibe Connect, pass the Arise assessment, Arise registration and background check (unpaid), certification days (paid), then find jobs on Arise.",
    "- Cost: $0 upfront to apply or register with Vibe Connect. Before enrolling in a client certification class, Arise requires a standard third-party national background check ($30, paid directly to the background check provider). It is a one-time $30.00 fee paid directly to Arise's screening vendor, valid for 36 months, prior to client enrollment. Once you are enrolled and actively earning revenue (including paid certification), a flat $35.00 administrative service fee applies per semi-monthly pay period ($0 is charged when $0 is earned).",
    "- Equipment: Windows 10 or 11 desktop or laptop (Chromebooks and Macs are not compatible), hardwired Ethernet connection (no Wi-Fi), USB corded headset with microphone, and a working webcam.",
    `- Contact: ${CONTACT_PHONE_DISPLAY}; ${CONTACT_EMAIL}`,
    "",
    "## Main pages",
    "",
    link("Home", "/", "who we are, roles, pay, states and FAQ"),
    link(HUB_PAGE.h1, HUB_PAGE.path, HUB_PAGE.description),
    link("Apply", "/application-page", "the 60-second application form"),
    "",
    "## Role pages",
    "",
    ...ROLE_PAGES.map((p) => link(p.h1, p.path, p.description)),
    "",
    "## Optional",
    "",
    ...LEGAL_PAGES.map((p) => link(p.h1, p.path)),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
