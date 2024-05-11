let screenshotCounter = 1;

exports.PostPage = class PostPage {
  /**
   * 
   * @param {import('@playwright/test').Page} page
   * @param {*} screenshotsPath 
   * @param {*} scenario 
   */
  constructor(page, screenshotsPath, scenario) {
    this.page = page;
    this.screenshotsPath = screenshotsPath;
    this.scenario = scenario;
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

  async createScreenshot(name) {
    let formattedCounter = String(screenshotCounter).padStart(2, "0");
    await this.page.screenshot({ path: `${this.screenshotsPath}/${this.scenario}-${formattedCounter}-${name}.png` });
    screenshotCounter++;
    if (screenshotCounter > 99) {
      screenshotCounter = 1;
    }
  }

  async fillPostUntitled(title, subtitle) {
    await this.newpost.click();
    await this.createScreenshot("click-new-post");
    await this.postTitle.fill(title);
    await this.createScreenshot("fill-post-title");    
    await this.postContent.fill(subtitle);
    await this.createScreenshot("fill-post-content");   
    await this.postTitle.fill("");   
    await this.createScreenshot("fill-post-title");    
    await this.postContent.fill("");
    await this.createScreenshot("fill-post-content");    
    await this.publishButton.click();
    await this.createScreenshot("click-publish-btn");        
    await this.continueButton.click();
    await this.createScreenshot("click-continue-btn");        
    await this.page.waitForTimeout(1000);
    await this.finalPublishButton.click({ force: true });
    await this.createScreenshot("click-publish-final-btn");        
    await this.page.waitForTimeout(2000);
    await this.postBookmarkContainer.click();
    await this.createScreenshot("click-bookmark-container");        
    
    await this.page.waitForTimeout(2000);
    return await this.postBookmarkTitle.textContent();
  }

  async accesingNewPost(title, subtitle) {
    title = title.trim();
    await this.newpost.click();
    await this.createScreenshot("click-new-post");
    await this.postTitle.fill(title);
    await this.createScreenshot("fill-post-title");
    await this.postContent.fill(subtitle);
    await this.createScreenshot("fill-post-content");
    await this.publishButton.click();
    await this.createScreenshot("click-publish-btn");
    await this.continueButton.click();
    await this.createScreenshot("click-continue-btn");
    await this.page.waitForTimeout(1000);
    await this.finalPublishButton.click({ force: true });
    await this.createScreenshot("click-publish-final-btn");
    await this.page.waitForTimeout(2000);
    
    await this.postBookmarkContainer.click();
    await this.page.waitForTimeout(2000);
    await this.createScreenshot("click-bookmark-container");        

    return await this.postBookmarkTitle.textContent();
  }
};
