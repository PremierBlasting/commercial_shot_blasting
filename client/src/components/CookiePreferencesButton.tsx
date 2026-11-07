import { COOKIE_PREFERENCES_OPEN_EVENT } from "@shared/cookieConsent";

export function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return <button type="button" className={`underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`} onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_OPEN_EVENT))}>Cookie settings</button>;
}
