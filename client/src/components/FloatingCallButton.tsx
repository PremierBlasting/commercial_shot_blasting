import { Phone } from "lucide-react";
import { trackPhoneCall } from "@/lib/analytics";

export function FloatingCallButton() {
  const handleCallClick = () => {
    trackPhoneCall('07970566409', 'Floating Call Button');
  };

  return (
    <div className="fixed right-6 z-50 md:hidden" style={{ top: 'calc(50% + 44px)' }}>
      <a
        href="tel:07970566409"
        className="flex items-center justify-center w-14 h-14 bg-[#2C5F7F] text-white rounded-full shadow-lg transition-all duration-300 hover:bg-[#234a63] hover:scale-110 hover:shadow-xl active:scale-95"
        aria-label="Call Now"
        onClick={handleCallClick}
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
