import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import {faker} from '@faker-js/faker';
import { userInfo } from "os";

const URL = "https://ghost-ur1e.onrender.com/ghost/#/signin";

function generateSpecialCharacters(length) {
  const specialCharacters = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
  }
  return result;
}

test("faker_testing loging failed", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  const user = faker.internet.email();
  const password = faker.internet.password();
  await loginPage.submitLoginForm(
    user,
    password
  );
  await loginPage.buttonRetry.innerText("Retry");
});

test("faker_testing empty credentials", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm("", "");
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});

test("faker_testing special characteres in credentials", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  //const user = generateSpecialCharacters(10);
  const user = faker.internet.mac();
  await loginPage.submitLoginForm(user, "Uniandes123456");
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});

test("faker_testing User is not registered", async ({ page }) => {
  await page.goto(URL);
  const loginPage = new LoginPage(page);
  const user = faker.internet.email();
  await loginPage.submitLoginForm(user, "Uniandes123456");
  await page.waitForTimeout(2000);
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});

test("faker_testing when Psw is wrong", async ({ page }) => {
  await page.goto(URL);
  const password = faker.internet.password();
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    password
  );
  await page.waitForTimeout(2000);
  await loginPage.checkErrorMessage();
  await loginPage.buttonRetry.innerText("Retry");
});


