import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { HubSpotForm } from "./HubSpotForm";

interface QuotePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Quote Popup Modal
 * Displays HubSpot form in a modal dialog
 */
export function QuotePopup({ open, onOpenChange }: QuotePopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[#F5F1E8]">
        <DialogHeader>
          <DialogTitle 
            className="text-2xl font-bold text-[#2C5F7F] text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get a Free Quote
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Fill out the form below and we'll get back to you within 24 hours
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <HubSpotForm className="hubspot-popup-form" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
