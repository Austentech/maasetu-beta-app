#!/usr/bin/env python3
"""Crop zoom regions of the About illustration candidate for VLM defect scan."""
from PIL import Image

src = Image.open("/home/z/my-project/scripts/about-candidates/candidate-a.png")
w, h = src.size
print(f"source: {w}x{h}")

# Center 50% zoom (faces + chart region)
crop = src.crop((w // 4, h // 5, w * 3 // 4, h * 3 // 4))
crop = crop.resize((crop.width * 2, crop.height * 2), Image.LANCZOS)
crop.save("/home/z/my-project/scripts/about-candidates/candidate-a-zoom.png")

# Bottom half (hands + table)
crop2 = src.crop((0, h // 2, w, h))
crop2 = crop2.resize((int(crop2.width * 1.6), int(crop2.height * 1.6)), Image.LANCZOS)
crop2.save("/home/z/my-project/scripts/about-candidates/candidate-a-bottom.png")
print("zooms saved")
