import type { LocationData } from "@shared/locationData";

const locations: Record<string, LocationData> = {
  "bolton": {
    name: "Bolton",
    slug: "bolton",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Shot Blasting in Bolton, Greater Manchester. Professional surface preparation & rust removal. Expert commercial blasting. Call 07721 375756",
    spotlightText: "Bolton’s industrial heart around Middlebrook Business Park (Horwich) and Lostock Industrial Estate supports a high concentration of steel fabrication, engineering and logistics firms, with frequent warehouse fit-outs and commercial construction projects located adjacent to J6 of the M61 and with easy access onto the M60/M62 corridor. Local manufacturers and contractors commonly specify shot blasting for heavy structural steelwork, machinery refurbishment and abrasive floor preparation on large warehouse slabs and fabrication shop floors during plant refits, new-build industrial shells and ongoing maintenance across the borough.",
    faqs: [
      { question: "Do you provide shot blasting services in Bolton?", answer: "Yes, we provide comprehensive mobile shot blasting services throughout Bolton and the surrounding Greater Manchester area. Our fully equipped units can reach any location." },
      { question: "How quickly can you reach Bolton?", answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Bolton within 2-5 working days. For urgent projects, we can often accommodate faster response times." },
      { question: "What surfaces can you blast in Bolton?", answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our equipment is suitable for both indoor and outdoor applications." },
      { question: "Do you offer free quotes in Bolton?", answer: "Yes, we provide free, no-obligation quotations for all projects in Bolton. Call us on 07721 375756 or request a quote through our website to discuss your requirements." },
    ]
  },
  "manchester": {
    name: "Manchester",
    slug: "manchester",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    uniqueFaqs: [
      { question: "Do you blast structural steel for automotive suppliers near Manchester?", answer: "We regularly shot blast structural steel for automotive suppliers across Manchester, including fabricators serving Trafford Park and Openshaw supply chains. Our work covers chassis subframes, conveyor supports and heavy brackets for Tier‑1/2 manufacturers, with ISO 8501 preparation, profile measurement and on-site mobile blasting for tight factory bays in NOMA and Salford Dock areas. We coordinate with site managers and the highways network (M60/M62) for deliveries and environmental controls. Call 07721 375756" },
      { question: "Can you carry out blasting at Trafford Park industrial estate?", answer: "Yes — we routinely carry out on‑site and in‑workshop blasting across Trafford Park industrial estate, the UK’s largest manufacturing and logistics park. Our teams hold site inductions for operators at Peel Group locations, coordinate with Trafford Park estate management and make use of secure yards near the Manchester Ship Canal for large steelwork. We schedule works to suit shift patterns on the M60/M62 corridor, controlling dust and noise to meet local EA and council guidelines. Call 07721 375756" },
      { question: "Do you cover neighbouring towns like Stockport and Bolton from Manchester?", answer: "Yes — our Manchester depot covers neighbouring towns including Stockport, Bolton and Wigan, plus Rochdale, Oldham, Bury and Altrincham. We mobilise mobile blast teams to logistics hubs in Trafford Park and Salford Quays and collect items from food processing plants in Openshaw and Urmston for workshop work. Proximity to the M60, M62 and Manchester Piccadilly rail links lets us offer rapid turnaround and secure transport for plant and machinery. Call 07721 375756" }
    ],
    description: "Shot Blasting in Manchester, Greater Manchester. Professional surface preparation & rust removal. Expert commercial blasting. Call 07721 375756",
    spotlightText: "Manchester's industrial heartland around Trafford Park and Port Salford supports heavy engineering, steel fabrication, automotive suppliers, large-scale logistics and food-processing operations, driving steady demand for industrial surface preparation. With major freight infrastructure including the Trafford Park Euroterminal, the Manchester Ship Canal and easy access to the M60 orbital, our site teams regularly undertake structural steel grit blasting and refurbishment, heavy machinery surface cleaning and concrete floor preparation for warehouse and manufacturing fit-outs across Trafford Park and the Port Salford corridor.",
    faqs: [
      { question: "Do you provide shot blasting services in Manchester?", answer: "Yes, we provide comprehensive mobile shot blasting services throughout Manchester and the surrounding Greater Manchester area. Our fully equipped units can reach any location." },
      { question: "How quickly can you reach Manchester?", answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Manchester within 2-5 working days. For urgent projects, we can often accommodate faster response times." },
      { question: "What surfaces can you blast in Manchester?", answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our equipment is suitable for both indoor and outdoor applications." },
      { question: "Do you offer free quotes in Manchester?", answer: "Yes, we provide free, no-obligation quotations for all projects in Manchester. Call us on 07721 375756 or request a quote through our website to discuss your requirements." },
    ]
  },
  "oldham": {
    name: "Oldham",
    slug: "oldham",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Shot Blasting in Oldham, Greater Manchester. Professional surface preparation & rust removal. Expert commercial blasting. Call 07721 375756",
    spotlightText: "Oldham’s industrial districts around Foxdenton Business Park and Hollinwood Industrial Estate host a strong cluster of steel fabrication, engineering and logistics firms supporting regional construction and manufacturing projects. With direct access via M60 Junction 23 (Hollinwood) onto the M62 freight corridor and fast routes to Trafford Park and the Port of Liverpool, clients routinely require on-site shot blasting for structural steelwork, heavy machinery refurbishment and industrial floor preparation in fabrication yards and workshop refurbishments. Our local experience aligns with the borough’s ongoing commercial construction and warehouse refit activity.",
    faqs: [
      { question: "Do you provide shot blasting services in Oldham?", answer: "Yes, we provide comprehensive mobile shot blasting services throughout Oldham and the surrounding Greater Manchester area. Our fully equipped units can reach any location." },
      { question: "How quickly can you reach Oldham?", answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Oldham within 2-5 working days. For urgent projects, we can often accommodate faster response times." },
      { question: "What surfaces can you blast in Oldham?", answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our equipment is suitable for both indoor and outdoor applications." },
      { question: "Do you offer free quotes in Oldham?", answer: "Yes, we provide free, no-obligation quotations for all projects in Oldham. Call us on 07721 375756 or request a quote through our website to discuss your requirements." },
    ]
  },
  "rochdale": {
    name: "Rochdale",
    slug: "rochdale",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Shot Blasting in Rochdale, Greater Manchester. Professional surface preparation & rust removal. Expert commercial blasting. Call 07721 375756",
    spotlightText: "Rochdale’s industrial hinterland around Kingsway Business Park and the Pilsworth Industrial Estate supports a dense manufacturing, steel fabrication and logistics cluster serving construction and plant-hire clients across the borough. With direct links onto the A627(M) for fast access to the M62 corridor, we regularly provide shot blasting for structural steelwork, heavy machinery refurbishment and industrial concrete floor preparation for new-build units, maintenance yards and canal-side engineering workshops across local estates such as Kingsway and Pilsworth.",
    faqs: [
      { question: "Do you provide shot blasting services in Rochdale?", answer: "Yes, we provide comprehensive mobile shot blasting services throughout Rochdale and the surrounding Greater Manchester area. Our fully equipped units can reach any location." },
      { question: "How quickly can you reach Rochdale?", answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Rochdale within 2-5 working days. For urgent projects, we can often accommodate faster response times." },
      { question: "What surfaces can you blast in Rochdale?", answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our equipment is suitable for both indoor and outdoor applications." },
      { question: "Do you offer free quotes in Rochdale?", answer: "Yes, we provide free, no-obligation quotations for all projects in Rochdale. Call us on 07721 375756 or request a quote through our website to discuss your requirements." },
    ]
  ,
    uniqueFaqs: [{"question": "Can you provide shot blasting services for plant and machinery located at Kingsway Business Park in Rochdale?", "answer": "Yes, we frequently work with businesses located at Kingsway Business Park and other industrial estates across Rochdale. Our shot blasting services are ideal for preparing plant and machinery for repainting or maintenance, ensuring optimal surface adhesion and longevity. We can accommodate various sizes of equipment, from smaller components to large industrial machinery."}, {"question": "Do you offer shot blasting for structural steelwork used in construction projects near the M62 corridor in Rochdale?", "answer": "Absolutely. We specialize in preparing structural steelwork for new builds and refurbishment projects, particularly those strategically located near the M62 corridor for excellent transport links. Our shot blasting removes rust, mill scale, and old coatings, providing a clean profile ready for protective treatments. For urgent inquiries regarding your project, please call us on 07721 375756."}, {"question": "We operate a logistics and distribution centre in Rochdale; can you assist with shot blasting for our container fleet or warehouse cladding?", "answer": "Yes, we regularly provide shot blasting for logistics companies in Rochdale, including those with large container fleets and extensive warehouse facilities. Our services are perfect for preparing containers for rebranding or refurbishment, and for cleaning and preparing metal cladding on industrial buildings. This ensures a durable finish that can withstand the demanding environment of a busy distribution hub."}]},
  "salford": {
    name: "Salford",
    slug: "salford",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Shot Blasting in Salford, Greater Manchester. Professional surface preparation & rust removal. Expert commercial blasting. Call 07721 375756",
    spotlightText: "Salford’s industrial corridor—from Trafford Park through the Port Salford logistics hub on the Manchester Ship Canal—supports a dense cluster of logistics, steel fabrication and heavy engineering firms, with continuous commercial construction programmes for new warehouses, distribution centres and manufacturing units on estates such as Trafford Park and Port Salford. Our shot blasting teams commonly undertake structural steel preparation for warehouse frames and bridges, heavy plant and port-crane refurbishment, plus floor preparation for high-throughput loading bays and cladding fixings. The area’s strong rail freight connections and direct access to the M60 and M602 make rapid on-site mobilisation across Greater Manchester straightforward.",
    faqs: [
      { question: "Do you provide shot blasting services in Salford?", answer: "Yes, we provide comprehensive mobile shot blasting services throughout Salford and the surrounding Greater Manchester area. Our fully equipped units can reach any location." },
      { question: "How quickly can you reach Salford?", answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Salford within 2-5 working days. For urgent projects, we can often accommodate faster response times." },
      { question: "What surfaces can you blast in Salford?", answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our equipment is suitable for both indoor and outdoor applications." },
      { question: "Do you offer free quotes in Salford?", answer: "Yes, we provide free, no-obligation quotations for all projects in Salford. Call us on 07721 375756 or request a quote through our website to discuss your requirements." },
    ]
  },
  "stockport": {
    name: "Stockport",
    slug: "stockport",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Shot Blasting in Stockport, Greater Manchester. Professional surface preparation & rust removal. Expert commercial blasting. Call 07721 375756",
    spotlightText: "Stockport's industrial belt, centred on Bredbury Industrial Estate and Cheadle Royal Business Park, supports a strong mix of steel fabrication, automotive supply, precision engineering and logistics operations, with continuous commercial construction and factory refurbishment activity across the borough. Proximity to the M60 (Manchester Outer Ring Road) and the A560 provides fast trunk‑road access to Trafford Park and Manchester Airport, with rail connections via Stockport keeping inbound and outbound heavy goods movement efficient for manufacturers and distributors. Typical shot blasting work in the area includes structural steel preparation for new‑build and refurbishment projects, heavy machinery and plant descaling, and abrasive floor preparation for large warehouse and production floors.",
    faqs: [
      { question: "Do you provide shot blasting services in Stockport?", answer: "Yes, we provide comprehensive mobile shot blasting services throughout Stockport and the surrounding Greater Manchester area. Our fully equipped units can reach any location." },
      { question: "How quickly can you reach Stockport?", answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Stockport within 2-5 working days. For urgent projects, we can often accommodate faster response times." },
      { question: "What surfaces can you blast in Stockport?", answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our equipment is suitable for both indoor and outdoor applications." },
      { question: "Do you offer free quotes in Stockport?", answer: "Yes, we provide free, no-obligation quotations for all projects in Stockport. Call us on 07721 375756 or request a quote through our website to discuss your requirements." },
    ]
  },
  "wigan": {
  "name": "Wigan",
  "slug": "wigan",
  "county": "Greater Manchester",
  "countySlug": "greater-manchester",
  "region": "North West England",
  "description": "Commercial shot blasting services in Wigan, Greater Manchester. Mobile surface preparation for structural steel, plant, cladding and industrial floors. Book a free site survey on 07721 375756.",
  "spotlightText": "Wigan has long maintained a proud reputation for industrial engineering, manufacturing, and heavy logistics, rooted in its rich heritage and modern commercial expansion. Today, active business hubs like Martland Park and Astley Business Park drive regional growth, housing diverse industrial operations ranging from structural steel fabrication to heavy machinery maintenance. Maintaining these heavy-duty industrial assets requires robust surface preparation to combat corrosion and wear. Professional commercial shot blasting plays a vital role across Wigan's manufacturing sector, ensuring that steel structures, storage tanks, and plant equipment are thoroughly cleaned, profiled, and primed to withstand rigorous operational demands and extend asset lifespans across Greater Manchester and beyond.",
  "uniqueFaqs": [
    {
      "question": "What types of industrial surfaces can be treated with commercial shot blasting in Wigan?",
      "answer": "Commercial shot blasting is suitable for structural steelwork, heavy machinery, steel storage tanks, concrete floors, and industrial transport equipment located across Wigan's business parks and manufacturing facilities."
    },
    {
      "question": "Why is shot blasting essential for manufacturing and logistics facilities in Wigan?",
      "answer": "Shot blasting effectively removes rust, mill scale, old coatings, and contaminants, creating an optimal surface profile that ensures superior adhesion for protective industrial coatings and paints."
    },
    {
      "question": "Can shot blasting be performed on-site at industrial premises in Wigan?",
      "answer": "Yes, mobile commercial shot blasting equipment can be deployed directly to industrial sites, warehouses, and fabrication yards across Wigan to clean large stationary structures and heavy plant machinery efficiently."
    }
  ],
  "faqs": [
    {
      "question": "Do you provide commercial shot blasting services in Wigan?",
      "answer": "Yes. Our mobile teams support commercial and industrial surface preparation throughout Wigan and the wider Greater Manchester area. We assess access, containment, substrate condition and coating requirements before recommending the right blasting method."
    },
    {
      "question": "Can you carry out shot blasting on-site in Wigan?",
      "answer": "Yes. Where access, dust control and the site environment allow, mobile blasting equipment can be brought to commercial sites in Wigan. A free survey lets us confirm the safest and most efficient approach for fixed steelwork, plant or flooring."
    },
    {
      "question": "What can be prepared by shot blasting in Wigan?",
      "answer": "We prepare structural steel, fabricated components, machinery, containers, factory cladding and concrete floors. The required abrasive, containment and blast profile are selected around the material and the coating system that will follow."
    },
    {
      "question": "How do I arrange a free site survey in Wigan?",
      "answer": "Use the Book a Free Site Survey form or call 07721 375756. Share the site postcode, what needs blasting and any photos or drawings; we will review the requirements and arrange the next practical step."
    }
  ]
},
  "bury": {
  "name": "Bury",
  "slug": "bury",
  "county": "Greater Manchester",
  "countySlug": "greater-manchester",
  "region": "North West England",
  "description": "Commercial shot blasting services in Bury, Greater Manchester. Mobile surface preparation for structural steel, plant, cladding and industrial floors. Book a free site survey on 07721 375756.",
  "spotlightText": "Bury has evolved from its proud Lancashire cotton and engineering heritage into a thriving hub for modern manufacturing, logistics, and heavy engineering enterprises. Across established commercial locations like Chamberhall Business Park and Pilsworth Industrial Estate, local businesses demand robust surface maintenance and corrosion protection solutions. Commercial shot blasting plays a vital structural role across Greater Manchester by preparing steelwork, machinery, and fabricated components for heavy-duty industrial applications. Whether servicing expanding facilities within the Atom Valley growth corridor or maintaining commercial assets near regional transport arteries, professional abrasive blasting ensures optimal coating adhesion and structural longevity for heavy industrial infrastructure throughout the borough.",
  "uniqueFaqs": [
    {
      "question": "What types of industrial facilities in Bury benefit most from commercial shot blasting?",
      "answer": "Manufacturing plants, engineering workshops, and logistics facilities located across commercial hubs like Pilsworth Industrial Estate and Chamberhall Business Park regularly utilize shot blasting for structural steel and heavy machinery preparation."
    },
    {
      "question": "How does commercial shot blasting support heavy engineering and manufacturing in Bury?",
      "answer": "Shot blasting efficiently removes mill scale, rust, old paint, and surface contaminants from metal structures and fabricated components, ensuring superior surface profile and coating adhesion."
    },
    {
      "question": "Is on-site mobile shot blasting available for large industrial structures in Bury?",
      "answer": "Yes, professional mobile abrasive blasting equipment can be deployed directly to industrial sites, warehouses, and structural fabrication yards across Bury and the wider Greater Manchester area."
    }
  ],
  "faqs": [
    {
      "question": "Do you provide commercial shot blasting services in Bury?",
      "answer": "Yes. Our mobile teams support commercial and industrial surface preparation throughout Bury and the wider Greater Manchester area. We assess access, containment, substrate condition and coating requirements before recommending the right blasting method."
    },
    {
      "question": "Can you carry out shot blasting on-site in Bury?",
      "answer": "Yes. Where access, dust control and the site environment allow, mobile blasting equipment can be brought to commercial sites in Bury. A free survey lets us confirm the safest and most efficient approach for fixed steelwork, plant or flooring."
    },
    {
      "question": "What can be prepared by shot blasting in Bury?",
      "answer": "We prepare structural steel, fabricated components, machinery, containers, factory cladding and concrete floors. The required abrasive, containment and blast profile are selected around the material and the coating system that will follow."
    },
    {
      "question": "How do I arrange a free site survey in Bury?",
      "answer": "Use the Book a Free Site Survey form or call 07721 375756. Share the site postcode, what needs blasting and any photos or drawings; we will review the requirements and arrange the next practical step."
    }
  ]
},
  "wythenshawe": {
  "name": "Wythenshawe",
  "slug": "wythenshawe",
  "county": "Greater Manchester",
  "countySlug": "greater-manchester",
  "region": "North West England",
  "description": "Commercial shot blasting services in Wythenshawe, Greater Manchester. Mobile surface preparation for structural steel, plant, cladding and industrial floors. Book a free site survey on 07721 375756.",
  "spotlightText": "Wythenshawe serves as a major commercial and logistics hub in South Manchester, underpinned by world-class transport infrastructure including Manchester Airport and the M56 and M60 motorways. The area hosts prominent commercial nodes such as Manchester Business Park, home to major developments like the Horizon logistics scheme off Aviator Way, alongside established centers like Southmoor Park and Roundthorn Industrial Estate. These sites accommodate advanced manufacturing, light engineering, warehousing, and last-mile distribution operations that demand rigorous surface preparation and maintenance. Industrial facilities, structural steel frameworks, plant machinery, and transport logistics equipment in Wythenshawe regularly require professional commercial shot blasting and protective coatings to withstand heavy operational wear, prevent corrosion, and extend asset longevity across this dynamic northern economic gateway.",
  "uniqueFaqs": [
    {
      "question": "What types of commercial facilities in Wythenshawe benefit most from shot blasting services?",
      "answer": "Warehouses, logistics hubs, and manufacturing facilities across industrial locations such as Roundthorn Industrial Estate and Southmoor Park benefit greatly. Shot blasting effectively removes rust, old paint, and scale from structural steel frameworks, heavy machinery, storage tanks, and transport equipment, ensuring optimal surface preparation before applying high-performance protective coatings."
    },
    {
      "question": "How does proximity to Manchester Airport and major motorways impact industrial maintenance in Wythenshawe?",
      "answer": "High traffic volumes and logistical intensity around the M56, M60, and Manchester Airport create demanding operating environments for local commercial fleets and distribution centers. Regular abrasive blast cleaning helps maintain trailers, chassis, and handling machinery, preventing premature corrosion caused by environmental exposure and heavy industrial usage."
    },
    {
      "question": "Can shot blasting be performed on-site for large industrial structures and storage assets in Wythenshawe?",
      "answer": "Yes, mobile and on-site shot blasting techniques can be deployed for large-scale steel structures, external storage silos, and fixed plant installations that cannot be easily transported. This minimizes facility downtime while safely stripping degraded coatings and contaminants in compliance with local environmental and safety standards."
    }
  ],
  "faqs": [
    {
      "question": "Do you provide commercial shot blasting services in Wythenshawe?",
      "answer": "Yes. Our mobile teams support commercial and industrial surface preparation throughout Wythenshawe and the wider Greater Manchester area. We assess access, containment, substrate condition and coating requirements before recommending the right blasting method."
    },
    {
      "question": "Can you carry out shot blasting on-site in Wythenshawe?",
      "answer": "Yes. Where access, dust control and the site environment allow, mobile blasting equipment can be brought to commercial sites in Wythenshawe. A free survey lets us confirm the safest and most efficient approach for fixed steelwork, plant or flooring."
    },
    {
      "question": "What can be prepared by shot blasting in Wythenshawe?",
      "answer": "We prepare structural steel, fabricated components, machinery, containers, factory cladding and concrete floors. The required abrasive, containment and blast profile are selected around the material and the coating system that will follow."
    },
    {
      "question": "How do I arrange a free site survey in Wythenshawe?",
      "answer": "Use the Book a Free Site Survey form or call 07721 375756. Share the site postcode, what needs blasting and any photos or drawings; we will review the requirements and arrange the next practical step."
    }
  ]
},
  "sale": {
  "name": "Sale",
  "slug": "sale",
  "county": "Greater Manchester",
  "countySlug": "greater-manchester",
  "region": "North West England",
  "description": "Commercial shot blasting services in Sale, Greater Manchester. Mobile surface preparation for structural steel, plant, cladding and industrial floors. Book a free site survey on 07721 375756.",
  "spotlightText": "Situated within the Metropolitan Borough of Trafford in Greater Manchester, Sale benefits from a robust commercial economy underpinned by thriving local retail, professional services, and light manufacturing. While primarily renowned as a prominent residential and commercial hub south of Manchester, Sale maintains close economic ties to major regional logistics and industrial powerhouses such as Trafford Park and the adjacent Broadheath and Atlantic Street business districts in Altrincham. Transport connectivity is exceptionally strong, anchored by the M60 motorway (Junction 7 and 8) encircling the conurbation, the Bridgewater Canal corridor, and the extensive Manchester Metrolink light rail network providing rapid transit across Greater Manchester. This strategic infrastructure supports local commercial enterprises, warehouses, and industrial facilities requiring specialized surface preparation and structural maintenance.",
  "uniqueFaqs": [
    {
      "question": "What commercial shot blasting services are available for industrial units and business premises in Sale?",
      "answer": "We provide comprehensive on-site and mobile shot blasting, grit blasting, and abrasive blast cleaning for commercial facilities, structural steelwork, warehouses, and plant machinery across Sale and the wider Trafford area. Our advanced techniques efficiently strip rust, failing coatings, and heavy contaminants from brickwork, concrete, and metal surfaces, restoring structural integrity and preparing substrates for high-performance protective coatings or repainting."
    },
    {
      "question": "How do you minimize operational disruption for businesses located near residential zones in Sale?",
      "answer": "Operating in densely populated urban and commercial settings like Sale requires stringent dust containment, acoustic shielding, and flexible scheduling. We utilize enclosed vacuum blast systems and HEPA-filtered extraction units to eliminate airborne dust and debris. Furthermore, our team works closely with facility managers to coordinate out-of-hours or weekend project phases, ensuring minimal disruption to daily business operations, neighboring retail units, and local transport networks."
    },
    {
      "question": "Are your shot blasting operations compliant with environmental and safety regulations in Greater Manchester?",
      "answer": "Yes, all our commercial shot blasting and surface preparation projects strictly adhere to UK environmental legislation, Health and Safety Executive (HSE) guidelines, and Greater Manchester local authority standards. We employ fully certified operatives trained in hazardous material handling, waste disposal, and pollution control. We manage containment securely on-site and ensure all spent abrasives and removed coatings are legally disposed of at authorized waste facilities."
    }
  ],
  "faqs": [
    {
      "question": "Do you provide commercial shot blasting services in Sale?",
      "answer": "Yes. Our mobile teams support commercial and industrial surface preparation throughout Sale and the wider Greater Manchester area. We assess access, containment, substrate condition and coating requirements before recommending the right blasting method."
    },
    {
      "question": "Can you carry out shot blasting on-site in Sale?",
      "answer": "Yes. Where access, dust control and the site environment allow, mobile blasting equipment can be brought to commercial sites in Sale. A free survey lets us confirm the safest and most efficient approach for fixed steelwork, plant or flooring."
    },
    {
      "question": "What can be prepared by shot blasting in Sale?",
      "answer": "We prepare structural steel, fabricated components, machinery, containers, factory cladding and concrete floors. The required abrasive, containment and blast profile are selected around the material and the coating system that will follow."
    },
    {
      "question": "How do I arrange a free site survey in Sale?",
      "answer": "Use the Book a Free Site Survey form or call 07721 375756. Share the site postcode, what needs blasting and any photos or drawings; we will review the requirements and arrange the next practical step."
    }
  ]
},
  "leigh": {
    name: "Leigh",
    slug: "leigh",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Professional mobile shot blasting services in Leigh, Greater Manchester. On-site surface preparation for structural steel, cladding, containers, and industrial metalwork.",
    spotlightText: "Leigh\'s strong manufacturing heritage and strategic location in Greater Manchester create significant demand for commercial shot blasting services. The town is home to thriving business hubs like Leigh Commerce Park and Moss Industrial Estate, which house numerous manufacturing, logistics, and steel fabrication companies. With excellent transport links via the nearby A580 East Lancashire Road, the area supports large-scale warehousing and distribution centers. Our mobile shot blasting services are essential for maintaining these facilities, from cleaning structural steel and factory cladding to preparing industrial flooring and heavy machinery for protective coatings. We help Leigh\'s industrial sector maintain operational efficiency and safety standards.",
    uniqueFaqs: [
      { question: "Do you provide commercial shot blasting services for businesses in Leigh Commerce Park and Moss Industrial Estate?", answer: "Our mobile shot blasting units can easily reach businesses in Leigh Commerce Park and Moss Industrial Estate. We remove rust, old paint, and industrial grime from structural steel, factory cladding, and warehouse floors to prepare them for fresh coatings." },
      { question: "Can you clean structural steel for manufacturing and fabrication companies in Leigh?", answer: "Yes, we specialize in cleaning and restoring structural steelwork for manufacturing facilities and fabrication shops across Greater Manchester. Our abrasive blasting techniques effectively remove mill scale and corrosion, ensuring a perfect surface profile for protective painting." },
      { question: "Do you offer mobile shot blasting for warehouses and logistics centers near the A580 in Leigh?", answer: "Absolutely. We provide mobile shot blasting for logistics hubs and warehouses near the A580 East Lancashire Road. We can clean industrial flooring, exterior cladding, and steel containers to maintain a professional appearance and ensure safety compliance." },
    ],
    faqs: [],
  },
  "hindley": {
    name: "Hindley",
    slug: "hindley",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Professional mobile shot blasting services in Hindley, Greater Manchester. On-site surface preparation for structural steel, cladding, containers, and industrial metalwork.",
    spotlightText: "Hindley and the surrounding Wigan area boast a robust industrial landscape that frequently requires professional shot blasting services. Key commercial hubs like the Swan Lane Industrial Estate and the expanding Hindley Green Business Park off Leigh Road are home to numerous manufacturing, warehousing, and logistics businesses. With ongoing developments adding new industrial units and large-scale warehouses to the area, there is a constant need for surface preparation on structural steelwork, factory cladding, and heavy machinery. Additionally, local fabrication shops and older industrial facilities along the A577 corridor rely on mobile shot blasting to maintain equipment, restore metalwork, and prepare surfaces for protective coatings, ensuring longevity in this busy Greater Manchester commercial sector.",
    uniqueFaqs: [
      { question: "Do you provide mobile shot blasting services to industrial estates in Hindley?", answer: "Our mobile shot blasting units can travel directly to Hindley Green Business Park and Swan Lane Industrial Estate. We provide on-site surface preparation for steel fabrication, factory cladding, and industrial equipment without requiring you to transport heavy machinery." },
      { question: "Can you clean warehouse floors and structural steel for logistics businesses in Hindley?", answer: "Yes, we regularly work with manufacturing and logistics businesses near the A577 and A578 corridors. We can safely remove rust, old paint, and industrial contaminants from warehouse floors, structural steelwork, and heavy machinery to keep your operations running smoothly." },
      { question: "Do you offer shot blasting for older industrial buildings and heritage structures in Hindley?", answer: "Absolutely. We offer specialized shot blasting for older brickwork, stone, and structural elements in Hindley and the wider Wigan area. Our adjustable pressure systems ensure that heritage buildings and older industrial structures are cleaned effectively without damaging the underlying materials." },
    ],
    faqs: [],
  },
  "atherton": {
    name: "Atherton",
    slug: "atherton",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Professional mobile shot blasting services in Atherton, Greater Manchester. On-site surface preparation for structural steel, cladding, containers, and industrial metalwork.",
    spotlightText: "Atherton\'s industrial landscape, deeply rooted in its manufacturing heritage, continues to thrive with modern commercial activity. Key areas like the Prestwich Industrial Estate on Coal Pit Lane and the Chanters Industrial Estate on Tyldesley Old Road host a variety of manufacturing, light industrial, and distribution businesses. With ongoing developments such as the Gibfield Park employment area and proposed new logistics hubs, the town remains a vital center for warehousing and fabrication. These facilities, along with local structural steelwork and commercial transport fleets, require regular maintenance. Our commercial shot blasting services provide essential surface preparation, rust removal, and cleaning for Atherton\'s factories, warehouses, and industrial infrastructure, ensuring they remain operational and protected against wear.",
    uniqueFaqs: [
      { question: "Do you provide commercial shot blasting services for businesses at Prestwich Industrial Estate in Atherton?", answer: "Our mobile shot blasting services are ideal for the manufacturing and distribution units at Prestwich Industrial Estate. We can efficiently remove rust, old paint, and industrial contaminants from structural steelwork, warehouse cladding, and factory floors, ensuring your facility remains safe and well-maintained." },
      { question: "Can you assist with surface preparation for manufacturing facilities near Chanters Industrial Estate in Atherton?", answer: "Yes, we frequently work with businesses in and around Chanters Industrial Estate. Our team can restore metal fabrications, clean heavy machinery, and prepare industrial surfaces for protective coatings, helping local manufacturers maintain their equipment and infrastructure." },
      { question: "Are your mobile shot blasting services suitable for logistics and warehousing companies in Atherton?", answer: "Absolutely. With Atherton\'s strong logistics presence, we offer specialized shot blasting for transport hubs and warehousing facilities. We can clean and restore commercial vehicle chassis, shipping containers, and loading bay structures to extend their lifespan and improve safety." },
    ],
    faqs: [],
  },
  "tyldesley": {
    name: "Tyldesley",
    slug: "tyldesley",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Professional mobile shot blasting services in Tyldesley, Greater Manchester. On-site surface preparation for structural steel, cladding, containers, and industrial metalwork.",
    spotlightText: "Tyldesley’s industrial landscape is evolving rapidly, creating strong demand for professional shot blasting services. Situated within the Wigan and Bolton manufacturing corridor, the town is home to established hubs like Astley Business Park and major new logistics developments, including the 350,000 sq ft PLP warehouse complex. These expanding industrial estates require extensive surface preparation for structural steelwork, factory cladding, and heavy machinery. Additionally, Tyldesley’s ongoing heritage regeneration projects and infrastructure improvements, such as the guided busway links, present opportunities for specialized brick and stone cleaning. From modern logistics facilities to historic building restorations, local businesses rely on expert shot blasting to maintain and protect their vital commercial assets.",
    uniqueFaqs: [
      { question: "Do you offer mobile shot blasting services at Astley Business Park in Tyldesley?", answer: "We provide mobile shot blasting services directly to sites across Tyldesley and the wider Wigan and Bolton manufacturing corridor. Whether you need structural steel cleaned at Astley Business Park or equipment prepared at local manufacturing facilities, our mobile units come fully equipped to handle the job on-site." },
      { question: "Can you handle large-scale warehouse preparation for the new logistics developments in Tyldesley?", answer: "Yes, we specialize in cleaning and preparing large industrial structures, including the new logistics warehouses being developed by PLP. Our shot blasting effectively removes rust, old paint, and contaminants from structural steelwork and cladding, ensuring a perfect surface for protective coatings." },
      { question: "Are your shot blasting services suitable for heritage building restoration in Tyldesley?", answer: "Absolutely. We have extensive experience working on heritage restoration projects, similar to the recent High Street regeneration efforts in Tyldesley. We use controlled blasting techniques to safely clean historic brickwork, stone, and metal fixtures without damaging the underlying materials." },
    ],
    faqs: [],
  },
  "radcliffe": {
    name: "Radcliffe",
    slug: "radcliffe",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Professional mobile shot blasting services in Radcliffe, Greater Manchester. On-site surface preparation for structural steel, cladding, containers, and industrial metalwork.",
    spotlightText: "Radcliffe’s rich industrial heritage continues to evolve through ongoing regeneration and a strong manufacturing presence. The town’s commercial landscape, anchored by key sites like Warth Industrial Park, Eton Business Park, and the Dale Street Industrial Estate near the Radcliffe Bypass, relies heavily on structural steel, fabrication, and warehousing. With significant infrastructure investments, such as the recent £3.2 million Radcliffe bridge project, there is a consistent demand for professional surface preparation. Our mobile shot blasting services support Radcliffe’s steel fabricators, manufacturing plants, and logistics facilities by expertly removing rust, old coatings, and contaminants from industrial machinery, factory cladding, and structural steelwork, ensuring these vital assets remain protected and operational.",
    uniqueFaqs: [
      { question: "Can you provide shot blasting for manufacturing facilities and steel fabricators in Radcliffe?", answer: "Our mobile shot blasting services are ideal for removing rust, old paint, and industrial contaminants from structural steelwork and machinery. We frequently work with manufacturing and fabrication businesses across estates like Warth Industrial Park and Eton Business Park to prepare surfaces for protective coatings." },
      { question: "Do you offer mobile shot blasting for infrastructure and bridge projects around Radcliffe?", answer: "Yes, we offer specialized shot blasting for infrastructure projects, including bridge restorations and structural steel maintenance. With recent investments like the £3.2 million Radcliffe bridge project, our mobile teams can efficiently clean and prepare steel structures on-site to ensure long-lasting durability." },
      { question: "Are your shot blasting services suitable for warehouse and logistics facilities near the Radcliffe Bypass?", answer: "Absolutely. We provide comprehensive surface preparation for warehouses, logistics centers, and industrial units along the Radcliffe Bypass and M60 corridor. Our services effectively clean concrete floors, steel cladding, and structural elements to maintain high standards for commercial properties." },
    ],
    faqs: [],
  },
  "littleborough": {
    name: "Littleborough",
    slug: "littleborough",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Professional mobile shot blasting services in Littleborough, Greater Manchester. On-site surface preparation for structural steel, cladding, containers, and industrial metalwork.",
    spotlightText: "Littleborough’s industrial landscape blends its rich textile heritage with modern manufacturing and engineering. The town is home to key commercial hubs like Greenvale Business Park on Todmorden Road and Littleborough Industrial Estate off the A58, which host a variety of businesses including Mauser Packaging, Ken Mills Engineering, and CRP. These manufacturing facilities, warehouses, and structural steel fabricators frequently require professional surface preparation. Additionally, the area features numerous historic mill buildings and stone structures that are often repurposed for modern commercial use. Our mobile shot blasting services are ideal for cleaning factory cladding, restoring heritage brickwork, and preparing heavy machinery and structural steel for protective coatings across Littleborough’s industrial sectors.",
    uniqueFaqs: [
      { question: "Do you provide mobile shot blasting services to industrial estates in Littleborough?", answer: "Our mobile shot blasting units can travel directly to Greenvale Business Park and Littleborough Industrial Estate. We provide on-site surface preparation for manufacturing facilities, structural steelwork, and factory cladding without disrupting your operations." },
      { question: "Can you clean heavy machinery and steelwork for manufacturing businesses in Littleborough?", answer: "Yes, we specialize in cleaning and restoring structural steel, brickwork, and machinery for local manufacturing and engineering firms. Whether you are based near the A58 or Todmorden Road, we can prepare surfaces for protective coatings or remove heavy industrial grime." },
      { question: "Are your shot blasting services suitable for heritage buildings and former textile mills in Littleborough?", answer: "Absolutely. Littleborough has a rich textile heritage with many historic mill buildings and stone structures. Our low-pressure sandblasting techniques safely remove paint, dirt, and biological growth from heritage brick and stone without damaging the underlying substrate." },
    ],
    faqs: [],
  },
  "ramsbottom": {
    name: "Ramsbottom",
    slug: "ramsbottom",
    county: "Greater Manchester",
    countySlug: "greater-manchester",
    region: "North West England",
    description: "Professional mobile shot blasting services in Ramsbottom, Greater Manchester. On-site surface preparation for structural steel, cladding, containers, and industrial metalwork.",
    spotlightText: "Ramsbottom’s unique blend of historic architecture and modern enterprise creates a diverse demand for commercial shot blasting services. The town is home to the Cuba Industrial Estate, which houses various manufacturing, distribution, and fabrication businesses that regularly require structural steel preparation and factory cladding maintenance. Additionally, Ramsbottom\'s rich industrial heritage, notably its numerous former textile mills and Grade II listed buildings, often necessitates careful surface restoration and cleaning during conversion projects. Situated near the M66 motorway, the area also supports logistics operations and agricultural facilities, all of which benefit from professional mobile shot blasting to maintain equipment, infrastructure, and commercial properties.",
    uniqueFaqs: [
      { question: "Do you offer mobile shot blasting services for businesses on the Cuba Industrial Estate in Ramsbottom?", answer: "Yes, we provide mobile shot blasting across Ramsbottom, including the Cuba Industrial Estate. Our services are ideal for preparing structural steel, removing rust, and cleaning factory cladding for local manufacturing and distribution businesses." },
      { question: "Can your shot blasting services safely clean the historic textile mill conversions in Ramsbottom?", answer: "Absolutely. We specialise in sympathetic shot blasting techniques suitable for Ramsbottom\'s historic textile mills and heritage buildings. We can safely remove old paint, grime, and industrial residue from stone and brickwork without damaging the underlying structure." },
      { question: "Are you able to handle shot blasting for agricultural buildings and infrastructure projects near Ramsbottom and the M66?", answer: "Yes, we frequently work on infrastructure and agricultural projects around Ramsbottom and the M66 corridor. Our mobile units can efficiently blast clean bridges, agricultural buildings, and steel fabrications to prepare them for protective coatings." },
    ],
    faqs: [],
  },
};

export default locations;
