import { useEffect, useRef } from "react";
import { trackFormSubmission, trackQuoteFormSubmission } from "@/lib/analytics";
import { getUTMData, getFirstTouchUTM } from "@/lib/utm";

interface HubSpotFormProps {
  className?: string;
  locationName?: string;
}

/**
 * HubSpot Form Component
 * Embeds the HubSpot form using the exact embed code provided
 * Includes UTM tracking data for marketing attribution
 */
export function HubSpotForm({ className = "", locationName }: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the HubSpot form frame div
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = '';
      
      // Create the form frame div with exact attributes from embed code
      const formFrame = document.createElement('div');
      formFrame.className = 'hs-form-frame';
      formFrame.setAttribute('data-region', 'eu1');
      formFrame.setAttribute('data-form-id', 'b6f4f2e0-afe6-4351-9a63-5a9663bf6f37');
      formFrame.setAttribute('data-portal-id', '147618128');
      
      // Add location name as data attribute if provided
      if (locationName) {
        formFrame.setAttribute('data-location', locationName);
      }
      
      containerRef.current.appendChild(formFrame);

      // Check if the HubSpot script is already loaded
      const existingScript = document.querySelector('script[src*="hsforms.net/forms/embed/147618128"]');
      
      if (!existingScript) {
        // Load the HubSpot script
        const script = document.createElement('script');
        script.src = 'https://js-eu1.hsforms.net/forms/embed/147618128.js';
        script.defer = true;
        document.head.appendChild(script);
      } else {
        // If script already exists, trigger a re-render of forms
        // HubSpot's embed script should auto-detect new form frames
        if ((window as any).hbspt && (window as any).hbspt.forms) {
          // Force re-initialization by dispatching a custom event
          window.dispatchEvent(new Event('load'));
        }
      }

      // Listen for HubSpot form submission events
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmit') {
          // Get UTM data for attribution logging
          const lastTouch = getUTMData();
          const firstTouch = getFirstTouchUTM();
          
          // Track form submission with UTM data (already included via analytics.ts)
          trackFormSubmission('HubSpot Contact Form', window.location.pathname);
          trackQuoteFormSubmission();
          
          // Log UTM attribution to console for debugging
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

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {/* HubSpot form will be injected here */}
      <div className="text-center py-8 text-gray-500">
        Loading form...
      </div>
    </div>
  );
}
