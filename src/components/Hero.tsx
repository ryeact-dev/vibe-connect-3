import React from "react";
import { DollarSign, GraduationCap, Home, ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenApplyModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApplyModal }) => {
  return (
    <section
      id="home"
      className="relative mt-20 lg:pt-28 lg:pb-24 bg-[#BCE1F0] overflow-hidden lg:min-h-[650px] min-h-[500px] flex items-center"
    >
      {/* Background Hero Agent Photo on the Right matching exact design */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <img
          src="https://vibe.filesafe.space/1785542809220106141/attachments/dc354123-a298-403e-b9f8-e3f0ed1ce92d.png"
          alt="Vibe Connect Remote Agent with headset"
          className="h-full w-full lg:object-contain lg:object-right object-cover object-center"
          loading="eager"
        />
        {/* Soft mobile gradient for readability while keeping the exact blue tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#BCE1F0] via-[#BCE1F0]/90 md:via-[#BCE1F0]/50 to-transparent lg:hidden"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-xl lg:max-w-2xl bg-white/90 p-8 sm:p-12 lg:p-14 shadow-lg border border-white text-left reveal-fade-up">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-extrabold text-[#1B2A4A] leading-[1.2] sm:leading-[1.2] tracking-normal mb-6">
            Work From Home.
            <br />
            Get Paid Semi-Monthly.
            <br />
            No Cubicle Required.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#4A5568] font-normal leading-relaxed mb-8 max-w-lg">
            VibeConnect connects motivated people across the U.S. with real,
            remote customer service roles. No commute, no rigid 9-to-5, no
            experience required to start.
          </p>

          <div>
            <button
              onClick={onOpenApplyModal}
              className="bg-[#F0862C] hover:bg-[#D9731C] text-white px-9 py-4 font-bold text-base shadow-md cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5"
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

export const ValueProps: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: Warm Orange Card matching uploaded design */}
          <div className="bg-[#F0862C] text-white p-8 shadow-lg flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 bg-white/20 text-white flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                Paid twice a month, on time
              </h3>
              <p className="text-sm text-white/95 leading-relaxed font-normal">
                No waiting a month for your first paycheck. You're paid every
                15th and 30th, like clockwork.
              </p>
            </div>
          </div>

          {/* Card 2: White Card with badge */}
          <div className="bg-white p-8 border border-gray-100 shadow-md flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 bg-[#F0862C]/15 text-[#F0862C] flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#1B2A4A] mb-3">
                No Experience? No Problem
              </h3>
              <p className="text-sm text-[#5A6578] leading-relaxed font-normal">
                We train you. If you're dependable and articulate, we'll teach
                you the rest for your first live calls.
              </p>
            </div>
          </div>

          {/* Card 3: White Card with home icon */}
          <div className="bg-white p-8 border border-gray-100 shadow-md flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 bg-[#F0862C]/15 text-[#F0862C] flex items-center justify-center mb-6">
                <Home className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#1B2A4A] mb-3">
                Truly Remote
              </h3>
              <p className="text-sm text-[#5A6578] leading-relaxed font-normal">
                No office, no commute. Work from eligible states across the
                U.S., matching shifts 24/7 to fit the rest of your life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
