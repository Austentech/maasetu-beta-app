#!/usr/bin/env python3
"""
MaaSetu brand asset pipeline.

Takes the owner-supplied logo source files (white background) and produces
the web-ready assets used by apps/web:

  apps/web/public/brand/mark.png      — pictorial mark, transparent background
  apps/web/public/brand/wordmark.png  — "MaaSetu" wordmark, transparent background
  apps/web/src/app/icon.png           — favicon source (512px, transparent)
  apps/web/src/app/apple-icon.png     — Apple touch icon (180px, white background)

Source of truth: assets/brand/*.png (original uploads, committed).

Approach: the logos are flat-colour artwork on solid white. We convert
near-white pixels to transparent with a narrow soft threshold (anti-aliased
edges ramp smoothly), then crop to the content bounding box.

Run:  python3 scripts/process_brand_assets.py
"""

from __future__ import annotations

import shutil
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BRAND_SRC = ROOT / "assets" / "brand"
UPLOADS = ROOT / "upload"
WEB_PUBLIC_BRAND = ROOT / "apps" / "web" / "public" / "brand"
WEB_APP_DIR = ROOT / "apps" / "web" / "src" / "app"

MARK_SRC = "2.png"  # pictorial mark (mother + baby + stethoscope emblem)
WORDMARK_SRC = "file_000000005e2c7208b983058c30cd0119.png"  # "MaaSetu" wordmark

# White→transparent threshold band. Pixels whose minimum channel is above
# WHITE_HI are fully transparent; below WHITE_LO fully opaque; between → ramp.
WHITE_LO = 235
WHITE_HI = 243


def load_rgba(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def make_transparent(img: Image.Image) -> Image.Image:
    """Convert a white-background flat-colour logo to transparent background."""
    arr = np.asarray(img.convert("RGB")).astype(np.float32)
    mn = arr.min(axis=2)
    t = (WHITE_HI - mn) / (WHITE_HI - WHITE_LO)  # 0 at white, ≥1 for colours
    alpha = np.clip(t, 0.0, 1.0) * 255.0
    out = np.dstack([arr, alpha]).astype(np.uint8)
    return Image.fromarray(out, mode="RGBA")


def content_bbox(img: Image.Image, pad_frac: float = 0.03) -> tuple[int, int, int, int]:
    """Bounding box of non-transparent content, padded by pad_frac."""
    alpha = np.asarray(img.getchannel("A"))
    rows = np.any(alpha > 8, axis=1)
    cols = np.any(alpha > 8, axis=0)
    if not rows.any() or not cols.any():
        raise ValueError("No content found in image")
    top, bottom = int(np.argmax(rows)), int(len(rows) - np.argmax(rows[::-1]))
    left, right = int(np.argmax(cols)), int(len(cols) - np.argmax(cols[::-1]))
    pad = int(pad_frac * max(img.width, img.height))
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(img.width, right + pad)
    bottom = min(img.height, bottom + pad)
    return (left, top, right, bottom)


def fit_on_canvas(img: Image.Image, size: int, bg: tuple[int, int, int, int]) -> Image.Image:
    """Fit content (keeping aspect) onto a square canvas at ~74% scale."""
    canvas = Image.new("RGBA", (size, size), bg)
    scale = (size * 0.74) / max(img.width, img.height)
    new_size = (max(1, round(img.width * scale)), max(1, round(img.height * scale)))
    resized = img.resize(new_size, Image.LANCZOS)
    offset = ((size - new_size[0]) // 2, (size - new_size[1]) // 2)
    canvas.paste(resized, offset, resized)
    return canvas


def downscale_max(img: Image.Image, max_dim: int) -> Image.Image:
    if max(img.width, img.height) <= max_dim:
        return img
    scale = max_dim / max(img.width, img.height)
    return img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)


def main() -> None:
    BRAND_SRC.mkdir(parents=True, exist_ok=True)
    WEB_PUBLIC_BRAND.mkdir(parents=True, exist_ok=True)
    WEB_APP_DIR.mkdir(parents=True, exist_ok=True)

    # Keep committed copies of the owner-supplied originals.
    for name in (MARK_SRC, WORDMARK_SRC):
        src = UPLOADS / name
        dst = BRAND_SRC / name
        if src.exists() and not dst.exists():
            shutil.copy2(src, dst)

    results: list[tuple[str, Image.Image]] = []
    for src_name, out_name in ((MARK_SRC, "mark.png"), (WORDMARK_SRC, "wordmark.png")):
        img = make_transparent(load_rgba(BRAND_SRC / src_name))
        img = img.crop(content_bbox(img))
        img = downscale_max(img, 900)
        out = WEB_PUBLIC_BRAND / out_name
        img.save(out, optimize=True)
        results.append((out_name, img))

    # Favicon: transparent mark on a square canvas.
    icon = fit_on_canvas(results[0][1], 512, (0, 0, 0, 0))
    icon.save(WEB_APP_DIR / "icon.png", optimize=True)

    # Apple touch icon: opaque white background (iOS composites on black otherwise).
    apple = fit_on_canvas(results[0][1], 180, (255, 255, 255, 255))
    apple.convert("RGB").save(WEB_APP_DIR / "apple-icon.png", optimize=True)

    for name, img in results:
        print(f"{name:14s} {img.width}x{img.height}  aspect={img.width / img.height:.2f}")
    print(f"{'icon.png':14s} 512x512   (transparent)")
    print(f"{'apple-icon':14s} 180x180   (white bg)")


if __name__ == "__main__":
    main()
