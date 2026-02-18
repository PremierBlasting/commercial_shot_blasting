import { useState, useCallback } from "react";
import { ServiceAreasMap } from "./ServiceAreasMap";
import { MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeferredServiceAreasMapProps {
  onAreaClick?: (areaId: string) => void;
  onQuoteClick?: () => void;
}

export function DeferredServiceAreasMap({ onAreaClick, onQuoteClick }: DeferredServiceAreasMapProps) {
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMap = useCallback(() => {
    setIsLoading(true);
    // Small delay to show loading state, then reveal map
    setTimeout(() => {
      setShowMap(true);
      setIsLoading(false);
    }, 100);
  }, []);

  if (!showMap) {
    return (
      <div className="relative h-[600px] bg-gradient-to-br from-[#1a3d52] to-[#2C5F7F] rounded-xl overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-deferred" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-deferred)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
          {/* UK Map preview image */}
          <div className="relative mb-8">
            <img 
              src="/uk-map.svg" 
              alt="UK Map Preview"
              className="w-48 h-auto opacity-30"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#E8B84A]/20 rounded-full flex items-center justify-center">
                <MapPin className="w-10 h-10 text-[#E8B84A]" />
              </div>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Interactive Coverage Map
          </h3>
          <p className="text-white/70 max-w-md mb-8">
            Click below to load our interactive Google Maps view showing all 100+ service locations across England and Wales.
          </p>

          <Button
            onClick={handleLoadMap}
            disabled={isLoading}
            className="bg-[#E8B84A] hover:bg-[#d4a63d] text-[#1a3d52] font-semibold px-8 py-6 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Loading Map...
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5 mr-2" />
                Load Interactive Map
              </>
            )}
          </Button>

          <p className="text-white/50 text-sm mt-4">
            Powered by Google Maps
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#E8B84A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
      </div>
    );
  }

  // Once loaded, show the actual Google Maps component
  return (
    <ServiceAreasMap 
      onAreaClick={onAreaClick}
      onQuoteClick={onQuoteClick}
    />
  );
}
