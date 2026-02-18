import { Phone, MessageCircle } from "lucide-react";
import { trackPhoneCall, trackEvent } from "@/lib/analytics";

export function FloatingCallButton() {
  // WhatsApp number formatted for wa.me link (remove + and spaces)
  const whatsappNumber = "447721375756";
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in your shot blasting services. Can you provide more information?");

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      event_category: 'Contact',
      event_label: 'WhatsApp Button',
      click_location: 'Floating Button',
    });
  };

  const handleCallClick = () => {
    trackPhoneCall('07970566409', 'Floating Call Button');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:hidden">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#1da851] transition-all duration-300"
        aria-label="WhatsApp Us"
        onClick={handleWhatsAppClick}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">WhatsApp</span>
      </a>
      
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
