/* Orders — stored wording; hold the line between the mandatory s.11I warning
   notice and a discretionary penal notice under Part 37. */

/* EXAMPLE CARD 3 — fully populated to show the pattern. */
Site.card({
  id: "ord-warning-or-penal",
  section: "orders",
  title: "Warning notice or penal notice?",
  trigger: "<p>An order is being drawn — or a party (usually aggrieved) asks for “a penal " +
    "notice” on a child arrangements order. Which notice does this order carry, and is " +
    "there a choice?</p>",
  myself: "<p>Drawing the order with the correct notice is part of drawing the order. " +
    "Whether to attach a <em>penal</em> notice is a judicial decision for the bench.</p>" +
    Site.GAP("confirm the PD2C position on attaching a penal notice — not verified"),
  rule:
    "<ul>" +
    "<li><strong>Warning notice — not optional.</strong> Per the brief: every child " +
    "arrangements order and every variation must carry a s.11I warning notice — see " +
    "<a href=\"#/law-ca1989/s11i\">CA 1989 s.11I</a>.</li>" +
    "<li><strong>Penal notice — discretionary</strong>, under Part 37 — see " +
    "<a href=\"#/law-part37/penal-notices\">Part 37</a>.</li>" +
    "</ul>" +
    Site.GAP("s.11I verbatim and the Part 37 penal notice provision — not yet in the knowledge base"),
  say:
    "<p>The order will carry the warning notice that the law requires on every child " +
    "arrangements order; that is automatic and not a mark against either party. A penal " +
    "notice is a separate and exceptional step, and would need a decision of the bench " +
    "with reasons.</p>",
  traps: [
    "Varying an existing order and treating the original warning notice as carrying over " +
    "— per the brief, every variation carries the notice too.",
    "Letting “penal notice” be added on request, as if administrative — it is " +
    "discretionary and needs a judicial decision.",
    "Conflating the two notices when explaining the order, so a routine warning notice " +
    "is heard as a threat directed at one party."
  ],
  lastChecked: null
});

/* Order pages — stored wording shells. Wording renders only once verified. */
Site.order({
  id: "ord-cao-wording",
  section: "orders",
  title: "Child arrangements order — wording",
  mustHaves: [
    "s.11I warning notice — on every child arrangements order " +
    "(<a href=\"#/law-ca1989/s11i\">s.11I</a>)",
    "Live-with / spend-time-with terms specific enough to be enforceable",
    "Review listing where directed"
  ],
  lastChecked: null
});
Site.order({
  id: "ord-variation-wording",
  section: "orders",
  title: "Variation of child arrangements order — wording",
  mustHaves: [
    "s.11I warning notice — every variation carries it afresh"
  ],
  lastChecked: null
});
Site.order({
  id: "ord-penal-notice-wording",
  section: "orders",
  title: "Penal notice — wording",
  mustHaves: [
    "A judicial decision of the bench, with reasons, before attachment " +
    "(<a href=\"#/law-part37/penal-notices\">Part 37</a>)"
  ],
  lastChecked: null
});
Site.order({
  id: "ord-enforcement-wording",
  section: "orders",
  title: "Enforcement order — wording",
  lastChecked: null
});
