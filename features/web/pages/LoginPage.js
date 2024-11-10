const delay = 2000;
const loginIdInput = 'input[id="identification"]';
const loginPassInput = 'input[id="password"]';
const loginButton = 'button[data-test-button="sign-in"]';

class LoginPage {

    async NavigateToTheSite(context, page) {
        await context.driver.url(page);
        await context.driver.pause(delay);
    }

    async UserIsLogin(context,email,pass) {
        await context.driver.$(loginIdInput).setValue(email);
        await context.driver.$(loginPassInput).setValue(pass);
        await context.driver.$(loginButton).click();
        await context.driver.pause(delay);
    }
  

}

module.exports = new LoginPage();