---
name: check-currency
description: Sweep the knowledge base and site for stale or unverified material — status, current_through, verified_by, gaps, and draft SAY wording — and produce a prioritised verification worklist. Use when the user asks what needs checking, verifying, or updating.
---

# Currency and verification sweep

Produce one worklist, oldest/riskiest first. Read-only — this skill reports; it
does not change entries.

1. **Knowledge base**: for every entry in `knowledge-base/sources/*.md`, report
   `status`, `current_through`, `confidence`, and whether `verified_by` is
   filled. Flag: status `unknown`/`pending`/`amended`; `current_through` missing
   or older than a year; `confidence` below verified. Pathfinder pilot
   instruments (PD36Z, PD12B (Pilot)) are highest priority — they change.

2. **Site gaps**: count and list `[[GAP:` tokens per page:

   ```bash
   grep -o '\[\[GAP: [^]]*\]\]' site/content/*.js | sort | uniq -c | sort -rn
   ```

3. **Draft SAY wording**: list cards whose `lastChecked` is null/absent in
   `site/content/*.js` — these render with a DRAFT tag and need the user's
   sign-off.

4. **Cross-check**: any site content citing a KB entry whose status has changed
   since the card's "Last checked" date.

5. Output: a short table — item, why flagged, suggested action — ordered so the
   user can work top-down in the time they have. Do not verify anything yourself;
   verification is the user's act.
