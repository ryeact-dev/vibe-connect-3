import React, { useRef, useState } from "react";
import { ShieldCheck, Send } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, GHL_FORM_URL, THANK_YOU_URL } from "../config/site";

interface FormProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

export const ApplicationForm: React.FC<FormProps> = ({
  onSuccess: _onSuccess,
  isModal: _isModal = false,
}) => {
  const [notice, setNotice] = useState<{ title: string; description: string; link?: string } | null>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const notify = (title: string, description: string, link?: string) => {
    setNotice({ title, description, link });
    requestAnimationFrame(() => noticeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  };
  const [submitting, setSubmitting] = useState(false);

  // --- Spam prevention state ---
  const formStartTime = useRef<number>(Date.now()); // detect bots that submit too fast
  const [honeypot, setHoneypot] = useState(""); // hidden field bots fill, humans don't
  const lastSubmitTime = useRef<number>(0); // cooldown between submissions

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    q1Contractor: "", // Yes / No
    q2Equipment: "", // Yes / No
    q3StartPromptly: "", // Yes / No
    q4ApprovedState: "", // Yes / No
    q5OnboardingSteps: "", // Yes / No
    optionalNotes: "", // Optional text input
    tcpaConsent1: false,
    tcpaConsent2: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    // --- Spam / Bot prevention checks ---
    // 1. Honeypot: bots fill hidden fields, real users never see them
    if (honeypot.trim() !== "") {
      return; // silently drop bot submissions
    }
    // 2. Time-to-fill: humans take at least ~3 seconds; bots submit instantly
    const elapsed = Date.now() - formStartTime.current;
    if (elapsed < 3000) {
      notify("Submission Too Fast", "Please take a moment to review your answers before submitting.");
      return;
    }
    // 3. Cooldown: prevent rapid-fire duplicate submissions (30s)
    const now = Date.now();
    if (now - lastSubmitTime.current < 30000) {
      notify("Already Submitted", "You've recently submitted an application. Please wait a moment before trying again.");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.email) {
      notify("Required Fields Missing", "Please enter your Full Name, Contact Number, and Email Address.");
      return;
    }

    // --- Email format validation ---
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      notify("Invalid Email Address", "Please enter a valid email address (e.g., yourname@email.com).");
      return;
    }

    // --- US phone number validation (NANP format) ---
    const digitsOnly = formData.phone.replace(/\D/g, "");
    // Accept 10 digits, or 11 starting with country code 1
    const normalized =
      digitsOnly.length === 11 && digitsOnly.startsWith("1")
        ? digitsOnly.slice(1)
        : digitsOnly;
    if (normalized.length !== 10) {
      notify("Invalid Phone Number", "Please enter a valid 10-digit US phone number.");
      return;
    }
    // NANP rules: area code (NPA) and exchange (NXX) must start with 2-9
    if (normalized[0] < "2" || normalized[3] < "2") {
      notify("Invalid Phone Number", "That doesn't look like a valid US phone number. Please check the area code and number.");
      return;
    }

    if (
      !formData.q1Contractor ||
      !formData.q2Equipment ||
      !formData.q3StartPromptly ||
      !formData.q4ApprovedState ||
      !formData.q5OnboardingSteps
    ) {
      notify("Questions Required", "Please select Yes or No for all required questions.");
      return;
    }

    setSubmitting(true);
    let redirecting = false;

    // The server function (functions/api/apply.ts) creates/updates the contact in
    // GoHighLevel with the private integration key, which never reaches the browser.
    fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        q1Contractor: formData.q1Contractor,
        q2Equipment: formData.q2Equipment,
        q3StartPromptly: formData.q3StartPromptly,
        q4ApprovedState: formData.q4ApprovedState,
        q5OnboardingSteps: formData.q5OnboardingSteps,
        notes: formData.optionalNotes,
        tcpaConsent1: formData.tcpaConsent1,
        tcpaConsent2: formData.tcpaConsent2,
        website: honeypot,
        startedAt: formStartTime.current,
        pageUrl: window.location.href,
      }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        lastSubmitTime.current = Date.now(); // record for cooldown
        try { sessionStorage.setItem("vc_applicant_email", formData.email.trim()); } catch { /* private mode */ }
        window.location.assign(THANK_YOU_URL); // keep the button disabled while we navigate
        redirecting = true;
      })
      .catch(() =>
        notify(
          "We couldn't submit your application",
          `Please try again in a moment, apply with our backup form, or contact us at ${CONTACT_EMAIL} / ${CONTACT_PHONE_DISPLAY}.`,
          GHL_FORM_URL,
        ),
      )
      .finally(() => { if (!redirecting) setSubmitting(false); });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* Honeypot field — hidden from humans, bots fill it and get rejected */}
      <div
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="company_website">Website (leave blank)</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-sans text-sm sm:text-[15px] font-semibold text-[#1B2A4A] mb-1.5">
            Full Legal Name <span className="text-[#F0862C]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Your legal full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full px-4 py-3 text-base bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block font-sans text-sm sm:text-[15px] font-semibold text-[#1B2A4A] mb-1.5">
            Contact Number <span className="text-[#F0862C]">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => {
              // Auto-format US phone as (XXX) XXX-XXXX while typing
              const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
              let formatted = digits;
              if (digits.length > 6) {
                formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
              } else if (digits.length > 3) {
                formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
              } else if (digits.length > 0) {
                formatted = `(${digits}`;
              }
              setFormData({ ...formData, phone: formatted });
            }}
            className="w-full px-4 py-3 text-base bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block font-sans text-sm sm:text-[15px] font-semibold text-[#1B2A4A] mb-1.5">
          Email Address <span className="text-[#F0862C]">*</span>
        </label>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 text-base bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
        />
      </div>

      {/* Q1: 1099 Contractor */}
      <div>
        <label className="block font-sans text-[15px] sm:text-base font-normal text-[#1B2A4A] mb-2.5 leading-snug">
          1. Please read carefully: This is a 1099 Independent Contractor
          position, NOT a W-2 employee role. This means you will be operating as
          your own business. You are responsible for your own taxes (no
          automatic withholding), you will not receive employee benefits, and
          you control how you run your work as an independent contractor. Do you
          understand and agree to this arrangement?{" "}
          <span className="text-[#F0862C]">*</span>
        </label>
        <div className="flex items-center gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setFormData({ ...formData, q1Contractor: opt })}
              className={`flex-1 py-3 px-4 border text-base font-semibold transition-all duration-200 cursor-pointer ${
                formData.q1Contractor === opt
                  ? "bg-[#1B2A4A] border-[#1B2A4A] text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-[#1B2A4A] hover:border-[#1B2A4A] hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q2: Equipment */}
      <div>
        <label className="block font-sans text-[15px] sm:text-base font-normal text-[#1B2A4A] mb-2.5 leading-snug">
          2. Do you have a Windows computer, a quiet and distraction-free
          workspace, stable wired internet connection, a USB wired headset, and
          a working webcam? <span className="text-[#F0862C]">*</span>
        </label>
        <div className="flex items-center gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setFormData({ ...formData, q2Equipment: opt })}
              className={`flex-1 py-3 px-4 border text-base font-semibold transition-all duration-200 cursor-pointer ${
                formData.q2Equipment === opt
                  ? "bg-[#1B2A4A] border-[#1B2A4A] text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-[#1B2A4A] hover:border-[#1B2A4A] hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q3: Act Promptly */}
      <div>
        <label className="block font-sans text-[15px] sm:text-base font-normal text-[#1B2A4A] mb-2.5 leading-snug">
          3. Since Arise programs open and close quickly, are you able to act
          promptly when opportunities become available?{" "}
          <span className="text-[#F0862C]">*</span>
        </label>
        <div className="flex items-center gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setFormData({ ...formData, q3StartPromptly: opt })}
              className={`flex-1 py-3 px-4 border text-base font-semibold transition-all duration-200 cursor-pointer ${
                formData.q3StartPromptly === opt
                  ? "bg-[#1B2A4A] border-[#1B2A4A] text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-[#1B2A4A] hover:border-[#1B2A4A] hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q4: Approved State */}
      <div>
        <label className="block font-sans text-[15px] sm:text-base font-normal text-[#1B2A4A] mb-2.5 leading-snug">
          4. Are you currently residing in one of the approved states (Alabama,
          Arizona, Arkansas, Delaware, Florida, Georgia, Kentucky, Louisiana,
          Michigan, Mississippi, Missouri, Nevada, North Carolina, Ohio,
          Oklahoma, South Carolina, Texas, Washington)?{" "}
          <span className="text-[#F0862C]">*</span>
        </label>
        <div className="flex items-center gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setFormData({ ...formData, q4ApprovedState: opt })}
              className={`flex-1 py-3 px-4 border text-base font-semibold transition-all duration-200 cursor-pointer ${
                formData.q4ApprovedState === opt
                  ? "bg-[#1B2A4A] border-[#1B2A4A] text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-[#1B2A4A] hover:border-[#1B2A4A] hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q5: Unpaid Onboarding Steps */}
      <div>
        <label className="block font-sans text-[15px] sm:text-base font-normal text-[#1B2A4A] mb-2.5 leading-snug">
          5. Are you willing to complete the unpaid initial registration steps
          (profile setup, Arise assessment, and $30 background check)
          before starting paid certification training and client production?{" "}
          <span className="text-[#F0862C]">*</span>
        </label>
        <div className="flex items-center gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() =>
                setFormData({ ...formData, q5OnboardingSteps: opt })
              }
              className={`flex-1 py-3 px-4 border text-base font-semibold transition-all duration-200 cursor-pointer ${
                formData.q5OnboardingSteps === opt
                  ? "bg-[#1B2A4A] border-[#1B2A4A] text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-[#1B2A4A] hover:border-[#1B2A4A] hover:text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Text message consent (A2P 10DLC): optional, separate boxes, links to the program terms */}
      <p className="pt-1 text-[13px] leading-normal text-gray-600">
        Text messages are optional and are not a condition of applying. Each box
        below is a separate choice.
      </p>

      {/* Checkbox 1 */}
      <div className="pt-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.tcpaConsent1}
            onChange={(e) =>
              setFormData({ ...formData, tcpaConsent1: e.target.checked })
            }
            className="mt-1 w-4 h-4 text-[#008080] focus:ring-[#008080] border-gray-300 cursor-pointer shrink-0"
          />
          <span className="text-[13px] text-gray-600 leading-normal">
            By checking this box, I consent to receive non-marketing text
            messages from <strong>Vibe Connect Virtual Services</strong> about
            Job Hiring and Newsletter. Message frequency varies. Message & data
            rates may apply. Text HELP for assistance, Reply STOP to opt out.
          </span>
        </label>
      </div>

      {/* Checkbox 2 */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.tcpaConsent2}
            onChange={(e) =>
              setFormData({ ...formData, tcpaConsent2: e.target.checked })
            }
            className="mt-1 w-4 h-4 text-[#008080] focus:ring-[#008080] border-gray-300 cursor-pointer shrink-0"
          />
          <span className="text-[13px] text-gray-600 leading-normal">
            By checking this box, I consent to receive marketing and promotional
            messages including special offers, discounts, new product updates
            among others, from <strong>Vibe Connect Virtual Services</strong> on
            the phone number provided. Frequency may vary. Message & data rates
            may apply. Text HELP for assistance, reply STOP to opt out.
          </span>
        </label>
      </div>

      <p className="text-[13px] leading-normal text-gray-600">
        By submitting this form you agree to our{" "}
        <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
          Privacy Policy
        </a>
        . See the{" "}
        <a href="/terms#sms" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
          text message terms
        </a>{" "}
        for how our text programs work. We do not share mobile numbers or text
        message consent with third parties or affiliates for their marketing
        purposes.
      </p>

      {notice && (
        <div ref={noticeRef} role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-[15px] text-red-800">
          <p className="font-bold">{notice.title}</p>
          <p>{notice.description}</p>
          {notice.link && (
            <p className="mt-1">
              <a href={notice.link} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                Open the backup application form
              </a>
            </p>
          )}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#0d627b] hover:bg-[#1B2A4A] text-white py-3.5 px-6 font-bold text-base flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing Application...
            </span>
          ) : (
            <>
              Submit Application Form
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pt-1 text-[13px] text-[#5A6578]">
        <ShieldCheck className="w-4 h-4 text-[#1B2A4A]" />
        <span>
          $0 upfront to apply &bull; Independent contractor (1099) roles
        </span>
      </div>
    </form>
  );
};
