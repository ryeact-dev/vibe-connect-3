import { breadcrumbNode, faqPageNode, graph, organizationNode, webPageNode, websiteNode } from "./schema";
import {
  APPLY_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE_SCHEMA,
  HUB_URL,
  LAST_UPDATED_DISPLAY,
  LAST_UPDATED_ISO,
  ORG_LOGO_URL,
  SITE_DOMAIN,
  SITE_LEGAL_NAME,
  STATES_LIST,
} from "../config/site";

/**
 * Copy for the hub and the four role pages. One source feeds the React
 * pages (src/components/SeoPage.tsx), the build-time static HTML
 * (vite-plugins/seo-prerender.ts) and the JSON-LD, so they cannot drift.
 *
 * Inline links use [text](url). Relative imports only (loaded by vite.config).
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "source"; text: string };

export interface Section {
  h2: string;
  blocks: Block[];
}

export interface FaqEntry {
  q: string;
  a: string;
}

export interface SeoPageData {
  slug: string;
  path: string;
  isHub: boolean;
  /** Short label used in the breadcrumb. */
  crumb: string;
  title: string;
  description: string;
  h1: string;
  quickAnswer: string;
  banner: { file: string; alt: string };
  intro: string[];
  sections: Section[];
  midCta: { afterSection: string; heading: string; subline: string };
  faq: FaqEntry[];
  finalCta: { heading: string; text: string };
}

const SOURCE = "Source: Vibe Connect program announcements, November 2026.";
const src = (): Block => ({ type: "source", text: SOURCE });
const EQUIP_BASE = [
  "A Windows 10 or 11 desktop or laptop (no Mac or Chromebook)",
  "A hardwired Ethernet connection to your router (no Wi-Fi)",
];
const HEADSET =
  "A USB corded headset with a microphone, and a working webcam for the platform assessment";

export const ARISE_DEFINITION =
  "Arise is the platform where independent contractors register and find online jobs.";

