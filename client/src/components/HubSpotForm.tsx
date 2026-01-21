import { useEffect, useRef } from "react";

interface HubSpotFormProps {
  className?: string;
}

/**
 * HubSpot Form Component
 * Embeds the HubSpot form using the exact embed code provided
 */
export function HubSpotForm({ className = "" }: HubSpotFormProps) {
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
