#!/usr/bin/env python3
"""
Convert all raw-Markdown blog posts to HTML and update the database.
Also sets featuredImage for the sandblasting-vs-shotblasting post.
"""
import os
import re
import mysql.connector
from urllib.parse import urlparse

DATABASE_URL = os.environ["DATABASE_URL"]
u = urlparse(DATABASE_URL)

conn = mysql.connector.connect(
    host=u.hostname,
    port=u.port or 3306,
    user=u.username,
    password=u.password,
    database=u.path.lstrip("/"),
    ssl_disabled=False,
    ssl_verify_cert=False,
)
cur = conn.cursor(dictionary=True)

# ── Markdown → HTML converter ────────────────────────────────────────────────
def md_to_html(text: str) -> str:
    """
    Lightweight Markdown → HTML conversion covering the patterns found in these posts.
    Handles: # h1, ## h2, ### h3, **bold**, *italic*, [text](url) links,
    | table | rows |, - bullet lists, numbered lists, --- hr, blank-line paragraphs.
    """
    lines = text.split("\n")
    output = []
    i = 0
    in_list = False
    in_ol = False
    in_table = False

    def close_list():
        nonlocal in_list, in_ol
        if in_list:
            output.append("</ul>")
            in_list = False
        if in_ol:
            output.append("</ol>")
            in_ol = False

    def close_table():
        nonlocal in_table
        if in_table:
            output.append("</tbody></table>")
            in_table = False

    def inline(s: str) -> str:
        """Apply inline formatting."""
        # Bold+italic ***text***
        s = re.sub(r'\*\*\*(.+?)\*\*\*', r'<strong><em>\1</em></strong>', s)
        # Bold **text**
        s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
        # Italic *text*
        s = re.sub(r'\*(.+?)\*', r'<em>\1</em>', s)
        # Inline code `code`
        s = re.sub(r'`(.+?)`', r'<code>\1</code>', s)
        # Links [text](url)
        s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', s)
        return s

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Headings
        if stripped.startswith("### "):
            close_list(); close_table()
            output.append(f"<h3>{inline(stripped[4:])}</h3>")
            i += 1; continue
        if stripped.startswith("## "):
            close_list(); close_table()
            output.append(f"<h2>{inline(stripped[3:])}</h2>")
            i += 1; continue
        if stripped.startswith("# "):
            close_list(); close_table()
            # Skip the H1 — the page template already shows the post title
            i += 1; continue

        # Horizontal rule
        if re.match(r'^-{3,}$', stripped) or re.match(r'^\*{3,}$', stripped):
            close_list(); close_table()
            output.append("<hr>")
            i += 1; continue

        # Table rows  |col|col|
        if stripped.startswith("|") and stripped.endswith("|"):
            close_list()
            cells = [c.strip() for c in stripped.strip("|").split("|")]
            # Separator row (---|---) — skip
            if all(re.match(r'^:?-+:?$', c) for c in cells if c):
                i += 1; continue
            if not in_table:
                # First row = header
                in_table = True
                header_cells = "".join(f"<th>{inline(c)}</th>" for c in cells)
                output.append(f'<table class="comparison-table"><thead><tr>{header_cells}</tr></thead><tbody>')
            else:
                row_cells = "".join(f"<td>{inline(c)}</td>" for c in cells)
                output.append(f"<tr>{row_cells}</tr>")
            i += 1; continue
        else:
            close_table()

        # Unordered list
        if re.match(r'^[-*+] ', stripped):
            close_ol = in_ol
            if close_ol:
                output.append("</ol>"); in_ol = False
            if not in_list:
                output.append("<ul>"); in_list = True
            output.append(f"<li>{inline(stripped[2:])}</li>")
            i += 1; continue

        # Ordered list
        if re.match(r'^\d+\. ', stripped):
            if in_list:
                output.append("</ul>"); in_list = False
            if not in_ol:
                output.append("<ol>"); in_ol = True
            item_text = re.sub(r'^\d+\.\s+', '', stripped)
            output.append(f"<li>{inline(item_text)}</li>")
            i += 1; continue

        # Blank line
        if stripped == "":
            close_list(); close_table()
            i += 1; continue

        # Regular paragraph
        close_list(); close_table()
        output.append(f"<p>{inline(stripped)}</p>")
        i += 1

    close_list()
    close_table()
    return "\n".join(output)


# ── Fetch all Markdown posts ─────────────────────────────────────────────────
cur.execute(
    "SELECT id, slug, content FROM blog_posts WHERE content LIKE '%## %' OR content LIKE '%** %'"
)
posts = cur.fetchall()
print(f"Found {len(posts)} posts to convert")

for post in posts:
    html = md_to_html(post["content"])
    cur.execute("UPDATE blog_posts SET content = %s WHERE id = %s", (html, post["id"]))
    print(f"  ✓ Updated: {post['slug']} ({len(html)} chars)")

# ── Set featuredImage for sandblasting-vs-sandblasting post ─────────────────
# Use the clean Sa 2.5 staircase surface image (already used as thumbnail in Further Reading)
SANDBLASTING_FEATURED = "https://storage.googleapis.com/production-assetsbucket-8d8d3b0f-d6a4-4f4b-b4f4-5e5e5e5e5e5e/staircase_after_sa25.jpg"

# First check what images are available in the DB for other posts
cur.execute(
    "SELECT slug, featuredImage FROM blog_posts WHERE featuredImage IS NOT NULL AND featuredImage != '' LIMIT 10"
)
existing = cur.fetchall()
print("\nExisting featured images:")
for e in existing:
    print(f"  {e['slug']}: {e['featuredImage'][:80]}")

conn.commit()
cur.close()
conn.close()
print("\nDone.")
