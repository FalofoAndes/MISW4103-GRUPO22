import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PostPage } from "../pages/post-page";

const CASES = {
  baseUrl: "https://ghost-ur1e.onrender.com/ghost/#",
  screenshotsPath: "./screenshots/ghost-5.14.1",
};

test("testing creating new untitled post", async ({ page }) => {
  await page.goto(CASES.baseUrl + "/signin");
  const loginPage = new LoginPage(
    page,
    CASES.screenshotsPath,
    "post-untitled-post"
  );
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(CASES.baseUrl + "/dashboard");
  const postPage = new PostPage(
    page,
    CASES.screenshotsPath,
    "post-untitled-post"
  );
  const title = await postPage.fillPostUntitled(
    "Nuevo untitle",
    "Sería untitled"
  );

  // Se hace la asserción final
  expect(title).toBe("(Untitled)");
});

test("testing URL of new post", async ({ page }) => {
  await page.goto(CASES.baseUrl + "/signin");
  const loginPage = new LoginPage(
    page,
    CASES.screenshotsPath,
    "post-url-new-post"
  );
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(CASES.baseUrl + "/dashboard");
  const postPage = new PostPage(
    page,
    CASES.screenshotsPath,
    "post-url-new-post"
  );
  const title = await postPage.accesingNewPost(
    "Nuevos post con URL",
    "Cuenta con URL"
  );

  // Se hace la asserción final
  expect(title).toBe("Nuevos post con URL");
});
