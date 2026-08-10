#!/usr/bin/env python3
"""Assemble site/index.html from site/src/template.html and site/content/*.js.

The delivered site is one self-contained offline HTML file; this script only
exists so content can be authored as small per-card fragments. It is a plain
concatenator on purpose — correctness checks (unique IDs, resolving links,
gap counts) live in the Playwright suite under tests/.

Usage:  python3 tools/build_site.py
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "site" / "src" / "template.html"
CONTENT_DIR = ROOT / "site" / "content"
OUTPUT = ROOT / "site" / "index.html"
MARKER = "/*__CONTENT__*/"

HEADER = (
    "/* GENERATED — do not edit site/index.html directly.\n"
    "   Edit site/src/template.html or site/content/*.js and run\n"
    "   python3 tools/build_site.py */\n"
)


def main() -> int:
    template = TEMPLATE.read_text(encoding="utf-8")
    if MARKER not in template:
        print(f"error: marker {MARKER} not found in {TEMPLATE}", file=sys.stderr)
        return 1

    fragments = sorted(CONTENT_DIR.glob("*.js"))
    if not fragments:
        print(f"error: no content fragments in {CONTENT_DIR}", file=sys.stderr)
        return 1

    parts = [HEADER]
    for frag in fragments:
        parts.append(f"/* ---- {frag.name} ---- */")
        parts.append(frag.read_text(encoding="utf-8").rstrip())
    content = "\n".join(parts)

    OUTPUT.write_text(template.replace(MARKER, content), encoding="utf-8")
    print(f"built {OUTPUT.relative_to(ROOT)} from {len(fragments)} fragment(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
