#!/usr/bin/env python3
"""
Fix nearby towns section addition to all service area pages.
"""

import re
import os

PAGES_DIR = "client/src/pages"

# Mapping of file names to data keys
FILE_TO_KEY_MAP = {
    "BirminghamServiceArea.tsx": "birmingham",
    "WolverhamtonServiceArea.tsx": "wolverhampton",
    "CoventryServiceArea.tsx": "coventry",
    "LeicesterServiceArea.tsx": "leicester",
    "DerbyServiceArea.tsx": "derby",
    "NottinghamServiceArea.tsx": "nottingham",
    "SheffieldServiceArea.tsx": "sheffield",
    "LeedsServiceArea.tsx": "leeds",
    "ManchesterServiceArea.tsx": "manchester",
    "LiverpoolServiceArea.tsx": "liverpool",
    "StokeServiceArea.tsx": "stoke-on-trent",
    "WorcesterServiceArea.tsx": "worcester",
    "GloucesterServiceArea.tsx": "gloucester",
    "BristolServiceArea.tsx": "bristol",
    "CardiffServiceArea.tsx": "cardiff",
    "HerefordServiceArea.tsx": "hereford",
    "ShrewsburyServiceArea.tsx": "shrewsbury",
    "ChesterServiceArea.tsx": "chester",
    "StAlbansServiceArea.tsx": "st-albans",
    "MiltonKeynesServiceArea.tsx": "milton-keynes",
    "CambridgeServiceArea.tsx": "cambridge",
    "ChesterfieldServiceArea.tsx": "chesterfield",
    "IpswichServiceArea.tsx": "ipswich",
    "LincolnServiceArea.tsx": "lincoln",
    "NorwichServiceArea.tsx": "norwich",
    "NorthamptonServiceArea.tsx": "northampton",
    "OxfordServiceArea.tsx": "oxford",
    "PeterboroughServiceArea.tsx": "peterborough",
    "StratfordUponAvonServiceArea.tsx": "stratford-upon-avon",
    "SwindonServiceArea.tsx": "swindon",
    "WrexhamServiceArea.tsx": "wrexham",
}

def add_nearby_towns_to_file(filepath, data_key):
    """Add nearby towns section to a service area page file."""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has NearbyTowns
    if '<NearbyTowns' in content:
        print(f"  ✓ Already has NearbyTowns component, skipping")
        return False
    
    # Add imports after the last import statement
    # Find the last import line
    import_lines = [i for i, line in enumerate(content.split('\n')) if line.strip().startswith('import ')]
    if not import_lines:
        print(f"  ✗ No import statements found")
        return False
    
    lines = content.split('\n')
    last_import_idx = import_lines[-1]
    
    # Insert new imports after last import
    lines.insert(last_import_idx + 1, 'import { NearbyTowns } from "@/components/NearbyTowns";')
    lines.insert(last_import_idx + 2, 'import { nearbyTownsData } from "@/data/nearbyTowns";')
    
    content = '\n'.join(lines)
    
    # Find the closing div before the last </div> (which is typically the page wrapper close)
    # Look for the pattern that appears before the final closing tag
    # Most pages end with:
    #   </footer>
    #     </div>
    #   );
    # }
    
    # Find the last </div> before the closing function brace
    closing_pattern = r'(    </div>\s*\);\s*})'
    
    nearby_towns_section = f'''
      {{/* Nearby Towns Section */}}
      <NearbyTowns 
        locationName={{nearbyTownsData["{data_key}"].location}}
        towns={{nearbyTownsData["{data_key}"].towns}}
      />

'''
    
    # Insert before the closing div
    replacement = nearby_towns_section + r'\1'
    new_content = re.sub(closing_pattern, replacement, content)
    
    if new_content == content:
        print(f"  ✗ Could not find insertion point (closing pattern not matched)")
        return False
    
    # Write back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    print("Fixing nearby towns sections on all service area pages...\n")
    
    updated_count = 0
    skipped_count = 0
    error_count = 0
    
    for filename, data_key in sorted(FILE_TO_KEY_MAP.items()):
        filepath = os.path.join(PAGES_DIR, filename)
        
        if not os.path.exists(filepath):
            print(f"Skipping {filename} - file not found")
            continue
        
        print(f"Processing {filename}...")
        print(f"  Data key: {data_key}")
        
        try:
            updated = add_nearby_towns_to_file(filepath, data_key)
            if updated:
                print(f"  ✓ Added NearbyTowns section")
                updated_count += 1
            else:
                skipped_count += 1
        except Exception as e:
            print(f"  ✗ Error: {e}")
            error_count += 1
        
        print()
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Updated: {updated_count}")
    print(f"  Skipped: {skipped_count}")
    print(f"  Errors: {error_count}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
