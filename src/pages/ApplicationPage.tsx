import React from "react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

const APPLICATION_OG_IMAGE =
  "https://vibe.filesafe.space/1785542809220106141/attachments/dc354123-a298-403e-b9f8-e3f0ed1ce92d.png";

const ApplicationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F2F8FA] text-[#2B2B2B] flex flex-col font-sans selection:bg-[#F0862C]/20 selection:text-[#1B2A4A]">
      <SEOHead
        title="Apply for Remote Customer Service Jobs"
        description="Apply in 60 seconds for legitimate work-from-home customer service and support roles with Vibe Connect Virtual. Quick screening form, semi-monthly pay, no experience required."
        canonical="/application-page"
        ogImage={APPLICATION_OG_IMAGE}
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Apply for Remote Customer Service Jobs | Vibe Connect Virtual",
          description:
            "Apply in 60 seconds for legitimate work-from-home customer service and support roles with Vibe Connect Virtual.",
          url: "https://application.vibeconnectvs.com/application-page",
        }}
      />
      <Navbar onOpenApplyModal={() => {}} />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B2A4A] hover:text-[#F0862C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#1B2A4A] text-white p-8 text-center relative">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
              Apply For Remote Agent Roles
            </h1>
            <p className="text-sm text-[#DCEEF5]/90 max-w-lg mx-auto">
              Complete this quick screening form to get reviewed for legitimate
              work-from-home customer service and support opportunities with
              Vibe Connect Virtual.
            </p>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-10">
            <ApplicationForm />
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ApplicationPage;
