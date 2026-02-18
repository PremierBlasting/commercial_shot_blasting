#!/usr/bin/env python3
"""Generate complete allLocations array and locationSlugMap for ServiceAreas.tsx"""

import os
import re

# Get all location page files
pages_dir = "/home/ubuntu/commercial_shot_blasting_site/client/src/pages"
location_files = [f for f in os.listdir(pages_dir) if f.endswith("ServiceArea.tsx")]

# Extract location names and generate slugs
locations = []
for f in location_files:
    # Remove "ServiceArea.tsx" suffix
    name = f.replace("ServiceArea.tsx", "")
    
    # Convert CamelCase to display name
    # Insert space before capital letters
    display_name = re.sub(r'([a-z])([A-Z])', r'\1 \2', name)
    
    # Handle special cases
    special_cases = {
        "Stoke": "Stoke-on-Trent",
        "Newcastle Under Lyme": "Newcastle-under-Lyme",
        "Southend On Sea": "Southend-on-Sea",
        "Weston Super Mare": "Weston-super-Mare",
        "Burton Upon Trent": "Burton upon Trent",
        "Bury St Edmunds": "Bury St Edmunds",
        "St Albans": "St Albans",
        "Kings Lynn": "King's Lynn",
        "Stratford Upon Avon": "Stratford Upon Avon",
        "Sutton Coldfield": "Sutton Coldfield",
        "Leamington Spa": "Leamington Spa",
        "Cannock Chase": "Cannock Chase",
        "Milton Keynes": "Milton Keynes",
        "Great Yarmouth": "Great Yarmouth",
        "Hemel Hempstead": "Hemel Hempstead",
        "Welwyn Garden City": "Welwyn Garden City",
        "Leighton Buzzard": "Leighton Buzzard",
        "High Wycombe": "High Wycombe",
    }
    
    if display_name in special_cases:
        display_name = special_cases[display_name]
    
    # Generate slug
    slug = name.lower()
    # Convert CamelCase to kebab-case
    slug = re.sub(r'([a-z])([A-Z])', r'\1-\2', slug).lower()
    
    # Handle special slug cases
    slug_special = {
        "stoke": "stoke-on-trent",
        "newcastle-under-lyme": "newcastle-under-lyme",
        "southend-on-sea": "southend-on-sea",
        "weston-super-mare": "weston-super-mare",
        "burton-upon-trent": "burton-upon-trent",
        "bury-st-edmunds": "bury-st-edmunds",
        "st-albans": "st-albans",
        "kings-lynn": "kings-lynn",
        "stratford-upon-avon": "stratford-upon-avon",
        "sutton-coldfield": "sutton-coldfield",
        "leamington-spa": "leamington-spa",
        "cannock-chase": "cannock-chase",
        "milton-keynes": "milton-keynes",
        "great-yarmouth": "great-yarmouth",
        "hemel-hempstead": "hemel-hempstead",
        "welwyn-garden-city": "welwyn-garden-city",
        "leighton-buzzard": "leighton-buzzard",
        "high-wycombe": "high-wycombe",
    }
    
    if slug in slug_special:
        slug = slug_special[slug]
    
    locations.append((display_name, slug))

# Sort alphabetically
locations.sort(key=lambda x: x[0])

# Print allLocations array
print("// All individual locations for the comprehensive list - ALL 102 locations")
print("const allLocations = [")
for name, slug in locations:
    print(f'  "{name}",')
print("];")

print("\n\n// locationSlugMap")
print("const locationSlugMap: Record<string, string> = {")
for name, slug in locations:
    print(f'  "{name}": "{slug}",')
print("};")

print(f"\n// Total locations: {len(locations)}")
