#!/usr/bin/env python3
import os
import re

# Find all .tsx files in client/src/pages
pages_dir = "/home/ubuntu/commercial_shot_blasting_site/client/src/pages"

files_updated = 0
total_replacements = 0

for filename in os.listdir(pages_dir):
    if filename.endswith(".tsx") and filename != "OurWork.tsx":
        filepath = os.path.join(pages_dir, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace all Gallery references with Our Work
        content = content.replace('href="/gallery"', 'href="/our-work"')
        content = content.replace("href='/gallery'", "href='/our-work'")
        content = content.replace('href="/gallery" className="hover:text-white">Gallery</Link>', 'href="/our-work" className="hover:text-white">Our Work</Link>')
        content = content.replace('>Gallery</Link>', '>Our Work</Link>')
        content = content.replace('>Gallery</a>', '>Our Work</a>')
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            files_updated += 1
            print(f"Updated: {filename}")

print(f"\nTotal files updated: {files_updated}")
