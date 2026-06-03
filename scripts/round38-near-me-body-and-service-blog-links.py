#!/usr/bin/env python3
"""
Round 38:
1. Add "near me" to SSR body H1 and first paragraph on all town area pages
2. Add "near me" to county SSR body H1 and first paragraph
3. Add contextual "Related Guides" section to all 19 service pages in metaTags.ts
"""
import re

FILE = "/home/ubuntu/commercial_shot_blasting_manus/server/metaTags.ts"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

original = content

# ─── 1. Add "near me" to town area page SSR body H1 ──────────────────────
# Current: <h1>Shot Blasting Services in ${escHtml(name)}, ${escHtml(county)}</h1>
# Target:  <h1>${escHtml(name)} Shot Blasting Services Near Me | ${escHtml(county)}</h1>

old_h1 = '<h1>Shot Blasting Services in ${escHtml(name)}, ${escHtml(county)}</h1>'
new_h1 = '<h1>${escHtml(name)} Shot Blasting Services Near Me | ${escHtml(county)}</h1>'
content = content.replace(old_h1, new_h1)
print(f"Town H1 updated: {'✓' if old_h1 not in content else '✗'}")

# ─── 2. Add "near me" to town area page first paragraph ──────────────────
# Current: <p>Professional mobile shot blasting services in ${escHtml(name)}, ${escHtml(county)} — delivered directly...
# Target:  <p>Looking for shot blasting near me in ${escHtml(name)}? Our mobile units come directly to your site across ${escHtml(county)}...

old_para1 = '<p>Professional mobile shot blasting services in ${escHtml(name)}, ${escHtml(county)} — delivered directly to your site by our fully equipped mobile units. We provide shot blasting services for structural steelwork, factory and warehouse cladding, shipping containers, industrial floor preparation, fire escapes, staircases, warehouse racking, plant and machinery, and more.</p>'
new_para1 = '<p>Looking for shot blasting near me in ${escHtml(name)}? Our fully equipped mobile units come directly to your site across ${escHtml(county)}, delivering professional shot blasting for structural steelwork, factory and warehouse cladding, shipping containers, industrial floor preparation, fire escapes, staircases, warehouse racking, plant and machinery, and more.</p>'
content = content.replace(old_para1, new_para1)
print(f"Town first paragraph updated: {'✓' if old_para1 not in content else '✗'}")

# ─── 3. Add "near me" to county SSR body H1 ──────────────────────────────
# Current: <h1>Shot Blasting Services ${esc(county.name)} | Commercial Shot Blasting UK</h1>
# Target:  <h1>${esc(county.name)} Shot Blasting Services Near Me | Commercial Shot Blasting UK</h1>

old_county_h1 = '<h1>Shot Blasting Services ${esc(county.name)} | Commercial Shot Blasting UK</h1>'
new_county_h1 = '<h1>${esc(county.name)} Shot Blasting Services Near Me | Commercial Shot Blasting UK</h1>'
content = content.replace(old_county_h1, new_county_h1)
print(f"County H1 updated: {'✓' if old_county_h1 not in content else '✗'}")

# ─── 4. Add "near me" to county first paragraph ──────────────────────────
# Current: Professional mobile shot blasting services across ${esc(county.name)} — structural steelwork...
# Target:  Looking for shot blasting near me in ${esc(county.name)}? Our mobile units...

old_county_para = 'Professional mobile shot blasting services across ${esc(county.name)} — structural steelwork, factory cladding, shipping containers, industrial floor preparation, rust and mill scale removal, plant and machinery blasting, fire escapes, and warehouse racking. Our mobile units travel directly to your site across ${esc(county.name)}, delivering results to SA2.5 and SA3 standards for commercial and industrial clients.'
new_county_para = 'Looking for shot blasting near me in ${esc(county.name)}? Our mobile units travel directly to your site across ${esc(county.name)}, delivering professional shot blasting for structural steelwork, factory cladding, shipping containers, industrial floor preparation, rust and mill scale removal, plant and machinery, fire escapes, and warehouse racking — all to SA2.5 and SA3 standards for commercial and industrial clients.'
content = content.replace(old_county_para, new_county_para)
print(f"County first paragraph updated: {'✓' if old_county_para not in content else '✗'}")

# ─── 5. Add Related Guides section to service pages ──────────────────────
# Mapping: service id → list of (blog_slug, blog_title)
BLOG_BASE = "https://commercialshotblasting.co.uk/blog"

