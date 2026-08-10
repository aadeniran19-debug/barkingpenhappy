/* In court — issues arising, reasons scaffolds, running orders. */

/* ---- Issues arising (cards) ---- */

Site.card({
  id: "ic-fact-finding",
  section: "incourt",
  title: "Do we need a fact-finding hearing?",
  trigger: "<p>Allegations are disputed and someone — a party, the Child Impact Report, " +
    "the bench — has raised whether findings of fact are needed before the case can " +
    "conclude.</p>",
  rule: "<p>See <a href=\"#/law-pd12j/fact-finding\">PD12J — fact-finding</a>.</p>" +
    Site.GAP("PD12J fact-finding criteria as they operate in Pathfinder — not yet in the knowledge base"),
  authority:
    "<p>See <a href=\"#/auth-fact-finding-guidance\">appellate guidance on fact-finding " +
    "and domestic abuse</a> and <a href=\"#/auth-fact-finding-necessity\">on when a " +
    "fact-finding is necessary</a> — both unverified candidates.</p>",
  lastChecked: null
});
Site.card({
  id: "ic-conclude-dh",
  section: "incourt",
  title: "Can we conclude at the Decision Hearing?",
  trigger: "<p>Stage 2, Decision Hearing under way: the Pathfinder aim is a final " +
    "decision wherever possible — but only where it is safe. What has to be true before " +
    "the case can conclude today?</p>",
  rule: "<p>See <a href=\"#/law-pd12b-pilot/stage2\">PD12B (Pilot) — Stage 2</a>.</p>",
  practice: "<p>The pre-court briefing note (<a href=\"#/pc-briefing-note\">is this case " +
    "safe to conclude?</a>) should already answer this — in court, the job is checking " +
    "whether anything has changed since it was written.</p>",
  lastChecked: null
});
Site.card({
  id: "ic-interim-arrangements",
  section: "incourt",
  title: "Interim arrangements",
  trigger: "<p>The case cannot conclude today and someone seeks interim child " +
    "arrangements in the meantime.</p>",
  lastChecked: null
});
Site.card({
  id: "ic-s91-14",
  section: "incourt",
  title: "s.91(14) — barring further applications",
  trigger: "<p>Disposal is in sight and a s.91(14) order is in play — raised by a party, " +
    "the Child Impact Report, or the Stage 1 PD12Q consideration.</p>",
  rule: "<p>See <a href=\"#/law-ca1989/s91-14\">CA 1989 s.91(14)</a> and " +
    "<a href=\"#/law-ca1989/s91a\">s.91A</a>, and <a href=\"#/law-pd12q\">PD12Q</a>.</p>" +
    Site.GAP("s.91(14), s.91A and PD12Q verbatim — not yet in the knowledge base"),
  authority: "<p>See <a href=\"#/auth-s91-14-guidelines\">the s.91(14) guideline " +
    "authority</a> — unverified candidate.</p>",
  lastChecked: null
});

/* ---- Reasons scaffolds (Template pages) ----
   Prompts and structure, never ready-made prose. */

Site.scaffold({
  id: "sc-departing-cir",
  section: "incourt",
  title: "Scaffold — departing from the Child Impact Report recommendation",
  intro: "Use when the bench's decision departs, in any respect, from the Child Impact " +
    "Report's recommendation. The structure forces the departure to be reasoned, not " +
    "asserted.",
  steps: [
    "State the recommendation being departed from, with its page/paragraph reference in the Child Impact Report.",
    "Identify each specific respect in which the decision departs from it.",
    "For each departure: what evidence did the bench prefer, and why?",
    "Address the welfare analysis: which welfare considerations drove the departure?",
    "Record expressly that the recommendation was considered and why it was not followed on those points.",
    "Check: would a reader understand from the reasons alone why the report was not followed?"
  ],
  lastChecked: null
});
Site.scaffold({
  id: "sc-findings-of-fact",
  section: "incourt",
  title: "Scaffold — findings of fact",
  lastChecked: null
});
Site.scaffold({
  id: "sc-interim-arrangements",
  section: "incourt",
  title: "Scaffold — interim arrangements",
  lastChecked: null
});
Site.scaffold({
  id: "sc-refusing-adjournment",
  section: "incourt",
  title: "Scaffold — refusing an adjournment",
  lastChecked: null
});
Site.scaffold({
  id: "sc-s91-14",
  section: "incourt",
  title: "Scaffold — s.91(14)",
  lastChecked: null
});
Site.scaffold({
  id: "sc-enforcement-excuse",
  section: "incourt",
  title: "Scaffold — enforcement and reasonable excuse",
  lastChecked: null
});

/* ---- Running orders (Template pages) — one per hearing type.
   Sequenced checklists per the brief: prompts, never a script. */

Site.scaffold({
  id: "ro-stage2-dh",
  section: "incourt",
  title: "Running order — Stage 2 Decision Hearing",
  intro: "The sequence for the hearing itself. Prompts to keep the hearing moving and " +
    "complete — not words to be said.",
  steps: [
    "Open: parties present, representation, interpreter needs met?",
    "Flags check: anything on the <a href=\"#/flags-sheet\">Flags sheet</a> live in this case — participation directions, cross-examination prohibition, capacity?",
    "Confirm what the hearing is listed to decide, and whether anything has changed since the briefing note.",
    "Issues: narrow to what is actually in dispute today.",
    "Evidence and submissions on the disputed issues only.",
    "Decision: bench retires — check they take the welfare framework and the Child Impact Report with them.",
    "Pronouncement: reasons delivered; if departing from the Child Impact Report recommendation, the <a href=\"#/sc-departing-cir\">departure scaffold</a> is engaged.",
    "Warning notice: s.11I explanation given in plain words for any child arrangements order — see <a href=\"#/ord-warning-or-penal\">warning v penal notice</a>.",
    "Order check before parties leave: terms, dates, recitals, service — and whether a Review listing is needed.",
    "s.91(14): was the PD12Q consideration addressed on disposal?"
  ],
  lastChecked: null
});
Site.scaffold({
  id: "ro-gatekeeping",
  section: "incourt",
  title: "Running order — Gatekeeping / allocation",
  lastChecked: null
});
Site.scaffold({
  id: "ro-stage1",
  section: "incourt",
  title: "Running order — Stage 1 directions",
  lastChecked: null
});
Site.scaffold({
  id: "ro-review",
  section: "incourt",
  title: "Running order — Review hearing",
  lastChecked: null
});
Site.scaffold({
  id: "ro-enforcement",
  section: "incourt",
  title: "Running order — Enforcement hearing",
  lastChecked: null
});
