import React from "react";
import {
  Headphones,
  Shield,
  Award,
  Users,
  ArrowRight,
  PhoneCall,
  LifeBuoy,
  Calendar,
} from "lucide-react";
interface SectionProps {
  onOpenApplyModal: () => void;
}

export const AboutSection: React.FC<SectionProps> = ({ onOpenApplyModal }) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Side: Content & Trust Bullets */}
          <div className="lg:col-span-6 space-y-5 text-left reveal-fade-up">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1B2A4A] lg:leading-[1.4] leading-tight">
              We Are The Best Remote Career Service For Your People
            </h2>

            <p className="text-sm sm:text-base text-[#5A6578] leading-relaxed font-normal">
              <strong className="font-bold text-[#F0862C]">
                VibeConnect Virtual Services
              </strong>{" "}
              was built for one reason: the traditional call center job the
              commute, the fluorescent lights, the rigid break schedule doesn't
              work for how people actually want to work anymore. We match
              reliable, motivated people across 21 states with legitimate
              work-from-home roles, backed by real training and real support.
            </p>

            {/* 3 Features Grid (matching uploaded layout & copy) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 pt-2">
              {/* Feature 1: 24/7 Customer Support */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#F0862C] text-[#F0862C] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-heading">
                  24h
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#F0862C] text-base mb-1">
                    24/7 Customer Support
                  </h4>
                  <p className="text-xs text-[#5A6578] leading-relaxed">
                    Round-the-clock assistance whenever you need it day or
                    night, our team is always available to help.
                  </p>
                </div>
              </div>

              {/* Feature 2: Always Reach */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#F0862C] text-[#F0862C] flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#F0862C] text-base mb-1">
                    Always Reach
                  </h4>
                  <p className="text-xs text-[#5A6578] leading-relaxed">
                    Stay connected with us anytime through a direct call, we're
                    just a phone call away.
                  </p>
                </div>
              </div>

              {/* Feature 3: Chat Support */}
              <div className="flex items-start gap-3 sm:col-span-2 sm:max-w-xs">
                <div className="w-10 h-10 rounded-full border-2 border-[#F0862C] text-[#F0862C] flex items-center justify-center shrink-0 mt-0.5">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#F0862C] text-base mb-1">
                    Chat Support
                  </h4>
                  <p className="text-xs text-[#5A6578] leading-relaxed">
                    Get quick answers and real-time help through our live chat
                    feature.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenApplyModal}
                className="btn-primary px-7 py-3.5 font-bold text-sm flex items-center gap-2 cursor-pointer"
              >
                Start Your Remote Journey
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Side: Photo matching attached image design */}
          <div className="lg:col-span-6 reveal-fade-up stagger-2">
            <div className="relative overflow-hidden shadow-2xl">
              <img
                src="https://vibe.filesafe.space/1785542809220106141/attachments/7d4c8f5e-dcc1-4284-988d-57285f0e2f0d.png"
                alt="Two remote agents working together at workstation with headsets"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AgentCentricDarkSection: React.FC<SectionProps> = ({
  onOpenApplyModal,
}) => {
  return (
    <section className="bg-[#1B2A4A] text-white w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[560px] lg:min-h-[620px]">
        {/* Left Column - Border to border full width image without gap */}
        <div className="w-full h-64 sm:h-96 lg:h-full min-h-[350px] lg:min-h-[600px] relative overflow-hidden reveal-fade-up">
          <img
            src="https://vibe.filesafe.space/1785542809220106141/assets/9b9badb3-80b0-4180-afaa-d0cbe570ae52.png"
            alt="Agent celebrating at desk wearing headset"
            className="w-full h-full object-cover object-center block"
            loading="lazy"
          />
        </div>

        {/* Right Column - Dark Navy background with content */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-16 lg:px-16 xl:px-20 bg-[#1B2A4A] text-left reveal-fade-up stagger-1">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white lg:leading-[1.4] leading-[1.3] mb-5">
            We're Built Around the Agent, Not Just the Client
          </h2>

          <p className="text-sm sm:text-base text-[#DCEEF5]/90 font-normal leading-relaxed mb-8 max-w-xl">
            Most staffing companies optimize for the business paying the bill.
            We optimize for the person doing the work because agents who feel
            supported stay longer, perform better, and actually enjoy the job.
          </p>

          {/* Two Feature Blocks side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 max-w-xl">
            {/* Feature 1: Real Support */}
            <div className="flex items-start gap-3.5">
              <div className="p-1 text-[#F0862C] shrink-0 mt-0.5">
                <Headphones className="w-8 h-8 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-[#F0862C] mb-1.5">
                  Real Support, Real Fast
                </h3>
                <p className="text-xs sm:text-sm text-[#DCEEF5]/80 font-normal leading-relaxed">
                  Get quick answers and real-time help through our live chat
                  feature.
                </p>
              </div>
            </div>

            {/* Feature 2: Straightforward Pay & Shifts */}
            <div className="flex items-start gap-3.5">
              <div className="p-1 text-[#F0862C] shrink-0 mt-0.5">
                <Shield className="w-8 h-8 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-[#F0862C] mb-1.5">
                  Straightforward Pay &amp; Shifts
                </h3>
                <p className="text-xs sm:text-sm text-[#DCEEF5]/80 font-normal leading-relaxed">
                  You'll know your pay rate, schedule, and role expectations
                  before you ever say yes.
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={onOpenApplyModal}
              className="btn-primary px-10 py-4 text-base font-bold shadow-lg w-full sm:w-auto inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Apply Now!</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
