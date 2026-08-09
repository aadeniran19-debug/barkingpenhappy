# barkingpenhappy

A private-law bench reference site for a justices' legal adviser in the family court of
England and Wales — built for a **Pathfinder** area, so PD36Z and PD12B (Pilot) apply.

The deliverable is a single self-contained HTML file: opens in a browser, works offline, no
server, no build step, no external requests.

Behind it sits **[`knowledge-base/`](knowledge-base/)** — cited source material, one
provision per entry, copied verbatim from its official publisher with retrieval date and
currency recorded. The site's Law section is sourced from there rather than from recall.

## Layout

| Path | What it is |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | The project brief and the sourcing rules. Read first. |
| [`knowledge-base/`](knowledge-base/) | Cited legal source material. Start at its [README](knowledge-base/README.md). |
| [`knowledge-base/INDEX.md`](knowledge-base/INDEX.md) | Master list of every entry. |
| [`knowledge-base/CONTRIBUTING.md`](knowledge-base/CONTRIBUTING.md) | How to add a source. Read before adding anything. |
| [`knowledge-base/_schema/`](knowledge-base/_schema/) | Required metadata fields and allowed values. |
| [`knowledge-base/_templates/`](knowledge-base/_templates/) | Copy `source-entry.md` to start a new entry. |
| [`tools/validate_kb.py`](tools/validate_kb.py) | Frontmatter and cross-reference validator. |

## The site

Six sections, fixed order: `Law` · `Gatekeeping` · `Pre-court` · `In court` · `Orders` ·
`Flags`. Four page templates — card, reference, template (reasons scaffolds), and order.
Every card carries a stable ID and a "Last checked" date.

Full specification in [`CLAUDE.md`](CLAUDE.md).

## Adding a source

```bash
cp knowledge-base/_templates/source-entry.md \
   knowledge-base/primary/regulations/<your-id>.md
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

## Accuracy

Where a provision is not verified, the build leaves a **visible, marked gap** rather than
plausible filler. A gap is a task; a guess is a defect that gets read out in court.

## Disclaimer

A personal working reference, not legal advice. Pathfinder is a pilot and its instruments
change. Verify against the current rules before relying on anything here.
