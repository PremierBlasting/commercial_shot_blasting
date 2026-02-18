#!/usr/bin/env python3
"""
Add LocalBusinessSchema component to all service area pages that don't have it.
"""

import re
from pathlib import Path

# Mapping of page filenames to location data keys
PAGE_TO_LOCATION = {
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
    "NorthamptonServiceArea.tsx": "northampton",
    "PeterboroughServiceArea.tsx": "peterborough",
    "CambridgeServiceArea.tsx": "cambridge",
    "OxfordServiceArea.tsx": "oxford",
    "ChesterfieldServiceArea.tsx": "chesterfield",
    "IpswichServiceArea.tsx": "ipswich",
    "LincolnServiceArea.tsx": "lincoln",
    "NorwichServiceArea.tsx": "norwich",
    "StratfordUponAvonServiceArea.tsx": "stratford-upon-avon",
    "SwindonServiceArea.tsx": "swindon",
    "WrexhamServiceArea.tsx": "wrexham",
}

def add_schema_import(content):
    """Add LocalBusinessSchema import if not present."""
    if 'LocalBusinessSchema' in content:
        return content, False
    
    # Find locationData import line
    pattern = r'(import \{ locationData \} from "@/data/locationData";)'
    
    if re.search(pattern, content):
        # Add import after locationData
        new_import = r'\1\nimport { LocalBusinessSchema } from "@/components/LocalBusinessSchema";'
        content = re.sub(pattern, new_import, content)
        return content, True
    
    return content, False

def add_schema_component(content, location_key):
    """Add LocalBusinessSchema component after QuotePopup if not present."""
    if '<LocalBusinessSchema' in content:
        return content, False
    
    # Find QuotePopup component
    pattern = r'(<QuotePopup open=\{quotePopupOpen\} onOpenChange=\{setQuotePopupOpen\} />)'
    
    if re.search(pattern, content):
        schema_component = f'''\\1
      <LocalBusinessSchema
        name={{locationData["{location_key}"].name}}
        city={{locationData["{location_key}"].city}}
        region={{locationData["{location_key}"].region}}
        description={{locationData["{location_key}"].description}}
        url={{locationData["{location_key}"].url}}
        latitude={{locationData["{location_key}"].latitude}}
        longitude={{locationData["{location_key}"].longitude}}
      />'''
        content = re.sub(pattern, schema_component, content)
        return content, True
    
    return content, False

def main():
    pages_dir = Path("client/src/pages")
    added_count = 0
    skipped_count = 0
    
    print("Adding LocalBusinessSchema to service area pages...\n")
    
    for filename, location_key in PAGE_TO_LOCATION.items():
        filepath = pages_dir / filename
        
        if not filepath.exists():
            print(f"⚠️  {filename}: File not found")
            skipped_count += 1
            continue
        
        try:
            # Read file
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Add import
            content, import_added = add_schema_import(content)
            
            # Add component
            content, component_added = add_schema_component(content, location_key)
            
            if import_added or component_added:
                # Write back
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                status = []
                if import_added:
                    status.append("import")
                if component_added:
                    status.append("component")
                
                print(f"✓  {filename}: Added ({', '.join(status)})")
                added_count += 1
            else:
                print(f"○  {filename}: Already has schema")
                skipped_count += 1
                
        except Exception as e:
            print(f"✗  {filename}: Error - {e}")
            skipped_count += 1
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Added: {added_count} files")
    print(f"  Skipped: {skipped_count} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
