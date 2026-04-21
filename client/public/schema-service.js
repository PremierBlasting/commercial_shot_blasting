/**
 * schema-service.js
 * Client-side JSON-LD schema injection for /services/:id pages.
 * Runs synchronously before React hydration so schemas are present
 * for JS-executing crawlers (e.g. Googlebot second-wave rendering).
 * Server-side injection in metaTags.ts is the primary path; this is
 * a belt-and-braces fallback.
 */
(function () {
  'use strict';

  var SITE = 'https://commercialshotblasting.co.uk';
  var BIZ  = 'Commercial Shot Blasting';
  var TEL  = '07970 566409';
  var EMAIL = 'info@commercialshotblasting.co.uk';
  var LOGO  = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/ATzSAikYtVvYiYkQ.svg';

  var SERVICES = {
    'structural-steel-frames': {
      title: 'Structural Steel Frames Shot Blasting',
      description: 'Professional shot blasting for structural steel frames, roof trusses, and load-bearing steel structures. We remove mill scale, rust, and old coatings to prepare surfaces for galvanizing or protective coatings.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Building frame structures', 'Roof trusses and purlins', 'Portal frame components', 'Mezzanine floor structures', 'Industrial building frames'],
      process: [
        { step: 1, title: 'Structural Assessment', text: 'We inspect the steel frame components to determine appropriate blast media, pressure settings, and surface preparation requirements.' },
        { step: 2, title: 'Component Preparation', text: 'Frame sections are positioned for optimal blast coverage. Critical areas such as bolt holes and connection points are protected as required.' },
        { step: 3, title: 'Shot Blasting', text: 'Using appropriate blast media, we systematically clean all frame surfaces to achieve professional cleanliness for your coating system.' },
        { step: 4, title: 'Quality Inspection', text: 'We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications.' },
        { step: 5, title: 'Coating Coordination', text: 'Cleaned components are prepared for galvanizing, powder coating, or painting, with timing coordinated to minimize surface oxidation.' }
      ],
      faqs: [
        { q: 'Can you blast structural steel frames on-site?', a: 'Yes, we provide mobile shot blasting services and can work at your premises. For components requiring galvanizing, we ensure complete coverage and professional cleanliness for protective treatments.' },
        { q: 'How long does the process take?', a: 'Timeline depends on the size and complexity of the frame structure. A typical portal frame bay can be processed in 2-3 days. We can provide a detailed timeline after assessing your specific requirements.' }
      ]
    },
    'steel-containers': {
      title: 'Steel Container Shot Blasting',
      description: 'Specialist shot blasting for steel containers, shipping containers, fuel storage tanks, and large storage structures. We remove rust, old coatings, and surface contaminants to prepare containers for repainting or long-term reuse.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/qVdGSYQwlEjNqJyE.png',
      applications: ['Shipping Containers', 'Storage Tanks', 'Refrigerated Containers', 'Grain Silos', 'Fuel Storage Cylinders', 'Water Storage & Slurry Tanks'],
      process: [
        { step: 1, title: 'Preparation & Containment', text: 'We begin with inspection and masking, then protect surrounding areas with sheeting and seals to control dust and debris.' },
        { step: 2, title: 'Precision Shot Blasting', text: 'Using the correct media and pressure for the substrate, we remove corrosion and old coatings without compromising the steel.' },
        { step: 3, title: 'Final Clean Down', text: 'On completion, we carry out a meticulous clean-up, collecting residues and waste, leaving the area ready for repainting or recoating.' }
      ],
      faqs: [
        { q: 'What types of steel containers can you blast?', a: 'We can blast all types of steel containers including shipping containers, storage tanks, refrigerated units, grain silos, fuel storage cylinders, water tanks, and more.' },
        { q: 'Can you blast containers on-site?', a: 'Yes, we can provide on-site shot blasting services for large containers and storage structures that cannot be easily transported.' }
      ]
    },
    'factory-cladding': {
      title: 'Factory & Warehouse Cladding Shot Blasting',
      description: 'Specialist shot blasting for factory and industrial cladding panels. We remove original plastisol, multiple layers of paint, rust, and weathering from metal cladding to restore surfaces to bare metal condition ready for new protective coatings.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/EfAlIcQNicWsvHaA.png',
      applications: ['Factory wall cladding', 'Warehouse exterior panels', 'Industrial building facades', 'Commercial property cladding'],
      process: [
        { step: 1, title: 'Site Assessment', text: 'We assess cladding condition, coating types, and access requirements to plan the most effective blasting approach.' },
        { step: 2, title: 'Area Protection', text: 'Work zones are contained and protected to control blast media and prevent contamination of surrounding areas.' },
        { step: 3, title: 'Controlled Blasting', text: 'Using appropriate pressure and media, we systematically remove all coatings while preserving the cladding substrate.' },
        { step: 4, title: 'Surface Inspection', text: 'Cleaned panels are inspected to ensure complete coating removal and proper surface profile for recoating.' },
        { step: 5, title: 'Coating Coordination', text: 'Surfaces are prepared for immediate recoating to prevent oxidation and ensure optimal coating performance.' }
      ],
      faqs: [
        { q: 'Can you blast cladding in place?', a: 'Yes, we can blast cladding panels while installed on buildings using specialized containment and access equipment, minimizing disruption to your operations.' },
        { q: 'Will shot blasting damage thin cladding panels?', a: 'No. Our experienced technicians use controlled pressure and appropriate blast media to remove coatings without damaging the underlying metal panels.' },
        { q: 'How long before cladding needs recoating after blasting?', a: 'We coordinate closely with coating contractors to apply new coatings within 24-48 hours of blasting to prevent surface oxidation and ensure optimal adhesion.' }
      ]
    },
    'fire-escapes': {
      title: 'Fire Escapes & External Stair Towers Shot Blasting',
      description: 'Comprehensive shot blasting for fire escape structures and external stair towers. We remove rust, old paint, and corrosion from fire safety infrastructure, preparing surfaces for protective coatings or galvanizing.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/CwpnAmaEraMSszIF.png',
      applications: ['External fire escape stairs', 'Fire escape towers', 'Emergency egress systems', 'Fire escape landings and platforms', 'Fire escape handrails and balustrades'],
      process: [
        { step: 1, title: 'Safety Assessment', text: 'We inspect the fire escape structure to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Access Planning', text: 'We coordinate access arrangements and safety measures for working at height, ensuring health and safety practices.' },
        { step: 3, title: 'Shot Blasting', text: 'Using appropriate blast media and pressure settings, we systematically clean all fire escape surfaces including stairs, landings, handrails, and support structures.' },
        { step: 4, title: 'Quality Verification', text: 'We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for coating application.' },
        { step: 5, title: 'Coating Application', text: 'We can coordinate protective coating application or galvanizing to ensure maximum corrosion protection and fire safety requirements.' }
      ],
      faqs: [
        { q: 'Can you work on fire escapes while the building is occupied?', a: 'Yes, we can coordinate work schedules to minimize disruption and maintain emergency egress routes.' },
        { q: 'What coatings do you recommend for fire escapes?', a: 'We typically recommend intumescent fire-resistant coatings or hot-dip galvanizing for maximum corrosion protection and fire safety compliance.' }
      ]
    },
    'staircases': {
      title: 'Internal Steel Staircases, Balustrades & Handrails Shot Blasting',
      description: 'Meticulous shot blasting for internal steel staircases, balustrades, and handrails. We remove rust, old paint, powder coating, and welding residue from architectural metalwork, preparing surfaces for powder coating, painting, or galvanizing.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/jaElsgrlYUgbWwFe.png',
      applications: ['Internal steel staircases', 'Balustrades and handrails', 'Decorative metalwork', 'Heritage staircase restoration', 'Mezzanine staircase systems'],
      process: [
        { step: 1, title: 'Component Assessment', text: 'We inspect the metalwork to assess condition, identify any delicate features, and determine appropriate blast media and pressure settings.' },
        { step: 2, title: 'Preparation & Masking', text: 'Components are prepared for blasting. Threaded connections, bearing surfaces, and delicate features are masked or protected as required.' },
        { step: 3, title: 'Precision Blasting', text: 'Using fine-grade blast media and controlled pressure, we carefully clean all surfaces while preserving fine details and dimensional tolerances.' },
        { step: 4, title: 'Quality Inspection', text: 'We conduct detailed inspections to ensure all surfaces meet the required cleanliness and profile specifications for your chosen finish.' },
        { step: 5, title: 'Finishing Coordination', text: 'Cleaned components are prepared for powder coating, painting, or other finishing processes, with timing coordinated to maintain surface cleanliness.' }
      ],
      faqs: [
        { q: 'Can you blast staircases without damaging decorative details?', a: 'Yes, we use fine-grade blast media and carefully controlled pressure settings to clean surfaces while preserving fine details, threads, and dimensional tolerances.' },
        { q: 'What finishes can be applied after blasting?', a: 'After shot blasting, staircases and balustrades can be powder coated, wet painted, galvanized, or left with a clear protective coating.' }
      ]
    },
    'bridge-steelwork': {
      title: 'Bridge Steelwork Shot Blasting',
      description: 'Comprehensive shot blasting for bridge steelwork including girders, crossmembers, and parapet rails. We prepare bridge steel surfaces to SA2.5 or SA3 standard for protective coating systems that ensure long-term structural integrity.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/SIvqwXQxxXKmsmDK.png',
      applications: ['Bridge girders and beams', 'Bridge crossmembers and bracing', 'Parapet rails and barriers', 'Footbridge steelwork', 'Railway bridge components', 'Heritage bridge restoration'],
      process: [
        { step: 1, title: 'Structural Survey', text: 'We conduct a detailed survey of the bridge steelwork to assess condition and determine appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Access & Safety Planning', text: 'We coordinate access arrangements, traffic management, and safety measures for working on bridge structures.' },
        { step: 3, title: 'Shot Blasting', text: 'Using appropriate blast media and pressure settings, we systematically clean all bridge steelwork surfaces to achieve professional cleanliness.' },
        { step: 4, title: 'Quality Verification', text: 'We conduct thorough inspections and surface cleanliness testing to verify compliance with bridge coating specifications.' },
        { step: 5, title: 'Coating Application', text: 'We can coordinate protective coating application to ensure maximum corrosion protection and compliance with highway authority specifications.' }
      ],
      faqs: [
        { q: 'Can you work on bridges while they remain open to traffic?', a: 'Yes, we can coordinate work schedules with highway authorities to minimize disruption. We typically work during night-time closures or use lane closures with traffic management systems.' },
        { q: 'What surface preparation standards do you achieve for bridge work?', a: 'We routinely achieve professional cleanliness and SA3 surface preparation standards required for highway and railway bridge coating systems.' }
      ]
    },
    'ladders': {
      title: 'Fixed Ladders & Step-Over Platforms Shot Blasting',
      description: 'Comprehensive shot blasting for fixed ladders, caged ladder systems, and step-over platforms. We remove rust and corrosion from industrial access infrastructure, preparing surfaces for protective coatings or galvanizing.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/fjQLkvBCsjdFzSjo.png',
      applications: ['Fixed vertical ladders', 'Caged ladder systems', 'Step-over platforms', 'Industrial access ladders', 'Roof access systems', 'Tank access ladders'],
      process: [
        { step: 1, title: 'Safety Assessment', text: 'We inspect the access system to assess condition and determine appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Component Preparation', text: 'Ladder sections, platforms, and safety cages are prepared for blasting. Critical connection points and safety features are protected as required.' },
        { step: 3, title: 'Shot Blasting', text: 'We systematically clean all access system surfaces including rungs, side rails, platforms, and safety cages.' },
        { step: 4, title: 'Quality Verification', text: 'We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications.' },
        { step: 5, title: 'Coating & Installation', text: 'Cleaned components are prepared for protective coating or galvanizing, with timing coordinated for installation.' }
      ],
      faqs: [
        { q: 'Can you blast fixed ladders in situ?', a: 'Yes, we provide mobile shot blasting services at your location. We can work with ladders in situ or coordinate if sections need removal for access.' },
        { q: 'What protective coatings do you recommend for access systems?', a: 'We typically recommend hot-dip galvanizing for maximum corrosion protection and durability, especially for outdoor or harsh environment applications.' }
      ]
    },
    'warehouse-racking': {
      title: 'Warehouse Racking & Pallet Rack Frames Shot Blasting',
      description: 'Specialist shot blasting for pallet racking systems, storage frames, and industrial shelving. We remove rust, old powder coating, and contaminants from racking components, preparing them for refinishing or galvanizing.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/iAwFyjcyrlabkDxc.png',
      applications: ['Pallet racking uprights and beams', 'Cantilever racking systems', 'Drive-in and drive-through racking', 'Mezzanine floor support structures', 'Distribution center racking'],
      process: [
        { step: 1, title: 'Assessment', text: 'We inspect the racking components to determine the appropriate blast media, pressure settings, and surface preparation requirements.' },
        { step: 2, title: 'Disassembly & Preparation', text: 'If required, we can coordinate the disassembly of racking components at your premises to ensure optimal access for mobile blasting treatment.' },
        { step: 3, title: 'Shot Blasting', text: 'Our skilled technicians systematically blast all racking surfaces, removing rust, old coatings, and contaminants to achieve professional cleanliness.' },
        { step: 4, title: 'Quality Inspection', text: 'We conduct thorough quality checks to ensure all surfaces meet the required profile and cleanliness specifications.' },
        { step: 5, title: 'Finishing & Return', text: 'Cleaned components are prepared for powder coating, painting, or galvanizing, and can be returned to your site ready for installation.' }
      ],
      faqs: [
        { q: 'Can you blast racking on-site or does it need to be removed?', a: 'Yes, we provide mobile shot blasting services at your warehouse location. We can blast racking in situ or coordinate disassembly if needed for optimal access.' },
        { q: 'How long does the warehouse racking blasting process take?', a: 'Timeline depends on the quantity and condition of components. A typical pallet racking bay can be processed in 1-2 days.' }
      ]
    },
    'pipework': {
      title: 'Process Pipework, Spools & Manifolds Shot Blasting',
      description: 'Professional shot blasting for process pipework, pipe spools, and manifolds. We prepare internal and external pipe surfaces to the required cleanliness standard for protective coating systems in industrial, chemical, and food processing applications.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Process pipework', 'Pipe spools and manifolds', 'Industrial pipelines', 'Chemical plant pipework', 'Food processing pipework', 'Oil and gas pipework'],
      process: [
        { step: 1, title: 'Pipe Assessment', text: 'We inspect pipework to assess condition, coating requirements, and determine appropriate blast media and preparation standards.' },
        { step: 2, title: 'End Preparation', text: 'Pipe ends, flanges, and fittings are masked or protected as required before blasting commences.' },
        { step: 3, title: 'Shot Blasting', text: 'We blast internal and external pipe surfaces to the specified cleanliness standard using appropriate media and equipment.' },
        { step: 4, title: 'Quality Verification', text: 'Surface cleanliness and profile are measured and verified to ensure compliance with coating specifications.' },
        { step: 5, title: 'Coating Coordination', text: 'Prepared pipework is handed over for immediate coating application to prevent surface oxidation.' }
      ],
      faqs: [
        { q: 'Can you blast pipework internally and externally?', a: 'Yes, we can prepare both internal and external pipe surfaces. Internal blasting uses specialist equipment to achieve the required cleanliness standard throughout the pipe bore.' },
        { q: 'What pipe sizes can you blast?', a: 'We can blast pipes from small bore (25mm diameter) up to large diameter industrial pipework. Our equipment is adaptable to a wide range of pipe sizes and configurations.' }
      ]
    },
    'telecom-towers': {
      title: 'Telecom Masts & Lattice Towers Shot Blasting',
      description: 'Specialist shot blasting for telecom masts, lattice towers, and communication infrastructure. We remove corrosion and old coatings from tower steelwork, preparing surfaces for protective coating systems that ensure long-term structural integrity.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Telecom masts', 'Lattice towers', 'Communication towers', 'Broadcast masts', 'Wind turbine towers', 'Power transmission towers'],
      process: [
        { step: 1, title: 'Tower Survey', text: 'We conduct a detailed survey of the tower structure to assess condition and determine appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Access & Safety Planning', text: 'We coordinate access arrangements and safety measures for working at height on tower structures.' },
        { step: 3, title: 'Shot Blasting', text: 'We systematically clean all tower steelwork surfaces, removing corrosion, old coatings, and contaminants.' },
        { step: 4, title: 'Quality Verification', text: 'Surface cleanliness and profile are verified to ensure compliance with coating specifications.' },
        { step: 5, title: 'Coating Application', text: 'We can coordinate protective coating application to ensure maximum corrosion protection for the tower structure.' }
      ],
      faqs: [
        { q: 'Can you blast telecom towers while they remain operational?', a: 'Yes, we can coordinate work to minimize downtime. We work with tower operators to schedule blasting during planned maintenance windows.' },
        { q: 'What surface preparation standard do you achieve for tower steelwork?', a: 'We typically achieve SA2.5 (near-white metal) or SA3 (white metal) finish as required by the coating specification for the tower structure.' }
      ]
    },
    'floor-preparation': {
      title: 'Floor Preparation & Shot Blasting',
      description: 'Industrial floor shot blasting for concrete and steel floor surfaces. We prepare floors for resin coatings, epoxy systems, and protective treatments by removing laitance, contamination, and old coatings to create the ideal surface profile.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Warehouse floors', 'Factory floors', 'Car park decks', 'Industrial unit floors', 'Food processing floors', 'Pharmaceutical facility floors'],
      process: [
        { step: 1, title: 'Floor Assessment', text: 'We assess the floor condition, existing coatings, and contamination to determine the appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Area Preparation', text: 'Work areas are prepared and protected. Drainage points and sensitive areas are masked before blasting commences.' },
        { step: 3, title: 'Shot Blasting', text: 'We systematically blast the floor surface to achieve the required surface profile and cleanliness standard for the specified coating system.' },
        { step: 4, title: 'Vacuum Recovery', text: 'Spent blast media and debris are recovered using integrated vacuum systems, leaving the floor clean and ready for coating.' },
        { step: 5, title: 'Surface Verification', text: 'The surface profile is measured and verified to ensure it meets the requirements of the specified coating system.' }
      ],
      faqs: [
        { q: 'What surface profile do you achieve for floor preparation?', a: 'We can achieve CSP 3-5 (Concrete Surface Profile) as required by most resin and epoxy coating manufacturers.' },
        { q: 'Can you blast floors while the facility remains operational?', a: 'Yes, we can work in sections to allow continued operations. Our equipment uses integrated vacuum recovery to minimize dust and disruption.' }
      ]
    },
    'powder-coating': {
      title: 'Shot Blasting & Powder Coating',
      description: 'Combined shot blasting and powder coating service for steel components. We prepare surfaces by shot blasting then apply durable powder coating finishes in a wide range of colours and textures for long-lasting corrosion protection.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Steel fabrications', 'Architectural metalwork', 'Industrial equipment', 'Furniture and fixtures', 'Automotive components', 'Agricultural equipment'],
      process: [
        { step: 1, title: 'Component Assessment', text: 'We assess the components to determine appropriate blast media, powder coating specification, and preparation requirements.' },
        { step: 2, title: 'Shot Blasting', text: 'Components are shot blasted to achieve the required surface cleanliness and profile for optimal powder coating adhesion.' },
        { step: 3, title: 'Pre-treatment', text: 'Blasted components are pre-treated to remove any residual contamination and improve powder coating adhesion.' },
        { step: 4, title: 'Powder Coating Application', text: 'Powder coating is applied electrostatically and cured in an oven to achieve a durable, uniform finish.' },
        { step: 5, title: 'Quality Inspection', text: 'Finished components are inspected for coating thickness, adhesion, and appearance before delivery.' }
      ],
      faqs: [
        { q: 'What colours are available for powder coating?', a: 'We can match virtually any RAL or BS colour. We stock a wide range of standard colours and can source custom colours to match your specification.' },
        { q: 'How durable is powder coating compared to paint?', a: 'Powder coating is significantly more durable than conventional paint. It provides excellent resistance to chipping, scratching, and corrosion, typically lasting 15-20 years in normal conditions.' }
      ]
    },
    'commercial-radiators': {
      title: 'Commercial Radiators Shot Blasting',
      description: 'Specialist shot blasting for commercial and industrial radiators. We clean internal and external surfaces of cast iron, steel, and aluminium radiators, removing scale, corrosion, and old paint to restore heat transfer efficiency.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Cast iron radiators', 'Steel panel radiators', 'Industrial heat exchangers', 'Commercial heating systems', 'Heritage building radiators'],
      process: [
        { step: 1, title: 'Radiator Assessment', text: 'We inspect the radiators to assess condition, scale buildup, and determine appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Valve & Fitting Protection', text: 'Valves, fittings, and connection points are masked and protected before blasting commences.' },
        { step: 3, title: 'Controlled Shot Blasting', text: 'We blast internal and external radiator surfaces using appropriate media to remove scale, corrosion, and old coatings.' },
        { step: 4, title: 'Internal Cleaning', text: 'Internal passages are flushed and cleaned to remove blast media and debris, ensuring clear flow paths.' },
        { step: 5, title: 'Quality Verification', text: 'Cleaned radiators are inspected and tested to ensure they meet the required standard before recoating or reinstallation.' }
      ],
      faqs: [
        { q: 'Can you blast radiators without removing them from the building?', a: 'For smaller radiators, we recommend removal for optimal access and results. For large industrial radiators, we can provide on-site blasting with appropriate containment.' },
        { q: 'Will shot blasting damage radiator fins or internal passages?', a: 'No, we use appropriate blast media and controlled pressure to clean radiator surfaces without damaging fins or internal passages.' }
      ]
    },
    'commercial-vehicles': {
      title: 'Commercial & Agricultural Vehicle Shot Blasting',
      description: 'Professional shot blasting for commercial vehicles, agricultural machinery, and heavy plant. We remove rust, old paint, and corrosion from vehicle bodywork, chassis, and components, preparing surfaces for protective coatings or restoration.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['HGV and truck chassis', 'Agricultural tractors and harvesters', 'Plant and construction machinery', 'Trailers and semi-trailers', 'Skip lorries and refuse vehicles'],
      process: [
        { step: 1, title: 'Vehicle Assessment', text: 'We inspect the vehicle or machinery to assess condition, identify structural concerns, and determine appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Component Disassembly', text: 'Where required, components are disassembled to ensure complete access for blasting. Glass, rubber seals, and sensitive components are protected.' },
        { step: 3, title: 'Heavy-Duty Shot Blasting', text: 'We systematically blast all vehicle surfaces, removing rust, old paint, and corrosion to achieve bare metal condition.' },
        { step: 4, title: 'Detailed Cleaning', text: 'All blast media and debris is removed from cavities, joints, and recesses to ensure a clean substrate for coating.' },
        { step: 5, title: 'Surface Profiling', text: 'The surface profile is verified to ensure it meets the requirements of the specified coating or restoration system.' }
      ],
      faqs: [
        { q: 'Can you blast vehicles on-site?', a: 'Yes, we provide mobile shot blasting services and can work at your premises. We implement comprehensive containment systems to control dust and debris.' },
        { q: 'What types of vehicles can you blast?', a: 'We can blast all types of commercial and agricultural vehicles including HGVs, tractors, harvesters, trailers, plant machinery, and specialist vehicles.' }
      ]
    },
    'steel-doors': {
      title: 'Steel Doors & Roller Shutters Shot Blasting',
      description: 'Professional shot blasting for steel doors, roller shutters, and industrial door systems. We remove rust, old paint, and corrosion from door components, preparing surfaces for protective coatings or powder coating.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Industrial steel doors', 'Roller shutters', 'Security doors', 'Fire doors', 'Loading bay doors', 'Warehouse entrance doors'],
      process: [
        { step: 1, title: 'Door Assessment & Planning', text: 'We inspect the door or shutter components to assess condition and determine appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Component Removal & Protection', text: 'Door hardware, seals, and sensitive components are removed or protected before blasting commences.' },
        { step: 3, title: 'Industrial Shot Blasting', text: 'We systematically blast all door surfaces, removing rust, old coatings, and contaminants to achieve the required cleanliness standard.' },
        { step: 4, title: 'Quality Inspection', text: 'Cleaned components are inspected to ensure all surfaces meet the required cleanliness and profile specifications.' },
        { step: 5, title: 'Coating Coordination', text: 'Prepared components are handed over for immediate coating application to prevent surface oxidation.' }
      ],
      faqs: [
        { q: 'Can you blast roller shutters in situ?', a: 'Yes, we can blast roller shutters in place using appropriate containment. For optimal results, we recommend removing the shutter curtain for blasting.' },
        { q: 'What coatings do you recommend for steel doors?', a: 'We typically recommend high-performance epoxy or polyurethane coating systems for maximum durability and corrosion protection.' }
      ]
    },
    'steel-sheeting': {
      title: 'Steel Sheeting Shot Blasting',
      description: 'Specialist shot blasting for steel sheet, plate, and profiled sheeting. We prepare steel sheet surfaces for protective coatings, galvanizing, or further processing by removing mill scale, rust, and contamination.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Structural steel plate', 'Profiled roofing sheets', 'Wall cladding panels', 'Floor plate', 'Tank shell plates', 'Fabrication blanks'],
      process: [
        { step: 1, title: 'Sheet Assessment', text: 'We assess the steel sheeting to determine appropriate blast media, pressure settings, and surface preparation requirements.' },
        { step: 2, title: 'Sheet Handling', text: 'Sheets are positioned for optimal blast coverage, with appropriate support to prevent distortion during blasting.' },
        { step: 3, title: 'Shot Blasting', text: 'We systematically blast all sheet surfaces to achieve the required cleanliness standard and surface profile.' },
        { step: 4, title: 'Quality Inspection', text: 'Blasted sheets are inspected to verify cleanliness and profile meet the requirements of the specified coating or galvanizing process.' },
        { step: 5, title: 'Coating Coordination', text: 'Prepared sheets are handed over for immediate coating or galvanizing to prevent surface oxidation.' }
      ],
      faqs: [
        { q: 'Can you blast thin steel sheeting without causing distortion?', a: 'Yes, we use appropriate blast media and controlled pressure to prepare thin sheeting without causing distortion.' },
        { q: 'What surface cleanliness standard do you achieve?', a: 'We typically achieve SA2.5 (near-white metal) or SA3 (white metal) finish as required by the coating or galvanizing specification.' }
      ]
    },
    'steel-gates': {
      title: 'Steel Gates & Railings Shot Blasting',
      description: 'Professional shot blasting for steel gates, railings, fencing, and ornamental ironwork. We remove rust, old paint, and corrosion from decorative and security metalwork, preparing surfaces for powder coating or painting.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Entrance gates', 'Security railings', 'Decorative ironwork', 'Garden gates and fencing', 'Commercial security fencing', 'Heritage ironwork restoration'],
      process: [
        { step: 1, title: 'Metalwork Assessment', text: 'We inspect the gates and railings to assess condition, identify any delicate features, and determine appropriate blast media and pressure settings.' },
        { step: 2, title: 'Component Preparation', text: 'Gates and railing sections are prepared for blasting. Hinges, locks, and sensitive components are protected as required.' },
        { step: 3, title: 'Shot Blasting', text: 'Using appropriate blast media and controlled pressure, we clean all metalwork surfaces while preserving decorative details.' },
        { step: 4, title: 'Quality Inspection', text: 'Cleaned components are inspected to ensure all surfaces meet the required cleanliness and profile specifications.' },
        { step: 5, title: 'Finishing Coordination', text: 'Prepared components are handed over for powder coating, painting, or other finishing processes.' }
      ],
      faqs: [
        { q: 'Can you blast ornamental ironwork without damaging decorative details?', a: 'Yes, we use fine-grade blast media and carefully controlled pressure to clean surfaces while preserving decorative details and fine metalwork features.' },
        { q: 'Can you blast gates and railings on-site?', a: 'Yes, we provide mobile shot blasting services and can work at your location. We implement containment systems to control blast media and protect surrounding areas.' }
      ]
    },
    'plant-machinery': {
      title: 'Plant & Machinery Shot Blasting',
      description: 'Comprehensive shot blasting for industrial plant, heavy machinery, and manufacturing equipment. We remove rust, old coatings, and contamination from machinery components, preparing surfaces for protective coatings or restoration.',
      image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZGMUvDqgYwboovEM.png',
      applications: ['Manufacturing equipment', 'Processing machinery', 'Pumps and compressors', 'Gearboxes and drives', 'Conveyors and handling equipment', 'Construction plant'],
      process: [
        { step: 1, title: 'Machinery Assessment', text: 'We inspect the plant and machinery to assess condition, identify sensitive components, and determine appropriate blast media and preparation requirements.' },
        { step: 2, title: 'Component Protection', text: 'Bearings, seals, electrical components, and other sensitive parts are masked and protected before blasting commences.' },
        { step: 3, title: 'Shot Blasting', text: 'We systematically blast all machinery surfaces, removing rust, old coatings, and contamination to achieve the required cleanliness standard.' },
        { step: 4, title: 'Detailed Cleaning', text: 'All blast media and debris is removed from cavities, joints, and recesses to ensure a clean substrate for coating.' },
        { step: 5, title: 'Quality Verification', text: 'Cleaned machinery is inspected to ensure all surfaces meet the required cleanliness and profile specifications before coating.' }
      ],
      faqs: [
        { q: 'Can you blast machinery on-site without dismantling it?', a: 'Yes, we provide mobile shot blasting services and can work on machinery in situ. We implement comprehensive containment and protection to ensure sensitive components are not affected.' },
        { q: 'What types of plant and machinery can you blast?', a: 'We can blast virtually any type of industrial plant and machinery including processing equipment, pumps, compressors, conveyors, gearboxes, and construction plant.' }
      ]
    }
  };

  function injectSchemas() {
    var path = window.location.pathname;
    var m = path.match(/^\/services\/([a-z-]+)\/?$/);
    if (!m) return;

    var id = m[1];
    var svc = SERVICES[id];
    if (!svc) return;

    // Don't double-inject if server already provided schemas
    var existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < existing.length; i++) {
      try {
        var parsed = JSON.parse(existing[i].textContent || '{}');
        if (parsed['@type'] === 'Service' || (Array.isArray(parsed['@type']) && parsed['@type'].indexOf('Service') !== -1)) {
          return; // Server already injected service schemas
        }
      } catch (e) { /* ignore */ }
    }

    var url = SITE + '/services/' + id;

    var schemas = [
      // 1. Service
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': url + '#service',
        name: svc.title,
        description: svc.description,
        url: url,
        image: svc.image,
        provider: { '@type': 'LocalBusiness', name: BIZ, telephone: TEL, email: EMAIL, url: SITE, logo: { '@type': 'ImageObject', url: LOGO } },
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        serviceType: 'Shot Blasting & Surface Preparation',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: svc.title + ' Applications',
          itemListElement: svc.applications.map(function (a, i) { return { '@type': 'OfferCatalog', position: i + 1, name: a }; })
        },
        offers: { '@type': 'Offer', name: 'Free Quote for ' + svc.title, price: '0', priceCurrency: 'GBP', url: SITE + '/free-site-survey', availability: 'https://schema.org/InStock' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5', worstRating: '1' }
      },
      // 2. FAQPage
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: svc.faqs.map(function (f) {
          return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } };
        })
      },
      // 3. HowTo
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How We Perform ' + svc.title,
        description: 'Step-by-step process for our ' + svc.title + ' service',
        image: svc.image,
        totalTime: 'P1D',
        supply: [{ '@type': 'HowToSupply', name: 'Shot blasting media' }, { '@type': 'HowToSupply', name: 'Containment equipment' }],
        tool: [{ '@type': 'HowToTool', name: 'Mobile shot blasting unit' }, { '@type': 'HowToTool', name: 'Vacuum recovery system' }],
        step: svc.process.map(function (s) { return { '@type': 'HowToStep', position: s.step, name: s.title, text: s.text }; })
      },
      // 4. BreadcrumbList
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Services', item: SITE + '/services' },
          { '@type': 'ListItem', position: 3, name: svc.title, item: url }
        ]
      },
      // 5. WebPage
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': url + '#webpage',
        url: url,
        name: svc.title + ' | ' + BIZ,
        description: svc.description,
        isPartOf: { '@type': 'WebSite', '@id': SITE + '/#website', name: BIZ, url: SITE },
        inLanguage: 'en-GB'
      }
    ];

    var frag = document.createDocumentFragment();
    schemas.forEach(function (schema) {
      var el = document.createElement('script');
      el.type = 'application/ld+json';
      el.textContent = JSON.stringify(schema);
      frag.appendChild(el);
    });
    document.head.appendChild(frag);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSchemas);
  } else {
    injectSchemas();
  }
})();
