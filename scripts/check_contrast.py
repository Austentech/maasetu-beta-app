#!/usr/bin/env python3
"""
MaaSetu WCAG AA contrast verification for the web design tokens.

Checks every foreground/background pair actually used by the UI against
WCAG 2.1 requirements:
  - normal text (< 24px, or < 18.66px bold): ratio >= 4.5
  - large text (>= 24px, or >= 18.66px bold): ratio >= 3.0
  - UI components / graphical objects:          ratio >= 3.0

Run:  python3 scripts/check_contrast.py
"""

from __future__ import annotations

HEX = str


def srgb_to_linear(channel: float) -> float:
    c = channel / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def relative_luminance(hex_color: HEX) -> float:
    r, g, b = (
        int(hex_color[i : i + 2], 16) for i in (1, 3, 5)
    )
    return (
        0.2126 * srgb_to_linear(r)
        + 0.7152 * srgb_to_linear(g)
        + 0.0722 * srgb_to_linear(b)
    )


def contrast(a: HEX, b: HEX) -> float:
    la, lb = relative_luminance(a), relative_luminance(b)
    lighter, darker = max(la, lb), min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


def blend(fg: HEX, alpha: float, bg: HEX) -> HEX:
    """Simulate a translucent foreground over a background."""
    out = []
    for i in (1, 3, 5):
        f = int(fg[i : i + 2], 16)
        b = int(bg[i : i + 2], 16)
        out.append(round(alpha * f + (1 - alpha) * b))
    return "#" + "".join(f"{c:02x}" for c in out)


INK = "#2A151B"
INK_SOFT = "#6E4A52"
BRAND_400 = "#FD1843"  # exact brand pink — display accents only
BRAND_500 = "#DC0E36"  # interactive pink (buttons)
BRAND_600 = "#C00D30"
BRAND_700 = "#741A2F"
PEACH_200 = "#FFE3D5"
PEACH_300 = "#FFC6A8"
CANVAS = "#FFF9FA"
WHITE = "#FFFFFF"

# (name, foreground, background, requirement)
CHECKS: list[tuple[str, HEX, HEX, float]] = [
    # Body & headings
    ("body text on canvas", INK, CANVAS, 4.5),
    ("body text on white", INK, WHITE, 4.5),
    ("muted text on canvas", INK_SOFT, CANVAS, 4.5),
    ("muted text on white", INK_SOFT, WHITE, 4.5),
    ("muted text on peach-100 panel", INK_SOFT, "#FFF0E8", 4.5),
    ("burgundy accent text on canvas", BRAND_700, CANVAS, 4.5),
    ("burgundy accent text on white", BRAND_700, WHITE, 4.5),
    ("burgundy text on brand-50 chip", BRAND_700, "#FFF1F4", 4.5),
    # Buttons
    ("white text on primary button (brand-500)", WHITE, BRAND_500, 4.5),
    ("white text on primary hover (brand-600)", WHITE, BRAND_600, 4.5),
    ("burgundy text on outline button", BRAND_700, WHITE, 4.5),
    ("burgundy text on onDark button", BRAND_700, WHITE, 4.5),
    ("white text on onDarkOutline button", WHITE, BRAND_700, 4.5),
    # Display-sized accents (hero headline words, >= 24px)
    ("brand pink display word on canvas", BRAND_400, CANVAS, 3.0),
    # Dark burgundy band
    ("white heading on burgundy band", WHITE, BRAND_700, 4.5),
    ("peach body text on burgundy band", PEACH_200, BRAND_700, 4.5),
    ("peach-300 eyebrow on burgundy band", PEACH_300, BRAND_700, 4.5),
    ("blended 70% peach note on burgundy", blend(PEACH_200, 0.7, BRAND_700), BRAND_700, 4.5),
    # UI components
    ("focus ring on canvas", BRAND_400, CANVAS, 3.0),
    ("bottom-nav active label on white", BRAND_500, WHITE, 4.5),
    ("bottom-nav inactive label (90%) on white", blend(INK_SOFT, 0.9, WHITE), WHITE, 4.5),
]


def main() -> None:
    failures = []
    print(f"{'check':48s} {'ratio':>7s}  {'need':>5s}  result")
    print("-" * 72)
    for name, fg, bg, need in CHECKS:
        ratio = contrast(fg, bg)
        ok = ratio >= need
        print(f"{name:48s} {ratio:7.2f}  {need:5.1f}  {'PASS' if ok else 'FAIL'}")
        if not ok:
            failures.append((name, ratio, need))

    print("-" * 72)
    if failures:
        print(f"{len(failures)} FAILURES")
        raise SystemExit(1)
    print(f"All {len(CHECKS)} checks passed WCAG requirements.")


if __name__ == "__main__":
    main()
