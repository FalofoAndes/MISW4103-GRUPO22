const { expect } = require("@playwright/test");

exports.PagesPage = class PagesPage {
  constructor(page) {
    this.page = page;
    this.sectionPages = page.locator("text=Pages");
    this.sectionPages2 = page.locator("#ember3115");
    this.newPage = page.getByRole("link", { name: "New Page" });
    this.pageTitle = page.getByPlaceholder("Page title");
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

  async createPage(title, subtitle) {
    await this.sectionPages.click();
    await this.newPage.click();
    await this.pageTitle.fill(title);
    await this.pageContent.fill(subtitle);
    await this.pagePublishButton.click();
    await this.pageContinueButton.click();
    await this.page.waitForTimeout(1000);
    await this.finalPublishButton.click({ force: true });
    await this.page.waitForTimeout(2000);
    const newPagePromise = this.page.waitForEvent("popup");
    const postBookmarkContainer = this.page.getByRole("link", {
      name: title + " " + subtitle + " " + "my first site",
    });
    console.log("PostBookmarkContainer: ", postBookmarkContainer);
    await postBookmarkContainer.click();
    await this.page.waitForTimeout(2000);
    console.log("The Page has been created.");
  }

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

  async pageUntitled() {
    const postBookmarkTitleText = await this.postBookmarkTitle.textContent();
    await this.postBookmarkTitle.click();
    if (postBookmarkTitleText === "(Untitled)") {
      console.log("The title is correct.");
    } else {
      console.log("The title is incorrect.");
    }
  }

  async pageNoAuthor() {
    await this.sectionPages.click();
    await this.newPage.click();
    await this.menuOpc.click();
    await this.comboAuthor.click();

    const comboText = await this.comboAuthor.textContent();
    await this.page.getByLabel("remove element").click;
    if (comboText.trim() === "") {
      console.log("The combo box is empty.");
    } else {
      console.log("The combo box has a selected element. There is a BUG!!");
    }
  }

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
