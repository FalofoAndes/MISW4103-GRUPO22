import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PagesPage } from "../pages/pages-page";

const projectConfig = require("../project-config.json");

test("create no author page", async ({ page }) => {
  const scenarioTag = "page-no-author";

  await page.goto(projectConfig.appsUnderTests[0].baseUrl + "/#/signin");
  const loginPage = new LoginPage(
    page,
    projectConfig.appsUnderTests[0].screenshotsPath,
    scenarioTag
  );
  await loginPage.submitLoginForm(
    projectConfig.credentials.email,
    projectConfig.credentials.password
  );
  await expect(page).toHaveURL(
    projectConfig.appsUnderTests[0].baseUrl + "/#/dashboard"
  );
  const pagesPage = new PagesPage(
    page,
    projectConfig.appsUnderTests[0].screenshotsPath,
    scenarioTag
  );
  const author = await pagesPage.pageNoAuthor();

  expect(author).toBe("");
});
