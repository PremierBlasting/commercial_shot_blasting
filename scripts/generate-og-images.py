#!/usr/bin/env python3
"""
Round 33 — Dynamic OG Image Generator for Blog Posts
Generates 1200×630px branded OG images for all blog posts and uploads them to S3.
Updates the blog_posts.featuredImage column with the S3 URL.
"""

import os
import sys
import json
import math
import textwrap
import requests
import mysql.connector
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO

# ─── Config ──────────────────────────────────────────────────────────────────
FORGE_API_URL = "https://forge.manus.ai"
FORGE_API_KEY = "Nb7BabHKygHHrzrCGzSSYP"

DB_CONFIG = {
    "host": "gateway03.us-east-1.prod.aws.tidbcloud.com",
    "port": 4000,
    "user": "2uVdbzBSXVwdZjv.def3a11999fa",
    "password": "7YU3mp7WC7e5MBKzcpk3",
    "database": "CYVSNVCfCqJAX7JT23JqdG",
    "ssl_disabled": False,
}

# ─── Brand colours (matching the site's dark navy theme) ─────────────────────
BG_DARK       = (15, 23, 42)       # slate-900 — main background
BG_PANEL      = (30, 41, 59)       # slate-800 — subtle panel
ACCENT_AMBER  = (245, 158, 11)     # amber-500 — brand accent
ACCENT_BLUE   = (56, 189, 248)     # sky-400 — secondary accent
TEXT_WHITE    = (255, 255, 255)
TEXT_MUTED    = (148, 163, 184)    # slate-400
DIVIDER       = (51, 65, 85)       # slate-700

# ─── Fonts ────────────────────────────────────────────────────────────────────
FONT_DIR = "/usr/share/fonts/truetype/noto"
FONT_BOLD    = os.path.join(FONT_DIR, "NotoSans-Bold.ttf")
FONT_REGULAR = os.path.join(FONT_DIR, "NotoSans-Regular.ttf")

# ─── Category badge colours ───────────────────────────────────────────────────
CATEGORY_COLOURS = {
    "Surface Preparation":  ((245, 158, 11),  (15, 23, 42)),    # amber on dark
    "Shot Blasting":        ((56, 189, 248),  (15, 23, 42)),    # sky on dark
    "Technical Guide":      ((167, 243, 208), (15, 23, 42)),    # green on dark
    "Industry Guide":       ((196, 181, 253), (15, 23, 42)),    # purple on dark
    "Case Study":           ((253, 186, 116), (15, 23, 42)),    # orange on dark
}
DEFAULT_BADGE = ((245, 158, 11), (15, 23, 42))


def get_badge_colours(category: str):
    for key, colours in CATEGORY_COLOURS.items():
        if key.lower() in (category or "").lower():
            return colours
    return DEFAULT_BADGE


def draw_rounded_rect(draw, xy, radius, fill):
    """Draw a rounded rectangle."""
    x0, y0, x1, y1 = xy
    draw.rectangle([x0 + radius, y0, x1 - radius, y1], fill=fill)
    draw.rectangle([x0, y0 + radius, x1, y1 - radius], fill=fill)
    draw.ellipse([x0, y0, x0 + 2*radius, y0 + 2*radius], fill=fill)
    draw.ellipse([x1 - 2*radius, y0, x1, y0 + 2*radius], fill=fill)
    draw.ellipse([x0, y1 - 2*radius, x0 + 2*radius, y1], fill=fill)
    draw.ellipse([x1 - 2*radius, y1 - 2*radius, x1, y1], fill=fill)


def draw_diagonal_stripes(draw, width, height, colour, spacing=60, line_width=2):
    """Draw subtle diagonal stripes in the background."""
    for i in range(-height, width + height, spacing):
        draw.line([(i, 0), (i + height, height)], fill=colour, width=line_width)


def wrap_title(title: str, font, max_width: int, draw) -> list[str]:
    """Wrap title text to fit within max_width."""
    words = title.split()
    lines = []
    current = []
    for word in words:
        test = " ".join(current + [word])
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current.append(word)
        else:
            if current:
                lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


