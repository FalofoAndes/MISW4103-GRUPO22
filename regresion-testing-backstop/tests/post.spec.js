import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PostPage } from "../pages/post-page";

const projectConfig = require("../project-config.json");

test.describe("testing creating new untitled post", () => {
  projectConfig.appsUnderTests.forEach((app) => {
    const appVersion = app.version; 

    test(`new untitled post in ${app.version}`, async ({ page }) => {
      const scenarioTag = "post-untitled-post";
      

      await page.goto(app.baseUrl + "/signin");
      const loginPage = new LoginPage(
        page,
        projectConfig.screenshotsPath + app.version,
        scenarioTag
      );
      await loginPage.submitLoginForm(
        projectConfig.credentials.email,
        projectConfig.credentials.password
      );
      const postPage = new PostPage(
        page,
        projectConfig.screenshotsPath + app.version,
        scenarioTag
      );
      const title = await postPage.fillPostUntitled(
        "Nuevo untitle",
        "Sería untitled",
        appVersion
      );

      // Se hace la asserción final
      expect(title).toBe("(Untitled)");
    });
  });
});

test.describe("testing URL of new post", () => {
  projectConfig.appsUnderTests.forEach((app) => {
    test(`URL of new post in ${app.version}`, async ({ page }) => {
      const scenarioTag = "post-url-new-post";

      await page.goto(app.baseUrl + "/signin");
      const loginPage = new LoginPage(
        page,
        projectConfig.screenshotsPath + app.version,
        scenarioTag
      );
      await loginPage.submitLoginForm(
        projectConfig.credentials.email,
        projectConfig.credentials.password
      );
      const postPage = new PostPage(
        page,
        projectConfig.screenshotsPath + app.version,
        scenarioTag
      );
      const title = await postPage.accesingNewPost(
        "Nuevos post con URL",
        "Cuenta con URL",
        app.version
      );

      // Se hace la asserción final
      expect(title).toBe("Nuevos post con URL");
    });
  });
});
