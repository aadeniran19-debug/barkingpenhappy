// Repo-side test harness config. The site itself has no build step to use and
// no dependencies — this exists only to test it.
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    browserName: "chromium"
  }
});
