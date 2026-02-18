#!/usr/bin/env python3
"""
Final pass to move BeforeAfterSlider for Chester page.
"""

import re
from pathlib import Path

def move_before_after_chester():
    """Move BeforeAfterSlider section in Chester page."""
    filepath = Path("client/src/pages/ChesterServiceArea.tsx")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match the entire Before/After section
    before_after_pattern = r'(\s*{/\* Before[/&]After.*?\*/}.*?<section className="py-12 bg-white">.*?</section>\s*)'
    
    # Pattern to match About Section (Why Choose Us)
    about_pattern = r'({/\* About Section \(Why Choose Us.*?\*/}\s*<section id="about".*?</section>)\s*'
    
    before_after_match = re.search(before_after_pattern, content, re.DOTALL)
    about_match = re.search(about_pattern, content, re.DOTALL)
    
    if before_after_match and about_match:
        before_after_section = before_after_match.group(1)
        before_after_pos = before_after_match.start()
        about_pos = about_match.start()
        
        # Only move if BeforeAfter is before About
        if before_after_pos < about_pos:
            # Remove BeforeAfter from current position
            content = content.replace(before_after_section, '', 1)
            
            # Find About section again
            about_match = re.search(about_pattern, content, re.DOTALL)
            if about_match:
                # Insert after About
                insert_pos = about_match.end()
                content = content[:insert_pos] + '\n' + before_after_section + content[insert_pos:]
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print("✓ Moved BeforeAfter section in ChesterServiceArea.tsx")
                return True
    
    return False

if __name__ == '__main__':
    move_before_after_chester()
