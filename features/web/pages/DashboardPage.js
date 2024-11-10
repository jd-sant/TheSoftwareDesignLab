const assert = require('assert');
const delay = 2000;
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';
const idNavigateTags = 'a[data-test-nav="tags"]';
const dashboardHeading = '.gh-onboarding-header h2';

class DashboardPage {

    async NavigateToPostPage(context) {
        await context.driver.$(idNavigateNewPost).click();
        await context.driver.pause(delay);
    };

    async NavigateToTagPage(context) {
        await context.driver.pause(delay);
        await context.driver.$(idNavigateTags).click();
        await context.driver.pause(delay);
    };

    async SeeDashboard(context) {
        const dashboardHeader = await context.driver.$(dashboardHeading).getText();
        return await assert.equal(dashboardHeader.trim(),'Let’s get started!');
    }

}

module.exports = new DashboardPage();