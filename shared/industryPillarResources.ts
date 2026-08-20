export type IndustryPillarResource = {
  title: string;
  href: string;
  description: string;
  enquiryPrompt: string;
};

const resourcesByIndustry: Record<string, IndustryPillarResource[]> = {
  agriculture: [
    {
      title: "Agricultural Steelwork & Grain Store Planning",
      href: "/agricultural-steelwork-grain-store-preparation",
      description: "Planning guidance for agricultural steelwork, farm equipment, grain-store structures, access, surface condition, and coating handover.",
      enquiryPrompt: "the assets or building components, their condition, access, the seasonal window, and the intended next coating stage.",
    },
  ],
  construction: [
    {
      title: "Steel Fabrication & Structural Steel Planning",
      href: "/steel-fabrication-surface-preparation",
      description: "Define structural-steel scope, fabrication details, coating handover, access, and programme inputs before a Site Visit.",
      enquiryPrompt: "drawings, quantities, coating requirements, access arrangements, and the required handover sequence.",
    },
    {
      title: "Steel Chimney & Process Stack Planning",
      href: "/steel-chimney-process-stack-surface-preparation",
      description: "A planning route for fabricated chimney sections, flues, stacks, access openings, and coating readiness.",
      enquiryPrompt: "section dimensions, openings, lifting details, surface condition, and the intended coating or next fabrication stage.",
    },
  ],
  manufacturing: [
    {
      title: "Steel Fabrication & Structural Steel Planning",
      href: "/steel-fabrication-surface-preparation",
      description: "Guidance for fabricated steelwork, mill scale, coatings, handling, and programme planning.",
      enquiryPrompt: "the component schedule, current surface condition, handling plan, coating specification, and programme constraints.",
    },
    {
      title: "Process Pipework & Spools Planning",
      href: "/process-pipework-spools-surface-preparation",
      description: "A resource for pipework, support steelwork, isolation, access, and coating handover discussions.",
      enquiryPrompt: "line or spool references, isolation status, operating constraints, access, and the intended coating handover.",
    },
    {
      title: "Factory Cladding Restoration Planning",
      href: "/factory-cladding-restoration",
      description: "Planning support for profiled steel cladding, existing coatings, access, and refurbishment sequencing.",
      enquiryPrompt: "elevation photographs, existing coating condition, working height, operational constraints, and the proposed recoating sequence.",
    },
    {
      title: "Container Restoration & Storage Steelwork Planning",
      href: "/container-restoration-storage-steelwork",
      description: "A planning route for steel container fleets, storage units, corrosion review, access, and recoating preparation.",
      enquiryPrompt: "container quantities, dimensions, door and frame condition, corrosion, access, and the intended recoating sequence.",
    },
  ],
  marine: [
    {
      title: "Process Pipework & Spools Planning",
      href: "/process-pipework-spools-surface-preparation",
      description: "A planning route for pipework, support steelwork, access, condition assessment, and coating handover.",
      enquiryPrompt: "asset references, access, operating interfaces, surface condition, and the required coating handover.",
    },
    {
      title: "Industrial Steelwork Restoration Planning",
      href: "/industrial-steelwork-restoration",
      description: "A specialist planning hub for corrosion preparation across industrial steelwork, access systems, containers, and plant.",
      enquiryPrompt: "the asset type, corrosion or coating condition, access, operational environment, and desired protective outcome.",
    },
  ],
};

export function getIndustryPillarResources(industrySlug: string): IndustryPillarResource[] {
  return resourcesByIndustry[industrySlug] ?? [];
}
