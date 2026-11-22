import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, SITE_LEGAL_NAME } from "./site-config";

/**
 * Privacy Policy and Terms of Service. Drafted from what the site actually
 * does (an application form that collects contact details and SMS consent).
 * These are starting drafts: have counsel review before relying on them.
 */
export interface LegalSection {
  h2: string;
  paragraphs?: string[];
  items?: string[];
}
export interface LegalPageData {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  updated: string;
  sections: LegalSection[];
}

const CONTACT = `Questions? Email ${CONTACT_EMAIL} or call or text ${CONTACT_PHONE_DISPLAY}.`;

export const LEGAL_PAGES: LegalPageData[] = [
  {
    slug: "privacy-policy",
    path: "/privacy-policy",
    title: "Privacy Policy | Vibe Connect Virtual",
    description:
      "How Vibe Connect Virtual Services collects, uses and protects the information you give us when you apply.",
    h1: "Privacy Policy",
    updated: "November 23, 2026",
    sections: [
      {
        h2: "Who we are",
        paragraphs: [
          `${SITE_LEGAL_NAME} (Vibe Connect Virtual LLC) helps people get started as independent contractors on Arise, a platform where independent contractors register and find online jobs. This policy explains what we collect on this website and how we use it.`,
        ],
      },
      {
        h2: "Information we collect",
        paragraphs: ["When you complete our application form, we collect:"],
        items: [
          "Your name, email address and phone number",
          "Your answers to the screening questions on the form (for example, equipment, state and availability)",
          "Any optional notes you choose to add",
          "Your text message consent choices",
          "Basic technical information, such as the page you applied from, your device type and browser",
        ],
      },
      {
        h2: "How we use your information",
        items: [
          "To review your application and contact you about onboarding with Vibe Connect",
          "To send the text messages you agreed to receive",
          "To answer your questions and improve our website",
        ],
      },
      {
        h2: "Text messages",
        paragraphs: [
          "If you check a consent box on the application form, we may text you at the number you provided. Message frequency varies, and message and data rates may apply. Text HELP for assistance or reply STOP to opt out at any time.",
        ],
      },
      {
        h2: "Sharing",
        paragraphs: [
          "We use service providers to host this website, store application records and send messages. We do not sell your personal information. Arise runs its own registration, assessment and background check, and handles the information you give it under its own terms.",
        ],
      },
      {
        h2: "Your choices",
        paragraphs: [
          `You can ask us to update or delete the information you gave us, or stop text messages, by contacting us. ${CONTACT}`,
        ],
      },
      { h2: "Contact", paragraphs: [CONTACT] },
    ],
  },
  {
    slug: "terms",
    path: "/terms",
    title: "Terms of Service | Vibe Connect Virtual",
    description:
      "The terms for using the Vibe Connect Virtual Services website and application form.",
    h1: "Terms of Service",
    updated: "November 23, 2026",
    sections: [
      {
        h2: "Using this website",
        paragraphs: [
          `By using this website you agree to these terms. The site is run by ${SITE_LEGAL_NAME} (Vibe Connect Virtual LLC) and gives information about getting started as an independent contractor on Arise.`,
        ],
      },
      {
        h2: "Independent contractor status",
        paragraphs: [
          "Agents are independent contractors, not employees of Vibe Connect Virtual Services or Arise. Roles are 1099 independent contractor positions. Applying does not guarantee that you will be accepted, certified or offered work.",
        ],
      },
      {
        h2: "Costs",
        paragraphs: [
          "Vibe Connect charges $0 upfront to apply or register. Before you enrol in a client certification class, Arise requires a standard third-party national background check ($30, paid directly to the background check provider).",
        ],
      },
      {
        h2: "Pay information",
        paragraphs: [
          "Pay figures on this site describe active independent contractors supporting clients through Vibe Connect. Performance incentives, where available, are not guaranteed and eligibility requirements apply. Exact client-specific rates, bonus structures and class schedules appear in the Arise portal after registration and signing the standard Agent NDA.",
        ],
      },
      {
        h2: "Your application",
        paragraphs: [
          "Information you submit must be accurate. We may decline or stop processing an application that is incomplete, inaccurate or from outside the eligible states. Arise decides the outcome of its own assessment, registration and background check.",
        ],
      },
      {
        h2: "Changes",
        paragraphs: [
          "We may update this site and these terms. The date at the top shows when they were last changed.",
        ],
      },
      { h2: "Contact", paragraphs: [CONTACT] },
    ],
  },
];
