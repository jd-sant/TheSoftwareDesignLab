const { Given, When, Then } = require('@cucumber/cucumber');
const memberPage = require('../pages/MemberPage');
const dashboardPage  = require('../pages/DashboardPage');

// Given Steps
Given('the user has navigated to member page', function () {
  return dashboardPage.NavigateToMemberPage(this);
});


// When Steps
When('the user creates and saves a member', function () {
  return memberPage.CreateAndSaveMember(this);
});


// Then Steps
Then('the user should see the created member', function () {
  return postPage.SeeMemberCreated(this);
});