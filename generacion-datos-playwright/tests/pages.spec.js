import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PagesPage } from "../pages/pages-page";
import {faker} from '@faker-js/faker';
import { hasUncaughtExceptionCaptureCallback } from "process";

const URLinit = "https://ghost-ur1e.onrender.com/ghost/#/signin";
const URLbase = "https://ghost-ur1e.onrender.com/ghost/#";
const user = "pruebauniandes@uniandes.edu.co";
const password = "Uniandes123456";
const textRandom = faker.lorem.sentence();
const textRandomMax = faker.string.alpha(256);

function namesFaker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return `${firstName} ${lastName}`;
}


//-------------------------   TESTS    ---------------------



test("faker_testing_create page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(textRandom, textRandom);
  expect (true);
});





test("faker_testing_creating_page_TitleMaxChars", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(textRandomMax, textRandom);
  expect(page).toHaveText("Title cannot be longer than 255 characters.");
});





test("faker_testing_create page and check it", async ({ page }) => {
  const titlePage = textRandom;
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage(titlePage, textRandom);
  await page.goto(URLbase + "/dashboard");
  await pagesPage.checkPage(titlePage);
});





test("faker_testing_create Untitled page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.createPage("", textRandom);
  await pagesPage.pageUntitled();
});




test("faker_testing_changing author page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.pageNoAuthor(namesFaker());
  page.expect(page).toHaveText("The combo box is empty.");
});




test("faker_testing_testing delete Author in EditPage", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.deleteAuthor();
});





test("faker_testing_testing edit longest title page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.editPageTitle(
    "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word  and the Little Blind Text should turn around and return to ends ir website.",
    "Subtitulo de la pagina"
  );
});






test("faker_testing_testing edit change URL page", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const pagesPage = new PagesPage(page);
  await pagesPage.changeURL("riosPage");
});
