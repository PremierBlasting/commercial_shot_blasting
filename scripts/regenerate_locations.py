#!/usr/bin/env python3
"""
Regenerate all 71 location pages with correct component props.
"""

import os

# All 71 new locations with their data
new_locations = [
    {"name": "Aylesbury", "slug": "aylesbury", "region": "Buckinghamshire", "lat": "51.8168", "lng": "-0.8084"},
    {"name": "Banbury", "slug": "banbury", "region": "Oxfordshire", "lat": "52.0629", "lng": "-1.3397"},
    {"name": "Barnsley", "slug": "barnsley", "region": "South Yorkshire", "lat": "53.5526", "lng": "-1.4797"},
    {"name": "Bath", "slug": "bath", "region": "Somerset", "lat": "51.3758", "lng": "-2.3599"},
    {"name": "Basildon", "slug": "basildon", "region": "Essex", "lat": "51.5761", "lng": "0.4886"},
    {"name": "Bedford", "slug": "bedford", "region": "Bedfordshire", "lat": "52.1356", "lng": "-0.4673"},
    {"name": "Birkenhead", "slug": "birkenhead", "region": "Merseyside", "lat": "53.3934", "lng": "-3.0147"},
    {"name": "Bolton", "slug": "bolton", "region": "Greater Manchester", "lat": "53.5783", "lng": "-2.4299"},
    {"name": "Bury St Edmunds", "slug": "bury-st-edmunds", "region": "Suffolk", "lat": "52.2474", "lng": "0.7183"},
    {"name": "Burton upon Trent", "slug": "burton-upon-trent", "region": "Staffordshire", "lat": "52.8019", "lng": "-1.6367"},
    {"name": "Cannock", "slug": "cannock", "region": "Staffordshire", "lat": "52.6907", "lng": "-2.0305"},
    {"name": "Cannock Chase", "slug": "cannock-chase", "region": "Staffordshire", "lat": "52.7500", "lng": "-2.0000"},
    {"name": "Chelmsford", "slug": "chelmsford", "region": "Essex", "lat": "51.7356", "lng": "0.4685"},
    {"name": "Cheltenham", "slug": "cheltenham", "region": "Gloucestershire", "lat": "51.8994", "lng": "-2.0783"},
    {"name": "Colchester", "slug": "colchester", "region": "Essex", "lat": "51.8891", "lng": "0.9039"},
    {"name": "Coalville", "slug": "coalville", "region": "Leicestershire", "lat": "52.7247", "lng": "-1.3694"},
    {"name": "Corby", "slug": "corby", "region": "Northamptonshire", "lat": "52.4877", "lng": "-0.6857"},
    {"name": "Crewe", "slug": "crewe", "region": "Cheshire", "lat": "53.0988", "lng": "-2.4405"},
    {"name": "Doncaster", "slug": "doncaster", "region": "South Yorkshire", "lat": "53.5228", "lng": "-1.1288"},
    {"name": "Dronfield", "slug": "dronfield", "region": "Derbyshire", "lat": "53.3017", "lng": "-1.4669"},
    {"name": "Dudley", "slug": "dudley", "region": "West Midlands", "lat": "52.5086", "lng": "-2.0875"},
    {"name": "Grantham", "slug": "grantham", "region": "Lincolnshire", "lat": "52.9118", "lng": "-0.6417"},
    {"name": "Great Yarmouth", "slug": "great-yarmouth", "region": "Norfolk", "lat": "52.6061", "lng": "1.7298"},
    {"name": "Guildford", "slug": "guildford", "region": "Surrey", "lat": "51.2362", "lng": "-0.5704"},
    {"name": "Halifax", "slug": "halifax", "region": "West Yorkshire", "lat": "53.7217", "lng": "-1.8596"},
    {"name": "Hemel Hempstead", "slug": "hemel-hempstead", "region": "Hertfordshire", "lat": "51.7526", "lng": "-0.4692"},
    {"name": "High Wycombe", "slug": "high-wycombe", "region": "Buckinghamshire", "lat": "51.6287", "lng": "-0.7482"},
    {"name": "Huddersfield", "slug": "huddersfield", "region": "West Yorkshire", "lat": "53.6458", "lng": "-1.7850"},
    {"name": "Kidderminster", "slug": "kidderminster", "region": "Worcestershire", "lat": "52.3886", "lng": "-2.2499"},
    {"name": "King's Lynn", "slug": "kings-lynn", "region": "Norfolk", "lat": "52.7519", "lng": "0.3958"},
    {"name": "Kingswood", "slug": "kingswood", "region": "South Gloucestershire", "lat": "51.4570", "lng": "-2.5050"},
    {"name": "Kettering", "slug": "kettering", "region": "Northamptonshire", "lat": "52.3931", "lng": "-0.7229"},
    {"name": "Leamington Spa", "slug": "leamington-spa", "region": "Warwickshire", "lat": "52.2852", "lng": "-1.5201"},
    {"name": "Leighton Buzzard", "slug": "leighton-buzzard", "region": "Bedfordshire", "lat": "51.9165", "lng": "-0.6617"},
    {"name": "Lichfield", "slug": "lichfield", "region": "Staffordshire", "lat": "52.6833", "lng": "-1.8275"},
    {"name": "Lowestoft", "slug": "lowestoft", "region": "Suffolk", "lat": "52.4797", "lng": "1.7500"},
    {"name": "Loughborough", "slug": "loughborough", "region": "Leicestershire", "lat": "52.7721", "lng": "-1.2062"},
    {"name": "Luton", "slug": "luton", "region": "Bedfordshire", "lat": "51.8787", "lng": "-0.4200"},
    {"name": "Macclesfield", "slug": "macclesfield", "region": "Cheshire", "lat": "53.2600", "lng": "-2.1253"},
    {"name": "Mansfield", "slug": "mansfield", "region": "Nottinghamshire", "lat": "53.1472", "lng": "-1.1987"},
    {"name": "Newport", "slug": "newport", "region": "South Wales", "lat": "51.5842", "lng": "-2.9977"},
    {"name": "Newcastle-under-Lyme", "slug": "newcastle-under-lyme", "region": "Staffordshire", "lat": "53.0109", "lng": "-2.2276"},
    {"name": "Nuneaton", "slug": "nuneaton", "region": "Warwickshire", "lat": "52.5228", "lng": "-1.4678"},
    {"name": "Oldham", "slug": "oldham", "region": "Greater Manchester", "lat": "53.5409", "lng": "-2.1114"},
    {"name": "Portsmouth", "slug": "portsmouth", "region": "Hampshire", "lat": "50.8198", "lng": "-1.0880"},
    {"name": "Reading", "slug": "reading", "region": "Berkshire", "lat": "51.4543", "lng": "-0.9781"},
    {"name": "Redditch", "slug": "redditch", "region": "Worcestershire", "lat": "52.3065", "lng": "-1.9455"},
    {"name": "Rochdale", "slug": "rochdale", "region": "Greater Manchester", "lat": "53.6097", "lng": "-2.1561"},
    {"name": "Rotherham", "slug": "rotherham", "region": "South Yorkshire", "lat": "53.4326", "lng": "-1.3635"},
    {"name": "Rugby", "slug": "rugby", "region": "Warwickshire", "lat": "52.3708", "lng": "-1.2616"},
    {"name": "Runcorn", "slug": "runcorn", "region": "Cheshire", "lat": "53.3419", "lng": "-2.7331"},
    {"name": "Salford", "slug": "salford", "region": "Greater Manchester", "lat": "53.4875", "lng": "-2.2901"},
    {"name": "Salisbury", "slug": "salisbury", "region": "Wiltshire", "lat": "51.0688", "lng": "-1.7945"},
    {"name": "Scunthorpe", "slug": "scunthorpe", "region": "Lincolnshire", "lat": "53.5809", "lng": "-0.6502"},
    {"name": "Slough", "slug": "slough", "region": "Berkshire", "lat": "51.5105", "lng": "-0.5950"},
    {"name": "Solihull", "slug": "solihull", "region": "West Midlands", "lat": "52.4119", "lng": "-1.7780"},
    {"name": "Southend-on-Sea", "slug": "southend-on-sea", "region": "Essex", "lat": "51.5459", "lng": "0.7077"},
    {"name": "Stafford", "slug": "stafford", "region": "Staffordshire", "lat": "52.8060", "lng": "-2.1169"},
    {"name": "Stevenage", "slug": "stevenage", "region": "Hertfordshire", "lat": "51.9017", "lng": "-0.2019"},
    {"name": "Stockport", "slug": "stockport", "region": "Greater Manchester", "lat": "53.4083", "lng": "-2.1494"},
    {"name": "Sutton Coldfield", "slug": "sutton-coldfield", "region": "West Midlands", "lat": "52.5633", "lng": "-1.8227"},
    {"name": "Taunton", "slug": "taunton", "region": "Somerset", "lat": "51.0147", "lng": "-3.1029"},
    {"name": "Tamworth", "slug": "tamworth", "region": "Staffordshire", "lat": "52.6341", "lng": "-1.6912"},
    {"name": "Telford", "slug": "telford", "region": "Shropshire", "lat": "52.6778", "lng": "-2.4497"},
    {"name": "Thetford", "slug": "thetford", "region": "Norfolk", "lat": "52.4118", "lng": "0.7440"},
    {"name": "Walsall", "slug": "walsall", "region": "West Midlands", "lat": "52.5859", "lng": "-1.9821"},
    {"name": "Warrington", "slug": "warrington", "region": "Cheshire", "lat": "53.3900", "lng": "-2.5970"},
    {"name": "Watford", "slug": "watford", "region": "Hertfordshire", "lat": "51.6565", "lng": "-0.3903"},
    {"name": "Wellingborough", "slug": "wellingborough", "region": "Northamptonshire", "lat": "52.3026", "lng": "-0.6940"},
    {"name": "Welwyn Garden City", "slug": "welwyn-garden-city", "region": "Hertfordshire", "lat": "51.8010", "lng": "-0.2063"},
    {"name": "Weston-super-Mare", "slug": "weston-super-mare", "region": "Somerset", "lat": "51.3460", "lng": "-2.9770"},
]

