import { useEffect, useRef } from "react";
import { trackFormSubmission, trackQuoteFormSubmission } from "@/lib/analytics";
import { getUTMData, getFirstTouchUTM } from "@/lib/utm";

interface HubSpotFormProps {
  className?: string;
  locationName?: string;
}

/**
 * HubSpot Form Component
 * Embeds the HubSpot form using the exact embed code provided.
 *
 * Performance: The HubSpot script (~44 KiB) is loaded lazily using IntersectionObserver.
 * The script only loads when the form container enters the viewport (or on first interaction
 * if IntersectionObserver is unavailable). This removes HubSpot from the critical render
 * path and significantly improves LCP on mobile.
 */
export function HubSpotForm({ className = "", locationName }: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const initForm = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      // Clear placeholder content
      container.innerHTML = '';

      // Create the HubSpot form frame div with exact attributes from embed code
      const formFrame = document.createElement('div');
      formFrame.className = 'hs-form-frame';
      formFrame.setAttribute('data-region', 'eu1');
      formFrame.setAttribute('data-form-id', 'b6f4f2e0-afe6-4351-9a63-5a9663bf6f37');
      formFrame.setAttribute('data-portal-id', '147618128');

      if (locationName) {
        formFrame.setAttribute('data-location', locationName);
      }

      container.appendChild(formFrame);

      // Check if the HubSpot script is already loaded
      const existingScript = document.querySelector('script[src*="hsforms.net/forms/embed/147618128"]');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://js-eu1.hsforms.net/forms/embed/147618128.js';
        script.defer = true;
        document.head.appendChild(script);
      } else if ((window as any).hbspt?.forms) {
        // Script already loaded — trigger re-init for newly added form frame
        window.dispatchEvent(new Event('load'));
      }
    };

    // Use IntersectionObserver to defer loading until the form is near the viewport.
    // rootMargin of 200px means we start loading slightly before it's visible,
    // so the form is ready by the time the user scrolls to it.
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            initForm();
            observer.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      observer.observe(container);

      return () => observer.disconnect();
    } else {
      // Fallback: load immediately if IntersectionObserver not available
      initForm();
    }
  }, [locationName]);

  // Listen for HubSpot form submission events (mounted once)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'hsFormCallback' && event.data?.eventName === 'onFormSubmit') {
        const lastTouch = getUTMData();
        const firstTouch = getFirstTouchUTM();

        trackFormSubmission('HubSpot Contact Form', window.location.pathname);
        trackQuoteFormSubmission();

        if (lastTouch || firstTouch) {
          console.log('[UTM Attribution] Form submitted with:', {
            lastTouch,
            firstTouch,
            page: window.location.pathname,
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {/* Placeholder shown until HubSpot script loads */}
      <div className="text-center py-8 text-gray-500 text-sm">
        Loading form...
      </div>
    </div>
  );
}
