// Playwright suite for the bench reference site.
// The site is one offline file — every test opens it via file:// exactly as
// the user will in court.
const { test, expect } = require("@playwright/test");
const path = require("path");

const SITE = "file://" + path.resolve(__dirname, "..", "site", "index.html");

async function open(page, hash = "") {
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto(SITE + hash);
  return requests;
}

test("makes zero external requests", async ({ page }) => {
  const requests = await open(page);
  // Exercise navigation too, in case a view lazily fetches something.
  await page.goto(SITE + "#/s/law");
  await page.goto(SITE + "#/gk-refer-up");
  await page.locator(".cardmeta").waitFor();
  for (const url of requests) {
    expect(url.startsWith("file://")).toBeTruthy();
  }
});

test("homepage is a launcher: search, six tiles, six questions", async ({ page }) => {
  await open(page);
  await expect(page.locator("#q")).toBeVisible();
  await expect(page.locator("#tiles a")).toHaveCount(6);
  await expect(page.locator(".qlist a")).toHaveCount(6);
  // A launcher, not a welcome page: no introductory copy before the search box.
  const firstText = await page.locator("#app > *").first().textContent();
  expect(firstText).not.toMatch(/welcome|about this site/i);
});

test("search filters across titles and body text", async ({ page }) => {
  await open(page);
  await page.fill("#q", "penal");
  const results = page.locator("#results a");
  await expect(results.first()).toBeVisible();
  const titles = await results.allTextContents();
  expect(titles.join(" ")).toContain("Warning notice or penal notice?");
  // Body-text match: "muscle memory" style check on a phrase not in any title.
  await page.fill("#q", "gatekeeper");
  await expect(page.locator("#results a").first()).toBeVisible();
  // No matches renders a message, not silence.
  await page.fill("#q", "zzzznotfound");
  await expect(page.locator("#results li")).toHaveText(/No matches/);
});

