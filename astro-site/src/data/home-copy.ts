import { PAY_RATE, STATES_LIST_OXFORD } from "../config/site";

/**
 * Homepage copy shared by the React components and the build-time
 * prerendered HTML (vite-plugins/seo-prerender.ts).
 */
export const HOME_H1 =
  "Work From Home. Get Paid Semi-Monthly. No Cubicle Required.";

export const HOME_INTRO =
  "Vibe Connect connects motivated people across the U.S. with real, remote customer service roles. No commute, no rigid 9-to-5, no experience required to start.";

export const VALUE_PROPS = [
  {
    title: "Paid twice a month, on time",
    body: `You're paid twice a month by direct deposit following Arise's semi-monthly invoice schedule. Active independent contractors earn ${PAY_RATE}, with performance incentives available (not guaranteed).`,
  },
  {
    title: "No Experience? No Problem",
    body: "If you're dependable and articulate, you'll learn the rest in paid certification on Arise. Arise registration and the background check are unpaid.",
  },
  {
    title: "Truly Remote",
    body: "No office, no commute. Work from eligible states across the U.S., choosing shifts that fit the rest of your life.",
  },
];

export const ABOUT_PARAGRAPH =
  "Vibe Connect Virtual Services helps reliable, motivated people in 18 states start real work-from-home roles. No commute, no fluorescent lights, no rigid break schedule: just paid certification on Arise and real support.";

export const ABOUT_STATES_LABEL = "Eligible states:";
export const ABOUT_STATES = STATES_LIST_OXFORD;

export const ROLES_INTRO =
  "Whether you prefer taking customer service calls or making sales calls, we help you get started with client contracts that match your skill level. Most jobs are phone-based, and some bilingual programs are omnichannel.";

export const HUB_LINK_TEXT = "Browse all remote work from home jobs in the US";

export const FINAL_CTA_BODY = `Skip the traffic, avoid expensive office attire, and earn ${PAY_RATE} from your home workstation, paid semi-monthly. Applications take less than 60 seconds.`;
