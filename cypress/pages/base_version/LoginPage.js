const url = Cypress.config('baseUrl') || 'http://localhost:3001';
const siteName = Cypress.env('siteName') || 'Kraken Testing';
const adminName = Cypress.env('adminName') || 'The Kraken';
const adminEmail = Cypress.env('adminEmail') || 'release-the-kraken@uniandes.edu.co';
const adminPass = Cypress.env('adminPass') || 'Kraken1234';
const delay = Cypress.env('delay') || 300;
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
import { screenshot } from '../Screenshots';

class LoginPage {

    NavigateToTheSite() {
        cy.visit(url + '/ghost/#/signin');
        cy.wait(delay);
        screenshot.takeScreenshot('NavigateToTheSite');
    }

    UserIsLogin(email = adminEmail, passwd = adminPass){
        cy.get(loginIdInput).clear();
        cy.get(loginIdInput).type(email);
        screenshot.takeScreenshot('UserLoginTypeEmail');
        cy.get(loginPassInput_).clear();
        cy.get(loginPassInput_).type(passwd);
        screenshot.takeScreenshot('UserLoginTypePass');
        cy.get(loginButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('UserLoggedIn');
    }

    CreateUser(){
        cy.get(createAccountButton).click();
        cy.get(siteTittle).type(siteName);
        screenshot.takeScreenshot('CreateUserTypeSiteName');
        cy.get(userName).type(adminName);
        screenshot.takeScreenshot('CreateUserTypeAdminName');
        cy.get(userEmail).type(adminEmail);
        screenshot.takeScreenshot('CreateUserTypeAdminEmail');
        cy.get(loginPassInput).type(adminPass);
        screenshot.takeScreenshot('CreateUserTypeAdminPass');
        cy.get(createUserButton).click();
        cy.get(skipButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('UserCreated');
    }
}

export const loginPage = new LoginPage();