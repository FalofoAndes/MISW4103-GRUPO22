
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

  
  async submitLoginForm(user, password) {
    await this.user.fill(user);
    await this.password.fill(password);
    await this.signInButton.click();
    return this.buttonRetry;
   
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