import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PostPage } from "../pages/post-page";

const URLinit = "https://ghost-ur1e.onrender.com/ghost/#/signin";
const URLbase = "https://ghost-ur1e.onrender.com/ghost/#";

const CASES = {
  baseUrl : "https://ghost-ur1e.onrender.com/ghost/#",
  screenshotsPath: "../screenshots/ghost-5.14.1"
}

test("testing creating new untitled post", async ({ page }) => {
  await page.goto(CASES.baseUrl);
  const loginPage = new LoginPage(page, CASES.screenshotsPath, "post-untitled-post");
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.fillPostUntitled("Nuevo untitle", "Sería untitled");
});

test("testing URL of new post", async ({ page }) => {
  await page.goto(CASES.baseUrl);
  const loginPage = new LoginPage(page, CASES.screenshotsPath, "post-untitled-post");
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.accesingNewPost("Nuevos post con URL ", "Cuenta con URL");
});

