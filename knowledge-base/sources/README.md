# Sources

Every knowledge-base entry lives in this folder. One provision per file.

There are no subfolders. What a source *is* — statute, rule, practice direction, case,
guidance, commentary — is recorded in its frontmatter, not in its path. A provision that
gets reclassified changes one field instead of moving house and breaking every link to it.

## Naming

Filenames match the entry's `id`: lowercase, `[a-z0-9-]`, stable forever. Suggested shapes:

| Source | Filename |
| --- | --- |
| Practice direction | `pd2c.md`, `pd12b-pilot.md`, `pd36z.md` |
| A modified provision | `pd2c-as-modified-by-pd36z.md` |
| FPR rule | `fpr-r3-10.md`, `fpr-r12-13.md`, `fpr-part-3a.md` |
| Statute section | `ca1989-s11i.md`, `ca1989-s91-14.md` |
| Case | `re-x-2023-ewca-civ-000.md` |
| Commentary | `red-book-2026-ch12.md` |

Never reuse an id for different content, and never renumber. The id is what the site's
cards anchor to.

## Starting an entry

```bash
cp knowledge-base/entry-template.md knowledge-base/sources/<your-id>.md
python3 tools/validate_kb.py
```

Read [`../CONTRIBUTING.md`](../CONTRIBUTING.md) first — it is the checklist that keeps this
folder trustworthy. Field definitions are in [`../schema.md`](../schema.md).

## Two reminders

**Currency.** Pathfinder is a pilot. Set `status` and `current_through`, and re-check before
relying on an entry. `status: unknown` is honest; silently implying `in-force` is not.

**Copyright.** Primary law — statutes, rules, practice directions — is reproducible. The Red
Book and other commentary are not. For those, set `reproduction: excerpt`, quote only the
passage you need with a pinpoint cite, and record the rights holder in `copyright`.
