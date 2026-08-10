# Project brief — private law bench reference site

I'm a justices' legal adviser sitting in the family court in England and Wales. I want to
build a private-law reference website for my own use before, during and after court.

## Context you need

- Private law only. No public law, no financial remedy. Don't add them.
- My court is a **Pathfinder** area, so **PD36Z** applies and **PD12B (Pilot)** applies in
  place of PD12B (the Child Arrangements Programme). Use Pathfinder vocabulary throughout:
  - There is no FHDRA.
  - **Stage 1: Information Gathering and Assessment** — Child Impact Report over roughly six
    weeks (safeguarding checks, party engagement, direct or indirect engagement with the
    child, DASH risk assessment where domestic abuse features, and consideration of whether
    s.91(14) would be appropriate on disposal per PD12Q).
  - **Stage 2: Interventions and/or Decision Hearing** — around week 7, final decision
    wherever possible.
  - **Review** at 3–12 months, assessing whether the child's welfare needs are being met in
    practice, not compliance.
  - Enforcement applications have their own route at PD12B (Pilot) paras 17.1–17.4.
  - Say **Decision Hearing**, never "final hearing" — rr.12.13 and 12.15 and PD27A are
    modified to that effect.
  - PD36Z disapplies para 6.1 of PD36ZE, so the PD36ZE modification of PD2C does not apply
    to me.
- The single most important reference page is **PD2C as modified by PD36Z**, because it
  defines what I may do myself. The modification adds PD12B (Pilot) paras 9.3, 13.2–13.4,
  13.6, 13.7, 14.4, 15.1, 16.1 and 17.1(c) where the case is unallocated, allocated to lay
  justices, or where a higher judge says I may; and paras 9.1, 9.2, 9.4, 14.1 and 17.1(a)
  where I'm acting as Gatekeeper. Also note r.3.4(2)(b) is modified so the non-court dispute
  resolution adjournment power runs from receipt of the Child Impact Report, and r.25.6
  expert timing refers to the Safeguarding Gatekeeping Appointment / Case Management stage.

## What I want built

A single self-contained HTML file that opens in a browser, works offline, and needs no
server or installation. One file only — no dependencies, no external requests, and nothing
to run in order to *use* it.

To keep that file maintainable as it grows, content is authored as small per-card fragments
under [`site/content/`](site/content/) and assembled into the committed
[`site/index.html`](site/index.html) by `tools/build_site.py` (Python stdlib only, like the
KB validator). The built file is always committed alongside the fragments — anyone opening
the repo gets a working site with no tooling. Run after any content change:

```bash
python3 tools/build_site.py
```

### Navigation — exactly six sections, fixed order

`Law` · `Gatekeeping` · `Pre-court` · `In court` · `Orders` · `Flags`

Don't add a seventh. Don't nest deeper than section → page → anchor.

### Homepage

A launcher, not a welcome page. No introduction, no "about this site". It contains:

1. A search box at the top that filters across all card titles and body text.
2. The six section tiles in a responsive grid.
3. A "What am I being asked?" list — plain-language questions that link straight to
   individual cards, each tagged with its section. Start with: Was the MIAM exemption
   validly claimed? / Can I do this myself, or refer up? / Do we need a fact-finding
   hearing? / Can he cross-examine her? / Can we conclude at the Decision Hearing? /
   Warning notice or penal notice?

### Four page templates, used consistently

**Card page** — the workhorse. One question, one screen. Fixed fields in this order:

1. Trigger — when am I looking at this?
2. Can I do this myself? — the PD2C position, or refer to the bench
3. The rule — bare provision, numbered, deep-linking into the Law section
4. Authority *(optional)* — one line per case that bears on the question, linking down to
   its Authority page in the Law section. No case name appears here until its
   knowledge-base entry exists and is verified.
5. What I say to the bench — the actual advice formulation, visually distinct from
   everything else on the page because it's the only text I would ever say out loud
