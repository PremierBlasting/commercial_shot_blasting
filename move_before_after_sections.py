#!/usr/bin/env python3
"""
Move BeforeAfterSlider sections to appear after "Why Choose Us" section on all pages.
"""

import re
from pathlib import Path

def move_before_after_section(filepath):
    """Move BeforeAfterSlider section to after Why Choose Us section."""
    filename = filepath.name
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern to match the entire Before/After section
    # Matches from the comment to the end of the section tag
    before_after_pattern = r'(\s*{/\* Before/After Slider \*/}\s*<section className="py-12 bg-white">.*?</section>\s*)'
    
    # Check if BeforeAfter section exists and is before Why Choose Us
    before_after_match = re.search(before_after_pattern, content, re.DOTALL)
    why_choose_match = re.search(r'({/\* Why Choose Us Section.*?</section>)\s*', content, re.DOTALL)
    
    if before_after_match and why_choose_match:
        before_after_section = before_after_match.group(1)
        before_after_pos = before_after_match.start()
        why_choose_pos = why_choose_match.start()
        
        # Only move if BeforeAfter is currently before Why Choose Us
        if before_after_pos < why_choose_pos:
            # Remove BeforeAfter from current position
            content = content.replace(before_after_section, '')
            
            # Find Why Choose Us section again (positions changed after removal)
            why_choose_match = re.search(r'({/\* Why Choose Us Section.*?</section>)\s*', content, re.DOTALL)
            if why_choose_match:
                # Insert after Why Choose Us
                insert_pos = why_choose_match.end()
                content = content[:insert_pos] + '\n' + before_after_section + content[insert_pos:]
                print(f"  ✓ Moved BeforeAfter section in {filename}")
                
                # Write the changes
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                return True
    
    return False

def main():
    print("Moving BeforeAfter sections to after Why Choose Us...\n")
    
    pages_dir = Path("client/src/pages")
    service_area_pages = list(pages_dir.glob("*ServiceArea.tsx"))
    
    moved_count = 0
    for page_path in sorted(service_area_pages):
        if move_before_after_section(page_path):
            moved_count += 1
    
    print(f"\n✓ Moved BeforeAfter sections on {moved_count} pages")

if __name__ == '__main__':
    main()
