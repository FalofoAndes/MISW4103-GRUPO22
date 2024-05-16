import { Given, When, Then, Before, After } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";
import { faker } from "@faker-js/faker";

After(async () => {
  // Cerrar la instancia del navegador
  await browser.reloadSession();
});

Given("I go to ghost", async () => {
  await browser.url(`https://ghost-ur1e.onrender.com/ghost/#/signin`);
});

When("I login with {string} and {string}", async (email, password) => {
  const emailInput = await browser.$('input[name="identification"]');
  const passwordInput = await browser.$('input[name="password"]');
  await emailInput.setValue(email);
  await passwordInput.setValue(password);
  await browser.$('button[type="submit"]').click();
});

When(
  "I login with data row {string} email and password with API",
  async (row) => {
    const emailInput = await browser.$('input[name="identification"]');
    const passwordInput = await browser.$('input[name="password"]');
    const response = await fetch(
      "https://my.api.mockaroo.com/login.json?key=fba87140"
    );
    const data = await response.json();
    // Obtener el valor del correo electrónico y manejar el caso de nulo
    const emailValue = data[parseInt(row)].email || " ";

    // Obtener el valor de la contraseña y manejar el caso de nulo
    const passwordValue = data[parseInt(row)].password || " ";

    await emailInput.setValue(emailValue);
    await passwordInput.setValue(passwordValue);
    await browser.$('button[type="submit"]').click();
  }
);

When(
  "I login with {string} and {string} faker",
  async (fakeEmail, fakePassword) => {
    const emailInput = await browser.$('input[name="identification"]');
    const passwordInput = await browser.$('input[name="password"]');
    const email =
      fakeEmail === "<fakeEmail>" ? faker.internet.email() : fakeEmail || " ";
    const password =
      fakePassword === "<fakePassword>"
        ? faker.internet.password()
        : fakePassword || " ";
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
    await emailInput.setValue(email);
    await passwordInput.setValue(password);
    await browser.$('button[type="submit"]').click();
  }
);

Then("I see the error {string}", async (error) => {
  await browser.pause(2000);
  const paragraphElement = await $(".main-error"); // Selector para el elemento de párrafo que contiene el mensaje de error
  const paragraphText = (await paragraphElement.getText()).trim(); // Obtener el texto del elemento de párrafo y eliminar espacios en blanco al principio y al final
  expect(paragraphText).toContain(error); // Verificar si el texto del párrafo contiene el mensaje de error
});

/* CREATE POST */

When("I enter in create post", async () => {
  const navCreatePost = await browser.$(
    ".ember-view.gh-secondary-action.gh-nav-new-post"
  );
  await navCreatePost.click();
});

When("I enter a {string}", async (title) => {
  const textAreaTitlePost = await browser.$(".gh-editor-title");
  await textAreaTitlePost.setValue(title);
});

Then("I see that the publish button there is {string}", async (visibility) => {
  let content = await browser.$(
    ".koenig-editor__editor.__mobiledoc-editor.__has-no-content"
  );
  await content.click();
  await browser.pause(2000);
  let element = await browser.$(
    ".gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"
  );
  let isVisibleElement = await element.isDisplayed();
  if (visibility === "Displayed") {
    expect(isVisibleElement).toEqual(true);
  } else if (visibility === "Hide") {
    expect(isVisibleElement).toEqual(false);
  }
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

When("I enter a {string} for API", async (title) => {
  const response = await fetch(
    "https://my.api.mockaroo.com/titles.json?key=fba87140"
  );
  const data = await response.json();
  let postTitle = "";
  if (title === "long") {
    postTitle = String(data[randomInt(0, data.length)].long);
  } else if (title === "blank") {
    postTitle = data[randomInt(0, data.length)].blank == null ? "":data[randomInt(0, data.length)].blank;
  } else if (title === "normal") {
    postTitle = String(data[randomInt(0, data.length)].normal);
  } else {
    postTitle = String(data[randomInt(0, data.length)].special);
  }

  const textAreaTitlePost = await browser.$(".gh-editor-title");
  await textAreaTitlePost.setValue(postTitle);
});

When("I enter a {string} with faker", async (title) => {
    let postTitle = "";
    if (title === "long") {
      // Genera un título largo mayor a 255 caracteres
      postTitle = faker.random.alpha({ count: 256 });
    } else if (title === "blank") {
      // Título en blanco
      postTitle = "";
    } else if (title === "normal") {
      // Título normal
      postTitle = faker.lorem.words(2);
    } else if (title === "special") {
      // Título con caracteres especiales
      postTitle = faker.random.alphaNumeric(10) + "!@#$%^&*()";
    }
  
    const textAreaTitlePost = await browser.$(".gh-editor-title");
    await textAreaTitlePost.setValue(postTitle);
  });
  
