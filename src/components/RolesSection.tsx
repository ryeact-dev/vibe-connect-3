import React from "react";
import {
  Headphones,
  PhoneCall,
  UserCheck,
  MessageSquare,
  HeadphonesIcon,
  ShieldAlert,
} from "lucide-react";
import { ROLES_DATA } from "@/lib/roles-data";

interface RolesProps {
  onOpenApplyModal: () => void;
}

export const RolesSection: React.FC<RolesProps> = ({ onOpenApplyModal }) => {
  const roleIcons = [
    Headphones,
    PhoneCall,
    UserCheck,
    HeadphonesIcon,
    ShieldAlert,
    MessageSquare,
  ];
  const roles = ROLES_DATA.map((role, i) => ({
    ...role,
    icon: roleIcons[i] ?? Headphones,
  }));

  return (
    <section id="roles" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 reveal-fade-up">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1B2A4A] leading-[1.3]">
            Find the Role That Fits You
          </h2>
          <p className="text-base text-[#5A6578] font-normal">
            Whether you prefer voice calls, live messaging, or back-office
            processing, we connect you with client contracts that match your
            skill level.
          </p>
        </div>

        {/* 6-Card Grid: 3-col desktop, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, idx) => {
            const IconComp = role.icon;
            return (
              <div
                key={role.title}
                className={`bg-white border border-[#DCEEF5] p-6 text-center flex flex-col items-center justify-center transition-all duration-200 hover:shadow-lg hover:border-[#F0862C]/40 hover:-translate-y-1 group reveal-fade-up stagger-${(idx % 3) + 1}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-[#DCEEF5] text-[#0d627b] flex items-center justify-center mb-4 group-hover:bg-[#F0862C] group-hover:text-white transition-colors">
                    <IconComp className="w-7 h-7 stroke-[2]" />
                  </div>

                  <h3 className="text-base sm:text-lg font-heading font-bold text-[#1B2A4A] mb-2 group-hover:text-[#F0862C] transition-colors">
                    {role.title}
                  </h3>

                  <p className="text-xs text-[#5A6578] font-normal leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
