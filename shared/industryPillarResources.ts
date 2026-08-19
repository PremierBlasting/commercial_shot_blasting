export type IndustryPillarResource = {
  title: string;
  href: string;
  description: string;
};

const resourcesByIndustry: Record<string, IndustryPillarResource[]> = {
  agriculture: [
    {
      title: "Agricultural Steelwork & Grain Store Planning",
      href: "/agricultural-steelwork-grain-store-preparation",
      description: "Planning guidance for agricultural steelwork, farm equipment, grain-store structures, access, surface condition, and coating handover.",
    },
  ],
  construction: [
    {
      title: "Steel Fabrication & Structural Steel Planning",
      href: "/steel-fabrication-surface-preparation",
      description: "Define structural-steel scope, fabrication details, coating handover, access, and programme inputs before a Site Visit.",
    },
    {
      title: "Steel Chimney & Process Stack Planning",
      href: "/steel-chimney-process-stack-surface-preparation",
      description: "A planning route for fabricated chimney sections, flues, stacks, access openings, and coating readiness.",
    },
  ],
  manufacturing: [
    {
      title: "Steel Fabrication & Structural Steel Planning",
      href: "/steel-fabrication-surface-preparation",
      description: "Guidance for fabricated steelwork, mill scale, coatings, handling, and programme planning.",
    },
    {
      title: "Process Pipework & Spools Planning",
      href: "/process-pipework-spools-surface-preparation",
      description: "A resource for pipework, support steelwork, isolation, access, and coating handover discussions.",
    },
    {
      title: "Factory Cladding Restoration Planning",
      href: "/factory-cladding-restoration",
      description: "Planning support for profiled steel cladding, existing coatings, access, and refurbishment sequencing.",
    },
  ],
  marine: [
    {
      title: "Process Pipework & Spools Planning",
      href: "/process-pipework-spools-surface-preparation",
      description: "A planning route for pipework, support steelwork, access, condition assessment, and coating handover.",
    },
    {
      title: "Industrial Steelwork Restoration Planning",
      href: "/industrial-steelwork-restoration",
      description: "A specialist planning hub for corrosion preparation across industrial steelwork, access systems, containers, and plant.",
    },
  ],
};

export function getIndustryPillarResources(industrySlug: string): IndustryPillarResource[] {
  return resourcesByIndustry[industrySlug] ?? [];
}
