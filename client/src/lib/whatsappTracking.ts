import { getFirstTouchUTM, getUTMData } from "./utm";

const COOKIE_CONSENT_KEY = "csb_cookie_consent";

export type WhatsAppClickLocation = "whatsapp_widget" | "floating_whatsapp_button";

export type WhatsAppClickTrackerInput = {
  clickLocation: WhatsAppClickLocation;
  landingPath: string;
  gclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  firstTouchSource?: string;
  firstTouchMedium?: string;
  firstTouchCampaign?: string;
};

export function hasAcceptedAnalyticsConsent(consent: string | null): boolean {
  return consent === "accepted";
}

export function buildWhatsAppClickTrackerInput(
  clickLocation: WhatsAppClickLocation,
  consent: string | null,
  pathname: string,
): WhatsAppClickTrackerInput | null {
  if (!hasAcceptedAnalyticsConsent(consent)) {
    return null;
  }

  const lastTouch = getUTMData();
  const firstTouch = getFirstTouchUTM();

  return {
    clickLocation,
    landingPath: pathname.startsWith("/") ? pathname : "/",
    gclid: lastTouch?.gclid,
    utmSource: lastTouch?.utm_source,
    utmMedium: lastTouch?.utm_medium,
    utmCampaign: lastTouch?.utm_campaign,
    firstTouchSource: firstTouch?.utm_source,
    firstTouchMedium: firstTouch?.utm_medium,
    firstTouchCampaign: firstTouch?.utm_campaign,
  };
}

export function buildConsentGatedWhatsAppLink(
  phoneNumber: string,
  message: string,
  trackerRef?: string,
): string {
  const referenceLine = trackerRef ? `\n\nReference: ${trackerRef}` : "";
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`${message}${referenceLine}`)}`;
}

export function getCurrentWhatsAppClickTrackerInput(
  clickLocation: WhatsAppClickLocation,
): WhatsAppClickTrackerInput | null {
  if (typeof window === "undefined") {
    return null;
  }

  return buildWhatsAppClickTrackerInput(
    clickLocation,
    window.localStorage.getItem(COOKIE_CONSENT_KEY),
    window.location.pathname,
  );
}
