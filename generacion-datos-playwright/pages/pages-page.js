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
      .locator('h3.gh-content-entry-title:has-text("(Untitled)")')
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
    this.twitterbutton = page.locator('button >> text="Twitter card"');
    this.twitterTitle = page.getByPlaceholder('(Untitled)');
    this.twitterDescription = page.getByPlaceholder('Thoughts, stories and ideas.');
    this.prevTwitterTitle = page.locator('.gh-social-twitter-preview-title');
    this.prevTwitterDescript = page.locator('.gh-social-twitter-preview-desc');

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
    const isPublishButtonVisible = await this.pagePublishButton.isVisible();
    if (!isAlertVisible && isPublishButtonVisible) {
      await this.pagePublishButton.click();
      console.log("The alert message has not appeared. The page has been created.");
      return true;
    } else if (isAlertVisible) {
      throw new Error("Validation failed: Title cannot be longer than 255 characters.");
    } else if (!isPublishButtonVisible) {
      throw new Error("**BUG** - Publish button is not visible. - Reportado en GitHub");
    }
  } catch (error) {
    console.error("Error detected: ", error);
    throw error;
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
    console.log("Text of new URL: ", text, "Se reports en GitHub, pues permite el acceso de emojis en la URL, estos caracteres no están siendo controlados.");
  }
  
//************CHANGE TWITTER*****************
  async changeTwitter(tittle, description) {
    await this.sectionPages.click();
    await this.newPage.click();
    await this.menuOpc.click();
    await this.twitterbutton.click();
    await this.twitterTitle.fill(tittle);
    await this.twitterDescription.fill(description);
    let text = await this.prevTwitterTitle.textContent();
    let text2 = await this.prevTwitterDescript.textContent();

    if (text.length > 70) {
      console.log("The twitter len title is: ", text.length, "The Max len title is 70, BUG!! Se reporta en GitHub");
      return false
    } else if (text2.length > 200) {
      console.log("The twitter len description is: ", text2.length, "The Max len description is 200, BUG!! Se reporta en GitHub");
      return false
    } else if (text === tittle && text2 === description) {
      console.log("The twitter title and description has been changed and all are correct.","Title", text.length,"Description", text2.length);
      return true;
    } else {
      console.log("BUG!! se inyectaron 500 caracteres en Description y solo presenta en ","Title", text.length,"y en Description", text2.length);
      return false; 
    }

    }
  }
