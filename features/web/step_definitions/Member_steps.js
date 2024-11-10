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

When('the user creates and tries to save a member with a invalid email', function () {
  return memberPage.CreateMemberInvalidEmail(this);
});

When('the user creates and tries to save a member with an existing email', function () {
  return memberPage.CreateMemberExistingEmail(this);
});

When('the user edits and save a member', function () {
  return memberPage.EditAndSaveMember(this);
});

When('the user deletes a member', function () {
  return memberPage.DeleteMember(this);
});


// Then Steps
Then('the user should see the created member', function () {
  return memberPage.SeeMemberCreated(this);
});

Then('the user should see an error on the input email', function () {
  return memberPage.SeeFormError(this);
});

Then('the user should see an existence error on the input email', function () {
  return memberPage.SeeExistingEmailError(this);
});

Then('the user should see the member edited', function () {
  return memberPage.SeeMemberEdited(this);
});

Then('the user should not see the member deleted', function () {
  return memberPage.NotSeeMemberDeleted(this);
});