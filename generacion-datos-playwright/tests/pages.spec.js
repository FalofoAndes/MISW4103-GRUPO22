import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PagesPage } from "../pages/pages-page";
import { faker } from "@faker-js/faker";

const dataApriori = require("../data-apriori.json");

const URLinit = "https://ghost-ur1e.onrender.com/ghost/#/signin";
const URLbase = "https://ghost-ur1e.onrender.com/ghost/#";
const user = "pruebauniandes@uniandes.edu.co";
const password = "Uniandes123456";
const textRandom = faker.lorem.sentence();
const emojis = faker.internet.emoji();
const textWithEmojis = `${textRandom} ${emojis}`;

function textRandomMax(n) {
  return faker.string.alpha(n);
}

function namesFaker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return `${firstName} ${lastName}`;
}

//-------------------------   TESTS    ---------------------

test("fakerRandom_testing_create page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(textRandom, textRandom);
  expect(true);
});

test("fakerRandom_testing_creating_page_TitleMaxChars", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(textRandomMax(256), textRandom);
  expect(page).toHaveText("Title cannot be longer than 255 characters.");
});

test("fakerRandom_testing_creating_page_Subtitle_10k_Chars", async ({
  page,
}) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(textRandom, textRandomMax(10000));
  expect(true);
});

test("fakerRandom_testing_create Untitled page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage("", textRandom);
});

test("fakerRandom_testing_SpecialCharacters", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  var textSpecial = faker.string.symbol(40);
  await pagesPage.createPage(textSpecial, textSpecial);
  expect(true);
});

test("fakerRandom_testing_create without body", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(textRandom, " ");
});

test("fakerRandom_testing_edit change URL page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeURL(textWithEmojis);
});

test("fakerRandom_test_twitter Title&Subtitle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeTwitter(textRandom, textRandom);
  expect(true);
});

test("fakerRandom_test_twitter MAXTitle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeTwitter(textRandomMax(100), textRandom);
  expect(true);
});

test("fakerRandom_test_twitter MAXDescription", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(user, password);
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeTwitter(textRandom, textRandomMax(500));
  expect(true);
});

test("apriori create page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(
    dataApriori.randomString,
    dataApriori.randomString
  );
});

test("apriori testing_creating_page_TitleMaxChars", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(dataApriori.string256, dataApriori.randomString);
  expect(page).toHaveText("Title cannot be longer than 255 characters.");
});

test("apriori testing_creating_page_Subtitle_huge_string", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(
    dataApriori.randomString,
    dataApriori.randomHugeString
  );
  expect(true);
});

test("apriori testing_create Untitled page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(dataApriori.emptyString, dataApriori.randomString);
});

test("apriori testing_SpecialCharacters", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(
    dataApriori.stringSpecialChar,
    dataApriori.stringSpecialChar
  );
  expect(true);
});

test("apriori testing_create without body", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(
    dataApriori.randomString,
    dataApriori.oneSpaceString
  );
});

test("apriori testing_edit change URL page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeURL(dataApriori.emojiString);
});

test("apriori test_twitter Title&Subtitle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeTwitter(
    dataApriori.randomString,
    dataApriori.randomString
  );
  expect(true);
});

test("apriori test_twitter MAXTitle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeTwitter(
    dataApriori.string100,
    dataApriori.randomString
  );
  expect(true);
});

test("apriori test_twitter MAXDescription", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    dataApriori.validEmail,
    dataApriori.validPassword
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeTwitter(
    dataApriori.randomString,
    dataApriori.string500
  );
  expect(true);
});
