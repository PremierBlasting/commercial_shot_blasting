#!/usr/bin/env python3
"""
Manually fix duplicate NearbyTowns sections by removing specific occurrences.
"""

import re

def fix_nottingham():
    """Fix Nottingham - remove the one inside FAQItem component."""
    filepath = "client/src/pages/NottinghamServiceArea.tsx"
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the NearbyTowns section that's inside the FAQItem component (around line 54-58)
    # This is between the answer paragraph and the closing </div> of FAQItem
    pattern = r'(\s*<p className="mt-2 text-gray-600 pr-6">\{answer\}</p>\s*\)}\s*)\n\s*\{/\* Nearby Towns Section \*/\}\s*<NearbyTowns\s+locationName=\{nearbyTownsData\["nottingham"\]\.location\}\s+towns=\{nearbyTownsData\["nottingham"\]\.towns\}\s+/>\s*\n(\s*</div>)'
    
    replacement = r'\1\n\2'
    new_content = re.sub(pattern, replacement, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("✓ Fixed Nottingham - removed NearbyTowns from inside FAQItem")
        return True
    else:
        print("✗ Nottingham - pattern not found")
        return False

def fix_page_with_three_duplicates(page_name, data_key):
    """Fix pages with 3 NearbyTowns instances - keep only the last one."""
    filepath = f"client/src/pages/{page_name}ServiceArea.tsx"
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find all lines with <NearbyTowns
    nearby_towns_lines = []
    for i, line in enumerate(lines):
        if '<NearbyTowns' in line:
            nearby_towns_lines.append(i)
    
    if len(nearby_towns_lines) != 3:
        print(f"✗ {page_name} - expected 3 instances, found {len(nearby_towns_lines)}")
        return False
    
    # Remove the first two instances (keep the last one)
    # Each instance spans about 5 lines: comment + NearbyTowns opening + props + closing + blank line
    
    # Work backwards to preserve line numbers
    for line_num in reversed(nearby_towns_lines[:2]):
        # Find the start (comment line before <NearbyTowns)
        start_line = line_num
        if line_num > 0 and '/* Nearby Towns Section */' in lines[line_num - 1]:
            start_line = line_num - 1
        
        # Find the end (closing /> and blank line after)
        end_line = line_num
        for j in range(line_num, min(line_num + 10, len(lines))):
            if '/>' in lines[j]:
                end_line = j + 1
                # Include blank line if present
                if end_line < len(lines) and lines[end_line].strip() == '':
                    end_line += 1
                break
        
        # Remove lines from start_line to end_line
        del lines[start_line:end_line]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print(f"✓ Fixed {page_name} - removed 2 duplicate NearbyTowns sections")
    return True

def main():
    print("Fixing duplicate NearbyTowns sections manually...\n")
    
    # Fix Nottingham (2 instances - one misplaced)
    fix_nottingham()
    
    # Fix pages with 3 instances
    fix_page_with_three_duplicates("Bristol", "bristol")
    fix_page_with_three_duplicates("Manchester", "manchester")
    fix_page_with_three_duplicates("Sheffield", "sheffield")
    
    print("\nDone!")

if __name__ == '__main__':
    main()
