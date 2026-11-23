import type { APIRoute } from "astro";
import { SEO_PAGES } from "../data/seo-pages";
import {
  CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, ELIGIBLE_STATES, LAST_UPDATED_DISPLAY, PAY_RATE, PAY_SOURCE, SITE_DOMAIN, SITE_LEGAL_NAME,
} from "../config/site";

/** Plain-text summary for AI assistants and answer engines (llms.txt convention). Facts only. */
export const GET: APIRoute = () => {
  const lines = [
    `# ${SITE_LEGAL_NAME}`,
    "",
    `> ${SITE_LEGAL_NAME} helps people get started as independent contractors on Arise, the platform where independent contractors register and find online jobs. Most jobs are phone-based customer service or sales; some bilingual (English/Spanish) programs are omnichannel. Agents are independent contractors (1099), not employees.`,
    "",
    `Last updated: ${LAST_UPDATED_DISPLAY}`,
    "",
    "## Key facts",
    `- Pay: active independent contractors earn ${PAY_RATE}, paid in 30-minute serviced intervals. Performance incentives are available but not guaranteed. Payments are issued semi-monthly by direct deposit, on the 15th and the 30th. ${PAY_SOURCE}`,
    `- Eligible states (${ELIGIBLE_STATES.length}): ${ELIGIBLE_STATES.join(", ")}.`,
    "- Process: apply, onboarding with Vibe Connect, pass the Arise assessment, Arise registration and background check (unpaid), certification days (paid), then find jobs on Arise.",
    "- Cost: $0 upfront to apply or register with Vibe Connect. Before enrolling in a client certification class, Arise requires a standard third-party national background check ($30, paid directly to the background check provider).",
    "- Equipment: Windows 10 or 11 desktop or laptop (no Mac or Chromebook), hardwired Ethernet (no Wi-Fi), USB corded headset with microphone, working webcam.",
    `- Contact: ${CONTACT_PHONE_DISPLAY}, ${CONTACT_EMAIL}`,
    "",
    "## Pages",
    `- [Home](${SITE_DOMAIN}/): overview, roles and FAQ`,
    ...SEO_PAGES.map((p) => `- [${p.h1}](${SITE_DOMAIN}${p.path}): ${p.description}`),
    `- [Apply](${SITE_DOMAIN}/application-page): the application form`,
    `- [Privacy Policy](${SITE_DOMAIN}/privacy-policy)`,
    `- [Terms of Service](${SITE_DOMAIN}/terms)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
