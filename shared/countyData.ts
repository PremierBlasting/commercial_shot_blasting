
export interface CountyData {
  name: string;
  slug: string;
  region: string;
  description: string;
  url: string;
  latitude: number;
  longitude: number;
  majorTowns: string[];
  industries: string[];
  townsAndVillages: string[];
  faqs: { question: string; answer: string; }[];
  ogImage?: string;
  metaDescription?: string;
}

export const countyData: Record<string, CountyData> = {
  // East of England
  "bedfordshire": {
    name: "Bedfordshire",
    slug: "bedfordshire",
    region: "East of England",
    description: "Professional shot blasting services in Bedfordshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting services across Bedfordshire — structural steel, warehouse racking, factory cladding & automotive components. SA2.5/SA3 standard. Serving Luton, Bedford & Dunstable. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/bedfordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VlcajxKFizWfRmvv.webp",
    latitude: 52.0406,
    longitude: -0.4547,
    majorTowns: ["Luton", "Bedford", "Dunstable", "Leighton Buzzard"],
    industries: ["Manufacturing", "Logistics", "Construction", "Automotive"],
    townsAndVillages: ["Ampthill", "Arlesey", "Aspley Guise", "Barton-le-Clay", "Biggleswade", "Blunham", "Bromham", "Caddington", "Carlton", "Clophill", "Cranfield", "Eaton Bray", "Flitwick", "Harlington", "Henlow", "Houghton Regis", "Kempston", "Lidlington", "Marston Moretaine", "Maulden", "Potton", "Sandy", "Shefford", "Silsoe", "Southill", "Stotfold", "Toddington", "Woburn", "Wootton"],
    faqs: [
      {
        question: "Do you offer mobile shot blasting services in Luton and Bedford?",
        answer: "Yes — our mobile shot blasting units travel directly to sites across Bedfordshire, including Luton, Bedford, Dunstable, and Leighton Buzzard. We bring all equipment to your premises so there is no need to transport materials."
      },
      {
        question: "Can you shot blast logistics and warehouse structures in Bedfordshire?",
        answer: "Yes. Bedfordshire has a large logistics and distribution sector and we regularly shot blast warehouse racking, mezzanine floors, steel cladding, and structural steelwork for distribution centres and industrial units across the county."
      },
      {
        question: "What surface standard do you achieve for shot blasting in Bedfordshire?",
        answer: "We achieve SA2.5 near white metal as standard across all Bedfordshire projects. Where a higher specification is required — such as SA3 white metal for aggressive coating systems — we can accommodate this. Surface profiles are confirmed before coating."
      },
      {
        question: "Do you shot blast automotive components and manufacturing equipment in Bedfordshire?",
        answer: "Yes — we work with automotive and manufacturing businesses across Bedfordshire, shot blasting plant, machinery, fabricated components, and production equipment. We can work on-site at your facility to minimise downtime."
      },
      {
        question: "How do I get a free quote for shot blasting in Bedfordshire?",
        answer: "Call us on 07970 566409 or submit a quote request on our website. We offer free site surveys across Bedfordshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "cambridgeshire": {
    name: "Cambridgeshire",
    slug: "cambridgeshire",
    region: "East of England",
    description: "Professional shot blasting services in Cambridgeshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting services in Cambridgeshire — agricultural machinery, construction steelwork & manufacturing plant. SA2.5/SA3 standard. Covering Cambridge, Peterborough & Ely. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/cambridgeshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    latitude: 52.2053,
    longitude: 0.1218,
    majorTowns: ["Cambridge", "Peterborough", "Ely", "Huntingdon"],
    industries: ["Technology", "Manufacturing", "Agriculture", "Construction"],
    townsAndVillages: ["Bar Hill", "Burwell", "Chatteris", "Cottenham", "Doddington", "Fulbourn", "Gamlingay", "Girton", "Godmanchester", "Histon", "Impington", "Linton", "Little Paxton", "Littleport", "March", "Melbourn", "Orwell", "Ramsey", "Sawston", "Sawtry", "Soham", "St Ives", "St Neots", "Swavesey", "Waterbeach", "Whittlesey", "Willingham", "Wisbech", "Yaxley"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Cambridge and Peterborough?",
        answer: "Yes — we cover all of Cambridgeshire with our mobile shot blasting units, including Cambridge, Peterborough, Ely, Huntingdon, and St Neots. We travel to your site so no transportation of materials is required."
      },
      {
        question: "Can you shot blast agricultural equipment in Cambridgeshire?",
        answer: "Yes. Cambridgeshire has a significant agricultural sector and we regularly shot blast farm machinery, grain handling equipment, trailers, and irrigation structures across the county. We work on-site at farms and agricultural premises."
      },
      {
        question: "Do you carry out shot blasting for construction projects in Cambridgeshire?",
        answer: "Yes — we provide shot blasting for structural steelwork, fabricated frames, and construction components across Cambridgeshire. We work with contractors and steel fabricators to prepare surfaces to SA2.5 or SA3 standard prior to protective coating."
      },
      {
        question: "What is the minimum order size for shot blasting in Cambridgeshire?",
        answer: "We do not impose a minimum order size. Whether you need a single item blasted or a large batch of structural steelwork, we can accommodate the project. Contact us to discuss your specific requirements and we will provide a tailored quote."
      },
      {
        question: "How do I arrange a site visit for shot blasting in Cambridgeshire?",
        answer: "Call 07970 566409 or use our online quote form. We offer free site surveys across Cambridgeshire and can usually arrange a visit within 2–5 working days of your enquiry."
      }
    ]
  },
  "hertfordshire": {
    name: "Hertfordshire",
    slug: "hertfordshire",
    region: "East of England",
    description: "Professional shot blasting services in Hertfordshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting services in Hertfordshire — logistics warehouse racking, retail steelwork & factory cladding. SA2.5/SA3 standard. Serving St Albans, Watford & Stevenage. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/hertfordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YBedohTImNkgXOlG.webp",
    latitude: 51.8090,
    longitude: -0.2376,
    majorTowns: ["St Albans", "Watford", "Stevenage", "Hemel Hempstead"],
    industries: ["Manufacturing", "Logistics", "Retail", "Construction"],
    townsAndVillages: ["Abbots Langley", "Baldock", "Berkhamsted", "Bishops Stortford", "Borehamwood", "Bovingdon", "Broxbourne", "Buntingford", "Bushey", "Cheshunt", "Chorleywood", "Harpenden", "Hatfield", "Hertford", "Hitchin", "Hoddesdon", "Kings Langley", "Knebworth", "Letchworth", "Potters Bar", "Radlett", "Rickmansworth", "Royston", "Sawbridgeworth", "Tring", "Ware", "Welwyn", "Welwyn Garden City"],
    faqs: [
      {
        question: "Do you cover St Albans, Watford, and Stevenage for shot blasting?",
        answer: "Yes — our mobile shot blasting units serve all of Hertfordshire including St Albans, Watford, Stevenage, Hemel Hempstead, Hatfield, and Welwyn Garden City. We come to your site with all equipment needed."
      },
      {
        question: "Can you shot blast retail and commercial property steelwork in Hertfordshire?",
        answer: "Yes. We work with retail developers, commercial property owners, and construction contractors across Hertfordshire, shot blasting structural steelwork, cladding, and fabricated components for commercial buildings."
      },
      {
        question: "Do you offer shot blasting for logistics and distribution centres in Hertfordshire?",
        answer: "Yes — Hertfordshire has a large logistics sector and we regularly shot blast warehouse racking, mezzanine floors, loading bay steelwork, and structural frames for distribution centres and logistics parks across the county."
      },
      {
        question: "How quickly can you respond to shot blasting enquiries in Hertfordshire?",
        answer: "We typically respond to all enquiries within 24 hours and can usually schedule a free site survey in Hertfordshire within 2–5 working days. For urgent projects we can often accommodate faster turnaround."
      },
      {
        question: "How do I get a quote for shot blasting in Hertfordshire?",
        answer: "Call us on 07970 566409 or request a free quote through our website. We offer no-obligation site surveys and will provide a detailed written quotation for your Hertfordshire project."
      }
    ]
  },
  "norfolk": {
    name: "Norfolk",
    slug: "norfolk",
    region: "East of England",
    description: "Professional shot blasting services in Norfolk. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Norfolk — agricultural machinery, marine & offshore structures, energy sector plant. SA2.5/SA3 standard. Covering Norwich, Great Yarmouth & King's Lynn. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/norfolk",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/wNJxNfMjngkYNOyk.webp",
    latitude: 52.6309,
    longitude: 1.2974,
    majorTowns: ["Norwich", "King's Lynn", "Great Yarmouth", "Thetford"],
    industries: ["Agriculture", "Marine", "Manufacturing", "Energy"],
    townsAndVillages: ["Acle", "Attleborough", "Aylsham", "Brundall", "Caister-on-Sea", "Costessey", "Cromer", "Dereham", "Diss", "Downham Market", "Fakenham", "Gorleston", "Harleston", "Hethersett", "Holt", "Hunstanton", "Long Stratton", "Loddon", "North Walsham", "Reepham", "Sheringham", "Sprowston", "Stalham", "Swaffham", "Taverham", "Thetford", "Watton", "Wells-next-the-Sea", "Wymondham"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Norwich and Great Yarmouth?",
        answer: "Yes — we cover all of Norfolk with our mobile shot blasting units, including Norwich, King's Lynn, Great Yarmouth, and Thetford. Our mobile service means we come to your site anywhere in the county."
      },
      {
        question: "Can you shot blast marine and offshore equipment in Norfolk?",
        answer: "Yes. Norfolk has a significant marine and offshore energy sector, particularly around Great Yarmouth. We provide specialist shot blasting for marine structures, offshore equipment, vessels, and port infrastructure to the required surface standard."
      },
      {
        question: "Do you shot blast agricultural machinery in Norfolk?",
        answer: "Yes — Norfolk's large agricultural sector is one of our core markets. We shot blast tractors, combine harvesters, grain handling equipment, trailers, and farm buildings across the county, working on-site at farms and agricultural premises."
      },
      {
        question: "What blast standards do you work to for energy sector projects in Norfolk?",
        answer: "We work to SA2.5 near white metal and SA3 white metal standards as required. For energy sector and offshore projects in Norfolk, we can provide documentation confirming the surface cleanliness and profile achieved."
      },
      {
        question: "How do I get a free quote for shot blasting in Norfolk?",
        answer: "Call 07970 566409 or submit a quote request on our website. We offer free site surveys across Norfolk and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "suffolk": {
    name: "Suffolk",
    slug: "suffolk",
    region: "East of England",
    description: "Professional shot blasting services in Suffolk. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Suffolk — port & logistics infrastructure, agricultural equipment & marine vessels. SA2.5/SA3 standard. Serving Ipswich, Felixstowe & Lowestoft. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/suffolk",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp",
    latitude: 52.1872,
    longitude: 0.9708,
    majorTowns: ["Ipswich", "Bury St Edmunds", "Lowestoft", "Felixstowe"],
    industries: ["Agriculture", "Marine", "Logistics", "Manufacturing"],
    townsAndVillages: ["Aldeburgh", "Beccles", "Brandon", "Bungay", "Clare", "Debenham", "Eye", "Framlingham", "Hadleigh", "Halesworth", "Haverhill", "Kesgrave", "Leiston", "Mildenhall", "Needham Market", "Newmarket", "Saxmundham", "Southwold", "Stowmarket", "Sudbury", "Wickham Market", "Woodbridge"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Ipswich, Felixstowe, and Lowestoft?",
        answer: "Yes — we cover all of Suffolk with our mobile shot blasting units, including Ipswich, Bury St Edmunds, Lowestoft, and Felixstowe. We bring all equipment to your site so no transportation of materials is required."
      },
      {
        question: "Can you shot blast port and logistics infrastructure in Suffolk?",
        answer: "Yes. Suffolk's ports at Felixstowe and Ipswich generate significant demand for shot blasting of port infrastructure, container handling equipment, and logistics structures. We provide on-site shot blasting for port and logistics operators across the county."
      },
      {
        question: "Do you offer shot blasting for agricultural equipment in Suffolk?",
        answer: "Yes — Suffolk's farming sector is a key market for us. We shot blast farm machinery, grain storage equipment, trailers, and agricultural buildings across the county, working on-site to avoid the need to transport heavy equipment."
      },
      {
        question: "Can you shot blast marine vessels and structures in Lowestoft?",
        answer: "Yes. We provide shot blasting for marine vessels, offshore structures, and port equipment in Lowestoft and across the Suffolk coast. We work to SA2.5 and SA3 standards and can provide documentation on request."
      },
      {
        question: "How do I get a quote for shot blasting in Suffolk?",
        answer: "Call 07970 566409 or use our online quote form. We offer free site surveys across Suffolk and respond to enquiries within 24 hours."
      }
    ]
  },

  // East Midlands
  "derbyshire": {
    name: "Derbyshire",
    slug: "derbyshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Derbyshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Derbyshire — aerospace components, manufacturing plant & construction steelwork. SA2.5/SA3 to BS EN ISO 8501-1. Serving Derby, Chesterfield & Ilkeston. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/derbyshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    latitude: 53.1235,
    longitude: -1.4907,
    majorTowns: ["Derby", "Chesterfield", "Ilkeston", "Buxton"],
    industries: ["Manufacturing", "Aerospace", "Construction", "Engineering"],
    townsAndVillages: ["Alfreton", "Ashbourne", "Bakewell", "Belper", "Bolsover", "Chapel-en-le-Frith", "Clay Cross", "Glossop", "Hathersage", "Heanor", "Ilkeston", "Long Eaton", "Matlock", "New Mills", "Ripley", "Shirebrook", "Staveley", "Swadlincote", "Whaley Bridge", "Wirksworth"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Derby and Chesterfield?",
        answer: "Yes — our mobile shot blasting units cover all of Derbyshire, including Derby, Chesterfield, Ilkeston, and Buxton. We travel to your site with all equipment, eliminating the need to transport materials."
      },
      {
        question: "Can you shot blast aerospace components and precision engineering parts in Derbyshire?",
        answer: "Yes. Derbyshire has a strong aerospace and precision engineering sector. We provide controlled shot blasting for aerospace components, engineering fabrications, and precision parts, working to the surface standards required for your application."
      },
      {
        question: "Do you shot blast manufacturing plant and machinery in Derbyshire?",
        answer: "Yes — we regularly shot blast industrial plant, production machinery, fabricated frames, and structural steelwork for manufacturing businesses across Derbyshire. We work on-site to minimise production downtime."
      },
      {
        question: "What surface cleanliness standard do you achieve in Derbyshire?",
        answer: "We achieve SA2.5 near white metal as standard, with SA3 white metal available where required. All work is carried out to BS EN ISO 8501-1 standards and we can provide documentation confirming the surface profile achieved."
      },
      {
        question: "How do I get a free quote for shot blasting in Derbyshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Derbyshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "leicestershire": {
    name: "Leicestershire",
    slug: "leicestershire",
    region: "East Midlands",
    description: "Professional shot blasting services in Leicestershire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Leicestershire — logistics warehouse structures, engineering fabrications & manufacturing plant. SA2.5/SA3 standard. Covering Leicester, Loughborough & Hinckley. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/leicestershire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp",
    latitude: 52.6369,
    longitude: -1.1398,
    majorTowns: ["Leicester", "Loughborough", "Hinckley", "Market Harborough"],
    industries: ["Manufacturing", "Logistics", "Textiles", "Engineering"],
    townsAndVillages: ["Anstey", "Ashby-de-la-Zouch", "Barrow upon Soar", "Blaby", "Braunstone", "Burbage", "Castle Donington", "Countesthorpe", "Earl Shilton", "Enderby", "Groby", "Ibstock", "Kegworth", "Kibworth", "Lutterworth", "Market Bosworth", "Market Harborough", "Measham", "Melton Mowbray", "Mountsorrel", "Narborough", "Oadby", "Quorn", "Shepshed", "Sileby", "Syston", "Wigston"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Leicester and Loughborough?",
        answer: "Yes — our mobile shot blasting units cover all of Leicestershire, including Leicester, Loughborough, Hinckley, and Market Harborough. We come to your site so there is no need to transport materials."
      },
      {
        question: "Can you shot blast logistics and distribution centre structures in Leicestershire?",
        answer: "Yes. Leicestershire is a major logistics hub and we regularly shot blast warehouse racking, mezzanine floors, loading bay steelwork, and structural frames for distribution centres and logistics parks across the county."
      },
      {
        question: "Do you shot blast engineering fabrications and manufacturing equipment in Leicestershire?",
        answer: "Yes — we work with engineering businesses and manufacturers across Leicestershire, shot blasting fabricated steelwork, plant, machinery, and production equipment. We can work on-site at your facility to minimise downtime."
      },
      {
        question: "How long does shot blasting take for a typical project in Leicestershire?",
        answer: "Timescales depend on the size and complexity of the project. A single item such as a machine base can often be completed in a day, while larger structural projects may take 2–5 days. We provide a detailed programme as part of our quotation."
      },
      {
        question: "How do I get a quote for shot blasting in Leicestershire?",
        answer: "Call 07970 566409 or submit a quote request on our website. We offer free site surveys across Leicestershire and respond to enquiries within 24 hours."
      }
    ]
  },
  "lincolnshire": {
    name: "Lincolnshire",
    slug: "lincolnshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Lincolnshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Lincolnshire — agricultural machinery, food processing plant & port infrastructure. SA2.5/SA3 standard. Serving Lincoln, Grimsby & Boston. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/lincolnshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WozicopVSALZJtEo.webp",
    latitude: 53.0793,
    longitude: -0.5405,
    majorTowns: ["Lincoln", "Grantham", "Boston", "Spalding"],
    industries: ["Agriculture", "Food Processing", "Manufacturing", "Engineering"],
    townsAndVillages: ["Alford", "Bourne", "Brigg", "Caistor", "Cleethorpes", "Crowland", "Gainsborough", "Grimsby", "Holbeach", "Horncastle", "Immingham", "Louth", "Mablethorpe", "Market Deeping", "Market Rasen", "Skegness", "Sleaford", "Spalding", "Stamford", "Sutton Bridge", "Wainfleet", "Woodhall Spa"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Lincoln, Grimsby, and Boston?",
        answer: "Yes — our mobile shot blasting units cover all of Lincolnshire, including Lincoln, Grantham, Boston, Spalding, Grimsby, and Immingham. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast agricultural machinery and grain handling equipment in Lincolnshire?",
        answer: "Yes. Lincolnshire is one of England's most productive agricultural counties and we regularly shot blast farm machinery, grain dryers, storage silos, trailers, and agricultural buildings across the county. We work on-site at farms."
      },
      {
        question: "Do you shot blast food processing and manufacturing plant in Lincolnshire?",
        answer: "Yes — Lincolnshire's food processing sector is a key market for us. We shot blast production equipment, structural steelwork, and factory cladding for food processing facilities across the county, working to the required surface standards."
      },
      {
        question: "Can you shot blast port and marine structures at Grimsby and Immingham?",
        answer: "Yes. We provide shot blasting for port infrastructure, marine structures, and offshore equipment at Grimsby and Immingham. We work to SA2.5 and SA3 standards and can provide documentation on request."
      },
      {
        question: "How do I get a free quote for shot blasting in Lincolnshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Lincolnshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "northamptonshire": {
    name: "Northamptonshire",
    slug: "northamptonshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Northamptonshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Northamptonshire — steel fabrications, logistics warehouse structures & automotive plant. SA2.5/SA3 standard. Serving Northampton, Corby & Kettering. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/northamptonshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VlcajxKFizWfRmvv.webp",
    latitude: 52.2405,
    longitude: -0.9027,
    majorTowns: ["Northampton", "Corby", "Kettering", "Wellingborough"],
    industries: ["Manufacturing", "Logistics", "Automotive", "Construction"],
    townsAndVillages: ["Brackley", "Burton Latimer", "Daventry", "Desborough", "Higham Ferrers", "Irthlingborough", "Long Buckby", "Oundle", "Raunds", "Rothwell", "Rushden", "Thrapston", "Towcester"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Northampton, Corby, and Kettering?",
        answer: "Yes — our mobile shot blasting units cover all of Northamptonshire, including Northampton, Corby, Kettering, and Wellingborough. We come to your site so no transportation of materials is required."
      },
      {
        question: "Can you shot blast steel structures and fabrications in Corby?",
        answer: "Yes. Corby has a strong steel and manufacturing heritage and we regularly shot blast structural steelwork, fabricated frames, and industrial structures across the Corby area and wider Northamptonshire."
      },
      {
        question: "Do you offer shot blasting for logistics and distribution centres in Northamptonshire?",
        answer: "Yes — Northamptonshire is a major logistics hub and we shot blast warehouse racking, mezzanine floors, structural steelwork, and cladding for distribution centres and logistics parks across the county."
      },
      {
        question: "Can you shot blast automotive components and manufacturing plant in Northamptonshire?",
        answer: "Yes. We work with automotive and manufacturing businesses across Northamptonshire, shot blasting plant, machinery, fabricated components, and production equipment on-site at your facility."
      },
      {
        question: "How do I get a quote for shot blasting in Northamptonshire?",
        answer: "Call 07970 566409 or submit a quote request on our website. We offer free site surveys across Northamptonshire and respond to enquiries within 24 hours."
      }
    ]
  },
  "nottinghamshire": {
    name: "Nottinghamshire",
    slug: "nottinghamshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Nottinghamshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Nottinghamshire — structural steelwork, manufacturing plant & fire escapes. SA2.5/SA3 standard. Covering Nottingham, Mansfield & Newark-on-Trent. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/nottinghamshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    latitude: 53.0027,
    longitude: -1.1581,
    majorTowns: ["Nottingham", "Mansfield", "Newark-on-Trent", "Worksop"],
    industries: ["Manufacturing", "Engineering", "Construction", "Logistics"],
    townsAndVillages: ["Arnold", "Beeston", "Bingham", "Blidworth", "Carlton", "Eastwood", "Hucknall", "Kirkby-in-Ashfield", "Langold", "Long Eaton", "Netherfield", "Ollerton", "Radcliffe on Trent", "Retford", "Ruddington", "Selston", "Southwell", "Stapleford", "Sutton-in-Ashfield", "West Bridgford"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Nottingham and Mansfield?",
        answer: "Yes — our mobile shot blasting units cover all of Nottinghamshire, including Nottingham, Mansfield, Newark-on-Trent, and Worksop. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast structural steelwork and construction frames in Nottinghamshire?",
        answer: "Yes. We work with construction contractors and steel fabricators across Nottinghamshire, shot blasting structural frames, beams, columns, and fabricated steelwork to SA2.5 or SA3 standard prior to protective coating."
      },
      {
        question: "Do you shot blast manufacturing plant and engineering fabrications in Nottinghamshire?",
        answer: "Yes — we regularly shot blast industrial plant, production machinery, and engineering fabrications for manufacturers across Nottinghamshire. We work on-site at your facility to minimise production disruption."
      },
      {
        question: "Can you shot blast fire escapes and external steelwork in Nottinghamshire?",
        answer: "Yes. We provide specialist shot blasting for fire escapes, external stair towers, and structural metalwork across Nottinghamshire. We coordinate access and work safely at height to deliver a thorough surface preparation."
      },
      {
        question: "How do I get a free quote for shot blasting in Nottinghamshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Nottinghamshire and typically respond to enquiries within 24 hours."
      }
    ]
  },

  // West Midlands
  "herefordshire": {
    name: "Herefordshire",
    slug: "herefordshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Herefordshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Herefordshire — agricultural machinery, food processing plant & heritage structures. SA2.5/SA3 standard. Serving Hereford, Leominster & Ross-on-Wye. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/herefordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YBedohTImNkgXOlG.webp",
    latitude: 52.0565,
    longitude: -2.7160,
    majorTowns: ["Hereford", "Leominster", "Ross-on-Wye", "Ledbury"],
    industries: ["Agriculture", "Food Processing", "Manufacturing", "Construction"],
    townsAndVillages: ["Bromyard", "Colwall", "Ewyas Harold", "Hay-on-Wye", "Kington", "Ledbury", "Leominster", "Peterchurch", "Ross-on-Wye", "Weobley"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Hereford and across Herefordshire?",
        answer: "Yes — our mobile shot blasting units cover all of Herefordshire, including Hereford, Leominster, Ross-on-Wye, and Ledbury. We come to your site with all equipment so no transportation of materials is required."
      },
      {
        question: "Can you shot blast agricultural machinery and farm equipment in Herefordshire?",
        answer: "Yes. Herefordshire's farming and food production sector is one of our core markets. We shot blast tractors, farm machinery, cider press equipment, trailers, and agricultural buildings across the county, working on-site at farms."
      },
      {
        question: "Do you shot blast food processing plant and equipment in Herefordshire?",
        answer: "Yes — we work with food processing businesses across Herefordshire, shot blasting production equipment, structural steelwork, and factory cladding. We work to the required surface standards for your coating system."
      },
      {
        question: "Can you shot blast heritage and restoration projects in Herefordshire?",
        answer: "Yes. We provide specialist shot blasting for heritage structures, listed buildings, and restoration projects across Herefordshire. We use appropriate blast media and pressure to clean surfaces without causing damage."
      },
      {
        question: "How do I get a free quote for shot blasting in Herefordshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Herefordshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "shropshire": {
    name: "Shropshire",
    slug: "shropshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Shropshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Shropshire — manufacturing plant, engineering fabrications & agricultural equipment. SA2.5/SA3 standard. Covering Shrewsbury, Telford & Oswestry. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/shropshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/wNJxNfMjngkYNOyk.webp",
    latitude: 52.7069,
    longitude: -2.7447,
    majorTowns: ["Shrewsbury", "Telford", "Oswestry", "Bridgnorth"],
    industries: ["Manufacturing", "Engineering", "Agriculture", "Construction"],
    townsAndVillages: ["Albrighton", "Bishops Castle", "Bridgnorth", "Broseley", "Church Stretton", "Cleobury Mortimer", "Craven Arms", "Dawley", "Ellesmere", "Ludlow", "Madeley", "Market Drayton", "Much Wenlock", "Newport", "Oakengates", "Oswestry", "Wellington", "Wem", "Whitchurch"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Shrewsbury, Telford, and Oswestry?",
        answer: "Yes — our mobile shot blasting units cover all of Shropshire, including Shrewsbury, Telford, Oswestry, and Bridgnorth. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast manufacturing and engineering fabrications in Shropshire?",
        answer: "Yes. Shropshire has a strong manufacturing and engineering sector, particularly around Telford. We shot blast fabricated steelwork, plant, machinery, and production equipment for manufacturers across the county."
      },
      {
        question: "Do you offer shot blasting for agricultural equipment in Shropshire?",
        answer: "Yes — we regularly shot blast farm machinery, trailers, agricultural buildings, and equipment for farming businesses across Shropshire. We work on-site at farms and agricultural premises."
      },
      {
        question: "Can you shot blast structural steelwork for construction projects in Shropshire?",
        answer: "Yes. We work with construction contractors and steel fabricators across Shropshire, shot blasting structural frames, beams, and fabricated components to SA2.5 or SA3 standard prior to protective coating."
      },
      {
        question: "How do I get a free quote for shot blasting in Shropshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Shropshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "staffordshire": {
    name: "Staffordshire",
    slug: "staffordshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Staffordshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Staffordshire — ceramics plant, automotive components & factory cladding. SA2.5/SA3 standard. Serving Stoke-on-Trent, Stafford & Tamworth. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/staffordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp",
    latitude: 52.8382,
    longitude: -2.0347,
    majorTowns: ["Stoke-on-Trent", "Stafford", "Tamworth", "Newcastle-under-Lyme"],
    industries: ["Ceramics", "Manufacturing", "Engineering", "Automotive"],
    townsAndVillages: ["Abbots Bromley", "Biddulph", "Brewood", "Burntwood", "Cheadle", "Eccleshall", "Fazeley", "Hednesford", "Kidsgrove", "Kinver", "Leek", "Penkridge", "Rugeley", "Stone", "Tutbury", "Uttoxeter", "Wombourne"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Stoke-on-Trent, Stafford, and Tamworth?",
        answer: "Yes — our mobile shot blasting units cover all of Staffordshire, including Stoke-on-Trent, Stafford, Tamworth, and Newcastle-under-Lyme. We come to your site with all equipment needed."
      },
      {
        question: "Can you shot blast ceramics and manufacturing plant in Stoke-on-Trent?",
        answer: "Yes. Stoke-on-Trent's ceramics and manufacturing sector generates demand for shot blasting of kiln equipment, production plant, structural steelwork, and factory cladding. We work on-site at your facility."
      },
      {
        question: "Do you shot blast automotive components and engineering fabrications in Staffordshire?",
        answer: "Yes — Staffordshire has a strong automotive and engineering sector. We shot blast fabricated components, jigs, fixtures, production machinery, and structural steelwork for automotive and engineering businesses across the county."
      },
      {
        question: "Can you shot blast factory cladding and industrial buildings in Staffordshire?",
        answer: "Yes. We provide specialist shot blasting for factory cladding, warehouse exteriors, and industrial building steelwork across Staffordshire. We remove old coatings, rust, and mill scale to prepare surfaces for recoating."
      },
      {
        question: "How do I get a free quote for shot blasting in Staffordshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Staffordshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "warwickshire": {
    name: "Warwickshire",
    slug: "warwickshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Warwickshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Warwickshire — automotive & aerospace fabrications, structural steelwork & manufacturing plant. SA2.5/SA3 standard. Serving Leamington Spa, Rugby & Nuneaton. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/warwickshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    latitude: 52.2819,
    longitude: -1.5849,
    majorTowns: ["Leamington Spa", "Rugby", "Warwick", "Nuneaton"],
    industries: ["Automotive", "Manufacturing", "Engineering", "Aerospace"],
    townsAndVillages: ["Alcester", "Atherstone", "Bedworth", "Bulkington", "Coleshill", "Henley-in-Arden", "Kenilworth", "Polesworth", "Shipston-on-Stour", "Southam", "Studley", "Wellesbourne", "Whitnash"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Leamington Spa, Rugby, and Nuneaton?",
        answer: "Yes — our mobile shot blasting units cover all of Warwickshire, including Leamington Spa, Rugby, Warwick, and Nuneaton. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast automotive components and aerospace fabrications in Warwickshire?",
        answer: "Yes. Warwickshire has a strong automotive and aerospace engineering sector. We shot blast fabricated components, jigs, tooling, production machinery, and structural steelwork for automotive and aerospace businesses across the county."
      },
      {
        question: "Do you shot blast structural steelwork for construction projects in Warwickshire?",
        answer: "Yes — we work with construction contractors and steel fabricators across Warwickshire, shot blasting structural frames, beams, and fabricated components to SA2.5 or SA3 standard prior to protective coating."
      },
      {
        question: "Can you shot blast manufacturing plant and industrial equipment in Warwickshire?",
        answer: "Yes. We regularly shot blast industrial plant, production machinery, and engineering fabrications for manufacturers across Warwickshire. We work on-site at your facility to minimise production downtime."
      },
      {
        question: "How do I get a free quote for shot blasting in Warwickshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Warwickshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "west-midlands": {
    name: "West Midlands",
    slug: "west-midlands",
    region: "West Midlands",
    description: "Professional shot blasting services in West Midlands. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in the West Midlands — automotive production tooling, aerospace fabrications & factory cladding. SA2.5/SA3 standard. Serving Birmingham, Wolverhampton & Coventry. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/west-midlands",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp",
    latitude: 52.4862,
    longitude: -1.8904,
    majorTowns: ["Birmingham", "Wolverhampton", "Coventry", "Solihull"],
    industries: ["Automotive", "Manufacturing", "Aerospace", "Engineering"],
    townsAndVillages: ["Aldridge", "Bilston", "Bloxwich", "Brierley Hill", "Brownhills", "Coseley", "Darlaston", "Dorridge", "Erdington", "Halesowen", "Kingswinford", "Knowle", "Meriden", "Oldbury", "Rowley Regis", "Sedgley", "Smethwick", "Stourbridge", "Tipton", "Wednesbury", "West Bromwich", "Willenhall"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Birmingham, Wolverhampton, and Coventry?",
        answer: "Yes — our mobile shot blasting units cover all of the West Midlands, including Birmingham, Wolverhampton, Coventry, Solihull, and the Black Country. We come to your site with all equipment needed."
      },
      {
        question: "Can you shot blast automotive components and production tooling in the West Midlands?",
        answer: "Yes. The West Midlands is the heart of the UK automotive industry. We shot blast fabricated components, jigs, fixtures, production tooling, and structural steelwork for automotive manufacturers and suppliers across the region."
      },
      {
        question: "Do you shot blast aerospace fabrications and engineering structures in the West Midlands?",
        answer: "Yes — the West Midlands has a significant aerospace engineering sector. We provide controlled shot blasting for aerospace fabrications, structural components, and precision engineering parts, working to the surface standards required."
      },
      {
        question: "Can you shot blast factory cladding and industrial buildings in the West Midlands?",
        answer: "Yes. We provide specialist shot blasting for factory cladding, warehouse exteriors, and industrial building steelwork across the West Midlands. We remove old coatings, rust, and mill scale to prepare surfaces for recoating."
      },
      {
        question: "How do I get a free quote for shot blasting in the West Midlands?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across the West Midlands and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "worcestershire": {
    name: "Worcestershire",
    slug: "worcestershire",
    region: "West Midlands",
    description: "Professional shot blasting services in Worcestershire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Worcestershire — manufacturing plant, agricultural equipment & food processing structures. SA2.5/SA3 standard. Serving Worcester, Kidderminster & Redditch. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/worcestershire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WozicopVSALZJtEo.webp",
    latitude: 52.1920,
    longitude: -2.2200,
    majorTowns: ["Worcester", "Kidderminster", "Redditch", "Bromsgrove"],
    industries: ["Manufacturing", "Agriculture", "Engineering", "Food Processing"],
    townsAndVillages: ["Alvechurch", "Bewdley", "Broadway", "Bromsgrove", "Droitwich Spa", "Evesham", "Great Malvern", "Hagley", "Malvern", "Pershore", "Stourport-on-Severn", "Tenbury Wells", "Upton-upon-Severn"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Worcester, Kidderminster, and Redditch?",
        answer: "Yes — our mobile shot blasting units cover all of Worcestershire, including Worcester, Kidderminster, Redditch, and Bromsgrove. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast manufacturing and engineering plant in Worcestershire?",
        answer: "Yes. Worcestershire has a strong manufacturing and engineering sector, particularly around Redditch and Kidderminster. We shot blast plant, machinery, fabricated steelwork, and production equipment for manufacturers across the county."
      },
      {
        question: "Do you shot blast agricultural equipment and food processing plant in Worcestershire?",
        answer: "Yes — Worcestershire's agriculture and food processing sector is a key market for us. We shot blast farm machinery, food processing equipment, structural steelwork, and factory cladding across the county."
      },
      {
        question: "Can you shot blast heritage and restoration structures in Worcestershire?",
        answer: "Yes. We provide specialist shot blasting for heritage structures, listed buildings, and restoration projects across Worcestershire. We use appropriate blast media and pressure to clean surfaces without causing damage."
      },
      {
        question: "How do I get a free quote for shot blasting in Worcestershire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Worcestershire and typically respond to enquiries within 24 hours."
      }
    ]
  },

  // Yorkshire
  "south-yorkshire": {
    name: "South Yorkshire",
    slug: "south-yorkshire",
    region: "Yorkshire",
    description: "Professional shot blasting services throughout South Yorkshire. Serving Sheffield, Rotherham, Doncaster, and surrounding areas with expert surface preparation and industrial blasting.",
    metaDescription: "Mobile shot blasting in South Yorkshire — steel fabrications, structural steelwork & logistics warehouse structures. SA2.5/SA3 standard. Serving Sheffield, Rotherham & Doncaster. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/south-yorkshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VlcajxKFizWfRmvv.webp",
    latitude: 53.4808,
    longitude: -1.4142,
    majorTowns: ["Sheffield", "Rotherham", "Doncaster", "Barnsley"],
    industries: ["Steel", "Manufacturing", "Engineering", "Logistics"],
    townsAndVillages: ["Anston", "Askern", "Aughton", "Bawtry", "Bentley", "Bolsover", "Chapeltown", "Conisbrough", "Dinnington", "Dodworth", "Edlington", "Goldthorpe", "Hoyland", "Maltby", "Mexborough", "Penistone", "Rawmarsh", "Rossington", "Stocksbridge", "Swinton", "Thorne", "Tickhill", "Wath-upon-Dearne", "Wombwell"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Sheffield, Rotherham, and Doncaster?",
        answer: "Yes — our mobile shot blasting units cover all of South Yorkshire, including Sheffield, Rotherham, Doncaster, and Barnsley. We come to your site with all equipment needed."
      },
      {
        question: "Can you shot blast steel fabrications and structural steelwork in Sheffield?",
        answer: "Yes. Sheffield and South Yorkshire have a strong steel and fabrication heritage. We regularly shot blast structural steelwork, fabricated frames, beams, and steel components for fabricators and construction contractors across the region."
      },
      {
        question: "Do you shot blast manufacturing plant and engineering equipment in South Yorkshire?",
        answer: "Yes — we work with manufacturers and engineering businesses across South Yorkshire, shot blasting industrial plant, production machinery, and fabricated steelwork on-site at your facility to minimise downtime."
      },
      {
        question: "Can you shot blast logistics and warehouse structures in Doncaster?",
        answer: "Yes. Doncaster is a major logistics hub and we shot blast warehouse racking, mezzanine floors, structural steelwork, and cladding for distribution centres and logistics parks across the Doncaster area."
      },
      {
        question: "How do I get a free quote for shot blasting in South Yorkshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across South Yorkshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "west-yorkshire": {
    name: "West Yorkshire",
    slug: "west-yorkshire",
    region: "Yorkshire",
    description: "Expert shot blasting services across West Yorkshire. Supporting Leeds, Bradford, Wakefield, and local manufacturers with professional surface preparation solutions.",
    metaDescription: "Mobile shot blasting in West Yorkshire — manufacturing plant, textile engineering structures & construction steelwork. SA2.5/SA3 standard. Serving Leeds, Bradford & Wakefield. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/west-yorkshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    latitude: 53.7974,
    longitude: -1.5437,
    majorTowns: ["Leeds", "Bradford", "Wakefield", "Huddersfield"],
    industries: ["Manufacturing", "Textiles", "Engineering", "Finance"],
    townsAndVillages: ["Baildon", "Batley", "Bingley", "Brighouse", "Castleford", "Cleckheaton", "Dewsbury", "Elland", "Garforth", "Guiseley", "Halifax", "Hebden Bridge", "Heckmondwike", "Holmfirth", "Horsforth", "Ilkley", "Keighley", "Knottingley", "Mirfield", "Morley", "Normanton", "Ossett", "Otley", "Pontefract", "Pudsey", "Shipley", "Sowerby Bridge", "Todmorden", "Wetherby", "Yeadon"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Leeds, Bradford, and Huddersfield?",
        answer: "Yes — our mobile shot blasting units cover all of West Yorkshire, including Leeds, Bradford, Wakefield, and Huddersfield. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast manufacturing and engineering fabrications in West Yorkshire?",
        answer: "Yes. West Yorkshire has a strong manufacturing and engineering base. We shot blast fabricated steelwork, plant, machinery, and production equipment for manufacturers across the county, working on-site at your facility."
      },
      {
        question: "Do you shot blast structural steelwork for construction projects in West Yorkshire?",
        answer: "Yes — we work with construction contractors and steel fabricators across West Yorkshire, shot blasting structural frames, beams, and fabricated components to SA2.5 or SA3 standard prior to protective coating."
      },
      {
        question: "Can you shot blast heritage and textile mill buildings in West Yorkshire?",
        answer: "Yes. West Yorkshire has a rich industrial heritage and we provide specialist shot blasting for heritage structures, mill buildings, and restoration projects across the county. We use appropriate blast media and pressure to clean surfaces without causing damage."
      },
      {
        question: "How do I get a free quote for shot blasting in West Yorkshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across West Yorkshire and typically respond to enquiries within 24 hours."
      }
    ]
  },

  // North West
  "cheshire": {
    name: "Cheshire",
    slug: "cheshire",
    region: "North West",
    description: "Professional shot blasting services throughout Cheshire. Serving Chester, Crewe, Warrington, and surrounding businesses with expert surface preparation and rust removal.",
    metaDescription: "Mobile shot blasting in Cheshire — chemical plant, manufacturing structures & logistics warehouse steelwork. SA2.5/SA3 standard. Serving Chester, Crewe & Warrington. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/cheshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/YBedohTImNkgXOlG.webp",
    latitude: 53.1908,
    longitude: -2.5310,
    majorTowns: ["Chester", "Crewe", "Warrington", "Macclesfield"],
    industries: ["Manufacturing", "Chemicals", "Logistics", "Engineering"],
    townsAndVillages: ["Alsager", "Bollington", "Congleton", "Ellesmere Port", "Frodsham", "Holmes Chapel", "Knutsford", "Middlewich", "Nantwich", "Neston", "Northwich", "Poynton", "Runcorn", "Sandbach", "Tarporley", "Widnes", "Wilmslow", "Winsford"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Chester, Crewe, and Warrington?",
        answer: "Yes — our mobile shot blasting units cover all of Cheshire, including Chester, Crewe, Warrington, and Macclesfield. We come to your site with all equipment needed."
      },
      {
        question: "Can you shot blast chemical plant and process equipment in Cheshire?",
        answer: "Yes. Cheshire has a significant chemicals and process industries sector, particularly around Runcorn, Widnes, and Northwich. We shot blast process vessels, pipework, structural steelwork, and plant for chemical and process businesses."
      },
      {
        question: "Do you shot blast manufacturing and engineering fabrications in Cheshire?",
        answer: "Yes — we work with manufacturers and engineering businesses across Cheshire, shot blasting plant, machinery, fabricated steelwork, and production equipment on-site at your facility."
      },
      {
        question: "Can you shot blast logistics and warehouse structures in Warrington?",
        answer: "Yes. Warrington is a major logistics hub and we shot blast warehouse racking, mezzanine floors, structural steelwork, and cladding for distribution centres and logistics parks across the Warrington area and wider Cheshire."
      },
      {
        question: "How do I get a free quote for shot blasting in Cheshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Cheshire and typically respond to enquiries within 24 hours."
      }
    ]
  },

  // South West
  "gloucestershire": {
    name: "Gloucestershire",
    slug: "gloucestershire",
    region: "South West",
    description: "Professional shot blasting services in Gloucestershire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Gloucestershire — aerospace fabrications, agricultural equipment & heritage structures. SA2.5/SA3 standard. Serving Gloucester, Cheltenham & Stroud. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/gloucestershire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/wNJxNfMjngkYNOyk.webp",
    latitude: 51.8642,
    longitude: -2.2381,
    majorTowns: ["Gloucester", "Cheltenham", "Stroud", "Cirencester"],
    industries: ["Aerospace", "Manufacturing", "Agriculture", "Engineering"],
    townsAndVillages: ["Bishops Cleeve", "Bourton-on-the-Water", "Chipping Campden", "Cinderford", "Coleford", "Dursley", "Fairford", "Lechlade", "Lydney", "Mitcheldean", "Moreton-in-Marsh", "Nailsworth", "Newent", "Painswick", "Stow-on-the-Wold", "Stonehouse", "Tetbury", "Tewkesbury", "Winchcombe"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Gloucester, Cheltenham, and Stroud?",
        answer: "Yes — our mobile shot blasting units cover all of Gloucestershire, including Gloucester, Cheltenham, Stroud, and Cirencester. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast aerospace components and engineering fabrications in Gloucestershire?",
        answer: "Yes. Gloucestershire has a strong aerospace engineering sector, particularly around Cheltenham and the Cotswold area. We provide controlled shot blasting for aerospace fabrications, structural components, and engineering parts, working to the surface standards required."
      },
      {
        question: "Do you shot blast agricultural equipment and farm buildings in Gloucestershire?",
        answer: "Yes — Gloucestershire's farming sector is a key market for us. We shot blast farm machinery, agricultural buildings, and equipment across the county, working on-site at farms and agricultural premises."
      },
      {
        question: "Can you shot blast heritage and Cotswold stone structures in Gloucestershire?",
        answer: "Yes. We provide specialist shot blasting for heritage structures and restoration projects across Gloucestershire. We use appropriate blast media and pressure to clean surfaces without causing damage to historic materials."
      },
      {
        question: "How do I get a free quote for shot blasting in Gloucestershire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Gloucestershire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "north-devon": {
    name: "North Devon",
    slug: "north-devon",
    region: "South West",
    description: "Professional shot blasting services throughout North Devon. Serving Barnstaple, Ilfracombe, and surrounding areas with expert surface preparation and rust removal solutions.",
    metaDescription: "Mobile shot blasting in North Devon — marine vessels, coastal structures & agricultural machinery. SA2.5/SA3 standard. Serving Barnstaple, Bideford & Ilfracombe. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/north-devon",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp",
    latitude: 51.0805,
    longitude: -4.0591,
    majorTowns: ["Barnstaple", "Ilfracombe", "Bideford", "South Molton"],
    industries: ["Tourism", "Agriculture", "Marine", "Manufacturing"],
    townsAndVillages: ["Appledore", "Barnstaple", "Bideford", "Braunton", "Combe Martin", "Croyde", "Great Torrington", "Ilfracombe", "Instow", "Lynton", "Lynmouth", "South Molton", "Westward Ho!", "Woolacombe"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Barnstaple, Bideford, and Ilfracombe?",
        answer: "Yes — our mobile shot blasting units cover all of North Devon, including Barnstaple, Ilfracombe, Bideford, and South Molton. We come to your site with all equipment needed."
      },
      {
        question: "Can you shot blast marine vessels and coastal structures in North Devon?",
        answer: "Yes. North Devon's coastline and marine sector generate demand for shot blasting of vessels, pontoons, slipways, and coastal structures. We provide on-site shot blasting for marine operators across North Devon, working to SA2.5 and SA3 standards."
      },
      {
        question: "Do you shot blast agricultural machinery and farm equipment in North Devon?",
        answer: "Yes — North Devon's farming sector is a key market for us. We shot blast tractors, farm machinery, trailers, and agricultural buildings across the county, working on-site at farms and agricultural premises."
      },
      {
        question: "Can you shot blast tourism and hospitality infrastructure in North Devon?",
        answer: "Yes. We provide shot blasting for structural steelwork, fire escapes, external metalwork, and heritage structures associated with tourism and hospitality properties across North Devon."
      },
      {
        question: "How do I get a free quote for shot blasting in North Devon?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across North Devon and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "somerset": {
    name: "Somerset",
    slug: "somerset",
    region: "South West",
    description: "Professional shot blasting services in Somerset. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Somerset — agricultural machinery, food processing plant & heritage structures. SA2.5/SA3 standard. Serving Taunton, Yeovil & Bridgwater. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/somerset",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    latitude: 51.1050,
    longitude: -2.9270,
    majorTowns: ["Taunton", "Weston-super-Mare", "Yeovil", "Bridgwater"],
    industries: ["Agriculture", "Manufacturing", "Tourism", "Food Processing"],
    townsAndVillages: ["Axbridge", "Bridgwater", "Bruton", "Burnham-on-Sea", "Castle Cary", "Chard", "Cheddar", "Clevedon", "Crewkerne", "Frome", "Glastonbury", "Highbridge", "Ilminster", "Keynsham", "Langport", "Martock", "Midsomer Norton", "Minehead", "Nailsea", "Portishead", "Shepton Mallet", "South Petherton", "Street", "Wells", "Wincanton"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Taunton, Yeovil, and Bridgwater?",
        answer: "Yes — our mobile shot blasting units cover all of Somerset, including Taunton, Weston-super-Mare, Yeovil, and Bridgwater. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast agricultural machinery and cider industry equipment in Somerset?",
        answer: "Yes. Somerset's farming and cider production sector is a key market for us. We shot blast tractors, farm machinery, cider press equipment, storage tanks, and agricultural buildings across the county."
      },
      {
        question: "Do you shot blast manufacturing and food processing plant in Somerset?",
        answer: "Yes — we work with food processing and manufacturing businesses across Somerset, shot blasting production equipment, structural steelwork, and factory cladding. We work to the required surface standards for your coating system."
      },
      {
        question: "Can you shot blast heritage and tourism structures in Somerset?",
        answer: "Yes. We provide specialist shot blasting for heritage structures, listed buildings, and restoration projects across Somerset. We use appropriate blast media and pressure to clean surfaces without causing damage."
      },
      {
        question: "How do I get a free quote for shot blasting in Somerset?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Somerset and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "wiltshire": {
    name: "Wiltshire",
    slug: "wiltshire",
    region: "South West",
    description: "Professional shot blasting services in Wiltshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Wiltshire — defence & aerospace components, manufacturing plant & agricultural equipment. SA2.5/SA3 standard. Serving Swindon, Salisbury & Chippenham. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/wiltshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp",
    latitude: 51.3493,
    longitude: -1.9927,
    majorTowns: ["Swindon", "Salisbury", "Chippenham", "Trowbridge"],
    industries: ["Manufacturing", "Defense", "Agriculture", "Engineering"],
    townsAndVillages: ["Amesbury", "Bradford-on-Avon", "Calne", "Corsham", "Cricklade", "Devizes", "Downton", "Highworth", "Ludgershall", "Malmesbury", "Marlborough", "Melksham", "Mere", "Pewsey", "Royal Wootton Bassett", "Tidworth", "Tisbury", "Warminster", "Westbury", "Wilton"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Swindon, Salisbury, and Chippenham?",
        answer: "Yes — our mobile shot blasting units cover all of Wiltshire, including Swindon, Salisbury, Chippenham, and Trowbridge. We come to your site with all equipment needed."
      },
      {
        question: "Can you shot blast defence and aerospace components in Wiltshire?",
        answer: "Yes. Wiltshire has a significant defence and aerospace sector, particularly around Salisbury Plain and Corsham. We provide controlled shot blasting for defence fabrications, aerospace components, and engineering structures, working to the surface standards required."
      },
      {
        question: "Do you shot blast manufacturing and engineering plant in Swindon?",
        answer: "Yes — Swindon has a strong manufacturing base and we regularly shot blast industrial plant, production machinery, fabricated steelwork, and factory cladding for manufacturers across the Swindon area and wider Wiltshire."
      },
      {
        question: "Can you shot blast agricultural equipment and farm buildings in Wiltshire?",
        answer: "Yes. We shot blast farm machinery, agricultural buildings, and equipment for farming businesses across Wiltshire, working on-site at farms and agricultural premises."
      },
      {
        question: "How do I get a free quote for shot blasting in Wiltshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Wiltshire and typically respond to enquiries within 24 hours."
      }
    ]
  },

  // Wales Borders
  "buckinghamshire": {
    name: "Buckinghamshire",
    slug: "buckinghamshire",
    region: "Wales Borders",
    description: "Professional shot blasting services in Buckinghamshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    metaDescription: "Mobile shot blasting in Buckinghamshire — logistics warehouse structures, manufacturing plant & technology sector steelwork. SA2.5/SA3 standard. Serving Milton Keynes, Aylesbury & High Wycombe. Free quote.",
    url: "https://commercialshotblasting.co.uk/counties/buckinghamshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/WozicopVSALZJtEo.webp",
    latitude: 51.8133,
    longitude: -0.8084,
    majorTowns: ["Milton Keynes", "Aylesbury", "High Wycombe", "Buckingham"],
    industries: ["Manufacturing", "Logistics", "Technology", "Construction"],
    townsAndVillages: ["Amersham", "Beaconsfield", "Bourne End", "Buckingham", "Chalfont St Giles", "Chalfont St Peter", "Chesham", "Gerrards Cross", "Great Missenden", "Haddenham", "Marlow", "Newport Pagnell", "Olney", "Princes Risborough", "Stony Stratford", "Wendover", "Winslow", "Wolverton"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Milton Keynes, Aylesbury, and High Wycombe?",
        answer: "Yes — our mobile shot blasting units cover all of Buckinghamshire, including Milton Keynes, Aylesbury, High Wycombe, and Buckingham. We travel to your site with all equipment needed."
      },
      {
        question: "Can you shot blast logistics and distribution centre structures in Milton Keynes?",
        answer: "Yes. Milton Keynes is a major logistics hub and we shot blast warehouse racking, mezzanine floors, structural steelwork, and cladding for distribution centres and logistics parks across the Milton Keynes area and wider Buckinghamshire."
      },
      {
        question: "Do you shot blast manufacturing and construction steelwork in Buckinghamshire?",
        answer: "Yes — we work with manufacturers and construction contractors across Buckinghamshire, shot blasting structural frames, fabricated steelwork, plant, and machinery to SA2.5 or SA3 standard prior to protective coating."
      },
      {
        question: "Can you shot blast technology and commercial property steelwork in Buckinghamshire?",
        answer: "Yes. We provide shot blasting for structural steelwork, cladding, and fabricated components for commercial and technology sector buildings across Buckinghamshire."
      },
      {
        question: "How do I get a free quote for shot blasting in Buckinghamshire?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across Buckinghamshire and typically respond to enquiries within 24 hours."
      }
    ]
  },
  "east-wales": {
    name: "East Wales",
    slug: "east-wales",
    region: "Wales Borders",
    description: "Professional shot blasting services throughout East Wales. Serving Cardiff, Newport, Wrexham, and surrounding areas with expert surface preparation and industrial blasting solutions.",
    metaDescription: "Mobile shot blasting in East Wales — steel fabrications, manufacturing plant & port infrastructure. SA2.5/SA3 standard. Serving Cardiff, Newport & Wrexham. Free site survey.",
    url: "https://commercialshotblasting.co.uk/counties/east-wales",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/VlcajxKFizWfRmvv.webp",
    latitude: 51.4816,
    longitude: -3.1791,
    majorTowns: ["Cardiff", "Newport", "Wrexham", "Merthyr Tydfil"],
    industries: ["Manufacturing", "Steel", "Engineering", "Logistics"],
    townsAndVillages: ["Aberdare", "Abergavenny", "Bargoed", "Barry", "Blackwood", "Bridgend", "Caerphilly", "Caldicot", "Chepstow", "Cwmbran", "Ebbw Vale", "Maesteg", "Merthyr Tydfil", "Monmouth", "Mountain Ash", "Neath", "Penarth", "Pontyclun", "Pontypool", "Pontypridd", "Port Talbot", "Porth", "Risca", "Tredegar", "Usk"],
    faqs: [
      {
        question: "Do you provide shot blasting services in Cardiff, Newport, and Wrexham?",
        answer: "Yes — our mobile shot blasting units cover all of East Wales, including Cardiff, Newport, Wrexham, and Merthyr Tydfil. We come to your site with all equipment needed."
      },
      {
        question: "Can you shot blast steel fabrications and structural steelwork in East Wales?",
        answer: "Yes. East Wales has a strong steel and manufacturing heritage, particularly around Port Talbot, Ebbw Vale, and Merthyr Tydfil. We regularly shot blast structural steelwork, fabricated frames, and steel components for fabricators and construction contractors across the region."
      },
      {
        question: "Do you shot blast manufacturing plant and engineering equipment in East Wales?",
        answer: "Yes — we work with manufacturers and engineering businesses across East Wales, shot blasting industrial plant, production machinery, and fabricated steelwork on-site at your facility to minimise downtime."
      },
      {
        question: "Can you shot blast port and logistics infrastructure in Newport and Cardiff?",
        answer: "Yes. We provide shot blasting for port infrastructure, marine structures, and logistics equipment at Newport and Cardiff. We work to SA2.5 and SA3 standards and can provide documentation on request."
      },
      {
        question: "How do I get a free quote for shot blasting in East Wales?",
        answer: "Call 07970 566409 or request a quote online. We offer free site surveys across East Wales and typically respond to enquiries within 24 hours."
      }
    ]
  },
};
