import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

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

    // Load Google Analytics script
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

  return null;
}
