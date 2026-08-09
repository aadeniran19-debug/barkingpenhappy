# Frontmatter schema

Every file under `knowledge-base/` — except `README.md`, `CONTRIBUTING.md`, `INDEX.md`,
and files under `_schema/`, `_templates/`, `_meta/`, and `reference/` — must open with a
YAML frontmatter block delimited by `---`.

Validated by `tools/validate_kb.py`.

---

## Required fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | slug | Unique, stable, lowercase, `[a-z0-9-]`. Never reuse or renumber. Filename should match. |
| `title` | string | Human-readable name of the source, including section/part if applicable. |
| `doc_type` | enum | See [Document types](#document-types). |
| `authority_level` | enum | See [Authority levels](#authority-levels). |
| `jurisdiction` | string | See [Jurisdiction](#jurisdiction). Use `N/A` for jurisdiction-neutral material. |
| `citation` | string | Full formal citation in the project's citation style. See `reference/citation-style.md`. |
| `official_source_url` | url | Link to the *official* publisher's copy. Use `offline` if none exists, and describe the copy under `## Provenance`. |
| `status` | enum | See [Status](#status). |
| `retrieved` | date | `YYYY-MM-DD`. The day the text in this file was copied from the source. |
| `verified_by` | string | Name or handle of the human who compared this file against the source. |

## Optional fields

| Field | Type | Description |
| --- | --- | --- |
| `short_title` | string | Common name, e.g. `Fair use`. |
| `publisher` | string | Issuing body: legislature, court, agency, press. |
| `date_enacted` | date | For statutes, regulations, treaties. |
| `date_decided` | date | For judicial opinions. |
| `date_effective` | date | When the provision took/takes effect. |
| `current_through` | string | The amendment, session, or edition the text reflects. Strongly recommended for anything in `primary/`. |
| `version` | string | Edition, revision, or amendment number. |
| `superseded_by` | id | Required when `status` is `superseded`, `repealed`, or `amended`. |
| `supersedes` | id \| list | The entry or entries this one replaces. |
| `related` | list of ids | Cross-references to other entries. |
| `tags` | list of strings | Lowercase topical tags. Keep them few and reused. |
| `language` | string | ISO 639-1 code. Defaults to `en`. |
| `copyright` | string | Rights statement. Required if the source is not public domain. |
| `reproduction` | enum | `full-text`, `excerpt`, `citation-only`. Defaults to `full-text`. |
| `confidence` | enum | `verified`, `unverified`, `disputed`. Defaults to `unverified` until a human sets `verified_by`. |
| `last_reviewed` | date | Last time someone re-checked this against the live source. |
| `notes` | string | One-line caveat. Longer commentary goes in the body. |

---

## Controlled vocabularies

### Document types

`constitution`, `statute`, `regulation`, `case`, `treaty`, `agency-guidance`,
`advisory-opinion`, `ruling`, `restatement`, `treatise`, `article`, `contract`,
`form`, `clause`, `glossary`, `other`

### Authority levels

| Value | Meaning |
| --- | --- |
| `binding-primary` | Binding law in the stated jurisdiction. |
| `persuasive-primary` | Primary law, but not binding here — another jurisdiction, dissent, unpublished opinion. |
| `official-guidance` | Issued by the regulator; often entitled to deference, rarely binding of itself. |
| `secondary` | Commentary about the law. Persuasive only. |
| `non-authoritative` | Drafting aids, glossaries, internal notes. Cite the underlying source instead. |

### Status

| Value | Meaning |
| --- | --- |
| `in-force` | Currently operative as of `last_reviewed`. |
| `amended` | Still operative but textually changed since `retrieved`. Set `superseded_by`. |
| `repealed` | No longer operative. Set `superseded_by` where a replacement exists. |
| `superseded` | Replaced by a later version or authority. Set `superseded_by`. |
| `pending` | Enacted or issued but not yet effective. Set `date_effective`. |
| `historical` | Retained for historical reference only. |
| `unknown` | Status not yet checked. Treat the entry as unreliable. |

### Jurisdiction

Use a stable, greppable code, most-general first:

- `US-federal`, `US-CA`, `US-NY` — country, then subdivision
- `UK`, `UK-EW` (England & Wales), `UK-SC`
- `EU`, `NG`, `CA-ON`, `AU-NSW`
- `international` for multilateral instruments
- `N/A` for jurisdiction-neutral material

Add new codes to this list when you first use them, so they stay consistent.

---

## Body sections

After the frontmatter, use these headings. Only `## Verbatim text` (or
`## Summary of terms`, for licensed material that may not be reproduced) is required.

| Heading | Purpose |
| --- | --- |
| `## Verbatim text` | The source, quoted exactly, in a blockquote. |
| `## Provenance` | Where the copy came from; how it was obtained; any offline chain of custody. |
| `## Notes` | Your own analysis. Everything here is editorial, not authority. |
| `## History` | Amendments, subsequent treatment, appellate history. |
| `## See also` | Related entries and outside sources. |
