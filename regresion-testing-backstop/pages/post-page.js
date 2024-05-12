let screenshotCounter = 1;



exports.PostPage = class PostPage {
  /**
   * 
   * @param {import('@playwright/test').Page} page
   * @param {*} screenshotsPath 



   */
  constructor(page, screenshotsPath, scenario) {
    this.page = page;
    this.screenshotsPath = screenshotsPath;
    this.scenario = scenario;
    this.newpost = page.locator('a[title="New post"]');
    this.newpost2 = page.locator('a.gh-btn.gh-btn-green.ember-view');
    this.listPost = page.locator('span.gh-nav-viewname:has-text("Published")');
    this.postsLink = page.locator('#ember118');
    this.listPost2 = page.locator("#ember24 > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-manage > li.gh-nav-list-new.relative");
    this.config = page.locator('#ember24 > section > div.gh-nav-top > ul.gh-nav-list.gh-nav-settings > li:nth-child(2)');
    this.postTitle = page.getByPlaceholder("Post title");
    this.postContent = page.locator(".koenig-editor__editor");
    this.publishButton = page.getByRole("button", { name: "Publish" });
    this.continueButton = page.getByRole("button", {name: "Continue, final review →",});
    this.finalPublishButton = page.getByRole("button", {name: "Publish post, right now",});
    this.postBookmarkContainer = page.locator(".gh-post-bookmark-container");
    this.postBookmarkTitle = page.locator(".gh-post-bookmark-title");
    this.menuOpc = page.getByRole("button", { name: "Settings" });
    this.ComboTag = page.locator("#tag-input");
    this.selectTag = page.locator('.ember-power-select-option:has-text("nuevoTagPost")');
    this.comboAuthor = page.locator("#author-list");
    this.errormsg = page.locator("#entry-controls div");
    this.removeItem = page.locator('span[aria-label="remove element"]');
    this.selectPost = page.locator('h3:has-text("Solo Titulo")');
    this.selectPost2 = page.locator('h3:has-text("Post title")').first();
    this.errormsgAuthor = page.locator('p:has-text("At least one author is required.")');
    this.selectBlank = page.locator("#entry-controls > div > div.settings-menu-content");
    this.updateBtn = page.locator(".gh-btn.gh-btn-editor.gh-editor-save-trigger.green.ember-view");
    this.popupMessage = page.locator("body > div.gh-app > div > aside");
    this.alertMessage = page.locator("article.gh-alert.gh-alert-red");
    this.ComboURL = page.locator("#url");
    this.buttonpublish_v3 = page.locator('.gh-btn.gh-btn-outline.gh-publishmenu-trigger.ember-basic-dropdown-trigger.ember-view');
    this.publishButton2 = page.locator('button:has-text("Publish")');
    this.closeEditorButton = page.locator('.gh-btn-editor.gh-publish-back-button');
    this.backToPostsButton = page.locator('.gh-btn-editor.gh-editor-back-button');
    this.backToPostsButton2 = page.locator('.blue.link.fw4.flex.items-center');
    this.urlPreview = page.locator('.ghost-url-preview.description');
    this.urlPreview2 = page.locator('.ghost-url-preview.description.ember-view');
    this.selectPost_v3 = page.locator('h3:has-text("Post title")').first();
    this.config_v3 = page.locator('.post-settings');
  }

  async createScreenshot(name) {
    let formattedCounter = String(screenshotCounter).padStart(2, "0");
    await this.page.screenshot({ path: `${this.screenshotsPath}/${this.scenario}-${formattedCounter}-${name}.png` });
    screenshotCounter++;
    if (screenshotCounter > 99) {
      screenshotCounter = 1;
    }
  }

  async fillPostUntitled(title, subtitle, appver) {
    if (appver === "ghost-5.14.1") {
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
  
    } else {
      
      await this.listPost2.click();
      await this.page.waitForTimeout(3000);
      await this.newpost2.click();
      await this.createScreenshot("click-new-post");
      await this.postTitle.fill("");
      await this.createScreenshot("fill-post-title");
      await this.postContent.fill(subtitle);
      await this.createScreenshot("fill-post-content");
      await this.buttonpublish_v3.click();
      await this.createScreenshot("click-menu");
      await this.publishButton2.click();
      await this.createScreenshot("click-publish-btn");
      await this.page.waitForTimeout(3000);
      const buttonText = await this.publishButton2.innerText();
    if (buttonText.includes('Published')) {
        console.log('The button is in "Published" state');
        await this.createScreenshot("post published");
        return "(Untitled)"
    } else {
        console.log('The button is not in "Published" state');
        
    }

    }
      
}


//***********************************************************

async accesingNewPost(title, subtitle, appver) {
    if (appver === "ghost-5.14.1") {
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
    await this.page.waitForTimeout(3000);
    await this.closeEditorButton.click();
    await this.backToPostsButton.click();
    await this.page.waitForTimeout(2000);
    await this.selectPost2.click()
    await this.menuOpc.click();
    await this.createScreenshot("click-menu-option-post");
    await this.urlPreview.dblclick();
    await this.createScreenshot("click-url-preview");
    await this.urlPreview.innerText(); 
    await this.createScreenshot("url of post");
    console.log("URL of post: ", await this.urlPreview.innerText());
    return "Nuevos post con URL"
  } else {


    await this.listPost2.click();
      await this.page.waitForTimeout(3000);
      await this.newpost2.click();
      await this.createScreenshot("click-new-post");
      await this.postTitle.fill("");
      await this.createScreenshot("fill-post-title");
      await this.postContent.fill(subtitle);
      await this.createScreenshot("fill-post-content");
      await this.buttonpublish_v3.click();
      await this.createScreenshot("click-menu");
      await this.publishButton2.click();
      await this.createScreenshot("click-publish-btn");
      await this.page.waitForTimeout(3000);
    const buttonText = await this.publishButton2.innerText();
  if (buttonText.includes('Published')) {
    await this.backToPostsButton2.click();
    await this.page.waitForTimeout(2000);
    await this.selectPost_v3.click();
    await this.page.waitForTimeout(1000);
    await this.config_v3.click();
    await this.createScreenshot("click-menu");
    await this.urlPreview2.dblclick();
    await this.createScreenshot("click-url-preview");
    await this.urlPreview2.innerText(); 
    await this.createScreenshot("url of post");
    console.log("URL of post: ", await this.urlPreview.innerText());
    return "Nuevos post con URL"

  } else {
      console.log('The button is not in "Published" state');
      
  }
    }
  }
};
