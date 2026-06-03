#!/usr/bin/env python3
"""
Round 37: 
1. Reorder title tags: "Shot Blasting Services in {Area}" → "{Area} Shot Blasting Services"
2. Add "near me" to meta descriptions on town pages
3. Fix county page title to front-load county name
"""
import re

FILE = "/home/ubuntu/commercial_shot_blasting_manus/server/metaTags.ts"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

original = content

# ─── 1. Reorder town page titles ───────────────────────────────────────────
# Pattern: title: "Shot Blasting Services in {Area} | Commercial Shot Blasting"
# Target:  title: "{Area} Shot Blasting Services | Commercial Shot Blasting"

def reorder_town_title(m):
    area = m.group(1)
    return f'title: "{area} Shot Blasting Services | Commercial Shot Blasting"'

content = re.sub(
    r'title: "Shot Blasting Services in ([^|"]+) \| Commercial Shot Blasting"',
    reorder_town_title,
    content
)

town_title_count = len(re.findall(r'title: "[^""]+ Shot Blasting Services \| Commercial Shot Blasting"', content))
print(f"Town titles reordered: {town_title_count}")

# ─── 2. Fix county page dynamic title ──────────────────────────────────────
# Current:  const pageTitle = `Shot Blasting Services ${county.name} | Commercial Shot Blasting UK`;
# Target:   const pageTitle = `${county.name} Shot Blasting Services | Commercial Shot Blasting UK`;

content = content.replace(
    "const pageTitle = `Shot Blasting Services ${county.name} | Commercial Shot Blasting UK`;",
    "const pageTitle = `${county.name} Shot Blasting Services | Commercial Shot Blasting UK`;"
)

# Also fix the H1 in the county SSR body HTML
content = content.replace(
    "<h1>Shot Blasting Services ${esc(county.name)} | Commercial Shot Blasting UK</h1>",
    "<h1>${esc(county.name)} Shot Blasting Services | Commercial Shot Blasting UK</h1>"
)

print("County page title reordered: done")

# ─── 3. Add "near me" to town page meta descriptions ───────────────────────
# The descriptions are in the locationMeta object.
# Pattern: description: "Mobile shot blasting in {Area} — ..."
# We want to add "near me" naturally. The best approach is to change:
#   "Mobile shot blasting in {Area} — "
# to:
#   "Shot blasting near me in {Area} — mobile service, "
# But that changes the sentence structure too much.
# Better: append "near me" to the end before the phone number.
# Pattern: "... Free (site survey|quote). Call 07970 566409"
# Target:  "... Free (site survey|quote) — shot blasting near me. Call 07970 566409"

def add_near_me_to_desc(m):
    before = m.group(1)
    cta = m.group(2)
    return f'{before} — shot blasting near me. {cta}'

content = re.sub(
    r'(description: "Mobile shot blasting in [^"]+?)\. (Free (?:site survey|quote)\. Call 07970 566409")',
    add_near_me_to_desc,
    content
)

near_me_count = content.count("shot blasting near me")
print(f"'near me' phrase added to descriptions: {near_me_count}")

# ─── 4. Add "near me" to county page meta description ──────────────────────
# Current: `Professional mobile shot blasting services across ${county.name} — ...`
# We want to add "near me" to the county meta description template
content = content.replace(
    "const metaDesc = county.metaDescription || `Professional mobile shot blasting services across ${county.name} — structural steelwork, factory cladding, containers, floor preparation, rust removal & more. SA2.5/SA3 standard. Free quote. Call ${PHONE}`;",
    "const metaDesc = county.metaDescription || `${county.name} shot blasting services near me — mobile surface preparation for structural steelwork, factory cladding, containers, floor preparation, rust removal & more. SA2.5/SA3 standard. Free quote. Call ${PHONE}`;"
)
print("County meta description updated with 'near me': done")

# ─── 5. Verify changes ─────────────────────────────────────────────────────
# Check no old format titles remain
old_format = re.findall(r'title: "Shot Blasting Services in [^"]+\| Commercial Shot Blasting"', content)
if old_format:
    print(f"WARNING: {len(old_format)} old-format titles still remain!")
    print("  Examples:", old_format[:3])
else:
    print("Verification: 0 old-format titles remaining ✓")

# Check new format count
new_format = re.findall(r'title: "[^"]+ Shot Blasting Services \| Commercial Shot Blasting"', content)
print(f"New-format town titles: {len(new_format)}")

# ─── Write output ──────────────────────────────────────────────────────────
with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nDone. File written: {FILE}")
print(f"Original size: {len(original)} chars")
print(f"New size: {len(content)} chars")
print(f"Diff: {len(content) - len(original):+d} chars")
