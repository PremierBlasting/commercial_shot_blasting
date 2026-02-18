#!/usr/bin/env python3
"""
Generate County pages for the Commercial Shot Blasting website.
Each county page lists all towns within that county with links to individual town pages.
"""

import os

# Define counties with their towns and metadata
counties = {
    "west-midlands": {
        "name": "West Midlands",
        "slug": "west-midlands",
        "componentName": "WestMidlandsCounty",
        "description": "Professional shot blasting services across the West Midlands region. We cover Birmingham, Wolverhampton, Coventry and surrounding areas with mobile shot blasting for commercial and industrial projects.",
        "towns": [
            {"name": "Birmingham", "slug": "birmingham"},
            {"name": "Wolverhampton", "slug": "wolverhampton"},
            {"name": "Coventry", "slug": "coventry"},
            {"name": "Worcester", "slug": "worcester"},
            {"name": "Stratford-upon-Avon", "slug": "stratford-upon-avon"},
            {"name": "Dudley", "slug": "dudley"},
            {"name": "Solihull", "slug": "solihull"},
            {"name": "Sutton Coldfield", "slug": "sutton-coldfield"},
            {"name": "Walsall", "slug": "walsall"},
            {"name": "Kidderminster", "slug": "kidderminster"},
            {"name": "Redditch", "slug": "redditch"},
            {"name": "Nuneaton", "slug": "nuneaton"},
            {"name": "Leamington Spa", "slug": "leamington-spa"},
            {"name": "Rugby", "slug": "rugby"},
        ]
    },
    "staffordshire": {
        "name": "Staffordshire",
        "slug": "staffordshire",
        "componentName": "StaffordshireCounty",
        "description": "Expert shot blasting services throughout Staffordshire. Covering Stoke-on-Trent, Stafford, Burton upon Trent, Cannock, Lichfield and surrounding areas.",
        "towns": [
            {"name": "Stoke-on-Trent", "slug": "stoke-on-trent"},
            {"name": "Stafford", "slug": "stafford"},
            {"name": "Burton upon Trent", "slug": "burton-on-trent"},
            {"name": "Cannock", "slug": "cannock"},
            {"name": "Cannock Chase", "slug": "cannock-chase"},
            {"name": "Lichfield", "slug": "lichfield"},
            {"name": "Tamworth", "slug": "tamworth"},
            {"name": "Newcastle-under-Lyme", "slug": "newcastle-under-lyme"},
        ]
    },
    "east-midlands": {
        "name": "East Midlands",
        "slug": "east-midlands",
        "componentName": "EastMidlandsCounty",
        "description": "Professional shot blasting services across the East Midlands. Covering Nottingham, Leicester, Derby, Lincoln, Northampton and surrounding areas.",
        "towns": [
            {"name": "Nottingham", "slug": "nottingham"},
            {"name": "Leicester", "slug": "leicester"},
            {"name": "Derby", "slug": "derby"},
            {"name": "Lincoln", "slug": "lincoln"},
            {"name": "Northampton", "slug": "northampton"},
            {"name": "Chesterfield", "slug": "chesterfield"},
            {"name": "Mansfield", "slug": "mansfield"},
            {"name": "Loughborough", "slug": "loughborough"},
            {"name": "Coalville", "slug": "coalville"},
            {"name": "Corby", "slug": "corby"},
            {"name": "Kettering", "slug": "kettering"},
            {"name": "Wellingborough", "slug": "wellingborough"},
            {"name": "Grantham", "slug": "grantham"},
            {"name": "Scunthorpe", "slug": "scunthorpe"},
            {"name": "Dronfield", "slug": "dronfield"},
        ]
    },
    "yorkshire": {
        "name": "Yorkshire",
        "slug": "yorkshire",
        "componentName": "YorkshireCounty",
        "description": "Expert shot blasting services across Yorkshire. Covering Sheffield, Leeds, Barnsley, Doncaster, Rotherham, Halifax and Huddersfield.",
        "towns": [
            {"name": "Sheffield", "slug": "sheffield"},
            {"name": "Leeds", "slug": "leeds"},
            {"name": "Barnsley", "slug": "barnsley"},
            {"name": "Doncaster", "slug": "doncaster"},
            {"name": "Rotherham", "slug": "rotherham"},
            {"name": "Halifax", "slug": "halifax"},
            {"name": "Huddersfield", "slug": "huddersfield"},
        ]
    },
    "north-west": {
        "name": "North West",
        "slug": "north-west",
        "componentName": "NorthWestCounty",
        "description": "Professional shot blasting services across the North West. Covering Manchester, Liverpool, Chester, Bolton, Warrington and surrounding areas.",
        "towns": [
            {"name": "Manchester", "slug": "manchester"},
            {"name": "Liverpool", "slug": "liverpool"},
            {"name": "Chester", "slug": "chester"},
            {"name": "Bolton", "slug": "bolton"},
            {"name": "Oldham", "slug": "oldham"},
            {"name": "Rochdale", "slug": "rochdale"},
            {"name": "Salford", "slug": "salford"},
            {"name": "Stockport", "slug": "stockport"},
            {"name": "Warrington", "slug": "warrington"},
            {"name": "Runcorn", "slug": "runcorn"},
            {"name": "Birkenhead", "slug": "birkenhead"},
            {"name": "Crewe", "slug": "crewe"},
            {"name": "Macclesfield", "slug": "macclesfield"},
        ]
    },
    "east-of-england": {
        "name": "East of England",
        "slug": "east-of-england",
        "componentName": "EastOfEnglandCounty",
        "description": "Expert shot blasting services across East of England. Covering Norwich, Cambridge, Ipswich, Peterborough, Colchester and surrounding areas.",
        "towns": [
            {"name": "Norwich", "slug": "norwich"},
            {"name": "Cambridge", "slug": "cambridge"},
            {"name": "Ipswich", "slug": "ipswich"},
            {"name": "St Albans", "slug": "st-albans"},
            {"name": "Peterborough", "slug": "peterborough"},
            {"name": "Colchester", "slug": "colchester"},
            {"name": "Chelmsford", "slug": "chelmsford"},
            {"name": "Basildon", "slug": "basildon"},
            {"name": "Southend-on-Sea", "slug": "southend-on-sea"},
            {"name": "Great Yarmouth", "slug": "great-yarmouth"},
            {"name": "Lowestoft", "slug": "lowestoft"},
            {"name": "King's Lynn", "slug": "kings-lynn"},
            {"name": "Thetford", "slug": "thetford"},
            {"name": "Bury St Edmunds", "slug": "bury-st-edmunds"},
        ]
    },
    "hertfordshire-bedfordshire": {
        "name": "Hertfordshire & Bedfordshire",
        "slug": "hertfordshire-bedfordshire",
        "componentName": "HertfordshireBedfordshireCounty",
        "description": "Professional shot blasting services across Hertfordshire and Bedfordshire. Covering Luton, Bedford, Stevenage, Watford, Hemel Hempstead and surrounding areas.",
        "towns": [
            {"name": "Luton", "slug": "luton"},
            {"name": "Bedford", "slug": "bedford"},
            {"name": "Stevenage", "slug": "stevenage"},
            {"name": "Watford", "slug": "watford"},
            {"name": "Hemel Hempstead", "slug": "hemel-hempstead"},
            {"name": "Welwyn Garden City", "slug": "welwyn-garden-city"},
            {"name": "Leighton Buzzard", "slug": "leighton-buzzard"},
        ]
    },
    "south-west": {
        "name": "South West",
        "slug": "south-west",
        "componentName": "SouthWestCounty",
        "description": "Expert shot blasting services across the South West. Covering Bristol, Gloucester, Swindon, Bath, Cheltenham, Taunton and surrounding areas.",
        "towns": [
            {"name": "Bristol", "slug": "bristol"},
            {"name": "Gloucester", "slug": "gloucester"},
            {"name": "Swindon", "slug": "swindon"},
            {"name": "Bath", "slug": "bath"},
            {"name": "Cheltenham", "slug": "cheltenham"},
            {"name": "Taunton", "slug": "taunton"},
            {"name": "Weston-super-Mare", "slug": "weston-super-mare"},
            {"name": "Kingswood", "slug": "kingswood"},
            {"name": "Salisbury", "slug": "salisbury"},
        ]
    },
    "south-east": {
        "name": "South East",
        "slug": "south-east",
        "componentName": "SouthEastCounty",
        "description": "Professional shot blasting services across the South East. Covering Milton Keynes, Oxford, Reading, Slough, Guildford, Portsmouth and surrounding areas.",
        "towns": [
            {"name": "Milton Keynes", "slug": "milton-keynes"},
            {"name": "Oxford", "slug": "oxford"},
            {"name": "Reading", "slug": "reading"},
            {"name": "Slough", "slug": "slough"},
            {"name": "Guildford", "slug": "guildford"},
            {"name": "Portsmouth", "slug": "portsmouth"},
            {"name": "Aylesbury", "slug": "aylesbury"},
            {"name": "High Wycombe", "slug": "high-wycombe"},
            {"name": "Banbury", "slug": "banbury"},
        ]
    },
    "shropshire": {
        "name": "Shropshire",
        "slug": "shropshire",
        "componentName": "ShropshireCounty",
        "description": "Expert shot blasting services across Shropshire. Covering Shrewsbury, Telford and surrounding areas with mobile shot blasting for commercial and industrial projects.",
        "towns": [
            {"name": "Shrewsbury", "slug": "shrewsbury"},
            {"name": "Telford", "slug": "telford"},
        ]
    },
    "wales-borders": {
        "name": "Wales & Borders",
        "slug": "wales-borders",
        "componentName": "WalesBordersCounty",
        "description": "Professional shot blasting services across Wales and the border counties. Covering Cardiff, Hereford, Wrexham, Newport and surrounding areas.",
        "towns": [
            {"name": "Hereford", "slug": "hereford"},
            {"name": "Cardiff", "slug": "cardiff"},
            {"name": "Wrexham", "slug": "wrexham"},
            {"name": "Newport", "slug": "newport"},
        ]
    },
}

