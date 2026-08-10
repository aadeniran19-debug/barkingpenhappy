---
name: add-kb-entry
description: Add a provision, practice direction, statute section, or case to the knowledge base following the CONTRIBUTING checklist, with verbatim text, frontmatter, and validation. Use when the user asks to add law or an authority to the knowledge base, or to close a [[GAP]] on the site.
---

# Add a knowledge-base entry

The knowledge base is the source of record; entries are verbatim, cited, and
validated. Follow `knowledge-base/CONTRIBUTING.md` exactly — this skill is a
working summary of it, and where they differ, CONTRIBUTING.md wins.

1. **Get the official text.** Preferred sources: legislation.gov.uk (statutes and
   SIs), justice.gov.uk (FPR and PDs), caselaw.nationalarchives.gov.uk (judgments).
   A raw PDF supplied by the user in `knowledge-base/sources/` is acceptable as the
   text source — record it as provenance. If the text cannot be obtained, stop and
   tell the user which document to supply; do not reconstruct from memory, ever.
   The "Moudle A/B/C" PDFs are background only — never quote from them.

   **Red Book extracts** (uploads from *The Family Court Practice*, LexisNexis):
   provision text in, editorial out. Never reproduce the publisher's paragraph
   markers (`[3.20]`), `Note—`/`Amendments—`/`Overview—` annotations, Essentials
   boxes, or case digests — that is copyrighted commentary. Restate amendment
   *facts* in `## History` in fresh words; list commentary-flagged case names in
   `## Notes` as unverified candidates. Use `official_source_url: offline` with a
   full `## Provenance` section naming the uploaded file; never guess a URL.
   Extraction: `pdfplumber` first, `pypdf` if spacing comes out corrupted.

2. **Check pilot status and licence** before copying anything (CONTRIBUTING.md
   steps 2–3). Pathfinder instruments change; note the version and date on the
   document itself.

3. **Create the entry**: copy `knowledge-base/entry-template.md` into
   `knowledge-base/sources/` (flat — no subfolders), one provision per entry.
   Filename = the entry `id`. Fill every required frontmatter field per
   `knowledge-base/schema.md`; paste the text verbatim under `## Verbatim text`.
   For a provision modified by PD36Z, make separate entries for the base
   instrument and the modification, linked with `modifies`/`modified_by`.

4. **Set honesty fields correctly**: `retrieved` is today; `current_through` is
   what the source itself states; `confidence` starts below `verified` and
   `verified_by` stays empty — **the user is the verifier of record; never fill
   `verified_by` or claim verification.**

5. **Register and validate**: add the entry to `knowledge-base/INDEX.md`, log it
   in `knowledge-base/review-log.md`, then:

   ```bash
   python3 tools/validate_kb.py
   ```

6. **Close the site gap** only after the user has verified the entry: replace the
   `[[GAP: …]]` in the matching `site/content/` fragment with the verbatim text
   and citation from the entry, rebuild (`python3 tools/build_site.py`), and run
   `npx playwright test`.
