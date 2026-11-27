import { useCallback, useId, useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle, FileText, Loader2, Mail, Upload, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { formatUTMForSubmission } from "@/lib/utm";
import { normaliseUKPostcode, validateLeadEmailClient, validateUKPhone, validateUKPostcode } from "@shared/emailValidation";
import { HBTunnellingTestimonial } from "@/components/HBTunnellingTestimonial";
import { trackCommercialShotBlastingLead } from "@/lib/analytics";
import { ENQUIRY_ATTACHMENT_ACCEPT, selectEnquiryAttachments, formatAttachmentSize } from "@shared/enquiryAttachments";
import { uploadEnquiryFile, type UploadedEnquiryMedia } from "@/lib/enquiryMediaUpload";
import { usePilotFormInitialValues } from "@/ssr/PilotRenderContext";

export interface LeadFormProps {
  /** Visual variant — dark for a dark background, light elsewhere. */
  variant?: "dark" | "light";
  /** Compact presentation for the homepage hero while retaining the same lead contract. */
  presentation?: "standard" | "hero";
  /** Location context is recorded with the existing lead-delivery payload. */
  locationName?: string;
  /** Retained for backwards-compatible call sites; every visible form is titled Get In Touch. */
  heading?: string;
  /** Optional short supporting text beneath the universal form heading. */
  subheading?: string;
  /** Show a WhatsApp fallback link beneath the form. */
  showWhatsApp?: boolean;
  /** Keep the optional marketing consent visible where it is relevant to the form placement. */
  showMarketingConsent?: boolean;
  /** Retained for backwards-compatible call sites; asset selection is intentionally no longer shown. */
  showAssetSelector?: boolean;
  /** Marks an approved capability-statement follow-up without adding fields. */
  capabilityStatementRequest?: boolean;
  /** Optional source context recorded in the existing message payload. */
  enquiryContext?: string;
  /** Callback after a successful lead submission. */
  onSuccess?: () => void;
}

interface SelectedEnquiryMedia { id:string;file:File;status:"queued"|"uploading"|"finishing"|"uploaded"|"failed";progress:number;error?:string }

/**
 * The single public enquiry form used throughout Commercial Shot Blasting.
 * It deliberately asks for only the essentials while retaining the established
 * CSB lead, attribution, upload and notification pathways.
 */
export function LeadForm({
  variant = "light",
  presentation = "standard",
  locationName,
  subheading,
  showWhatsApp = true,
  showMarketingConsent = true,
  capabilityStatementRequest = false,
  enquiryContext,
  onSuccess,
}: LeadFormProps) {
  // This remains the first useId call, preserving the existing field identities.
  const fieldId = useId();
  const initialFields = usePilotFormInitialValues(fieldId);
  const [name, setName] = useState(() => initialFields.name);
  const [phone, setPhone] = useState(() => initialFields.phone);
  const [email, setEmail] = useState(() => initialFields.email);
  const [postcode, setPostcode] = useState(() => initialFields.postcode);
  const [message, setMessage] = useState(() => initialFields.message);
  const [attachments, setAttachments] = useState<SelectedEnquiryMedia[]>([]);
  const [attachmentErrors, setAttachmentErrors] = useState<string[]>([]);
  const [uploadBusy, setUploadBusy] = useState(false);
  const uploadedFiles = useRef(new Map<string, UploadedEnquiryMedia>());
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const chasTooltipId = useId();
  const isDark = variant === "dark";
  const isHero = presentation === "hero";
  const acceptedAttemptId = useRef<string | undefined>(undefined);
  const submissionBusy = useRef(false);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: (result) => {
      if (!result.success) { setError("We could not send your enquiry. Please try again or call 07970 566409."); return; }
      if (result.success && result.acceptedAttemptId === acceptedAttemptId.current) {
        trackCommercialShotBlastingLead(result.acceptedAttemptId);
      }
      setSubmitted(true);
      onSuccess?.();
    },
    onError: (submissionError) => {
      setError(submissionError.message || "Something went wrong. Please call us directly on 07970 566409.");
    },
  });
  const mediaBegin = trpc.contact.beginMediaUpload.useMutation();
  const mediaChunk = trpc.contact.uploadMediaChunk.useMutation({ gcTime: 0 });
  const mediaFinish = trpc.contact.finishMediaUpload.useMutation();
  const mediaCancel = trpc.contact.cancelMediaUpload.useMutation();
  const isSubmitting = uploadBusy || contactMutation.isPending;
  const mediaApi = { begin: mediaBegin.mutateAsync, chunk: mediaChunk.mutateAsync, finish: mediaFinish.mutateAsync, cancel: mediaCancel.mutateAsync };

  const validateEmail = useCallback((value: string) => {
    if (!value.trim()) return "Please enter your email address.";
    const result = validateLeadEmailClient(value);
    return result.valid ? "" : (result.reason ?? "Please enter a valid email address.");
  }, []);

  const validatePhone = useCallback((value: string) => {
    if (!value.trim()) return "Please enter your phone number.";
    const result = validateUKPhone(value);
    return result.valid ? "" : (result.reason ?? "Please enter a valid UK phone number.");
  }, []);

  const validatePostcode = useCallback((value: string) => {
    const result = validateUKPostcode(value);
    return result.valid ? "" : (result.reason ?? "Please enter a valid UK postcode.");
  }, []);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    setEmailError(value.trim().length > 5 ? validateEmail(value) : "");
  }, [validateEmail]);

  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
    setPhoneError(value.trim().length > 5 ? validatePhone(value) : "");
  }, [validatePhone]);

  const handlePostcodeChange = useCallback((value: string) => {
    setPostcode(value);
    setPostcodeError(value.trim().length >= 4 ? validatePostcode(value) : "");
  }, [validatePostcode]);

  const addAttachments = (incoming: FileList | null) => {
    if (!incoming || submissionBusy.current) return;
    const selection = selectEnquiryAttachments(attachments.map(item => item.file), Array.from(incoming));
    setAttachmentErrors(selection.errors);
    setAttachments(selection.files.map(file => attachments.find(item => item.file === file) || {
      id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file, status: "queued", progress: 0,
    }));
    if (attachmentInputRef.current) attachmentInputRef.current.value = "";
  };

  const removeAttachment = (id: string) => {
    if (submissionBusy.current) return;
    uploadedFiles.current.delete(id);
    setAttachments(current => current.filter(item => item.id !== id));
    setAttachmentErrors([]);
    setError("");
  };

  const updateAttachment = (id:string, changes:Partial<SelectedEnquiryMedia>) => setAttachments(current => current.map(item => item.id === id ? {...item, ...changes} : item));

  const handleSubmit = async (event: React.FormEvent | React.MouseEvent, skipFailedFiles = false) => {
    event.preventDefault();
    if (submissionBusy.current || submitted) return;
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPostcode = normaliseUKPostcode(postcode);
    const trimmedMessage = message.trim();
    const nextEmailError = validateEmail(trimmedEmail);
    const nextPhoneError = validatePhone(trimmedPhone);
    const nextPostcodeError = validatePostcode(trimmedPostcode);
    setEmailError(nextEmailError);
    setPhoneError(nextPhoneError);
    setPostcodeError(nextPostcodeError);

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }
    if (!trimmedPhone) {
      setError("Please enter your phone number.");
      return;
    }
    if (!trimmedPostcode) {
      setError("Please enter the site postcode.");
      return;
    }
    if (nextEmailError || nextPhoneError || nextPostcodeError) return;
    if (!trimmedMessage) {
      setError("Please add a short message about your enquiry.");
      return;
    }

    submissionBusy.current = true;
    try {
      const uploaded: UploadedEnquiryMedia[] = [];
      let failures = 0;
      if (attachments.length) setUploadBusy(true);
      for (const item of attachments) {
        const cached = uploadedFiles.current.get(item.id);
        if (cached) { uploaded.push(cached); continue; }
        if (skipFailedFiles) continue;
        updateAttachment(item.id, {status: "uploading", progress: 0, error: undefined});
        try {
          const result = await uploadEnquiryFile(item.file, mediaApi, progress => updateAttachment(item.id, {
            status: progress.phase === "finishing" ? "finishing" : "uploading",
            progress: Math.min(99, Math.round(progress.sentBytes / progress.totalBytes * 100)),
          }));
          uploadedFiles.current.set(item.id, result); uploaded.push(result);
          updateAttachment(item.id, {status: "uploaded", progress: 100, error: undefined});
        } catch (uploadError) {
          failures++;
          updateAttachment(item.id, {status: "failed", error: uploadError instanceof Error ? uploadError.message : "This file could not upload. Please retry."});
        }
      }
      setUploadBusy(false);
      if (failures) {
        setError("Some files could not upload. Your enquiry has not been sent yet. Retry the failed files, remove them, or send without the failed files below. Files already uploaded are kept.");
        return;
      }
      const context = enquiryContext || (capabilityStatementRequest ? "Capability statement follow-up" : "");
      const messageParts = [
        context && `Enquiry context: ${context}`,
        locationName && `Location page: ${locationName}`,
        trimmedMessage,
        uploaded.length > 0 && `Attachments:\n${uploaded.map((attachment) => `• ${attachment.fileName}: ${attachment.url}`).join("\n")}`,
      ].filter(Boolean);
      const completeMessage = messageParts.join("\n\n");
      if (completeMessage.length > 20000) {
        setError("There are too many file links for one enquiry. Please remove a few files, or call us on 07970 566409. Your uploaded files are still selected.");
        return;
      }
      const utmData = formatUTMForSubmission();

      // Random, non-PII correlation token echoed only after server acceptance.
      // It is not a DB id, server idempotency key or CRM field.
      acceptedAttemptId.current = globalThis.crypto?.randomUUID?.();
      await contactMutation.mutateAsync({
        measurementAttemptId: acceptedAttemptId.current,
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        postcode: trimmedPostcode,
        message: completeMessage,
        sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
        locationName,
        utmData: Object.keys(utmData).length > 0 ? utmData : undefined,
        marketingConsent,
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not send your enquiry. Please call us on 07970 566409.");
    } finally {
      setUploadBusy(false);
      submissionBusy.current = false;
    }
  };

  const bg = isHero ? "bg-[#102d3e]/95" : isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white";
  const border = isHero ? "border-[#b7d9e7]/35" : isDark ? "border-white/20" : "border-[#2C5F7F]/20";
  const inputBg = isDark
    ? isHero
      ? "border-[#b7d9e7]/30 bg-[#183c52] text-white placeholder:text-blue-100/55"
      : "border-white/20 bg-white/10 text-white placeholder:text-white/45"
    : "border-gray-200 bg-white text-gray-800 placeholder:text-gray-400";
  const inputFocus = isDark
    ? "focus:border-[#7ec8e3] focus:ring-[#7ec8e3]/20"
    : "focus:border-[#2C5F7F] focus:ring-[#2C5F7F]/20";
  const labelColor = isDark ? "text-blue-100" : "text-gray-700";
  const headingColor = isDark ? "text-white" : "text-[#1a3a52]";
  const subColor = isDark ? "text-blue-100/85" : "text-gray-500";
  const privacyColor = isDark ? "text-blue-100/75" : "text-gray-500";
  const inputClass = `w-full rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 ${inputBg} ${inputFocus}`;

  if (submitted) {
    return (
      <div className={`${bg} rounded-xl border ${border} ${isHero ? "p-5" : "p-8"} text-center`} role="status" aria-live="polite">
        <CheckCircle className={`mx-auto mb-4 h-12 w-12 ${isDark ? "text-[#7ec8e3]" : "text-[#2C5F7F]"}`} aria-hidden="true" />
        <h3 className={`mb-2 text-lg font-bold ${headingColor}`}>Thank you — we&apos;ve received your enquiry.</h3>
        <p className={`text-sm ${subColor}`}>
          Thanks, {name.trim().split(/\s+/)[0] || "there"}. We&apos;ll get back to you promptly.
          {" Check your inbox for confirmation."} For urgent jobs, call {" "}
          <a href="tel:07970566409" className={`font-semibold hover:underline ${isDark ? "text-[#7ec8e3]" : "text-[#2C5F7F]"}`}>07970 566409</a>.
        </p>
        <div className="group relative mx-auto mt-5 inline-flex max-w-full items-center gap-3 rounded-lg border border-[#2C5F7F]/20 bg-[#2C5F7F]/5 px-3 py-2 text-left">
          <a href="/chas-elite" className="shrink-0 rounded focus:outline-none focus:ring-2 focus:ring-[#2C5F7F] focus:ring-offset-2" aria-describedby={chasTooltipId} aria-label="Learn what Premier Blasting CHAS Elite status can mean for your project">
            <img src="/manus-storage/chas-elite-accreditation_29937620.png" alt="CHAS Accreditation Elite logo" width="300" height="300" className="h-12 w-12 object-contain" />
          </a>
          <div>
            <a href="/chas-elite" className={`text-xs font-semibold hover:underline ${isDark ? "text-blue-100" : "text-[#1a3a52]"}`}>Premier Blasting CHAS Elite</a>
            <p className={`mt-0.5 text-xs ${subColor}`}>Hover or focus the logo to see what this means for your project.</p>
          </div>
          <div id={chasTooltipId} role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-72 -translate-x-1/2 rounded-lg bg-[#102c3d] px-3 py-2 text-left text-xs leading-relaxed text-white opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
            A recognised safety pre-qualification starting point that can support procurement, while your site-specific scope, access, controls, programme and handover still need to be agreed.
          </div>
        </div>
        <div className="mx-auto mt-5 max-w-2xl"><HBTunnellingTestimonial variant="confirmation" /></div>
      </div>
    );
  }

  return (
    <form onSubmit={event => void handleSubmit(event)} className={`${bg} flex flex-col ${isHero ? "gap-3 p-4 shadow-2xl xl:p-5" : "gap-4 p-6"} rounded-xl border ${border}`}>
      <div className="mb-1">
        <h2 className={`${isHero ? "text-xl" : "text-lg"} font-bold ${headingColor}`}>Get In Touch</h2>
        <p className={`mt-0.5 text-xs ${subColor}`}>{subheading || "Tell us a little about your enquiry and we’ll get back to you promptly."}</p>
      </div>

      <div>
        <label className={`mb-1 block text-xs font-medium ${labelColor}`} htmlFor={`${fieldId}-name`}>Your name <span aria-hidden="true">*</span></label>
        <input id={`${fieldId}-name`} type="text" required autoComplete="name" readOnly={isSubmitting} placeholder="e.g. John Smith" value={name} onChange={(event) => setName(event.target.value)} className={inputClass} />
      </div>

      <fieldset className="grid gap-3 sm:grid-cols-2">
        <legend className={`mb-1 text-xs font-medium ${labelColor}`}>Your contact details <span aria-hidden="true">*</span></legend>
        <div>
          <label className={`mb-1 block text-xs font-medium ${labelColor}`} htmlFor={`${fieldId}-email`}>Email address <span aria-hidden="true">*</span></label>
          <input id={`${fieldId}-email`} type="email" required autoComplete="email" readOnly={isSubmitting} placeholder="Email address" value={email} onChange={(event) => handleEmailChange(event.target.value)} onBlur={() => setEmailError(validateEmail(email))} aria-describedby={emailError ? `${fieldId}-email-error` : undefined} aria-invalid={!!emailError} className={`${inputClass} ${emailError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`} />
          {emailError && <p id={`${fieldId}-email-error`} role="alert" className="mt-1 flex items-start gap-1.5 text-xs text-red-500"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{emailError}</p>}
        </div>
        <div>
          <label className={`mb-1 block text-xs font-medium ${labelColor}`} htmlFor={`${fieldId}-phone`}>Phone number <span aria-hidden="true">*</span></label>
          <input id={`${fieldId}-phone`} type="tel" required autoComplete="tel" readOnly={isSubmitting} inputMode="tel" placeholder="Phone number" value={phone} onChange={(event) => handlePhoneChange(event.target.value)} onBlur={() => setPhoneError(validatePhone(phone))} aria-describedby={phoneError ? `${fieldId}-phone-error` : undefined} aria-invalid={!!phoneError} className={`${inputClass} ${phoneError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`} />
          {phoneError && <p id={`${fieldId}-phone-error`} role="alert" className="mt-1 flex items-start gap-1.5 text-xs text-red-500"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{phoneError}</p>}
        </div>
      </fieldset>

      <div>
        <label className={`mb-1 block text-xs font-medium ${labelColor}`} htmlFor={`${fieldId}-postcode`}>Site postcode <span aria-hidden="true">*</span></label>
        <input id={`${fieldId}-postcode`} type="text" required autoComplete="postal-code" readOnly={isSubmitting} inputMode="text" maxLength={8} placeholder="e.g. WF9 6AA" value={postcode} onChange={(event) => handlePostcodeChange(event.target.value)} onBlur={() => {
          const formatted = normaliseUKPostcode(postcode);
          setPostcode(formatted);
          setPostcodeError(validatePostcode(formatted));
        }} aria-describedby={postcodeError ? `${fieldId}-postcode-error` : undefined} aria-invalid={!!postcodeError} className={`${inputClass} ${postcodeError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`} />
        {postcodeError && <p id={`${fieldId}-postcode-error`} role="alert" className="mt-1 flex items-start gap-1.5 text-xs text-red-500"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{postcodeError}</p>}
      </div>

      <div>
        <label className={`mb-1 block text-xs font-medium ${labelColor}`} htmlFor={`${fieldId}-message`}>Your message <span aria-hidden="true">*</span></label>
        <textarea id={`${fieldId}-message`} rows={isHero ? 3 : 4} readOnly={isSubmitting} required maxLength={5000} placeholder="Tell us what you need help with... Such as: request a site visit." value={message} onChange={(event) => setMessage(event.target.value)} className={`${inputClass} resize-y`} />
      </div>

      <div className={`rounded-lg border border-dashed p-3 ${isDark ? "border-white/30 bg-white/5" : "border-[#2C5F7F]/25 bg-[#2C5F7F]/[0.03]"}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className={`text-sm font-semibold ${headingColor}`}>Add photos, videos or drawings <span className={`font-normal ${subColor}`}>(optional)</span></p>
          </div>
          <button type="button" disabled={isSubmitting} onClick={() => attachmentInputRef.current?.click()} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition disabled:opacity-50 ${isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-white text-[#2C5F7F] shadow-sm ring-1 ring-[#2C5F7F]/15 hover:bg-[#edf4f7]"}`}>
            <Upload className="h-3.5 w-3.5" aria-hidden="true" /> Add files
          </button>
        </div>
        <input ref={attachmentInputRef} id={`${fieldId}-attachments`} type="file" multiple disabled={isSubmitting} accept={ENQUIRY_ATTACHMENT_ACCEPT} onChange={(event) => addAttachments(event.target.files)} className="sr-only" />
        {attachmentErrors.length > 0 && <ul role="alert" className={`mt-2 space-y-1 text-xs ${isDark ? "text-red-200" : "text-red-700"}`}>{attachmentErrors.map((problem,index) => <li key={index}>{problem}</li>)}</ul>}
        {attachments.length > 0 && (
          <ul className="mt-3 space-y-2" aria-label="Selected attachments">
            {attachments.map(item => (
              <li key={item.id} className={`rounded-md px-2.5 py-2 text-xs ${isDark ? "bg-white/10 text-blue-100" : "bg-white text-slate-600"}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1.5"><FileText className="h-3.5 w-3.5 shrink-0 text-[#2C5F7F]" aria-hidden="true" /><span className="truncate">{item.file.name}</span><span className="shrink-0 opacity-70">{formatAttachmentSize(item.file.size)}</span></span>
                  <button type="button" disabled={isSubmitting} onClick={() => removeAttachment(item.id)} aria-label={`Remove ${item.file.name}`} className="shrink-0 rounded p-0.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"><X className="h-4 w-4" aria-hidden="true" /></button>
                </div>
                {(item.status === "uploading" || item.status === "finishing") && <div className="mt-1.5"><div role="progressbar" aria-label={`Uploading ${item.file.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.progress} className="h-1.5 overflow-hidden rounded bg-slate-400/25"><div className="h-full bg-[#E8A020]" style={{width:`${item.progress}%`}} /></div><p className="mt-1">{item.status === "finishing" ? "Finishing upload…" : `Uploading ${item.progress}%…`}</p></div>}
                {item.status === "uploaded" && <p className="mt-1 flex items-center gap-1"><CheckCircle className="h-3 w-3" aria-hidden="true" />Uploaded — kept if you need to retry.</p>}
                {item.status === "failed" && <p role="alert" className={`mt-1 ${isDark ? "text-red-200" : "text-red-700"}`}>{item.error}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showMarketingConsent && (
        <label className={`flex items-start gap-2.5 rounded-lg border ${isHero ? "p-2.5" : "p-3"} text-xs leading-relaxed ${isDark ? "border-white/10 bg-white/5 text-blue-100/80" : "border-gray-100 bg-gray-50 text-gray-600"}`}>
          <input type="checkbox" checked={marketingConsent} disabled={isSubmitting} onChange={(event) => setMarketingConsent(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#2C5F7F]" />
          {isHero ? (
            <span>Optional: send me relevant Premier Blasting updates by email or WhatsApp. See our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className={`underline ${isDark ? "text-blue-200 hover:text-white" : "text-[#2C5F7F] hover:text-[#1a3d52]"}`}>Privacy Policy</a>.</span>
          ) : (
            <span>I agree to receive communications from <strong>Premier Blasting</strong>, the commercial surface-preparation arm of which is Commercial Shot Blasting. This may include relevant service updates by email and WhatsApp. See our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className={`underline ${isDark ? "text-blue-200 hover:text-white" : "text-[#2C5F7F] hover:text-[#1a3a52]"}`}>Privacy Policy</a>.</span>
          )}
        </label>
      )}

      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E8A020] py-3 text-sm font-bold text-white transition-colors hover:bg-[#d4911a] disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {uploadBusy ? "Uploading files…" : "Sending…"}</> : <><ArrowRight className="h-4 w-4" aria-hidden="true" /> {attachments.some(item => item.status === "failed") ? "Retry files & send enquiry" : "Send enquiry"}</>}
      </button>
      {attachments.some(item => item.status === "failed") && <button type="button" disabled={isSubmitting} onClick={event => void handleSubmit(event, true)} className={`w-full rounded-lg border px-3 py-2 text-xs font-semibold disabled:opacity-50 ${isDark ? "border-white/30 text-white" : "border-[#2C5F7F]/30 text-[#2C5F7F]"}`}>Send enquiry without failed files</button>}
      <p className={`text-center text-xs ${privacyColor}`}>We&apos;ll only use your details to respond to this enquiry unless you opt in above.</p>
      <a href="mailto:info@commercialshotblasting.co.uk" className={`flex w-full flex-wrap items-center justify-center gap-1.5 rounded text-xs font-medium underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] ${isDark ? "text-[#7ec8e3] hover:text-white" : "text-[#2C5F7F] hover:text-[#1a3a52]"}`}>
        <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>Email us</span><span className="break-all">info@commercialshotblasting.co.uk</span>
      </a>

      {showWhatsApp && (
        <>
          <div className="flex items-center gap-3"><div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-gray-200"}`} /><span className={`text-xs ${privacyColor}`}>or</span><div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-gray-200"}`} /></div>
          <a href={`https://wa.me/447970566409?text=${encodeURIComponent(`Hi, I’d like to get in touch${locationName ? ` about a project in ${locationName}` : ""}.`)}`} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 py-2.5 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Message us on WhatsApp
          </a>
        </>
      )}
    </form>
  );
}