6. Traps — two or three things that go wrong
7. Practice *(optional)* — bench-craft that is guidance, not law: sequencing, what to check
   before the bench retires. Visually distinct from "The rule" so guidance is never
   mistaken for authority; cite the source where quotable, gap-mark where not.
8. Last checked — a date, plus a stable card ID

**Reference page** — the Law section. Longer and scrollable, with anchored headings so cards
can link to a specific provision rather than the top of the page. Case law uses a compact
variant of this template, the **Authority page**: neutral citation, what the case decides in
one sentence, the passage that matters quoted verbatim by paragraph number, and which cards
point at it. Every provision or authority shows the `current_through` date of its
knowledge-base entry inline.

**Template page** — reasons scaffolds. Copy-to-clipboard button. Prompts must render
obviously differently from sayable text so I can't read an instruction out loud by accident.

**Order page** — stored order wording. Copy button, plus a "must-haves" strip.

### Section contents

- **Law** — thin reference layer, written last, containing only what the working cards point
  to. PD2C as modified is the anchor page. Also holds the Authority pages (case law) and a
  "Role and authority" page setting out the statutory basis of the legal adviser role
  itself — the delegation chain (statute → rules → PD2C as modified) — every element of
  which enters via the knowledge base, gap-marked until verified.
- **Gatekeeping** — common problem and its solution. MIAM exemption not validly claimed
  (r.3.10, and the inquiry must happen at allocation), C1A allegations and how PD12J
  operates as rewritten for Pathfinder, urgent and without-notice applications, allocation
  and jurisdiction.
- **Pre-court** — bundle checks under PD27A as modified (the Child Impact Report is a
  specified item at para 7.3) and briefing the bench. Organise the pages as Stage 1,
  Stage 2 — Decision Hearing, Review, and Enforcement. Build the briefing note around one
  question: is this case safe to conclude at the Decision Hearing, and if not, why not?
- **In court** — issues arising, plus reasons scaffolds. Priority scaffolds: departing from
  the Child Impact Report recommendation, findings of fact, interim arrangements, refusing
  an adjournment, s.91(14), enforcement and reasonable excuse. Also one **running order**
  per hearing type (Gatekeeping/allocation, Stage 1 directions, Stage 2 Decision Hearing,
  Review, Enforcement) — a sequenced checklist on the Template page type: open, parties and
  representation, Flags check, issues, evidence, decision, pronouncement, warning-notice
  explanation, order check before the parties leave. Prompts and structure, never a script.
- **Orders** — stored wording. Every child arrangements order and every variation must carry
  a s.11I warning notice; hold the line clearly between that and a discretionary penal
  notice under Part 37.
- **Flags** — a single standing sheet cross-referenced from Gatekeeping and Pre-court:
  vulnerability and participation directions under Part 3A and PD3AA, the prohibition on
  cross-examination by an alleged perpetrator and QLR appointment, litigants in person,
  interpreters, capacity and Part 15.

## Rules for the build

- Every card gets a stable ID used in its anchor, so I can reference it and it survives me
  reorganising the navigation.
- Cards link down into the Law section at anchor level. The law is a destination, not an
  entry point.
- Reasons scaffolds are prompts and structure, never ready-made prose. Templates adopted
  wholesale produce appealable reasons — build in that friction deliberately.
- Clean, plain, high-contrast, fast. This gets read under time pressure. No decorative
  styling.
- Courtroom ergonomics, v1: `/` focuses the search box and Escape clears it; sticky top
  nav; large touch targets (court laptops and tablets); a print stylesheet (cards print
  one per page, no nav); a font-size control. The homepage shows a gap counter and the
  oldest `current_through` date on the site, so staleness and unfinished verification are
  visible at a glance. Deferred to v2: a localStorage hearing-notes scratchpad and a
  pinned "hearing mode" checklist.
- Every feature gets a Playwright test in `tests/` (repo-side only, never shipped in the
  HTML file), run with `npx playwright test` before the feature is treated as done. The
  suite must always include: the built file makes zero external requests; every internal
  link and anchor resolves; card IDs are unique; the gap counter matches the content.
