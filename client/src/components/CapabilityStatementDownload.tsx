import { CheckCircle2, Copy, Eye, FileImage, LoaderCircle, Send, Share2, Upload, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { trackCapabilityStatementDownload, trackCapabilityStatementPreview, trackCapabilityStatementShare } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import { formatUTMForSubmission } from "@/lib/utm";
import { validateLeadEmailClient } from "@shared/emailValidation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CAPABILITY_STATEMENT_URL = "/manus-storage/commercial-capability-statement-amended-linked-2026-09-14_9cee6eda.pdf";
export const MOBILE_CAPABILITY_STATEMENT_URL = "/manus-storage/commercial-capability-statement-amended-mobile-linked-2026-09-14_e64d3758.pdf";
export const CAPABILITY_STATEMENT_LAST_UPDATED = "14 September 2026";
export const CAPABILITY_STATEMENT_LAST_UPDATED_ISO = "2026-09-14";

const CAPABILITY_STATEMENT_CONTENTS: ReadonlyArray<{ page: number; title: string; linkedCaseStudy?: boolean }> = [
  { page: 1, title: "Cover" },
  { page: 2, title: "About Us" },
  { page: 3, title: "Health & Safety" },
  { page: 4, title: "Services" },
  { page: 5, title: "Fleet & Equipment" },
  { page: 6, title: "Case Study 1: Doncaster", linkedCaseStudy: true },
  { page: 7, title: "Case Study 2: Wigan", linkedCaseStudy: true },
  { page: 8, title: "Why Premier Blasting?" },
  { page: 9, title: "What Our Clients Say" },
  { page: 10, title: "Contact Information" },
];

type CapabilityStatementDownloadProps = {
  placement: string;
  children: ReactNode;
  linkClassName: string;
  containerClassName?: string;
  confirmationClassName?: string;
  ariaLabel?: string;
  tone?: "light" | "dark";
};

type CapabilityStatementSiteVisitFormProps = {
  placement: string;
  tone: "light" | "dark";
};

const MAX_PROJECT_PHOTO_BYTES = 8 * 1024 * 1024;
const ACCEPTED_PROJECT_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("The selected file could not be read."));
        return;
      }
      const base64 = reader.result.split(",")[1];
      if (!base64) {
        reject(new Error("The selected file could not be read."));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("The selected file could not be read."));
    reader.readAsDataURL(file);
  });
}

