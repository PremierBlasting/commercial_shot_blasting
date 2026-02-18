import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { trackPhoneCall } from "@/lib/analytics";

interface TrackedPhoneButtonProps {
  location: string;
  phoneNumber: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export function TrackedPhoneButton({
  location,
  phoneNumber,
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
  children,
}: TrackedPhoneButtonProps) {
  const logCallMutation = trpc.callTracking.logCall.useMutation();

  const handleClick = () => {
    // Log the call tracking event
    logCallMutation.mutate({
      location,
      phoneNumber,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });

    // Track phone call in Google Analytics
    trackPhoneCall(phoneNumber, location);

    // Initiate the phone call
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      {showIcon && <Phone className="w-4 h-4 mr-2" />}
      {children || phoneNumber}
    </Button>
  );
}
