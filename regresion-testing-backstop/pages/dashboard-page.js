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
