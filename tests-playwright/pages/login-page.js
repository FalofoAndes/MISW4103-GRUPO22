const { expect } = require('@playwright/test');
let screenshotCounter = 1;
exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.user = page.locator('input[name="identification"]');
    this.password = page.locator('input[name="password"]');
    this.signInButton = page.locator('button', { hasText: 'Sign in →' });
    this.buttonRetry = page.locator('button', { hasText: 'Retry' });
    this.errormsg = page.locator('.main-error');
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
    this.createScreenshot(`./printscreen/login/before_submitLoginForm_`);
    await this.password.fill(password);
    this.createScreenshot(`./printscreen/login/before_submitLoginForm_`);
    await this.signInButton.click();
    this.createScreenshot(`./printscreen/login/before_submitLoginForm_`);
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