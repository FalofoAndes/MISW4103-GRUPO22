import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { PostPage } from "../pages/post-page";
import {faker} from '@faker-js/faker';
import { text } from "stream/consumers";


faker.seed(329); 


const URLinit = "https://ghost-ur1e.onrender.com/ghost/#/signin";
const URLbase = "https://ghost-ur1e.onrender.com/ghost/#";
const user = "pruebauniandes@uniandes.edu.co";
const password = "Uniandes123456";
const textRandom = faker.lorem.sentence();
const emojis = faker.internet.emoji();  
const textWithEmojis = `${textRandom} ${emojis}`;


function textRandomMax(n){
  return faker.string.alpha(n);
} 

function namesFaker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return `${firstName} ${lastName}`;
}

//-------------------------   TESTS    ---------------------

test("SeudoRandom_testing creating new post", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.createPost(textRandom, textRandom);
  expect (true);
});




test("SeudoRandom_testing_creating_post_TitleMaxChars", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.createPost(textRandomMax(256), textRandom);
  expect (true);  

});


test("SeudoRandom_testing_creating_post_SubtitleMaxChars", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.createPost( textRandom,textRandomMax(256));
  expect (true);  

});

test("SeudoRandom_testing_creating_post_SpecialCharacters", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  var textSpecial = faker.string.symbol(40);
  await postPage.createPost( textSpecial,textSpecial);
  expect (true);  

});


test("SeudoRandom_testing_creating_post_Notitle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.createPost( "", textRandom);
  expect (true);  

});

test("SeudoRandom_testing_creating_post_NoSUBtitle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.createPost(textRandom,"");
  expect (true);  

});

test("SeudoRandom_testing change URL", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.changeURL(textRandom);
});


test("SeudoRandom_testing change URL to MaxCharact", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.changeURL(textRandomMax(2056));
});


test("SeudoRandom_testing change URL to SpecialCharact", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  var textSpecial = faker.string.symbol(40);
  await postPage.changeURL(textSpecial);
});


test("SeudoRandom_testing change URL to CharactEmojis", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  var textSpecial = faker.string.symbol(40);
  await postPage.changeURL(textWithEmojis);
});


test("SeudoRandom_testing metaData Tittle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.changeMetadata(textRandom,textRandom);
});



test("SeudoRandom_testing metaData MaxTittle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.changeMetadata(textRandomMax(2056),textRandom);
});


test("SeudoRandom_testing metaData EmojisTittle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  await postPage.changeMetadata(textWithEmojis,textRandom);
});



test("SeudoRandom_testing metaData SpecialCharactTittle", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  var textSpecial = faker.string.symbol(40);
  await postPage.changeMetadata(textSpecial,textRandom);
});



test("SeudoRandom_testing metaData SpecialCharactTextArea", async ({ page }) => {
  await page.goto(URLinit);
  const loginPage = new LoginPage(page);
  await loginPage.submitLoginForm(
    user,
    password
  );
  await expect(page).toHaveURL(URLbase + "/dashboard");
  const postPage = new PostPage(page);
  var textSpecial = faker.string.symbol(40);
  await postPage.changeMetadata2(textRandom,textSpecial);
});














