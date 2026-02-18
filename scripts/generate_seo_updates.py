#!/usr/bin/env python3
"""
Generate SEO-optimized useEffect code for all location service area pages.
Pattern: Title 30-60 chars, Keywords 3-8 focused terms
"""

import os
import re

# Location data with optimized SEO
locations = {
    "wolverhampton": {
        "name": "Wolverhampton",
        "region": "West Midlands",
        "title": "Shot Blasting Wolverhampton | Industrial Services",  # 47 chars
        "keywords": "shot blasting Wolverhampton, rust removal, surface preparation, industrial blasting, West Midlands"
    },
    "coventry": {
        "name": "Coventry",
        "region": "West Midlands",
        "title": "Shot Blasting Coventry | Commercial & Industrial",  # 48 chars
        "keywords": "shot blasting Coventry, rust removal, surface preparation, industrial blasting, West Midlands"
    },
    "leicester": {
        "name": "Leicester",
        "region": "East Midlands",
        "title": "Shot Blasting Leicester | Professional Services",  # 47 chars
        "keywords": "shot blasting Leicester, rust removal, surface preparation, industrial blasting, East Midlands"
    },
    "derby": {
        "name": "Derby",
        "region": "East Midlands",
        "title": "Shot Blasting Derby | Commercial & Industrial",  # 45 chars
        "keywords": "shot blasting Derby, rust removal, surface preparation, industrial blasting, East Midlands"
    },
    "nottingham": {
        "name": "Nottingham",
        "region": "East Midlands",
        "title": "Shot Blasting Nottingham | Industrial Services",  # 46 chars
        "keywords": "shot blasting Nottingham, rust removal, surface preparation, industrial blasting, East Midlands"
    },
    "sheffield": {
        "name": "Sheffield",
        "region": "South Yorkshire",
        "title": "Shot Blasting Sheffield | Steel & Metal Cleaning",  # 48 chars
        "keywords": "shot blasting Sheffield, rust removal, surface preparation, steel cleaning, South Yorkshire"
    },
    "leeds": {
        "name": "Leeds",
        "region": "West Yorkshire",
        "title": "Shot Blasting Leeds | Commercial & Industrial",  # 45 chars
        "keywords": "shot blasting Leeds, rust removal, surface preparation, industrial blasting, West Yorkshire"
    },
    "manchester": {
        "name": "Manchester",
        "region": "Greater Manchester",
        "title": "Shot Blasting Manchester | Industrial Services",  # 46 chars
        "keywords": "shot blasting Manchester, rust removal, surface preparation, industrial blasting, Greater Manchester"
    },
    "liverpool": {
        "name": "Liverpool",
        "region": "Merseyside",
        "title": "Shot Blasting Liverpool | Commercial & Industrial",  # 49 chars
        "keywords": "shot blasting Liverpool, rust removal, surface preparation, industrial blasting, Merseyside"
    },
    "stoke": {
        "name": "Stoke-on-Trent",
        "region": "Staffordshire",
        "title": "Shot Blasting Stoke-on-Trent | Industrial Services",  # 50 chars
        "keywords": "shot blasting Stoke-on-Trent, rust removal, surface preparation, industrial blasting, Staffordshire"
    },
    "worcester": {
        "name": "Worcester",
        "region": "Worcestershire",
        "title": "Shot Blasting Worcester | Commercial & Industrial",  # 49 chars
        "keywords": "shot blasting Worcester, rust removal, surface preparation, industrial blasting, Worcestershire"
    },
    "gloucester": {
        "name": "Gloucester",
        "region": "Gloucestershire",
        "title": "Shot Blasting Gloucester | Industrial Services",  # 46 chars
        "keywords": "shot blasting Gloucester, rust removal, surface preparation, industrial blasting, Gloucestershire"
    },
    "bristol": {
        "name": "Bristol",
        "region": "South West",
        "title": "Shot Blasting Bristol | Commercial & Industrial",  # 47 chars
        "keywords": "shot blasting Bristol, rust removal, surface preparation, industrial blasting, South West"
    },
    "cardiff": {
        "name": "Cardiff",
        "region": "South Wales",
        "title": "Shot Blasting Cardiff | Commercial & Industrial",  # 47 chars
        "keywords": "shot blasting Cardiff, rust removal, surface preparation, industrial blasting, South Wales"
    },
    "hereford": {
        "name": "Hereford",
        "region": "Herefordshire",
        "title": "Shot Blasting Hereford | Commercial & Industrial",  # 48 chars
        "keywords": "shot blasting Hereford, rust removal, surface preparation, industrial blasting, Herefordshire"
    },
    "shrewsbury": {
        "name": "Shrewsbury",
        "region": "Shropshire",
        "title": "Shot Blasting Shrewsbury | Industrial Services",  # 46 chars
        "keywords": "shot blasting Shrewsbury, rust removal, surface preparation, industrial blasting, Shropshire"
    },
    "chester": {
        "name": "Chester",
        "region": "Cheshire",
        "title": "Shot Blasting Chester | Commercial & Industrial",  # 47 chars
        "keywords": "shot blasting Chester, rust removal, surface preparation, industrial blasting, Cheshire"
    },
    "stalbans": {
        "name": "St Albans",
        "region": "Hertfordshire",
        "title": "Shot Blasting St Albans | Commercial & Industrial",  # 49 chars
        "keywords": "shot blasting St Albans, rust removal, surface preparation, industrial blasting, Hertfordshire"
    },
    "miltonkeynes": {
        "name": "Milton Keynes",
        "region": "Buckinghamshire",
        "title": "Shot Blasting Milton Keynes | Industrial Services",  # 49 chars
        "keywords": "shot blasting Milton Keynes, rust removal, surface preparation, industrial blasting, Buckinghamshire"
    },
    "northampton": {
        "name": "Northampton",
        "region": "Northamptonshire",
        "title": "Shot Blasting Northampton | Industrial Services",  # 47 chars
        "keywords": "shot blasting Northampton, rust removal, surface preparation, industrial blasting, Northamptonshire"
    },
    "peterborough": {
        "name": "Peterborough",
        "region": "Cambridgeshire",
        "title": "Shot Blasting Peterborough | Industrial Services",  # 48 chars
        "keywords": "shot blasting Peterborough, rust removal, surface preparation, industrial blasting, Cambridgeshire"
    },
    "cambridge": {
        "name": "Cambridge",
        "region": "Cambridgeshire",
        "title": "Shot Blasting Cambridge | Commercial & Industrial",  # 49 chars
        "keywords": "shot blasting Cambridge, rust removal, surface preparation, industrial blasting, Cambridgeshire"
    },
    "oxford": {
        "name": "Oxford",
        "region": "Oxfordshire",
        "title": "Shot Blasting Oxford | Commercial & Industrial",  # 46 chars
        "keywords": "shot blasting Oxford, rust removal, surface preparation, industrial blasting, Oxfordshire"
    },
    "chesterfield": {
        "name": "Chesterfield",
        "region": "Derbyshire",
        "title": "Shot Blasting Chesterfield | Industrial Services",  # 48 chars
        "keywords": "shot blasting Chesterfield, rust removal, surface preparation, industrial blasting, Derbyshire"
    },
    "ipswich": {
        "name": "Ipswich",
        "region": "Suffolk",
        "title": "Shot Blasting Ipswich | Commercial & Industrial",  # 47 chars
        "keywords": "shot blasting Ipswich, rust removal, surface preparation, industrial blasting, Suffolk"
    },
    "lincoln": {
        "name": "Lincoln",
        "region": "Lincolnshire",
        "title": "Shot Blasting Lincoln | Commercial & Industrial",  # 47 chars
        "keywords": "shot blasting Lincoln, rust removal, surface preparation, industrial blasting, Lincolnshire"
    },
    "norwich": {
        "name": "Norwich",
        "region": "Norfolk",
        "title": "Shot Blasting Norwich | Commercial & Industrial",  # 47 chars
        "keywords": "shot blasting Norwich, rust removal, surface preparation, industrial blasting, Norfolk"
    },
    "stratforduponavon": {
        "name": "Stratford-upon-Avon",
        "region": "Warwickshire",
        "title": "Shot Blasting Stratford-upon-Avon | Industrial",  # 46 chars
        "keywords": "shot blasting Stratford-upon-Avon, rust removal, surface preparation, industrial blasting, Warwickshire"
    },
    "swindon": {
        "name": "Swindon",
        "region": "Wiltshire",
        "title": "Shot Blasting Swindon | Commercial & Industrial",  # 47 chars
        "keywords": "shot blasting Swindon, rust removal, surface preparation, industrial blasting, Wiltshire"
    },
    "wrexham": {
        "name": "Wrexham",
        "region": "North Wales",
        "title": "Shot Blasting Wrexham | Commercial & Industrial",  # 47 chars
        "keywords": "shot blasting Wrexham, rust removal, surface preparation, industrial blasting, North Wales"
    }
}

