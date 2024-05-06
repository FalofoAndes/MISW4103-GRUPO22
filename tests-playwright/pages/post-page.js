const { expect } = require("@playwright/test");
const { exit } = require("process");

exports.PostPage = class PostPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newpost = page.locator('a[title="New post"]');
    this.listPost = page.locator('span.gh-nav-viewname:has-text("Published")');
    this.postTitle = page.getByPlaceholder("Post title");
    this.postContent = page.locator(".koenig-editor__editor");
    this.publishButton = page.getByRole("button", { name: "Publish" });
    this.continueButton = page.getByRole("button", {
      name: "Continue, final review →",
    });
    this.finalPublishButton = page.getByRole("button", {
      name: "Publish post, right now",
    });
    this.postBookmarkContainer = page.locator(".gh-post-bookmark-container");
    this.postBookmarkTitle = page.locator(".gh-post-bookmark-title");
    this.menuOpc = page.getByRole("button", { name: "Settings" });
    this.ComboTag = page.locator("#tag-input");
    this.selectTag = page.locator(
      '.ember-power-select-option:has-text("nuevoTagPost")'
    );
    this.comboAuthor = page.locator("#author-list");
    this.errormsg = page.locator("#entry-controls div");
    this.removeItem = page.locator('span[aria-label="remove element"]');
    this.selectPost = page.locator('h3:has-text("Solo Titulo")');
    this.selectPost2 = page.locator('h3:has-text("(Untitled)")');
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
  }

  async createPost(title, subtitle) {
    await this.newpost.click();
    await this.postTitle.fill(title);
    await this.postContent.fill(subtitle);
    await this.publishButton.click();
    await this.continueButton.click();
    await this.page.waitForTimeout(1000);
    await this.finalPublishButton.click({ force: true });
    await this.page.waitForTimeout(2000);
    const newPagePromise = this.page.waitForEvent("popup");
    await this.postBookmarkContainer.click();
    await this.page.waitForTimeout(2000);
    console.log("The Post has been changed.");
  }

  async fillPost(title, subtitle) {
    await this.createPost(title, subtitle);
    const postBookmarkTitleText = await this.postBookmarkTitle.textContent();
    if (postBookmarkTitleText === title) {
      console.log("The title is correct.");
    } else {
      console.log("The title is incorrect.");
    }
  }

  async fillPostUntitled(title, subtitle) {
    await this.newpost.click();
    await this.postTitle.fill(title);
    await this.postContent.fill(subtitle);
    await this.postTitle.fill("");
    await this.postContent.fill("");
    await this.publishButton.click();
    await this.continueButton.click();
    await this.page.waitForTimeout(1000);
    await this.finalPublishButton.click({ force: true });
    await this.page.waitForTimeout(2000);
    await this.postBookmarkContainer.click();
    await this.page.waitForTimeout(2000);
    const postBookmarkTitleText = await this.postBookmarkTitle.textContent();
    if (postBookmarkTitleText === "(Untitled)") {
      console.log("The title is correct.");
    } else {
      console.log("The title is incorrect.");
    }
  }

  async accesingNewPost(title, subtitle) {
    title = title.trim();
    await this.newpost.click();
    await this.postTitle.fill(title);
    await this.postContent.fill(subtitle);
    await this.publishButton.click();
    await this.continueButton.click();
    await this.page.waitForTimeout(1000);
    await this.finalPublishButton.click({ force: true });
    await this.page.waitForTimeout(2000);
    const newPagePromise = this.page.waitForEvent("popup");
    await this.postBookmarkContainer.click();
    await this.page.waitForTimeout(2000);
    const newPage = await newPagePromise;
    const postBookmarkTitleText = await this.postBookmarkTitle.textContent();
    if (postBookmarkTitleText === title) {
      console.log("The title is correct.");
    } else {
      console.log("The title is incorrect.");
    }
  }

  async newTAGinPost(title, subtitle) {
    await this.newpost.click();
    await this.postTitle.fill(title);
    await this.postContent.fill(subtitle);

    await this.menuOpc.click();
    await this.ComboTag.click();
    await this.selectTag.click();

    await this.publishButton.click();
    await this.continueButton.click();
    await this.page.waitForTimeout(1000);
    await this.finalPublishButton.click({ force: true });
    await this.page.waitForTimeout(2000);
    const newPagePromise = this.page.waitForEvent("popup");
    await this.postBookmarkContainer.click();
    await this.page.waitForTimeout(2000);
    console.log("The URL has been changed.");
  }

  async deleteAuthor() {
    await this.listPost.click();
    
    await this.selectPost.first().click();
    await this.page.waitForTimeout(3000);
    await this.menuOpc.click();
    await this.comboAuthor.click();
    await this.removeItem.click();
    await this.page.keyboard.press("Backspace");
    await this.page.keyboard.press("Tab");
    const responseText = await this.errormsgAuthor.textContent();

    if (responseText === "At least one author is required.") {
      console.log('The text "At least one author is required." is present.');
    } else {
      console.log(
        'The text "At least one author is required." is not present.'
      );
    }
  }

  async editPost(text) {
    await this.listPost.click();
    
    await this.selectPost.first().click();
    await this.page.waitForTimeout(3000);
    await this.postTitle.fill(text);
    await this.updateBtn.click();
    await this.page.waitForTimeout(2000);
    const isPopupVisible = await this.popupMessage.isVisible();
    if (isPopupVisible) {
      console.log("The popup message of confirmation of edited has appeared.");
    } else {
      console.log("The popup message has not appeared.");
    }
    
  }

  async editPostTitle(text) {
    await this.listPost.click();
    await this.selectPost.first().click();
    await this.page.waitForTimeout(3000);
    await this.postTitle.fill(text);
    await this.updateBtn.click();
    await this.page.waitForTimeout(2000);
    const isAlertVisible = await this.alertMessage.isVisible();

    if (isAlertVisible) {
      console.log(
        "The alert message has appeared--> Title cannot be longer than 255 characters.."
      );
    } else {
      console.log("The alert message has not appeared.");
    }

  }

  async changeURL(newurl) {
    await this.listPost.click();
    await this.selectPost2.first().click();
    await this.page.waitForTimeout(3000);
    await this.menuOpc.click();
    await this.ComboURL.click();
    await this.ComboURL.fill(newurl);
    await this.goURL.click();
    await this.page.waitForTimeout(2000);
    console.log("The URL has been changed.");
  }
};
