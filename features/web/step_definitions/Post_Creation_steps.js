const { Given, When, Then } = require('@cucumber/cucumber');
const postPage = require('../pages/PostPage');
const dashboardPage  = require('../pages/DashboardPage');

// Given Steps
Given('the user has navigated to post page', function () {
  return dashboardPage.NavigateToPostPage(this);
});


// When Steps
When('the user creates and publishes the post', function () {
  return postPage.CreateAndPublishPost(this);
});

When('the user creates and publishes the post with special characters', function () {
  return postPage.CreateAndPublishPostSpecial(this);
});

When('the user creates and publishes the post with unplash images', function () {
  return postPage.CreateAndPublishPostWithImages(this);
});

// Then Steps
Then('the user should see the post published', function () {
  return postPage.SeePostPublished(this);
});

Then('the user should see the post with special characters published', function () {
  return postPage.SeeSpecialPostPublished(this);
});