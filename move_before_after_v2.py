#!/usr/bin/env python3
"""
Move BeforeAfterSlider sections to appear after "Why Choose Us" section.
Handles multiple different section comment patterns.
"""

import re
from pathlib import Path

def move_before_after_section(filepath):
    """Move BeforeAfterSlider section to after Why Choose Us section."""
    filename = filepath.name
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern to match the entire Before/After section (flexible comment pattern)
    before_after_pattern = r'(\s*{/\* Before[/&]After.*?\*/}\s*<section className="py-12 bg-white">.*?</section>\s*)'
    
    # Pattern to match Why Choose Us section (flexible patterns)
    why_choose_patterns = [
        r'({/\* Why Choose Us.*?\*/}\s*<section.*?</section>)\s*',
        r'(<section className="py-16 bg-white">.*?Why.*?Choose.*?</section>)\s*',
    ]
    
    # Check if BeforeAfter section exists
    before_after_match = re.search(before_after_pattern, content, re.DOTALL)
    
    if before_after_match:
        before_after_section = before_after_match.group(1)
        before_after_pos = before_after_match.start()
        
        # Try to find Why Choose Us section with different patterns
        why_choose_match = None
        for pattern in why_choose_patterns:
            why_choose_match = re.search(pattern, content, re.DOTALL)
            if why_choose_match:
                break
        
        if why_choose_match:
            why_choose_pos = why_choose_match.start()
            
            # Only move if BeforeAfter is currently before Why Choose Us
            if before_after_pos < why_choose_pos:
                # Remove BeforeAfter from current position
                content = content.replace(before_after_section, '', 1)
                
                # Find Why Choose Us section again (positions changed after removal)
                why_choose_match = None
                for pattern in why_choose_patterns:
                    why_choose_match = re.search(pattern, content, re.DOTALL)
                    if why_choose_match:
                        break
                
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
    print("Moving remaining BeforeAfter sections...\n")
    
    pages_dir = Path("client/src/pages")
    
    # Target specific pages that still need fixing
    pages_to_fix = [
        "BirminghamServiceArea.tsx",
        "BristolServiceArea.tsx",
        "ChesterServiceArea.tsx",
        "ChesterfieldServiceArea.tsx",
        "CoventryServiceArea.tsx",
        "ManchesterServiceArea.tsx",
        "NorthamptonServiceArea.tsx",
        "NorwichServiceArea.tsx",
        "OxfordServiceArea.tsx",
        "PeterboroughServiceArea.tsx",
        "SheffieldServiceArea.tsx",
        "StratfordUponAvonServiceArea.tsx",
        "SwindonServiceArea.tsx",
        "WrexhamServiceArea.tsx",
    ]
    
    moved_count = 0
    for page_name in pages_to_fix:
        page_path = pages_dir / page_name
        if page_path.exists():
            if move_before_after_section(page_path):
                moved_count += 1
    
    print(f"\n✓ Moved BeforeAfter sections on {moved_count} additional pages")

if __name__ == '__main__':
    main()
