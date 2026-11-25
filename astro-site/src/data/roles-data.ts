/**
 * Role copy shared by the visible RolesSection and the build-time
 * prerendered HTML (vite-plugins/seo-prerender.ts), so crawlers and
 * users always see the same text.
 */
export interface RoleItem {
  title: string;
  description: string;
}

/*
 * Held until the jobs are confirmed: "Virtual Assistant / Back Office".
 * Removed: "Live Chat & Messaging Agent" (there are no chat-only roles).
 */
export const ROLES_DATA: RoleItem[] = [
  {
    title: "Customer Support Agent",
    description:
      "Answer inbound customer questions and help resolve customer profile issues. No cold calling.",
  },
  {
    title: "Sales & Retention Specialist",
    description:
      "Warm leads, quick connections, and earn performance commissions by assisting customers with renewals.",
  },
  {
    title: "Onboard Support Rep",
    description:
      "Assist incoming clients by scheduling, answer questions, and general support.",
  },
  {
    title: "Bilingual Support Agent",
    description:
      "English/Spanish support roles. Bilingual-only roles select on the application.",
  },
];
