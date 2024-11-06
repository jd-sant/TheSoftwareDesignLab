const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// When Conditions
When('I enter site title {kraken-string}', async function (title) {
    let element = await this.driver.$('#blog-title');
    return await element.setValue(title);
});

When('I enter full name {kraken-string}', async function (name) {
    let element = await this.driver.$('#name');
    return await element.setValue(name);
});

When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#email');
    return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#password');
    return await element.setValue(password);
});

When('I click on submit button', async function () {
    let element = await this.driver.$('#ember4');
    return await element.click();
});

// Then Conditions
Then('I should see landing page for first time', async function () {
    let element = await this.driver.$('.gh-onboarding-header h2');
    let text = await element.getText();
    assert.strictEqual(text, 'Let’s get started!');
});