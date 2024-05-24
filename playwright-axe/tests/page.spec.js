const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const { saveAccessibilityScreenshot } = require("../page-objects/utilities.js"); // Importar la función
const { LoginPage } = require("../page-objects/login.js");
test.describe("page", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.goto("https://ghost-ur1e.onrender.com/ghost/#/pages");
    await page.locator("h2", { hasText: "Pages" }).isEnabled();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Si hay violaciones, tomamos capturas de pantalla
    if (accessibilityScanResults.violations.length > 0) {
      for (const [
        index,
        violation,
      ] of accessibilityScanResults.violations.entries()) {
        await saveAccessibilityScreenshot(page, violation, index, "page");
      }
    }

  });
});