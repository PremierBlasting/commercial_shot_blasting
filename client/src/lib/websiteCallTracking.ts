import { COOKIE_CONSENT_CHANGE_EVENT } from "@shared/cookieConsent";
import { CSB_PHONE, CSB_INTERNATIONAL_PHONE } from "@shared/googleMeasurement";
import { CSB_WEBSITE_CALL_CONFIG, CSB_WEBSITE_CALL_HOSTS, verifiedWebsiteCallConfig } from "@shared/csbWebsiteCall";
import { currentWebsiteCallConsent, dispatchWebsiteCallConfig, GOOGLE_MEASUREMENT_READY_EVENT } from "./googleMeasurement";
import { clearBusinessForwardingTargets, registerBusinessPhoneLink, setBusinessForwardingDial } from "./businessPhoneTargets";

const businessText = /(?<![\d+])(?:\+44[\s()-]*7970[\s()-]*566409|0044[\s()-]*7970[\s()-]*566409|07970[\s()-]*566409)(?!\d)/g;
const editableOrMetadata = "script,style,noscript,textarea,input,select,option,[contenteditable]:not([contenteditable='false'])";

function isOriginalPhone(href: string): boolean {
  if (!/^tel:/i.test(href)) return false;
  const digits = href.slice(4).replace(/\D/g, "");
  return [CSB_PHONE, CSB_INTERNATIONAL_PHONE, `00${CSB_INTERNATIONAL_PHONE}`].includes(digits);
}

/** UK forwarding pair only. Google's timeout/original-number fallback is not a new target. */
export function validatedForwardingNumber(formatted: unknown, mobile: unknown): { formatted: string; dial: string } | null {
  if (typeof formatted !== "string" || typeof mobile !== "string" || formatted.length > 40 || mobile.length > 25) return null;
  if (!/^[+\d\s().-]+$/.test(formatted) || !/^\+?\d+$/.test(mobile)) return null;
  const normalise = (number: string) => {
    let digits = number.replace(/\D/g, "");
    if (digits.startsWith("0044")) digits = digits.slice(2);
    if (digits.startsWith("0") && digits.length === 11) digits = "44" + digits.slice(1);
    return /^44\d{10}$/.test(digits) ? digits : null;
  };
  const digits = normalise(mobile);
  if (!digits || normalise(formatted) !== digits || digits === CSB_INTERNATIONAL_PHONE) return null;
  return { formatted, dial: `+${digits}` };
}

/** Default null config exits before doing any DOM work, listeners or Google dispatch. */
export function installWebsiteCallTracking(route: string): () => void {
  const config = verifiedWebsiteCallConfig(CSB_WEBSITE_CALL_CONFIG);
  if (!config || typeof window === "undefined" || !CSB_WEBSITE_CALL_HOSTS.some(host => host === window.location.hostname) || !currentWebsiteCallConsent()) return () => {};
  const root = document.getElementById("root");
  if (!root || typeof MutationObserver === "undefined") return () => {};
  let active = true;
  let configured = false;
  let forwarding: { formatted: string; dial: string } | null = null;
  let frame: number | undefined;
  const textChanges = new Map<Text, { original: string; applied: string }>();
  const linkChanges = new Map<HTMLAnchorElement, { original: string; applied: string }>();
  const eligible = () => active && window.location.pathname === route && currentWebsiteCallConsent() && root.querySelector<HTMLElement>("[data-csb-route-ready]")?.dataset.csbRouteReady === route;

  const restoreNumbers = () => {
    for (const [node, change] of Array.from(textChanges)) if (node.isConnected && node.data === change.applied) node.data = change.original;
    for (const [link, change] of Array.from(linkChanges)) if (link.isConnected && link.getAttribute("href") === change.applied) link.setAttribute("href", change.original);
    textChanges.clear(); linkChanges.clear(); clearBusinessForwardingTargets();
  };

  const applyNumbers = () => {
    if (!forwarding || !eligible()) return;
    observer.disconnect();
    try {
      for (const [node, change] of Array.from(textChanges)) if (!node.isConnected || node.data !== change.applied) textChanges.delete(node);
      for (const [link, change] of Array.from(linkChanges)) if (!link.isConnected || link.getAttribute("href") !== change.applied) linkChanges.delete(link);
      for (const link of Array.from(root.querySelectorAll<HTMLAnchorElement>("a[href]"))) {
        if (link.closest(editableOrMetadata) || !isOriginalPhone(link.getAttribute("href") || "")) continue;
        const original = link.getAttribute("href")!;
        const applied = `tel:${forwarding.dial}`;
        linkChanges.set(link, { original, applied });
        link.setAttribute("href", applied);
        registerBusinessPhoneLink(link, applied);
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node as Text;
        const parent = text.parentElement;
        if (!parent || parent.closest(editableOrMetadata)) continue;
        // Never change WhatsApp/prefilled share text, or any other external link.
        const link = parent.closest("a[href]");
        if (link && !linkChanges.has(link as HTMLAnchorElement) && !isOriginalPhone(link.getAttribute("href") || "")) continue;
        const applied = text.data.replace(businessText, forwarding.formatted);
        if (applied !== text.data) { textChanges.set(text, { original: text.data, applied }); text.data = applied; }
      }
    } finally { if (active) observe(); }
  };

  const attempt = () => {
    frame = undefined;
    if (!eligible()) return;
    if (!configured) {
      // Wait for the existing deferred tag. Do not queue a phone request that can
      // outlive withdrawal or an uncommitted lazy route, and never add a tag.
      if (document.querySelector<HTMLScriptElement>("script[data-csb-analytics-loader]")?.dataset.csbAnalyticsLoaded !== "true") return;
      configured = true;
      const sent = dispatchWebsiteCallConfig(config, (formatted, mobile) => {
        if (!eligible()) return; // Reject withdrawn/old-route asynchronous callbacks.
        if (typeof formatted === "string" && typeof mobile === "string" && isOriginalPhone(`tel:${formatted}`) && isOriginalPhone(`tel:${mobile}`)) {
          restoreNumbers(); forwarding = null; return;
        }
        const result = validatedForwardingNumber(formatted, mobile);
        if (!result) return;
        if (forwarding && (forwarding.dial !== result.dial || forwarding.formatted !== result.formatted)) restoreNumbers();
        forwarding = result;
        setBusinessForwardingDial(result.dial);
        applyNumbers();
      });
      if (!sent) configured = false;
    }
    applyNumbers();
  };
  const schedule = () => { if (active && frame === undefined) frame = window.requestAnimationFrame(attempt); };
  const observer = new MutationObserver(schedule);
  const observe = () => observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["href", "data-csb-route-ready"] });
  const cleanup = () => {
    if (!active) return;
    active = false;
    observer.disconnect();
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    restoreNumbers();
    window.removeEventListener(GOOGLE_MEASUREMENT_READY_EVENT, schedule);
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, checkWithdrawal);
    window.removeEventListener("storage", checkWithdrawal);
  };
  const checkWithdrawal = () => { if (!currentWebsiteCallConsent()) cleanup(); };
  observe();
  window.addEventListener(GOOGLE_MEASUREMENT_READY_EVENT, schedule);
  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, checkWithdrawal);
  window.addEventListener("storage", checkWithdrawal);
  schedule();
  return cleanup;
}
