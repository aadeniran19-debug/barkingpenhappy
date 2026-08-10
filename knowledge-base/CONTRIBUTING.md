# Adding to the knowledge base

The value of this folder is that everything in it can be checked. One unsourced entry costs
more than ten missing ones, because it makes the other nine untrustworthy too.

---

## Intake checklist

Work top to bottom. If you cannot complete a step, **stop** — do not add the entry.

1. **Get the official text.**
   legislation.gov.uk for statutes and SIs. judiciary.uk or gov.uk for the FPR, practice
   directions, and President's Guidance. The National Archives for superseded versions.
   Aggregators and AI outputs are leads, not sources — if that is the only copy you can
   find, say so under `## Provenance` and leave `confidence: unverified`.

2. **Check whether it is a pilot instrument.**
   PD36Z and PD12B (Pilot) are pilots and change on their own timetable. Set `pilot: true`,
   and be specific in `current_through`. A pilot instrument quoted without a date is close
   to useless.

3. **Check the licence.**
   Primary law is reproducible under the Open Government Licence. The Red Book and other
   commentary are not: set `reproduction: excerpt`, quote only the passage you need with a
   pinpoint cite, and record the rights holder in `copyright`. The validator rejects
   commentary marked `full-text`.

4. **Copy the template.**
   ```bash
   cp knowledge-base/entry-template.md knowledge-base/sources/<your-id>.md
   ```
   Filename must match the `id`. Everything goes in `sources/` — there are no subfolders,
   and `doc_type` does the classifying.

5. **Paste the text verbatim.**
   Exactly as published. Alterations in `[brackets]`, omissions as `...`. Keep the source's
   numbering. Do not fix its typos, and do not tidy its formatting.

6. **Handle modifications separately.**
   Where a provision is read subject to a modifying instrument, put the original under
   `## Verbatim text` and the modification under `## As modified`, citing the instrument
   that makes it. Never merge the two silently — the difference between PD2C and PD2C as
   modified by PD36Z is the thing the site exists to get right.

7. **Fill in every required field.**
   See [`schema.md`](schema.md). `retrieved` is the day you copied the text, not today's
   date by habit. `official_source_url` must resolve.

8. **Check currency.**
   In force? Amended? Set `status`, and `current_through` for anything binding.
   `status: unknown` is honest and acceptable; silently implying `in-force` is not.

9. **Verify, then sign.**
   Read your file against the source side by side once more. Only then set `verified_by`
   and `confidence: verified`. Signing means you personally compared them.

10. **Register and validate.**
    Add a row to [`INDEX.md`](INDEX.md) and a line to [`review-log.md`](review-log.md), then:
    ```bash
    python3 tools/validate_kb.py
    ```
    Commit message: `kb: add <citation>`.

---

## Updating an existing entry

- **Typo or formatting fix** — edit in place, bump `last_reviewed`.
- **The provision changed** — do *not* overwrite. Create a new entry for the new version,
  set the old one's `status` and `superseded_by`, and the new one's `supersedes`. What a
  provision used to say is often exactly what you need, particularly for a case issued
  under an earlier version of the pilot.
- **Re-checked, nothing changed** — bump `last_reviewed` only.

Never reuse an `id` for different content. Never delete an entry a card cites; mark it
`historical`.

---

## Review cadence

| Material | Re-check |
| --- | --- |
| Pilot instruments (`pilot: true`) | every 3 months |
| Other binding provisions in active use | every 6 months |
| Guidance | every 12 months |
| Commentary | on new edition |
| Anything `status: unknown` | before it is relied on |

Log every review in `review-log.md`, including those that found no change — "checked,
unchanged" is the evidence the entry is still current.

---

## Things that will get an entry rejected

- Text reconstructed from memory, from an AI answer, or from a summary.
- A citation that does not resolve to a real, locatable document.
- A practice direction cited without its paragraph.
- A modification merged silently into the text it modifies.
- Analysis blended into the quoted text.
- A missing or guessed `retrieved` date.
- Commentary reproduced beyond what the licence allows.
- Public law or financial remedy material, or anything case-identifying.
