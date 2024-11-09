const { Given, When, Then } = require('@cucumber/cucumber');
const loginPage = require('../pages/LoginPage');

// Given Steps

Given('the user has navigated to the Ghost site {kraken-string}', function (page) {
    loginPage.NavigateToTheSite(this,page);
});

Given('the user has logged in Ghost with email {kraken-string} and pass {kraken-string}', function (email, pass) {
    loginPage.UserIsLogin(this,email,pass);
});



// When Steps

// Then Steps