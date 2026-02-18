// Server-side meta tag injection for SEO
// This ensures OG tags are in the initial HTML for crawlers

interface LocationMeta {
  title: string;
  description: string;
  url: string;
}

// Location data for meta tags (must match client/src/data/locationData.ts)
const locationMeta: Record<string, LocationMeta> = {
  "birmingham": {
    title: "Shot Blasting Birmingham | Commercial & Industrial",
    description: "Shot Blasting Birmingham - Professional rust removal & surface preparation. Fast turnaround for commercial & industrial projects. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/birmingham"
  },
  "wolverhampton": {
    title: "Shot Blasting Wolverhampton",
    description: "Shot Blasting Wolverhampton - Expert metal cleaning for manufacturing & automotive sectors. Competitive pricing. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/wolverhampton"
  },
  "coventry": {
    title: "Shot Blasting Coventry",
    description: "Shot Blasting Coventry - Specialist surface preparation serving the automotive industry. Quality guaranteed. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/coventry"
  },
  "leicester": {
    title: "Shot Blasting Leicester",
    description: "Shot Blasting Leicester - Precision blasting for industrial facilities across the East Midlands. Free quotes. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/leicester"
  },
  "derby": {
    title: "Shot Blasting Derby",
    description: "Shot Blasting Derby - Professional metal surface preparation for commercial projects. Experienced team. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/derby"
  },
  "nottingham": {
    title: "Shot Blasting Nottingham",
    description: "Shot Blasting Nottingham - Local experts in rust removal & industrial cleaning. Same-day response available. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/nottingham"
  },
  "sheffield": {
    title: "Shot Blasting Sheffield",
    description: "Shot Blasting Sheffield - Specialist steel cleaning for manufacturing & engineering sectors. Fast service. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/sheffield"
  },
  "leeds": {
    title: "Shot Blasting Leeds",
    description: "Shot Blasting Leeds - Expert rust removal & coating preparation for Yorkshire industries. Reliable service. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/leeds"
  },
  "manchester": {
    title: "Shot Blasting Manchester",
    description: "Shot Blasting Manchester - Industrial cleaning & surface profiling for Greater Manchester businesses. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/manchester"
  },
  "liverpool": {
    title: "Shot Blasting Liverpool",
    description: "Shot Blasting Liverpool - Marine & industrial blasting specialists serving Merseyside. Competitive rates. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/liverpool"
  },
  "chester": {
    title: "Shot Blasting Chester",
    description: "Shot Blasting Chester - Heritage & modern surface preparation across Cheshire. Expert team. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/chester"
  },
  "stoke": {
    title: "Shot Blasting Stoke-on-Trent",
    description: "Shot Blasting Stoke - Industrial cleaning for Staffordshire manufacturers. Fast turnaround times. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stoke"
  },
  "shrewsbury": {
    title: "Shot Blasting Shrewsbury",
    description: "Shot Blasting Shrewsbury - Professional blasting services for Shropshire businesses. Quality results. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/shrewsbury"
  },
  "worcester": {
    title: "Shot Blasting Worcester",
    description: "Shot Blasting Worcester - Specialist surface preparation across Worcestershire. Reliable & efficient. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/worcester"
  },
  "hereford": {
    title: "Shot Blasting Hereford",
    description: "Shot Blasting Hereford - Agricultural & industrial blasting for Herefordshire. Competitive pricing. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/hereford"
  },
  "gloucester": {
    title: "Shot Blasting Gloucester",
    description: "Shot Blasting Gloucester - Professional metal cleaning across Gloucestershire. Free quotes available. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/gloucester"
  },
  "bristol": {
    title: "Shot Blasting Bristol",
    description: "Shot Blasting Bristol - Marine, automotive & industrial blasting in the South West. Expert service. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/bristol"
  },
  "cardiff": {
    title: "Shot Blasting Cardiff",
    description: "Shot Blasting Cardiff - Professional surface preparation serving South Wales businesses. Quality assured. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/cardiff"
  },
  "wrexham": {
    title: "Shot Blasting Wrexham",
    description: "Shot Blasting Wrexham - Industrial & commercial blasting across North Wales. Experienced team. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/wrexham"
  },
  "oxford": {
    title: "Shot Blasting Oxford",
    description: "Shot Blasting Oxford - Heritage-sensitive & modern surface preparation in Oxfordshire. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/oxford"
  },
  "swindon": {
    title: "Shot Blasting Swindon",
    description: "Shot Blasting Swindon - Automotive & manufacturing blasting specialists in Wiltshire. Fast service. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/swindon"
  },
  "milton-keynes": {
    title: "Shot Blasting Milton Keynes",
    description: "Shot Blasting Milton Keynes - Commercial surface preparation across Buckinghamshire. Professional results. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/milton-keynes"
  },
  "northampton": {
    title: "Shot Blasting Northampton",
    description: "Shot Blasting Northampton - Quality metal surface preparation for local industries. Competitive pricing. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/northampton"
  },
  "peterborough": {
    title: "Shot Blasting Peterborough",
    description: "Shot Blasting Peterborough - Industrial cleaning & rust removal across Cambridgeshire. Reliable service. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/peterborough"
  },
  "cambridge": {
    title: "Shot Blasting Cambridge",
    description: "Shot Blasting Cambridge - Precision surface preparation for high-tech & traditional industries. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/cambridge"
  },
  "norwich": {
    title: "Shot Blasting Norwich",
    description: "Shot Blasting Norwich - Professional blasting services across Norfolk. Agricultural & industrial specialists. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/norwich"
  },
  "ipswich": {
    title: "Shot Blasting Ipswich",
    description: "Shot Blasting Ipswich - Marine & industrial surface preparation in Suffolk. Competitive rates. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/ipswich"
  },
  "st-albans": {
    title: "Shot Blasting St Albans",
    description: "Shot Blasting St Albans - Professional metal cleaning across Hertfordshire. Quality guaranteed. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/st-albans"
  },
  "lincoln": {
    title: "Shot Blasting Lincoln",
    description: "Shot Blasting Lincoln - Agricultural & industrial blasting specialists in Lincolnshire. Fast turnaround. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/lincoln"
  },
  "chesterfield": {
    title: "Shot Blasting Chesterfield",
    description: "Shot Blasting Chesterfield - Expert surface preparation for Derbyshire manufacturers. Competitive pricing. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/chesterfield"
  },
  "stratford-upon-avon": {
    title: "Shot Blasting Stratford-upon-Avon",
    description: "Shot Blasting Stratford - Heritage & modern blasting in Warwickshire. Sensitive restoration work. Call 07970 566409",
    url: "https://commercialshotblasting.co.uk/service-areas/stratford-upon-avon"
  }
};

/**
 * Inject meta tags into HTML template based on route
 * @param html - The HTML template string
 * @param url - The request URL
 * @returns Modified HTML with injected meta tags
 */
export function injectMetaTags(html: string, url: string): string {
  // Check if this is a service area page
  const serviceAreaMatch = url.match(/\/service-areas\/([a-z-]+)/);
  
  if (!serviceAreaMatch) {
    // Not a service area page, return original HTML
    return html;
  }
  
  const locationKey = serviceAreaMatch[1];
  const meta = locationMeta[locationKey];
  
  if (!meta) {
    // Location not found, return original HTML
    return html;
  }
  
  // Remove all existing OG and Twitter meta tags (placeholders from index.html)
  let modifiedHtml = html
    .replace(/<meta name="description"[^>]*>/g, '')
    .replace(/<meta property="og:[^"]*"[^>]*>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*>/g, '');
  
  // Build meta tags
  const metaTags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
  `;
  
  // Replace the title tag with all meta tags
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/,
    metaTags
  );
  
  return modifiedHtml;
}
