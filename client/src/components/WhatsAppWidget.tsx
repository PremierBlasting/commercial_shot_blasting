import { useState } from "react";
import { X } from "lucide-react";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "447721375756"; // 07721 375 756 in international format
  const message = encodeURIComponent(
    "Hello, I'm interested in your shot blasting services. Please send me a quote."
  );

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-[#25D366] shadow-lg transition-all hover:scale-110 hover:shadow-xl flex items-center justify-center"
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X className="h-8 w-8 text-white" />
        ) : (
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 text-white"
            fill="currentColor"
          >
            <path d="M16 0C7.164 0 0 7.164 0 16c0 2.828 0.74 5.484 2.028 7.788L0.084 31.912l8.34-2.188C10.656 30.96 13.272 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.344c-2.508 0-4.872-0.696-6.88-1.908l-0.492-0.292-5.108 1.34 1.364-4.988-0.32-0.512C3.084 21.004 2.344 18.564 2.344 16c0-7.536 6.12-13.656 13.656-13.656S29.656 8.464 29.656 16 23.536 29.344 16 29.344zm7.48-10.216c-0.408-0.204-2.416-1.192-2.792-1.328-0.376-0.136-0.648-0.204-0.92 0.204s-1.056 1.328-1.296 1.6c-0.24 0.272-0.48 0.308-0.888 0.104-0.408-0.204-1.72-0.632-3.276-2.02-1.212-1.08-2.028-2.412-2.268-2.82s-0.024-0.628 0.18-0.832c0.184-0.184 0.408-0.48 0.612-0.72 0.204-0.24 0.272-0.408 0.408-0.68 0.136-0.272 0.068-0.512-0.032-0.72-0.104-0.204-0.92-2.216-1.26-3.036-0.332-0.796-0.668-0.688-0.92-0.7-0.236-0.012-0.508-0.016-0.78-0.016s-0.72 0.104-1.096 0.512c-0.376 0.408-1.436 1.404-1.436 3.42s1.472 3.968 1.676 4.24c0.204 0.272 2.828 4.316 6.852 6.052 0.956 0.412 1.704 0.66 2.288 0.844 0.964 0.308 1.84 0.264 2.532 0.16 0.772-0.116 2.416-0.988 2.756-1.94 0.34-0.952 0.34-1.768 0.24-1.94-0.104-0.172-0.376-0.272-0.784-0.476z" />
          </svg>
        )}
        {/* Red notification dot */}
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 border-2 border-white"></span>
      </button>

      {/* Chat Widget Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl bg-white shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-4">
              {/* Logo placeholder - using initials */}
              <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-teal-700 font-bold text-lg">CSB</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl">
                  Commercial Shot Blasting
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span className="text-white/90 text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-6 bg-gray-50">
            {/* Timestamp */}
            <div className="text-center text-gray-400 text-sm mb-4">
              {new Date().toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* Message Bubble */}
            <div className="bg-white rounded-2xl rounded-tl-sm p-5 shadow-sm">
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                <strong>Hello,</strong>
              </p>
              <p className="text-gray-800 text-base leading-relaxed mb-4">
                Please send a short video (or a few photos) of your project,
                along with a brief summary, via WhatsApp. Once we've received
                that, we'll be able to provide a quick quote.
              </p>
              <p className="text-gray-800 text-base leading-relaxed">
                Many thanks,
                <br />
                Chris & Graham
                <br />
                <span className="text-teal-700 font-medium">
                  Commercial Shot Blasting
                </span>
              </p>
            </div>
          </div>

          {/* Chat on WhatsApp Button */}
          <div className="p-4 bg-gray-50">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-4 px-6 rounded-full flex items-center justify-center gap-3 transition-colors shadow-md hover:shadow-lg"
            >
              <svg
                viewBox="0 0 32 32"
                className="h-6 w-6"
                fill="currentColor"
              >
                <path d="M16 0C7.164 0 0 7.164 0 16c0 2.828 0.74 5.484 2.028 7.788L0.084 31.912l8.34-2.188C10.656 30.96 13.272 32 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.344c-2.508 0-4.872-0.696-6.88-1.908l-0.492-0.292-5.108 1.34 1.364-4.988-0.32-0.512C3.084 21.004 2.344 18.564 2.344 16c0-7.536 6.12-13.656 13.656-13.656S29.656 8.464 29.656 16 23.536 29.344 16 29.344zm7.48-10.216c-0.408-0.204-2.416-1.192-2.792-1.328-0.376-0.136-0.648-0.204-0.92 0.204s-1.056 1.328-1.296 1.6c-0.24 0.272-0.48 0.308-0.888 0.104-0.408-0.204-1.72-0.632-3.276-2.02-1.212-1.08-2.028-2.412-2.268-2.82s-0.024-0.628 0.18-0.832c0.184-0.184 0.408-0.48 0.612-0.72 0.204-0.24 0.272-0.408 0.408-0.68 0.136-0.272 0.068-0.512-0.032-0.72-0.104-0.204-0.92-2.216-1.26-3.036-0.332-0.796-0.668-0.688-0.92-0.7-0.236-0.012-0.508-0.016-0.78-0.016s-0.72 0.104-1.096 0.512c-0.376 0.408-1.436 1.404-1.436 3.42s1.472 3.968 1.676 4.24c0.204 0.272 2.828 4.316 6.852 6.052 0.956 0.412 1.704 0.66 2.288 0.844 0.964 0.308 1.84 0.264 2.532 0.16 0.772-0.116 2.416-0.988 2.756-1.94 0.34-0.952 0.34-1.768 0.24-1.94-0.104-0.172-0.376-0.272-0.784-0.476z" />
              </svg>
              <span className="text-lg">Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
