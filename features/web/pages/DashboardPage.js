const assert = require('assert');
const delay = 2000;
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';
const idNavigateMember = 'nav[class="gh-nav ember-view"] > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(4) > :nth-child(1) ';
const dashboardHeading = '.gh-onboarding-header h2';
const idNavigateTags = 'ul.gh-nav-list.gh-nav-manage > li > a[href="#/tags/"]';
const idNavigateNewPage = '#ember39';
const idNavigateCreatePage = 'a[class="ember-view gh-btn gh-btn-primary view-actions-top-row"]';
const screenshot = require('./Screenshots');
class DashboardPage {

    async NavigateToPostPage(context) {
        await context.driver.$(idNavigateNewPost).click();
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context,'NavigateToPostPage');
    };

    async NavigateToTagPage(context) {
        await context.driver.pause(delay);
        await context.driver.$(idNavigateTags).click();
        await context.driver.pause(delay);
    };

    async NavigateToPagePage(context) {
        await context.driver.$(idNavigateNewPage).click();
        await context.driver.pause(delay);
        await context.driver.$(idNavigateCreatePage).click();
        await context.driver.pause(delay);
    };

    async SeeDashboard(context) {
        const dashboardHeader = await context.driver.$(dashboardHeading).getText();
        return await assert.equal(dashboardHeader.trim(),'Let’s get started!');
    }

    async NavigateToMemberPage(context) {
        await context.driver.$(idNavigateMember).click();
        await context.driver.pause(delay);
    };

}

module.exports = new DashboardPage();