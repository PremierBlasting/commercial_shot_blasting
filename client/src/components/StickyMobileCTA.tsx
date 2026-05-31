/**
 * StickyMobileCTA — Fixed bottom bar on mobile viewports.
 *
 * Shows three tappable CTAs:
 *   📞 Call  |  💬 WhatsApp  |  📋 Get a Quote
 *
 * Hidden on md+ (tablet/desktop) where the nav bar already has these CTAs.
 * Uses safe-area-inset-bottom for iPhone notch compatibility.
 */

import { Link } from "wouter";

const PHONE_NUMBER = "01543222777";
const PHONE_DISPLAY = "01543 222 777";
const WHATSAPP_NUMBER = "447970566409";
const WHATSAPP_MESSAGE = "Hi, I'd like to get a quote for shot blasting. Could you help?";

export function StickyMobileCTA() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Quick contact options"
    >
      {/* Subtle top shadow separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="grid grid-cols-3 bg-[#0d1b2a]/95 backdrop-blur-sm border-t border-white/10">
        {/* Call */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 text-white hover:bg-white/10 active:bg-white/20 transition-colors"
          aria-label={`Call us on ${PHONE_DISPLAY}`}
        >
          <PhoneIcon />
          <span className="text-[11px] font-semibold tracking-wide text-white/90">Call</span>
        </a>

        {/* Divider */}
        <div className="relative flex flex-col items-center justify-center gap-1 py-3 px-2">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />
          <div className="absolute right-0 top-2 bottom-2 w-px bg-white/10" />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 w-full h-full text-white hover:bg-white/10 active:bg-white/20 transition-colors"
            aria-label="Message us on WhatsApp"
          >
            <WhatsAppIcon />
            <span className="text-[11px] font-semibold tracking-wide text-white/90">WhatsApp</span>
          </a>
        </div>

        {/* Get a Quote */}
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 bg-orange-600 hover:bg-orange-500 active:bg-orange-700 transition-colors"
          aria-label="Get a free quote"
        >
          <QuoteIcon />
          <span className="text-[11px] font-semibold tracking-wide text-white">Get Quote</span>
        </Link>
      </div>
    </div>
  );
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-orange-400"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-green-400"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5 text-white"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75-6.75a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
        clipRule="evenodd"
      />
      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
    </svg>
  );
}
