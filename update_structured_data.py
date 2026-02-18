#!/usr/bin/env python3
"""
Update all service area pages to use enhanced structured data with location-specific coordinates.
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

def update_page_imports(filepath, location_key):
    """Add locationData import if not present."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if locationData is already imported
    if 'locationData' in content:
        return content, False
    
    # Find the nearbyTownsData import line
    import_pattern = r'(import \{ nearbyTownsData \} from "@/data/nearbyTowns";)'
    
    if re.search(import_pattern, content):
        # Add locationData import after nearbyTownsData
        new_import = r'\1\nimport { locationData } from "@/data/locationData";'
        content = re.sub(import_pattern, new_import, content)
        return content, True
    else:
        # If nearbyTownsData import not found, add both imports after other imports
        # Find last import statement
        last_import_pattern = r'(import .*?;)\n\n'
        matches = list(re.finditer(last_import_pattern, content))
        if matches:
            last_match = matches[-1]
            insert_pos = last_match.end()
            new_imports = 'import { locationData } from "@/data/locationData";\n\n'
            content = content[:insert_pos] + new_imports + content[insert_pos:]
            return content, True
    
    return content, False

def update_schema_component(content, location_key):
    """Update LocalBusinessSchema component to use locationData."""
    
    # Pattern to match existing LocalBusinessSchema usage
    # Matches both single-line and multi-line formats
    pattern = r'<LocalBusinessSchema\s+name="([^"]+)"\s+city="([^"]+)"\s+region="([^"]+)"\s+description="([^"]+)"\s+url="([^"]+)"\s*/>'
    
    def replacement(match):
        name = match.group(1)
        # Use locationData for the props
        return f'''<LocalBusinessSchema
        name={{locationData["{location_key}"].name}}
        city={{locationData["{location_key}"].city}}
        region={{locationData["{location_key}"].region}}
        description={{locationData["{location_key}"].description}}
        url={{locationData["{location_key}"].url}}
        latitude={{locationData["{location_key}"].latitude}}
        longitude={{locationData["{location_key}"].longitude}}
      />'''
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # If pattern didn't match, try multi-line pattern
    if new_content == content:
        multiline_pattern = r'<LocalBusinessSchema\s+name="([^"]+)"\s+city="([^"]+)"\s+region="([^"]+)"\s+description="[^"]*"\s+url="[^"]*"\s*/>'
        new_content = re.sub(multiline_pattern, replacement, content, flags=re.DOTALL)
    
    return new_content, new_content != content

def main():
    pages_dir = Path("client/src/pages")
    updated_count = 0
    skipped_count = 0
    
    print("Updating service area pages with enhanced structured data...\n")
    
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
            
            # Update imports
            content, imports_updated = update_page_imports(filepath, location_key)
            
            # Update schema component
            content, schema_updated = update_schema_component(content, location_key)
            
            if imports_updated or schema_updated:
                # Write back
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                status = []
                if imports_updated:
                    status.append("imports")
                if schema_updated:
                    status.append("schema")
                
                print(f"✓  {filename}: Updated ({', '.join(status)})")
                updated_count += 1
            else:
                print(f"○  {filename}: No changes needed")
                skipped_count += 1
                
        except Exception as e:
            print(f"✗  {filename}: Error - {e}")
            skipped_count += 1
    
    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Updated: {updated_count} files")
    print(f"  Skipped: {skipped_count} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
