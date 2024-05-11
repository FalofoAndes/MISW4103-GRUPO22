import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

const projectConfig = require("../project-config.json");

test("testing empty credentials", async ({ page }) => {
  const scenarioTag = "login-empty-credentials";

  // Hace lo mismo par cada app bajo pruebas definida
  const navigationPromises = projectConfig.appsUnderTests.map(async (app) => {
    await page.goto(app.baseUrl);
    const loginPage = new LoginPage(page, app.screenshotsPath, scenarioTag);
    await loginPage.submitLoginForm("", "");
    await loginPage.checkErrorMessage();
    await loginPage.buttonRetry.innerText("Retry");
  });
  await Promise.all(navigationPromises);
});

test("testing user is not registered", async ({ page }) => {
  const scenarioTag = "login-user-not-registered";

  // Hace lo mismo par cada app bajo pruebas definida
  const navigationPromises = projectConfig.appsUnderTests.map(async (app) => {
    await page.goto(app.baseUrl);
    const loginPage = new LoginPage(
      page,
      app.screenshotsPath,
      scenarioTag
    );
    await loginPage.submitLoginForm("user@uniandes.edu.co", "Uniandes7890");
    await page.waitForTimeout(2000);
    await loginPage.checkErrorMessage();
    await loginPage.buttonRetry.innerText("Retry");
  });
  await Promise.all(navigationPromises);
});