export const SEO_PAGES: SeoPageData[] = [
  // ---------------------------------------------------------------- HUB
  {
    slug: "remote-work-from-home-jobs-us",
    path: "/remote-work-from-home-jobs-us",
    isHub: true,
    crumb: "Remote Work From Home Jobs in the US",
    title: "Remote Work From Home Jobs in the US | Vibe Connect Virtual",
    description:
      "Remote work from home in the US as an independent contractor on Arise, with flexible shifts and semi-monthly pay. Browse customer service, sales and bilingual roles. Apply today.",
    h1: "Remote Work From Home Jobs in the US",
    quickAnswer:
      "Remote work from home in the US means doing customer service or sales by phone from your own home. Vibe Connect Virtual Services helps you start as an independent contractor on Arise in 18 eligible states. Active contractors earn $18 or more, paid in 30-minute serviced intervals.",
    banner: {
      file: "remote-work-from-home-jobs-us-banner.webp",
      alt: "Woman wearing a headset smiling as she works on a laptop from a living room sofa",
    },
    intro: [
      "Remote work from home in the US is easier to find when you know what to look for and what to expect. Vibe Connect Virtual helps people get started as independent contractors on Arise, the platform where you register and find online work-from-home jobs in customer service, sales and bilingual roles. You work from your own space, on shifts that fit your life, and you are paid twice a month. There is no commute and no cubicle. For most roles you do not need call center experience, and certification training on Arise is paid once your certification days begin.",
    ],
    sections: [
      {
        h2: "What remote work from home looks like with us",
        blocks: [
          {
            type: "p",
            text: "Most agents help customers on behalf of the companies they work for through Arise. That usually means answering inbound customer service calls or taking and making sales calls. You log in at your scheduled time, work through your shift, and log out. Because the work happens at home, your day depends on a quiet space, a reliable connection and a good headset. Shifts are flexible, so many agents build their schedule around family, school or another job.",
          },
        ],
      },
      {
        h2: "Remote roles you can apply for",
        blocks: [
          {
            type: "p",
            text: "Remote jobs on Arise fall into four main types of role. Pick the one that fits you best, or read more about each:",
          },
          {
            type: "ul",
            items: [
              "[Remote customer service jobs](/remote-customer-service-jobs): inbound support for client brands, with paid Arise training for beginners.",
              "[Part-time work from home customer service jobs](/part-time-work-from-home-customer-service-jobs): shorter, flexible shifts that fit around other commitments.",
              "[Remote call center jobs](/remote-call-center-jobs): phone-based support and onboarding help for new customers.",
              "[Bilingual work from home jobs](/bilingual-work-from-home-jobs): English and Spanish support for customers who prefer to speak Spanish.",
            ],
          },
          {
            type: "p",
            text: "Sales and retention roles are also available, a commission-based role for people who enjoy helping customers decide.",
          },
        ],
      },
      {
        h2: "What you need to get started",
        blocks: [
          {
            type: "p",
            text: "You do not need call center experience. You do need a few basics:",
          },
          {
            type: "ul",
            items: [
              ...EQUIP_BASE,
              HEADSET,
              "A quiet place to work during your shift",
            ],
          },
          {
            type: "p",
            text: "The application starts with a short form that takes about 60 seconds.",
          },
        ],
      },
      {
        h2: "How and when you get paid",
        blocks: [
          {
            type: "p",
            text: "We pay semi-monthly, on the 15th and the 30th, so you have two predictable paydays each month. Pay depends on the job and the company, and sales and retention positions include commission.",
          },
          {
            type: "p",
            text: "Active independent contractors earn $18 or more, paid in 30-minute serviced intervals, with performance incentives available to earn even more. Incentives vary by client and availability, are not guaranteed, and eligibility requirements apply. Payments are issued semi-monthly by direct deposit, on the 15th and the 30th. Because Arise protects client confidentiality, exact client-specific rate breakdowns, bonus structures and class schedules unlock inside the Arise portal after you complete registration and sign the standard Agent NDA.",
          },
          src(),
        ],
      },
      {
        h2: "Where in the US can you work?",
        blocks: [
          {
            type: "p",
            text: `We currently place remote agents in 18 states: ${STATES_LIST}. If your state is not listed yet, you can still register your interest, because the list of eligible states is growing.`,
          },
        ],
      },
      {
        h2: "How to apply",
        blocks: [
          {
            type: "ol",
            items: [
              `Select [Apply Now](${APPLY_URL}), complete the short form, and finish onboarding with Vibe Connect.`,
              "Pass the Arise assessment. You must pass it to become an active agent on Arise and start looking for work there.",
              "Complete your Arise registration and background check, which are unpaid. Then start your certification days, which are paid, and begin finding jobs.",
            ],
          },
        ],
      },
    ],
    midCta: {
      afterSection: "Remote roles you can apply for",
      heading: "Ready to work from home in the US?",
      subline:
        "Check that your state is eligible, then start the 60-second application.",
    },
    faq: [
      {
        q: "Do I need experience to work from home?",
        a: "No. Most roles are open to beginners, and certification training on Arise is paid.",
      },
      {
        q: "Can I work part time?",
        a: "Yes. Shifts are flexible, and many roles offer part-time hours.",
      },
      {
        q: "Is this an employee role or contract work?",
        a: "Contract work. Agents are independent contractors, not employees. You apply to the companies that are hiring, and your hours depend on the job.",
      },
      {
        q: "What if my state is not on the list?",
        a: `Contact us at ${CONTACT_EMAIL} or call or text +1 (903) 847-7904, and we will tell you when it opens.`,
      },
    ],
    finalCta: {
      heading: "Ready to trade the commute for a headset?",
      text: `If you want remote work from home in the US with paid Arise training and pay twice a month, Apply Now and start in about 60 seconds.`,
    },
  },

  // ------------------------------------------------- REMOTE CUSTOMER SERVICE
  {
    slug: "remote-customer-service-jobs",
    path: "/remote-customer-service-jobs",
    isHub: false,
    crumb: "Remote Customer Service Jobs",
    title: "Remote Customer Service Jobs, No Experience | Vibe Connect Virtual",
    description:
      "Remote customer service jobs with no experience needed. Paid Arise training, flexible shifts and pay twice a month. Apply in 60 seconds.",
    h1: "Remote Customer Service Jobs (No Experience Needed)",
    quickAnswer:
      "Remote customer service jobs let you help customers by phone from home, and most do not require experience. You work as an independent contractor through Vibe Connect and Arise. Active contractors earn $18 or more, paid in 30-minute serviced intervals.",
    banner: {
      file: "remote-customer-service-jobs-banner.webp",
      alt: "Smiling customer service agent in a headset talking to a computer screen at a desk",
    },
    intro: [
      "Starting a remote customer service job with no experience is realistic when the company trains you. Vibe Connect Virtual helps you get started as an independent contractor on Arise, where Customer Support Agents help the customers of client companies, mostly by phone, from home. You complete onboarding with us and certification training on Arise, which is paid, then begin taking real customer conversations.",
    ],
    sections: [
      {
        h2: "What does a remote customer service agent do?",
        blocks: [
          {
            type: "p",
            text: "Each shift you answer questions, solve account or order problems, explain policies and record what happened in the client's system. Some shifts are calm and others are busy, but the work follows clear steps you learn in training. The goal is simple: leave the customer feeling helped, then move on to the next conversation. Typical tasks include:",
          },
          {
            type: "ul",
            items: [
              "Answering inbound customer questions",
              "Checking order or account details",
              "Resolving common issues using the client's guides",
              "Passing complex cases to the right team",
              "Documenting every interaction accurately",
            ],
          },
        ],
      },
      {
        h2: "No experience? Here is what matters instead",
        blocks: [
          {
            type: "p",
            text: "Employers hiring for remote support care less about job titles and more about everyday skills. Clear speaking and writing, patience, careful listening and reliability go a long way. So does comfort with learning new software. Many good agents come from retail, restaurants, hospitality or caregiving, where helping people under pressure is part of the job. If you have done that, you already have a head start.",
          },
        ],
      },
      {
        h2: "What you need to work from home",
        blocks: [
          {
            type: "ul",
            items: [
              ...EQUIP_BASE,
              HEADSET,
              "A quiet place where customers can hear you clearly",
            ],
          },
        ],
      },
      {
        h2: "Pay and schedule",
        blocks: [
          {
            type: "p",
            text: "We pay semi-monthly, on the 15th and the 30th. Your certification training on Arise is paid, and shifts are flexible, so you can often choose hours that suit your week. Your hours depend on the job and the company you apply to.",
          },
          {
            type: "p",
            text: "Active independent contractors earn $18 or more, paid in 30-minute serviced intervals. Performance incentives are available, but they are not guaranteed, and eligibility requirements apply. Exact client-specific rates unlock inside the Arise portal after you complete registration and sign the standard Agent NDA.",
          },
          src(),
        ],
      },
      {
        h2: "Your first weeks",
        blocks: [
          {
            type: "p",
            text: "The path is straightforward. You apply, complete onboarding with us, pass the Arise assessment, and start your paid certification days on Arise. Early on, you work through the client's processes with the help of guides and training material, so you are never expected to memorize everything on day one. Our team is built around the agent, which means questions get answered rather than ignored.",
          },
        ],
      },
      {
        h2: "Is remote customer service right for you?",
        blocks: [
          {
            type: "p",
            text: "This role suits you if you like solving problems, can stay calm with frustrated callers, and can commit to a scheduled shift. It may not suit you if you need to be away from your computer at unpredictable times, or if you cannot find a quiet space at home.",
          },
        ],
      },
    ],
    midCta: {
      afterSection: "No experience? Here is what matters instead",
      heading: "Start a remote customer service job with no experience.",
      subline: "Apply in about 60 seconds.",
    },
    faq: [
      {
        q: "Can I really start with no experience?",
        a: "Yes. Beginners are welcome, and certification training on Arise is paid.",
      },
      {
        q: "Will I talk on the phone all day?",
        a: "Most roles are phone-based, either customer service or sales by phone.",
      },
      {
        q: "Which states can I work from?",
        a: `You can apply if you live in one of 18 states: ${STATES_LIST}.`,
      },
    ],
    finalCta: {
      heading: "Ready to apply?",
      text: `It takes about 60 seconds to start. Apply Now and take the first step toward a remote customer service job.`,
    },
  },

  // ------------------------------------------------------------- PART TIME
  {
    slug: "part-time-work-from-home-customer-service-jobs",
    path: "/part-time-work-from-home-customer-service-jobs",
    isHub: false,
    crumb: "Part-Time Work From Home Customer Service Jobs",
    title:
      "Part-Time Work From Home Customer Service Jobs | Vibe Connect Virtual",
    description:
      "Part-time work from home customer service jobs with flexible shifts, paid Arise training and semi-monthly pay. No experience needed. Apply today.",
    h1: "Part-Time Work From Home Customer Service Jobs",
    quickAnswer:
      "Part-time work from home customer service jobs are possible because shifts are flexible, but weekly hours depend on the job and the company you apply to. You work as an independent contractor through Arise, and active contractors earn $18 or more.",
    banner: {
      file: "part-time-work-from-home-customer-service-banner.webp",
      alt: "Parent holding a baby while working on a laptop with a headset",
    },
    intro: [
      "Not everyone wants a full-time schedule, and not everyone can have one. If you need income that fits around school, family, a second job or your own routine, part-time work from home customer service can be a practical answer. Vibe Connect Virtual helps you get started as an independent contractor on Arise, where shifts are flexible and pay arrives twice a month, so you can earn without giving up your whole week.",
    ],
    sections: [
      {
        h2: "Who part-time remote work suits",
        blocks: [
          {
            type: "p",
            text: "Part-time agents come from many situations. Parents often work around school hours. Students look for shifts between classes. Some people already have a job and want a steady second income. Others are returning to work after time away and want to ease back in. If you can commit to a regular shift, even a short one, part-time customer service may fit you well.",
          },
        ],
      },
      {
        h2: "What the work involves",
        blocks: [
          {
            type: "p",
            text: "Part-time agents do the same core work as full-time agents. You help customers of client companies by answering questions, solving account or order issues and documenting each conversation. Depending on the company, you may handle customer service or sales calls. The difference is the length of your schedule, not the quality of the training or the support you receive.",
          },
        ],
      },
      {
        h2: "How flexible shifts work",
        blocks: [
          {
            type: "p",
            text: "Flexibility does not mean no structure. Customers expect to reach someone during the client's service hours, so you choose shifts from the schedule that is available and then show up consistently. A few tips for part-time agents:",
          },
          {
            type: "ul",
            items: [
              "Pick shifts at the same time each week so your routine is easy to protect.",
              "Tell family or housemates when you are on a call.",
              "Keep your headset and computer ready before a shift starts.",
              "Log in a few minutes early so you begin on time.",
            ],
          },
          {
            type: "p",
            text: "Weekly hours depend on the job and the company you apply to, so check each opening for its hours.",
          },
        ],
      },
      {
        h2: "What you need",
        blocks: [
          {
            type: "ul",
            items: [
              ...EQUIP_BASE,
              HEADSET,
              "A quiet space during your scheduled hours",
            ],
          },
        ],
      },
      {
        h2: "Paid Arise training and semi-monthly pay",
        blocks: [
          {
            type: "p",
            text: "Certification training on Arise is paid once your certification days begin, though the registration and background check on Arise come first and are unpaid. After that, pay arrives semi-monthly, on the 15th and the 30th. Part-time hours mean a smaller paycheck than full-time hours, but you can see your schedule and plan your money around two clear paydays each month.",
          },
          {
            type: "p",
            text: "The rate does not change with part-time or full-time hours. Active independent contractors earn $18 or more, paid in 30-minute serviced intervals, so your earnings depend on how many hours you work.",
          },
          src(),
        ],
      },
      {
        h2: "Can part-time turn into more hours?",
        blocks: [
          {
            type: "p",
            text: "Some agents begin part time and later add shifts when their life allows. Whether you can add hours depends on the company you work with.",
          },
        ],
      },
    ],
    midCta: {
      afterSection: "How flexible shifts work",
      heading: "Looking for flexible hours?",
      subline:
        "Apply in about 60 seconds and see which jobs fit your schedule.",
    },
    faq: [
      {
        q: "Do I need experience for a part-time role?",
        a: "No. Beginners are welcome, and certification training on Arise is paid.",
      },
      {
        q: "Can I work around another job?",
        a: "Many agents do. Choose shifts that do not overlap with your other commitments.",
      },
      {
        q: "Is part-time work available in every state?",
        a: `No. Applications are open in 18 states: ${STATES_LIST}. Part-time hours depend on the job and the company.`,
      },
    ],
    finalCta: {
      heading: "Ready to start part time?",
      text: `Applying takes about 60 seconds. Apply Now, tell us about your availability, and see which shifts fit your week.`,
    },
  },

  // ----------------------------------------------------------- CALL CENTER
  {
    slug: "remote-call-center-jobs",
    path: "/remote-call-center-jobs",
    isHub: false,
    crumb: "Remote Call Center Jobs",
    title: "Remote Call Center Jobs, No Experience | Vibe Connect Virtual",
    description:
      "Remote call center jobs you can do from home. Paid Arise training, flexible shifts and semi-monthly pay. No call center experience needed. Apply today.",
    h1: "Remote Call Center Jobs (No Experience Needed)",
    quickAnswer:
      "Remote call center jobs let you take customer calls from home with a headset and a quiet room. Most roles need no call center experience. You work as an independent contractor through Arise, and active contractors earn $18 or more.",
    banner: {
      file: "remote-call-center-jobs-banner.webp",
      alt: "Smiling call center agent in a headset touching the microphone while working at a computer",
    },
    intro: [
      "A remote call center job lets you do phone-based customer support without sitting in an office. Vibe Connect Virtual helps you get started as an independent contractor on Arise, where you can find inbound support and onboarding roles for client companies. You take calls from your home, you learn the work in paid Arise training, and you are paid on the 15th and the 30th of each month. No call center experience is required to apply.",
    ],
    sections: [
      {
        h2: "How a remote call center differs from an office one",
        blocks: [
          {
            type: "p",
            text: "The work is similar: customers call, you help them. The difference is where you do it. Instead of a cubicle and a long commute, you use your own quiet space and your own equipment. That gives you more control over your day, but it also means you are responsible for a reliable setup. A clear headset, a stable connection and a quiet room matter a great deal when your voice is the whole customer experience.",
          },
        ],
      },
      {
        h2: "Roles on the phones",
        blocks: [
          { type: "p", text: "Two of the most common phone-based roles are:" },
          {
            type: "ul",
            items: [
              "Customer Support Agent: you answer inbound calls about orders, accounts, billing questions or product issues, using the client's guides to resolve them.",
              "Onboard Support Rep: you welcome new customers, help them get set up, and answer their first questions so they start well.",
            ],
          },
        ],
      },
      {
        h2: "What a typical call looks like",
        blocks: [
          {
            type: "p",
            text: "You greet the caller, confirm who they are, listen to the problem and find the answer in the client's systems. You explain the next step clearly, check that the customer is satisfied and log the call. Over time you get faster and more confident, because most questions repeat and you learn where to find the answers.",
          },
        ],
      },
      {
        h2: "Skills that help",
        blocks: [
          {
            type: "p",
            text: "A calm voice, good listening and patience matter most. If you can stay friendly when a customer is upset, you can do this job. Comfort with a computer helps, and so does a habit of taking short notes while you talk.",
          },
        ],
      },
      {
        h2: "Equipment and workspace",
        blocks: [
          {
            type: "ul",
            items: [
              EQUIP_BASE[0],
              "A hardwired Ethernet connection to your router (no Wi-Fi), since voice calls need a steady signal",
              "A USB corded headset with a clear microphone, and a working webcam for the platform assessment",
              "A quiet room, away from background noise",
            ],
          },
        ],
      },
      {
        h2: "Training, pay and schedule",
        blocks: [
          {
            type: "p",
            text: "Certification training on Arise is paid, so you learn the client's systems before you take live calls. After that, pay arrives semi-monthly, on the 15th and the 30th. Shifts are flexible, and you can see your schedule ahead of time. Weekly hours depend on the job and the company you apply to.",
          },
          {
            type: "p",
            text: "Active independent contractors earn $18 or more, paid in 30-minute serviced intervals. Performance incentives are available, but they are not guaranteed, and eligibility requirements apply.",
          },
          src(),
        ],
      },
    ],
    midCta: {
      afterSection: "What a typical call looks like",
      heading: "Take customer calls from home.",
      subline:
        "Apply in about 60 seconds. No call center experience needed for most roles.",
    },
    faq: [
      {
        q: "Do I need call center experience?",
        a: "No. Beginners are welcome, and certification training on Arise is paid.",
      },
      {
        q: "Can I work from any room?",
        a: "Choose a quiet room with a stable connection. Background noise can make calls hard to hear.",
      },
      {
        q: "Do I have to make sales calls?",
        a: "Support and onboarding roles focus on helping customers. Sales and retention roles are separate and include commission.",
      },
      {
        q: "Where can I apply from?",
        a: `You can apply from 18 states: ${STATES_LIST}.`,
      },
    ],
    finalCta: {
      heading: "Ready to apply?",
      text: `It takes about 60 seconds to begin. Apply Now and start your remote call center career.`,
    },
  },

  // ------------------------------------------------------------- BILINGUAL
  {
    slug: "bilingual-work-from-home-jobs",
    path: "/bilingual-work-from-home-jobs",
    isHub: false,
    crumb: "Bilingual Work From Home Jobs",
    title:
      "Bilingual Work From Home Jobs (English/Spanish) | Vibe Connect Virtual",
    description:
      "Bilingual work from home jobs for English and Spanish speakers. Paid Arise training, flexible shifts and pay twice a month. Apply in 60 seconds.",
    h1: "Bilingual Work From Home Jobs for English and Spanish Speakers",
    quickAnswer:
      "Bilingual work from home jobs are customer service roles for English and Spanish speakers, and you do not need to be a native speaker. Active contractors earn $18 or more, paid in 30-minute serviced intervals. Some programs are omnichannel.",
    banner: {
      file: "bilingual-work-from-home-jobs-banner.webp",
      alt: "Smiling woman in headphones working on a laptop at a desk",
    },
    intro: [
      "If you speak both English and Spanish, your language skills are a real advantage. Many companies want to serve customers in the language those customers are most comfortable with, and they need people who can do it well. Vibe Connect Virtual helps you get started as an independent contractor on Arise, where bilingual support agents find remote roles with client companies and are paid twice a month.",
    ],
    sections: [
      {
        h2: "Why bilingual agents are in demand",
        blocks: [
          {
            type: "p",
            text: "A customer who can explain a problem in their own language usually feels more at ease, and the issue is often solved faster. Companies know this, so they look for agents who can switch between English and Spanish smoothly. As a bilingual agent, you help bridge that gap, and your skill becomes the reason a customer feels understood.",
          },
        ],
      },
      {
        h2: "What a Bilingual Support Agent does",
        blocks: [
          {
            type: "p",
            text: "You handle customer conversations for client companies in both languages. The exact mix depends on the client, but the work usually includes:",
          },
          {
            type: "ul",
            items: [
              "Answering inbound questions in English or Spanish",
              "Helping with orders, accounts and common problems",
              "Explaining policies and next steps clearly in either language",
              "Documenting each conversation accurately",
            ],
          },
          {
            type: "p",
            text: "Bilingual roles are mostly phone-based, in English and Spanish, and some programs are omnichannel, which means you support customers across more than one channel.",
          },
        ],
      },
      {
        h2: "How fluent do you need to be?",
        blocks: [
          {
            type: "p",
            text: "You should be comfortable speaking and, where needed, writing in both languages at a conversational, professional level. That means understanding accents, explaining details clearly and staying polite under pressure. You do not need a formal translation background. How your language skill is assessed depends on the company that is hiring.",
          },
        ],
      },
      {
        h2: "No experience required",
        blocks: [
          {
            type: "p",
            text: "You do not need previous call center or customer service experience. Training on Arise covers the client's products, tools and processes, and it is paid once your certification days begin, so you can focus on using your language skills. People who have helped family, neighbors or customers in both languages already know how much that skill matters.",
          },
        ],
      },
      {
        h2: "What you need",
        blocks: [
          {
            type: "ul",
            items: [...EQUIP_BASE, HEADSET, "A quiet place to work"],
          },
        ],
      },
      {
        h2: "Pay and schedule",
        blocks: [
          {
            type: "p",
            text: "We pay semi-monthly, on the 15th and the 30th. Certification training on Arise is paid, and shifts are flexible. Active independent contractors earn $18 or more, paid in 30-minute serviced intervals. Performance incentives are available, but they are not guaranteed, and eligibility requirements apply.",
          },
          src(),
        ],
      },
    ],
    midCta: {
      afterSection: "How fluent do you need to be?",
      heading: "Put your Spanish to work.",
      subline:
        "Apply in about 60 seconds and tell us you speak English and Spanish.",
    },
    faq: [
      {
        q: "Do I need to be a native Spanish speaker?",
        a: "You need to be comfortable and professional in both languages. You do not need to be a native speaker. What matters is that you can speak Spanish well.",
      },
      {
        q: "Is this a translation job?",
        a: "No. You support customers directly in English or Spanish. It is customer service, not document translation.",
      },
      {
        q: "Can I work part time?",
        a: "Yes. Shifts are flexible, and part-time hours may be available.",
      },
      {
        q: "Which states are eligible?",
        a: `You can apply from 18 states: ${STATES_LIST}.`,
      },
    ],
    finalCta: {
      heading: "Ready to put your languages to work?",
      text: `It takes about 60 seconds to start. Apply Now and tell us you speak English and Spanish. If you prefer an English-only role, see our [remote customer service jobs](/remote-customer-service-jobs).`,
    },
  },
];