/** A short lead form that uses the established contact submission route. */
function CapabilityStatementSiteVisitForm({ placement, tone }: CapabilityStatementSiteVisitFormProps) {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [projectPhoto, setProjectPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fieldId = useId();
  const projectPhotoInputRef = useRef<HTMLInputElement>(null);
  const isDark = tone === "dark";

  const contactMutation = trpc.contact.submit.useMutation();
  const attachmentUpload = trpc.contact.uploadAttachments.useMutation();
  const isSubmitting = contactMutation.isPending || attachmentUpload.isPending;

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setPhotoError("");
    setProjectPhoto(null);

    if (!file) return;
    if (!ACCEPTED_PROJECT_PHOTO_TYPES.includes(file.type)) {
      setPhotoError("Choose a JPG, PNG, or WebP project photo.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_PROJECT_PHOTO_BYTES) {
      setPhotoError("Project photos must be no larger than 8 MB.");
      event.target.value = "";
      return;
    }
    setProjectPhoto(file);
  };

  const removeProjectPhoto = () => {
    setProjectPhoto(null);
    setPhotoError("");
    if (projectPhotoInputRef.current) {
      projectPhotoInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!firstName.trim() || !phone.trim()) {
      setError("Please enter your first name and phone number.");
      return;
    }

    if (email.trim()) {
      const emailResult = validateLeadEmailClient(email);
      if (!emailResult.valid) {
        setError(emailResult.reason || "Please enter a valid email address.");
        return;
      }
    }

    try {
      const photo = projectPhoto
        ? (await attachmentUpload.mutateAsync({
            attachments: [{
              fileName: projectPhoto.name,
              fileData: await readFileAsBase64(projectPhoto),
              contentType: projectPhoto.type as "image/jpeg" | "image/png" | "image/webp",
            }],
          }))[0]
        : undefined;
      const utmData = formatUTMForSubmission();
      const messageParts = [
        "Request: Site Visit after Commercial Capability Statement download",
        `Download Source: ${placement}`,
        postcode.trim() && `Postal Code: ${postcode.trim()}`,
        projectSummary.trim() && `Project Summary:\n${projectSummary.trim()}`,
        photo && `Project Photo: ${photo.url}`,
      ].filter(Boolean);

      await contactMutation.mutateAsync({
        name: firstName.trim(),
        email: email.trim() || `${phone.replace(/\s/g, "")}@sms.placeholder`,
        phone: phone.trim(),
        message: messageParts.join("\n"),
        sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
        utmData: Object.keys(utmData).length > 0 ? utmData : undefined,
        marketingConsent,
      });
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please call us directly on 07721 375756.");
    }
  };

  const fieldClassName = cn(
    "w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2",
    isDark
      ? "border-white/30 bg-white/10 text-white placeholder:text-white/55 focus:border-[#f7d98f] focus:ring-[#f7d98f]/30"
      : "border-[#2C5F7F]/25 bg-white text-[#1a3d52] placeholder:text-gray-400 focus:border-[#2C5F7F] focus:ring-[#2C5F7F]/25"
  );

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className={cn("animate-in fade-in zoom-in-95 duration-200 motion-reduce:animate-none rounded-lg border p-3 text-sm leading-relaxed", isDark ? "border-[#f7d98f]/40 bg-white/10 text-white" : "border-[#2C5F7F]/20 bg-white text-[#1a3d52]")}>
        <span className="flex items-start gap-2"><CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0 motion-safe:animate-[ping_0.45s_ease-out_1]", isDark ? "text-[#f7d98f]" : "text-[#2C5F7F]")} aria-hidden="true" />Thank you — your Site Visit request has been sent. We&apos;ll get back to you promptly.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("rounded-lg border p-3", isDark ? "border-white/25 bg-white/10" : "border-[#2C5F7F]/20 bg-white")}> 
      <div className="mb-3">
        <p className={cn("text-sm font-bold", isDark ? "text-white" : "text-[#1a3d52]")}>Request A Site Visit</p>
        <p className={cn("mt-0.5 text-xs leading-relaxed", isDark ? "text-white/80" : "text-gray-600")}>Share your details and we&apos;ll get back to you promptly.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input type="hidden" name="downloadSource" value={placement} />
        <label className="sr-only" htmlFor={`${fieldId}-name`}>First name</label>
        <input id={`${fieldId}-name`} required autoComplete="given-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First name *" className={fieldClassName} />
        <label className="sr-only" htmlFor={`${fieldId}-phone`}>Phone number</label>
        <input id={`${fieldId}-phone`} required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number *" className={fieldClassName} />
        <label className="sr-only" htmlFor={`${fieldId}-email`}>Email address</label>
        <input id={`${fieldId}-email`} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address (optional)" className={fieldClassName} />
        <label className="sr-only" htmlFor={`${fieldId}-postcode`}>Site postcode</label>
        <input id={`${fieldId}-postcode`} autoComplete="postal-code" value={postcode} onChange={(event) => setPostcode(event.target.value)} placeholder="Site postcode (optional)" className={fieldClassName} />
      </div>
      <div className="mt-3">
        <label className="sr-only" htmlFor={`${fieldId}-project-summary`}>Brief project summary</label>
        <textarea id={`${fieldId}-project-summary`} value={projectSummary} onChange={(event) => setProjectSummary(event.target.value)} maxLength={2000} rows={3} placeholder="Brief project summary (optional)" className={cn(fieldClassName, "resize-y")} />
        <p className={cn("mt-1 text-[11px]", isDark ? "text-white/65" : "text-gray-500")}>Tell us what needs preparing, its condition, and anything that affects site access or programme planning.</p>
      </div>
      <div className="mt-3">
        <label htmlFor={`${fieldId}-project-photo`} className={cn("flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed px-3 py-2.5 text-xs transition hover:border-[#2C5F7F]/60", isDark ? "border-white/35 text-white/90 hover:bg-white/10" : "border-[#2C5F7F]/30 text-[#1a3d52] hover:bg-[#2C5F7F]/5")}>
          <span className="flex min-w-0 items-center gap-2"><FileImage className="h-4 w-4 shrink-0 text-[#2C5F7F]" aria-hidden="true" /><span className="truncate">{projectPhoto ? projectPhoto.name : "Add a project photo (optional)"}</span></span>
          <span className="flex shrink-0 items-center gap-1 font-semibold"><Upload className="h-3.5 w-3.5" aria-hidden="true" /> JPG, PNG, WebP</span>
        </label>
        <input ref={projectPhotoInputRef} id={`${fieldId}-project-photo`} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="sr-only" />
        <p className={cn("mt-1 text-[11px]", isDark ? "text-white/65" : "text-gray-500")}>Optional, maximum 8 MB. This helps us understand the current condition.</p>
        {projectPhoto && <button type="button" onClick={removeProjectPhoto} className={cn("mt-2 inline-flex items-center gap-1.5 text-xs font-semibold underline underline-offset-2 transition", isDark ? "text-white hover:text-[#f7d98f]" : "text-[#2C5F7F] hover:text-[#1a3d52]")} aria-label={`Remove selected project photo: ${projectPhoto.name}`}><X className="h-3.5 w-3.5" aria-hidden="true" /> Remove selected photo</button>}
        {photoError && <p role="alert" className="mt-1 text-xs font-medium text-red-600">{photoError}</p>}
      </div>
      <label className={cn("mt-3 flex items-start gap-2 text-[11px] leading-relaxed", isDark ? "text-white/75" : "text-gray-600")}> 
        <input type="checkbox" checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#2C5F7F]" />
        <span>I agree to receive other communications from Premier Blasting, the commercial surface-preparation arm of which is Commercial Shot Blasting. <a href="/privacy-policy" className="font-semibold underline underline-offset-2">Privacy Policy</a>.</span>
      </label>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{error}</p>}
      <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className={cn("mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70", isDark ? "bg-[#f1c76e] text-[#16394f] hover:bg-[#f7d98f]" : "bg-[#2C5F7F] text-white hover:bg-[#1a3d52]")}> 
        {isSubmitting ? <><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending Site Visit request…</> : <><Send className="h-4 w-4" aria-hidden="true" /> Request A Site Visit</>}
      </button>
    </form>
  );
}

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPage, setPreviewPage] = useState(1);
  const [shareStatus, setShareStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(CAPABILITY_STATEMENT_URL);
  const isDark = tone === "dark";

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const setPreferredDownloadUrl = () => {
      setDownloadUrl(mobileQuery.matches ? MOBILE_CAPABILITY_STATEMENT_URL : CAPABILITY_STATEMENT_URL);
    };

    setPreferredDownloadUrl();
    mobileQuery.addEventListener("change", setPreferredDownloadUrl);
    return () => mobileQuery.removeEventListener("change", setPreferredDownloadUrl);
  }, []);

  useEffect(() => {
    if (!shareStatus) return;
    const timeout = window.setTimeout(() => setShareStatus(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [shareStatus]);

  const handleDownload = () => {
    trackCapabilityStatementDownload(placement);
    setHasInitiatedDownload(true);
  };

  const handlePreviewChange = (open: boolean) => {
    setIsPreviewOpen(open);
    if (open) {
      setPreviewPage(1);
      setShareStatus("");
      trackCapabilityStatementPreview(placement);
    }
  };

  const handleShare = async () => {
    const shareUrl = typeof window === "undefined" ? CAPABILITY_STATEMENT_URL : `${window.location.origin}${CAPABILITY_STATEMENT_URL}`;
    const shareData = {
      title: "Commercial Capability Statement | Premier Blasting",
      text: "View the Commercial Capability Statement from Premier Blasting.",
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        trackCapabilityStatementShare(placement, "native");
        setShareStatus("Share options opened.");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      trackCapabilityStatementShare(placement, "clipboard");
      setShareStatus("Booklet link copied.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareStatus("Unable to open sharing here. You can copy the PDF link from the download button.");
    }
  };

  return (
    <div className={cn("min-w-0", containerClassName)}>
      <a
        href={downloadUrl}
        download="Commercial-Capability-Statement.pdf"
        onClick={handleDownload}
        aria-label={ariaLabel}
        className={cn("transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none", linkClassName)}
      >
        {children}
      </a>
      <div className={cn("mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs", isDark ? "text-white/70" : "text-slate-600")}>
        <time dateTime={CAPABILITY_STATEMENT_LAST_UPDATED_ISO}>Last updated: {CAPABILITY_STATEMENT_LAST_UPDATED}</time>
        <Dialog open={isPreviewOpen} onOpenChange={handlePreviewChange}>
          <DialogTrigger asChild>
            <button
              type="button"
              className={cn("inline-flex items-center gap-1 font-semibold underline underline-offset-2 transition", isDark ? "text-[#f7d98f] hover:text-white" : "text-[#2C5F7F] hover:text-[#1a3d52]")}
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" /> Preview booklet
            </button>
          </DialogTrigger>
          {isPreviewOpen && (
            <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-5xl gap-0 overflow-hidden p-0 sm:max-w-5xl" aria-describedby="capability-statement-preview-description">
              <DialogHeader className="border-b border-slate-200 px-5 py-4 pr-12 text-left">
                <DialogTitle className="text-[#1a3d52]">Commercial Capability Statement</DialogTitle>
                <DialogDescription id="capability-statement-preview-description">Preview the current 10-page booklet. The two case studies include links to their live project pages.</DialogDescription>
              </DialogHeader>
              <nav aria-label="Booklet contents" className="border-b border-slate-200 bg-white px-4 py-3">
                <p className="mb-2 text-xs font-bold tracking-wide text-[#1a3d52] uppercase">Contents</p>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-5">
                  {CAPABILITY_STATEMENT_CONTENTS.map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => setPreviewPage(item.page)}
                      aria-current={previewPage === item.page ? "page" : undefined}
                      className={cn(
                        "rounded px-2 py-1.5 text-left text-[11px] leading-tight transition focus-visible:ring-2 focus-visible:ring-[#2C5F7F] focus-visible:outline-none",
                        previewPage === item.page ? "bg-[#2C5F7F] font-semibold text-white" : "text-[#1a3d52] hover:bg-[#edf4f7]"
                      )}
                    >
                      <span className="mr-1 font-bold">{item.page}.</span>{item.title}
                      {item.linkedCaseStudy && <span className="sr-only"> (contains a live case-study link)</span>}
                    </button>
                  ))}
                </div>
              </nav>
              <div className="min-h-[42dvh] bg-slate-100 sm:min-h-[50dvh]">
                <iframe
                  key={`${downloadUrl}-${previewPage}`}
                  src={`${downloadUrl}#page=${previewPage}&view=FitH`}
                  title="Commercial Capability Statement PDF preview"
                  className="h-[42dvh] w-full border-0 sm:h-[50dvh]"
                >
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Open the capability statement PDF preview</a>
                </iframe>
              </div>
              <DialogFooter className="border-t border-slate-200 px-5 py-3 sm:justify-between">
                <p className="text-xs text-slate-500"><time dateTime={CAPABILITY_STATEMENT_LAST_UPDATED_ISO}>Last updated: {CAPABILITY_STATEMENT_LAST_UPDATED}</time></p>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    {shareStatus && <p role="status" aria-live="polite" className="animate-in fade-in zoom-in-95 motion-reduce:animate-none absolute bottom-full right-0 z-10 mb-2 w-max max-w-[15rem] rounded-md bg-[#16394f] px-3 py-2 text-xs font-semibold text-white shadow-lg"><Copy className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />{shareStatus}</p>}
                    <button type="button" onClick={handleShare} className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#2C5F7F]/30 px-3 py-2 text-sm font-bold text-[#1a3d52] transition hover:bg-[#edf4f7]"><Share2 className="h-4 w-4" aria-hidden="true" /> Share this booklet</button>
                  </div>
                  <a href={downloadUrl} download="Commercial-Capability-Statement.pdf" onClick={handleDownload} className="inline-flex items-center justify-center rounded-md bg-[#2C5F7F] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1a3d52]">Download PDF</a>
                </div>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
      {hasInitiatedDownload && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "mt-3 flex items-start gap-2 text-xs leading-relaxed",
            isDark ? "text-white/85" : "text-[#1a3d52]",
            confirmationClassName
          )}
        >
          <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", isDark ? "text-[#f7d98f]" : "text-[#2C5F7F]")} aria-hidden="true" />
          <span>Thank you — your download should now begin. You can request a Site Visit below without leaving this page.</span>
        </div>
      )}
      {hasInitiatedDownload && <CapabilityStatementSiteVisitForm placement={placement} tone={tone} />}
    </div>
  );
}
