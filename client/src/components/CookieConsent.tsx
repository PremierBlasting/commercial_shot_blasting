import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { readCookieMeasurementChoices, saveCookieMeasurementChoices, type CookieMeasurementChoices } from "@/lib/cookiePreferences";
import { COOKIE_CONSENT_STORAGE_KEY, GOOGLE_MEASUREMENT_CONSENT_KEY, WEBSITE_CALL_CONSENT_KEY, COOKIE_PREFERENCES_OPEN_EVENT, type CookieConsentStatus } from "@shared/cookieConsent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [choices, setChoices] = useState<CookieMeasurementChoices>({ measurements: false, websiteCalls: false });
  const declineButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let consent: CookieConsentStatus = null;
    let scope: string | null = null;
    let callScope: string | null = null;
    try {
      consent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) as CookieConsentStatus;
      scope = localStorage.getItem(GOOGLE_MEASUREMENT_CONSENT_KEY);
      callScope = localStorage.getItem(WEBSITE_CALL_CONSENT_KEY);
    } catch { /* Unavailable preferences never enable optional Google measurement. */ }
    const show = (settings = false) => {
      setChoices(readCookieMeasurementChoices()); setShowSettings(settings);
      setIsVisible(true); requestAnimationFrame(() => setIsAnimating(true));
    };
    // Earlier choices are not silently expanded to a newly disclosed purpose.
    const timer = !consent || (consent === "accepted" && (!scope || !callScope)) ? setTimeout(() => show(), 1000) : undefined;
    const reopen = () => { if (timer) clearTimeout(timer); show(true); requestAnimationFrame(() => declineButton.current?.focus()); };
    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, reopen);
    return () => { if (timer) clearTimeout(timer); window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, reopen); };
  }, []);

  const closeBanner = () => {
    setIsAnimating(false);
    setTimeout(() => { setIsVisible(false); setShowSettings(false); }, 180);
  };
  const saveChoices = (next: CookieMeasurementChoices) => { saveCookieMeasurementChoices(next); closeBanner(); };
  const handleAcceptAll = () => saveChoices({ measurements: true, websiteCalls: true });
  const handleDecline = () => saveChoices({ measurements: false, websiteCalls: false });

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-3 right-3 z-[90] mx-auto w-auto max-w-[21rem] transition-[opacity,transform] duration-180 ease-out motion-reduce:transition-none sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[22rem] ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
      role="dialog" aria-label="Cookie preference" aria-live="polite"
    >
      <div className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-900 shadow-md shadow-slate-900/10">
        <div className="flex items-start gap-1.5 pr-5">
          <Cookie className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2C5F7F]" aria-hidden="true" />
          <div>
            <h3 className="text-xs font-semibold text-slate-950">Cookies</h3>
            <p className="mt-0.5 text-[11px] leading-4 text-slate-600">
              Optional Google measurement helps us track visits, enquiries and calls. No personalised ads or call recording. {" "}
              <a href="/privacy-policy" className="font-medium text-[#2C5F7F] underline underline-offset-2 hover:text-[#1e4c69]">Privacy</a>
            </p>
          </div>
        </div>
        {showSettings && (
          <div id="csb-cookie-measurement-settings" className="mt-2 space-y-2 rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] leading-4">
            <div className="flex items-center justify-between gap-3">
              <span>Google analytics &amp; ad measurement</span>
              <button type="button" role="switch" aria-label="Google analytics and ad measurement" aria-checked={choices.measurements} onClick={() => setChoices(current => ({ measurements: !current.measurements, websiteCalls: current.measurements ? false : current.websiteCalls }))} className="shrink-0 rounded border border-slate-300 bg-white px-2 py-1 font-semibold text-[#2C5F7F]">{choices.measurements ? "On" : "Off"}</button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span>Website call measurement <span className="block text-[10px] text-slate-500">Google forwarding numbers and call duration</span></span>
              <button type="button" role="switch" aria-label="Website call measurement" aria-checked={choices.websiteCalls} onClick={() => setChoices(current => ({ measurements: current.websiteCalls ? current.measurements : true, websiteCalls: !current.websiteCalls }))} className="shrink-0 rounded border border-slate-300 bg-white px-2 py-1 font-semibold text-[#2C5F7F]">{choices.websiteCalls ? "On" : "Off"}</button>
            </div>
            <p className="text-[10px] text-slate-500">Call measurement also needs advertising measurement. You can leave calls off.</p>
            <Button size="sm" variant="outline" className="h-7 w-full border-slate-300 bg-white text-[11px] text-slate-700" onClick={() => saveChoices(choices)}>Save choices</Button>
          </div>
        )}
        <div className="mt-2 flex items-center gap-1.5">
          <Button variant="outline" size="sm" ref={declineButton} className="h-7 flex-1 border-slate-300 bg-white px-2 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-950" onClick={handleDecline}>No thanks</Button>
          <Button variant="outline" size="sm" className="h-7 flex-1 border-slate-300 bg-white px-2 text-[11px] text-slate-700 hover:bg-slate-50 hover:text-slate-950" aria-expanded={showSettings} aria-controls="csb-cookie-measurement-settings" onClick={() => setShowSettings(value => !value)}>Settings</Button>
          <Button size="sm" className="h-7 flex-1 bg-[#2C5F7F] px-2 text-[11px] text-white hover:bg-[#1e4c69]" onClick={handleAcceptAll}>Allow all</Button>
        </div>
        <button type="button" onClick={handleDecline} className="absolute right-1.5 top-1.5 rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5F7F] focus-visible:ring-offset-2" aria-label="Decline optional cookies and close notice"><X className="h-3.5 w-3.5" aria-hidden="true" /></button>
      </div>
    </div>
  );
}
