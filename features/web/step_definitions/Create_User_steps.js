const { Given, When, Then } = require('@cucumber/cucumber');
const loginPage = require('../pages/LoginPage');
const dashboardPage  = require('../pages/DashboardPage');

// When Steps
When('the user fill and submit the form with site {kraken-string} name {kraken-string} email {kraken-string} pass {kraken-string}', function (SITE_TITLE,FULL_NAME,EMAIL,PASSWORD) {
    return loginPage.CreateUser(this,SITE_TITLE,FULL_NAME,EMAIL,PASSWORD);
});

When('the user has logged in Ghost with email {kraken-string} and bad pass {string}', function (email,pass) {
    return loginPage.BadLogin(this,email,pass);
});

When('the user has logged in Ghost with wrong email {string} and pass {kraken-string}', function (email,pass) {
    return loginPage.BadLogin(this,email,pass);
});

// Then Steps
Then('the user should see the dashboard', function () {
    return dashboardPage.SeeDashboard(this);
});

Then('the user should see a message error', function () {
    return loginPage.SeeLoginError(this);
});

Then('the user should see an email message error', function () {
    return loginPage.SeeLoginEmailError(this);
});