/**
 * LeadForm — Custom branded contact/quote form for Commercial Shot Blasting
 *
 * Replaces the HubSpot embedded form. Captures:
 *  - Name, phone, email, message
 *  - Source page URL (window.location.href)
 *  - Location name (optional, passed as prop)
 *  - UTM / attribution data (from utm.ts)
 */

import { useState } from "react";
import { CheckCircle, Phone, ArrowRight, MessageSquare } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { formatUTMForSubmission } from "@/lib/utm";

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

export function LeadForm({
  variant = "light",
  locationName,
  heading,
  subheading,
  showWhatsApp = true,
  onSuccess,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isDark = variant === "dark";

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      onSuccess?.();
    },
    onError: (err) => {
      setError(err.message || "Something went wrong. Please call us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      return;
    }

    const utmData = formatUTMForSubmission();

    contactMutation.mutate({
      name: name.trim(),
      email: email.trim() || `${phone.replace(/\s/g, "")}@sms.placeholder`,
      phone: phone.trim(),
      message: message.trim() || `Quote request${locationName ? ` from ${locationName}` : ""}`,
      sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
      locationName: locationName,
      utmData: Object.keys(utmData).length > 0 ? utmData : undefined,
    });
  };

  // ── Styles based on variant ──────────────────────────────────────────────────
  const bg = isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white";
  const border = isDark ? "border-white/20" : "border-[#2C5F7F]/20";
  const inputBg = isDark ? "bg-white/10 border-white/20 text-white placeholder-white/40" : "bg-white border-gray-200 text-gray-800 placeholder-gray-400";
  const inputFocus = isDark ? "focus:border-[#7ec8e3]" : "focus:border-[#2C5F7F] focus:ring-[#2C5F7F]/20";
  const labelColor = isDark ? "text-blue-200" : "text-gray-600";
  const headingColor = isDark ? "text-white" : "text-[#1a3a52]";
  const subColor = isDark ? "text-blue-100" : "text-gray-500";
  const privacyColor = isDark ? "text-blue-200/70" : "text-gray-400";

  if (submitted) {
    return (
      <div className={`${bg} border ${border} rounded-xl p-8 text-center`}>
        <CheckCircle className={`w-12 h-12 mx-auto mb-4 ${isDark ? "text-[#7ec8e3]" : "text-[#2C5F7F]"}`} />
        <h3 className={`font-bold text-lg mb-2 ${headingColor}`}>Quote Request Sent!</h3>
        <p className={`text-sm ${subColor}`}>
          Thanks, {name}. We'll be in touch within 24 hours.
          {" "}For urgent jobs, call us directly on{" "}
          <a href="tel:07970566409" className={`font-semibold ${isDark ? "text-[#7ec8e3]" : "text-[#2C5F7F]"} hover:underline`}>
            07970 566409
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
            {heading ?? `Request a free quote${locationName ? ` in ${locationName}` : ""}`}
          </h3>
          {subheading && <p className={`text-xs mt-0.5 ${subColor}`}>{subheading}</p>}
        </div>
      )}

      {/* Name */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-name">
          Your name *
        </label>
        <input
          id="lf-name"
          type="text"
          required
          placeholder="e.g. John Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full rounded-lg px-3 py-2.5 text-sm border transition-colors focus:outline-none focus:ring-2 ${inputBg} ${inputFocus}`}
        />
      </div>

      {/* Phone */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-phone">
          Phone number *
        </label>
        <input
          id="lf-phone"
          type="tel"
          required
          placeholder="e.g. 07700 900000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`w-full rounded-lg px-3 py-2.5 text-sm border transition-colors focus:outline-none focus:ring-2 ${inputBg} ${inputFocus}`}
        />
      </div>

      {/* Email */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-email">
          Email address <span className={privacyColor}>(optional)</span>
        </label>
        <input
          id="lf-email"
          type="email"
          placeholder="e.g. john@company.co.uk"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full rounded-lg px-3 py-2.5 text-sm border transition-colors focus:outline-none focus:ring-2 ${inputBg} ${inputFocus}`}
        />
      </div>

      {/* Message */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${labelColor}`} htmlFor="lf-message">
          What do you need blasting? <span className={privacyColor}>(optional)</span>
        </label>
        <textarea
          id="lf-message"
          rows={3}
          placeholder={locationName
            ? `e.g. Structural steel shot blasting in ${locationName} — 200m² of beams`
            : "e.g. Structural steel, factory floor, rust removal…"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full rounded-lg px-3 py-2.5 text-sm border transition-colors focus:outline-none focus:ring-2 resize-none ${inputBg} ${inputFocus}`}
        />
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={contactMutation.isPending}
        className="w-full bg-[#E8A020] hover:bg-[#d4911a] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 mt-1"
      >
        {contactMutation.isPending ? (
          <span>Sending…</span>
        ) : (
          <><ArrowRight className="w-4 h-4" /> Get My Free Quote</>
        )}
      </button>

      <p className={`text-xs text-center ${privacyColor}`}>
        No spam. We'll only use your details to respond to your enquiry.
      </p>

      {/* WhatsApp fallback */}
      {showWhatsApp && (
        <>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className={`text-xs ${privacyColor}`}>or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <a
            href={`https://wa.me/447970566409?text=${encodeURIComponent(
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
