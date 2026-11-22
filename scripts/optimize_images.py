"""
Turn the full-size photos in images/originals/ into web-ready WebP files.

For every photo it writes two files into images/:
    <name>.webp      up to 2000px on the long edge  (hero banners, lightbox)
    <name>-sm.webp   up to 900px on the long edge   (gallery grid, phones)

Spaces in file names become hyphens, so "ev 1.jpg" becomes "ev-1.webp".
Photos that are already converted (and haven't changed) are skipped.

Usage:
    python scripts/optimize_images.py            # convert new/changed photos
    python scripts/optimize_images.py --force    # redo everything

Needs Pillow:  pip install Pillow
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images" / "originals"
OUT = ROOT / "images"

SIZES = [
    ("", 2000, 80),     # suffix, max long edge, WebP quality
    ("-sm", 900, 75),
]
EXTENSIONS = {".jpg", ".jpeg", ".png"}


def slug(name: str) -> str:
    return "-".join(name.lower().split())


def convert(src: Path, force: bool) -> None:
    base = slug(src.stem)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)  # respect camera rotation
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        for suffix, edge, quality in SIZES:
            dest = OUT / f"{base}{suffix}.webp"
            if not force and dest.exists() and dest.stat().st_mtime >= src.stat().st_mtime:
                continue
            copy = im.copy()
            copy.thumbnail((edge, edge), Image.LANCZOS)
            copy.save(dest, "WEBP", quality=quality, method=6)
            print(f"  {dest.name:<24} {copy.width}x{copy.height}  {dest.stat().st_size // 1024} KB")


def main() -> None:
    force = "--force" in sys.argv
    if not SRC.is_dir():
        sys.exit(f"Put your full-size photos in {SRC} first.")
    photos = sorted(p for p in SRC.iterdir() if p.suffix.lower() in EXTENSIONS)
    if not photos:
        sys.exit(f"No .jpg/.jpeg/.png files found in {SRC}.")
    for photo in photos:
        print(photo.name)
        convert(photo, force)
    print("Done.")


if __name__ == "__main__":
    main()
