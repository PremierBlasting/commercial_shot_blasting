import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { formatUTMForSubmission } from "@/lib/utm";
import { CheckCircle, Flame, Ruler, Building2, Phone } from "lucide-react";

interface IntumescentQuoteFormProps {
  onOpenQuotePopup: () => void;
}

const FIRE_RATINGS = ["R30", "R60", "R90", "R120", "Not sure — need advice"];
const STEEL_TYPES = [
  "Structural steel frames",
  "Fire escapes / external staircases",
  "Internal staircases",
  "Mezzanine floors / platforms",
  "Portal frames",
  "Steel columns / beams",
  "Other",
];
const PROJECT_SIZES = [
  "Small (< 50 m²)",
  "Medium (50–200 m²)",
  "Large (200–500 m²)",
  "Very large (> 500 m²)",
  "Not sure yet",
];

export function IntumescentQuoteForm({ onOpenQuotePopup }: IntumescentQuoteFormProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [fireRating, setFireRating] = useState("");
  const [steelType, setSteelType] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => setStep("success"),
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Please enter a valid email";
    if (!phone.trim()) e.phone = "Please enter a phone number";
    if (!fireRating) e.fireRating = "Please select a fire resistance rating";
    if (!steelType) e.steelType = "Please select a steel type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const message = [
      `Intumescent Painting Quote Request`,
      `Fire resistance rating: ${fireRating}`,
      `Steel type: ${steelType}`,
      `Project size: ${projectSize || "Not specified"}`,
      `Location: ${location || "Not specified"}`,
    ].join("\n");
    const utmData = formatUTMForSubmission();
    submitContact.mutate({
      name,
      email,
      phone,
      message,
      sourcePage: typeof window !== 'undefined' ? window.location.href : undefined,
      locationName: location || undefined,
      utmData: Object.keys(utmData).length > 0 ? utmData : undefined,
    });
  };

  if (step === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Quote Request Received</h3>
        <p className="text-gray-600 mb-4">
          Thank you, {name}. We'll review your intumescent painting requirements and get back to you within 24 hours.
        </p>
        <p className="text-sm text-gray-500">
          Need to speak to someone now?{" "}
          <a href="tel:07476916578" className="text-[#2C5F7F] font-semibold hover:underline">
            Call 07476 916578
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#2C5F7F]/20 bg-gradient-to-br from-[#2C5F7F]/5 to-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#2C5F7F] text-white px-6 py-5 flex items-center gap-3">
        <Flame className="w-6 h-6 text-orange-300 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get a Free Intumescent Painting Quote
          </h3>
          <p className="text-sm text-white/80">
            Tell us about your project — we'll respond within 24 hours
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Fire Resistance Rating */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Flame className="w-4 h-4 text-[#2C5F7F]" />
            Fire Resistance Rating Required
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {FIRE_RATINGS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFireRating(r)}
                className={`text-sm px-3 py-2 rounded-lg border transition-colors text-left ${
                  fireRating === r
                    ? "bg-[#2C5F7F] text-white border-[#2C5F7F]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#2C5F7F]/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          {errors.fireRating && <p className="text-red-500 text-xs mt-1">{errors.fireRating}</p>}
        </div>

        {/* Steel Type */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Building2 className="w-4 h-4 text-[#2C5F7F]" />
            Type of Steelwork
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STEEL_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSteelType(t)}
                className={`text-sm px-3 py-2 rounded-lg border transition-colors text-left ${
                  steelType === t
                    ? "bg-[#2C5F7F] text-white border-[#2C5F7F]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#2C5F7F]/50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.steelType && <p className="text-red-500 text-xs mt-1">{errors.steelType}</p>}
        </div>

        {/* Project Size */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Ruler className="w-4 h-4 text-[#2C5F7F]" />
            Approximate Project Size
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PROJECT_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setProjectSize(s)}
                className={`text-sm px-3 py-2 rounded-lg border transition-colors text-left ${
                  projectSize === s
                    ? "bg-[#2C5F7F] text-white border-[#2C5F7F]"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#2C5F7F]/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className={`w-full text-sm px-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30 ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
              <Phone className="w-3.5 h-3.5" /> Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07xxx xxxxxx"
              className={`w-full text-sm px-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30 ${
                errors.phone ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.co.uk"
              className={`w-full text-sm px-3 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30 ${
                errors.email ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Project Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Birmingham, West Midlands"
              className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="submit"
            disabled={submitContact.isPending}
            className="flex-1 bg-[#2C5F7F] hover:bg-[#1e4a63] text-white font-semibold py-3"
          >
            {submitContact.isPending ? "Sending…" : "Request Free Quote"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onOpenQuotePopup}
            className="flex-1 border-[#2C5F7F] text-[#2C5F7F] hover:bg-[#2C5F7F]/5 font-semibold py-3"
          >
            Use Full Quote Form
          </Button>
        </div>

        {submitContact.isError && (
          <p className="text-red-500 text-sm text-center">
            Something went wrong. Please try again or call us on{" "}
            <a href="tel:07476916578" className="underline">07476 916578</a>.
          </p>
        )}
      </form>
    </div>
  );
}
