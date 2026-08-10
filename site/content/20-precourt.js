/* Pre-court — bundle checks and briefing the bench, organised by stage. */

Site.card({
  id: "pc-stage1",
  section: "precourt",
  title: "Stage 1 — Information Gathering and Assessment",
  trigger: "<p>Preparing for a case in Stage 1: Child Impact Report in progress over " +
    "roughly six weeks — safeguarding checks, party engagement, engagement with the " +
    "child, DASH risk assessment where domestic abuse features, and consideration of " +
    "whether s.91(14) would be appropriate on disposal (per PD12Q).</p>",
  rule: "<p>See <a href=\"#/law-pd12b-pilot/stage1\">PD12B (Pilot) — Stage 1</a>.</p>" +
    Site.GAP("Stage 1 requirements verbatim — not yet in the knowledge base"),
  lastChecked: null
});
Site.card({
  id: "pc-stage2-decision",
  section: "precourt",
  title: "Stage 2 — Interventions and/or Decision Hearing",
  trigger: "<p>Preparing for the Decision Hearing at around week 7 — final decision " +
    "wherever possible. It is a Decision Hearing, never a “final hearing”.</p>",
  rule: "<p>See <a href=\"#/law-pd12b-pilot/stage2\">PD12B (Pilot) — Stage 2</a> and the " +
    "terminology modification at <a href=\"#/law-pd27a/decision-hearing-terminology\">rr.12.13, " +
    "12.15 and PD27A</a>.</p>",
  lastChecked: null
});
Site.card({
  id: "pc-review",
  section: "precourt",
  title: "Review (3–12 months)",
  trigger: "<p>Preparing for a Review: the question is whether the child's welfare needs " +
    "are being met in practice — not compliance with the order.</p>",
  rule: "<p>See <a href=\"#/law-pd12b-pilot/review\">PD12B (Pilot) — Review</a>.</p>",
  lastChecked: null
});
Site.card({
  id: "pc-enforcement",
  section: "precourt",
  title: "Enforcement applications",
  trigger: "<p>An enforcement application arrives — it has its own route under PD12B " +
    "(Pilot) paras 17.1–17.4, not the general case pathway.</p>",
  rule: "<p>See <a href=\"#/law-pd12b-pilot/enforcement\">PD12B (Pilot) — Enforcement</a>.</p>" +
    Site.GAP("paras 17.1–17.4 verbatim — not yet in the knowledge base"),
  lastChecked: null
});
Site.card({
  id: "pc-bundle-pd27a",
  section: "precourt",
  title: "Bundle check — PD27A as modified",
  trigger: "<p>Checking the bundle before a hearing. The Child Impact Report is a " +
    "specified item (per the brief, PD27A para 7.3 as modified).</p>",
  rule: "<p>See <a href=\"#/law-pd27a/para-7-3\">PD27A as modified — para 7.3</a>.</p>" +
    Site.GAP("PD27A as modified — bundle contents verbatim — not yet in the knowledge base"),
  lastChecked: null
});

/* Briefing note — a scaffold, built around one question. */
Site.scaffold({
  id: "pc-briefing-note",
  section: "precourt",
  title: "Briefing the bench — is this case safe to conclude at the Decision Hearing?",
  intro: "One question drives the whole note: <strong>is this case safe to conclude at " +
    "the Decision Hearing, and if not, why not?</strong> Everything else is supporting " +
    "material for that answer.",
  steps: [
    "State the stage the case is at and what the hearing is listed for.",
    "Summarise the Child Impact Report's recommendation in one sentence, with a page/paragraph reference.",
    "Identify anything unresolved that blocks conclusion: safeguarding, disputed facts needing findings, missing report elements, participation issues from the <a href=\"#/flags-sheet\">Flags sheet</a>.",
    "If not safe to conclude: say exactly what is missing, who provides it, and by when.",
    "Note any s.91(14) consideration flagged during Stage 1 (per PD12Q).",
    "List the orders realistically in play, and whether each needs the s.11I warning notice explained."
  ],
  lastChecked: null
});
