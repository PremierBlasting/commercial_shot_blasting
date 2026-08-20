import { Link } from "wouter";
import { ArrowRight, BookOpen, ClipboardList } from "lucide-react";
import { getIndustryPillarResources } from "@shared/industryPillarResources";

export function IndustryPillarResources({ industrySlug, industryName }: { industrySlug: string; industryName: string }) {
  const resources = getIndustryPillarResources(industrySlug);

  if (!resources.length) return null;

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200" aria-labelledby={`industry-planning-${industrySlug}`}>
      <div className="container">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-[#2C5F7F] font-semibold text-sm uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Commercial planning resources
          </div>
          <h2 id={`industry-planning-${industrySlug}`} className="text-3xl font-bold text-slate-900">Plan {industryName.toLowerCase()} surface preparation</h2>
          <p className="mt-3 text-slate-600">Use these specialist hubs to define the asset, access, surface condition, coating handover, and programme information needed before a Site Visit.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource.href} className="rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#2C5F7F]/40 hover:shadow-md">
              <Link href={resource.href} className="group block p-6">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2C5F7F]">{resource.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{resource.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2C5F7F]">Explore planning hub <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
              <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4">
                <p className="flex gap-2 text-xs leading-5 text-slate-600"><ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-[#2C5F7F]" aria-hidden="true" /><span><strong className="text-slate-800">For a focused Site Visit, tell us:</strong> {resource.enquiryPrompt}</span></p>
                <Link href="/site-survey" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#2C5F7F] hover:underline">Request a Site Visit <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
