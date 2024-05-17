const { expect } = require("@playwright/test");




exports.PagesPage = class PagesPage {
  constructor(page) {
    this.page = page;
    this.sectionPages = page.locator("text=Pages").first();
    this.sectionPages2 = page.locator("#ember3115");
    this.newPage = this.page.locator('.gh-btn.gh-btn-primary.view-actions-top-row');
    this.pageTitle = page.locator(".gh-editor-title.ember-text-area.gh-input.ember-view");
    this.pageContent = page.locator(".koenig-editor__editor");
    this.pagePublishButton = page.getByRole("button", { name: "Publish" });
    this.pageContinueButton = page.getByRole("button", {
      name: "Continue, final review →",
    });
    this.finalPublishButton = page.getByRole("button", {
      name: "Publish page, right now",
    });
    this.postBookmarkTitle = page.locator(".gh-post-bookmark-title");
    this.menuOpc = page.getByRole("button", { name: "Settings" });
    this.comboAuthor = page.locator("#author-list");
    this.fieldAuthor = page.locator('#author-list input.ember-power-select-trigger-multiple-input');
    this.errormsgPage = page.locator('#gh-alert-content")');
    this.errormsg = page.locator("#entry-controls div");
    this.removeItem = page.locator('button:has-text("remove element")');
    this.pagesList = page.locator('a:has-text("Pages")');
    this.selectPage = page
      .locator('h3.gh-content-entry-title:has-text("New Title")')
      .nth(0);
    this.errormsg = page.locator("#entry-controls div");
    this.removeItem = page.locator('span[aria-label="remove element"]');
    this.errormsgAuthor = page.locator(
      'p:has-text("At least one author is required.")'
    );
    this.selectBlank = page.locator(
      "#entry-controls > div > div.settings-menu-content"
    );
    this.updateBtn = page.locator(
      ".gh-btn.gh-btn-editor.gh-editor-save-trigger.green.ember-view"
    );
    this.popupMessage = page.locator("body > div.gh-app > div > aside");
    this.alertMessage = page.locator("article.gh-alert.gh-alert-red");
    this.ComboURL = page.locator("#url");
    this.goURL = page.locator(
      "#entry-controls > div > div.settings-menu-content > form > div:nth-child(1) > a"
    );
    this.publishButton2 = page.locator(
      ".ember-view gh-btn-editor gh-editor-back-button"
    );
    this.updateButton = page.locator('button:has-text("Publish")');
    this.urlPreviewText = page.locator(".ghost-url-preview");
  }

   
//****************CREATE PAGE********************
async createPage(title, subtitle) {
  try {
    await this.sectionPages.click();
    await this.newPage.click();
    await this.pageTitle.fill(title);
    await this.pageContent.fill(subtitle);
    await this.page.waitForTimeout(3000);
    const isAlertVisible = await this.alertMessage.isVisible();
    if (!isAlertVisible) {
      await this.pagePublishButton.click();
      console.log("The alert message has not appeared.");
      return true;
    } else if (isAlertVisible) {
      console.log(
        "The alert message has appeared--> Validation failed: Title cannot be longer than 255 characters."
      );
      return "Title cannot be longer than 255 characters.";
    }
  } catch (error) {
    console.log("Error: Detected Bug!!  ", error);
  }
}
    
    
    //const newPagePromise = this.page.waitForEvent("popup");
  



  //************CREATE PAGE*****************
  async checkPage(title) {
    await this.sectionPages.click();
    await this.page.waitForTimeout(5000);
    const pageTitleLocator = this.page.locator(
      'span.midgrey-l2.fw5:has-text("' + title + '")'
    );
    const pageExists = (await pageTitleLocator.count()) < 0;

    if (pageExists) {
      console.log(`Page with title "${title}" exists.`);
    } else {
      console.log(`Page with title "${title}" does not exist.`);
    }
  }


    //************PAGE UNTITLED*****************
  async pageUntitled() {
    const postBookmarkTitleText = await this.postBookmarkTitle.textContent();
    await this.postBookmarkTitle.click();
    if (postBookmarkTitleText === "(Untitled)") {
      console.log("The title is correct.");
    } else {
      console.log("The title is incorrect.");
    }
  }

    //************PAGE NO AUTHOR*****************
  async pageNoAuthor(nameauthor) {
    await this.sectionPages.click();
    await this.newPage.click();
    await this.menuOpc.click();
    await this.comboAuthor.click();
    await this.comboAuthor.textContent();
    await this.page.getByLabel("remove element").click();
    await this.page.keyboard.press("Backspace");
    await this.page.keyboard.press("Tab");
    await this.page.fieldAuthor.fill(nameauthor);
    console.log(nameauthor);
   
    
   
  }


  //************DELETE AUTHOR*****************
  async deleteAuthor() {
    await this.sectionPages.click();
    await this.newPage.click();
    await this.menuOpc.click();
    await this.comboAuthor.click();
    await this.removeItem.click();
    await this.page.keyboard.press("Backspace");
    await this.page.keyboard.press("Tab");
    const responseText = await this.errormsgAuthor.textContent();

    if (responseText.trim() === "At least one author is required.") {
      console.log('The text "At least one author is required." is present.');
    } else {
      console.log(
        'The text "At least one author is required." is not present.'
      );
    }
  }


    //************EDIT PAGE*****************
  async editPage(text) {
    await this.sectionPages.click();
    await this.page.waitForTimeout(2000);
    await this.selectPage.click();
    await this.postTitle.fill(text);
    await this.updateBtn.click();
    await this.page.waitForTimeout(2000);
    const isPopupVisible = await this.popupMessage.isVisible();
    if (isPopupVisible) {
      console.log("The popup message has appeared.");
    } else {
      console.log("The popup message has not appeared.");
    }
  }



    //************EDIT PAGE TITLE*****************
  async editPageTitle(text, subtitletext) {
    await this.sectionPages.click();
    await this.pagesList.first().click();
    await this.selectPage.first().click();
    await this.pageTitle.fill(text);
    await this.pageContent.fill(subtitletext);
    await this.updateButton.click();
    const isAlertVisible = await this.alertMessage.isVisible();

    if (isAlertVisible) {
      console.log(
        "The alert message has appeared--> Validation failed: Title cannot be longer than 255 characters."
      );
    } else {
      console.log("The alert message has not appeared.");
    }
  }


    //************CHANGE URL*****************
  async changeURL(newurl) {
    await this.sectionPages.click();
    await this.pagesList.first().click();
    await this.selectPage.first().click();
    await this.menuOpc.click();
    await this.ComboURL.click();
    await this.ComboURL.fill(newurl);
    let text = await this.urlPreviewText.textContent();
    console.log("Text of new URL: ", text);
  }
};