# File name mapping
file_mapping = {
    "wolverhampton": "WolverhamtonServiceArea.tsx",
    "coventry": "CoventryServiceArea.tsx",
    "leicester": "LeicesterServiceArea.tsx",
    "derby": "DerbyServiceArea.tsx",
    "nottingham": "NottinghamServiceArea.tsx",
    "sheffield": "SheffieldServiceArea.tsx",
    "leeds": "LeedsServiceArea.tsx",
    "manchester": "ManchesterServiceArea.tsx",
    "liverpool": "LiverpoolServiceArea.tsx",
    "stoke": "StokeServiceArea.tsx",
    "worcester": "WorcesterServiceArea.tsx",
    "gloucester": "GloucesterServiceArea.tsx",
    "bristol": "BristolServiceArea.tsx",
    "cardiff": "CardiffServiceArea.tsx",
    "hereford": "HerefordServiceArea.tsx",
    "shrewsbury": "ShrewsburyServiceArea.tsx",
    "chester": "ChesterServiceArea.tsx",
    "stalbans": "StAlbansServiceArea.tsx",
    "miltonkeynes": "MiltonKeynesServiceArea.tsx",
    "northampton": "NorthamptonServiceArea.tsx",
    "peterborough": "PeterboroughServiceArea.tsx",
    "cambridge": "CambridgeServiceArea.tsx",
    "oxford": "OxfordServiceArea.tsx",
    "chesterfield": "ChesterfieldServiceArea.tsx",
    "ipswich": "IpswichServiceArea.tsx",
    "lincoln": "LincolnServiceArea.tsx",
    "norwich": "NorwichServiceArea.tsx",
    "stratforduponavon": "StratfordUponAvonServiceArea.tsx",
    "swindon": "SwindonServiceArea.tsx",
    "wrexham": "WrexhamServiceArea.tsx"
}

