import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero, ValueProps } from "@/components/Hero";
import {
  AboutSection,
  AgentCentricDarkSection,
} from "@/components/AboutSection";
import { RolesSection } from "@/components/RolesSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTABanner, FooterSection } from "@/components/FooterSection";
import { ApplicationModal } from "@/components/ApplicationForm";
import { SEOHead } from "@/components/SEOHead";
import {
  HOME_DESCRIPTION,
  HOME_OG_IMAGE,
  HOME_SCHEMA_GRAPH,
  HOME_TITLE,
} from "@/lib/seo-schema";

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Intersection Observer for scroll reveal animations and active nav tracking
  useEffect(() => {
    // 1. Reveal Animation Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const revealElements = document.querySelectorAll(".reveal-fade-up");
    revealElements.forEach((el) => observer.observe(el));

    // 2. Scrollspy Observer for Section Tracking
    const sectionIds = ["home", "about", "roles", "faq", "contact"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const scrollSpyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    sectionElements.forEach((sec) => scrollSpyObserver.observe(sec));

    return () => {
      observer.disconnect();
      scrollSpyObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#2B2B2B] flex flex-col font-sans selection:bg-[#F0862C]/20 selection:text-[#1B2A4A]">
      <SEOHead
        title={HOME_TITLE}
        description={HOME_DESCRIPTION}
        canonical="/"
        ogImage={HOME_OG_IMAGE}
        schemaJson={HOME_SCHEMA_GRAPH}
      />

      {/* 1. Header Navigation */}
      <Navbar
        onOpenApplyModal={handleOpenModal}
        activeSection={activeSection}
      />

      {/* Main Page Flow (Strict Section Order) */}
      <main className="flex-grow">
        {/* 2. Hero Section (Split layout with friendly remote agent) */}
        <Hero onOpenApplyModal={handleOpenModal} />

        {/* 3. Three Value Props Row */}
        <ValueProps />

        {/* 4. "We Are the Best Remote Career Service For Your People" (About section) */}
        <AboutSection onOpenApplyModal={handleOpenModal} />

        {/* 5. "We're Built Around the Agent, Not Just the Client" (Dark Navy Section) */}
        <AgentCentricDarkSection onOpenApplyModal={handleOpenModal} />

        {/* 6. "Find the Role That Fits You" (6-card grid) */}
        <RolesSection onOpenApplyModal={handleOpenModal} />

        {/* 7. FAQ Accordion Section */}
        <FAQSection />

        {/* 8. Final CTA Banner */}
        <FinalCTABanner onOpenApplyModal={handleOpenModal} />
      </main>

      {/* 9. Contact / Footer Block */}
      <FooterSection />

      {/* Universal Popup Modal triggered from any "Apply Now" button */}
      <ApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Index;
