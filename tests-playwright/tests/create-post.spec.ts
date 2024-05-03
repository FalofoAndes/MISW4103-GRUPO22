import { test, expect } from '@playwright/test';

const BASE_URL = "https://ghost-ur1e.onrender.com/ghost/";
// const BASE_URL = "https://ghost-gnt9.onrender.com/ghost/#/signin";

test('Create post with title and content empty', async ({ page }) => {
    await page.goto(BASE_URL + "#/signin");

    const emailTextField = page.locator('[name="identification"]');
    await emailTextField.fill('pruebauniandes@uniandes.edu.co');

    const passwordTextField = page.locator('[name="password"]');
    await passwordTextField.fill('Uniandes123456');

    await page.getByRole('button', { name: 'Sign in' }).click();

    const postsLink = await page.waitForSelector('a[href="#/posts/"]');
    await postsLink.click();

    const createPostsLink = await page.waitForSelector('a[href="#/editor/post/"]');
    await createPostsLink.click();

    // const titleElement = page.locator('#ember149');
    const titleElement = page.locator(`textarea[placeholder="Post title"]`); // Adjust the selector as needed
    await titleElement.focus();
    await titleElement.press('Enter')
    await page.waitForTimeout(1000);

    const articleElement = page.locator('article[data-placeholder="Begin writing your post...]');
    await articleElement.focus();
    await articleElement.press('Enter');

    await page.waitForTimeout(1000);
    await articleElement.press('Backspace');

    // let initialText = await page.locator('p.main-error').textContent();

    // let currentText: string | null = null;

    // const maxAttempts = 20;

    // let attempt = 0;

    // // lógica para esperar a que haya cambiado el texto inicial.
    // // Espera durante attemp*500ms
    // while (attempt < maxAttempts) {
    //   const paragraphElement = page.locator('p.main-error');
    //   currentText = await paragraphElement.textContent();
    //   if (currentText !== initialText) {
    //     break;
    //   }

    //   initialText = currentText;
    //   attempt++;
    //   await page.waitForTimeout(500);
    // }

    // expect(currentText).toContain('Your password is incorrect.'); 

});
