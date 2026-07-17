// FAQ data for remaining 15 services (not in top 10)
// These will be merged into serviceMeta in metaTags.ts

export const remainingServiceFAQs: Record<string, Array<{ question: string; answer: string }>> = {
  "machinery-equipment": [
    { 
      question: "Can you blast machinery and equipment without removing them from site?", 
      answer: "Yes, we provide mobile shot blasting services and can work on-site for most machinery. For large or complex equipment, we can arrange safe dismantling, blasting, and reassembly to minimize production downtime." 
    },
    { 
      question: "How do you protect sensitive components during blasting?", 
      answer: "We carefully mask or protect bearings, electrical connections, hydraulic ports, and other sensitive areas using specialized masking materials. Our experienced technicians ensure complete protection while achieving the required surface cleanliness." 
    },
    { 
      question: "What surface finish do you achieve for machinery?", 
      answer: "We typically achieve Sa 2.5 or Sa 3 cleanliness standards, providing an ideal surface for protective coatings, paint, or powder coating. The surface profile is suitable for long-term corrosion protection." 
    },
    { 
      question: "How long does machinery blasting typically take?", 
      answer: "Timeline depends on equipment size and complexity. Small machinery components can be processed in hours, while larger equipment may take 1-3 days. We provide detailed timelines after site assessment." 
    }
  ],
  "coating-removal": [
    { 
      question: "Can you remove all types of coatings?", 
      answer: "Yes, we can remove most industrial coatings including paint, epoxy, polyurethane, powder coating, and protective systems. We assess the coating type and select the appropriate blast media and pressure to remove it effectively." 
    },
    { 
      question: "Is coating removal faster than manual stripping?", 
      answer: "Shot blasting is significantly faster than manual methods like scraping or grinding. We can remove multiple coating layers in a fraction of the time, reducing project duration and labor costs." 
    },
    { 
      question: "Will shot blasting damage the substrate?", 
      answer: "No. Our experienced technicians use controlled pressure and appropriate blast media to remove coatings without damaging the underlying substrate. We can work on delicate surfaces when required." 
    },
    { 
      question: "What happens after coating removal?", 
      answer: "After removal, surfaces are clean and ready for new coatings. We coordinate timing with your coating contractor to apply new finishes within 24-48 hours to prevent surface oxidation." 
    }
  ],
  "abrasive-blasting": [
    { 
      question: "What's the difference between shot blasting and abrasive blasting?", 
      answer: "Shot blasting uses steel shot in a controlled, automated process for consistent results. Abrasive blasting uses various media (sand, grit, garnet) in a more manual process. We use shot blasting for most industrial applications due to superior consistency and efficiency." 
    },
    { 
      question: "Is abrasive blasting suitable for all materials?", 
      answer: "We can adapt our blasting approach to work with most materials including steel, aluminum, stainless steel, and cast iron. We select the appropriate media and pressure for each material to achieve optimal results." 
    },
    { 
      question: "How do you control dust and debris during abrasive blasting?", 
      answer: "We use containment systems, vacuum recovery equipment, and dust suppression techniques to control environmental impact. All waste is collected and disposed of responsibly." 
    }
  ],
  "surface-preparation": [
    { 
      question: "What surface preparation standards do you achieve?", 
      answer: "We routinely achieve Sa 2.5 (near-white metal) and Sa 3 (white metal) standards as defined by ISO 8501-1. These standards ensure optimal coating adhesion and long-term corrosion protection." 
    },
    { 
      question: "How do you verify surface preparation quality?", 
      answer: "We use surface profile gauges, cleanliness testing, and visual inspection to verify compliance with required standards. We provide documentation and test results for your records." 
    },
    { 
      question: "Can you achieve different surface profiles?", 
      answer: "Yes, we can adjust blast media and pressure to achieve different surface profiles (Rz values) depending on your coating system requirements. Coatings manufacturers specify the required profile for optimal adhesion." 
    }
  ],
  "blast-cleaning": [
    { 
      question: "What's the difference between blast cleaning and surface preparation?", 
      answer: "Blast cleaning removes contaminants and light coatings to restore appearance. Surface preparation achieves specific cleanliness standards (Sa 2.5/Sa 3) for new coating application. We can provide either service depending on your needs." 
    },
    { 
      question: "How often should blast cleaning be performed?", 
      answer: "Frequency depends on environmental conditions and coating durability. Industrial environments may require cleaning every 5-10 years. We can assess your specific situation and recommend maintenance schedules." 
    },
    { 
      question: "Can blast cleaning extend the life of existing coatings?", 
      answer: "Yes, regular blast cleaning removes contaminants that can cause coating failure. Combined with minor touch-up painting, blast cleaning can extend coating life significantly." 
    }
  ],
  "mobile-blasting": [
    { 
      question: "What are the advantages of mobile shot blasting?", 
      answer: "Mobile blasting eliminates transportation costs and risks, reduces downtime, and allows us to work on large or fixed structures. We bring our equipment to you, anywhere in the UK." 
    },
    { 
      question: "Can you work in confined spaces or difficult-to-access areas?", 
      answer: "Yes, we have specialized equipment and techniques for working in confined spaces, at height, and in difficult-to-access locations. We coordinate with your site team to ensure safety and efficiency." 
    },
    { 
      question: "How do you contain blast media and debris on-site?", 
      answer: "We use mobile containment systems, vacuum recovery equipment, and sheeting to control blast media and debris. All waste is collected and disposed of responsibly." 
    },
    { 
      question: "What's the minimum project size for mobile blasting?", 
      answer: "We can accommodate projects of any size. Even small projects benefit from our professional approach and equipment. Contact us for a quote on your specific requirements." 
    }
  ],
  "grit-blasting": [
    { 
      question: "What types of grit do you use?", 
      answer: "We use various grit types including steel grit, aluminum oxide, and garnet depending on your substrate and requirements. Each grit type offers different cutting characteristics and finish profiles." 
    },
    { 
      question: "Is grit blasting suitable for delicate surfaces?", 
      answer: "Yes, we can use fine-grade grit and controlled pressure for delicate surfaces. This is particularly useful for heritage restoration and precision components." 
    },
    { 
      question: "How do you select the appropriate grit size?", 
      answer: "Grit selection depends on your substrate material, desired surface profile, and coating requirements. We assess your project and recommend the optimal grit type and size." 
    }
  ],
  "castings-forgings": [
    { 
      question: "Can you blast iron castings and steel forgings?", 
      answer: "Yes, we specialize in blasting castings and forgings. We remove sand, scale, and surface contaminants to prepare these components for machining, coating, or assembly." 
    },
    { 
      question: "How do you handle delicate casting features?", 
      answer: "We use controlled blast pressure and appropriate media to remove scale and contaminants while preserving fine casting details. Our experienced technicians ensure dimensional accuracy is maintained." 
    },
    { 
      question: "What's the typical turnaround for casting and forging blasting?", 
      answer: "Turnaround depends on batch size and complexity. We can often process castings and forgings within 1-2 weeks. Contact us for specific timelines on your project." 
    }
  ],
  "vehicle-parts": [
    { 
      question: "Can you blast automotive and vehicle components?", 
      answer: "Yes, we blast a wide range of vehicle parts including chassis components, engine blocks, suspension parts, and structural elements. We ensure all components are properly prepared for coating or assembly." 
    },
    { 
      question: "How do you protect threaded holes and bearing surfaces?", 
      answer: "We carefully mask threaded holes, bearing surfaces, and other critical areas using specialized masking materials. This ensures these areas remain clean and functional." 
    },
    { 
      question: "What surface finish is typical for vehicle parts?", 
      answer: "We typically achieve Sa 2.5 or Sa 3 cleanliness standards, providing an ideal surface for paint, powder coating, or protective systems used in automotive applications." 
    }
  ],
  "agricultural-equipment": [
    { 
      question: "Can you blast large agricultural machinery?", 
      answer: "Yes, we can blast tractors, combines, harvesters, and other large agricultural equipment. We provide mobile services to minimize disruption to your farming operations." 
    },
    { 
      question: "How do you protect engines and mechanical components?", 
      answer: "We carefully mask or protect engines, hydraulic systems, electrical components, and other sensitive areas. Our technicians ensure these components remain protected and functional." 
    },
    { 
      question: "What's the best time to have agricultural equipment blasted?", 
      answer: "Off-season is ideal to minimize disruption to your operations. We can schedule work around your farming calendar to ensure equipment is ready when you need it." 
    },
    { 
      question: "Can blasting extend the life of agricultural equipment?", 
      answer: "Yes, removing rust and applying protective coatings can significantly extend equipment life. Regular maintenance blasting can prevent corrosion and costly repairs." 
    }
  ],
  "construction-equipment": [
    { 
      question: "Can you blast excavators, bulldozers, and other heavy equipment?", 
      answer: "Yes, we blast all types of construction equipment. We can work on-site or arrange transportation to our facility depending on equipment size and your preferences." 
    },
    { 
      question: "How long does construction equipment blasting take?", 
      answer: "Timeline depends on equipment size and condition. Most equipment can be processed within 1-3 days. We minimize downtime by working efficiently and coordinating with your schedule." 
    },
    { 
      question: "What coatings are recommended after blasting?", 
      answer: "We recommend industrial-grade paint or powder coating for construction equipment. These provide excellent corrosion protection and durability in harsh construction environments." 
    }
  ],
  "pipework-vessels": [
    { 
      question: "Can you blast pipework and vessels in place?", 
      answer: "Yes, we can blast pipework and vessels while installed using specialized containment and access equipment. For large vessels, we can also arrange safe removal and on-site blasting." 
    },
    { 
      question: "How do you ensure safety when blasting pressurized vessels?", 
      answer: "We follow strict safety protocols including pressure relief, isolation, and lockout procedures. All work is coordinated with your safety team to ensure compliance with regulations." 
    },
    { 
      question: "What surface preparation standards are required for pipework?", 
      answer: "We typically achieve Sa 2.5 or Sa 3 standards depending on your coating system requirements. Proper surface preparation ensures long-term corrosion protection for critical pipework." 
    },
    { 
      question: "Can you blast stainless steel pipework?", 
      answer: "Yes, we can blast stainless steel using appropriate media and pressure. We ensure the stainless steel surface is not contaminated with ferrous material during the process." 
    }
  ],
  "architectural-metalwork": [
    { 
      question: "Can you blast decorative metalwork without damaging fine details?", 
      answer: "Yes, we use fine-grade blast media and carefully controlled pressure to clean decorative metalwork while preserving fine details, textures, and dimensional tolerances." 
    },
    { 
      question: "What finishes can be applied after blasting?", 
      answer: "After blasting, architectural metalwork can be powder coated, wet painted, galvanized, or left with a clear protective coating depending on your design requirements." 
    },
    { 
      question: "How do you handle heritage and listed building metalwork?", 
      answer: "We work carefully with heritage metalwork, using gentle blasting techniques to preserve original features. We coordinate with conservation specialists to ensure compliance with heritage requirements." 
    }
  ],
  "heritage-restoration": [
    { 
      question: "Can you restore heritage metalwork without damage?", 
      answer: "Yes, we specialize in heritage restoration using gentle blasting techniques. We preserve original features, patina where appropriate, and dimensional accuracy." 
    },
    { 
      question: "What's involved in heritage metalwork restoration?", 
      answer: "We assess the metalwork, determine appropriate restoration methods, carefully remove corrosion and old coatings, and apply protective finishes that preserve the heritage character." 
    },
    { 
      question: "Do you work with conservation specialists?", 
      answer: "Yes, we coordinate with conservation specialists and heritage authorities to ensure all work meets conservation standards and requirements." 
    },
    { 
      question: "How do you ensure historical accuracy in restoration?", 
      answer: "We research original finishes and materials, use appropriate restoration techniques, and apply period-correct protective coatings to maintain historical authenticity." 
    }
  ],
  "ladders": [
    { 
      question: "Can you blast fixed ladder systems?", 
      answer: "Yes, we can blast fixed ladder systems including caged ladders, access ladders, and safety systems. We work carefully to maintain structural integrity and safety features." 
    },
    { 
      question: "How do you ensure ladder safety during blasting?", 
      answer: "We follow strict safety protocols including structural assessment, protective measures, and careful blasting techniques. All work is coordinated with your safety team." 
    },
    { 
      question: "What coatings are recommended for ladders?", 
      answer: "We recommend industrial-grade paint or powder coating for ladders. These provide excellent corrosion protection and durability in outdoor or harsh environments." 
    }
  ]
};
