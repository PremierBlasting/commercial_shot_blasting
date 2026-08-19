export type CountyPillarResource = {
  title: string;
  href: string;
  description: string;
};

const waterTreatmentCountySlugs = new Set([
  "hampshire",
  "surrey",
  "oxfordshire",
  "berkshire",
  "wiltshire",
  "gloucestershire",
]);

const factoryCladdingCountySlugs = new Set([
  "south-yorkshire",
  "west-yorkshire",
  "greater-manchester",
  "merseyside",
  "cheshire",
]);

export function getCountyPillarResources(countySlug: string, industries: string[] = []): CountyPillarResource[] {
  const industryText = industries.join(" ").toLowerCase();
  const resources: CountyPillarResource[] = [];

  if (/(manufacturing|engineering|construction|aerospace|defence)/.test(industryText)) {
    resources.push({
      title: "Steel Fabrication & Structural Steel Planning",
      href: "/steel-fabrication-surface-preparation",
      description: "Define fabricated-steel scope, coating handover, access, and programme inputs before requesting a Site Visit.",
    });
  }

  if (factoryCladdingCountySlugs.has(countySlug)) {
    resources.push({
      title: "Factory Cladding Restoration Planning",
      href: "/factory-cladding-restoration",
      description: "A planning hub for profiled steel cladding, coating removal, access, and refurbishment sequencing.",
    });
  }

  if (waterTreatmentCountySlugs.has(countySlug)) {
    resources.push({
      title: "Process Pipework & Spools Planning",
      href: "/process-pipework-spools-surface-preparation",
      description: "Planning guidance for process pipework, support steelwork, isolation, access, and coating-system handover.",
    });
  }

  if (/(industrial plant|manufacturing|engineering|chemical|marine|aerospace|defence)/.test(industryText)) {
    resources.push({
      title: "Industrial Steelwork Restoration Planning",
      href: "/industrial-steelwork-restoration",
      description: "A specialist resource for corrosion preparation across industrial steelwork, plant, access systems, and containers.",
    });
  }

  return resources;
}
