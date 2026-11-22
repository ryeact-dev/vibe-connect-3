import React from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import { SEOHead } from "@/components/SEOHead";
import { parseInline } from "@/lib/inline";
import {
  ARISE_DEFINITION,
  HUB_PAGE,
  LAST_UPDATED_LINE,
  bannerUrl,
  buildPageSchema,
  type Block,
  type SeoPageData,
} from "@/lib/seo-pages";
import { APPLY_URL, HUB_URL, PAY_SOURCE } from "@/lib/site-config";

const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {parseInline(text).map((p, i) =>
      p.href ? (
        <a
          key={i}
          href={p.href}
          className="font-semibold text-[#0d627b] underline underline-offset-4 hover:text-[#F0862C]"
        >
          {p.text}
        </a>
      ) : (
        <React.Fragment key={i}>{p.text}</React.Fragment>
      ),
    )}
  </>
);

const BlockView: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-relaxed text-[#2B2B2B]/85">
          <Inline text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed text-[#2B2B2B]/85">
          {block.items.map((it) => (
            <li key={it}>
              <Inline text={it} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 space-y-2 text-base leading-relaxed text-[#2B2B2B]/85">
          {block.items.map((it) => (
            <li key={it}>
              <Inline text={it} />
            </li>
          ))}
        </ol>
      );
    case "source":
      return <p className="text-xs text-[#5A6578]">{block.text}</p>;
  }
};

const ApplyButton: React.FC = () => (
  <a
    href={APPLY_URL}
    className="btn-primary inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-bold shadow-lg"
  >
    Apply Now
    <ArrowRight className="w-5 h-5" />
  </a>
);

export const SeoPage: React.FC<{ page: SeoPageData }> = ({ page }) => (
  <div className="min-h-screen bg-white text-[#2B2B2B] flex flex-col font-sans selection:bg-[#F0862C]/20 selection:text-[#1B2A4A]">
    <SEOHead
      title={page.title}
      description={page.description}
      canonical={page.path}
      ogImage={bannerUrl(page)}
      schemaJson={buildPageSchema(page)}
      rawTitle
    />
    <Navbar />

    <main className="flex-grow mt-[72px]">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[#F2F8FA] border-b border-[#DCEEF5]"
      >
        <ol className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center gap-x-2 text-xs text-[#5A6578]">
          <li>
            <a href="/" className="hover:text-[#F0862C]">
              Home
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            {page.isHub ? (
              <span aria-current="page">{HUB_PAGE.crumb}</span>
            ) : (
              <a href={HUB_URL} className="hover:text-[#F0862C]">
                {HUB_PAGE.crumb}
              </a>
            )}
          </li>
          {!page.isHub && (
            <>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{page.crumb}</li>
            </>
          )}
        </ol>
      </nav>

      <article>
        {/* Banner: first screen, so eager + high priority (no lazy-loading) */}
        <img
          src={`/images/${page.banner.file}`}
          alt={page.banner.alt}
          width={1600}
          height={600}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-auto max-h-[420px] object-cover"
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-5">
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1B2A4A] leading-tight">
            {page.h1}
          </h1>

          <aside
            aria-label="Quick answer"
            className="border-l-4 border-[#F0862C] bg-[#F2F8FA] p-5 space-y-2"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[#F0862C]">
              Quick answer
            </p>
            <p className="text-base leading-relaxed text-[#1B2A4A]">
              {page.quickAnswer}
            </p>
            <p className="text-sm text-[#5A6578]">{ARISE_DEFINITION}</p>
            <p className="text-xs text-[#5A6578]">{PAY_SOURCE}</p>
          </aside>

          <p className="text-sm text-[#5A6578]">{LAST_UPDATED_LINE}</p>

          {page.intro.map((t) => (
            <p key={t} className="text-base leading-relaxed text-[#2B2B2B]/85">
              <Inline text={t} />
            </p>
          ))}

          {page.sections.map((s) => (
            <React.Fragment key={s.h2}>
              <section className="space-y-4 pt-4">
                <h2 className="text-2xl font-heading font-bold text-[#1B2A4A]">
                  {s.h2}
                </h2>
                {s.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </section>

              {page.midCta.afterSection === s.h2 && (
                <aside
                  aria-label="Apply"
                  className="my-6 bg-[#1B2A4A] text-white p-8 text-center space-y-3"
                >
                  <p className="text-2xl font-heading font-extrabold text-white">
                    {page.midCta.heading}
                  </p>
                  <p className="text-base text-[#DCEEF5]/90">
                    {page.midCta.subline}
                  </p>
                  <div className="pt-2">
                    <ApplyButton />
                  </div>
                </aside>
              )}
            </React.Fragment>
          ))}

          <section className="space-y-5 pt-6">
            <h2 className="text-2xl font-heading font-bold text-[#1B2A4A]">
              Frequently asked questions
            </h2>
            {page.faq.map((f) => (
              <div key={f.q} className="space-y-1">
                <h3 className="text-lg font-heading font-bold text-[#1B2A4A]">
                  {f.q}
                </h3>
                <p className="text-base leading-relaxed text-[#2B2B2B]/85">
                  <Inline text={f.a} />
                </p>
              </div>
            ))}
          </section>

          {!page.isHub && (
            <p className="pt-4 text-base">
              <a
                href={HUB_URL}
                className="font-semibold text-[#0d627b] underline underline-offset-4 hover:text-[#F0862C]"
              >
                See all remote work from home jobs in the US
              </a>
            </p>
          )}

          <section className="space-y-3 pt-4 text-center bg-[#F2F8FA] p-8">
            <h2 className="text-2xl font-heading font-bold text-[#1B2A4A]">
              {page.finalCta.heading}
            </h2>
            <p className="text-base leading-relaxed text-[#2B2B2B]/85">
              <Inline text={page.finalCta.text} />
            </p>
            <div className="pt-2">
              <ApplyButton />
            </div>
          </section>
        </div>
      </article>
    </main>

    <FooterSection />
  </div>
);

export default SeoPage;
