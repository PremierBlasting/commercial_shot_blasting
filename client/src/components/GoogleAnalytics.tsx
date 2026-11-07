import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { COOKIE_CONSENT_CHANGE_EVENT } from '@shared/cookieConsent';
import { currentGoogleConsent, dispatchPageView, initialiseGoogleMeasurement, syncGoogleConsent } from '@/lib/googleMeasurement';
import { installBusinessContactTracking } from '@/lib/contactClickTracking';
import { installWebsiteCallTracking } from '@/lib/websiteCallTracking';
import { installCampaignEmailLinks } from '@/lib/campaignEmailLinks';

export function GoogleAnalytics() {
  const [location] = useLocation();
  const [consentRevision, setConsentRevision] = useState(0);

  useEffect(() => {
    const uninstallContacts = installBusinessContactTracking();
    const uninstallEmails = installCampaignEmailLinks();
    let cancel = initialiseGoogleMeasurement();
    const update = () => {
      cancel(); syncGoogleConsent(); cancel = initialiseGoogleMeasurement();
      setConsentRevision(revision => revision + 1);
    };
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, update);
    window.addEventListener('storage', update);
    return () => {
      cancel(); uninstallContacts(); uninstallEmails();
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, update);
      window.removeEventListener('storage', update);
    };
  }, []);

  useEffect(() => installWebsiteCallTracking(location), [location, consentRevision]);

  useEffect(() => {
    if (!currentGoogleConsent().analytics) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tryView = () => {
      if (timer) clearTimeout(timer);
      const marker = document.querySelector<HTMLElement>('#root [data-csb-route-ready]');
      if (marker?.dataset.csbRouteReady !== location) return;
      timer = setTimeout(() => {
        if (currentGoogleConsent().analytics && marker.dataset.csbRouteReady === location) dispatchPageView(location, document.title);
      }, 100);
    };
    const observer = new MutationObserver(tryView);
    const root = document.getElementById('root');
    if (root) observer.observe(root, { attributes: true, attributeFilter: ['data-csb-route-ready'], childList: true, subtree: true });
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    tryView();
    return () => { observer.disconnect(); if (timer) clearTimeout(timer); };
  }, [location, consentRevision]);

  return null;
}
