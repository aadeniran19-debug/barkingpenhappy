# Glossary

Terms of art as this project uses them. Where a term has a defined legal meaning, cite
the entry that defines it rather than paraphrasing — the citation is the definition.

Format:

```
### Term
**Definition.** ...
**Source:** `knowledge-base/<path>/<entry>.md` — or a full citation.
**Note:** how this project uses it, if narrower than the general meaning.
```

---

## Knowledge-base terms

### Primary authority
The law itself: statutes, FPR rules, practice directions, judgments.
`authority_level: binding-primary` or `persuasive-primary`.

### Commentary
Writing *about* the law: the Red Book, textbooks, articles. Persuasive at most, and
copyrighted — stored as excerpts with pinpoint cites, never in full.
`authority_level: commentary`.

### Binding vs. persuasive
Binding authority a decision-maker must follow; persuasive authority they may consider.
The same document can be binding in one jurisdiction and persuasive in another — which
is why `jurisdiction` and `authority_level` are separate fields.

### Verbatim
Copied character-for-character from the official source, with alterations in
`[brackets]` and omissions as `...`. Anything less is a paraphrase and belongs under
`## Notes`.

### Provenance
The record of where a copy came from and when: publisher, URL or volume, retrieval date,
and any second source it was checked against.

### Superseded
Replaced by a later version or authority. The entry stays, `status` changes, and
`superseded_by` points to the replacement.

---

## Domain terms

_Add project-specific terms below as the knowledge base grows. Each one needs a source._
