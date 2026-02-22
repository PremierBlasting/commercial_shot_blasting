import { Phone } from "lucide-react";
import { trackPhoneCall } from "@/lib/analytics";

export function FloatingCallButton() {
  const handleCallClick = () => {
    trackPhoneCall('07970566409', 'Floating Call Button');
  };

  return (
    <div className="fixed right-6 z-50 md:hidden" style={{ top: 'calc(50% + 44px)' }}>
      {/* Call Now Button - positioned just below the WhatsApp widget */}
      <a
        href="tel:07970566409"
        className="flex items-center gap-2 bg-[#2C5F7F] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#234a63] transition-all duration-300"
        aria-label="Call Now"
        onClick={handleCallClick}
      >
        <Phone className="w-5 h-5" />
        <span className="font-medium">Call Now</span>
      </a>
    </div>
  );
}
