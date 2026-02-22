import { Phone } from "lucide-react";
import { trackPhoneCall } from "@/lib/analytics";

export function FloatingCallButton() {
  const handleCallClick = () => {
    trackPhoneCall('07970566409', 'Floating Call Button');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:hidden">
      {/* Call Now Button */}
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
