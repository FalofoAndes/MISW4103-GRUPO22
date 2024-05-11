import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PostPage } from "../pages/post-page";

const projectConfig = require("../project-config.json");

test("testing creating new untitled post", async ({ page }) => {
  const scenarioTag = "post-untitled-post";

  // Hace lo mismo par cada app bajo pruebas definida
  const navigationPromises = projectConfig.appsUnderTests.map(async (app) => {
    await page.goto(app.baseUrl + "/signin");
    const loginPage = new LoginPage(page, app.screenshotsPath, scenarioTag);
    await loginPage.submitLoginForm(
      projectConfig.credentials.email,
      projectConfig.credentials.password
    );
    const postPage = new PostPage(page, app.screenshotsPath, scenarioTag);
    const title = await postPage.fillPostUntitled(
      "Nuevo untitle",
      "Sería untitled"
    );

    // Se hace la asserción final
    expect(title).toBe("(Untitled)");
  });
  await Promise.all(navigationPromises);
});

test("testing URL of new post", async ({ page }) => {
  const scenarioTag = "post-url-new-post";

  // Hace lo mismo par cada app bajo pruebas definida
  const navigationPromises = projectConfig.appsUnderTests.map(async (app) => {
    await page.goto(app.baseUrl + "/signin");
    const loginPage = new LoginPage(page, app.screenshotsPath, scenarioTag);
    await loginPage.submitLoginForm(
      projectConfig.credentials.email,
      projectConfig.credentials.password
    );
    const postPage = new PostPage(page, app.screenshotsPath, scenarioTag);
    const title = await postPage.accesingNewPost(
      "Nuevos post con URL",
      "Cuenta con URL"
    );

    // Se hace la asserción final
    expect(title).toBe("Nuevos post con URL");
  });
  await Promise.all(navigationPromises);
});