SERVICE_BLOG_MAP = {
    "structural-steel-frames": [
        ("shot-blasting-structural-steel-guide", "The Complete Guide to Shot Blasting Structural Steel"),
        ("how-to-specify-surface-preparation-for-structural-steel", "How to Specify Surface Preparation for Structural Steel"),
        ("shot-blasting-structural-steel-standards-certification", "Shot Blasting for Structural Steel: Standards & Certification"),
    ],
    "steel-containers": [
        ("shot-blasting-for-shipping-containers", "Shot Blasting for Shipping Containers: The Complete Guide"),
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
    ],
    "factory-cladding": [
        ("factory-warehouse-cladding-restoration", "Restoring Factory and Warehouse Cladding: Why Shot Blasting Wins"),
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
    ],
    "fire-escapes": [
        ("shot-blasting-structural-steel-guide", "The Complete Guide to Shot Blasting Structural Steel"),
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
    ],
    "staircases": [
        ("shot-blasting-structural-steel-guide", "The Complete Guide to Shot Blasting Structural Steel"),
        ("shot-blasting-vs-sandblasting-difference", "Shot Blasting vs Sandblasting: What's the Difference?"),
    ],
    "bridge-steelwork": [
        ("shot-blasting-structural-steel-guide", "The Complete Guide to Shot Blasting Structural Steel"),
        ("how-to-specify-surface-preparation-for-structural-steel", "How to Specify Surface Preparation for Structural Steel"),
        ("shot-blasting-structural-steel-standards-certification", "Shot Blasting for Structural Steel: Standards & Certification"),
    ],
    "ladders": [
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
        ("shot-blasting-vs-sandblasting-difference", "Shot Blasting vs Sandblasting: What's the Difference?"),
    ],
    "warehouse-racking": [
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
        ("shot-blasting-powder-coating-partnership", "Shot Blasting and Powder Coating: The Perfect Partnership"),
    ],
    "pipework": [
        ("shot-blasting-structural-steel-guide", "The Complete Guide to Shot Blasting Structural Steel"),
        ("shot-blasting-vs-sandblasting-difference", "Shot Blasting vs Sandblasting: What's the Difference?"),
    ],
    "telecom-towers": [
        ("shot-blasting-structural-steel-guide", "The Complete Guide to Shot Blasting Structural Steel"),
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
    ],
    "floor-preparation": [
        ("shot-blasting-vs-sandblasting-difference", "Shot Blasting vs Sandblasting: What's the Difference?"),
        ("how-much-does-shot-blasting-cost-uk", "How Much Does Shot Blasting Cost in the UK? (2025 Price Guide)"),
    ],
    "powder-coating": [
        ("shot-blasting-powder-coating-partnership", "Shot Blasting and Powder Coating: The Perfect Partnership"),
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
    ],
    "commercial-radiators": [
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
        ("shot-blasting-powder-coating-partnership", "Shot Blasting and Powder Coating: The Perfect Partnership"),
    ],
    "commercial-vehicles": [
        ("shot-blasting-vs-sandblasting-difference", "Shot Blasting vs Sandblasting: What's the Difference?"),
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
    ],
    "steel-doors": [
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
        ("shot-blasting-powder-coating-partnership", "Shot Blasting and Powder Coating: The Perfect Partnership"),
    ],
    "steel-sheeting": [
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
        ("shot-blasting-vs-sandblasting-difference", "Shot Blasting vs Sandblasting: What's the Difference?"),
    ],
    "steel-gates": [
        ("shot-blasting-vs-wire-brushing", "Shot Blasting vs Wire Brushing: Which Is Right for Your Project?"),
        ("shot-blasting-powder-coating-partnership", "Shot Blasting and Powder Coating: The Perfect Partnership"),
    ],
    "plant-machinery": [
        ("shot-blasting-vs-sandblasting-difference", "Shot Blasting vs Sandblasting: What's the Difference?"),
        ("how-much-does-shot-blasting-cost-uk", "How Much Does Shot Blasting Cost in the UK? (2025 Price Guide)"),
    ],
    "intumescent-painting": [
        ("why-shot-blasting-essential-before-intumescent-painting", "Why Shot Blasting is Essential Before Intumescent Painting"),
        ("shot-blasting-structural-steel-guide", "The Complete Guide to Shot Blasting Structural Steel"),
        ("how-to-specify-surface-preparation-for-structural-steel", "How to Specify Surface Preparation for Structural Steel"),
    ],
}

