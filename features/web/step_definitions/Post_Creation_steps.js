const { Given, When, Then } = require('@cucumber/cucumber');
const postPage = require('../pages/PostPage');
const dashboardPage  = require('../pages/DashboardPage');

// Given Steps
Given('the user has navigated to post page', function () {
  return dashboardPage.NavigateToPostPage(this);
});


// When Steps

When('the user creates and publishes the post {string}', function (type) {
  return postPage.CreateAndPublishPost(this,type);
});

// Then Steps