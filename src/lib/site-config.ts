/**
 * Facts shared by every page, the prerender plugin and the JSON-LD.
 * Relative imports only: vite.config.ts loads this file through the plugin.
 */
export const SITE_DOMAIN = "https://application.vibeconnectvs.com";
export const SITE_NAME = "Vibe Connect Virtual";
export const SITE_LEGAL_NAME = "Vibe Connect Virtual Services";

/** The application form. Every Apply Now button and link points here. */
export const APPLY_URL = "/application-page";
export const HUB_URL = "/remote-work-from-home-jobs-us";

export const CONTACT_PHONE_DISPLAY = "+1 (903) 847-7904";
export const CONTACT_PHONE_TEL = "+19038477904";
export const CONTACT_PHONE_SCHEMA = "+1-903-847-7904";
export const CONTACT_EMAIL = "hello@mail.vibeconnectvs.com";

export const ORG_LOGO_URL =
  "https://assets.cdn.filesafe.space/2pGpEHYvndYECBOCEp4h/media/6a6aba12cf81b06f05cfd1fe.png";

/** Update with every pay change (and the "Last updated" line below). */
export const PAY_RATE = "$18.00 per hour";
export const LAST_UPDATED_DISPLAY = "November 23, 2026";
export const LAST_UPDATED_ISO = "2026-11-23";
export const PAY_SOURCE =
  "Source: Vibe Connect program announcements, November 2026.";

export const ELIGIBLE_STATES = [
  "Alabama",
  "Arizona",
  "Arkansas",
  "Delaware",
  "Florida",
  "Georgia",
  "Kentucky",
  "Louisiana",
  "Michigan",
  "Mississippi",
  "Missouri",
  "Nevada",
  "North Carolina",
  "Ohio",
  "Oklahoma",
  "South Carolina",
  "Texas",
  "Washington",
] as const;

/** "Alabama, Arizona, ... Texas, and Washington" (Oxford comma, as in the FAQ copy). */
export const STATES_LIST_OXFORD = `${ELIGIBLE_STATES.slice(0, -1).join(", ")}, and ${ELIGIBLE_STATES[ELIGIBLE_STATES.length - 1]}`;
/** "Alabama, ... Texas and Washington" (no Oxford comma, as in the page copy). */
export const STATES_LIST = `${ELIGIBLE_STATES.slice(0, -1).join(", ")} and ${ELIGIBLE_STATES[ELIGIBLE_STATES.length - 1]}`;
