const { Given, When, Then } = require('@cucumber/cucumber');
const { login } = require('./po-login.js');
const assert = require("assert"); 

When('I enter email {string}', async function (email) {
    let element = await this.driver.$('#ember6');
    return await element.setValue(email);
});
When('I enter password {string}', async function (password) {
    let element = await this.driver.$('#ember8');
    return await element.setValue(password);
});
When('I do clic in Sign in', async function () {
    let element = await this.driver.$('#ember10');
    return await element.click();
});
Then('I see the button with text retry', async function () {
    let element = await this.driver.$('.retry_svg__retry-animated');
    return await element;
});
Then('I see the text {string}', async function (error) {
    let element = await this.driver.$('.main-error');
    let textElement= await element.getText();
    assert.equal(textElement.trim(),error.trim());
});

Given('I login {kraken-string} {kraken-string}', async function (email, password) {
    login(this, email, password);
});

/* FUNCIONALIDAD 2 CREATE POST*/

When('I clic in back button', async function () {
    let element = await this.driver.$('a[class="ember-view gh-btn-editor gh-editor-back-button"]');
    return await element.click();
});


Then('I see the first post in list with name untitled', async function () {
    let element =await this.driver.$('li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title');
    let textElement= await element.getText();
    assert(textElement.includes("(Untitled)"));
});


When('I enter title longer', async function () {
    let element = await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
    const titleLarge = 'a'.repeat(256); // Genera un título de 256 caracteres
    return await element.setValue(titleLarge); // Establece el título largo
    
});

Then('I hope the publish button is not shown', async function () {
    let element =await this.driver.$('gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger');
    let isVisibleElement= await element.isDisplayed();
    assert.ok(!isVisibleElement);
});

Then('I see the first post in list with name Normal Title', async function () {
    let element =await this.driver.$('li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title');
    let textElement= await element.getText();
    assert(textElement.includes("Normal Title"));
});

Then('I confirm that the title page contains the post title {string}', async function (newTitle) {
    const title = await this.driver.getTitle();
    assert(title.includes(newTitle));
});

When('I click in select tag', async function () {
    const element= await this.driver.$(".ember-power-select-trigger-multiple-input")
    await element.click();
});

When('I clic in the tag news', async function () {
    const listItems = await this.driver.$('li[data-option-index="0"]'); // Seleccionar todos los <li>
    // Hacer clic en el elemento
    return await listItems.click();
});



Then('I see the tag on the page {string}', async function (newTag) {
    const element = await this.driver.$(".ember-power-select-multiple-inner-text");
    let textElement= await element.getText();
    assert(textElement.includes(newTag));
});


Then('I see the text of url page change to {string}', async function (url) {
    const element = await this.driver.$(".ghost-url-preview.description.ember-view");
    let textElement= await element.getText();
    assert(textElement.includes(url));
});

/* FUNCIONALIDAD MODIFY POST*/

Then('I see the error {string}', async function (error) {
    const element = await this.driver.$('.for-select.form-group.error.ember-view');
    let textElement= await element.getText();
    console.log("aaaaaaaa:",textElement);
    assert(textElement.includes(error));
});

When('I enter new title {string}', async function (newTitle) {
    const element= await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
    return await element.setValue(newTitle);
    
});

Then('I see the text of the page {string}', async function (title) {
    const element = await this.driver.$(".article-title");
    let textElement= await element.getText();
    assert(textElement.includes(title));
});

When('I enter new url {string}', async function (newUrl) {
    const element= await this.driver.$('#url');
    return await element.setValue(newUrl);
    
});

Then('I see the error about longer title {string}', async function (title) {
    const element = await this.driver.$(".gh-alert-content");
    let textElement= await element.getText();
    console.log(textElement);
    assert(textElement.includes(title));
});


/* FUNCIONALIDAD CREATE PAGE*/

Then('I confirm that the error {string} in date picker is shown', async function (error) {
    const element = await this.driver.$(".gh-date-time-picker-error");
    let textElement= await element.getText();
    assert(textElement.includes(error));
});

When('I delete author tag', async function () {
    let element = await this.driver.$("#author-list");
    await element.click();
    await element.waitForEnabled();
    await element.keys(['Backspace']);
    return await element.click();
});

Then('I confirm that the error {string} in Authors is shown', async function (error) {
    const element = await this.driver.$('div.for-select.form-group.error.ember-view>.response');
    let textElement= await element.getText();
    assert(textElement.includes(error));
});

Then('I see the first page in list with name untitled', async function () {
    let element =await this.driver.$('li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title');
    let textElement= await element.getText();
    assert(textElement.includes("(Untitled)"));
});

Then('I confirm that the title page contains the inserted title {string}', async function (newTitle) {
    const title = await this.driver.getTitle();
    assert(title.includes(newTitle));
});

When('I enter url {kraken-string}', async function (newUrl) {
    const element= await this.driver.$('#url');
    return await element.setValue(newUrl);
    
});

Then('I see the first page in list with name {string}', async function (name) {
    let element =await this.driver.$('li.gh-list-row.gh-posts-list-item a.gh-list-data.gh-post-list-title');
    let textElement= await element.getText();
    assert(textElement.includes(name));
});

Then('I clear title', async function () {
    let element =await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
    return await element.setValue('');
});

Then('I confirm that the validation error {string} is shown', async function (error) {
    const element = await this.driver.$(".gh-alert-content");
    let textElement= await element.getText();
    assert(textElement.includes(error));
});