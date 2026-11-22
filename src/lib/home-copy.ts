import { PAY_RATE, STATES_LIST_OXFORD } from "./site-config";

/**
 * Homepage copy shared by the React components and the build-time
 * prerendered HTML (vite-plugins/seo-prerender.ts).
 */
export const HOME_H1 = "Work From Home. Get Paid Semi-Monthly. No Cubicle Required.";

export const HOME_INTRO =
  "VibeConnect connects motivated people across the U.S. with real, remote customer service roles. No commute, no rigid 9-to-5, no experience required to start.";

export const VALUE_PROPS = [
  {
    title: "Paid twice a month, on time",
    body: `You're paid every 15th and 30th by direct deposit. Active independent contractors earn ${PAY_RATE}, with performance incentives available (not guaranteed).`,
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

export const ABOUT_PARAGRAPH = `VibeConnect Virtual Services was built for one reason: the traditional call center job the commute, the fluorescent lights, the rigid break schedule doesn't work for how people actually want to work anymore. We help reliable, motivated people in 18 states (${STATES_LIST_OXFORD}) get started with real work-from-home roles, backed by paid certification on Arise and real support.`;

export const ROLES_INTRO =
  "Whether you prefer taking customer service calls or making sales calls, we help you get started with client contracts that match your skill level. Most jobs are phone-based, and some bilingual programs are omnichannel.";

export const HUB_LINK_TEXT = "Browse all remote work from home jobs in the US";

export const FINAL_CTA_BODY = `Skip the traffic, avoid expensive office attire, and earn ${PAY_RATE} from your home workstation, paid semi-monthly. Applications take less than 60 seconds.`;
