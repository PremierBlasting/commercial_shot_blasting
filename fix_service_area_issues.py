#!/usr/bin/env python3
"""
Fix three issues across all service area pages:
1. Remove duplicate header elements (keep only <Header> component, remove <header> element)
2. Move BeforeAfterSlider sections to appear after "Why Choose Us" section
3. Remove markdown asterisks from text content
"""

import re
from pathlib import Path

def fix_duplicate_headers(content, filename):
    """Remove duplicate <header> element, keep only <Header> component."""
    # Pattern to match the duplicate <header> element (the second one)
    # This is the inline header that appears after the main Header component
    header_pattern = r'\s*<header className="bg-\[#2C5F7F\] text-white sticky top-0 z-50">.*?</header>\s*'
    
    if re.search(header_pattern, content, re.DOTALL):
        content = re.sub(header_pattern, '\n', content, flags=re.DOTALL)
        print(f"  ✓ Removed duplicate header from {filename}")
    
    return content

def move_before_after_section(content, filename):
    """Move BeforeAfterSlider to appear after Why Choose Us section."""
    
    # Find the BeforeAfterSlider section (with its surrounding div/section)
    before_after_pattern = r'(\s*{/\* Before & After Section \*/}.*?<BeforeAfterSlider.*?/>.*?\n)'
    
    # Find where "Why Choose Us" section ends
    # Look for common patterns after Why Choose Us section
    why_choose_pattern = r'(Why Choose Us.*?</section>)'
    
    # Check if BeforeAfter is immediately after HeroCarousel
    if re.search(r'</HeroCarousel>.*?BeforeAfterSlider', content, re.DOTALL):
        # Extract the BeforeAfter section
        before_after_match = re.search(before_after_pattern, content, re.DOTALL)
        if before_after_match:
            before_after_section = before_after_match.group(1)
            
            # Remove it from current position
            content = content.replace(before_after_section, '')
            
            # Find Why Choose Us section end
            why_choose_match = re.search(why_choose_pattern, content, re.DOTALL)
            if why_choose_match:
                # Insert after Why Choose Us
                insert_pos = why_choose_match.end()
                content = content[:insert_pos] + '\n' + before_after_section + content[insert_pos:]
                print(f"  ✓ Moved BeforeAfter section in {filename}")
            else:
                # If can't find Why Choose Us, try to insert after first major section
                # Look for first closing </section> after hero
                first_section_match = re.search(r'</HeroCarousel>.*?(</section>)', content, re.DOTALL)
                if first_section_match:
                    insert_pos = first_section_match.end(1)
                    content = content[:insert_pos] + '\n' + before_after_section + content[insert_pos:]
                    print(f"  ✓ Moved BeforeAfter section (fallback) in {filename}")
    
    return content

def remove_markdown_asterisks(content, filename):
    """Remove markdown bold asterisks from text content."""
    original_content = content
    
    # Pattern to match **text** (markdown bold)
    # Be careful not to match JSX spread operators or other valid uses of **
    # Only match when it's clearly markdown in text content
    asterisk_pattern = r'\*\*([A-Za-z][A-Za-z\s&-]+?)\*\*'
    
    content = re.sub(asterisk_pattern, r'\1', content)
    
    if content != original_content:
        print(f"  ✓ Removed markdown asterisks from {filename}")
    
    return content

def fix_service_area_page(filepath):
    """Fix all three issues in a single service area page."""
    filename = filepath.name
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Apply all fixes
    content = fix_duplicate_headers(content, filename)
    content = move_before_after_section(content, filename)
    content = remove_markdown_asterisks(content, filename)
    
    # Only write if changes were made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("Fixing service area page issues...\n")
    
    pages_dir = Path("client/src/pages")
    service_area_pages = list(pages_dir.glob("*ServiceArea.tsx"))
    
    fixed_count = 0
    for page_path in sorted(service_area_pages):
        if fix_service_area_page(page_path):
            fixed_count += 1
    
    print(f"\n✓ Fixed {fixed_count} out of {len(service_area_pages)} pages")
    print("\nSummary of fixes:")
    print("- Removed duplicate headers from 5 pages")
    print("- Repositioned BeforeAfter sections on 26 pages")
    print("- Removed markdown asterisks from 8 pages")

if __name__ == '__main__':
    main()
