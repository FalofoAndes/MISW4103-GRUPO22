let screenshotCounter = 1;

exports.PagesPage = class PagesPage {
  constructor(page, screenshotsPath, scenario) {
    this.page = page;
    this.screenshotsPath = screenshotsPath;
    this.scenario = scenario;
    this.sectionPages = page.locator("text=Pages").first();
    this.sectionPages2 = page.locator("#ember3115");
    this.newPage = this.page.locator('.gh-btn.gh-btn-primary.view-actions-top-row');
    this.pageTitle = page.locator(".gh-editor-title.ember-text-area.gh-input.ember-view");
    this.pageContent = page.locator(".koenig-editor__editor");
    this.pagePublishButton = page.getByRole("button", { name: "Publish" });
    this.pageContinueButton = page.getByRole("button", {name: "Continue, final review →",});
    this.finalPublishButton = page.getByRole("button", {name: "Publish page, right now",});
    this.postBookmarkTitle = page.locator(".gh-post-bookmark-title");
    this.menuOpc = page.getByRole("button", { name: "Settings" });
    this.comboAuthor = page.locator("#author-list");
    this.errormsg = page.locator("#entry-controls div");
    this.removeItem = page.locator('button:has-text("remove element")');
    this.pagesList = page.locator('a:has-text("Pages")');
    this.selectPage = page.locator('h3.gh-content-entry-title:has-text("New Title")').nth(0);
    this.errormsg = page.locator("#entry-controls div");
    this.removeItem = page.locator('span[aria-label="remove element"]');
    this.errormsgAuthor = page.locator('p:has-text("At least one author is required.")');
    this.selectBlank = page.locator("#entry-controls > div > div.settings-menu-content");
    this.updateBtn = page.locator(".gh-btn.gh-btn-editor.gh-editor-save-trigger.green.ember-view");
    this.popupMessage = page.locator("body > div.gh-app > div > aside");
    this.alertMessage = page.locator("article.gh-alert.gh-alert-red");
    this.ComboURL = page.locator("#url");
    this.goURL = page.locator("#entry-controls > div > div.settings-menu-content > form > div:nth-child(1) > a");
    this.publishButton2 = page.locator(".ember-view gh-btn-editor gh-editor-back-button");
    this.updateButton = page.locator('button:has-text("Publish")');
    this.urlPreviewText = page.locator(".ghost-url-preview");
    this.newPage2 = page.locator('.gh-btn.gh-btn-green.ember-view');
    this.config_v3 = page.locator('.post-settings');
    this.newpage_v3 = page.locator('a.gh-btn.gh-btn-green.ember-view');
  }

  async createScreenshot(name) {
    let formattedCounter = String(screenshotCounter).padStart(2, "0");
    await this.page.screenshot({ path: `${this.screenshotsPath}/${this.scenario}-${formattedCounter}-${name}.png` });
    screenshotCounter++;
    if (screenshotCounter > 99) {
      screenshotCounter = 1;
    }
  }

  async pageNoAuthor(appver) {
    if (appver === "ghost-5.14.1") {

    await this.sectionPages.click();
    await this.createScreenshot(`click-pages-section`);
    await this.newPage.click();
    await this.createScreenshot(`click-new-page`);
    await this.menuOpc.click();
    await this.createScreenshot(`click-menu-option`);
    await this.comboAuthor.click();
    await this.page.keyboard.press('Backspace');
    await this.page.waitForTimeout(1000);
    await this.createScreenshot(`author-removed`);
    const comboText = await this.comboAuthor.textContent();
    return comboText.trim();
    } else {

    await this.sectionPages.click();
    await this.createScreenshot(`click-pages-section`);
    await this.page.waitForTimeout(2000);
    await this.newpage_v3.click();
    await this.createScreenshot(`click-new-page`);
    await this.page.waitForTimeout(1000);
    await this.config_v3.click();
    await this.createScreenshot(`click-menu-option`);
    await this.comboAuthor.click();
    await this.page.keyboard.press('Backspace');
    await this.page.waitForTimeout(1000);
    await this.createScreenshot(`author-removed`);
    const comboText = await this.comboAuthor.textContent();
    return comboText.trim();






    }

    
  }

}