import { screenshot } from '../Screenshots';

const url = Cypress.config('baseUrl') || 'http://localhost:3001';
const siteName = Cypress.env('siteName') || 'Kraken Testing';
const adminName = Cypress.env('adminName') || 'The Kraken';
const adminEmail = Cypress.env('adminEmail') || 'release-the-kraken@uniandes.edu.co';
const adminPass = Cypress.env('adminPass') || 'Kraken1234';
const delay = Cypress.env('delay') || 300;
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

    NavigateToTheSite() {
        cy.visit(url + '/ghost/#/signin');
        cy.wait(delay);
        screenshot.takeScreenshot('NavigateToTheSite');
    }

    UserIsLogin(email = adminEmail, passwd = adminPass){
        cy.get(loginIdInput).clear();
        cy.get(loginIdInput).type(email);
        screenshot.takeScreenshot('UserLoginTypeEmail');
        cy.get(loginPassInput).clear();
        cy.get(loginPassInput).type(passwd);
        screenshot.takeScreenshot('UserLoginTypePass');
        cy.get(loginButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('UserLoggedIn');
    }

    CreateUser(){
        cy.get(siteTittle).type(siteName);
        screenshot.takeScreenshot('CreateUserTypeSiteName');
        cy.get(userName).type(adminName);
        screenshot.takeScreenshot('CreateUserTypeAdminName');
        cy.get(userEmail).type(adminEmail);
        screenshot.takeScreenshot('CreateUserTypeAdminEmail');
        cy.get(loginPassInput).type(adminPass);
        screenshot.takeScreenshot('CreateUserTypeAdminPass');
        cy.get(createUserButton).click();
        cy.wait(delay);
        screenshot.takeScreenshot('UserCreated');
    }

    BadLogin(){
        this.UserIsLogin(adminEmail,'badPass');
    }

    BadEmailLogin(){
        this.UserIsLogin('jack-sparrow@pirate.org',adminPass);
    }

    SeeLoginError(){
        cy.get(loginErrorButton).should('be.visible');
        cy.get(loginErrorMessage).should('to.contain', 'Your password is incorrect.')
        cy.wait(delay);
    }

    SeeLoginEmailError(){
        cy.get(loginErrorButton).should('be.visible');
        cy.get(loginErrorMessage).should('to.contain', 'There is no user with that email address.')
        cy.wait(delay);
    }
}

export const loginPage = new LoginPage();