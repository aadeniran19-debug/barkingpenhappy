# Frontmatter schema

Every file in [`sources/`](sources/) — except its `README.md` — must open with a YAML
frontmatter block delimited by `---`.

Validated by `tools/validate_kb.py`. If you change a vocabulary here, change it there too.

---

## Required fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | slug | Unique, stable, lowercase, `[a-z0-9-]`. Never reuse or renumber — cards anchor to it. Filename must match. |
| `title` | string | Human-readable name, including the paragraph or section. |
| `doc_type` | enum | See [Document types](#document-types). |
| `authority_level` | enum | See [Authority levels](#authority-levels). |
| `jurisdiction` | string | Normally `UK-EW`. See [Jurisdiction](#jurisdiction). |
| `citation` | string | OSCOLA. See [`citation-style.md`](citation-style.md). |
| `official_source_url` | url | The official publisher's copy — legislation.gov.uk, judiciary.uk, gov.uk, the National Archives. `offline` if none, with a `## Provenance` section explaining the copy. |
| `status` | enum | See [Status](#status). |
| `retrieved` | date | `YYYY-MM-DD`. The day the text below was copied from the source. |
| `verified_by` | string | Who compared this file against the source. |

## Optional fields

| Field | Type | Description |
| --- | --- | --- |
| `short_title` | string | Common name, e.g. `Fair use`, `the Pilot PD`. |
| `publisher` | string | Issuing body: Parliament, the President of the Family Division, MoJ, Cafcass. |
| `date_made` | date | When made, enacted, or issued. |
| `date_decided` | date | For judgments. |
| `date_effective` | date | When the provision took or takes effect. |
| `current_through` | string | The amendment or revision the text reflects. **Strongly recommended** for anything binding — the validator warns without it. |
| `modified_by` | id \| list | Entries that modify this one. For PD2C this is `pd36z`. |
| `modifies` | id \| list | The inverse. |
| `version` | string | Edition or revision. |
| `superseded_by` | id | **Required** when `status` is `superseded`, `repealed`, or `amended`. |
| `supersedes` | id \| list | What this replaces. |
| `related` | list of ids | Cross-references. |
| `tags` | list | Lowercase topical tags. Few, and reused. |
| `pilot` | boolean | `true` for Pathfinder pilot instruments — they change, and change often. |
| `copyright` | string | Rights holder. **Required** for commentary. |
| `reproduction` | enum | `full-text`, `excerpt`, `citation-only`. Defaults to `full-text`. |
| `confidence` | enum | `verified`, `unverified`, `disputed`. Defaults to `unverified`. |
| `last_reviewed` | date | Last re-check against the live source. |
| `notes` | string | One-line caveat. Longer commentary goes in the body. |

---

## Controlled vocabularies

### Document types

`statute`, `statutory-instrument`, `rule`, `practice-direction`, `case`, `guidance`,
`form`, `treatise`, `article`, `other`

`rule` is an FPR rule (r.3.10, r.12.13). `practice-direction` is a PD (PD2C, PD12B (Pilot)).
`treatise` covers the Red Book and equivalents.

### Authority levels

| Value | Meaning |
| --- | --- |
| `binding-primary` | Binding in England and Wales. Statutes, FPR rules, practice directions, binding precedent. |
| `persuasive-primary` | Primary but not binding here — first-instance decisions, obiter, other jurisdictions. |
| `official-guidance` | President's Guidance, Cafcass and HMCTS material. Authoritative in practice, not binding of itself. |
| `commentary` | The Red Book, textbooks, articles. Persuasive at most. |
| `non-authoritative` | Drafting aids and internal notes. Cite the underlying source instead. |

### Status

| Value | Meaning |
| --- | --- |
| `in-force` | Operative as at `last_reviewed`. |
| `amended` | Operative but textually changed since `retrieved`. Set `superseded_by`. |
| `repealed` | No longer operative. |
| `superseded` | Replaced by a later version. Set `superseded_by`. |
| `pending` | Made but not yet in force. Set `date_effective`. |
| `historical` | Kept for the record only. |
| `unknown` | Not yet checked. Treat the entry as unreliable. |

### Jurisdiction

`UK-EW` for England and Wales — the normal value here. `UK` for UK-wide statutes.
`N/A` for jurisdiction-neutral material.

---

## Body sections

`## Verbatim text` is required unless `reproduction` is `citation-only`.

| Heading | Purpose |
| --- | --- |
| `## Verbatim text` | The source, quoted exactly, in a blockquote. |
| `## As modified` | For provisions read subject to a modifying instrument — PD2C as modified by PD36Z. Show the modification, and cite the instrument making it. |
| `## Provenance` | Where the copy came from and how it was obtained. |
| `## Notes` | Your own analysis. Editorial, not authority. |
| `## History` | Amendments and subsequent treatment. |
| `## See also` | Related entries. |

---

## Two rules the validator enforces

**Commentary is never `full-text`.** A `treatise` or `article` with
`reproduction: full-text` is an error, not a warning — reproducing the Red Book wholesale
is a licensing problem rather than a formatting one.

**Supersession points somewhere.** `status: repealed` / `amended` / `superseded` without
`superseded_by` fails. An entry that says it has been replaced must say what replaced it.
