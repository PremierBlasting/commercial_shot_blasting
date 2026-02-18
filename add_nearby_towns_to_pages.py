#!/usr/bin/env python3
"""
Add nearby towns section to all service area pages.
"""

import re
import os

# Mapping of file names to data keys in nearbyTownsData
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
    "NewcastleServiceArea.tsx": "newcastle",  # File might be named differently
    "StokeServiceArea.tsx": "stoke-on-trent",
    "TelfordServiceArea.tsx": "telford",  # Need to check actual filename
    "WorcesterServiceArea.tsx": "worcester",
    "GloucesterServiceArea.tsx": "gloucester",
    "BristolServiceArea.tsx": "bristol",
    "CardiffServiceArea.tsx": "cardiff",
    "SwanseaServiceArea.tsx": "swansea",  # Need to check actual filename
    "NewportServiceArea.tsx": "newport",  # Need to check actual filename
    "HerefordServiceArea.tsx": "hereford",
    "ShrewsburyServiceArea.tsx": "shrewsbury",
    "ChesterServiceArea.tsx": "chester",
    "WarringtonServiceArea.tsx": "warrington",
    "StAlbansServiceArea.tsx": "st-albans",
    "LutonServiceArea.tsx": "luton",  # Need to check actual filename
    "MiltonKeynesServiceArea.tsx": "milton-keynes",
    "NorthamptonServiceArea.tsx": "northampton",
    "PeterboroughServiceArea.tsx": "peterborough",
    "CambridgeServiceArea.tsx": "cambridge",
    "OxfordServiceArea.tsx": "oxford",
    "ReadingServiceArea.tsx": "reading",  # Need to check actual filename
}

PAGES_DIR = "client/src/pages"

def add_nearby_towns_to_file(filepath, data_key):
    """Add nearby towns section to a service area page file."""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has NearbyTowns import
    if 'NearbyTowns' in content:
        print(f"  ✓ Already has NearbyTowns component, skipping")
        return False
    
    # Add imports after Footer import
    import_pattern = r'(import { Footer } from "@/components/Footer";)'
    import_replacement = r'\1\nimport { NearbyTowns } from "@/components/NearbyTowns";\nimport { nearbyTownsData } from "@/data/nearbyTowns";'
    
    content = re.sub(import_pattern, import_replacement, content)
    
    # Find the CTA section and add NearbyTowns before it
    # Look for the CTA section pattern
    cta_pattern = r'(\s+{/\* CTA Section \*/}\s+<section className="py-16 bg-gradient-to-r from-\[#2C5F7F\] to-\[#1a3d52\] text-white">)'
    
    nearby_towns_section = f'''
      {{/* Nearby Towns Section */}}
      <NearbyTowns 
        locationName={{nearbyTownsData["{data_key}"].location}}
        towns={{nearbyTownsData["{data_key}"].towns}}
      />

'''
    
    replacement = nearby_towns_section + r'\1'
    content = re.sub(cta_pattern, replacement, content)
    
    # Write back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    print("Adding nearby towns sections to all service area pages...\n")
    
    # Get all service area files
    service_area_files = [f for f in os.listdir(PAGES_DIR) if f.endswith('ServiceArea.tsx')]
    
    print(f"Found {len(service_area_files)} service area page files\n")
    
    updated_count = 0
    skipped_count = 0
    error_count = 0
    
    for filename in sorted(service_area_files):
        filepath = os.path.join(PAGES_DIR, filename)
        
        # Try to find the data key for this file
        data_key = None
        
        # Direct match
        if filename in FILE_TO_KEY_MAP:
            data_key = FILE_TO_KEY_MAP[filename]
        else:
            # Try to derive from filename
            # Remove "ServiceArea.tsx" and convert to lowercase with hyphens
            base_name = filename.replace("ServiceArea.tsx", "")
            # Convert CamelCase to kebab-case
            data_key = re.sub(r'(?<!^)(?=[A-Z])', '-', base_name).lower()
        
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
    print(f"  Total: {len(service_area_files)}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
