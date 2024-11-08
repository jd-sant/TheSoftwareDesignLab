const url = Cypress.config('baseUrl') || 'http://localhost:3001';
const adminEmail = Cypress.env('adminEmail') || 'release-the-kraken@uniandes.edu.co';
const adminPass = Cypress.env('adminPass') || 'Kraken1234';
const delay = Cypress.env('delay') || 300;

class HomePage {

    givenGoToCreateAdminPage() {
        cy.visit(url + '/ghost/#/setup'); 
        cy.wait(delay);
    };

    givenGoToLoginPage() {
        cy.visit(url + '/ghost/#/signin');
        cy.wait(delay);
    }

    whenFillTheLoginForm(){
        cy.get('input[id="identification"]').clear();
        cy.get('input[id="identification"]').type(adminEmail);
        cy.get('input[id="password"]').clear();
        cy.get('input[id="password"]').type(adminPass);
        cy.get('button[data-test-button="sign-in"]').click();
        cy.wait(delay);
    }
}

export const homePage = new HomePage();