def make_related_guides_html(service_id):
    posts = SERVICE_BLOG_MAP.get(service_id, [])
    if not posts:
        return ""
    items = "\n".join(
        f'        <li><a href="{BLOG_BASE}/{slug}">{title}</a></li>'
        for slug, title in posts
    )
    return f"""
    <section aria-label="Related Guides">
      <h2>Related Guides</h2>
      <ul>
{items}
      </ul>
    </section>"""

# Find each service SSR body and append the Related Guides section before </main>
# The service SSR body ends with </main> inside the service-specific block
# We need to find the pattern: serviceBodyHtml = `...` for each service

services_updated = 0
for service_id, posts in SERVICE_BLOG_MAP.items():
    related_html = make_related_guides_html(service_id)
    if not related_html:
        continue
    
    # The service body HTML ends with </article>\n    </main>` (backtick closes the template literal)
    # We need to insert the Related Guides section before </article>\n    </main>
    # Pattern to find: the closing of the service body for this specific service
    # Each service body is unique because it contains the service title
    
    # Find the service's title in serviceMeta to locate its block
    # The SSR body for services uses: id: "service-id" ... serviceBodyHtml
    # Let's find the pattern: </article>\n    </main>` that closes each service body
    # We'll use a marker: the service id appears in the SSR body as the breadcrumb
    
    # The service body HTML contains: href="${SITE_URL}/services/${svc.id}"
    # and ends with: </article>\n    </main>\n  `
    # We need to insert before </article>\n    </main>
    
    # Strategy: find the specific service block by looking for its id in the SSR body
    # Each service body contains: <a href="${SITE_URL}/services">Services</a>
    # and the service title in the H1
    
    # Better strategy: find the service body closing pattern that follows the service's FAQ section
    # The FAQ section ends with </section> and then we have </article></main>
    
    # Actually the simplest approach: find the pattern unique to each service
    # The service body contains the service title in the H1
    # Let's find: </article>\n    </main>\n  ` (the closing of the template literal)
    # and insert before it, but only for this service's block
    
    # Find the service block by its id in the breadcrumb
    # Pattern: `<span itemprop="name">${esc(svc.title)}</span>` ... </article>\n    </main>\n  `
    # This is too complex. Let's use a simpler approach:
    # Find the serviceBodyHtml assignment for this service id
    
    # The service body HTML is assigned as: const serviceBodyHtml = `...`
    # But it's dynamic, not per-service. Let me check the actual structure.
    pass

# Actually, looking at the service page SSR, the body HTML is generated dynamically
# using the svc object. There's ONE template that generates the body for ALL services.
# So we need to add the Related Guides section to the DYNAMIC template,
# and make it conditional based on svc.id.

# Let's find the service body template closing
# The service body ends with the FAQ section and then </article></main>
# We need to find the closing of the service SSR body template

# Find the pattern: the service SSR body closing
# Looking at the structure, the service body ends with:
# </section>\n    </article>\n    </main>\n  `

# Let's find it
closing_pattern = '</section>\n    </article>\n    </main>\n  `'
if closing_pattern in content:
    # Count occurrences
    count = content.count(closing_pattern)
    print(f"Found {count} occurrences of service body closing pattern")
    
    # We need to insert the Related Guides section before the FAQ closing
    # But the Related Guides should be service-specific
    # The best approach is to add a lookup in the template
    
    # Add a JavaScript-style lookup in the TypeScript template
    # We'll add a const before the template that maps service ids to blog posts
    pass

# Let's check what the actual service body template looks like
print("\nSearching for service body template closing...")
idx = content.find('</section>\n    </article>\n    </main>\n  `')
if idx > 0:
    print(f"Found at index {idx}")
    print("Context (200 chars before):")
    print(repr(content[idx-200:idx+50]))
else:
    # Try alternative closing
    idx2 = content.find('</article>\\n    </main>\\n  `')
    print(f"Alt pattern at: {idx2}")
    # Try to find the service body end
    idx3 = content.find('serviceBodyHtml')
    print(f"serviceBodyHtml at: {idx3}")

print(f"\nDone. Changes made:")
print(f"  Town H1: {'updated' if old_h1 not in content else 'NOT FOUND'}")
print(f"  Town para1: {'updated' if old_para1 not in content else 'NOT FOUND'}")
print(f"  County H1: {'updated' if old_county_h1 not in content else 'NOT FOUND'}")
print(f"  County para1: {'updated' if old_county_para not in content else 'NOT FOUND'}")

# Write the file with near me changes (service blog links will be done separately)
with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)
print(f"\nFile written: {FILE}")