- Keep it accurate. If you aren't sure of a rule, provision or modification, say so and
  leave a clearly marked gap rather than guessing. I'll verify against the current rules
  before I rely on any of it.

## How to start

Build the skeleton first: navigation, homepage launcher, the four page templates, and two or
three fully populated example cards so I can see the pattern. Leave the rest as empty cards
with headings in place. I'll fill in the content myself. Ask me anything you need to know
before you start.

---

# Sourcing the law

The build rule above — leave a marked gap rather than guess — is the hard constraint on this
project. These are the working rules that implement it.

## Never fabricate a provision

- Do not invent or approximate rule numbers, paragraph numbers, section numbers, case names,
  citations, or quotations.
- Do not reconstruct the text of a rule, practice direction, or statute from memory and
  present it as the provision. Getting PD2C's modified list wrong is worse than leaving it
  blank, because a blank gets checked and a plausible error does not.
- Where a provision is needed but unverified, emit the card or heading with an explicit,
  visible gap marker rather than filler. A gap is a task; a guess is a defect.
- "I could not verify this" is a correct and useful answer.

## The knowledge base is the source of record

[`knowledge-base/`](knowledge-base/) holds cited source material, one provision per entry,
copied verbatim from its official publisher with retrieval date and currency recorded.
Entries all live in [`knowledge-base/sources/`](knowledge-base/sources/) — there are no
subfolders, and `doc_type` does the classifying. See its
[README](knowledge-base/README.md) and [`schema.md`](knowledge-base/schema.md).

- Content for the **Law** section should come from knowledge-base entries, not from recall.
  Where an entry exists, the Law page reproduces its verbatim text and cites it.
- Check an entry's `status` and `current_through` before relying on it. Pathfinder is a pilot
  and its instruments change; an entry that was right last year may not be right now.
- Where the knowledge base is silent, say so and leave the gap. Then, if useful, add the
  provision as a knowledge-base entry via
  [`CONTRIBUTING.md`](knowledge-base/CONTRIBUTING.md) — that is how the gap closes.
- Validate after any knowledge-base change:

  ```bash
  python3 tools/validate_kb.py
  ```

## Case law

- Authorities enter the same way as provisions: a knowledge-base entry (`doc_type: case`)
  sourced from the National Archives Find Case Law service or BAILII, with the neutral
  citation, the licence terms, and the quoted passage recorded verbatim by paragraph
  number. I verify each entry before it is relied on.
- Until that entry exists and is verified, cards carry a `[[GAP: authority — …]]` marker.
  A case name suggested from memory is a *candidate for verification*, never content.

## Raw PDFs in sources/

The raw PDFs I upload to `knowledge-base/sources/` are inputs to the entry-creation
process, not entries. The three "Moudle A/B/C" PDFs are background reading only — their
provenance is unconfirmed, so nothing from them is quoted in the knowledge base or on the
site; they may inform which cards exist, nothing more.

## Scope reminder

Private law only. Nothing here is legal advice; it is a personal working reference that its
author verifies against the current rules before relying on it. The "Last checked" field on
every card exists for that reason — populate it honestly, and never with today's date by
default.

---

# Working practices for Claude

- **Agent model tiers:** any subagents run at Opus 5 or lower (Sonnet/Haiku where the task
  is mechanical). Fable 5 for agents only when I explicitly say so.
- **Test before ship:** features are exercised with Playwright before being treated as
  done (see Rules for the build).
- **Publishing:** the GitHub Pages deployment stays as-is for now; whether to keep the
  site on a public URL is deliberately undecided — raise it with me again once the site
  has real content, and don't extend publishing anywhere else meanwhile.
- **Teach as you go:** I'm learning Claude Code through this project. When a session uses
  a feature for the first time (agents, skills, hooks, MCP, plan mode), close with a short
  plain-language note on what it was and why it was the right tool.
