import { CSB_GOOGLE_DESTINATIONS, GOOGLE_ADS_ID } from "./googleMeasurement";

/** Filled only from the real generated snippet after the Ads parent creates and verifies it. */
export interface CSBWebsiteCallConfig {
  destination: string;
  actionResourceName: string;
  type: "WEBSITE_CALL";
  minimumCallSeconds: 60;
  businessNumber: "07970 566409";
  verifiedSnippet: true;
}

// Google-generated action/snippet read back by the Ads task on 7 November 2026.
// The 60-second threshold is Google-side; a telephone click never becomes this call.
export const CSB_WEBSITE_CALL_CONFIG: CSBWebsiteCallConfig | null = {
  destination: "AW-16481669131/XyJ7CIj98rMdEIugibM9",
  actionResourceName: "customers/2361561845/conversionActions/7893466760",
  type: "WEBSITE_CALL",
  minimumCallSeconds: 60,
  businessNumber: "07970 566409",
  verifiedSnippet: true,
};
export const CSB_WEBSITE_CALL_HOSTS = ["commercialshotblasting.co.uk", "www.commercialshotblasting.co.uk"] as const;

export function verifiedWebsiteCallConfig(config: CSBWebsiteCallConfig | null | undefined): CSBWebsiteCallConfig | null {
  if (!config || config.type !== "WEBSITE_CALL" || config.minimumCallSeconds !== 60 || config.businessNumber !== "07970 566409" || config.verifiedSnippet !== true) return null;
  if (typeof config.destination !== "string" || typeof config.actionResourceName !== "string" || !/^customers\/\d+\/conversionActions\/\d+$/.test(config.actionResourceName)) return null;
  const label = config.destination.startsWith(`${GOOGLE_ADS_ID}/`) ? config.destination.slice(GOOGLE_ADS_ID.length + 1) : "";
  if (!/^[A-Za-z0-9_-]{10,100}$/.test(label) || /placeholder|pending|example|replace|test/i.test(label)) return null;
  if (Object.values(CSB_GOOGLE_DESTINATIONS).some(destination => destination === config.destination)) return null;
  return config;
}
