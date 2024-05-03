import { test, expect } from '@playwright/test';

const BASE_URL = "https://ghost-ur1e.onrender.com/ghost/#/signin";
// const BASE_URL = "https://ghost-gnt9.onrender.com/ghost/#/signin";

test('has title', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveTitle(/Sign In - my first site/, {timeout: 3000});
});

test('Try to sign in without entering credentials', async ({ page }) => {
  await page.goto(BASE_URL);


  await page.getByRole('button', { name: 'Sign in' }).click();
  const paragraph = page.locator('p.main-error'); 
  let actualText = await paragraph.innerText(); 

  expect(actualText).toContain('Please fill out the form to sign in.'); 
});

test('Try to sign in with invalid email format and valid password format', async ({ page }) => {
  await page.goto(BASE_URL);


  const emailTextField = page.locator('[name="identification"]');
  await emailTextField.fill('playwrith');
  
  const passwordTextField = page.locator('[name="password"]');
  await passwordTextField.fill('Pass1234');

  await page.getByRole('button', { name: 'Sign in' }).click();
  const errorParagraph = page.locator('p.main-error'); 
  let actualText = await errorParagraph.innerText(); 

  expect(actualText).toContain('Please fill out the form to sign in.'); 
});

test('Try to sign in with non registered user', async ({ page }) => {
  await page.goto(BASE_URL);

  const emailTextField = page.locator('[name="identification"]');
  await emailTextField.fill('non-registered@test.com');
  
  const passwordTextField = page.locator('[name="password"]');
  await passwordTextField.fill('Pass12345555');

  await page.getByRole('button', { name: 'Sign in' }).click();

  let initialText = await page.locator('p.main-error').textContent();

  let currentText: string | null = null;
  
  const maxAttempts = 20;

  let attempt = 0;

  // lógica para esperar a que haya cambiado el texto inicial.
  // Espera durante attemp*500ms
  while (attempt < maxAttempts) {
    const paragraphElement = page.locator('p.main-error');
    currentText = await paragraphElement.textContent();
    if (currentText !== initialText) {
      break;
    }

    initialText = currentText;
    attempt++;
    await page.waitForTimeout(500);
  }

  expect(currentText).toContain('There is no user with that email address.'); 

});

test('Try to sign in with user registered and wrong password', async ({ page }) => {
  await page.goto(BASE_URL);

  const emailTextField = page.locator('[name="identification"]');
  await emailTextField.fill('pruebauniandes@uniandes.edu.co');
  
  const passwordTextField = page.locator('[name="password"]');
  await passwordTextField.fill('Pass12345555');

  await page.getByRole('button', { name: 'Sign in' }).click();

  let initialText = await page.locator('p.main-error').textContent();

  let currentText: string | null = null;
  
  const maxAttempts = 20;

  let attempt = 0;

  // lógica para esperar a que haya cambiado el texto inicial.
  // Espera durante attemp*500ms
  while (attempt < maxAttempts) {
    const paragraphElement = page.locator('p.main-error');
    currentText = await paragraphElement.textContent();
    if (currentText !== initialText) {
      break;
    }

    initialText = currentText;
    attempt++;
    await page.waitForTimeout(500);
  }

  expect(currentText).toContain('Your password is incorrect.'); 

});


