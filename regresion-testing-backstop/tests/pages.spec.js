import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PagesPage } from "../pages/pages-page";

const projectConfig = require("../project-config.json");

test("create no author page", async ({ page }) => {
  const scenarioTag = "page-no-author";

  // Hace lo mismo par cada app bajo pruebas definida
  const navigationPromises = projectConfig.appsUnderTests.map(async app => {
     await page.goto(app.baseUrl + "/#/signin");
    
    const loginPage = new LoginPage(
      page,
      app.screenshotsPath,
      scenarioTag
    );
    await loginPage.submitLoginForm(
      projectConfig.credentials.email,
      projectConfig.credentials.password
    );
    await expect(page).toHaveURL(
      app.baseUrl + "/#/dashboard"
    );
    const pagesPage = new PagesPage(
      page,
      app.screenshotsPath,
      scenarioTag
    );
    const author = await pagesPage.pageNoAuthor();
  
    expect(author).toBe("");

  });
  await Promise.all(navigationPromises);
});
