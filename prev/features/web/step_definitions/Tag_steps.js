const { Given, When, Then } = require('@cucumber/cucumber');
const tagPage = require('../pages/TagPage');
const dashboardPage = require('../pages/DashboardPage');

// Given Steps
Given('the user has navigated to tag page', function () {
    return dashboardPage.NavigateToTagPage(this);
});

When('the user creates a tag', function () {
    return tagPage.CreateTag(this);
});

When('the user creates a tag with all fields left blank', function () {
    return tagPage.CreateTagWitAllFieldsBlank(this);
});

When('the user edits the tag with all fields filled', function () {
    return tagPage.CreateTagAndEdit(this);
});

When('the user edits the tag with all fields filled and cancels the edit', function () {
    return tagPage.CreateTagEditAndCancel(this);
});

Then('the user should see the tag with all field filled', function(){
    return tagPage.SeeTagCreated(this);
})

Then('the user should see that the tag was not created', function(){
    return tagPage.seeTagsLeavePage(this);
})

Then('the user should see that the tag edited', function(){
    return tagPage.SeeTagEdited(this);
})

Then('the user should see that the tag remains unchanged', function(){
    return tagPage.seeTagsLeavePageCancel(this);
})