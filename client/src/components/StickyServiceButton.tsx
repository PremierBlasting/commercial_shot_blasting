import { useState, useEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { trackPhoneCall } from '@/lib/analytics';

interface StickyServiceButtonProps {
  onOpenQuotePopup: () => void;
  serviceTitle: string;
}

export function StickyServiceButton({ onOpenQuotePopup, serviceTitle }: StickyServiceButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button after scrolling 300px down
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden md:fixed md:bottom-8 md:right-8 md:z-40 md:flex md:flex-col md:gap-3 md:max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* Desktop Sticky Button Group */}
      <div 
        className="bg-white rounded-xl shadow-2xl overflow-hidden border border-[#2C5F7F]/10 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(44,95,127,0.2)] hover:scale-105 origin-bottom-right"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2C5F7F] to-[#1a3a4d] px-4 py-3">
          <p className="text-white text-sm font-semibold">Need a Quote?</p>
          <p className="text-white/80 text-xs mt-0.5">Get your free site survey for {serviceTitle}</p>
        </div>

        {/* Buttons */}
        <div className="p-4 flex flex-col gap-3">
          <button
            onClick={onOpenQuotePopup}
            className="flex items-center justify-center gap-2 bg-[#2C5F7F] hover:bg-[#234a63] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            Request a Site Survey
          </button>
          <a
            href="tel:07970566409"
            onClick={() => trackPhoneCall('07970566409', 'Service Page Sticky Button')}
            className="flex items-center justify-center gap-2 border-2 border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            Call: 07970 566409
          </a>
        </div>

        {/* Footer */}
        <div className="bg-[#F5F1E8] px-4 py-2 border-t border-[#2C5F7F]/10">
          <p className="text-xs text-gray-600 text-center">
            ✓ Free consultation • ✓ No obligation • ✓ Same-day response
          </p>
        </div>
      </div>

      {/* Scroll-to-top indicator */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-white hover:bg-[#F5F1E8] border border-[#2C5F7F]/20 text-[#2C5F7F] font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-xs shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
      >
        ↑ Back to Top
      </button>
    </div>
  );
}
