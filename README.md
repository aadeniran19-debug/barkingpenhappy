# barkingpenhappy

A curated, citation-first knowledge base of authentic legal source material.

Everything of substance lives in **[`knowledge-base/`](knowledge-base/)**. Each entry is
one source — a statute, a regulation, an opinion, a piece of official guidance — copied
verbatim from its official publisher and carrying enough metadata that a reader can
retrieve the original and check it for themselves.

## Layout

| Path | What it is |
| --- | --- |
| [`knowledge-base/`](knowledge-base/) | The source of record. Start at its [README](knowledge-base/README.md). |
| [`knowledge-base/INDEX.md`](knowledge-base/INDEX.md) | Master list of every entry. |
| [`knowledge-base/CONTRIBUTING.md`](knowledge-base/CONTRIBUTING.md) | How to add a source. Read before adding anything. |
| [`knowledge-base/_schema/`](knowledge-base/_schema/) | Required metadata fields and allowed values. |
| [`knowledge-base/_templates/`](knowledge-base/_templates/) | Copy `source-entry.md` to start a new entry. |
| [`tools/validate_kb.py`](tools/validate_kb.py) | Frontmatter and cross-reference validator. |
| [`CLAUDE.md`](CLAUDE.md) | Operating rules for AI assistants working in this repo. |

## Adding a source

```bash
cp knowledge-base/_templates/source-entry.md \
   knowledge-base/primary/statutes/<your-id>.md
# paste the official text verbatim, complete the frontmatter,
# then register it in INDEX.md and _meta/review-log.md
python3 tools/validate_kb.py
```

The full checklist is in [`knowledge-base/CONTRIBUTING.md`](knowledge-base/CONTRIBUTING.md).

## Validation

```bash
python3 tools/validate_kb.py           # errors fail, warnings inform
python3 tools/validate_kb.py --strict  # warnings fail too
```

Requires Python 3.9+. No third-party dependencies.

## Disclaimer

Research and reference material only. Not legal advice, no lawyer–client relationship,
and possibly out of date. Verify against the official source before relying on anything
here.
