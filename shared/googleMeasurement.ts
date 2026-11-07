/** Existing CSB website actions only; this does not configure account goals or actual calls. */
export const GOOGLE_ADS_ID = "AW-16481669131";
export const GOOGLE_ADS_LEAD_LABEL = "nOlECJeFnNccEIugibM9";
export const GOOGLE_ADS_PHONE_LABEL = "UPr1CIvfr9ccEIugibM9";
export const GOOGLE_ADS_WHATSAPP_LABEL = "_9XRCOaFxtscEIugibM9";
export const CSB_GOOGLE_DESTINATIONS = {
  lead: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
  phone_click: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PHONE_LABEL}`,
  whatsapp_click: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_WHATSAPP_LABEL}`,
} as const;
export const CSB_PHONE = "07970566409";
export const CSB_INTERNATIONAL_PHONE = "447970566409";
