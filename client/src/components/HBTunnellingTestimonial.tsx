import { Quote } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { ScrollReveal } from "@/components/ScrollReveal";

type TestimonialVariant = "case-study" | "service" | "confirmation";

interface HBTunnellingTestimonialProps {
  variant?: TestimonialVariant;
}

const VARIANT_CLASSES: Record<TestimonialVariant, string> = {
  "case-study": "border-[#2c5f7f]/20 bg-white p-7 shadow-sm md:p-9",
  service: "border-[#2C5F7F]/20 bg-[#eaf3f6] p-6 md:p-8",
  confirmation: "border-[#2C5F7F]/20 bg-[#2C5F7F]/5 p-4 text-left",
};

export function HBTunnellingTestimonial({ variant = "case-study" }: HBTunnellingTestimonialProps) {
  const { data: testimonials } = trpc.testimonials.list.useQuery();
  const testimonial = testimonials?.find((item) => item.company === "HB Tunnelling Limited");

  if (!testimonial) return null;

  const compact = variant === "confirmation";

  return (
    <ScrollReveal duration={500} threshold={0.12} rootMargin="0px 0px -24px 0px">
      <section className={`rounded-2xl border ${VARIANT_CLASSES[variant]}`} aria-labelledby="hb-tunnelling-testimonial-heading">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <img
              src="/manus-storage/hb-tunnelling-logo-official_1acf5938.png"
              alt="HB Tunnelling logo"
              width="400"
              height="400"
              className={`${compact ? "h-10 w-10" : "h-16 w-16"} rounded-full bg-white object-contain p-1 shadow-sm`}
            />
            <Quote className={`mt-2 ${compact ? "h-6 w-6" : "h-8 w-8"} text-[#b48324]`} aria-hidden="true" />
          </div>
        <div className="min-w-0">
          <p className={`font-bold uppercase tracking-[0.14em] text-[#2c5f7f] ${compact ? "text-[0.65rem]" : "text-xs"}`}>
            Client testimonial
          </p>
          <h2 id="hb-tunnelling-testimonial-heading" className={`mt-2 font-bold text-[#183c52] ${compact ? "text-base" : "text-2xl md:text-3xl"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
            {compact ? "What a warehouse-refurbishment client said" : "What HB Tunnelling said about the completed work"}
          </h2>
          <blockquote className={`mt-4 whitespace-pre-line leading-relaxed text-slate-700 ${compact ? "text-sm" : "text-base md:text-lg"}`}>
            {testimonial.text}
          </blockquote>
          <footer className="mt-5">
            <p className="font-semibold text-[#183c52]">— {testimonial.name}</p>
            <p className="text-sm text-slate-600">{testimonial.company}</p>
          </footer>
          {!compact && (
            <Link href="/case-studies/hb-tunnelling-doncaster" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2c5f7f] hover:text-[#183c52] hover:underline">
              Read the HB Tunnelling project case study
            </Link>
          )}
        </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
