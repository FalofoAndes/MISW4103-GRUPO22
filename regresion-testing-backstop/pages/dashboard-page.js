const { expect } = require('@playwright/test');
let screenshotCounter = 1;
exports.DashBoardPage = class DashBoardPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    
    this.page = page;
    this.getStartedLink = page.locator('h2', { hasText: 'Dashboard' });
    this.newPostLink = page.locator('a', { hasText: 'New post' });
    this.posts = page.locator('a', { hasText: 'Posts' });


   }

   async createScreenshot(ruta) {
    let formattedCounter = String(screenshotCounter).padStart(3, "0");
    await this.page.screenshot({ path: `${ruta}${formattedCounter}.png` });
    screenshotCounter++;
    if (screenshotCounter > 999) {
      screenshotCounter = 1;
    }
  }
   

  async submitLoginForm(user, password) {
    await this.user.fill(user);
    this.createScreenshot(`./printscreen/dashboard/before_submitLoginForm_`);
    await this.password.fill(password);
    this.createScreenshot(`./printscreen/dashboard/before_submitLoginForm_`);
    await this.signInButton.click() ;
    this.createScreenshot(`./printscreen/dashboard/before_submitLoginForm_`);
  }

  async checkErrorMessage() {
    const errorMessage = await this.errormsg.innerText();
    const messageNoblanks = errorMessage.trim();
    
    if(messageNoblanks !== 'Please fill out the form to sign in.' && 
       messageNoblanks !== 'There is no user with that email address.' &&
       messageNoblanks !== 'Your password is incorrect.') {
      throw new Error(`Unexpected error message: ${messageNoblanks}`);
    }
  }
}

//import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://ghost-ur1e.onrender.com/ghost/#/signin');
//   await page.getByPlaceholder('jamie@example.com').click();
//   await page.getByPlaceholder('jamie@example.com').fill('pruebauniandes@uniandes.edu.co');
//   await page.getByPlaceholder('•••••••••••••••').fill('Uniandes123456');
//   await page.getByRole('button', { name: 'Sign in →' }).click();
//   await page.getByRole('link', { name: 'New post' }).click();
//   await page.getByPlaceholder('Post title').fill('fgfghg');
//   await page.locator('.koenig-editor__editor').click();
//   await page.getByText('ghgfgg').dblclick();
//   await page.getByPlaceholder('Post title').click();
//   await page.getByPlaceholder('Post title').fill('');
//   await page.getByRole('button', { name: 'Publish' }).click();
//   await page.getByRole('button', { name: 'Continue, final review →' }).click();
//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: '(Untitled) my first site •' }).click();
//   const page1 = await page1Promise;
//   await page1.getByRole('heading', { name: '(Untitled)' }).click();
//   await page1.getByRole('link', { name: 'Home' }).click();
//   await page.getByRole('button', { name: 'Editor', exact: true }).click();
//   await page.locator('#ember156').click();
//   await page.getByRole('link', { name: 'Posts' }).click();
//   await page.getByRole('link', { name: '(Untitled) By Estudiante uniandes • 1 minute ago 1 minute ago' }).click();
//   await page.getByRole('link', { name: 'Posts' }).click();
// });