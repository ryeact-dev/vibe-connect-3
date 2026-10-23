import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenApplyModal: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApplyModal,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md py-2.5" : "py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Image */}
        <a
          href="#home"
          className="flex items-center gap-2 group text-decoration-none"
        >
          <img
            src="https://assets.cdn.filesafe.space/2pGpEHYvndYECBOCEp4h/media/6a6aba12cf81b06f05cfd1fe.png"
            alt="Vibe Connect Virtual Services"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative font-heading text-[17px] font-bold transition-colors py-1 ${
                  isActive
                    ? "text-[#F0862C]"
                    : "text-[#1B2A4A] hover:text-[#F0862C]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F0862C]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenApplyModal}
            className="btn-primary rounded-none px-7 py-3 text-base font-bold tracking-wide cursor-pointer bg-[#DF7B43] hover:bg-[#c96632] text-white transition-transform duration-200 flex items-center gap-2"
          >
            <span>Apply Now!</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1B2A4A] hover:text-[#F0862C] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 font-heading text-base font-bold ${
                  isActive
                    ? "bg-[#DCEEF5] text-[#F0862C]"
                    : "text-[#1B2A4A] hover:bg-gray-50 hover:text-[#F0862C]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApplyModal();
              }}
              className="w-full btn-primary rounded-none py-3 text-center font-heading text-base font-bold bg-[#DF7B43] text-white flex items-center justify-center gap-2"
            >
              <span>Apply Now!</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
