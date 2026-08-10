/* Gatekeeping — common problem and its solution. */

/* EXAMPLE CARD 1 — fully populated to show the pattern.
   Substantive statements come from the project brief and are flagged for
   verification against the knowledge base; nothing is reconstructed from memory. */
Site.card({
  id: "gk-refer-up",
  section: "gatekeeping",
  title: "Can I do this myself, or refer up?",
  trigger:
    "<p>An application or case management step lands in front of me with no judge in the " +
    "room. Before anything else: is this within my delegated functions, or does it go to " +
    "the bench or a judge?</p>",
  myself:
    "<p>This card <em>is</em> the PD2C question. Working summary per the project brief — " +
    "verify against the PD2C / PD36Z knowledge-base entries before relying on it:</p>" +
    "<ul>" +
    "<li>Where the case is <strong>unallocated, allocated to lay justices, or a higher " +
    "judge says I may</strong>: PD12B (Pilot) paras 9.3, 13.2–13.4, 13.6, 13.7, 14.4, " +
    "15.1, 16.1 and 17.1(c) — see <a href=\"#/law-pd2c-modified/functions-lay\">PD2C as " +
    "modified</a>.</li>" +
    "<li>Where I am acting as <strong>Gatekeeper</strong>: paras 9.1, 9.2, 9.4, 14.1 and " +
    "17.1(a) — see <a href=\"#/law-pd2c-modified/functions-gatekeeper\">PD2C as " +
    "modified</a>.</li>" +
    "<li>Anything outside those lists is for the bench or a judge.</li>" +
    "</ul>" +
    Site.GAP("PD2C as modified by PD36Z — paragraph lists above are per the project brief; verbatim text not yet in the knowledge base"),
  rule:
    "<p>PD2C, as modified by PD36Z for Pathfinder courts — " +
    "<a href=\"#/law-pd2c-modified\">the anchor page</a>. Note also the modified " +
    "<a href=\"#/law-pd2c-modified/r3-4-2b\">r.3.4(2)(b)</a> (non-court dispute resolution " +
    "adjournment power runs from receipt of the Child Impact Report) and " +
    "<a href=\"#/law-pd2c-modified/r25-6\">r.25.6</a> (expert timing).</p>",
  say:
    "<p>This is a function I may exercise myself under Practice Direction 2C as modified " +
    "by PD36Z. I will deal with it and record it in the order.</p>" +
    "<p>— or —</p>" +
    "<p>This falls outside my delegated functions under Practice Direction 2C; it needs a " +
    "decision of the bench.</p>",
  traps: [
    "Using the unmodified PD2C list: in a Pathfinder court the PD36Z modification applies, " +
    "and PD36Z disapplies para 6.1 of PD36ZE — so the PD36ZE version of PD2C does " +
    "<strong>not</strong> apply either (per the brief; verify).",
    "Exercising a Gatekeeper-only function when not sitting as Gatekeeper — the two " +
    "paragraph lists are different.",
    "Case allocated above lay justices with no direction permitting me to act: the " +
    "“unallocated / lay justices” limb no longer covers it."
  ],
  practice:
    "<p>Fix which capacity you are acting in <em>before</em> opening the paragraph list: " +
    "gatekeeper, court associate to a lay bench, or neither. The list you may use follows " +
    "from that, not from the task in front of you.</p>",
  lastChecked: null
});

/* EXAMPLE CARD 2 — fully populated to show the pattern. */
Site.card({
  id: "gk-miam-validity",
  section: "gatekeeping",
  title: "Was the MIAM exemption validly claimed?",
  trigger:
    "<p>A C100 arrives claiming a MIAM exemption. The claim has to be tested at " +
    "gatekeeping — per the brief, the inquiry happens at allocation, not left to the " +
    "first hearing.</p>",
  myself:
    Site.GAP("whether the MIAM validity inquiry sits within the Gatekeeper functions delegated by PD2C as modified (paras 9.1, 9.2, 9.4, 14.1, 17.1(a)) — verify against the PD2C entry"),
  rule:
    "<p>FPR r.3.10 — see <a href=\"#/law-fpr-part3/r3-10\">Part 3</a>. " +
    "Exemption grounds and their evidence requirements: " +
    "<a href=\"#/law-fpr-part3/miam-exemptions\">Part 3, MIAM exemptions</a>.</p>" +
    Site.GAP("r.3.10 verbatim text and the current exemption grounds — not yet in the knowledge base"),
  say:
    "<p>The application claims a MIAM exemption on the ground of [ground]. On the papers " +
    "that exemption [is validly claimed / is not validly claimed, because …]. If it is " +
    "not validly claimed, the court may direct the applicant to attend a MIAM before the " +
    "application proceeds.</p>",
  traps: [
    "Exemption box ticked with no evidence or particulars at all — a bare tick is a claim, " +
    "not a valid claim.",
    "Treating an allegation of domestic abuse as automatically exempting without checking " +
    "which evidence ground is actually relied on.",
    "Leaving the inquiry to the first hearing: by then weeks are lost if the exemption " +
    "fails. The brief's rule is that this is an allocation-stage check."
  ],
  lastChecked: null
});

/* Shells — headings in place, everything else renders as gaps. */
Site.card({
  id: "gk-c1a-pd12j",
  section: "gatekeeping",
  title: "C1A allegations — how PD12J operates in Pathfinder",
  trigger: "<p>The C1A (or the application itself) raises allegations of domestic abuse " +
    "and I need to know what PD12J, as rewritten for Pathfinder, requires at this stage.</p>",
  rule: "<p>See <a href=\"#/law-pd12j\">PD12J (Pathfinder rewrite)</a> and the Stage 1 " +
    "Child Impact Report elements at <a href=\"#/law-pd12b-pilot/stage1\">PD12B (Pilot)</a>.</p>" +
    Site.GAP("PD12J as it operates in Pathfinder — not yet in the knowledge base"),
  lastChecked: null
});
Site.card({
  id: "gk-urgent-without-notice",
  section: "gatekeeping",
  title: "Urgent and without-notice applications",
  trigger: "<p>An application is marked urgent, or asks to be heard without notice to the " +
    "respondent.</p>",
  lastChecked: null
});
Site.card({
  id: "gk-allocation-jurisdiction",
  section: "gatekeeping",
  title: "Allocation and jurisdiction",
  trigger: "<p>Where should this case sit — lay justices, district judge, circuit judge — " +
    "and is there a jurisdiction issue (habitual residence, existing orders elsewhere)?</p>",
  lastChecked: null
});
