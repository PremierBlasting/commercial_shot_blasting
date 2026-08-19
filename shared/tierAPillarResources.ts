import { TIER_A_LOCATION_SLUGS } from "./locationSeoTiers";

export type TierAPillarResource = {
  title: string;
  href: string;
  description: string;
};

const coreResources: TierAPillarResource[] = [
  {
    title: "Steel Fabrication & Structural Steel Planning",
    href: "/steel-fabrication-surface-preparation",
    description: "Guidance for fabricated steelwork, structural frames, coatings, and pre-enquiry scope planning.",
  },
  {
    title: "Factory Cladding Restoration Planning",
    href: "/factory-cladding-restoration",
    description: "A planning hub for profiled steel cladding, failed coatings, access, and refurbishment sequencing.",
  },
  {
    title: "Industrial Steelwork Restoration Planning",
    href: "/industrial-steelwork-restoration",
    description: "A specialist route for corrosion preparation across industrial steelwork, plant, access systems, and containers.",
  },
];

const chimneyResource: TierAPillarResource = {
  title: "Steel Chimney & Process Stack Planning",
  href: "/steel-chimney-process-stack-surface-preparation",
  description: "Planning guidance for fabricated chimneys, stacks, flues, access openings, and coating handover.",
};

export function getTierAPillarResources(locationSlug: string, industries: string[] = []): TierAPillarResource[] {
  if (!TIER_A_LOCATION_SLUGS.has(locationSlug)) return [];

  const normalisedIndustries = industries.join(" ").toLowerCase();
  const resources = [...coreResources];
  if (/(energy|nuclear|engineering|manufacturing)/.test(normalisedIndustries)) {
    resources.push(chimneyResource);
  }
  return resources;
}
