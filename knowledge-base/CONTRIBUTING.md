# Adding to the knowledge base

The value of this folder is that everything in it can be checked. One unsourced entry
costs more than ten missing ones, because it makes the other nine untrustworthy too.

---

## Intake checklist

Work top to bottom. If you cannot complete a step, **stop** — do not add the entry.

1. **Get the official text.**
   Go to the publisher of record: the legislature's own site, the court's own docket,
   the agency's own register, the publisher's own edition. Aggregators and AI outputs
   are leads, not sources. If the only copy you can find is an aggregator's, say so in
   `## Provenance` and set `confidence: unverified`.

2. **Check the licence.**
   Most primary law is free to reproduce; most treatises and many databases are not.
   If reproduction is restricted, set `reproduction: excerpt` or `citation-only`,
   record the rights holder in `copyright`, and summarise instead of copying.

3. **Pick the right folder.**
   `primary/` binds. `guidance/` is official but usually persuasive. `secondary/` is
   commentary. When torn, choose the weaker classification and explain in `## Notes`.

4. **Copy the template.**
   ```bash
   cp knowledge-base/_templates/source-entry.md \
      knowledge-base/primary/statutes/<your-id>.md
   ```
   The filename must match the `id`.

5. **Paste the text verbatim.**
   Exactly as published. Alterations in `[brackets]`, omissions as `...`. Keep the
   source's numbering. Do not fix its typos. Do not tidy its formatting.

6. **Fill in every required field.**
   See [`_schema/frontmatter.md`](_schema/frontmatter.md). `retrieved` is the date you
   copied the text, not today's date by habit. `official_source_url` must resolve.

7. **Check currency.**
   Is it still in force? Amended? Superseded? Set `status`, and `current_through` for
   anything in `primary/`. `status: unknown` is honest and acceptable — silently
   implying `in-force` is not.

8. **Verify, then sign.**
   Read your file against the source, side by side, once more. Only then set
   `verified_by` and `confidence: verified`. Signing means you personally compared them.

9. **Register it.**
   Add a row to [`INDEX.md`](INDEX.md) and a line to
   [`_meta/review-log.md`](_meta/review-log.md).

10. **Validate and commit.**
    ```bash
    python3 tools/validate_kb.py
    ```
    Commit message: `kb: add <citation>`.

---

## Updating an existing entry

- **Typo or formatting fix** — edit in place, bump `last_reviewed`.
- **The law changed** — do *not* overwrite. Create a new entry for the new version, set
  the old one's `status` to `amended`/`superseded`/`repealed` and its `superseded_by` to
  the new `id`, and set the new entry's `supersedes` to the old one. The history of what
  the law used to say is often the whole point.
- **Re-checked, nothing changed** — bump `last_reviewed` only.

Never reuse an `id` for different content. Never delete an entry that something else
cites; mark it `historical` instead.

---

## Review cadence

| Material | Re-check |
| --- | --- |
| `primary/` in active use | every 6 months |
| `guidance/` | every 12 months |
| `secondary/` | on new edition |
| Anything with `status: unknown` | before it is relied on |

Log every review in `_meta/review-log.md`, including reviews that found no change.

---

## Things that will get an entry rejected

- Text reconstructed from memory, from an AI answer, or from a summary.
- A citation that does not resolve to a real, locatable document.
- Analysis blended into the quoted text.
- A missing or guessed `retrieved` date.
- Reproduction of licensed material beyond what the licence allows.
- Client confidences, privileged material, or anything under seal.
