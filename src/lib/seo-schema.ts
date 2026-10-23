import { FAQ_DATA } from "./faq-data";

/**
 * Homepage structured data, shared by the runtime <SEOHead> (Index page)
 * and the build-time prerender plugin so both emit identical JSON-LD.
 * Uses relative imports only because vite.config.ts loads this file.
 */
export const SITE_DOMAIN = "https://application.vibeconnectvs.com";
export const SITE_NAME = "Vibe Connect Virtual";

export const HOME_TITLE = "Work From Home Jobs | No Experience Needed";
export const HOME_DESCRIPTION =
  "Vibe Connect Virtual connects motivated people across the U.S. with real remote customer service roles. Get paid semi-monthly, no experience required, flexible shifts. Apply in 60 seconds.";
export const HOME_OG_IMAGE =
  "https://vibe.filesafe.space/1785542809220106141/attachments/dc354123-a298-403e-b9f8-e3f0ed1ce92d.png";

// Bump when the posting is refreshed. Google drops postings after validThrough.
const DATE_POSTED = "2026-10-24";
const VALID_THROUGH = "2027-01-31T23:59:59-05:00";

export const HOME_SCHEMA_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_DOMAIN}/#organization`,
      name: SITE_NAME,
      url: SITE_DOMAIN,
      description:
        "Remote customer service and BPO staffing company connecting U.S. job seekers with legitimate work-from-home agent roles.",
      telephone: "+1-903-847-7904",
      email: "hello@mail.vibeconnectvs.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_DOMAIN}/#website`,
      url: SITE_DOMAIN,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_DOMAIN}/#organization` },
    },
    {
      "@type": "JobPosting",
      "@id": `${SITE_DOMAIN}/#jobposting`,
      title: "Remote Customer Service Representative",
      description:
        "<p>Work from home with Vibe Connect Virtual as a remote customer service agent. No prior call center experience required; full onboarding and training are provided. Choose flexible shifts and get paid semi-monthly on the 15th and 30th. Roles include customer support, sales and retention, onboarding support, bilingual support, virtual assistant / back office, and live chat.</p><p>Requirements: Windows computer, wired internet connection, and a headset. Eligible U.S. states only.</p>",
      datePosted: DATE_POSTED,
      validThrough: VALID_THROUGH,
      employmentType: ["PART_TIME", "FULL_TIME"],
      directApply: true,
      url: SITE_DOMAIN,
      identifier: {
        "@type": "PropertyValue",
        name: SITE_NAME,
        value: "remote-customer-service",
      },
      hiringOrganization: {
        "@type": "Organization",
        name: SITE_NAME,
        sameAs: SITE_DOMAIN,
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "US",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_DOMAIN}/#faq`,
      mainEntity: FAQ_DATA.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};
