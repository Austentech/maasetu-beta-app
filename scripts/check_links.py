#!/usr/bin/env python3
"""Crawl all public pages of the local site and verify every internal link
resolves (HTTP 200) or is a valid mailto/tel/anchor/external URL."""
from __future__ import annotations

import re
import sys
import urllib.request

BASE = "http://localhost:3000"
ROUTES = ["/", "/about", "/services", "/patients", "/doctors", "/contact",
          "/privacy", "/terms"]

UA = {"User-Agent": "Mozilla/5.0 (link-check)"}


def get(url: str) -> tuple[int, str]:
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=15) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:  # noqa: BLE001
        return 0, ""


def main() -> int:
    problems: list[str] = []
    checked: set[str] = set()
    for route in ROUTES:
        status, html = get(BASE + route)
        if status != 200:
            problems.append(f"page {route} -> {status}")
            continue
        hrefs = re.findall(r'href="([^"]+)"', html)
        for href in hrefs:
            if href.startswith(("mailto:", "tel:")):
                continue
            if href.startswith("#") or href.startswith("data:"):
                continue
            if href.startswith("http"):
                # external (instagram) — presence check only, no scraping
                if "instagram.com" not in href and "maasetu.in" not in href:
                    problems.append(f"{route}: unexpected external {href}")
                continue
            if href in checked:
                continue
            checked.add(href)
            target = BASE + href
            code, _ = get(target)
            if code != 200:
                problems.append(f"{route}: link {href} -> {code}")
    print(f"pages checked: {len(ROUTES)}, internal links verified: {len(checked)}")
    if problems:
        print("PROBLEMS:")
        for p in problems:
            print(" -", p)
        return 1
    print("ALL LINKS OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
