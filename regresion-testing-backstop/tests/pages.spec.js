import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PagesPage } from "../pages/pages-page";

const projectConfig = require("../project-config.json");

test.describe("create no author page", () => {
  projectConfig.appsUnderTests.forEach((app) => {

    const appVersion = app.version; 
    test(`no author page in ${app.version}`, async ({ page }) => {
      const scenarioTag = "page-no-author";

      await page.goto(app.baseUrl + "/#/signin");

      const loginPage = new LoginPage(
        page,
        projectConfig.screenshotsPath + app.version,
        scenarioTag
      );
      await loginPage.submitLoginForm(
        projectConfig.credentials.email,
        projectConfig.credentials.password
      );
      const pagesPage = new PagesPage(
        page,
        projectConfig.screenshotsPath + app.version,
        scenarioTag
      );
      const author = await pagesPage.pageNoAuthor(appVersion);

      expect(author).toBe("");
    });
  });
});
