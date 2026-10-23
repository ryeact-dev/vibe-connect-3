import React from "react";
import { ArrowRight, Phone, Mail, ShieldCheck } from "lucide-react";

interface BannerProps {
  onOpenApplyModal: () => void;
}

export const FinalCTABanner: React.FC<BannerProps> = ({ onOpenApplyModal }) => {
  return (
    <section className="py-20 bg-[#1B2A4A] text-white relative overflow-hidden">
      {/* Decorative Warm Accent Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F0862C]/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6 reveal-fade-up">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
          Ready to Trade the Commute for a Headset and a Kitchen Table?
        </h2>

        <p className="text-base sm:text-lg text-[#DCEEF5]/90 font-normal max-w-2xl mx-auto leading-relaxed">
          Skip the traffic, avoid expensive office attire, and earn steady
          semi-monthly income right from your home workstation. Applications
          take less than 60 seconds.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenApplyModal}
            className="w-full sm:w-auto btn-primary px-9 py-4 text-base font-bold flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export const FooterSection: React.FC = () => {
  return (
    <footer
      id="contact"
      className="bg-[#121D34] text-white pt-16 pb-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact/Footer Block Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-center">
          {/* Left Block: Contact Card */}
          <div className="md:col-span-6 bg-[#1B2A4A] p-6 sm:p-8 border border-white/10 space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">
              Contact Us & More Details
            </h3>
            <p className="text-xs sm:text-sm text-[#DCEEF5]/80 font-normal">
              Have a specific question about client contracts or onboarding
              support? Our recruitment desk is standing by to help.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="tel:+19038477904"
                className="flex items-center gap-3 text-sm font-semibold text-white hover:text-[#F0862C] transition-colors"
              >
                <div className="w-8 h-8 bg-[#F0862C] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1.903.847.7904 &bull; Call or Text</span>
              </a>

              <a
                href="mailto:hello@mail.vibeconnectvs.com"
                className="flex items-center gap-3 text-sm font-semibold text-white hover:text-[#F0862C] transition-colors"
              >
                <div className="w-8 h-8 bg-[#F0862C] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@mail.vibeconnectvs.com</span>
              </a>
            </div>
          </div>

          {/* Right Block: Reassurance & Quick Navigation */}
          <div className="md:col-span-6 space-y-4 text-left">
            <h4 className="font-heading font-bold text-2xl text-white">
              Have Questions Before You Apply?
            </h4>
            <p className="text-sm text-[#DCEEF5]/80 font-normal leading-relaxed">
              We know searching for work-from-home positions can be daunting.
              That's why Vibe Connect Virtual provides transparent expectations,
              prompt candidate communication, and zero hidden costs.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-[#DCEEF5]">
              <a
                href="#home"
                className="hover:text-[#F0862C] transition-colors"
              >
                Home
              </a>
              <span>&bull;</span>
              <a
                href="#about"
                className="hover:text-[#F0862C] transition-colors"
              >
                About Us
              </a>
              <span>&bull;</span>
              <a
                href="#roles"
                className="hover:text-[#F0862C] transition-colors"
              >
                Available Roles
              </a>
              <span>&bull;</span>
              <a href="#faq" className="hover:text-[#F0862C] transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCEEF5]/60">
          <p>
            &copy; {new Date().getFullYear()} Vibe Connect Virtual LLC. All
            rights reserved. Equal Opportunity Remote Staffing Partner.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
