#!/usr/bin/env python3
"""
Remove duplicate NearbyTowns sections from service area pages.
Keep only the last occurrence (which should be before the closing </div>).
"""

import re

FILES_TO_FIX = [
    "client/src/pages/BristolServiceArea.tsx",
    "client/src/pages/ManchesterServiceArea.tsx",
    "client/src/pages/SheffieldServiceArea.tsx",
]

def remove_duplicate_nearby_towns(filepath):
    """Remove all but the last NearbyTowns section from a file."""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match the entire NearbyTowns section including comments
    pattern = r'\s*\{/\* Nearby Towns Section \*/\}\s*<NearbyTowns\s+locationName=\{[^}]+\}\s+towns=\{[^}]+\}\s+/>\s*'
    
    # Find all matches
    matches = list(re.finditer(pattern, content))
    
    if len(matches) <= 1:
        print(f"  ✓ No duplicates found (found {len(matches)} instance)")
        return False
    
    print(f"  Found {len(matches)} instances, removing {len(matches) - 1} duplicates...")
    
    # Remove all but the last match
    # We'll work backwards to preserve string positions
    for match in matches[:-1]:  # All except the last one
        start, end = match.span()
        content = content[:start] + content[end:]
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ Removed {len(matches) - 1} duplicate(s), kept the last one")
    return True

def main():
    print("Removing duplicate NearbyTowns sections...\n")
    
    fixed_count = 0
    
    for filepath in FILES_TO_FIX:
        print(f"Processing {filepath}...")
        try:
            if remove_duplicate_nearby_towns(filepath):
                fixed_count += 1
        except Exception as e:
            print(f"  ✗ Error: {e}")
        print()
    
    print(f"\n{'='*60}")
    print(f"Summary: Fixed {fixed_count} file(s)")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
