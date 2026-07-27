import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

// Google Ads tag — Premier Blasting account (236-156-1845), which also serves CSB campaigns.
// Tag ID confirmed via Google Ads API: AW-16481669131 is the correct tag for this account.
export const GOOGLE_ADS_ID = 'AW-16481669131';

// CSB conversion action labels — created 2026-07-27 via Google Ads API (additive only, no PB changes).
// Lead Form label: fires on contact form submission and quote form submission.
export const GOOGLE_ADS_LEAD_LABEL = 'nOlECJeFnNccEIugibM9'; // CSB - Website Lead Form (ID: 7699104407)
// Phone call label: fires on phone number click only.
export const GOOGLE_ADS_PHONE_LABEL = 'UPr1CIvfr9ccEIugibM9'; // CSB - Phone Call Click (ID: 7699427211)

export function GoogleAnalytics() {
  const [location] = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const pageEnterTime = useRef<number>(Date.now());
  const scrollTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Only load GA if measurement ID is configured
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    // Load Google Analytics + Google Ads tags.
    // A single gtag.js request can serve multiple tag IDs — use GA4 ID as the primary loader.
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
        send_page_view: false,
      });
      gtag('config', '${GOOGLE_ADS_ID}');
    `;
    document.head.appendChild(script2);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [GA_MEASUREMENT_ID]);

  // Track page views on route change — fires a single page_view with engagement_time_msec
  // so GA4 does NOT count the session as a bounce (GA4 bounce = session with no engagement)
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    pageEnterTime.current = Date.now();
    scrollTracked.current = new Set();

    const sendPageView = () => {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: location,
          page_title: document.title,
          engagement_time_msec: 1,
        });
      }
    };

    // Fire after a short delay so the page title is updated
    const timer = setTimeout(sendPageView, 100);
    return () => clearTimeout(timer);
  }, [location, GA_MEASUREMENT_ID]);

  // Scroll depth tracking — fires scroll events at 25%, 50%, 75%, 90%
  // Each scroll event counts as engagement, preventing false bounce classification
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    const THRESHOLDS = [25, 50, 75, 90];

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPct = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of THRESHOLDS) {
        if (scrollPct >= threshold && !scrollTracked.current.has(threshold)) {
          scrollTracked.current.add(threshold);
          if (window.gtag) {
            window.gtag('event', 'scroll', {
              percent_scrolled: threshold,
              page_path: location,
              engagement_time_msec: Date.now() - pageEnterTime.current,
            });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location, GA_MEASUREMENT_ID]);

  // user_engagement heartbeat — fires every 30 seconds while the page is visible.
  // GA4 uses this event to confirm ongoing engagement, which prevents sessions from
  // being classified as bounces when users spend time reading without scrolling or clicking.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startHeartbeat = () => {
      if (intervalId) return; // already running
      intervalId = setInterval(() => {
        if (document.visibilityState === 'visible' && window.gtag) {
          window.gtag('event', 'user_engagement', {
            engagement_time_msec: Date.now() - pageEnterTime.current,
            page_path: location,
          });
        }
      }, 30_000);
    };

    const stopHeartbeat = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startHeartbeat();
      } else {
        stopHeartbeat();
      }
    };

    // Start immediately if page is already visible
    if (document.visibilityState === 'visible') {
      startHeartbeat();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopHeartbeat();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location, GA_MEASUREMENT_ID]);

  return null;
}
