import React, { useState, useRef } from "react";
import { X, CheckCircle2, ShieldCheck, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

export const ApplicationForm: React.FC<FormProps> = ({
  onSuccess,
  isModal = false,
}) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    // --- Spam / Bot prevention checks ---
    // 1. Honeypot: bots fill hidden fields, real users never see them
    if (honeypot.trim() !== "") {
      return; // silently drop bot submissions
    }
    // 2. Time-to-fill: humans take at least ~3 seconds; bots submit instantly
    const elapsed = Date.now() - formStartTime.current;
    if (elapsed < 3000) {
      toast({
        title: "Submission Too Fast",
        description:
          "Please take a moment to review your answers before submitting.",
        variant: "destructive",
      });
      return;
    }
    // 3. Cooldown: prevent rapid-fire duplicate submissions (30s)
    const now = Date.now();
    if (now - lastSubmitTime.current < 30000) {
      toast({
        title: "Already Submitted",
        description:
          "You've recently submitted an application. Please wait a moment before trying again.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.email) {
      toast({
        title: "Required Fields Missing",
        description:
          "Please enter your Full Name, Contact Number, and Email Address.",
        variant: "destructive",
      });
      return;
    }

    // --- Email format validation ---
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast({
        title: "Invalid Email Address",
        description:
          "Please enter a valid email address (e.g., yourname@email.com).",
        variant: "destructive",
      });
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
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit US phone number.",
        variant: "destructive",
      });
      return;
    }
    // NANP rules: area code (NPA) and exchange (NXX) must start with 2-9
    if (normalized[0] < "2" || normalized[3] < "2") {
      toast({
        title: "Invalid Phone Number",
        description:
          "That doesn't look like a valid US phone number. Please check the area code and number.",
        variant: "destructive",
      });
      return;
    }

    if (
      !formData.q1Contractor ||
      !formData.q2Equipment ||
      !formData.q3StartPromptly ||
      !formData.q4ApprovedState ||
      !formData.q5OnboardingSteps
    ) {
      toast({
        title: "Questions Required",
        description: "Please select Yes or No for all required questions.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    // Form tracking submission
    type StandardTrackingFieldKey = string;
    type RegisteredCustomFieldId = string;
    type TrackingCustomField = { value?: unknown; label: string };
    type TrackingFileField = { file?: File; label: string };
    type TrackingImageDataField = { dataUrl?: string; label: string };

    const postTrackingEvent = (
      trackingPayload: Record<string, unknown> & {
        formData: Record<StandardTrackingFieldKey, unknown>;
        formLabels: Record<StandardTrackingFieldKey, string>;
      },
      options: {
        customFields?: Record<RegisteredCustomFieldId, TrackingCustomField>;
        fileFields?: Record<RegisteredCustomFieldId, TrackingFileField>;
        imageDataFields?: Record<
          RegisteredCustomFieldId,
          TrackingImageDataField
        >;
      } = {},
    ) => {
      const {
        customFields = {},
        fileFields = {},
        imageDataFields = {},
      } = options;
      const eventPayload = {
        ...trackingPayload,
        formData: { ...trackingPayload.formData },
        formLabels: { ...trackingPayload.formLabels },
      };
      const body = new FormData();

      for (const [key, field] of Object.entries(customFields)) {
        if (field.value === undefined) continue;
        eventPayload.formData[key] = field.value;
        eventPayload.formLabels[key] = field.label;
      }

      for (const [key, field] of Object.entries(imageDataFields)) {
        const dataUrl = field.dataUrl;
        if (!dataUrl) continue;
        if (!dataUrl.startsWith("data:image/")) {
          throw new Error(
            "Image data field must be a data:image/* base64 string",
          );
        }
        eventPayload.formData[key] = dataUrl;
        eventPayload.formLabels[key] = field.label;
      }

      for (const [key, field] of Object.entries(fileFields)) {
        const file = field.file;
        if (!file) continue;
        if (file.size > 50 * 1024 * 1024) {
          throw new Error("File must be 50 MB or smaller");
        }
        eventPayload.formData[key] = {
          filename: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
        };
        eventPayload.formLabels[key] = field.label;
        body.append(key, file, file.name);
      }

      for (const key of Object.keys(eventPayload.formData)) {
        eventPayload.formLabels[key] ||= key;
      }

      body.append("event", JSON.stringify(eventPayload));

      fetch("https://backend.leadconnectorhq.com/external-tracking/events", {
        method: "POST",
        headers: {
          version: "2021-07-28",
        },
        body,
      }).catch(() => {});
    };

    const nameParts = formData.fullName.trim().split(" ");
    const firstName = nameParts[0] || formData.fullName;
    const lastName = nameParts.slice(1).join(" ") || "";

    const trackingPayload = {
      type: "external_form_submission",
      timestamp: Date.now(),
      formId: "vibe-connect-application-form",
      formData: {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone: formData.phone,
      },
      formLabels: {
        first_name: "First Name",
        last_name: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
      },
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      trackingId: "tk_2e4829c6cdbe4a32a29d41fcec39fd0e",
      locationId: "2pGpEHYvndYECBOCEp4h",
      projectId: "1785542809220106141",
      sessionId: crypto.randomUUID(),
      properties: {
        deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
        source: "ai_studio",
        projectId: "1785542809220106141",
        formName: "Vibe Connect Virtual Application Form",
      },
    };

    postTrackingEvent(trackingPayload, {
      customFields: {
        kaesBf5bgOLPmByMc0Hq: {
          value: formData.q1Contractor,
          label: "1099 Contractor Comfort",
        },
        urlN2j8VUdONnMjhjdUI: {
          value: formData.q2Equipment,
          label: "Equipment Readiness",
        },
        XZqU88nxO6H4s7JMAaIX: {
          value: formData.optionalNotes,
          label: "Headset Brand Specification",
        },
        QUgI5V30qLKtxCUexEwp: {
          value: formData.q3StartPromptly,
          label: "Ability to Act Promptly",
        },
        iY8Yif0jW6cLQbRQI36D: {
          value: formData.q4ApprovedState,
          label: "Residing in Approved State",
        },
        kLdFVxqqWvPdajTgHsr9: {
          value: formData.q5OnboardingSteps,
          label: "Unpaid Onboarding Willingness",
        },
      },
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      lastSubmitTime.current = Date.now(); // record for cooldown
      toast({
        title: "Application Submitted Successfully!",
        description:
          "A recruiter from Vibe Connect Virtual will review your response within 24 hours.",
        variant: "success",
      });
    }, 800);
  };

  if (submitted) {
    return (
      <div className="py-8 px-6 text-center space-y-4">
        <div className="w-16 h-16 bg-[#F0862C]/15 text-[#F0862C] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-[#1B2A4A]">
          Thank you for applying to Vibe Connect Virtual!
        </h3>
        <div className="text-md text-[#5A6578] max-w-md mx-auto space-y-3 text-left">
          <p>Your application has been received and is now under review.</p>
          <p>
            Please check your inbox at{" "}
            <strong className="text-[#1B2A4A]">
              {formData.email || "your email"}
            </strong>{" "}
            for your next steps checklist and be sure to check your{" "}
            <strong className="text-[#1B2A4A]">Spam or Junk folder</strong>,
            just in case it lands there.
          </p>
          <p>We're excited about the possibility of having you on our team!</p>
        </div>
      </div>
    );
  }

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
          <label className="block text-xs font-heading font-bold text-[#1B2A4A] mb-1.5">
            Full Legal Name <span className="text-[#F0862C]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter your full legal name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold text-[#1B2A4A] mb-1.5">
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
            className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-heading font-bold text-[#1B2A4A] mb-1.5">
          Email Address <span className="text-[#F0862C]">*</span>
        </label>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 text-sm bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all"
        />
      </div>

      {/* Q1: 1099 Contractor */}
      <div>
        <label className="block text-xs font-heading font-bold text-[#1B2A4A] mb-2 leading-snug">
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
              className={`flex-1 py-2.5 px-4 border text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
        <label className="block text-xs font-heading font-bold text-[#1B2A4A] mb-2 leading-snug">
          2. Do you have a Windows computer, a quiet and distraction-free
          workspace, stable wired internet connection, and a USB wired headset
          (Plantronics or Logitech is recommended, but please indicate if you
          are using a different brand)?{" "}
          <span className="text-[#F0862C]">*</span>
        </label>
        <div className="flex items-center gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setFormData({ ...formData, q2Equipment: opt })}
              className={`flex-1 py-2.5 px-4 border text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
        <label className="block text-xs font-heading font-bold text-[#1B2A4A] mb-2 leading-snug">
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
              className={`flex-1 py-2.5 px-4 border text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
        <label className="block text-xs font-heading font-bold text-[#1B2A4A] mb-2 leading-snug">
          4. Are you currently residing in one of the approved states (Alabama,
          Arizona, Arkansas, Delaware, Florida, Georgia, Kentucky,
          Louisiana, Michigan, Mississippi, Missouri, Nevada, North Carolina,
          Ohio, Oklahoma, South Carolina, Texas, Washington)?{" "}
          <span className="text-[#F0862C]">*</span>
        </label>
        <div className="flex items-center gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setFormData({ ...formData, q4ApprovedState: opt })}
              className={`flex-1 py-2.5 px-4 border text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
        <label className="block text-xs font-heading font-bold text-[#1B2A4A] mb-2 leading-snug">
          5. Are you willing to complete unpaid onboarding steps (registration,
          background check, certification) before paid work begins?{" "}
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
              className={`flex-1 py-2.5 px-4 border text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
          <span className="text-[11px] text-gray-600 leading-normal">
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
          <span className="text-[11px] text-gray-600 leading-normal">
            By checking this box, I consent to receive marketing and promotional
            messages including special offers, discounts, new product updates
            among others, from <strong>Vibe Connect Virtual Services</strong> on
            the phone number provided. Frequency may vary. Message & data rates
            may apply. Text HELP for assistance, reply STOP to opt out.
          </span>
        </label>
      </div>

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

      <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#5A6578]">
        <ShieldCheck className="w-4 h-4 text-[#1B2A4A]" />
        <span>
          Your data is encrypted &bull; 100% Free Candidate Application
        </span>
      </div>
    </form>
  );
};

/* Modal Popup Container */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1B2A4A]/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white shadow-2xl border border-gray-100 overflow-hidden my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#1B2A4A] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
            Apply For Remote Agent Roles
          </h2>
          <p className="text-xs text-[#DCEEF5]/80 mt-1">
            Complete this 60-second form to start your candidate review.
          </p>
        </div>

        {/* Modal Body Form */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          <ApplicationForm onSuccess={onClose} isModal={true} />
        </div>
      </div>
    </div>
  );
};
