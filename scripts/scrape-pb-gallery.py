#!/usr/bin/env python3
"""
Scrape Premier Blasting gallery for shot blasting project images.
Extracts all cards tagged with 'Shot Blasting', downloads images,
and saves metadata for use in the commercial shot blasting site.
"""

import os
import re
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

GALLERY_URL = "https://optimisedmarketing.pythonanywhere.com/gallery.html"
OUTPUT_DIR = "/home/ubuntu/commercial_shot_blasting_manus/scripts/pb-images"
METADATA_FILE = "/home/ubuntu/commercial_shot_blasting_manus/scripts/pb-shot-blasting-projects.json"

os.makedirs(OUTPUT_DIR, exist_ok=True)

print("Fetching gallery HTML...")
resp = requests.get(GALLERY_URL, timeout=30)
resp.raise_for_status()
html = resp.text
soup = BeautifulSoup(html, 'html.parser')

# Find all project cards
cards = soup.find_all(class_='pb-card')
print(f"Total cards found: {len(cards)}")

shot_blasting_projects = []

for card in cards:
    # Get categories
    cat_tags = card.find_all(class_='pb-cat-tag')
    cats = [t.text.strip() for t in cat_tags]
    
    # Only process shot blasting cards
    if not any('shot' in c.lower() for c in cats):
        continue
    
    # Get title
    title_el = card.find(class_='pb-title')
    title = title_el.text.strip() if title_el else 'Unknown'
    
    # Get description
    desc_el = card.find(class_='pb-desc')
    desc = desc_el.text.strip() if desc_el else ''
    
    # Get all images (before/after)
    imgs = card.find_all('img')
    img_srcs = []
    for img in imgs:
        src = img.get('src', '') or img.get('data-src', '') or img.get('data-lazy-src', '')
        if src and not src.startswith('data:'):
            img_srcs.append(src)
    
    # Get card data attributes if any
    card_id = card.get('data-id', '') or card.get('id', '')
    
    project = {
        'title': title,
        'categories': cats,
        'description': desc,
        'images': img_srcs,
        'card_id': card_id
    }
    shot_blasting_projects.append(project)
    print(f"  Found: {title} ({len(img_srcs)} images)")

print(f"\nTotal shot blasting projects: {len(shot_blasting_projects)}")

# Download all images
print("\nDownloading images...")
for proj in shot_blasting_projects:
    proj['local_images'] = []
    safe_title = re.sub(r'[^a-z0-9]+', '-', proj['title'].lower()).strip('-')
    
    for i, img_url in enumerate(proj['images']):
        try:
            # Determine file extension
            ext = 'jpg'
            if '.webp' in img_url:
                ext = 'webp'
            elif '.png' in img_url:
                ext = 'png'
            elif '.jpeg' in img_url:
                ext = 'jpg'
            
            label = 'before' if i == 0 else 'after' if i == 1 else f'img{i}'
            filename = f"{safe_title}-{label}.{ext}"
            filepath = os.path.join(OUTPUT_DIR, filename)
            
            if os.path.exists(filepath):
                print(f"  Already exists: {filename}")
                proj['local_images'].append(filepath)
                continue
            
            print(f"  Downloading: {filename}")
            img_resp = requests.get(img_url, timeout=30, stream=True)
            img_resp.raise_for_status()
            
            with open(filepath, 'wb') as f:
                for chunk in img_resp.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            proj['local_images'].append(filepath)
            print(f"    Saved: {filepath} ({os.path.getsize(filepath)} bytes)")
            
        except Exception as e:
            print(f"  ERROR downloading {img_url}: {e}")

# Save metadata
with open(METADATA_FILE, 'w') as f:
    json.dump(shot_blasting_projects, f, indent=2)

print(f"\nMetadata saved to: {METADATA_FILE}")
print(f"Images saved to: {OUTPUT_DIR}")
print(f"\nSummary:")
for proj in shot_blasting_projects:
    print(f"  {proj['title']}: {len(proj.get('local_images', []))} images downloaded")
