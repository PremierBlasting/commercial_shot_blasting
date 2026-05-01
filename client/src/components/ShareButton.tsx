import { useState } from "react";
import { Share2, Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title: string;
  url: string;
  description?: string;
}

export function ShareButton({ title, url, description }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url.startsWith("http") ? url : `https://commercialshotblasting.co.uk${url}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || title);

  const shareLinks = [
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      colour: "hover:text-[#1877F2]",
    },
    {
      label: "X / Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      colour: "hover:text-[#1DA1F2]",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedDesc}`,
      colour: "hover:text-[#0A66C2]",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Use Web Share API if available (mobile browsers)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description || title, url: shareUrl });
        return;
      } catch {
        // User cancelled or API not supported — fall through to dropdown
      }
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        size="sm"
        className="border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F] hover:text-white gap-2"
        onClick={handleNativeShare}
        aria-label="Share this page"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>

      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
            <p className="text-xs text-gray-500 font-medium px-4 pt-3 pb-1 uppercase tracking-wide">
              Share via
            </p>
            {shareLinks.map(({ label, icon: Icon, href, colour }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${colour}`}
                onClick={() => setOpen(false)}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </a>
            ))}
            <button
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full hover:text-[#2C5F7F] border-t border-gray-100"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="w-4 h-4 flex-shrink-0 text-green-500" />
              ) : (
                <Link2 className="w-4 h-4 flex-shrink-0" />
              )}
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
