import { isValidUKPostcode, normalisePostcode } from "@shared/postcodeUtils";

export const SITEMAP_POSTCODE_HANDOFF_KEY = "csb-sitemap-postcode";

/**
 * Keeps a full Site Visit postcode in session storage only. It is never sent to
 * the application server; the coverage map uses it solely to prefill its own
 * postcode field until the visitor chooses to search.
 */
export function saveSitemapPostcodeHandoff(value: string) {
  if (typeof window === "undefined") return "";
  const postcode = normalisePostcode(value);
  if (!isValidUKPostcode(postcode)) return "";
  window.sessionStorage.setItem(SITEMAP_POSTCODE_HANDOFF_KEY, postcode);
  return postcode;
}

export function readSitemapPostcodeHandoff() {
  if (typeof window === "undefined") return "";
  const postcode = normalisePostcode(window.sessionStorage.getItem(SITEMAP_POSTCODE_HANDOFF_KEY) ?? "");
  if (isValidUKPostcode(postcode)) return postcode;
  window.sessionStorage.removeItem(SITEMAP_POSTCODE_HANDOFF_KEY);
  return "";
}
