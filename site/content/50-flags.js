/* Flags — a single standing sheet, cross-referenced from Gatekeeping and
   Pre-court, plus the cross-examination card the homepage question lands on. */

Site.law({
  id: "flags-sheet",
  section: "flags",
  title: "Flags — standing sheet",
  intro: "One sheet, checked in every case: vulnerability, cross-examination, litigants " +
    "in person, interpreters, capacity. Cross-referenced from Gatekeeping and Pre-court.",
  provisions: [
    { anchor: "vulnerability-part3a",
      heading: "Vulnerability and participation directions — Part 3A and PD3AA",
      cite: null, currentThrough: null, body: null },
    { anchor: "cross-exam-qlr",
      heading: "Prohibition on cross-examination by an alleged perpetrator; QLR appointment",
      cite: null, currentThrough: null, body: null },
    { anchor: "lip",
      heading: "Litigants in person",
      cite: null, currentThrough: null, body: null },
    { anchor: "interpreters",
      heading: "Interpreters",
      cite: null, currentThrough: null, body: null },
    { anchor: "capacity-part15",
      heading: "Capacity and protected parties — Part 15",
      cite: null, currentThrough: null, body: null }
  ],
  lastChecked: null
});

Site.card({
  id: "fl-cross-exam",
  section: "flags",
  title: "Can he cross-examine her?",
  trigger: "<p>A party — typically unrepresented — proposes to cross-examine a witness " +
    "who is an alleged victim of their abuse, or the hearing plan assumes it will " +
    "happen.</p>",
  rule: "<p>See the <a href=\"#/flags-sheet/cross-exam-qlr\">Flags sheet</a> and " +
    "<a href=\"#/law-cross-exam\">the statutory prohibition and QLR framework</a>.</p>" +
    Site.GAP("the statutory prohibition on cross-examination in person and the QLR appointment provisions — identify the provisions and enter them in the knowledge base"),
  lastChecked: null
});