def generate_component_name(name):
    """Convert location name to React component name"""
    clean = name.replace("-", " ").replace("'", "").replace("–", " ")
    parts = clean.split()
    return "".join(word.capitalize() for word in parts) + "ServiceArea"

def generate_location_key(name):
    """Generate key for LocationMap component"""
    clean = name.replace("-", "").replace("'", "").replace(" ", "").replace("–", "")
    return clean

def generate_seo_title(name):
    """Generate SEO-optimized title (30-60 chars)"""
    base = f"Shot Blasting {name}"
    if len(base) < 30:
        return f"{base} | Commercial & Industrial"
    elif len(base) <= 45:
        return f"{base} | Industrial Services"
    else:
        return f"{base} | Industrial"
    
def generate_keywords(name, region):
    """Generate 5 focused keywords"""
    return f"shot blasting {name}, rust removal, surface preparation, industrial blasting, {region}"

def escape_for_js(text):
    """Escape text for JavaScript strings"""
    return text.replace("'", "\\'")

def generate_react_component(loc):
    """Generate full React component for location page"""
    name = loc['name']
    slug = loc['slug']
    region = loc['region']
    component_name = generate_component_name(name)
    title = generate_seo_title(name)
    keywords = generate_keywords(name, region)
    location_key = generate_location_key(name)
    
    # Escape for JavaScript
    name_js = escape_for_js(name)
    title_js = escape_for_js(title)
    keywords_js = escape_for_js(keywords)
    
    return f'''import {{ Button }} from "@/components/ui/button";
import {{ Link }} from "wouter";
import {{ Phone, Mail, MapPin, CheckCircle, ArrowRight, Star, Award, Zap }} from "lucide-react";
import {{ useState, useEffect }} from "react";
import {{ QuotePopup }} from "@/components/QuotePopup";
import {{ Header }} from "@/components/Header";
import {{ BeforeAfterSlider }} from "@/components/BeforeAfterSlider";
import {{ TrackedPhoneButton }} from "@/components/TrackedPhoneButton";
import {{ Breadcrumb }} from "@/components/Breadcrumb";
import {{ LocalBusinessSchema }} from "@/components/LocalBusinessSchema";
import {{ HeroCarousel }} from "@/components/HeroCarousel";
import {{ Footer }} from "@/components/Footer";
import {{ locationData }} from "@/data/locationData";

export default function {component_name}() {{
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);

  useEffect(() => {{
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }}, []);

  useEffect(() => {{
    document.title = '{title_js}';
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {{
      metaKeywords.setAttribute('content', '{keywords_js}');
    }} else {{
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = '{keywords_js}';
      document.head.appendChild(meta);
    }}
  }}, []);

  useEffect(() => {{
    const description = locationData["{slug}"]?.description || "Professional shot blasting services in {name_js}. Call 07970 566409";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {{
      metaDescription.setAttribute('content', description);
    }} else {{
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }}

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {{
      ogTitle.setAttribute('content', '{title_js}');
    }} else {{
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.setAttribute('content', '{title_js}');
      document.head.appendChild(meta);
    }}

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {{
      ogDescription.setAttribute('content', description);
    }} else {{
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.setAttribute('content', description);
      document.head.appendChild(meta);
    }}

    // Set Twitter Card meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {{
      twitterTitle.setAttribute('content', '{title_js}');
    }} else {{
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      meta.content = '{title_js}';
      document.head.appendChild(meta);
    }}

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {{
      twitterDescription.setAttribute('content', description);
    }} else {{
      const meta = document.createElement('meta');
      meta.name = 'twitter:description';
      meta.content = description;
      document.head.appendChild(meta);
    }}
  }}, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onOpenQuotePopup={{() => setQuotePopupOpen(true)}} />
      <QuotePopup open={{quotePopupOpen}} onOpenChange={{setQuotePopupOpen}} />
      <LocalBusinessSchema
        name={{locationData["{slug}"]?.name || "{name_js}"}}
        city={{locationData["{slug}"]?.city || "{name_js}"}}
        region={{locationData["{slug}"]?.region || "{region}"}}
        description={{locationData["{slug}"]?.description || "Professional shot blasting services in {name_js}"}}
        url={{locationData["{slug}"]?.url || "https://commercialshotblasting.co.uk/service-areas/{slug}"}}
        latitude={{locationData["{slug}"]?.latitude || "{loc['lat']}"}}
        longitude={{locationData["{slug}"]?.longitude || "{loc['lng']}"}}
      />

      {{/* Breadcrumb Navigation */}}
      <section className="py-4 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <Breadcrumb items={{[
            {{ label: "Home", href: "/" }},
            {{ label: "Service Areas", href: "/service-areas" }},
            {{ label: "{name_js}", href: "/service-areas/{slug}", isCurrentPage: true }}
          ]}} />
        </div>
      </section>

      {{/* Hero Section */}}
      <HeroCarousel className="py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{{{ fontFamily: "'Playfair Display', serif" }}}}>
            Shot Blasting Services in {name_js}
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Commercial Shot Blasting provides professional surface preparation and rust removal services throughout {name_js} and {region}. Serving local manufacturers, industrial facilities, and commercial projects with precision blasting solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={{() => setQuotePopupOpen(true)}}>
              Get a Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now: 07970 566409
              </a>
            </Button>
          </div>
        </div>
      </HeroCarousel>

      {{/* About Section */}}
      <section className="py-16 bg-[#F5F1E8]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6" style={{{{ fontFamily: "'Playfair Display', serif" }}}}>
                Your Local Shot Blasting Experts in {name_js}
              </h2>
              <p className="text-gray-700 mb-4">
                Commercial Shot Blasting has been serving {name_js} businesses, providing professional surface preparation services to the region's leading manufacturers, industrial facilities, and commercial projects.
              </p>
              <p className="text-gray-700 mb-6">
                {name_js}'s diverse industrial sector relies on our expertise for precision surface preparation. Whether you need rust removal, paint stripping, or concrete surface profiling, we have the equipment and experience to deliver exceptional results.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Same-day quotes for {name_js} area projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Flexible scheduling to minimize business disruption</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Professional safety practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2C5F7F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Competitive pricing for {name_js} businesses</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="/images/premier/steel-container-after.jpeg"
                alt="Professional shot blasting results in {name_js}"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute bottom-0 right-0 bg-[#2C5F7F] text-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="font-semibold mb-2">Serving {region}</p>
                <p className="text-3xl font-bold">Since 2015</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {{/* Services Section */}}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{{{ fontFamily: "'Playfair Display', serif" }}}}>
              Services Available in {name_js}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a complete range of shot blasting and surface preparation services tailored to {name_js}'s diverse industries.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {{[
              {{
                title: "Steel Shot Blasting",
                description: "Precision cleaning for steel structures, removing rust, mill scale, and old coatings from industrial equipment and components.",
                icon: Zap
              }},
              {{
                title: "Rust Removal & Prevention",
                description: `Complete rust removal solutions for automotive, manufacturing, and infrastructure projects across {name_js}.`,
                icon: Award
              }},
              {{
                title: "Surface Preparation",
                description: "Professional surface profiling for coating adhesion, ensuring optimal results for painting and protective treatments.",
                icon: Star
              }}
            ].map((service, index) => (
              <div key={{index}} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-[#2C5F7F] mb-4" />
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">{{service.title}}</h3>
                <p className="text-gray-600">{{service.description}}</p>
              </div>
            ))}}
          </div>
        </div>
      </section>

      {{/* Industries Section */}}
      <section className="py-16 bg-[#2C5F7F]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{{{ fontFamily: "'Playfair Display', serif" }}}}>
              Industries We Serve in {name_js}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Our shot blasting services support a wide range of industries throughout {name_js} and {region}.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {{[
              "Manufacturing & Engineering",
              "Automotive & Transport",
              "Construction & Infrastructure",
              "Marine & Offshore",
              "Agriculture & Farming",
              "Heritage & Restoration"
            ].map((industry, index) => (
              <div key={{index}} className="bg-white/10 backdrop-blur p-6 rounded-lg">
                <CheckCircle className="w-8 h-8 text-[#F5F1E8] mb-3" />
                <h3 className="text-lg font-semibold text-white">{{industry}}</h3>
              </div>
            ))}}
          </div>
        </div>
      </section>

      {{/* Before/After Section */}}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4" style={{{{ fontFamily: "'Playfair Display', serif" }}}}>
              See Our Results
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View the dramatic transformation our shot blasting services can achieve for your {name_js} project.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/images/premier/steel-container-before.jpeg"
              afterImage="/images/premier/steel-container-after.jpeg"
              beforeLabel="Before"
              afterLabel="After"
            />
          </div>
        </div>
      </section>

      {{/* CTA Section */}}
      <section className="py-16 bg-[#2C5F7F]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{{{ fontFamily: "'Playfair Display', serif" }}}}>
            Ready to Get Started in {name_js}?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Contact us today for a free quote on your shot blasting project. We serve all of {name_js} and the surrounding {region} area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-[#F5F1E8]" onClick={{() => setQuotePopupOpen(true)}}>
              Get a Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call: 07970 566409
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}}
'''

def main():
    base_path = "/home/ubuntu/commercial_shot_blasting_site"
    pages_path = os.path.join(base_path, "client/src/pages")
    
    print("Regenerating React components with correct props...")
    for loc in new_locations:
        component_name = generate_component_name(loc['name'])
        filename = f"{component_name}.tsx"
        filepath = os.path.join(pages_path, filename)
        
        component_code = generate_react_component(loc)
        with open(filepath, "w") as f:
            f.write(component_code)
        
        print(f"Regenerated: {filename}")
    
    print(f"\n=== Summary ===")
    print(f"Total components regenerated: {len(new_locations)}")

if __name__ == "__main__":
    main()
