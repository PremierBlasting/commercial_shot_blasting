import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SurveyBookingFlow, type SurveyBookingDefaults } from "./SurveyBookingFlow";
import { useEffect } from "react";
import { trackQuoteRequest } from "@/lib/analytics";

interface QuotePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locationName?: string;
  defaults?: SurveyBookingDefaults;
}

/**
 * Quote Popup Modal
 * Displays the custom branded LeadForm in a modal dialog
 */
export function QuotePopup({ open, onOpenChange, locationName, defaults }: QuotePopupProps) {
  // Track when quote popup opens
  useEffect(() => {
    if (open) {
      trackQuoteRequest('Quote Popup');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto bg-[#F5F1E8]">
        <DialogHeader>
          <DialogTitle
            className="text-2xl font-bold text-[#2C5F7F] text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Request A Site Visit
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Tell us about the project in three short steps. We will confirm your free, no-obligation survey within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <SurveyBookingFlow defaults={{ ...defaults, locationName: defaults?.locationName ?? locationName }} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
