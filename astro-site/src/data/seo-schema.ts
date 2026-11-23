import { FAQ_DATA } from "./faq-data";
import { faqPageNode, graph, organizationNode, webPageNode, websiteNode } from "./schema";
import { SITE_DOMAIN, SITE_NAME } from "../config/site";

export { SITE_DOMAIN, SITE_NAME };

/**
 * Homepage structured data (Organization, WebSite, WebPage + FAQPage).
 */

export const HOME_TITLE = "Work From Home Jobs | No Experience Needed";
export const HOME_DESCRIPTION =
  "Remote customer service jobs with Vibe Connect Virtual. Active contractors earn $18.00 per hour, paid semi-monthly. No experience required. Apply in 60 seconds.";
export const HOME_OG_IMAGE =
  "https://vibe.filesafe.space/1785542809220106141/attachments/dc354123-a298-403e-b9f8-e3f0ed1ce92d.png";

export const HOME_SCHEMA_GRAPH = graph(
  organizationNode(),
  websiteNode(),
  webPageNode({
    url: `${SITE_DOMAIN}/`,
    name: `${HOME_TITLE} | ${SITE_NAME}`,
    description: HOME_DESCRIPTION,
    faq: true,
  }),
  faqPageNode(`${SITE_DOMAIN}/`, FAQ_DATA.map((f) => ({ q: f.question, a: f.answer }))),
);
