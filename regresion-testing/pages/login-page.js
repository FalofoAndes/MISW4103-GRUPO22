const { expect } = require('@playwright/test');
let screenshotCounter = 1;
exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   * @param {String} screenshotsPath
   */
  constructor(page, screenshotsPath) {
    this.page = page;
    this.screenshotsPath = screenshotsPath;
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
    console.log(`this.screenshotsPath: ${this.screenshotsPath}`)
    this.createScreenshot(`${this.screenshotsPath}/login-fill-user-`);
    await this.password.fill(password);
    this.createScreenshot(`${this.screenshotsPath}/login-fill-password-`);
    await this.signInButton.click();
    this.createScreenshot(`${this.screenshotsPath}/login-click-signup-btn-`);
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