def generate_county_component(county_data):
    """Generate a React component for a county page."""
    name = county_data["name"]
    slug = county_data["slug"]
    component_name = county_data["componentName"]
    description = county_data["description"]
    towns = county_data["towns"]
    
    # Generate town links
    town_links = ",\n    ".join([
        f'{{ name: "{t["name"]}", slug: "{t["slug"]}" }}'
        for t in towns
    ])
    
    component = f'''import {{ Link }} from "wouter";
import {{ Phone, MapPin, ArrowRight, Building2 }} from "lucide-react";
import {{ useState, useEffect }} from "react";
import {{ QuotePopup }} from "@/components/QuotePopup";
import {{ Header }} from "@/components/Header";
import {{ Footer }} from "@/components/Footer";
import {{ Breadcrumb }} from "@/components/Breadcrumb";
import {{ Button }} from "@/components/ui/button";

const towns = [
    {town_links}
];

export default function {component_name}() {{
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {{
    document.title = "Shot Blasting {name} | Service Areas";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {{
      metaKeywords.setAttribute('content', 'shot blasting {name}, mobile shot blasting, rust removal, surface preparation, {name}');
    }} else {{
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'shot blasting {name}, mobile shot blasting, rust removal, surface preparation, {name}';
      document.head.appendChild(meta);
    }}

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {{
      metaDescription.setAttribute('content', '{description}');
    }} else {{
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = '{description}';
      document.head.appendChild(meta);
    }}

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {{
      ogTitle.setAttribute('content', 'Shot Blasting {name} | Service Areas');
    }}

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {{
      ogDescription.setAttribute('content', '{description}');
    }}

    // Scroll to top
    window.scrollTo(0, 0);
  }}, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenQuotePopup={{() => setQuotePopupOpen(true)}} />
      
      {{/* Hero Section */}}
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] text-white py-20">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
        <div className="container relative">
          <Breadcrumb 
            items={{[
              {{ label: "Home", href: "/" }},
              {{ label: "Service Areas", href: "/service-areas" }},
              {{ label: "{name}", href: "/service-areas/{slug}" }}
            ]}}
          />
          <div className="max-w-3xl mt-8">
            <div className="flex items-center gap-2 text-[#7ac5e3] mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">{name} Region</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Shot Blasting Services in {name}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={{() => setQuotePopupOpen(true)}}
                className="bg-[#7ac5e3] hover:bg-[#5eb5d6] text-[#1e3a5f] font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Get a Free Quote
              </button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="tel:07970566409">
                  <Phone className="w-4 h-4 mr-2" />
                  07970 566409
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {{/* Towns Grid */}}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">
              Our Service Areas in {name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide professional shot blasting services across all areas of {name}. 
              Click on a location below to learn more about our services in your area.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {{towns.map((town) => (
              <Link 
                key={{town.slug}}
                href={{`/service-areas/${{town.slug}}`}}
                className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#7ac5e3]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7ac5e3]/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-[#1e3a5f]" />
                    </div>
                    <span className="font-medium text-[#1e3a5f] group-hover:text-[#7ac5e3] transition-colors">
                      {{town.name}}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#7ac5e3] transition-colors" />
                </div>
              </Link>
            ))}}
          </div>
        </div>
      </section>

      {{/* Services Overview */}}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">
                Professional Shot Blasting Across {name}
              </h2>
              <p className="text-gray-600 mb-6">
                Our mobile shot blasting teams cover the entire {name} region, providing 
                on-site surface preparation services for commercial and industrial clients. 
                Whether you need rust removal, paint stripping, or surface preparation for 
                recoating, we deliver exceptional results.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7ac5e3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1e3a5f]"></div>
                  </div>
                  <span className="text-gray-700">Mobile shot blasting - we come to you</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7ac5e3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1e3a5f]"></div>
                  </div>
                  <span className="text-gray-700">Commercial & industrial specialists</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7ac5e3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1e3a5f]"></div>
                  </div>
                  <span className="text-gray-700">Fast turnaround times</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7ac5e3]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#1e3a5f]"></div>
                  </div>
                  <span className="text-gray-700">Competitive pricing</span>
                </li>
              </ul>
              <button
                onClick={{() => setQuotePopupOpen(true)}}
                className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Request a Quote
              </button>
            </div>
            <div className="relative">
              <img 
                src="/shotblasting-action.jpg" 
                alt="Shot blasting services in {name}"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {{/* CTA Section */}}
      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started in {name}?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote on your shot blasting project. 
            We cover all areas of {name} with our mobile shot blasting service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={{() => setQuotePopupOpen(true)}}
              className="bg-[#7ac5e3] hover:bg-[#5eb5d6] text-[#1e3a5f] font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get a Free Quote
            </button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href="tel:07970566409">
                <Phone className="w-4 h-4 mr-2" />
                07970 566409
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <QuotePopup open={{quotePopupOpen}} onOpenChange={{setQuotePopupOpen}} />
    </div>
  );
}}
'''
    return component

def main():
    pages_dir = "/home/ubuntu/commercial_shot_blasting_site/client/src/pages"
    
    # Generate county page components
    for slug, county_data in counties.items():
        component = generate_county_component(county_data)
        filename = f"{county_data['componentName']}.tsx"
        filepath = os.path.join(pages_dir, filename)
        
        with open(filepath, 'w') as f:
            f.write(component)
        
        print(f"Created: {filename}")
    
    print(f"\nTotal county pages created: {len(counties)}")

if __name__ == "__main__":
    main()
