/**
 * Curated list of recently completed shot blasting projects.
 * Each project is tagged with one or more county slugs so town pages
 * can surface the 3 most geographically relevant case studies.
 */

export interface RecentProject {
  id: string;
  title: string;
  serviceSlug: string;
  serviceLabel: string;
  description: string;
  afterImage: string;
  beforeImage?: string;
  comparisonCaption?: string;
  galleryImages?: Array<{ src: string; caption: string }>;
  countySlugs: string[]; // county slugs this project is relevant to
  date: string; // display date e.g. "April 2025"
}

export const recentProjects: RecentProject[] = [
  {
    id: "structural-steel-staffordshire",
    title: "Structural Steel Frames — Industrial Unit",
    serviceSlug: "structural-steel-shot-blasting",
    serviceLabel: "Structural Steel Shot Blasting",
    description: "SA2.5 blast clean on 12 portal frame bays for a new industrial unit. Mill scale and fabrication residues removed ahead of intumescent coating.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3365_56728af1.webp",
    beforeImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3339_a869318b.webp",
    comparisonCaption: "Documented views from the same structural-steel project: failed paint and corrosion before preparation, followed by a clean profiled surface ready for protective coating.",
    galleryImages: [
      { src: "https://commercialshotblasting.co.uk/manus-storage/IMG_3339_a869318b.webp", caption: "Before: white paint with heavy rust patches on the structural steel column." },
      { src: "https://commercialshotblasting.co.uk/manus-storage/IMG_3292_7bee69d3.webp", caption: "During: two operators carrying out controlled blast cleaning with full PPE." },
      { src: "https://commercialshotblasting.co.uk/manus-storage/IMG_3335_66ca0def.webp", caption: "Preparation detail: freshly blasted column base with a uniform profile for coating adhesion." },
      { src: "https://commercialshotblasting.co.uk/manus-storage/IMG_3358_fa5ea2cf.webp", caption: "Site overview: multiple structural-steel bays prepared across the commercial unit." },
      { src: "https://commercialshotblasting.co.uk/manus-storage/IMG_3365_56728af1.webp", caption: "After: clean profiled structural steel ready for the protective coating system." },
    ],
    countySlugs: ["staffordshire", "west-midlands", "warwickshire", "worcestershire", "shropshire"],
    date: "March 2025",
  },
  {
    id: "factory-cladding-yorkshire",
    title: "Factory Cladding Restoration — Food Processing Plant",
    serviceSlug: "factory-cladding-shot-blasting",
    serviceLabel: "Factory Cladding Shot Blasting",
    description: "Plastisol and failed paint removed from 2,400 m² of profiled steel cladding. Surfaces prepared for 25-year coating system.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3343_ac1c8682.webp",
    countySlugs: ["south-yorkshire", "west-yorkshire", "greater-manchester", "merseyside", "cheshire"],
    date: "February 2025",
  },
  {
    id: "container-blasting-midlands",
    title: "Steel Container Fleet — Logistics Depot",
    serviceSlug: "container-shot-blasting",
    serviceLabel: "Container Shot Blasting",
    description: "Rust and old coatings removed from 18 shipping containers at a logistics depot. All containers returned to SA2.5 standard and recoated on-site.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3354_caa39ac3.webp",
    countySlugs: ["west-midlands", "staffordshire", "warwickshire", "leicestershire", "northamptonshire"],
    date: "January 2025",
  },
  {
    id: "bridge-steelwork-north",
    title: "Bridge Steelwork — Footbridge Refurbishment",
    serviceSlug: "structural-steel-shot-blasting",
    serviceLabel: "Structural Steel Shot Blasting",
    description: "Full SA3 blast clean on a 40-metre footbridge. All girders, crossmembers, and parapet rails prepared for a 3-coat protective system.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3356_0e439bba.webp",
    countySlugs: ["south-yorkshire", "west-yorkshire", "county-durham", "northumberland", "tyne-wear", "cumbria"],
    date: "December 2024",
  },
  {
    id: "floor-blasting-east",
    title: "Industrial Floor Preparation — Warehouse Extension",
    serviceSlug: "floor-shot-blasting",
    serviceLabel: "Floor Shot Blasting",
    description: "Concrete floor surface profiling across 3,200 m² of new warehouse extension. CSP 3–4 profile achieved for epoxy resin floor coating.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3291_59833f26.webp",
    countySlugs: ["cambridgeshire", "norfolk", "suffolk", "essex", "hertfordshire", "bedfordshire"],
    date: "November 2024",
  },
  {
    id: "fire-escape-northwest",
    title: "Fire Escape Restoration — Multi-Storey Office",
    serviceSlug: "fire-escape-shot-blasting",
    serviceLabel: "Fire Escape Shot Blasting",
    description: "Rust and failed coatings removed from a 6-storey external fire escape. Galvanizing prep completed over 3 days with building fully occupied.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3339_a869318b.webp",
    countySlugs: ["greater-manchester", "merseyside", "cheshire", "lancashire"],
    date: "October 2024",
  },
  {
    id: "pipework-south",
    title: "Pipework & Steelwork — Water Treatment Facility",
    serviceSlug: "pipework-shot-blasting",
    serviceLabel: "Pipework Shot Blasting",
    description: "External blast clean on 850 metres of process pipework and support steelwork. SA2.5 standard achieved for a 3-coat epoxy coating system.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3349_cb9e8c4d.webp",
    countySlugs: ["hampshire", "surrey", "oxfordshire", "berkshire", "wiltshire", "gloucestershire"],
    date: "September 2024",
  },
  {
    id: "racking-east-midlands",
    title: "Warehouse Racking — Distribution Centre",
    serviceSlug: "racking-shot-blasting",
    serviceLabel: "Warehouse Racking Shot Blasting",
    description: "Shot blasting of 4,000 pallet positions of warehouse racking in situ. Rust and old powder coat removed; surfaces prepared for re-powder coating.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3340_d53be3b8.webp",
    countySlugs: ["nottinghamshire", "derbyshire", "leicestershire", "lincolnshire", "northamptonshire"],
    date: "August 2024",
  },
  {
    id: "agricultural-equipment-midlands",
    title: "Agricultural Equipment — Farm Machinery Fleet",
    serviceSlug: "agricultural-shot-blasting",
    serviceLabel: "Agricultural Shot Blasting",
    description: "Rust removal and surface preparation on 14 pieces of farm machinery including trailers, ploughs, and spreaders. All prepared for protective coating.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3334_2858c684.webp",
    countySlugs: ["shropshire", "herefordshire", "worcestershire", "staffordshire", "warwickshire"],
    date: "July 2024",
  },
  {
    id: "heritage-restoration-south",
    title: "Heritage Steelwork — Victorian Railway Bridge",
    serviceSlug: "heritage-shot-blasting",
    serviceLabel: "Heritage Shot Blasting",
    description: "Careful SA2.5 blast clean on a Grade II listed Victorian railway bridge. Decorative ironwork preserved; surfaces prepared for heritage-matched coating.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3350_31ece4f3.webp",
    countySlugs: ["gloucestershire", "wiltshire", "somerset", "north-devon", "bristol"],
    date: "June 2024",
  },
  {
    id: "telecom-tower-north",
    title: "Telecom Tower — Mobile Mast Refurbishment",
    serviceSlug: "telecom-tower-shot-blasting",
    serviceLabel: "Telecom Tower Shot Blasting",
    description: "Full blast clean on a 45-metre telecom mast and associated steelwork. SA2.5 standard achieved; surfaces prepared for zinc-rich primer system.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3353_30cb94a2.webp",
    countySlugs: ["northumberland", "county-durham", "tyne-wear", "cumbria", "south-yorkshire"],
    date: "May 2024",
  },
  {
    id: "machinery-east-england",
    title: "Plant & Machinery — Paper Mill Refurbishment",
    serviceSlug: "machinery-shot-blasting",
    serviceLabel: "Plant & Machinery Shot Blasting",
    description: "Blast clean on 22 pieces of paper mill machinery during planned shutdown. All surfaces prepared to SA2.5 for epoxy coating before recommissioning.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3346_8ac6e144.webp",
    countySlugs: ["norfolk", "suffolk", "cambridgeshire", "essex", "lincolnshire"],
    date: "April 2024",
  },
  {
    id: "school-steelwork-bucks",
    title: "School Extension Steelwork — Academy Building",
    serviceSlug: "structural-steel-shot-blasting",
    serviceLabel: "Structural Steel Shot Blasting",
    description: "SA2.5 blast clean on 8 portal frames and 120 metres of purlins for a new school sports hall extension. Fabrication primer removed ahead of intumescent coating.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3363_b23b32da.webp",
    countySlugs: ["buckinghamshire", "hertfordshire", "bedfordshire", "oxfordshire", "berkshire"],
    date: "March 2024",
  },
  {
    id: "wind-turbine-durham",
    title: "Wind Turbine Tower Sections — Renewable Energy Site",
    serviceSlug: "structural-steel-shot-blasting",
    serviceLabel: "Structural Steel Shot Blasting",
    description: "Full SA3 blast clean on 6 tubular tower sections (18 m each) at a wind farm maintenance depot. Mill scale and weathering removed for zinc thermal spray.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3355_362d1f7f.webp",
    countySlugs: ["durham", "county-durham", "northumberland", "tyne-and-wear", "cumbria"],
    date: "February 2024",
  },
  {
    id: "factory-cladding-wales",
    title: "Factory Cladding — Food Processing Facility",
    serviceSlug: "factory-cladding-shot-blasting",
    serviceLabel: "Factory Cladding Shot Blasting",
    description: "Plastisol removal from 1,800 m² of profiled steel cladding at a dairy processing plant. Panels prepared for polyester powder-coat recoating system.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3341_2a6bee76.webp",
    countySlugs: ["east-wales", "gloucestershire", "herefordshire", "shropshire", "somerset"],
    date: "January 2024",
  },
  {
    id: "shipyard-crane-tyneside",
    title: "Shipyard Crane Refurbishment — Port Facility",
    serviceSlug: "machinery-shot-blasting",
    serviceLabel: "Plant & Machinery Shot Blasting",
    description: "Blast clean on a 35-tonne gantry crane including jib, trolley, and support legs. Heavy corrosion and marine paint removed to SA2.5 for epoxy primer system.",
    afterImage: "https://commercialshotblasting.co.uk/manus-storage/IMG_3358_fa5ea2cf.webp",
    countySlugs: ["tyne-and-wear", "tyne-wear", "northumberland", "county-durham", "durham"],
    date: "December 2023",
  },
];

/**
 * Get up to `limit` projects relevant to a given county slug.
 * Falls back to the first `limit` projects if none match.
 */
export function getProjectsForCounty(countySlug: string, limit = 3): RecentProject[] {
  const matches = recentProjects.filter(p => p.countySlugs.includes(countySlug));
  if (matches.length >= limit) return matches.slice(0, limit);
  // Pad with non-matching projects
  const others = recentProjects.filter(p => !p.countySlugs.includes(countySlug));
  return [...matches, ...others].slice(0, limit);
}
