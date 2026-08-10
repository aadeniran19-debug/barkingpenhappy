# barkingpenhappy

A private-law bench reference site for a justices' legal adviser in the family court of
England and Wales — built for a **Pathfinder** area, so PD36Z and PD12B (Pilot) apply.

The deliverable is a single self-contained HTML file: opens in a browser, works offline, no
server, no external requests, nothing to run in order to use it. To keep it maintainable,
content is authored as per-card fragments in [`site/content/`](site/content/) and assembled
into the committed [`site/index.html`](site/index.html) by
[`tools/build_site.py`](tools/build_site.py) (Python stdlib only).

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
| [`site/index.html`](site/index.html) | The site — one self-contained file, **generated**: edit the fragments, not this. |
| [`site/content/`](site/content/) | Per-card content fragments the site is assembled from. |
| [`site/src/template.html`](site/src/template.html) | The app shell (styles, router, search, renderers). |
| [`site/prototype.html`](site/prototype.html) | The earlier design prototype — kept as the record of the layout decisions. |
| [`tools/build_site.py`](tools/build_site.py) | Assembles the fragments into `site/index.html`. |
| [`tests/`](tests/) | Playwright suite — repo-side only, nothing ships in the HTML file. |

## The site

Six sections, fixed order: `Law` · `Gatekeeping` · `Pre-court` · `In court` · `Orders` ·
`Flags`. Four page templates — card, reference (including authority pages for case law),
template (reasons scaffolds and running orders), and order. Every card carries a stable ID
and a "Last checked" date.

The skeleton is built: navigation, homepage launcher with search, all page templates, three
fully populated example cards, and the remaining pages as shells with visible `[[GAP: …]]`
markers. **The knowledge base has no verified entries yet, so no verbatim law appears on the
site** — the homepage gap counter tracks exactly what remains.

To change content:

```bash
# edit site/content/*.js, then
python3 tools/build_site.py
npx playwright test          # needs: npm install (once)
```

Full specification in [`CLAUDE.md`](CLAUDE.md).

## Deployment

Published from [`site/`](site/) to GitHub Pages by
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) on every push to `main`.

**Live at:** https://aadeniran19-debug.github.io/barkingpenhappy/

One-time setup: **Settings → Pages → Source → GitHub Actions**. Until that is set, the
workflow will fail at the deploy step.

The page stays a single self-contained HTML file with no external requests, so saving it to
disk and opening it offline works exactly as it does over Pages.

Whether to keep publishing to a public URL is deliberately undecided — to be revisited once
the site carries real content.

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
