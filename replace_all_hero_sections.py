#!/usr/bin/env python3
"""
Replace ALL hero section variations on service area pages with HeroCarousel component.
"""

import re
from pathlib import Path

SERVICE_AREA_PAGES = [
    "BirminghamServiceArea.tsx", "WolverhamtonServiceArea.tsx", "CoventryServiceArea.tsx",
    "LeicesterServiceArea.tsx", "DerbyServiceArea.tsx", "NottinghamServiceArea.tsx",
    "SheffieldServiceArea.tsx", "LeedsServiceArea.tsx", "ManchesterServiceArea.tsx",
    "LiverpoolServiceArea.tsx", "StokeServiceArea.tsx", "WorcesterServiceArea.tsx",
    "GloucesterServiceArea.tsx", "BristolServiceArea.tsx", "CardiffServiceArea.tsx",
    "HerefordServiceArea.tsx", "ShrewsburyServiceArea.tsx", "ChesterServiceArea.tsx",
    "StAlbansServiceArea.tsx", "MiltonKeynesServiceArea.tsx", "NorthamptonServiceArea.tsx",
    "PeterboroughServiceArea.tsx", "CambridgeServiceArea.tsx", "OxfordServiceArea.tsx",
    "ChesterfieldServiceArea.tsx", "IpswichServiceArea.tsx", "LincolnServiceArea.tsx",
    "NorwichServiceArea.tsx", "StratfordUponAvonServiceArea.tsx", "SwindonServiceArea.tsx",
    "WrexhamServiceArea.tsx",
]

def replace_hero_section_comprehensive(content, location_name):
    """Replace hero section using multiple patterns to catch all variations."""
    
    # Pattern 1: {/* Hero Section */} or {/* Hero Section - Location Specific */}
    # Followed by <section...> ... </section>
    pattern1 = r'\{/\*\s*Hero Section[^}]*\*/\}\s*<section[^>]*>.*?</section>'
    
    matches = list(re.finditer(pattern1, content, re.DOTALL))
    
    if not matches:
        return content, False
    
    # Get the first match
    match = matches[0]
    old_hero = match.group(0)
    
    # Extract h1 and description
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', old_hero, re.DOTALL)
    desc_match = re.search(r'<p[^>]*text-lg[^>]*>(.*?)</p>', old_hero, re.DOTALL)
    
    h1_text = h1_match.group(1).strip() if h1_match else f"Shot Blasting Services in {location_name}"
    desc_text = desc_match.group(1).strip() if desc_match else f"Professional shot blasting services in {location_name}"
    
    # Clean up any HTML entities or extra whitespace
    h1_text = re.sub(r'\s+', ' ', h1_text).strip()
    desc_text = re.sub(r'\s+', ' ', desc_text).strip()
    
    # Create new hero section
    new_hero = f'''{{/* Hero Section */}}
      <HeroCarousel className="py-20 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{{{ fontFamily: "'Playfair Display', serif" }}}}>
            {h1_text}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            {desc_text}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={{() => setQuotePopupOpen(true)}}>
              Get a Free Quote Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="tel:07970566409" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </HeroCarousel>'''
    
    # Replace
    content = content[:match.start()] + new_hero + content[match.end():]
    
    return content, True

def get_location_name(filename):
    """Extract location name from filename."""
    name = filename.replace("ServiceArea.tsx", "")
    
    special_cases = {
        "StAlbans": "St Albans",
        "MiltonKeynes": "Milton Keynes",
        "StratfordUponAvon": "Stratford-upon-Avon",
    }
    
    if name in special_cases:
        return special_cases[name]
    
    name = re.sub(r'([A-Z])', r' \1', name).strip()
    return name

def main():
    pages_dir = Path("client/src/pages")
    updated_count = 0
    skipped_count = 0
    
    print("Replacing ALL hero sections with HeroCarousel component...\n")
    
    for filename in SERVICE_AREA_PAGES:
        filepath = pages_dir / filename
        
        if not filepath.exists():
            print(f"⚠️  {filename}: File not found")
            skipped_count += 1
            continue
        
        location_name = get_location_name(filename)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace hero section
            content, hero_replaced = replace_hero_section_comprehensive(content, location_name)
            
            if hero_replaced:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"✓  {filename}: Hero section replaced")
                updated_count += 1
            else:
                print(f"○  {filename}: No hero section found")
                skipped_count += 1
                
        except Exception as e:
            print(f"✗  {filename}: Error - {e}")
            import traceback
            traceback.print_exc()
            skipped_count += 1
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Updated: {updated_count} files")
    print(f"  Skipped: {skipped_count} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
