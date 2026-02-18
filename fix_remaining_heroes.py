#!/usr/bin/env python3
"""
Fix the remaining 2 pages (Cambridge and Hereford) that have custom HeroSection components.
"""

import re
from pathlib import Path

def fix_cambridge():
    """Fix Cambridge page."""
    filepath = Path("client/src/pages/CambridgeServiceArea.tsx")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add Phone import if not present
    if 'import { Phone }' not in content:
        content = re.sub(
            r'(import \{ HeroCarousel \} from "@/components/HeroCarousel";)',
            r'\1\nimport { Phone } from "lucide-react";',
            content
        )
    
    # Replace HeroSection component definition
    old_hero_def = r'const HeroSection = \(\) => \(\s*<section className="relative bg-gradient-to-br[^>]*>.*?</section>\s*\);'
    
    new_hero_def = '''const HeroSection = () => (
  <HeroCarousel className="py-20 lg:py-32">
    <div className="max-w-4xl">
      <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        Specialist Shot Blasting Services in Cambridge
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
        Serving the Cambridge Science and Technology Cluster and all of Cambridgeshire with precision surface preparation for advanced manufacturing, heritage restoration, and industrial flooring.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={() => setQuotePopupOpen(true)}>
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
  </HeroCarousel>
);'''
    
    content = re.sub(old_hero_def, new_hero_def, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ Cambridge page fixed")

def fix_hereford():
    """Fix Hereford page."""
    filepath = Path("client/src/pages/HerefordServiceArea.tsx")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add Phone import if not present
    if 'import { Phone }' not in content:
        content = re.sub(
            r'(import \{ HeroCarousel \} from "@/components/HeroCarousel";)',
            r'\1\nimport { Phone } from "lucide-react";',
            content
        )
    
    # Replace HeroSection component definition
    old_hero_def = r'const HeroSection = \(\) => \(\s*<section className="relative bg-gradient-to-br[^>]*>.*?</section>\s*\);'
    
    new_hero_def = '''const HeroSection = () => (
  <HeroCarousel className="py-20 lg:py-32">
    <div className="max-w-4xl">
      <p className="text-[#F5F1E8] font-medium mb-2">Professional Shot Blasting Services</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        Expert Shot Blasting Services in Hereford
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
        Professional surface preparation and rust removal services throughout Hereford and the surrounding areas. Serving local manufacturers, agricultural facilities, and industrial operations with precision blasting solutions.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button size="lg" className="bg-white text-[#2C5F7F] hover:bg-white/90" onClick={() => setQuotePopupOpen(true)}>
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
  </HeroCarousel>
);'''
    
    content = re.sub(old_hero_def, new_hero_def, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ Hereford page fixed")

def main():
    print("Fixing remaining hero sections...\n")
    
    try:
        fix_cambridge()
        fix_hereford()
        print("\n✓ All pages now use HeroCarousel component!")
    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
