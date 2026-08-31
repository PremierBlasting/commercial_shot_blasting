import { Phone, MessageCircle } from "lucide-react";
import { trackPhoneCall, trackEvent } from "@/lib/analytics";
import { trpc } from "@/lib/trpc";
import {
  buildConsentGatedWhatsAppLink,
  getCurrentWhatsAppClickTrackerInput,
} from "@/lib/whatsappTracking";

export function FloatingCallButton() {
  const createReference = trpc.whatsappTracking.createReference.useMutation();
  // WhatsApp number formatted for wa.me link (remove + and spaces)
  const whatsappNumber = "447721375756";
  const whatsappMessage = "Hi, I'm interested in your shot blasting services. Can you provide more information?";

  const handleWhatsAppClick = () => {
    if (createReference.isPending) return;

    trackEvent("whatsapp_click", {
      event_category: "Contact",
      event_label: "WhatsApp Button",
      click_location: "Floating Button",
    });

    const popup = window.open("", "_blank");
    const trackerInput = getCurrentWhatsAppClickTrackerInput("floating_whatsapp_button");
    const openChat = (trackerRef?: string) => {
      const url = buildConsentGatedWhatsAppLink(whatsappNumber, whatsappMessage, trackerRef);
      if (popup) {
        popup.opener = null;
        popup.location.href = url;
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    };

    if (!trackerInput) {
      openChat();
      return;
    }

    createReference.mutate(trackerInput, {
      onSuccess: ({ trackerRef }) => openChat(trackerRef),
      onError: () => openChat(),
    });
  };

  const handleCallClick = () => {
    trackPhoneCall("07970566409", "Floating Call Button");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:hidden">
      {/* WhatsApp Button */}
      <button
        type="button"
        disabled={createReference.isPending}
        className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#1da851] transition-all duration-300"
        aria-label="WhatsApp Us"
        onClick={handleWhatsAppClick}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">WhatsApp</span>
      </button>
      
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
