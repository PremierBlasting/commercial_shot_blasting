import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import { useEffect } from "react";
import { trackQuoteRequest } from "@/lib/analytics";

interface QuotePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locationName?: string;
}

/**
 * Quote Popup Modal
 * Displays the custom branded LeadForm in a modal dialog
 */
export function QuotePopup({ open, onOpenChange, locationName }: QuotePopupProps) {
  // Track when quote popup opens
  useEffect(() => {
    if (open) {
      trackQuoteRequest('Quote Popup');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#F5F1E8]">
        <DialogHeader>
          <DialogTitle
            className="text-2xl font-bold text-[#2C5F7F] text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Request A Site Visit
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Fill out the form below and we'll arrange a site visit within 24 hours
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <LeadForm
            variant="light"
            locationName={locationName}
            showWhatsApp={true}
            onSuccess={() => {
              // Keep the popup open to show the success state
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
