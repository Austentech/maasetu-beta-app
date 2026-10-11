#!/usr/bin/env python3
"""Integrate the About-page consultation illustration into the web app.

Source: scripts/about-candidates/candidate-a.png (AI-generated for MaaSetu
via the project's image-generation tooling during this session — not a
third-party licensed asset; provenance documented in
docs/IMPLEMENTATION_LOG.md).

Steps:
1. Copy into apps/web/public/images/about-consultation.png
   (public/ convention: brand/ for logos, images/ for content imagery).
2. Emit a tiny LQIP base64 JPEG for next/image `placeholder="blur"`.
3. While here, produce web-sized logo sources so the image optimizer no
   longer has to process 2000px originals for a 34px header mark
   (performance regression fix; originals stay in assets/brand/).
"""
from __future__ import annotations

import base64
import io
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path("/home/z/my-project")
WEB_PUBLIC = ROOT / "apps/web/public"

ABOUT_SOURCE = ROOT / "scripts/about-candidates/candidate-a.png"
ABOUT_TARGET = WEB_PUBLIC / "images/about-consultation.png"
ABOUT_LQIP_OUT = ROOT / "scripts/about-lqip.txt"


def make_lqip(img: Image.Image, quality: int = 55) -> str:
    tiny = img.convert("RGB").copy()
    tiny.thumbnail((12, 12), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, format="JPEG", quality=quality, optimize=True)
    return base64.b64encode(buf.getvalue()).decode("ascii")


def main() -> None:
    # --- About illustration ---
    shutil.copyfile(ABOUT_SOURCE, ABOUT_TARGET)
    img = Image.open(ABOUT_TARGET)
    print(f"about image: {ABOUT_TARGET.name} ({img.size[0]}x{img.size[1]}, "
          f"{ABOUT_TARGET.stat().st_size} bytes)")
    b64 = make_lqip(img)
    ABOUT_LQIP_OUT.write_text(b64)
    print(f"about lqip: {len(b64)} base64 chars -> {ABOUT_LQIP_OUT}")

    # --- Web-sized logo sources (keep originals in assets/brand/) ---
    for name, max_w in (("mark.png", 512), ("wordmark.png", 512)):
        src = WEB_PUBLIC / "brand" / name
        im = Image.open(src)
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA")
        if im.size[0] > max_w:
            ratio = max_w / im.size[0]
            im = im.resize((max_w, round(im.size[1] * ratio)), Image.LANCZOS)
        before = src.stat().st_size
        im.save(src, format="PNG", optimize=True)
        print(f"logo {name}: {im.size[0]}x{im.size[1]}, "
              f"{before} -> {src.stat().st_size} bytes")
        # Refresh favicon while we're at it (from the same mark, multi-size)
        if name == "mark.png":
            fav = WEB_PUBLIC / "favicon.ico"
            fav_im = Image.open(src)
            fav_im.save(fav, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
            print(f"favicon refreshed: {fav.stat().st_size} bytes")


if __name__ == "__main__":
    main()
