const { Given, When, Then } = require('@cucumber/cucumber');
const loginPage = require('../pages/LoginPage');
const postPage = require('../pages/PostPage');
const dashboardPage  = require('../pages/DashboardPage');

// Given Steps
Given('the user has navigated to the Ghost site {kraken-string}', function (page) {
  loginPage.NavigateToTheSite(this,page);
});

Given('the user has logged in Ghost with email {kraken-string} and pass {kraken-string}', function (email, pass) {
  return loginPage.UserIsLogin(this,email,pass);
});

Given('the user has navigated to post page', function () {
  return dashboardPage.NavigateToPostPage(this);
});

// When Steps

When('the user creates and publishes the post {string}', function (type) {
  return postPage.CreateAndPublishPost(this,type);
});

// Then Steps