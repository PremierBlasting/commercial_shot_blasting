import { CSB_PHONE, CSB_INTERNATIONAL_PHONE } from "@shared/googleMeasurement";
import { currentWebsiteCallConsent } from "./googleMeasurement";

let forwardingDial: string | undefined;
let managedLinks = new WeakMap<Element, string>();

function originalBusinessNumber(number: string) {
  const digits = number.replace(/\D/g, "");
  return [CSB_PHONE, CSB_INTERNATIONAL_PHONE, `00${CSB_INTERNATIONAL_PHONE}`].includes(digits);
}

/** An in-memory callback result, never a new stored attribution identifier. */
export function setBusinessForwardingDial(number: string | undefined) { forwardingDial = number; }
export function registerBusinessPhoneLink(link: Element, href: string) { managedLinks.set(link, href); }
export function clearBusinessForwardingTargets() { forwardingDial = undefined; managedLinks = new WeakMap(); }

export function isManagedBusinessPhoneLink(link: Element): boolean {
  return !!forwardingDial && currentWebsiteCallConsent() && managedLinks.get(link) === link.getAttribute("href");
}

/** Logs/events keep the real CSB number; only the eventual dial target may change. */
export function businessPhoneDialTarget(original: string): string {
  return forwardingDial && currentWebsiteCallConsent() && originalBusinessNumber(original) ? forwardingDial : original;
}
