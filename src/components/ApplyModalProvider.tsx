import React, { createContext, useCallback, useContext, useState } from "react";
import { ApplicationModal } from "@/components/ApplicationForm";
import { APPLY_URL } from "@/lib/site-config";

const ApplyContext = createContext<() => void>(() => {});

/** Renders one application pop-up for the whole app; any <ApplyLink> opens it. */
export const ApplyModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  return (
    <ApplyContext.Provider value={openModal}>
      {children}
      <ApplicationModal isOpen={open} onClose={() => setOpen(false)} />
    </ApplyContext.Provider>
  );
};

type ApplyLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>;

/**
 * Apply Now link. It keeps a real href to the application page (works without
 * JavaScript and for crawlers) but opens the pop-up form when JS is running.
 */
export const ApplyLink: React.FC<ApplyLinkProps> = ({ onClick, ...props }) => {
  const openModal = useContext(ApplyContext);
  return (
    <a
      {...props}
      href={APPLY_URL}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          window.location.pathname === APPLY_URL
        )
          return;
        e.preventDefault();
        openModal();
      }}
    />
  );
};