def generate_og_image(title: str, category: str, slug: str) -> bytes:
    """Generate a 1200×630 OG image and return PNG bytes."""
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG_DARK)
    draw = ImageDraw.Draw(img)

    # ── Background: subtle diagonal stripes ──────────────────────────────────
    stripe_colour = (255, 255, 255, 8)  # very faint
    draw_diagonal_stripes(draw, W, H, (25, 35, 55), spacing=55, line_width=1)

    # ── Top accent bar ────────────────────────────────────────────────────────
    draw.rectangle([0, 0, W, 6], fill=ACCENT_AMBER)

    # ── Left accent bar ───────────────────────────────────────────────────────
    draw.rectangle([0, 6, 6, H], fill=ACCENT_AMBER)

    # ── Bottom panel ──────────────────────────────────────────────────────────
    draw.rectangle([0, H - 90, W, H], fill=BG_PANEL)
    draw.rectangle([0, H - 91, W, H - 89], fill=DIVIDER)

    # ── Logo / brand name in bottom panel ────────────────────────────────────
    try:
        font_brand = ImageFont.truetype(FONT_BOLD, 22)
        font_brand_sub = ImageFont.truetype(FONT_REGULAR, 16)
    except:
        font_brand = ImageFont.load_default()
        font_brand_sub = font_brand

    draw.text((40, H - 68), "CSB", font=font_brand, fill=ACCENT_AMBER)
    draw.text((80, H - 68), "Commercial Shot Blasting", font=font_brand, fill=TEXT_WHITE)
    draw.text((40, H - 42), "commercialshotblasting.co.uk", font=font_brand_sub, fill=TEXT_MUTED)

    # ── Category badge ────────────────────────────────────────────────────────
    badge_bg, badge_fg = get_badge_colours(category)
    cat_label = category or "Shot Blasting"
    try:
        font_badge = ImageFont.truetype(FONT_BOLD, 20)
    except:
        font_badge = ImageFont.load_default()

    badge_bbox = draw.textbbox((0, 0), cat_label, font=font_badge)
    badge_w = badge_bbox[2] - badge_bbox[0] + 32
    badge_h = badge_bbox[3] - badge_bbox[1] + 16
    badge_x, badge_y = 40, 50
    draw_rounded_rect(draw, [badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=6, fill=badge_bg)
    draw.text((badge_x + 16, badge_y + 8), cat_label, font=font_badge, fill=badge_fg)

    # ── Title ─────────────────────────────────────────────────────────────────
    try:
        font_title_lg = ImageFont.truetype(FONT_BOLD, 64)
        font_title_md = ImageFont.truetype(FONT_BOLD, 52)
        font_title_sm = ImageFont.truetype(FONT_BOLD, 42)
    except:
        font_title_lg = ImageFont.load_default()
        font_title_md = font_title_lg
        font_title_sm = font_title_lg

    max_title_w = W - 80  # 40px padding each side

    # Choose font size based on title length
    if len(title) <= 40:
        font_title = font_title_lg
    elif len(title) <= 65:
        font_title = font_title_md
    else:
        font_title = font_title_sm

    lines = wrap_title(title, font_title, max_title_w, draw)

    # Calculate total title block height
    line_height = draw.textbbox((0, 0), "Ag", font=font_title)[3] + 10
    total_h = len(lines) * line_height

    # Vertically centre the title in the space between badge and bottom panel
    available_top = badge_y + badge_h + 20
    available_bottom = H - 90 - 20
    available_h = available_bottom - available_top
    title_y = available_top + (available_h - total_h) // 2

    for i, line in enumerate(lines):
        y = title_y + i * line_height
        # Draw a subtle shadow
        draw.text((42, y + 2), line, font=font_title, fill=(0, 0, 0, 120))
        draw.text((40, y), line, font=font_title, fill=TEXT_WHITE)

    # ── Decorative amber dot grid (top-right corner) ──────────────────────────
    dot_colour = (245, 158, 11, 40)
    for row in range(6):
        for col in range(6):
            cx = W - 60 - col * 20
            cy = 60 + row * 20
            draw.ellipse([cx - 2, cy - 2, cx + 2, cy + 2], fill=(60, 50, 20))

    # ── Convert to PNG bytes ──────────────────────────────────────────────────
    buf = BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return buf.getvalue()


def upload_to_s3(image_bytes: bytes, slug: str) -> str:
    """Upload PNG bytes to Manus S3 and return the public URL."""
    key = f"blog-og-images/{slug}.png"
    upload_url = f"{FORGE_API_URL}/v1/storage/upload?path={key}"
    blob = ("file", (f"{slug}.png", image_bytes, "image/png"))
    resp = requests.post(
        upload_url,
        headers={"Authorization": f"Bearer {FORGE_API_KEY}"},
        files=[blob],
        timeout=30,
    )
    if not resp.ok:
        raise RuntimeError(f"Upload failed {resp.status_code}: {resp.text}")
    data = resp.json()
    url = data.get("url") or data.get("publicUrl") or data.get("fileUrl")
    if not url:
        raise RuntimeError(f"No URL in response: {data}")
    return url


def main():
    # ── Connect to DB ─────────────────────────────────────────────────────────
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT id, slug, title, category, featuredImage FROM blog_posts WHERE isPublished = 1 ORDER BY id"
    )
    posts = cursor.fetchall()
    print(f"Found {len(posts)} published blog posts")

    results = []
    for post in posts:
        slug = post["slug"]
        title = post["title"]
        category = post["category"] or "Shot Blasting"
        print(f"\nGenerating OG image for: {title[:60]}...")

        try:
            img_bytes = generate_og_image(title, category, slug)
            print(f"  Generated {len(img_bytes):,} bytes")

            url = upload_to_s3(img_bytes, slug)
            print(f"  Uploaded: {url}")

            cursor.execute(
                "UPDATE blog_posts SET featuredImage = %s, updatedAt = NOW() WHERE id = %s",
                (url, post["id"])
            )
            conn.commit()
            print(f"  DB updated for post {post['id']}")
            results.append({"id": post["id"], "slug": slug, "url": url})

        except Exception as e:
            print(f"  ERROR: {e}", file=sys.stderr)

    cursor.close()
    conn.close()

    print(f"\n✓ Done. Generated and uploaded {len(results)}/{len(posts)} OG images.")
    for r in results:
        print(f"  [{r['id']}] {r['slug']}: {r['url']}")


if __name__ == "__main__":
    main()