base_path = "/home/ubuntu/commercial_shot_blasting_site/client/src/pages"

def update_file(key, data, filename):
    filepath = os.path.join(base_path, filename)
    
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return False
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Pattern to match the useEffect with document.title
    # We need to replace the simple title useEffect with the optimized one
    
    # Find the existing useEffect with document.title
    old_pattern = r'useEffect\(\(\) => \{\s*document\.title = "[^"]*";\s*\}, \[\]\);'
    
    new_useeffect = f'''useEffect(() => {{
    document.title = "{data['title']}";
    
    // Set keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {{
      metaKeywords.setAttribute('content', '{data['keywords']}');
    }} else {{
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = '{data['keywords']}';
      document.head.appendChild(meta);
    }}
  }}, []);'''
    
    # Check if the file already has keywords handling
    if 'metaKeywords' in content:
        # Already has keywords, just update the title and keywords values
        # Update title
        title_pattern = r'document\.title = "[^"]*";'
        content = re.sub(title_pattern, f'document.title = "{data["title"]}";', content)
        
        # Update keywords content
        keywords_pattern = r"metaKeywords\.setAttribute\('content', '[^']*'\);"
        content = re.sub(keywords_pattern, f"metaKeywords.setAttribute('content', '{data['keywords']}');", content)
        
        keywords_content_pattern = r"meta\.content = '[^']*';\s*document\.head\.appendChild\(meta\);"
        content = re.sub(keywords_content_pattern, f"meta.content = '{data['keywords']}';\n      document.head.appendChild(meta);", content)
    else:
        # Replace the simple useEffect with the full one
        content = re.sub(old_pattern, new_useeffect, content)
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Updated: {filename} - Title: {len(data['title'])} chars, Keywords: {len(data['keywords'].split(', '))} terms")
    return True

def main():
    print("Updating SEO meta tags for all location pages...")
    print("=" * 60)
    
    success_count = 0
    for key, data in locations.items():
        filename = file_mapping.get(key)
        if filename:
            if update_file(key, data, filename):
                success_count += 1
        else:
            print(f"No file mapping for: {key}")
    
    print("=" * 60)
    print(f"Successfully updated {success_count}/{len(locations)} files")

if __name__ == "__main__":
    main()
