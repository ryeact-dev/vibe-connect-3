/**
 * Role copy shared by the visible RolesSection and the build-time
 * prerendered HTML (vite-plugins/seo-prerender.ts), so crawlers and
 * users always see the same text.
 */
export interface RoleItem {
  title: string;
  description: string;
}

export const ROLES_DATA: RoleItem[] = [
  {
    title: "Customer Support Agent",
    description:
      "Answer inbound customer questions and help resolve customer profile issues. No cold calling.",
  },
  {
    title: "Sales & Retention Specialist",
    description:
      "Warm leads, quick connections, and earn performance commissions by assist customers with renewals.",
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
  {
    title: "Virtual Assistant / Back Office",
    description: "Admin, data entry, and chat support for account team.",
  },
  {
    title: "Live Chat & Messaging Agent",
    description:
      "Support customers over chat global platform if you prefer typing over talking.",
  },
];
