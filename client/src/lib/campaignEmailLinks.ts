import { campaignReference } from "@shared/campaignReference";
import { formatUTMForSubmission } from "./utm";

const MARKER = "Campaign reference (optional; you may remove this):";
const LEGAL_ROUTE = /^\/(?:privacy-policy|terms|terms-of-service)(?:\/|$)/;

/** No direct-email inference, click identifiers, new destinations or automatic sends. */
export function campaignEmailHref(href: string, attribution: Record<string, string>, pagePath: string): string {
  if (!/^mailto:/i.test(href) || href.length > 8000 || LEGAL_ROUTE.test(pagePath)) return href;
  const hashIndex = href.indexOf("#");
  const fragment = hashIndex < 0 ? "" : href.slice(hashIndex);
  const address = (hashIndex < 0 ? href : href.slice(0, hashIndex)).slice(7);
  const queryIndex = address.indexOf("?");
  const recipient = queryIndex < 0 ? address : address.slice(0, queryIndex);
  const query = queryIndex < 0 ? "" : address.slice(queryIndex + 1);
  if (recipient.toLowerCase() !== "info@commercialshotblasting.co.uk") return href;
  const ref = campaignReference(attribution);
  if (!ref) return href;
  try {
    const params = new URLSearchParams(query);
    const body = params.get("body") || "";
    if (body.includes(MARKER)) return href;
    // Campaign ID is a campaign reference, never an individual click ID.
    const touch = ref.touch === "latest_tagged" ? "Latest tagged visit — " : "";
    const line = `${MARKER}\n${touch}${ref.campaign}${ref.id ? ` (campaign ID ${ref.id})` : ""}`;
    params.set("body", `${body}${body ? "\n\n" : ""}${line}`);
    return `mailto:${recipient}?${params.toString()}${fragment}`;
  } catch { return href; }
}

/** Prepare on actual intent, not on render; SPA links keep their existing recipients. */
export function installCampaignEmailLinks(): () => void {
  if (typeof document === "undefined") return () => {};
  const originalLinks = new Map<HTMLAnchorElement, { original: string; applied: string }>();
  const prepare = (event: Event) => {
    const target = event.target instanceof Element ? event.target : null;
    const link = target?.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (!/^mailto:/i.test(href)) return;
    for (const [oldLink] of Array.from(originalLinks)) if (!oldLink.isConnected) originalLinks.delete(oldLink);
    const previous = originalLinks.get(link);
    const original = previous && previous.applied === href ? previous.original : href;
    const applied = campaignEmailHref(original, formatUTMForSubmission(), window.location.pathname);
    if (applied !== href) {
      link.setAttribute("href", applied);
      originalLinks.set(link, { original, applied });
    }
  };
  const events = ["click", "auxclick", "contextmenu", "focusin"];
  events.forEach(event => document.addEventListener(event, prepare, true));
  return () => {
    events.forEach(event => document.removeEventListener(event, prepare, true));
    for (const [link, change] of Array.from(originalLinks)) if (link.isConnected && link.getAttribute("href") === change.applied) link.setAttribute("href", change.original);
    originalLinks.clear();
  };
}
