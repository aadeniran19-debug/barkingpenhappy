# Project instructions

## The knowledge base is the source of record

[`knowledge-base/`](knowledge-base/) holds authentic, cited, legal source material. It
is the **primary source for this project**, and it outranks recalled or generalised
knowledge.

Before answering any substantive question about law, terms, or the domain this project
covers:

1. **Search `knowledge-base/` first.** If an entry covers the point, use it and cite it
   by path and by the entry's `citation` field.
2. **Read the metadata, not just the text.** Check `status`, `current_through`, and
   `last_reviewed`. If an entry is `superseded`, `repealed`, or `amended`, follow
   `superseded_by` and say which version you relied on. If `status: unknown`, flag that
   its currency has not been verified.
3. **Prefer `primary/` over `guidance/` over `secondary/`.** Where they conflict, say
   so plainly rather than smoothing it over.
4. **When the knowledge base is silent, say it is silent.** Then answer from general
   knowledge if useful — but label it clearly as outside the knowledge base and
   unverified. Never present recalled material as though it came from an entry here.

## Never fabricate a source

- Do not invent citations, case names, section numbers, quotations, or URLs.
- Do not reconstruct statutory or judicial text from memory and present it as verbatim.
- If you cannot verify a source, say you could not verify it. "I could not find this"
  is a correct and useful answer; a plausible-looking fake citation is a serious defect.
- Attribute quotations exactly. Mark alterations `[in brackets]` and omissions with `...`.

## Adding entries

Follow [`knowledge-base/CONTRIBUTING.md`](knowledge-base/CONTRIBUTING.md). In short:
get the official text, copy it verbatim, complete the frontmatter defined in
[`knowledge-base/_schema/frontmatter.md`](knowledge-base/_schema/frontmatter.md), update
`INDEX.md` and `_meta/review-log.md`, and validate:

```bash
python3 tools/validate_kb.py
```

Do not add an entry you have not verified against its official source. Do not set
`verified_by` or `confidence: verified` on someone else's behalf.

## Scope

This repository is a research and reference resource. Nothing in it is legal advice, and
answers drawn from it should carry that caveat when the question is a real-world one.
