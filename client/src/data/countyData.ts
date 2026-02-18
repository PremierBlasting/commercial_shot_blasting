// County data for all 27 service area counties
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
}

export const countyData: Record<string, CountyData> = {
  // East of England
  "bedfordshire": {
    name: "Bedfordshire",
    slug: "bedfordshire",
    region: "East of England",
    description: "Professional shot blasting services in Bedfordshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/bedfordshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Bedfordshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "cambridgeshire": {
    name: "Cambridgeshire",
    slug: "cambridgeshire",
    region: "East of England",
    description: "Professional shot blasting services in Cambridgeshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/cambridgeshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Cambridgeshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "hertfordshire": {
    name: "Hertfordshire",
    slug: "hertfordshire",
    region: "East of England",
    description: "Professional shot blasting services in Hertfordshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/hertfordshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Hertfordshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "norfolk": {
    name: "Norfolk",
    slug: "norfolk",
    region: "East of England",
    description: "Professional shot blasting services in Norfolk. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/norfolk",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Norfolk to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "suffolk": {
    name: "Suffolk",
    slug: "suffolk",
    region: "East of England",
    description: "Professional shot blasting services in Suffolk. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/suffolk",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Suffolk to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // East Midlands
  "derbyshire": {
    name: "Derbyshire",
    slug: "derbyshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Derbyshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/derbyshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Derbyshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "leicestershire": {
    name: "Leicestershire",
    slug: "leicestershire",
    region: "East Midlands",
    description: "Professional shot blasting services in Leicestershire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/leicestershire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Leicestershire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "lincolnshire": {
    name: "Lincolnshire",
    slug: "lincolnshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Lincolnshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/lincolnshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Lincolnshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "northamptonshire": {
    name: "Northamptonshire",
    slug: "northamptonshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Northamptonshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/northamptonshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Northamptonshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "nottinghamshire": {
    name: "Nottinghamshire",
    slug: "nottinghamshire",
    region: "East Midlands",
    description: "Professional shot blasting services in Nottinghamshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/nottinghamshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Nottinghamshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // West Midlands
  "herefordshire": {
    name: "Herefordshire",
    slug: "herefordshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Herefordshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/herefordshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Herefordshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "shropshire": {
    name: "Shropshire",
    slug: "shropshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Shropshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/shropshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Shropshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "staffordshire": {
    name: "Staffordshire",
    slug: "staffordshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Staffordshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/staffordshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Staffordshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "warwickshire": {
    name: "Warwickshire",
    slug: "warwickshire",
    region: "West Midlands",
    description: "Professional shot blasting services in Warwickshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/warwickshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Warwickshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "west-midlands": {
    name: "West Midlands",
    slug: "west-midlands",
    region: "West Midlands",
    description: "Professional shot blasting services in West Midlands. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/west-midlands",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in West Midlands to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "worcestershire": {
    name: "Worcestershire",
    slug: "worcestershire",
    region: "West Midlands",
    description: "Professional shot blasting services in Worcestershire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/worcestershire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Worcestershire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // Yorkshire
  "south-yorkshire": {
    name: "South Yorkshire",
    slug: "south-yorkshire",
    region: "Yorkshire",
    description: "Professional shot blasting services throughout South Yorkshire. Serving Sheffield, Rotherham, Doncaster, and surrounding areas with expert surface preparation and industrial blasting.",
    url: "https://commercialshotblasting.co.uk/counties/south-yorkshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in South Yorkshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "west-yorkshire": {
    name: "West Yorkshire",
    slug: "west-yorkshire",
    region: "Yorkshire",
    description: "Expert shot blasting services across West Yorkshire. Supporting Leeds, Bradford, Wakefield, and local manufacturers with professional surface preparation solutions.",
    url: "https://commercialshotblasting.co.uk/counties/west-yorkshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in West Yorkshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // North West
  "cheshire": {
    name: "Cheshire",
    slug: "cheshire",
    region: "North West",
    description: "Professional shot blasting services throughout Cheshire. Serving Chester, Crewe, Warrington, and surrounding businesses with expert surface preparation and rust removal.",
    url: "https://commercialshotblasting.co.uk/counties/cheshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Cheshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // South West
  "gloucestershire": {
    name: "Gloucestershire",
    slug: "gloucestershire",
    region: "South West",
    description: "Professional shot blasting services in Gloucestershire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/gloucestershire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Gloucestershire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "north-devon": {
    name: "North Devon",
    slug: "north-devon",
    region: "South West",
    description: "Professional shot blasting services throughout North Devon. Serving Barnstaple, Ilfracombe, and surrounding areas with expert surface preparation and rust removal solutions.",
    url: "https://commercialshotblasting.co.uk/counties/north-devon",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in North Devon to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "somerset": {
    name: "Somerset",
    slug: "somerset",
    region: "South West",
    description: "Professional shot blasting services in Somerset. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/somerset",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Somerset to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "wiltshire": {
    name: "Wiltshire",
    slug: "wiltshire",
    region: "South West",
    description: "Professional shot blasting services in Wiltshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/wiltshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Wiltshire to provide an accurate, no-obligation quotation."
      }
    ]
  },

  // Wales Borders
  "buckinghamshire": {
    name: "Buckinghamshire",
    slug: "buckinghamshire",
    region: "Wales Borders",
    description: "Professional shot blasting services in Buckinghamshire. Rust removal, surface prep & industrial blasting. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/counties/buckinghamshire",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in Buckinghamshire to provide an accurate, no-obligation quotation."
      }
    ]
  },
  "east-wales": {
    name: "East Wales",
    slug: "east-wales",
    region: "Wales Borders",
    description: "Professional shot blasting services throughout East Wales. Serving Cardiff, Newport, Wrexham, and surrounding areas with expert surface preparation and industrial blasting solutions.",
    url: "https://commercialshotblasting.co.uk/counties/east-wales",
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
        question: "How do I get a quote for shot blasting services?",
        answer: "Simply call us on 07970 566409 or request a free quote through our website. We'll discuss your project requirements and can arrange a site visit in East Wales to provide an accurate, no-obligation quotation."
      }
    ]
  },
};
