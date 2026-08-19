import { Link } from "wouter";
import { ArrowRight, BookOpen } from "lucide-react";
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
            <Link key={resource.href} href={resource.href} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2C5F7F]/40 hover:shadow-md">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2C5F7F]">{resource.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{resource.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2C5F7F]">Explore planning hub <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
