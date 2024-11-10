const delay = 2000;
const idNavigateNewPost = '.ember-view.gh-secondary-action.gh-nav-new-post';

class DashboardPage {

    async NavigateToPostPage(context) {
        await context.driver.$(idNavigateNewPost).click();
        await context.driver.pause(delay);
    };

}

module.exports = new DashboardPage();