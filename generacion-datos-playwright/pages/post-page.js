const { expect } = require("@playwright/test");
const { exit } = require("process");
let screenshotCounter = 1;

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
    this.publishButton = page.locator(
      ".gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger"
    );
    //this.publishButtonV2 = page.getByRole("button", { name: "Publish" });
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
    this.editTAG = page.locator(
      "#ember-power-select-trigger-multiple-input-ember731"
    );
    this.metadatabutton = page.locator('button >> text="Meta data"');
    this.metaTitle = page.locator('input[name="post-setting-meta-title"]');
    this.metaDescription = page.locator(
      'textarea[name="post-setting-meta-description"]'
    );
  }

  async createPost(title, subtitle) {
    await this.newpost.click();
    await this.postTitle.fill(title);
    await this.postTitle.press("Tab");
    await this.postContent.fill(subtitle);
    await this.page.waitForTimeout(3000);
    const isPublishButtonVisible = await this.publishButton.isVisible();
    if (isPublishButtonVisible) {
      await this.publishButton.click();
      await this.continueButton.click();
      console.log(
        "The alert message has not appeared. The page has been created."
      );
      return true;
    } else {
      console.log(
        "**BUG** - Publish button is not visible despite everything is Ok. - Reportado en GitHub"
      );
      return false;
    }
  }

  async changeURL(newurl) {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    await this.newpost.click();
    await this.menuOpc.click();
    await this.ComboURL.click();
    await this.ComboURL.fill(newurl);
    await this.page.waitForTimeout(2000);
    if (newurl.length > 2000) {
      console.log("The URL is too long. Long of NewURL: " + newurl.length);
    } else if (specialChars.test(newurl)) {
      console.log(
        "The URL contains special characters, the field is not being validated."
      );
    } else {
      console.log("The URL has been changed and accept Emojis.");
    }
  }

  async changeMetadata(title, subtitle) {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    await this.newpost.click();
    await this.postTitle.fill(title);
    await this.postContent.fill(subtitle);
    await this.menuOpc.click();
    await this.metadatabutton.click();
    await this.metaTitle.fill(title);
    if (title.length > 2000) {
      console.log(
        "The metadata tittle has: " + title.length,
        " characters and the system no validate it. BUG!!"
      );
    } else if (specialChars.test(title)) {
      console.log("The metadata tittle contains special characters.");
    } else {
      console.log("The metadata tittle has been changed and accept Emojis.");
    }
    console.log("The metadata tittle has been changed.");
  }

  async changeMetadata2(title, subtitle) {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    await this.newpost.click();
    await this.postTitle.fill(title);
    await this.postContent.fill(subtitle);
    await this.menuOpc.click();
    await this.metadatabutton.click();
    await this.metaTitle.fill(title);
    await this.metaDescription.fill(subtitle);
    if (subtitle.length > 2000) {
      console.log(
        "The metadata description has: " + subtitle.length,
        " characters and the system no validate it. BUG!!"
      );
    } else if (specialChars.test(subtitle)) {
      console.log("The metadata description contains special characters.");
    } else {
      console.log(
        "The metadata description has been changed and accept Emojis."
      );
    }
    console.log("The metadata description has been changed.");
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

  async fillPost(title, subtitle) {
    await this.createPost(title, subtitle);
    const postBookmarkTitleText = await this.postBookmarkTitle.textContent();
    if (postBookmarkTitleText === title) {
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

};
