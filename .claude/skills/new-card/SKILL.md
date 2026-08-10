---
name: new-card
description: Scaffold a new card, scaffold, order or law page for the bench reference site with a stable ID, gap markers, and section wiring. Use when the user asks to add a card/page to the site.
---

# Add a new page to the bench reference site

1. Ask (or infer from the request) three things: the **page type** (card, scaffold,
   order, law/reference, authority), the **section** (law, gatekeeping, precourt,
   incourt, orders, flags — never a new one), and the **title** phrased the way the
   user will look for it (cards are questions).

2. Choose a stable ID: lowercase slug, section-prefixed by convention
   (`gk-`, `pc-`, `ic-`, `sc-` scaffold, `ro-` running order, `ord-`, `fl-`,
   `law-`, `auth-`). The ID never changes once pushed — it is the anchor.

3. Add the registration to the matching fragment in `site/content/`. Every field
   whose content is not supplied and verifiable renders as a gap — either omit the
   field (the renderer auto-gaps it) or write `Site.GAP("…reason…")` with a reason
   specific enough to act on later. **Never** fill a rule, citation, or quotation
   from memory; the knowledge base is the only source for law
   (see CLAUDE.md, "Sourcing the law").

4. SAY text: only add if the user supplied wording or approved a draft. Leave
   `lastChecked: null` so it renders with the DRAFT tag — never invent a date.

5. If the card should be reachable from the homepage "What am I being asked?" list,
   add a `Site.question(...)` line to `site/content/70-questions.js`.

6. Rebuild and test — both must pass before the work is done:

   ```bash
   python3 tools/build_site.py
   npx playwright test
   ```

   The link-integrity test will fail if the page links to a law anchor that does
   not exist — create the anchor in `site/content/60-law.js` or fix the link.
