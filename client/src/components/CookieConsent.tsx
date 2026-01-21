import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "csb_cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
    if (!consent) {
      // Small delay before showing banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Trigger animation after visibility is set
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    closeBanner();
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    closeBanner();
  };

  const closeBanner = () => {
    setIsAnimating(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-300 ease-out ${
        isAnimating ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[#2C5F7F] text-white shadow-2xl border-t-4 border-[#F5F1E8]">
        <div className="container py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Icon and Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center flex-shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Cookie Notice
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. 
                  By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or 
                  decline non-essential cookies.{" "}
                  <a 
                    href="/privacy-policy" 
                    className="underline hover:text-white transition"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 md:flex-none border-white/30 text-white hover:bg-white/10 hover:text-white"
                onClick={handleDecline}
              >
                Decline
              </Button>
              <Button
                className="flex-1 md:flex-none bg-white text-[#2C5F7F] hover:bg-white/90"
                onClick={handleAccept}
              >
                Accept All
              </Button>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 md:hidden p-1 hover:bg-white/10 rounded transition"
              aria-label="Close cookie banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
