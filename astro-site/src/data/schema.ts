import {
  CONTACT_EMAIL,
  CONTACT_PHONE_SCHEMA,
  ELIGIBLE_STATES,
  LAST_UPDATED_ISO,
  ORG_LOGO_URL,
  SITE_DOMAIN,
  SITE_LEGAL_NAME,
} from "../config/site";

/**
 * Shared JSON-LD building blocks. Every page links to the same Organization and
 * WebSite nodes through stable @id values, so crawlers see one entity.
 */
export const ORG_ID = `${SITE_DOMAIN}/#organization`;
export const WEBSITE_ID = `${SITE_DOMAIN}/#website`;
export const FACEBOOK_URL = "https://www.facebook.com/people/Vibe-Connect-Virtual-Services/61567573289685/";

export const ORG_DESCRIPTION =
  "Vibe Connect Virtual Services helps people get started as independent contractors on Arise, the platform where independent contractors register and find online jobs.";

export const organizationNode = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_LEGAL_NAME,
  url: `${SITE_DOMAIN}/`,
  description: ORG_DESCRIPTION,
  logo: { "@type": "ImageObject", url: ORG_LOGO_URL, contentUrl: ORG_LOGO_URL },
  telephone: CONTACT_PHONE_SCHEMA,
  email: CONTACT_EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: CONTACT_PHONE_SCHEMA,
    email: CONTACT_EMAIL,
    areaServed: "US",
    availableLanguage: ["English", "Spanish"],
  },
  areaServed: ELIGIBLE_STATES.map((name) => ({
    "@type": "State",
    name,
    containedInPlace: { "@type": "Country", name: "United States" },
  })),
  sameAs: [FACEBOOK_URL],
});

export const websiteNode = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_DOMAIN}/`,
  name: SITE_LEGAL_NAME,
  inLanguage: "en-US",
  publisher: { "@id": ORG_ID },
});

export interface Crumb { name: string; url: string }

export const breadcrumbNode = (pageUrl: string, crumbs: Crumb[]) => ({
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: c.url,
  })),
});

export interface WebPageOptions {
  url: string;
  name: string;
  description: string;
  types?: string[];
  image?: { url: string; width: number; height: number };
  breadcrumb?: boolean;
  speakableSelector?: string;
  faq?: { q: string; a: string }[];
}

/** WebPage (also FAQPage when `faq` is given) linked to the shared Organization and WebSite. */
export const webPageNode = (o: WebPageOptions) => ({
  "@type": o.faq ? ["WebPage", "FAQPage"] : (o.types ?? ["WebPage"]),
  "@id": `${o.url}#webpage`,
  url: o.url,
  name: o.name,
  description: o.description,
  inLanguage: "en-US",
  dateModified: LAST_UPDATED_ISO,
  isPartOf: { "@id": WEBSITE_ID },
  publisher: { "@id": ORG_ID },
  about: { "@id": ORG_ID },
  ...(o.image && {
    primaryImageOfPage: { "@type": "ImageObject", url: o.image.url, contentUrl: o.image.url, width: o.image.width, height: o.image.height },
  }),
  ...(o.breadcrumb && { breadcrumb: { "@id": `${o.url}#breadcrumb` } }),
  ...(o.speakableSelector && {
    speakable: { "@type": "SpeakableSpecification", cssSelector: [o.speakableSelector] },
  }),
  ...(o.faq && {
    mainEntity: o.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }),
});

export const graph = (...nodes: Record<string, unknown>[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
