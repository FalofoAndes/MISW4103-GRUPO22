const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const { saveAccessibilityScreenshot } = require("../page-objects/utilities.js"); // Importar la función
const { LoginPage } = require("../page-objects/login.js");
test.describe("dashboard", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login();
    await page.locator("h2", { hasText: "Dashboard" }).isEnabled();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Si hay violaciones, tomamos capturas de pantalla
    if (accessibilityScanResults.violations.length > 0) {
      for (const [
        index,
        violation,
      ] of accessibilityScanResults.violations.entries()) {
      
        
        await saveAccessibilityScreenshot(page, violation, index, "dashboard");
      }
    }
    
  });
});