import { drizzle } from "drizzle-orm/mysql2";
import { pageContentSections } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const homeSections = [
  {
    pageSlug: "home",
    sectionKey: "hero",
    sectionType: "hero",
    sortOrder: 1,
    isActive: true,
    content: JSON.stringify({
      title: "Professional Commercial Shot Blasting Services",
      subtitle: "Specialist precision shot blasting company in the UK, removing rust, scale, and coatings from all types of surfaces. Transform your surfaces with our expert team.",
      backgroundImages: [
        "/ShotBlastingSteelBeams.png",
        "/operator-blasting-gate.png",
        "/operator-warehouse-interior.png",
        "/hero-carousel-1.webp",
        "/hero-carousel-2.webp",
        "/hero-carousel-3.webp",
        "/hero-carousel-4.webp",
        "/hero-carousel-5.webp",
        "/hero-carousel-6.webp",
        "/hero-carousel-7.webp",
        "/hero-carousel-8.webp",
        "/hero-carousel-9.webp",
        "/hero-carousel-10.webp",
        "/hero-carousel-11.webp"
      ],
      ctaButtons: [
        { text: "Get a Free Quote Today", type: "primary", action: "openQuote" },
        { text: "View Our Work", type: "outline", link: "/gallery" },
        { text: "Call Now", type: "outline", link: "tel:07970566409", icon: "phone" }
      ]
    })
  },
  {
    pageSlug: "home",
    sectionKey: "service-selector",
    sectionType: "interactive",
    sortOrder: 2,
    isActive: true,
    content: JSON.stringify({
      eyebrow: "Find Your Perfect Service",
      title: "Not Sure Which Service You Need?",
      description: "Answer a few quick questions and we'll recommend the best shot blasting services for your specific project requirements."
    })
  },
  {
    pageSlug: "home",
    sectionKey: "services-grid",
    sectionType: "grid",
    sortOrder: 3,
    isActive: true,
    content: JSON.stringify({
      eyebrow: "Our Expert Services",
      title: "Comprehensive Shot Blasting Solutions",
      services: [
        {
          title: "Structural Steel Frames",
          description: "Comprehensive shot blasting for building frames, roof trusses, and load-bearing steel structures. Prepare surfaces for galvanizing or protective coatings.",
          image: "/service-structural-steel.png",
          link: "/services/structural-steel-frames"
        },
        {
          title: "Fire Escapes & External Stair Towers",
          description: "Specialist surface preparation for fire safety infrastructure. Remove rust and corrosion, ensuring compliance with safety regulations.",
          image: "/service-fire-escapes.png",
          link: "/services/fire-escapes"
        },
        {
          title: "Internal Steel Staircases, Balustrades & Handrails",
          description: "Precision shot blasting for architectural metalwork. Restore heritage features or prepare new fabrications for finishing.",
          image: "/service-staircases.png",
          link: "/services/staircases"
        },
        {
          title: "Bridge Steelwork (Girders, Crossmembers, Parapet Rails)",
          description: "Comprehensive surface preparation for bridge infrastructure. Meet highway and railway bridge coating specifications.",
          image: "/service-bridge-steelwork.png",
          link: "/services/bridge-steelwork"
        },
        {
          title: "Crane Beams, Gantries & Runway Rails",
          description: "Specialist surface preparation for material handling infrastructure. Preserve dimensional tolerances while removing rust and coatings.",
          image: "/service-crane-beams.png",
          link: "/services/crane-beams"
        },
        {
          title: "Fixed Ladders & Step-Over Platforms",
          description: "Comprehensive surface preparation for industrial access systems. Ensure compliance with working at height regulations.",
          image: "/service-ladders.png",
          link: "/services/ladders"
        },
        {
          title: "Warehouse Racking & Pallet Rack Frames",
          description: "Professional shot blasting for warehouse racking systems, pallet rack frames, and storage infrastructure.",
          image: "/service-warehouse-racking.png",
          link: "/services/warehouse-racking"
        },
        {
          title: "Process Pipework, Spools & Manifolds",
          description: "Precision cleaning of industrial pipework systems. Ideal for food processing, pharmaceutical, and chemical industries.",
          image: "/service-pipework.png",
          link: "/services/pipework"
        },
        {
          title: "Telecom Masts & Lattice Towers",
          description: "Specialist shot blasting for telecommunications infrastructure including masts, lattice towers, and antenna supports.",
          image: "/service-telecom-tower.png",
          link: "/services/telecom-towers"
        }
      ]
    })
  },
  {
    pageSlug: "home",
    sectionKey: "about",
    sectionType: "text-image",
    sortOrder: 4,
    isActive: true,
    content: JSON.stringify({
      eyebrow: "Why Choose Us",
      title: "A Business You Can Trust",
      paragraphs: [
        "We are a trusted family-run business with the mission to provide superior shot blasting solutions for industrial and commercial environments across the UK. Our advanced shot blasting technology delivers exceptional results at competitive prices.",
        "As part of our commitment, we employ an expert team dedicated to providing unparalleled services while maintaining high safety standards that protect both your property and our environment."
      ],
      features: [
        { icon: "Shield", text: "Fully Insured" },
        { icon: "Award", text: "Industry Certified" },
        { icon: "Clock", text: "Fast Turnaround" },
        { icon: "Users", text: "Expert Team" }
      ],
      beforeAfterSlider: {
        beforeImage: "/warehouse-before.jpg",
        afterImage: "/warehouse-after.jpg",
        beforeLabel: "Before: Rusted & Corroded",
        afterLabel: "After: Shot Blasted"
      },
      badge: {
        number: "20+",
        text: "Years Experience"
      }
    })
  },
  {
    pageSlug: "home",
    sectionKey: "contact-cta",
    sectionType: "cta",
    sortOrder: 5,
    isActive: true,
    content: JSON.stringify({
      title: "Get Your Free Quote Today",
      description: "Contact us now for a no-obligation quote. Our expert team is ready to discuss your shot blasting requirements.",
      leftColumn: {
        title: "Why Choose Us?",
        benefits: [
          { icon: "Clock", text: "24-Hour Response Time" },
          { icon: "Shield", text: "Fully Insured & Certified" },
          { icon: "Award", text: "Competitive Pricing" },
          { icon: "MapPin", text: "Nationwide Coverage" }
        ]
      },
      contactInfo: [
        { icon: "Phone", label: "Phone", value: "07970 566409", link: "tel:07970566409" },
        { icon: "Mail", label: "Email", value: "info@commercialshotblasting.co.uk", link: "mailto:info@commercialshotblasting.co.uk" },
        { icon: "MapPin", label: "Service Area", value: "Nationwide UK Coverage" }
      ]
    })
  }
];

console.log("Initializing Home page content sections...");

for (const section of homeSections) {
  try {
    await db.insert(pageContentSections).values(section);
    console.log(`✓ Created section: ${section.sectionKey}`);
  } catch (error) {
    console.error(`✗ Failed to create section ${section.sectionKey}:`, error.message);
  }
}

console.log("Home page content initialization complete!");
process.exit(0);
