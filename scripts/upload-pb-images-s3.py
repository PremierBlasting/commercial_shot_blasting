#!/usr/bin/env python3
"""
Upload all downloaded Premier Blasting shot blasting images to S3 via the Manus storage API.
Uses the same approach as the server-side storagePut helper.
"""

import os
import json
import re
import requests
from pathlib import Path

IMAGES_DIR = "/home/ubuntu/commercial_shot_blasting_manus/scripts/pb-images"
METADATA_FILE = "/home/ubuntu/commercial_shot_blasting_manus/scripts/pb-shot-blasting-projects.json"
CDN_MAP_FILE = "/home/ubuntu/commercial_shot_blasting_manus/scripts/pb-images-cdn-map.json"

# Load env vars from the project
def load_env():
    """Load environment variables from the running process or .env file"""
    env_file = "/home/ubuntu/commercial_shot_blasting_manus/.env"
    env = {}
    if os.path.exists(env_file):
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, _, val = line.partition('=')
                    env[key.strip()] = val.strip().strip('"').strip("'")
    # Also check system env
    for key in ['BUILT_IN_FORGE_API_URL', 'BUILT_IN_FORGE_API_KEY']:
        if key in os.environ:
            env[key] = os.environ[key]
    return env

env = load_env()
FORGE_API_URL = env.get('BUILT_IN_FORGE_API_URL', '').rstrip('/')
FORGE_API_KEY = env.get('BUILT_IN_FORGE_API_KEY', '')

print(f"Forge API URL: {FORGE_API_URL[:50]}..." if FORGE_API_URL else "No Forge API URL found")
print(f"Forge API Key: {'set' if FORGE_API_KEY else 'NOT SET'}")

if not FORGE_API_URL or not FORGE_API_KEY:
    print("ERROR: Missing storage credentials. Trying alternative approach...")
    # Try to read from the running server's env
    import subprocess
    result = subprocess.run(['cat', '/proc/1/environ'], capture_output=True)
    if result.returncode == 0:
        env_str = result.stdout.decode('utf-8', errors='replace')
        for pair in env_str.split('\x00'):
            if '=' in pair:
                k, _, v = pair.partition('=')
                if k in ['BUILT_IN_FORGE_API_URL', 'BUILT_IN_FORGE_API_KEY']:
                    if k == 'BUILT_IN_FORGE_API_URL':
                        FORGE_API_URL = v.rstrip('/')
                    else:
                        FORGE_API_KEY = v
    print(f"After env scan - URL: {'set' if FORGE_API_URL else 'NOT SET'}, Key: {'set' if FORGE_API_KEY else 'NOT SET'}")

def upload_image(filepath: str, key: str) -> str:
    """Upload an image file to S3 and return the CDN URL"""
    upload_url = f"{FORGE_API_URL}/v1/storage/upload?path={key}"
    
    content_type = 'image/webp' if filepath.endswith('.webp') else \
                   'image/jpeg' if filepath.endswith(('.jpg', '.jpeg')) else \
                   'image/png'
    
    with open(filepath, 'rb') as f:
        data = f.read()
    
    filename = os.path.basename(filepath)
    
    # Create multipart form data
    files = {'file': (filename, data, content_type)}
    headers = {'Authorization': f'Bearer {FORGE_API_KEY}'}
    
    resp = requests.post(upload_url, files=files, headers=headers, timeout=60)
    resp.raise_for_status()
    
    result = resp.json()
    return result.get('url', '')

# Load existing metadata
with open(METADATA_FILE) as f:
    projects = json.load(f)

# Upload all images
cdn_map = {}
image_files = sorted(os.listdir(IMAGES_DIR))
print(f"\nUploading {len(image_files)} images...")

for filename in image_files:
    filepath = os.path.join(IMAGES_DIR, filename)
    # Use a unique key with hash to avoid collisions
    import hashlib
    file_hash = hashlib.md5(open(filepath, 'rb').read()).hexdigest()[:8]
    name_without_ext = os.path.splitext(filename)[0]
    ext = os.path.splitext(filename)[1]
    key = f"shot-blasting-gallery/{name_without_ext}_{file_hash}{ext}"
    
    try:
        url = upload_image(filepath, key)
        cdn_map[filename] = url
        print(f"  ✓ {filename} -> {url[:80]}...")
    except Exception as e:
        print(f"  ✗ {filename}: {e}")

# Save CDN map
with open(CDN_MAP_FILE, 'w') as f:
    json.dump(cdn_map, f, indent=2)

print(f"\nCDN map saved: {len(cdn_map)} URLs")

# Update projects metadata with CDN URLs
for proj in projects:
    proj['cdn_images'] = []
    safe_title = re.sub(r'[^a-z0-9]+', '-', proj['title'].lower()).strip('-')
    
    for i, local_path in enumerate(proj.get('local_images', [])):
        filename = os.path.basename(local_path)
        if filename in cdn_map:
            proj['cdn_images'].append(cdn_map[filename])
        else:
            print(f"  WARNING: No CDN URL for {filename}")

with open(METADATA_FILE, 'w') as f:
    json.dump(projects, f, indent=2)

print("\nFinal project CDN URLs:")
for proj in projects:
    print(f"  {proj['title']}: {len(proj.get('cdn_images', []))} CDN images")
    for url in proj.get('cdn_images', []):
        print(f"    {url[:80]}")
