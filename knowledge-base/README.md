# Knowledge Base

This folder is the **authoritative source of record** for this project.

Everything in here is meant to be *authentic, cited, and legally grounded*: text that
traces back to a real, locatable source, with a citation good enough that a reader can
independently pull the original and check it.

When an AI assistant (or anyone else) works in this repository, **this folder takes
precedence over recalled or generalised knowledge.** See [`../CLAUDE.md`](../CLAUDE.md)
for the operating rules.

---

## What belongs here

| Belongs | Does not belong |
| --- | --- |
| Statutes, regulations, constitutions, treaties | Anything you cannot cite to a locatable source |
| Judicial opinions and orders | Summaries written from memory |
| Official agency guidance, advisory opinions, rulings | Screenshots or PDFs with no provenance record |
| Treatises, restatements, law review articles | Content whose licence forbids storage here |
| Executed contracts, standard forms, clause libraries | Client confidences or privileged material |
| Glossaries and citation aids derived from the above | Predictions, opinions, or advocacy dressed as authority |

**One source per file.** Do not mix two authorities into one entry.

---

## Layout

```
knowledge-base/
├── README.md                  ← you are here
├── CONTRIBUTING.md            ← the intake process; read before adding anything
├── INDEX.md                   ← master list of every entry
├── _schema/
│   └── frontmatter.md         ← required metadata fields + allowed values
├── _templates/
│   ├── source-entry.md        ← copy this to start a new entry
│   └── EXAMPLE-entry.md       ← illustrative, filled-in example
├── _meta/
│   └── review-log.md          ← who verified what, and when
├── primary/                   ← binding authority
│   ├── constitutions/
│   ├── statutes/
│   ├── regulations/
│   ├── case-law/
│   └── treaties/
├── secondary/                 ← treatises, restatements, scholarship
├── guidance/                  ← agency guidance, advisory opinions, rulings
├── contracts-and-forms/       ← instruments, model forms, clause libraries
└── reference/                 ← glossary, citation conventions
```

`primary/` is for authority that binds. `secondary/` is for commentary *about*
authority. `guidance/` sits in between: official, often persuasive, rarely binding.
If you are unsure, put it in `secondary/` and say why in the entry's `notes`.

---

## Anatomy of an entry

Every file is Markdown with a YAML frontmatter block, then the content:

```markdown
---
id: usc-17-107
title: "17 U.S.C. § 107 — Limitations on exclusive rights: Fair use"
doc_type: statute
authority_level: binding-primary
jurisdiction: US-federal
citation: "17 U.S.C. § 107 (2018)"
official_source_url: "https://www.govinfo.gov/..."
status: in-force
retrieved: 2026-08-09
verified_by: "A. Adeniran"
---

## Verbatim text

> ...exact quoted text, unaltered...

## Notes

Editorial commentary, clearly separated from the quoted source.
```

The full field list — which are required, which are optional, and what values are
allowed — lives in [`_schema/frontmatter.md`](_schema/frontmatter.md).

---

## Three rules that matter most

1. **Quote or cite. Never paraphrase silently.** Source text goes in a blockquote,
   unaltered, with alterations marked `[bracketed]` and omissions marked `...`.
   Your own words go under `## Notes` and nowhere else.
2. **Record where it came from and when.** `official_source_url` + `retrieved`.
   Prefer the official publisher (government printing office, court, agency registry)
   over an aggregator.
3. **Law changes. Say what you checked.** `status`, `current_through`, and
   `last_reviewed` are how a future reader knows whether to trust the entry.

---

## Validation

```bash
python3 tools/validate_kb.py
```

Checks that every entry has the required frontmatter, uses allowed values, has unique
IDs, and that superseded entries point somewhere. Run it before you commit.

---

## Disclaimer

This knowledge base is a **research and reference resource**. It is not legal advice,
it does not create a lawyer–client relationship, and it may be out of date. Verify
against the official source before relying on anything here for a real matter.