export const HUB_PAGE = SEO_PAGES[0];
export const ROLE_PAGES = SEO_PAGES.filter((p) => !p.isHub);

/** 1200x630 JPG used for og:image / twitter:image (see scripts/make-og-images.py). */
export const ogImageUrl = (p: SeoPageData) => `${SITE_DOMAIN}/og/${p.slug}.jpg`;

export const bannerUrl = (p: SeoPageData) =>
  `${SITE_DOMAIN}/images/${p.banner.file}`;

/** Strip [text](url) markup to plain text (for JSON-LD, which must match the visible FAQ). */
export const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/** One @graph per page: Organization, WebSite, WebPage+FAQPage, BreadcrumbList. */
export function buildPageSchema(p: SeoPageData) {
  const url = `${SITE_DOMAIN}${p.path}`;
  const crumbs = [
    { name: "Home", url: `${SITE_DOMAIN}/` },
    { name: HUB_PAGE.crumb, url: `${SITE_DOMAIN}${HUB_URL}` },
    ...(p.isHub ? [] : [{ name: p.crumb, url }]),
  ];
  const img = { url: bannerUrl(p), width: 1600, height: 600 };
  return graph(
    organizationNode(),
    websiteNode(),
    webPageNode({
      url,
      name: p.title,
      description: p.description,
      image: img,
      breadcrumb: true,
      speakableSelector: "#quick-answer",
      faq: true,
    }),
    faqPageNode(url, p.faq.map((f) => ({ q: f.q, a: plain(f.a) }))),
    breadcrumbNode(url, crumbs),
  );
}

export const LAST_UPDATED_LINE = `Last updated: ${LAST_UPDATED_DISPLAY}`;
