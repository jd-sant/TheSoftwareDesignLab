const { Given, When, Then } = require('@cucumber/cucumber');
const pagePage = require('../pages/PagePage');
const dashboardPage  = require('../pages/DashboardPage');

// Given Steps
Given('the user has navigated to page page', function () {
    return dashboardPage.NavigateToPagePage(this);
});

// When Steps
When('the user creates and publishes the page', function () {
    return pagePage.CreateAndPublishPage(this);
});

When('the user creates and publishes the page with special characters', function () {
    return pagePage.CreateAndPublishPageSpecial(this);
  });

When('the user creates and publishes the page with a title over 255 characters', function () {
    return pagePage.CreatePageInvalidTitle(this);
});

When('the user creates and publishes the page feature', function () {
    return pagePage.CreateAndPublishFeaturePage(this);
});

// Then Steps
Then('the user should see the page published', function () {
    return pagePage.SeePagePublished(this);
});

Then('the user should see the page with special characters published', function () {
    return pagePage.SeeSpecialPagePublished(this);
});

Then('the user should see an error in the publishing', function () {
    return pagePage.LongTitlePublishError(this);
});

Then('the user should see the publishing in the feature filter', function () {
    return pagePage.SeeFeaturePagePublished(this);
});