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
server or installation. One file only — no build step, no dependencies, no external
requests.

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
4. What I say to the bench — the actual advice formulation, visually distinct from
   everything else on the page because it's the only text I would ever say out loud
5. Traps — two or three things that go wrong
6. Last checked — a date, plus a stable card ID

**Reference page** — the Law section. Longer and scrollable, with anchored headings so cards
can link to a specific provision rather than the top of the page.

**Template page** — reasons scaffolds. Copy-to-clipboard button. Prompts must render
obviously differently from sayable text so I can't read an instruction out loud by accident.

**Order page** — stored order wording. Copy button, plus a "must-haves" strip.

### Section contents

- **Law** — thin reference layer, written last, containing only what the working cards point
  to. PD2C as modified is the anchor page.
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
  an adjournment, s.91(14), enforcement and reasonable excuse.
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

## Scope reminder

Private law only. Nothing here is legal advice; it is a personal working reference that its
author verifies against the current rules before relying on it. The "Last checked" field on
every card exists for that reason — populate it honestly, and never with today's date by
default.
