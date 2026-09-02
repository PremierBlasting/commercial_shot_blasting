import { CheckCircle2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { trackCapabilityStatementDownload } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const CAPABILITY_STATEMENT_URL = "/manus-storage/commercial-capability-statement-approved-2026-09-02_308ee57e.pdf";

type CapabilityStatementDownloadProps = {
  placement: string;
  children: ReactNode;
  linkClassName: string;
  containerClassName?: string;
  confirmationClassName?: string;
  ariaLabel?: string;
  tone?: "light" | "dark";
};

/**
 * Starts the approved document download, records non-conversion engagement,
 * and provides a useful next step without interrupting the browser download.
 */
export function CapabilityStatementDownload({
  placement,
  children,
  linkClassName,
  containerClassName,
  confirmationClassName,
  ariaLabel = "Download the current Commercial Shot Blasting capability statement PDF",
  tone = "light",
}: CapabilityStatementDownloadProps) {
  const [hasInitiatedDownload, setHasInitiatedDownload] = useState(false);
  const isDark = tone === "dark";

  const handleDownload = () => {
    trackCapabilityStatementDownload(placement);
    setHasInitiatedDownload(true);
  };

  return (
    <div className={cn("min-w-0", containerClassName)}>
      <a
        href={CAPABILITY_STATEMENT_URL}
        download="Commercial-Capability-Statement.pdf"
        onClick={handleDownload}
        aria-label={ariaLabel}
        className={linkClassName}
      >
        {children}
      </a>
      {hasInitiatedDownload && (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "mt-3 flex items-start gap-2 text-xs leading-relaxed",
            isDark ? "text-white/85" : "text-[#1a3d52]",
            confirmationClassName
          )}
        >
          <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", isDark ? "text-[#f7d98f]" : "text-[#2C5F7F]")} aria-hidden="true" />
          <span>
            Thank you — your download should now begin. Need project-specific support?{" "}
            <Link href="/site-survey" className={cn("font-bold underline underline-offset-2", isDark ? "text-white hover:text-[#f7d98f]" : "text-[#2C5F7F] hover:text-[#1a3d52]")}>Request A Site Visit</Link>.
          </span>
        </p>
      )}
    </div>
  );
}
