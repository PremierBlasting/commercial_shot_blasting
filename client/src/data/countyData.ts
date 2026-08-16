// County data for all 27 service area counties
export interface CountyData {
  name: string;
  slug: string;
  region: string;
  description: string;
  url: string;
  ogImage?: string;
  latitude: number;
  longitude: number;
  majorTowns: string[];
  industries: string[];
  townsAndVillages: string[];
  faqs: { question: string; answer: string; }[];
  metaDescription?: string;
}

export const countyData: Record<string, CountyData> = {
  // East of England
  "bedfordshire": {
    name: "Bedfordshire",
    slug: "bedfordshire",
    region: "East of England",
    description: "Professional shot blasting services in Bedfordshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting services across Bedfordshire — structural steel, warehouse racking, factory cladding & automotive components. SA2.5/SA3 standard. Serving Luton, Bedford & Dunstable. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/bedfordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UjSNpyqCeEUxElPP.webp",
    latitude: 52.0406,
    longitude: -0.4547,
    majorTowns: ["Luton", "Bedford", "Dunstable", "Leighton Buzzard"],
    industries: ["Manufacturing", "Logistics", "Construction", "Automotive"],
    townsAndVillages: ["Ampthill", "Arlesey", "Aspley Guise", "Barton-le-Clay", "Biggleswade", "Blunham", "Bromham", "Caddington", "Carlton", "Clophill", "Cranfield", "Eaton Bray", "Flitwick", "Harlington", "Henlow", "Houghton Regis", "Kempston", "Lidlington", "Marston Moretaine", "Maulden", "Potton", "Sandy", "Shefford", "Silsoe", "Southill", "Stotfold", "Toddington", "Woburn", "Wootton"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Bedfordshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Bedfordshire. Our fully equipped mobile units can reach any location in the county, including Luton, Bedford, Dunstable and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Bedfordshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Bedfordshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Bedfordshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Bedfordshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "cambridgeshire": {
    name: "Cambridgeshire",
    slug: "cambridgeshire",
    region: "East of England",
    description: "Professional shot blasting services in Cambridgeshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting services in Cambridgeshire — agricultural machinery, construction steelwork & manufacturing plant. SA2.5/SA3 standard. Covering Cambridge, Peterborough & Ely.",
    url: "https://commercialshotblasting.co.uk/counties/cambridgeshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    latitude: 52.2053,
    longitude: 0.1218,
    majorTowns: ["Cambridge", "Peterborough", "Ely", "Huntingdon"],
    industries: ["Technology", "Manufacturing", "Agriculture", "Construction"],
    townsAndVillages: ["Bar Hill", "Burwell", "Chatteris", "Cottenham", "Doddington", "Fulbourn", "Gamlingay", "Girton", "Godmanchester", "Histon", "Impington", "Linton", "Little Paxton", "Littleport", "March", "Melbourn", "Orwell", "Ramsey", "Sawston", "Sawtry", "Soham", "St Ives", "St Neots", "Swavesey", "Waterbeach", "Whittlesey", "Willingham", "Wisbech", "Yaxley"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Cambridgeshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Cambridgeshire. Our fully equipped mobile units can reach any location in the county, including Cambridge, Peterborough, Ely and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Cambridgeshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Cambridgeshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Cambridgeshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Cambridgeshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "hertfordshire": {
    name: "Hertfordshire",
    slug: "hertfordshire",
    region: "East of England",
    description: "Professional shot blasting services in Hertfordshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting services in Hertfordshire — logistics warehouse racking, retail steelwork & factory cladding. SA2.5/SA3 standard. Serving St Albans, Watford & Stevenage. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/hertfordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UhOtVLOfPobtqyhi.webp",
    latitude: 51.8090,
    longitude: -0.2376,
    majorTowns: ["St Albans", "Watford", "Stevenage", "Hemel Hempstead"],
    industries: ["Manufacturing", "Logistics", "Retail", "Construction"],
    townsAndVillages: ["Abbots Langley", "Baldock", "Berkhamsted", "Bishops Stortford", "Borehamwood", "Bovingdon", "Broxbourne", "Buntingford", "Bushey", "Cheshunt", "Chorleywood", "Harpenden", "Hatfield", "Hertford", "Hitchin", "Hoddesdon", "Kings Langley", "Knebworth", "Letchworth", "Potters Bar", "Radlett", "Rickmansworth", "Royston", "Sawbridgeworth", "Tring", "Ware", "Welwyn", "Welwyn Garden City"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Hertfordshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Hertfordshire. Our fully equipped mobile units can reach any location in the county, including St Albans, Watford, Stevenage and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Hertfordshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Hertfordshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Hertfordshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Hertfordshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "norfolk": {
    name: "Norfolk",
    slug: "norfolk",
    region: "East of England",
    description: "Professional shot blasting services in Norfolk. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Norfolk — agricultural machinery, marine & offshore structures, energy sector plant. SA2.5/SA3 standard. Covering Norwich, Great Yarmouth & King's Lynn.",
    url: "https://commercialshotblasting.co.uk/counties/norfolk",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 52.6309,
    longitude: 1.2974,
    majorTowns: ["Norwich", "King's Lynn", "Great Yarmouth", "Thetford"],
    industries: ["Agriculture", "Marine", "Manufacturing", "Energy"],
    townsAndVillages: ["Acle", "Attleborough", "Aylsham", "Brundall", "Caister-on-Sea", "Costessey", "Cromer", "Dereham", "Diss", "Downham Market", "Fakenham", "Gorleston", "Harleston", "Hethersett", "Holt", "Hunstanton", "Long Stratton", "Loddon", "North Walsham", "Reepham", "Sheringham", "Sprowston", "Stalham", "Swaffham", "Taverham", "Thetford", "Watton", "Wells-next-the-Sea", "Wymondham"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Norfolk?",
        answer: "Yes, we provide mobile shot blasting services across all of Norfolk. Our fully equipped mobile units can reach any location in the county, including Norwich, King's Lynn, Great Yarmouth and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Norfolk?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Norfolk within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Norfolk?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Norfolk to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "suffolk": {
    name: "Suffolk",
    slug: "suffolk",
    region: "East of England",
    description: "Professional shot blasting services in Suffolk. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Suffolk — port & logistics infrastructure, agricultural equipment & marine vessels. SA2.5/SA3 standard. Serving Ipswich, Felixstowe & Lowestoft. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/suffolk",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp",
    latitude: 52.1872,
    longitude: 0.9708,
    majorTowns: ["Ipswich", "Bury St Edmunds", "Lowestoft", "Felixstowe"],
    industries: ["Agriculture", "Marine", "Logistics", "Manufacturing"],
    townsAndVillages: ["Aldeburgh", "Beccles", "Brandon", "Bungay", "Clare", "Debenham", "Eye", "Framlingham", "Hadleigh", "Halesworth", "Haverhill", "Kesgrave", "Leiston", "Mildenhall", "Needham Market", "Newmarket", "Saxmundham", "Southwold", "Stowmarket", "Sudbury", "Wickham Market", "Woodbridge"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Suffolk?",
        answer: "Yes, we provide mobile shot blasting services across all of Suffolk. Our fully equipped mobile units can reach any location in the county, including Ipswich, Bury St Edmunds, Lowestoft and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Suffolk?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Suffolk within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Suffolk?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Suffolk to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // East Midlands
  "derbyshire": {
    name: "Derbyshire",
    slug: "derbyshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Derbyshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Derbyshire — aerospace components, manufacturing plant & construction steelwork. SA2.5/SA3 to BS EN ISO 8501-1. Serving Derby, Chesterfield & Ilkeston.",
    url: "https://commercialshotblasting.co.uk/counties/derbyshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    latitude: 53.1235,
    longitude: -1.4907,
    majorTowns: ["Derby", "Chesterfield", "Ilkeston", "Buxton"],
    industries: ["Manufacturing", "Aerospace", "Construction", "Engineering"],
    townsAndVillages: ["Alfreton", "Ashbourne", "Bakewell", "Belper", "Bolsover", "Chapel-en-le-Frith", "Clay Cross", "Glossop", "Hathersage", "Heanor", "Ilkeston", "Long Eaton", "Matlock", "New Mills", "Ripley", "Shirebrook", "Staveley", "Swadlincote", "Whaley Bridge", "Wirksworth"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Derbyshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Derbyshire. Our fully equipped mobile units can reach any location in the county, including Derby, Chesterfield, Ilkeston and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Derbyshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Derbyshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Derbyshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Derbyshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "leicestershire": {
    name: "Leicestershire",
    slug: "leicestershire",
    region: "East Midlands",
    description: "Professional shot blasting services in Leicestershire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Leicestershire — logistics warehouse structures, engineering fabrications & manufacturing plant. SA2.5/SA3 standard. Covering Leicester, Loughborough & Hinckley. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/leicestershire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp",
    latitude: 52.6369,
    longitude: -1.1398,
    majorTowns: ["Leicester", "Loughborough", "Hinckley", "Market Harborough"],
    industries: ["Manufacturing", "Logistics", "Textiles", "Engineering"],
    townsAndVillages: ["Anstey", "Ashby-de-la-Zouch", "Barrow upon Soar", "Blaby", "Braunstone", "Burbage", "Castle Donington", "Countesthorpe", "Earl Shilton", "Enderby", "Groby", "Ibstock", "Kegworth", "Kibworth", "Lutterworth", "Market Bosworth", "Market Harborough", "Measham", "Melton Mowbray", "Mountsorrel", "Narborough", "Oadby", "Quorn", "Shepshed", "Sileby", "Syston", "Wigston"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Leicestershire?",
        answer: "Yes, we provide mobile shot blasting services across all of Leicestershire. Our fully equipped mobile units can reach any location in the county, including Leicester, Loughborough, Hinckley and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Leicestershire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Leicestershire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Leicestershire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Leicestershire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "lincolnshire": {
    name: "Lincolnshire",
    slug: "lincolnshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Lincolnshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Lincolnshire — agricultural machinery, food processing plant & port infrastructure. SA2.5/SA3 standard. Serving Lincoln, Grimsby & Boston.",
    url: "https://commercialshotblasting.co.uk/counties/lincolnshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/okcUjGBJyNattGJb.webp",
    latitude: 53.0793,
    longitude: -0.5405,
    majorTowns: ["Lincoln", "Grantham", "Boston", "Spalding"],
    industries: ["Agriculture", "Food Processing", "Manufacturing", "Engineering"],
    townsAndVillages: ["Alford", "Bourne", "Brigg", "Caistor", "Cleethorpes", "Crowland", "Gainsborough", "Grimsby", "Holbeach", "Horncastle", "Immingham", "Louth", "Mablethorpe", "Market Deeping", "Market Rasen", "Skegness", "Sleaford", "Spalding", "Stamford", "Sutton Bridge", "Wainfleet", "Woodhall Spa"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Lincolnshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Lincolnshire. Our fully equipped mobile units can reach any location in the county, including Lincoln, Grantham, Boston and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Lincolnshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Lincolnshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Lincolnshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Lincolnshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "northamptonshire": {
    name: "Northamptonshire",
    slug: "northamptonshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Northamptonshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Northamptonshire — steel fabrications, logistics warehouse structures & automotive plant. SA2.5/SA3 standard. Serving Northampton, Corby & Kettering. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/northamptonshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UjSNpyqCeEUxElPP.webp",
    latitude: 52.2733,
    longitude: -0.8750,
    majorTowns: ["Northampton", "Kettering", "Wellingborough", "Corby"],
    industries: ["Manufacturing", "Logistics", "Footwear", "Engineering"],
    townsAndVillages: ["Brackley", "Brixworth", "Burton Latimer", "Daventry", "Desborough", "Duston", "Earls Barton", "Higham Ferrers", "Irthlingborough", "Long Buckby", "Oundle", "Raunds", "Rothwell", "Rushden", "Thrapston", "Towcester", "Walgrave", "Wellingborough", "Wollaston"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Northamptonshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Northamptonshire. Our fully equipped mobile units can reach any location in the county, including Northampton, Kettering, Wellingborough and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Northamptonshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Northamptonshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Northamptonshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Northamptonshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "nottinghamshire": {
    name: "Nottinghamshire",
    slug: "nottinghamshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Nottinghamshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Nottinghamshire — structural steelwork, manufacturing plant & fire escapes. SA2.5/SA3 standard. Covering Nottingham, Mansfield & Newark-on-Trent.",
    url: "https://commercialshotblasting.co.uk/counties/nottinghamshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    latitude: 53.1001,
    longitude: -1.0000,
    majorTowns: ["Nottingham", "Mansfield", "Worksop", "Newark"],
    industries: ["Manufacturing", "Pharmaceuticals", "Textiles", "Engineering"],
    townsAndVillages: ["Arnold", "Beeston", "Bingham", "Bulwell", "Carlton", "Eastwood", "Hucknall", "Kimberley", "Long Eaton", "Newark-on-Trent", "Ollerton", "Retford", "Ruddington", "Southwell", "Stapleford", "Sutton-in-Ashfield", "West Bridgford", "Wollaton", "Worksop"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Nottinghamshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Nottinghamshire. Our fully equipped mobile units can reach any location in the county, including Nottingham, Mansfield, Worksop and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Nottinghamshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Nottinghamshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Nottinghamshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Nottinghamshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // West Midlands
  "herefordshire": {
    name: "Herefordshire",
    slug: "herefordshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Herefordshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Herefordshire — agricultural machinery, food processing plant & heritage structures. SA2.5/SA3 standard. Serving Hereford, Leominster & Ross-on-Wye. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/herefordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UhOtVLOfPobtqyhi.webp",
    latitude: 52.0565,
    longitude: -2.7160,
    majorTowns: ["Hereford", "Leominster", "Ross-on-Wye", "Ledbury"],
    industries: ["Agriculture", "Food Processing", "Manufacturing", "Tourism"],
    townsAndVillages: ["Bromyard", "Kington", "Ledbury", "Leominster", "Ross-on-Wye", "Weobley", "Wigmore"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Herefordshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Herefordshire. Our fully equipped mobile units can reach any location in the county, including Hereford, Leominster, Ross-on-Wye and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Herefordshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Herefordshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Herefordshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Herefordshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "shropshire": {
    name: "Shropshire",
    slug: "shropshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Shropshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Shropshire — manufacturing plant, engineering fabrications & agricultural equipment. SA2.5/SA3 standard. Covering Shrewsbury, Telford & Oswestry.",
    url: "https://commercialshotblasting.co.uk/counties/shropshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 52.7069,
    longitude: -2.7447,
    majorTowns: ["Shrewsbury", "Telford", "Oswestry", "Bridgnorth"],
    industries: ["Manufacturing", "Engineering", "Agriculture", "Construction"],
    townsAndVillages: ["Albrighton", "Bishops Castle", "Bridgnorth", "Broseley", "Church Stretton", "Cleobury Mortimer", "Craven Arms", "Dawley", "Ellesmere", "Ludlow", "Madeley", "Market Drayton", "Much Wenlock", "Newport", "Oakengates", "Oswestry", "Wellington", "Wem", "Whitchurch"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Shropshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Shropshire. Our fully equipped mobile units can reach any location in the county, including Shrewsbury, Telford, Oswestry and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Shropshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Shropshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Shropshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Shropshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "staffordshire": {
    name: "Staffordshire",
    slug: "staffordshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Staffordshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Staffordshire — ceramics plant, automotive components & factory cladding. SA2.5/SA3 standard. Serving Stoke-on-Trent, Stafford & Tamworth. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/staffordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp",
    latitude: 52.8382,
    longitude: -2.0347,
    majorTowns: ["Stoke-on-Trent", "Stafford", "Tamworth", "Newcastle-under-Lyme"],
    industries: ["Ceramics", "Manufacturing", "Engineering", "Automotive"],
    townsAndVillages: ["Abbots Bromley", "Biddulph", "Brewood", "Burntwood", "Cheadle", "Eccleshall", "Fazeley", "Hednesford", "Kidsgrove", "Kinver", "Leek", "Penkridge", "Rugeley", "Stone", "Tutbury", "Uttoxeter", "Wombourne"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Staffordshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Staffordshire. Our fully equipped mobile units can reach any location in the county, including Stoke-on-Trent, Stafford, Tamworth and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Staffordshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Staffordshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Staffordshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Staffordshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "warwickshire": {
    name: "Warwickshire",
    slug: "warwickshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Warwickshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Warwickshire — automotive & aerospace fabrications, structural steelwork & manufacturing plant. SA2.5/SA3 standard. Serving Leamington Spa, Rugby & Nuneaton. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/warwickshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    latitude: 52.2819,
    longitude: -1.5849,
    majorTowns: ["Leamington Spa", "Rugby", "Warwick", "Nuneaton"],
    industries: ["Automotive", "Manufacturing", "Engineering", "Aerospace"],
    townsAndVillages: ["Alcester", "Atherstone", "Bedworth", "Bulkington", "Coleshill", "Henley-in-Arden", "Kenilworth", "Polesworth", "Shipston-on-Stour", "Southam", "Studley", "Wellesbourne", "Whitnash"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Warwickshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Warwickshire. Our fully equipped mobile units can reach any location in the county, including Leamington Spa, Rugby, Warwick and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Warwickshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Warwickshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Warwickshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Warwickshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "west-midlands": {
    name: "West Midlands",
    slug: "west-midlands",
    region: "West Midlands",
    description: "Professional shot blasting services in West Midlands. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in the West Midlands — automotive production tooling, aerospace fabrications & factory cladding. SA2.5/SA3 standard. Serving Birmingham, Wolverhampton & Coventry. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/west-midlands",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp",
    latitude: 52.4862,
    longitude: -1.8904,
    majorTowns: ["Birmingham", "Wolverhampton", "Coventry", "Solihull"],
    industries: ["Automotive", "Manufacturing", "Aerospace", "Engineering"],
    townsAndVillages: ["Aldridge", "Bilston", "Bloxwich", "Brierley Hill", "Brownhills", "Coseley", "Darlaston", "Dorridge", "Erdington", "Halesowen", "Kingswinford", "Knowle", "Meriden", "Oldbury", "Rowley Regis", "Sedgley", "Smethwick", "Stourbridge", "Tipton", "Wednesbury", "West Bromwich", "Willenhall"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout West Midlands?",
        answer: "Yes, we provide mobile shot blasting services across all of West Midlands. Our fully equipped mobile units can reach any location in the county, including Birmingham, Wolverhampton, Coventry and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in West Midlands?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in West Midlands within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in West Midlands?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in West Midlands to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "worcestershire": {
    name: "Worcestershire",
    slug: "worcestershire",
    region: "West Midlands",
    description: "Professional shot blasting services in Worcestershire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Worcestershire — manufacturing plant, agricultural equipment & food processing structures. SA2.5/SA3 standard. Serving Worcester, Kidderminster & Redditch. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/worcestershire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/okcUjGBJyNattGJb.webp",
    latitude: 52.1920,
    longitude: -2.2200,
    majorTowns: ["Worcester", "Kidderminster", "Redditch", "Bromsgrove"],
    industries: ["Manufacturing", "Agriculture", "Engineering", "Food Processing"],
    townsAndVillages: ["Alvechurch", "Bewdley", "Broadway", "Bromsgrove", "Droitwich Spa", "Evesham", "Great Malvern", "Hagley", "Malvern", "Pershore", "Stourport-on-Severn", "Tenbury Wells", "Upton-upon-Severn"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Worcestershire?",
        answer: "Yes, we provide mobile shot blasting services across all of Worcestershire. Our fully equipped mobile units can reach any location in the county, including Worcester, Kidderminster, Redditch and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Worcestershire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Worcestershire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Worcestershire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Worcestershire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // Yorkshire
  "south-yorkshire": {
    name: "South Yorkshire",
    slug: "south-yorkshire",
    region: "Yorkshire",
    description: "Professional shot blasting services throughout South Yorkshire. Serving Sheffield, Rotherham, Doncaster, and surrounding areas with expert surface preparation and industrial blasting.",
    metaDescription: "Mobile shot blasting in South Yorkshire — steel fabrications, structural steelwork & logistics warehouse structures. SA2.5/SA3 standard. Serving Sheffield, Rotherham & Doncaster. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/south-yorkshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UjSNpyqCeEUxElPP.webp",
    latitude: 53.4808,
    longitude: -1.4142,
    majorTowns: ["Sheffield", "Rotherham", "Doncaster", "Barnsley"],
    industries: ["Steel", "Manufacturing", "Engineering", "Logistics"],
    townsAndVillages: ["Anston", "Askern", "Aughton", "Bawtry", "Bentley", "Bolsover", "Chapeltown", "Conisbrough", "Dinnington", "Dodworth", "Edlington", "Goldthorpe", "Hoyland", "Maltby", "Mexborough", "Penistone", "Rawmarsh", "Rossington", "Stocksbridge", "Swinton", "Thorne", "Tickhill", "Wath-upon-Dearne", "Wombwell"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout South Yorkshire?",
        answer: "Yes, we provide mobile shot blasting services across all of South Yorkshire. Our fully equipped mobile units can reach any location in the county, including Sheffield, Rotherham, Doncaster and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in South Yorkshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in South Yorkshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in South Yorkshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in South Yorkshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "west-yorkshire": {
    name: "West Yorkshire",
    slug: "west-yorkshire",
    region: "Yorkshire",
    description: "Expert shot blasting services across West Yorkshire. Supporting Leeds, Bradford, Wakefield, and local manufacturers with professional surface preparation solutions.",
    metaDescription: "Mobile shot blasting in West Yorkshire — manufacturing plant, textile engineering structures & construction steelwork. SA2.5/SA3 standard. Serving Leeds, Bradford & Wakefield. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/west-yorkshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    latitude: 53.7974,
    longitude: -1.5437,
    majorTowns: ["Leeds", "Bradford", "Wakefield", "Huddersfield"],
    industries: ["Manufacturing", "Textiles", "Engineering", "Finance"],
    townsAndVillages: ["Baildon", "Batley", "Bingley", "Brighouse", "Castleford", "Cleckheaton", "Dewsbury", "Elland", "Garforth", "Guiseley", "Halifax", "Hebden Bridge", "Heckmondwike", "Holmfirth", "Horsforth", "Ilkley", "Keighley", "Knottingley", "Mirfield", "Morley", "Normanton", "Ossett", "Otley", "Pontefract", "Pudsey", "Shipley", "Sowerby Bridge", "Todmorden", "Wetherby", "Yeadon"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout West Yorkshire?",
        answer: "Yes, we provide mobile shot blasting services across all of West Yorkshire. Our fully equipped mobile units can reach any location in the county, including Leeds, Bradford, Wakefield and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in West Yorkshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in West Yorkshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in West Yorkshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in West Yorkshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  "north-yorkshire": {
    name: "North Yorkshire",
    slug: "north-yorkshire",
    region: "Yorkshire",
    description: "Professional shot blasting services throughout North Yorkshire. Serving York, Harrogate, Scarborough, Middlesbrough, and surrounding areas with expert surface preparation and industrial blasting.",
    metaDescription: "Mobile shot blasting in North Yorkshire — agricultural machinery, food processing plant & heritage restoration. SA2.5/SA3 standard. Covering York, Harrogate & Scarborough.",
    url: "https://commercialshotblasting.co.uk/counties/north-yorkshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 54.0534,
    longitude: -1.5490,
    majorTowns: ["York", "Harrogate", "Scarborough", "Middlesbrough", "Northallerton"],
    industries: ["Agriculture", "Food Processing", "Engineering", "Heritage & Restoration", "Construction"],
    townsAndVillages: ["Bedale", "Boroughbridge", "Catterick", "Easingwold", "Filey", "Guisborough", "Helmsley", "Knaresborough", "Malton", "Masham", "Pickering", "Redcar", "Richmond", "Ripon", "Selby", "Settle", "Skipton", "Stokesley", "Tadcaster", "Thirsk", "Whitby", "Yarm"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout North Yorkshire?",
        answer: "Yes, we provide mobile shot blasting services across all of North Yorkshire. Our fully equipped mobile units can reach any location in the county, including York, Harrogate, Scarborough, Middlesbrough and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in North Yorkshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in North Yorkshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in North Yorkshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in North Yorkshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // North West
  "cheshire": {
    name: "Cheshire",
    slug: "cheshire",
    region: "North West",
    description: "Professional shot blasting services throughout Cheshire. Serving Chester, Crewe, Warrington, and surrounding businesses with expert surface preparation and rust removal.",
    metaDescription: "Mobile shot blasting in Cheshire — chemical plant, manufacturing structures & logistics warehouse steelwork. SA2.5/SA3 standard. Serving Chester, Crewe & Warrington.",
    url: "https://commercialshotblasting.co.uk/counties/cheshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UhOtVLOfPobtqyhi.webp",
    latitude: 53.1908,
    longitude: -2.5310,
    majorTowns: ["Chester", "Crewe", "Warrington", "Macclesfield"],
    industries: ["Manufacturing", "Chemicals", "Logistics", "Engineering"],
    townsAndVillages: ["Alsager", "Bollington", "Congleton", "Ellesmere Port", "Frodsham", "Holmes Chapel", "Knutsford", "Middlewich", "Nantwich", "Neston", "Northwich", "Poynton", "Runcorn", "Sandbach", "Tarporley", "Widnes", "Wilmslow", "Winsford"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Cheshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Cheshire. Our fully equipped mobile units can reach any location in the county, including Chester, Crewe, Warrington and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Cheshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Cheshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Cheshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Cheshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // South West
  "gloucestershire": {
    name: "Gloucestershire",
    slug: "gloucestershire",
    region: "South West",
    description: "Professional shot blasting services in Gloucestershire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Gloucestershire — aerospace fabrications, agricultural equipment & heritage structures. SA2.5/SA3 standard. Serving Gloucester, Cheltenham & Stroud. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/gloucestershire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 51.8642,
    longitude: -2.2381,
    majorTowns: ["Gloucester", "Cheltenham", "Stroud", "Cirencester"],
    industries: ["Aerospace", "Manufacturing", "Agriculture", "Engineering"],
    townsAndVillages: ["Bishops Cleeve", "Bourton-on-the-Water", "Chipping Campden", "Cinderford", "Coleford", "Dursley", "Fairford", "Lechlade", "Lydney", "Mitcheldean", "Moreton-in-Marsh", "Nailsworth", "Newent", "Painswick", "Stow-on-the-Wold", "Stonehouse", "Tetbury", "Tewkesbury", "Winchcombe"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Gloucestershire?",
        answer: "Yes, we provide mobile shot blasting services across all of Gloucestershire. Our fully equipped mobile units can reach any location in the county, including Gloucester, Cheltenham, Stroud and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Gloucestershire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Gloucestershire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Gloucestershire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Gloucestershire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "north-devon": {
    name: "North Devon",
    slug: "north-devon",
    region: "South West",
    description: "Professional shot blasting services throughout North Devon. Serving Barnstaple, Ilfracombe, and surrounding areas with expert surface preparation and rust removal solutions.",
    metaDescription: "Mobile shot blasting in North Devon — marine vessels, coastal structures & agricultural machinery. SA2.5/SA3 standard. Serving Barnstaple, Bideford & Ilfracombe.",
    url: "https://commercialshotblasting.co.uk/counties/north-devon",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp",
    latitude: 51.0805,
    longitude: -4.0591,
    majorTowns: ["Barnstaple", "Ilfracombe", "Bideford", "South Molton"],
    industries: ["Tourism", "Agriculture", "Marine", "Manufacturing"],
    townsAndVillages: ["Appledore", "Barnstaple", "Bideford", "Braunton", "Combe Martin", "Croyde", "Great Torrington", "Ilfracombe", "Instow", "Lynton", "Lynmouth", "South Molton", "Westward Ho!", "Woolacombe"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout North Devon?",
        answer: "Yes, we provide mobile shot blasting services across all of North Devon. Our fully equipped mobile units can reach any location in the county, including Barnstaple, Ilfracombe, Bideford and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in North Devon?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in North Devon within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in North Devon?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in North Devon to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "somerset": {
    name: "Somerset",
    slug: "somerset",
    region: "South West",
    description: "Professional shot blasting services in Somerset. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Somerset — agricultural machinery, food processing plant & heritage structures. SA2.5/SA3 standard. Serving Taunton, Yeovil & Bridgwater. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/somerset",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    latitude: 51.1050,
    longitude: -2.9270,
    majorTowns: ["Taunton", "Weston-super-Mare", "Yeovil", "Bridgwater"],
    industries: ["Agriculture", "Manufacturing", "Tourism", "Food Processing"],
    townsAndVillages: ["Axbridge", "Bridgwater", "Bruton", "Burnham-on-Sea", "Castle Cary", "Chard", "Cheddar", "Clevedon", "Crewkerne", "Frome", "Glastonbury", "Highbridge", "Ilminster", "Keynsham", "Langport", "Martock", "Midsomer Norton", "Minehead", "Nailsea", "Portishead", "Shepton Mallet", "South Petherton", "Street", "Wells", "Wincanton"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Somerset?",
        answer: "Yes, we provide mobile shot blasting services across all of Somerset. Our fully equipped mobile units can reach any location in the county, including Taunton, Weston-super-Mare, Yeovil and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Somerset?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Somerset within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Somerset?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Somerset to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "wiltshire": {
    name: "Wiltshire",
    slug: "wiltshire",
    region: "South West",
    description: "Professional shot blasting services in Wiltshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Wiltshire — defence & aerospace components, manufacturing plant & agricultural equipment. SA2.5/SA3 standard. Serving Swindon, Salisbury & Chippenham. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/wiltshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp",
    latitude: 51.3493,
    longitude: -1.9927,
    majorTowns: ["Swindon", "Salisbury", "Chippenham", "Trowbridge"],
    industries: ["Manufacturing", "Defense", "Agriculture", "Engineering"],
    townsAndVillages: ["Amesbury", "Bradford-on-Avon", "Calne", "Corsham", "Cricklade", "Devizes", "Downton", "Highworth", "Ludgershall", "Malmesbury", "Marlborough", "Melksham", "Mere", "Pewsey", "Royal Wootton Bassett", "Tidworth", "Tisbury", "Warminster", "Westbury", "Wilton"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Wiltshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Wiltshire. Our fully equipped mobile units can reach any location in the county, including Swindon, Salisbury, Chippenham and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Wiltshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Wiltshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Wiltshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Wiltshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // Wales Borders
  "buckinghamshire": {
    name: "Buckinghamshire",
    slug: "buckinghamshire",
    region: "Wales Borders",
    description: "Professional shot blasting services in Buckinghamshire. Rust removal, surface prep & industrial blasting. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Buckinghamshire — logistics warehouse structures, manufacturing plant & technology sector steelwork. SA2.5/SA3 standard. Serving Milton Keynes, Aylesbury & High Wycombe. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/buckinghamshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/okcUjGBJyNattGJb.webp",
    latitude: 51.8133,
    longitude: -0.8084,
    majorTowns: ["Milton Keynes", "Aylesbury", "High Wycombe", "Buckingham"],
    industries: ["Manufacturing", "Logistics", "Technology", "Construction"],
    townsAndVillages: ["Amersham", "Beaconsfield", "Bourne End", "Buckingham", "Chalfont St Giles", "Chalfont St Peter", "Chesham", "Gerrards Cross", "Great Missenden", "Haddenham", "Marlow", "Newport Pagnell", "Olney", "Princes Risborough", "Stony Stratford", "Wendover", "Winslow", "Wolverton"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Buckinghamshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Buckinghamshire. Our fully equipped mobile units can reach any location in the county, including Milton Keynes, Aylesbury, High Wycombe and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Buckinghamshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Buckinghamshire within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Buckinghamshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Buckinghamshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "greater-manchester": {
    name: "Greater Manchester",
    slug: "greater-manchester",
    region: "North West",
    description: "Professional shot blasting services in Greater Manchester. Rust removal, surface prep & industrial blasting across Manchester, Bolton, Oldham, Rochdale, Salford and Stockport. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Greater Manchester — engineering plant, chemical processing structures & construction steelwork. SA2.5/SA3 standard. Serving Manchester, Bolton & Stockport. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/greater-manchester",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp",
    latitude: 53.4808,
    longitude: -2.2426,
    majorTowns: ["Manchester", "Bolton", "Oldham", "Rochdale", "Salford", "Stockport"],
    industries: ["Engineering", "Manufacturing", "Construction", "Chemical Processing"],
    townsAndVillages: ["Altrincham", "Ashton-under-Lyne", "Bury", "Cheadle", "Droylsden", "Eccles", "Failsworth", "Farnworth", "Gatley", "Gorton", "Heywood", "Hyde", "Irlam", "Leigh", "Levenshulme", "Littleborough", "Middleton", "Milnrow", "Mossley", "Partington", "Pendlebury", "Radcliffe", "Ramsbottom", "Sale", "Stretford", "Swinton", "Urmston", "Walkden", "Whitefield", "Wigan", "Wythenshawe"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Greater Manchester?",
        answer: "Yes, we provide mobile shot blasting services across all of Greater Manchester. Our fully equipped mobile units can reach any location in the conurbation, including Manchester, Bolton, Oldham, Rochdale, Salford and Stockport."
      },
      {
        question: "How quickly can you reach my location in Greater Manchester?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Greater Manchester within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Greater Manchester?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Greater Manchester to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "essex": {
    name: "Essex",
    slug: "essex",
    region: "East of England",
    description: "Professional shot blasting services in Essex. Rust removal, surface prep & industrial blasting across Colchester, Chelmsford, Basildon and Southend-on-Sea. Call 07721 375756",
    metaDescription: "Mobile shot blasting in Essex — logistics & distribution structures, agricultural plant & manufacturing steelwork. SA2.5/SA3 standard. Serving Colchester, Chelmsford & Basildon. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/essex",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/okcUjGBJyNattGJb.webp",
    latitude: 51.7343,
    longitude: 0.4691,
    majorTowns: ["Colchester", "Chelmsford", "Basildon", "Southend-on-Sea"],
    industries: ["Manufacturing", "Construction", "Agriculture", "Logistics"],
    townsAndVillages: ["Billericay", "Braintree", "Brentwood", "Burnham-on-Crouch", "Canvey Island", "Clacton-on-Sea", "Dunmow", "Epping", "Grays", "Halstead", "Harlow", "Harwich", "Ingatestone", "Laindon", "Loughton", "Maldon", "Mersea Island", "Rayleigh", "Rochford", "Saffron Walden", "Stanford-le-Hope", "Stansted Mountfitchet", "Tilbury", "Wickford", "Witham"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Essex?",
        answer: "Yes, we provide mobile shot blasting services across all of Essex. Our fully equipped mobile units can reach any location in the county, including Colchester, Chelmsford, Basildon and Southend-on-Sea."
      },
      {
        question: "How quickly can you reach my location in Essex?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Essex within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Essex?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Essex to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "berkshire": {
    name: "Berkshire",
    slug: "berkshire",
    region: "South East England",
    description: "Professional shot blasting services throughout Berkshire. Serving Reading, Slough, Bracknell, Windsor, Newbury, and surrounding areas with expert surface preparation and industrial blasting solutions.",
    metaDescription: "Mobile shot blasting in Berkshire — commercial construction steelwork, logistics plant & manufacturing structures. SA2.5/SA3 standard. Serving Reading, Slough & Bracknell.",
    url: "https://commercialshotblasting.co.uk/counties/berkshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/oIKBPlRyGOSKXcAl.webp",
    latitude: 51.4543,
    longitude: -1.0,
    majorTowns: ["Reading", "Slough", "Bracknell", "Windsor"],
    industries: ["Commercial Construction", "Logistics", "Manufacturing", "Industrial Plant"],
    townsAndVillages: ["Ascot", "Bracknell", "Caversham", "Crowthorne", "Eton", "Hungerford", "Maidenhead", "Newbury", "Reading", "Sandhurst", "Slough", "Thatcham", "Twyford", "Windsor", "Wokingham"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Berkshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Berkshire. Our fully equipped mobile units can reach any location in the county, including Reading, Slough, Bracknell, Windsor, and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Berkshire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Berkshire within 2-5 working days, depending on your location and our current schedule."
      },
      {
        question: "What types of surfaces can you blast in Berkshire?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Berkshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply."
      },
      {
        question: "How do I request a site visit for shot blasting services in Berkshire?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Berkshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "hampshire": {
    name: "Hampshire",
    slug: "hampshire",
    region: "South England",
    description: "Professional shot blasting services throughout Hampshire. Serving Southampton, Portsmouth, Basingstoke, Winchester, and surrounding areas with expert surface preparation, marine blasting, and industrial solutions.",
    metaDescription: "Mobile shot blasting in Hampshire — marine & shipyard structures, aerospace & defence plant, commercial construction. SA2.5/SA3 standard. Serving Southampton, Portsmouth & Basingstoke. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/hampshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/okcUjGBJyNattGJb.webp",
    latitude: 51.0577,
    longitude: -1.3081,
    majorTowns: ["Southampton", "Portsmouth", "Basingstoke", "Winchester"],
    industries: ["Marine & Shipbuilding", "Aerospace & Defence", "Commercial Construction", "Industrial Plant"],
    townsAndVillages: ["Aldershot", "Alresford", "Alton", "Andover", "Basingstoke", "Eastleigh", "Fareham", "Fleet", "Gosport", "Havant", "Hook", "Lymington", "New Milton", "Portsmouth", "Ringwood", "Romsey", "Southampton", "Tadley", "Waterlooville", "Winchester"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Hampshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Hampshire. Our fully equipped mobile units can reach any location in the county, including Southampton, Portsmouth, Basingstoke, Winchester, and surrounding areas."
      },
      {
        question: "Do you work on marine and port projects in Hampshire?",
        answer: "Yes, we have extensive experience in marine environments including shipyards, port facilities, and offshore structures in the Southampton and Portsmouth areas. We understand the specific requirements for marine surface preparation."
      },
      {
        question: "What surface preparation standards do you work to in Hampshire?",
        answer: "We work to BS EN ISO 8501-1 standards, achieving SA 2.5 (near white metal) and SA 3 (white metal) finishes as required. All work is documented with before and after reports."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Hampshire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply."
      },
      {
        question: "How do I request a site visit for shot blasting services in Hampshire?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Hampshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "lancashire": {
    name: "Lancashire",
    slug: "lancashire",
    region: "North West England",
    description: "Professional shot blasting services throughout Lancashire. Serving Preston, Blackburn, Burnley, Lancaster, and surrounding areas with expert surface preparation and industrial blasting solutions.",
    metaDescription: "Mobile shot blasting in Lancashire — manufacturing & textile engineering plant, energy sector structures & construction steelwork. SA2.5/SA3 standard. Serving Preston, Blackburn & Burnley. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/lancashire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp",
    latitude: 53.7632,
    longitude: -2.7044,
    majorTowns: ["Preston", "Blackburn", "Burnley", "Lancaster"],
    industries: ["Manufacturing", "Textiles & Engineering", "Energy", "Construction"],
    townsAndVillages: ["Accrington", "Barnoldswick", "Blackpool", "Chorley", "Clitheroe", "Colne", "Darwen", "Fleetwood", "Garstang", "Great Harwood", "Haslingden", "Kirkham", "Lancaster", "Leyland", "Longridge", "Lytham St Annes", "Morecambe", "Nelson", "Ormskirk", "Oswaldtwistle", "Padiham", "Poulton-le-Fylde", "Preston", "Rawtenstall", "Skelmersdale", "Thornton-Cleveleys"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Lancashire?",
        answer: "Yes, we provide mobile shot blasting services across all of Lancashire. Our fully equipped mobile units can reach any location in the county, including Preston, Blackburn, Burnley, Lancaster, and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Lancashire?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Lancashire within 2-5 working days, depending on your location and our current schedule."
      },
      {
        question: "What types of surfaces can you blast in Lancashire?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Lancashire?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply."
      },
      {
        question: "How do I request a site visit for shot blasting services in Lancashire?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Lancashire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "east-wales": {
    name: "East Wales",
    slug: "east-wales",
    region: "Wales Borders",
    description: "Professional shot blasting services throughout East Wales. Serving Cardiff, Newport, Wrexham, and surrounding areas with expert surface preparation and industrial blasting solutions.",
    metaDescription: "Mobile shot blasting in East Wales — steel fabrications, manufacturing plant & port infrastructure. SA2.5/SA3 standard. Serving Cardiff, Newport & Wrexham.",
    url: "https://commercialshotblasting.co.uk/counties/east-wales",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/UjSNpyqCeEUxElPP.webp",
    latitude: 51.4816,
    longitude: -3.1791,
    majorTowns: ["Cardiff", "Newport", "Wrexham", "Merthyr Tydfil"],
    industries: ["Manufacturing", "Steel", "Engineering", "Logistics"],
    townsAndVillages: ["Aberdare", "Abergavenny", "Bargoed", "Barry", "Blackwood", "Bridgend", "Caerphilly", "Caldicot", "Chepstow", "Cwmbran", "Ebbw Vale", "Maesteg", "Merthyr Tydfil", "Monmouth", "Mountain Ash", "Neath", "Penarth", "Pontyclun", "Pontypool", "Pontypridd", "Port Talbot", "Porth", "Risca", "Tredegar", "Usk"]
,
    faqs: [
      {
        question: "Do you provide shot blasting services throughout East Wales?",
        answer: "Yes, we provide mobile shot blasting services across all of East Wales. Our fully equipped mobile units can reach any location in the county, including Cardiff, Newport, Wrexham and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in East Wales?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in East Wales within 2-5 working days, depending on your location and our current schedule. For urgent projects, we can often accommodate faster response times."
      },
      {
        question: "What types of surfaces can you blast in commercial settings?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications across industrial, commercial, and agricultural settings."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in East Wales?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply. We'll discuss specific requirements during the initial consultation."
      },
      {
        question: "How do I request a site visit for shot blasting services?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in East Wales to provide an accurate, no-obligation quotation."
      }
    ]
  },
  // North East England
  "cumbria": {
    name: "Cumbria",
    slug: "cumbria",
    region: "North East England",
    description: "Professional shot blasting services throughout Cumbria. Serving Carlisle, Barrow-in-Furness, Kendal, Workington, and surrounding areas with expert surface preparation, industrial blasting, and marine solutions.",
    metaDescription: "Mobile shot blasting in Cumbria — nuclear & energy sector plant, marine & shipbuilding structures, agricultural equipment. SA2.5/SA3 standard. Serving Carlisle, Barrow & Kendal. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/cumbria",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/fDsaRxagauTcgoki.webp",
    latitude: 54.5772,
    longitude: -2.7975,
    majorTowns: ["Carlisle", "Barrow-in-Furness", "Kendal", "Workington"],
    industries: ["Nuclear & Energy", "Marine & Shipbuilding", "Agriculture", "Manufacturing"],
    townsAndVillages: ["Alston", "Ambleside", "Appleby-in-Westmorland", "Barrow-in-Furness", "Brampton", "Carlisle", "Cleator Moor", "Cockermouth", "Egremont", "Grange-over-Sands", "Grasmere", "Kendal", "Keswick", "Kirkby Lonsdale", "Maryport", "Millom", "Penrith", "Ulverston", "Whitehaven", "Windermere", "Workington"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Cumbria?",
        answer: "Yes, we provide mobile shot blasting services across all of Cumbria. Our fully equipped mobile units can reach any location in the county, including Carlisle, Barrow-in-Furness, Kendal, Workington, and surrounding areas."
      },
      {
        question: "Do you work on nuclear and energy sector projects in Cumbria?",
        answer: "Yes, we have experience working with energy sector clients in Cumbria, including surface preparation for industrial plant and infrastructure. We understand the specific compliance and safety requirements for these environments."
      },
      {
        question: "Can you handle marine blasting projects in Cumbria?",
        answer: "Yes, we have extensive experience in marine environments including shipyards and port facilities. We understand the specific requirements for marine surface preparation and corrosion protection in coastal Cumbrian locations."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Cumbria?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply."
      },
      {
        question: "How do I request a site visit for shot blasting services in Cumbria?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Cumbria to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "durham": {
    name: "County Durham",
    slug: "durham",
    region: "North East England",
    description: "Professional shot blasting services throughout County Durham. Serving Durham City, Darlington, Hartlepool, Newton Aycliffe, and surrounding areas with expert surface preparation and industrial blasting solutions.",
    metaDescription: "Mobile shot blasting in County Durham — manufacturing plant, automotive components & construction steelwork. SA2.5/SA3 standard. Serving Durham City, Darlington & Hartlepool. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/durham",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/QRpJYgxdNmiyqvIK.webp",
    latitude: 54.7753,
    longitude: -1.5849,
    majorTowns: ["Durham City", "Darlington", "Hartlepool", "Newton Aycliffe", "Consett", "Bishop Auckland", "Peterlee"],
    industries: ["Manufacturing", "Engineering", "Construction", "Automotive"],
    townsAndVillages: ["Barnard Castle", "Billingham", "Bishop Auckland", "Chester-le-Street", "Consett", "Crook", "Darlington", "Durham City", "Ferryhill", "Hartlepool", "Lanchester", "Middleton-in-Teesdale", "Newton Aycliffe", "Peterlee", "Seaham", "Shildon", "Spennymoor", "Stanley", "Stanhope", "Stockton-on-Tees", "Trimdon"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout County Durham?",
        answer: "Yes, we provide mobile shot blasting services across all of County Durham. Our fully equipped mobile units can reach any location in the county, including Durham City, Darlington, Hartlepool, Newton Aycliffe, and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in County Durham?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in County Durham within 2-5 working days, depending on your location and our current schedule."
      },
      {
        question: "What types of surfaces can you blast in County Durham?",
        answer: "We can blast virtually any surface including steel beams, machinery, vehicles, concrete floors, brick walls, and metal fabrications. Our mobile equipment is suitable for both indoor and outdoor applications."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in County Durham?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply."
      },
      {
        question: "How do I request a site visit for shot blasting services in County Durham?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in County Durham to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "tyne-and-wear": {
    name: "Tyne & Wear",
    slug: "tyne-and-wear",
    region: "North East England",
    description: "Professional shot blasting services throughout Tyne & Wear. Serving Newcastle, Sunderland, Gateshead, South Shields, and surrounding areas with expert surface preparation, industrial blasting, and structural steel solutions.",
    metaDescription: "Mobile shot blasting in Tyne & Wear — shipbuilding & marine structures, automotive plant & construction steelwork. SA2.5/SA3 standard. Serving Newcastle, Sunderland & Gateshead. Site visit.",
    url: "https://commercialshotblasting.co.uk/counties/tyne-and-wear",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    latitude: 54.9783,
    longitude: -1.6178,
    majorTowns: ["Newcastle upon Tyne", "Sunderland", "Gateshead", "South Shields"],
    industries: ["Shipbuilding & Marine", "Automotive", "Construction", "Engineering"],
    townsAndVillages: ["Blaydon", "Boldon", "Felling", "Gateshead", "Hebburn", "Houghton-le-Spring", "Jarrow", "Longbenton", "Newcastle upon Tyne", "North Shields", "Ryton", "South Shields", "Sunderland", "Tynemouth", "Wallsend", "Washington", "Whitley Bay", "Whickham"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Tyne & Wear?",
        answer: "Yes, we provide mobile shot blasting services across all of Tyne & Wear. Our fully equipped mobile units can reach any location in the county, including Newcastle, Sunderland, Gateshead, South Shields, and surrounding areas."
      },
      {
        question: "Do you work on shipbuilding and marine projects in Tyne & Wear?",
        answer: "Yes, we have extensive experience in marine environments including shipyards and port facilities on the Tyne and Wear rivers. We understand the specific requirements for marine surface preparation and corrosion protection."
      },
      {
        question: "What surface preparation standards do you work to in Tyne & Wear?",
        answer: "We work to BS EN ISO 8501-1 standards, achieving SA 2.5 (near white metal) and SA 3 (white metal) finishes as required. All work is documented with before and after reports."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Tyne & Wear?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply."
      },
      {
        question: "How do I request a site visit for shot blasting services in Tyne & Wear?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Tyne & Wear to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "northumberland": {
    name: "Northumberland",
    slug: "northumberland",
    region: "North East England",
    description: "Professional shot blasting services throughout Northumberland. Serving Morpeth, Hexham, Alnwick, Blyth, and surrounding areas with expert surface preparation, agricultural blasting, and industrial solutions.",
    metaDescription: "Mobile shot blasting in Northumberland — agricultural machinery, energy sector plant & construction steelwork. SA2.5/SA3 standard. Serving Morpeth, Hexham & Alnwick.",
    url: "https://commercialshotblasting.co.uk/counties/northumberland",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 55.2083,
    longitude: -2.0784,
    majorTowns: ["Morpeth", "Hexham", "Alnwick", "Blyth"],
    industries: ["Agriculture", "Construction", "Energy", "Manufacturing"],
    townsAndVillages: ["Alnwick", "Amble", "Ashington", "Berwick-upon-Tweed", "Blyth", "Corbridge", "Cramlington", "Haltwhistle", "Hexham", "Morpeth", "Newbiggin-by-the-Sea", "Ponteland", "Prudhoe", "Rothbury", "Seahouses", "Wooler"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Northumberland?",
        answer: "Yes, we provide mobile shot blasting services across all of Northumberland. Our fully equipped mobile units can reach any location in the county, including Morpeth, Hexham, Alnwick, Blyth, and surrounding areas."
      },
      {
        question: "How quickly can you reach my location in Northumberland?",
        answer: "We typically respond to enquiries within 24 hours and can usually schedule site visits in Northumberland within 2-5 working days, depending on your location and our current schedule."
      },
      {
        question: "Do you handle agricultural machinery blasting in Northumberland?",
        answer: "Yes, we regularly work with farmers and agricultural businesses throughout Northumberland, blasting and preparing farm machinery, trailers, and equipment for repainting and long-term protection against the rural environment."
      },
      {
        question: "Do I need to provide anything for the shot blasting work in Northumberland?",
        answer: "We bring all necessary equipment including our mobile blasting unit, abrasive media, and containment systems. You'll need to provide access to the site and, for some indoor jobs, a power supply."
      },
      {
        question: "How do I request a site visit for shot blasting services in Northumberland?",
        answer: "Simply call us on 07721 375756 or request a site visit through our website. We'll discuss your project requirements and can arrange a site visit in Northumberland to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "cornwall": {
    name: "Cornwall",
    slug: "cornwall",
    region: "South West England",
    description: "Professional shot blasting services throughout Cornwall. Serving Truro, Falmouth, Redruth, Camborne, Penzance, Bodmin, St Austell, and Newquay with expert surface preparation for marine, industrial, and heritage structures.",
    metaDescription: "Mobile shot blasting in Cornwall — ship repair, harbour infrastructure, mining heritage buildings & industrial steelwork. SA2.5/SA3 standard. Serving Truro, Falmouth & Penzance.",
    url: "https://commercialshotblasting.co.uk/counties/cornwall",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 50.2660,
    longitude: -5.0527,
    majorTowns: ["Truro", "Falmouth", "Redruth", "Penzance", "St Austell", "Newquay"],
    industries: ["Marine", "Mining Heritage", "Tourism Infrastructure", "Agriculture", "Renewable Energy"],
    townsAndVillages: ["Bodmin", "Bude", "Callington", "Camborne", "Falmouth", "Fowey", "Hayle", "Helston", "Launceston", "Liskeard", "Looe", "Newquay", "Padstow", "Par", "Penryn", "Penzance", "Redruth", "Saltash", "St Austell", "St Ives", "Truro", "Wadebridge"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Cornwall?",
        answer: "Yes, we provide mobile shot blasting services across all of Cornwall. Our fully equipped mobile units can reach any location in the county, including Truro, Falmouth, Penzance, St Austell, Newquay, and all surrounding areas."
      },
      {
        question: "Can you blast marine vessels and harbour infrastructure in Cornwall?",
        answer: "Absolutely. We regularly work at Falmouth Docks and other Cornish harbours, blasting ship hulls, harbour steelwork, dock gates, and marine equipment. Our mobile units are ideal for on-site marine work where structures cannot be moved."
      },
      {
        question: "Do you work on heritage mining buildings in Cornwall?",
        answer: "Yes, we have extensive experience with heritage structures including former engine houses and mining buildings across the Cornish Mining World Heritage Site. We use appropriate abrasive media and pressures to clean stonework and metalwork without causing damage."
      },
      {
        question: "How quickly can you reach my location in Cornwall?",
        answer: "We can typically schedule site visits in Cornwall within 3-5 working days. For urgent projects at Falmouth Docks or industrial estates near the A30 corridor, we can often respond faster. Call us on 07721 375756 to discuss your timeline."
      },
      {
        question: "What types of projects do you handle in Cornwall?",
        answer: "We handle a wide range of commercial projects in Cornwall including ship repair at Falmouth, china clay infrastructure near St Austell, agricultural buildings, wind farm components, hotel and tourism infrastructure refurbishment, and structural steel for new construction projects."
      }
    ]
  },
  "kent": {
    name: "Kent",
    slug: "kent",
    region: "South East England",
    description: "Professional shot blasting services throughout Kent. Serving Maidstone, Canterbury, Dover, Folkestone, Ashford, and Thanet with expert surface preparation for port infrastructure, industrial steelwork, and heritage buildings.",
    metaDescription: "Mobile shot blasting in Kent — port infrastructure, Channel Tunnel steelwork, industrial estates & heritage buildings. SA2.5/SA3 standard. Serving Maidstone, Dover & Canterbury.",
    url: "https://commercialshotblasting.co.uk/counties/kent",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 51.2787,
    longitude: 0.5217,
    majorTowns: ["Maidstone", "Canterbury", "Dover", "Folkestone", "Ashford", "Thanet"],
    industries: ["Port & Logistics", "Manufacturing", "Construction", "Agriculture", "Heritage"],
    townsAndVillages: ["Ashford", "Broadstairs", "Canterbury", "Chatham", "Dartford", "Deal", "Dover", "Faversham", "Folkestone", "Gillingham", "Gravesend", "Herne Bay", "Hythe", "Maidstone", "Margate", "Ramsgate", "Rochester", "Royal Tunbridge Wells", "Sandwich", "Sevenoaks", "Sittingbourne", "Swanley", "Tonbridge", "Whitstable"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Kent?",
        answer: "Yes, we provide mobile shot blasting services across all of Kent. Our fully equipped mobile units can reach any location in the county, including Maidstone, Canterbury, Dover, Folkestone, Ashford, and all surrounding areas."
      },
      {
        question: "Can you work on port infrastructure at Dover and other Kent harbours?",
        answer: "Absolutely. We regularly blast harbour steelwork, dock gates, container handling equipment, and marine structures at ports across Kent including Dover, Ramsgate, and Sheerness."
      },
      {
        question: "Do you handle heritage building restoration in Kent?",
        answer: "Yes, we have experience with heritage structures across Kent including oast houses, historic dockyards, and listed buildings. We use appropriate abrasive media to clean surfaces without causing damage to the underlying materials."
      },
      {
        question: "How quickly can you reach my location in Kent?",
        answer: "We can typically schedule site visits in Kent within 3-5 working days. For urgent projects at Dover Port or industrial estates near the M20 corridor, we can often respond faster. Call us on 07721 375756."
      },
      {
        question: "What types of industrial projects do you handle in Kent?",
        answer: "We handle structural steel for new builds, factory cladding refurbishment, warehouse floor preparation, container maintenance at logistics hubs, agricultural buildings, and bridge steelwork across Kent's motorway and rail network."
      }
    ]
  },
  "devon": {
    name: "Devon",
    slug: "devon",
    region: "South West England",
    description: "Professional shot blasting services throughout Devon. Serving Exeter, Plymouth, Torquay, Barnstaple, Newton Abbot, and Tiverton with expert surface preparation for marine, agricultural, and industrial structures.",
    metaDescription: "Mobile shot blasting in Devon — marine vessels, agricultural machinery, industrial steelwork & heritage buildings. SA2.5/SA3 standard. Serving Exeter, Plymouth & Barnstaple.",
    url: "https://commercialshotblasting.co.uk/counties/devon",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/xRNbdXezEbVeGwhe.webp",
    latitude: 50.7156,
    longitude: -3.5309,
    majorTowns: ["Exeter", "Plymouth", "Torquay", "Barnstaple", "Newton Abbot", "Tiverton"],
    industries: ["Marine", "Agriculture", "Manufacturing", "Tourism Infrastructure", "Defence"],
    townsAndVillages: ["Axminster", "Barnstaple", "Bideford", "Bovey Tracey", "Braunton", "Brixham", "Buckfastleigh", "Crediton", "Cullompton", "Dartmouth", "Dawlish", "Exeter", "Exmouth", "Honiton", "Ilfracombe", "Ivybridge", "Kingsbridge", "Newton Abbot", "Okehampton", "Paignton", "Plymouth", "Salcombe", "Sidmouth", "South Molton", "Tavistock", "Teignmouth", "Tiverton", "Torquay", "Totnes"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Devon?",
        answer: "Yes, we provide mobile shot blasting services across all of Devon. Our fully equipped mobile units can reach any location in the county, including Exeter, Plymouth, Torquay, Barnstaple, and all surrounding areas."
      },
      {
        question: "Can you blast marine vessels and harbour infrastructure in Devon?",
        answer: "Absolutely. We work at Plymouth's Devonport Dockyard, Brixham harbour, and other Devon ports, blasting ship hulls, harbour steelwork, and marine equipment. Our mobile units are ideal for on-site work."
      },
      {
        question: "Do you work on agricultural buildings in Devon?",
        answer: "Yes, we regularly blast agricultural buildings, farm machinery, livestock housing steelwork, and grain storage facilities across Devon's extensive farming sector."
      },
      {
        question: "How quickly can you reach my location in Devon?",
        answer: "We can typically schedule site visits in Devon within 3-5 working days. For urgent projects near the M5/A38 corridor or Plymouth naval dockyard, we can often respond faster. Call us on 07721 375756."
      },
      {
        question: "What types of projects do you handle in Devon?",
        answer: "We handle naval and marine work at Plymouth, agricultural buildings across rural Devon, hotel and tourism infrastructure refurbishment, structural steel for new construction, and heritage building restoration throughout the county."
      }
    ]
  },
  "merseyside": {
    name: "Merseyside",
    slug: "merseyside",
    region: "North West England",
    description: "Professional shot blasting services throughout Merseyside. Serving Liverpool, Birkenhead, St Helens, Southport, and Wirral with expert surface preparation for port infrastructure, industrial steelwork, and heritage buildings.",    
    metaDescription: "Mobile shot blasting in Merseyside — port infrastructure, shipbuilding, industrial estates & heritage buildings. SA2.5/SA3 standard. Serving Liverpool, Birkenhead & St Helens.",
    url: "https://commercialshotblasting.co.uk/counties/merseyside",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/eujkoesZcJTxNAzk.webp",
    latitude: 53.4084,
    longitude: -2.9916,
    majorTowns: ["Liverpool", "Birkenhead", "St Helens", "Southport", "Bootle", "Wallasey"],
    industries: ["Port & Logistics", "Manufacturing", "Construction", "Marine", "Heritage"],
    townsAndVillages: ["Bebington", "Birkenhead", "Bootle", "Crosby", "Formby", "Heswall", "Hoylake", "Huyton", "Kirkby", "Knowsley", "Liverpool", "Maghull", "Moreton", "Neston", "New Brighton", "Newton-le-Willows", "Prescot", "Rainhill", "St Helens", "Southport", "Wallasey", "West Kirby", "Widnes"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Merseyside?",
        answer: "Yes, we provide mobile shot blasting services across all of Merseyside. Our fully equipped mobile units can reach any location in the region, including Liverpool, Birkenhead, St Helens, Southport, and all surrounding areas."
      },
      {
        question: "Can you work on port infrastructure at Liverpool Docks?",
        answer: "Absolutely. We regularly blast harbour steelwork, dock gates, container handling equipment, and marine structures at Liverpool's extensive port facilities and across the Mersey."
      },
      {
        question: "Do you handle heritage building restoration in Merseyside?",
        answer: "Yes, we have experience with heritage structures across Merseyside including the Albert Dock area, listed industrial buildings, and Victorian warehouse conversions. We use appropriate techniques to preserve historical integrity."
      },
      {
        question: "How quickly can you reach my location in Merseyside?",
        answer: "We can typically schedule site visits in Merseyside within 2-4 working days. For urgent projects at Liverpool Docks or industrial estates near the M62 corridor, we can often respond faster. Call us on 07721 375756."
      },
      {
        question: "What types of industrial projects do you handle in Merseyside?",
        answer: "We handle port infrastructure, shipyard steelwork, factory cladding, warehouse floors, structural steel for new builds, bridge maintenance, and industrial estate refurbishment across Merseyside."
      }
    ]
  },
  "oxfordshire": {
    name: "Oxfordshire",
    slug: "oxfordshire",
    region: "South East England",
    description: "Professional shot blasting services throughout Oxfordshire. Serving Oxford, Banbury, Bicester, Didcot, Witney, and Abingdon with expert surface preparation for university buildings, automotive manufacturing, and commercial construction.",
    metaDescription: "Mobile shot blasting in Oxfordshire — automotive manufacturing, university buildings, logistics warehouses & commercial steelwork. SA2.5/SA3 standard. Serving Oxford, Banbury & Bicester.",
    url: "https://commercialshotblasting.co.uk/counties/oxfordshire",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 51.7520,
    longitude: -1.2577,
    majorTowns: ["Oxford", "Banbury", "Bicester", "Didcot", "Witney", "Abingdon"],
    industries: ["Automotive Manufacturing", "Education & Research", "Logistics", "Construction", "Heritage"],
    townsAndVillages: ["Abingdon", "Banbury", "Bicester", "Burford", "Carterton", "Chipping Norton", "Didcot", "Faringdon", "Grove", "Henley-on-Thames", "Kidlington", "Oxford", "Thame", "Wallingford", "Wantage", "Witney", "Woodstock"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Oxfordshire?",
        answer: "Yes, we provide mobile shot blasting services across all of Oxfordshire. Our fully equipped mobile units can reach any location in the county, including Oxford, Banbury, Bicester, Didcot, Witney, and all surrounding areas."
      },
      {
        question: "Can you work on automotive manufacturing facilities in Oxfordshire?",
        answer: "Absolutely. We regularly blast structural steelwork, production line equipment, and factory cladding at automotive and manufacturing plants along the M40 corridor including the BMW Mini plant area and logistics hubs near Bicester."
      },
      {
        question: "Do you handle heritage building restoration in Oxfordshire?",
        answer: "Yes, we have extensive experience with heritage structures across Oxfordshire including university college buildings, listed properties, and historic industrial buildings. We use appropriate abrasive media to clean surfaces without causing damage."
      },
      {
        question: "How quickly can you reach my location in Oxfordshire?",
        answer: "We can typically schedule site visits in Oxfordshire within 3-5 working days. For urgent projects near the M40 or A34 corridors, we can often respond faster. Call us on 07721 375756."
      },
      {
        question: "What types of projects do you handle in Oxfordshire?",
        answer: "We handle automotive manufacturing steelwork, university and college building restoration, logistics warehouse floors, structural steel for new construction, bridge maintenance on the A34/M40, and commercial building refurbishment across Oxfordshire."
      }
    ]
  },
  "surrey": {
    name: "Surrey",
    slug: "surrey",
    region: "South East England",
    description: "Professional shot blasting services throughout Surrey. Serving Guildford, Woking, Epsom, Camberley, and Farnham with expert surface preparation for tech campus buildings, light industrial estates, and commercial property refurbishment.",
    metaDescription: "Mobile shot blasting in Surrey — tech campuses, industrial estates, commercial property & heritage buildings. SA2.5/SA3 standard. Serving Guildford, Woking, Epsom & Camberley.",
    url: "https://commercialshotblasting.co.uk/counties/surrey",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 51.2362,
    longitude: -0.5704,
    majorTowns: ["Guildford", "Woking", "Epsom", "Camberley", "Farnham"],
    industries: ["Technology", "Defence", "Pharmaceuticals", "Light Manufacturing", "Heritage"],
    townsAndVillages: ["Camberley", "Dorking", "Epsom", "Esher", "Farnham", "Godalming", "Guildford", "Haslemere", "Leatherhead", "Reigate", "Staines", "Walton-on-Thames", "Weybridge", "Woking"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Surrey?",
        answer: "Yes, we provide mobile shot blasting services across all of Surrey. Our fully equipped mobile units can reach any location in the county, including Guildford, Woking, Epsom, Camberley, Farnham, and all surrounding areas via the M25, M3, and A3."
      },
      {
        question: "Can you work on tech campus and commercial buildings in Surrey?",
        answer: "Absolutely. We regularly blast structural steelwork, cladding panels, and external metalwork at technology parks and commercial campuses across Surrey including Watchmoor Park, McLaren Technology Centre area, and business parks along the M3/A3 corridors."
      },
      {
        question: "Do you handle heritage building restoration in Surrey?",
        answer: "Yes, we have experience with heritage structures across Surrey including listed buildings, historic industrial premises, and period properties. We select appropriate abrasive media to clean surfaces without causing damage to original materials."
      },
      {
        question: "How quickly can you reach my site in Surrey?",
        answer: "We can typically schedule site visits in Surrey within 3-5 working days. With excellent M25, M3, and A3 access, we can reach most Surrey locations efficiently. Call us on 07721 375756 for availability."
      },
      {
        question: "What types of industrial projects do you handle in Surrey?",
        answer: "We handle tech campus steelwork, pharmaceutical facility equipment, defence sector infrastructure, light manufacturing units, warehouse floors, commercial property refurbishment, and heritage building restoration across Surrey."
      }
    ]
  },
  "sussex": {
    name: "Sussex",
    slug: "sussex",
    region: "South East England",
    description: "Professional shot blasting services throughout Sussex. Serving Brighton, Crawley, Worthing, and Horsham with expert surface preparation for aviation infrastructure, port steelwork, logistics warehouses, and coastal heritage buildings.",
    metaDescription: "Mobile shot blasting in Sussex — aviation infrastructure, port steelwork, logistics warehouses & coastal heritage. SA2.5/SA3 standard. Serving Brighton, Crawley, Worthing & Horsham.",
    url: "https://commercialshotblasting.co.uk/counties/sussex",
    ogImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/yEbPReqUussVzDSr.webp",
    latitude: 50.8376,
    longitude: -0.7749,
    majorTowns: ["Brighton and Hove", "Crawley", "Worthing", "Horsham"],
    industries: ["Aviation", "Logistics", "Pharmaceuticals", "Marine", "Heritage"],
    townsAndVillages: ["Bognor Regis", "Brighton and Hove", "Burgess Hill", "Chichester", "Crawley", "Eastbourne", "East Grinstead", "Hastings", "Haywards Heath", "Horsham", "Lewes", "Littlehampton", "Newhaven", "Shoreham-by-Sea", "Worthing"],
    faqs: [
      {
        question: "Do you provide shot blasting services throughout Sussex?",
        answer: "Yes, we provide mobile shot blasting services across all of Sussex — both East and West. Our fully equipped units can reach any location including Brighton, Crawley, Worthing, Horsham, Eastbourne, and Chichester."
      },
      {
        question: "Can you work on aviation and logistics facilities near Gatwick?",
        answer: "Absolutely. We regularly blast structural steelwork, hangar cladding, warehouse floors, and logistics infrastructure at Manor Royal Business District and the wider Gatwick Diamond area. We're experienced working alongside live aviation operations."
      },
      {
        question: "Do you handle coastal and marine structures in Sussex?",
        answer: "Yes, we have extensive experience with coastal infrastructure including marina steelwork, port equipment, Victorian pier ironwork, and seafront railings. We use appropriate abrasive media for salt-damaged surfaces requiring preparation before protective coatings."
      },
      {
        question: "How quickly can you reach my site in Sussex?",
        answer: "We can typically schedule site visits in Sussex within 3-5 working days. With good A23/M23 and A27 access, we can reach most Sussex locations efficiently. Call us on 07721 375756 for availability."
      },
      {
        question: "What types of industrial projects do you handle in Sussex?",
        answer: "We handle aviation hangar steelwork, logistics warehouse floors, pharmaceutical manufacturing equipment, coastal/marine infrastructure, commercial property refurbishment, and heritage building restoration across Sussex."
      }
    ]
  },
};
