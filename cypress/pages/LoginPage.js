const url = Cypress.config('baseUrl') || 'http://localhost:3001';
const adminEmail = Cypress.env('adminEmail') || 'release-the-kraken@uniandes.edu.co';
const adminPass = Cypress.env('adminPass') || 'Kraken1234';
const delay = Cypress.env('delay') || 300;
const loginIdInput = 'input[id="identification"]';
const loginPassInput = 'input[id="password"]';
const loginButton = 'button[data-test-button="sign-in"]';

class LoginPage {

    NavigateToTheSite() {
        cy.visit(url + '/ghost/#/signin');
        cy.wait(delay);
    }

    UserIsLogin(){
        cy.get(loginIdInput).clear();
        cy.get(loginIdInput).type(adminEmail);
        cy.get(loginPassInput).clear();
        cy.get(loginPassInput).type(adminPass);
        cy.get(loginButton).click();
        cy.wait(delay);
    }
}

export const loginPage = new LoginPage();