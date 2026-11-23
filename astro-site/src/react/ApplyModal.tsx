import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ApplicationForm } from "./ApplicationForm";

export function ApplyModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<Element | null>(null);

  useEffect(() => {
    returnFocus.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("input, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), textarea, select',
      );
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      (returnFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#1B2A4A]/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        className="animate-scale-up relative my-auto w-full max-w-lg overflow-hidden border border-gray-100 bg-white shadow-2xl"
      >
        <div className="relative bg-[#1B2A4A] p-5 text-white sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center bg-white/10 text-white hover:bg-white/20 sm:right-5 sm:top-5"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 id="apply-title" className="pr-12 font-heading text-xl font-bold text-white sm:text-2xl">
            Apply For Remote Agent Roles
          </h2>
          <p className="mt-1 text-sm text-[#DCEEF5]/80">
            Complete this 60-second form to start your candidate review.
          </p>
        </div>
        <div className="max-h-[75dvh] overflow-y-auto overscroll-contain p-5 sm:p-8">
          <ApplicationForm onSuccess={onClose} isModal />
        </div>
      </div>
    </div>
  );
}
