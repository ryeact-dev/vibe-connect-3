import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, SITE_LEGAL_NAME } from "../config/site";

/**
 * Privacy Policy and Terms of Service, including the text-message (SMS) program
 * terms required for A2P 10DLC registration. They describe only what the site and
 * application form actually do. Have counsel review before relying on them.
 */
export type LegalItem = string | { lead: string; text: string };
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: LegalItem[] };

export interface LegalSection {
  h2: string;
  id?: string;
  blocks: LegalBlock[];
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

const UPDATED = "November 23, 2026";
const BRAND = `${SITE_LEGAL_NAME} (Vibe Connect Virtual LLC)`;
const p = (text: string): LegalBlock => ({ type: "p", text });
const ul = (...items: LegalItem[]): LegalBlock => ({ type: "ul", items });
const h3 = (text: string): LegalBlock => ({ type: "h3", text });

export const LEGAL_PAGES: LegalPageData[] = [
  // ------------------------------------------------------------------ TERMS
  {
    slug: "terms",
    path: "/terms",
    title: "Terms of Service | Vibe Connect Virtual",
    description:
      "Terms for using the Vibe Connect Virtual Services website and application form, including the text message (SMS) program terms.",
    h1: "Terms of Service",
    updated: UPDATED,
    sections: [
      {
        h2: "About these terms",
        blocks: [
          p(`${BRAND} helps people get started as independent contractors on Arise, the platform where independent contractors register and find online jobs. These terms apply to your use of this website, including the application form. By using this website, you agree to them. If you do not agree, please do not use the site.`),
        ],
      },
      {
        h2: "General information only",
        blocks: [
          p("Information on this site is general information about getting started as an independent contractor on Arise. It is not legal, tax or financial advice. Submitting the application form does not guarantee that you will be accepted, certified or offered work."),
        ],
      },
      {
        h2: "Independent contractor status",
        blocks: [
          p("Agents are independent contractors, not employees of Vibe Connect Virtual Services or Arise. Roles are 1099 independent contractor positions, not W-2 employment."),
        ],
      },
      {
        h2: "Applying, costs and pay",
        blocks: [
          p("Vibe Connect charges $0 upfront to apply or register. Before you enroll in a client certification class, Arise requires a standard third-party national background check ($30, paid directly to the background check provider). This is a one-time $30.00 fee paid directly to Arise's screening vendor, valid for 36 months, prior to client enrollment. Arise runs its own registration, assessment and background check under its own terms and decides their outcome."),
          p("Pay figures on this site describe active independent contractors supporting clients through Vibe Connect. Performance incentives, where available, are not guaranteed and eligibility requirements apply. Exact client-specific rates, bonus structures and class schedules appear in the Arise portal after registration and signing the standard Agent NDA."),
        ],
      },
      {
        h2: "Text message terms (SMS)",
        id: "sms",
        blocks: [
          p(`These terms apply if you agree to receive text messages from ${SITE_LEGAL_NAME}.`),
          ul(
            { lead: "Two separate, optional programs.", text: "Job hiring and newsletter texts are non-marketing messages, such as updates about your application and next steps, and our newsletter. Marketing and promotional texts cover special offers, discounts and new product updates, among others. Each program needs its own consent, given by checking its own box on our application form. The boxes are never pre-checked." },
            { lead: "How you opt in.", text: "You opt in by checking the box for each program on our application form and submitting the form with your mobile number." },
            { lead: "Consent is optional.", text: "You do not have to agree to text messages to apply or to work with us. Consent is not a condition of applying or of any purchase." },
            { lead: "Message frequency varies.", text: "How often you get texts depends on your activity with us and on which programs you joined." },
            { lead: "Message and data rates may apply.", text: "Your mobile carrier sets these charges." },
            { lead: "Stop or get help.", text: `Reply STOP at any time to cancel. Reply HELP for help, or email ${CONTACT_EMAIL}. Replying STOP ends all texts from that number. To keep job hiring texts and stop marketing ones, email us. You can join again at any time by checking the box on our application form.` },
            { lead: "Carriers are not liable.", text: "Wireless carriers are not liable for delayed or undelivered messages." },
            { lead: "Your number.", text: "Give us only a number you own or are authorized to use, and tell us if it changes." },
            { lead: "Privacy.", text: "We do not share mobile numbers or text message consent with third parties or affiliates for their marketing or promotional purposes. Read our Privacy Policy." },
          ),
        ],
      },
      {
        h2: "Age requirement",
        blocks: [p("You must be at least 18 years old to use this website, submit our application form or agree to receive text messages from us.")],
      },
      {
        h2: "Using this website",
        blocks: [
          ul(
            "Use the site only for lawful purposes.",
            "Do not try to gain unauthorized access to the site or interfere with how it works.",
            "Give accurate information in our forms, and do not submit information about other people without their permission.",
            "Do not send Social Security numbers or other sensitive documents through our forms. Registration and the background check happen on Arise and with the background check provider.",
          ),
        ],
      },
      {
        h2: "Our content",
        blocks: [p("The text, logo and design of this website belong to Vibe Connect Virtual LLC. You may view and print pages for your own use. Please do not copy or reuse our content for commercial purposes without our permission.")],
      },
      {
        h2: "Accuracy and availability",
        blocks: [p("We work to keep this site accurate and up to date, but pay, eligible states and program details can change, and we cannot promise that every page is current or free of errors. The site may be unavailable from time to time.")],
      },
      {
        h2: "Links to other websites",
        blocks: [p("This site links to other websites, including Arise. We do not control them and are not responsible for their content or practices. Their own terms apply.")],
      },
      {
        h2: "Privacy",
        blocks: [p("Our Privacy Policy explains how we handle your information.")],
      },
      {
        h2: "Changes to these terms",
        blocks: [p("We may update these terms from time to time. The date at the top shows when they last changed. Continuing to use the site means you accept the updated terms.")],
      },
      {
        h2: "Contact us",
        blocks: [p(`Questions about these terms? Email ${CONTACT_EMAIL} or call or text ${CONTACT_PHONE_DISPLAY}.`)],
      },
    ],
  },

  // ---------------------------------------------------------------- PRIVACY
  {
    slug: "privacy-policy",
    path: "/privacy-policy",
    title: "Privacy Policy | Vibe Connect Virtual",
    description:
      "How Vibe Connect Virtual Services collects, uses and protects the information you give us when you apply, including how we handle text message (SMS) consent.",
    h1: "Privacy Policy",
    updated: UPDATED,
    sections: [
      {
        h2: "Who we are",
        blocks: [
          p(`${BRAND} helps people get started as independent contractors on Arise, the platform where independent contractors register and find online jobs. This policy explains what we collect through this website, how we use it and the choices you have.`),
        ],
      },
      {
        h2: "What this policy covers",
        blocks: [
          p("This policy covers this website and the application form. Arise and its background check provider run their own registration, assessment and background check, and handle the information you give them under their own policies."),
        ],
      },
      {
        h2: "Information we collect",
        blocks: [
          ul(
            { lead: "Application form:", text: "your name, phone number and email, your yes or no answers to our screening questions (independent contractor status, equipment, ability to act promptly, state of residence and willingness to complete the unpaid registration steps) and anything you choose to add in the optional notes. Applications are received in GoHighLevel, the customer relationship management platform we use." },
            { lead: "Text message choices:", text: "if you agree to text messages, your mobile number, which kind of texts you agreed to (job hiring and newsletter, marketing and promotional, or both) and a record of your consent. See Text messages (SMS) below." },
            { lead: "Basic technical data:", text: "like most websites, our hosting provider may log your IP address, browser type and the pages you visit." },
          ),
        ],
      },
      {
        h2: "What we do not collect here",
        blocks: [
          p("Our application form never asks for your Social Security number and never accepts document uploads. Please do not include either in a form or message. Registration and the background check take place on Arise and with the background check provider."),
        ],
      },
      {
        h2: "How we use your information",
        blocks: [
          ul(
            "To review your application and contact you about onboarding with Vibe Connect.",
            "To answer your questions.",
            "To send the text messages you agreed to receive, and only those.",
            "To keep records, including your text message consent, and meet our legal obligations.",
            "To keep this website working and secure.",
          ),
        ],
      },
      {
        h2: "How we share your information",
        blocks: [
          p("We do not sell your personal information. We share it only with service providers that help us run this website and our application process, such as our website host, GoHighLevel and our messaging provider, and when the law requires it."),
        ],
      },
      {
        h2: "Text messages (SMS)",
        id: "sms",
        blocks: [
          p(`If you choose to receive text messages from ${SITE_LEGAL_NAME}, this section explains what we send, how your consent works and how we handle your mobile information.`),
          h3("Two separate, optional kinds of text"),
          ul(
            { lead: "Job hiring and newsletter texts (non-marketing):", text: "such as updates about your application and next steps, and our newsletter." },
            { lead: "Marketing and promotional texts:", text: "special offers, discounts and new product updates, among others." },
          ),
          p("You agree to each kind separately. Each has its own box on our application form, and the boxes are never pre-checked. You can apply without agreeing to any text messages. Consent is not a condition of applying or of any purchase."),
          h3("What we keep"),
          p("We keep your mobile number, which kind or kinds of texts you agreed to, and a record of your consent: the date and time, and the page where you agreed. We keep this record so we can show when and how you agreed."),
          h3("Frequency, rates, STOP and HELP"),
          p(`Message frequency varies. Message and data rates may apply. Reply STOP at any time to cancel text messages. Reply HELP for help, or email ${CONTACT_EMAIL}. Replying STOP ends all texts from that number. If you want to keep job hiring texts and stop marketing ones, email us and tell us.`),
          h3("Sharing your mobile information"),
          p("We do not share mobile numbers or text message consent with third parties or affiliates for their marketing or promotional purposes. We may share this information with service providers that help us send the messages you agreed to, such as our messaging platform (GoHighLevel) and wireless carriers."),
          p("The terms for text messages are in our Terms of Service."),
        ],
      },
      {
        h2: "Cookies and tracking",
        blocks: [p("This website does not use advertising cookies. If we add analytics or other tracking tools, we will update this policy and explain how to opt out.")],
      },
      {
        h2: "Links to other websites",
        blocks: [p("This site links to other websites, including Arise. We do not control them, and their privacy practices are their own.")],
      },
      {
        h2: "How we protect information",
        blocks: [
          p("We take reasonable administrative, technical and organizational steps to protect the information you give us through this website. This website is served over an encrypted (HTTPS) connection. We aim to limit access to application information to the people who need it to respond to you, and we use service providers that maintain their own security safeguards."),
          p("No method of sending or storing information is completely secure, so we cannot guarantee absolute security."),
        ],
      },
      {
        h2: "How long we keep information",
        blocks: [p("We keep your information only as long as we need it to respond to you, run our application process and meet legal and record-keeping obligations.")],
      },
      {
        h2: "Your choices",
        blocks: [
          p(`You can ask us to update or delete the information you sent through our application form, unless we need to keep it for legal or record-keeping reasons. You can stop text messages at any time by replying STOP, and you can ask to stop emails from us. Email ${CONTACT_EMAIL} and tell us what you need.`),
        ],
      },
      {
        h2: "Children",
        blocks: [p("This website is for adults. It is not meant for anyone under 18, and we do not knowingly collect information from people under 18.")],
      },
      {
        h2: "Changes to this policy",
        blocks: [p("We may update this policy from time to time. The date at the top shows when it last changed.")],
      },
      {
        h2: "Contact us",
        blocks: [p(`Questions about this policy? Email ${CONTACT_EMAIL} or call or text ${CONTACT_PHONE_DISPLAY}. See also our Terms of Service.`)],
      },
    ],
  },
];
