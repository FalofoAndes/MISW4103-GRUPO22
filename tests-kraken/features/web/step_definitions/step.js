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