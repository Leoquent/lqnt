"""Update only descriptor paths; keep the approved symbol and wordmark unchanged.

Run with Python + fonttools[woff], passing the local Outfit variable font:
    python scripts/update-brand-descriptor.py path/to/Outfit.woff2
"""
from pathlib import Path
import re
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

root = Path(__file__).resolve().parents[1]
font = TTFont(sys.argv[1])
if "fvar" in font:
    font = instantiateVariableFont(font, {"wght": 500}, inplace=False)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
tracking = font["head"].unitsPerEm * .10

def outline(text):
    pen = SVGPathPen(glyphs)
    bounds = BoundsPen(glyphs)
    x = 0
    for char in text:
        name = cmap[ord(char)]
        transform = (1, 0, 0, -1, x, 0)
        glyphs[name].draw(TransformPen(pen, transform))
        glyphs[name].draw(TransformPen(bounds, transform))
        x += font["hmtx"][name][0] + tracking
    return pen.getCommands(), bounds.bounds

lines = [outline("MARKE, WEBDESIGN"), outline("& AUTOMATISIERUNG")]
scale = 1900 / max(bounds[2] - bounds[0] for _, bounds in lines)
for path in sorted((root / "brand/marks").glob("leoquent-lockup-h-descriptor*.svg")):
    original = path.read_text(encoding="utf-8")
    source = original
    for i, (commands, bounds) in enumerate(lines, 1):
        x = 1258.14 - bounds[0] * scale
        y = 847.43 if i == 1 else 1027.43
        group = f'<g transform="translate({x:.2f} {y:.2f}) scale({scale:.5f})"><path id="desc{i}" d="{commands}"/></g>'
        source, count = re.subn(rf'<g\b[^>]*>\s*<path\b(?=[^>]*\bid="desc{i}")[\s\S]*?</g>', lambda _: group, source)
        assert count == 1, f"Missing descriptor group {i} in {path.name}"
    source = re.sub(r'aria-label="[^"]*"', 'aria-label="leoquent – Marke, Webdesign &amp; Automatisierung"', source, count=1)
    for identifier in ["L", "Q", "N", "T", "wordmark"]:
        pattern = rf'<path\b(?=[^>]*\bid="{identifier}")[^>]*/>'
        assert re.search(pattern, original).group() == re.search(pattern, source).group()
    path.write_text(source, encoding="utf-8")
    print(f"Updated {path.name}")
print("Descriptor line widths:", [round((b[2] - b[0]) * scale, 2) for _, b in lines])
