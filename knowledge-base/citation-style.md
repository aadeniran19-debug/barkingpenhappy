# Citation conventions

**House style: OSCOLA** — the Oxford University Standard for the Citation of Legal
Authorities. England and Wales, so OSCOLA rather than Bluebook or ALWD.

The `citation` field must let a reader find the original without asking you.

---

## Minimum elements

| Source | Must include |
| --- | --- |
| Statute | Short title with year, and the section or schedule relied on |
| Statutory instrument | Name, year, SI number |
| FPR rule | Rule number, and the Part where it helps orientation |
| Practice direction | PD number and paragraph — always the paragraph, never the PD alone |
| Modified provision | Both instruments: the provision, and what modifies it |
| Case | Party names, neutral citation where one exists, then the law report; pinpoint by paragraph |
| Guidance | Issuer, title, and date of issue |
| Commentary | Title, edition, year, and pinpoint — paragraph number in preference to page |

A pinpoint is not optional when you rely on a specific passage. Citing a whole practice
direction when you mean one paragraph is not a citation.

---

## House rules

1. **Cite the version you read.** Provisions are versioned; a citation without a version is
   a claim you cannot defend. This matters doubly for pilot instruments.
2. **Neutral citations first** where one exists, then the report.
3. **Modifications are cited twice.** A provision read subject to a modifying instrument
   carries both — the provision *and* the thing modifying it. PD2C alone is a different
   claim from PD2C as modified by PD36Z, and the difference is the whole point of the
   anchor page.
4. **URLs are provenance, not citation.** The formal cite goes in `citation`; the link goes
   in `official_source_url`. Links rot; citations do not.
5. **Pilot status is part of the identification.** Where an instrument is a pilot, say so in
   the citation or the parenthetical, and set `pilot: true`. "PD12B" and "PD12B (Pilot)" are
   different documents and must never be run together.
6. **Short forms** are fine in prose under `## Notes` once the full citation has appeared in
   the frontmatter. Never in the `citation` field itself.
