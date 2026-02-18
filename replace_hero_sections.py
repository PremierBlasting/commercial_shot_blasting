#!/usr/bin/env python3
"""
Replace hero sections on all service area pages with the HeroCarousel component.
"""

import re
from pathlib import Path

# All service area page files
SERVICE_AREA_PAGES = [
    "BirminghamServiceArea.tsx",
    "WolverhamtonServiceArea.tsx",
    "CoventryServiceArea.tsx",
    "LeicesterServiceArea.tsx",
    "DerbyServiceArea.tsx",
    "NottinghamServiceArea.tsx",
    "SheffieldServiceArea.tsx",
    "LeedsServiceArea.tsx",
    "ManchesterServiceArea.tsx",
    "LiverpoolServiceArea.tsx",
    "StokeServiceArea.tsx",
    "WorcesterServiceArea.tsx",
    "GloucesterServiceArea.tsx",
    "BristolServiceArea.tsx",
    "CardiffServiceArea.tsx",
    "HerefordServiceArea.tsx",
    "ShrewsburyServiceArea.tsx",
    "ChesterServiceArea.tsx",
    "StAlbansServiceArea.tsx",
    "MiltonKeynesServiceArea.tsx",
    "NorthamptonServiceArea.tsx",
    "PeterboroughServiceArea.tsx",
    "CambridgeServiceArea.tsx",
    "OxfordServiceArea.tsx",
    "ChesterfieldServiceArea.tsx",
    "IpswichServiceArea.tsx",
    "LincolnServiceArea.tsx",
    "NorwichServiceArea.tsx",
    "StratfordUponAvonServiceArea.tsx",
    "SwindonServiceArea.tsx",
    "WrexhamServiceArea.tsx",
]

def add_hero_carousel_import(content):
    """Add HeroCarousel import if not present."""
    if 'HeroCarousel' in content:
        return content, False
    
    # Find LocalBusinessSchema import (should be near the top)
    pattern = r'(import \{ LocalBusinessSchema \} from "@/components/LocalBusinessSchema";)'
    
    if re.search(pattern, content):
        # Add import after LocalBusinessSchema
        new_import = r'\1\nimport { HeroCarousel } from "@/components/HeroCarousel";'
        content = re.sub(pattern, new_import, content)
        return content, True
    
    # If LocalBusinessSchema not found, try after other component imports
    pattern = r'(import \{[^}]+\} from "@/components/[^"]+";)\n'
    matches = list(re.finditer(pattern, content))
    if matches:
        last_match = matches[-1]
        insert_pos = last_match.end()
        content = content[:insert_pos] + 'import { HeroCarousel } from "@/components/HeroCarousel";\n' + content[insert_pos:]
        return content, True
    
    return content, False

def replace_hero_section(content, location_name):
    """Replace existing hero section with HeroCarousel component."""
    
    # Pattern to match the hero section
    # Looks for: {/* Hero Section */} ... </section>
    # The hero section is typically between breadcrumb and before/after slider
    
    hero_pattern = r'\{/\* Hero Section \*/\}\s*<section className="relative py-16[^>]*>.*?</section>'
    
    matches = list(re.finditer(hero_pattern, content, re.DOTALL))
    
    if not matches:
        print(f"    Warning: Could not find hero section pattern")
        return content, False
    
    # Get the first match (should be the hero section)
    match = matches[0]
    old_hero = match.group(0)
    
    # Extract the h1 text and description from the old hero
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', old_hero, re.DOTALL)
    desc_match = re.search(r'<p className="text-lg[^>]*>(.*?)</p>', old_hero, re.DOTALL)
    
    h1_text = h1_match.group(1).strip() if h1_match else f"Shot Blasting Services in {location_name}"
    desc_text = desc_match.group(1).strip() if desc_match else f"Professional shot blasting services in {location_name}"
    
    # Create new hero section using HeroCarousel
    new_hero = f'''{{/* Hero Section */}}
      <HeroCarousel className="py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{{{ fontFamily: "'Playfair Display', serif" }}}}>
            {h1_text}
          </h1>
          <p className="text-lg text-white/90 mb-8">
            {desc_text}
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
      </HeroCarousel>'''
    
    # Replace the old hero with the new one
    content = content[:match.start()] + new_hero + content[match.end():]
    
    return content, True

def get_location_name(filename):
    """Extract location name from filename."""
    # Remove ServiceArea.tsx and convert to readable name
    name = filename.replace("ServiceArea.tsx", "")
    
    # Handle special cases
    special_cases = {
        "StAlbans": "St Albans",
        "MiltonKeynes": "Milton Keynes",
        "StratfordUponAvon": "Stratford-upon-Avon",
    }
    
    if name in special_cases:
        return special_cases[name]
    
    # Add spaces before capital letters
    name = re.sub(r'([A-Z])', r' \1', name).strip()
    
    return name

def main():
    pages_dir = Path("client/src/pages")
    updated_count = 0
    skipped_count = 0
    
    print("Replacing hero sections with HeroCarousel component...\n")
    
    for filename in SERVICE_AREA_PAGES:
        filepath = pages_dir / filename
        
        if not filepath.exists():
            print(f"⚠️  {filename}: File not found")
            skipped_count += 1
            continue
        
        location_name = get_location_name(filename)
        
        try:
            # Read file
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Add import
            content, import_added = add_hero_carousel_import(content)
            
            # Replace hero section
            content, hero_replaced = replace_hero_section(content, location_name)
            
            if import_added or hero_replaced:
                # Write back
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                status = []
                if import_added:
                    status.append("import")
                if hero_replaced:
                    status.append("hero")
                
                print(f"✓  {filename}: Updated ({', '.join(status)})")
                updated_count += 1
            else:
                print(f"○  {filename}: No changes needed")
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
