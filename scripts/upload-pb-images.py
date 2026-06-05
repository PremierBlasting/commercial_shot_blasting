#!/usr/bin/env python3
"""
Upload all downloaded Premier Blasting shot blasting images to S3 via manus-upload-file --webdev
and save the resulting CDN URLs to a JSON file.
"""

import os
import json
import subprocess

IMAGES_DIR = "/home/ubuntu/commercial_shot_blasting_manus/scripts/pb-images"
METADATA_FILE = "/home/ubuntu/commercial_shot_blasting_manus/scripts/pb-shot-blasting-projects.json"
CDN_MAP_FILE = "/home/ubuntu/commercial_shot_blasting_manus/scripts/pb-images-cdn-map.json"

# Load existing metadata
with open(METADATA_FILE) as f:
    projects = json.load(f)

# Build list of all image files
image_files = sorted(os.listdir(IMAGES_DIR))
print(f"Found {len(image_files)} images to upload")

# Upload all images at once using manus-upload-file --webdev
filepaths = [os.path.join(IMAGES_DIR, f) for f in image_files]

print("Uploading all images to S3...")
result = subprocess.run(
    ["manus-upload-file", "--webdev"] + filepaths,
    capture_output=True,
    text=True,
    timeout=300
)

print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
print("Return code:", result.returncode)

# Parse the output to get URLs
# manus-upload-file outputs one URL per line
lines = result.stdout.strip().split('\n')
urls = [line.strip() for line in lines if line.strip().startswith('http')]

print(f"\nGot {len(urls)} URLs")

# Build CDN map: filename -> URL
cdn_map = {}
for filepath, url in zip(filepaths, urls):
    filename = os.path.basename(filepath)
    cdn_map[filename] = url
    print(f"  {filename} -> {url}")

# Save CDN map
with open(CDN_MAP_FILE, 'w') as f:
    json.dump(cdn_map, f, indent=2)

print(f"\nCDN map saved to: {CDN_MAP_FILE}")

# Now update the projects metadata with CDN URLs
for proj in projects:
    proj['cdn_images'] = []
    safe_title = proj['title'].lower()
    import re
    safe_title = re.sub(r'[^a-z0-9]+', '-', safe_title).strip('-')
    
    for i, local_path in enumerate(proj.get('local_images', [])):
        filename = os.path.basename(local_path)
        if filename in cdn_map:
            proj['cdn_images'].append(cdn_map[filename])
        else:
            print(f"WARNING: No CDN URL found for {filename}")

# Save updated metadata
with open(METADATA_FILE, 'w') as f:
    json.dump(projects, f, indent=2)

print("\nUpdated metadata with CDN URLs")
for proj in projects:
    print(f"  {proj['title']}: {proj.get('cdn_images', [])}")
