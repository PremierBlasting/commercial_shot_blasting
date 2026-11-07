import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { setGoogleChoiceBlocked, syncGoogleConsent } from "@/lib/googleMeasurement";
import {
  COOKIE_CONSENT_CHANGE_EVENT, COOKIE_CONSENT_STORAGE_KEY,
  GOOGLE_MEASUREMENT_CONSENT_KEY, WEBSITE_CALL_CONSENT_KEY,
  COOKIE_PREFERENCES_OPEN_EVENT, type CookieConsentStatus,
} from "@shared/cookieConsent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [allowWebsiteCalls, setAllowWebsiteCalls] = useState(false);
  const declineButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let consent: CookieConsentStatus = null;
    let scope: string | null = null;
    let callScope: string | null = null;
    try {
      consent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) as CookieConsentStatus;
      scope = localStorage.getItem(GOOGLE_MEASUREMENT_CONSENT_KEY);
      callScope = localStorage.getItem(WEBSITE_CALL_CONSENT_KEY);
    } catch { /* Blocked storage never implies permission. */ }
    const show = () => {
      try { setAllowWebsiteCalls(localStorage.getItem(WEBSITE_CALL_CONSENT_KEY) === "accepted"); } catch { setAllowWebsiteCalls(false); }
      setIsVisible(true); requestAnimationFrame(() => setIsAnimating(true));
    };
    // Earlier generic/advertising acceptance is not new website-call permission.
    const timer = !consent || (consent === "accepted" && (!scope || !callScope)) ? setTimeout(show, 1000) : undefined;
    const reopen = () => { if (timer) clearTimeout(timer); show(); requestAnimationFrame(() => declineButton.current?.focus()); };
    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, reopen);
    return () => { if (timer) clearTimeout(timer); window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, reopen); };
  }, []);

  const recordConsent = (status: Exclude<CookieConsentStatus, null>) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status);
      localStorage.setItem(GOOGLE_MEASUREMENT_CONSENT_KEY, status);
      localStorage.setItem(WEBSITE_CALL_CONSENT_KEY, status === "accepted" && allowWebsiteCalls ? "accepted" : "declined");
      setGoogleChoiceBlocked(status !== "accepted");
    } catch { setGoogleChoiceBlocked(true); }
    syncGoogleConsent();
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: { status, source: "interaction" } }));
  };
  const closeBanner = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };
  const handleAccept = () => { recordConsent("accepted"); closeBanner(); };
  const handleDecline = () => { recordConsent("declined"); closeBanner(); };

  if (!isVisible) return null;
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-300 ease-out ${isAnimating ? "translate-y-0" : "translate-y-full"}`}
      role="dialog" aria-label="Cookie preferences" aria-live="polite"
    >
      <div className="bg-[#2C5F7F] text-white shadow-2xl border-t-4 border-[#F5F1E8]">
        <div className="container py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center flex-shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Cookie Notice</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Essential cookies are on. Allow Google analytics and advertising measurement? No personalised ads. You can decline without losing access to forms, telephone or WhatsApp links. {" "}
                  <a href="/privacy-policy" className="underline hover:text-white transition">Learn more</a>
                </p>
                <label className="mt-2 flex cursor-pointer items-start gap-2 text-sm text-white/90">
                  <input type="checkbox" checked={allowWebsiteCalls} onChange={event => setAllowWebsiteCalls(event.target.checked)} className="mt-1 h-4 w-4 shrink-0" />
                  <span>Also allow Google forwarding numbers to measure website calls and duration. No call recording.</span>
                </label>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button variant="outline" ref={declineButton} className="flex-1 md:flex-none border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={handleDecline}>Decline</Button>
              <Button className="flex-1 md:flex-none bg-white text-[#2C5F7F] hover:bg-white/90" onClick={handleAccept}>Allow selected</Button>
            </div>
            <button onClick={handleDecline} className="absolute top-3 right-3 md:hidden p-1 hover:bg-white/10 rounded transition" aria-label="Decline optional cookies and close banner">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
