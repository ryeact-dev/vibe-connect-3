import React from "react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import { SEOHead } from "@/components/SEOHead";
import type { LegalPageData } from "@/lib/legal-pages";

export const LegalPage: React.FC<{ page: LegalPageData }> = ({ page }) => (
  <div className="min-h-screen bg-white text-[#2B2B2B] flex flex-col font-sans">
    <SEOHead
      title={page.title}
      description={page.description}
      canonical={page.path}
      rawTitle
    />
    <Navbar />
    <main className="flex-grow mt-[72px]">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-5">
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1B2A4A]">
          {page.h1}
        </h1>
        <p className="text-sm text-[#5A6578]">Last updated: {page.updated}</p>
        {page.sections.map((s) => (
          <section key={s.h2} className="space-y-3 pt-2">
            <h2 className="text-xl font-heading font-bold text-[#1B2A4A]">
              {s.h2}
            </h2>
            {s.paragraphs?.map((t) => (
              <p key={t} className="text-base leading-relaxed text-[#2B2B2B]/85">
                {t}
              </p>
            ))}
            {s.items && (
              <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-[#2B2B2B]/85">
                {s.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </main>
    <FooterSection />
  </div>
);

export default LegalPage;
