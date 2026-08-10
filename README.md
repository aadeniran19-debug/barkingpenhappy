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
| [`knowledge-base/sources/`](knowledge-base/sources/) | Every entry — one provision per file, no subfolders. |
| [`knowledge-base/INDEX.md`](knowledge-base/INDEX.md) | Master list of every entry. |
| [`knowledge-base/CONTRIBUTING.md`](knowledge-base/CONTRIBUTING.md) | How to add a source. Read before adding anything. |
| [`knowledge-base/schema.md`](knowledge-base/schema.md) | Required metadata fields and allowed values. |
| [`knowledge-base/entry-template.md`](knowledge-base/entry-template.md) | Copy this to start a new entry. |
| [`tools/validate_kb.py`](tools/validate_kb.py) | Frontmatter and cross-reference validator. |

## The site

Six sections, fixed order: `Law` · `Gatekeeping` · `Pre-court` · `In court` · `Orders` ·
`Flags`. Four page templates — card, reference, template (reasons scaffolds), and order.
Every card carries a stable ID and a "Last checked" date.

Full specification in [`CLAUDE.md`](CLAUDE.md).

## Deployment

Published from [`site/`](site/) to GitHub Pages by
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) on every push to `main`.

**Live at:** https://aadeniran19-debug.github.io/barkingpenhappy/

One-time setup: **Settings → Pages → Source → GitHub Actions**. Until that is set, the
workflow will fail at the deploy step.

The page stays a single self-contained HTML file with no external requests, so saving it to
disk and opening it offline works exactly as it does over Pages.

> `site/index.html` is currently a **design prototype**, not the reference site — it exists to
> settle layout decisions and contains no law.

## Adding a source

```bash
cp knowledge-base/entry-template.md knowledge-base/sources/<your-id>.md
# paste the official text verbatim, complete the frontmatter,
# then register it in INDEX.md and review-log.md
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
