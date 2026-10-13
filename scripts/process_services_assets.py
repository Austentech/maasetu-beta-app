#!/usr/bin/env python3
"""Integrate the two new Services-page illustrations into the web app.

Sources (AI-generated for MaaSetu via the project's image-generation
tooling during this session — not third-party licensed assets;
provenance documented in docs/IMPLEMENTATION_LOG.md):
  1. scripts/services-candidates/hero-a.png
     -> apps/web/public/images/services-expectant-mother.png
     (Services page hero: a serene expectant Indian mother with gentle
     care-coordination motifs — the pregnancy-care wellbeing visual)
  2. scripts/services-candidates/consult-a.png
     -> apps/web/public/images/services-doctor-consultation.png
     (Service area 02: an in-person consultation between a pregnant
     mother and her gynecologist — listening, guidance, follow-up)

Each also emits a 12px LQIP base64 JPEG for next/image blur placeholders,
matching the homepage/About pipeline (scripts/process_hero_asset.py,
scripts/process_about_asset.py).
"""
from __future__ import annotations

import base64
import io
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path("/home/z/my-project")
WEB_PUBLIC = ROOT / "apps/web/public"

ASSETS = [
    (
        ROOT / "scripts/services-candidates/hero-a.png",
        WEB_PUBLIC / "images/services-expectant-mother.png",
        ROOT / "scripts/services-lqip-mother.txt",
    ),
    (
        ROOT / "scripts/services-candidates/consult-a.png",
        WEB_PUBLIC / "images/services-doctor-consultation.png",
        ROOT / "scripts/services-lqip-consult.txt",
    ),
]


def make_lqip(img: Image.Image, quality: int = 55) -> str:
    tiny = img.convert("RGB").copy()
    tiny.thumbnail((12, 12), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, format="JPEG", quality=quality, optimize=True)
    return base64.b64encode(buf.getvalue()).decode("ascii")


def main() -> None:
    for src, dst, lqip_out in ASSETS:
        shutil.copyfile(src, dst)
        img = Image.open(dst)
        # Re-save optimized (strip ancillary chunks, keep pixels identical)
        img.save(dst, format="PNG", optimize=True)
        img = Image.open(dst)
        b64 = make_lqip(img)
        lqip_out.write_text(b64)
        print(
            f"{dst.name}: {img.size[0]}x{img.size[1]}, "
            f"{dst.stat().st_size} bytes, lqip {len(b64)} chars"
        )


if __name__ == "__main__":
    main()