test("slash focuses search from anywhere; Escape clears it", async ({ page }) => {
  await open(page, "#/s/orders");
  await page.keyboard.press("/");
  await expect(page).toHaveURL(/#\/$/);
  await expect(page.locator("#q")).toBeFocused();
  await page.keyboard.type("penal");
  await expect(page.locator("#results a").first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#q")).toHaveValue("");
});

test("every registered page renders as a full page", async ({ page }) => {
  await open(page);
  const ids = await page.evaluate(() => window.SITE._order);
  expect(ids.length).toBeGreaterThan(20);
  for (const id of ids) {
    await page.goto(SITE + "#/" + id);
    await expect(page.locator("h1"), `page ${id}`).not.toHaveText(/Not found/);
    await expect(page.locator(".cardmeta"), `page ${id} meta`).toBeVisible();
  }
});

test("page IDs are unique and stable-format", async ({ page }) => {
  await open(page);
  const ids = await page.evaluate(() => window.SITE._order);
  expect(new Set(ids).size).toBe(ids.length);
  for (const id of ids) {
    expect(id, `id format: ${id}`).toMatch(/^[a-z0-9]+(-[a-z0-9()]+)*$/);
  }
});

test("all internal links and anchors resolve", async ({ page }) => {
  await open(page);
  const problems = await page.evaluate(() => {
    const S = window.SITE;
    const bad = [];
    for (const id of S._order) {
      const html = S._pageBody(S._pages[id]);
      const hrefs = [...html.matchAll(/href="#\/([^"]+)"/g)].map((m) => m[1]);
      for (const h of hrefs) {
        const [pid, anchor] = h.split("/");
        const target = S._pages[pid];
        if (!target) { bad.push(`${id} -> missing page ${pid}`); continue; }
        if (anchor) {
          const anchors = (target.provisions || []).map((p) => p.anchor);
          if (!anchors.includes(anchor)) bad.push(`${id} -> ${pid} missing anchor ${anchor}`);
        }
      }
    }
    // Homepage questions must land on real pages too.
    for (const q of S._questions) {
      if (!S._pages[q.page]) bad.push(`question "${q.text}" -> missing page ${q.page}`);
    }
    return bad;
  });
  expect(problems).toEqual([]);
});

test("law anchors deep-link to the provision", async ({ page }) => {
  await open(page, "#/law-ca1989/s11i");
  const el = page.locator("#s11i");
  await expect(el).toBeVisible();
  await expect(el).toHaveText(/s\.11I/);
});

test("gap counter matches the number of [[GAP: tokens", async ({ page }) => {
  await open(page);
  const { counted, rendered } = await page.evaluate(() => {
    const S = window.SITE;
    let n = 0;
    for (const id of S._order) {
      n += (S._pageBody(S._pages[id]).match(/\[\[GAP:/g) || []).length;
    }
    return { counted: n, rendered: S._gapCount() };
  });
  expect(rendered).toBe(counted);
  expect(counted).toBeGreaterThan(0);
  await expect(page.locator("#gapchip")).toHaveText(`${counted} gaps`);
  // And the gaps listing page reflects it.
  await page.goto(SITE + "#/gaps");
  await expect(page.locator(".gaplist li").first()).toBeVisible();
});

test("a gap marker never sits inside a SAY panel", async ({ page }) => {
  await open(page);
  const offenders = await page.evaluate(() => {
    const S = window.SITE;
    const bad = [];
    for (const id of S._order) {
      const html = S._pageBody(S._pages[id]);
      const sayMatch = html.match(/<div class="say">[\s\S]*?<\/div>/g) || [];
      for (const block of sayMatch) {
        if (block.includes("[[GAP:")) bad.push(id);
      }
    }
    return bad;
  });
  expect(offenders).toEqual([]);
});

test("copy button copies the scaffold structure", async ({ page }) => {
  await page.addInitScript(() => {
    window.__copied = null;
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: (t) => { window.__copied = t; return Promise.resolve(); } }
    });
  });
  await open(page, "#/sc-departing-cir");
  await page.click(".copybtn");
  const copied = await page.evaluate(() => window.__copied);
  expect(copied).toContain("recommendation being departed from");
  await expect(page.locator(".copied")).toBeVisible();
});

test("scaffold prompts render as prompts, visually distinct from SAY", async ({ page }) => {
  await open(page, "#/sc-departing-cir");
  await expect(page.locator(".prompt").first()).toBeVisible();
  await expect(page.locator(".prompt .prompt-tag").first()).toHaveText("PROMPT");
  // No SAY panel on a scaffold page — prompts must never be sayable.
  await expect(page.locator(".say")).toHaveCount(0);
});

test("SAY drafts are visibly marked as drafts until checked", async ({ page }) => {
  await open(page, "#/gk-refer-up");
  await expect(page.locator(".say .say-tag")).toHaveText("SAY");
  await expect(page.locator(".draft-tag")).toHaveText(/DRAFT/);
  await expect(page.locator(".cardmeta")).toContainText("not yet checked");
});

test("section page uses accordion; card opens in place and as full page", async ({ page }) => {
  await open(page, "#/s/gatekeeping");
  const acc = page.locator("details.acc");
  await expect(acc.first()).toBeVisible();
  await acc.first().locator("summary").click();
  await expect(acc.first().locator(".acc-body")).toBeVisible();
  await acc.first().locator(".openfull").click();
  await expect(page.locator("h1")).toHaveText(/./);
  await expect(page.locator(".backbtn")).toBeVisible();
});

test("font size control persists", async ({ page }) => {
  await open(page);
  await page.click("#font-up");
  await page.click("#font-up");
  const size = await page.evaluate(() => document.documentElement.style.fontSize);
  expect(size).toBe("18px");
  await page.reload();
  const size2 = await page.evaluate(() => document.documentElement.style.fontSize);
  expect(size2).toBe("18px");
});

test("print stylesheet hides chrome", async ({ page }) => {
  await open(page, "#/gk-refer-up");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".topbar")).toBeHidden();
  await expect(page.locator(".say")).toBeVisible();
});

test("opens fast from file://", async ({ page }) => {
  const t0 = Date.now();
  await page.goto(SITE, { waitUntil: "load" });
  await page.locator("#q").waitFor();
  expect(Date.now() - t0).toBeLessThan(2000);
});
