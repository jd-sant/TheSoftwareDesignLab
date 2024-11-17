const screenshot = require('../pages/Screenshots');

const assert = require('assert');
const delay = 2000;
const loginIdInput = 'input[id="identification"]';
const loginPassInput = 'input[id="password"]';
const loginButton = 'button[data-test-button="sign-in"]';
const siteTittle = 'input[id="blog-title"]';
const userName = 'input[id="name"]';
const userEmail = 'input[id="email"]';
const createUserButton = 'button[data-test-button="setup"]';
const loginErrorButton = 'span[data-test-task-button-state="failure"]';
const loginErrorMessage = 'p[data-test-flow-notification]';

class LoginPage {

    async NavigateToTheSite(context, page) {
        await context.driver.url(page);
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context, 'NavigateToTheSite')
    }

    async UserIsLogin(context,email,pass) {
        await context.driver.$(loginIdInput).setValue(email);
        await screenshot.takeScreenshot(context, 'UserLoginTypeEmail')
        await context.driver.$(loginPassInput).setValue(pass);
        await screenshot.takeScreenshot(context, 'UserLoginTypePass')
        await context.driver.$(loginButton).click();
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context, 'UserLoggedIn')
    }
  
    async BadLogin(context,email,pass) {
        await this.UserIsLogin(context,email, pass);
    }

    async SeeLoginError(context) {
        const errorMessage = await context.driver.$(loginErrorMessage).getText();
        return await assert.equal(errorMessage.trim(),'Your password is incorrect.');
    }

    async SeeLoginEmailError(context) {
        const errorMessage = await context.driver.$(loginErrorMessage).getText();
        return await assert.equal(errorMessage.trim(),'There is no user with that email address.');
    }

    async CreateUser(context,SITE_TITLE,FULL_NAME,EMAIL,PASSWORD) {
        await context.driver.$(siteTittle).setValue(SITE_TITLE);
        await context.driver.$(userName).setValue(FULL_NAME);
        await context.driver.$(userEmail).setValue(EMAIL);
        await context.driver.$(loginPassInput).setValue(PASSWORD);
        await context.driver.$(createUserButton).click();
        await context.driver.pause(5000);
    }
}

module.exports = new LoginPage();