import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  STATES_LIST_OXFORD,
} from "./site-config";

/**
 * Single source of truth for the FAQ content that is both rendered on the
 * page (FAQSection.tsx) and emitted as JSON-LD structured data (Index page).
 * Keeping them in sync from one array prevents the structured data from
 * drifting out of sync with the visible copy.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What is Arise, and how does it relate to Vibe Connect?",
    answer:
      "Arise is the platform where independent contractors register and find online jobs. Vibe Connect Virtual Services helps you get started on Arise: you apply and complete onboarding with us, pass the Arise assessment (taken through Harver), complete your Arise registration and background check (unpaid), take your paid certification days, and then find jobs on Arise.",
  },
  {
    question: "Is this a real job or a scam?",
    answer: `No money is required to apply: Vibe Connect charges $0 upfront to apply or register. Agents are independent contractors, not employees, and applying does not promise you a job. You can reach us any time at ${CONTACT_EMAIL} or ${CONTACT_PHONE_DISPLAY}.`,
  },
  {
    question: "Which states do you accept?",
    answer: `We currently accept applicants residing in the following 18 states: ${STATES_LIST_OXFORD}.`,
  },
  {
    question: "Do I need prior call center experience?",
    answer:
      "No prior call center experience is required for entry-level support roles! While previous customer service, retail, or hospitality experience is a plus, certification on Arise covers client software, call handling, and customer interaction guidelines.",
  },
  {
    question: "What equipment do I need?",
    answer:
      "You will need a Windows 10 or 11 desktop or laptop computer (Chromebooks and Macs are not compatible with client systems), a hardwired Ethernet connection to your router (no Wi-Fi), a USB corded headset with microphone, and a working webcam (required for the initial 10-minute platform assessment).",
  },
  {
    question: "Is there a cost to apply?",
    answer:
      "Vibe Connect charges $0 upfront to apply or register under our agency. All roles are 1099 independent contractor positions, not W-2 employment. Before enrolling in a client certification class on the Arise platform, Arise requires a standard third-party national background check ($30 paid directly to the background check provider).",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Active independent contractors supporting clients through Vibe Connect earn $18.00 per hour (paid in 30-minute serviced intervals), with performance incentives available to earn even more. Payments are issued semi-monthly via direct deposit. Because Arise protects client confidentiality, exact client-specific rate breakdowns, bonus structures, and class schedules unlock inside the Arise portal immediately after you complete registration and sign the standard Agent NDA. Certification training on Arise is paid from the first day of class. Incentives are not guaranteed, and eligibility requirements apply.",
  },
  {
    question: "Is the schedule flexible?",
    answer:
      "Yes, you choose from available shifts that fit your life. Exact class schedules appear in the Arise portal after you complete registration and sign the standard Agent NDA, and weekly hours depend on the job and the company you apply to.",
  },
  {
    question: "What happens if I don't pass the assessment?",
    answer:
      "If your Arise assessment is unsuccessful, Arise currently requires a waiting period before another attempt. Vibe Connect cannot reset assessments, change assessment results, or bypass Arise eligibility requirements. Contact Arise Support for questions regarding your eligibility date.",
  },
];
