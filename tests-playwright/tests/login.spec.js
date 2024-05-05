import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

const URL = "https://ghost-ur1e.onrender.com/ghost/#/signin";

test("testing loging", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(
    "https://ghost-ur1e.onrender.com/ghost/#/dashboard"
  );
});

test("testing empty credentials", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm("", "");
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});

test("testing special characteres in credentials", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm("#$%$#%", "Uniandes123456");
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});

test("testing User is not registered", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm("c.riosp@uniandes.edu.co", "Uniandes7890");
  await page.waitForTimeout(2000);
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});

test("testing when Psw is wrong", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes7890"
  );
  await page.waitForTimeout(2000);
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});
