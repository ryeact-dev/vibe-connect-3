import { FAQ_DATA } from "./faq-data";
import { LAST_UPDATED_ISO } from "../config/site";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_SCHEMA,
  ORG_LOGO_URL,
  SITE_DOMAIN,
  SITE_LEGAL_NAME,
  SITE_NAME,
} from "../config/site";

export { SITE_DOMAIN, SITE_NAME };

/**
 * Homepage structured data (Organization, WebSite, WebPage + FAQPage).
 */

export const HOME_TITLE = "Work From Home Jobs | No Experience Needed";
export const HOME_DESCRIPTION =
  "Remote customer service jobs with Vibe Connect Virtual. Active contractors earn $18.00 per hour, paid semi-monthly. No experience required. Apply in 60 seconds.";
export const HOME_OG_IMAGE =
  "https://vibe.filesafe.space/1785542809220106141/attachments/dc354123-a298-403e-b9f8-e3f0ed1ce92d.png";

export const HOME_SCHEMA_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_DOMAIN}/#organization`,
      name: SITE_LEGAL_NAME,
      url: SITE_DOMAIN,
      description:
        "Remote customer service and BPO staffing company connecting U.S. job seekers with real work-from-home agent roles as independent contractors on Arise.",
      logo: ORG_LOGO_URL,
      telephone: CONTACT_PHONE_SCHEMA,
      email: CONTACT_EMAIL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_DOMAIN}/#website`,
      url: SITE_DOMAIN,
      name: SITE_LEGAL_NAME,
      publisher: { "@id": `${SITE_DOMAIN}/#organization` },
    },
    {
      "@type": ["WebPage", "FAQPage"],
      "@id": `${SITE_DOMAIN}/#webpage`,
      url: `${SITE_DOMAIN}/`,
      name: `${HOME_TITLE} | ${SITE_NAME}`,
      description: HOME_DESCRIPTION,
      inLanguage: "en-US",
      dateModified: LAST_UPDATED_ISO,
      isPartOf: { "@id": `${SITE_DOMAIN}/#website` },
      publisher: { "@id": `${SITE_DOMAIN}/#organization` },
      mainEntity: FAQ_DATA.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};
