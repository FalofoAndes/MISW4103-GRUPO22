import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PostPage } from "../pages/post-page";

const URLinit = "https://ghost-ur1e.onrender.com/ghost/#/signin";
const URLbase = "https://ghost-ur1e.onrender.com/ghost/#";

test("testing creating new post", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  //await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.fillPost("Mi nuevo Post", "Ingreso de Subtitulos");
});

test("testing creating new UNTITLED post", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.fillPostUntitled("Nuevo untitle", "Sería untitled");
});

test("testing creating new Only TITLE post", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.fillPost("Solo Titulo", "");
});

test("testing URL of new post", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.accesingNewPost("Nuevos post con URL ", "Cuenta con URL");
});

test("testing new TAG of new post", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.newTAGinPost(
    "Nuevos post con TAG ",
    "Cuenta con un TAG valido"
  );
});

test("testing delete Author in EditPost", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.deleteAuthor();
});

test("testing edit title", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.editPost("Editando title post");
});

test("testing longest title", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.editPostTitle(
    "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word  and the Little Blind Text should turn around and return to ends ir website."
  );
});

test("testing change URL", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    "pruebauniandes@uniandes.edu.co",
    "Uniandes123456"
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.changeURL("rios");
});
