#!/usr/bin/env python3
"""Integrate the selected AI-generated hero illustration into the web app.

Source: scripts/hero-candidates/candidate-d.png (AI-generated for MaaSetu
via the project's image-generation tooling — not a third-party licensed
asset; documented as such in docs/IMPLEMENTATION_LOG.md).

Steps:
1. Copy into apps/web/public/images/hero-consultation.png
   (existing public/ convention: brand/ for logos, images/ for content
   imagery — new subdirectory documented in ARCHITECTURE.md).
2. Emit a tiny LQIP (low-quality image placeholder) as a base64 JPEG for
   next/image `placeholder="blur"` so the hero area paints instantly with
   a brand-warm blur and zero layout shift.
"""

from __future__ import annotations

import base64
import io
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path("/home/z/my-project")
SOURCE = ROOT / "scripts/hero-candidates/candidate-d.png"
TARGET_DIR = ROOT / "apps/web/public/images"
TARGET = TARGET_DIR / "hero-consultation.png"
LQIP_OUT = ROOT / "scripts/hero-lqip.txt"


def main() -> None:
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SOURCE, TARGET)

    img = Image.open(TARGET)
    print(f"copied: {TARGET} ({img.size[0]}x{img.size[1]}, "
          f"{TARGET.stat().st_size} bytes)")

    # LQIP: 12px wide JPEG, just enough to suggest the warm palette.
    tiny = img.copy()
    tiny.thumbnail((12, 12), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.convert("RGB").save(buf, format="JPEG", quality=55, optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    LQIP_OUT.write_text(b64)
    print(f"lqip: {len(b64)} base64 chars -> {LQIP_OUT}")
    print("data:image/jpeg;base64," + b64[:60] + "...")


if __name__ == "__main__":
    main()
