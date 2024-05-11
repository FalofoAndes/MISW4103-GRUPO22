const { expect } = require("@playwright/test");
let screenshotCounter = 1;

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
    this.errormsg = page.locator("#entry-controls div");
    this.removeItem = page.locator('button:has-text("remove element")');
    this.pagesList = page.locator('a:has-text("Pages")');
    this.selectPage = page
      .locator('h3.gh-content-entry-title:has-text("New Title")')
      .nth(0);
    this.comboAuthor = page.locator("#author-list");
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

  async createScreenshot(ruta) {
    let formattedCounter = String(screenshotCounter).padStart(3, "0");
    await this.page.screenshot({ path: `${ruta}${formattedCounter}.png` });
    screenshotCounter++;
    if (screenshotCounter > 999) {
      screenshotCounter = 1;
    }
  }

  async createPage(title, subtitle) {
    await this.sectionPages.click();
    this.createScreenshot(`./printscreen/pages/before_createpage_`);
    await this.newPage.click();
    this.createScreenshot(`./printscreen/pages/before_createpage_`);
    await this.pageTitle.fill(title);
    this.createScreenshot(`./printscreen/pages/before_createpage_`);
    await this.pageContent.fill(subtitle);
    this.createScreenshot(`./printscreen/pages/before_createpage_`);
    await this.pagePublishButton.click();
    this.createScreenshot(`./printscreen/pages/before_createpage_`);
    await this.pageContinueButton.click();
    await this.page.waitForTimeout(1000);
    this.createScreenshot(`./printscreen/pages/before_createpage_`);
    await this.finalPublishButton.click({ force: true });
    await this.page.waitForTimeout(5000);
    this.createScreenshot(`./printscreen/pages/before_createpage_`);
    const newPagePromise = this.page.waitForEvent("popup");
    const postBookmarkContainer = this.page.getByRole("link", {
      name: title + " " + subtitle + " " + "my first site",
    });
    console.log("PostBookmarkContainer: ", postBookmarkContainer);
    await postBookmarkContainer.click();
    await this.page.waitForTimeout(2000);
    this.createScreenshot(`./printscreen/pages/before_createpage_`);
    console.log("The Page has been created.");
  }

  async checkPage(title) {
    await this.sectionPages.click();
    await this.page.waitForTimeout(5000);
    this.createScreenshot(`./printscreen/pages/before_checkPage_`);
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

  async pageUntitled() {
    const postBookmarkTitleText = await this.postBookmarkTitle.textContent();
    await this.postBookmarkTitle.click();
    this.createScreenshot(`./printscreen/pages/before_pageUntitled_`);
    if (postBookmarkTitleText === "(Untitled)") {
      console.log("The title is correct.");
    } else {
      console.log("The title is incorrect.");
    }
  }

  async pageNoAuthor() {
    await this.sectionPages.click();
    this.createScreenshot(`./printscreen/pages/before_pageNoAuthor_`);
    await this.newPage.click();
    this.createScreenshot(`./printscreen/pages/before_pageNoAuthor_`);
    await this.menuOpc.click();
    this.createScreenshot(`./printscreen/pages/before_pageNoAuthor_`);
    await this.comboAuthor.click();
    this.createScreenshot(`./printscreen/pages/before_pageNoAuthor_`);
    const comboText = await this.comboAuthor.textContent();
    this.createScreenshot(`./printscreen/pages/before_pageNoAuthor_`);
    await this.page.getByLabel("remove element").click;
    this.createScreenshot(`./printscreen/pages/before_pageNoAuthor_`);
    if (comboText.trim() === "") {
      console.log("The combo box is empty.");
    } else {
      console.log("The combo box has a selected element. There is a BUG!!");
    }
  }

  async deleteAuthor() {
    await this.sectionPages.click();
    this.createScreenshot(`./printscreen/pages/before_deleteAuthor_`);
    await this.newPage.click();
    this.createScreenshot(`./printscreen/pages/before_deleteAuthor_`);
    await this.menuOpc.click();
    this.createScreenshot(`./printscreen/pages/before_deleteAuthor_`);
    await this.comboAuthor.click();
    this.createScreenshot(`./printscreen/pages/before_deleteAuthor_`);
    await this.removeItem.click();
    this.createScreenshot(`./printscreen/pages/before_deleteAuthor_`);
    await this.page.keyboard.press("Backspace");
    this.createScreenshot(`./printscreen/pages/before_deleteAuthor_`);
    await this.page.keyboard.press("Tab");
    this.createScreenshot(`./printscreen/pages/before_deleteAuthor_`);
    const responseText = await this.errormsgAuthor.textContent();

    if (responseText.trim() === "At least one author is required.") {
      console.log('The text "At least one author is required." is present.');
    } else {
      console.log(
        'The text "At least one author is required." is not present.'
      );
    }
  }

  async editPage(text) {
    await this.sectionPages.click();
    await this.page.waitForTimeout(2000);
    this.createScreenshot(`./printscreen/pages/before_editPage_`);
    await this.selectPage.click();
    this.createScreenshot(`./printscreen/pages/before_editPage_`);
    await this.postTitle.fill(text);
    this.createScreenshot(`./printscreen/pages/before_editPage_`);
    await this.updateBtn.click();
    await this.page.waitForTimeout(2000);
    this.createScreenshot(`./printscreen/pages/before_editPage_`);
    const isPopupVisible = await this.popupMessage.isVisible();
    if (isPopupVisible) {
      console.log("The popup message has appeared.");
    } else {
      console.log("The popup message has not appeared.");
    }
  }

  async editPageTitle(text, subtitletext) {
    await this.sectionPages.click();
    this.createScreenshot(`./printscreen/pages/before_editPageTitle_`);
    await this.pagesList.first().click();
    this.createScreenshot(`./printscreen/pages/before_editPageTitle_`);
    await this.selectPage.first().click();
    this.createScreenshot(`./printscreen/pages/before_editPageTitle_`);
    await this.pageTitle.fill(text);
    this.createScreenshot(`./printscreen/pages/before_editPageTitle_`);
    await this.pageContent.fill(subtitletext);
    this.createScreenshot(`./printscreen/pages/before_editPageTitle_`);
    await this.updateButton.click();
    this.createScreenshot(`./printscreen/pages/before_editPageTitle_`);
    const isAlertVisible = await this.alertMessage.isVisible();

    if (isAlertVisible) {
      console.log(
        "The alert message has appeared--> Validation failed: Title cannot be longer than 255 characters."
      );
    } else {
      console.log("The alert message has not appeared.");
    }
  }

  async changeURL(newurl) {
    await this.sectionPages.click();
    this.createScreenshot(`./printscreen/pages/before_changeURL_`);
    await this.pagesList.first().click();
    this.createScreenshot(`./printscreen/pages/before_changeURL_`);
    await this.selectPage.first().click();
    this.createScreenshot(`./printscreen/pages/before_changeURL_`);
    await this.menuOpc.click();
    this.createScreenshot(`./printscreen/pages/before_changeURL_`);
    await this.ComboURL.click();
    this.createScreenshot(`./printscreen/pages/before_changeURL_`);
    await this.ComboURL.fill(newurl);
    this.createScreenshot(`./printscreen/pages/before_changeURL_`);
    let text = await this.urlPreviewText.textContent();
    console.log("Text of new URL: ", text);
  }
};
