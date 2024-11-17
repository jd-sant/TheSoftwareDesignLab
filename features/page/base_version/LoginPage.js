const assert = require('assert');
const delay = 2000;
const createAccountButton = 'section[class="gh-flow-content"] > a[href="#/setup/two/"] > span';
const siteTittle = 'input[id="blog-title"]';
const userName = 'input[id="name"]';
const userEmail = 'input[id="email"]';
const loginPassInput = 'input[id="password"]';
const createUserButton = 'button[class="gh-btn gh-btn-green gh-btn-lg gh-btn-block gh-btn-icon ember-view"]';
const skipButton = '.gh-flow-skip';
const loginIdInput = 'input[name="identification"]';
const loginPassInput_ = 'input[name="password"]';
const loginButton = 'button[class="login gh-btn gh-btn-login gh-btn-block gh-btn-icon js-login-button ember-view"]';
const screenshot = require('./Screenshots');

class LoginPage {

    async NavigateToTheSite(context, page) {
        await context.driver.url(page);
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context,'NavigateToTheSite');
    }

    async UserIsLogin(context,email,pass) {
        await context.driver.$(loginIdInput).setValue(email);
        await screenshot.takeScreenshot(context,'UserLoginTypeEmail');
        await context.driver.$(loginPassInput_).setValue(pass);
        await screenshot.takeScreenshot(context,'UserLoginTypePass');
        await context.driver.$(loginButton).click();
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context,'UserLoggedIn');
    }

    async CreateUser(context,SITE_TITLE,FULL_NAME,EMAIL,PASSWORD) {
        await context.driver.$(createAccountButton).click();
        await context.driver.pause(delay);
        await context.driver.$(siteTittle).setValue(SITE_TITLE);
        await screenshot.takeScreenshot(context,'CreateUserTypeSiteName');
        await context.driver.pause(delay);
        await context.driver.$(userName).setValue(FULL_NAME);
        await screenshot.takeScreenshot(context,'CreateUserTypeAdminName');
        await context.driver.pause(delay);
        await context.driver.$(userEmail).setValue(EMAIL);
        await screenshot.takeScreenshot(context,'CreateUserTypeAdminEmail');
        await context.driver.pause(delay);
        await context.driver.$(loginPassInput).setValue(PASSWORD);
        await screenshot.takeScreenshot(context,'CreateUserTypeAdminPass');
        await context.driver.pause(delay);
        await context.driver.$(createUserButton).click();
        await context.driver.$(skipButton).click();
        await context.driver.pause(5000);
        await screenshot.takeScreenshot(context,'UserCreated');
    }
}

module.exports = new LoginPage();