import { Given, When, Then, Before, After } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";
import { faker } from "@faker-js/faker";
import PagesPage from "./pageobjects/pages.page.js";

 After(async () => {
  // Cerrar la instancia del navegador
  await browser.reloadSession();
}); 

Given("I go to ghost", async () => {
  await browser.url(`https://ghost-ur1e.onrender.com/ghost/#/signin`);
});

When("I login with {string} and {string}", async (email, password) => {  
  await browser.waitUntil(
    async () => {
        const isDisplayed = await browser.$('input[name="identification"]').isDisplayed();
        return isDisplayed;
    }
  );
  const emailInput = await browser.$('input[name="identification"]');
  const passwordInput = await browser.$('input[name="password"]');
  await emailInput.setValue(email);
  await passwordInput.setValue(password);
  await browser.$('button[type="submit"]').click();
});

When(
  "I login with data row {string} email and password with API",
  async (row) => {
    await browser.waitUntil(
      async () => {
          const isDisplayed = await browser.$('input[name="identification"]').isDisplayed();
          return isDisplayed;
      }
    );
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
      await browser.waitUntil(
        async () => {
            const isDisplayed = await browser.$('input[name="identification"]').isDisplayed();
            return isDisplayed;
        }
    );
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
  await browser.waitUntil(
    async () => {
        const isDisplayed = await browser.$('.gh-canvas-title').isDisplayed();
        return isDisplayed;
    }
);
  await browser.url(`https://ghost-ur1e.onrender.com/ghost/#/editor/post`);
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
  
// DATE

When("I enter in the first post in the list", async () => {
  await browser.url('https://ghost-ur1e.onrender.com/ghost/#/posts');
  await browser.waitUntil(
    async () => {
        const isDisplayed = await browser.$('ol a').isDisplayed();
        return isDisplayed;
    }
);
  const firstPostInList = await browser.$("ol a");
  await firstPostInList.click();
});

When("I enter in settings", async () => {
  const settings = await browser.$('button[title="Settings"]');
  await settings.click();
});

When("I put {string} in date publish of post", async (date) => {
  // Seleccionar el input de fecha usando el placeholder
  const dateInput = await $('input[placeholder="YYYY-MM-DD"]');
  await dateInput.waitForDisplayed();
  await browser.pause(500);
  await dateInput.setValue(date); // Agrega el guion al principio
  await browser.keys("Enter");
});

When("I put {string} in date publish of post with API", async (date) => {
  // Seleccionar el input de fecha usando el placeholder
  const dateInput = await $('input[placeholder="YYYY-MM-DD"]');
  await dateInput.waitForDisplayed();

  const response = await fetch(
    "https://my.api.mockaroo.com/dates.json?key=fba87140"
  );
  const data = await response.json();
  let dataValue = "";
  if (date === "text") {
    dataValue = data[randomInt(0, data.length)].text;
  } else if (date === "invalid") {
    dataValue = data[randomInt(0, data.length)].invalid;
  } else if (date === "specials") {
    dataValue = data[randomInt(0, data.length)].specials;
  } else if (date === "future") {
    dataValue = data[randomInt(0, data.length)].future;
  } else if (date === "past") {
    dataValue = data[randomInt(0, data.length)].past;
  }
  await dateInput.setValue(dataValue); // Agrega el guion al principio
  await browser.keys("Enter");
});

When("I put {string} in date publish of post with faker", async (dataType) => {
  // Seleccionar el input de fecha usando el placeholder
  const dateInput = await $('input[placeholder="YYYY-MM-DD"]');
  await dateInput.waitForDisplayed();
  await browser.pause(500);

  let dataValue;
  // Generar datos falsos según el tipo especificado
  switch (dataType) {
    case "text":
      // Generar un texto de dos palabras
      dataValue = faker.lorem.words(2);
      break;
    case "invalid":
      // Generar una fecha inválida con mes "00"
      const yearInvalid = faker.number.int({ min: 1000, max: 3000 });
      const monthInvalid = "00"; // Mes inválido
      const dayInvalid = faker.number.int({ min: 1, max: 28 }); // Limitamos al día 28 para simplificar
      dataValue = `${yearInvalid}-${monthInvalid.padStart(2, "0")}-${dayInvalid
        .toString()
        .padStart(2, "0")}`;
      break;
    case "specials":
      // Generar texto con caracteres especiales
      dataValue = faker.string.alphanumeric() + "!@#$%";
      break;
    case "future":
      // Generar una fecha futura entre 2500 y 3000
      const yearFuture = faker.number.int({ min: 2500, max: 3000 });
      const monthFuture = faker.number.int({ min: 1, max: 12 });
      const dayFuture = faker.number.int({ min: 1, max: 28 }); // Limitamos al día 28 para simplificar
      dataValue = `${yearFuture}-${monthFuture
        .toString()
        .padStart(2, "0")}-${dayFuture.toString().padStart(2, "0")}`;
      break;
    case "past":
      // Generar una fecha pasada entre 1000 y 1500
      const yearPast = faker.number.int({ min: 1000, max: 1500 });
      const monthPast = faker.number.int({ min: 1, max: 12 });
      const dayPast = faker.number.int({ min: 1, max: 28 }); // Limitamos al día 28 para simplificar
      dataValue = `${yearPast}-${monthPast
        .toString()
        .padStart(2, "0")}-${dayPast.toString().padStart(2, "0")}`;
      break;
    default:
      throw new Error("Invalid data type");
  }

  // Establecer el valor generado en el campo de entrada
  await dateInput.setValue(dataValue);
  // Enviar la tecla "Enter" para confirmar el cambio
  await browser.keys("Enter");
});

Then("I see the date's error {string}", async (error) => {
  const errorDate = await browser.$(".gh-date-time-picker-error");
  const messageError = await errorDate.getText();
  expect(messageError).toContain(error);
});

When("I go to create page", async () => {
  await browser.waitUntil(
      async () => {
          const isDisplayed = await browser.$('.gh-canvas-title').isDisplayed();
          return isDisplayed;
      }
  );
  await PagesPage.goToCreatePage();
});