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
    question: "Is this a real job or a scam?",
    answer:
      "This is 100% legitimate work. Vibe Connect Virtual is a verified remote staffing agency partnered with nationwide U.S. client brands. We do NOT ask for money from applicants, we do NOT sell starter kits, and we pay guaranteed semi-monthly earnings directly into your bank account via direct deposit.",
  },
  {
    question: "What states can I apply from?",
    answer:
      "We're currently live in a growing list of U.S. states and the fastest way to know if yours qualifies is to apply. It only takes a minute, and you'll find out right away whether your state is eligible.",
  },
  {
    question: "Do I need prior call center experience?",
    answer:
      "No prior call center experience is required for entry-level support roles! While previous customer service, retail, or hospitality experience is a plus, we provide comprehensive account onboarding that covers client software, call handling, and customer interaction guidelines.",
  },
  {
    question: "What equipment do I need to work from home?",
    answer:
      "A Windows computer, ethernet cable connected to a router with stable internet connection and a headset and that's it. No fancy setup, no software to buy. Once you're approved, we'll walk you through the exact specs so you're fully ready before day one. If you can video call your family, you already have what it takes.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Every 15th and 30th, guaranteed no waiting a full month to see your first paycheck like a lot of jobs make you do. You'll know your exact pay rate before you say yes to anything, so there's never a surprise waiting for you on payday.",
  },
  {
    question: "Is the schedule flexible?",
    answer:
      "Yes and you'll choose from available shifts that actually work with your life, not the other way around. We'll walk you through real shift options during onboarding so you know exactly what to expect before you commit to anything. No guessing, no fine print.",
  },
  {
    question: "What happens if I don't pass the assessment?",
    answer:
      "If your Arise assessment is unsuccessful, Arise currently requires a waiting period before another attempt. Vibe Connect cannot reset assessments, change assessment results, or bypass Arise eligibility requirements. Contact Arise Support for questions regarding your eligibility date.",
  },
];
