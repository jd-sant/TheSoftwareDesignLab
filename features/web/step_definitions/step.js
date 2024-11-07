const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert')
const { registerPage } = require('../pages/RegisterPage');
const { dashboardPage } = require('../pages/DashboardPage');

// When Conditions
When('I enter site title {kraken-string}', async function (title) {
    return registerPage.whenUserFillSiteName(this, title);
});

When('I enter full name {kraken-string}', async function (name) {
    return registerPage.whenUserFillUserName(this, name);
});

When('I enter email {kraken-string}', async function (email) {
    return registerPage.whenUserFillEmail(this, email);
});

When('I enter password {kraken-string}', async function (password) {
    return registerPage.whenUserFillPassword(this, password);
});

When('I click on submit button', async function () {
    return registerPage.whenUserClickRegister(this);
});

// Then Conditions
Then('I should see landing page for first time', async function () {
    return dashboardPage.thenSeeDashboardOnboarding(this);
});