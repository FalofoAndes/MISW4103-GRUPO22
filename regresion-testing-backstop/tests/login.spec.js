import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

const CASES = {
  baseUrl : "https://ghost-ur1e.onrender.com/ghost/#/signin",
  screenshotsPath: "../screenshots/ghost-5.14.1"
}

test("testing empty credentials", async ({ page }) => {
  await page.goto(CASES.baseUrl);
  const loginPage = new LoginPage(page, CASES.screenshotsPath, "login-empty-credentials");
  await loginPage.submitLoginForm("", "");
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});

test("testing user is not registered", async ({ page }) => {
  await page.goto(CASES.baseUrl);
  const loginPage = new LoginPage(page, CASES.screenshotsPath, "login-user-not-registered");
  await loginPage.submitLoginForm("user@uniandes.edu.co", "Uniandes7890");
  await page.waitForTimeout(2000);
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});
