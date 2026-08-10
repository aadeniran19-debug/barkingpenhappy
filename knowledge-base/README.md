# Knowledge Base

The **authoritative source of record** for this project: private family law in England and
Wales, in a Pathfinder area.

Everything here is *authentic, cited, and traceable* — text copied from its official
publisher, with a citation good enough that a reader can pull the original and check it.

When an AI assistant works in this repository, **this folder takes precedence over recalled
knowledge.** See [`../CLAUDE.md`](../CLAUDE.md).

---

## Layout

```
knowledge-base/
├── README.md            ← you are here
├── CONTRIBUTING.md      the intake checklist; read before adding anything
├── INDEX.md             master list of every entry
├── schema.md            required metadata fields and allowed values
├── entry-template.md    copy this to start an entry
├── citation-style.md    OSCOLA conventions
├── glossary.md          Pathfinder and knowledge-base vocabulary
├── review-log.md        who verified what, and when
└── sources/             every entry lives here — one provision per file
```

**One subfolder, deliberately.** What a source *is* — statute, rule, practice direction,
case, guidance, commentary — lives in its frontmatter, not its path. Reclassifying a
provision changes one field instead of moving the file and breaking every card that
anchors to it.

---

## What belongs here

| Belongs | Does not belong |
| --- | --- |
| Statutes — Children Act 1989, Family Law Act 1996 | Anything you cannot cite to a locatable source |
| FPR 2010 rules and practice directions | Summaries written from memory |
| Pathfinder pilot instruments — PD36Z, PD12B (Pilot) | Copies with no provenance record |
| Judgments | Public law or financial remedy material |

Private law only. No public law, no financial remedy.

---

## Anatomy of an entry

```markdown
---
id: pd2c-as-modified-by-pd36z
title: "PD2C as modified by PD36Z — ..."
doc_type: practice-direction
authority_level: binding-primary
jurisdiction: UK-EW
citation: "..."
official_source_url: "https://www.justice.gov.uk/..."
status: in-force
pilot: true
retrieved: 2026-08-10
verified_by: "..."
---

## Verbatim text

> ...exact text, unaltered...

## As modified

What PD36Z does to it, cited.

## Notes

Your own analysis, kept clear of the quoted text.
```

Full field list in [`schema.md`](schema.md).

---

## Three rules that matter most

1. **Quote or cite. Never paraphrase silently.** Source text goes in a blockquote,
   unaltered, alterations `[bracketed]`, omissions `...`. Your words go under `## Notes`.
2. **Record where it came from and when.** `official_source_url` + `retrieved`. Prefer
   legislation.gov.uk, judiciary.uk, gov.uk over any aggregator.
3. **Pathfinder is a pilot.** Its instruments change. `status`, `current_through` and
   `last_reviewed` are how a future reader knows whether to trust the entry.

---

## Validation

```bash
python3 tools/validate_kb.py
```

Checks required frontmatter, allowed values, unique ids, supersession pointers, and
cross-references. Also fails commentary marked `reproduction: full-text`, which is a
licensing problem rather than a formatting one. Run it before you commit.

---

## Disclaimer

A personal working reference, not legal advice. Verify against the current rules before
relying on anything here.
