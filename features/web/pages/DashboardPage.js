const delay = 2000;
const idNavigateNewPost = '#ember20';

class DashboardPage {

    async NavigateToPostPage(context) {
        await context.driver.$(idNavigateNewPost).click();
        await context.driver.pause(delay);
    };

}

module.exports = new DashboardPage();