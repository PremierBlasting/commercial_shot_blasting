/**
 * LeadForm — Custom branded contact/quote form for Commercial Shot Blasting
 *
 * Matches the original HubSpot form fields:
 *  - First Name, Last Name
 *  - Email, Phone Number
 *  - Postal Code
 *  - What Type of Service is Required? (dropdown)
 *  - When is Your Preferred Completion Date? (dropdown)
 *  - Could You Please Provide a Brief Summary of Your Project?
 *
 * Also captures: source page URL, location name, UTM attribution data
 */

import { useState, useCallback } from "react";
import { CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { formatUTMForSubmission } from "@/lib/utm";
import { validateLeadEmailClient } from "@shared/emailValidation";

export interface LeadFormProps {
  /** Visual variant — 'dark' for location page dark bg, 'light' for contact/popup */
  variant?: "dark" | "light";
  /** Location name to pre-fill context (e.g. "Birmingham") */
  locationName?: string;
  /** Optional heading override */
  heading?: string;
  /** Optional subheading override */
  subheading?: string;
  /** Show WhatsApp fallback link */
  showWhatsApp?: boolean;
  /** Callback on successful submission */
  onSuccess?: () => void;
}

const SERVICE_OPTIONS = [
  "Structural Steelwork",
  "Intumescent Painting",
  "Factory, Cladding & Roofing",
  "Machinery & Equipment",
  "Floors & Surfaces",
  "Other / Not Sure",
];

const COMPLETION_DATE_OPTIONS = [
  "As soon as possible",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6+ months / Planning stage",
  "Flexible / Not sure yet",
];

export function LeadForm({
  variant = "light",
  locationName,
  heading,
  subheading,
  showWhatsApp = true,
  onSuccess,
}: LeadFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    // Show inline error once the user has typed something meaningful
    if (value.trim().length > 5) {
      const result = validateLeadEmailClient(value);
      setEmailError(result.valid ? "" : (result.reason ?? ""));
    } else {
      setEmailError("");
    }
  }, []);

  const handleEmailBlur = useCallback(() => {
    if (email.trim()) {
      const result = validateLeadEmailClient(email);
      setEmailError(result.valid ? "" : (result.reason ?? ""));
    }
  }, [email]);

  const isDark = variant === "dark";

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      onSuccess?.();
    },
    onError: (err) => {
      setError(err.message || "Something went wrong. Please call us directly on 07721 375756.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !phone.trim()) {
      setError("Please enter your first name and phone number.");
      return;
    }

    const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");

    // Build a structured message that mirrors the HubSpot form fields
    const messageParts = [
      serviceType && `Service Required: ${serviceType}`,
      visitDate && `Preferred Site Visit Date: ${visitDate}`,
      completionDate && `Preferred Completion: ${completionDate}`,
      postalCode && `Postal Code: ${postalCode}`,
      locationName && `Location: ${locationName}`,
      projectSummary.trim() && `Project Summary:\n${projectSummary.trim()}`,
    ].filter(Boolean);

    const message = messageParts.length > 0
      ? messageParts.join("\n")
      : `Quote request${locationName ? ` from ${locationName}` : ""}`;

    const utmData = formatUTMForSubmission();

    contactMutation.mutate({
      name: fullName,
      email: email.trim() || `${phone.replace(/\s/g, "")}@sms.placeholder`,
      phone: phone.trim(),
      message,
      sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
      locationName: locationName,
      utmData: Object.keys(utmData).length > 0 ? utmData : undefined,
      marketingConsent,
    });
  };

  // ── Styles based on variant ──────────────────────────────────────────────────
  const bg = isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white";
  const border = isDark ? "border-white/20" : "border-[#2C5F7F]/20";
  const inputBg = isDark
    ? "bg-white/10 border-white/20 text-white placeholder-white/40"
    : "bg-white border-gray-200 text-gray-800 placeholder-gray-400";
  const inputFocus = isDark
    ? "focus:border-[#7ec8e3] focus:ring-[#7ec8e3]/20"
    : "focus:border-[#2C5F7F] focus:ring-[#2C5F7F]/20";
  const labelColor = isDark ? "text-blue-200" : "text-gray-600";
  const headingColor = isDark ? "text-white" : "text-[#1a3a52]";
  const subColor = isDark ? "text-blue-100" : "text-gray-500";
  const privacyColor = isDark ? "text-blue-200/70" : "text-gray-400";
  const selectBg = isDark
    ? "bg-[#1a3a52] border-white/20 text-white"
    : "bg-white border-gray-200 text-gray-800";

  const inputClass = `w-full rounded-lg px-3 py-2.5 text-sm border transition-colors focus:outline-none focus:ring-2 ${inputBg} ${inputFocus}`;
  const selectClass = `w-full rounded-lg px-3 py-2.5 text-sm border transition-colors focus:outline-none focus:ring-2 ${selectBg} ${inputFocus} appearance-none cursor-pointer`;

  if (submitted) {
    return (
      <div className={`${bg} border ${border} rounded-xl p-8 text-center`}>
        <CheckCircle className={`w-12 h-12 mx-auto mb-4 ${isDark ? "text-[#7ec8e3]" : "text-[#2C5F7F]"}`} />
        <h3 className={`font-bold text-lg mb-2 ${headingColor}`}>Site Visit Requested!</h3>
        <p className={`text-sm ${subColor}`}>
          Thanks, {firstName}. We'll be in touch shortly to confirm your site visit.
          {" "}For urgent jobs, call us directly on{" "}
          <a href="tel:07721375756" className={`font-semibold ${isDark ? "text-[#7ec8e3]" : "text-[#2C5F7F]"} hover:underline`}>
            07721 375756
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${bg} border ${border} rounded-xl p-6 flex flex-col gap-4`}
    >
      {(heading || locationName) && (
        <div className="mb-1">
          <h3 className={`font-semibold text-base ${headingColor}`}>
            {heading ?? `Request A Site Visit${locationName ? ` in ${locationName}` : ""}`}
          </h3>
          {subheading && <p className={`text-xs mt-0.5 ${subColor}`}>{subheading}</p>}
        </div>
      )}

      {/* First Name + Last Name */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-firstname">
            First Name *
          </label>
          <input
            id="lf-firstname"
            type="text"
            required
            placeholder="e.g. John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-lastname">
            Last Name
          </label>
          <input
            id="lf-lastname"
            type="text"
            placeholder="e.g. Smith"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-email">
          Email Address
        </label>
        <input
          id="lf-email"
          type="email"
          placeholder="e.g. john@company.co.uk"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={handleEmailBlur}
          aria-describedby={emailError ? "lf-email-error" : undefined}
          aria-invalid={!!emailError}
          className={`${inputClass} ${emailError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
        />
        {emailError && (
          <p
            id="lf-email-error"
            role="alert"
            className="flex items-start gap-1.5 mt-1.5 text-xs text-red-400"
          >
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            {emailError}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-phone">
          Phone Number *
        </label>
        <input
          id="lf-phone"
          type="tel"
          required
          placeholder="e.g. 07700 900000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Postal Code */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-postcode">
          Postal Code
        </label>
        <input
          id="lf-postcode"
          type="text"
          placeholder="e.g. B1 1AA"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Preferred Site Visit Date */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-visitdate">
          Preferred Site Visit Date
        </label>
        <input
          id="lf-visitdate"
          type="date"
          min={new Date().toISOString().split('T')[0]}
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Service Type Dropdown */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-service">
          What Type of Service is Required?
        </label>
        <div className="relative">
          <select
            id="lf-service"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className={selectClass}
          >
            <option value="">— Please select —</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className={`pointer-events-none absolute inset-y-0 right-3 flex items-center ${isDark ? "text-white/60" : "text-gray-400"}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Preferred Completion Date Dropdown */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-completion">
          When is Your Preferred Completion Date?
        </label>
        <div className="relative">
          <select
            id="lf-completion"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            className={selectClass}
          >
            <option value="">— Please select —</option>
            {COMPLETION_DATE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className={`pointer-events-none absolute inset-y-0 right-3 flex items-center ${isDark ? "text-white/60" : "text-gray-400"}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Project Summary */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-summary">
          Could You Please Provide a Brief Summary of Your Project?
        </label>
        <textarea
          id="lf-summary"
          rows={3}
          placeholder={locationName
            ? `e.g. 200m² of structural steel beams in ${locationName} requiring rust removal and shot blasting to SA2.5`
            : "e.g. Structural steel beams requiring rust removal and shot blasting to SA2.5…"}
          value={projectSummary}
          onChange={(e) => setProjectSummary(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {/* GDPR Consent Checkbox */}
      <div className={`flex items-start gap-2.5 p-3 rounded-lg border ${isDark ? "border-white/10 bg-white/5" : "border-gray-100 bg-gray-50"}`}>
        <input
          id="lf-consent"
          type="checkbox"
          checked={marketingConsent}
          onChange={(e) => setMarketingConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#2C5F7F] cursor-pointer shrink-0"
        />
        <label htmlFor="lf-consent" className={`text-xs leading-relaxed cursor-pointer ${isDark ? "text-blue-100/80" : "text-gray-500"}`}>
          I agree to receive communications from <strong>Premier Blasting</strong> (the commercial surface preparation arm of which is Commercial Shot Blasting). This may include updates, promotions, and service-related messages via email and WhatsApp. Your details will only be used to respond to your enquiry and, if you consent, to keep you informed of relevant services. See our{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className={`underline ${isDark ? "text-blue-200 hover:text-white" : "text-[#2C5F7F] hover:text-[#1a3d52]"}`}>Privacy Policy</a>.
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={contactMutation.isPending}
        className="w-full bg-[#E8A020] hover:bg-[#d4911a] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 mt-1"
      >
        {contactMutation.isPending ? (
          <span>Sending…</span>
        ) : (
          <><ArrowRight className="w-4 h-4" /> Request A Site Visit</>
        )}
      </button>

      <p className={`text-xs text-center ${privacyColor}`}>
        No spam. We'll only use your details to respond to your enquiry.
      </p>

      {/* WhatsApp fallback */}
      {showWhatsApp && (
        <>
          <div className="flex items-center gap-3">
            <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
            <span className={`text-xs ${privacyColor}`}>or</span>
            <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
          </div>
          <a
            href={`https://wa.me/447721375756?text=${encodeURIComponent(
              `Hi, I'd like a quote for shot blasting${locationName ? ` in ${locationName}` : ""}. Could you help?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-medium py-2.5 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Message us on WhatsApp
          </a>
        </>
      )}
    </form>
  );
}
