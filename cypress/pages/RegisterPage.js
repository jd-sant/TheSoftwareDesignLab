const url = Cypress.config('baseUrl') || 'http://localhost:3001';
const adminName = Cypress.env('adminName') || 'The Kraken';
const siteName = Cypress.env('siteName') || 'Kraken Testing';
const adminEmail = Cypress.env('adminEmail') || 'release-the-kraken@uniandes.edu.co';
const adminPass = Cypress.env('adminPass') || 'Kraken1234';
const delay = Cypress.env('delay') || 300;

class RegisterPage {

    whenUserFormFilled() {
        cy.get('input[id="blog-title"]').type(siteName);
        cy.get('input[id="name"]').type(adminName);
        cy.get('input[id="email"]').type(adminEmail);
        cy.get('input[id="password"]').type(adminPass);
        cy.wait(delay);
    };

    whenSubmitRegisterForm(){
        cy.get('button[data-test-button="setup"]').click();
        cy.wait(7000);
    }


}

export const registerPage = new RegisterPage();