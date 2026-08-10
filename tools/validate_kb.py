#!/usr/bin/env python3
"""Validate knowledge-base entries against knowledge-base/schema.md.

Entries live in knowledge-base/sources/, one provision per file, with no subfolders —
what a source is lives in its frontmatter, not its path.

Checks that every entry has the required frontmatter, uses allowed values, carries a
unique id matching its filename, and that cross-references resolve.

Usage:
    python3 tools/validate_kb.py [--kb PATH] [--strict]

Exit status is 1 if any error is found, otherwise 0. Warnings do not fail the run
unless --strict is given. No third-party dependencies.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

KB_DIRNAME = "knowledge-base"
SOURCES_DIRNAME = "sources"

# Documentation about the KB rather than an entry in it.
SKIP_FILES = {"README.md"}

REQUIRED = [
    "id",
    "title",
    "doc_type",
    "authority_level",
    "jurisdiction",
    "citation",
    "official_source_url",
    "status",
    "retrieved",
    "verified_by",
]

ENUMS = {
    "doc_type": {
        "statute", "statutory-instrument", "rule", "practice-direction",
        "case", "guidance", "form", "treatise", "article", "other",
    },
    "authority_level": {
        "binding-primary", "persuasive-primary", "official-guidance",
        "commentary", "non-authoritative",
    },
    "status": {
        "in-force", "amended", "repealed", "superseded", "pending",
        "historical", "unknown",
    },
    "reproduction": {"full-text", "excerpt", "citation-only"},
    "confidence": {"verified", "unverified", "disputed"},
}

DATE_FIELDS = [
    "retrieved", "last_reviewed", "date_enacted", "date_decided", "date_effective",
]
ID_REF_FIELDS = ["superseded_by", "supersedes", "related"]
NEEDS_SUPERSEDED_BY = {"amended", "repealed", "superseded"}

DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]*$")
PLACEHOLDER_RE = re.compile(r"^(todo|tbd|xxx|fixme)\b", re.IGNORECASE)


def split_frontmatter(text: str) -> tuple[str | None, str]:
    """Return (frontmatter, body). Frontmatter is None if the block is absent."""
    if not text.startswith("---"):
        return None, text
    lines = text.split("\n")
    for i in range(1, len(lines)):
        if lines[i].rstrip() == "---":
            return "\n".join(lines[1:i]), "\n".join(lines[i + 1:])
    return None, text


def parse_frontmatter(block: str) -> dict[str, object]:
    """Parse the flat `key: value` subset of YAML the schema uses.

    Supports scalars, inline lists (`[a, b]`), and block lists (`- a`). Nested
    mappings are not used by the schema and are not supported.
    """
    data: dict[str, object] = {}
    key: str | None = None
    for raw in block.split("\n"):
        line = raw.rstrip()
        if not line.strip() or line.lstrip().startswith("#"):
            continue

        if line.lstrip().startswith("- ") and key is not None:
            item = strip_scalar(line.lstrip()[2:])
            bucket = data.get(key)
            if isinstance(bucket, list):
                bucket.append(item)
            else:
                data[key] = [item]
            continue

        if ":" not in line:
            continue
        key, _, value = line.partition(":")
        key = key.strip()
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1].strip()
            data[key] = [strip_scalar(p) for p in inner.split(",") if p.strip()]
        elif value == "":
            data[key] = ""
        else:
            data[key] = strip_scalar(value)
    return data


def strip_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        value = value[1:-1]
    return value.strip()


def is_blank(value: object) -> bool:
    if value is None:
        return True
    if isinstance(value, list):
        return len(value) == 0
    return str(value).strip() == ""


def as_id_list(value: object) -> list[str]:
    if is_blank(value):
        return []
    if isinstance(value, list):
        return [str(v).strip() for v in value if str(v).strip()]
    return [str(value).strip()]


def find_entries(sources: Path) -> list[Path]:
    return [p for p in sorted(sources.glob("*.md")) if p.name not in SKIP_FILES]


def check_entry(path: Path, rel: str, seen: dict[str, str],
                errors: list[str], warnings: list[str]) -> dict[str, object] | None:
    text = path.read_text(encoding="utf-8")
    block, body = split_frontmatter(text)
    if block is None:
        errors.append(f"{rel}: no YAML frontmatter block")
        return None

    meta = parse_frontmatter(block)

    for field in REQUIRED:
        value = meta.get(field)
        if field not in meta:
            errors.append(f"{rel}: missing required field '{field}'")
        elif is_blank(value):
            errors.append(f"{rel}: required field '{field}' is empty")
        elif PLACEHOLDER_RE.match(str(value)):
            errors.append(f"{rel}: field '{field}' still holds a placeholder ({value!r})")

    entry_id = str(meta.get("id", "")).strip()
    if entry_id and not PLACEHOLDER_RE.match(entry_id):
        if not SLUG_RE.match(entry_id):
            errors.append(f"{rel}: id {entry_id!r} is not a lowercase slug [a-z0-9-]")
        if entry_id in seen:
            errors.append(f"{rel}: duplicate id {entry_id!r}, already used by {seen[entry_id]}")
        else:
            seen[entry_id] = rel
        if entry_id != path.stem:
            warnings.append(f"{rel}: filename does not match id {entry_id!r}")

    for field, allowed in ENUMS.items():
        value = meta.get(field)
        if is_blank(value):
            continue
        if str(value) not in allowed:
            errors.append(
                f"{rel}: {field}={value!r} is not an allowed value "
                f"({', '.join(sorted(allowed))})"
            )

    for field in DATE_FIELDS:
        value = meta.get(field)
        if is_blank(value) or PLACEHOLDER_RE.match(str(value)):
            continue
        if not DATE_RE.match(str(value)):
            errors.append(f"{rel}: {field}={value!r} is not a YYYY-MM-DD date")

    url = str(meta.get("official_source_url", "")).strip()
    if url and not PLACEHOLDER_RE.match(url):
        if not (url.startswith("http://") or url.startswith("https://") or url == "offline"):
            errors.append(f"{rel}: official_source_url must be an http(s) URL or 'offline'")
        if url == "offline" and "## Provenance" not in body:
            errors.append(f"{rel}: official_source_url is 'offline' but there is no '## Provenance' section")

    status = str(meta.get("status", "")).strip()
    if status in NEEDS_SUPERSEDED_BY and is_blank(meta.get("superseded_by")):
        errors.append(f"{rel}: status={status!r} requires 'superseded_by'")
    if status == "pending" and is_blank(meta.get("date_effective")):
        warnings.append(f"{rel}: status='pending' without 'date_effective'")
    if status == "unknown":
        warnings.append(f"{rel}: status is 'unknown' — currency has not been checked")

    if str(meta.get("confidence", "")).strip() == "verified" and is_blank(meta.get("verified_by")):
        errors.append(f"{rel}: confidence='verified' requires 'verified_by'")

    reproduction = str(meta.get("reproduction", "full-text")).strip() or "full-text"
    if reproduction == "full-text" and "## Verbatim text" not in body:
        errors.append(f"{rel}: reproduction='full-text' but there is no '## Verbatim text' section")

    if str(meta.get("authority_level", "")).strip() == "binding-primary":
        if is_blank(meta.get("current_through")):
            warnings.append(f"{rel}: binding-primary entry has no 'current_through'")

    # Commentary is copyrighted; reproducing it whole is a licensing problem, not a
    # formatting one, so this is an error rather than a warning.
    if str(meta.get("doc_type", "")).strip() in {"treatise", "article"}:
        if reproduction == "full-text":
            errors.append(
                f"{rel}: doc_type={meta.get('doc_type')!r} with reproduction='full-text' — "
                f"commentary should be 'excerpt' or 'citation-only'"
            )

    return meta


def check_cross_references(entries: dict[str, dict[str, object]],
                           known_ids: set[str], errors: list[str]) -> None:
    for rel, meta in entries.items():
        for field in ID_REF_FIELDS:
            for ref in as_id_list(meta.get(field)):
                if PLACEHOLDER_RE.match(ref):
                    continue
                if ref not in known_ids:
                    errors.append(f"{rel}: {field} points to unknown id {ref!r}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--kb", default=None, help=f"path to the {KB_DIRNAME} folder")
    parser.add_argument("--strict", action="store_true", help="treat warnings as errors")
    args = parser.parse_args()

    kb = Path(args.kb) if args.kb else Path(__file__).resolve().parent.parent / KB_DIRNAME
    if not kb.is_dir():
        print(f"error: no knowledge base at {kb}", file=sys.stderr)
        return 1

    sources = kb / SOURCES_DIRNAME
    if not sources.is_dir():
        print(f"error: no sources folder at {sources}", file=sys.stderr)
        return 1

    errors: list[str] = []
    warnings: list[str] = []
    seen: dict[str, str] = {}
    parsed: dict[str, dict[str, object]] = {}

    paths = find_entries(sources)
    for path in paths:
        rel = str(path.relative_to(kb))
        meta = check_entry(path, rel, seen, errors, warnings)
        if meta is not None:
            parsed[rel] = meta

    check_cross_references(parsed, set(seen), errors)

    for warning in warnings:
        print(f"warning: {warning}")
    for error in errors:
        print(f"error: {error}", file=sys.stderr)

    n = len(paths)
    print(f"\nchecked {n} entr{'y' if n == 1 else 'ies'}: "
          f"{len(errors)} error(s), {len(warnings)} warning(s)")

    if errors or (args.strict and warnings):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
