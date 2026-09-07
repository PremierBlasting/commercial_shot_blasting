import { ArrowRight } from "lucide-react";
import { priorityTownCommercialContent } from "@shared/priorityLocalSeoContent";

export function PriorityLocalCommercialContext({ locationSlug }: { locationSlug: string }) {
  const content = priorityTownCommercialContent[locationSlug];
  if (!content) return null;

  return (
    <section className="border-y border-[#2C5F7F]/10 bg-[#eef7fa] py-14" aria-label={`${content.title} in ${locationSlug}`}>
      <div className="container">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2C5F7F]">{content.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold text-[#1a3d52] md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>{content.title}</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-slate-700">
            {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {content.links.map((link) => (
              <a key={link.href} href={link.href} className="group rounded-xl border border-[#2C5F7F]/15 bg-white p-5 no-underline transition hover:-translate-y-0.5 hover:border-[#2C5F7F] hover:shadow-md">
                <span className="block font-bold text-[#1a3d52] group-hover:text-[#2C5F7F]">{link.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-slate-600">{link.description}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2C5F7F]">Explore route <ArrowRight className="h-4 w-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
