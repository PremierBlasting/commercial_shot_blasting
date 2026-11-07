import { CSB_PHONE, CSB_INTERNATIONAL_PHONE } from '@shared/googleMeasurement';
import { trackPhoneCall, trackEvent } from './analytics';
import { isManagedBusinessPhoneLink } from './businessPhoneTargets';

let currentContactEvent: Event | undefined;
const counted = new WeakMap<Event, Set<string>>();
let installed = false;

export function isCSBPhone(number: string): boolean {
  const digits = number.replace(/\D/g, '');
  return [CSB_PHONE, CSB_INTERNATIONAL_PHONE, `00${CSB_INTERNATIONAL_PHONE}`].includes(digits);
}

/** Capture and existing React callbacks share native-event identity. */
export function claimContactClick(kind: 'phone' | 'email', event = currentContactEvent): boolean {
  if (!event) return true;
  const kinds = counted.get(event) || new Set<string>();
  if (kinds.has(kind)) return false;
  kinds.add(kind); counted.set(event, kinds); return true;
}

export function installBusinessContactTracking(): () => void {
  if (typeof document === 'undefined' || installed) return () => {};
  installed = true;
  const capture = (event: Event) => {
    if ('button' in event && Number(event.button) > 1) return;
    currentContactEvent = event;
    setTimeout(() => { if (currentContactEvent === event) currentContactEvent = undefined; }, 0);
    const target = event.target instanceof Element ? event.target : null;
    const anchor = target?.closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (/^tel:/i.test(href) && (isCSBPhone(href.slice(4)) || isManagedBusinessPhoneLink(anchor))) {
      trackPhoneCall(CSB_PHONE);
    } else if (/^mailto:info@commercialshotblasting\.co\.uk(?:\?|$)/i.test(href)) {
      trackEvent('email_click', { event_category: 'Contact', event_label: 'Business Email Link', click_location: window.location.pathname });
    }
    // No WhatsApp delegation: old 447721375756 widgets already own their handlers/API.
  };
  document.addEventListener('click', capture, true);
  document.addEventListener('auxclick', capture, true);
  return () => {
    document.removeEventListener('click', capture, true);
    document.removeEventListener('auxclick', capture, true);
    installed = false; currentContactEvent = undefined;
  };
}
