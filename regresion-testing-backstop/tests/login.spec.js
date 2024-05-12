import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

const projectConfig = require("../project-config.json");

test.describe("testing empty credentials", () => {
  projectConfig.appsUnderTests.forEach((app) => {
    test(`empty credentials in ${app.version}`, async ({ page }) => {
      const scenarioTag = "login-empty-credentials";

      await page.goto(app.baseUrl);
      const loginPage = new LoginPage(
        page,
        projectConfig.screenshotsPath + app.version,
        scenarioTag
      );
      await loginPage.submitLoginForm("", "");
      await loginPage.checkErrorMessage();
      await loginPage.buttonRetry.innerText("Retry");
    });
  });
});

test.describe("testing user not registered", () => {
  projectConfig.appsUnderTests.forEach((app) => {
    test(`user not registered in ${app.version}`, async ({ page }) => {
      const scenarioTag = "login-user-not-registered";

      await page.goto(app.baseUrl);
      const loginPage = new LoginPage(
        page,
        projectConfig.screenshotsPath + app.version,
        scenarioTag
      );
      await loginPage.submitLoginForm("user@uniandes.edu.co", "Uniandes7890");
      await page.waitForTimeout(2000);

      const errorMessage = await loginPage.checkErrorMessage();
      const matcher = containsAny(
        ["There is no user with that email address.", "Access denied."],
        errorMessage
      );

      expect(matcher).toBe(true);
    });
  });
});

const containsAny = (expectedValues, actualValue) => {
  for (const expectedValue of expectedValues) {
    console.log(
      `expectedValue: ${expectedValue}, actualValue : ${actualValue}`
    );
    if (actualValue.includes(expectedValue)) {
      return true;
    }
  }
  return false;
};
